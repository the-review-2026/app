(() => {
        const APP_STATE_KEY = "the-review-quest-v1";
        const MANAGER_DRAFT_KEY = "the-review-manager-drafts-v1";
        const MANAGER_OUTBOX_KEY = "the-review-manager-outbox-v1";
        const MANAGER_API_BASE_KEY = "the-review-manager-api-base";
        const STORE_CONFIG_KEY = "the-review-store-config-v1";
        const AVATER_CUSTOM_ITEMS_KEY = "the-review-avater-items-v1";
        const MANAGER_MIGRATED_DATA = window.THE_REVIEW_MANAGER_MIGRATED_DATA;
        if (!MANAGER_MIGRATED_DATA) {
          throw new Error("Manager migrated data is not available.");
        }
        const DEFAULT_STORE_CONFIG = MANAGER_MIGRATED_DATA.defaultStoreConfig;
        const DEFAULT_API_BASE = "https://api.the-review.net";
        const MANAGER_ROLE_LABELS = MANAGER_MIGRATED_DATA.roleLabels;
        const MANAGER_ROLE_IDS = Object.freeze(Object.keys(MANAGER_ROLE_LABELS).filter((role) => role !== "user"));
        const MANAGER_ROLE_ALIASES = MANAGER_MIGRATED_DATA.roleAliases;
        const MANAGER_THEME_IDS = Object.freeze(MANAGER_MIGRATED_DATA.availableThemes || ["sea"]);
        const MANAGER_THEME_LABELS = MANAGER_MIGRATED_DATA.themeDisplayNames || {};
        const MANAGER_AVATER_CATEGORY_LABELS = MANAGER_MIGRATED_DATA.avaterCategoryLabels;
        const MANAGER_AVATER_ITEM_CLASSES = MANAGER_MIGRATED_DATA.avaterItemClasses;
        const NOTE_BY_BINDER = MANAGER_MIGRATED_DATA.noteByBinder;
        const DEFAULT_CHAPTER_CONFIG = MANAGER_MIGRATED_DATA.defaultChapterConfig;

        const CHAPTER_CONFIG_BY_NOTE = {};

        const STATUS_LABEL = {
          draft: "下書き",
          pending: "承認待ち",
          approved: "公開済み",
          rejected: "差し戻し",
        };
        const MANAGER_SCREEN_TITLES = {
          home: "ダッシュボード",
          members: "ユーザー",
          problem: "問題",
          store: "ストア",
        };

        const state = {
          activeScreen: "home",
          auth0Client: null,
          drafts: loadManagerProblemDrafts(),
          auth: loadAuthSummary(),
          managerAccess: null,
          managerMembers: [],
          activeAvaterCategory: "clothes",
          activeStoreTab: "create",
          infoMenuCloseTimerId: null,
          draggingId: null,
          lastDragOverKey: null,
          problemImageData: null,
          selectedListBinder: "",
          selectedListNote: "",
          selectedListChapter: "all",
          pendingProblemDraft: null,
          lastProblemStep: "create",
          activeProblemTab: "create",
          selectedPendingQuestionId: "",
          textBlocks: [],
          draggingTextBlockId: "",
          notebookBlocks: [],
          csvImportDrafts: [],
          activeNotebookBlockId: "",
          notebookDragState: null,
          notebookLongPressTimerId: null,
          notebookSuppressSurfaceClick: false,
          vectorGraphLines: [],
          vectorGraphPointerState: null,
          avaterItemImageData: null,
          activeStoreItemId: "",
          reviewDataSnapshot: null,
          pendingManagerMemberAction: null,
        };

        const elements = {
          appLoader: document.getElementById("appLoader"),
          infoMenuTrigger: document.getElementById("infoMenuTrigger"),
          infoMenuCloseBtn: document.getElementById("infoMenuCloseBtn"),
          infoMenuPanel: document.getElementById("infoMenuPanel"),
          managerInfoMenuNickname: document.getElementById("managerInfoMenuNickname"),
          menuItems: Array.from(document.querySelectorAll(".info-menu-item")),
          screens: Array.from(document.querySelectorAll(".screen")),
          navButtons: Array.from(document.querySelectorAll("[data-screen]")),
          homeLinks: Array.from(document.querySelectorAll("[data-home-link]")),
          publishedBinderSelect: document.getElementById("publishedBinderSelect"),
          publishedNoteMenu: document.getElementById("publishedNoteMenu"),
          publishedChapterSelect: document.getElementById("publishedChapterSelect"),
          publishedChapterLabel: document.getElementById("publishedChapterLabel"),
          questionListUpdatedAt: document.getElementById("questionListUpdatedAt"),
          createdQuestionList: document.getElementById("createdQuestionList"),
          problemTabButtons: Array.from(document.querySelectorAll("[data-problem-tab]")),
          problemTabPanels: Array.from(document.querySelectorAll("[data-problem-tab-panel]")),
          storeTabButtons: Array.from(document.querySelectorAll("[data-store-tab]")),
          storeTabPanels: Array.from(document.querySelectorAll("[data-store-tab-panel]")),
          problemCreateForm: document.getElementById("problemCreateForm"),
          problemSteps: Array.from(document.querySelectorAll("[data-problem-step]")),
          pendingQuestionList: document.getElementById("pendingQuestionList"),
          pendingQuestionEmpty: document.getElementById("pendingQuestionEmpty"),
          pendingQuestionEditorPanel: document.getElementById("pendingQuestionEditorPanel"),
          pendingQuestionBinder: document.getElementById("pendingQuestionBinder"),
          pendingQuestionNote: document.getElementById("pendingQuestionNote"),
          pendingQuestionChapter: document.getElementById("pendingQuestionChapter"),
          pendingQuestionStatus: document.getElementById("pendingQuestionStatus"),
          pendingQuestionEditor: document.getElementById("pendingQuestionEditor"),
          pendingQuestionSaveBtn: document.getElementById("pendingQuestionSaveBtn"),
          pendingQuestionApproveBtn: document.getElementById("pendingQuestionApproveBtn"),
          pendingQuestionFeedback: document.getElementById("pendingQuestionFeedback"),
          saveProblemDraftBtn: document.getElementById("saveProblemDraftBtn"),
          resetProblemFormBtn: document.getElementById("resetProblemFormBtn"),
          binderSelect: document.getElementById("binderSelect"),
          noteSelect: document.getElementById("noteSelect"),
          chapterSelect: document.getElementById("chapterSelect"),
          chapterFieldLabel: document.getElementById("chapterFieldLabel"),
          textNumberInput: document.getElementById("textNumberInput"),
          textNameInput: document.getElementById("textNameInput"),
          textBlockList: document.getElementById("textBlockList"),
          textBlockAddButtons: Array.from(document.querySelectorAll("[data-add-text-block]")),
          questionNumberInput: document.getElementById("questionNumberInput"),
          questionNameInput: document.getElementById("questionNameInput"),
          problemCsvInput: document.getElementById("problemCsvInput"),
          problemCsvLoadBtn: document.getElementById("problemCsvLoadBtn"),
          problemCsvSubmitMissingBtn: document.getElementById("problemCsvSubmitMissingBtn"),
          problemCsvImportSummary: document.getElementById("problemCsvImportSummary"),
          problemCsvImportList: document.getElementById("problemCsvImportList"),
          problemImageInput: document.getElementById("problemImageInput"),
          selectProblemImageBtn: document.getElementById("selectProblemImageBtn"),
          viewProblemImageBtn: document.getElementById("viewProblemImageBtn"),
          problemImagePreviewWrap: document.getElementById("problemImagePreviewWrap"),
          problemImageMeta: document.getElementById("problemImageMeta"),
          clearProblemImageBtn: document.getElementById("clearProblemImageBtn"),
          problemEditor: document.getElementById("problemEditor"),
          editorToolbar: document.getElementById("editorToolbar"),
          vectorGraphDialog: document.getElementById("vectorGraphDialog"),
          vectorGraphModeSelect: document.getElementById("vectorGraphModeSelect"),
          vectorGraphSvg: document.getElementById("vectorGraphSvg"),
          vectorGraphGrid: document.getElementById("vectorGraphGrid"),
          vectorGraphLines: document.getElementById("vectorGraphLines"),
          vectorGraphPreview: document.getElementById("vectorGraphPreview"),
          vectorGraphActionButtons: Array.from(document.querySelectorAll("[data-vector-graph-action]")),
          notebookEditorToolbar: document.getElementById("notebookEditorToolbar"),
          notebookEditorBook: document.getElementById("notebookEditorBook"),
          notebookTextSurface: document.getElementById("notebookTextSurface"),
          notebookQuestionSurface: document.getElementById("notebookQuestionSurface"),
          notebookTextSubject: document.getElementById("notebookTextSubject"),
          notebookQuestionSubject: document.getElementById("notebookQuestionSubject"),
          notebookEditorDate: document.getElementById("notebookEditorDate"),
          notebookEditorDates: Array.from(document.querySelectorAll("[data-notebook-editor-date]")),
          editorWordCount: document.getElementById("editorWordCount"),
          editorCharCount: document.getElementById("editorCharCount"),
          proofreadingFeedback: document.getElementById("proofreadingFeedback"),
          profileNicknameValue: document.getElementById("profileNicknameValue"),
          profileRoleValue: document.getElementById("profileRoleValue"),
          managerAvaterPreviews: Array.from(document.querySelectorAll("[data-manager-avater-preview]")),
          managerMembersPanel: document.getElementById("managerMembersPanel"),
          managerMembersRefreshBtn: document.getElementById("managerMembersRefreshBtn"),
          managerMemberSearchInput: document.getElementById("managerMemberSearchInput"),
          managerMembersStatus: document.getElementById("managerMembersStatus"),
          managerMembersList: document.getElementById("managerMembersList"),
          avaterItemNameInput: document.getElementById("avaterItemNameInput"),
          avaterItemCategorySelect: document.getElementById("avaterItemCategorySelect"),
          avaterItemCostInput: document.getElementById("avaterItemCostInput"),
          avaterItemImageInput: document.getElementById("avaterItemImageInput"),
          avaterItemImageDropzone: document.getElementById("avaterItemImageDropzone"),
          avaterItemImagePreview: document.getElementById("avaterItemImagePreview"),
          avaterItemImageEmpty: document.getElementById("avaterItemImageEmpty"),
          avaterItemImageMeta: document.getElementById("avaterItemImageMeta"),
          adjustAvaterItemImageBtn: document.getElementById("adjustAvaterItemImageBtn"),
          clearAvaterItemImageBtn: document.getElementById("clearAvaterItemImageBtn"),
          avaterItemImageAdjustDialog: document.getElementById("avaterItemImageAdjustDialog"),
          avaterItemAdjustImage: document.getElementById("avaterItemAdjustImage"),
          avaterItemImageScaleInput: document.getElementById("avaterItemImageScaleInput"),
          avaterItemImageScaleXInput: document.getElementById("avaterItemImageScaleXInput"),
          avaterItemImageScaleYInput: document.getElementById("avaterItemImageScaleYInput"),
          avaterItemImageOffsetXInput: document.getElementById("avaterItemImageOffsetXInput"),
          avaterItemImageOffsetYInput: document.getElementById("avaterItemImageOffsetYInput"),
          avaterItemImageRotateInput: document.getElementById("avaterItemImageRotateInput"),
          avaterItemImageAdjustButtons: Array.from(document.querySelectorAll("[data-avater-image-adjust-action]")),
          addAvaterItemBtn: document.getElementById("addAvaterItemBtn"),
          managerAvaterItemList: document.getElementById("managerAvaterItemList"),
          storeConfigFeedback: document.getElementById("storeConfigFeedback"),
          problemImageDialog: document.getElementById("problemImageDialog"),
          problemDialogImage: document.getElementById("problemDialogImage"),
          problemDialogImageMeta: document.getElementById("problemDialogImageMeta"),
          imageDialogButtons: Array.from(document.querySelectorAll("[data-image-dialog-action]")),
          problemResetDialog: document.getElementById("problemResetDialog"),
          resetDialogButtons: Array.from(document.querySelectorAll("[data-reset-dialog-action]")),
          managerMemberActionDialog: document.getElementById("managerMemberActionDialog"),
          managerMemberActionDialogTitle: document.getElementById("managerMemberActionDialogTitle"),
          managerMemberActionDialogMessage: document.getElementById("managerMemberActionDialogMessage"),
          managerMemberActionConfirmBtn: document.getElementById("managerMemberActionConfirmBtn"),
          managerMemberDialogButtons: Array.from(document.querySelectorAll("[data-manager-member-dialog-action]")),
          problemConfirmDialog: document.getElementById("problemConfirmDialog"),
          confirmProblemNote: document.getElementById("confirmProblemNote"),
          confirmProblemChapter: document.getElementById("confirmProblemChapter"),
          confirmProblemImage: document.getElementById("confirmProblemImage"),
          confirmProblemContent: document.getElementById("confirmProblemContent"),
          confirmDialogButtons: Array.from(document.querySelectorAll("[data-confirm-dialog-action]")),
        };

        initialize();

        async function initialize() {
          initializeMenu();
          initializeNavigation();
          initializeManagerMembers();
          initializeStoreSettings();
          initializeStoreTabs();
          renderStoreSettings();
          renderManagerAccess();
          window.addEventListener("the-review-manager-access", (event) => {
            if (!applyManagerAccess(event.detail) && !event.detail) {
              state.managerAccess = {
                canAccess: false,
                status: "user",
                role: null,
              };
              renderManagerAccess();
            }
          });
          void initializeManagerAccess();
          pruneSeedDrafts();
          initializePublishedFilters();
          initializeProblemTabs();
          initializePendingQuestionManager();
          initializeProblemForm();
          initializeQuestionListDnD();
          renderQuestionList();
          renderPendingQuestionManager();
          renderProfile();
          renderProblemImagePreview();
          renderTextBlocks();
          renderAvaterItemImagePreview();
          updateEditorCounts();
          notifyManagerScreenChange(state.activeScreen);
          window.setTimeout(() => {
            if (elements.appLoader) {
              elements.appLoader.style.display = "none";
            }
          }, 80);
        }

        function pruneSeedDrafts() {
          const cleanedDrafts = state.drafts.filter((draft) => {
            if (typeof draft?.id === "string" && draft.id.startsWith("seed-test-")) {
              return false;
            }
            return !/^テスト0[1-3]$/.test(String(draft?.contentText || ""));
          });
          if (cleanedDrafts.length !== state.drafts.length) {
            state.drafts = cleanedDrafts;
            saveJson(MANAGER_DRAFT_KEY, state.drafts);
          }
        }

        function initializeMenu() {
          if (!elements.infoMenuTrigger || !elements.infoMenuPanel) {
            return;
          }

          elements.infoMenuTrigger.addEventListener("click", () => {
            if (elements.infoMenuPanel.classList.contains("is-open")) {
              closeInfoMenu();
              return;
            }
            openInfoMenu();
          });

          elements.infoMenuCloseBtn?.addEventListener("click", closeInfoMenu);

          elements.menuItems.forEach((item) => {
            item.addEventListener("click", () => {
              const linkScreen = item.dataset.menuLink;
              const linkUrl = item.dataset.menuUrl;

              if (linkScreen) {
                switchScreen(linkScreen);
              }
              if (linkUrl) {
                window.location.href = linkUrl;
              }
              closeInfoMenu();
            });
          });

          document.addEventListener("click", (event) => {
            if (!elements.infoMenuPanel || !elements.infoMenuTrigger) {
              return;
            }
            if (
              event.target instanceof Element &&
              !elements.infoMenuPanel.contains(event.target) &&
              !elements.infoMenuTrigger.contains(event.target)
            ) {
              closeInfoMenu();
            }
          });
        }

        function openInfoMenu() {
          if (!elements.infoMenuPanel || !elements.infoMenuTrigger) {
            return;
          }
          if (state.infoMenuCloseTimerId !== null) {
            window.clearTimeout(state.infoMenuCloseTimerId);
            state.infoMenuCloseTimerId = null;
          }
          elements.infoMenuPanel.hidden = false;
          window.requestAnimationFrame(() => {
            elements.infoMenuPanel?.classList.add("is-open");
          });
          elements.infoMenuTrigger.setAttribute("aria-expanded", "true");
        }

        function closeInfoMenu() {
          if (!elements.infoMenuPanel || !elements.infoMenuTrigger) {
            return;
          }
          elements.infoMenuPanel.classList.remove("is-open");
          elements.infoMenuTrigger.setAttribute("aria-expanded", "false");
          if (state.infoMenuCloseTimerId !== null) {
            window.clearTimeout(state.infoMenuCloseTimerId);
          }
          state.infoMenuCloseTimerId = window.setTimeout(() => {
            if (!elements.infoMenuPanel?.classList.contains("is-open")) {
              elements.infoMenuPanel.hidden = true;
            }
            state.infoMenuCloseTimerId = null;
          }, 240);
        }

        function initializeNavigation() {
          elements.navButtons.forEach((button) => {
            button.addEventListener("click", () => switchScreen(button.dataset.screen || "home"));
          });
          elements.homeLinks.forEach((button) => {
            button.addEventListener("click", () => switchScreen(button.dataset.homeLink || "home"));
          });
        }

        function initializeManagerMembers() {
          elements.managerMembersRefreshBtn?.addEventListener("click", () => {
            void loadManagerMembers();
          });
          elements.managerMemberSearchInput?.addEventListener("input", renderManagerMembers);
          elements.managerMembersList?.addEventListener("click", (event) => {
            const target = event.target instanceof Element
              ? event.target.closest("[data-manager-member-save], [data-manager-member-logout], [data-manager-member-delete], [data-manager-member-detail-toggle]")
              : null;
            if (!target) {
              return;
            }
            const card = target.closest("[data-manager-member-id]");
            if (!card) {
              return;
            }
            if (target.matches("[data-manager-member-detail-toggle]")) {
              toggleManagerMemberDetail(card);
              return;
            }
            if (target.matches("[data-manager-member-logout]")) {
              requestManagerMemberAction("logout", card.dataset.managerMemberId || "");
              return;
            }
            if (target.matches("[data-manager-member-delete]")) {
              requestManagerMemberAction("delete", card.dataset.managerMemberId || "");
              return;
            }
            void saveManagerMemberAccess(card.dataset.managerMemberId || "");
          });
          elements.managerMembersList?.addEventListener("change", (event) => {
            const target = event.target instanceof Element ? event.target.closest("[data-manager-member-role]") : null;
            if (!target) {
              return;
            }
            syncManagerMemberReviewCoinField(target.closest("[data-manager-member-id]"));
          });
          elements.managerMemberDialogButtons.forEach((button) => {
            button.addEventListener("click", () => {
              handleManagerMemberActionDialog(button.dataset.managerMemberDialogAction);
            });
          });
          elements.managerMemberActionDialog?.addEventListener("cancel", () => {
            state.pendingManagerMemberAction = null;
          });
        }

        function initializeStoreSettings() {
          elements.addAvaterItemBtn?.addEventListener("click", addManagerAvaterItem);
          elements.avaterItemImageDropzone?.addEventListener("click", () => {
            elements.avaterItemImageInput?.click();
          });
          elements.avaterItemImageDropzone?.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              elements.avaterItemImageInput?.click();
            }
          });
          elements.avaterItemImageInput?.addEventListener("change", async () => {
            await syncAvaterItemImageFromFile(elements.avaterItemImageInput?.files?.[0] || null);
          });
          elements.adjustAvaterItemImageBtn?.addEventListener("click", openAvaterItemImageAdjustDialog);
          elements.clearAvaterItemImageBtn?.addEventListener("click", clearAvaterItemImage);
          [
            elements.avaterItemImageScaleInput,
            elements.avaterItemImageScaleXInput,
            elements.avaterItemImageScaleYInput,
            elements.avaterItemImageOffsetXInput,
            elements.avaterItemImageOffsetYInput,
            elements.avaterItemImageRotateInput,
          ].forEach((input) => {
            input?.addEventListener("input", updateAvaterItemImageAdjustmentPreview);
          });
          elements.avaterItemImageAdjustButtons.forEach((button) => {
            button.addEventListener("click", () => {
              const action = button.dataset.avaterImageAdjustAction || "";
              if (action === "apply") {
                void applyAvaterItemImageAdjustment();
                return;
              }
              closeDialog(elements.avaterItemImageAdjustDialog);
            });
          });
          ["dragenter", "dragover"].forEach((eventName) => {
            elements.avaterItemImageDropzone?.addEventListener(eventName, (event) => {
              event.preventDefault();
              elements.avaterItemImageDropzone?.classList.add("is-dragover");
              if (event.dataTransfer) {
                event.dataTransfer.dropEffect = "copy";
              }
            });
          });
          ["dragleave", "dragend"].forEach((eventName) => {
            elements.avaterItemImageDropzone?.addEventListener(eventName, () => {
              elements.avaterItemImageDropzone?.classList.remove("is-dragover");
            });
          });
          elements.avaterItemImageDropzone?.addEventListener("drop", async (event) => {
            event.preventDefault();
            elements.avaterItemImageDropzone?.classList.remove("is-dragover");
            const file = Array.from(event.dataTransfer?.files || []).find((item) => item.type.startsWith("image/")) || null;
            await syncAvaterItemImageFromFile(file);
          });
          elements.managerAvaterItemList?.addEventListener("click", (event) => {
            const target = event.target instanceof Element ? event.target : null;
            const deleteButton = target?.closest("[data-manager-avater-delete]");
            if (deleteButton) {
              event.stopPropagation();
              deleteManagerAvaterItem(deleteButton.dataset.managerAvaterDelete || "");
              return;
            }
            const categoryButton = target?.closest("[data-manager-avater-category]");
            if (categoryButton) {
              state.activeAvaterCategory = normalizeManagerAvaterCategory(categoryButton.dataset.managerAvaterCategory);
              state.activeStoreItemId = "";
              renderManagerAvaterItems();
              return;
            }
            const itemCard = target?.closest("[data-manager-avater-item]");
            if (!itemCard) {
              return;
            }
            const itemId = itemCard.dataset.managerAvaterItem || "";
            state.activeStoreItemId = state.activeStoreItemId === itemId ? "" : itemId;
            renderManagerAvaterItems();
          });
          elements.managerAvaterItemList?.addEventListener("keydown", (event) => {
            if (event.key !== "Enter" && event.key !== " ") {
              return;
            }
            const itemCard = event.target instanceof Element ? event.target.closest("[data-manager-avater-item]") : null;
            if (!itemCard) {
              return;
            }
            event.preventDefault();
            const itemId = itemCard.dataset.managerAvaterItem || "";
            state.activeStoreItemId = state.activeStoreItemId === itemId ? "" : itemId;
            renderManagerAvaterItems();
          });
        }

        function initializeStoreTabs() {
          elements.storeTabButtons.forEach((button) => {
            button.addEventListener("click", () => {
              setManagerStoreTab(button.dataset.storeTab || "create");
            });
          });
          setManagerStoreTab(state.activeStoreTab);
        }

        function setManagerStoreTab(tabName) {
          const normalizedTab = tabName === "manage" ? "manage" : "create";
          state.activeStoreTab = normalizedTab;
          elements.storeTabButtons.forEach((button) => {
            const isActive = button.dataset.storeTab === normalizedTab;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-selected", String(isActive));
          });
          elements.storeTabPanels.forEach((panel) => {
            panel.hidden = panel.dataset.storeTabPanel !== normalizedTab;
          });
          if (normalizedTab === "manage") {
            renderManagerAvaterItems();
          }
        }

        function normalizeManagerRoleValue(value) {
          if (typeof value !== "string") {
            return "";
          }
          const normalized = value.trim().toLowerCase().replace(/[\s-]/g, "_");
          const compact = normalized.replace(/_/g, "");
          return MANAGER_ROLE_ALIASES[normalized] || MANAGER_ROLE_ALIASES[compact] || "";
        }

        function getManagerRoleFromValue(value) {
          if (Array.isArray(value)) {
            return value.map(getManagerRoleFromValue).find(Boolean) || "";
          }
          if (value && typeof value === "object") {
            const directRole = [
              value.role,
              value.managerRole,
              value.manager_role,
              value.roleName,
              value.role_name,
              value.roles,
              value.managerRoles,
              value.manager_roles,
            ]
              .map(getManagerRoleFromValue)
              .find(Boolean);
            if (directRole) {
              return directRole;
            }
            return MANAGER_ROLE_IDS.find((role) => value[role] === true || value[role] === "true") || "";
          }
          return normalizeManagerRoleValue(value);
        }

        function getManagerAccessMember(access) {
          if (!access || typeof access !== "object" || Array.isArray(access)) {
            return null;
          }
          const candidates = [
            access.member,
            access.managerMember,
            access.manager_member,
            access.profile,
            access.user,
          ];
          return candidates.find((candidate) => candidate && typeof candidate === "object" && !Array.isArray(candidate)) || null;
        }

        function getManagerAccessRole(access) {
          const member = getManagerAccessMember(access);
          const candidates = [
            access?.role,
            access?.managerRole,
            access?.manager_role,
            access?.roleName,
            access?.role_name,
            access?.roles,
            access?.managerRoles,
            access?.manager_roles,
            access?.status,
            access?.app_metadata,
            access?.permissions?.role,
            access?.permissions?.managerRole,
            access?.permissions,
            member?.role,
            member?.managerRole,
            member?.manager_role,
            member?.roleName,
            member?.role_name,
            member?.roles,
            member?.managerRoles,
            member?.manager_roles,
            member?.app_metadata,
            member?.permissions?.role,
            member?.permissions,
          ];
          return candidates.map(getManagerRoleFromValue).find(Boolean) || "";
        }

        function normalizeManagerAccessPayload(access) {
          if (!access || typeof access !== "object" || Array.isArray(access)) {
            return null;
          }
          const role = getManagerAccessRole(access);
          const member = getManagerAccessMember(access);
          const normalizedMember = member || role ? { ...(member || {}), role: role || member?.role || "" } : null;
          return {
            ...access,
            canAccess: access.canAccess === false ? false : Boolean(role),
            status: access.status || (role ? "member" : "user"),
            role,
            ...(normalizedMember ? { member: normalizedMember } : {}),
          };
        }

        function getSeededManagerAccess() {
          return normalizeManagerAccessPayload(window.__THE_REVIEW_MANAGER_ACCESS__);
        }

        function applyManagerAccess(access) {
          const normalizedAccess = normalizeManagerAccessPayload(access);
          if (!normalizedAccess || !getManagerAccessRole(normalizedAccess)) {
            return false;
          }
          state.managerAccess = normalizedAccess;
          applyManagerProfileFromAccess(normalizedAccess);
          renderManagerAccess();
          return true;
        }

        async function initializeManagerAccess() {
          const seededAccess = getSeededManagerAccess();
          if (seededAccess) {
            applyManagerAccess(seededAccess);
          }

          let token = null;
          try {
            token = await getAuth0AccessToken();
          } catch {
            token = null;
          }
          if (!token) {
            if (seededAccess) {
              return;
            }
            state.managerAccess = {
              canAccess: false,
              status: "local",
              role: null,
            };
            renderManagerAccess();
            return;
          }

          try {
            const response = await fetch(`${resolveApiBase()}/manager/me`, {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            });
            const json = await response.json().catch(() => null);
            state.managerAccess =
              normalizeManagerAccessPayload(response.ok ? json : null) ||
              seededAccess ||
              {
                canAccess: false,
                status: "error",
                role: null,
              };
          } catch {
            state.managerAccess = seededAccess || {
              canAccess: false,
              status: "offline",
              role: null,
            };
          }
          applyManagerProfileFromAccess(state.managerAccess);
          await loadReviewDataSnapshotFromApi(token);
          renderManagerAccess();
        }

        function renderManagerAccess() {
          const access = state.managerAccess;
          const role = getManagerAccessRole(access);
          if (elements.profileRoleValue) {
            elements.profileRoleValue.textContent = !access
              ? "確認中"
              : role
                ? MANAGER_ROLE_LABELS[role] || role
                : MANAGER_ROLE_LABELS.user;
          }

          if (elements.managerMembersPanel) {
            elements.managerMembersPanel.hidden = role !== "owner" || access?.canAccess !== true;
          }
          if (role === "owner" && access?.canAccess === true) {
            void loadManagerMembers();
          } else if (state.activeScreen === "members") {
            void loadManagerMembers();
          }
          document.querySelector("#screen-home .manager-access-note")?.remove();

          const shouldRestrict = !access || access.canAccess === false;
          const allowedScreens = new Set(["home"]);
          elements.navButtons.forEach((button) => {
            button.disabled = shouldRestrict && !allowedScreens.has(button.dataset.screen || "");
          });
          elements.homeLinks.forEach((button) => {
            button.disabled = shouldRestrict && !allowedScreens.has(button.dataset.homeLink || "");
          });

          if (!access || !shouldRestrict) {
            return;
          }

          const panel = document.querySelector("#screen-home .panel");
          if (panel && !panel.querySelector(".manager-access-note")) {
            const note = document.createElement("p");
            note.className = "hint-text manager-access-note";
            note.textContent =
              "The Review Managerは役割が付与されると利用できます。オーナーに権限が付与されているか確認してください。";
            panel.append(note);
          }
        }

        function canManageManagerMembers() {
          return state.managerAccess?.canAccess === true && getManagerAccessRole(state.managerAccess) === "owner";
        }

        function loadStoreConfig() {
          try {
            const raw = window.localStorage.getItem(STORE_CONFIG_KEY);
            return normalizeStoreConfig(raw ? JSON.parse(raw) : null);
          } catch {
            return normalizeStoreConfig(null);
          }
        }

        function normalizeStoreConfig(value) {
          const avatarStatus = normalizeStoreAvatarStatus(value?.avatarStatus);
          const avatarMessage = typeof value?.avatarMessage === "string" && value.avatarMessage.trim()
            ? value.avatarMessage.trim()
            : avatarStatus === "published"
              ? "公開中"
              : DEFAULT_STORE_CONFIG.avatarMessage;
          return {
            avatarStatus,
            avatarMessage,
          };
        }

        function normalizeStoreAvatarStatus(value) {
          return value === "published" ? "published" : "preparing";
        }

        function renderStoreSettings() {
          renderManagerAvaterItems();
        }

        function renderStorePreviewFromForm() {
          renderManagerAvaterItems();
        }

        function renderStorePreview(config = loadStoreConfig()) {
          renderManagerAvaterItems();
        }

        function saveStoreSettings() {
          renderManagerAvaterItems();
        }

        function loadManagerAvaterItems() {
          return loadJson(AVATER_CUSTOM_ITEMS_KEY, []);
        }

        function saveManagerAvaterItems(items) {
          saveJson(AVATER_CUSTOM_ITEMS_KEY, items);
        }

        function addManagerAvaterItem() {
          const name = String(elements.avaterItemNameInput?.value || "").trim();
          const category = normalizeManagerAvaterCategory(elements.avaterItemCategorySelect?.value);
          const cost = Math.max(0, Math.floor(Number(elements.avaterItemCostInput?.value) || 0));
          const image = state.avaterItemImageData ? { ...state.avaterItemImageData } : null;
          if (!name) {
            if (elements.storeConfigFeedback) {
              elements.storeConfigFeedback.textContent = "アイテム名を入力してください。";
            }
            return;
          }
          const items = loadManagerAvaterItems();
          items.push({
            id: `custom-${Date.now().toString(36)}`,
            name,
            category,
            cost,
            image,
          });
          saveManagerAvaterItems(items);
          if (elements.avaterItemNameInput) {
            elements.avaterItemNameInput.value = "";
          }
          clearAvaterItemImage();
          if (elements.storeConfigFeedback) {
            elements.storeConfigFeedback.textContent = "Avaterアイテムを追加しました。";
          }
          renderManagerAvaterItems();
        }

        function deleteManagerAvaterItem(itemId) {
          const normalizedId = String(itemId || "").trim();
          if (!normalizedId) {
            return;
          }
          const items = loadManagerAvaterItems();
          const nextItems = items.filter((item) => item.id !== normalizedId);
          if (nextItems.length === items.length) {
            return;
          }
          saveManagerAvaterItems(nextItems);
          state.activeStoreItemId = "";
          if (elements.storeConfigFeedback) {
            elements.storeConfigFeedback.textContent = "アイテムを削除しました。";
          }
          renderManagerAvaterItems();
        }

        function normalizeManagerAvaterCategory(value) {
          const category = String(value || "").trim();
          return Object.prototype.hasOwnProperty.call(MANAGER_AVATER_CATEGORY_LABELS, category) ? category : "accessory";
        }

        async function syncAvaterItemImageFromFile(file) {
          if (!file) {
            return;
          }
          if (!file.type.startsWith("image/")) {
            if (elements.storeConfigFeedback) {
              elements.storeConfigFeedback.textContent = "画像ファイルを選択してください。";
            }
            return;
          }
          try {
            const dataUrl = await fileToDataUrl(file);
            const transform = createDefaultAvaterImageTransform();
            const adjusted = await renderAdjustedAvaterImage(dataUrl, transform);
            state.avaterItemImageData = {
              name: file.name,
              type: file.type,
              size: adjusted.size,
              dataUrl: adjusted.dataUrl,
              sourceDataUrl: dataUrl,
              transform,
            };
            renderAvaterItemImagePreview();
            openAvaterItemImageAdjustDialog();
            if (elements.storeConfigFeedback) {
              elements.storeConfigFeedback.textContent = "";
            }
          } catch {
            state.avaterItemImageData = null;
            renderAvaterItemImagePreview();
            if (elements.storeConfigFeedback) {
              elements.storeConfigFeedback.textContent = "画像の読み込みに失敗しました。";
            }
          }
        }

        function createDefaultAvaterImageTransform() {
          return {
            scale: 100,
            scaleX: 100,
            scaleY: 100,
            offsetX: 0,
            offsetY: 0,
            rotate: 0,
          };
        }

        function normalizeAvaterImageTransform(transform) {
          const fallback = createDefaultAvaterImageTransform();
          const clampNumber = (value, min, max, fallbackValue) => {
            const number = Number(value);
            if (!Number.isFinite(number)) {
              return fallbackValue;
            }
            return Math.min(max, Math.max(min, number));
          };
          return {
            scale: clampNumber(transform?.scale, 40, 220, fallback.scale),
            scaleX: clampNumber(transform?.scaleX, 60, 160, fallback.scaleX),
            scaleY: clampNumber(transform?.scaleY, 60, 160, fallback.scaleY),
            offsetX: clampNumber(transform?.offsetX, -120, 120, fallback.offsetX),
            offsetY: clampNumber(transform?.offsetY, -120, 120, fallback.offsetY),
            rotate: clampNumber(transform?.rotate, -45, 45, fallback.rotate),
          };
        }

        function readAvaterImageTransformInputs() {
          return normalizeAvaterImageTransform({
            scale: elements.avaterItemImageScaleInput?.value,
            scaleX: elements.avaterItemImageScaleXInput?.value,
            scaleY: elements.avaterItemImageScaleYInput?.value,
            offsetX: elements.avaterItemImageOffsetXInput?.value,
            offsetY: elements.avaterItemImageOffsetYInput?.value,
            rotate: elements.avaterItemImageRotateInput?.value,
          });
        }

        function setAvaterImageTransformInputs(transform) {
          const normalized = normalizeAvaterImageTransform(transform);
          if (elements.avaterItemImageScaleInput) {
            elements.avaterItemImageScaleInput.value = String(normalized.scale);
          }
          if (elements.avaterItemImageScaleXInput) {
            elements.avaterItemImageScaleXInput.value = String(normalized.scaleX);
          }
          if (elements.avaterItemImageScaleYInput) {
            elements.avaterItemImageScaleYInput.value = String(normalized.scaleY);
          }
          if (elements.avaterItemImageOffsetXInput) {
            elements.avaterItemImageOffsetXInput.value = String(normalized.offsetX);
          }
          if (elements.avaterItemImageOffsetYInput) {
            elements.avaterItemImageOffsetYInput.value = String(normalized.offsetY);
          }
          if (elements.avaterItemImageRotateInput) {
            elements.avaterItemImageRotateInput.value = String(normalized.rotate);
          }
        }

        function openAvaterItemImageAdjustDialog() {
          const imageData = state.avaterItemImageData;
          if (!imageData) {
            return;
          }
          setAvaterImageTransformInputs(imageData.transform);
          updateAvaterItemImageAdjustmentPreview();
          showDialog(elements.avaterItemImageAdjustDialog);
        }

        function updateAvaterItemImageAdjustmentPreview() {
          const imageData = state.avaterItemImageData;
          if (!elements.avaterItemAdjustImage || !imageData) {
            return;
          }
          const transform = readAvaterImageTransformInputs();
          const previewScaleX = (transform.scale / 100) * (transform.scaleX / 100);
          const previewScaleY = (transform.scale / 100) * (transform.scaleY / 100);
          elements.avaterItemAdjustImage.src = imageData.sourceDataUrl || imageData.dataUrl || "";
          elements.avaterItemAdjustImage.alt = imageData.name || "";
          elements.avaterItemAdjustImage.style.setProperty("--image-adjust-x", `${transform.offsetX}px`);
          elements.avaterItemAdjustImage.style.setProperty("--image-adjust-y", `${transform.offsetY}px`);
          elements.avaterItemAdjustImage.style.setProperty("--image-adjust-rotate", `${transform.rotate}deg`);
          elements.avaterItemAdjustImage.style.setProperty("--image-adjust-scale-x", String(previewScaleX));
          elements.avaterItemAdjustImage.style.setProperty("--image-adjust-scale-y", String(previewScaleY));
        }

        async function applyAvaterItemImageAdjustment() {
          const imageData = state.avaterItemImageData;
          if (!imageData) {
            closeDialog(elements.avaterItemImageAdjustDialog);
            return;
          }
          const transform = readAvaterImageTransformInputs();
          try {
            const adjusted = await renderAdjustedAvaterImage(imageData.sourceDataUrl || imageData.dataUrl, transform);
            state.avaterItemImageData = {
              ...imageData,
              dataUrl: adjusted.dataUrl,
              size: adjusted.size,
              transform,
            };
            renderAvaterItemImagePreview();
            closeDialog(elements.avaterItemImageAdjustDialog);
          } catch {
            if (elements.storeConfigFeedback) {
              elements.storeConfigFeedback.textContent = "画像の調整を反映できませんでした。";
            }
          }
        }

        async function renderAdjustedAvaterImage(sourceDataUrl, transform) {
          const image = await loadImageElement(sourceDataUrl);
          const canvas = document.createElement("canvas");
          const width = 512;
          const height = 384;
          canvas.width = width;
          canvas.height = height;
          const context = canvas.getContext("2d");
          if (!context) {
            throw new Error("canvas-context-unavailable");
          }
          context.clearRect(0, 0, width, height);
          context.save();
          context.translate(width / 2 + transform.offsetX * 1.7, height / 2 + transform.offsetY * 1.7);
          context.rotate((transform.rotate * Math.PI) / 180);
          const baseScale = 340 / Math.max(1, image.naturalWidth, image.naturalHeight);
          const scale = transform.scale / 100;
          context.scale(baseScale * scale * (transform.scaleX / 100), baseScale * scale * (transform.scaleY / 100));
          context.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);
          context.restore();
          const dataUrl = canvas.toDataURL("image/png");
          return {
            dataUrl,
            size: estimateDataUrlByteSize(dataUrl),
          };
        }

        function loadImageElement(src) {
          return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = () => reject(new Error("image-load-failed"));
            image.src = src;
          });
        }

        function estimateDataUrlByteSize(dataUrl) {
          const payload = String(dataUrl || "").split(",")[1] || "";
          return Math.max(0, Math.floor((payload.length * 3) / 4));
        }

        function renderAvaterItemImagePreview() {
          const imageData = state.avaterItemImageData;
          if (elements.avaterItemImagePreview) {
            elements.avaterItemImagePreview.hidden = !imageData;
            elements.avaterItemImagePreview.src = imageData?.dataUrl || "";
            elements.avaterItemImagePreview.alt = imageData?.name || "";
          }
          if (elements.avaterItemImageEmpty) {
            elements.avaterItemImageEmpty.hidden = Boolean(imageData);
          }
          if (elements.avaterItemImageMeta) {
            const sizeKb = imageData?.size ? Math.max(1, Math.round(imageData.size / 1024)) : 0;
            elements.avaterItemImageMeta.textContent = imageData ? `${imageData.name} (${sizeKb}KB)` : "";
          }
          if (elements.adjustAvaterItemImageBtn) {
            elements.adjustAvaterItemImageBtn.disabled = !imageData;
          }
        }

        function clearAvaterItemImage() {
          state.avaterItemImageData = null;
          if (elements.avaterItemImageInput) {
            elements.avaterItemImageInput.value = "";
          }
          closeDialog(elements.avaterItemImageAdjustDialog);
          renderAvaterItemImagePreview();
        }

        function getManagerAvaterItemImage(item) {
          const image = item?.image;
          return image && typeof image.dataUrl === "string" && image.dataUrl ? image : null;
        }

        function renderManagerAvaterItems() {
          if (!elements.managerAvaterItemList) {
            return;
          }
          const items = loadManagerAvaterItems();
          const activeCategory = normalizeManagerAvaterCategory(state.activeAvaterCategory);
          const categoryTabs = Object.entries(MANAGER_AVATER_CATEGORY_LABELS)
            .map(([category, label]) => {
              const isActive = category === activeCategory;
              return `<button class="avater-category-tab ${isActive ? "is-active" : ""}" type="button" data-manager-avater-category="${escapeHtml(category)}" aria-pressed="${String(isActive)}">${escapeHtml(label)}</button>`;
            })
            .join("");
          const visibleItems = items.filter((item) => normalizeManagerAvaterCategory(item.category) === activeCategory);
          const cards = visibleItems
            .map(
              (item) => {
                const category = normalizeManagerAvaterCategory(item.category);
                const isActive = item.id === state.activeStoreItemId;
                const image = getManagerAvaterItemImage(item);
                return `
                <article
                  class="manager-store-item${isActive ? " is-active" : ""}"
                  data-manager-avater-item="${escapeHtml(item.id)}"
                  role="button"
                  tabindex="0"
                  aria-label="${escapeHtml(item.name || "未設定")}の操作"
                >
                  ${
                    image
                      ? `<img class="manager-store-item-image" src="${escapeHtml(image.dataUrl)}" alt="" />`
                      : `<span class="manager-store-item-image avater-item-custom avater-category-${escapeHtml(category)}" aria-hidden="true"></span>`
                  }
                  <div class="manager-store-item-main">
                    <h3>${escapeHtml(item.name || "未設定")}</h3>
                    <p>${escapeHtml(MANAGER_AVATER_CATEGORY_LABELS[category])}</p>
                    <p class="manager-store-price"><img src="./assets/icons/coin.png?v=20260326-1" alt="" aria-hidden="true" />${escapeHtml(String(item.cost || 0))}</p>
                  </div>
                  ${
                    isActive
                      ? `<div class="manager-store-delete-bubble" role="dialog" aria-label="アイテム削除">
                          <button type="button" data-manager-avater-delete="${escapeHtml(item.id)}">このアイテムを削除する</button>
                        </div>`
                      : ""
                  }
                </article>
              `;
              },
            )
            .join("");
          elements.managerAvaterItemList.innerHTML = `
            <div class="avater-category-tabs" role="tablist" aria-label="Avaterカテゴリー">${categoryTabs}</div>
            <div class="manager-published-avater-items">
              ${cards || '<p class="hint-text">追加されたAvaterアイテムはありません。</p>'}
            </div>
          `;
        }

        async function loadManagerMembers() {
          if (!canManageManagerMembers()) {
            if (elements.managerMembersPanel) {
              elements.managerMembersPanel.hidden = false;
            }
            if (elements.managerMembersStatus) {
              elements.managerMembersStatus.textContent = "ユーザー管理はOwnerのみ利用できます。";
            }
            if (elements.managerMembersList) {
              elements.managerMembersList.innerHTML = "";
            }
            return;
          }

          elements.managerMembersPanel.hidden = false;
          elements.managerMembersStatus.textContent = "読み込み中です。";

          const token = await getAuth0AccessToken();
          if (!token) {
            elements.managerMembersStatus.textContent = "ログイン情報を確認できませんでした。";
            return;
          }

          try {
            const response = await fetch(`${resolveApiBase()}/manager/members`, {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            });
            if (!response.ok) {
              throw new Error(`API ${response.status}`);
            }
            const members = await response.json();
            state.managerMembers = Array.isArray(members) ? members : [];
            renderManagerMembers();
          } catch {
            elements.managerMembersStatus.textContent = "ユーザー一覧を取得できませんでした。";
          }
        }

        function renderManagerMembers() {
          if (!elements.managerMembersList || !elements.managerMembersStatus) {
            return;
          }

          const query = normalizeManagerMemberSearchText(elements.managerMemberSearchInput?.value || "");
          const visibleMembers = query
            ? state.managerMembers.filter((member) =>
                getManagerMemberSearchValues(member)
                  .map(normalizeManagerMemberSearchText)
                  .some((value) => value.includes(query)),
              )
            : state.managerMembers;

          if (state.managerMembers.length === 0) {
            elements.managerMembersStatus.textContent = "表示できるユーザーはいません。";
            elements.managerMembersList.innerHTML = "";
            return;
          }

          elements.managerMembersStatus.textContent = visibleMembers.length
            ? "ユーザーのReview Dataを編集できます。"
            : "一致するユーザーはいません。";
          elements.managerMembersList.innerHTML = visibleMembers
            .map((member) => {
              const id = member?.id || "";
              const roleValue = member?.role || "user";
              const name = getManagerMemberNickname(member);
              const sub = member?.email || member?.auth0_sub || "";
              const reviewCoin = getManagerMemberReviewCoin(member);
              const hasUnlimitedReviewCoins = roleValue !== "user";
              const reviewDays = getManagerMemberReviewDays(member);
              const roleLabel = MANAGER_ROLE_LABELS[roleValue] || MANAGER_ROLE_LABELS.user;
              const roleTag = roleValue && roleValue !== "user"
                ? `<span class="manager-member-role-tag">${escapeHtml(roleLabel)}</span>`
                : "";
              const roleOptions = Object.entries(MANAGER_ROLE_LABELS)
                .map(([value, label]) => `<option value="${escapeHtml(value)}" ${value === roleValue ? "selected" : ""}>${escapeHtml(label)}</option>`)
                .join("");

              return `
                <article class="manager-member-card" data-manager-member-id="${escapeHtml(id)}">
                  <div class="manager-member-avatar avater-preview" aria-hidden="true">
                    <img class="avater-base-image" src="./assets/avater/らーん1-1.png" alt="" />
                  </div>
                  <div class="manager-member-main">
                    <div class="manager-member-identity${roleTag ? "" : " has-no-role-tag"}">
                      ${roleTag}
                      <p class="manager-member-name">${escapeHtml(name)}</p>
                      <p class="manager-member-sub">${escapeHtml(sub)}</p>
                    </div>
                    <div class="manager-member-actions">
                      <button class="primary black-button manager-member-detail-toggle" type="button" data-manager-member-detail-toggle aria-expanded="false">
                        <span class="material-symbols-rounded" aria-hidden="true">edit</span>
                        <span>Review Dataを編集する</span>
                      </button>
                    </div>
                  </div>
                  <div class="manager-member-detail" data-manager-member-detail hidden>
                    <div class="manager-member-detail-grid">
                      <label class="manager-member-detail-field is-wide">
                        <span>Review Data（JSON）</span>
                        <textarea data-manager-member-review-data-json spellcheck="false">${escapeHtml(stringifyManagerJson(getManagerMemberReviewData(member)))}</textarea>
                      </label>
                      <label class="manager-member-detail-field is-wide">
                        <span>役割</span>
                        <select data-manager-member-role aria-label="役割">${roleOptions}</select>
                      </label>
                      <label class="manager-member-detail-field manager-member-review-coin-field${hasUnlimitedReviewCoins ? " is-unlimited" : ""}">
                        <span>Review Coin</span>
                        <input
                          data-manager-member-review-coin
                          type="${hasUnlimitedReviewCoins ? "text" : "number"}"
                          inputmode="${hasUnlimitedReviewCoins ? "text" : "numeric"}"
                          min="0"
                          step="1"
                          value="${escapeHtml(hasUnlimitedReviewCoins ? "∞枚" : String(reviewCoin))}"
                          data-review-coin-value="${escapeHtml(String(reviewCoin))}"
                          ${hasUnlimitedReviewCoins ? "disabled" : ""}
                        />
                      </label>
                      <label class="manager-member-detail-field">
                        <span>リビュー日数</span>
                        <input data-manager-member-review-days type="number" inputmode="numeric" min="0" step="1" value="${escapeHtml(String(reviewDays))}" />
                      </label>
                      <label class="manager-member-detail-field">
                        <span>Nickname</span>
                        <input data-manager-member-nickname type="text" value="${escapeHtml(getManagerMemberRawNickname(member))}" />
                      </label>
                      <label class="manager-member-detail-field">
                        <span>メールアドレス</span>
                        <input data-manager-member-email type="email" value="${escapeHtml(getManagerMemberEmail(member))}" />
                      </label>
                      <label class="manager-member-detail-field is-wide">
                        <span>カラーテーマ・Education Code・購入状況など（JSON）</span>
                        <textarea data-manager-member-settings-json spellcheck="false">${escapeHtml(stringifyManagerJson(getManagerMemberSettings(member)))}</textarea>
                      </label>
                      <label class="manager-member-detail-field is-wide">
                        <span>Avater（JSON）</span>
                        <textarea data-manager-member-avater-json spellcheck="false">${escapeHtml(stringifyManagerJson(getManagerMemberAvaterState(member).avater))}</textarea>
                      </label>
                    </div>
                    <div class="manager-member-detail-actions">
                      <button class="secondary white-button" type="button" data-manager-member-logout>
                        <span class="material-symbols-rounded" aria-hidden="true">logout</span>
                        <span>ログアウト</span>
                      </button>
                      <button class="secondary white-button" type="button" data-manager-member-delete>
                        <span class="material-symbols-rounded" aria-hidden="true">delete</span>
                        <span>削除する</span>
                      </button>
                      <button class="primary" type="button" data-manager-member-save>
                        <span class="material-symbols-rounded" aria-hidden="true">save</span>
                        <span>保存する</span>
                      </button>
                    </div>
                  </div>
                </article>
              `;
            })
            .join("");
          renderManagerMemberAvaterPreviews(visibleMembers);
        }

        function getManagerMemberRawNickname(member) {
          const candidates = [
            member?.nickname,
            member?.profile?.nickname,
            member?.user_metadata?.nickname,
            member?.display_name,
            member?.name,
          ];
          const nickname = candidates
            .map((value) => String(value || "").trim())
            .find((value) => value && !looksLikeAuth0Subject(value));
          return nickname || "";
        }

        function getManagerMemberNickname(member) {
          return getManagerMemberRawNickname(member) || "Nickname未設定";
        }

        function normalizeManagerMemberSearchText(value) {
          return String(value || "").trim().toLowerCase().replace(/[\s\u3000]+/g, "");
        }

        function getManagerMemberSearchValues(member) {
          const roleValue = member?.role || "user";
          const roleLabel = MANAGER_ROLE_LABELS[roleValue] || MANAGER_ROLE_LABELS.user;
          const roleAliases = Object.entries(MANAGER_ROLE_ALIASES)
            .filter(([, normalizedRole]) => normalizedRole === roleValue)
            .map(([alias]) => alias);
          return [
            getManagerMemberRawNickname(member),
            getManagerMemberNickname(member),
            member?.email,
            member?.auth0_sub,
            roleValue,
            roleLabel,
            ...roleAliases,
          ];
        }

        function getManagerMemberReviewCoin(member) {
          const value = Number(member?.reviewCoin ?? member?.review_coin ?? member?.data?.reviewCoin ?? 0);
          return Number.isFinite(value) && value >= 0 ? Math.floor(value) : 0;
        }

        function getManagerMemberReviewDays(member) {
          const directValue = Number(member?.reviewDays ?? member?.review_days);
          if (Number.isFinite(directValue) && directValue >= 0) {
            return Math.floor(directValue);
          }
          const loginDays = getManagerMemberLoginDays(member);
          return Object.keys(loginDays).length;
        }

        function getManagerMemberLoginDays(member) {
          const candidates = [
            member?.loginDays,
            member?.login_days,
            member?.reviewPeriod?.loginDays,
            member?.review_period?.loginDays,
            member?.data?.loginDays,
          ];
          const found = candidates.find((value) => value && typeof value === "object" && !Array.isArray(value));
          return found || {};
        }

        function getManagerMemberUnlimitedReviewCoins(member) {
          return Boolean(member?.hasUnlimitedReviewCoins ?? member?.has_unlimited_review_coins ?? member?.data?.hasUnlimitedReviewCoins);
        }

        function getManagerMemberEmail(member) {
          return String(member?.email ?? member?.data?.auth?.email ?? "");
        }

        function getManagerMemberEducationCodes(member) {
          const candidates = [
            member?.educationCodes,
            member?.education_codes,
            member?.settings?.educationCodes,
            member?.data?.settings?.educationCodes,
          ];
          const found = candidates.find((value) => Array.isArray(value));
          return found || [];
        }

        function getManagerMemberColorTheme(member) {
          return String(member?.colorTheme ?? member?.color_theme ?? member?.settings?.theme ?? member?.data?.settings?.theme ?? "");
        }

        function getManagerMemberSettings(member) {
          return getPlainManagerObject(member?.settings ?? member?.data?.settings);
        }

        function getManagerMemberReviewData(member) {
          return getPlainManagerObject(member?.reviewData ?? member?.review_data ?? member?.learningProgress ?? member?.data?.learningProgress);
        }

        function getPlainManagerObject(value) {
          return value && typeof value === "object" && !Array.isArray(value) ? value : {};
        }

        function stringifyManagerJson(value) {
          return JSON.stringify(getPlainManagerObject(value), null, 2);
        }

        function stringifyManagerJsonArray(value) {
          return JSON.stringify(Array.isArray(value) ? value : [], null, 2);
        }

        function readManagerJsonField(card, selector, label) {
          const raw = card?.querySelector(selector)?.value || "";
          if (!raw.trim()) {
            return {};
          }
          try {
            const parsed = JSON.parse(raw);
            if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
              throw new Error("object-required");
            }
            return parsed;
          } catch {
            throw new Error(`${label}のJSONを確認してください。`);
          }
        }

        function readManagerJsonArrayField(card, selector, label) {
          const raw = card?.querySelector(selector)?.value || "";
          if (!raw.trim()) {
            return [];
          }
          try {
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) {
              throw new Error("array-required");
            }
            return parsed.map((value) => String(value || "").trim()).filter(Boolean);
          } catch {
            throw new Error(`${label}のJSON配列を確認してください。`);
          }
        }

        function toggleManagerMemberDetail(card) {
          const detail = card?.querySelector("[data-manager-member-detail]");
          const button = card?.querySelector("[data-manager-member-detail-toggle]");
          if (!detail) {
            return;
          }
          const shouldOpen = detail.hidden;
          detail.hidden = !shouldOpen;
          button?.setAttribute("aria-expanded", String(shouldOpen));
        }

        function syncManagerMemberReviewCoinField(card) {
          const role = card?.querySelector("[data-manager-member-role]")?.value || "user";
          const field = card?.querySelector(".manager-member-review-coin-field");
          const input = card?.querySelector("[data-manager-member-review-coin]");
          if (!field || !input) {
            return;
          }
          const isUnlimited = role !== "user";
          const storedValue = input.dataset.reviewCoinValue || String(Number(input.value) || 0);
          input.dataset.reviewCoinValue = storedValue;
          field.classList.toggle("is-unlimited", isUnlimited);
          input.disabled = isUnlimited;
          input.type = isUnlimited ? "text" : "number";
          input.inputMode = isUnlimited ? "text" : "numeric";
          input.value = isUnlimited ? "∞枚" : storedValue;
        }

        function getManagerMemberAvaterState(member) {
          const avater = [member?.avater, member?.avatar, member?.data?.avater, member?.data?.avatar].find(
            (value) => value && typeof value === "object" && !Array.isArray(value),
          ) || {};
          const equipped = [member?.equippedAvater, member?.equipped_avater, avater?.equipped].find(
            (value) => value && typeof value === "object" && !Array.isArray(value),
          ) || {};
          const itemOffsets = avater?.itemOffsets && typeof avater.itemOffsets === "object" ? avater.itemOffsets : {};
          return { avater: { ...avater, equipped }, equipped, itemOffsets };
        }

        function renderManagerMemberAvaterPreviews(members) {
          if (!elements.managerMembersList) {
            return;
          }
          const managerItems = new Map(loadManagerAvaterItems().map((item) => [item.id, item]));
          members.forEach((member) => {
            const id = member?.id || "";
            const preview = elements.managerMembersList.querySelector(
              `[data-manager-member-id="${cssEscape(id)}"] .manager-member-avatar`,
            );
            if (!preview) {
              return;
            }
            const { equipped, itemOffsets } = getManagerMemberAvaterState(member);
            preview.querySelectorAll(".avater-layer").forEach((layer) => layer.remove());
            Object.entries(equipped).forEach(([category, itemId]) => {
              const itemIdText = String(itemId || "");
              const className = MANAGER_AVATER_ITEM_CLASSES[itemIdText] || (itemIdText.startsWith("custom-") ? "avater-item-custom" : "");
              if (!className) {
                return;
              }
              const managerItem = managerItems.get(itemIdText);
              const image = getManagerAvaterItemImage(managerItem);
              const offset = itemOffsets[itemIdText] || {};
              const layer = document.createElement("span");
              layer.className = `avater-layer ${className} avater-category-${category}${image ? " has-custom-image" : ""}`;
              layer.style.setProperty("--avater-item-offset-x", `${Number(offset.x) || 0}px`);
              layer.style.setProperty("--avater-item-offset-y", `${Number(offset.y) || 0}px`);
              layer.setAttribute("aria-hidden", "true");
              if (image) {
                const imageElement = document.createElement("img");
                imageElement.src = image.dataUrl;
                imageElement.alt = "";
                layer.append(imageElement);
              }
              preview.append(layer);
            });
          });
        }

        function looksLikeAuth0Subject(value) {
          return /^[a-z0-9_-]+\|/i.test(String(value || "").trim());
        }

        async function saveManagerMemberAccess(memberId) {
          if (!memberId || !canManageManagerMembers()) {
            return;
          }

          const card = Array.from(elements.managerMembersList?.querySelectorAll("[data-manager-member-id]") || []).find(
            (item) => item.dataset.managerMemberId === memberId
          );
          const role = card?.querySelector("[data-manager-member-role]")?.value || "user";
          const reviewCoinInput = card?.querySelector("[data-manager-member-review-coin]");
          const reviewCoin = Number(reviewCoinInput?.dataset.reviewCoinValue || reviewCoinInput?.value || 0);
          const reviewDays = Number(card?.querySelector("[data-manager-member-review-days]")?.value || 0);
          const nickname = card?.querySelector("[data-manager-member-nickname]")?.value.trim() || "";
          const email = card?.querySelector("[data-manager-member-email]")?.value.trim() || "";
          const saveButton = card?.querySelector("[data-manager-member-save]");
          if (saveButton) {
            saveButton.disabled = true;
          }
          elements.managerMembersStatus.textContent = "保存中です。";

          let settings;
          let avater;
          let reviewData;
          try {
            settings = readManagerJsonField(card, "[data-manager-member-settings-json]", "設定");
            avater = readManagerJsonField(card, "[data-manager-member-avater-json]", "Avater");
            reviewData = readManagerJsonField(card, "[data-manager-member-review-data-json]", "Review Data");
          } catch (error) {
            elements.managerMembersStatus.textContent = error?.message || "JSONを確認してください。";
            if (saveButton) {
              saveButton.disabled = false;
            }
            return;
          }

          const token = await getAuth0AccessToken();
          if (!token) {
            elements.managerMembersStatus.textContent = "ログイン情報を確認できませんでした。";
            if (saveButton) {
              saveButton.disabled = false;
            }
            return;
          }

          try {
            const response = await fetch(`${resolveApiBase()}/manager/members/${encodeURIComponent(memberId)}`, {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                role,
                nickname,
                reviewCoin: Number.isFinite(reviewCoin) && reviewCoin >= 0 ? Math.floor(reviewCoin) : 0,
                hasUnlimitedReviewCoins: role !== "user",
                reviewDays: Number.isFinite(reviewDays) && reviewDays >= 0 ? Math.floor(reviewDays) : 0,
                email,
                settings,
                avater,
                reviewData,
              }),
            });
            if (!response.ok) {
              throw new Error(`API ${response.status}`);
            }
            const updated = await response.json();
            state.managerMembers = state.managerMembers.map((member) => (member.id === memberId ? updated : member));
            elements.managerMembersStatus.textContent = "保存しました。";
            renderManagerMembers();
          } catch {
            elements.managerMembersStatus.textContent = "保存できませんでした。";
            if (saveButton) {
              saveButton.disabled = false;
            }
          }
        }

        function requestManagerMemberAction(action, memberId) {
          const normalizedAction = action === "delete" ? "delete" : action === "logout" ? "logout" : "";
          if (!normalizedAction || !memberId || !canManageManagerMembers()) {
            return;
          }
          const member = state.managerMembers.find((item) => item?.id === memberId);
          const name = getManagerMemberNickname(member);
          const copy =
            normalizedAction === "delete"
              ? {
                  title: "ユーザーを削除する",
                  message: `${name}をSupabaseから削除します。よろしいですか？`,
                  confirmText: "削除する",
                  confirmClass: "danger",
                }
              : {
                  title: "ログアウト",
                  message: `${name}をログアウト状態にします。よろしいですか？`,
                  confirmText: "ログアウト",
                  confirmClass: "primary",
                };
          state.pendingManagerMemberAction = { action: normalizedAction, memberId };
          if (!elements.managerMemberActionDialog || typeof elements.managerMemberActionDialog.showModal !== "function") {
            if (window.confirm(copy.message)) {
              void performManagerMemberAction(normalizedAction, memberId);
            } else {
              state.pendingManagerMemberAction = null;
            }
            return;
          }
          if (elements.managerMemberActionDialogTitle) {
            elements.managerMemberActionDialogTitle.textContent = copy.title;
          }
          if (elements.managerMemberActionDialogMessage) {
            elements.managerMemberActionDialogMessage.textContent = copy.message;
          }
          if (elements.managerMemberActionConfirmBtn) {
            elements.managerMemberActionConfirmBtn.classList.remove("primary", "danger");
            elements.managerMemberActionConfirmBtn.classList.add(copy.confirmClass);
            elements.managerMemberActionConfirmBtn.textContent = copy.confirmText;
          }
          if (!elements.managerMemberActionDialog.open) {
            elements.managerMemberActionDialog.showModal();
          }
        }

        function handleManagerMemberActionDialog(action) {
          const normalizedAction = typeof action === "string" ? action.trim().toLowerCase() : "";
          if (normalizedAction === "cancel") {
            state.pendingManagerMemberAction = null;
            closeManagerMemberActionDialog();
            return;
          }
          if (normalizedAction !== "confirm") {
            return;
          }
          const pendingAction = state.pendingManagerMemberAction;
          state.pendingManagerMemberAction = null;
          closeManagerMemberActionDialog();
          void performManagerMemberAction(pendingAction?.action, pendingAction?.memberId);
        }

        function closeManagerMemberActionDialog() {
          if (elements.managerMemberActionDialog?.open) {
            elements.managerMemberActionDialog.close();
          }
        }

        async function performManagerMemberAction(action, memberId) {
          if (action === "logout") {
            await logoutManagerMember(memberId);
            return;
          }
          if (action === "delete") {
            await deleteManagerMember(memberId);
          }
        }

        async function logoutManagerMember(memberId) {
          if (!memberId || !canManageManagerMembers()) {
            return;
          }
          const card = Array.from(elements.managerMembersList?.querySelectorAll("[data-manager-member-id]") || []).find(
            (item) => item.dataset.managerMemberId === memberId
          );
          setManagerMemberActionButtonsDisabled(card, true);
          elements.managerMembersStatus.textContent = "ログアウトを反映しています。";
          const token = await getAuth0AccessToken();
          if (!token) {
            elements.managerMembersStatus.textContent = "ログイン情報を確認できませんでした。";
            setManagerMemberActionButtonsDisabled(card, false);
            return;
          }
          try {
            const response = await fetch(`${resolveApiBase()}/manager/members/${encodeURIComponent(memberId)}`, {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({ loginStatus: "logged_out" }),
            });
            if (!response.ok) {
              throw new Error(`API ${response.status}`);
            }
            const updated = await response.json();
            state.managerMembers = state.managerMembers.map((member) => (member.id === memberId ? updated : member));
            elements.managerMembersStatus.textContent = "ログアウトを反映しました。";
            renderManagerMembers();
          } catch {
            elements.managerMembersStatus.textContent = "ログアウトを反映できませんでした。";
            setManagerMemberActionButtonsDisabled(card, false);
          }
        }

        async function deleteManagerMember(memberId) {
          if (!memberId || !canManageManagerMembers()) {
            return;
          }
          const card = Array.from(elements.managerMembersList?.querySelectorAll("[data-manager-member-id]") || []).find(
            (item) => item.dataset.managerMemberId === memberId
          );
          setManagerMemberActionButtonsDisabled(card, true);
          elements.managerMembersStatus.textContent = "削除しています。";
          const token = await getAuth0AccessToken();
          if (!token) {
            elements.managerMembersStatus.textContent = "ログイン情報を確認できませんでした。";
            setManagerMemberActionButtonsDisabled(card, false);
            return;
          }
          try {
            const response = await fetch(`${resolveApiBase()}/manager/members/${encodeURIComponent(memberId)}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            });
            if (!response.ok) {
              throw new Error(`API ${response.status}`);
            }
            state.managerMembers = state.managerMembers.filter((item) => item?.id !== memberId);
            elements.managerMembersStatus.textContent = "削除しました。";
            renderManagerMembers();
          } catch {
            elements.managerMembersStatus.textContent = "削除できませんでした。";
            setManagerMemberActionButtonsDisabled(card, false);
          }
        }

        function setManagerMemberActionButtonsDisabled(card, disabled) {
          card?.querySelectorAll("[data-manager-member-save], [data-manager-member-logout], [data-manager-member-delete]").forEach((button) => {
            button.disabled = Boolean(disabled);
          });
        }

        function switchScreen(screenName) {
          state.activeScreen = screenName;
          elements.screens.forEach((screen) => {
            const isActive = screen.id === `screen-${screenName}`;
            screen.classList.toggle("is-active", isActive);
            screen.hidden = !isActive;
          });
          elements.navButtons.forEach((button) => {
            button.classList.toggle("is-active", button.dataset.screen === screenName);
          });
          if (screenName === "members") {
            void loadManagerMembers();
          }
          notifyManagerScreenChange(screenName);
        }

        function notifyManagerScreenChange(screenName) {
          const normalizedScreen = Object.prototype.hasOwnProperty.call(MANAGER_SCREEN_TITLES, screenName) ? screenName : "home";
          const title = MANAGER_SCREEN_TITLES[normalizedScreen];
          const hostTitle = window.document.querySelector("#screen-manager > .page-title-row .page-script-title");
          if (hostTitle) {
            hostTitle.textContent = title;
          }
          window.dispatchEvent(
            new CustomEvent("the-review-manager-screen-change", {
              detail: {
                screen: normalizedScreen,
                title,
              },
            })
          );
        }

        function initializePublishedFilters() {
          const binders = Object.keys(NOTE_BY_BINDER);
          if (!elements.publishedBinderSelect || !elements.publishedNoteMenu) {
            return;
          }

          state.selectedListBinder = state.selectedListBinder || binders[0] || "";
          elements.publishedBinderSelect.innerHTML = binders
            .map((binder) => `<option value="${escapeHtml(binder)}">${escapeHtml(binder)}</option>`)
            .join("");
          elements.publishedBinderSelect.value = state.selectedListBinder;

          elements.publishedBinderSelect.addEventListener("change", () => {
            state.selectedListBinder = elements.publishedBinderSelect.value;
            state.selectedListNote = "";
            renderPublishedNoteMenu();
            renderQuestionList();
          });

          renderPublishedNoteMenu();
        }

        function initializeProblemTabs() {
          elements.problemTabButtons.forEach((button) => {
            button.addEventListener("click", () => {
              setProblemManagerTab(button.dataset.problemTab || "create");
            });
          });
          setProblemManagerTab(state.activeProblemTab);
        }

        function setProblemManagerTab(tabName) {
          const normalizedTab = tabName === "manage" ? "manage" : "create";
          state.activeProblemTab = normalizedTab;
          elements.problemTabButtons.forEach((button) => {
            const isActive = button.dataset.problemTab === normalizedTab;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-selected", String(isActive));
          });
          elements.problemTabPanels.forEach((panel) => {
            panel.hidden = panel.dataset.problemTabPanel !== normalizedTab;
          });
          if (normalizedTab === "manage") {
            renderPendingQuestionManager();
          }
        }

        function initializePendingQuestionManager() {
          elements.pendingQuestionList?.addEventListener("click", (event) => {
            const row = event.target instanceof Element ? event.target.closest("[data-pending-question-id]") : null;
            if (!row) {
              return;
            }
            state.selectedPendingQuestionId = row.dataset.pendingQuestionId || "";
            renderPendingQuestionManager();
          });
          elements.pendingQuestionSaveBtn?.addEventListener("click", () => {
            void savePendingQuestionEdit();
          });
          elements.pendingQuestionApproveBtn?.addEventListener("click", () => {
            void approveSelectedPendingQuestion();
          });
        }

        function renderPublishedNoteMenu() {
          if (!elements.publishedNoteMenu) {
            return;
          }
          const notes = NOTE_BY_BINDER[state.selectedListBinder] ?? [];
          if (!notes.includes(state.selectedListNote)) {
            state.selectedListNote = notes[0] || "";
          }

          elements.publishedNoteMenu.innerHTML = notes
            .map(
              (note) => `
                <button
                  class="published-note-button${note === state.selectedListNote ? " is-active" : ""}"
                  type="button"
                  role="option"
                  aria-selected="${note === state.selectedListNote ? "true" : "false"}"
                  data-note="${escapeHtml(note)}"
                >${escapeHtml(note)}</button>
              `,
            )
            .join("");

          elements.publishedNoteMenu.querySelectorAll("[data-note]").forEach((button) => {
            button.addEventListener("click", () => {
              state.selectedListNote = button.dataset.note || "";
              renderPublishedNoteMenu();
              renderQuestionList();
            });
          });
        }

        function updatePublishedChapterOptions() {
          if (!elements.publishedChapterSelect) {
            return;
          }
          const config = getChapterConfig(state.selectedListNote);
          if (elements.publishedChapterLabel) {
            elements.publishedChapterLabel.textContent = config.label;
          }

          const options = [{ value: "all", label: "すべて" }, ...config.options.map((option) => ({ value: option, label: option }))];
          if (!options.some((option) => option.value === state.selectedListChapter)) {
            state.selectedListChapter = "all";
          }
          elements.publishedChapterSelect.innerHTML = options
            .map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`)
            .join("");
          elements.publishedChapterSelect.value = state.selectedListChapter;
        }

        function initializeProblemForm() {
          populateBinderOptions();
          updateNoteOptions();

          elements.binderSelect?.addEventListener("change", () => {
            updateNoteOptions();
            renderNotebookEditorFrame();
            updateProblemPreview();
          });
          elements.noteSelect?.addEventListener("change", () => {
            syncBinderFromSelectedNote();
            updateChapterOptions();
            renderNotebookEditorFrame();
            updateProblemPreview();
          });
          [elements.textNumberInput, elements.textNameInput, elements.questionNumberInput, elements.questionNameInput].forEach((input) => {
            input?.addEventListener("input", updateProblemPreview);
          });

          elements.problemCsvLoadBtn?.addEventListener("click", () => {
            void loadProblemCsvImport();
          });
          elements.problemCsvInput?.addEventListener("change", () => {
            void loadProblemCsvImport();
          });
          elements.problemCsvSubmitMissingBtn?.addEventListener("click", () => {
            void submitMissingProblemCsvDrafts();
          });

          elements.textBlockAddButtons.forEach((button) => {
            button.addEventListener("click", () => {
              addTextBlock(button.dataset.addTextBlock || "body");
            });
          });
          initializeTextBlockList();

          elements.notebookEditorToolbar?.addEventListener("click", (event) => {
            const button = event.target instanceof Element ? event.target.closest("[data-add-notebook-block]") : null;
            if (!button) {
              return;
            }
            event.preventDefault();
            addNotebookBlock(button.dataset.addNotebookBlock || "text");
          });

          elements.editorToolbar?.addEventListener("click", (event) => {
            const button = event.target instanceof Element ? event.target.closest("button") : null;
            if (!button) {
              return;
            }
            event.preventDefault();

            const blockType = button.dataset.addNotebookBlock;
            if (blockType) {
              addNotebookBlock(blockType);
              return;
            }

            elements.problemEditor.focus();

            const command = button.dataset.command;
            if (command) {
              document.execCommand(command, false);
              updateEditorCounts();
              return;
            }

            const insertType = button.dataset.insert;
            if (insertType === "choice") {
              insertTextAtCursor("ア. \nイ. \nウ. ");
              updateEditorCounts();
            }
            if (insertType === "formula") {
              insertTextAtCursor(" $a^2 + b^2 = c^2$ ");
              updateEditorCounts();
            }
            if (insertType === "image") {
              elements.problemImageInput?.click();
            }
            if (insertType === "vector-graph") {
              openVectorGraphDialog();
            }
          });

          initializeVectorGraphEditor();

          elements.problemEditor.addEventListener("input", () => {
            updateEditorCounts();
          });

          initializeNotebookEditor();

          elements.problemImageInput?.addEventListener("change", async () => {
            await syncProblemImageFromInput({ insertIntoEditor: true });
          });

          elements.selectProblemImageBtn?.addEventListener("click", () => {
            elements.problemImageInput?.click();
          });

          elements.viewProblemImageBtn?.addEventListener("click", () => {
            showProblemImageDialog();
          });

          elements.clearProblemImageBtn?.addEventListener("click", () => {
            clearProblemImage();
          });

          elements.imageDialogButtons.forEach((button) => {
            button.addEventListener("click", () => {
              if (button.dataset.imageDialogAction === "clear") {
                clearProblemImage();
              }
              closeDialog(elements.problemImageDialog);
            });
          });

          elements.problemCreateForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            await prepareProblemConfirmation();
          });

          elements.saveProblemDraftBtn?.addEventListener("click", async () => {
            await saveProblemAsDraft();
          });

          elements.resetProblemFormBtn?.addEventListener("click", () => {
            showResetProblemDialog();
          });

          elements.resetDialogButtons.forEach((button) => {
            button.addEventListener("click", () => {
              if (button.dataset.resetDialogAction === "clear") {
                resetProblemComposer();
                elements.proofreadingFeedback.textContent = "";
              }
              closeDialog(elements.problemResetDialog);
            });
          });

          elements.confirmDialogButtons.forEach((button) => {
            button.addEventListener("click", async () => {
              if (button.dataset.confirmDialogAction === "submit") {
                await submitConfirmedProblem();
                return;
              }
              state.pendingProblemDraft = null;
              setProblemStep("create");
              closeDialog(elements.problemConfirmDialog);
            });
          });

          updateProblemPreview();
        }

        function initializeVectorGraphEditor() {
          if (!elements.vectorGraphSvg) {
            return;
          }
          renderVectorGraphGrid();
          renderVectorGraphLines();
          elements.vectorGraphSvg.addEventListener("pointerdown", handleVectorGraphPointerDown);
          elements.vectorGraphSvg.addEventListener("pointermove", handleVectorGraphPointerMove);
          elements.vectorGraphSvg.addEventListener("pointerup", finishVectorGraphPointer);
          elements.vectorGraphSvg.addEventListener("pointercancel", finishVectorGraphPointer);
          elements.vectorGraphActionButtons.forEach((button) => {
            button.addEventListener("click", () => {
              handleVectorGraphAction(button.dataset.vectorGraphAction || "");
            });
          });
        }

        function openVectorGraphDialog() {
          state.vectorGraphLines = [];
          state.vectorGraphPointerState = null;
          renderVectorGraphGrid();
          renderVectorGraphLines();
          showDialog(elements.vectorGraphDialog, () => {
            window.alert("グラフ作成ツールを開けませんでした。");
          });
        }

        function handleVectorGraphAction(action) {
          if (action === "cancel") {
            closeDialog(elements.vectorGraphDialog);
            return;
          }
          if (action === "undo") {
            state.vectorGraphLines.pop();
            renderVectorGraphLines();
            return;
          }
          if (action === "clear") {
            state.vectorGraphLines = [];
            renderVectorGraphLines();
            return;
          }
          if (action === "insert") {
            insertVectorGraphIntoEditor();
          }
        }

        function renderVectorGraphGrid() {
          if (!elements.vectorGraphGrid) {
            return;
          }
          const width = 640;
          const height = 400;
          const step = 40;
          elements.vectorGraphGrid.innerHTML = "";
          const fragment = document.createDocumentFragment();
          for (let x = 0; x <= width; x += step) {
            fragment.append(createSvgLine(x, 0, x, height, x === width / 2 ? "vector-axis-line" : "vector-grid-line"));
          }
          for (let y = 0; y <= height; y += step) {
            fragment.append(createSvgLine(0, y, width, y, y === height / 2 ? "vector-axis-line" : "vector-grid-line"));
          }
          elements.vectorGraphGrid.append(fragment);
        }

        function renderVectorGraphLines() {
          if (!elements.vectorGraphLines) {
            return;
          }
          elements.vectorGraphLines.innerHTML = "";
          const fragment = document.createDocumentFragment();
          state.vectorGraphLines.forEach((line) => {
            const element = createSvgLine(line.x1, line.y1, line.x2, line.y2, "vector-graph-line");
            const kind = line.kind === "answer" ? "answer" : "vector";
            element.dataset.lineKind = kind;
            if (kind === "vector") {
              element.setAttribute("marker-end", "url(#vectorGraphArrow)");
            }
            fragment.append(element);
          });
          elements.vectorGraphLines.append(fragment);
          if (elements.vectorGraphPreview) {
            elements.vectorGraphPreview.hidden = true;
          }
        }

        function createSvgLine(x1, y1, x2, y2, className) {
          const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("x1", String(x1));
          line.setAttribute("y1", String(y1));
          line.setAttribute("x2", String(x2));
          line.setAttribute("y2", String(y2));
          line.setAttribute("class", className);
          return line;
        }

        function handleVectorGraphPointerDown(event) {
          if (!(elements.vectorGraphSvg instanceof SVGSVGElement)) {
            return;
          }
          event.preventDefault();
          const point = getVectorGraphPointerPoint(event);
          state.vectorGraphPointerState = {
            pointerId: event.pointerId,
            start: point,
            current: point,
          };
          updateVectorGraphPreview(point, point);
          try {
            elements.vectorGraphSvg.setPointerCapture(event.pointerId);
          } catch {
            // Dragging continues with window pointer events where capture is unavailable.
          }
        }

        function handleVectorGraphPointerMove(event) {
          const pointerState = state.vectorGraphPointerState;
          if (!pointerState || pointerState.pointerId !== event.pointerId) {
            return;
          }
          event.preventDefault();
          pointerState.current = getVectorGraphPointerPoint(event);
          updateVectorGraphPreview(pointerState.start, pointerState.current);
        }

        function finishVectorGraphPointer(event) {
          const pointerState = state.vectorGraphPointerState;
          if (!pointerState || pointerState.pointerId !== event.pointerId) {
            return;
          }
          event.preventDefault();
          const end = getVectorGraphPointerPoint(event);
          const length = Math.hypot(end.x - pointerState.start.x, end.y - pointerState.start.y);
          if (length >= 16) {
            state.vectorGraphLines.push({
              x1: pointerState.start.x,
              y1: pointerState.start.y,
              x2: end.x,
              y2: end.y,
              kind: elements.vectorGraphModeSelect?.value === "answer" ? "answer" : "vector",
            });
          }
          state.vectorGraphPointerState = null;
          renderVectorGraphLines();
          try {
            elements.vectorGraphSvg?.releasePointerCapture(event.pointerId);
          } catch {
            // Nothing to release.
          }
        }

        function updateVectorGraphPreview(start, end) {
          if (!elements.vectorGraphPreview) {
            return;
          }
          elements.vectorGraphPreview.hidden = false;
          elements.vectorGraphPreview.setAttribute("x1", String(start.x));
          elements.vectorGraphPreview.setAttribute("y1", String(start.y));
          elements.vectorGraphPreview.setAttribute("x2", String(end.x));
          elements.vectorGraphPreview.setAttribute("y2", String(end.y));
        }

        function getVectorGraphPointerPoint(event) {
          const svg = elements.vectorGraphSvg;
          if (!(svg instanceof SVGSVGElement)) {
            return { x: 320, y: 200 };
          }
          const point = svg.createSVGPoint();
          point.x = event.clientX;
          point.y = event.clientY;
          const matrix = svg.getScreenCTM();
          const local = matrix ? point.matrixTransform(matrix.inverse()) : point;
          return snapVectorGraphPoint(local.x, local.y);
        }

        function snapVectorGraphPoint(x, y) {
          const step = 20;
          return {
            x: Math.max(0, Math.min(640, Math.round(x / step) * step)),
            y: Math.max(0, Math.min(400, Math.round(y / step) * step)),
          };
        }

        function insertVectorGraphIntoEditor() {
          if (!state.vectorGraphLines.length) {
            elements.proofreadingFeedback.textContent = "グラフに線を1本以上引いてください。";
            return;
          }
          const svg = buildVectorGraphSvgText(state.vectorGraphLines);
          const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
          insertProblemImageIntoEditor({
            name: "グラフ・ベクトル",
            dataUrl,
          });
          closeDialog(elements.vectorGraphDialog);
          elements.proofreadingFeedback.textContent = "";
        }

        function buildVectorGraphSvgText(lines) {
          const width = 640;
          const height = 400;
          const step = 40;
          const gridLines = [];
          for (let x = 0; x <= width; x += step) {
            gridLines.push(
              `<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="${x === width / 2 ? "#8a95a3" : "#dce6ef"}" stroke-width="${x === width / 2 ? 2 : 1}" />`,
            );
          }
          for (let y = 0; y <= height; y += step) {
            gridLines.push(
              `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="${y === height / 2 ? "#8a95a3" : "#dce6ef"}" stroke-width="${y === height / 2 ? 2 : 1}" />`,
            );
          }
          const graphLines = lines
            .map((line) => {
              const kind = line.kind === "answer" ? "answer" : "vector";
              const color = kind === "answer" ? "#0b7c4b" : "#1d4f91";
              const marker = kind === "vector" ? ' marker-end="url(#vectorGraphExportArrow)"' : "";
              return `<line x1="${line.x1}" y1="${line.y1}" x2="${line.x2}" y2="${line.y2}" stroke="${color}" stroke-width="${kind === "answer" ? 5 : 4}" stroke-linecap="round" stroke-linejoin="round"${marker} />`;
            })
            .join("");
          return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="グラフ・ベクトル"><defs><marker id="vectorGraphExportArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth"><path d="M 0 0 L 10 5 L 0 10 z" fill="#1d4f91"/></marker></defs><rect width="100%" height="100%" fill="#ffffff"/>${gridLines.join("")}${graphLines}</svg>`;
        }

        function initializeTextBlockList() {
          if (!elements.textBlockList) {
            return;
          }
          elements.textBlockList.addEventListener("input", (event) => {
            const blockCard = event.target instanceof Element ? event.target.closest("[data-text-block-id]") : null;
            const block = getTextBlockById(blockCard?.getAttribute("data-text-block-id") || "");
            if (!block) {
              return;
            }
            block.text = event.target?.textContent || "";
            updateProblemPreview();
          });
          elements.textBlockList.addEventListener("click", (event) => {
            const deleteButton = event.target instanceof Element ? event.target.closest("[data-delete-text-block]") : null;
            if (!deleteButton) {
              return;
            }
            deleteTextBlock(deleteButton.getAttribute("data-delete-text-block") || "");
          });
          elements.textBlockList.addEventListener("dragstart", (event) => {
            const blockCard = event.target instanceof Element ? event.target.closest("[data-text-block-id]") : null;
            if (!(blockCard instanceof HTMLElement)) {
              return;
            }
            state.draggingTextBlockId = blockCard.dataset.textBlockId || "";
            blockCard.classList.add("is-dragging");
            event.dataTransfer?.setData("text/plain", state.draggingTextBlockId);
            if (event.dataTransfer) {
              event.dataTransfer.effectAllowed = "move";
            }
          });
          elements.textBlockList.addEventListener("dragend", (event) => {
            const blockCard = event.target instanceof Element ? event.target.closest("[data-text-block-id]") : null;
            blockCard?.classList.remove("is-dragging");
            persistTextBlockOrderFromDom();
            state.draggingTextBlockId = "";
          });
          elements.textBlockList.addEventListener("dragover", (event) => {
            if (!state.draggingTextBlockId) {
              return;
            }
            event.preventDefault();
            const draggingCard = elements.textBlockList.querySelector(`[data-text-block-id="${cssEscape(state.draggingTextBlockId)}"]`);
            const targetCard = event.target instanceof Element ? event.target.closest("[data-text-block-id]") : null;
            if (!(draggingCard instanceof HTMLElement) || !(targetCard instanceof HTMLElement) || draggingCard === targetCard) {
              return;
            }
            const rect = targetCard.getBoundingClientRect();
            const before = event.clientY < rect.top + rect.height / 2;
            elements.textBlockList.insertBefore(draggingCard, before ? targetCard : targetCard.nextElementSibling);
          });
          elements.textBlockList.addEventListener("drop", (event) => {
            event.preventDefault();
            persistTextBlockOrderFromDom();
          });
        }

        function addTextBlock(type = "body") {
          const normalizedType = type === "heading" ? "heading" : "body";
          const block = {
            id: `text_${Date.now()}_${Math.random().toString(16).slice(2, 7)}`,
            type: normalizedType,
            text: "",
          };
          state.textBlocks.push(block);
          renderTextBlocks();
          updateProblemPreview();
          window.requestAnimationFrame(() => {
            elements.textBlockList
              ?.querySelector(`[data-text-block-id="${cssEscape(block.id)}"] [contenteditable]`)
              ?.focus();
          });
        }

        function deleteTextBlock(blockId) {
          const nextBlocks = state.textBlocks.filter((block) => block.id !== blockId);
          if (nextBlocks.length === state.textBlocks.length) {
            return;
          }
          state.textBlocks = nextBlocks;
          renderTextBlocks();
          updateProblemPreview();
        }

        function getTextBlockById(blockId) {
          return state.textBlocks.find((block) => block.id === blockId) || null;
        }

        function renderTextBlocks() {
          if (!elements.textBlockList) {
            return;
          }
          if (!state.textBlocks.length) {
            elements.textBlockList.innerHTML = `<p class="hint-text">見出しまたは本文を追加してください。</p>`;
            return;
          }
          elements.textBlockList.innerHTML = state.textBlocks
            .map((block) => {
              const type = block.type === "heading" ? "heading" : "body";
              const label = type === "heading" ? "テキスト文（見出し）" : "テキスト文（本文）";
              const placeholder = type === "heading" ? "見出しを入力" : "本文を入力";
              return `
                <article class="text-block-card" data-text-block-id="${escapeHtml(block.id)}">
                  <button class="drag-handle text-block-grip" type="button" aria-label="並び替え" draggable="true"></button>
                  <div class="text-block-main">
                    <p class="text-block-type">${escapeHtml(label)}</p>
                    <div
                      class="text-block-editor"
                      contenteditable="plaintext-only"
                      role="textbox"
                      aria-multiline="true"
                      data-placeholder="${escapeHtml(placeholder)}"
                    >${escapeHtml(block.text || "")}</div>
                  </div>
                  <button class="secondary white-button text-block-delete" type="button" data-delete-text-block="${escapeHtml(block.id)}" aria-label="削除">
                    <span class="material-symbols-rounded" aria-hidden="true">delete</span>
                  </button>
                </article>
              `;
            })
            .join("");
        }

        function persistTextBlockOrderFromDom() {
          if (!elements.textBlockList || !state.textBlocks.length) {
            return;
          }
          const ids = Array.from(elements.textBlockList.querySelectorAll("[data-text-block-id]"))
            .map((item) => item.getAttribute("data-text-block-id") || "")
            .filter(Boolean);
          const blockMap = new Map(state.textBlocks.map((block) => [block.id, block]));
          const ordered = ids.map((id) => blockMap.get(id)).filter(Boolean);
          if (ordered.length === state.textBlocks.length) {
            state.textBlocks = ordered;
          }
        }

        function initializeNotebookEditor() {
          if (!elements.notebookEditorBook) {
            return;
          }

          elements.notebookEditorBook.addEventListener("input", (event) => {
            const blockElement =
              event.target instanceof Element ? event.target.closest("[data-notebook-block-id]") : null;
            if (!blockElement) {
              return;
            }
            const block = getNotebookBlockById(blockElement.dataset.notebookBlockId || "");
            if (!block) {
              return;
            }
            block.text = blockElement.textContent || "";
            syncNotebookEditorToProblemEditor();
          });

          elements.notebookEditorBook.addEventListener("click", (event) => {
            const blockElement =
              event.target instanceof Element ? event.target.closest("[data-notebook-block-id]") : null;
            if (blockElement) {
              setActiveNotebookBlock(blockElement.dataset.notebookBlockId || "");
              return;
            }
            if (state.notebookSuppressSurfaceClick) {
              state.notebookSuppressSurfaceClick = false;
              return;
            }
            const surface =
              event.target instanceof HTMLElement ? event.target.closest("[data-notebook-page-surface]") : null;
            if (!(surface instanceof HTMLElement) || event.target !== surface) {
              setActiveNotebookBlock("");
              return;
            }
            const rect = surface.getBoundingClientRect();
            const page = surface.dataset.notebookPageSurface === "question" ? "question" : "text";
            addNotebookBlock(page === "question" ? "question" : "text", {
              page,
              x: event.clientX - rect.left,
              y: event.clientY - rect.top,
            });
          });

          elements.notebookEditorBook.addEventListener("pointerdown", handleNotebookPointerDown);
          window.addEventListener("pointermove", handleNotebookPointerMove);
          window.addEventListener("pointerup", finishNotebookPointerInteraction);
          window.addEventListener("pointercancel", finishNotebookPointerInteraction);

          renderNotebookEditorFrame();
          renderNotebookEditor();
        }

        function addNotebookBlock(type, options = {}) {
          const normalizedType = ["heading", "text", "question", "formula"].includes(type) ? type : "text";
          const page = options.page || (normalizedType === "question" || normalizedType === "formula" ? "question" : "text");
          const surface = getNotebookSurface(page);
          const rect = surface?.getBoundingClientRect();
          const samePageCount = state.notebookBlocks.filter((block) => block.page === page).length;
          const cell = getNotebookCellSize();
          const maxWidth = Math.max(cell * 7, Math.floor((rect?.width || 360) - cell * 2));
          const block = {
            id: `notebook_${Date.now()}_${Math.random().toString(16).slice(2, 7)}`,
            type: normalizedType,
            page,
            x: Number.isFinite(options.x) ? Math.round(options.x / cell) * cell : cell,
            y: Number.isFinite(options.y) ? Math.round(options.y / cell) * cell : cell + samePageCount * cell * 3,
            w: Math.min(maxWidth, normalizedType === "heading" ? cell * 14 : cell * 16),
            h: normalizedType === "heading" ? cell * 2 : cell * 3,
            text: "",
          };
          state.notebookBlocks.push(clampNotebookBlock(block));
          state.activeNotebookBlockId = block.id;
          renderNotebookEditor();
          syncNotebookEditorToProblemEditor();
          window.requestAnimationFrame(() => {
            const created = Array.from(elements.notebookEditorBook?.querySelectorAll("[data-notebook-block-id]") || []).find(
              (item) => item.getAttribute("data-notebook-block-id") === block.id,
            );
            if (created instanceof HTMLElement) {
              created.focus();
            }
          });
        }

        function renderNotebookEditorFrame() {
          const note = elements.noteSelect?.value || "数学Ⅰ";
          const date = new Date();
          const dateLabel = `${String(date.getFullYear()).slice(-2)}.${date.getMonth() + 1}.${date.getDate()}`;
          setTextContent(elements.notebookTextSubject, note);
          setTextContent(elements.notebookQuestionSubject, note);
          setTextContent(elements.notebookEditorDate, dateLabel);
          elements.notebookEditorDates?.forEach((dateElement) => {
            dateElement.textContent = dateLabel;
            dateElement.dateTime = date.toISOString();
          });
        }

        function renderNotebookEditor() {
          const surfaces = {
            text: elements.notebookTextSurface,
            question: elements.notebookQuestionSurface,
          };
          Object.values(surfaces).forEach((surface) => {
            if (surface) {
              surface.innerHTML = "";
            }
          });

          state.notebookBlocks.forEach((block) => {
            const surface = surfaces[block.page] || surfaces.text;
            if (!surface) {
              return;
            }
            clampNotebookBlock(block);
            const blockElement = document.createElement("div");
            blockElement.className = "notebook-editor-block";
            blockElement.classList.toggle("is-selected", block.id === state.activeNotebookBlockId);
            blockElement.dataset.notebookBlockId = block.id;
            blockElement.dataset.blockType = block.type;
            blockElement.setAttribute("contenteditable", "plaintext-only");
            blockElement.setAttribute("role", "textbox");
            blockElement.setAttribute("aria-multiline", "true");
            blockElement.setAttribute("spellcheck", "false");
            blockElement.setAttribute("data-placeholder", getNotebookBlockPlaceholder(block.type));
            blockElement.style.setProperty("--block-x", String(block.x));
            blockElement.style.setProperty("--block-y", String(block.y));
            blockElement.style.setProperty("--block-w", String(block.w));
            blockElement.style.setProperty("--block-h", String(block.h));
            blockElement.textContent = block.text;
            surface.append(blockElement);
          });
        }

        function handleNotebookPointerDown(event) {
          const blockElement =
            event.target instanceof Element ? event.target.closest("[data-notebook-block-id]") : null;
          if (!(blockElement instanceof HTMLElement)) {
            return;
          }
          const block = getNotebookBlockById(blockElement.dataset.notebookBlockId || "");
          const surface = blockElement.closest("[data-notebook-page-surface]");
          if (!block || !(surface instanceof HTMLElement)) {
            return;
          }

          setActiveNotebookBlock(block.id);
          clearNotebookLongPressTimer();
          state.notebookDragState = {
            block,
            blockElement,
            surface,
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            originX: block.x,
            originY: block.y,
            dragging: false,
          };
          state.notebookLongPressTimerId = window.setTimeout(() => {
            startNotebookBlockDrag(event.pointerId);
          }, 280);
        }

        function handleNotebookPointerMove(event) {
          const dragState = state.notebookDragState;
          if (!dragState || dragState.pointerId !== event.pointerId) {
            return;
          }
          const deltaX = event.clientX - dragState.startX;
          const deltaY = event.clientY - dragState.startY;
          if (!dragState.dragging && Math.hypot(deltaX, deltaY) > 9) {
            clearNotebookLongPressTimer();
            return;
          }
          if (!dragState.dragging) {
            return;
          }

          event.preventDefault();
          const cell = getNotebookCellSize();
          dragState.block.x = Math.round((dragState.originX + deltaX) / cell) * cell;
          dragState.block.y = Math.round((dragState.originY + deltaY) / cell) * cell;
          clampNotebookBlock(dragState.block, dragState.surface);
          dragState.blockElement.style.setProperty("--block-x", String(dragState.block.x));
          dragState.blockElement.style.setProperty("--block-y", String(dragState.block.y));
        }

        function startNotebookBlockDrag(pointerId) {
          const dragState = state.notebookDragState;
          if (!dragState || dragState.pointerId !== pointerId) {
            return;
          }
          dragState.dragging = true;
          dragState.blockElement.classList.add("is-dragging");
          try {
            dragState.blockElement.setPointerCapture(pointerId);
          } catch {
            // Pointer capture is optional; dragging still works without it.
          }
        }

        function finishNotebookPointerInteraction(event) {
          const dragState = state.notebookDragState;
          clearNotebookLongPressTimer();
          if (!dragState || dragState.pointerId !== event.pointerId) {
            return;
          }
          dragState.blockElement.classList.remove("is-dragging");
          try {
            dragState.blockElement.releasePointerCapture(event.pointerId);
          } catch {
            // Nothing to release in browsers that skipped capture.
          }
          if (dragState.dragging) {
            syncNotebookEditorToProblemEditor();
            state.notebookSuppressSurfaceClick = true;
            window.setTimeout(() => {
              state.notebookSuppressSurfaceClick = false;
            }, 0);
          }
          state.notebookDragState = null;
        }

        function clearNotebookLongPressTimer() {
          if (state.notebookLongPressTimerId) {
            window.clearTimeout(state.notebookLongPressTimerId);
            state.notebookLongPressTimerId = null;
          }
        }

        function setActiveNotebookBlock(blockId) {
          state.activeNotebookBlockId = blockId;
          elements.notebookEditorBook?.querySelectorAll("[data-notebook-block-id]").forEach((block) => {
            block.classList.toggle("is-selected", block.getAttribute("data-notebook-block-id") === blockId);
          });
        }

        function getNotebookBlockById(blockId) {
          return state.notebookBlocks.find((block) => block.id === blockId) || null;
        }

        function getNotebookSurface(page) {
          return page === "question" ? elements.notebookQuestionSurface : elements.notebookTextSurface;
        }

        function getNotebookCellSize() {
          return 24;
        }

        function clampNotebookBlock(block, surface = getNotebookSurface(block.page)) {
          const cell = getNotebookCellSize();
          const maxX = Math.max(0, Math.floor(((surface?.clientWidth || 360) - block.w) / cell) * cell);
          const maxY = Math.max(0, Math.floor(((surface?.clientHeight || 420) - block.h) / cell) * cell);
          block.x = Math.max(0, Math.min(maxX, Math.round(block.x / cell) * cell));
          block.y = Math.max(0, Math.min(maxY, Math.round(block.y / cell) * cell));
          block.w = Math.max(cell * 5, Math.round(block.w / cell) * cell);
          block.h = Math.max(cell * 2, Math.round(block.h / cell) * cell);
          return block;
        }

        function getNotebookBlockPlaceholder(type) {
          if (type === "heading") {
            return "見出し";
          }
          if (type === "question") {
            return "問題文";
          }
          if (type === "formula") {
            return "a^2 + b^2 = c^2";
          }
          return "本文";
        }

        function syncNotebookEditorToProblemEditor() {
          if (!elements.problemEditor) {
            return;
          }
          const pageOrder = { text: 0, question: 1 };
          const blocks = [...state.notebookBlocks]
            .filter((block) => String(block.text || "").trim())
            .sort((a, b) => (pageOrder[a.page] ?? 0) - (pageOrder[b.page] ?? 0) || a.y - b.y || a.x - b.x);
          elements.problemEditor.innerHTML = blocks
            .map((block) => {
              const tag = block.type === "heading" ? "h3" : "p";
              const label = block.type === "question" ? "問題" : block.type === "formula" ? "数式" : "";
              const prefix = label ? `<strong>${label}</strong> ` : "";
              return `<${tag}>${prefix}${escapeHtml(block.text).replace(/\n/g, "<br>")}</${tag}>`;
            })
            .join("");
          updateEditorCounts();
        }

        function populateBinderOptions() {
          const binders = Object.keys(NOTE_BY_BINDER);
          if (!elements.binderSelect) {
            return;
          }
          elements.binderSelect.innerHTML = binders
            .map((binder) => `<option value="${escapeHtml(binder)}">${escapeHtml(binder)}</option>`)
            .join("");
        }

        function updateNoteOptions() {
          if (!elements.noteSelect) {
            return;
          }
          const binderEntries = Object.entries(NOTE_BY_BINDER);
          elements.noteSelect.innerHTML = binderEntries
            .map(([binder, notes]) => {
              const options = (notes || [])
                .map((note) => `<option value="${escapeHtml(note)}" data-binder="${escapeHtml(binder)}">${escapeHtml(note)}</option>`)
                .join("");
              return `<optgroup label="${escapeHtml(binder)}">${options}</optgroup>`;
            })
            .join("");
          syncBinderFromSelectedNote();
          updateChapterOptions();
          updateProblemPreview();
        }

        function syncBinderFromSelectedNote() {
          const selectedOption = elements.noteSelect?.selectedOptions?.[0] || null;
          const binder = selectedOption?.dataset?.binder || Object.keys(NOTE_BY_BINDER)[0] || "";
          if (elements.binderSelect) {
            elements.binderSelect.value = binder;
          }
          return binder;
        }

        function updateChapterOptions() {
          if (!elements.chapterSelect) {
            return;
          }
          const config = getChapterConfig(elements.noteSelect?.value || "");
          const currentValue = elements.chapterSelect.value;
          if (elements.chapterFieldLabel) {
            elements.chapterFieldLabel.textContent = config.label;
          }
          elements.chapterSelect.innerHTML = [
            `<option value="" disabled>${escapeHtml(config.label)}を選択してください</option>`,
            ...config.options.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`),
          ].join("");
          elements.chapterSelect.value = config.options.includes(currentValue) ? currentValue : "";
        }

        function updateProblemPreview() {
          const binder = syncBinderFromSelectedNote();
          const note = elements.noteSelect?.value.trim() || "";
          const textNumber = elements.textNumberInput?.value.trim() || "";
          const textName = elements.textNameInput?.value.trim() || "";
          const questionNumber = elements.questionNumberInput?.value.trim() || "";
          const questionName = elements.questionNameInput?.value.trim() || "";
          const contentText = getProblemEditorContentText().replace(/\s+/g, " ").trim();

          const missingFields = [];
          if (!note) {
            missingFields.push("ノート");
          }
          if (!textNumber) {
            missingFields.push("テキスト番号");
          }
          if (!textName) {
            missingFields.push("テキスト名");
          }
          if (!questionNumber) {
            missingFields.push("問題番号");
          }
          if (!questionName) {
            missingFields.push("問題名");
          }
          if (!contentText) {
            missingFields.push("問題文");
          }

          elements.problemCreateForm?.classList.toggle("is-ready", missingFields.length === 0);
          setProblemStep(missingFields.length === 0 ? "confirm" : "create");
        }

        function getProblemEditorContentText() {
          const text = (elements.problemEditor?.textContent || "").trim();
          if (text) {
            return text;
          }
          const imageLabels = Array.from(elements.problemEditor?.querySelectorAll("img") || [])
            .map((image) => image.getAttribute("alt") || "画像")
            .filter(Boolean);
          return imageLabels.join(" ");
        }

        async function loadProblemCsvImport() {
          const file = elements.problemCsvInput?.files?.[0] || null;
          state.csvImportDrafts = [];
          if (!file) {
            renderProblemCsvImport("CSVを選択してください。");
            return;
          }

          try {
            const text = await file.text();
            const rows = parseCsvRows(text);
            if (rows.length < 2) {
              renderProblemCsvImport("CSVに読み込める問題がありません。");
              return;
            }
            const headers = rows[0].map((header) => normalizeCsvHeader(header));
            state.csvImportDrafts = rows
              .slice(1)
              .map((row, index) => createProblemDraftFromCsvRecord(createCsvRecord(headers, row), index))
              .filter(Boolean);
            renderProblemCsvImport();
          } catch {
            state.csvImportDrafts = [];
            renderProblemCsvImport("CSVを読み込めませんでした。ファイル形式を確認してください。");
          }
        }

        function parseCsvRows(text) {
          const rows = [];
          let row = [];
          let cell = "";
          let quoted = false;
          const source = String(text || "").replace(/^\uFEFF/, "");
          for (let index = 0; index < source.length; index += 1) {
            const char = source[index];
            const next = source[index + 1];
            if (quoted) {
              if (char === '"' && next === '"') {
                cell += '"';
                index += 1;
              } else if (char === '"') {
                quoted = false;
              } else {
                cell += char;
              }
              continue;
            }
            if (char === '"') {
              quoted = true;
              continue;
            }
            if (char === ",") {
              row.push(cell);
              cell = "";
              continue;
            }
            if (char === "\n") {
              row.push(cell);
              if (row.some((value) => String(value || "").trim())) {
                rows.push(row);
              }
              row = [];
              cell = "";
              continue;
            }
            if (char !== "\r") {
              cell += char;
            }
          }
          row.push(cell);
          if (row.some((value) => String(value || "").trim())) {
            rows.push(row);
          }
          return rows;
        }

        function normalizeCsvHeader(header) {
          return String(header || "").trim().toLowerCase().replace(/[\s_]+/g, "-");
        }

        function createCsvRecord(headers, row) {
          return headers.reduce((record, header, index) => {
            if (header) {
              record[header] = String(row[index] || "").trim();
            }
            return record;
          }, {});
        }

        function getCsvField(record, ...keys) {
          for (const key of keys) {
            const normalizedKey = normalizeCsvHeader(key);
            if (Object.prototype.hasOwnProperty.call(record, normalizedKey) && record[normalizedKey]) {
              return record[normalizedKey];
            }
          }
          return "";
        }

        function createProblemDraftFromCsvRecord(record, index) {
          const sourceCsvId = getCsvField(record, "id");
          const rawNote = getCsvField(record, "note");
          const noteMeta = resolveCsvNoteMeta(rawNote);
          const chapter = getCsvField(record, "chapter");
          const questionNumber = getCsvField(record, "question-number", "question_number");
          const questionName = getCsvField(record, "question-name", "question_name") || `Q${questionNumber || index + 1}`;
          const questionText = getCsvField(record, "question-text", "question_text", "content-text", "content_text");
          const answer = getCsvField(record, "answer", "correct-answer", "correct_answer");
          const choices = splitCsvChoices(getCsvField(record, "three-option", "three_option", "choices"));
          const explanation = getCsvField(record, "explanation");
          if (!questionText) {
            return null;
          }
          const textNumber = chapter || "CSV";
          const textName = chapter ? `Chapter ${chapter}` : "CSV Import";
          const safeId = sourceCsvId || `csv_${Date.now()}_${index}`;
          const submittedAt = toJstIsoString();
          return normalizeProblemDraft({
            id: `csv_${safeId}`,
            remoteId: null,
            submissionId: isUuidText(sourceCsvId) ? sourceCsvId : "",
            sourceCsvId,
            transport: "csv",
            binder: noteMeta.binder,
            note: noteMeta.note,
            chapter,
            section: "",
            textNumber,
            textName,
            textBlocks: explanation ? [{ id: `csv_text_${index}`, type: "body", text: explanation }] : [],
            questionNumber,
            questionName,
            image: null,
            notebookBlocks: createCsvNotebookBlocks({
              id: safeId,
              index,
              questionName,
              questionText,
              choices,
              explanation,
            }),
            contentHtml: textToEditorHtml(questionText),
            contentText: questionText,
            answers: answer ? [answer] : [],
            choices,
            explanation,
            answerType: choices.length > 0 ? "choice" : "text",
            deckId: noteMeta.deckId,
            subjectId: noteMeta.deckId,
            subjectLabel: noteMeta.note,
            subjectName: noteMeta.subjectName,
            seriesId: noteMeta.seriesId,
            seriesLabel: noteMeta.binder,
            submittedAt,
            status: "approved",
          });
        }

        function resolveCsvNoteMeta(rawNote) {
          const normalized = String(rawNote || "").trim().toLowerCase().replace(/[＿_\s]+/g, "-");
          if (normalized === "mathematics-c" || normalized === "mathematicsc" || normalized === "数学c" || normalized === "数学ｃ") {
            return {
              binder: "Refine 2nd Edition",
              note: "数学Ｃ",
              deckId: "refine-math-c",
              subjectName: "Mathematics C",
              seriesId: "review-2nd-edition",
            };
          }
          return {
            binder: syncBinderFromSelectedNote() || "Refine 2nd Edition",
            note: elements.noteSelect?.value || "数学Ｃ",
            deckId: "",
            subjectName: rawNote || "",
            seriesId: "",
          };
        }

        function splitCsvChoices(value) {
          return String(value || "")
            .split(/\s+\/\s+(?=[A-Za-zＡ-Ｚａ-ｚ]:|[A-Za-zＡ-Ｚａ-ｚ]：)/)
            .map((choice) => choice.trim())
            .filter(Boolean);
        }

        function createCsvNotebookBlocks({ id, index, questionName, questionText, choices, explanation }) {
          const base = String(id || index).replace(/[^a-z0-9-]/gi, "_");
          const questionChoiceText = choices.length > 0 ? choices.join("\n") : "";
          return [
            {
              id: `csv_${base}_question_title`,
              type: "heading",
              page: "question",
              x: 24,
              y: 24,
              w: 360,
              h: 36,
              text: questionName,
            },
            {
              id: `csv_${base}_question_body`,
              type: "question",
              page: "question",
              x: 24,
              y: 72,
              w: 392,
              h: 96,
              text: questionText,
            },
            ...(questionChoiceText
              ? [
                  {
                    id: `csv_${base}_question_choices`,
                    type: "text",
                    page: "question",
                    x: 24,
                    y: 184,
                    w: 392,
                    h: 92,
                    text: questionChoiceText,
                  },
                ]
              : []),
            ...(explanation
              ? [
                  {
                    id: `csv_${base}_text_explanation`,
                    type: "text",
                    page: "text",
                    x: 24,
                    y: 72,
                    w: 392,
                    h: 180,
                    text: explanation,
                  },
                ]
              : []),
          ];
        }

        function renderProblemCsvImport(message = "") {
          const total = state.csvImportDrafts.length;
          const missingDrafts = getMissingProblemCsvDrafts();
          const missingIds = new Set(missingDrafts.map((draft) => draft.id));
          if (elements.problemCsvImportSummary) {
            elements.problemCsvImportSummary.textContent =
              message || (total ? `CSV ${total}件を読み込みました。追加対象は${missingDrafts.length}件です。` : "CSVを選択してください。");
          }
          if (elements.problemCsvSubmitMissingBtn) {
            elements.problemCsvSubmitMissingBtn.disabled = missingDrafts.length === 0;
          }
          if (!elements.problemCsvImportList) {
            return;
          }
          if (!total) {
            elements.problemCsvImportList.innerHTML = "";
            return;
          }
          elements.problemCsvImportList.innerHTML = state.csvImportDrafts
            .slice(0, 60)
            .map((draft) => {
              const isMissing = missingIds.has(draft.id);
              const title = getDraftDisplayTitle(draft);
              const meta = [draft.sourceCsvId, truncateText(draft.contentText || "", 48)].filter(Boolean).join(" / ");
              return `
                <li class="manager-question-item">
                  <div class="manager-question-main">
                    <p class="manager-question-title">${escapeHtml(title)}</p>
                    <p class="manager-question-meta">${escapeHtml(meta)}</p>
                  </div>
                  <span class="status-chip ${isMissing ? "pending" : "approved"}">${isMissing ? "追加対象" : "登録済み"}</span>
                </li>
              `;
            })
            .join("");
        }

        function getMissingProblemCsvDrafts() {
          if (!state.csvImportDrafts.length) {
            return [];
          }
          const existingKeys = new Set();
          state.drafts.forEach((draft) => {
            getProblemDraftIdentityKeys(draft).forEach((key) => existingKeys.add(key));
          });
          return state.csvImportDrafts.filter((draft) => {
            const keys = getProblemDraftIdentityKeys(draft);
            return !keys.some((key) => existingKeys.has(key));
          });
        }

        function getProblemDraftIdentityKeys(draft) {
          const keys = [];
          const remoteId = String(draft?.remoteId || "").trim();
          const submissionId = String(draft?.submissionId || "").trim();
          const sourceCsvId = String(draft?.sourceCsvId || "").trim();
          if (remoteId) keys.push(`id:${remoteId.toLowerCase()}`);
          if (submissionId) keys.push(`id:${submissionId.toLowerCase()}`);
          if (sourceCsvId) keys.push(`csv:${sourceCsvId.toLowerCase()}`);
          if (isUuidText(sourceCsvId)) keys.push(`id:${sourceCsvId.toLowerCase()}`);
          const questionKey = [draft?.note, draft?.chapter, draft?.questionNumber, draft?.questionName]
            .map(normalizeProblemIdentityText)
            .join("|");
          if (questionKey.replace(/\|/g, "")) {
            keys.push(`question:${questionKey}`);
          }
          const contentKey = [draft?.note, draft?.contentText].map(normalizeProblemIdentityText).join("|");
          if (contentKey.replace(/\|/g, "")) {
            keys.push(`content:${contentKey}`);
          }
          return Array.from(new Set(keys));
        }

        function normalizeProblemIdentityText(value) {
          return String(value || "").normalize("NFKC").trim().toLowerCase().replace(/\s+/g, "");
        }

        async function submitMissingProblemCsvDrafts() {
          const drafts = getMissingProblemCsvDrafts();
          if (!drafts.length) {
            renderProblemCsvImport("追加対象の問題はありません。");
            return;
          }
          const now = toJstIsoString();
          mergeProblemDrafts(
            drafts.map((draft) => ({
              ...draft,
              status: "approved",
              transport: "local",
              remoteId: null,
              approvedAt: now,
              updatedAt: now,
            }))
          );
          saveJson(MANAGER_DRAFT_KEY, state.drafts);
          renderQuestionList();
          renderProblemCsvImport(`${drafts.length}件をローカルの問題データへ追加しました。`);
        }


        function mergeProblemDrafts(nextDrafts) {
          const indexByRemoteId = new Map(
            state.drafts
              .map((draft, index) => [String(draft.remoteId || draft.submissionId || draft.sourceCsvId || ""), index])
              .filter(([key]) => key)
          );
          nextDrafts.forEach((draft) => {
            const key = String(draft.remoteId || draft.submissionId || draft.sourceCsvId || "");
            const index = key ? indexByRemoteId.get(key) : -1;
            if (Number.isInteger(index) && index >= 0) {
              state.drafts[index] = { ...state.drafts[index], ...draft, id: state.drafts[index].id };
            } else {
              state.drafts.unshift(draft);
            }
          });
        }

        function showManagerLoginRequiredDialog() {
          if (typeof window.showAuthLoginRequiredDialog === "function") {
            window.showAuthLoginRequiredDialog({
              targetScreen: "manager",
              onboardingStep: "nickname",
            });
            return;
          }
          window.alert("ログインが必要です。もう一度ログインしてから続行してください。");
        }

        function isUuidText(value) {
          return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || "").trim());
        }

        function setPreviewText(element, value, fallback) {
          if (!element) {
            return;
          }
          element.textContent = value || fallback;
        }

        function setTextContent(element, value) {
          if (element) {
            element.textContent = value;
          }
        }

        async function prepareProblemConfirmation() {
          const draft = await createProblemDraftFromForm("pending");
          if (!draft) {
            return;
          }

          state.pendingProblemDraft = draft;
          populateProblemConfirmDialog(draft);
          setProblemStep("confirm");
          showDialog(elements.problemConfirmDialog, () => {
            if (window.confirm("問題を提出します。よろしいですか？")) {
              submitConfirmedProblem();
            }
          });
        }

        async function submitConfirmedProblem() {
          const draft = state.pendingProblemDraft;
          if (!draft) {
            closeDialog(elements.problemConfirmDialog);
            setProblemStep("create");
            return;
          }

          draft.submittedAt = toJstIsoString();
          setProblemStep("submit");
          await submitProblemForProofreading(draft);
        }

        async function submitProblemForProofreading(draft) {
          if (!draft) {
            return;
          }

          const submitButton = elements.problemCreateForm.querySelector('button[type="submit"]');
          if (submitButton instanceof HTMLButtonElement) {
            submitButton.disabled = true;
          }
          elements.proofreadingFeedback.textContent = "送信しています...";

          try {
            const result = await submitToManagerApi(draft);
            draft.transport = result.transport;
            draft.remoteId = result.remoteId;
            draft.status = result.status;

            state.drafts.unshift(draft);
            saveJson(MANAGER_DRAFT_KEY, state.drafts);
            renderQuestionList();

            resetProblemComposer();
            state.pendingProblemDraft = null;
            closeDialog(elements.problemConfirmDialog);
            elements.proofreadingFeedback.textContent =
              result.transport === "api"
                ? "提出しました。お疲れさまでした。"
                : "APIに接続できなかったため、ローカル下書きとして保存しました。";
          } catch {
            elements.proofreadingFeedback.textContent = "送信に失敗しました。しばらくしてから再試行してください。";
          } finally {
            if (submitButton instanceof HTMLButtonElement) {
              submitButton.disabled = false;
            }
            setProblemStep("create");
          }
        }

        async function saveProblemAsDraft() {
          const draft = await createProblemDraftFromForm("draft");
          if (!draft) {
            return;
          }

          state.drafts.unshift(draft);
          saveJson(MANAGER_DRAFT_KEY, state.drafts);
          renderQuestionList();
          resetProblemComposer();
          elements.proofreadingFeedback.textContent = "下書きとして保存しました。";
        }

        async function createProblemDraftFromForm(status) {
          const binder = syncBinderFromSelectedNote();
          const note = elements.noteSelect?.value.trim() || "";
          const chapter = "";
          const textNumber = elements.textNumberInput?.value.trim() || "";
          const textName = elements.textNameInput?.value.trim() || "";
          const questionNumber = elements.questionNumberInput?.value.trim() || "";
          const questionName = elements.questionNameInput?.value.trim() || "";
          const textBlocks = state.textBlocks
            .map((block) => ({
              id: block.id,
              type: block.type === "heading" ? "heading" : "body",
              text: String(block.text || "").trim(),
            }))
            .filter((block) => block.text);
          const notebookBlocks = state.notebookBlocks
            .map((block) => ({
              id: block.id,
              type: block.type,
              page: block.page,
              x: block.x,
              y: block.y,
              w: block.w,
              h: block.h,
              text: String(block.text || "").trim(),
            }))
            .filter((block) => block.text);
          const contentHtml = normalizeEditorHtml(elements.problemEditor.innerHTML);
          const contentText = getProblemEditorContentText();

          const missingFields = [];
          if (!note) {
            missingFields.push("ノート");
          }
          if (!textNumber) {
            missingFields.push("テキスト番号");
          }
          if (!textName) {
            missingFields.push("テキスト名");
          }
          if (!questionNumber) {
            missingFields.push("問題番号");
          }
          if (!questionName) {
            missingFields.push("問題名");
          }
          if (!contentText) {
            missingFields.push("問題文");
          }
          if (missingFields.length) {
            elements.proofreadingFeedback.textContent = `${missingFields.join("・")}を入力してください。`;
            updateProblemPreview();
            return null;
          }

          const image = await getProblemImagePayload();
          if (image === undefined) {
            return null;
          }

          return {
            id: `draft_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
            binder,
            note,
            chapter,
            section: "",
            textNumber,
            textName,
            textBlocks,
            questionNumber,
            questionName,
            image,
            contentHtml,
            contentText,
            notebookBlocks,
            submittedAt: toJstIsoString(),
            status,
            remoteId: null,
            transport: "local",
          };
        }

        async function syncProblemImageFromInput(options = {}) {
          const file = elements.problemImageInput?.files?.[0] || null;
          if (!file) {
            state.problemImageData = null;
            renderProblemImagePreview();
            updateProblemPreview();
            return;
          }

          try {
            const dataUrl = await fileToDataUrl(file);
            state.problemImageData = {
              name: file.name,
              type: file.type,
              size: file.size,
              dataUrl,
            };
            if (options.insertIntoEditor) {
              insertProblemImageIntoEditor(state.problemImageData);
              state.problemImageData = null;
              if (elements.problemImageInput) {
                elements.problemImageInput.value = "";
              }
            }
            renderProblemImagePreview();
            updateProblemPreview();
          } catch {
            state.problemImageData = null;
            renderProblemImagePreview();
            updateProblemPreview();
            elements.proofreadingFeedback.textContent = "画像の読み込みに失敗しました。別の画像で試してください。";
          }
        }

        async function getProblemImagePayload() {
          state.problemImageData = null;
          if (elements.problemImageInput) {
            elements.problemImageInput.value = "";
          }
          renderProblemImagePreview();
          return null;
        }

        function populateProblemConfirmDialog(draft) {
          setPreviewText(elements.confirmProblemNote, draft.note, "-");
          if (elements.confirmProblemContent) {
            elements.confirmProblemContent.textContent = [
              draft.textNumber || draft.textName ? `テキスト ${[draft.textNumber, draft.textName].filter(Boolean).join(" ")}` : "",
              draft.questionNumber || draft.questionName ? `問題 ${[draft.questionNumber, draft.questionName].filter(Boolean).join(" ")}` : "",
              draft.contentText || "",
            ]
              .filter(Boolean)
              .join("\n\n");
          }
        }

        function showProblemImageDialog() {
          if (!state.problemImageData) {
            return;
          }
          if (elements.problemDialogImage) {
            elements.problemDialogImage.src = state.problemImageData.dataUrl;
            elements.problemDialogImage.alt = state.problemImageData.name || "添付画像";
          }
          if (elements.problemDialogImageMeta) {
            const sizeKb = Math.max(1, Math.round(state.problemImageData.size / 1024));
            elements.problemDialogImageMeta.textContent = `${state.problemImageData.name} (${sizeKb}KB)`;
          }
          showDialog(elements.problemImageDialog);
        }

        function showResetProblemDialog() {
          showDialog(elements.problemResetDialog, () => {
            const shouldClear = window.confirm("入力中の内容を削除します。よろしいですか？");
            if (shouldClear) {
              resetProblemComposer();
              elements.proofreadingFeedback.textContent = "";
            }
          });
        }

        function renderProblemImagePreview() {
          if (!elements.problemImagePreviewWrap || !elements.problemImageMeta) {
            return;
          }

          if (!state.problemImageData) {
            elements.problemImagePreviewWrap.hidden = true;
            elements.problemImageMeta.textContent = "";
            if (elements.viewProblemImageBtn) {
              elements.viewProblemImageBtn.disabled = true;
            }
            updateProblemPreview();
            return;
          }

          elements.problemImagePreviewWrap.hidden = false;
          const sizeKb = Math.max(1, Math.round(state.problemImageData.size / 1024));
          elements.problemImageMeta.textContent = `${state.problemImageData.name} (${sizeKb}KB)`;
          if (elements.viewProblemImageBtn) {
            elements.viewProblemImageBtn.disabled = false;
          }
          updateProblemPreview();
        }

        function clearProblemImage() {
          if (elements.problemImageInput) {
            elements.problemImageInput.value = "";
          }
          state.problemImageData = null;
          renderProblemImagePreview();
          updateProblemPreview();
        }

        function insertProblemImageIntoEditor(imageData) {
          if (!elements.problemEditor || !imageData?.dataUrl) {
            return;
          }
          const image = document.createElement("img");
          image.className = "manager-editor-image";
          image.src = imageData.dataUrl;
          image.alt = imageData.name || "問題画像";
          const selection = window.getSelection();
          const canUseSelection =
            selection &&
            selection.rangeCount > 0 &&
            elements.problemEditor.contains(selection.getRangeAt(0).commonAncestorContainer);
          if (canUseSelection) {
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(image);
            range.setStartAfter(image);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
          } else {
            elements.problemEditor.append(image);
          }
          elements.problemEditor.append(document.createElement("br"));
          updateEditorCounts();
          updateProblemPreview();
        }

        function fileToDataUrl(file) {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
            reader.onerror = () => reject(new Error("file-read-failed"));
            reader.readAsDataURL(file);
          });
        }

        function resetProblemComposer() {
          elements.problemEditor.innerHTML = "";
          if (elements.textNumberInput) {
            elements.textNumberInput.value = "";
          }
          if (elements.textNameInput) {
            elements.textNameInput.value = "";
          }
          if (elements.questionNumberInput) {
            elements.questionNumberInput.value = "";
          }
          if (elements.questionNameInput) {
            elements.questionNameInput.value = "";
          }
          state.textBlocks = [];
          renderTextBlocks();
          state.notebookBlocks = [];
          state.activeNotebookBlockId = "";
          renderNotebookEditor();
          clearProblemImage();
          updateEditorCounts();
          updateProblemPreview();
        }

        function updateEditorCounts() {
          const text = elements.problemEditor?.textContent || "";
          const normalized = text.replace(/\s+/g, " ").trim();
          const charCount = normalized.length;
          const wordCount = countWords(normalized);

          if (elements.editorWordCount) {
            elements.editorWordCount.textContent = String(wordCount);
          }
          if (elements.editorCharCount) {
            elements.editorCharCount.textContent = String(charCount);
          }
          updateProblemPreview();
        }

        function countWords(text) {
          if (!text) {
            return 0;
          }
          const tokens = text.match(/[A-Za-z0-9]+|[ぁ-んァ-ン一-龯ー]+/g);
          return tokens ? tokens.length : 0;
        }


        async function submitToManagerApi(draft) {
          return {
            transport: "local",
            remoteId: null,
            status: draft?.status || "pending",
          };
        }

        async function updateQuestionSubmissionApi(draft, patch = {}) {
          return {
            transport: "local",
            remoteId: null,
            status: patch.status || draft?.status || "pending",
          };
        }

        function queueOutbox(payload) {
          const outbox = loadJson(MANAGER_OUTBOX_KEY, []);
          outbox.push({
            queuedAt: toJstIsoString(),
            payload,
          });
          saveJson(MANAGER_OUTBOX_KEY, outbox);
        }

        async function getAuth0AccessToken() {
          const auth0Lib = window.auth0;
          const config = window.AUTH0_CONFIG;
          if (!auth0Lib?.createAuth0Client || !config?.domain || !config?.clientId) {
            return null;
          }

          if (!state.auth0Client) {
            state.auth0Client = await auth0Lib.createAuth0Client({
              domain: config.domain,
              clientId: config.clientId,
              authorizationParams: {
                redirect_uri: window.location.href,
                scope: config.scope || "openid profile email",
                ...(config.audience ? { audience: config.audience } : {}),
              },
            });
          }

          try {
            const authenticated = await state.auth0Client.isAuthenticated();
            if (!authenticated) {
              return null;
            }
            return await state.auth0Client.getTokenSilently({
              authorizationParams: {
                audience: config.audience || DEFAULT_API_BASE,
                scope: config.scope || "openid profile email",
              },
            });
          } catch {
            return null;
          }
        }

        function initializeQuestionListDnD() {
          elements.createdQuestionList.addEventListener("dragstart", (event) => {
            const row = event.target instanceof Element ? event.target.closest(".manager-question-item") : null;
            if (!row) {
              return;
            }
            state.draggingId = row.dataset.id || null;
            state.lastDragOverKey = null;
            row.classList.add("is-dragging");
            if (event.dataTransfer) {
              event.dataTransfer.setData("text/plain", state.draggingId || "");
              event.dataTransfer.effectAllowed = "move";
            }
          });

          elements.createdQuestionList.addEventListener("dragend", (event) => {
            const row = event.target instanceof Element ? event.target.closest(".manager-question-item") : null;
            if (row) {
              row.classList.remove("is-dragging");
            }
            persistDraftOrderFromDom();
            state.draggingId = null;
            state.lastDragOverKey = null;
          });

          elements.createdQuestionList.addEventListener("dragover", (event) => {
            event.preventDefault();
            if (!state.draggingId) {
              return;
            }

            const draggingRow = getQuestionRowById(state.draggingId);
            const targetRow = event.target instanceof Element ? event.target.closest(".manager-question-item") : null;
            if (!draggingRow || !targetRow || draggingRow === targetRow) {
              return;
            }

            const targetRect = targetRow.getBoundingClientRect();
            const shouldInsertBefore = event.clientY < targetRect.top + targetRect.height / 2;
            const hoverKey = `${targetRow.dataset.id}:${shouldInsertBefore ? "before" : "after"}`;
            if (state.lastDragOverKey === hoverKey) {
              return;
            }
            state.lastDragOverKey = hoverKey;

            const previousRects = snapshotQuestionRowRects();
            if (shouldInsertBefore) {
              if (targetRow.previousElementSibling === draggingRow) {
                return;
              }
              elements.createdQuestionList.insertBefore(draggingRow, targetRow);
            } else {
              if (targetRow.nextElementSibling === draggingRow) {
                return;
              }
              elements.createdQuestionList.insertBefore(draggingRow, targetRow.nextElementSibling);
            }
            animateQuestionRowShift(previousRects);
          });

          elements.createdQuestionList.addEventListener("drop", (event) => {
            event.preventDefault();
            persistDraftOrderFromDom();
          });
        }

        function getQuestionRowById(id) {
          if (!id) {
            return null;
          }
          const rows = Array.from(elements.createdQuestionList.querySelectorAll(".manager-question-item"));
          return rows.find((row) => row.dataset.id === id) || null;
        }

        function snapshotQuestionRowRects() {
          const rects = new Map();
          const rows = elements.createdQuestionList.querySelectorAll(".manager-question-item");
          rows.forEach((row) => {
            if (row instanceof HTMLElement && row.dataset.id) {
              rects.set(row.dataset.id, row.getBoundingClientRect());
            }
          });
          return rects;
        }

        function animateQuestionRowShift(previousRects) {
          const rows = elements.createdQuestionList.querySelectorAll(".manager-question-item");
          rows.forEach((row) => {
            if (!(row instanceof HTMLElement) || !row.dataset.id) {
              return;
            }
            const previous = previousRects.get(row.dataset.id);
            if (!previous) {
              return;
            }

            const current = row.getBoundingClientRect();
            const deltaY = previous.top - current.top;
            if (Math.abs(deltaY) < 1) {
              return;
            }

            row.getAnimations().forEach((animation) => animation.cancel());
            row.animate(
              [
                { transform: `translateY(${deltaY}px)` },
                { transform: "translateY(0px)" },
              ],
              {
                duration: 180,
                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              },
            );
          });
        }

        function persistDraftOrderFromDom() {
          const ids = Array.from(elements.createdQuestionList.querySelectorAll(".manager-question-item"))
            .map((row) => row.dataset.id || "")
            .filter(Boolean);
          if (!ids.length) {
            return;
          }

          const draftMap = new Map(state.drafts.map((draft) => [draft.id, draft]));
          const orderedDrafts = ids.map((id) => draftMap.get(id)).filter(Boolean);
          if (orderedDrafts.length !== state.drafts.length) {
            const idSet = new Set(ids);
            state.drafts.forEach((draft) => {
              if (!idSet.has(draft.id)) {
                orderedDrafts.push(draft);
              }
            });
          }

          state.drafts = orderedDrafts;
          saveJson(MANAGER_DRAFT_KEY, state.drafts);
        }

        function getDraftDisplayTitle(draft) {
          const questionTitle = [draft?.questionNumber, draft?.questionName].filter(Boolean).join(" ");
          const textTitle = [draft?.textNumber, draft?.textName].filter(Boolean).join(" ");
          const itemTitle = questionTitle || textTitle || "未設定の問題";
          return [draft?.binder, draft?.note, itemTitle].filter(Boolean).join(" / ");
        }

        function renderQuestionList() {
          const list = elements.createdQuestionList;
          list.innerHTML = "";
          updateQuestionListTimestamp();

          const visibleDrafts = state.drafts.filter((draft) => {
            if (state.selectedListBinder && draft.binder !== state.selectedListBinder) {
              return false;
            }
            if (state.selectedListNote && draft.note !== state.selectedListNote) {
              return false;
            }
            return true;
          });

          if (!visibleDrafts.length) {
            list.innerHTML = `<li class="manager-empty-note">まだ問題はありません。新しい問題を作成してください。</li>`;
            renderPendingQuestionManager();
            return;
          }

          const rows = visibleDrafts.map((draft) => {
            const status = normalizeStatus(draft.status);
            const textSnippet = truncateText(draft.contentText || "", 32);
            const imageMeta = draft.image?.name ? `画像: ${truncateText(draft.image.name, 24)}` : "画像なし";
            const metaText = [formatDate(draft.submittedAt), textSnippet, imageMeta].join(" / ");
            const titleText = getDraftDisplayTitle(draft);
            const draggingClass = draft.id === state.draggingId ? " is-dragging" : "";
            return `
              <li class="manager-question-item${draggingClass}" data-id="${escapeHtml(draft.id)}">
                <div class="manager-question-main">
                  <p class="manager-question-title">${escapeHtml(titleText)}</p>
                  <p class="manager-question-meta">${escapeHtml(metaText)}</p>
                </div>
                <span class="status-chip ${escapeHtml(status)}">${escapeHtml(STATUS_LABEL[status])}</span>
              </li>
            `;
          });

          list.innerHTML = rows.join("");
          renderPendingQuestionManager();
        }

        function getPendingQuestionDrafts() {
          return state.drafts.filter((draft) => normalizeStatus(draft.status) === "pending");
        }

        function getSelectedPendingQuestion() {
          const pendingDrafts = getPendingQuestionDrafts();
          if (!pendingDrafts.length) {
            state.selectedPendingQuestionId = "";
            return null;
          }
          let selectedDraft = pendingDrafts.find((draft) => draft.id === state.selectedPendingQuestionId) || null;
          if (!selectedDraft) {
            selectedDraft = pendingDrafts[0];
            state.selectedPendingQuestionId = selectedDraft.id;
          }
          return selectedDraft;
        }

        function renderPendingQuestionManager() {
          if (!elements.pendingQuestionList) {
            return;
          }
          const pendingDrafts = getPendingQuestionDrafts();
          const selectedDraft = getSelectedPendingQuestion();
          elements.pendingQuestionList.innerHTML = pendingDrafts.length
            ? pendingDrafts
                .map((draft) => {
                  const isActive = draft.id === state.selectedPendingQuestionId;
                  const textSnippet = truncateText(draft.contentText || "", 38);
                  const titleText = getDraftDisplayTitle(draft);
                  const metaText = [formatDate(draft.submittedAt), textSnippet].filter(Boolean).join(" / ");
                  return `
                    <li class="manager-question-item${isActive ? " is-active" : ""}" data-pending-question-id="${escapeHtml(draft.id)}">
                      <div class="manager-question-main">
                        <p class="manager-question-title">${escapeHtml(titleText || "未設定の問題")}</p>
                        <p class="manager-question-meta">${escapeHtml(metaText)}</p>
                      </div>
                      <span class="status-chip pending">${escapeHtml(STATUS_LABEL.pending)}</span>
                    </li>
                  `;
                })
                .join("")
            : `<li class="manager-empty-note">未承認の問題はありません。</li>`;

          const hasSelection = Boolean(selectedDraft);
          if (elements.pendingQuestionEmpty) {
            elements.pendingQuestionEmpty.hidden = hasSelection;
          }
          if (elements.pendingQuestionEditorPanel) {
            elements.pendingQuestionEditorPanel.hidden = !hasSelection;
          }
          if (!selectedDraft) {
            return;
          }

          setTextContent(elements.pendingQuestionBinder, selectedDraft.binder || "-");
          setTextContent(elements.pendingQuestionNote, selectedDraft.note || "-");
          setTextContent(elements.pendingQuestionStatus, STATUS_LABEL[normalizeStatus(selectedDraft.status)]);
          if (elements.pendingQuestionEditor) {
            elements.pendingQuestionEditor.value = selectedDraft.contentText || "";
          }
        }

        async function savePendingQuestionEdit() {
          const draft = state.drafts.find((item) => item.id === state.selectedPendingQuestionId);
          if (!draft || normalizeStatus(draft.status) !== "pending") {
            setTextContent(elements.pendingQuestionFeedback, "編集できる未承認の問題を選択してください。");
            return;
          }
          const nextText = String(elements.pendingQuestionEditor?.value || "").trim();
          if (!nextText) {
            setTextContent(elements.pendingQuestionFeedback, "問題本文を入力してください。");
            return;
          }
          draft.contentText = nextText;
          draft.contentHtml = textToEditorHtml(nextText);
          draft.updatedAt = toJstIsoString();
          if (draft.remoteId) {
            const result = await updateQuestionSubmissionApi(draft, { contentText: draft.contentText, contentHtml: draft.contentHtml });
            if (result) {
              draft.transport = "api";
              draft.remoteId = result.remoteId || draft.remoteId;
              draft.status = result.status || draft.status;
            }
          }
          saveJson(MANAGER_DRAFT_KEY, state.drafts);
          renderQuestionList();
          setTextContent(elements.pendingQuestionFeedback, "編集を保存しました。");
        }

        async function approveSelectedPendingQuestion() {
          const draft = state.drafts.find((item) => item.id === state.selectedPendingQuestionId);
          if (!draft || normalizeStatus(draft.status) !== "pending") {
            setTextContent(elements.pendingQuestionFeedback, "承認できる未承認の問題を選択してください。");
            return;
          }
          setTextContent(elements.pendingQuestionFeedback, "承認を保存しています。");
          const result = await updateQuestionSubmissionApi(draft, { status: "approved" });
          if (!result && draft.transport === "api") {
            setTextContent(elements.pendingQuestionFeedback, "承認をSupabaseへ保存できませんでした。通信状態を確認してください。");
            return;
          }
          draft.status = "approved";
          if (result?.remoteId) {
            draft.remoteId = result.remoteId;
          }
          draft.transport = result?.transport || draft.transport || "local";
          draft.approvedAt = toJstIsoString();
          draft.updatedAt = draft.approvedAt;
          saveJson(MANAGER_DRAFT_KEY, state.drafts);
          state.selectedPendingQuestionId = "";
          renderQuestionList();
          setTextContent(elements.pendingQuestionFeedback, "問題を承認しました。");
        }

        function updateQuestionListTimestamp() {
          if (!elements.questionListUpdatedAt) {
            return;
          }
          const latestTime = state.drafts.reduce((latest, draft) => {
            const time = new Date(draft.submittedAt || "").getTime();
            return Number.isNaN(time) ? latest : Math.max(latest, time);
          }, 0);

          if (!latestTime) {
            elements.questionListUpdatedAt.textContent = "最終更新: -";
            elements.questionListUpdatedAt.removeAttribute("datetime");
            return;
          }

          const latestDate = new Date(latestTime);
          elements.questionListUpdatedAt.textContent = `最終更新: ${formatDateTime(latestDate)}`;
          elements.questionListUpdatedAt.dateTime = latestDate.toISOString();
        }

        function renderProfile() {
          const nickname = state.auth.nickname || (state.auth.provider === "guest" ? "Guest Mode" : "未設定");
          if (elements.profileNicknameValue) {
            elements.profileNicknameValue.textContent = nickname;
          }
          if (elements.managerInfoMenuNickname) {
            elements.managerInfoMenuNickname.textContent = nickname;
          }
          renderManagerAvaterPreview();
        }

        function applyManagerProfileFromAccess(access) {
          const member = access?.member;
          const displayName = typeof member?.display_name === "string" ? member.display_name.trim() : "";
          const email = typeof member?.email === "string" ? member.email.trim() : "";
          if (!displayName && !email) {
            return;
          }
          state.auth = {
            ...state.auth,
            displayName: displayName || state.auth.displayName,
            nickname: displayName || state.auth.nickname,
            email: email || state.auth.email,
          };
          renderProfile();
        }

        async function loadReviewDataSnapshotFromApi(token) {
          if (!token) {
            return;
          }
          const data = await fetchCloudDataSnapshot(token, "/me/review-data", "reviewData");
          if (!data || typeof data !== "object" || Array.isArray(data)) {
            return;
          }
          state.reviewDataSnapshot = data;
          state.auth = createAuthSummaryFromAppState(data, state.auth);
          renderProfile();
        }

        async function loadQuestionSubmissionsFromApi() {
          return;
        }

        function normalizeQuestionSubmissionDraft(submission) {
          if (!submission || typeof submission !== "object" || Array.isArray(submission)) {
            return null;
          }
          const id = String(submission.id || "").trim();
          const payload = submission.payload && typeof submission.payload === "object" ? submission.payload : {};
          if (!id) {
            return null;
          }
          return normalizeProblemDraft({
            id: `remote_${id}`,
            remoteId: id,
            transport: "api",
            binder: submission.binder ?? payload.binder ?? "",
            note: submission.note ?? payload.note ?? "",
            chapter: submission.chapter ?? payload.chapter ?? "",
            section: submission.section ?? payload.section ?? "",
            textNumber: submission.textNumber ?? submission.text_number ?? payload.textNumber ?? "",
            textName: submission.textName ?? submission.text_name ?? payload.textName ?? "",
            textBlocks: Array.isArray(submission.textBlocks) ? submission.textBlocks : Array.isArray(payload.textBlocks) ? payload.textBlocks : [],
            questionNumber: submission.questionNumber ?? submission.question_number ?? payload.questionNumber ?? "",
            questionName: submission.questionName ?? submission.question_name ?? payload.questionName ?? "",
            image: submission.image ?? payload.image ?? null,
            notebookBlocks: Array.isArray(submission.notebookBlocks)
              ? submission.notebookBlocks
              : Array.isArray(payload.notebookBlocks)
                ? payload.notebookBlocks
                : [],
            contentHtml: submission.contentHtml ?? submission.content_html ?? payload.contentHtml ?? "",
            contentText: submission.contentText ?? submission.content_text ?? payload.contentText ?? "",
            submittedAt: submission.submittedAt ?? submission.submitted_at ?? payload.submittedAt ?? "",
            approvedAt: submission.approvedAt ?? submission.approved_at ?? payload.approvedAt ?? "",
            updatedAt: submission.updatedAt ?? submission.updated_at ?? "",
            answerType: payload.answerType ?? "",
            answers: Array.isArray(payload.answers) ? payload.answers : [],
            choices: Array.isArray(payload.choices) ? payload.choices : [],
            explanation: payload.explanation ?? "",
            deckId: payload.deckId ?? "",
            subjectId: payload.subjectId ?? "",
            subjectLabel: payload.subjectLabel ?? "",
            subjectName: payload.subjectName ?? "",
            seriesId: payload.seriesId ?? "",
            seriesLabel: payload.seriesLabel ?? "",
            sourceCsvId: payload.sourceCsvId ?? "",
            submissionId: id,
            status: submission.status ?? payload.status ?? "pending",
          });
        }

        async function fetchCloudDataSnapshot(token, path, responseKey) {
          try {
            const response = await fetch(`${resolveApiBase()}${path}`, {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            });
            if (!response.ok) {
              return;
            }
            const json = await response.json().catch(() => null);
            const data = json?.[responseKey]?.data;
            if (!data || typeof data !== "object" || Array.isArray(data)) {
              return null;
            }
            return data;
          } catch {
            return null;
          }
        }

        function renderManagerAvaterPreview() {
          const appState = state.reviewDataSnapshot || loadJson(APP_STATE_KEY, {});
          const avater = appState?.avater || {};
          const equipped = avater?.equipped && typeof avater.equipped === "object" ? avater.equipped : {};
          const itemOffsets = avater?.itemOffsets && typeof avater.itemOffsets === "object" ? avater.itemOffsets : {};
          const managerItems = new Map(loadManagerAvaterItems().map((item) => [item.id, item]));
          elements.managerAvaterPreviews.forEach((preview) => {
            preview.querySelectorAll(".avater-layer").forEach((layer) => layer.remove());
            Object.entries(equipped).forEach(([category, itemId]) => {
              const className = MANAGER_AVATER_ITEM_CLASSES[itemId] || (String(itemId).startsWith("custom-") ? "avater-item-custom" : "");
              if (!className) {
                return;
              }
              const managerItem = managerItems.get(itemId);
              const image = getManagerAvaterItemImage(managerItem);
              const offset = itemOffsets[itemId] || {};
              const layer = document.createElement("span");
              layer.className = `avater-layer ${className} avater-category-${category}${image ? " has-custom-image" : ""}`;
              layer.style.setProperty("--avater-item-offset-x", `${Number(offset.x) || 0}px`);
              layer.style.setProperty("--avater-item-offset-y", `${Number(offset.y) || 0}px`);
              layer.setAttribute("aria-hidden", "true");
              if (image) {
                const imageElement = document.createElement("img");
                imageElement.src = image.dataUrl;
                imageElement.alt = "";
                layer.append(imageElement);
              }
              preview.append(layer);
            });
          });
        }

        function normalizeEditorHtml(html) {
          return html.replace(/<div><br><\/div>/g, "").replace(/^\s+|\s+$/g, "");
        }

        function textToEditorHtml(text) {
          return String(text || "")
            .split(/\r?\n{2,}/)
            .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\r?\n/g, "<br>")}</p>`)
            .join("");
        }

        function loadAuthSummary() {
          const fallback = {
            displayName: "未設定",
            nickname: "未設定",
            email: "未設定",
            provider: "未設定",
          };
          try {
            const raw = window.localStorage.getItem(APP_STATE_KEY);
            const parsed = raw ? JSON.parse(raw) : null;
            const auth = parsed?.auth ?? {};
            const displayName = typeof auth.displayName === "string" && auth.displayName.trim() ? auth.displayName.trim() : "";
            const provider = typeof auth.provider === "string" && auth.provider.trim() ? auth.provider.trim() : fallback.provider;
            const nickname =
              (typeof auth.nickname === "string" && auth.nickname.trim()) ||
              (provider === "guest" ? "Guest Mode" : displayName && displayName !== "Guest Mode" ? displayName : fallback.nickname);
            return {
              displayName: displayName || fallback.displayName,
              nickname,
              email: auth.email || fallback.email,
              provider,
            };
          } catch {
            return fallback;
          }
        }

        function createAuthSummaryFromAppState(appState, fallback = {}) {
          const auth = appState?.auth ?? {};
          const displayName = typeof auth.displayName === "string" && auth.displayName.trim() ? auth.displayName.trim() : "";
          const provider =
            typeof auth.provider === "string" && auth.provider.trim()
              ? auth.provider.trim()
              : fallback.provider || "未設定";
          const nickname =
            (typeof auth.nickname === "string" && auth.nickname.trim()) ||
            (provider === "guest"
              ? "Guest Mode"
              : displayName && displayName !== "Guest Mode"
                ? displayName
                : fallback.nickname || "未設定");
          return {
            displayName: displayName || fallback.displayName || "未設定",
            nickname,
            email: auth.email || fallback.email || "未設定",
            provider,
          };
        }

        function insertTextAtCursor(text) {
          const selection = window.getSelection();
          if (!selection || selection.rangeCount === 0) {
            elements.problemEditor.textContent = `${elements.problemEditor.textContent || ""}${text}`;
            return;
          }
          const range = selection.getRangeAt(0);
          range.deleteContents();
          const node = document.createTextNode(text);
          range.insertNode(node);
          range.setStartAfter(node);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }

        function resolveApiBase() {
          return DEFAULT_API_BASE;
        }

        function getChapterConfig(note) {
          return CHAPTER_CONFIG_BY_NOTE[note] || DEFAULT_CHAPTER_CONFIG;
        }

        function createNumberedOptions(prefix, suffix, count) {
          return Array.from({ length: count }, (_, index) => `${prefix}${index + 1}${suffix}`);
        }

        function setProblemStep(stepName) {
          state.lastProblemStep = stepName;
          elements.problemSteps.forEach((step) => {
            const stepId = step.dataset.problemStep;
            const isCreate = stepId === "create";
            const isConfirm = stepId === "confirm";
            const isSubmit = stepId === "submit";
            step.classList.toggle("is-active", stepId === stepName);
            step.classList.toggle("is-complete", (stepName === "confirm" && isCreate) || (stepName === "submit" && (isCreate || isConfirm)));
            if (stepName === "create" && (isConfirm || isSubmit)) {
              step.classList.remove("is-complete");
            }
          });
        }

        function showDialog(dialog, fallback) {
          if (dialog && typeof dialog.showModal === "function") {
            if (!dialog.open) {
              dialog.showModal();
            }
            return;
          }
          if (typeof fallback === "function") {
            fallback();
          }
        }

        function closeDialog(dialog) {
          if (dialog?.open) {
            dialog.close();
          }
        }

        function toJstIsoString(value = new Date()) {
          const date = value instanceof Date ? value : new Date(value);
          const time = date.getTime();
          if (!Number.isFinite(time)) {
            return "";
          }
          const jstDate = new Date(time + 9 * 60 * 60 * 1000);
          const year = jstDate.getUTCFullYear();
          const month = String(jstDate.getUTCMonth() + 1).padStart(2, "0");
          const day = String(jstDate.getUTCDate()).padStart(2, "0");
          const hours = String(jstDate.getUTCHours()).padStart(2, "0");
          const minutes = String(jstDate.getUTCMinutes()).padStart(2, "0");
          const seconds = String(jstDate.getUTCSeconds()).padStart(2, "0");
          const milliseconds = String(jstDate.getUTCMilliseconds()).padStart(3, "0");
          return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+09:00`;
        }

        function normalizeProblemDraft(draft) {
          if (!draft || typeof draft !== "object" || Array.isArray(draft)) {
            return null;
          }
          const status = normalizeStatus(draft.status || (draft.remoteId || draft.transport === "api" ? "pending" : "draft"));
          return {
            ...draft,
            id: String(draft.id || draft.remoteId || `draft_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`),
            status,
            transport: draft.transport || (draft.remoteId ? "api" : "local"),
            remoteId: draft.remoteId ?? null,
            answers: Array.isArray(draft.answers) ? draft.answers : [],
            choices: Array.isArray(draft.choices) ? draft.choices : [],
            explanation: typeof draft.explanation === "string" ? draft.explanation : "",
            sourceCsvId: typeof draft.sourceCsvId === "string" ? draft.sourceCsvId : "",
            submissionId: typeof draft.submissionId === "string" ? draft.submissionId : "",
          };
        }

        function loadManagerProblemDrafts() {
          const drafts = loadJson(MANAGER_DRAFT_KEY, []);
          return (Array.isArray(drafts) ? drafts : []).map(normalizeProblemDraft).filter(Boolean);
        }

        function normalizeStatus(status) {
          if (status === "draft" || status === "approved" || status === "rejected") {
            return status;
          }
          return "pending";
        }

        function truncateText(text, length) {
          if (text.length <= length) {
            return text;
          }
          return `${text.slice(0, length)}...`;
        }

        function formatDate(value) {
          if (!value) {
            return "-";
          }
          const date = new Date(value);
          if (Number.isNaN(date.getTime())) {
            return "-";
          }
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}/${month}/${day}`;
        }

        function formatDateTime(date) {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");
          return `${year}/${month}/${day} ${hours}:${minutes}`;
        }

        function escapeHtml(value) {
          return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#39;");
        }

        function cssEscape(value) {
          return window.CSS?.escape ? window.CSS.escape(String(value || "")) : String(value || "").replace(/["\\]/g, "\\$&");
        }

        function loadJson(key, fallback) {
          try {
            const raw = window.localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
          } catch {
            return fallback;
          }
        }

        function saveJson(key, value) {
          try {
            window.localStorage.setItem(key, JSON.stringify(value));
          } catch {
            return;
          }
        }
      })();
