const STORAGE_KEY = "the-review-quest-v1";
const HOME_GREETING_REFRESH_MS = 60 * 1000;
const AUTH_INIT_TIMEOUT_MS = 7000;
const FLASHCARD_INIT_TIMEOUT_MS = 5000;
const FLASHCARD_QUESTIONS_FETCH_TIMEOUT_MS = 4500;
const JP_HOLIDAY_CACHE = new Map();
const DEFAULT_THEME = "sea";
const AVAILABLE_THEMES = [
  "sea",
  "midnight",
  "forest",
  "aojiru",
  "lemonade",
  "strawberry",
  "the-paper",
  "the-black",
];
const THEME_DISPLAY_NAMES = {
  sea: "Sea",
  midnight: "Midnight",
  forest: "Forest",
  aojiru: "Aojiru",
  lemonade: "Lemonade",
  strawberry: "Strawberry",
  "the-paper": "The Paper",
  "the-black": "The Black",
};
const PREMIUM_THEME_COSTS = {
  forest: 100,
  aojiru: 100,
  lemonade: 100,
  strawberry: 100,
  "the-paper": 300,
  "the-black": 300,
};
const PREMIUM_THEMES = Object.keys(PREMIUM_THEME_COSTS);
const THEME_UNLOCK_POLICY_VERSION = 2;
const LEGACY_THEME_ALIASES = {
  deepsea: "sea",
  slate: "sea",
  blueberry: "midnight",
  "banana-cake": "lemonade",
  sunset: "strawberry",
  kagiko: "midnight",
  city: "midnight",
  "sumiyoshi-sta": "sea",
  "kinshicho-sta": "lemonade",
};
const THEME_FADE_MS = 360;
const SELFCHECK_DEFAULT_TIMER_SECONDS = 25 * 60;
const MYPAGE_PAGE_IDS = ["top"];
const SCREEN_IDS = ["home", "login", "mypage", "learn", "notice", "settings"];
const SETTINGS_TAB_IDS = ["account", "notification", "review-data"];
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
const DEFAULT_NOTIFICATION_TIME_MINUTES = 7 * 60;
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
const FLASHCARD_BOOK_DROP_ANIMATION_MS = 280;
const FLASHCARD_BOOK_USE_EXIT_ANIMATION_MS = 340;
const FLASHCARD_BOOK_USE_DROP_ANIMATION_MS = 360;
const FLASHCARD_BOOK_USE_OPEN_ANIMATION_MS = 420;
const FLASHCARD_BOOK_USE_ANIMATION_TOTAL_MS =
  FLASHCARD_BOOK_USE_EXIT_ANIMATION_MS + FLASHCARD_BOOK_USE_DROP_ANIMATION_MS + FLASHCARD_BOOK_USE_OPEN_ANIMATION_MS;
const FLASHCARD_BOOK_PUTAWAY_EXIT_ANIMATION_MS = 340;
const FLASHCARD_BOOK_PUTAWAY_DROP_ANIMATION_MS = 360;
const FLASHCARD_BOOK_PUTAWAY_ANIMATION_TOTAL_MS =
  FLASHCARD_BOOK_PUTAWAY_EXIT_ANIMATION_MS + FLASHCARD_BOOK_PUTAWAY_DROP_ANIMATION_MS;
const FLASHCARD_BOOK_SINGLE_CLICK_DELAY_MS = 240;
const FLASHCARD_SUMMARY_DEFAULT_TEXT = "復習する科目を選び、本をとり出してください。";
const REVIEW_API_BASE_URL = "https://api.the-review.net";
const REVIEW_API_AUDIENCE = "https://api.the-review.net";
const FLASHCARD_QUESTIONS_API_URL = "https://api.the-review.net/questions";
const FLASHCARD_REMOTE_DEFAULT_DECK_ID = "ec1";
const FLASHCARD_REMOTE_DEFAULT_UNIT = "Questions";
const FLASHCARD_REMOTE_SUBJECT_ALIASES = {
  english: "ec1",
  "english-communication-i": "ec1",
  "english communication i": "ec1",
  math: "math1",
  mathematics: "math1",
  "mathematics-i": "math1",
  "mathematics i": "math1",
  physics: "physics-basic",
  "basic-physics": "physics-basic",
  biology: "bio-basic",
  bio: "bio-basic",
  "basic-biology": "bio-basic",
  civics: "public",
  public: "public",
  health: "health",
  logic: "ss-tech-theory-1",
};
const FLASHCARD_BOOK_OPEN_RIGHT_SUBJECT_IDS = new Set([
  "reboot-modern-japanese",
  "reboot-language-culture",
  "refine-logical-japanese",
]);
const FLASHCARD_BOOK_TONE_SUBJECT_IDS = {
  red: new Set(["reboot-modern-japanese", "reboot-language-culture", "refine-logical-japanese"]),
  blue: new Set(["math1", "reboot-math-a", "refine-math-2", "refine-math-b", "refine-math-c"]),
  darkYellow: new Set([
    "reboot-logical-expression-1",
    "refine-logical-expression-2",
    "ec1",
    "refine-ec-2",
    "morning-test-1-10",
  ]),
  lightYellow: new Set(["public", "refine-geography-general"]),
  green: new Set([
    "physics-basic",
    "reboot-chemistry-basic",
    "bio-basic",
    "refine-physics",
    "refine-chemistry",
    "refine-biology",
  ]),
  gray: new Set(["health", "refine-health", "refine-home-economics-basic", "reboot-information-study"]),
  theme: new Set(["ss-tech-theory-1", "ss-tech-theory-2", "ss-tech-theory-3"]),
};
const FLASHCARD_BOOK_ENGLISH_TITLE_BY_SUBJECT_ID = Object.freeze({
  "reboot-modern-japanese": "Contemporary Japanese Language",
  "reboot-language-culture": "Language Culture",
  "refine-logical-japanese": "Japanese Language: Logic",
  math1: "Mathematics I",
  "reboot-math-a": "Mathematics A",
  "refine-math-2": "Mathematics II",
  "refine-math-b": "Mathematics B",
  "refine-math-c": "Mathematics C",
  "reboot-logical-expression-1": "Logic & Expression I",
  "refine-logical-expression-2": "Logic & Expression II",
  ec1: "English Communication I",
  "refine-ec-2": "English Communication II",
  public: "Public",
  "refine-geography-general": "Geography",
  "physics-basic": "Basic Physics",
  "refine-physics": "Physics",
  "reboot-chemistry-basic": "Basic Chemistry",
  "refine-chemistry": "Chemistry",
  "bio-basic": "Basic Biology",
  "refine-biology": "Biology",
  health: "Health",
  "refine-health": "Health",
  "refine-home-economics-basic": "Basic Home Economics",
  "ss-tech-theory-1": "1st Field",
  "ss-tech-theory-2": "2nd Field",
  "ss-tech-theory-3": "3rd Field",
  "reboot-information-study": "Information Study",
  "morning-test-1-10": "Morning Study Test 1-10",
});
const FLASHCARD_SERIES_CATALOG = [
  {
    id: FLASHCARD_DEFAULT_SERIES.id,
    label: FLASHCARD_DEFAULT_SERIES.label,
    subjects: [
      { id: "reboot-modern-japanese", label: "現代の国語" },
      { id: "reboot-language-culture", label: "言語文化" },
      { id: "math1", label: "数学Ⅰ" },
      { id: "reboot-math-a", label: "数学Ａ" },
      { id: "reboot-logical-expression-1", label: "論理・表現Ⅰ" },
      { id: "ec1", label: "ＥＣⅠ" },
      { id: "public", label: "公共" },
      { id: "physics-basic", label: "物理基礎" },
      { id: "reboot-chemistry-basic", label: "化学基礎" },
      { id: "bio-basic", label: "生物基礎" },
      { id: "health", label: "保健" },
      { id: "reboot-information-study", label: "情報（工業情報数理）" },
      { id: "morning-test-1-10", label: "朝学習テスト①～⑩" },
    ],
  },
  {
    id: FLASHCARD_REVIEW_2ND_SERIES.id,
    label: FLASHCARD_REVIEW_2ND_SERIES.label,
    subjects: [
      { id: "refine-logical-japanese", label: "論理国語" },
      { id: "refine-math-2", label: "数学Ⅱ" },
      { id: "refine-math-c", label: "数学Ｃ" },
      { id: "refine-math-b", label: "数学Ｂ" },
      { id: "refine-logical-expression-2", label: "論理・表現Ⅱ" },
      { id: "refine-ec-2", label: "ＥＣⅡ" },
      { id: "refine-geography-general", label: "地理総合" },
      { id: "refine-physics", label: "物理" },
      { id: "refine-chemistry", label: "化学" },
      { id: "refine-biology", label: "生物" },
      { id: "refine-home-economics-basic", label: "家庭基礎" },
      { id: "refine-health", label: "保健" },
      { id: "ss-tech-theory-1", label: "ＳＳ科学技術理論Ⅰ（１分野）" },
      { id: "ss-tech-theory-2", label: "ＳＳ科学技術理論Ⅰ（２分野）" },
      { id: "ss-tech-theory-3", label: "ＳＳ科学技術理論Ⅰ（３分野）" },
    ],
  },
];
const FLASHCARD_DATASET_SOURCES = [
  {
    id: "public",
    label: "公共",
    resolve: () => (typeof DEFAULT_DATA !== "undefined" ? DEFAULT_DATA : null),
  },
  {
    id: "math1",
    label: "数学Ⅰ",
    resolve: () => (typeof MATH1_DATA !== "undefined" ? MATH1_DATA : null),
  },
  {
    id: "physics-basic",
    label: "物理基礎",
    resolve: () => (typeof PHYSICS_BASIC_DATA !== "undefined" ? PHYSICS_BASIC_DATA : null),
  },
  {
    id: "health",
    label: "保健",
    resolve: () => (typeof HEALTH_DATA !== "undefined" ? HEALTH_DATA : null),
  },
  {
    id: "refine-health",
    label: "保健",
    seriesId: FLASHCARD_REVIEW_2ND_SERIES.id,
    seriesLabel: FLASHCARD_REVIEW_2ND_SERIES.label,
    resolve: () => (typeof HEALTH_DATA !== "undefined" ? HEALTH_DATA : null),
  },
  {
    id: "ec1",
    label: "ＥＣⅠ",
    resolve: () => (typeof EC1_DATA !== "undefined" ? EC1_DATA : null),
  },
  {
    id: "bio-basic",
    label: "生物基礎",
    resolve: () => (typeof BIO_DATA !== "undefined" ? BIO_DATA : null),
  },
  {
    id: "morning-test-1-10",
    label: "朝学習テスト①～⑩",
    resolve: () =>
      mergeFlashcardDatasets(
        typeof WEEK_TEST8_DATA !== "undefined" ? WEEK_TEST8_DATA : null,
        typeof WEEK_TEST9_DATA !== "undefined" ? WEEK_TEST9_DATA : null
      ),
  },
  {
    id: "ss-tech-theory-1",
    label: "ＳＳ科学技術理論Ⅰ（１分野）",
    seriesId: FLASHCARD_REVIEW_2ND_SERIES.id,
    seriesLabel: FLASHCARD_REVIEW_2ND_SERIES.label,
    resolve: () => (typeof LOGIC_DATA !== "undefined" ? LOGIC_DATA : null),
  },
  {
    id: "ss-tech-theory-2",
    label: "ＳＳ科学技術理論Ⅰ（２分野）",
    seriesId: FLASHCARD_REVIEW_2ND_SERIES.id,
    seriesLabel: FLASHCARD_REVIEW_2ND_SERIES.label,
    resolve: () => null,
  },
  {
    id: "ss-tech-theory-3",
    label: "ＳＳ科学技術理論Ⅰ（３分野）",
    seriesId: FLASHCARD_REVIEW_2ND_SERIES.id,
    seriesLabel: FLASHCARD_REVIEW_2ND_SERIES.label,
    resolve: () => null,
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
  settingsTabButtons: Array.from(document.querySelectorAll("[data-settings-tab]")),
  settingsTabPanels: Array.from(document.querySelectorAll("[data-settings-panel]")),
  infoMenuTrigger: document.getElementById("infoMenuTrigger"),
  infoMenuPanel: document.getElementById("infoMenuPanel"),
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
  authLoginStatusText: document.getElementById("authLoginStatusText"),
  authEmailText: document.getElementById("authEmailText"),
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
  reviewDataExportBtn: document.getElementById("reviewDataExportBtn"),
  reviewDataImportBtn: document.getElementById("reviewDataImportBtn"),
  reviewDataImportInput: document.getElementById("reviewDataImportInput"),
  guestModeDialog: document.getElementById("guestModeDialog"),
  guestModeActionButtons: Array.from(document.querySelectorAll("[data-guest-mode-action]")),
  themeUnlockDialog: document.getElementById("themeUnlockDialog"),
  themeUnlockName: document.getElementById("themeUnlockName"),
  themeUnlockCost: document.getElementById("themeUnlockCost"),
  themeUnlockCurrentCoin: document.getElementById("themeUnlockCurrentCoin"),
  themeUnlockActionButtons: Array.from(document.querySelectorAll("[data-theme-unlock-action]")),
  homeGreeting: document.getElementById("homeGreeting"),
  homeCardTrack: document.getElementById("homeCardTrack"),
  homeCardSlides: Array.from(document.querySelectorAll("#homeCardTrack .home-card-slide")),
  homeCardNavButtons: Array.from(document.querySelectorAll("[data-home-card-nav]")),
  homeCardCarousel: document.querySelector(".home-card-carousel"),
  homeCardProgressDots: Array.from(document.querySelectorAll("#homeCardProgress .home-card-progress-dot")),
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
  flashcardBinderList: document.getElementById("flashcardBinderList"),
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
};

const state = loadState();
let activeScreen = "home";
let homeGreetingTimerId = null;
let dailyTryRun = createDailyTryRun();
let themeFadeTimerId = null;
let activeMypagePage = "top";
let activeSettingsTab = "account";
let selfcheckTimerRemainingSeconds = SELFCHECK_DEFAULT_TIMER_SECONDS;
let selfcheckTimerIntervalId = null;
let calendarViewDate = getCurrentMonthStartDate();
let auth0Client = null;
let reviewCoinAnimationFrameId = null;
let homeCardScrollAnimationFrameId = null;
let infoMenuCloseTimerId = null;
let flashcardState = createInitialFlashcardState();
const flashcardBookDropTimerBySeries = new Map();
const flashcardBookUseTimerBySeries = new Map();
const flashcardBookUseAnimationBySeries = new Map();
const flashcardBookIntentTimerByKey = new Map();
const flashcardBookActionQueueBySeries = new Map();
let isFlashcardFocusMode = false;
let isSelfcheckTimerFocusMode = false;
let pendingGuestModeAppState = null;
let pendingThemeUnlockKey = null;
let liftedFlashcardNoteElement = null;
let liftedFlashcardBinderElement = null;
let activeFlashcardBinderElement = null;
let activeFlashcardNotebookState = null;
let flashcardBinderPointerState = null;
let flashcardBinderStageElement = null;
let flashcardBinderBackdropElement = null;
let flashcardBinderPortalState = null;
const FLASHCARD_NOTE_BASE_THICKNESS_PX = 10;
const FLASHCARD_NOTE_THICKNESS_STEP_PX = 1;
const FLASHCARD_NOTE_QUESTIONS_PER_THICKNESS_STEP = 10;
const FLASHCARD_NOTE_SPINE_GAP_PX = 2;
const FLASHCARD_BINDER_SIDE_PADDING_PX = 5;
const FLASHCARD_BINDER_EXTRA_THICKNESS_PX = FLASHCARD_BINDER_SIDE_PADDING_PX * 2;
const FLASHCARD_BINDER_SWIPE_OPEN_THRESHOLD_PX = 46;
const LOGIN_ONBOARDING_STEP_STORAGE_KEY = "the-review-login-onboarding-step";
const LOGIN_ONBOARDING_STEP_IDS = ["welcome", "terms", "auth", "educationCode", "avatar", "notification"];
const IS_LOGIN_PAGE = isCurrentLoginPage();

if (IS_LOGIN_PAGE) {
  initLoginPage()
    .catch((error) => {
      console.error("Login page initialization failed:", error);
    })
    .finally(() => {
      hideAppLoader();
    });
} else {
  init()
    .catch((error) => {
      console.error("App initialization failed:", error);
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

async function withTimeout(promise, timeoutMs, fallbackValue, label = "Operation") {
  let timeoutId = 0;
  try {
    return await Promise.race([
      promise,
      new Promise((resolve) => {
        timeoutId = window.setTimeout(() => {
          console.warn(`${label} timed out after ${timeoutMs}ms`);
          resolve(fallbackValue);
        }, timeoutMs);
      }),
    ]);
  } finally {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
  }
}

async function init() {
  ensureInitialCoinGrant();
  const authRedirectAppState = await withTimeout(initializeAuth(), AUTH_INIT_TIMEOUT_MS, null, "Auth initialization");
  const onboardingStep = normalizeLoginOnboardingStep(authRedirectAppState?.onboardingStep);
  if (onboardingStep) {
    requestLoginOnboardingStep(onboardingStep);
    redirectToLoginPage({ onboardingStep });
    return;
  }
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
  startHomeGreetingTicker();
  renderAll();
  activateScreen(activeScreen);
  void initializeFlashcardsAfterFirstPaint();
}

async function initLoginPage() {
  const isAuthCallback = hasAuth0CallbackParams();
  const requestedOnboardingStep = getRequestedLoginOnboardingStep();
  if (state.auth.isLoggedIn && !isAuthCallback && !requestedOnboardingStep) {
    redirectToIndexPage();
    return;
  }

  bindSharedDataAndGuestDialogEvents();
  bindLoginPageAuthEvents();
  const authRedirectAppState = await withTimeout(initializeAuth(), AUTH_INIT_TIMEOUT_MS, null, "Auth initialization");
  const nextOnboardingStep = normalizeLoginOnboardingStep(authRedirectAppState?.onboardingStep) || requestedOnboardingStep;
  if (nextOnboardingStep) {
    requestLoginOnboardingStep(nextOnboardingStep);
  }
  renderAuthPanel();

  if (state.auth.isLoggedIn) {
    if (nextOnboardingStep) {
      return;
    }
    redirectToIndexPage();
  }
}

async function initializeFlashcardsAfterFirstPaint() {
  await new Promise((resolve) => window.requestAnimationFrame(resolve));
  await withTimeout(initializeFlashcards(), FLASHCARD_INIT_TIMEOUT_MS, undefined, "Flashcard initialization");
  initializeFlashcardNoteBinder();
  renderFlashcardPanel();
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

function getLoginPageUrl(options = {}) {
  const url = new URL("./login.html", window.location.href);
  const onboardingStep = normalizeLoginOnboardingStep(options.onboardingStep);
  if (onboardingStep) {
    url.searchParams.set("onboarding", onboardingStep);
  }
  return url.toString();
}

function redirectToLoginPage(options = {}) {
  window.location.replace(getLoginPageUrl(options));
}

function normalizeLoginOnboardingStep(value) {
  const normalized = typeof value === "string" ? value.trim() : "";
  return LOGIN_ONBOARDING_STEP_IDS.includes(normalized) ? normalized : "";
}

function getRequestedLoginOnboardingStep() {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = normalizeLoginOnboardingStep(params.get("onboarding") || params.get("onboardingStep"));
  if (fromQuery) {
    return fromQuery;
  }

  try {
    return normalizeLoginOnboardingStep(window.sessionStorage.getItem(LOGIN_ONBOARDING_STEP_STORAGE_KEY));
  } catch {
    return "";
  }
}

function requestLoginOnboardingStep(step) {
  const normalizedStep = normalizeLoginOnboardingStep(step);
  if (!normalizedStep) {
    return;
  }

  try {
    window.sessionStorage.setItem(LOGIN_ONBOARDING_STEP_STORAGE_KEY, normalizedStep);
  } catch {
    // セッションストレージが使えない環境ではイベントだけで反映する
  }

  window.dispatchEvent(
    new CustomEvent("the-review-login-onboarding-step", {
      detail: {
        step: normalizedStep,
      },
    })
  );
}

function clearRequestedLoginOnboardingStep() {
  try {
    window.sessionStorage.removeItem(LOGIN_ONBOARDING_STEP_STORAGE_KEY);
  } catch {
    // noop
  }
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
          onboardingStep: "educationCode",
          deferRedirectOnLoginPage: true,
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

function bindHomeCardCarouselEvents() {
  if (!elements.homeCardTrack) {
    return;
  }

  elements.homeCardNavButtons.forEach((button) => {
    button.addEventListener("click", () => {
      moveHomeCardCarousel(button.dataset.homeCardNav);
    });
  });

  elements.homeCardTrack.addEventListener(
    "scroll",
    () => {
      if (homeCardScrollAnimationFrameId !== null) {
        return;
      }
      homeCardScrollAnimationFrameId = window.requestAnimationFrame(() => {
        homeCardScrollAnimationFrameId = null;
        updateHomeCardCarouselControls();
      });
    },
    { passive: true }
  );
}

function getHomeCardSlides() {
  return elements.homeCardSlides.length > 0
    ? elements.homeCardSlides
    : Array.from(elements.homeCardTrack?.querySelectorAll(".home-card-slide") ?? []);
}

function getHomeCardSlideLeft(track, slide) {
  const trackRect = track.getBoundingClientRect();
  const slideRect = slide.getBoundingClientRect();
  return track.scrollLeft + slideRect.left - trackRect.left;
}

function getActiveHomeCardIndex() {
  const track = elements.homeCardTrack;
  const slides = getHomeCardSlides();
  if (!track || slides.length === 0) {
    return 0;
  }

  let activeIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;
  slides.forEach((slide, index) => {
    const distance = Math.abs(getHomeCardSlideLeft(track, slide) - track.scrollLeft);
    if (distance < closestDistance) {
      closestDistance = distance;
      activeIndex = index;
    }
  });
  return activeIndex;
}

function moveHomeCardCarousel(direction) {
  const track = elements.homeCardTrack;
  const slides = getHomeCardSlides();
  if (!track || slides.length === 0) {
    return;
  }

  const offset = direction === "prev" ? -1 : 1;
  const nextIndex = Math.min(Math.max(getActiveHomeCardIndex() + offset, 0), slides.length - 1);
  const nextSlide = slides[nextIndex];
  track.scrollTo({
    left: getHomeCardSlideLeft(track, nextSlide),
    behavior: "smooth",
  });
  updateHomeCardCarouselControls(nextIndex);
}

function updateHomeCardCarouselControls(activeIndex = getActiveHomeCardIndex()) {
  const slides = getHomeCardSlides();
  const lastIndex = Math.max(0, slides.length - 1);

  elements.homeCardNavButtons.forEach((button) => {
    const action = button.dataset.homeCardNav;
    button.disabled = slides.length <= 1 || (action === "prev" ? activeIndex <= 0 : activeIndex >= lastIndex);
  });

  slides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === activeIndex);
  });

  elements.homeCardProgressDots.forEach((dot, index) => {
    const isActive = index === activeIndex;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-current", isActive ? "step" : "false");
  });

  updateDailyTryNudgeState();
}

function isDailyTryAnsweredToday() {
  const record = state.dailyTryRecords[todayKey()];
  return Boolean(record?.answered);
}

function updateDailyTryNudgeState() {
  if (!elements.homeCardCarousel) {
    return;
  }
  elements.homeCardCarousel.classList.toggle("is-daily-try-unanswered", !isDailyTryAnsweredToday());
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
  ];

  panelsWithLabels.forEach(({ selector, label }) => {
    const panel = document.querySelector(selector);
    appendTabScriptLabel(panel, label);
  });

  const learnSections = Array.from(document.querySelectorAll("#screen-learn .selfcheck-section"));
  appendTabScriptLabel(learnSections[0] ?? null, "Calendar");
  appendTabScriptLabel(learnSections[1] ?? null, "Timer");
  appendTabScriptLabel(learnSections[2] ?? null, "Collection");

  const storeSections = Array.from(document.querySelectorAll("#screen-notice .settings-section"));
  const storeLabels = ["Number of Review Coins", "Avatar", "Color Schemes"];
  storeLabels.forEach((label, index) => {
    appendTabScriptLabel(storeSections[index] ?? null, label);
  });

  const settingsSections = Array.from(document.querySelectorAll("#screen-settings .settings-section"));
  const settingsLabels = ["Account", "Notice", "Review Data"];
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
  if (elements.infoMenuTrigger) {
    elements.infoMenuTrigger.addEventListener("click", toggleInfoMenu);
  }

  if (elements.reviewCoinBoard) {
    elements.reviewCoinBoard.addEventListener("click", openStoreFromCoinBoard);
    elements.reviewCoinBoard.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }
      event.preventDefault();
      openStoreFromCoinBoard();
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
      closeInfoMenu();
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

  elements.settingsTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setSettingsTab(button.dataset.settingsTab);
    });
    button.addEventListener("keydown", handleSettingsTabKeydown);
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

  bindHomeCardCarouselEvents();

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
      clearFlashcardBookIntentTimersForSeries(flashcardState.selectedSeriesId);
      clearFlashcardBookUseAnimation(flashcardState.selectedSeriesId);
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
      const putAwayButton = event.target.closest("[data-flashcard-book-putaway]");
      if (putAwayButton) {
        if (putAwayButton.disabled) {
          return;
        }
        const nextDeckId = normalizeFlashcardText(putAwayButton.dataset.flashcardDeckId);
        const activeSeriesId = normalizeFlashcardText(flashcardState.selectedSeriesId);
        if (!nextDeckId || !activeSeriesId) {
          return;
        }
        clearFlashcardBookIntentTimerByKey(getFlashcardBookIntentTimerKey(activeSeriesId, nextDeckId));
        queueFlashcardBookAction(activeSeriesId, () => {
          startFlashcardBookPutAwayAnimation(activeSeriesId, nextDeckId);
        });
        return;
      }

      const actionButton = event.target.closest("[data-flashcard-subject-action]");
      if (actionButton) {
        if (actionButton.disabled) {
          return;
        }
        const nextDeckId = normalizeFlashcardText(actionButton.dataset.flashcardDeckId);
        const activeSeriesId = normalizeFlashcardText(flashcardState.selectedSeriesId);
        if (!nextDeckId || !activeSeriesId) {
          return;
        }
        const isDeckSelectable = getFlashcardDecksInSeries(activeSeriesId).some((deck) => deck.id === nextDeckId);
        if (!isDeckSelectable) {
          return;
        }
        clearFlashcardBookIntentTimerByKey(getFlashcardBookIntentTimerKey(activeSeriesId, nextDeckId));
        queueFlashcardBookAction(activeSeriesId, () => {
          startFlashcardBookUseAnimation(activeSeriesId, nextDeckId);
        });
        return;
      }

      const liftButton = event.target.closest("[data-flashcard-book-lift]");
      if (!liftButton || liftButton.disabled) {
        return;
      }
      const nextDeckId = normalizeFlashcardText(liftButton.dataset.flashcardDeckId);
      const activeSeriesId = normalizeFlashcardText(flashcardState.selectedSeriesId);
      if (!nextDeckId || !activeSeriesId) {
        return;
      }
      const timerKey = getFlashcardBookIntentTimerKey(activeSeriesId, nextDeckId);
      clearFlashcardBookIntentTimerByKey(timerKey);

      const clickCount = Number(event.detail);
      if (Number.isFinite(clickCount) && clickCount >= 2) {
        queueFlashcardBookAction(activeSeriesId, () => {
          startFlashcardBookUseAnimationIfReady(activeSeriesId, nextDeckId);
        });
        return;
      }

      if (clickCount === 0) {
        queueFlashcardBookAction(activeSeriesId, () => {
          toggleFlashcardBookLift(activeSeriesId, nextDeckId);
        });
        return;
      }

      const timerId = window.setTimeout(() => {
        flashcardBookIntentTimerByKey.delete(timerKey);
        queueFlashcardBookAction(activeSeriesId, () => {
          toggleFlashcardBookLift(activeSeriesId, nextDeckId);
        });
      }, FLASHCARD_BOOK_SINGLE_CLICK_DELAY_MS);
      flashcardBookIntentTimerByKey.set(timerKey, timerId);
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

  elements.themeUnlockActionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleThemeUnlockDialogAction(button.dataset.themeUnlockAction);
    });
  });

  elements.themeUnlockDialog?.addEventListener("cancel", () => {
    pendingThemeUnlockKey = null;
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
    const clickedInsideInfoMenu = elements.infoMenuPanel?.contains(event.target);
    const clickedInfoTrigger = elements.infoMenuTrigger?.contains(event.target);
    if (!clickedInsideInfoMenu && !clickedInfoTrigger) {
      closeInfoMenu();
    }

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
      closeInfoMenu();
      closeMypageSubmenu();
      if (isFlashcardFocusMode || isSelfcheckTimerFocusMode) {
        setFlashcardFocusMode(false);
        setSelfcheckTimerFocusMode(false);
      }
    }
  });

  window.addEventListener("resize", () => {
    renderDailyLogin();
    updateHomeCardCarouselControls();
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
    clearAllFlashcardBookIntentTimers();
    setFlashcardPanelBookDimmed(false);
    closeMypageSubmenu();
  }
  if (normalizedScreen === "learn") {
    renderSelfcheckCalendar();
  }
  if (normalizedScreen === "home") {
    updateHomeCardCarouselControls();
  }
  if (normalizedScreen === "settings") {
    setSettingsTab(activeSettingsTab);
  }
  renderFlashcardFocusMode();
}

function promptLoginForMypage() {
  activateScreen("login");
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
}

async function loginWithAuth0(appState, options = {}) {
  if (normalizeAuthLoginProvider(options.provider) === "guest") {
    loginAsGuest(appState);
    return;
  }
  if (!auth0Client) {
    renderAuthPanel();
    return;
  }
  const provider = normalizeAuthLoginProvider(options.provider);
  const providerLabel = provider ? formatAuthProviderLabel(provider) : "Auth0";
  const connection = provider ? getAuthConnectionForProvider(provider) : "";
  if (provider && requiresAuthConnection(provider) && !connection) {
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
  }
}

async function logoutAccount() {
  if (!state.auth.isLoggedIn) {
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
    try {
      const redirectResult = await auth0Client.handleRedirectCallback();
      appStateFromRedirect = redirectResult?.appState ?? null;
    } catch (error) {
      console.error("Auth0 redirect callback failed:", error);
      if (!shouldPreserveGuest) {
        setLoggedOutAuthState();
        saveState();
      }
    } finally {
      clearAuth0CallbackParamsFromUrl();
    }
  }

  await syncAuthStateFromAuth0({ preserveGuest: shouldPreserveGuest });
  if (appStateFromRedirect) {
    applyAuthRedirectState(appStateFromRedirect);
  }
  return appStateFromRedirect;
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
  return {
    redirect_uri: AUTH0_CONFIG.redirectUri,
    scope: AUTH0_CONFIG.scope || AUTH0_DEFAULT_SCOPE,
  };
}

async function getAuth0AccessTokenForApi() {
  if (!auth0Client || !state.auth.isLoggedIn || state.auth.provider === "guest") {
    return null;
  }

  try {
    const isAuthenticated = await auth0Client.isAuthenticated();
    if (!isAuthenticated) {
      return null;
    }
    return await auth0Client.getTokenSilently({
      authorizationParams: {
        audience: AUTH0_CONFIG.audience || REVIEW_API_AUDIENCE,
        scope: AUTH0_CONFIG.scope || AUTH0_DEFAULT_SCOPE,
      },
    });
  } catch (error) {
    console.warn("Failed to get Auth0 access token for answer sync:", error);
    return null;
  }
}

async function savePersonalAnswer(payload) {
  if (!state.auth.isLoggedIn || state.auth.provider === "guest") {
    return;
  }

  const accessToken = await getAuth0AccessTokenForApi();
  if (!accessToken) {
    return;
  }

  try {
    const response = await fetch(`${REVIEW_API_BASE_URL}/me/answers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      console.warn("Failed to save personal answer:", response.status);
    }
  } catch (error) {
    console.warn("Failed to save personal answer:", error);
  }
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
  return params.has("state") && (params.has("code") || params.has("error"));
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
    themeUnlockPolicyVersion: THEME_UNLOCK_POLICY_VERSION,
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
  updateHomeCardCarouselControls();
  setSettingsTab(activeSettingsTab);
}

function createInitialFlashcardState() {
  return {
    decks: [],
    raisedDeckBySeries: {},
    droppingDeckBySeries: {},
    liftingDeckBySeries: {},
    selectedSeriesId: "",
    selectedDeckId: "",
    selectedUnitId: "",
    cardIndex: 0,
    answerVisible: false,
  };
}

function getFlashcardBookIntentTimerKey(seriesId, deckId) {
  const normalizedSeriesId = normalizeFlashcardText(seriesId);
  const normalizedDeckId = normalizeFlashcardText(deckId);
  if (!normalizedSeriesId || !normalizedDeckId) {
    return "";
  }
  return `${normalizedSeriesId}::${normalizedDeckId}`;
}

function clearFlashcardBookIntentTimerByKey(timerKey) {
  if (!timerKey) {
    return;
  }
  const timerId = flashcardBookIntentTimerByKey.get(timerKey);
  if (typeof timerId === "number") {
    window.clearTimeout(timerId);
  }
  flashcardBookIntentTimerByKey.delete(timerKey);
}

function clearFlashcardBookIntentTimersForSeries(seriesId) {
  const normalizedSeriesId = normalizeFlashcardText(seriesId);
  if (!normalizedSeriesId) {
    return;
  }
  Array.from(flashcardBookIntentTimerByKey.keys()).forEach((timerKey) => {
    if (timerKey.startsWith(`${normalizedSeriesId}::`)) {
      clearFlashcardBookIntentTimerByKey(timerKey);
    }
  });
}

function clearAllFlashcardBookIntentTimers() {
  Array.from(flashcardBookIntentTimerByKey.keys()).forEach((timerKey) => {
    clearFlashcardBookIntentTimerByKey(timerKey);
  });
}

function queueFlashcardBookAction(seriesId, action) {
  const normalizedSeriesId = normalizeFlashcardText(seriesId);
  if (!normalizedSeriesId || typeof action !== "function") {
    return Promise.resolve();
  }
  const tail = flashcardBookActionQueueBySeries.get(normalizedSeriesId) ?? Promise.resolve();
  const next = tail
    .catch(() => undefined)
    .then(() => action());
  flashcardBookActionQueueBySeries.set(
    normalizedSeriesId,
    Promise.resolve(next).catch(() => undefined)
  );
  return next;
}

function toggleFlashcardBookLift(seriesId, deckId) {
  const normalizedSeriesId = normalizeFlashcardText(seriesId);
  const normalizedDeckId = normalizeFlashcardText(deckId);
  if (!normalizedSeriesId || !normalizedDeckId) {
    return;
  }
  if (getFlashcardBookUseAnimation(normalizedSeriesId)) {
    return;
  }
  const raisedDeckId = getRaisedFlashcardDeckId(normalizedSeriesId);
  if (raisedDeckId === normalizedDeckId) {
    startFlashcardBookPutAwayAnimation(normalizedSeriesId, normalizedDeckId);
    return;
  }

  if (raisedDeckId) {
    setDroppingFlashcardDeckId(normalizedSeriesId, raisedDeckId);
    scheduleFlashcardBookDropAnimation(normalizedSeriesId, raisedDeckId);
  } else {
    setDroppingFlashcardDeckId(normalizedSeriesId, "");
    clearFlashcardBookDropTimer(normalizedSeriesId);
  }

  setLiftingFlashcardDeckId(normalizedSeriesId, normalizedDeckId);
  setRaisedFlashcardDeckId(normalizedSeriesId, normalizedDeckId);
  renderFlashcardPanel();
  setLiftingFlashcardDeckId(normalizedSeriesId, "");
}

function startFlashcardBookUseAnimationIfReady(seriesId, deckId) {
  const normalizedSeriesId = normalizeFlashcardText(seriesId);
  const normalizedDeckId = normalizeFlashcardText(deckId);
  if (!normalizedSeriesId || !normalizedDeckId) {
    return;
  }
  if (getFlashcardBookUseAnimation(normalizedSeriesId)) {
    return;
  }
  const isDeckSelectable = getFlashcardDecksInSeries(normalizedSeriesId).some((deck) => deck.id === normalizedDeckId);
  if (!isDeckSelectable) {
    return;
  }
  startFlashcardBookUseAnimation(normalizedSeriesId, normalizedDeckId);
}

async function initializeFlashcards() {
  clearAllFlashcardBookIntentTimers();
  flashcardBookDropTimerBySeries.forEach((timerId) => {
    clearTimeout(timerId);
  });
  flashcardBookDropTimerBySeries.clear();
  flashcardBookUseTimerBySeries.forEach((timerIds) => {
    if (Array.isArray(timerIds)) {
      timerIds.forEach((timerId) => clearTimeout(timerId));
    }
  });
  flashcardBookUseTimerBySeries.clear();
  flashcardBookUseAnimationBySeries.clear();
  flashcardBookActionQueueBySeries.clear();

  const remoteDecks = await loadRemoteFlashcardDecks();
  flashcardState = {
    ...createInitialFlashcardState(),
    decks: collectFlashcardDecks(remoteDecks),
  };
  clampFlashcardState();
}

function initializeFlashcardNoteBinder() {
  const binderList = elements.flashcardBinderList;
  if (!binderList || binderList.dataset.noteBinderReady === "1") {
    return;
  }
  binderList.dataset.noteBinderReady = "1";
  const deckProblemCountByLabel = createFlashcardDeckProblemCountByLabelMap();
  const deckByLabel = createFlashcardDeckByLabelMap();
  const binderElements = Array.from(binderList.querySelectorAll(".flashcard-binder"));
  const measuredBinderHeights = binderElements
    .map((binder) => Math.round(binder.getBoundingClientRect().height))
    .filter((height) => Number.isFinite(height) && height > 0);
  if (measuredBinderHeights.length > 0) {
    binderList.style.setProperty("--flashcard-binder-shelf-height", `${Math.max(...measuredBinderHeights)}px`);
  }
  binderList.classList.add("is-bookshelf");

  binderElements.forEach((binder, index) => {
    binder.dataset.flashcardBinderIndex = String(index);
    binder.setAttribute("role", "button");
    binder.setAttribute("aria-pressed", "false");
    binder.tabIndex = 0;

    let useButton = binder.querySelector(".flashcard-binder-use-btn");
    if (!useButton) {
      useButton = document.createElement("button");
      useButton.type = "button";
      useButton.className = "flashcard-binder-use-btn";
      useButton.dataset.flashcardUseBinder = "1";
      binder.append(useButton);
    }
    useButton.textContent = "このバインダーを使う";
    useButton.tabIndex = -1;
    useButton.setAttribute("aria-hidden", "true");

    let closeButton = binder.querySelector(".flashcard-binder-close-btn");
    if (!closeButton) {
      closeButton = document.createElement("button");
      closeButton.type = "button";
      closeButton.className = "flashcard-binder-close-btn";
      closeButton.dataset.flashcardCloseBinder = "1";
      binder.append(closeButton);
    }
    closeButton.textContent = "← バインダーをしまう";
    closeButton.tabIndex = -1;
    closeButton.setAttribute("aria-hidden", "true");
  });

  const noteLists = Array.from(binderList.querySelectorAll(".flashcard-note-list"));
  noteLists.forEach((noteList) => {
    const binder = noteList.closest(".flashcard-binder");
    const binderItem = binder?.closest(".flashcard-binder-item");
    const notes = Array.from(noteList.querySelectorAll(".flashcard-note"));
    const noteMetrics = notes.map((note) => {
      const problemCount = resolveFlashcardProblemCountForNote(note, deckProblemCountByLabel);
      const thicknessStepCount = Math.floor(
        Math.max(0, problemCount) / FLASHCARD_NOTE_QUESTIONS_PER_THICKNESS_STEP
      );
      const noteThickness =
        FLASHCARD_NOTE_BASE_THICKNESS_PX + thicknessStepCount * FLASHCARD_NOTE_THICKNESS_STEP_PX;
      return {
        deck: resolveFlashcardDeckForNote(note, deckByLabel),
        problemCount,
        thickness: noteThickness,
      };
    });
    let noteStackThickness = noteMetrics.reduce((total, metric, index) => {
      const gap = index < noteMetrics.length - 1 ? FLASHCARD_NOTE_SPINE_GAP_PX : 0;
      return total + metric.thickness + gap;
    }, 0);
    let spineOffsetFromRight = FLASHCARD_BINDER_SIDE_PADDING_PX;
    for (let index = notes.length - 1; index >= 0; index -= 1) {
      const note = notes[index];
      const metric = noteMetrics[index];
      note.style.setProperty("--note-stack-index", String(index));
      note.style.setProperty("--note-stack-count", String(notes.length));
      note.style.setProperty("--flashcard-note-thickness", `${metric.thickness}px`);
      note.style.setProperty("--flashcard-note-spine-offset", `${spineOffsetFromRight}px`);
      spineOffsetFromRight += metric.thickness + FLASHCARD_NOTE_SPINE_GAP_PX;
      note.dataset.flashcardProblemCount = String(metric.problemCount);
      if (metric.deck) {
        note.dataset.flashcardDeckId = metric.deck.id;
      } else {
        delete note.dataset.flashcardDeckId;
      }
      note.setAttribute("role", "button");
      note.setAttribute("aria-pressed", "false");
      note.setAttribute("aria-disabled", "true");
      note.tabIndex = -1;

      let takeButton = note.querySelector(".flashcard-note-take-btn");
      if (!takeButton) {
        takeButton = document.createElement("button");
        takeButton.type = "button";
        takeButton.className = "flashcard-note-take-btn";
        takeButton.dataset.flashcardTakeNote = "1";
        note.append(takeButton);
      }
      takeButton.textContent = "このノートを使う";
      takeButton.tabIndex = -1;
      takeButton.setAttribute("aria-hidden", "true");
    }
    if (notes.length === 0) {
      noteStackThickness = FLASHCARD_NOTE_BASE_THICKNESS_PX;
    }
    if (binder) {
      const binderThickness = noteStackThickness + FLASHCARD_BINDER_EXTRA_THICKNESS_PX;
      binder.style.setProperty("--flashcard-binder-thickness", `${binderThickness}px`);
      binder.dataset.flashcardBinderThickness = String(binderThickness);
      if (binderItem) {
        binderItem.style.setProperty("--flashcard-binder-thickness", `${binderThickness}px`);
      }
    }
  });

  binderList.addEventListener("click", handleFlashcardNoteBinderClick);
  binderList.addEventListener("keydown", handleFlashcardNoteBinderKeydown);
  binderList.addEventListener("pointerdown", handleFlashcardNoteBinderPointerDown);
  binderList.addEventListener("pointerup", handleFlashcardNoteBinderPointerUp);
  binderList.addEventListener("pointercancel", clearFlashcardNoteBinderPointerState);
  window.addEventListener("resize", () => updateFlashcardBinderTargetWidth());
}

function createFlashcardDeckProblemCountByLabelMap() {
  const map = new Map();
  if (!flashcardState || !Array.isArray(flashcardState.decks)) {
    return map;
  }
  flashcardState.decks.forEach((deck) => {
    const normalizedLabel = normalizeFlashcardText(deck?.label);
    if (!normalizedLabel) {
      return;
    }
    const totalCards = Number.isFinite(deck?.totalCards) ? Math.max(0, Math.round(deck.totalCards)) : 0;
    const lookupKeys = [normalizedLabel, toFlashcardLabelLookupKey(normalizedLabel)].filter(Boolean);
    lookupKeys.forEach((lookupKey) => {
      const previous = map.get(lookupKey);
      if (!Number.isFinite(previous) || totalCards > previous) {
        map.set(lookupKey, totalCards);
      }
    });
  });
  return map;
}

function createFlashcardDeckByLabelMap() {
  const map = new Map();
  if (!flashcardState || !Array.isArray(flashcardState.decks)) {
    return map;
  }
  flashcardState.decks.forEach((deck) => {
    const normalizedLabel = normalizeFlashcardText(deck?.label);
    if (!normalizedLabel) {
      return;
    }
    const lookupKeys = [normalizedLabel, toFlashcardLabelLookupKey(normalizedLabel)].filter(Boolean);
    lookupKeys.forEach((lookupKey) => {
      if (!map.has(lookupKey)) {
        map.set(lookupKey, deck);
      }
    });
  });
  return map;
}

function resolveFlashcardDeckForNote(note, deckByLabel = createFlashcardDeckByLabelMap()) {
  if (!(note instanceof Element) || !(deckByLabel instanceof Map)) {
    return null;
  }
  const deckId = normalizeFlashcardText(note.dataset.flashcardDeckId);
  if (deckId && Array.isArray(flashcardState?.decks)) {
    const deck = flashcardState.decks.find((item) => item.id === deckId);
    if (deck) {
      return deck;
    }
  }
  const noteLabelElement = note.querySelector(".flashcard-note-jp");
  const noteLabel = normalizeFlashcardText(noteLabelElement?.textContent);
  const noteLookupKeys = [noteLabel, toFlashcardLabelLookupKey(noteLabel)].filter(Boolean);
  for (const lookupKey of noteLookupKeys) {
    if (deckByLabel.has(lookupKey)) {
      return deckByLabel.get(lookupKey) ?? null;
    }
  }
  const ariaLabel = normalizeFlashcardText(note.getAttribute("aria-label"));
  const ariaLookupKeys = [ariaLabel, toFlashcardLabelLookupKey(ariaLabel)].filter(Boolean);
  for (const lookupKey of ariaLookupKeys) {
    if (deckByLabel.has(lookupKey)) {
      return deckByLabel.get(lookupKey) ?? null;
    }
  }
  return null;
}

function resolveFlashcardProblemCountForNote(note, deckProblemCountByLabel) {
  if (!(note instanceof Element) || !(deckProblemCountByLabel instanceof Map)) {
    return 0;
  }
  const noteLabelElement = note.querySelector(".flashcard-note-jp");
  const noteLabel = normalizeFlashcardText(noteLabelElement?.textContent);
  const noteLookupKeys = [noteLabel, toFlashcardLabelLookupKey(noteLabel)].filter(Boolean);
  for (const lookupKey of noteLookupKeys) {
    if (deckProblemCountByLabel.has(lookupKey)) {
      return deckProblemCountByLabel.get(lookupKey) ?? 0;
    }
  }
  const ariaLabel = normalizeFlashcardText(note.getAttribute("aria-label"));
  const ariaLookupKeys = [ariaLabel, toFlashcardLabelLookupKey(ariaLabel)].filter(Boolean);
  for (const lookupKey of ariaLookupKeys) {
    if (deckProblemCountByLabel.has(lookupKey)) {
      return deckProblemCountByLabel.get(lookupKey) ?? 0;
    }
  }
  return 0;
}

function toFlashcardLabelLookupKey(value) {
  const normalized = normalizeFlashcardText(value);
  if (!normalized) {
    return "";
  }
  return normalized
    .replace(/[\s\u3000]+/g, "")
    .replace(/[()（）［］\[\]{}｛｝・･・,，.．。:：\/／\-ー―～~]/g, "")
    .toLowerCase();
}

function handleFlashcardNoteBinderClick(event) {
  const binderList = elements.flashcardBinderList;
  if (!binderList) {
    return;
  }
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const readerAction = target.closest("[data-flashcard-note-reader-action]");
  if (readerAction && isInFlashcardBinderInteractionSurface(readerAction)) {
    handleFlashcardNoteReaderAction(readerAction);
    return;
  }

  const closeBinderButton = target.closest("[data-flashcard-close-binder]");
  if (closeBinderButton && isInFlashcardBinderInteractionSurface(closeBinderButton)) {
    closeFlashcardBinder();
    return;
  }

  const useBinderButton = target.closest("[data-flashcard-use-binder]");
  if (useBinderButton && isInFlashcardBinderInteractionSurface(useBinderButton)) {
    const binder = useBinderButton.closest(".flashcard-binder");
    if (binder && (binderList.contains(binder) || binder === activeFlashcardBinderElement)) {
      openFlashcardBinder(binder);
    }
    return;
  }

  const takeButton = target.closest("[data-flashcard-take-note]");
  if (takeButton && isInFlashcardBinderInteractionSurface(takeButton)) {
    const note = takeButton.closest(".flashcard-note");
    if (note && activeFlashcardBinderElement?.contains(note)) {
      openFlashcardNotebook(note);
    }
    return;
  }

  if (!isFlashcardBinderOpen(binderList)) {
    const binder = target.closest(".flashcard-binder");
    if (!binder || !binderList.contains(binder)) {
      return;
    }
    if (liftedFlashcardBinderElement === binder) {
      event.preventDefault();
      runWithPreservedViewportScroll(() => setLiftedFlashcardBinder(null));
      return;
    }
    event.preventDefault();
    runWithPreservedViewportScroll(() => setLiftedFlashcardBinder(binder));
    return;
  }

  if (!activeFlashcardBinderElement || !activeFlashcardBinderElement.contains(target)) {
    return;
  }
  if (activeFlashcardNotebookState) {
    return;
  }

  const note = target.closest(".flashcard-note");
  if (!note || !activeFlashcardBinderElement.contains(note)) {
    setLiftedFlashcardNote(null);
    return;
  }
  if (liftedFlashcardNoteElement === note) {
    setLiftedFlashcardNote(null);
    return;
  }
  setLiftedFlashcardNote(note);
}

function handleFlashcardNoteBinderKeydown(event) {
  const binderList = elements.flashcardBinderList;
  if (!binderList) {
    return;
  }
  if (event.key === "Escape") {
    if (activeFlashcardNotebookState) {
      closeFlashcardNotebook();
      event.preventDefault();
      return;
    }
    if (isFlashcardBinderOpen(binderList)) {
      closeFlashcardBinder();
      event.preventDefault();
    }
    return;
  }
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }
  if (
    target.closest(
      "[data-flashcard-take-note], [data-flashcard-use-binder], [data-flashcard-close-binder], [data-flashcard-note-reader-action]"
    )
  ) {
    return;
  }

  if (!isFlashcardBinderOpen(binderList)) {
    const binder = target.closest(".flashcard-binder");
    if (!binder || !binderList.contains(binder)) {
      return;
    }
    event.preventDefault();
    if (liftedFlashcardBinderElement === binder) {
      openFlashcardBinder(binder);
      return;
    }
    setLiftedFlashcardBinder(binder);
    return;
  }

  if (!activeFlashcardBinderElement || activeFlashcardNotebookState) {
    return;
  }
  const note = target.closest(".flashcard-note");
  if (!note || !activeFlashcardBinderElement.contains(note)) {
    return;
  }
  event.preventDefault();
  if (liftedFlashcardNoteElement === note) {
    openFlashcardNotebook(note);
    return;
  }
  setLiftedFlashcardNote(note);
}

function isFlashcardNoteBinderLocked(binderList) {
  return !isFlashcardBinderOpen(binderList);
}

function isFlashcardBinderOpen(binderList = elements.flashcardBinderList) {
  return Boolean(binderList?.classList.contains("is-binder-open") && activeFlashcardBinderElement);
}

function isInFlashcardBinderInteractionSurface(element) {
  if (!(element instanceof Element)) {
    return false;
  }
  return Boolean(
    elements.flashcardBinderList?.contains(element) ||
      activeFlashcardBinderElement?.contains(element) ||
      flashcardBinderStageElement?.contains(element)
  );
}

function runWithPreservedViewportScroll(callback) {
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  callback();
  window.requestAnimationFrame(() => {
    window.scrollTo(scrollX, scrollY);
  });
}

function handleFlashcardNoteBinderPointerDown(event) {
  const binderList = elements.flashcardBinderList;
  if (!binderList || event.pointerType === "mouse") {
    return;
  }
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }
  if (
    target.closest(
      "[data-flashcard-take-note], [data-flashcard-use-binder], [data-flashcard-close-binder], [data-flashcard-note-reader-action]"
    )
  ) {
    return;
  }
  const note = isFlashcardBinderOpen(binderList) ? target.closest(".flashcard-note") : null;
  const binder = target.closest(".flashcard-binder");
  if (!binder || (!binderList.contains(binder) && binder !== activeFlashcardBinderElement)) {
    return;
  }
  flashcardBinderPointerState = {
    binder,
    note,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
  };
}

function handleFlashcardNoteBinderPointerUp(event) {
  const pointerState = flashcardBinderPointerState;
  clearFlashcardNoteBinderPointerState();
  const binderList = elements.flashcardBinderList;
  if (!binderList || !pointerState || pointerState.pointerId !== event.pointerId) {
    return;
  }
  const deltaX = event.clientX - pointerState.startX;
  const deltaY = event.clientY - pointerState.startY;
  const isUpSwipe =
    deltaY <= FLASHCARD_BINDER_SWIPE_OPEN_THRESHOLD_PX * -1 && Math.abs(deltaY) > Math.abs(deltaX) * 1.12;
  if (!isUpSwipe) {
    return;
  }

  if (isFlashcardBinderOpen(binderList)) {
    const note = pointerState.note;
    if (!note || !activeFlashcardBinderElement?.contains(note) || activeFlashcardNotebookState) {
      return;
    }
    event.preventDefault();
    if (liftedFlashcardNoteElement === note) {
      openFlashcardNotebook(note);
      return;
    }
    setLiftedFlashcardNote(note);
    return;
  }

  const binder = pointerState.binder;
  if (!binderList.contains(binder)) {
    return;
  }
  event.preventDefault();
  if (liftedFlashcardBinderElement === binder) {
    openFlashcardBinder(binder);
    return;
  }
  runWithPreservedViewportScroll(() => setLiftedFlashcardBinder(binder));
}

function clearFlashcardNoteBinderPointerState() {
  flashcardBinderPointerState = null;
}

function ensureFlashcardBinderBackdrop() {
  if (flashcardBinderBackdropElement instanceof HTMLElement) {
    return flashcardBinderBackdropElement;
  }
  const backdrop = document.createElement("div");
  backdrop.id = "flashcardBinderBackdrop";
  backdrop.className = "flashcard-binder-backdrop";
  backdrop.setAttribute("aria-hidden", "true");
  document.body.append(backdrop);
  flashcardBinderBackdropElement = backdrop;
  return backdrop;
}

function ensureFlashcardBinderStage() {
  if (flashcardBinderStageElement instanceof HTMLElement) {
    return flashcardBinderStageElement;
  }
  const stage = document.createElement("div");
  stage.id = "flashcardBinderStage";
  stage.className = "flashcard-binder-stage flashcard-binder-list is-bookshelf is-binder-open";
  stage.setAttribute("aria-hidden", "true");
  stage.addEventListener("click", handleFlashcardNoteBinderClick);
  stage.addEventListener("keydown", handleFlashcardNoteBinderKeydown);
  stage.addEventListener("pointerdown", handleFlashcardNoteBinderPointerDown);
  stage.addEventListener("pointerup", handleFlashcardNoteBinderPointerUp);
  stage.addEventListener("pointercancel", clearFlashcardNoteBinderPointerState);
  document.body.append(stage);
  flashcardBinderStageElement = stage;
  return stage;
}

function mountFlashcardBinderStage(binder, binderList) {
  if (!(binder instanceof Element) || !binderList) {
    return;
  }
  const stage = ensureFlashcardBinderStage();
  if (!flashcardBinderPortalState || flashcardBinderPortalState.binder !== binder) {
    const closeButton = binder.querySelector(".flashcard-binder-close-btn");
    flashcardBinderPortalState = {
      binder,
      parent: binder.parentNode,
      nextSibling: binder.nextSibling,
      closeButton,
      closeButtonParent: closeButton?.parentNode ?? null,
      closeButtonNextSibling: closeButton?.nextSibling ?? null,
    };
  }
  updateFlashcardBinderTargetWidth(binder);
  stage.classList.toggle("is-note-open", binderList.classList.contains("is-note-open"));
  stage.setAttribute("aria-hidden", "false");
  binder.classList.add("is-stage-binder");
  stage.append(binder);
  if (flashcardBinderPortalState.closeButton instanceof HTMLElement) {
    stage.append(flashcardBinderPortalState.closeButton);
  }
}

function restoreFlashcardBinderStage() {
  const portalState = flashcardBinderPortalState;
  const stage = flashcardBinderStageElement;
  if (!portalState?.binder) {
    if (stage) {
      stage.setAttribute("aria-hidden", "true");
      stage.classList.remove("is-note-open");
    }
    return;
  }
  const { binder, parent, nextSibling, closeButton, closeButtonParent, closeButtonNextSibling } = portalState;
  if (closeButton instanceof HTMLElement && closeButtonParent && closeButton.parentNode !== closeButtonParent) {
    if (closeButtonNextSibling && closeButtonNextSibling.parentNode === closeButtonParent) {
      closeButtonParent.insertBefore(closeButton, closeButtonNextSibling);
    } else {
      closeButtonParent.append(closeButton);
    }
  }
  binder.classList.remove("is-stage-binder");
  if (parent && binder.parentNode !== parent) {
    if (nextSibling && nextSibling.parentNode === parent) {
      parent.insertBefore(binder, nextSibling);
    } else {
      parent.append(binder);
    }
  }
  if (stage) {
    stage.setAttribute("aria-hidden", "true");
    stage.classList.remove("is-note-open");
  }
  flashcardBinderPortalState = null;
}

function setFlashcardBinderStageNoteOpen(shouldOpen) {
  flashcardBinderStageElement?.classList.toggle("is-note-open", Boolean(shouldOpen));
}

function getFlashcardBinderTargetNoteWidth() {
  const targetRect = elements.mypageFlashcardPanel?.getBoundingClientRect();
  const viewportWidth = Math.max(0, document.documentElement.clientWidth || window.innerWidth || 0);
  const measuredWidth = Number.isFinite(targetRect?.width) && targetRect.width > 0 ? targetRect.width : 0;
  const fallbackWidth = Math.min(560, Math.max(178, viewportWidth - 32));
  return Math.max(178, Math.round(measuredWidth || fallbackWidth));
}

function updateFlashcardBinderTargetWidth(binder = activeFlashcardBinderElement) {
  if (!(binder instanceof HTMLElement)) {
    return;
  }
  binder.style.setProperty("--flashcard-note-cover-width", `${getFlashcardBinderTargetNoteWidth()}px`);
}

function setLiftedFlashcardBinder(nextBinder) {
  elements.flashcardBinderList?.classList.toggle("has-lifted-binder", Boolean(nextBinder));
  if (liftedFlashcardBinderElement && liftedFlashcardBinderElement !== nextBinder) {
    liftedFlashcardBinderElement.classList.remove("is-lifted");
    liftedFlashcardBinderElement.setAttribute("aria-pressed", "false");
    const previousButton = liftedFlashcardBinderElement.querySelector(".flashcard-binder-use-btn");
    if (previousButton) {
      previousButton.tabIndex = -1;
      previousButton.setAttribute("aria-hidden", "true");
    }
  }

  if (!nextBinder) {
    if (liftedFlashcardBinderElement) {
      const activeButton = liftedFlashcardBinderElement.querySelector(".flashcard-binder-use-btn");
      liftedFlashcardBinderElement.classList.remove("is-lifted");
      liftedFlashcardBinderElement.setAttribute("aria-pressed", "false");
      if (activeButton) {
        activeButton.tabIndex = -1;
        activeButton.setAttribute("aria-hidden", "true");
      }
    }
    liftedFlashcardBinderElement = null;
    return;
  }

  nextBinder.classList.add("is-lifted");
  nextBinder.setAttribute("aria-pressed", "true");
  const useButton = nextBinder.querySelector(".flashcard-binder-use-btn");
  if (useButton) {
    useButton.tabIndex = 0;
    useButton.setAttribute("aria-hidden", "false");
  }
  liftedFlashcardBinderElement = nextBinder;
}

function setFlashcardBinderFocusMode(shouldLock) {
  const shouldFocus = Boolean(shouldLock);
  if (shouldFocus) {
    ensureFlashcardBinderBackdrop();
  }
  document.body.classList.toggle("flashcard-binder-global-focus", shouldFocus);
  document.body.classList.toggle("flashcard-book-scroll-lock", shouldFocus);
  document.documentElement.classList.toggle("flashcard-book-scroll-lock", shouldFocus);
}

function openFlashcardBinder(binder) {
  const binderList = elements.flashcardBinderList;
  if (!binderList || !(binder instanceof Element) || !binderList.contains(binder)) {
    return;
  }

  closeFlashcardNotebook({ preserveBinder: true });
  setLiftedFlashcardBinder(binder);
  activeFlashcardBinderElement = binder;
  binderList.classList.add("is-binder-open");
  binderList.classList.remove("is-note-open");
  binder.classList.add("is-opening-binder");
  window.setTimeout(() => {
    binder.classList.remove("is-opening-binder");
  }, 620);
  setFlashcardBinderFocusMode(true);

  Array.from(binderList.querySelectorAll(".flashcard-binder")).forEach((item) => {
    const isActive = item === binder;
    item.closest(".flashcard-binder-item")?.classList.toggle("is-active-binder-item", isActive);
    item.classList.toggle("is-active-binder", isActive);
    item.setAttribute("aria-pressed", String(isActive));
    item.tabIndex = isActive ? 0 : -1;
    const useButton = item.querySelector(".flashcard-binder-use-btn");
    if (useButton) {
      useButton.tabIndex = -1;
      useButton.setAttribute("aria-hidden", "true");
    }
    const closeButton = item.querySelector(".flashcard-binder-close-btn");
    if (closeButton) {
      closeButton.tabIndex = isActive ? 0 : -1;
      closeButton.setAttribute("aria-hidden", String(!isActive));
    }
    const notes = Array.from(item.querySelectorAll(".flashcard-note"));
    notes.forEach((note) => {
      note.setAttribute("aria-disabled", String(!isActive));
      note.tabIndex = isActive ? 0 : -1;
    });
  });

  mountFlashcardBinderStage(binder, binderList);
}

function closeFlashcardBinder() {
  const binderList = elements.flashcardBinderList;
  if (!binderList) {
    return;
  }

  closeFlashcardNotebook({ preserveBinder: true });
  restoreFlashcardBinderStage();
  binderList.classList.remove("is-binder-open", "is-note-open");
  Array.from(binderList.querySelectorAll(".flashcard-binder")).forEach((binder) => {
    binder.closest(".flashcard-binder-item")?.classList.remove("is-active-binder-item");
    binder.classList.remove("is-active-binder", "is-lifted", "is-opening-binder");
    binder.setAttribute("aria-pressed", "false");
    binder.tabIndex = 0;
    const useButton = binder.querySelector(".flashcard-binder-use-btn");
    if (useButton) {
      useButton.tabIndex = -1;
      useButton.setAttribute("aria-hidden", "true");
    }
    const closeButton = binder.querySelector(".flashcard-binder-close-btn");
    if (closeButton) {
      closeButton.tabIndex = -1;
      closeButton.setAttribute("aria-hidden", "true");
    }
    Array.from(binder.querySelectorAll(".flashcard-note")).forEach((note) => {
      note.classList.remove("is-lifted", "is-opened-note");
      note.setAttribute("aria-pressed", "false");
      note.setAttribute("aria-disabled", "true");
      note.tabIndex = -1;
      const takeButton = note.querySelector(".flashcard-note-take-btn");
      if (takeButton) {
        takeButton.tabIndex = -1;
        takeButton.setAttribute("aria-hidden", "true");
      }
    });
  });
  activeFlashcardBinderElement = null;
  liftedFlashcardBinderElement = null;
  liftedFlashcardNoteElement = null;
  setFlashcardBinderFocusMode(false);
}

function setLiftedFlashcardNote(nextNote) {
  if (liftedFlashcardNoteElement && liftedFlashcardNoteElement !== nextNote) {
    liftedFlashcardNoteElement.classList.remove("is-lifted");
    liftedFlashcardNoteElement.setAttribute("aria-pressed", "false");
    const previousButton = liftedFlashcardNoteElement.querySelector(".flashcard-note-take-btn");
    if (previousButton) {
      previousButton.tabIndex = -1;
      previousButton.setAttribute("aria-hidden", "true");
    }
  }

  if (!nextNote) {
    if (liftedFlashcardNoteElement) {
      const activeButton = liftedFlashcardNoteElement.querySelector(".flashcard-note-take-btn");
      liftedFlashcardNoteElement.classList.remove("is-lifted");
      liftedFlashcardNoteElement.setAttribute("aria-pressed", "false");
      if (activeButton) {
        activeButton.tabIndex = -1;
        activeButton.setAttribute("aria-hidden", "true");
      }
    }
    liftedFlashcardNoteElement = null;
    return;
  }

  if (activeFlashcardBinderElement && !activeFlashcardBinderElement.contains(nextNote)) {
    return;
  }
  nextNote.classList.add("is-lifted");
  nextNote.setAttribute("aria-pressed", "true");
  const takeButton = nextNote.querySelector(".flashcard-note-take-btn");
  if (takeButton) {
    takeButton.tabIndex = 0;
    takeButton.setAttribute("aria-hidden", "false");
  }
  liftedFlashcardNoteElement = nextNote;
}

function openFlashcardNotebook(note) {
  const binderList = elements.flashcardBinderList;
  if (
    !binderList ||
    !(note instanceof Element) ||
    !activeFlashcardBinderElement ||
    !activeFlashcardBinderElement.contains(note)
  ) {
    return;
  }

  setLiftedFlashcardNote(note);
  const activeNoteAccent = getComputedStyle(note).getPropertyValue("--note-accent").trim();
  if (activeNoteAccent) {
    activeFlashcardBinderElement.style.setProperty("--active-note-accent", activeNoteAccent);
  }
  Array.from(activeFlashcardBinderElement.querySelectorAll(".flashcard-note")).forEach((item) => {
    item.classList.toggle("is-opened-note", item === note);
  });
  activeFlashcardNotebookState = {
    note,
    pageIndex: 0,
    leftVisible: false,
    pageTurnDirection: "",
  };
  activeFlashcardBinderElement.classList.add("is-opening-note");
  window.setTimeout(() => {
    activeFlashcardBinderElement?.classList.remove("is-opening-note");
  }, 760);
  binderList.classList.add("is-note-open");
  setFlashcardBinderStageNoteOpen(true);
  renderFlashcardNotebook();
}

function closeFlashcardNotebook(options = {}) {
  const binderList = elements.flashcardBinderList;
  const shouldPreserveBinder = Boolean(options.preserveBinder);
  const activeBinder = activeFlashcardBinderElement;

  if (activeBinder) {
    Array.from(activeBinder.querySelectorAll(".flashcard-note-reader")).forEach((reader) => reader.remove());
    Array.from(activeBinder.querySelectorAll(".flashcard-note")).forEach((note) => {
      note.classList.remove("is-opened-note");
    });
  } else if (binderList) {
    Array.from(binderList.querySelectorAll(".flashcard-note-reader")).forEach((reader) => reader.remove());
  }
  flashcardBinderStageElement?.querySelectorAll(".flashcard-note-reader-close-btn").forEach((button) => button.remove());

  if (binderList) {
    binderList.classList.remove("is-note-open");
  }
  setFlashcardBinderStageNoteOpen(false);
  activeFlashcardNotebookState = null;
  setLiftedFlashcardNote(null);

  if (!shouldPreserveBinder && binderList && !isFlashcardBinderOpen(binderList)) {
    setFlashcardBinderFocusMode(false);
  }
}

function handleFlashcardNoteReaderAction(actionButton) {
  if (!(actionButton instanceof Element) || !activeFlashcardNotebookState) {
    return;
  }
  const action = normalizeFlashcardText(actionButton.dataset.flashcardNoteReaderAction);
  if (action === "close") {
    closeFlashcardNotebook({ preserveBinder: true });
    return;
  }

  const spreads = buildFlashcardNotebookSpreads(activeFlashcardNotebookState.note);
  const maxPageIndex = Math.max(0, spreads.length - 1);
  if (action === "prev") {
    activeFlashcardNotebookState.pageIndex = Math.max(0, activeFlashcardNotebookState.pageIndex - 1);
    activeFlashcardNotebookState.leftVisible = false;
    activeFlashcardNotebookState.pageTurnDirection = "prev";
    renderFlashcardNotebook();
    return;
  }
  if (action === "next") {
    activeFlashcardNotebookState.pageIndex = Math.min(maxPageIndex, activeFlashcardNotebookState.pageIndex + 1);
    activeFlashcardNotebookState.leftVisible = false;
    activeFlashcardNotebookState.pageTurnDirection = "next";
    renderFlashcardNotebook();
    return;
  }
  if (action === "toggle-left") {
    activeFlashcardNotebookState.leftVisible = !activeFlashcardNotebookState.leftVisible;
    renderFlashcardNotebook();
  }
}

function renderFlashcardNotebook() {
  if (!activeFlashcardNotebookState || !activeFlashcardBinderElement) {
    return;
  }

  Array.from(activeFlashcardBinderElement.querySelectorAll(".flashcard-note-reader")).forEach((reader) => reader.remove());
  flashcardBinderStageElement?.querySelectorAll(".flashcard-note-reader-close-btn").forEach((button) => button.remove());

  const spreads = buildFlashcardNotebookSpreads(activeFlashcardNotebookState.note);
  const maxPageIndex = Math.max(0, spreads.length - 1);
  activeFlashcardNotebookState.pageIndex = Math.max(
    0,
    Math.min(maxPageIndex, activeFlashcardNotebookState.pageIndex)
  );
  const spread = spreads[activeFlashcardNotebookState.pageIndex] ?? createBlankFlashcardNotebookSpread();
  const hasLeftContent = hasFlashcardNotebookPageContent(spread.left);
  if (!hasLeftContent) {
    activeFlashcardNotebookState.leftVisible = false;
  }
  const pageTurnDirection = normalizeFlashcardText(activeFlashcardNotebookState.pageTurnDirection);
  activeFlashcardNotebookState.pageTurnDirection = "";

  const reader = document.createElement("section");
  reader.className = "flashcard-note-reader";
  reader.classList.toggle("is-left-visible", Boolean(activeFlashcardNotebookState.leftVisible && hasLeftContent));
  if (pageTurnDirection === "next" || pageTurnDirection === "prev") {
    reader.classList.add(`is-turning-${pageTurnDirection}`);
  }
  reader.setAttribute("aria-label", `${getFlashcardNoteJapaneseLabel(activeFlashcardNotebookState.note)}のノート`);

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "flashcard-note-reader-close-btn";
  closeButton.dataset.flashcardNoteReaderAction = "close";
  closeButton.textContent = "← ノートを閉じる";
  (flashcardBinderStageElement ?? reader).append(closeButton);

  if (hasLeftContent) {
    const leftToggleButton = document.createElement("button");
    leftToggleButton.type = "button";
    leftToggleButton.className = "flashcard-note-left-toggle-btn";
    leftToggleButton.dataset.flashcardNoteReaderAction = "toggle-left";
    leftToggleButton.textContent = activeFlashcardNotebookState.leftVisible
      ? "右ページに戻る"
      : spread.left.toggleLabel || "事前知識を見る";
    leftToggleButton.setAttribute("aria-pressed", String(activeFlashcardNotebookState.leftVisible));
    reader.append(leftToggleButton);
  }

  const pageWrap = document.createElement("div");
  pageWrap.className = "flashcard-note-reader-pages";
  pageWrap.append(
    createFlashcardNotebookPageElement(spread.left, "left"),
    createFlashcardNotebookPageElement(spread.right, "right")
  );
  if (pageTurnDirection === "next" || pageTurnDirection === "prev") {
    const turnSheet = document.createElement("span");
    turnSheet.className = "flashcard-note-page-turn-sheet";
    turnSheet.setAttribute("aria-hidden", "true");
    pageWrap.append(turnSheet);
  }
  reader.append(pageWrap);

  const controls = document.createElement("div");
  controls.className = "flashcard-note-reader-controls";

  const prevButton = document.createElement("button");
  prevButton.type = "button";
  prevButton.className = "flashcard-note-reader-nav-btn";
  prevButton.dataset.flashcardNoteReaderAction = "prev";
  prevButton.textContent = "前へ";
  prevButton.disabled = activeFlashcardNotebookState.pageIndex <= 0;

  const pageCounter = document.createElement("span");
  pageCounter.className = "flashcard-note-reader-page-count";
  pageCounter.textContent = `${activeFlashcardNotebookState.pageIndex + 1} / ${spreads.length}`;

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.className = "flashcard-note-reader-nav-btn";
  nextButton.dataset.flashcardNoteReaderAction = "next";
  nextButton.textContent = "次へ";
  nextButton.disabled = activeFlashcardNotebookState.pageIndex >= maxPageIndex;

  controls.append(prevButton, pageCounter, nextButton);
  reader.append(controls);
  activeFlashcardBinderElement.append(reader);
}

function buildFlashcardNotebookSpreads(note) {
  const deck = resolveFlashcardDeckForNote(note);
  const noteLabel = getFlashcardNoteJapaneseLabel(note);
  const englishLabel = getFlashcardNoteEnglishLabel(note);
  const fallbackProblemCount = Number.parseInt(note?.dataset?.flashcardProblemCount ?? "0", 10);
  const totalCards = deck?.totalCards ?? (Number.isFinite(fallbackProblemCount) ? fallbackProblemCount : 0);
  const unitItems = deck?.units?.length
    ? deck.units.map((unit, index) => `${index + 1}. ${unit.label}（${unit.cards.length}問）`)
    : ["このノートの問題データは準備中です。"];

  const spreads = [
    {
      left: createBlankFlashcardNotebookPage(),
      right: {
        kind: "toc",
        kicker: "目次",
        title: noteLabel,
        subtitle: englishLabel,
        items: unitItems,
      },
    },
  ];

  const cardEntries = deck?.units?.flatMap((unit) =>
    unit.cards.map((card) => ({
      unit,
      card,
    }))
  ) ?? [];

  cardEntries.forEach((entry, index) => {
    const cardNumber = index + 1;
    spreads.push({
      left: entry.card.preKnowledge
        ? {
            kind: "knowledge",
            kicker: "事前知識",
            title: `事前知識 ${cardNumber}`,
            body: entry.card.preKnowledge,
            toggleLabel: "事前知識を見る",
          }
        : createBlankFlashcardNotebookPage(),
      right: {
        kind: "problem",
        kicker: entry.unit.label,
        title: `問題 ${cardNumber}`,
        body: entry.card.prompt,
        imageSrc: entry.card.imageSrc,
        imageAlt: entry.card.imageAlt,
      },
    });
    spreads.push({
      left: entry.card.hint
        ? {
            kind: "explanation",
            kicker: "解説",
            title: `解説 ${cardNumber}`,
            body: entry.card.hint,
            toggleLabel: "解説を見る",
          }
        : createBlankFlashcardNotebookPage(),
      right: {
        kind: "answer",
        kicker: entry.unit.label,
        title: `答え ${cardNumber}`,
        answers: entry.card.answers,
      },
    });
  });

  return spreads;
}

function createBlankFlashcardNotebookSpread() {
  return {
    left: createBlankFlashcardNotebookPage(),
    right: createBlankFlashcardNotebookPage(),
  };
}

function createBlankFlashcardNotebookPage() {
  return {
    blank: true,
  };
}

function createFlashcardNotebookPageElement(page, side) {
  const pageElement = document.createElement("article");
  pageElement.className = `flashcard-note-paper flashcard-note-paper-${side}`;
  if (!page || page.blank) {
    pageElement.classList.add("is-blank");
    pageElement.setAttribute("aria-hidden", "true");
    return pageElement;
  }
  if (page.kind) {
    pageElement.classList.add(`is-${page.kind}`);
  }

  if (page.kicker) {
    const kicker = document.createElement("p");
    kicker.className = "flashcard-note-paper-kicker";
    kicker.textContent = page.kicker;
    pageElement.append(kicker);
  }
  if (page.title) {
    const title = document.createElement("h3");
    title.className = "flashcard-note-paper-title";
    title.textContent = page.title;
    pageElement.append(title);
  }
  if (page.subtitle) {
    const subtitle = document.createElement("p");
    subtitle.className = "flashcard-note-paper-subtitle";
    subtitle.textContent = page.subtitle;
    pageElement.append(subtitle);
  }
  if (page.body) {
    const body = document.createElement("p");
    body.className = "flashcard-note-paper-body";
    body.textContent = page.body;
    pageElement.append(body);
  }
  if (page.imageSrc) {
    const image = document.createElement("img");
    image.className = "flashcard-note-paper-image";
    image.src = page.imageSrc;
    image.alt = page.imageAlt || "";
    pageElement.append(image);
  }
  if (Array.isArray(page.items) && page.items.length > 0) {
    const list = document.createElement("ol");
    list.className = "flashcard-note-paper-list";
    page.items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      list.append(listItem);
    });
    pageElement.append(list);
  }
  if (Array.isArray(page.answers) && page.answers.length > 0) {
    const list = document.createElement("ul");
    list.className = "flashcard-note-paper-answer-list";
    page.answers.forEach((answer) => {
      const listItem = document.createElement("li");
      listItem.textContent = answer;
      list.append(listItem);
    });
    pageElement.append(list);
  }

  return pageElement;
}

function hasFlashcardNotebookPageContent(page) {
  if (!page || page.blank) {
    return false;
  }
  return Boolean(
    page.kicker ||
      page.title ||
      page.subtitle ||
      page.body ||
      page.imageSrc ||
      (Array.isArray(page.items) && page.items.length > 0) ||
      (Array.isArray(page.answers) && page.answers.length > 0)
  );
}

function getFlashcardNoteJapaneseLabel(note) {
  return normalizeFlashcardText(note?.querySelector?.(".flashcard-note-jp")?.textContent) || "ノート";
}

function getFlashcardNoteEnglishLabel(note) {
  return normalizeFlashcardText(note?.querySelector?.(".flashcard-note-en")?.textContent);
}

async function loadRemoteFlashcardDecks() {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => {
    controller.abort();
  }, FLASHCARD_QUESTIONS_FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(FLASHCARD_QUESTIONS_API_URL, {
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`Questions API returned ${response.status}`);
    }
    const payload = await response.json();
    return normalizeRemoteFlashcardDecks(payload);
  } catch (error) {
    console.warn("Failed to load remote questions:", error);
    return [];
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function normalizeRemoteFlashcardDecks(payload) {
  const questions = getRemoteFlashcardQuestionArray(payload);
  if (questions) {
    return normalizeRemoteFlashcardQuestionArray(questions);
  }

  if (isFlashcardDatasetObject(payload)) {
    const source = createRemoteFlashcardSource(FLASHCARD_REMOTE_DEFAULT_DECK_ID, {});
    const deck = normalizeFlashcardDeck(source, payload);
    return deck ? [deck] : [];
  }

  return [];
}

function getRemoteFlashcardQuestionArray(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (!payload || typeof payload !== "object") {
    return null;
  }
  if (Array.isArray(payload.questions)) {
    return payload.questions;
  }
  if (Array.isArray(payload.data)) {
    return payload.data;
  }
  if (Array.isArray(payload.items)) {
    return payload.items;
  }
  return null;
}

function normalizeRemoteFlashcardQuestionArray(questions) {
  const datasetByDeckId = new Map();
  const sourceByDeckId = new Map();

  questions.forEach((question) => {
    if (!question || typeof question !== "object") {
      return;
    }
    const deckId = resolveRemoteFlashcardDeckId(question);
    const card = normalizeRemoteFlashcardQuestion(question);
    if (!deckId || !card) {
      return;
    }
    if (!datasetByDeckId.has(deckId)) {
      datasetByDeckId.set(deckId, {});
      sourceByDeckId.set(deckId, createRemoteFlashcardSource(deckId, question));
    }
    const dataset = datasetByDeckId.get(deckId);
    const unitName = resolveRemoteFlashcardUnitName(question);
    if (!Array.isArray(dataset[unitName])) {
      dataset[unitName] = [];
    }
    dataset[unitName].push(card);
  });

  return Array.from(datasetByDeckId.entries())
    .map(([deckId, dataset]) => normalizeFlashcardDeck(sourceByDeckId.get(deckId), dataset))
    .filter(Boolean);
}

function resolveRemoteFlashcardDeckId(question) {
  const rawSubject = normalizeFlashcardText(
    question.deckId ?? question.subjectId ?? question.subject ?? question.deck ?? question.bookId ?? question.binder
  );
  if (!rawSubject) {
    return FLASHCARD_REMOTE_DEFAULT_DECK_ID;
  }

  const lowerSubject = rawSubject.toLowerCase();
  const hyphenSubject = lowerSubject.replace(/\s+/g, "-");
  const alias = FLASHCARD_REMOTE_SUBJECT_ALIASES[lowerSubject] ?? FLASHCARD_REMOTE_SUBJECT_ALIASES[hyphenSubject];
  if (alias) {
    return alias;
  }
  if (getFlashcardSubjectCatalogEntry(rawSubject)) {
    return rawSubject;
  }
  const catalogEntry = getFlashcardSubjectCatalogEntryByLabel(rawSubject);
  if (catalogEntry) {
    return catalogEntry.id;
  }
  return createRemoteFlashcardDeckId(rawSubject) || FLASHCARD_REMOTE_DEFAULT_DECK_ID;
}

function createRemoteFlashcardDeckId(value) {
  return normalizeFlashcardText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createRemoteFlashcardSource(deckId, question) {
  const catalogEntry = getFlashcardSubjectCatalogEntry(deckId);
  const rawLabel = normalizeFlashcardText(
    question.subjectLabel ?? question.subjectName ?? question.deckLabel ?? question.bookLabel ?? question.subject
  );
  return {
    id: deckId,
    label: catalogEntry?.label || rawLabel || deckId,
    seriesId: catalogEntry?.seriesId || normalizeFlashcardText(question.seriesId) || FLASHCARD_DEFAULT_SERIES.id,
    seriesLabel:
      catalogEntry?.seriesLabel || normalizeFlashcardText(question.seriesLabel) || FLASHCARD_DEFAULT_SERIES.label,
  };
}

function resolveRemoteFlashcardUnitName(question) {
  return (
    normalizeFlashcardText(
      question.unit ?? question.unitName ?? question.lesson ?? question.chapter ?? question.section ?? question.category
    ) || FLASHCARD_REMOTE_DEFAULT_UNIT
  );
}

function normalizeRemoteFlashcardQuestion(question) {
  const prompt = buildRemoteFlashcardPrompt(question);
  if (!prompt) {
    return null;
  }

  const answers = normalizeRemoteFlashcardAnswers(question);
  return {
    ...question,
    q: prompt,
    a: answers.length > 0 ? answers : question.a,
    h: question.h ?? question.hint ?? question.note ?? question.explanation,
    i: question.i ?? question.image ?? question.img ?? question.imageSrc ?? question.imageUrl,
    iAlt: question.iAlt ?? question.imageAlt ?? question.alt,
  };
}

function buildRemoteFlashcardPrompt(question) {
  const basePrompt = normalizeFlashcardText(
    question.q ?? question.question ?? question.prompt ?? question.contentText ?? stripFlashcardHtml(question.contentHtml)
  );
  const choices = Array.isArray(question.choices)
    ? question.choices.map((choice) => normalizeFlashcardText(choice)).filter(Boolean)
    : [];
  if (choices.length === 0) {
    return basePrompt;
  }
  const choiceText = choices.map((choice, index) => `${index + 1}. ${choice}`).join("\n");
  if (!basePrompt) {
    return choiceText;
  }
  return `${basePrompt}\n${choiceText}`;
}

function stripFlashcardHtml(value) {
  if (typeof value !== "string") {
    return "";
  }
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeRemoteFlashcardAnswers(question) {
  const answers = [];
  const pushAnswer = (value) => {
    if (Array.isArray(value)) {
      value.forEach(pushAnswer);
      return;
    }
    if (value == null) {
      return;
    }
    if (typeof value === "number" && Array.isArray(question.choices)) {
      pushAnswer(question.choices[value]);
      return;
    }
    const text = normalizeFlashcardText(value);
    if (text) {
      answers.push(text);
    }
  };

  pushAnswer(question.correctAnswers);
  pushAnswer(question.correctAnswer);
  pushAnswer(question.answers);
  pushAnswer(question.a);
  if (answers.length === 0) {
    pushAnswer(question.answer);
    pushAnswer(question.answerIndex);
    pushAnswer(question.correctChoiceIndex);
  }

  return Array.from(new Set(answers));
}

function isFlashcardDatasetObject(value) {
  return Boolean(
    value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      Object.values(value).some((cards) => Array.isArray(cards))
  );
}

function collectFlashcardDecks(remoteDecks = []) {
  const safeRemoteDecks = Array.isArray(remoteDecks) ? remoteDecks.filter(Boolean) : [];
  const remoteDeckIds = new Set(safeRemoteDecks.map((deck) => deck.id).filter(Boolean));
  const localDecks = FLASHCARD_DATASET_SOURCES.map((source) => normalizeFlashcardDeck(source, source.resolve()))
    .filter(Boolean)
    .filter((deck) => !remoteDeckIds.has(deck.id));
  return safeRemoteDecks.concat(localDecks);
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
  const prompt = normalizeFlashcardText(rawCard.q ?? rawCard.question ?? rawCard.prompt ?? rawCard.contentText);
  if (!prompt) {
    return null;
  }

  const answers = normalizeFlashcardAnswers(rawCard);
  return {
    id: `${sourceId}-u${unitIndex + 1}-c${cardIndex + 1}`,
    prompt,
    imageSrc: resolveFlashcardImageSrc(
      rawCard.i ?? rawCard.image ?? rawCard.img ?? rawCard.imageSrc ?? rawCard.imageUrl
    ),
    imageAlt: normalizeFlashcardText(rawCard.iAlt ?? rawCard.imageAlt ?? rawCard.alt),
    preKnowledge: normalizeFlashcardText(
      rawCard.preKnowledge ?? rawCard.pre ?? rawCard.before ?? rawCard.knowledge ?? rawCard.k
    ),
    hint: normalizeFlashcardText(rawCard.h ?? rawCard.hint ?? rawCard.note ?? rawCard.explanation),
    answers,
  };
}

function normalizeFlashcardAnswers(rawCard) {
  let sourceAnswers = [];
  if (Array.isArray(rawCard.a)) {
    sourceAnswers = rawCard.a;
  } else if (Array.isArray(rawCard.answers)) {
    sourceAnswers = rawCard.answers;
  } else if (Array.isArray(rawCard.correctAnswers)) {
    sourceAnswers = rawCard.correctAnswers;
  } else if (rawCard.a != null) {
    sourceAnswers = [rawCard.a];
  } else if (rawCard.correctAnswer != null) {
    sourceAnswers = [rawCard.correctAnswer];
  } else if (rawCard.answer != null) {
    sourceAnswers =
      typeof rawCard.answer === "number" && Array.isArray(rawCard.choices)
        ? [rawCard.choices[rawCard.answer]]
        : [rawCard.answer];
  } else if (rawCard.answerIndex != null && Array.isArray(rawCard.choices)) {
    sourceAnswers = [rawCard.choices[rawCard.answerIndex]];
  } else if (rawCard.correctChoiceIndex != null && Array.isArray(rawCard.choices)) {
    sourceAnswers = [rawCard.choices[rawCard.correctChoiceIndex]];
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

function mergeFlashcardDatasets(...datasets) {
  const merged = {};
  let fallbackUnitCounter = 1;

  datasets.forEach((dataset) => {
    if (!dataset || typeof dataset !== "object" || Array.isArray(dataset)) {
      return;
    }
    Object.entries(dataset).forEach(([unitName, cards]) => {
      if (!Array.isArray(cards) || cards.length === 0) {
        return;
      }
      const normalizedUnitName = normalizeFlashcardText(unitName);
      const resolvedUnitName = normalizedUnitName || `章${fallbackUnitCounter++}`;
      if (!Array.isArray(merged[resolvedUnitName])) {
        merged[resolvedUnitName] = [];
      }
      merged[resolvedUnitName].push(...cards);
    });
  });

  return Object.keys(merged).length > 0 ? merged : null;
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
  return FLASHCARD_SERIES_CATALOG.map((series) => ({
    id: normalizeFlashcardText(series.id),
    label: normalizeFlashcardText(series.label),
  })).filter((series) => series.id && series.label);
}

function getFlashcardSubjectCatalogEntry(subjectId) {
  const normalizedSubjectId = normalizeFlashcardText(subjectId);
  if (!normalizedSubjectId) {
    return null;
  }

  for (const series of FLASHCARD_SERIES_CATALOG) {
    const seriesId = normalizeFlashcardText(series.id);
    const seriesLabel = normalizeFlashcardText(series.label);
    const subject = (series.subjects || []).find((item) => normalizeFlashcardText(item.id) === normalizedSubjectId);
    if (subject) {
      return {
        id: normalizedSubjectId,
        label: normalizeFlashcardText(subject.label),
        seriesId,
        seriesLabel,
      };
    }
  }

  return null;
}

function getFlashcardSubjectCatalogEntryByLabel(label) {
  const normalizedLabel = normalizeFlashcardText(label);
  if (!normalizedLabel) {
    return null;
  }

  for (const series of FLASHCARD_SERIES_CATALOG) {
    const subject = (series.subjects || []).find((item) => normalizeFlashcardText(item.label) === normalizedLabel);
    if (subject) {
      return getFlashcardSubjectCatalogEntry(subject.id);
    }
  }

  return null;
}

function getFlashcardSubjectsInSeries(seriesId) {
  const normalizedSeriesId = normalizeFlashcardText(seriesId);
  if (!normalizedSeriesId) {
    return [];
  }
  const series = FLASHCARD_SERIES_CATALOG.find((item) => normalizeFlashcardText(item.id) === normalizedSeriesId);
  const catalogSubjects =
    series && Array.isArray(series.subjects)
      ? series.subjects.map((subject) => ({
          id: normalizeFlashcardText(subject.id),
          label: normalizeFlashcardText(subject.label),
        }))
      : [];
  const subjects = catalogSubjects.filter((subject) => subject.id && subject.label);
  const subjectIds = new Set(subjects.map((subject) => subject.id));

  getFlashcardDecksInSeries(normalizedSeriesId).forEach((deck) => {
    if (!deck.id || subjectIds.has(deck.id)) {
      return;
    }
    subjects.push({
      id: deck.id,
      label: deck.label || deck.id,
    });
    subjectIds.add(deck.id);
  });

  return subjects;
}

function getFlashcardDecksInSeries(seriesId) {
  const normalizedSeriesId = normalizeFlashcardText(seriesId);
  if (!normalizedSeriesId) {
    return [];
  }
  return flashcardState.decks.filter((deck) => deck.seriesId === normalizedSeriesId);
}

function getFlashcardBookTone(subjectId) {
  const normalizedSubjectId = normalizeFlashcardText(subjectId);
  if (!normalizedSubjectId) {
    return "blue";
  }
  if (FLASHCARD_BOOK_TONE_SUBJECT_IDS.red.has(normalizedSubjectId)) {
    return "red";
  }
  if (FLASHCARD_BOOK_TONE_SUBJECT_IDS.blue.has(normalizedSubjectId)) {
    return "blue";
  }
  if (FLASHCARD_BOOK_TONE_SUBJECT_IDS.darkYellow.has(normalizedSubjectId)) {
    return "dark-yellow";
  }
  if (FLASHCARD_BOOK_TONE_SUBJECT_IDS.lightYellow.has(normalizedSubjectId)) {
    return "light-yellow";
  }
  if (FLASHCARD_BOOK_TONE_SUBJECT_IDS.green.has(normalizedSubjectId)) {
    return "green";
  }
  if (FLASHCARD_BOOK_TONE_SUBJECT_IDS.gray.has(normalizedSubjectId)) {
    return "gray";
  }
  if (FLASHCARD_BOOK_TONE_SUBJECT_IDS.theme.has(normalizedSubjectId)) {
    return "theme";
  }
  return "blue";
}

function getFlashcardBookEnglishTitle(subjectId) {
  const normalizedSubjectId = normalizeFlashcardText(subjectId);
  if (!normalizedSubjectId) {
    return "";
  }
  return FLASHCARD_BOOK_ENGLISH_TITLE_BY_SUBJECT_ID[normalizedSubjectId] ?? "";
}

function getFlashcardBookOpeningDirection(subjectId) {
  const normalizedSubjectId = normalizeFlashcardText(subjectId);
  if (!normalizedSubjectId) {
    return "left";
  }
  return FLASHCARD_BOOK_OPEN_RIGHT_SUBJECT_IDS.has(normalizedSubjectId) ? "right" : "left";
}

function getFlashcardBookUseAnimation(seriesId) {
  const normalizedSeriesId = normalizeFlashcardText(seriesId);
  if (!normalizedSeriesId) {
    return null;
  }
  const animationState = flashcardBookUseAnimationBySeries.get(normalizedSeriesId);
  if (!animationState || typeof animationState !== "object") {
    return null;
  }
  const deckId = normalizeFlashcardText(animationState.deckId);
  const phase = normalizeFlashcardText(animationState.phase);
  if (!deckId || !phase) {
    return null;
  }
  return {
    deckId,
    phase,
  };
}

function getRaisedFlashcardDeckId(seriesId) {
  const normalizedSeriesId = normalizeFlashcardText(seriesId);
  if (!normalizedSeriesId || !flashcardState.raisedDeckBySeries || typeof flashcardState.raisedDeckBySeries !== "object") {
    return "";
  }
  return normalizeFlashcardText(flashcardState.raisedDeckBySeries[normalizedSeriesId]);
}

function getDroppingFlashcardDeckId(seriesId) {
  const normalizedSeriesId = normalizeFlashcardText(seriesId);
  if (!normalizedSeriesId || !flashcardState.droppingDeckBySeries || typeof flashcardState.droppingDeckBySeries !== "object") {
    return "";
  }
  return normalizeFlashcardText(flashcardState.droppingDeckBySeries[normalizedSeriesId]);
}

function getLiftingFlashcardDeckId(seriesId) {
  const normalizedSeriesId = normalizeFlashcardText(seriesId);
  if (!normalizedSeriesId || !flashcardState.liftingDeckBySeries || typeof flashcardState.liftingDeckBySeries !== "object") {
    return "";
  }
  return normalizeFlashcardText(flashcardState.liftingDeckBySeries[normalizedSeriesId]);
}

function setRaisedFlashcardDeckId(seriesId, deckId) {
  const normalizedSeriesId = normalizeFlashcardText(seriesId);
  if (!normalizedSeriesId) {
    return;
  }
  if (!flashcardState.raisedDeckBySeries || typeof flashcardState.raisedDeckBySeries !== "object") {
    flashcardState.raisedDeckBySeries = {};
  }
  const normalizedDeckId = normalizeFlashcardText(deckId);
  if (normalizedDeckId) {
    flashcardState.raisedDeckBySeries[normalizedSeriesId] = normalizedDeckId;
    return;
  }
  delete flashcardState.raisedDeckBySeries[normalizedSeriesId];
}

function setDroppingFlashcardDeckId(seriesId, deckId) {
  const normalizedSeriesId = normalizeFlashcardText(seriesId);
  if (!normalizedSeriesId) {
    return;
  }
  if (!flashcardState.droppingDeckBySeries || typeof flashcardState.droppingDeckBySeries !== "object") {
    flashcardState.droppingDeckBySeries = {};
  }
  const normalizedDeckId = normalizeFlashcardText(deckId);
  if (normalizedDeckId) {
    flashcardState.droppingDeckBySeries[normalizedSeriesId] = normalizedDeckId;
    return;
  }
  delete flashcardState.droppingDeckBySeries[normalizedSeriesId];
}

function setLiftingFlashcardDeckId(seriesId, deckId) {
  const normalizedSeriesId = normalizeFlashcardText(seriesId);
  if (!normalizedSeriesId) {
    return;
  }
  if (!flashcardState.liftingDeckBySeries || typeof flashcardState.liftingDeckBySeries !== "object") {
    flashcardState.liftingDeckBySeries = {};
  }
  const normalizedDeckId = normalizeFlashcardText(deckId);
  if (normalizedDeckId) {
    flashcardState.liftingDeckBySeries[normalizedSeriesId] = normalizedDeckId;
    return;
  }
  delete flashcardState.liftingDeckBySeries[normalizedSeriesId];
}

function clearFlashcardBookDropTimer(seriesId) {
  const normalizedSeriesId = normalizeFlashcardText(seriesId);
  if (!normalizedSeriesId) {
    return;
  }
  const timerId = flashcardBookDropTimerBySeries.get(normalizedSeriesId);
  if (typeof timerId === "number") {
    clearTimeout(timerId);
    flashcardBookDropTimerBySeries.delete(normalizedSeriesId);
  }
}

function clearFlashcardBookUseTimer(seriesId) {
  const normalizedSeriesId = normalizeFlashcardText(seriesId);
  if (!normalizedSeriesId) {
    return;
  }
  const timerIds = flashcardBookUseTimerBySeries.get(normalizedSeriesId);
  if (Array.isArray(timerIds)) {
    timerIds.forEach((timerId) => clearTimeout(timerId));
  }
  flashcardBookUseTimerBySeries.delete(normalizedSeriesId);
}

function clearFlashcardBookUseAnimation(seriesId) {
  const normalizedSeriesId = normalizeFlashcardText(seriesId);
  if (!normalizedSeriesId) {
    return;
  }
  clearFlashcardBookUseTimer(normalizedSeriesId);
  flashcardBookUseAnimationBySeries.delete(normalizedSeriesId);
}

function startFlashcardBookUseAnimation(seriesId, deckId) {
  const normalizedSeriesId = normalizeFlashcardText(seriesId);
  const normalizedDeckId = normalizeFlashcardText(deckId);
  if (!normalizedSeriesId || !normalizedDeckId) {
    return;
  }

  clearFlashcardBookUseAnimation(normalizedSeriesId);
  clearFlashcardBookDropTimer(normalizedSeriesId);
  setDroppingFlashcardDeckId(normalizedSeriesId, "");
  setLiftingFlashcardDeckId(normalizedSeriesId, "");
  setRaisedFlashcardDeckId(normalizedSeriesId, normalizedDeckId);

  flashcardBookUseAnimationBySeries.set(normalizedSeriesId, {
    deckId: normalizedDeckId,
    phase: "exit",
  });
  flashcardState.selectedDeckId = "";
  flashcardState.selectedUnitId = "";
  flashcardState.cardIndex = 0;
  flashcardState.answerVisible = false;
  renderFlashcardPanel();

  const exitTimerId = window.setTimeout(() => {
    const animationState = getFlashcardBookUseAnimation(normalizedSeriesId);
    if (!animationState || animationState.deckId !== normalizedDeckId) {
      return;
    }
    flashcardBookUseAnimationBySeries.set(normalizedSeriesId, {
      deckId: normalizedDeckId,
      phase: "drop",
    });
    renderFlashcardPanel();
  }, FLASHCARD_BOOK_USE_EXIT_ANIMATION_MS);

  const dropTimerId = window.setTimeout(() => {
    const animationState = getFlashcardBookUseAnimation(normalizedSeriesId);
    if (!animationState || animationState.deckId !== normalizedDeckId) {
      return;
    }
    if (normalizeFlashcardText(flashcardState.selectedSeriesId) !== normalizedSeriesId) {
      clearFlashcardBookUseAnimation(normalizedSeriesId);
      return;
    }
    flashcardBookUseAnimationBySeries.set(normalizedSeriesId, {
      deckId: normalizedDeckId,
      phase: "open",
    });
    renderFlashcardPanel();
  }, FLASHCARD_BOOK_USE_EXIT_ANIMATION_MS + FLASHCARD_BOOK_USE_DROP_ANIMATION_MS);

  const completeTimerId = window.setTimeout(() => {
    const animationState = getFlashcardBookUseAnimation(normalizedSeriesId);
    if (!animationState || animationState.deckId !== normalizedDeckId) {
      return;
    }
    flashcardState.selectedDeckId = normalizedDeckId;
    flashcardState.selectedUnitId = "";
    flashcardState.cardIndex = 0;
    flashcardState.answerVisible = false;
    flashcardBookUseAnimationBySeries.delete(normalizedSeriesId);
    flashcardBookUseTimerBySeries.delete(normalizedSeriesId);
    renderFlashcardPanel();
  }, FLASHCARD_BOOK_USE_ANIMATION_TOTAL_MS + 40);

  flashcardBookUseTimerBySeries.set(normalizedSeriesId, [exitTimerId, dropTimerId, completeTimerId]);
}

function startFlashcardBookPutAwayAnimation(seriesId, deckId) {
  const normalizedSeriesId = normalizeFlashcardText(seriesId);
  const normalizedDeckId = normalizeFlashcardText(deckId);
  if (!normalizedSeriesId || !normalizedDeckId) {
    return;
  }

  clearFlashcardBookUseAnimation(normalizedSeriesId);
  clearFlashcardBookDropTimer(normalizedSeriesId);
  setDroppingFlashcardDeckId(normalizedSeriesId, "");
  setLiftingFlashcardDeckId(normalizedSeriesId, "");
  setRaisedFlashcardDeckId(normalizedSeriesId, normalizedDeckId);

  flashcardBookUseAnimationBySeries.set(normalizedSeriesId, {
    deckId: normalizedDeckId,
    phase: "putaway-exit",
  });
  if (normalizeFlashcardText(flashcardState.selectedDeckId) === normalizedDeckId) {
    flashcardState.selectedDeckId = "";
    flashcardState.selectedUnitId = "";
    flashcardState.cardIndex = 0;
    flashcardState.answerVisible = false;
  }
  renderFlashcardPanel();

  const exitTimerId = window.setTimeout(() => {
    const animationState = getFlashcardBookUseAnimation(normalizedSeriesId);
    if (!animationState || animationState.deckId !== normalizedDeckId || animationState.phase !== "putaway-exit") {
      return;
    }
    flashcardBookUseAnimationBySeries.set(normalizedSeriesId, {
      deckId: normalizedDeckId,
      phase: "putaway-drop",
    });
    renderFlashcardPanel();
  }, FLASHCARD_BOOK_PUTAWAY_EXIT_ANIMATION_MS);

  const completeTimerId = window.setTimeout(() => {
    const animationState = getFlashcardBookUseAnimation(normalizedSeriesId);
    if (!animationState || animationState.deckId !== normalizedDeckId) {
      return;
    }
    clearFlashcardBookUseTimer(normalizedSeriesId);
    flashcardBookUseAnimationBySeries.delete(normalizedSeriesId);
    setRaisedFlashcardDeckId(normalizedSeriesId, "");
    setDroppingFlashcardDeckId(normalizedSeriesId, "");
    setLiftingFlashcardDeckId(normalizedSeriesId, "");
    renderFlashcardPanel();
  }, FLASHCARD_BOOK_PUTAWAY_ANIMATION_TOTAL_MS + 40);

  flashcardBookUseTimerBySeries.set(normalizedSeriesId, [exitTimerId, completeTimerId]);
}

function scheduleFlashcardBookDropAnimation(seriesId, deckId) {
  const normalizedSeriesId = normalizeFlashcardText(seriesId);
  const normalizedDeckId = normalizeFlashcardText(deckId);
  if (!normalizedSeriesId || !normalizedDeckId) {
    return;
  }
  clearFlashcardBookDropTimer(normalizedSeriesId);
  const timerId = window.setTimeout(() => {
    flashcardBookDropTimerBySeries.delete(normalizedSeriesId);
    if (getDroppingFlashcardDeckId(normalizedSeriesId) !== normalizedDeckId) {
      return;
    }
    setDroppingFlashcardDeckId(normalizedSeriesId, "");
    renderFlashcardPanel();
  }, FLASHCARD_BOOK_DROP_ANIMATION_MS + 40);
  flashcardBookDropTimerBySeries.set(normalizedSeriesId, timerId);
}

function getActiveFlashcardSeries() {
  const seriesList = getFlashcardSeriesList();
  return seriesList.find((series) => series.id === flashcardState.selectedSeriesId) ?? null;
}

function clampFlashcardState() {
  const seriesList = getFlashcardSeriesList();
  if (!flashcardState.raisedDeckBySeries || typeof flashcardState.raisedDeckBySeries !== "object") {
    flashcardState.raisedDeckBySeries = {};
  }
  if (!flashcardState.droppingDeckBySeries || typeof flashcardState.droppingDeckBySeries !== "object") {
    flashcardState.droppingDeckBySeries = {};
  }
  if (!flashcardState.liftingDeckBySeries || typeof flashcardState.liftingDeckBySeries !== "object") {
    flashcardState.liftingDeckBySeries = {};
  }
  const validSeriesIds = new Set(seriesList.map((series) => series.id));
  Object.keys(flashcardState.raisedDeckBySeries).forEach((seriesId) => {
    if (!validSeriesIds.has(seriesId)) {
      delete flashcardState.raisedDeckBySeries[seriesId];
    }
  });
  Object.keys(flashcardState.droppingDeckBySeries).forEach((seriesId) => {
    if (!validSeriesIds.has(seriesId)) {
      delete flashcardState.droppingDeckBySeries[seriesId];
      clearFlashcardBookDropTimer(seriesId);
    }
  });
  Object.keys(flashcardState.liftingDeckBySeries).forEach((seriesId) => {
    if (!validSeriesIds.has(seriesId)) {
      delete flashcardState.liftingDeckBySeries[seriesId];
    }
  });
  Array.from(flashcardBookUseAnimationBySeries.keys()).forEach((seriesId) => {
    if (!validSeriesIds.has(seriesId)) {
      clearFlashcardBookUseAnimation(seriesId);
    }
  });

  if (!Array.isArray(flashcardState.decks) || flashcardState.decks.length === 0) {
    const activeSeries = seriesList.find((item) => item.id === flashcardState.selectedSeriesId) ?? null;
    flashcardState.selectedSeriesId = activeSeries ? activeSeries.id : "";
    flashcardState.selectedDeckId = "";
    flashcardState.selectedUnitId = "";
    flashcardState.cardIndex = 0;
    flashcardState.answerVisible = false;
    return;
  }

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
  const subjectsInSeries = getFlashcardSubjectsInSeries(activeSeries.id);
  const validSubjectIds = new Set(subjectsInSeries.map((subject) => subject.id));
  const raisedDeckId = getRaisedFlashcardDeckId(activeSeries.id);
  const droppingDeckId = getDroppingFlashcardDeckId(activeSeries.id);
  const liftingDeckId = getLiftingFlashcardDeckId(activeSeries.id);
  const usingAnimationState = getFlashcardBookUseAnimation(activeSeries.id);
  if (raisedDeckId && !validSubjectIds.has(raisedDeckId)) {
    setRaisedFlashcardDeckId(activeSeries.id, "");
  }
  if (droppingDeckId && !validSubjectIds.has(droppingDeckId)) {
    setDroppingFlashcardDeckId(activeSeries.id, "");
    clearFlashcardBookDropTimer(activeSeries.id);
  }
  if (liftingDeckId && !validSubjectIds.has(liftingDeckId)) {
    setLiftingFlashcardDeckId(activeSeries.id, "");
  }
  if (usingAnimationState && !validSubjectIds.has(usingAnimationState.deckId)) {
    clearFlashcardBookUseAnimation(activeSeries.id);
  }
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

function setFlashcardPanelBookDimmed(shouldDim) {
  const shouldLock = Boolean(shouldDim);
  document.body.classList.toggle("flashcard-book-global-focus", shouldLock);
  document.body.classList.toggle("flashcard-book-scroll-lock", shouldLock);
  document.documentElement.classList.toggle("flashcard-book-scroll-lock", shouldLock);
}

function renderFlashcardPanel() {
  if (!elements.flashcardSummary) {
    return;
  }

  clampFlashcardState();
  const decks = flashcardState.decks;
  const seriesList = getFlashcardSeriesList();
  const activeSeries = getActiveFlashcardSeries();
  const activeSeriesId = normalizeFlashcardText(activeSeries?.id);
  const useAnimationState = getFlashcardBookUseAnimation(activeSeriesId);
  const transitionPhase = normalizeFlashcardText(useAnimationState?.phase);
  const isBookUseTransitionPhase =
    transitionPhase === "exit" ||
    transitionPhase === "drop" ||
    transitionPhase === "open" ||
    transitionPhase === "putaway-exit" ||
    transitionPhase === "putaway-drop";
  const hasActiveDeck = Boolean(normalizeFlashcardText(flashcardState.selectedDeckId));
  setFlashcardPanelBookDimmed(Boolean(activeSeriesId && (hasActiveDeck || isBookUseTransitionPhase)));
  const decksInSeries = getFlashcardDecksInSeries(activeSeries?.id);
  const subjectsInSeries = getFlashcardSubjectsInSeries(activeSeries?.id);
  renderFlashcardSeriesButtons(seriesList, activeSeries?.id ?? "");
  renderFlashcardSubjectButtons(subjectsInSeries, decksInSeries, flashcardState.selectedDeckId);
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
    elements.flashcardSummary.textContent =
      decksInSeries.length > 0
        ? FLASHCARD_SUMMARY_DEFAULT_TEXT
        : `${activeSeries.label}の問題は準備中です。`;
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

  elements.flashcardSummary.textContent = FLASHCARD_SUMMARY_DEFAULT_TEXT;

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

function renderFlashcardSubjectButtons(subjects, decks, activeDeckId) {
  if (!elements.flashcardSubjectButtons) {
    return;
  }
  const safeSubjects = Array.isArray(subjects) ? subjects : [];
  const safeDecks = Array.isArray(decks) ? decks : [];
  const container = elements.flashcardSubjectButtons;
  container.innerHTML = "";

  if (safeSubjects.length === 0) {
    const empty = document.createElement("span");
    empty.className = "flashcard-choice-empty";
    empty.textContent = "科目データなし";
    container.append(empty);
    if (elements.flashcardSubjectGroup) {
      elements.flashcardSubjectGroup.hidden = true;
    }
    return;
  }

  const deckMap = new Map(safeDecks.map((deck) => [deck.id, deck]));
  const activeSeriesId = normalizeFlashcardText(flashcardState.selectedSeriesId);
  const raisedDeckId = getRaisedFlashcardDeckId(activeSeriesId);
  const droppingDeckId = getDroppingFlashcardDeckId(activeSeriesId);
  const liftingDeckId = getLiftingFlashcardDeckId(activeSeriesId);
  const useAnimationState = getFlashcardBookUseAnimation(activeSeriesId);
  const usingDeckId = useAnimationState?.deckId ?? "";
  const usingPhase = useAnimationState?.phase ?? "";
  const isUseAnimationRunning = Boolean(usingDeckId && usingPhase);
  let activeShell = null;
  let activeDeck = null;
  let activeSubjectLabel = "";

  safeSubjects.forEach((subject, index) => {
    const subjectId = normalizeFlashcardText(subject.id);
    if (!subjectId) {
      return;
    }
    const deck = deckMap.get(subjectId);
    const isReady = Boolean(deck);
    const isRaised = raisedDeckId === subjectId;
    const isDropping = !isRaised && droppingDeckId === subjectId;
    const isLifting = isRaised && liftingDeckId === subjectId;
    const isActive = isReady && subjectId === activeDeckId;
    const isUsing = isUseAnimationRunning && usingDeckId === subjectId;
    const openingDirection = getFlashcardBookOpeningDirection(subjectId);

    const shell = document.createElement("article");
    shell.className = "flashcard-book-shell";
    shell.dataset.flashcardDeckId = subjectId;
    shell.style.setProperty("--flashcard-stack-index", String(index));
    shell.dataset.flashcardBookTone = getFlashcardBookTone(subjectId);
    if (isRaised) {
      shell.classList.add("is-raised");
    }
    if (isDropping) {
      shell.classList.add("is-dropping");
    }
    if (isLifting) {
      shell.classList.add("is-lifting");
    }
    if (isActive) {
      shell.classList.add("is-active");
    }
    if (!isReady) {
      shell.classList.add("is-unready");
    }
    if (isUsing) {
      shell.classList.add("is-using");
      if (usingPhase === "exit") {
        shell.classList.add("is-using-exit");
      } else if (usingPhase === "drop") {
        shell.classList.add("is-using-drop");
      } else if (usingPhase === "open") {
        shell.classList.add(openingDirection === "right" ? "is-using-open-right" : "is-using-open-left");
      } else if (usingPhase === "putaway-exit") {
        shell.classList.add("is-putaway-exit");
      } else if (usingPhase === "putaway-drop") {
        shell.classList.add("is-putaway-drop");
      }
    }
    if (isActive) {
      activeShell = shell;
      activeDeck = deck;
      activeSubjectLabel = subject.label;
      shell.classList.add("is-opened");
    }

    const shouldShowPutAwayButton = isRaised && (isActive || isUsing);
    if (shouldShowPutAwayButton) {
      shell.classList.add("has-putaway-button");
      const putAwayButton = document.createElement("button");
      putAwayButton.type = "button";
      putAwayButton.className = "flashcard-book-putaway-btn";
      putAwayButton.dataset.flashcardBookPutaway = "1";
      putAwayButton.dataset.flashcardDeckId = subjectId;
      putAwayButton.textContent = "この教材をしまう";
      putAwayButton.setAttribute("aria-label", `${subject.label}をしまう`);
      putAwayButton.disabled = isUseAnimationRunning;
      shell.append(putAwayButton);
    }

    const turnPage = document.createElement("span");
    turnPage.className = "flashcard-book-page-turn";
    turnPage.setAttribute("aria-hidden", "true");
    shell.append(turnPage);

    const turnShadow = document.createElement("span");
    turnShadow.className = "flashcard-book-page-shadow";
    turnShadow.setAttribute("aria-hidden", "true");
    shell.append(turnShadow);

    const liftButton = document.createElement("button");
    liftButton.type = "button";
    liftButton.className = "flashcard-book-lift-btn";
    liftButton.dataset.flashcardBookLift = "1";
    liftButton.dataset.flashcardDeckId = subjectId;
    liftButton.setAttribute("aria-expanded", String(isRaised));
    liftButton.setAttribute("aria-pressed", String(isRaised));
    liftButton.setAttribute(
      "aria-label",
      isReady
        ? `${subject.label}（${deck.totalCards}問）`
        : `${subject.label}（準備中）`
    );
    liftButton.disabled = isUseAnimationRunning;

    const title = document.createElement("span");
    title.className = "flashcard-book-title";
    title.textContent = subject.label;
    liftButton.append(title);

    const englishTitle = getFlashcardBookEnglishTitle(subjectId);
    if (englishTitle) {
      const script = document.createElement("span");
      script.className = "flashcard-book-script";
      script.textContent = englishTitle;
      script.setAttribute("aria-hidden", "true");
      shell.append(script);
    }

    const meta = document.createElement("span");
    meta.className = "flashcard-book-meta";
    if (isReady) {
      meta.textContent = isActive ? `${deck.totalCards}問 | 使用中` : `${deck.totalCards}問`;
    } else {
      meta.textContent = "準備中";
    }
    liftButton.append(meta);

    shell.append(liftButton);

    const shouldShowUseButton = !isActive && !isUsing;
    if (shouldShowUseButton) {
      const actionWrap = document.createElement("div");
      actionWrap.className = "flashcard-book-action-row";

      const useButton = document.createElement("button");
      useButton.type = "button";
      useButton.className = "flashcard-book-use-btn";
      useButton.dataset.flashcardSubjectAction = "select";
      useButton.dataset.flashcardDeckId = subjectId;
      useButton.textContent = "この教材を使う";
      useButton.disabled = !isReady || isUseAnimationRunning;
      if (!isReady || isUseAnimationRunning) {
        useButton.setAttribute("aria-disabled", "true");
      }
      actionWrap.append(useButton);
      shell.append(actionWrap);
    }

    container.append(shell);
  });

  if (activeShell && activeDeck) {
    const studyArea = document.createElement("section");
    studyArea.className = "flashcard-book-study-area";
    const spread = document.createElement("div");
    spread.className = "flashcard-book-spread";

    const leftPage = document.createElement("section");
    leftPage.className = "flashcard-book-page flashcard-book-page-left";
    const leftKicker = document.createElement("p");
    leftKicker.className = "flashcard-book-page-kicker";
    leftKicker.textContent = "FLASHCARD";
    leftPage.append(leftKicker);
    const leftTitle = document.createElement("h3");
    leftTitle.className = "flashcard-book-page-title";
    leftTitle.textContent = activeSubjectLabel;
    leftPage.append(leftTitle);
    const leftMeta = document.createElement("p");
    leftMeta.className = "flashcard-book-page-meta";
    leftMeta.textContent = `${activeDeck.totalCards}問`;
    leftPage.append(leftMeta);

    const rightPage = document.createElement("section");
    rightPage.className = "flashcard-book-page flashcard-book-page-right";
    if (elements.flashcardToolbar) {
      rightPage.append(elements.flashcardToolbar);
    }
    if (elements.flashcardCard) {
      rightPage.append(elements.flashcardCard);
    }
    if (elements.flashcardActions) {
      rightPage.append(elements.flashcardActions);
    }

    spread.append(leftPage, rightPage);
    studyArea.append(spread);
    activeShell.append(studyArea);
  }

  if (elements.flashcardSubjectGroup) {
    elements.flashcardSubjectGroup.hidden = safeSubjects.length === 0;
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
    const optionValue = normalizeFlashcardText(optionData.value);
    if (!optionValue) {
      return;
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = "flashcard-choice-btn";
    button.dataset[datasetKey] = optionValue;
    if (optionData.style === "book") {
      button.classList.add("is-book");
    }
    if (Number.isFinite(optionData.hue)) {
      button.style.setProperty("--flashcard-book-hue", String(optionData.hue));
    }

    const title = document.createElement("span");
    title.className = "flashcard-choice-title";
    title.textContent = optionData.label;
    button.append(title);
    if (optionData.meta) {
      const meta = document.createElement("span");
      meta.className = "flashcard-choice-meta";
      meta.textContent = optionData.meta;
      button.append(meta);
    }

    const isDisabled = Boolean(optionData.disabled);
    if (isDisabled) {
      button.disabled = true;
      button.classList.add("is-disabled");
      button.setAttribute("aria-disabled", "true");
    }

    const isActive = !isDisabled && optionValue === activeValue;
    if (isActive) {
      button.classList.add("is-active");
    }
    button.setAttribute("aria-label", optionData.meta ? `${optionData.label} ${optionData.meta}` : optionData.label);
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
  const shouldEnableTimer = isSelfcheckTimerFocusMode && activeScreen === "learn";
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

function openStoreFromCoinBoard() {
  closeInfoMenu();
  closeMypageSubmenu();
  if (!state.auth.isLoggedIn) {
    promptLoginForMypage();
    return;
  }
  activateScreen("notice");
}

function renderMypageSettings() {
  if (elements.authLoginStatusText) {
    if (!state.auth.isLoggedIn) {
      elements.authLoginStatusText.textContent = "未ログイン";
    } else if (state.auth.provider === "guest") {
      elements.authLoginStatusText.textContent = "Guest Mode";
    } else {
      elements.authLoginStatusText.textContent = "ログイン中";
    }
  }

  if (elements.authEmailText) {
    elements.authEmailText.textContent =
      state.auth.isLoggedIn && state.auth.provider !== "guest" ? state.auth.email ?? "未設定" : "未設定";
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
        lockCost.textContent = String(getThemeUnlockCost(themeKey));
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
  const unlockCost = getThemeUnlockCost(themeKey);
  if (state.reviewCoin < unlockCost) {
    return;
  }

  pendingThemeUnlockKey = themeKey;
  if (!elements.themeUnlockDialog || typeof elements.themeUnlockDialog.showModal !== "function") {
    const shouldUnlock = window.confirm(
      `「${getThemeDisplayName(themeKey)}」を${unlockCost}コインで解放しますか？\n現在の所持コイン: ${state.reviewCoin}`
    );
    if (!shouldUnlock) {
      pendingThemeUnlockKey = null;
      return;
    }
    proceedThemeUnlock(themeKey);
    return;
  }

  if (elements.themeUnlockName) {
    elements.themeUnlockName.textContent = getThemeDisplayName(themeKey);
  }
  if (elements.themeUnlockCost) {
    elements.themeUnlockCost.textContent = String(unlockCost);
  }
  if (elements.themeUnlockCurrentCoin) {
    elements.themeUnlockCurrentCoin.textContent = REVIEW_COIN_FORMATTER.format(state.reviewCoin);
  }
  if (!elements.themeUnlockDialog.open) {
    elements.themeUnlockDialog.showModal();
  }
}

function handleThemeUnlockDialogAction(action) {
  const normalizedAction = typeof action === "string" ? action.trim().toLowerCase() : "";
  if (normalizedAction === "cancel") {
    closeThemeUnlockDialog();
    pendingThemeUnlockKey = null;
    return;
  }
  if (normalizedAction === "purchase") {
    const themeKey = pendingThemeUnlockKey;
    closeThemeUnlockDialog();
    proceedThemeUnlock(themeKey);
  }
}

function closeThemeUnlockDialog() {
  if (elements.themeUnlockDialog?.open) {
    elements.themeUnlockDialog.close();
  }
}

function proceedThemeUnlock(themeKey) {
  pendingThemeUnlockKey = null;
  const unlockCost = getThemeUnlockCost(themeKey);
  if (!PREMIUM_THEMES.includes(themeKey) || state.reviewCoin < unlockCost) {
    return;
  }

  state.reviewCoin -= unlockCost;
  state.settings.unlockedThemes[themeKey] = true;
  state.settings.themeUnlockPolicyVersion = THEME_UNLOCK_POLICY_VERSION;
  saveState();
  renderCoinBoard();
  renderMypageCoin();
  renderMypageSettings();
  updateThemeSetting(themeKey);
}

function getThemeDisplayName(themeKey) {
  return THEME_DISPLAY_NAMES[themeKey] ?? themeKey;
}

function getThemeUnlockCost(themeKey) {
  return PREMIUM_THEME_COSTS[themeKey] ?? 0;
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

function toggleInfoMenu() {
  if (isInfoMenuOpen()) {
    closeInfoMenu();
    return;
  }
  openInfoMenu();
}

function isInfoMenuOpen() {
  return Boolean(elements.infoMenuPanel?.classList.contains("is-open"));
}

function openInfoMenu() {
  if (!elements.infoMenuPanel || !elements.infoMenuTrigger) {
    return;
  }
  if (infoMenuCloseTimerId !== null) {
    window.clearTimeout(infoMenuCloseTimerId);
    infoMenuCloseTimerId = null;
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
  if (infoMenuCloseTimerId !== null) {
    window.clearTimeout(infoMenuCloseTimerId);
  }
  infoMenuCloseTimerId = window.setTimeout(() => {
    if (!elements.infoMenuPanel?.classList.contains("is-open")) {
      elements.infoMenuPanel.hidden = true;
    }
    infoMenuCloseTimerId = null;
  }, 240);
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

function setSettingsTab(tab) {
  const normalizedTab = normalizeSettingsTab(tab);
  activeSettingsTab = normalizedTab;

  elements.settingsTabButtons.forEach((button) => {
    const isActive = button.dataset.settingsTab === normalizedTab;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });

  elements.settingsTabPanels.forEach((panel) => {
    const isActive = panel.dataset.settingsPanel === normalizedTab;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
}

function handleSettingsTabKeydown(event) {
  const currentIndex = elements.settingsTabButtons.findIndex((button) => button === event.currentTarget);
  if (currentIndex < 0) {
    return;
  }

  let nextIndex = currentIndex;
  if (event.key === "ArrowRight") {
    nextIndex = (currentIndex + 1) % elements.settingsTabButtons.length;
  } else if (event.key === "ArrowLeft") {
    nextIndex = (currentIndex - 1 + elements.settingsTabButtons.length) % elements.settingsTabButtons.length;
  } else if (event.key === "Home") {
    nextIndex = 0;
  } else if (event.key === "End") {
    nextIndex = elements.settingsTabButtons.length - 1;
  } else {
    return;
  }

  event.preventDefault();
  const nextButton = elements.settingsTabButtons[nextIndex];
  setSettingsTab(nextButton?.dataset.settingsTab);
  nextButton?.focus();
}

function normalizeSettingsTab(tab) {
  return SETTINGS_TAB_IDS.includes(tab) ? tab : "account";
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

  if (normalizedPage !== "top") {
    clearAllFlashcardBookIntentTimers();
    setFlashcardPanelBookDimmed(false);
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
  const streakCount = getConsecutiveLoginDayCount();
  const displayCount = Math.max(1, streakCount);
  const cycleDay = ((displayCount - 1) % 7) + 1;
  const isCurrentDayOne = cycleDay === 1;
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
      label.classList.toggle("is-digit-one", Boolean(slot?.day === 1));
    });
  }

  if (elements.dailyLoginTrack) {
    elements.dailyLoginTrack.style.setProperty("--daily-login-track-start", `${lineStartPercent}%`);
    elements.dailyLoginTrack.style.setProperty("--daily-login-track-end", `${lineEndPercent}%`);
    elements.dailyLoginTrack.classList.toggle("is-digit-one", isCurrentDayOne);
  }

  if (elements.dailyLoginProgressFill) {
    elements.dailyLoginProgressFill.style.left = `${lineStartPercent}%`;
    elements.dailyLoginProgressFill.style.width = `${progressWidth}%`;
  }

  if (elements.dailyLoginCurrentNode) {
    elements.dailyLoginCurrentNode.style.left = `${currentPercent}%`;
    elements.dailyLoginCurrentNode.hidden = false;
    elements.dailyLoginCurrentNode.classList.toggle("is-digit-one", isCurrentDayOne);
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
  updateDailyTryNudgeState();
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
  void savePersonalAnswer({
    questionId: question.id || `daily-try-${dailyTryRun.questionIndex + 1}`,
    answerText: question.choices[dailyTryRun.selected] ?? "",
    isCorrect,
  });
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
      themeUnlockPolicyVersion: THEME_UNLOCK_POLICY_VERSION,
      highContrast: false,
      monochrome: false,
      text: { ...DEFAULT_TEXT_SETTINGS },
      notifications: { ...DEFAULT_NOTIFICATION_SETTINGS },
      notificationTimeMinutes: DEFAULT_NOTIFICATION_TIME_MINUTES,
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
  const storedTheme = normalizeTheme(value?.theme);
  const themeUnlockPolicyVersion = Number(value?.themeUnlockPolicyVersion);
  const preservePremiumUnlocks = themeUnlockPolicyVersion >= THEME_UNLOCK_POLICY_VERSION;
  const unlockedThemes = normalizeThemeUnlockState(value?.unlockedThemes, { preservePremiumUnlocks });
  const theme = unlockedThemes[storedTheme] ? storedTheme : DEFAULT_THEME;
  unlockedThemes[theme] = true;
  return {
    theme,
    unlockedThemes,
    themeUnlockPolicyVersion: THEME_UNLOCK_POLICY_VERSION,
    highContrast: normalizedMode.highContrast,
    monochrome: normalizedMode.monochrome,
    text: normalizeTextSettings(value?.text),
    notifications: normalizeNotificationSettings(value?.notifications),
    notificationTimeMinutes: normalizeNotificationTimeMinutes(
      value?.notificationTimeMinutes ?? value?.reviewPeriodNotifyMinutes
    ),
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

function normalizeNotificationTimeMinutes(value) {
  const roundedMinutes = Math.round(clampNumber(value, 0, 1435, DEFAULT_NOTIFICATION_TIME_MINUTES) / 5) * 5;
  return clampNumber(roundedMinutes, 0, 1435, DEFAULT_NOTIFICATION_TIME_MINUTES);
}

function createDefaultThemeUnlockState() {
  const unlockedThemes = {};
  AVAILABLE_THEMES.forEach((theme) => {
    unlockedThemes[theme] = !PREMIUM_THEMES.includes(theme);
  });
  return unlockedThemes;
}

function normalizeThemeUnlockState(value, options = {}) {
  const defaultState = createDefaultThemeUnlockState();
  if (!value || typeof value !== "object") {
    return defaultState;
  }

  const preservePremiumUnlocks = Boolean(options.preservePremiumUnlocks);
  AVAILABLE_THEMES.forEach((theme) => {
    if (PREMIUM_THEMES.includes(theme) && !preservePremiumUnlocks) {
      return;
    }
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

function getCurrentMonthStartDate() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

function todayKey() {
  return keyFromDate(new Date());
}

function getConsecutiveLoginDayCount(anchorDate = new Date()) {
  if (!state.loginDays || typeof state.loginDays !== "object") {
    return 0;
  }

  let count = 0;
  const cursor = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), anchorDate.getDate());
  while (state.loginDays[keyFromDate(cursor)]) {
    count += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
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
  const educationCodeStopScanBtn = document.getElementById("educationCodeStopScanBtn");
  const educationCodeScanner = document.getElementById("educationCodeScanner");
  const educationCodeVideo = document.getElementById("educationCodeVideo");
  const avatarInputs = Array.from(document.querySelectorAll('input[name="avatarPreset"]'));
  const loginNotifyReviewPeriodToggle = document.getElementById("loginNotifyReviewPeriodToggle");
  const loginNotifyCommonTimeDescription = document.getElementById("loginNotifyCommonTimeDescription");
  const loginNotifyCommonTimeInput = document.getElementById("loginNotifyCommonTimeInput");
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

  function setActiveStepByName(stepName) {
    const normalizedStepName = normalizeLoginOnboardingStep(stepName);
    if (!normalizedStepName) {
      return false;
    }
    const targetIndex = steps.findIndex((step) => step.dataset.onboardingStep === normalizedStepName);
    if (targetIndex < 0) {
      return false;
    }
    setActiveStep(targetIndex);
    if (normalizedStepName === "educationCode") {
      window.setTimeout(() => {
        educationCodeInput?.focus();
      }, 0);
    }
    return true;
  }

  function getSelectedValue(inputs) {
    const selected = inputs.find((input) => input.checked);
    return selected ? selected.value : "";
  }

  function formatNotificationTime(minutes) {
    const normalized = normalizeNotificationTimeMinutes(minutes);
    const hours = String(Math.floor(normalized / 60)).padStart(2, "0");
    const mins = String(normalized % 60).padStart(2, "0");
    return `${hours}:${mins}`;
  }

  function parseTimeTextToMinutes(value, fallbackMinutes = DEFAULT_NOTIFICATION_TIME_MINUTES) {
    const text = typeof value === "string" ? value.trim() : "";
    const match = text.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) {
      return normalizeNotificationTimeMinutes(fallbackMinutes);
    }
    const hours = Number(match[1]);
    const minutes = Number(match[2]);
    if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
      return normalizeNotificationTimeMinutes(fallbackMinutes);
    }
    return normalizeNotificationTimeMinutes(hours * 60 + minutes);
  }

  function getOnboardingNotificationTimeMinutes() {
    const fallbackMinutes = state.settings?.notificationTimeMinutes ?? DEFAULT_NOTIFICATION_TIME_MINUTES;
    if (!loginNotifyCommonTimeInput) {
      return normalizeNotificationTimeMinutes(fallbackMinutes);
    }
    return parseTimeTextToMinutes(loginNotifyCommonTimeInput.value, fallbackMinutes);
  }

  function renderOnboardingNotificationTimeDescription(minutes = getOnboardingNotificationTimeMinutes()) {
    const timeText = formatNotificationTime(minutes);
    if (loginNotifyCommonTimeDescription) {
      loginNotifyCommonTimeDescription.textContent = `${timeText}に毎日アプリをご利用できるよう通知を送信します`;
    }
  }

  function applyOnboardingNotificationTimeMinutes(value) {
    const normalized = normalizeNotificationTimeMinutes(value);
    const timeText = formatNotificationTime(normalized);
    if (loginNotifyCommonTimeInput) {
      loginNotifyCommonTimeInput.value = timeText;
    }
    renderOnboardingNotificationTimeDescription(normalized);
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

  function commitOnboardingNotificationSettings(
    settings,
    notificationTimeMinutes = getOnboardingNotificationTimeMinutes()
  ) {
    state.settings.notifications = normalizeNotificationSettings(settings);
    state.settings.notificationTimeMinutes = normalizeNotificationTimeMinutes(notificationTimeMinutes);
    saveState();
  }

  function handleOnboardingNotificationToggleChange() {
    const nextSettings = getOnboardingNotificationSettingsFromToggles();
    commitOnboardingNotificationSettings(nextSettings);
    saveDraft();
  }

  function handleOnboardingNotificationTimeInput() {
    renderOnboardingNotificationTimeDescription();
    saveDraft();
  }

  function handleOnboardingNotificationTimeChange() {
    const nextSettings = getOnboardingNotificationSettingsFromToggles();
    const notificationTimeMinutes = getOnboardingNotificationTimeMinutes();
    commitOnboardingNotificationSettings(nextSettings, notificationTimeMinutes);
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
      notificationTimeMinutes: getOnboardingNotificationTimeMinutes(),
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
            stopEducationCodeScanner();
            return;
          }
        }
      }
    } catch {
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
      return;
    }

    stopEducationCodeScanner();
    setEducationCodeScannerVisible(true);

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
      void scanEducationCodeFrame();
    } catch {
      stopEducationCodeScanner();
    }
  }

  function syncEducationCodeScannerAvailability() {
    const canUseQrScan = "BarcodeDetector" in window && Boolean(navigator.mediaDevices?.getUserMedia);
    if (educationCodeStartScanBtn) {
      educationCodeStartScanBtn.disabled = !canUseQrScan;
    }
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
    if ("notificationTimeMinutes" in initialDraft) {
      applyOnboardingNotificationTimeMinutes(initialDraft.notificationTimeMinutes);
    } else if ("reviewPeriodNotifyMinutes" in initialDraft) {
      applyOnboardingNotificationTimeMinutes(initialDraft.reviewPeriodNotifyMinutes);
    } else {
      applyOnboardingNotificationTimeMinutes(state.settings.notificationTimeMinutes);
    }
  } else {
    applyOnboardingNotificationSettingsToToggles(state.settings.notifications);
    applyOnboardingNotificationTimeMinutes(state.settings.notificationTimeMinutes);
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
    stopEducationCodeScanner();
  });

  avatarInputs.forEach((input) => {
    input.addEventListener("change", saveDraft);
  });

  loginNotifyCommonTimeInput?.addEventListener("input", handleOnboardingNotificationTimeInput);
  loginNotifyCommonTimeInput?.addEventListener("change", handleOnboardingNotificationTimeChange);
  loginNotifyReviewPeriodToggle?.addEventListener("change", handleOnboardingNotificationToggleChange);
  loginNotifyTodaysMissionToggle?.addEventListener("change", handleOnboardingNotificationToggleChange);
  loginNotifyNoticeToggle?.addEventListener("change", handleOnboardingNotificationToggleChange);

  window.addEventListener("the-review-login-onboarding-step", (event) => {
    if (setActiveStepByName(event.detail?.step)) {
      clearRequestedLoginOnboardingStep();
    }
  });

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
  if (!setActiveStepByName(getRequestedLoginOnboardingStep())) {
    setActiveStep(0);
  } else {
    clearRequestedLoginOnboardingStep();
  }

  window.addEventListener("beforeunload", stopEducationCodeScanner);
})();
