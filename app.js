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
const CALENDAR_INITIAL_YEAR = 2026;
const CALENDAR_INITIAL_MONTH_INDEX = 2;
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
  calendarMonthLabel: document.getElementById("calendarMonthLabel"),
  calendarPrevMonthBtn: document.getElementById("calendarPrevMonthBtn"),
  calendarNextMonthBtn: document.getElementById("calendarNextMonthBtn"),
  calendarGrid: document.getElementById("calendarGrid"),
  selfcheckTimerDisplay: document.getElementById("selfcheckTimerDisplay"),
  selfcheckTimerStartBtn: document.getElementById("selfcheckTimerStartBtn"),
  selfcheckTimerPauseBtn: document.getElementById("selfcheckTimerPauseBtn"),
  selfcheckTimerResetBtn: document.getElementById("selfcheckTimerResetBtn"),
  reviewCoinValue: document.getElementById("reviewCoinValue"),
  mypageCoinValue: document.getElementById("mypageCoinValue"),
  authEmailText: document.getElementById("authEmailText"),
  authStatusText: document.getElementById("authStatusText"),
  authLoginBtn: document.getElementById("authLoginBtn"),
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
  notifyDailyLoginToggle: document.getElementById("notifyDailyLoginToggle"),
  notifyDailyTryToggle: document.getElementById("notifyDailyTryToggle"),
  notifyNoticeToggle: document.getElementById("notifyNoticeToggle"),
  textResetDialogOpenBtn: document.getElementById("textResetDialogOpenBtn"),
  textResetDialog: document.getElementById("textResetDialog"),
  textResetActionButtons: Array.from(document.querySelectorAll("[data-text-reset-action]")),
  homeGreeting: document.getElementById("homeGreeting"),
  dailyLoginText: document.getElementById("dailyLoginText"),
  dailyTryPrompt: document.getElementById("dailyTryPrompt"),
  dailyTryChoiceList: document.getElementById("dailyTryChoiceList"),
  dailyTryFeedback: document.getElementById("dailyTryFeedback"),
  dailyTrySubmitBtn: document.getElementById("dailyTrySubmitBtn"),
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
let calendarViewDate = new Date(CALENDAR_INITIAL_YEAR, CALENDAR_INITIAL_MONTH_INDEX, 1);
let auth0Client = null;

init()
  .catch((error) => {
    console.error("App initialization failed:", error);
    showStatus("初期化でエラーが発生しました。画面を再読み込みしてください。");
  })
  .finally(() => {
    hideAppLoader();
  });

async function init() {
  ensureInitialCoinGrant();
  await initializeAuth();
  applyTheme(state.settings.theme);
  applyAccessibilityModes();
  applyTypographySettings();
  bindBeforeUnloadPrompt();
  markDailyLogin();
  bindEvents();
  startHomeGreetingTicker();
  renderAll();
  activateScreen(activeScreen);
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

  if (elements.authLoginBtn) {
    elements.authLoginBtn.addEventListener("click", async () => {
      await loginWithAuth0({
        targetScreen: "mypage",
        targetMypagePage: "top",
      });
    });
  }

  if (elements.dailyTrySubmitBtn) {
    elements.dailyTrySubmitBtn.addEventListener("click", submitDailyTryAnswer);
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

  if (elements.notifyDailyLoginToggle) {
    elements.notifyDailyLoginToggle.addEventListener("change", () => {
      updateNotificationSetting("dailyLogin", elements.notifyDailyLoginToggle.checked);
    });
  }

  if (elements.notifyDailyTryToggle) {
    elements.notifyDailyTryToggle.addEventListener("change", () => {
      updateNotificationSetting("dailyTry", elements.notifyDailyTryToggle.checked);
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
    }
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
}

function promptLoginForMypage() {
  activateScreen("login");
  showStatus("マイページを見るにはログインが必要です。");
}

async function loginWithAuth0(appState) {
  if (!auth0Client) {
    showStatus("Auth0設定が未完了です。auth0-config.js を確認してください。");
    renderAuthPanel();
    return;
  }
  try {
    await auth0Client.loginWithRedirect({
      appState: {
        targetScreen: "mypage",
        targetMypagePage: "top",
        ...appState,
      },
    });
  } catch (error) {
    console.error("Auth0 login failed:", error);
    showStatus("Auth0ログインに失敗しました。設定を確認して再試行してください。");
  }
}

async function logoutAccount() {
  if (!state.auth.isLoggedIn) {
    showStatus("すでにログアウトしています。");
    return;
  }
  if (auth0Client) {
    try {
      await auth0Client.logout({
        logoutParams: {
          returnTo: AUTH0_CONFIG.redirectUri,
        },
      });
    } catch (error) {
      console.error("Auth0 logout failed:", error);
      showStatus("Auth0ログアウトに失敗しました。");
    }
    return;
  }

  applyLoggedOutState();
  showStatus("ログアウトしました。");
}

async function initializeAuth() {
  if (!isAuth0SdkAvailable()) {
    auth0Client = null;
    setLoggedOutAuthState();
    saveState();
    showStatus("Auth0 SDKの読み込みに失敗しました。ネットワーク接続を確認してください。");
    return;
  }
  if (!isAuth0Configured()) {
    auth0Client = null;
    setLoggedOutAuthState();
    saveState();
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

  await syncAuthStateFromAuth0();
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

function hasAuth0CallbackParams() {
  const params = new URLSearchParams(window.location.search);
  return params.has("code") && params.has("state");
}

function clearAuth0CallbackParamsFromUrl() {
  const cleanUrl = `${window.location.pathname}${window.location.hash}`;
  window.history.replaceState({}, document.title, cleanUrl);
}

async function syncAuthStateFromAuth0() {
  if (!auth0Client) {
    setLoggedOutAuthState();
    saveState();
    return;
  }

  const isAuthenticated = await auth0Client.isAuthenticated();
  if (!isAuthenticated) {
    setLoggedOutAuthState();
    saveState();
    return;
  }

  const user = await auth0Client.getUser();
  state.auth = normalizeAuthState({
    isLoggedIn: true,
    provider: "auth0",
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
    displayName: "ゲスト",
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
    displayName: "ゲスト",
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
  renderCoinBoard();
  renderMypageCoin();
  renderMypageSettings();
  renderAuthPanel();
  setMypagePage(activeMypagePage);
  renderSelfcheckCalendar();
  renderSelfcheckTimerDisplay();
  updateSelfcheckTimerButtons();
  renderHomeGreeting();
  renderDailyLogin();
  renderDailyTryPanel();
}

function renderCoinBoard() {
  elements.reviewCoinValue.textContent = String(state.reviewCoin);
}

function renderMypageCoin() {
  if (!elements.mypageCoinValue) {
    return;
  }
  elements.mypageCoinValue.textContent = `${state.reviewCoin}枚`;
}

function renderMypageSettings() {
  if (elements.authEmailText) {
    elements.authEmailText.textContent = state.auth.isLoggedIn ? state.auth.email ?? "未設定" : "未設定";
  }
  if (elements.authStatusText) {
    elements.authStatusText.textContent = state.auth.isLoggedIn ? "ログイン中" : "未ログイン";
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
  if (elements.notifyDailyLoginToggle) {
    elements.notifyDailyLoginToggle.checked = state.settings.notifications.dailyLogin;
  }
  if (elements.notifyDailyTryToggle) {
    elements.notifyDailyTryToggle.checked = state.settings.notifications.dailyTry;
  }
  if (elements.notifyNoticeToggle) {
    elements.notifyNoticeToggle.checked = state.settings.notifications.notice;
  }

  renderTextSettingIndicators();
}

function renderAuthPanel() {
  if (elements.authLoginBtn) {
    const canLogin = Boolean(auth0Client);
    elements.authLoginBtn.disabled = !canLogin || state.auth.isLoggedIn;
    elements.authLoginBtn.textContent = state.auth.isLoggedIn ? "ログイン済み" : "Auth0でログイン";
  }
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

function renderDailyLogin() {
  const count = Object.keys(state.loginDays).length;
  elements.dailyLoginText.textContent = `あなたは${count}日ログインしています。`;
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
  if (hour === 16 && isJapaneseBusinessDay(date)) {
    return "学校お疲れさまでした。";
  }
  if (hour >= 5 && hour < 11) {
    return "おはようございます。";
  }
  if (hour >= 11 && hour < 18) {
    return "こんにちは。";
  }
  return "こんばんは。";
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
  const fallback = {
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
      displayName: "ゲスト",
      email: null,
    },
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return fallback;
    }
    const parsed = JSON.parse(raw);
    return {
      ...fallback,
      reviewCoin:
        Number.isFinite(Number(parsed?.reviewCoin)) && Number(parsed.reviewCoin) >= 0
          ? Number(parsed.reviewCoin)
          : 0,
      coinGrant5000Applied: normalizeBoolean(parsed?.coinGrant5000Applied, false),
      loginDays: parsed?.loginDays && typeof parsed.loginDays === "object" ? parsed.loginDays : {},
      dailyTryRecords:
        parsed?.dailyTryRecords && typeof parsed.dailyTryRecords === "object" ? parsed.dailyTryRecords : {},
      settings: normalizeSettingsState(parsed?.settings),
      auth: normalizeAuthState(parsed?.auth),
    };
  } catch {
    return fallback;
  }
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
      : "ゲスト";
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
  const redirectUri =
    typeof value?.redirectUri === "string" && value.redirectUri.trim()
      ? value.redirectUri.trim()
      : `${window.location.origin}${window.location.pathname}`;
  return {
    domain,
    clientId,
    audience,
    scope,
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

function showStatus(message) {
  elements.statusMessage.textContent = message;
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

