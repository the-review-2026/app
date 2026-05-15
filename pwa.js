(() => {
  const APP_VERSION = "2026.05.15.2";
  const SERVICE_WORKER_URL = "./sw.js?v=20260515-2";
  const AUTO_UPDATE_STORAGE_KEY = "the-review-pwa-auto-update-v1";
  const UPDATE_READY_MESSAGE = "アップデートがあります。更新するか、翌日0時の自動更新を待てます。";
  const UPDATE_CHECK_TIMEOUT_MS = 8000;
  const MAX_TIMEOUT_MS = 2_147_483_647;

  let refreshingForUpdate = false;
  let waitingWorker = null;
  let serviceWorkerRegistration = null;
  let registrationPromise = null;
  let autoUpdateTimerId = 0;
  let reloadOnlyUpdateAvailable = false;
  const observedRegistrations = new WeakSet();

  window.TheReviewPwaUpdate = {
    check: () => checkPwaUpdate({ isManual: true }),
    apply: () => applyPwaUpdate(),
  };

  bindSettingsUpdateControls();

  if (!("serviceWorker" in navigator)) {
    setUpdateStatus("この環境ではアップデート確認を利用できません。", "error");
    return;
  }

  window.addEventListener("load", () => {
    ensureServiceWorkerRegistration().catch((error) => {
      console.warn("PWA registration failed:", error);
      setUpdateStatus("アップデート確認を準備できませんでした。", "error");
    });
  });

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshingForUpdate) {
      return;
    }
    refreshingForUpdate = true;
    clearPendingAutoUpdate();
    window.location.reload();
  });

  function bindSettingsUpdateControls() {
    const bind = () => {
      const versionElement = document.getElementById("appCurrentVersion");
      if (versionElement) {
        versionElement.textContent = APP_VERSION;
      }

      const checkButton = document.getElementById("appUpdateCheckBtn");
      if (!checkButton || checkButton.dataset.updateBound === "1") {
        return;
      }
      checkButton.dataset.updateBound = "1";
      checkButton.addEventListener("click", () => {
        checkPwaUpdate({ isManual: true });
      });
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", bind, { once: true });
    } else {
      bind();
    }
  }

  function ensureServiceWorkerRegistration() {
    if (registrationPromise) {
      return registrationPromise;
    }

    registrationPromise = navigator.serviceWorker
      .register(SERVICE_WORKER_URL, { updateViaCache: "none" })
      .then((registration) => {
        serviceWorkerRegistration = registration;
        observeRegistration(registration);

        if (registration.waiting && navigator.serviceWorker.controller) {
          markUpdateAvailable(registration.waiting, { showDialog: true });
        } else {
          schedulePendingAutoUpdate();
        }

        return registration;
      })
      .catch((error) => {
        registrationPromise = null;
        throw error;
      });

    return registrationPromise;
  }

  function observeRegistration(registration) {
    if (!registration || observedRegistrations.has(registration)) {
      return;
    }
    observedRegistrations.add(registration);

    registration.addEventListener("updatefound", () => {
      const installingWorker = registration.installing;
      if (!installingWorker) {
        return;
      }
      installingWorker.addEventListener("statechange", () => {
        if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
          markUpdateAvailable(installingWorker, { showDialog: true });
        }
      });
    });
  }

  async function checkPwaUpdate({ isManual = false } = {}) {
    const checkButton = document.getElementById("appUpdateCheckBtn");
    try {
      if (checkButton) {
        checkButton.disabled = true;
      }
      setUpdateStatus("確認中…", "checking");

      if (!("serviceWorker" in navigator)) {
        setUpdateStatus("この環境ではアップデート確認を利用できません。", "error");
        return false;
      }

      let registration = await ensureServiceWorkerRegistration();
      if (!navigator.serviceWorker.controller) {
        setUpdateStatus("アップデート確認の準備が完了しました。次回以降に確認できます。", "success");
        return false;
      }

      if (registration.waiting) {
        markUpdateAvailable(registration.waiting, { showDialog: true });
        return true;
      }

      const latestServiceWorkerVersion = await fetchLatestServiceWorkerVersion();
      const hasRemoteUpdate = isDifferentVersion(latestServiceWorkerVersion, APP_VERSION);
      await registration.update();
      registration = await waitForUpdateReady(registration);

      if (registration.waiting) {
        markUpdateAvailable(registration.waiting, { showDialog: true });
        return true;
      }

      registration = await refreshServiceWorkerRegistration(registration);
      if (registration?.waiting) {
        markUpdateAvailable(registration.waiting, { showDialog: true });
        return true;
      }

      if (hasRemoteUpdate) {
        markReloadUpdateAvailable(latestServiceWorkerVersion, { showDialog: true });
        return true;
      }

      setUpdateStatus(isManual ? "現在は最新バージョンです。" : "", "success");
      return false;
    } catch (error) {
      console.warn("PWA update check failed:", error);
      setUpdateStatus("アップデートを確認できませんでした。通信状態を確認してください。", "error");
      return false;
    } finally {
      if (checkButton) {
        checkButton.disabled = false;
      }
    }
  }

  async function waitForUpdateReady(registration) {
    const deadline = Date.now() + UPDATE_CHECK_TIMEOUT_MS;
    let currentRegistration = registration;

    while (Date.now() < deadline) {
      currentRegistration = await refreshServiceWorkerRegistration(currentRegistration);
      if (currentRegistration?.waiting) {
        return currentRegistration;
      }
      if (currentRegistration?.installing?.state === "installed") {
        await delay(50);
        currentRegistration = await refreshServiceWorkerRegistration(currentRegistration);
        if (currentRegistration?.waiting) {
          return currentRegistration;
        }
      }
      await delay(Math.min(220, Math.max(0, deadline - Date.now())));
    }

    return refreshServiceWorkerRegistration(currentRegistration);
  }

  async function refreshServiceWorkerRegistration(fallbackRegistration = serviceWorkerRegistration) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        serviceWorkerRegistration = registration;
        observeRegistration(registration);
        return registration;
      }
    } catch {
      return fallbackRegistration;
    }
    return fallbackRegistration;
  }

  async function fetchLatestServiceWorkerVersion() {
    const url = new URL("./sw.js", window.location.href);
    url.searchParams.set("update-check", String(Date.now()));
    try {
      const response = await fetch(url.toString(), {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      if (!response.ok) {
        return "";
      }
      const text = await response.text();
      const versionMatch = text.match(/APP_SHELL_VERSION\s*=\s*["']([^"']+)["']/);
      return normalizeVersion(versionMatch?.[1]);
    } catch {
      return "";
    }
  }

  function isDifferentVersion(leftVersion, rightVersion) {
    const left = normalizeVersion(leftVersion);
    const right = normalizeVersion(rightVersion);
    return Boolean(left && right && left !== right);
  }

  function normalizeVersion(value) {
    return String(value || "").trim();
  }

  function delay(ms) {
    return new Promise((resolve) => {
      window.setTimeout(resolve, Math.max(0, ms));
    });
  }

  function markReloadUpdateAvailable(remoteVersion, { showDialog = false } = {}) {
    reloadOnlyUpdateAvailable = true;
    const pendingUpdate = ensurePendingAutoUpdate();
    const scheduledDate = pendingUpdate?.scheduledAt ? new Date(pendingUpdate.scheduledAt) : null;
    const scheduledLabel = scheduledDate ? formatLocalDateTime(scheduledDate) : "翌日0時";
    const versionLabel = remoteVersion ? ` (${remoteVersion})` : "";
    const shouldApplyNow = scheduledDate instanceof Date && scheduledDate.getTime() <= Date.now();
    setUpdateStatus(`アップデート${versionLabel}を検出しました。自動更新予定: ${scheduledLabel}`, "success");
    schedulePendingAutoUpdate();

    if (showDialog && !shouldApplyNow) {
      showPwaUpdateDialog(null);
    }
  }

  function markUpdateAvailable(worker, { showDialog = false } = {}) {
    reloadOnlyUpdateAvailable = false;
    waitingWorker = worker;
    const pendingUpdate = ensurePendingAutoUpdate();
    const scheduledDate = pendingUpdate?.scheduledAt ? new Date(pendingUpdate.scheduledAt) : null;
    const scheduledLabel = scheduledDate ? formatLocalDateTime(scheduledDate) : "翌日0時";
    const shouldApplyNow = scheduledDate instanceof Date && scheduledDate.getTime() <= Date.now();
    setUpdateStatus(`${UPDATE_READY_MESSAGE} 自動更新予定: ${scheduledLabel}`, "success");
    schedulePendingAutoUpdate();

    if (showDialog && !shouldApplyNow) {
      showPwaUpdateDialog(worker);
    }
  }

  function showPwaUpdateDialog(worker) {
    waitingWorker = worker;
    const dialog = ensurePwaUpdateDialog();
    if (dialog.open) {
      return;
    }
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
      return;
    }
    const shouldReload = window.confirm("The Reviewのアップデートがあります。今すぐ更新しますか？");
    if (shouldReload) {
      applyPwaUpdate();
    }
  }

  function ensurePwaUpdateDialog() {
    const existing = document.getElementById("pwaUpdateDialog");
    if (existing) {
      return existing;
    }

    const dialog = document.createElement("dialog");
    dialog.id = "pwaUpdateDialog";
    dialog.className = "text-reset-dialog pwa-update-dialog";
    dialog.setAttribute("aria-labelledby", "pwaUpdateDialogTitle");
    dialog.innerHTML = `
      <form method="dialog" class="text-reset-dialog-body">
        <h3 id="pwaUpdateDialogTitle">アップデートがあります</h3>
        <p>システムまたはレイアウトの更新を反映できます。あとで選んだ場合も、翌日0時に自動で更新されます。</p>
        <div class="guest-mode-actions pwa-update-actions">
          <button class="secondary" type="button" data-pwa-update-action="later">あとで</button>
          <button class="primary" type="button" data-pwa-update-action="apply">更新する</button>
        </div>
      </form>
    `;
    dialog.addEventListener("click", (event) => {
      const button = event.target.closest("[data-pwa-update-action]");
      if (!button) {
        return;
      }
      if (button.dataset.pwaUpdateAction === "apply") {
        applyPwaUpdate();
      } else {
        dialog.close();
      }
    });
    document.body.append(dialog);
    return dialog;
  }

  function applyPwaUpdate() {
    const worker = waitingWorker || serviceWorkerRegistration?.waiting;
    clearPendingAutoUpdate();
    if (!worker) {
      window.location.reload();
      return;
    }
    worker.postMessage({ type: "SKIP_WAITING" });
  }

  function ensurePendingAutoUpdate() {
    const existing = readPendingAutoUpdate();
    const now = new Date();
    if (existing?.scheduledAt && Number.isFinite(Date.parse(existing.scheduledAt))) {
      return existing;
    }

    const nextMidnight = getNextLocalMidnight(now);
    const pendingUpdate = {
      foundAt: now.toISOString(),
      scheduledAt: nextMidnight.toISOString(),
    };
    writePendingAutoUpdate(pendingUpdate);
    return pendingUpdate;
  }

  function schedulePendingAutoUpdate() {
    if (autoUpdateTimerId) {
      window.clearTimeout(autoUpdateTimerId);
      autoUpdateTimerId = 0;
    }

    const pendingUpdate = readPendingAutoUpdate();
    const scheduledTime = Date.parse(pendingUpdate?.scheduledAt || "");
    const worker = waitingWorker || serviceWorkerRegistration?.waiting;
    if ((!worker && !reloadOnlyUpdateAvailable) || !Number.isFinite(scheduledTime)) {
      return;
    }

    const delay = scheduledTime - Date.now();
    if (delay <= 0) {
      applyPwaUpdate();
      return;
    }

    autoUpdateTimerId = window.setTimeout(schedulePendingAutoUpdate, Math.min(delay, MAX_TIMEOUT_MS));
  }

  function getNextLocalMidnight(date = new Date()) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, 0, 0);
  }

  function readPendingAutoUpdate() {
    try {
      const raw = window.localStorage.getItem(AUTO_UPDATE_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function writePendingAutoUpdate(value) {
    try {
      window.localStorage.setItem(AUTO_UPDATE_STORAGE_KEY, JSON.stringify(value));
    } catch {
      return;
    }
  }

  function clearPendingAutoUpdate() {
    if (autoUpdateTimerId) {
      window.clearTimeout(autoUpdateTimerId);
      autoUpdateTimerId = 0;
    }
    try {
      window.localStorage.removeItem(AUTO_UPDATE_STORAGE_KEY);
    } catch {
      return;
    }
  }

  function setUpdateStatus(message, status = "") {
    const statusElement = document.getElementById("appUpdateStatus");
    if (!statusElement) {
      return;
    }
    statusElement.textContent = message || "";
    statusElement.classList.toggle("is-success", status === "success");
    statusElement.classList.toggle("is-error", status === "error");
    statusElement.classList.toggle("is-checking", status === "checking");
    if (status === "checking") {
      statusElement.innerHTML = `
        <span class="app-update-loader ball-scale" aria-hidden="true"><div></div></span>
        <span>${message || "確認中…"}</span>
      `;
    }
  }

  function formatLocalDateTime(date) {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${month}/${day} ${hours}:${minutes}`;
  }
})();
