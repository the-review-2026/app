(() => {
  const APP_VERSION = "2026.05.16.2";
  const AUTO_UPDATE_STORAGE_KEY = "the-review-pwa-auto-update-v1";
  const APP_CACHE_PREFIXES = ["the-review-shell-"];

  window.TheReviewPwaUpdate = {
    check: () => disablePwa({ isManual: true }),
    apply: () => window.location.reload(),
  };

  bindSettingsUpdateControls();
  disablePwa().catch((error) => {
    console.warn("PWA cleanup failed:", error);
    setUpdateStatus("PWAの解除を確認できませんでした。ブラウザを再読み込みしてください。", "error");
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
        disablePwa({ isManual: true });
      });
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", bind, { once: true });
    } else {
      bind();
    }
  }

  async function disablePwa({ isManual = false } = {}) {
    const checkButton = document.getElementById("appUpdateCheckBtn");
    try {
      if (checkButton) {
        checkButton.disabled = true;
      }
      clearPendingAutoUpdate();
      if (isManual) {
        setUpdateStatus("確認中...", "checking");
      }

      await Promise.all([unregisterServiceWorkers(), deleteAppCaches()]);

      if (isManual) {
        setUpdateStatus("PWAは無効です。ブラウザの再読み込みで最新ファイルを取得します。", "success");
      }
      return true;
    } catch (error) {
      console.warn("PWA cleanup failed:", error);
      setUpdateStatus("PWAの解除を確認できませんでした。ブラウザを再読み込みしてください。", "error");
      return false;
    } finally {
      if (checkButton) {
        checkButton.disabled = false;
      }
    }
  }

  async function unregisterServiceWorkers() {
    if (!("serviceWorker" in navigator)) {
      return;
    }
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((registration) => registration.unregister()));
  }

  async function deleteAppCaches() {
    if (!("caches" in window)) {
      return;
    }
    const keys = await caches.keys();
    const appKeys = keys.filter((key) => APP_CACHE_PREFIXES.some((prefix) => key.startsWith(prefix)));
    await Promise.all(appKeys.map((key) => caches.delete(key)));
  }

  function clearPendingAutoUpdate() {
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
        <span>${message || "確認中..."}</span>
      `;
    }
  }
})();
