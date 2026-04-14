const STORAGE_KEY = "the-review-quest-v1";
const HOME_GREETING_REFRESH_MS = 60 * 1000;
const JP_HOLIDAY_CACHE = new Map();
const DEFAULT_THEME = "sea";
const AVAILABLE_THEMES = [
  "sea",
  "slate",
  "midnight",
  "blueberry",
  "forest",
  "aojiru",
  "lemonade",
  "banana-cake",
  "sunset",
  "strawberry",
  "the-paper",
  "the-black",
  "kagiko",
  "city",
];
const THEME_DISPLAY_NAMES = {
  sea: "Sea",
  slate: "Slate",
  midnight: "Midnight",
  blueberry: "Blueberry",
  forest: "Forest",
  aojiru: "Aojiru",
  lemonade: "Lemonade",
  "banana-cake": "Banana Cake",
  sunset: "Sunset",
  strawberry: "Strawberry",
  "the-paper": "The Paper",
  "the-black": "The Black",
  kagiko: "KAGIKO",
  city: "City",
};
const PREMIUM_THEMES = ["kagiko", "city"];
const THEME_UNLOCK_COST = 50;
const LEGACY_THEME_ALIASES = {
  deepsea: "sea",
};
const THEME_FADE_MS = 360;
const SELFCHECK_DEFAULT_TIMER_SECONDS = 25 * 60;
const MYPAGE_PAGE_IDS = ["top", "selfcheck", "customize", "settings"];
const SCREEN_IDS = ["home", "login", "mypage", "notice"];
const AUTH0_DEFAULT_SCOPE = "openid profile email";
const DEFAULT_TEXT_SETTINGS = {
  size: 100,
  weight: 500,
  spacing: 0,
};
const DEFAULT_NOTIFICATION_SETTINGS = {
  dailyLogin: true,
  dailyTry: true,
  notice: true,
};
const DAILY_LOGIN_DESKTOP_WINDOW_RADIUS = 2;
const DAILY_LOGIN_MOBILE_WINDOW_RADIUS = 3;
const DAILY_LOGIN_MOBILE_BREAKPOINT_PX = 760;
const COIN_COUNT_MIN_ANIMATION_MS = 420;
const COIN_COUNT_MAX_ANIMATION_MS = 1200;
const COIN_COUNT_DURATION_PER_STEP_MS = 0.22;
const REVIEW_COIN_FORMATTER = new Intl.NumberFormat("ja-JP");
const REVIEW_DATA_EXPORT_FORMAT = "the-review-obfuscated-v1";
const REVIEW_DATA_EXPORT_KEY = "TheReview::DataExport::v1";
const FLASHCARD_DEFAULT_SERIES = {
  id: "reboot-1st-edition",
  label: "Reboot 1st Edition",
};
const FLASHCARD_REVIEW_2ND_SERIES = {
  id: "review-2nd-edition",
  label: "Refine 2nd Edition",
};
const FLASHCARD_DATASET_SOURCES = [
  {
    id: "public",
    label: "公共",
    resolve: () => (typeof DEFAULT_DATA !== "undefined" ? DEFAULT_DATA : null),
  },
  {
    id: "math1",
    label: "数学I",
    resolve: () => (typeof MATH1_DATA !== "undefined" ? MATH1_DATA : null),
  },
  {
    id: "physics-basic",
    label: "物理基礎",
    resolve: () => (typeof PHYSICS_BASIC_DATA !== "undefined" ? PHYSICS_BASIC_DATA : null),
  },
  {
    id: "logic",
    label: "情報と論理",
    resolve: () => (typeof LOGIC_DATA !== "undefined" ? LOGIC_DATA : null),
  },
  {
    id: "health",
    label: "保健",
    resolve: () => (typeof HEALTH_DATA !== "undefined" ? HEALTH_DATA : null),
  },
  {
    id: "ec1",
    label: "経済",
    resolve: () => (typeof EC1_DATA !== "undefined" ? EC1_DATA : null),
  },
  {
    id: "bio",
    label: "生物基礎",
    resolve: () => (typeof BIO_DATA !== "undefined" ? BIO_DATA : null),
  },
  {
    id: "week-test-8",
    label: "週テスト8",
    seriesId: FLASHCARD_REVIEW_2ND_SERIES.id,
    seriesLabel: FLASHCARD_REVIEW_2ND_SERIES.label,
    resolve: () => (typeof WEEK_TEST8_DATA !== "undefined" ? WEEK_TEST8_DATA : null),
  },
  {
    id: "week-test-9",
    label: "週テスト9",
    seriesId: FLASHCARD_REVIEW_2ND_SERIES.id,
    seriesLabel: FLASHCARD_REVIEW_2ND_SERIES.label,
    resolve: () => (typeof WEEK_TEST9_DATA !== "undefined" ? WEEK_TEST9_DATA : null),
  },
];

const DAILY_TRY_QUESTIONS = [
  {
    id: "d1",
    prompt: "CPUの正式名称はどれ？",
    choices: ["Central Process Unit", "Central Processing Unit", "Control Processing Unit"],
    answer: 1,
    note: "正しくは Central Processing Unit です。",
  },
  {
    id: "d2",
    prompt: "DNSの役割として正しいのは？",
    choices: ["ドメイン名をIPに変換する", "画像を圧縮する", "動画を編集する"],
    answer: 0,
    note: "DNSは名前解決を担当します。",
  },
  {
    id: "d3",
    prompt: "アルゴリズムとは何？",
    choices: ["問題を解く手順", "OSの種類", "ネット回線の速度"],
    answer: 0,
    note: "アルゴリズムは手順や規則のことです。",
  },
  {
    id: "d4",
    prompt: "優先順位づけの軸として適切なのは？",
    choices: ["重要度と緊急度", "気分", "文字数"],
    answer: 0,
    note: "重要度と緊急度の観点で整理します。",
  },
  {
    id: "d5",
    prompt: "報告で最初に伝えるべき内容は？",
    choices: ["結論", "雑談", "感想"],
    answer: 0,
    note: "まず結論を伝えると相手が判断しやすくなります。",
  },
];

const AUTH0_CONFIG = normalizeAuth0Config(window.AUTH0_CONFIG);

const elements = {
  appLoader: document.getElementById("appLoader"),
  navButtons: Array.from(document.querySelectorAll("[data-screen]")),
  mypageNavButton: document.querySelector('[data-screen="mypage"]'),
  mypageSubmenu: document.getElementById("mypageSubmenu"),
  mypageSubmenuItems: Array.from(document.querySelectorAll("[data-mypage-target]")),
  screens: Array.from(document.querySelectorAll(".screen")),
  mypagePages: Array.from(document.querySelectorAll("[data-mypage-page]")),
  reviewCoinBoard: document.getElementById("reviewCoinBoard"),
  calendarMonthLabel: document.getElementById("calendarMonthLabel"),
  calendarPrevMonthBtn: document.getElementById("calendarPrevMonthBtn"),
  calendarNextMonthBtn: document.getElementById("calendarNextMonthBtn"),
  calendarGrid: document.getElementById("calendarGrid"),
  selfcheckTimerDisplay: document.getElementById("selfcheckTimerDisplay"),
  selfcheckTimerStartBtn: document.getElementById("selfcheckTimerStartBtn"),
  selfcheckTimerPauseBtn: document.getElementById("selfcheckTimerPauseBtn"),
  selfcheckTimerResetBtn: document.getElementById("selfcheckTimerResetBtn"),
  selfcheckTimerFullscreenBtn: document.getElementById("selfcheckTimerFullscreenBtn"),
  reviewCoinValue: document.getElementById("reviewCoinValue"),
  mypageCoinValueNumber: document.getElementById("mypageCoinValueNumber"),
  authEmailText: document.getElementById("authEmailText"),
  authStatusText: document.getElementById("authStatusText"),
  authLoginButtons: Array.from(document.querySelectorAll("[data-auth-provider]")),
  authConfigHint: document.getElementById("authConfigHint"),
  logoutBtn: document.getElementById("logoutBtn"),
  deleteAccountBtn: document.getElementById("deleteAccountBtn"),
  themeCardList: document.getElementById("themeCardList"),
  themeCards: Array.from(document.querySelectorAll("[data-theme-choice]")),
  highContrastToggle: document.getElementById("highContrastToggle"),
  monochromeToggle: document.getElementById("monochromeToggle"),
  textSizeRange: document.getElementById("textSizeRange"),
  textSizeValue: document.getElementById("textSizeValue"),
  textWeightRange: document.getElementById("textWeightRange"),
  textWeightValue: document.getElementById("textWeightValue"),
  textSpacingRange: document.getElementById("textSpacingRange"),
  textSpacingValue: document.getElementById("textSpacingValue"),
  notifyReviewPeriodToggle: document.getElementById("notifyReviewPeriodToggle"),
  notifyTodaysMissionToggle: document.getElementById("notifyTodaysMissionToggle"),
  notifyNoticeToggle: document.getElementById("notifyNoticeToggle"),
  textResetDialogOpenBtn: document.getElementById("textResetDialogOpenBtn"),
  textResetDialog: document.getElementById("textResetDialog"),
  textResetActionButtons: Array.from(document.querySelectorAll("[data-text-reset-action]")),
  reviewDataExportBtn: document.getElementById("reviewDataExportBtn"),
  reviewDataImportBtn: document.getElementById("reviewDataImportBtn"),
  reviewDataImportInput: document.getElementById("reviewDataImportInput"),
  guestModeDialog: document.getElementById("guestModeDialog"),
  guestModeActionButtons: Array.from(document.querySelectorAll("[data-guest-mode-action]")),
  homeGreeting: document.getElementById("homeGreeting"),
  dailyLoginCard: document.getElementById("dailyLoginCard"),
  dailyLoginCount: document.getElementById("dailyLoginCount"),
  dailyLoginScale: document.getElementById("dailyLoginScale"),
  dailyLoginScaleNumbers: Array.from(document.querySelectorAll("#dailyLoginScale li")),
  dailyLoginTrack: document.querySelector(".daily-login-track"),
  dailyLoginProgressFill: document.getElementById("dailyLoginProgressFill"),
  dailyLoginPrevOuterNode: document.getElementById("dailyLoginPrevOuterNode"),
  dailyLoginPrevFarNode: document.getElementById("dailyLoginPrevFarNode"),
  dailyLoginPrevNearNode: document.getElementById("dailyLoginPrevNearNode"),
  dailyLoginCurrentNode: document.getElementById("dailyLoginCurrentNode"),
  dailyLoginNextNearNode: document.getElementById("dailyLoginNextNearNode"),
  dailyLoginNextFarNode: document.getElementById("dailyLoginNextFarNode"),
  dailyLoginNextOuterNode: document.getElementById("dailyLoginNextOuterNode"),
  dailyLoginReward3: document.getElementById("dailyLoginReward3"),
  dailyLoginReward7: document.getElementById("dailyLoginReward7"),
  dailyTryPrompt: document.getElementById("dailyTryPrompt"),
  dailyTryChoiceList: document.getElementById("dailyTryChoiceList"),
  dailyTryFeedback: document.getElementById("dailyTryFeedback"),
  dailyTrySubmitBtn: document.getElementById("dailyTrySubmitBtn"),
  flashcardSummary: document.getElementById("flashcardSummary"),
  flashcardSeriesButtons: document.getElementById("flashcardSeriesButtons"),
  flashcardSubjectGroup: document.getElementById("flashcardSubjectGroup"),
  flashcardSubjectButtons: document.getElementById("flashcardSubjectButtons"),
  flashcardFullscreenBtn: document.getElementById("flashcardFullscreenBtn"),
  mypageTopPage: document.getElementById("mypage-top"),
  mypageSelfcheckPage: document.getElementById("mypage-selfcheck"),
  mypageFlashcardPanel: document.getElementById("mypageFlashcardPanel"),
  mypageTimerPanel: document.getElementById("mypageTimerPanel"),
  flashcardToolbar: document.getElementById("flashcardToolbar"),
  flashcardUnitSelect: document.getElementById("flashcardUnitSelect"),
  flashcardCard: document.getElementById("flashcardCard"),
  flashcardQuestion: document.getElementById("flashcardQuestion"),
  flashcardImageWrap: document.getElementById("flashcardImageWrap"),
  flashcardImage: document.getElementById("flashcardImage"),
  flashcardRevealBtn: document.getElementById("flashcardRevealBtn"),
  flashcardAnswerArea: document.getElementById("flashcardAnswerArea"),
  flashcardAnswerList: document.getElementById("flashcardAnswerList"),
  flashcardPrevBtn: document.getElementById("flashcardPrevBtn"),
  flashcardShuffleBtn: document.getElementById("flashcardShuffleBtn"),
  flashcardNextBtn: document.getElementById("flashcardNextBtn"),
  flashcardActions: document.getElementById("flashcardActions"),
  statusMessage: document.getElementById("statusMessage"),
};

const state = loadState();
let activeScreen = "home";
let homeGreetingTimerId = null;
let dailyTryRun = createDailyTryRun();
let themeFadeTimerId = null;
let activeMypagePage = "top";
let selfcheckTimerRemainingSeconds = SELFCHECK_DEFAULT_TIMER_SECONDS;
let selfcheckTimerIntervalId = null;
let calendarViewDate = getCurrentMonthStartDate();
let auth0Client = null;
let reviewCoinAnimationFrameId = null;
let flashcardState = createInitialFlashcardState();
let isFlashcardFocusMode = false;
let isSelfcheckTimerFocusMode = false;
let pendingGuestModeAppState = null;
const IS_LOGIN_PAGE = isCurrentLoginPage();

if (IS_LOGIN_PAGE) {
  initLoginPage()
    .catch((error) => {
      console.error("Login page initialization failed:", error);
      showStatus("ログイン画面の初期化に失敗しました。時間をおいて再試行してください。");
    })
    .finally(() => {
      hideAppLoader();
    });
} else {
  init()
    .catch((error) => {
      console.error("App initialization failed:", error);
      showStatus("初期化でエラーが発生しました。画面を再読み込みしてください。");
    })
    .finally(() => {
      hideAppLoader();
    });
}

function isCurrentLoginPage() {
  const pathname = String(window.location.pathname || "").toLowerCase();
  if (/(^|[\\/])login\.html$/.test(pathname)) {
    return true;
  }
  return Boolean(document.body?.classList.contains("login-page"));
}

async function init() {
  ensureInitialCoinGrant();
  await initializeAuth();
  if (redirectToLoginPageIfNeeded()) {
    return;
  }
  bindSharedDataAndGuestDialogEvents();
  applyTheme(state.settings.theme);
  applyAccessibilityModes();
  applyTypographySettings();
  injectTabScriptLabels();
  bindBeforeUnloadPrompt();
  markDailyLogin();
  bindEvents();
  initializeFlashcards();
  startHomeGreetingTicker();
  renderAll();
  activateScreen(activeScreen);
}

async function initLoginPage() {
  if (state.auth.isLoggedIn) {
    redirectToIndexPage();
    return;
  }

  bindSharedDataAndGuestDialogEvents();
  bindLoginPageAuthEvents();
  await initializeAuth();
  renderAuthPanel();

  if (state.auth.isLoggedIn) {
    redirectToIndexPage();
  }
}

function redirectToLoginPageIfNeeded() {
  if (IS_LOGIN_PAGE) {
    return false;
  }
  if (state.auth.isLoggedIn) {
    return false;
  }
  redirectToLoginPage();
  return true;
}

function redirectToIndexPage() {
  window.location.replace("./index.html");
}

function getLoginPageUrl() {
  return new URL("./login.html", window.location.href).toString();
}

function redirectToLoginPage() {
  window.location.replace(getLoginPageUrl());
}

function bindLoginPageAuthEvents() {
  elements.authLoginButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const provider = normalizeAuthLoginProvider(button.dataset.authProvider);
      if (!provider) {
        return;
      }
      if (provider === "guest") {
        requestGuestModeLogin({
          targetScreen: "mypage",
          targetMypagePage: "top",
          deferRedirectOnLoginPage: true,
        });
        return;
      }
      await loginWithAuth0(
        {
          targetScreen: "mypage",
          targetMypagePage: "top",
        },
        { provider }
      );
    });
  });
}

function bindSharedDataAndGuestDialogEvents() {
  if (elements.reviewDataExportBtn) {
    elements.reviewDataExportBtn.addEventListener("click", exportReviewData);
  }
  if (elements.reviewDataImportBtn) {
    elements.reviewDataImportBtn.addEventListener("click", () => {
      openReviewDataImportPicker();
    });
  }
  if (elements.reviewDataImportInput) {
    elements.reviewDataImportInput.addEventListener("change", handleReviewDataImportSelection);
  }
  elements.guestModeActionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleGuestModeDialogAction(button.dataset.guestModeAction);
    });
  });
}

function injectTabScriptLabels() {
  const panelsWithLabels = [
    {
      selector: "#screen-login .auth-panel",
      label: "Login",
    },
    {
      selector: "#mypageFlashcardPanel",
      label: "Flashcards",
    },
    {
      selector: "#mypageQuestPanel",
      label: "Quest",
    },
    {
      selector: "#screen-notice .panel",
      label: "Information",
    },
  ];

  panelsWithLabels.forEach(({ selector, label }) => {
    const panel = document.querySelector(selector);
    appendTabScriptLabel(panel, label);
  });

  const selfcheckSections = Array.from(document.querySelectorAll("#mypage-selfcheck .selfcheck-section"));
  appendTabScriptLabel(selfcheckSections[0] ?? null, "Calender");
  appendTabScriptLabel(selfcheckSections[1] ?? null, "Timer");

  const customizeSections = Array.from(document.querySelectorAll("#mypage-customize .settings-section"));
  const customizeLabels = ["Number of Review Coins", "Avatar", "Color Schemes"];
  customizeLabels.forEach((label, index) => {
    appendTabScriptLabel(customizeSections[index] ?? null, label);
  });

  const settingsSections = Array.from(document.querySelectorAll("#mypage-settings .settings-section"));
  const settingsLabels = ["Login Status", "Accessibility", "Notice", "Review Data", "Reset"];
  settingsLabels.forEach((label, index) => {
    appendTabScriptLabel(settingsSections[index] ?? null, label);
  });
}

function appendTabScriptLabel(panel, label) {
  if (!panel || !label) {
    return;
  }
  panel.classList.add("tab-script-panel");
  const existingScript = panel.querySelector(".tab-script");
  if (existingScript) {
    existingScript.textContent = label;
    return;
  }
  const script = document.createElement("p");
  script.className = "tab-script";
  script.textContent = label;
  panel.appendChild(script);
}

function hideAppLoader() {
  if (!elements.appLoader) {
    return;
  }
  elements.appLoader.classList.add("is-hidden");
  const removeLoader = () => {
    elements.appLoader?.remove();
  };
  elements.appLoader.addEventListener("transitionend", removeLoader, { once: true });
  window.setTimeout(removeLoader, 500);
}

function ensureInitialCoinGrant() {
  if (state.coinGrant5000Applied) {
    return;
  }
  state.reviewCoin = 5000;
  state.coinGrant5000Applied = true;
  saveState();
}

function bindBeforeUnloadPrompt() {
  window.onbeforeunload = (event) => {
    event.preventDefault();
    event.returnValue = "";
    return "";
  };
}

function bindEvents() {
  if (elements.reviewCoinBoard) {
    elements.reviewCoinBoard.addEventListener("click", openMypageCustomizeFromCoinBoard);
    elements.reviewCoinBoard.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }
      event.preventDefault();
      openMypageCustomizeFromCoinBoard();
    });
  }

  elements.navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const screen = button.dataset.screen;
      if (!screen) {
        return;
      }
      if (screen === "mypage" && activeScreen === "mypage" && state.auth.isLoggedIn) {
        toggleMypageSubmenu();
        return;
      }

      closeMypageSubmenu();
      if (screen === "mypage" && !state.auth.isLoggedIn) {
        promptLoginForMypage();
        return;
      }
      activateScreen(screen);
      if (screen === "mypage") {
        setMypagePage("top");
      }
    });
  });

  elements.authLoginButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const provider = normalizeAuthLoginProvider(button.dataset.authProvider);
      if (!provider) {
        return;
      }
      if (provider === "guest") {
        requestGuestModeLogin({
          targetScreen: "mypage",
          targetMypagePage: "top",
        });
        return;
      }
      await loginWithAuth0(
        {
          targetScreen: "mypage",
          targetMypagePage: "top",
        },
        { provider }
      );
    });
  });

  if (elements.dailyTrySubmitBtn) {
    elements.dailyTrySubmitBtn.addEventListener("click", submitDailyTryAnswer);
  }

  if (elements.flashcardSeriesButtons) {
    elements.flashcardSeriesButtons.addEventListener("click", (event) => {
      const button = event.target.closest("[data-flashcard-series-id]");
      if (!button) {
        return;
      }
      const nextSeriesId = normalizeFlashcardText(button.dataset.flashcardSeriesId);
      if (!nextSeriesId || nextSeriesId === flashcardState.selectedSeriesId) {
        return;
      }
      flashcardState.selectedSeriesId = nextSeriesId;
      flashcardState.selectedDeckId = "";
      flashcardState.selectedUnitId = "";
      flashcardState.cardIndex = 0;
      flashcardState.answerVisible = false;
      renderFlashcardPanel();
    });
  }

  if (elements.flashcardSubjectButtons) {
    elements.flashcardSubjectButtons.addEventListener("click", (event) => {
      const button = event.target.closest("[data-flashcard-deck-id]");
      if (!button) {
        return;
      }
      const nextDeckId = normalizeFlashcardText(button.dataset.flashcardDeckId);
      if (!nextDeckId || nextDeckId === flashcardState.selectedDeckId) {
        return;
      }
      flashcardState.selectedDeckId = nextDeckId;
      flashcardState.selectedUnitId = "";
      flashcardState.cardIndex = 0;
      flashcardState.answerVisible = false;
      renderFlashcardPanel();
    });
  }

  if (elements.flashcardUnitSelect) {
    elements.flashcardUnitSelect.addEventListener("change", () => {
      flashcardState.selectedUnitId = elements.flashcardUnitSelect.value;
      flashcardState.cardIndex = 0;
      flashcardState.answerVisible = false;
      renderFlashcardPanel();
    });
  }

  if (elements.flashcardCard) {
    elements.flashcardCard.addEventListener("click", (event) => {
      const actionElement = event.target.closest("[data-flashcard-action]");
      if (!actionElement || actionElement.dataset.flashcardAction !== "toggle-answer") {
        return;
      }
      toggleFlashcardAnswer();
    });
  }

  if (elements.flashcardPrevBtn) {
    elements.flashcardPrevBtn.addEventListener("click", () => {
      shiftFlashcardIndex(-1);
    });
  }

  if (elements.flashcardNextBtn) {
    elements.flashcardNextBtn.addEventListener("click", () => {
      shiftFlashcardIndex(1);
    });
  }

  if (elements.flashcardShuffleBtn) {
    elements.flashcardShuffleBtn.addEventListener("click", () => {
      jumpToRandomFlashcard();
    });
  }

  if (elements.flashcardFullscreenBtn) {
    elements.flashcardFullscreenBtn.addEventListener("click", () => {
      toggleFlashcardFocusMode();
    });
  }
  if (elements.selfcheckTimerFullscreenBtn) {
    elements.selfcheckTimerFullscreenBtn.addEventListener("click", () => {
      toggleSelfcheckTimerFocusMode();
    });
  }

  if (elements.logoutBtn) {
    elements.logoutBtn.addEventListener("click", logoutAccount);
  }

  if (elements.deleteAccountBtn) {
    elements.deleteAccountBtn.addEventListener("click", deleteAccountAndResetProgress);
  }

  elements.themeCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (isModeThemeActive()) {
        return;
      }
      handleThemeCardClick(card.dataset.themeChoice);
    });
  });

  if (elements.highContrastToggle) {
    elements.highContrastToggle.addEventListener("change", () => {
      updateAccessibilityMode("highContrast", elements.highContrastToggle.checked);
    });
  }

  if (elements.monochromeToggle) {
    elements.monochromeToggle.addEventListener("change", () => {
      updateAccessibilityMode("monochrome", elements.monochromeToggle.checked);
    });
  }

  if (elements.textSizeRange) {
    elements.textSizeRange.addEventListener("input", () => {
      updateTextSetting("size", elements.textSizeRange.value);
    });
  }

  if (elements.textWeightRange) {
    elements.textWeightRange.addEventListener("input", () => {
      updateTextSetting("weight", elements.textWeightRange.value);
    });
  }

  if (elements.textSpacingRange) {
    elements.textSpacingRange.addEventListener("input", () => {
      updateTextSetting("spacing", elements.textSpacingRange.value);
    });
  }

  if (elements.notifyReviewPeriodToggle) {
    elements.notifyReviewPeriodToggle.addEventListener("change", () => {
      updateNotificationSetting("dailyLogin", elements.notifyReviewPeriodToggle.checked);
    });
  }

  if (elements.notifyTodaysMissionToggle) {
    elements.notifyTodaysMissionToggle.addEventListener("change", () => {
      updateNotificationSetting("dailyTry", elements.notifyTodaysMissionToggle.checked);
    });
  }

  if (elements.notifyNoticeToggle) {
    elements.notifyNoticeToggle.addEventListener("change", () => {
      updateNotificationSetting("notice", elements.notifyNoticeToggle.checked);
    });
  }

  if (elements.textResetDialogOpenBtn) {
    elements.textResetDialogOpenBtn.addEventListener("click", openTextResetDialog);
  }

  elements.textResetActionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      resetTextSettingByAction(button.dataset.textResetAction);
    });
  });

  if (elements.selfcheckTimerStartBtn) {
    elements.selfcheckTimerStartBtn.addEventListener("click", startSelfcheckTimer);
  }
  if (elements.selfcheckTimerPauseBtn) {
    elements.selfcheckTimerPauseBtn.addEventListener("click", pauseSelfcheckTimer);
  }
  if (elements.selfcheckTimerResetBtn) {
    elements.selfcheckTimerResetBtn.addEventListener("click", resetSelfcheckTimer);
  }
  if (elements.calendarPrevMonthBtn) {
    elements.calendarPrevMonthBtn.addEventListener("click", () => {
      moveSelfcheckCalendarMonth(-1);
    });
  }
  if (elements.calendarNextMonthBtn) {
    elements.calendarNextMonthBtn.addEventListener("click", () => {
      moveSelfcheckCalendarMonth(1);
    });
  }

  elements.mypageSubmenuItems.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.mypageTarget;
      if (!target) {
        return;
      }
      closeMypageSubmenu();
      if (activeScreen !== "mypage") {
        activateScreen("mypage");
      }
      setMypagePage(target);
    });
  });

  document.addEventListener("click", (event) => {
    if (!isMypageSubmenuOpen()) {
      return;
    }
    const clickedInsideSubmenu = elements.mypageSubmenu?.contains(event.target);
    const clickedMypageButton = elements.mypageNavButton?.contains(event.target);
    if (clickedInsideSubmenu || clickedMypageButton) {
      return;
    }
    closeMypageSubmenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMypageSubmenu();
      if (isFlashcardFocusMode || isSelfcheckTimerFocusMode) {
        setFlashcardFocusMode(false);
        setSelfcheckTimerFocusMode(false);
      }
    }
  });

  window.addEventListener("resize", () => {
    renderDailyLogin();
  });
}

function activateScreen(screen) {
  const normalizedScreen = normalizeScreen(screen);
  activeScreen = normalizedScreen;
  elements.screens.forEach((element) => {
    element.classList.toggle("is-active", element.id === `screen-${normalizedScreen}`);
  });
  elements.navButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.screen === normalizedScreen);
  });
  if (normalizedScreen === "mypage") {
    setMypagePage(activeMypagePage);
  } else {
    closeMypageSubmenu();
  }
  renderFlashcardFocusMode();
}

function promptLoginForMypage() {
  activateScreen("login");
  showStatus("マイページを見るにはログインまたはGuest Modeが必要です。");
}

function requestGuestModeLogin(appState = {}) {
  pendingGuestModeAppState = {
    targetScreen: "mypage",
    targetMypagePage: "top",
    ...appState,
  };

  if (!elements.guestModeDialog || typeof elements.guestModeDialog.showModal !== "function") {
    const shouldContinue = window.confirm(
      "データはサーバー上に保存されず、お持ちのデバイスに保存されます。よろしいですか？"
    );
    if (!shouldContinue) {
      pendingGuestModeAppState = null;
      return;
    }
    proceedGuestModeLogin();
    return;
  }
  if (!elements.guestModeDialog.open) {
    elements.guestModeDialog.showModal();
  }
}

function handleGuestModeDialogAction(action) {
  const normalizedAction = typeof action === "string" ? action.trim().toLowerCase() : "";
  if (normalizedAction === "cancel") {
    closeGuestModeDialog();
    pendingGuestModeAppState = null;
    return;
  }
  if (normalizedAction === "import") {
    openReviewDataImportPicker();
    return;
  }
  if (normalizedAction === "ok") {
    closeGuestModeDialog();
    proceedGuestModeLogin();
  }
}

function closeGuestModeDialog() {
  if (elements.guestModeDialog?.open) {
    elements.guestModeDialog.close();
  }
}

function proceedGuestModeLogin() {
  const appState = pendingGuestModeAppState
    ? {
        ...pendingGuestModeAppState,
      }
    : {
        targetScreen: "mypage",
        targetMypagePage: "top",
      };
  const shouldDeferRedirectOnLoginPage = IS_LOGIN_PAGE && Boolean(appState?.deferRedirectOnLoginPage);
  pendingGuestModeAppState = null;
  loginAsGuest(appState);
  if (IS_LOGIN_PAGE && !shouldDeferRedirectOnLoginPage) {
    redirectToIndexPage();
  }
}

function loginAsGuest(appState = {}) {
  state.auth = normalizeAuthState({
    isLoggedIn: true,
    provider: "guest",
    displayName: "Guest Mode",
    email: null,
  });
  saveState();
  applyAuthRedirectState(appState);
  closeMypageSubmenu();
  renderMypageSettings();
  renderAuthPanel();
  activateScreen(normalizeScreen(appState?.targetScreen));
  if (normalizeScreen(appState?.targetScreen) === "mypage") {
    setMypagePage(normalizeMypagePage(appState?.targetMypagePage));
  }
  markDailyLogin();
  renderDailyLogin();
  showStatus("Guest Modeで開始しました。");
}

async function loginWithAuth0(appState, options = {}) {
  if (normalizeAuthLoginProvider(options.provider) === "guest") {
    loginAsGuest(appState);
    return;
  }
  if (!auth0Client) {
    showStatus("Auth0設定が未完了です。auth0-config.js を確認してください。");
    renderAuthPanel();
    return;
  }
  const provider = normalizeAuthLoginProvider(options.provider);
  const providerLabel = provider ? formatAuthProviderLabel(provider) : "Auth0";
  const connection = provider ? getAuthConnectionForProvider(provider) : "";
  if (provider && requiresAuthConnection(provider) && !connection) {
    showStatus(`${providerLabel}ログインの接続設定が見つかりません。auth0-config.js を確認してください。`);
    renderAuthPanel();
    return;
  }
  try {
    const loginOptions = {
      appState: {
        targetScreen: "mypage",
        targetMypagePage: "top",
        ...appState,
      },
    };
    if (connection) {
      loginOptions.authorizationParams = { connection };
    }
    await auth0Client.loginWithRedirect(loginOptions);
  } catch (error) {
    console.error("Auth0 login failed:", error);
    showStatus(`${providerLabel}ログインに失敗しました。設定を確認して再試行してください。`);
  }
}

async function logoutAccount() {
  if (!state.auth.isLoggedIn) {
    showStatus("すでにログアウトしています。");
    return;
  }
  if (state.auth.provider === "guest") {
    applyLoggedOutState();
    redirectToLoginPage();
    return;
  }
  if (auth0Client) {
    try {
      await auth0Client.logout({
        logoutParams: {
          returnTo: getLoginPageUrl(),
        },
      });
    } catch (error) {
      console.error("Auth0 logout failed:", error);
      applyLoggedOutState();
      redirectToLoginPage();
    }
    return;
  }

  applyLoggedOutState();
  redirectToLoginPage();
}

async function initializeAuth() {
  const shouldPreserveGuest = state.auth.isLoggedIn && state.auth.provider === "guest";
  if (!isAuth0SdkAvailable()) {
    auth0Client = null;
    if (!shouldPreserveGuest) {
      setLoggedOutAuthState();
      saveState();
      showStatus("Auth0 SDKの読み込みに失敗しました。ネットワーク接続を確認してください。");
    }
    return;
  }
  if (!isAuth0Configured()) {
    auth0Client = null;
    if (!shouldPreserveGuest) {
      setLoggedOutAuthState();
      saveState();
    }
    return;
  }

  auth0Client = await window.auth0.createAuth0Client({
    domain: AUTH0_CONFIG.domain,
    clientId: AUTH0_CONFIG.clientId,
    authorizationParams: buildAuth0AuthorizationParams(),
  });

  let appStateFromRedirect = null;
  if (hasAuth0CallbackParams()) {
    const redirectResult = await auth0Client.handleRedirectCallback();
    appStateFromRedirect = redirectResult?.appState ?? null;
    clearAuth0CallbackParamsFromUrl();
  }

  await syncAuthStateFromAuth0({ preserveGuest: shouldPreserveGuest });
  if (appStateFromRedirect) {
    applyAuthRedirectState(appStateFromRedirect);
  }
}

function isAuth0SdkAvailable() {
  return Boolean(window.auth0?.createAuth0Client);
}

function isAuth0Configured() {
  const hasRequiredFields = Boolean(AUTH0_CONFIG.domain && AUTH0_CONFIG.clientId);
  if (!hasRequiredFields) {
    return false;
  }
  if (AUTH0_CONFIG.domain.includes("YOUR_") || AUTH0_CONFIG.clientId.includes("YOUR_")) {
    return false;
  }
  return true;
}

function buildAuth0AuthorizationParams() {
  const params = {
    redirect_uri: AUTH0_CONFIG.redirectUri,
    scope: AUTH0_CONFIG.scope || AUTH0_DEFAULT_SCOPE,
  };
  if (AUTH0_CONFIG.audience) {
    params.audience = AUTH0_CONFIG.audience;
  }
  return params;
}

function normalizeAuthLoginProvider(value) {
  const normalized = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (normalized === "auth0" || normalized === "google" || normalized === "guest") {
    return normalized;
  }
  return null;
}

function formatAuthProviderLabel(provider) {
  if (provider === "auth0") {
    return "Auth0";
  }
  if (provider === "google") {
    return "Google";
  }
  if (provider === "guest") {
    return "Guest Mode";
  }
  return "Auth0";
}

function getAuthConnectionForProvider(provider) {
  if (provider === "auth0") {
    return AUTH0_CONFIG.defaultConnection;
  }
  if (provider === "google") {
    return AUTH0_CONFIG.googleConnection;
  }
  if (provider === "guest") {
    return "local-guest";
  }
  return "";
}

function requiresAuthConnection(provider) {
  return provider === "google";
}

function detectAuthProviderFromUser(user) {
  const subject = typeof user?.sub === "string" ? user.sub.trim() : "";
  if (!subject) {
    return "auth0";
  }
  const [providerToken] = subject.split("|");
  if (providerToken === "google-oauth2") {
    return "google";
  }
  return providerToken || "auth0";
}

function hasAuth0CallbackParams() {
  const params = new URLSearchParams(window.location.search);
  return params.has("code") && params.has("state");
}

function clearAuth0CallbackParamsFromUrl() {
  const cleanUrl = `${window.location.pathname}${window.location.hash}`;
  window.history.replaceState({}, document.title, cleanUrl);
}

async function syncAuthStateFromAuth0(options = {}) {
  const preserveGuest = Boolean(options.preserveGuest);
  if (!auth0Client) {
    if (preserveGuest && state.auth.isLoggedIn && state.auth.provider === "guest") {
      return;
    }
    setLoggedOutAuthState();
    saveState();
    return;
  }

  const isAuthenticated = await auth0Client.isAuthenticated();
  if (!isAuthenticated) {
    if (preserveGuest && state.auth.isLoggedIn && state.auth.provider === "guest") {
      return;
    }
    setLoggedOutAuthState();
    saveState();
    return;
  }

  const user = await auth0Client.getUser();
  state.auth = normalizeAuthState({
    isLoggedIn: true,
    provider: detectAuthProviderFromUser(user),
    displayName:
      (typeof user?.name === "string" && user.name.trim()) ||
      (typeof user?.nickname === "string" && user.nickname.trim()) ||
      "Auth0 User",
    email: typeof user?.email === "string" && user.email.trim() ? user.email : null,
  });
  saveState();
}

function applyAuthRedirectState(appState) {
  const targetScreen = normalizeScreen(appState?.targetScreen);
  if (targetScreen === "mypage") {
    activeMypagePage = normalizeMypagePage(appState?.targetMypagePage);
  }
  activeScreen = targetScreen;
}

function setLoggedOutAuthState() {
  state.auth = normalizeAuthState({
    isLoggedIn: false,
    provider: null,
    displayName: "Guest Mode",
    email: null,
  });
}

function applyLoggedOutState() {
  setLoggedOutAuthState();
  saveState();
  renderMypageSettings();
  renderAuthPanel();

  if (activeScreen === "mypage") {
    activateScreen("home");
  }
  closeMypageSubmenu();
}

function deleteAccountAndResetProgress() {
  const shouldDelete = window.confirm(
    "アカウントを削除して進捗をリセットします。\nリビューコイン・デイリーログイン・問題履歴は削除されます。よろしいですか？"
  );
  if (!shouldDelete) {
    return;
  }

  state.reviewCoin = 0;
  state.loginDays = {};
  state.dailyTryRecords = {};
  state.auth = normalizeAuthState({
    isLoggedIn: false,
    provider: null,
    displayName: "Guest Mode",
    email: null,
  });
  state.settings = {
    ...state.settings,
    theme: DEFAULT_THEME,
    unlockedThemes: createDefaultThemeUnlockState(),
  };
  applyTheme(state.settings.theme);
  dailyTryRun = createDailyTryRun();
  pauseSelfcheckTimer();
  selfcheckTimerRemainingSeconds = SELFCHECK_DEFAULT_TIMER_SECONDS;
  saveState();
  renderAll();
  closeMypageSubmenu();
  if (activeScreen === "mypage") {
    activateScreen("home");
  }
  showStatus("アカウントと進捗をリセットしました。");
}

function renderAll() {
  renderCoinBoard({ fromZero: true });
  renderMypageCoin();
  renderMypageSettings();
  renderAuthPanel();
  renderFlashcardPanel();
  setMypagePage(activeMypagePage);
  renderSelfcheckCalendar();
  renderSelfcheckTimerDisplay();
  updateSelfcheckTimerButtons();
  renderHomeGreeting();
  renderDailyLogin();
  renderDailyTryPanel();
}

function createInitialFlashcardState() {
  return {
    decks: [],
    selectedSeriesId: "",
    selectedDeckId: "",
    selectedUnitId: "",
    cardIndex: 0,
    answerVisible: false,
  };
}

function initializeFlashcards() {
  flashcardState = {
    ...createInitialFlashcardState(),
    decks: collectFlashcardDecks(),
  };
  clampFlashcardState();
}

function collectFlashcardDecks() {
  return FLASHCARD_DATASET_SOURCES.map((source) => normalizeFlashcardDeck(source, source.resolve())).filter(Boolean);
}

function normalizeFlashcardDeck(source, dataset) {
  if (!dataset || typeof dataset !== "object" || Array.isArray(dataset)) {
    return null;
  }

  const units = Object.entries(dataset)
    .map(([unitName, cards], unitIndex) => normalizeFlashcardUnit(source.id, unitName, cards, unitIndex))
    .filter(Boolean);
  if (units.length === 0) {
    return null;
  }

  return {
    id: source.id,
    label: source.label,
    seriesId: normalizeFlashcardText(source.seriesId) || FLASHCARD_DEFAULT_SERIES.id,
    seriesLabel: normalizeFlashcardText(source.seriesLabel) || FLASHCARD_DEFAULT_SERIES.label,
    units,
    totalCards: units.reduce((sum, unit) => sum + unit.cards.length, 0),
  };
}

function normalizeFlashcardUnit(sourceId, unitName, rawCards, unitIndex) {
  if (!Array.isArray(rawCards)) {
    return null;
  }
  const cards = rawCards
    .map((rawCard, cardIndex) => normalizeFlashcardCard(rawCard, sourceId, unitIndex, cardIndex))
    .filter(Boolean);
  if (cards.length === 0) {
    return null;
  }

  const normalizedUnitName = normalizeFlashcardText(unitName);
  return {
    id: `${sourceId}-unit-${unitIndex + 1}`,
    label: normalizedUnitName || `章${unitIndex + 1}`,
    cards,
  };
}

function normalizeFlashcardCard(rawCard, sourceId, unitIndex, cardIndex) {
  if (!rawCard || typeof rawCard !== "object") {
    return null;
  }
  const prompt = normalizeFlashcardText(rawCard.q ?? rawCard.question ?? rawCard.prompt);
  if (!prompt) {
    return null;
  }

  const answers = normalizeFlashcardAnswers(rawCard);
  return {
    id: `${sourceId}-u${unitIndex + 1}-c${cardIndex + 1}`,
    prompt,
    imageSrc: resolveFlashcardImageSrc(rawCard.i ?? rawCard.image ?? rawCard.img),
    imageAlt: normalizeFlashcardText(rawCard.iAlt ?? rawCard.imageAlt ?? rawCard.alt),
    answers,
  };
}

function normalizeFlashcardAnswers(rawCard) {
  let sourceAnswers = [];
  if (Array.isArray(rawCard.a)) {
    sourceAnswers = rawCard.a;
  } else if (Array.isArray(rawCard.answers)) {
    sourceAnswers = rawCard.answers;
  } else if (rawCard.a != null) {
    sourceAnswers = [rawCard.a];
  } else if (rawCard.answer != null) {
    sourceAnswers = [rawCard.answer];
  }

  const answers = sourceAnswers.map((answer) => normalizeFlashcardText(answer)).filter(Boolean);
  if (answers.length > 0) {
    return answers;
  }
  return ["（答えデータなし）"];
}

function normalizeFlashcardText(value) {
  if (typeof value === "string") {
    return value.trim();
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }
  return "";
}

function resolveFlashcardImageSrc(value) {
  const rawPath = normalizeFlashcardText(value);
  if (!rawPath) {
    return "";
  }
  const normalized = rawPath.replaceAll("\\", "/");
  if (/^(?:https?:)?\/\//.test(normalized) || normalized.startsWith("./") || normalized.startsWith("/")) {
    return normalized;
  }
  if (normalized.startsWith("data/")) {
    return `./${normalized}`;
  }
  return `./data/${normalized}`;
}

function getFlashcardSeriesList() {
  if (!Array.isArray(flashcardState.decks) || flashcardState.decks.length === 0) {
    return [];
  }

  const seenSeriesIds = new Set();
  return flashcardState.decks.reduce((seriesList, deck) => {
    const seriesId = normalizeFlashcardText(deck.seriesId) || FLASHCARD_DEFAULT_SERIES.id;
    if (seenSeriesIds.has(seriesId)) {
      return seriesList;
    }
    seenSeriesIds.add(seriesId);
    seriesList.push({
      id: seriesId,
      label: normalizeFlashcardText(deck.seriesLabel) || FLASHCARD_DEFAULT_SERIES.label,
    });
    return seriesList;
  }, []);
}

function getFlashcardDecksInSeries(seriesId) {
  const normalizedSeriesId = normalizeFlashcardText(seriesId);
  if (!normalizedSeriesId) {
    return [];
  }
  return flashcardState.decks.filter((deck) => deck.seriesId === normalizedSeriesId);
}

function getActiveFlashcardSeries() {
  const seriesList = getFlashcardSeriesList();
  return seriesList.find((series) => series.id === flashcardState.selectedSeriesId) ?? null;
}

function clampFlashcardState() {
  if (!Array.isArray(flashcardState.decks) || flashcardState.decks.length === 0) {
    flashcardState.selectedSeriesId = "";
    flashcardState.selectedDeckId = "";
    flashcardState.selectedUnitId = "";
    flashcardState.cardIndex = 0;
    flashcardState.answerVisible = false;
    return;
  }

  const seriesList = getFlashcardSeriesList();
  const activeSeries = seriesList.find((item) => item.id === flashcardState.selectedSeriesId) ?? null;
  if (!activeSeries) {
    flashcardState.selectedSeriesId = "";
    flashcardState.selectedDeckId = "";
    flashcardState.selectedUnitId = "";
    flashcardState.cardIndex = 0;
    flashcardState.answerVisible = false;
    return;
  }

  const decksInSeries = getFlashcardDecksInSeries(activeSeries.id);
  if (decksInSeries.length === 0) {
    flashcardState.selectedDeckId = "";
    flashcardState.selectedUnitId = "";
    flashcardState.cardIndex = 0;
    flashcardState.answerVisible = false;
    return;
  }

  const deck = decksInSeries.find((item) => item.id === flashcardState.selectedDeckId) ?? null;
  if (!deck) {
    flashcardState.selectedDeckId = "";
    flashcardState.selectedUnitId = "";
    flashcardState.cardIndex = 0;
    flashcardState.answerVisible = false;
    return;
  }

  const unit = deck.units.find((item) => item.id === flashcardState.selectedUnitId) ?? deck.units[0];
  flashcardState.selectedUnitId = unit.id;

  const maxIndex = Math.max(0, unit.cards.length - 1);
  const parsedIndex = Number(flashcardState.cardIndex);
  flashcardState.cardIndex = Number.isFinite(parsedIndex) ? Math.floor(parsedIndex) : 0;
  flashcardState.cardIndex = Math.max(0, Math.min(maxIndex, flashcardState.cardIndex));
}

function getActiveFlashcardDeck() {
  const decksInSeries = getFlashcardDecksInSeries(flashcardState.selectedSeriesId);
  return decksInSeries.find((deck) => deck.id === flashcardState.selectedDeckId) ?? null;
}

function getActiveFlashcardUnit() {
  const deck = getActiveFlashcardDeck();
  if (!deck) {
    return null;
  }
  return deck.units.find((unit) => unit.id === flashcardState.selectedUnitId) ?? null;
}

function getActiveFlashcardCard() {
  const unit = getActiveFlashcardUnit();
  if (!unit || unit.cards.length === 0) {
    return null;
  }
  return unit.cards[flashcardState.cardIndex] ?? null;
}

function renderFlashcardPanel() {
  if (!elements.flashcardSummary) {
    return;
  }

  clampFlashcardState();
  const decks = flashcardState.decks;
  const seriesList = getFlashcardSeriesList();
  const activeSeries = getActiveFlashcardSeries();
  const decksInSeries = getFlashcardDecksInSeries(activeSeries?.id);
  renderFlashcardSeriesButtons(seriesList, activeSeries?.id ?? "");
  renderFlashcardSubjectButtons(decksInSeries, flashcardState.selectedDeckId);
  if (decks.length === 0) {
    elements.flashcardSummary.textContent = "問題データが見つかりません。data フォルダの読み込みを確認してください。";
    updateSelectOptions(elements.flashcardUnitSelect, [], "", true);
    setFlashcardStudyControlsVisibility(false);
    if (elements.flashcardCard) {
      elements.flashcardCard.hidden = true;
    }
    setFlashcardAnswerVisibility(false);
    renderFlashcardImage(null);
    updateFlashcardActionButtons(0);
    return;
  }

  if (!activeSeries) {
    elements.flashcardSummary.textContent = "教材を選択してください。";
    updateSelectOptions(elements.flashcardUnitSelect, [], "", true);
    setFlashcardStudyControlsVisibility(false);
    if (elements.flashcardCard) {
      elements.flashcardCard.hidden = true;
    }
    setFlashcardAnswerVisibility(false);
    renderFlashcardImage(null);
    updateFlashcardActionButtons(0);
    return;
  }

  const activeDeck = getActiveFlashcardDeck();
  if (!activeDeck) {
    elements.flashcardSummary.textContent = `${activeSeries.label}の科目を選択してください。`;
    updateSelectOptions(elements.flashcardUnitSelect, [], "", true);
    setFlashcardStudyControlsVisibility(false);
    if (elements.flashcardCard) {
      elements.flashcardCard.hidden = true;
    }
    setFlashcardAnswerVisibility(false);
    renderFlashcardImage(null);
    updateFlashcardActionButtons(0);
    return;
  }

  const activeUnit = getActiveFlashcardUnit();
  const activeCard = getActiveFlashcardCard();
  if (!activeUnit || !activeCard) {
    elements.flashcardSummary.textContent = "表示できる問題がありません。";
    setFlashcardStudyControlsVisibility(false);
    if (elements.flashcardCard) {
      elements.flashcardCard.hidden = true;
    }
    setFlashcardAnswerVisibility(false);
    renderFlashcardImage(null);
    updateFlashcardActionButtons(0);
    return;
  }

  const totalUnits = decksInSeries.reduce((sum, deck) => sum + deck.units.length, 0);
  const totalCards = decksInSeries.reduce((sum, deck) => sum + deck.totalCards, 0);
  elements.flashcardSummary.textContent = `${activeSeries.label} / ${decksInSeries.length}科目 / ${totalUnits}章 / ${totalCards}問 / ${activeDeck.label} > ${activeUnit.label} (${flashcardState.cardIndex + 1}/${activeUnit.cards.length})`;

  updateSelectOptions(
    elements.flashcardUnitSelect,
    activeDeck.units.map((unit) => ({ value: unit.id, label: `${unit.label} (${unit.cards.length}問)` })),
    activeUnit.id,
    activeDeck.units.length <= 1
  );
  setFlashcardStudyControlsVisibility(true);

  if (elements.flashcardCard) {
    elements.flashcardCard.hidden = false;
  }
  if (elements.flashcardQuestion) {
    elements.flashcardQuestion.textContent = activeCard.prompt;
  }
  renderFlashcardImage(activeCard);

  renderFlashcardAnswerList(activeCard.answers);
  setFlashcardAnswerVisibility(flashcardState.answerVisible);
  if (elements.flashcardRevealBtn) {
    elements.flashcardRevealBtn.textContent = flashcardState.answerVisible ? "答えを隠す" : "答えを表示";
    elements.flashcardRevealBtn.disabled = activeCard.answers.length === 0;
    elements.flashcardRevealBtn.setAttribute("aria-pressed", String(flashcardState.answerVisible));
  }

  updateFlashcardActionButtons(activeUnit.cards.length);
}

function renderFlashcardSeriesButtons(seriesList, activeSeriesId) {
  renderFlashcardChoiceButtons(
    elements.flashcardSeriesButtons,
    seriesList.map((series) => ({ value: series.id, label: series.label })),
    activeSeriesId,
    "flashcardSeriesId",
    "教材データなし"
  );
}

function renderFlashcardSubjectButtons(decks, activeDeckId) {
  const safeDecks = Array.isArray(decks) ? decks : [];
  renderFlashcardChoiceButtons(
    elements.flashcardSubjectButtons,
    safeDecks.map((deck) => ({ value: deck.id, label: `${deck.label} (${deck.totalCards}問)` })),
    activeDeckId,
    "flashcardDeckId",
    "科目データなし"
  );
  if (elements.flashcardSubjectGroup) {
    elements.flashcardSubjectGroup.hidden = safeDecks.length === 0;
  }
}

function renderFlashcardChoiceButtons(container, options, activeValue, datasetKey, emptyText) {
  if (!container) {
    return;
  }
  container.innerHTML = "";

  if (!Array.isArray(options) || options.length === 0) {
    const empty = document.createElement("span");
    empty.className = "flashcard-choice-empty";
    empty.textContent = emptyText;
    container.append(empty);
    return;
  }

  options.forEach((optionData) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "flashcard-choice-btn";
    button.dataset[datasetKey] = optionData.value;
    button.textContent = optionData.label;
    const isActive = optionData.value === activeValue;
    if (isActive) {
      button.classList.add("is-active");
    }
    button.setAttribute("aria-pressed", String(isActive));
    container.append(button);
  });
}

function updateSelectOptions(element, options, selectedValue, disabled) {
  if (!element) {
    return;
  }
  element.innerHTML = "";
  options.forEach((optionData) => {
    const option = document.createElement("option");
    option.value = optionData.value;
    option.textContent = optionData.label;
    element.append(option);
  });
  if (selectedValue) {
    element.value = selectedValue;
  }
  element.disabled = Boolean(disabled) || options.length === 0;
}

function renderFlashcardAnswerList(answers) {
  if (!elements.flashcardAnswerList) {
    return;
  }
  elements.flashcardAnswerList.innerHTML = "";
  answers.forEach((answer) => {
    const item = document.createElement("li");
    item.textContent = answer;
    elements.flashcardAnswerList.append(item);
  });
}

function renderFlashcardImage(card) {
  if (!elements.flashcardImageWrap || !elements.flashcardImage) {
    return;
  }
  const hasImage = Boolean(card?.imageSrc);
  elements.flashcardImageWrap.hidden = !hasImage;
  if (!hasImage) {
    elements.flashcardImage.removeAttribute("src");
    elements.flashcardImage.alt = "";
    return;
  }
  elements.flashcardImage.src = card.imageSrc;
  elements.flashcardImage.alt = card.imageAlt || "問題画像";
}

function setFlashcardAnswerVisibility(visible) {
  if (!elements.flashcardAnswerArea) {
    return;
  }
  const shouldShow = Boolean(visible);
  elements.flashcardAnswerArea.hidden = !shouldShow;
  elements.flashcardAnswerArea.style.display = shouldShow ? "grid" : "none";
}

function setFlashcardStudyControlsVisibility(visible) {
  const shouldShow = Boolean(visible);
  if (elements.flashcardToolbar) {
    elements.flashcardToolbar.hidden = !shouldShow;
  }
  if (elements.flashcardActions) {
    elements.flashcardActions.hidden = !shouldShow;
  }
}

function toggleFlashcardFocusMode() {
  setFlashcardFocusMode(!isFlashcardFocusMode);
}

function setFlashcardFocusMode(nextValue) {
  isFlashcardFocusMode = Boolean(nextValue);
  if (isFlashcardFocusMode) {
    isSelfcheckTimerFocusMode = false;
  }
  renderFlashcardFocusMode();
}

function renderFlashcardFocusMode() {
  const shouldEnableFlashcard = isFlashcardFocusMode && activeScreen === "mypage" && activeMypagePage === "top";
  const shouldEnableTimer = isSelfcheckTimerFocusMode && activeScreen === "mypage" && activeMypagePage === "selfcheck";
  if (shouldEnableFlashcard || shouldEnableTimer) {
    closeMypageSubmenu();
  }
  document.body.classList.toggle("flashcard-focus-mode", shouldEnableFlashcard);
  document.body.classList.toggle("selfcheck-timer-focus-mode", shouldEnableTimer);
  if (elements.mypageTopPage) {
    elements.mypageTopPage.classList.toggle("is-flashcard-focus", shouldEnableFlashcard);
  }
  if (elements.mypageFlashcardPanel) {
    elements.mypageFlashcardPanel.classList.toggle("is-focus", shouldEnableFlashcard);
  }
  if (elements.mypageSelfcheckPage) {
    elements.mypageSelfcheckPage.classList.toggle("is-timer-focus", shouldEnableTimer);
  }
  if (elements.mypageTimerPanel) {
    elements.mypageTimerPanel.classList.toggle("is-focus", shouldEnableTimer);
  }
  if (elements.flashcardFullscreenBtn) {
    elements.flashcardFullscreenBtn.classList.toggle("is-active", shouldEnableFlashcard);
    elements.flashcardFullscreenBtn.textContent = shouldEnableFlashcard ? "戻す" : "全画面";
    elements.flashcardFullscreenBtn.setAttribute("aria-pressed", String(shouldEnableFlashcard));
    elements.flashcardFullscreenBtn.setAttribute(
      "aria-label",
      shouldEnableFlashcard ? "フラッシュカードだけ表示を終了" : "フラッシュカードだけを表示"
    );
  }
  if (elements.selfcheckTimerFullscreenBtn) {
    elements.selfcheckTimerFullscreenBtn.classList.toggle("is-active", shouldEnableTimer);
    elements.selfcheckTimerFullscreenBtn.textContent = shouldEnableTimer ? "戻す" : "全画面";
    elements.selfcheckTimerFullscreenBtn.setAttribute("aria-pressed", String(shouldEnableTimer));
    elements.selfcheckTimerFullscreenBtn.setAttribute(
      "aria-label",
      shouldEnableTimer ? "タイマー全画面表示を終了" : "タイマーを全画面で表示"
    );
  }
}

function toggleSelfcheckTimerFocusMode() {
  setSelfcheckTimerFocusMode(!isSelfcheckTimerFocusMode);
}

function setSelfcheckTimerFocusMode(nextValue) {
  isSelfcheckTimerFocusMode = Boolean(nextValue);
  if (isSelfcheckTimerFocusMode) {
    isFlashcardFocusMode = false;
  }
  renderFlashcardFocusMode();
}

function toggleFlashcardAnswer() {
  const activeCard = getActiveFlashcardCard();
  if (!activeCard || !Array.isArray(activeCard.answers) || activeCard.answers.length === 0) {
    return;
  }
  flashcardState.answerVisible = !flashcardState.answerVisible;
  renderFlashcardPanel();
}

function updateFlashcardActionButtons(cardCount) {
  const hasMultipleCards = cardCount > 1;
  if (elements.flashcardPrevBtn) {
    elements.flashcardPrevBtn.disabled = !hasMultipleCards;
  }
  if (elements.flashcardNextBtn) {
    elements.flashcardNextBtn.disabled = !hasMultipleCards;
  }
  if (elements.flashcardShuffleBtn) {
    elements.flashcardShuffleBtn.disabled = !hasMultipleCards;
  }
}

function shiftFlashcardIndex(offset) {
  const unit = getActiveFlashcardUnit();
  if (!unit || unit.cards.length === 0) {
    return;
  }

  const cardCount = unit.cards.length;
  const normalizedOffset = Number(offset);
  if (!Number.isFinite(normalizedOffset) || normalizedOffset === 0) {
    return;
  }

  flashcardState.cardIndex = (flashcardState.cardIndex + Math.trunc(normalizedOffset) + cardCount) % cardCount;
  flashcardState.answerVisible = false;
  renderFlashcardPanel();
}

function jumpToRandomFlashcard() {
  const unit = getActiveFlashcardUnit();
  if (!unit || unit.cards.length <= 1) {
    return;
  }

  let nextIndex = flashcardState.cardIndex;
  while (nextIndex === flashcardState.cardIndex) {
    nextIndex = Math.floor(Math.random() * unit.cards.length);
  }
  flashcardState.cardIndex = nextIndex;
  flashcardState.answerVisible = false;
  renderFlashcardPanel();
}

function renderCoinBoard(options = {}) {
  if (!elements.reviewCoinValue) {
    return;
  }
  const targetValue = normalizeCoinAmount(state.reviewCoin);
  const fromValue = options.fromZero ? 0 : readCoinAmountFromElement(elements.reviewCoinValue);
  animateReviewCoinValue(fromValue, targetValue);
}

function renderMypageCoin() {
  if (!elements.mypageCoinValueNumber) {
    return;
  }
  elements.mypageCoinValueNumber.textContent = formatCoinAmount(state.reviewCoin);
}

function formatCoinAmount(value) {
  return REVIEW_COIN_FORMATTER.format(normalizeCoinAmount(value));
}

function normalizeCoinAmount(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 0;
  }
  return Math.floor(parsed);
}

function readCoinAmountFromElement(element) {
  if (!element) {
    return 0;
  }
  const rawText = String(element.textContent ?? "");
  const digitsOnly = rawText.replace(/[^\d]/g, "");
  if (!digitsOnly) {
    return 0;
  }
  const parsed = Number(digitsOnly);
  return Number.isFinite(parsed) ? parsed : 0;
}

function animateReviewCoinValue(fromValue, toValue) {
  if (!elements.reviewCoinValue) {
    return;
  }
  if (reviewCoinAnimationFrameId !== null) {
    window.cancelAnimationFrame(reviewCoinAnimationFrameId);
    reviewCoinAnimationFrameId = null;
  }

  const startValue = normalizeCoinAmount(fromValue);
  const targetValue = normalizeCoinAmount(toValue);
  const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (startValue === targetValue || shouldReduceMotion) {
    elements.reviewCoinValue.textContent = formatCoinAmount(targetValue);
    return;
  }

  const diff = Math.abs(targetValue - startValue);
  const duration = Math.min(
    COIN_COUNT_MAX_ANIMATION_MS,
    Math.max(COIN_COUNT_MIN_ANIMATION_MS, diff * COIN_COUNT_DURATION_PER_STEP_MS)
  );
  const startTime = performance.now();

  const tick = (now) => {
    const progress = Math.min(1, (now - startTime) / duration);
    const eased = 1 - (1 - progress) ** 3;
    const currentValue = Math.round(startValue + (targetValue - startValue) * eased);
    elements.reviewCoinValue.textContent = formatCoinAmount(currentValue);

    if (progress < 1) {
      reviewCoinAnimationFrameId = window.requestAnimationFrame(tick);
      return;
    }
    reviewCoinAnimationFrameId = null;
  };

  reviewCoinAnimationFrameId = window.requestAnimationFrame(tick);
}

function openMypageCustomizeFromCoinBoard() {
  closeMypageSubmenu();
  if (!state.auth.isLoggedIn) {
    promptLoginForMypage();
    return;
  }
  activateScreen("mypage");
  setMypagePage("customize");
}

function renderMypageSettings() {
  if (elements.authEmailText) {
    elements.authEmailText.textContent =
      state.auth.isLoggedIn && state.auth.provider !== "guest" ? state.auth.email ?? "未設定" : "未設定";
  }
  if (elements.authStatusText) {
    if (!state.auth.isLoggedIn) {
      elements.authStatusText.textContent = "未ログイン";
    } else if (state.auth.provider === "guest") {
      elements.authStatusText.textContent = "Guest Mode";
    } else {
      elements.authStatusText.textContent = "ログイン中";
    }
  }
  if (elements.logoutBtn) {
    elements.logoutBtn.disabled = !state.auth.isLoggedIn;
  }
  renderThemeCardSelection();
  updateThemeSelectionLockState();

  if (elements.highContrastToggle) {
    elements.highContrastToggle.checked = state.settings.highContrast;
  }
  if (elements.monochromeToggle) {
    elements.monochromeToggle.checked = state.settings.monochrome;
  }
  if (elements.notifyReviewPeriodToggle) {
    elements.notifyReviewPeriodToggle.checked = state.settings.notifications.dailyLogin;
  }
  if (elements.notifyTodaysMissionToggle) {
    elements.notifyTodaysMissionToggle.checked = state.settings.notifications.dailyTry;
  }
  if (elements.notifyNoticeToggle) {
    elements.notifyNoticeToggle.checked = state.settings.notifications.notice;
  }

  renderTextSettingIndicators();
}

function renderAuthPanel() {
  const canLogin = Boolean(auth0Client);
  const isLoggedIn = state.auth.isLoggedIn;
  const currentProvider = state.auth.provider;
  elements.authLoginButtons.forEach((button) => {
    const provider = normalizeAuthLoginProvider(button.dataset.authProvider);
    if (!provider) {
      button.disabled = true;
      button.textContent = "ログイン";
      return;
    }
    if (provider === "guest") {
      const isCurrentGuest = isLoggedIn && currentProvider === "guest";
      button.disabled = isCurrentGuest;
      button.textContent = isCurrentGuest ? "Guest Mode利用中" : "Guest Modeで続ける";
      return;
    }
    const connection = getAuthConnectionForProvider(provider);
    const requiresConnection = requiresAuthConnection(provider);
    const isCurrentProvider = isLoggedIn && currentProvider === provider;
    button.disabled = !canLogin || (requiresConnection && !connection) || isCurrentProvider;
    button.textContent = isCurrentProvider ? `${formatAuthProviderLabel(provider)}ログイン済み` : `${formatAuthProviderLabel(provider)}でログイン`;
  });
  if (elements.authConfigHint) {
    elements.authConfigHint.hidden = Boolean(auth0Client);
  }
}

function handleThemeCardClick(nextTheme) {
  const normalizedTheme = normalizeTheme(nextTheme);
  if (!normalizedTheme) {
    return;
  }
  if (!isThemeUnlocked(normalizedTheme)) {
    unlockThemeWithCoin(normalizedTheme);
    return;
  }
  updateThemeSetting(normalizedTheme);
}

function updateThemeSetting(nextTheme) {
  const normalizedTheme = normalizeTheme(nextTheme);
  if (!isThemeUnlocked(normalizedTheme)) {
    return;
  }
  if (state.settings.theme === normalizedTheme) {
    return;
  }

  state.settings.theme = normalizedTheme;
  applyTheme(normalizedTheme, { withFade: true });
  saveState();
  renderMypageSettings();
}

function renderThemeCardSelection() {
  elements.themeCards.forEach((card) => {
    const themeKey = normalizeTheme(card.dataset.themeChoice);
    const isUnlocked = isThemeUnlocked(themeKey);
    const isSelected = isUnlocked && themeKey === state.settings.theme;
    card.classList.toggle("is-selected", isSelected);
    card.classList.toggle("is-locked", !isUnlocked);
    card.setAttribute("aria-checked", String(isSelected));
    const lockLabel = card.querySelector("[data-theme-lock-label]");
    if (lockLabel) {
      const lockCost = lockLabel.querySelector("[data-theme-lock-cost]");
      if (lockCost) {
        lockCost.textContent = String(THEME_UNLOCK_COST);
      }
      lockLabel.hidden = isUnlocked;
    }
  });
}

function updateThemeSelectionLockState() {
  const shouldLock = isModeThemeActive();
  if (elements.themeCardList) {
    elements.themeCardList.classList.toggle("is-disabled", shouldLock);
    elements.themeCardList.setAttribute("aria-disabled", String(shouldLock));
  }
  elements.themeCards.forEach((card) => {
    card.disabled = shouldLock;
    card.setAttribute("aria-disabled", String(shouldLock));
  });
}

function isModeThemeActive() {
  return Boolean(state.settings.highContrast || state.settings.monochrome);
}

function isThemeUnlocked(themeKey) {
  if (!AVAILABLE_THEMES.includes(themeKey)) {
    return false;
  }
  return Boolean(state.settings.unlockedThemes?.[themeKey]);
}

function unlockThemeWithCoin(themeKey) {
  if (!PREMIUM_THEMES.includes(themeKey)) {
    return;
  }
  if (state.reviewCoin < THEME_UNLOCK_COST) {
    showStatus(
      `「${getThemeDisplayName(themeKey)}」は${THEME_UNLOCK_COST}コインで解放できます。（現在: ${state.reviewCoin}コイン）`
    );
    return;
  }

  const shouldUnlock = window.confirm(
    `「${getThemeDisplayName(themeKey)}」を${THEME_UNLOCK_COST}コインで解放しますか？\n現在の所持コイン: ${state.reviewCoin}`
  );
  if (!shouldUnlock) {
    return;
  }

  state.reviewCoin -= THEME_UNLOCK_COST;
  state.settings.unlockedThemes[themeKey] = true;
  saveState();
  renderCoinBoard();
  renderMypageCoin();
  renderMypageSettings();
  showStatus(`「${getThemeDisplayName(themeKey)}」を解放しました。`);
  updateThemeSetting(themeKey);
}

function getThemeDisplayName(themeKey) {
  return THEME_DISPLAY_NAMES[themeKey] ?? themeKey;
}

function updateAccessibilityMode(modeKey, enabled) {
  if (modeKey !== "highContrast" && modeKey !== "monochrome") {
    return;
  }
  const shouldEnable = Boolean(enabled);
  if (shouldEnable) {
    state.settings.highContrast = modeKey === "highContrast";
    state.settings.monochrome = modeKey === "monochrome";
  } else {
    state.settings[modeKey] = false;
  }
  applyAccessibilityModes();
  saveState();
  renderMypageSettings();
}

function applyAccessibilityModes() {
  document.body.classList.toggle("mode-high-contrast", Boolean(state.settings.highContrast));
  document.body.classList.toggle("mode-monochrome", Boolean(state.settings.monochrome));
}

function updateTextSetting(settingKey, nextValue) {
  const nextTextSettings = {
    ...state.settings.text,
    [settingKey]: Number(nextValue),
  };
  state.settings.text = normalizeTextSettings(nextTextSettings);
  applyTypographySettings();
  saveState();
  renderTextSettingIndicators();
}

function applyTypographySettings() {
  const root = document.documentElement;
  const { size, weight, spacing } = state.settings.text;
  root.style.setProperty("--app-font-scale", String(size / 100));
  root.style.setProperty("--app-font-weight", String(weight));
  root.style.setProperty("--app-letter-spacing", `${spacing.toFixed(2)}em`);
}

function renderTextSettingIndicators() {
  const { size, weight, spacing } = state.settings.text;
  if (elements.textSizeRange) {
    elements.textSizeRange.value = String(size);
  }
  if (elements.textWeightRange) {
    elements.textWeightRange.value = String(weight);
  }
  if (elements.textSpacingRange) {
    elements.textSpacingRange.value = String(spacing);
  }
  if (elements.textSizeValue) {
    elements.textSizeValue.textContent = `${size}%`;
  }
  if (elements.textWeightValue) {
    elements.textWeightValue.textContent = String(weight);
  }
  if (elements.textSpacingValue) {
    elements.textSpacingValue.textContent = `${spacing.toFixed(2)}em`;
  }
}

function updateNotificationSetting(key, enabled) {
  if (!(key in state.settings.notifications)) {
    return;
  }
  state.settings.notifications[key] = Boolean(enabled);
  saveState();
}

function exportReviewData() {
  const snapshot = JSON.parse(JSON.stringify(state));
  const plainJson = JSON.stringify(snapshot);
  const payload = {
    app: "The Review",
    storageKey: STORAGE_KEY,
    format: REVIEW_DATA_EXPORT_FORMAT,
    exportedAt: new Date().toISOString(),
    data: obfuscateExportData(plainJson),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = `the-review-data-${formatExportTimestamp(new Date())}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(downloadUrl);
  window.alert("リビューデータをエクスポートしました。");
}

function formatExportTimestamp(date) {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}${month}${day}-${hours}${minutes}${seconds}`;
}

function openReviewDataImportPicker() {
  if (!elements.reviewDataImportInput) {
    return;
  }
  elements.reviewDataImportInput.value = "";
  elements.reviewDataImportInput.click();
}

async function handleReviewDataImportSelection(event) {
  const input = event?.target;
  const file = input?.files?.[0];
  if (!file) {
    return;
  }

  try {
    await importReviewDataFromFile(file);
  } finally {
    input.value = "";
  }
}

async function importReviewDataFromFile(file) {
  let parsed = null;
  try {
    parsed = JSON.parse(await file.text());
  } catch {
    window.alert("読み込んだファイルの形式が正しくありません。JSONファイルを選択してください。");
    return;
  }

  const importData = extractReviewDataPayload(parsed);
  if (!importData) {
    window.alert("リビューデータを読み取れませんでした。エクスポートしたJSONファイルを確認してください。");
    return;
  }

  const normalizedState = normalizePersistedState(importData);
  replaceState(normalizedState);
  saveState();

  if (state.auth.isLoggedIn && state.auth.provider !== "guest") {
    await initializeAuth();
  }

  if (IS_LOGIN_PAGE) {
    if (state.auth.isLoggedIn) {
      window.alert("リビューデータをインポートしました。");
      redirectToIndexPage();
      return;
    }
    window.alert("リビューデータをインポートしました。");
    renderAuthPanel();
    return;
  }

  if (!state.auth.isLoggedIn) {
    window.alert("リビューデータをインポートしました。");
    redirectToLoginPage();
    return;
  }

  applyTheme(state.settings.theme);
  applyAccessibilityModes();
  applyTypographySettings();
  dailyTryRun = createDailyTryRun();
  pauseSelfcheckTimer();
  selfcheckTimerRemainingSeconds = SELFCHECK_DEFAULT_TIMER_SECONDS;
  calendarViewDate = getCurrentMonthStartDate();
  markDailyLogin();
  renderAll();
  activateScreen(activeScreen);
  window.alert("リビューデータをインポートしました。");
}

function extractReviewDataPayload(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  if (typeof value.storageKey === "string" && value.storageKey && value.storageKey !== STORAGE_KEY) {
    return null;
  }

  if (value.format === REVIEW_DATA_EXPORT_FORMAT) {
    if (typeof value.data !== "string" || !value.data.trim()) {
      return null;
    }
    try {
      const decoded = deobfuscateExportData(value.data);
      const parsed = JSON.parse(decoded);
      return isLikelyReviewState(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  if (value.data && typeof value.data === "object" && !Array.isArray(value.data)) {
    return isLikelyReviewState(value.data) ? value.data : null;
  }

  return isLikelyReviewState(value) ? value : null;
}

function replaceState(nextState) {
  Object.keys(state).forEach((key) => {
    delete state[key];
  });
  Object.assign(state, nextState);
}

function isLikelyReviewState(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  const keys = ["reviewCoin", "coinGrant5000Applied", "loginDays", "dailyTryRecords", "settings", "auth"];
  return keys.some((key) => key in value);
}

function obfuscateExportData(plainText) {
  const sourceBytes = encodeUtf8(plainText);
  const keyBytes = encodeUtf8(REVIEW_DATA_EXPORT_KEY);
  const obfuscated = new Uint8Array(sourceBytes.length);
  for (let index = 0; index < sourceBytes.length; index += 1) {
    const salt = (index * 31 + 17) & 0xff;
    obfuscated[index] = sourceBytes[index] ^ keyBytes[index % keyBytes.length] ^ salt;
  }
  return encodeBase64Bytes(obfuscated);
}

function deobfuscateExportData(encodedText) {
  const sourceBytes = decodeBase64Bytes(encodedText);
  const keyBytes = encodeUtf8(REVIEW_DATA_EXPORT_KEY);
  const plainBytes = new Uint8Array(sourceBytes.length);
  for (let index = 0; index < sourceBytes.length; index += 1) {
    const salt = (index * 31 + 17) & 0xff;
    plainBytes[index] = sourceBytes[index] ^ keyBytes[index % keyBytes.length] ^ salt;
  }
  return decodeUtf8(plainBytes);
}

function encodeUtf8(text) {
  if (typeof TextEncoder !== "function") {
    throw new Error("TextEncoder is unavailable");
  }
  return new TextEncoder().encode(String(text));
}

function decodeUtf8(bytes) {
  if (typeof TextDecoder !== "function") {
    throw new Error("TextDecoder is unavailable");
  }
  return new TextDecoder().decode(bytes);
}

function encodeBase64Bytes(bytes) {
  let binary = "";
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }
  return window.btoa(binary);
}

function decodeBase64Bytes(base64Text) {
  const binary = window.atob(String(base64Text).trim());
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function openTextResetDialog() {
  if (!elements.textResetDialog || typeof elements.textResetDialog.showModal !== "function") {
    return;
  }
  if (elements.textResetDialog.open) {
    return;
  }
  elements.textResetDialog.showModal();
}

function resetTextSettingByAction(action) {
  const current = state.settings.text;
  switch (action) {
    case "size":
      state.settings.text = {
        ...current,
        size: DEFAULT_TEXT_SETTINGS.size,
      };
      showStatus("文字の大きさをリセットしました。");
      break;
    case "weight":
      state.settings.text = {
        ...current,
        weight: DEFAULT_TEXT_SETTINGS.weight,
      };
      showStatus("文字の太さをリセットしました。");
      break;
    case "spacing":
      state.settings.text = {
        ...current,
        spacing: DEFAULT_TEXT_SETTINGS.spacing,
      };
      showStatus("文字の間隔をリセットしました。");
      break;
    case "all":
      state.settings.text = { ...DEFAULT_TEXT_SETTINGS };
      showStatus("文字の設定をすべてリセットしました。");
      break;
    default:
      return;
  }

  state.settings.text = normalizeTextSettings(state.settings.text);
  applyTypographySettings();
  saveState();
  renderTextSettingIndicators();
  if (elements.textResetDialog?.open) {
    elements.textResetDialog.close();
  }
}

function applyTheme(theme, options = {}) {
  const normalizedTheme = normalizeTheme(theme);
  if (options.withFade && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    fadeApplyTheme(normalizedTheme);
    return;
  }
  setThemeAttribute(normalizedTheme);
}

function fadeApplyTheme(theme) {
  const body = document.body;
  const currentBackgroundImage = window.getComputedStyle(body).backgroundImage;

  body.style.setProperty("--theme-fade-bg", currentBackgroundImage);
  body.classList.remove("theme-fade-out");
  body.classList.add("theme-switching");

  // Force style flush so the overlay appears before we fade it out.
  void body.offsetHeight;

  setThemeAttribute(theme);

  requestAnimationFrame(() => {
    body.classList.add("theme-fade-out");
  });

  if (themeFadeTimerId !== null) {
    window.clearTimeout(themeFadeTimerId);
  }
  themeFadeTimerId = window.setTimeout(() => {
    body.classList.remove("theme-switching", "theme-fade-out");
    body.style.removeProperty("--theme-fade-bg");
    themeFadeTimerId = null;
  }, THEME_FADE_MS + 40);
}

function setThemeAttribute(theme) {
  document.body.setAttribute("data-theme", theme);
}

function toggleMypageSubmenu() {
  if (isMypageSubmenuOpen()) {
    closeMypageSubmenu();
    return;
  }
  openMypageSubmenu();
}

function isMypageSubmenuOpen() {
  return Boolean(elements.mypageSubmenu?.classList.contains("is-open"));
}

function openMypageSubmenu() {
  if (!elements.mypageSubmenu) {
    return;
  }
  elements.mypageSubmenu.classList.add("is-open");
  elements.mypageNavButton?.setAttribute("aria-expanded", "true");
}

function closeMypageSubmenu() {
  if (!elements.mypageSubmenu) {
    return;
  }
  elements.mypageSubmenu.classList.remove("is-open");
  elements.mypageNavButton?.setAttribute("aria-expanded", "false");
}

function setMypagePage(page) {
  const normalizedPage = normalizeMypagePage(page);
  activeMypagePage = normalizedPage;

  elements.mypagePages.forEach((section) => {
    const isActive = section.dataset.mypagePage === normalizedPage;
    section.classList.toggle("is-active", isActive);
    section.hidden = !isActive;
    section.style.display = isActive ? "grid" : "none";
  });

  if (normalizedPage === "selfcheck") {
    renderSelfcheckCalendar();
  }

  updateMypageSubmenuCurrent(normalizedPage);
  renderFlashcardFocusMode();
}

function normalizeMypagePage(page) {
  return MYPAGE_PAGE_IDS.includes(page) ? page : "top";
}

function normalizeScreen(screen) {
  return SCREEN_IDS.includes(screen) ? screen : "home";
}

function updateMypageSubmenuCurrent(currentTarget) {
  elements.mypageSubmenuItems.forEach((button) => {
    button.classList.toggle("is-current", button.dataset.mypageTarget === currentTarget);
  });
}

function renderSelfcheckCalendar() {
  if (!elements.calendarMonthLabel || !elements.calendarGrid) {
    return;
  }

  const viewYear = calendarViewDate.getFullYear();
  const viewMonthIndex = calendarViewDate.getMonth();
  const today = new Date();
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const firstLoginDate = getFirstLoginDate();
  elements.calendarMonthLabel.textContent = `${viewYear}年${viewMonthIndex + 1}月`;

  const firstDay = new Date(viewYear, viewMonthIndex, 1);
  const startOffset = firstDay.getDay();
  const startDate = new Date(viewYear, viewMonthIndex, 1 - startOffset);
  const todayDateKey = todayKey();

  const cells = [];
  for (let index = 0; index < 42; index += 1) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    const dateKey = keyFromDate(date);
    const isCurrentMonth = date.getMonth() === viewMonthIndex;
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const isFutureDate = dateOnly > todayDate;
    const isBeforeFirstLogin = firstLoginDate ? dateOnly < firstLoginDate : true;
    const shouldShowLoginMark = isCurrentMonth && state.auth.isLoggedIn && !isFutureDate && !isBeforeFirstLogin;
    const hasLoginRecord = Boolean(state.loginDays[dateKey]);
    const classNames = ["calendar-day"];
    if (!isCurrentMonth) {
      classNames.push("is-outside");
    }
    if (dateKey === todayDateKey) {
      classNames.push("is-today");
    }

    const markHtml = shouldShowLoginMark
      ? `<span class="calendar-mark ${hasLoginRecord ? "is-check" : "is-cross"}" aria-label="${
          hasLoginRecord ? "ログイン済み" : "未ログイン"
        }">${hasLoginRecord ? "✓" : "×"}</span>`
      : "";

    cells.push(
      `<div class="${classNames.join(" ")}"><div class="calendar-day-head"><strong>${date.getDate()}</strong>${markHtml}</div></div>`
    );
  }

  elements.calendarGrid.innerHTML = cells.join("");
}

function moveSelfcheckCalendarMonth(offset) {
  const monthOffset = Number(offset);
  if (!Number.isFinite(monthOffset) || monthOffset === 0) {
    return;
  }
  calendarViewDate = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + monthOffset, 1);
  renderSelfcheckCalendar();
}

function startSelfcheckTimer() {
  if (selfcheckTimerIntervalId !== null) {
    return;
  }
  if (selfcheckTimerRemainingSeconds <= 0) {
    selfcheckTimerRemainingSeconds = SELFCHECK_DEFAULT_TIMER_SECONDS;
    renderSelfcheckTimerDisplay();
  }

  selfcheckTimerIntervalId = window.setInterval(() => {
    selfcheckTimerRemainingSeconds -= 1;
    if (selfcheckTimerRemainingSeconds <= 0) {
      selfcheckTimerRemainingSeconds = 0;
      pauseSelfcheckTimer();
      showStatus("セルフチェックタイマーが終了しました。");
    }
    renderSelfcheckTimerDisplay();
  }, 1000);

  updateSelfcheckTimerButtons();
}

function pauseSelfcheckTimer() {
  if (selfcheckTimerIntervalId === null) {
    return;
  }
  window.clearInterval(selfcheckTimerIntervalId);
  selfcheckTimerIntervalId = null;
  updateSelfcheckTimerButtons();
}

function resetSelfcheckTimer() {
  pauseSelfcheckTimer();
  selfcheckTimerRemainingSeconds = SELFCHECK_DEFAULT_TIMER_SECONDS;
  renderSelfcheckTimerDisplay();
  updateSelfcheckTimerButtons();
}

function renderSelfcheckTimerDisplay() {
  if (!elements.selfcheckTimerDisplay) {
    return;
  }

  const minutes = Math.floor(selfcheckTimerRemainingSeconds / 60);
  const seconds = selfcheckTimerRemainingSeconds % 60;
  elements.selfcheckTimerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

function updateSelfcheckTimerButtons() {
  const isRunning = selfcheckTimerIntervalId !== null;
  if (elements.selfcheckTimerStartBtn) {
    elements.selfcheckTimerStartBtn.disabled = isRunning;
  }
  if (elements.selfcheckTimerPauseBtn) {
    elements.selfcheckTimerPauseBtn.disabled = !isRunning;
  }
}

function markDailyLogin() {
  if (!state.auth.isLoggedIn) {
    return;
  }
  const key = todayKey();
  if (!state.loginDays[key]) {
    state.loginDays[key] = true;
    saveState();
  }
}

function getDailyLoginWindowRadius() {
  if (window.matchMedia(`(max-width: ${DAILY_LOGIN_MOBILE_BREAKPOINT_PX}px)`).matches) {
    return DAILY_LOGIN_MOBILE_WINDOW_RADIUS;
  }
  return DAILY_LOGIN_DESKTOP_WINDOW_RADIUS;
}

function dailyLoginSlotToPercent(slotIndex, windowSize) {
  const denominator = Math.max(1, windowSize - 1);
  return (slotIndex / denominator) * 100;
}

function renderDailyLoginNode(node, slot, windowSize) {
  if (!node) {
    return;
  }
  const shouldShow = Boolean(slot && slot.day != null);
  node.hidden = !shouldShow;
  if (!shouldShow) {
    return;
  }
  node.style.left = `${dailyLoginSlotToPercent(slot.index, windowSize)}%`;
  node.classList.toggle("is-faded", Boolean(slot.isFaded));
}

function renderDailyLoginReward(rewardElement, rewardDay, slots, windowSize) {
  if (!rewardElement) {
    return;
  }
  const slot = slots.find((item) => item.day === rewardDay) ?? null;
  const shouldShow = Boolean(slot);
  rewardElement.hidden = !shouldShow;
  rewardElement.style.display = shouldShow ? "inline-flex" : "none";
  if (!shouldShow) {
    rewardElement.style.removeProperty("left");
  }
  if (!slot) {
    return;
  }
  rewardElement.style.left = `${dailyLoginSlotToPercent(slot.index, windowSize)}%`;
}

function renderDailyLogin() {
  const count = Object.keys(state.loginDays).length;
  const displayCount = Math.max(1, count);
  const cycleDay = ((displayCount - 1) % 7) + 1;
  const windowRadius = getDailyLoginWindowRadius();
  const windowSize = windowRadius * 2 + 1;
  const currentSlot = windowRadius;
  const anchorDay = cycleDay;
  const slots = Array.from({ length: windowSize }, (_, index) => {
    const day = anchorDay + index - windowRadius;
    return {
      index,
      day: day >= 1 && day <= 7 ? day : null,
      isCurrent: index === currentSlot,
      isFaded: Math.abs(index - currentSlot) === windowRadius,
    };
  });

  const visibleSlots = slots.filter((slot) => slot.day !== null);
  const lineStartSlot = visibleSlots[0] ?? slots[currentSlot];
  const lineEndSlot = visibleSlots[visibleSlots.length - 1] ?? slots[currentSlot];
  const lineStartPercent = dailyLoginSlotToPercent(lineStartSlot.index, windowSize);
  const lineEndPercent = dailyLoginSlotToPercent(lineEndSlot.index, windowSize);
  const currentPercent = dailyLoginSlotToPercent(currentSlot, windowSize);
  const progressWidth = Math.max(0, currentPercent - lineStartPercent);

  if (elements.dailyLoginCount) {
    elements.dailyLoginCount.textContent = String(displayCount);
  }

  if (elements.dailyLoginScale) {
    elements.dailyLoginScale.style.setProperty("--daily-login-scale-denominator", String(Math.max(1, windowSize - 1)));
  }

  if (elements.dailyLoginScaleNumbers.length > 0) {
    elements.dailyLoginScaleNumbers.forEach((label, index) => {
      const slot = slots[index] ?? null;
      label.textContent = slot && slot.day != null ? String(slot.day) : "";
      label.classList.toggle("is-visible", Boolean(slot && slot.day != null));
      label.classList.toggle("is-active", Boolean(slot?.isCurrent));
      label.classList.toggle("is-faded", Boolean(slot?.isFaded && slot.day !== null));
    });
  }

  if (elements.dailyLoginTrack) {
    elements.dailyLoginTrack.style.setProperty("--daily-login-track-start", `${lineStartPercent}%`);
    elements.dailyLoginTrack.style.setProperty("--daily-login-track-end", `${lineEndPercent}%`);
  }

  if (elements.dailyLoginProgressFill) {
    elements.dailyLoginProgressFill.style.left = `${lineStartPercent}%`;
    elements.dailyLoginProgressFill.style.width = `${progressWidth}%`;
  }

  if (elements.dailyLoginCurrentNode) {
    elements.dailyLoginCurrentNode.style.left = `${currentPercent}%`;
    elements.dailyLoginCurrentNode.hidden = false;
  }

  renderDailyLoginNode(elements.dailyLoginPrevOuterNode, slots[currentSlot - 3], windowSize);
  renderDailyLoginNode(elements.dailyLoginPrevFarNode, slots[currentSlot - 2], windowSize);
  renderDailyLoginNode(elements.dailyLoginPrevNearNode, slots[currentSlot - 1], windowSize);
  renderDailyLoginNode(elements.dailyLoginNextNearNode, slots[currentSlot + 1], windowSize);
  renderDailyLoginNode(elements.dailyLoginNextFarNode, slots[currentSlot + 2], windowSize);
  renderDailyLoginNode(elements.dailyLoginNextOuterNode, slots[currentSlot + 3], windowSize);
  renderDailyLoginReward(elements.dailyLoginReward3, 3, slots, windowSize);
  renderDailyLoginReward(elements.dailyLoginReward7, 7, slots, windowSize);

  if (elements.dailyLoginCard) {
    elements.dailyLoginCard.classList.toggle("is-reward-10-ready", cycleDay >= 3);
    elements.dailyLoginCard.classList.toggle("is-reward-20-ready", cycleDay >= 7);
  }
}

function createDailyTryRun() {
  const key = todayKey();
  const index = getDailyTryQuestionIndex(key);
  const record = state.dailyTryRecords[key];
  const selected = Number.isInteger(record?.selected) ? record.selected : null;
  return {
    dateKey: key,
    questionIndex: index,
    selected:
      selected !== null && selected >= 0 && selected < DAILY_TRY_QUESTIONS[index].choices.length
        ? selected
        : null,
    submitted: Boolean(record?.answered),
  };
}

function syncDailyTryByDate() {
  const key = todayKey();
  if (dailyTryRun.dateKey !== key) {
    dailyTryRun = createDailyTryRun();
  }
}

function renderDailyTryPanel() {
  syncDailyTryByDate();
  const question = DAILY_TRY_QUESTIONS[dailyTryRun.questionIndex];
  elements.dailyTryPrompt.textContent = question.prompt;

  elements.dailyTryChoiceList.innerHTML = question.choices
    .map((choice, index) => {
      const classNames = ["choice-btn"];
      if (dailyTryRun.selected === index) {
        classNames.push("selected");
      }
      if (dailyTryRun.submitted) {
        if (index === question.answer) {
          classNames.push("correct");
        } else if (index === dailyTryRun.selected) {
          classNames.push("wrong");
        }
      }
      return `<button class="${classNames.join(" ")}" type="button" data-daily-try-choice="${index}">${escapeHtml(
        choice
      )}</button>`;
    })
    .join("");

  elements.dailyTryChoiceList.querySelectorAll("[data-daily-try-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      if (dailyTryRun.submitted) {
        return;
      }
      dailyTryRun.selected = Number(button.dataset.dailyTryChoice);
      renderDailyTryPanel();
    });
  });

  if (!dailyTryRun.submitted) {
    elements.dailyTryFeedback.textContent = "";
  } else {
    const isCorrect = dailyTryRun.selected === question.answer;
    elements.dailyTryFeedback.textContent = isCorrect ? "正解！" : `不正解。${question.note ?? ""}`;
  }

  elements.dailyTrySubmitBtn.disabled = dailyTryRun.submitted || dailyTryRun.selected === null;
}

function submitDailyTryAnswer() {
  syncDailyTryByDate();
  const question = DAILY_TRY_QUESTIONS[dailyTryRun.questionIndex];
  if (dailyTryRun.submitted || dailyTryRun.selected === null) {
    return;
  }

  dailyTryRun.submitted = true;
  const isCorrect = dailyTryRun.selected === question.answer;
  const previous = state.dailyTryRecords[dailyTryRun.dateKey] ?? {};
  const alreadyRewarded = Boolean(previous.rewarded);
  const rewarded = isCorrect && !alreadyRewarded;
  if (rewarded) {
    state.reviewCoin += 1;
    showStatus("デイリー問題に正解！ +1コイン");
  } else if (isCorrect) {
    showStatus("デイリー問題に正解しました。");
  } else {
    showStatus(`デイリー問題は不正解。${question.note ?? ""}`);
  }

  state.dailyTryRecords[dailyTryRun.dateKey] = {
    answered: true,
    selected: dailyTryRun.selected,
    correct: isCorrect,
    rewarded: alreadyRewarded || rewarded,
  };
  saveState();
  renderCoinBoard();
  renderDailyTryPanel();
}

function startHomeGreetingTicker() {
  renderHomeGreeting();
  if (homeGreetingTimerId !== null) {
    window.clearInterval(homeGreetingTimerId);
  }
  homeGreetingTimerId = window.setInterval(renderHomeGreeting, HOME_GREETING_REFRESH_MS);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      renderHomeGreeting();
    }
  });
}

function renderHomeGreeting() {
  elements.homeGreeting.textContent = getHomeGreetingMessage(new Date());
}

function getHomeGreetingMessage(date) {
  const hour = date.getHours();
  let greeting = "こんばんは。";
  if (hour >= 5 && hour < 11) {
    greeting = "おはようございます。";
  } else if (hour >= 11 && hour < 18) {
    greeting = "こんにちは。";
  }
  return `${greeting}\nいつも勉強お疲れさまです。`;
}

function isJapaneseBusinessDay(date) {
  return !isWeekend(date) && !isJapaneseHoliday(date);
}

function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function isJapaneseHoliday(date) {
  const year = date.getFullYear();
  if (!JP_HOLIDAY_CACHE.has(year)) {
    JP_HOLIDAY_CACHE.set(year, buildJapaneseHolidaySet(year));
  }
  const holidays = JP_HOLIDAY_CACHE.get(year);
  return holidays.has(keyFromDate(date));
}

function buildJapaneseHolidaySet(year) {
  const holidays = new Set();
  if (year < 1948) {
    return holidays;
  }

  addHolidayDate(holidays, year, 1, 1);

  if (year >= 2000) {
    addHolidayDate(holidays, year, 1, getNthWeekdayDay(year, 0, 1, 2));
  } else if (year >= 1949) {
    addHolidayDate(holidays, year, 1, 15);
  }

  if (year >= 1967) {
    addHolidayDate(holidays, year, 2, 11);
  }
  if (year >= 2020) {
    addHolidayDate(holidays, year, 2, 23);
  }
  if (year >= 1949) {
    addHolidayDate(holidays, year, 3, calculateVernalEquinoxDay(year));
  }

  addHolidayDate(holidays, year, 4, 29);
  addHolidayDate(holidays, year, 5, 3);
  if (year >= 2007) {
    addHolidayDate(holidays, year, 5, 4);
  }
  addHolidayDate(holidays, year, 5, 5);

  if (year === 2020) {
    addHolidayDate(holidays, year, 7, 23);
  } else if (year === 2021) {
    addHolidayDate(holidays, year, 7, 22);
  } else if (year >= 2003) {
    addHolidayDate(holidays, year, 7, getNthWeekdayDay(year, 6, 1, 3));
  } else if (year >= 1996) {
    addHolidayDate(holidays, year, 7, 20);
  }

  if (year === 2020) {
    addHolidayDate(holidays, year, 8, 10);
  } else if (year === 2021) {
    addHolidayDate(holidays, year, 8, 8);
  } else if (year >= 2016) {
    addHolidayDate(holidays, year, 8, 11);
  }

  if (year >= 2003) {
    addHolidayDate(holidays, year, 9, getNthWeekdayDay(year, 8, 1, 3));
  } else if (year >= 1966) {
    addHolidayDate(holidays, year, 9, 15);
  }
  addHolidayDate(holidays, year, 9, calculateAutumnEquinoxDay(year));

  if (year === 2020) {
    addHolidayDate(holidays, year, 7, 24);
  } else if (year === 2021) {
    addHolidayDate(holidays, year, 7, 23);
  } else if (year >= 2000) {
    addHolidayDate(holidays, year, 10, getNthWeekdayDay(year, 9, 1, 2));
  } else if (year >= 1966) {
    addHolidayDate(holidays, year, 10, 10);
  }

  addHolidayDate(holidays, year, 11, 3);
  addHolidayDate(holidays, year, 11, 23);

  if (year >= 1989 && year <= 2018) {
    addHolidayDate(holidays, year, 12, 23);
  }

  addSpecialJapaneseHolidays(holidays, year);
  applySubstituteHolidayRule(holidays, year);
  applyCitizenHolidayRule(holidays, year);
  return holidays;
}

function addSpecialJapaneseHolidays(holidays, year) {
  const specialMap = {
    1959: [[4, 10]],
    1989: [[2, 24]],
    1990: [[11, 12]],
    1993: [[6, 9]],
    2019: [
      [4, 30],
      [5, 1],
      [5, 2],
      [10, 22],
    ],
  };
  (specialMap[year] ?? []).forEach(([month, day]) => {
    addHolidayDate(holidays, year, month, day);
  });
}

function applySubstituteHolidayRule(holidays, year) {
  if (year < 1973) {
    return;
  }
  const lawStart = new Date(1973, 3, 12);
  const substituteKeys = [];

  Array.from(holidays).forEach((key) => {
    const holidayDate = dateFromKey(key);
    if (holidayDate < lawStart || holidayDate.getDay() !== 0) {
      return;
    }
    const substitute = new Date(holidayDate);
    do {
      substitute.setDate(substitute.getDate() + 1);
    } while (holidays.has(keyFromDate(substitute)));
    if (substitute.getFullYear() === year) {
      substituteKeys.push(keyFromDate(substitute));
    }
  });

  substituteKeys.forEach((key) => {
    holidays.add(key);
  });
}

function applyCitizenHolidayRule(holidays, year) {
  if (year < 1986) {
    return;
  }

  const extraKeys = [];
  const cursor = new Date(year, 0, 2);
  const end = new Date(year, 11, 30);
  while (cursor <= end) {
    const key = keyFromDate(cursor);
    if (!holidays.has(key) && cursor.getDay() !== 0) {
      const prev = new Date(cursor);
      prev.setDate(prev.getDate() - 1);
      const next = new Date(cursor);
      next.setDate(next.getDate() + 1);
      if (holidays.has(keyFromDate(prev)) && holidays.has(keyFromDate(next))) {
        extraKeys.push(key);
      }
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  extraKeys.forEach((key) => {
    holidays.add(key);
  });
}

function addHolidayDate(holidays, year, month, day) {
  if (!Number.isFinite(day) || day < 1) {
    return;
  }
  holidays.add(keyFromDate(new Date(year, month - 1, day)));
}

function getNthWeekdayDay(year, monthIndex, weekday, nth) {
  const first = new Date(year, monthIndex, 1);
  const offset = (weekday - first.getDay() + 7) % 7;
  return 1 + offset + (nth - 1) * 7;
}

function calculateVernalEquinoxDay(year) {
  if (year <= 1979) {
    return Math.floor(20.8357 + 0.242194 * (year - 1980) - Math.floor((year - 1983) / 4));
  }
  if (year <= 2099) {
    return Math.floor(20.8431 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
  }
  return Math.floor(21.851 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
}

function calculateAutumnEquinoxDay(year) {
  if (year <= 1979) {
    return Math.floor(23.2588 + 0.242194 * (year - 1980) - Math.floor((year - 1983) / 4));
  }
  if (year <= 2099) {
    return Math.floor(23.2488 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
  }
  return Math.floor(24.2488 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
}

function getDailyTryQuestionIndex(dateKey) {
  const digits = String(dateKey).replaceAll("-", "");
  let sum = 0;
  for (const ch of digits) {
    sum += Number(ch);
  }
  return sum % DAILY_TRY_QUESTIONS.length;
}

function loadState() {
  const fallback = createDefaultState();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return fallback;
    }
    const parsed = JSON.parse(raw);
    return normalizePersistedState(parsed);
  } catch {
    return fallback;
  }
}

function createDefaultState() {
  return {
    reviewCoin: 0,
    coinGrant5000Applied: false,
    loginDays: {},
    dailyTryRecords: {},
    settings: {
      theme: DEFAULT_THEME,
      unlockedThemes: createDefaultThemeUnlockState(),
      highContrast: false,
      monochrome: false,
      text: { ...DEFAULT_TEXT_SETTINGS },
      notifications: { ...DEFAULT_NOTIFICATION_SETTINGS },
    },
    auth: {
      isLoggedIn: false,
      provider: null,
      displayName: "Guest Mode",
      email: null,
    },
  };
}

function normalizePersistedState(parsed) {
  const fallback = createDefaultState();
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return fallback;
  }
  return {
    ...fallback,
    reviewCoin:
      Number.isFinite(Number(parsed?.reviewCoin)) && Number(parsed.reviewCoin) >= 0 ? Number(parsed.reviewCoin) : 0,
    coinGrant5000Applied: normalizeBoolean(parsed?.coinGrant5000Applied, false),
    loginDays: parsed?.loginDays && typeof parsed.loginDays === "object" ? parsed.loginDays : {},
    dailyTryRecords: parsed?.dailyTryRecords && typeof parsed.dailyTryRecords === "object" ? parsed.dailyTryRecords : {},
    settings: normalizeSettingsState(parsed?.settings),
    auth: normalizeAuthState(parsed?.auth),
  };
}

function normalizeSettingsState(value) {
  const normalizedMode = normalizeModeThemeState({
    highContrast: normalizeBoolean(value?.highContrast, false),
    monochrome: normalizeBoolean(value?.monochrome, false),
  });
  const theme = normalizeTheme(value?.theme);
  const unlockedThemes = normalizeThemeUnlockState(value?.unlockedThemes);
  unlockedThemes[theme] = true;
  return {
    theme,
    unlockedThemes,
    highContrast: normalizedMode.highContrast,
    monochrome: normalizedMode.monochrome,
    text: normalizeTextSettings(value?.text),
    notifications: normalizeNotificationSettings(value?.notifications),
  };
}

function normalizeTheme(value) {
  const normalizedValue = LEGACY_THEME_ALIASES[value] ?? value;
  return AVAILABLE_THEMES.includes(normalizedValue) ? normalizedValue : DEFAULT_THEME;
}

function normalizeTextSettings(value) {
  const size = Math.round(clampNumber(value?.size, 85, 130, DEFAULT_TEXT_SETTINGS.size));
  const roundedWeight = Math.round(clampNumber(value?.weight, 400, 800, DEFAULT_TEXT_SETTINGS.weight) / 100) * 100;
  const weight = clampNumber(roundedWeight, 400, 800, DEFAULT_TEXT_SETTINGS.weight);
  const spacing = Number(clampNumber(value?.spacing, 0, 0.12, DEFAULT_TEXT_SETTINGS.spacing).toFixed(2));
  return {
    size,
    weight,
    spacing,
  };
}

function normalizeNotificationSettings(value) {
  return {
    dailyLogin: normalizeBoolean(value?.dailyLogin, DEFAULT_NOTIFICATION_SETTINGS.dailyLogin),
    dailyTry: normalizeBoolean(value?.dailyTry, DEFAULT_NOTIFICATION_SETTINGS.dailyTry),
    notice: normalizeBoolean(value?.notice, DEFAULT_NOTIFICATION_SETTINGS.notice),
  };
}

function createDefaultThemeUnlockState() {
  const unlockedThemes = {};
  AVAILABLE_THEMES.forEach((theme) => {
    unlockedThemes[theme] = !PREMIUM_THEMES.includes(theme);
  });
  return unlockedThemes;
}

function normalizeThemeUnlockState(value) {
  const defaultState = createDefaultThemeUnlockState();
  if (!value || typeof value !== "object") {
    return defaultState;
  }

  AVAILABLE_THEMES.forEach((theme) => {
    if (typeof value[theme] === "boolean") {
      defaultState[theme] = value[theme];
    }
  });
  return defaultState;
}

function normalizeModeThemeState(value) {
  const highContrast = Boolean(value?.highContrast);
  const monochrome = Boolean(value?.monochrome);
  if (highContrast && monochrome) {
    return {
      highContrast: true,
      monochrome: false,
    };
  }
  return {
    highContrast,
    monochrome,
  };
}

function normalizeAuthState(value) {
  const isLoggedIn = Boolean(value?.isLoggedIn);
  const provider =
    isLoggedIn && typeof value?.provider === "string" && value.provider.trim() ? value.provider.trim() : null;
  const displayName =
    isLoggedIn && typeof value?.displayName === "string" && value.displayName.trim()
      ? value.displayName.trim()
      : "Guest Mode";
  const email = isLoggedIn && typeof value?.email === "string" && value.email.trim() ? value.email.trim() : null;
  return {
    isLoggedIn,
    provider,
    displayName,
    email,
  };
}

function normalizeAuth0Config(value) {
  const domain = typeof value?.domain === "string" ? value.domain.trim() : "";
  const clientId = typeof value?.clientId === "string" ? value.clientId.trim() : "";
  const audience = typeof value?.audience === "string" ? value.audience.trim() : "";
  const scope = typeof value?.scope === "string" ? value.scope.trim() : AUTH0_DEFAULT_SCOPE;
  const googleConnection =
    typeof value?.googleConnection === "string" && value.googleConnection.trim()
      ? value.googleConnection.trim()
      : "google-oauth2";
  const defaultConnection =
    typeof value?.defaultConnection === "string" && value.defaultConnection.trim()
      ? value.defaultConnection.trim()
      : "";
  const redirectUri =
    typeof value?.redirectUri === "string" && value.redirectUri.trim()
      ? value.redirectUri.trim()
      : `${window.location.origin}${window.location.pathname}`;
  return {
    domain,
    clientId,
    audience,
    scope,
    googleConnection,
    defaultConnection,
    redirectUri,
  };
}

function normalizeBoolean(value, fallbackValue) {
  return typeof value === "boolean" ? value : fallbackValue;
}

function clampNumber(value, min, max, fallbackValue) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return fallbackValue;
  }
  return Math.max(min, Math.min(max, number));
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function showStatus(_message) {
  if (!elements.statusMessage) {
    return;
  }
  elements.statusMessage.textContent = "";
  elements.statusMessage.hidden = true;
}

function getCurrentMonthStartDate() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

function todayKey() {
  return keyFromDate(new Date());
}

function getFirstLoginDate() {
  const loginKeys = Object.keys(state.loginDays);
  if (loginKeys.length === 0) {
    return null;
  }
  const firstKey = loginKeys.sort()[0];
  const firstDate = dateFromKey(firstKey);
  return new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
}

function keyFromDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function dateFromKey(key) {
  const [y, m, d] = String(key).split("-").map(Number);
  return new Date(y, m - 1, d);
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// Login page onboarding script (moved from login.html)
(() => {
  const DRAFT_STORAGE_KEY = "the-review-login-onboarding-v1";
  const steps = Array.from(document.querySelectorAll("[data-onboarding-step]"));
  if (steps.length === 0) {
    return;
  }

  const termsAgreeCheckbox = document.getElementById("termsAgreeCheckbox");
  const termsNextBtn = document.getElementById("termsNextBtn");
  const educationCodeInput = document.getElementById("educationCodeInput");
  const educationCodeNextBtn = document.getElementById("educationCodeNextBtn");
  const educationCodeStartScanBtn = document.getElementById("educationCodeStartScanBtn");
  const educationCodeUnavailableBubble = document.getElementById("educationCodeUnavailableBubble");
  const educationCodeStopScanBtn = document.getElementById("educationCodeStopScanBtn");
  const educationCodeScanner = document.getElementById("educationCodeScanner");
  const educationCodeVideo = document.getElementById("educationCodeVideo");
  const educationCodeScanStatus = document.getElementById("educationCodeScanStatus");
  const avatarInputs = Array.from(document.querySelectorAll('input[name="avatarPreset"]'));
  const loginNotifyReviewPeriodToggle = document.getElementById("loginNotifyReviewPeriodToggle");
  const loginNotifyTodaysMissionToggle = document.getElementById("loginNotifyTodaysMissionToggle");
  const loginNotifyNoticeToggle = document.getElementById("loginNotifyNoticeToggle");
  const onboardingSaveBtn = document.getElementById("onboardingSaveBtn");
  const onboardingSavedNote = document.getElementById("onboardingSavedNote");
  const onboardingFixedProgress = document.getElementById("onboardingFixedProgress");
  const onboardingFixedProgressFill = document.getElementById("onboardingFixedProgressFill");
  const onboardingFixedStepLabel = document.getElementById("onboardingFixedStepLabel");
  const onboardingFixedStepNumber = document.getElementById("onboardingFixedStepNumber");
  const onboardingFixedStepCurrent = document.getElementById("onboardingFixedStepCurrent");
  const ONBOARDING_PROGRESS_TOTAL = 5;
  const ONBOARDING_PROGRESS_BY_STEP = {
    terms: 1,
    auth: 2,
    educationCode: 3,
    avatar: 4,
    notification: 5,
  };
  const ONBOARDING_PROGRESS_LABEL_BY_STEP = {
    terms: "利用規約とプライバシーポリシーへの同意",
    auth: "Review Account",
    educationCode: "Education Code",
    avatar: "Avater",
    notification: "通知",
  };

  let activeStepIndex = 0;
  let educationCodeScanStream = null;
  let educationCodeScanFrameId = 0;
  let educationCodeScanActive = false;
  let educationCodeDetector = null;

  function setActiveStep(nextIndex) {
    const clampedIndex = Math.max(0, Math.min(nextIndex, steps.length - 1));
    activeStepIndex = clampedIndex;
    steps.forEach((step, index) => {
      const isActive = index === clampedIndex;
      step.hidden = !isActive;
      step.classList.toggle("is-active", isActive);
    });

    const activeStepName = String(steps[clampedIndex]?.dataset.onboardingStep || "");
    if (activeStepName !== "educationCode") {
      stopEducationCodeScanner();
    }
    const progressStep = ONBOARDING_PROGRESS_BY_STEP[activeStepName];
    if (!progressStep) {
      if (onboardingFixedProgress) {
        onboardingFixedProgress.hidden = true;
      }
      if (onboardingFixedStepLabel) {
        onboardingFixedStepLabel.textContent = "";
      }
      return;
    }
    const progressLabel = ONBOARDING_PROGRESS_LABEL_BY_STEP[activeStepName] || "";

    if (onboardingFixedProgress) {
      onboardingFixedProgress.hidden = false;
    }
    if (onboardingFixedStepLabel) {
      onboardingFixedStepLabel.textContent = progressLabel;
    }
    if (onboardingFixedProgressFill) {
      onboardingFixedProgressFill.style.width = `${(progressStep / ONBOARDING_PROGRESS_TOTAL) * 100}%`;
    }
    if (onboardingFixedStepCurrent) {
      onboardingFixedStepCurrent.textContent = String(progressStep);
    }
    if (onboardingFixedStepNumber) {
      onboardingFixedStepNumber.setAttribute("aria-label", `${progressStep} / ${ONBOARDING_PROGRESS_TOTAL}`);
    }
  }

  function getSelectedValue(inputs) {
    const selected = inputs.find((input) => input.checked);
    return selected ? selected.value : "";
  }

  function getOnboardingNotificationSettingsFromToggles() {
    return {
      dailyLogin: loginNotifyReviewPeriodToggle?.checked ?? DEFAULT_NOTIFICATION_SETTINGS.dailyLogin,
      dailyTry: loginNotifyTodaysMissionToggle?.checked ?? DEFAULT_NOTIFICATION_SETTINGS.dailyTry,
      notice: loginNotifyNoticeToggle?.checked ?? DEFAULT_NOTIFICATION_SETTINGS.notice,
    };
  }

  function applyOnboardingNotificationSettingsToToggles(settings) {
    const normalized = normalizeNotificationSettings(settings);
    if (loginNotifyReviewPeriodToggle) {
      loginNotifyReviewPeriodToggle.checked = normalized.dailyLogin;
    }
    if (loginNotifyTodaysMissionToggle) {
      loginNotifyTodaysMissionToggle.checked = normalized.dailyTry;
    }
    if (loginNotifyNoticeToggle) {
      loginNotifyNoticeToggle.checked = normalized.notice;
    }
  }

  function commitOnboardingNotificationSettings(settings) {
    state.settings.notifications = normalizeNotificationSettings(settings);
    saveState();
  }

  function handleOnboardingNotificationToggleChange() {
    const nextSettings = getOnboardingNotificationSettingsFromToggles();
    commitOnboardingNotificationSettings(nextSettings);
    saveDraft();
  }

  function loadDraft() {
    try {
      const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  }

  function saveDraft() {
    const payload = {
      termsAccepted: Boolean(termsAgreeCheckbox?.checked),
      educationCode: String(educationCodeInput?.value ?? "").trim(),
      avatarPreset: getSelectedValue(avatarInputs),
      notifications: getOnboardingNotificationSettingsFromToggles(),
    };
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(payload));
  }

  function syncTermsStep() {
    if (termsNextBtn) {
      termsNextBtn.disabled = !Boolean(termsAgreeCheckbox?.checked);
    }
  }

  function syncEducationCodeStep() {
    if (educationCodeNextBtn) {
      educationCodeNextBtn.disabled = String(educationCodeInput?.value ?? "").trim().length === 0;
    }
  }

  function setEducationCodeScanStatus(message) {
    if (educationCodeScanStatus) {
      educationCodeScanStatus.textContent = String(message || "");
    }
  }

  function setEducationCodeUnavailableBubbleVisible(isVisible) {
    if (educationCodeUnavailableBubble) {
      educationCodeUnavailableBubble.hidden = !Boolean(isVisible);
    }
  }

  function setEducationCodeScannerVisible(isVisible) {
    if (educationCodeScanner) {
      educationCodeScanner.hidden = !isVisible;
    }
    if (educationCodeStartScanBtn) {
      educationCodeStartScanBtn.hidden = Boolean(isVisible);
    }
    if (educationCodeStopScanBtn) {
      educationCodeStopScanBtn.hidden = !Boolean(isVisible);
    }
  }

  function stopEducationCodeScanner() {
    educationCodeScanActive = false;
    if (educationCodeScanFrameId) {
      window.cancelAnimationFrame(educationCodeScanFrameId);
      educationCodeScanFrameId = 0;
    }
    if (educationCodeScanStream) {
      educationCodeScanStream.getTracks().forEach((track) => track.stop());
      educationCodeScanStream = null;
    }
    if (educationCodeVideo) {
      educationCodeVideo.pause();
      educationCodeVideo.srcObject = null;
    }
    setEducationCodeScannerVisible(false);
  }

  function extractEducationCodeFromQr(rawValue) {
    const text = String(rawValue ?? "").trim();
    if (!text) {
      return "";
    }

    try {
      const parsedUrl = new URL(text);
      const byQuery =
        parsedUrl.searchParams.get("educationCode") ||
        parsedUrl.searchParams.get("schoolCode") ||
        parsedUrl.searchParams.get("code");
      if (byQuery) {
        return byQuery.trim().slice(0, 20);
      }
    } catch {
      // URLでない場合はそのまま次の判定へ進む
    }

    const keyValueMatch = text.match(/(?:educationCode|schoolCode|code)\s*[:=]\s*([A-Za-z0-9_-]+)/i);
    if (keyValueMatch?.[1]) {
      return keyValueMatch[1].trim().slice(0, 20);
    }

    return text.slice(0, 20);
  }

  function applyEducationCodeValue(nextValue) {
    if (!educationCodeInput) {
      return;
    }
    educationCodeInput.value = String(nextValue ?? "").trim().slice(0, 20);
    syncEducationCodeStep();
    saveDraft();
  }

  async function scanEducationCodeFrame() {
    if (!educationCodeScanActive || !educationCodeDetector || !educationCodeVideo) {
      return;
    }

    try {
      if (educationCodeVideo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        const detections = await educationCodeDetector.detect(educationCodeVideo);
        const rawValue = detections?.[0]?.rawValue;
        if (rawValue) {
          const detectedCode = extractEducationCodeFromQr(rawValue);
          if (detectedCode) {
            applyEducationCodeValue(detectedCode);
            setEducationCodeScanStatus("QRコードを読みとりました。");
            stopEducationCodeScanner();
            return;
          }
        }
      }
    } catch {
      setEducationCodeScanStatus("読みとりに失敗しました。");
      stopEducationCodeScanner();
      return;
    }

    educationCodeScanFrameId = window.requestAnimationFrame(() => {
      void scanEducationCodeFrame();
    });
  }

  async function startEducationCodeScanner() {
    const canUseQrScan = "BarcodeDetector" in window && Boolean(navigator.mediaDevices?.getUserMedia);
    if (!canUseQrScan) {
      setEducationCodeUnavailableBubbleVisible(true);
      return;
    }

    setEducationCodeUnavailableBubbleVisible(false);
    stopEducationCodeScanner();
    setEducationCodeScannerVisible(true);
    setEducationCodeScanStatus("カメラを起動しています…");

    try {
      if (!educationCodeDetector) {
        educationCodeDetector = new BarcodeDetector({ formats: ["qr_code"] });
      }
      educationCodeScanStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      if (!educationCodeVideo) {
        throw new Error("Video element is unavailable.");
      }
      educationCodeVideo.srcObject = educationCodeScanStream;
      await educationCodeVideo.play();
      educationCodeScanActive = true;
      setEducationCodeScanStatus("QRコードをカメラに映してください。");
      void scanEducationCodeFrame();
    } catch {
      setEducationCodeScanStatus("カメラの起動ができませんでした。");
      stopEducationCodeScanner();
    }
  }

  function syncEducationCodeScannerAvailability() {
    const canUseQrScan = "BarcodeDetector" in window && Boolean(navigator.mediaDevices?.getUserMedia);
    if (educationCodeStartScanBtn) {
      educationCodeStartScanBtn.disabled = !canUseQrScan;
    }
    setEducationCodeUnavailableBubbleVisible(!canUseQrScan);
  }

  function renderLegalDocument(rawText) {
    const normalized = String(rawText ?? "").replace(/\r\n/g, "\n");
    if (!normalized.trim()) {
      return "<p>文書が空です。</p>";
    }
    return `<p>${normalized.replace(/\n/g, "<br />")}</p>`;
  }

  async function populateLegalContent() {
    const legalTargets = [
      {
        id: "termsTabPanelTerms",
        src: "./terms.txt",
      },
      {
        id: "termsTabPanelPrivacy",
        src: "./privacy-policy.txt",
      },
    ];

    await Promise.all(
      legalTargets.map(async ({ id, src }) => {
        const panel = document.getElementById(id);
        if (!panel) {
          return;
        }
        try {
          const response = await fetch(src, { cache: "no-store" });
          if (!response.ok) {
            throw new Error(`Failed to load ${src}`);
          }
          const text = await response.text();
          panel.innerHTML = renderLegalDocument(text);
        } catch {
          panel.innerHTML = "<p>文書の読み込みに失敗しました。</p>";
        }
      }),
    );
  }

  const initialDraft = loadDraft();
  if (initialDraft) {
    if (termsAgreeCheckbox && typeof initialDraft.termsAccepted === "boolean") {
      termsAgreeCheckbox.checked = initialDraft.termsAccepted;
    }
    const initialEducationCode =
      typeof initialDraft.educationCode === "string"
        ? initialDraft.educationCode
        : typeof initialDraft.schoolCode === "string"
          ? initialDraft.schoolCode
          : "";
    if (educationCodeInput && initialEducationCode) {
      educationCodeInput.value = initialEducationCode;
    }
    if (typeof initialDraft.avatarPreset === "string" && initialDraft.avatarPreset.trim()) {
      const avatarInput = avatarInputs.find((input) => input.value === initialDraft.avatarPreset);
      if (avatarInput) {
        avatarInput.checked = true;
      }
    }
    if (initialDraft.notifications && typeof initialDraft.notifications === "object") {
      applyOnboardingNotificationSettingsToToggles(initialDraft.notifications);
    } else if (typeof initialDraft.notifyPreference === "string" && initialDraft.notifyPreference.trim()) {
      const normalizedPreference = initialDraft.notifyPreference.trim().toLowerCase();
      if (normalizedPreference === "disabled") {
        applyOnboardingNotificationSettingsToToggles({
          dailyLogin: false,
          dailyTry: false,
          notice: false,
        });
      } else {
        applyOnboardingNotificationSettingsToToggles({
          dailyLogin: true,
          dailyTry: true,
          notice: true,
        });
      }
    } else {
      applyOnboardingNotificationSettingsToToggles(state.settings.notifications);
    }
  } else {
    applyOnboardingNotificationSettingsToToggles(state.settings.notifications);
  }

  termsAgreeCheckbox?.addEventListener("change", () => {
    syncTermsStep();
    saveDraft();
  });

  educationCodeInput?.addEventListener("input", () => {
    syncEducationCodeStep();
    saveDraft();
  });

  educationCodeStartScanBtn?.addEventListener("click", () => {
    void startEducationCodeScanner();
  });

  educationCodeStopScanBtn?.addEventListener("click", () => {
    setEducationCodeScanStatus("QRコードの読みとりを停止しました。");
    stopEducationCodeScanner();
  });

  avatarInputs.forEach((input) => {
    input.addEventListener("change", saveDraft);
  });

  loginNotifyReviewPeriodToggle?.addEventListener("change", handleOnboardingNotificationToggleChange);
  loginNotifyTodaysMissionToggle?.addEventListener("change", handleOnboardingNotificationToggleChange);
  loginNotifyNoticeToggle?.addEventListener("change", handleOnboardingNotificationToggleChange);

  document.addEventListener("click", (event) => {
    const gotoButton = event.target.closest("[data-onboarding-goto]");
    if (gotoButton) {
      const stepName = String(gotoButton.dataset.onboardingGoto || "");
      const targetIndex = steps.findIndex((step) => step.dataset.onboardingStep === stepName);
      if (targetIndex >= 0) {
        setActiveStep(targetIndex);
      }
      return;
    }

    const navButton = event.target.closest("[data-onboarding-nav]");
    if (!navButton) {
      return;
    }

    const direction = navButton.dataset.onboardingNav;
    if (direction === "next") {
      setActiveStep(activeStepIndex + 1);
      return;
    }
    if (direction === "prev") {
      setActiveStep(activeStepIndex - 1);
    }
  });

  onboardingSaveBtn?.addEventListener("click", () => {
    const nextNotificationSettings = getOnboardingNotificationSettingsFromToggles();
    commitOnboardingNotificationSettings(nextNotificationSettings);
    saveDraft();
    if (state.auth.isLoggedIn) {
      redirectToIndexPage();
      return;
    }
    if (onboardingSavedNote) {
      onboardingSavedNote.hidden = false;
    }
  });

  populateLegalContent();
  syncEducationCodeScannerAvailability();
  syncTermsStep();
  syncEducationCodeStep();
  setActiveStep(0);

  window.addEventListener("beforeunload", stopEducationCodeScanner);
})();
