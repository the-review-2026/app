(() => {
  const SERVICE_WORKER_URL = "./sw.js?v=20260429-4";
  let refreshingForUpdate = false;
  let waitingWorker = null;

  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(SERVICE_WORKER_URL)
      .then((registration) => {
        if (registration.waiting && navigator.serviceWorker.controller) {
          showPwaUpdateDialog(registration.waiting);
        }

        registration.addEventListener("updatefound", () => {
          const installingWorker = registration.installing;
          if (!installingWorker) {
            return;
          }
          installingWorker.addEventListener("statechange", () => {
            if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
              showPwaUpdateDialog(installingWorker);
            }
          });
        });
      })
      .catch((error) => {
        console.warn("PWA registration failed:", error);
      });
  });

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshingForUpdate) {
      return;
    }
    refreshingForUpdate = true;
    window.location.reload();
  });

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
        <p>システムまたはレイアウトの更新を反映できます。</p>
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
    if (!waitingWorker) {
      window.location.reload();
      return;
    }
    waitingWorker.postMessage({ type: "SKIP_WAITING" });
  }
})();
