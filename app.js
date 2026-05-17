const STORAGE_KEY = "the-review-quest-v1";
const HOME_GREETING_REFRESH_MS = 60 * 1000;
const AUTH_INIT_TIMEOUT_MS = 8000;
const AUTH0_SDK_URL = "https://cdn.auth0.com/js/auth0-spa-js/2.18/auth0-spa-js.production.js";
const AUTH0_SDK_LOAD_TIMEOUT_MS = 4500;
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
const SCREEN_IDS = ["home", "login", "mypage", "learn", "notice", "settings", "manager"];
const SETTINGS_TAB_IDS = ["account", "education-code", "review-data", "update"];
const AUTH0_DEFAULT_SCOPE = "openid profile email";
const DAILY_LOGIN_REWARD_RULES = Object.freeze({
  firstDay: 10,
  thirdDay: 20,
  recurringFromDay: 7,
  recurringIntervalDays: 3,
  recurringAmount: 30,
});
const DAILY_LOGIN_DESKTOP_WINDOW_RADIUS = 2;
const DAILY_LOGIN_MOBILE_WINDOW_RADIUS = 2;
const DAILY_LOGIN_MOBILE_BREAKPOINT_PX = 760;
const COIN_COUNT_MIN_ANIMATION_MS = 420;
const COIN_COUNT_MAX_ANIMATION_MS = 1200;
const COIN_COUNT_DURATION_PER_STEP_MS = 0.22;
const REVIEW_COIN_FORMATTER = new Intl.NumberFormat("ja-JP");
const REVIEW_DATA_EXPORT_FORMAT = "the-review-obfuscated-v1";
const REVIEW_DATA_EXPORT_KEY = "TheReview::DataExport::v1";
const REVIEW_DATA_STORAGE_KEY = STORAGE_KEY;
const REVIEW_DATA_SYNC_VERSION = 1;
const REVIEW_DATA_SYNC_DEBOUNCE_MS = 1200;
const REVIEW_DATA_EXTERNAL_UPDATE_GRACE_MS = 60 * 1000;
const REVIEW_DATA_SYNC_REFRESH_MIN_MS = 15 * 1000;
const STORE_CONFIG_KEY = "the-review-store-config-v1";
const AVATER_CUSTOM_ITEMS_KEY = "the-review-avater-items-v1";
const MANAGER_ACCESS_CACHE_KEY = "the-review-manager-access-v1";
const MANAGER_ACCESS_TOKEN_TIMEOUT_MS = 7000;
const MANAGER_ACCESS_CACHE_TTL_MS = 5 * 60 * 1000;
const MANAGER_REVIEW_COIN_ROLES = ["owner", "developer", "checker", "system_designer", "character_designer"];
const MANAGER_REVIEW_COIN_ROLE_ALIASES = {
  admin: "owner",
  administrator: "owner",
  manager: "owner",
  owner: "owner",
  "オーナー": "owner",
  developer: "developer",
  dev: "developer",
  "デベロッパー": "developer",
  checker: "checker",
  reviewer: "checker",
  "チェッカー": "checker",
  system_designer: "system_designer",
  systemdesigner: "system_designer",
  "システムデザイナー": "system_designer",
  character_designer: "character_designer",
  characterdesigner: "character_designer",
  "キャラクターデザイナー": "character_designer",
};
const DEFAULT_STORE_CONFIG = {
  avatarStatus: "published",
  avatarMessage: "Avaterアイテムを選べます。",
};
const APP_LOGO_SRC = "./assets/logos/original.png?v=20260326-1";
const MANAGER_LOGO_SRC = "./assets/logos/manager.png?v=20260326-1";
const AVATER_BASE_IMAGE = "./assets/avater/らーん1-1.png";
const AVATER_ITEMS = [];
const AVATER_CATEGORY_ORDER = ["clothes", "glasses", "accessory"];
const AVATER_CATEGORY_LABELS = {
  clothes: "うわぎ",
  glasses: "めがね",
  accessory: "アクセサリー",
};
const LEARN_AVATER_CATEGORY_ICONS = {
  clothes: "checkroom",
  glasses: "eyeglasses",
  accessory: "auto_awesome",
};
const MANAGER_HOST_SCREEN_TITLES = {
  home: { en: "Top", ja: "トップ" },
  members: { en: "Users", ja: "ユーザー" },
  problem: { en: "Questions", ja: "問題" },
  store: { en: "Store", ja: "ストア" },
};
const MANAGER_MIGRATED_DATA = Object.freeze({
  defaultStoreConfig: Object.freeze({
    avatarStatus: "preparing",
    avatarMessage: "準備中",
  }),
  roleLabels: Object.freeze({
    user: "ユーザー",
    owner: "オーナー",
    developer: "デベロッパー",
    checker: "チェッカー",
    system_designer: "システムデザイナー",
    character_designer: "キャラクターデザイナー",
  }),
  roleAliases: Object.freeze({
    ...MANAGER_REVIEW_COIN_ROLE_ALIASES,
  }),
  availableThemes: Object.freeze([...AVAILABLE_THEMES]),
  themeDisplayNames: Object.freeze({
    ...THEME_DISPLAY_NAMES,
  }),
  avaterCategoryLabels: Object.freeze({
    ...AVATER_CATEGORY_LABELS,
  }),
  avaterItemClasses: Object.freeze({}),
  noteByBinder: Object.freeze({
    "Reboot 1st Edition": Object.freeze([
      "現代の国語",
      "言語文化",
      "論理・表現Ⅰ",
      "ＥＣⅠ",
      "公共",
      "保健",
      "数学Ⅰ",
      "数学Ａ",
      "物理基礎",
      "化学基礎",
      "生物基礎",
      "情報（工業情報数理）",
    ]),
    "Refine 2nd Edition": Object.freeze([
      "論理国語",
      "論理・表現Ⅱ",
      "ＥＣⅡ",
      "地理総合",
      "家庭基礎",
      "保健",
      "数学Ⅱ",
      "数学Ｃ",
      "数学Ｂ",
      "物理",
      "化学",
      "生物",
      "ＳＳ科学技術理論Ⅰ（１分野）",
      "ＳＳ科学技術理論Ⅰ（２分野）",
      "ＳＳ科学技術理論Ⅰ（３分野）",
    ]),
    "On COLORFUL": Object.freeze(["朝学習テスト（１学年）", "朝学習テスト（２学年）"]),
  }),
  defaultChapterConfig: Object.freeze({
    label: "",
    options: Object.freeze([]),
  }),
});
window.THE_REVIEW_MANAGER_MIGRATED_DATA = MANAGER_MIGRATED_DATA;
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
const FLASHCARD_SUMMARY_DEFAULT_TEXT = "リビューする科目を選び、ノートをとってください。";
const REVIEW_API_BASE_URL = "https://api.the-review.net";
const REVIEW_API_AUDIENCE = "https://api.the-review.net";
const FLASHCARD_QUESTIONS_API_URL = "https://api.the-review.net/questions";
const FLASHCARD_REMOTE_DEFAULT_DECK_ID = "ec1";
const FLASHCARD_REMOTE_DEFAULT_UNIT = "Questions";
const FLASHCARD_MANAGER_DRAFT_STORAGE_KEY = "the-review-manager-drafts-v1";
const EDUCATION_CODE_MAX_LENGTH = 32;
const EDUCATION_CODE_INVALID_MESSAGE = "正しくないEducation Codeが入力されています。";
const EDUCATION_CODE_DUPLICATE_MESSAGE = "このEducation Codeはすでに追加されています。";
const TOKYO_SCIENCE_TECH_SCHOOL_NAME = "東京都立科学技術高等学校";
const FLASHCARD_REMOTE_SUBJECT_ALIASES = {
  english: "ec1",
  "english-communication-i": "ec1",
  "english communication i": "ec1",
  math: "math1",
  mathematics: "math1",
  "mathematics-i": "math1",
  "mathematics i": "math1",
  "mathematics-c": "refine-math-c",
  "mathematics c": "refine-math-c",
  "math-c": "refine-math-c",
  "math c": "refine-math-c",
  "数学c": "refine-math-c",
  "数学ｃ": "refine-math-c",
  "数学Ｃ": "refine-math-c",
  "refine-math-c": "refine-math-c",
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
const FLASHCARD_DIRECT_NOTE_DECK_ALIASES = {
  "朝学習テスト（１学年）": "morning-test-1-10",
  "Week Test (1st Grade)": "morning-test-1-10",
};
const FLASHCARD_SCHOOL_GATED_DECK_IDS = new Set([
  "ss-tech-theory-1",
  "ss-tech-theory-2",
  "ss-tech-theory-3",
  "morning-test-1-10",
]);
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

const DAILY_TRY_QUESTIONS = [];

const AUTH0_CONFIG = normalizeAuth0Config(window.AUTH0_CONFIG);

const elements = {
  appLoader: document.getElementById("appLoader"),
  appLogo: document.querySelector(".app-header .app-logo"),
  navButtons: Array.from(document.querySelectorAll("[data-screen]")),
  mypageNavButton: document.querySelector('[data-screen="mypage"]'),
  mypageSubmenu: document.getElementById("mypageSubmenu"),
  mypageSubmenuItems: Array.from(document.querySelectorAll("[data-mypage-target]")),
  screens: Array.from(document.querySelectorAll(".screen")),
  mypagePages: Array.from(document.querySelectorAll("[data-mypage-page]")),
  settingsTabButtons: Array.from(document.querySelectorAll("[data-settings-tab]")),
  settingsTabPanels: Array.from(document.querySelectorAll("[data-settings-panel]")),
  infoMenuTrigger: document.getElementById("infoMenuTrigger"),
  infoMenuCloseBtn: document.getElementById("infoMenuCloseBtn"),
  infoMenuPanel: document.getElementById("infoMenuPanel"),
  infoMenuUser: document.querySelector("#infoMenuPanel .info-menu-user"),
  infoMenuNickname: document.getElementById("infoMenuNickname"),
  managerMenuLink: document.getElementById("managerMenuLink"),
  managerMount: document.getElementById("managerMount"),
  managerPageTitle: document.querySelector("#screen-manager > .page-title-row .page-script-title"),
  managerReturnToReviewBtn: document.getElementById("managerReturnToReviewBtn"),
  managerMenuButtons: Array.from(document.querySelectorAll("[data-manager-menu-target]")),
  legalInfoDialog: document.getElementById("legalInfoDialog"),
  legalTermsContent: document.getElementById("legalTermsContent"),
  legalPrivacyContent: document.getElementById("legalPrivacyContent"),
  licenseInfoDialog: document.getElementById("licenseInfoDialog"),
  learnActionButtons: Array.from(document.querySelectorAll("[data-learn-action]")),
  reviewCoinBoard: document.getElementById("reviewCoinBoard"),
  calendarMonthLabel: document.getElementById("calendarMonthLabel"),
  calendarPrevMonthBtn: document.getElementById("calendarPrevMonthBtn"),
  calendarNextMonthBtn: document.getElementById("calendarNextMonthBtn"),
  calendarGrid: document.getElementById("calendarGrid"),
  selfcheckTimerDisplay: document.getElementById("selfcheckTimerDisplay"),
  selfcheckTimerMinuteValue: document.getElementById("selfcheckTimerMinuteValue"),
  selfcheckTimerSecondValue: document.getElementById("selfcheckTimerSecondValue"),
  selfcheckTimerAdjustButtons: Array.from(document.querySelectorAll("[data-timer-adjust]")),
  selfcheckTimerStartBtn: document.getElementById("selfcheckTimerStartBtn"),
  selfcheckTimerPauseBtn: document.getElementById("selfcheckTimerPauseBtn"),
  selfcheckTimerResetBtn: document.getElementById("selfcheckTimerResetBtn"),
  selfcheckTimerFullscreenBtn: document.getElementById("selfcheckTimerFullscreenBtn"),
  reviewCoinValue: document.getElementById("reviewCoinValue"),
  mypageCoinValueNumber: document.getElementById("mypageCoinValueNumber"),
  storeAvatarHint: document.getElementById("storeAvatarHint"),
  avaterResetBtn: document.getElementById("avaterResetBtn"),
  avaterScrollLockBtn: document.getElementById("avaterScrollLockBtn"),
  authNicknameText: document.getElementById("authNicknameText"),
  authEmailText: document.getElementById("authEmailText"),
  authPasswordText: document.getElementById("authPasswordText"),
  authPasswordToggleBtn: document.getElementById("authPasswordToggleBtn"),
  authLoginStatusText: document.getElementById("authLoginStatusText"),
  authGoogleStatusText: document.getElementById("authGoogleStatusText"),
  authNicknameRow: document.getElementById("authNicknameRow") ?? document.getElementById("authNicknameText")?.closest(".setting-row") ?? null,
  authEmailRow: document.getElementById("authEmailRow") ?? document.getElementById("authEmailText")?.closest(".setting-row") ?? null,
  authPasswordRow: document.getElementById("authPasswordRow") ?? document.getElementById("authPasswordText")?.closest(".setting-row") ?? null,
  authGoogleRow: document.getElementById("authGoogleRow"),
  settingsEducationCodeStatusText: document.getElementById("settingsEducationCodeStatusText"),
  settingsEducationCodeList: document.getElementById("settingsEducationCodeList"),
  settingsEducationCodeAddBtn: document.getElementById("settingsEducationCodeAddBtn"),
  settingsEducationCodeDialog: document.getElementById("settingsEducationCodeDialog"),
  settingsEducationCodeForm: document.querySelector("#settingsEducationCodeDialog form"),
  settingsEducationCodeInput: document.getElementById("settingsEducationCodeInput"),
  settingsEducationCodeFeedback: document.getElementById("settingsEducationCodeFeedback"),
  settingsEducationCodeSaveBtn: document.getElementById("settingsEducationCodeSaveBtn"),
  settingsEducationCodeStartScanBtn: document.getElementById("settingsEducationCodeStartScanBtn"),
  settingsEducationCodeStopScanBtn: document.getElementById("settingsEducationCodeStopScanBtn"),
  settingsEducationCodeScanner: document.getElementById("settingsEducationCodeScanner"),
  settingsEducationCodeVideo: document.getElementById("settingsEducationCodeVideo"),
  settingsEducationCodeActionButtons: Array.from(document.querySelectorAll("[data-settings-education-code-action]")),
  settingsEducationCodeRemoveDialog: document.getElementById("settingsEducationCodeRemoveDialog"),
  settingsEducationCodeRemoveDialogMessage: document.getElementById("settingsEducationCodeRemoveDialogMessage"),
  settingsEducationCodeRemoveActionButtons: Array.from(
    document.querySelectorAll("[data-settings-education-code-remove-action]")
  ),
  authLoginButtons: Array.from(document.querySelectorAll("[data-auth-provider]")),
  authConfigHint: document.getElementById("authConfigHint"),
  accountEditBtn: document.getElementById("accountEditBtn"),
  accountEditRow: document.getElementById("accountEditBtn")?.closest(".setting-row") ?? null,
  accountEditDialog: document.getElementById("accountEditDialog"),
  accountEditForm: document.querySelector("#accountEditDialog form"),
  accountEditNicknameOption: document.getElementById("accountEditNicknameOption"),
  accountEditEmailOption: document.getElementById("accountEditEmailOption"),
  accountEditPasswordOption: document.getElementById("accountEditPasswordOption"),
  accountEditGoogleOption: document.getElementById("accountEditGoogleOption"),
  accountEditNicknameInput: document.getElementById("accountEditNicknameInput"),
  accountEditEmailInput: document.getElementById("accountEditEmailInput"),
  accountEditPasswordInput: document.getElementById("accountEditPasswordInput"),
  accountEditPasswordToggleBtn: document.getElementById("accountEditPasswordToggleBtn"),
  accountEditGoogleStatusText: document.getElementById("accountEditGoogleStatusText"),
  accountEditGoogleActionBtn: document.getElementById("accountEditGoogleActionBtn"),
  accountEditNicknameFeedback: document.getElementById("accountEditNicknameFeedback"),
  accountEditNicknameSaveBtn: document.getElementById("accountEditNicknameSaveBtn"),
  accountEditActionButtons: Array.from(document.querySelectorAll("[data-account-edit-action]")),
  logoutBtn: document.getElementById("logoutBtn"),
  deleteAccountBtn: document.getElementById("deleteAccountBtn"),
  accountActionRow: document.getElementById("logoutBtn")?.closest(".setting-row") ?? null,
  themeCardList: document.getElementById("themeCardList"),
  themeCards: Array.from(document.querySelectorAll("[data-theme-choice]")),
  reviewDataExportBtn: document.getElementById("reviewDataExportBtn"),
  reviewDataImportBtn: document.getElementById("reviewDataImportBtn"),
  reviewDataImportInput: document.getElementById("reviewDataImportInput"),
  avaterPreviews: Array.from(document.querySelectorAll("[data-avater-preview]")),
  navCharacter: document.querySelector(".top-nav-character"),
  avaterNudgeButtons: Array.from(document.querySelectorAll("[data-avater-nudge]")),
  loginAvaterItemList: document.getElementById("loginAvaterItemList"),
  guestModeDialog: document.getElementById("guestModeDialog"),
  guestModeActionButtons: Array.from(document.querySelectorAll("[data-guest-mode-action]")),
  accountActionDialog: document.getElementById("accountActionDialog"),
  accountActionDialogTitle: document.getElementById("accountActionDialogTitle"),
  accountActionDialogMessage: document.getElementById("accountActionDialogMessage"),
  accountActionConfirmBtn: document.getElementById("accountActionConfirmBtn"),
  accountActionExportBtn: document.getElementById("accountActionExportBtn"),
  accountActionButtons: Array.from(document.querySelectorAll("[data-account-action]")),
  themeUnlockDialog: document.getElementById("themeUnlockDialog"),
  themeUnlockName: document.getElementById("themeUnlockName"),
  themeUnlockCost: document.getElementById("themeUnlockCost"),
  themeUnlockCurrentCoin: document.getElementById("themeUnlockCurrentCoin"),
  themeUnlockAfterCoin: document.getElementById("themeUnlockAfterCoin"),
  themeUnlockActionButtons: Array.from(document.querySelectorAll("[data-theme-unlock-action]")),
  homeGreeting: document.getElementById("homeGreeting"),
  learnScreen: document.getElementById("screen-learn"),
  learnGreetingMessage: document.getElementById("learnGreetingMessage"),
  learnScheduleList: document.getElementById("learnScheduleList"),
  learnTimerOpenBtn: document.getElementById("learnTimerOpenBtn"),
  homeCardTrack: document.getElementById("homeCardTrack"),
  homeCardSlides: Array.from(document.querySelectorAll("#homeCardTrack .home-card-slide")),
  homeCardNavButtons: Array.from(document.querySelectorAll("[data-home-card-nav]")),
  homeCardCarousel: document.querySelector(".home-card-carousel"),
  homeCardProgress: document.getElementById("homeCardProgress"),
  homeCardProgressDots: Array.from(document.querySelectorAll("#homeCardProgress .home-card-progress-dot")),
  homeFlashcardSlot: document.getElementById("homeFlashcardSlot"),
  mypageCardSlot: document.getElementById("mypageCardSlot"),
  dailyLoginCard: document.getElementById("dailyLoginCard"),
  dailyLoginCount: document.getElementById("dailyLoginCount"),
  dailyLoginScale: document.getElementById("dailyLoginScale"),
  dailyLoginScaleNumbers: Array.from(document.querySelectorAll("#dailyLoginScale li")),
  dailyLoginTrack: document.querySelector(".daily-login-track"),
  dailyLoginProgressFill: document.getElementById("dailyLoginProgressFill"),
  dailyLoginRewards: document.getElementById("dailyLoginRewards"),
  dailyLoginPrevOuterNode: document.getElementById("dailyLoginPrevOuterNode"),
  dailyLoginPrevFarNode: document.getElementById("dailyLoginPrevFarNode"),
  dailyLoginPrevNearNode: document.getElementById("dailyLoginPrevNearNode"),
  dailyLoginCurrentNode: document.getElementById("dailyLoginCurrentNode"),
  dailyLoginNextNearNode: document.getElementById("dailyLoginNextNearNode"),
  dailyLoginNextFarNode: document.getElementById("dailyLoginNextFarNode"),
  dailyLoginNextOuterNode: document.getElementById("dailyLoginNextOuterNode"),
  dailyTryPrompt: document.getElementById("dailyTryPrompt"),
  dailyTryPanel: document.querySelector(".daily-try-panel.home-card-slide"),
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
let auth0SdkLoadPromise = null;
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
let isLearnPopoverOpen = false;
let pendingGuestModeAppState = null;
let pendingAuthLoginRequiredAppState = null;
let pendingAccountAction = null;
let pendingThemeUnlockKey = null;
let isReviewCoinMenuOpen = false;
let reviewCoinMenuMode = "theme";
let reviewCoinMenuSelection = { type: "theme", id: state.settings.theme };
let managerMigrationPromise = null;
let accountActionCountdownTimerId = 0;
let accountActionCountdownRemainingSeconds = 0;
let isSavingAccountEditNickname = false;
let isAccountPasswordVisible = true;
let isAccountEditPasswordVisible = false;
let settingsEducationCodeEditingCode = "";
let pendingSettingsEducationCodeRemovalCode = "";
let settingsEducationCodeScanStream = null;
let settingsEducationCodeScanFrameId = 0;
let settingsEducationCodeScanActive = false;
let settingsEducationCodeDetector = null;
let settingsEducationCodeValidationTimerId = 0;
let settingsEducationCodeValidationRequestId = 0;
let legalInfoContentLoaded = false;
let settingsEducationCodeValidationState = {
  value: "",
  isValid: true,
  message: "",
  schoolName: "",
  status: "",
};
const pendingEducationCodeDetailRequests = new Set();
const completedEducationCodeDetailRequests = new Set();
let managerAccessState = loadManagerAccessCache();
let lastReviewAccountProfileSync = null;
let reviewDataSyncTimerId = 0;
let reviewDataSyncInFlight = null;
let reviewDataSyncQueued = false;
let reviewDataCloudPullCompleted = false;
let isApplyingRemoteReviewData = false;
let lastReviewDataCloudRefreshAt = 0;
let activeAvaterCategory = "clothes";
let activeLearnAvaterCategory = "";
let isAvaterScrollLocked = false;
let draggingAvaterItemId = "";
let avaterLayerDragState = null;
let avaterLayerClickSuppressUntil = 0;
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
const AUTH_LOGOUT_INTENT_STORAGE_KEY = "the-review-explicit-logout-v1";
const AUTH_LOCAL_LOGOUT_REQUEST_STORAGE_KEY = "the-review-auth-local-logout-request-v1";
const LOGIN_ONBOARDING_STEP_IDS = ["welcome", "terms", "auth", "nickname", "educationCode", "avatar"];
const AUTH_INIT_TIMEOUT_RESULT = Object.freeze({ timedOut: true, appState: null });
const ACCOUNT_ACTION_DIALOG_COPY = {
  logout: {
    title: "ログアウト",
    message: "ログイン画面に戻ります。続行しますか？",
    confirmClass: "primary",
    confirmText: "はい",
  },
  guestLogout: {
    title: "ログアウト",
    message: "ログアウトすると、ご利用になったデータが消えてしまうことがあります。続行しますか？",
    confirmClass: "danger",
    confirmText: "はい",
  },
  delete: {
    title: "Review Accountを削除する",
    message: "Review Dataはクラウド上から削除されます。続行しますか？",
    confirmClass: "danger",
    confirmText: "はい",
  },
};
const IS_LOGIN_PAGE = isCurrentLoginPage();
let isNavigationRedirectPending = false;

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
  syncViewportWidthForLayout();
  const isAuthCallback = hasAuth0CallbackParams();
  const shouldWaitForAuth = isAuthCallback || !state.auth.isLoggedIn;
  const authInitialization = initializeAuth(shouldWaitForAuth ? {} : { preserveExistingSession: true });
  let authRedirectAppState = null;
  if (isAuthCallback) {
    authRedirectAppState = await authInitialization;
  } else if (shouldWaitForAuth) {
    authRedirectAppState = await withTimeout(authInitialization, AUTH_INIT_TIMEOUT_MS, null, "Auth initialization");
  }
  if (!shouldWaitForAuth) {
    authInitialization
      .then((appState) => {
        const onboardingStep = normalizeLoginOnboardingStep(appState?.onboardingStep);
        if (onboardingStep) {
          requestLoginOnboardingStep(onboardingStep);
          redirectToLoginPage({ onboardingStep });
          return;
        }
        renderMypageSettings();
        renderAuthPanel();
        void updateManagerMenuVisibility();
      })
      .catch((error) => {
        console.warn("Background auth initialization failed:", error);
      });
  }
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
  bindReviewDataCloudRefreshEvents();
  applyTheme(state.settings.theme);
  relocateMypageCards();
  injectTabScriptLabels();
  bindBeforeUnloadPrompt();
  markDailyLogin();
  bindEvents();
  startHomeGreetingTicker();
  renderAll();
  activateScreen(activeScreen);
  void updateManagerMenuVisibility();
  void initializeFlashcardsAfterFirstPaint();
}

function syncViewportWidthForLayout() {
  const width = Math.max(0, Math.round(window.innerWidth || document.documentElement.clientWidth || 0));
  document.documentElement.style.setProperty("--review-viewport-width", `${width}px`);
}

async function initLoginPage() {
  syncViewportWidthForLayout();
  const isAuthCallback = hasAuth0CallbackParams();
  const requestedOnboardingStep = getRequestedLoginOnboardingStep();
  const explicitLogout = consumeExplicitLogoutIntent();
  const shouldClearAuth0LocalSession = consumeAuth0LocalLogoutRequest();
  if (state.auth.isLoggedIn && !isAuthCallback && !requestedOnboardingStep && !explicitLogout) {
    redirectToIndexPage();
    return;
  }

  bindSharedDataAndGuestDialogEvents();
  bindReviewDataCloudRefreshEvents();
  bindLoginPageAuthEvents();
  let authRedirectAppState = null;
  let authInitializationTimedOut = false;
  if (explicitLogout && !isAuthCallback) {
    initializeAuth0AfterExplicitLogout({ clearLocalSession: shouldClearAuth0LocalSession });
  } else {
    const authInitialization = initializeAuth();
    const authInitializationResult = await withTimeout(
      authInitialization.then((appState) => ({
        timedOut: false,
        appState,
      })),
      AUTH_INIT_TIMEOUT_MS,
      AUTH_INIT_TIMEOUT_RESULT,
      "Auth initialization"
    );
    if (authInitializationResult?.timedOut) {
      authInitializationTimedOut = true;
      authInitialization
        .then((appState) => {
          completeLoginPageAuthInitialization({
            appState,
            isAuthCallback,
            requestedOnboardingStep,
            explicitLogout,
          });
        })
        .catch((error) => {
          console.warn("Background login auth initialization failed:", error);
        });
    } else {
      authRedirectAppState = authInitializationResult?.appState ?? null;
    }
  }
  if (authInitializationTimedOut) {
    renderAuthPanel();
    renderAvater();
    return;
  }
  completeLoginPageAuthInitialization({
    appState: authRedirectAppState,
    isAuthCallback,
    requestedOnboardingStep,
    explicitLogout,
  });
}

function completeLoginPageAuthInitialization(options = {}) {
  if (isNavigationRedirectPending) {
    return;
  }
  const isAuthCallback = Boolean(options.isAuthCallback);
  const requestedOnboardingStep = normalizeLoginOnboardingStep(options.requestedOnboardingStep);
  const explicitLogout = Boolean(options.explicitLogout);
  const returnedToExistingReviewAccount =
    isAuthCallback &&
    state.auth.isLoggedIn &&
    state.auth.provider !== "guest" &&
    lastReviewAccountProfileSync?.isNewReviewAccount === false;
  const nextOnboardingStep = returnedToExistingReviewAccount
    ? ""
    : normalizeLoginOnboardingStep(options.appState?.onboardingStep) || requestedOnboardingStep;
  if (nextOnboardingStep) {
    requestLoginOnboardingStep(nextOnboardingStep);
  }
  renderAuthPanel();
  renderAvater();

  if (state.auth.isLoggedIn && !explicitLogout) {
    if (nextOnboardingStep) {
      return;
    }
    redirectToIndexPage();
  }
}

async function initializeFlashcardsAfterFirstPaint() {
  setFlashcardNoteLibraryLoadingState(true);
  await new Promise((resolve) => window.requestAnimationFrame(resolve));
  const initialization = initializeFlashcards();
  const didInitialize = await withTimeout(
    initialization
      .then(() => true)
      .catch((error) => {
        console.warn("Flashcard initialization failed:", error);
        return true;
      }),
    FLASHCARD_INIT_TIMEOUT_MS,
    false,
    "Flashcard initialization"
  );
  finishFlashcardInitialization();
  if (!didInitialize) {
    initialization
      .then(() => {
        finishFlashcardInitialization({ preserveScroll: true });
      })
      .catch((error) => {
        console.warn("Background flashcard initialization failed:", error);
      });
  }
}

function setFlashcardNoteLibraryLoadingState(isLoading) {
  const binderList = elements.flashcardBinderList;
  if (!binderList) {
    return;
  }
  binderList.classList.toggle("is-loading-data", Boolean(isLoading));
  syncFlashcardNoteLibraryEmptyState(binderList, false);
  if (!isLoading) {
    return;
  }
  Array.from(binderList.querySelectorAll(".flashcard-note, .flashcard-series-index")).forEach((item) => {
    item.hidden = true;
    item.setAttribute("aria-hidden", "true");
  });
}

function syncFlashcardNoteLibraryEmptyState(binderList, shouldShow) {
  if (!binderList) {
    return;
  }
  let emptyState = binderList.querySelector(".flashcard-note-empty-state");
  if (shouldShow && !emptyState) {
    emptyState = document.createElement("div");
    emptyState.className = "flashcard-note-empty-state";
    emptyState.setAttribute("role", "status");
    emptyState.innerHTML = `
      <img src="./assets/icons/404.png" alt="" aria-hidden="true" />
      <p>
        <strong>問題データを読みこめませんでした</strong>
        <span>アプリを再読みこみしてください</span>
      </p>
    `;
    binderList.append(emptyState);
  }
  binderList.classList.toggle("is-empty-state", Boolean(shouldShow));
  if (emptyState) {
    emptyState.hidden = !shouldShow;
    emptyState.setAttribute("aria-hidden", String(!shouldShow));
  }
}

function finishFlashcardInitialization(options = {}) {
  setFlashcardNoteLibraryLoadingState(false);
  initializeFlashcardNoteBinder();
  refreshFlashcardNoteBinderMetrics();
  if (!options.preserveScroll) {
    resetFlashcardBinderScroll();
  }
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
  isNavigationRedirectPending = true;
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
  isNavigationRedirectPending = true;
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

function markExplicitLogoutIntent() {
  try {
    window.sessionStorage.setItem(AUTH_LOGOUT_INTENT_STORAGE_KEY, "1");
  } catch {
    // noop
  }
}

function consumeExplicitLogoutIntent() {
  try {
    const hasIntent = window.sessionStorage.getItem(AUTH_LOGOUT_INTENT_STORAGE_KEY) === "1";
    window.sessionStorage.removeItem(AUTH_LOGOUT_INTENT_STORAGE_KEY);
    return hasIntent;
  } catch {
    return false;
  }
}

function requestAuth0LocalLogout() {
  try {
    window.sessionStorage.setItem(AUTH_LOCAL_LOGOUT_REQUEST_STORAGE_KEY, "1");
  } catch {
    // noop
  }
}

function consumeAuth0LocalLogoutRequest() {
  try {
    const hasRequest = window.sessionStorage.getItem(AUTH_LOCAL_LOGOUT_REQUEST_STORAGE_KEY) === "1";
    window.sessionStorage.removeItem(AUTH_LOCAL_LOGOUT_REQUEST_STORAGE_KEY);
    return hasRequest;
  } catch {
    return false;
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
          onboardingStep: "educationCode",
          deferRedirectOnLoginPage: true,
        });
        return;
      }
      if (button.dataset.authReturn === "index") {
        clearRequestedLoginOnboardingStep();
        await loginWithAuth0(
          {
            targetScreen: "home",
          },
          { provider, screenHint: "" }
        );
        return;
      }
      await loginWithAuth0(
        {
          onboardingStep: "nickname",
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
  [elements.loginAvaterItemList, elements.storeAvatarHint].forEach((list) => {
    list?.addEventListener("click", (event) => {
      const categoryTarget = event.target.closest("[data-avater-category]");
      if (categoryTarget) {
        activeAvaterCategory = normalizeAvaterCategory(categoryTarget.dataset.avaterCategory) || activeAvaterCategory;
        renderAvater();
        return;
      }
      const noneTarget = event.target.closest("[data-avater-none-category]");
      if (noneTarget) {
        handleAvaterNoneAction(noneTarget.dataset.avaterNoneCategory || "");
        return;
      }
      const target = event.target.closest("[data-avater-item]");
      if (!target || target.hasAttribute("disabled")) {
        return;
      }
      handleAvaterItemAction(target.dataset.avaterItem || "");
    });
    list?.addEventListener("dragstart", (event) => {
      const target = event.target.closest("[data-avater-item]");
      if (!target || target.getAttribute("aria-disabled") === "true") {
        event.preventDefault();
        return;
      }
      draggingAvaterItemId = target.dataset.avaterItem || "";
      event.dataTransfer.effectAllowed = "copy";
      event.dataTransfer.setData("text/plain", draggingAvaterItemId);
    });
  });
  elements.avaterPreviews.forEach((preview) => {
    preview.addEventListener("dragover", (event) => {
      if (!draggingAvaterItemId) {
        return;
      }
      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
    });
    preview.addEventListener("drop", (event) => {
      event.preventDefault();
      const itemId = event.dataTransfer.getData("text/plain") || draggingAvaterItemId;
      draggingAvaterItemId = "";
      handleAvaterItemAction(itemId, { forceEquip: true });
    });
    preview.addEventListener("pointerdown", handleAvaterLayerPointerDown);
    preview.addEventListener("pointermove", handleAvaterLayerPointerMove);
    preview.addEventListener("pointerup", finishAvaterLayerPointerDrag);
    preview.addEventListener("pointercancel", finishAvaterLayerPointerDrag);
    preview.addEventListener("click", handleAvaterPreviewClick);
  });
  if (elements.avaterResetBtn) {
    elements.avaterResetBtn.addEventListener("click", resetAvaterOffsets);
  }
  if (elements.avaterScrollLockBtn) {
    elements.avaterScrollLockBtn.addEventListener("click", toggleAvaterScrollLock);
  }
  elements.guestModeActionButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      handleGuestModeDialogAction(button.dataset.guestModeAction);
    });
  });
  elements.accountActionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleAccountActionDialogAction(button.dataset.accountAction);
    });
  });
  elements.accountActionDialog?.addEventListener("cancel", () => {
    clearAccountDeleteCountdown();
    pendingAccountAction = null;
  });
  elements.accountActionDialog?.addEventListener("close", () => {
    clearAccountDeleteCountdown();
  });
}

function bindReviewDataCloudRefreshEvents() {
  window.addEventListener("focus", requestReviewDataCloudRefresh);
  window.addEventListener("online", requestReviewDataCloudRefresh);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      requestReviewDataCloudRefresh();
    }
  });
}

function requestReviewDataCloudRefresh() {
  if (!canSyncReviewDataToCloud() || document.visibilityState === "hidden") {
    return;
  }
  const now = Date.now();
  if (now - lastReviewDataCloudRefreshAt < REVIEW_DATA_SYNC_REFRESH_MIN_MS) {
    return;
  }
  lastReviewDataCloudRefreshAt = now;
  void syncReviewDataWithCloud({ reason: "refresh" });
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

function relocateMypageCards() {
  if (elements.homeFlashcardSlot && elements.mypageFlashcardPanel?.parentElement !== elements.homeFlashcardSlot) {
    elements.homeFlashcardSlot.append(elements.mypageFlashcardPanel);
  }
  if (elements.mypageCardSlot && elements.homeCardCarousel?.parentElement !== elements.mypageCardSlot) {
    elements.mypageCardSlot.append(elements.homeCardCarousel);
  }
}

function getHomeCardSlides() {
  const slides =
    elements.homeCardSlides.length > 0
      ? elements.homeCardSlides
      : Array.from(elements.homeCardTrack?.querySelectorAll(".home-card-slide") ?? []);
  return slides.filter((slide) => !slide.hidden);
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
    dot.hidden = index >= slides.length;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-current", isActive ? "step" : "false");
  });

  if (elements.homeCardProgress) {
    elements.homeCardProgress.hidden = slides.length <= 1;
  }

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
  elements.homeCardCarousel.classList.remove("is-daily-try-unanswered");
}

function injectTabScriptLabels() {
  const panelsWithLabels = [
    {
      selector: "#screen-login .auth-panel",
      label: "Login",
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

  const storeSections = Array.from(document.querySelectorAll("#screen-notice .settings-section"));
  const storeLabels = ["Number of Review Coins", "Avater", "Color Schemes"];
  storeLabels.forEach((label, index) => {
    appendTabScriptLabel(storeSections[index] ?? null, label);
  });

  const settingsSections = Array.from(document.querySelectorAll("#screen-settings .settings-section"));
  const settingsLabels = ["Review Account", "Education Code", "Review Data", "App Version"];
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
  if (isNavigationRedirectPending) {
    return;
  }
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

function bindBeforeUnloadPrompt() {
  window.onbeforeunload = null;
}

function bindEvents() {
  window.addEventListener("resize", syncViewportWidthForLayout);
  window.visualViewport?.addEventListener("resize", syncViewportWidthForLayout);

  window.addEventListener("the-review-manager-screen-change", (event) => {
    updateManagerHostTitle(event.detail?.screen);
  });

  if (elements.infoMenuTrigger) {
    elements.infoMenuTrigger.addEventListener("click", toggleInfoMenu);
  }
  if (elements.infoMenuCloseBtn) {
    elements.infoMenuCloseBtn.addEventListener("click", closeInfoMenu);
  }

  if (elements.reviewCoinBoard) {
    elements.reviewCoinBoard.addEventListener("click", toggleReviewCoinMenu);
    elements.reviewCoinBoard.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }
      event.preventDefault();
      toggleReviewCoinMenu();
    });
  }

  elements.navButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const screen = button.dataset.screen;
      if (!screen) {
        return;
      }
      if (screen === "learn") {
        toggleLearnPopover();
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
      if (screen === "manager" && (!state.auth.isLoggedIn || state.auth.provider === "guest")) {
        showAuthLoginRequiredDialog({
          targetScreen: "manager",
          onboardingStep: "nickname",
        });
        return;
      }
      if (screen === "manager" && !managerAccessState) {
        await updateManagerMenuVisibility();
        if (!managerAccessState) {
          showAuthLoginRequiredDialog({
            targetScreen: "manager",
            onboardingStep: "nickname",
          });
          return;
        }
      }
      activateScreen(screen);
      if (screen === "mypage") {
        setMypagePage("top");
      }
    });
  });

  elements.managerMenuButtons.forEach((button) => {
    button.addEventListener("click", () => {
      void navigateManagerHostScreen(button.dataset.managerMenuTarget || "home");
    });
  });

  elements.managerReturnToReviewBtn?.addEventListener("click", () => {
    activateScreen("mypage");
    setMypagePage("top");
  });

  if (elements.navCharacter instanceof HTMLElement) {
    elements.navCharacter.removeAttribute("aria-hidden");
    elements.navCharacter.setAttribute("role", "button");
    elements.navCharacter.setAttribute("tabindex", "0");
    elements.navCharacter.setAttribute("aria-label", "らーん");
    const activateNavCharacter = (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleLearnPopover();
    };
    elements.navCharacter.addEventListener("click", activateNavCharacter);
    elements.navCharacter.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }
      activateNavCharacter(event);
    });
  }

  elements.learnActionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleLearnMenuAction(button.dataset.learnAction);
    });
  });
  elements.learnScreen?.addEventListener("click", handleLearnAvaterDockClick);

  document.querySelectorAll("[data-legal-dialog-action]").forEach((button) => {
    button.addEventListener("click", () => {
      elements.legalInfoDialog?.close();
    });
  });

  document.querySelectorAll("[data-license-dialog-action]").forEach((button) => {
    button.addEventListener("click", () => {
      elements.licenseInfoDialog?.close();
    });
  });

  elements.settingsTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setSettingsTab(button.dataset.settingsTab);
    });
    button.addEventListener("keydown", handleSettingsTabKeydown);
  });

  elements.settingsEducationCodeAddBtn?.addEventListener("click", openSettingsEducationCodeDialog);
  elements.settingsEducationCodeList?.addEventListener("click", (event) => {
    const source = event.target instanceof Element ? event.target : null;
    if (!source) {
      return;
    }
    const menuButton = source.closest("[data-education-code-menu]");
    if (menuButton) {
      toggleSettingsEducationCodeMenu(menuButton.dataset.educationCodeMenu || "");
      return;
    }
    const editTarget = source.closest("[data-education-code-edit]");
    if (editTarget) {
      closeSettingsEducationCodeMenus();
      openSettingsEducationCodeDialog({ code: editTarget.dataset.educationCodeEdit || "" });
      return;
    }
    const removeTarget = source.closest("[data-education-code-remove]");
    if (removeTarget) {
      closeSettingsEducationCodeMenus();
      requestRemoveSettingsEducationCode(removeTarget.dataset.educationCodeRemove || "");
    }
  });
  document.addEventListener("click", (event) => {
    const source = event.target instanceof Element ? event.target : null;
    if (!source?.closest(".education-code-menu-wrap")) {
      closeSettingsEducationCodeMenus();
    }
  });
  elements.settingsEducationCodeInput?.addEventListener("input", handleSettingsEducationCodeInput);
  elements.settingsEducationCodeSaveBtn?.addEventListener("click", () => {
    void saveSettingsEducationCode();
  });
  elements.settingsEducationCodeForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    void saveSettingsEducationCode();
  });
  elements.settingsEducationCodeStartScanBtn?.addEventListener("click", () => {
    void startSettingsEducationCodeScanner();
  });
  elements.settingsEducationCodeStopScanBtn?.addEventListener("click", stopSettingsEducationCodeScanner);
  elements.settingsEducationCodeActionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.settingsEducationCodeAction === "close") {
        closeSettingsEducationCodeDialog();
      }
    });
  });
  elements.settingsEducationCodeRemoveActionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleSettingsEducationCodeRemoveDialogAction(button.dataset.settingsEducationCodeRemoveAction);
    });
  });
  elements.settingsEducationCodeRemoveDialog?.addEventListener("cancel", () => {
    pendingSettingsEducationCodeRemovalCode = "";
  });
  elements.settingsEducationCodeRemoveDialog?.addEventListener("close", () => {
    pendingSettingsEducationCodeRemovalCode = "";
  });
  elements.settingsEducationCodeDialog?.addEventListener("cancel", handleSettingsEducationCodeDialogClose);
  elements.settingsEducationCodeDialog?.addEventListener("close", handleSettingsEducationCodeDialogClose);
  window.addEventListener("beforeunload", stopSettingsEducationCodeScanner);

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
          onboardingStep: "nickname",
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
      recordActiveFlashcardProgress();
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
  if (elements.learnTimerOpenBtn) {
    elements.learnTimerOpenBtn.addEventListener("click", openLearnTimerPage);
  }

  if (elements.logoutBtn) {
    elements.logoutBtn.addEventListener("click", logoutAccount);
  }

  if (elements.accountEditBtn) {
    elements.accountEditBtn.addEventListener("click", handleAccountEditButtonClick);
  }

  [
    elements.accountEditNicknameInput,
    elements.accountEditEmailInput,
    elements.accountEditPasswordInput,
  ].forEach((input) => {
    input?.addEventListener("input", () => {
      setAccountEditNicknameFeedback("", "");
      syncAccountEditNicknameSaveButton();
    });
  });

  elements.authPasswordToggleBtn?.addEventListener("click", () => {
    isAccountPasswordVisible = !isAccountPasswordVisible;
    renderMypageSettings();
  });

  elements.accountEditPasswordToggleBtn?.addEventListener("click", () => {
    isAccountEditPasswordVisible = !isAccountEditPasswordVisible;
    syncAccountPasswordToggle(elements.accountEditPasswordToggleBtn, isAccountEditPasswordVisible, "編集用パスワード");
    if (elements.accountEditPasswordInput) {
      elements.accountEditPasswordInput.type = isAccountEditPasswordVisible ? "text" : "password";
    }
  });

  elements.accountEditNicknameInput?.addEventListener("change", () => {
    setAccountEditNicknameFeedback("", "");
    syncAccountEditNicknameSaveButton();
  });

  elements.accountEditForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!elements.accountEditNicknameSaveBtn?.disabled) {
      void saveAccountEditProfile();
    }
  });

  elements.accountEditActionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      void handleAccountEditAction(button.dataset.accountEditAction);
    });
  });

  if (elements.deleteAccountBtn) {
    elements.deleteAccountBtn.addEventListener("click", deleteAccountAndResetProgress);
  }

  elements.themeCards.forEach((card) => {
    card.addEventListener("click", () => {
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

  if (elements.selfcheckTimerStartBtn) {
    elements.selfcheckTimerStartBtn.addEventListener("click", startSelfcheckTimer);
  }
  if (elements.selfcheckTimerPauseBtn) {
    elements.selfcheckTimerPauseBtn.addEventListener("click", pauseSelfcheckTimer);
  }
  if (elements.selfcheckTimerResetBtn) {
    elements.selfcheckTimerResetBtn.addEventListener("click", resetSelfcheckTimer);
  }
  elements.selfcheckTimerAdjustButtons.forEach((button) => {
    button.addEventListener("click", () => {
      adjustSelfcheckTimer(button.dataset.timerAdjust || "");
    });
  });
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

    const reviewCoinMenu = document.getElementById("reviewCoinMenu");
    const clickedInsideReviewCoinMenu = reviewCoinMenu?.contains(event.target);
    const clickedReviewCoinBoard = elements.reviewCoinBoard?.contains(event.target);
    if (isReviewCoinMenuOpen && !clickedInsideReviewCoinMenu && !clickedReviewCoinBoard) {
      closeReviewCoinMenu();
    }

    const clickedInsideLearn = elements.learnScreen?.contains(event.target);
    const clickedLearnButton = event.target instanceof Element && Boolean(event.target.closest('[data-screen="learn"]'));
    const clickedLearnCharacter =
      event.target instanceof Element &&
      Boolean(event.target.closest(".top-nav-character, .flashcard-note-reader-avatar"));
    if (isLearnPopoverOpen && !clickedInsideLearn && !clickedLearnButton && !clickedLearnCharacter) {
      closeLearnPopover();
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
      closeLearnPopover();
      closeReviewCoinMenu();
      if (isFlashcardFocusMode || isSelfcheckTimerFocusMode) {
        setFlashcardFocusMode(false);
        setSelfcheckTimerFocusMode(false);
      }
    }
  });

  window.addEventListener("resize", () => {
    renderDailyLogin();
    updateHomeCardCarouselControls();
    if (isReviewCoinMenuOpen) {
      syncReviewCoinMenuGeometry();
    }
    if (activeFlashcardNotebookState?.note && isFlashcardDirectNoteMode()) {
      setFlashcardDirectNotebookGeometry(activeFlashcardNotebookState.note);
    }
  });

  window.addEventListener("storage", (event) => {
    if (event.key === STORE_CONFIG_KEY) {
      renderStoreConfig();
    }
  });
}

function toggleLearnPopover() {
  if (isLearnPopoverOpen) {
    closeLearnPopover();
    return;
  }
  openLearnPopover();
}

function openLearnPopover() {
  if (!elements.learnScreen) {
    return;
  }
  closeReviewCoinMenu();
  isLearnPopoverOpen = true;
  document.body.classList.remove("learn-timer-page-open");
  document.body.classList.add("learn-popover-open");
  elements.learnScreen.classList.add("is-active");
  elements.navButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.screen === "learn");
  });
  closeInfoMenu();
  closeMypageSubmenu();
  renderLearnOverview();
  renderSelfcheckCalendar();
}

function closeLearnPopover() {
  if (!isLearnPopoverOpen) {
    return;
  }
  isLearnPopoverOpen = false;
  document.body.classList.remove("learn-popover-open");
  if (activeScreen !== "learn") {
    elements.learnScreen?.classList.remove("is-active");
  }
  elements.navButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.screen === activeScreen);
  });
}

async function handleLearnMenuAction(action) {
  const normalizedAction = typeof action === "string" ? action.trim().toLowerCase() : "";
  if (normalizedAction === "mypage") {
    closeLearnPopover();
    if (!state.auth.isLoggedIn) {
      promptLoginForMypage();
      return;
    }
    activateScreen("mypage");
    setMypagePage("top");
    return;
  }
  if (normalizedAction === "settings") {
    closeLearnPopover();
    activateScreen("settings");
    return;
  }
  if (normalizedAction === "manager") {
    closeLearnPopover();
    if (!state.auth.isLoggedIn || state.auth.provider === "guest") {
      showAuthLoginRequiredDialog({
        targetScreen: "manager",
        onboardingStep: "nickname",
      });
      return;
    }
    if (!managerAccessState) {
      await updateManagerMenuVisibility();
      if (!managerAccessState) {
        showAuthLoginRequiredDialog({
          targetScreen: "manager",
          onboardingStep: "nickname",
        });
        return;
      }
    }
    activateScreen("manager");
    return;
  }
  if (normalizedAction === "legal") {
    closeLearnPopover();
    openLegalInfoDialog();
    return;
  }
  if (normalizedAction === "licenses") {
    closeLearnPopover();
    openLicenseInfoDialog();
  }
}

function openLegalInfoDialog() {
  void populateLegalInfoDialog();
  openAppDialog(elements.legalInfoDialog, () => {
    window.alert("利用規約・プライバシーポリシーを表示できませんでした。");
  });
}

function openLicenseInfoDialog() {
  openAppDialog(elements.licenseInfoDialog, () => {
    window.alert("ライセンス・謝辞を表示できませんでした。");
  });
}

function openAppDialog(dialog, fallback) {
  if (!dialog || typeof dialog.showModal !== "function") {
    fallback?.();
    return;
  }
  if (!dialog.open) {
    dialog.showModal();
  }
}

async function populateLegalInfoDialog() {
  if (legalInfoContentLoaded) {
    return;
  }
  legalInfoContentLoaded = true;
  await Promise.all([
    populateLegalInfoPanel(elements.legalTermsContent, "./terms.txt"),
    populateLegalInfoPanel(elements.legalPrivacyContent, "./privacy-policy.txt"),
  ]);
}

async function populateLegalInfoPanel(panel, src) {
  if (!panel) {
    return;
  }
  try {
    const response = await fetch(src, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load ${src}`);
    }
    const text = await response.text();
    panel.innerHTML = renderLegalInfoDocument(text);
  } catch {
    panel.innerHTML = "<p>文書の読み込みに失敗しました。</p>";
  }
}

function renderLegalInfoDocument(text) {
  const normalized = String(text || "").replace(/\r\n?/g, "\n").trim();
  if (!normalized) {
    return "<p>文書がありません。</p>";
  }
  return normalized
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br />")}</p>`)
    .join("");
}

function createManagerDocumentFacade(root) {
  const scopedGetElementById = (id) => root.querySelector(`#${cssEscape(id)}`);
  const scopedQuerySelector = (selector) => root.querySelector(selector);
  const scopedQuerySelectorAll = (selector) => root.querySelectorAll(selector);
  return new Proxy(document, {
    get(target, property) {
      if (property === "body") {
        return root;
      }
      if (property === "getElementById") {
        return scopedGetElementById;
      }
      if (property === "querySelector") {
        return scopedQuerySelector;
      }
      if (property === "querySelectorAll") {
        return scopedQuerySelectorAll;
      }
      if (property === "addEventListener") {
        return root.addEventListener.bind(root);
      }
      if (property === "removeEventListener") {
        return root.removeEventListener.bind(root);
      }
      if (property === "activeElement") {
        return root.contains(target.activeElement) ? target.activeElement : null;
      }
      const value = target[property];
      return typeof value === "function" ? value.bind(target) : value;
    },
  });
}

function publishManagerAccessForMigratedManager() {
  const access = managerAccessState ? normalizeManagerAccessPayload(managerAccessState) : null;
  window.__THE_REVIEW_MANAGER_ACCESS__ = access;
  try {
    window.dispatchEvent(new CustomEvent("the-review-manager-access", { detail: access }));
  } catch {
    // noop
  }
}

function getManagerMigratedStyleText(parsedDocument) {
  return Array.from(parsedDocument.querySelectorAll("style"))
    .map((style) => style.textContent || "")
    .join("\n")
    .replaceAll("body.manager-page", ".manager-migrated-root");
}

function getManagerMainScript(parsedDocument) {
  return Array.from(parsedDocument.querySelectorAll("body > script:not([src])"))
    .map((script) => script.textContent || "")
    .sort((a, b) => b.length - a.length)[0] || "";
}

async function loadMigratedManager() {
  if (!elements.managerMount) {
    return;
  }
  if (managerMigrationPromise) {
    return managerMigrationPromise;
  }
  managerMigrationPromise = (async () => {
    elements.managerMount.innerHTML = '<p class="hint-text">制作チーム用管理プログラムを読み込んでいます。</p>';
    const template = document.getElementById("managerMigratedTemplate");
    const scriptElement = document.getElementById("managerMigratedScript");
    if (!(template instanceof HTMLTemplateElement) || !scriptElement?.textContent) {
      throw new Error("Manager source is not embedded in index.html.");
    }

    const root = document.createElement("section");
    root.className = "manager-migrated-root manager-page is-embedded-manager";
    root.dataset.theme = "manager";
    root.append(document.importNode(template.content, true));

    elements.managerMount.replaceChildren(root);
    publishManagerAccessForMigratedManager();
    const scriptText = scriptElement.textContent;
    if (scriptText) {
      await loadAuth0Sdk();
      const managerDocument = createManagerDocumentFacade(root);
      new Function("document", "window", scriptText)(managerDocument, window);
    }
  })().catch((error) => {
    console.error("Failed to migrate The Review Manager:", error);
    managerMigrationPromise = null;
    elements.managerMount.innerHTML =
      '<p class="feedback is-invalid">制作チーム用管理プログラムを読み込めませんでした。</p>';
  });
  return managerMigrationPromise;
}

function openLearnTimerPage() {
  closeLearnPopover();
  document.body.classList.add("learn-timer-page-open");
  activateScreen("learn");
  renderSelfcheckCalendar();
  renderSelfcheckTimerDisplay();
  elements.mypageTimerPanel?.scrollIntoView({ block: "start", behavior: "smooth" });
}

function renderLearnOverview() {
  if (elements.learnGreetingMessage) {
    elements.learnGreetingMessage.textContent = getHomeGreetingMessage(new Date());
  }
  renderLearnAvaterDock();

  if (elements.learnScheduleList) {
    elements.learnScheduleList.replaceChildren();
    const item = document.createElement("li");
    item.textContent = "直近の予定はまだ登録されていません。";
    elements.learnScheduleList.append(item);
  }
}

function handleLearnAvaterDockClick(event) {
  if (!(event.target instanceof Element)) {
    return;
  }
  const categoryButton = event.target.closest("[data-learn-avater-category]");
  if (categoryButton) {
    event.preventDefault();
    event.stopPropagation();
    const category = normalizeAvaterCategory(categoryButton.dataset.learnAvaterCategory);
    if (!category) {
      return;
    }
    activeLearnAvaterCategory = activeLearnAvaterCategory === category ? "" : category;
    renderLearnAvaterDock();
    return;
  }

  const noneButton = event.target.closest("[data-learn-avater-none-category]");
  if (noneButton) {
    event.preventDefault();
    event.stopPropagation();
    const category = normalizeAvaterCategory(noneButton.dataset.learnAvaterNoneCategory);
    if (!category) {
      return;
    }
    activeLearnAvaterCategory = category;
    handleAvaterNoneAction(category);
    return;
  }

  const itemButton = event.target.closest("[data-learn-avater-item]");
  if (itemButton) {
    event.preventDefault();
    event.stopPropagation();
    const itemId = itemButton.dataset.learnAvaterItem || "";
    const item = getAvaterItem(itemId);
    if (!isLearnAvaterItemOwned(item)) {
      return;
    }
    activeLearnAvaterCategory = item.category;
    handleAvaterItemAction(item.id, { forceEquip: true });
  }
}

function renderLearnAvaterDock() {
  if (!elements.learnScreen) {
    return;
  }
  state.avater = normalizeAvaterState(state.avater);
  let dock = elements.learnScreen.querySelector(".learn-avater-dock");
  if (!dock) {
    dock = document.createElement("div");
    dock.className = "learn-avater-dock";
    dock.setAttribute("aria-label", "Avater");
    elements.learnScreen.append(dock);
  }
  const categoryButtons = AVATER_CATEGORY_ORDER.map((category) => {
    const label = AVATER_CATEGORY_LABELS[category] || category;
    const icon = LEARN_AVATER_CATEGORY_ICONS[category] || "auto_awesome";
    const isActive = activeLearnAvaterCategory === category;
    const isEquipped = Boolean(state.avater.equipped?.[category]);
    return `
      <button class="learn-avater-category-btn ${isActive ? "is-active" : ""} ${isEquipped ? "is-equipped" : ""}" type="button" data-learn-avater-category="${escapeHtml(category)}" aria-label="${escapeHtml(label)}" aria-pressed="${String(isActive)}">
        <span class="material-symbols-rounded" aria-hidden="true">${escapeHtml(icon)}</span>
      </button>
    `;
  }).join("");
  const picker = activeLearnAvaterCategory ? renderLearnAvaterPicker(activeLearnAvaterCategory) : "";
  dock.innerHTML = `
    <div class="learn-avater-actions">${categoryButtons}</div>
    ${picker}
  `;
}

function renderLearnAvaterPicker(category) {
  const normalizedCategory = normalizeAvaterCategory(category);
  if (!normalizedCategory) {
    return "";
  }
  const label = AVATER_CATEGORY_LABELS[normalizedCategory] || normalizedCategory;
  const ownedItems = getAvailableAvaterItems().filter(
    (item) => item.category === normalizedCategory && isLearnAvaterItemOwned(item)
  );
  const isNoneEquipped = !state.avater.equipped?.[normalizedCategory];
  const noneChoice = `
    <button class="learn-avater-choice ${isNoneEquipped ? "is-equipped" : ""}" type="button" data-learn-avater-none-category="${escapeHtml(normalizedCategory)}">
      <span class="learn-avater-choice-sample avater-item-sample avater-item-sample-none" aria-hidden="true"></span>
      <span class="learn-avater-choice-name">なし</span>
    </button>
  `;
  const itemChoices = ownedItems.map((item) => {
    const isEquipped = state.avater.equipped?.[item.category] === item.id;
    const sampleImage = item.image?.dataUrl
      ? `<img class="avater-item-sample-image" src="${escapeHtml(item.image.dataUrl)}" alt="" />`
      : "";
    return `
      <button class="learn-avater-choice ${isEquipped ? "is-equipped" : ""}" type="button" data-learn-avater-item="${escapeHtml(item.id)}">
        <span class="learn-avater-choice-sample avater-item-sample ${escapeHtml(item.className)} avater-category-${escapeHtml(item.category)}${sampleImage ? " has-custom-image" : ""}" aria-hidden="true">${sampleImage}</span>
        <span class="learn-avater-choice-name">${escapeHtml(item.name)}</span>
      </button>
    `;
  }).join("");
  return `
    <div class="learn-avater-picker" role="dialog" aria-label="${escapeHtml(label)}">
      <div class="learn-avater-picker-track">${noneChoice}${itemChoices}</div>
    </div>
  `;
}

function isLearnAvaterItemOwned(item) {
  if (!item) {
    return false;
  }
  return item.cost === 0 || Boolean(state.avater.unlockedItems?.[item.id]);
}

function updateAppLogoForScreen(screen) {
  if (!elements.appLogo) {
    return;
  }
  const isManager = screen === "manager";
  elements.appLogo.src = isManager ? MANAGER_LOGO_SRC : APP_LOGO_SRC;
  elements.appLogo.alt = isManager ? "The Review Manager" : "The Review";
}

function updateManagerHostTitle(screenName = "home") {
  if (!elements.managerPageTitle) {
    updateManagerMenuState(screenName);
    return;
  }
  const normalizedScreen = String(screenName || "").trim();
  const title = MANAGER_HOST_SCREEN_TITLES[normalizedScreen] || MANAGER_HOST_SCREEN_TITLES.home;
  elements.managerPageTitle.textContent = title.en;
  elements.managerPageTitle.dataset.pageTitleJa = title.ja;
  updateManagerMenuState(normalizedScreen);
}

function getActiveManagerHostScreen() {
  const activeManagerScreen = elements.managerMount?.querySelector(".manager-migrated-root .screen.is-active");
  return activeManagerScreen?.id?.replace(/^screen-/, "") || "";
}

function updateManagerMenuState(screenName = "home") {
  const normalizedScreen = Object.prototype.hasOwnProperty.call(MANAGER_HOST_SCREEN_TITLES, screenName)
    ? screenName
    : "home";
  elements.managerMenuButtons.forEach((button) => {
    const isActive = button.dataset.managerMenuTarget === normalizedScreen;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-current", isActive ? "page" : "false");
  });
}

async function navigateManagerHostScreen(screenName = "home") {
  if (!state.auth.isLoggedIn || state.auth.provider === "guest") {
    showAuthLoginRequiredDialog({
      targetScreen: "manager",
      onboardingStep: "nickname",
    });
    return;
  }
  if (!managerAccessState) {
    await updateManagerMenuVisibility();
  }
  if (!managerAccessState) {
    showAuthLoginRequiredDialog({
      targetScreen: "manager",
      onboardingStep: "nickname",
    });
    return;
  }
  const normalizedScreen = Object.prototype.hasOwnProperty.call(MANAGER_HOST_SCREEN_TITLES, screenName)
    ? screenName
    : "home";
  await loadMigratedManager();
  const button = elements.managerMount?.querySelector(
    `.manager-migrated-root .manager-nav [data-screen="${cssEscape(normalizedScreen)}"]`
  );
  if (button instanceof HTMLElement) {
    button.click();
    return;
  }
  updateManagerHostTitle(normalizedScreen);
}

function activateScreen(screen) {
  const normalizedScreen = normalizeScreen(screen);
  closeReviewCoinMenu();
  if (normalizedScreen !== "learn") {
    closeLearnPopover();
    document.body.classList.remove("learn-timer-page-open");
  }
  if (normalizedScreen !== "settings") {
    stopSettingsEducationCodeScanner();
  }
  activeScreen = normalizedScreen;
  updateAppLogoForScreen(normalizedScreen);
  elements.screens.forEach((element) => {
    element.classList.toggle("is-active", element.id === `screen-${normalizedScreen}`);
  });
  elements.navButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.screen === normalizedScreen);
  });
  if (normalizedScreen === "mypage") {
    setMypagePage(activeMypagePage);
    if (activeMypagePage === "top") {
      resetFlashcardBinderScroll();
    }
  } else {
    clearAllFlashcardBookIntentTimers();
    setFlashcardPanelBookDimmed(false);
    closeMypageSubmenu();
  }
  if (normalizedScreen === "learn") {
    renderSelfcheckCalendar();
  }
  if (normalizedScreen === "home" || normalizedScreen === "mypage") {
    updateHomeCardCarouselControls();
  }
  if (normalizedScreen === "settings") {
    setSettingsTab(activeSettingsTab);
  }
  if (normalizedScreen === "manager") {
    updateManagerHostTitle(getActiveManagerHostScreen() || "home");
    void loadMigratedManager();
  }
  renderFlashcardFocusMode();
}

function promptLoginForMypage() {
  showAuthLoginRequiredDialog({
    targetScreen: "mypage",
    targetMypagePage: "top",
    onboardingStep: "nickname",
  });
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
    return;
  }
  if (IS_LOGIN_PAGE && shouldDeferRedirectOnLoginPage) {
    requestLoginOnboardingStep(appState?.onboardingStep || "educationCode");
  }
}

function loginAsGuest(appState = {}) {
  state.auth = normalizeAuthState({
    isLoggedIn: true,
    provider: "guest",
    displayName: "Guest Mode",
    nickname: state.auth?.nickname,
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

function requestAccountAction(action) {
  const requestedAction = normalizeAccountAction(action);
  const normalizedAction = requestedAction === "logout" && state.auth.provider === "guest" ? "guestLogout" : requestedAction;
  if (!normalizedAction || !state.auth.isLoggedIn) {
    return;
  }
  const copy = ACCOUNT_ACTION_DIALOG_COPY[normalizedAction];
  pendingAccountAction = normalizedAction;
  elements.accountActionDialog?.classList.toggle("is-delete-action", accountActionRequiresCountdown(normalizedAction));

  if (!elements.accountActionDialog || typeof elements.accountActionDialog.showModal !== "function") {
    const shouldContinue = window.confirm(copy.message);
    if (shouldContinue) {
      performConfirmedAccountAction(normalizedAction);
    } else {
      pendingAccountAction = null;
    }
    return;
  }

  if (elements.accountActionDialogTitle) {
    elements.accountActionDialogTitle.textContent = copy.title;
  }
  if (elements.accountActionDialogMessage) {
    elements.accountActionDialogMessage.textContent = copy.message;
  }
  if (elements.accountActionConfirmBtn) {
    elements.accountActionConfirmBtn.classList.remove("primary", "danger");
    elements.accountActionConfirmBtn.classList.add(copy.confirmClass);
    elements.accountActionConfirmBtn.textContent = copy.confirmText;
    elements.accountActionConfirmBtn.disabled = false;
  }
  if (elements.accountActionExportBtn) {
    elements.accountActionExportBtn.hidden = !accountActionShowsExport(normalizedAction);
  }
  if (!elements.accountActionDialog.open) {
    elements.accountActionDialog.showModal();
  }
  if (accountActionRequiresCountdown(normalizedAction)) {
    startAccountDeleteCountdown();
  } else {
    clearAccountDeleteCountdown();
  }
}

function handleAccountActionDialogAction(action) {
  const normalizedAction = typeof action === "string" ? action.trim().toLowerCase() : "";
  if (normalizedAction === "cancel") {
    closeAccountActionDialog();
    pendingAccountAction = null;
    return;
  }
  if (normalizedAction === "export") {
    exportReviewData();
    return;
  }
  if (normalizedAction !== "confirm") {
    return;
  }
  if (accountActionRequiresCountdown(pendingAccountAction) && accountActionCountdownRemainingSeconds > 0) {
    return;
  }

  const actionToRun = pendingAccountAction;
  pendingAccountAction = null;
  closeAccountActionDialog();
  performConfirmedAccountAction(actionToRun);
}

function closeAccountActionDialog() {
  clearAccountDeleteCountdown();
  if (elements.accountActionDialog?.open) {
    elements.accountActionDialog.close();
  }
}

function startAccountDeleteCountdown() {
  clearAccountDeleteCountdown();
  accountActionCountdownRemainingSeconds = 5;
  updateAccountDeleteCountdownLabel();
  accountActionCountdownTimerId = window.setInterval(() => {
    accountActionCountdownRemainingSeconds = Math.max(0, accountActionCountdownRemainingSeconds - 1);
    updateAccountDeleteCountdownLabel();
    if (accountActionCountdownRemainingSeconds <= 0) {
      clearAccountDeleteCountdown({ keepReadyLabel: true });
    }
  }, 1000);
}

function clearAccountDeleteCountdown(options = {}) {
  if (accountActionCountdownTimerId) {
    window.clearInterval(accountActionCountdownTimerId);
    accountActionCountdownTimerId = 0;
  }
  const keepReadyLabel = Boolean(options.keepReadyLabel);
  if (!keepReadyLabel) {
    accountActionCountdownRemainingSeconds = 0;
  }
  if (elements.accountActionConfirmBtn && (!keepReadyLabel || !accountActionRequiresCountdown(pendingAccountAction))) {
    elements.accountActionConfirmBtn.disabled = false;
    elements.accountActionConfirmBtn.textContent = ACCOUNT_ACTION_DIALOG_COPY[pendingAccountAction]?.confirmText || "はい";
  }
}

function updateAccountDeleteCountdownLabel() {
  if (!elements.accountActionConfirmBtn || !accountActionRequiresCountdown(pendingAccountAction)) {
    return;
  }
  const remaining = Math.max(0, accountActionCountdownRemainingSeconds);
  elements.accountActionConfirmBtn.disabled = remaining > 0;
  elements.accountActionConfirmBtn.textContent = remaining > 0 ? `はい (${remaining})` : "はい";
}

function accountActionRequiresCountdown(action) {
  return action === "delete" || action === "guestLogout";
}

function accountActionShowsExport(action) {
  return action === "delete" || action === "guestLogout";
}

function normalizeAccountAction(action) {
  const normalizedAction = typeof action === "string" ? action.trim().toLowerCase() : "";
  if (normalizedAction === "guestlogout") {
    return "guestLogout";
  }
  return Object.prototype.hasOwnProperty.call(ACCOUNT_ACTION_DIALOG_COPY, normalizedAction) ? normalizedAction : "";
}

function performConfirmedAccountAction(action) {
  if (action === "logout" || action === "guestLogout") {
    performLogoutAccount();
    return;
  }
  if (action === "delete") {
    void performDeleteAccountAndResetProgress();
  }
}

async function loginWithAuth0(appState, options = {}) {
  if (normalizeAuthLoginProvider(options.provider) === "guest") {
    loginAsGuest(appState);
    return true;
  }
  const loginClient =
    auth0Client || (await withTimeout(ensureAuth0Client(), AUTH_INIT_TIMEOUT_MS, null, "Auth0 login client"));
  if (!loginClient) {
    renderAuthPanel();
    return false;
  }
  const provider = normalizeAuthLoginProvider(options.provider);
  const providerLabel = provider ? formatAuthProviderLabel(provider) : "Auth0";
  const connection = provider ? getAuthConnectionForProvider(provider) : "";
  if (provider && requiresAuthConnection(provider) && !connection) {
    renderAuthPanel();
    return false;
  }
  try {
    const loginOptions = {
      appState: {
        targetScreen: "mypage",
        targetMypagePage: "top",
        ...appState,
      },
      authorizationParams: {},
    };
    const screenHint = typeof options.screenHint === "string" ? options.screenHint.trim() : "signup";
    if (screenHint) {
      loginOptions.authorizationParams.screen_hint = screenHint;
    }
    if (connection) {
      loginOptions.authorizationParams.connection = connection;
    }
    await loginClient.loginWithRedirect(loginOptions);
    return true;
  } catch (error) {
    console.error("Auth0 login failed:", error);
    return false;
  }
}

async function logoutAccount() {
  requestAccountAction("logout");
}

function handleAccountEditButtonClick() {
  if (state.auth.isLoggedIn && state.auth.provider === "guest") {
    void loginWithAuth0(
      {
        targetScreen: "mypage",
        targetMypagePage: "top",
        onboardingStep: "nickname",
      },
      { provider: "auth0" }
    );
    return;
  }
  openAccountEdit();
}

function openAccountEdit() {
  if (elements.accountEditNicknameInput) {
    elements.accountEditNicknameInput.value = normalizeNicknameText(state.auth.nickname);
  }
  if (elements.accountEditEmailInput) {
    elements.accountEditEmailInput.value = normalizeAccountEmailText(state.auth.email);
  }
  if (elements.accountEditPasswordInput) {
    elements.accountEditPasswordInput.value = normalizeAccountPasswordText(state.auth.password);
    elements.accountEditPasswordInput.type = isAccountEditPasswordVisible ? "text" : "password";
  }
  syncAccountPasswordToggle(elements.accountEditPasswordToggleBtn, isAccountEditPasswordVisible, "編集用パスワード");
  syncAccountEditProviderUi();
  setAccountEditNicknameFeedback("", "");
  syncAccountEditNicknameSaveButton();
  if (elements.accountEditDialog && typeof elements.accountEditDialog.showModal === "function") {
    if (!elements.accountEditDialog.open) {
      elements.accountEditDialog.showModal();
    }
  }
}

async function handleAccountEditAction(action) {
  const normalizedAction = typeof action === "string" ? action.trim().toLowerCase() : "";
  if (normalizedAction === "close") {
    closeAccountEditDialog();
    return;
  }
  if (normalizedAction === "nickname-save" || normalizedAction === "profile-save") {
    await saveAccountEditProfile();
    return;
  }
  if (normalizedAction === "google-link" || normalizedAction === "google-unlink") {
    await changeAccountGoogleLinkState(normalizedAction);
    return;
  }
}

function syncAccountEditProviderUi() {
  const isGoogleAccount = state.auth.isLoggedIn && state.auth.provider === "google";
  const isReviewAccount = state.auth.isLoggedIn && state.auth.provider !== "guest";
  if (elements.accountEditEmailOption) {
    elements.accountEditEmailOption.hidden = isGoogleAccount;
  }
  if (elements.accountEditPasswordOption) {
    elements.accountEditPasswordOption.hidden = isGoogleAccount;
  }
  if (elements.accountEditGoogleOption) {
    elements.accountEditGoogleOption.hidden = !isReviewAccount;
  }
  if (elements.accountEditGoogleStatusText) {
    elements.accountEditGoogleStatusText.textContent = isGoogleAccount
      ? "メールアドレスとパスワードはGoogleアカウントで管理してください。"
      : "切り替えるとGoogleでログインできるようになります。";
  }
  if (elements.accountEditGoogleActionBtn) {
    elements.accountEditGoogleActionBtn.dataset.accountEditAction = isGoogleAccount ? "google-unlink" : "google-link";
    elements.accountEditGoogleActionBtn.textContent = isGoogleAccount ? "Auth0に切り替える" : "Googleに切り替える";
    elements.accountEditGoogleActionBtn.classList.toggle("danger", isGoogleAccount);
    elements.accountEditGoogleActionBtn.classList.toggle("secondary", !isGoogleAccount);
    elements.accountEditGoogleActionBtn.disabled = !isReviewAccount;
  }
}

async function changeAccountGoogleLinkState(action) {
  if (!state.auth.isLoggedIn || state.auth.provider === "guest") {
    setAccountEditNicknameFeedback("Review Accountでログインしてください。", "error");
    return;
  }
  const shouldLinkGoogle = action === "google-link";
  const provider = shouldLinkGoogle ? "google" : "auth0";
  const connection = getAuthConnectionForProvider(provider);
  if (requiresAuthConnection(provider) && !connection) {
    setAccountEditNicknameFeedback("Googleログインを利用できる設定がありません。", "error");
    return;
  }
  closeAccountEditDialog();
  await loginWithAuth0(
    {
      targetScreen: "settings",
    },
    { provider, screenHint: "" }
  );
}

function getAccountEditNicknameValue() {
  return normalizeNicknameText(elements.accountEditNicknameInput?.value);
}

function getAccountEditEmailValue() {
  return normalizeAccountEmailText(elements.accountEditEmailInput?.value);
}

function getAccountEditPasswordValue() {
  return normalizeAccountPasswordText(elements.accountEditPasswordInput?.value);
}

function syncAccountEditNicknameSaveButton() {
  if (!elements.accountEditNicknameSaveBtn) {
    return;
  }
  const nextNickname = getAccountEditNicknameValue();
  const currentNickname = normalizeNicknameText(state.auth.nickname);
  const nextEmail = getAccountEditEmailValue();
  const currentEmail = normalizeAccountEmailText(state.auth.email);
  const nextPassword = getAccountEditPasswordValue();
  const currentPassword = normalizeAccountPasswordText(state.auth.password);
  elements.accountEditNicknameSaveBtn.disabled =
    isSavingAccountEditNickname ||
    !state.auth.isLoggedIn ||
    state.auth.provider === "guest" ||
    !nextNickname ||
    (nextNickname === currentNickname && nextEmail === currentEmail && nextPassword === currentPassword);
}

function setAccountEditNicknameFeedback(message, status = "") {
  if (!elements.accountEditNicknameFeedback) {
    return;
  }
  elements.accountEditNicknameFeedback.textContent = message;
  elements.accountEditNicknameFeedback.classList.toggle("is-success", status === "success");
  elements.accountEditNicknameFeedback.classList.toggle("is-error", status === "error");
}

async function saveAccountEditNickname() {
  return saveAccountEditProfile();
}

async function saveAccountEditProfile() {
  if (isSavingAccountEditNickname) {
    return;
  }
  const nickname = getAccountEditNicknameValue();
  const email = getAccountEditEmailValue();
  const password = getAccountEditPasswordValue();
  if (!nickname) {
    setAccountEditNicknameFeedback("Nicknameを入力してください。", "error");
    syncAccountEditNicknameSaveButton();
    return;
  }
  if (!state.auth.isLoggedIn || state.auth.provider === "guest") {
    setAccountEditNicknameFeedback("Review Accountでログインしてください。", "error");
    syncAccountEditNicknameSaveButton();
    return;
  }

  const previousAuth = { ...state.auth };
  const currentEmail = normalizeAccountEmailText(state.auth.email);
  const currentPassword = normalizeAccountPasswordText(state.auth.password);
  const shouldSyncProfile = nickname !== normalizeNicknameText(state.auth.nickname) || email !== currentEmail;
  const passwordChanged = password !== currentPassword;
  isSavingAccountEditNickname = true;
  state.auth = normalizeAuthState({
    ...state.auth,
    nickname,
    email,
    password,
  });
  saveState();
  renderMypageSettings();
  syncAccountEditNicknameSaveButton();
  setAccountEditNicknameFeedback("保存しています。", "");

  if (!shouldSyncProfile) {
    isSavingAccountEditNickname = false;
    setAccountEditNicknameFeedback(passwordChanged ? "パスワードを保存しました。" : "Review Accountを保存しました。", "success");
    syncAccountEditNicknameSaveButton();
    return;
  }

  const payload = await syncReviewAccountProfileToApi({ nickname, email });
  isSavingAccountEditNickname = false;
  if (!payload) {
    state.auth = normalizeAuthState({
      ...previousAuth,
      password,
    });
    saveState();
    renderMypageSettings();
    syncAccountEditNicknameSaveButton();
    setAccountEditNicknameFeedback(
      passwordChanged ? "パスワードは保存しました。Nicknameとメールアドレスは保存できませんでした。" : "保存できませんでした。通信状態を確認してください。",
      passwordChanged ? "success" : "error"
    );
    return;
  }

  setAccountEditNicknameFeedback("Review Accountを保存しました。", "success");
  syncAccountEditNicknameSaveButton();
}

function closeAccountEditDialog() {
  if (elements.accountEditDialog?.open) {
    elements.accountEditDialog.close();
  }
}

function performLogoutAccount() {
  if (!state.auth.isLoggedIn) {
    return;
  }
  const shouldClearAuth0Session = state.auth.provider !== "guest";
  markExplicitLogoutIntent();
  if (shouldClearAuth0Session) {
    requestAuth0LocalLogout();
  }
  applyLoggedOutState({ render: false });
  clearRequestedLoginOnboardingStep();
  clearManagerAccessCache();
  redirectToLoginPage();
}

function getAuth0SdkScriptElement() {
  const targetSrc = new URL(AUTH0_SDK_URL, window.location.href).href;
  return Array.from(document.scripts).find((script) => script.src === targetSrc) || null;
}

function loadAuth0Sdk() {
  if (isAuth0SdkAvailable()) {
    return Promise.resolve(true);
  }
  if (auth0SdkLoadPromise) {
    return auth0SdkLoadPromise;
  }

  auth0SdkLoadPromise = new Promise((resolve) => {
    const existingScript = getAuth0SdkScriptElement();
    const script = existingScript || document.createElement("script");
    let settled = false;
    let timeoutId = 0;

    const finish = (loaded) => {
      if (settled) {
        return;
      }
      settled = true;
      window.clearTimeout(timeoutId);
      const isReady = Boolean(loaded && isAuth0SdkAvailable());
      if (!isReady) {
        auth0SdkLoadPromise = null;
        if (!existingScript) {
          script.remove();
        }
      }
      resolve(isReady);
    };

    timeoutId = window.setTimeout(() => {
      console.warn(`Auth0 SDK load timed out after ${AUTH0_SDK_LOAD_TIMEOUT_MS}ms`);
      finish(false);
    }, AUTH0_SDK_LOAD_TIMEOUT_MS);

    script.addEventListener("load", () => finish(true), { once: true });
    script.addEventListener(
      "error",
      (error) => {
        console.warn("Auth0 SDK failed to load:", error);
        finish(false);
      },
      { once: true }
    );

    if (!existingScript) {
      script.src = AUTH0_SDK_URL;
      script.async = true;
      document.head.append(script);
    }
  });

  return auth0SdkLoadPromise;
}

async function initializeAuth(options = {}) {
  const shouldPreserveGuest = state.auth.isLoggedIn && state.auth.provider === "guest";
  const shouldPreserveExistingSession = Boolean(options.preserveExistingSession && state.auth.isLoggedIn);
  if (!isAuth0Configured()) {
    auth0Client = null;
    if (!shouldPreserveGuest && !shouldPreserveExistingSession) {
      setLoggedOutAuthState();
      saveState();
    }
    return;
  }
  if (!(await loadAuth0Sdk())) {
    auth0Client = null;
    if (!shouldPreserveGuest && !shouldPreserveExistingSession) {
      setLoggedOutAuthState();
      saveState();
    }
    return;
  }

  auth0Client = await ensureAuth0Client();

  let appStateFromRedirect = null;
  if (hasAuth0CallbackParams()) {
    const callbackError = getAuth0CallbackErrorInfo();
    try {
      const redirectResult = await auth0Client.handleRedirectCallback();
      appStateFromRedirect = redirectResult?.appState ?? null;
    } catch (error) {
      console.error("Auth0 redirect callback failed:", error);
      if (isAuth0LoginRequiredError(error) || isAuth0LoginRequiredError(callbackError)) {
        showAuthLoginRequiredDialog();
      }
      if (!shouldPreserveGuest && !shouldPreserveExistingSession) {
        setLoggedOutAuthState();
        saveState();
      }
    } finally {
      clearAuth0CallbackParamsFromUrl();
    }
    if (isAuth0LoginRequiredError(callbackError) && !state.auth.isLoggedIn) {
      showAuthLoginRequiredDialog();
    }
  }

  await syncAuthStateFromAuth0({
    preserveGuest: shouldPreserveGuest,
    preserveExistingSession: shouldPreserveExistingSession,
  });
  if (appStateFromRedirect) {
    applyAuthRedirectState(appStateFromRedirect);
  }
  return appStateFromRedirect;
}

async function ensureAuth0Client() {
  if (auth0Client) {
    return auth0Client;
  }
  if (!isAuth0Configured()) {
    return null;
  }
  if (!isAuth0SdkAvailable() && !(await loadAuth0Sdk())) {
    return null;
  }
  auth0Client = await window.auth0.createAuth0Client({
    domain: AUTH0_CONFIG.domain,
    clientId: AUTH0_CONFIG.clientId,
    authorizationParams: buildAuth0AuthorizationParams(),
  });
  return auth0Client;
}

function initializeAuth0AfterExplicitLogout(options = {}) {
  void (async () => {
    try {
      const logoutClient = await ensureAuth0Client();
      if (options.clearLocalSession) {
        await clearAuth0LocalSession(logoutClient);
      }
      renderAuthPanel();
    } catch (error) {
      console.warn("Auth0 client initialization after logout failed:", error);
      renderAuthPanel();
    }
  })();
}

async function clearAuth0LocalSession(logoutClient = auth0Client) {
  if (!logoutClient || typeof logoutClient.logout !== "function") {
    return;
  }
  try {
    await logoutClient.logout({ openUrl: false });
  } catch (error) {
    console.warn("Auth0 local logout failed:", error);
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

async function syncReviewAccountProfileToApi(options = {}) {
  if (!state.auth.isLoggedIn || state.auth.provider === "guest") {
    lastReviewAccountProfileSync = null;
    return null;
  }

  const accessToken = await withTimeout(
    getAuth0AccessTokenForApi(),
    MANAGER_ACCESS_TOKEN_TIMEOUT_MS,
    null,
    "Review Account profile sync token"
  );
  if (!accessToken) {
    lastReviewAccountProfileSync = null;
    return null;
  }

  const requestedNickname =
    "nickname" in options ? normalizeNicknameText(options.nickname) : normalizeNicknameText(state.auth.nickname);
  const requestedEmail =
    "email" in options ? normalizeAccountEmailText(options.email) : normalizeAccountEmailText(state.auth.email);
  const body = {};
  if (requestedNickname) {
    body.nickname = requestedNickname;
  }
  if ("email" in options) {
    body.email = requestedEmail;
  }

  try {
    const response = await fetch(`${REVIEW_API_BASE_URL}/me`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      console.warn("Failed to sync Review Account profile:", response.status);
      lastReviewAccountProfileSync = null;
      return null;
    }
    const payload = await response.json().catch(() => null);
    lastReviewAccountProfileSync = payload;
    applyReviewAccountProfilePayload(payload, {
      requestedNickname,
      requestedEmail,
      skipTouch: Boolean(options.skipTouch),
    });
    const access = createManagerAccessFromProfilePayload(payload);
    if (access) {
      updateManagerMenuVisibilityFromAccess(access);
    }
    return payload;
  } catch (error) {
    console.warn("Failed to sync Review Account profile:", error);
    lastReviewAccountProfileSync = null;
    return null;
  }
}

function applyReviewAccountProfilePayload(payload, options = {}) {
  if (!payload || !state.auth.isLoggedIn || state.auth.provider === "guest") {
    return;
  }
  const requestedNickname = normalizeNicknameText(options.requestedNickname);
  const requestedEmail = normalizeAccountEmailText(options.requestedEmail);
  const serverNickname = normalizeNicknameText(payload?.user?.nickname || payload?.managerMember?.nickname || payload?.managerMember?.display_name);
  const serverEmail = normalizeAccountEmailText(payload?.user?.email || payload?.managerMember?.email);
  const shouldUseServerNickname =
    serverNickname && !looksLikeAuth0Subject(serverNickname) && (requestedNickname || payload.isNewReviewAccount === false);
  const nextNickname = requestedNickname || (shouldUseServerNickname ? serverNickname : "");
  const nextEmail = requestedEmail || serverEmail || normalizeAccountEmailText(state.auth.email);
  const nicknameUnchanged = !nextNickname || nextNickname === normalizeNicknameText(state.auth.nickname);
  const emailUnchanged = nextEmail === normalizeAccountEmailText(state.auth.email);
  if (nicknameUnchanged && emailUnchanged) {
    return;
  }

  state.auth = normalizeAuthState({
    ...state.auth,
    nickname: nextNickname || state.auth.nickname,
    email: nextEmail,
  });
  if (options.skipTouch) {
    saveState({ skipTouch: true, skipRemoteSync: true });
  } else {
    saveState();
  }
  renderMypageSettings();
}

function updateManagerMenuVisibilityFromAccess(access) {
  const normalizedAccess = normalizeManagerAccessPayload(access);
  const role = getManagerAccessRole(normalizedAccess);
  const hasManagerRole = normalizedAccess?.canAccess !== false && Boolean(role);
  managerAccessState = hasManagerRole ? normalizedAccess : null;
  if (hasManagerRole) {
    saveManagerAccessCache(normalizedAccess);
  } else {
    clearManagerAccessCache();
  }
  if (elements.managerMenuLink) {
    elements.managerMenuLink.hidden = false;
  }
  renderCoinBoard();
  renderMypageCoin();
  renderThemeCardSelection();
  renderAvaterItemList(elements.storeAvatarHint, { storeMode: true });
  publishManagerAccessForMigratedManager();
}

function clearManagerAccessCache() {
  try {
    window.sessionStorage.removeItem(MANAGER_ACCESS_CACHE_KEY);
  } catch {
    // noop
  }
  managerAccessState = null;
}

function saveManagerAccessCache(access) {
  try {
    window.sessionStorage.setItem(
      MANAGER_ACCESS_CACHE_KEY,
      JSON.stringify({
        savedAt: Date.now(),
        access,
      })
    );
  } catch {
    // noop
  }
}

function loadManagerAccessCache() {
  try {
    const raw = window.sessionStorage.getItem(MANAGER_ACCESS_CACHE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (!parsed || Date.now() - Number(parsed.savedAt || 0) > MANAGER_ACCESS_CACHE_TTL_MS) {
      window.sessionStorage.removeItem(MANAGER_ACCESS_CACHE_KEY);
      return null;
    }
    const access = normalizeManagerAccessPayload(parsed.access);
    return access && getManagerAccessRole(access) ? access : null;
  } catch {
    return null;
  }
}

async function fetchManagerAccessWithToken(accessToken) {
  const endpoints = ["/manager/access", "/manager/me"];
  let fallbackAccess = null;
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${REVIEW_API_BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        continue;
      }
      const payload = await response.json().catch(() => null);
      const access = normalizeManagerAccessPayload(payload);
      if (access && getManagerAccessRole(access)) {
        return access;
      }
      fallbackAccess = fallbackAccess || access;
    } catch (error) {
      console.warn(`Failed to check The Review Manager access at ${endpoint}:`, error);
    }
  }
  return fallbackAccess;
}

async function updateManagerMenuVisibility() {
  if (!state.auth.isLoggedIn || state.auth.provider === "guest") {
    updateManagerMenuVisibilityFromAccess(null);
    return;
  }
  if (elements.managerMenuLink) {
    elements.managerMenuLink.hidden = false;
  }

  const accessToken = await withTimeout(
    getAuth0AccessTokenForApi(),
    MANAGER_ACCESS_TOKEN_TIMEOUT_MS,
    null,
    "Manager menu access token"
  );
  if (!accessToken) {
    if (!managerAccessState) {
      updateManagerMenuVisibilityFromAccess(null);
    }
    return;
  }

  try {
    const access = await fetchManagerAccessWithToken(accessToken);
    if (access && getManagerAccessRole(access)) {
      updateManagerMenuVisibilityFromAccess(access);
      return;
    }

    const fallbackAccess = createManagerAccessFromProfilePayload(lastReviewAccountProfileSync);
    if (fallbackAccess) {
      updateManagerMenuVisibilityFromAccess(fallbackAccess);
      return;
    }

    await syncReviewAccountProfileToApi({ skipTouch: true });
    if (!managerAccessState) {
      updateManagerMenuVisibilityFromAccess(access);
    }
  } catch (error) {
    console.warn("Failed to check The Review Manager access:", error);
    const fallbackAccess = createManagerAccessFromProfilePayload(lastReviewAccountProfileSync);
    if (fallbackAccess) {
      updateManagerMenuVisibilityFromAccess(fallbackAccess);
    } else if (!managerAccessState) {
      updateManagerMenuVisibilityFromAccess(null);
    }
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

function getStoredNicknameForAuth0User(user, value) {
  const nickname = normalizeNicknameText(value);
  if (!nickname) {
    return "";
  }
  const authProfileValues = [user?.name, user?.nickname, user?.email, user?.sub]
    .map((item) => normalizeNicknameText(item))
    .filter(Boolean);
  return authProfileValues.includes(nickname) ? "" : nickname;
}

function hasAuth0CallbackParams() {
  const params = new URLSearchParams(window.location.search);
  return params.has("state") && (params.has("code") || params.has("error"));
}

function getAuth0CallbackErrorInfo() {
  const params = new URLSearchParams(window.location.search);
  const error = params.get("error") || "";
  const errorDescription = params.get("error_description") || params.get("errorDescription") || "";
  return {
    error,
    error_description: errorDescription,
    message: errorDescription || error,
  };
}

function isAuth0LoginRequiredError(error) {
  if (!error) {
    return false;
  }
  const candidates = [
    error.error,
    error.error_description,
    error.errorDescription,
    error.message,
    typeof error === "string" ? error : "",
  ]
    .map((value) => String(value || "").toLowerCase())
    .filter(Boolean);
  return candidates.some((value) => value.includes("login_required") || value.includes("login required"));
}

function showAuthLoginRequiredDialog(appState = {}) {
  pendingAuthLoginRequiredAppState = {
    targetScreen: "mypage",
    targetMypagePage: "top",
    onboardingStep: "nickname",
    ...appState,
  };
  const dialog = ensureAuthLoginRequiredDialog();
  if (!dialog) {
    window.alert("ログインが必要です。ログインフォームで認証を完了してください。");
    return;
  }
  if (dialog.open) {
    return;
  }
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
    return;
  }
  window.alert("ログインが必要です。ログインフォームで認証を完了してください。");
}

function ensureAuthLoginRequiredDialog() {
  const existing = document.getElementById("authLoginRequiredDialog");
  if (existing) {
    return existing;
  }
  if (!document.body) {
    return null;
  }

  const dialog = document.createElement("dialog");
  dialog.id = "authLoginRequiredDialog";
  dialog.className = "text-reset-dialog auth-login-required-dialog";
  dialog.setAttribute("aria-labelledby", "authLoginRequiredDialogTitle");
  dialog.innerHTML = `
    <form method="dialog" class="text-reset-dialog-body">
      <h3 id="authLoginRequiredDialogTitle">ログインが必要です</h3>
      <p>Review Accountのログイン状態を確認できませんでした。もう一度ログインしてから続行してください。</p>
      <div class="guest-mode-actions pwa-update-actions">
        <button class="secondary" type="button" data-auth-login-required-action="close">閉じる</button>
        <button class="primary" type="button" data-auth-login-required-action="login">もう一度ログインする</button>
      </div>
    </form>
  `;
  dialog.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest("[data-auth-login-required-action]") : null;
    if (!button) {
      return;
    }
    if (button.dataset.authLoginRequiredAction === "login") {
      void retryAuthLoginFromRequiredDialog(dialog, button);
      return;
    }
    pendingAuthLoginRequiredAppState = null;
    dialog.close();
  });
  document.body.append(dialog);
  return dialog;
}

window.showAuthLoginRequiredDialog = showAuthLoginRequiredDialog;

async function retryAuthLoginFromRequiredDialog(dialog, button) {
  const appState = pendingAuthLoginRequiredAppState
    ? {
        ...pendingAuthLoginRequiredAppState,
      }
    : {
        targetScreen: "mypage",
        targetMypagePage: "top",
        onboardingStep: "nickname",
      };
  pendingAuthLoginRequiredAppState = null;
  if (button instanceof HTMLButtonElement) {
    button.disabled = true;
    button.textContent = "ログインへ移動中...";
  }
  if (dialog?.open) {
    dialog.close();
  }
  const didStartLogin = await loginWithAuth0(appState, { provider: "auth0", screenHint: "" });
  if (!didStartLogin && !IS_LOGIN_PAGE) {
    const onboardingStep = normalizeLoginOnboardingStep(appState.onboardingStep) || "nickname";
    requestLoginOnboardingStep(onboardingStep);
    redirectToLoginPage({ onboardingStep });
  }
  if (button instanceof HTMLButtonElement && !isNavigationRedirectPending) {
    button.disabled = false;
    button.textContent = "もう一度ログインする";
  }
}

function clearAuth0CallbackParamsFromUrl() {
  const cleanUrl = `${window.location.pathname}${window.location.hash}`;
  window.history.replaceState({}, document.title, cleanUrl);
}

async function syncAuthStateFromAuth0(options = {}) {
  const preserveGuest = Boolean(options.preserveGuest);
  const preserveExistingSession = Boolean(options.preserveExistingSession && state.auth.isLoggedIn);
  if (!auth0Client) {
    if (preserveExistingSession || (preserveGuest && state.auth.isLoggedIn && state.auth.provider === "guest")) {
      return;
    }
    setLoggedOutAuthState();
    saveState();
    return;
  }

  const isAuthenticated = await auth0Client.isAuthenticated();
  if (!isAuthenticated) {
    if (preserveExistingSession || (preserveGuest && state.auth.isLoggedIn && state.auth.provider === "guest")) {
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
    nickname: getStoredNicknameForAuth0User(user, state.auth?.nickname),
    email: typeof user?.email === "string" && user.email.trim() ? user.email : null,
    password: state.auth?.password,
  });
  saveState({ skipTouch: true, skipRemoteSync: true });
  await syncReviewAccountProfileToApi({ skipTouch: true });
  reviewDataCloudPullCompleted = false;
  await syncReviewDataWithCloud({ reason: "auth" });
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
    nickname: "",
    email: null,
  });
}

function applyLoggedOutState(options = {}) {
  setLoggedOutAuthState();
  saveState();
  updateManagerMenuVisibilityFromAccess(null);
  const shouldRender = options.render !== false;
  if (shouldRender) {
    renderMypageSettings();
    renderAuthPanel();
  }

  if (shouldRender && activeScreen === "mypage") {
    activateScreen("home");
  }
  closeMypageSubmenu();
}

async function deleteAccountAndResetProgress() {
  requestAccountAction("delete");
}

async function performDeleteAccountAndResetProgress() {
  if (!state.auth.isLoggedIn) {
    return;
  }

  const shouldClearAuth0Session = state.auth.provider !== "guest";
  clearReviewDataSyncTimer();
  await deleteReviewDataFromCloud();
  markExplicitLogoutIntent();
  if (shouldClearAuth0Session) {
    requestAuth0LocalLogout();
  }
  Object.assign(state, createDefaultState());
  dailyTryRun = createDailyTryRun();
  pauseSelfcheckTimer();
  selfcheckTimerRemainingSeconds = SELFCHECK_DEFAULT_TIMER_SECONDS;
  saveState();
  clearRequestedLoginOnboardingStep();
  clearManagerAccessCache();
  closeMypageSubmenu();
  redirectToLoginPage();
}

function renderAll() {
  renderInfoMenuNotices();
  renderCoinBoard({ fromZero: true });
  renderDailyLogin();
  renderMypageCoin();
  renderStoreConfig();
  renderAvater();
  renderReviewCoinMenu();
  renderMypageSettings();
  renderAuthPanel();
  renderFlashcardPanel();
  setMypagePage(activeMypagePage);
  renderSelfcheckCalendar();
  renderSelfcheckTimerDisplay();
  updateSelfcheckTimerButtons();
  renderHomeGreeting();
  renderLearnOverview();
  renderDailyTryPanel();
  updateHomeCardCarouselControls();
  setSettingsTab(activeSettingsTab);
}

function renderInfoMenuNotices() {
  // The current info menu has no dynamic notice list, but older render flow still calls this hook.
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

function ensureLearningProgressState() {
  state.learningProgress = normalizeLearningProgressState(state.learningProgress);
  return state.learningProgress;
}

function recordActiveFlashcardProgress() {
  const deck = getActiveFlashcardDeck();
  const unit = getActiveFlashcardUnit();
  if (!deck || !unit || !Array.isArray(unit.cards) || unit.cards.length === 0) {
    return;
  }
  const deckId = normalizeFlashcardText(deck.id);
  const unitId = normalizeFlashcardText(unit.id);
  if (!deckId || !unitId) {
    return;
  }
  const cardIndex = Math.max(0, Math.min(unit.cards.length - 1, Number(flashcardState.cardIndex) || 0));
  const progress = ensureLearningProgressState();
  progress.flashcards[deckId] = {
    seriesId: normalizeFlashcardText(deck.seriesId),
    seriesLabel: normalizeFlashcardText(deck.seriesLabel),
    deckId,
    deckLabel: normalizeFlashcardText(deck.label),
    unitId,
    unitLabel: normalizeFlashcardText(unit.label),
    cardIndex,
    cardNumber: cardIndex + 1,
    cardCount: unit.cards.length,
    answerVisible: Boolean(flashcardState.answerVisible),
    updatedAt: toJstIsoString(),
  };
  saveState();
}

function recordActiveFlashcardNotebookProgress() {
  if (!activeFlashcardNotebookState?.note) {
    return;
  }
  const note = activeFlashcardNotebookState.note;
  const noteLabel = getFlashcardNoteJapaneseLabel(note);
  const deckId = normalizeFlashcardText(note.dataset.flashcardDeckId);
  const noteKey = deckId || toFlashcardLabelLookupKey(noteLabel);
  if (!noteKey) {
    return;
  }
  const spreads = buildFlashcardNotebookSpreads(note);
  const pageIndex = Math.max(0, Math.min(Math.max(0, spreads.length - 1), Number(activeFlashcardNotebookState.pageIndex) || 0));
  const progress = ensureLearningProgressState();
  progress.notebooks[noteKey] = {
    deckId,
    noteLabel,
    pageIndex,
    pageNumber: pageIndex + 1,
    spreadCount: spreads.length,
    leftVisible: Boolean(activeFlashcardNotebookState.leftVisible),
    updatedAt: toJstIsoString(),
  };
  saveState();
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
  const isDirectNoteMode = isFlashcardDirectNoteMode(binderList);
  const directNoteSurface = isDirectNoteMode ? binderList.querySelector(".flashcard-note-surface") : null;
  if (isDirectNoteMode && directNoteSurface instanceof HTMLElement) {
    binderList.classList.add("is-direct-notes");
    directNoteSurface.classList.add("flashcard-binder", "is-active-binder");
    activeFlashcardBinderElement = directNoteSurface;
  }
  const deckProblemCountByLabel = createFlashcardDeckProblemCountByLabelMap();
  const deckByLabel = createFlashcardDeckByLabelMap();
  const binderElements =
    isDirectNoteMode && directNoteSurface instanceof HTMLElement
      ? [directNoteSurface]
      : Array.from(binderList.querySelectorAll(".flashcard-binder"));
  const measuredBinderHeights = binderElements
    .map((binder) => Math.round(binder.getBoundingClientRect().height))
    .filter((height) => Number.isFinite(height) && height > 0);
  if (measuredBinderHeights.length > 0) {
    binderList.style.setProperty("--flashcard-binder-shelf-height", `${Math.max(...measuredBinderHeights)}px`);
  }
  if (!isDirectNoteMode) {
    binderList.classList.add("is-bookshelf");
  }

  binderElements.forEach((binder, index) => {
    binder.dataset.flashcardBinderIndex = String(index);
    if (isDirectNoteMode) {
      binder.setAttribute("role", "region");
      binder.removeAttribute("aria-pressed");
      binder.removeAttribute("tabindex");
      return;
    }
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
    useButton.textContent = "このノート一覧を開く";
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
    closeButton.innerHTML = '<span class="material-symbols-rounded" aria-hidden="true">arrow_back</span><span>ノート一覧に戻る</span>';
    closeButton.tabIndex = -1;
    closeButton.setAttribute("aria-hidden", "true");
  });

  refreshFlashcardNoteBinderMetrics();

  binderList.addEventListener("click", handleFlashcardNoteBinderClick);
  binderList.addEventListener("keydown", handleFlashcardNoteBinderKeydown);
  binderList.addEventListener("pointerdown", handleFlashcardNoteBinderPointerDown);
  binderList.addEventListener("pointerup", handleFlashcardNoteBinderPointerUp);
  binderList.addEventListener("pointercancel", clearFlashcardNoteBinderPointerState);
  window.addEventListener("resize", () => updateFlashcardBinderTargetWidth());
}

function refreshFlashcardNoteBinderMetrics() {
  const binderList = elements.flashcardBinderList;
  if (!binderList) {
    return;
  }

  syncFlashcardNoteLibraryVisibility();
  const isDirectNoteMode = isFlashcardDirectNoteMode(binderList);
  const deckProblemCountByLabel = createFlashcardDeckProblemCountByLabelMap();
  const deckByLabel = createFlashcardDeckByLabelMap();
  const noteLists = Array.from(binderList.querySelectorAll(".flashcard-note-list"));
  noteLists.forEach((noteList) => {
    const binder = noteList.closest(".flashcard-binder");
    const binderItem = binder?.closest(".flashcard-binder-item");
    const notes = Array.from(noteList.querySelectorAll(".flashcard-note")).filter((note) => !note.hidden);
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
      note.setAttribute("aria-disabled", String(!isDirectNoteMode));
      note.tabIndex = isDirectNoteMode ? 0 : -1;

      let takeButton = note.querySelector(".flashcard-note-take-btn");
      if (!takeButton) {
        takeButton = document.createElement("button");
        takeButton.type = "button";
        takeButton.className = "flashcard-note-take-btn";
        takeButton.dataset.flashcardTakeNote = "1";
        note.append(takeButton);
      }
      takeButton.textContent = "このノートをとる";
      takeButton.tabIndex = -1;
      takeButton.setAttribute("aria-hidden", "true");
    }
    if (notes.length === 0) {
      noteStackThickness = FLASHCARD_NOTE_BASE_THICKNESS_PX;
    }
    if (binder && !isDirectNoteMode) {
      const binderThickness = noteStackThickness + FLASHCARD_BINDER_EXTRA_THICKNESS_PX;
      binder.style.setProperty("--flashcard-binder-thickness", `${binderThickness}px`);
      binder.dataset.flashcardBinderThickness = String(binderThickness);
      if (binderItem) {
        binderItem.style.setProperty("--flashcard-binder-thickness", `${binderThickness}px`);
      }
    }
  });
}

function syncFlashcardNoteLibraryVisibility() {
  const binderList = elements.flashcardBinderList;
  if (!binderList) {
    return;
  }
  if (!Array.isArray(flashcardState?.decks) || flashcardState.decks.length === 0) {
    Array.from(binderList.querySelectorAll(".flashcard-note")).forEach((note) => {
      note.hidden = true;
      note.classList.add("is-hidden-by-data");
      note.setAttribute("aria-hidden", "true");
    });
    Array.from(binderList.querySelectorAll(".flashcard-series-index")).forEach((index) => {
      index.hidden = true;
      index.classList.add("is-empty-series");
      index.classList.remove("is-ready-series");
      index.setAttribute("aria-hidden", "true");
    });
    syncFlashcardVisibleStackClasses(binderList);
    syncFlashcardNoteLibraryEmptyState(binderList, true);
    return;
  }

  const deckByLabel = createFlashcardDeckByLabelMap();
  const hasSchoolCode = hasTokyoScienceTechEducationCode();
  const notes = Array.from(binderList.querySelectorAll(".flashcard-note"));
  notes.forEach((note) => {
    const deck = resolveFlashcardDeckForNote(note, deckByLabel);
    const deckId = normalizeFlashcardText(deck?.id) || resolveFlashcardDeckAliasIdForNote(note);
    const hasProblemData = Boolean(deck && deck.totalCards > 0);
    const isSchoolGated = isSchoolGatedFlashcardNote(note, deckId);
    const shouldShow = hasProblemData && (!isSchoolGated || hasSchoolCode);
    note.hidden = !shouldShow;
    note.classList.toggle("is-hidden-by-data", !shouldShow);
    note.setAttribute("aria-hidden", String(!shouldShow));
  });

  syncFlashcardSeriesIndexVisibility(binderList);
  syncFlashcardVisibleStackClasses(binderList);
  syncFlashcardNoteLibraryEmptyState(
    binderList,
    !notes.some((note) => !note.hidden)
  );
}

function syncFlashcardSeriesIndexVisibility(binderList) {
  const noteLists = Array.from(binderList.querySelectorAll(".flashcard-note-list"));
  noteLists.forEach((noteList) => {
    const children = Array.from(noteList.children);
    children.forEach((child, index) => {
      if (!child.classList?.contains("flashcard-series-index")) {
        return;
      }
      const hasVisibleNote = children.slice(index + 1).some((candidate) => {
        if (candidate.classList?.contains("flashcard-series-index")) {
          return false;
        }
        return candidate.classList?.contains("flashcard-note") && !candidate.hidden;
      });
      const nextIndex = children.findIndex(
        (candidate, candidateIndex) =>
          candidateIndex > index && candidate.classList?.contains("flashcard-series-index")
      );
      const seriesChildren = nextIndex >= 0 ? children.slice(index + 1, nextIndex) : children.slice(index + 1);
      const hasVisibleSeriesNote = seriesChildren.some(
        (candidate) => candidate.classList?.contains("flashcard-note") && !candidate.hidden
      );
      const shouldShow = hasVisibleSeriesNote || (nextIndex < 0 && hasVisibleNote);
      child.hidden = !shouldShow;
      child.classList.toggle("is-empty-series", !shouldShow);
      child.classList.toggle("is-ready-series", shouldShow);
      child.setAttribute("aria-hidden", String(!shouldShow));
    });
  });
}

function syncFlashcardVisibleStackClasses(binderList) {
  const noteLists = Array.from(binderList.querySelectorAll(".flashcard-note-list"));
  noteLists.forEach((noteList) => {
    let hasVisibleNoteInSeries = false;
    let previousVisibleNote = false;
    Array.from(noteList.children).forEach((child) => {
      if (child.classList?.contains("flashcard-series-index")) {
        child.classList.toggle("is-after-visible-notes", hasVisibleNoteInSeries);
        hasVisibleNoteInSeries = false;
        previousVisibleNote = false;
        return;
      }
      if (!child.classList?.contains("flashcard-note")) {
        return;
      }
      if (child.hidden) {
        child.classList.remove("is-stack-continuation");
        return;
      }
      child.classList.toggle("is-stack-continuation", previousVisibleNote);
      hasVisibleNoteInSeries = true;
      previousVisibleNote = true;
    });
  });
}

function resetFlashcardBinderScroll() {
  const binderList = elements.flashcardBinderList;
  if (!binderList) {
    return;
  }
  window.requestAnimationFrame(() => {
    binderList.scrollTo({ left: 0, top: 0, behavior: "auto" });
  });
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
  Object.entries(FLASHCARD_DIRECT_NOTE_DECK_ALIASES).forEach(([label, deckId]) => {
    const deck = getFlashcardDeckById(deckId);
    if (!deck) {
      return;
    }
    const lookupKeys = [label, toFlashcardLabelLookupKey(label)].filter(Boolean);
    lookupKeys.forEach((lookupKey) => {
      map.set(lookupKey, deck.totalCards);
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
  Object.entries(FLASHCARD_DIRECT_NOTE_DECK_ALIASES).forEach(([label, deckId]) => {
    const deck = getFlashcardDeckById(deckId);
    if (!deck) {
      return;
    }
    const lookupKeys = [label, toFlashcardLabelLookupKey(label)].filter(Boolean);
    lookupKeys.forEach((lookupKey) => {
      if (!map.has(lookupKey)) {
        map.set(lookupKey, deck);
      }
    });
  });
  return map;
}

function getFlashcardDeckById(deckId) {
  const normalizedDeckId = normalizeFlashcardText(deckId);
  if (!normalizedDeckId || !Array.isArray(flashcardState?.decks)) {
    return null;
  }
  return flashcardState.decks.find((deck) => deck.id === normalizedDeckId) ?? null;
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

function resolveFlashcardDeckAliasIdForNote(note) {
  if (!(note instanceof Element)) {
    return "";
  }
  const labels = [
    note.querySelector(".flashcard-note-jp")?.textContent,
    note.querySelector(".flashcard-note-en")?.textContent,
    note.getAttribute("aria-label"),
  ]
    .map((label) => normalizeFlashcardText(label))
    .filter(Boolean);
  for (const label of labels) {
    const directAlias = FLASHCARD_DIRECT_NOTE_DECK_ALIASES[label];
    if (directAlias) {
      return directAlias;
    }
    const lookupKey = toFlashcardLabelLookupKey(label);
    const matchedEntry = Object.entries(FLASHCARD_DIRECT_NOTE_DECK_ALIASES).find(
      ([aliasLabel]) => toFlashcardLabelLookupKey(aliasLabel) === lookupKey
    );
    if (matchedEntry?.[1]) {
      return matchedEntry[1];
    }
    const catalogEntry = getFlashcardSubjectCatalogEntryByLabel(label);
    if (catalogEntry?.id) {
      return catalogEntry.id;
    }
  }
  return "";
}

function isSchoolGatedFlashcardNote(note, deckId) {
  const normalizedDeckId = normalizeFlashcardText(deckId);
  if (FLASHCARD_SCHOOL_GATED_DECK_IDS.has(normalizedDeckId)) {
    return true;
  }
  const label = normalizeFlashcardText(note?.querySelector?.(".flashcard-note-jp")?.textContent);
  return label.includes("ＳＳ科学技術理論Ⅰ") || label.includes("SS科学技術理論Ⅰ") || label.includes("朝学習テスト");
}

function hasTokyoScienceTechEducationCode() {
  return getSavedEducationCodes().some((code) => {
    const detail = getEducationCodeDetail(code);
    return isTokyoScienceTechSchoolDetail(detail);
  });
}

function isTokyoScienceTechSchoolDetail(detail) {
  const target = normalizeSchoolName(TOKYO_SCIENCE_TECH_SCHOOL_NAME).replace(/\s+/g, "");
  const schoolName = normalizeSchoolName(detail?.schoolName).replace(/\s+/g, "");
  const message = normalizeSchoolName(detail?.message).replace(/\s+/g, "");
  return Boolean(target && (schoolName === target || schoolName.includes(target) || message.includes(target)));
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
  const isDirectNoteMode = isFlashcardDirectNoteMode(binderList);
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const readerAction = target.closest("[data-flashcard-note-reader-action]");
  if (readerAction && isInFlashcardBinderInteractionSurface(readerAction)) {
    handleFlashcardNoteReaderAction(readerAction);
    return;
  }

  const modeButton = target.closest("[data-flashcard-note-mode]");
  if (modeButton && isInFlashcardBinderInteractionSurface(modeButton)) {
    setFlashcardNotebookMode(modeButton.dataset.flashcardNoteMode);
    return;
  }

  const closeBinderButton = target.closest("[data-flashcard-close-binder]");
  if (closeBinderButton && isInFlashcardBinderInteractionSurface(closeBinderButton)) {
    closeFlashcardBinder();
    return;
  }

  const useBinderButton = target.closest("[data-flashcard-use-binder]");
  if (!isDirectNoteMode && useBinderButton && isInFlashcardBinderInteractionSurface(useBinderButton)) {
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
  const isDirectNoteMode = isFlashcardDirectNoteMode(binderList);
  if (event.key === "Escape") {
    if (activeFlashcardNotebookState) {
      closeFlashcardNotebook();
      event.preventDefault();
      return;
    }
    if (!isDirectNoteMode && isFlashcardBinderOpen(binderList)) {
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
      "[data-flashcard-take-note], [data-flashcard-use-binder], [data-flashcard-close-binder], [data-flashcard-note-reader-action], [data-flashcard-note-mode]"
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

function isFlashcardDirectNoteMode(binderList = elements.flashcardBinderList) {
  return binderList?.dataset.flashcardDirectNotes === "1";
}

function isFlashcardBinderOpen(binderList = elements.flashcardBinderList) {
  if (isFlashcardDirectNoteMode(binderList)) {
    return Boolean(activeFlashcardBinderElement);
  }
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
      "[data-flashcard-take-note], [data-flashcard-use-binder], [data-flashcard-close-binder], [data-flashcard-note-reader-action], [data-flashcard-note-mode]"
    )
  ) {
    return;
  }
  if (activeFlashcardNotebookState && target.closest(".flashcard-note-reader-pages, .flashcard-note-reader")) {
    flashcardBinderPointerState = {
      reader: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };
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
  if (pointerState.reader && activeFlashcardNotebookState) {
    const isHorizontalSwipe =
      Math.abs(deltaX) >= FLASHCARD_BINDER_SWIPE_OPEN_THRESHOLD_PX && Math.abs(deltaX) > Math.abs(deltaY) * 1.18;
    if (!isHorizontalSwipe) {
      return;
    }
    event.preventDefault();
    turnFlashcardNotebookPage(deltaX < 0 ? 1 : -1);
    return;
  }
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
  stage.classList.toggle("is-direct-note-stage", isFlashcardDirectNoteMode(binderList));
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
    stage.classList.remove("is-note-open", "is-direct-note-stage");
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
  const fallbackWidth = getResponsiveReviewSheetWidth(viewportWidth);
  return Math.max(0, Math.round(measuredWidth || fallbackWidth));
}

function getResponsiveReviewSheetWidth(viewportWidth = window.innerWidth) {
  const safeViewportWidth = Math.max(0, Number(viewportWidth) || 0);
  return Math.max(0, Math.min(456, safeViewportWidth - 96));
}

function updateFlashcardBinderTargetWidth(binder = activeFlashcardBinderElement) {
  if (!(binder instanceof HTMLElement)) {
    return;
  }
  binder.style.setProperty("--flashcard-note-cover-width", `${getFlashcardBinderTargetNoteWidth()}px`);
}

function setFlashcardDirectNotebookGeometry(note) {
  if (!(note instanceof HTMLElement) || !(activeFlashcardBinderElement instanceof HTMLElement)) {
    return;
  }
  const visualViewport = window.visualViewport;
  const viewportWidth = Math.max(
    0,
    Math.round(visualViewport?.width || document.documentElement.clientWidth || window.innerWidth || 0)
  );
  const viewportHeight = Math.max(
    0,
    Math.round(visualViewport?.height || document.documentElement.clientHeight || window.innerHeight || 0)
  );
  const isMobileViewport = viewportWidth <= 760;
  const pageGap = Math.max(8, Math.min(12, viewportWidth * 0.018));
  const topReserved = isMobileViewport ? 44 : 12;
  const bottomReserved = isMobileViewport
    ? Math.max(116, Math.min(156, viewportHeight * 0.2))
    : Math.max(104, Math.min(142, viewportHeight * 0.16));
  const availableHeight = Math.max(220, viewportHeight - topReserved - bottomReserved);
  const requestedPageWidth = getResponsiveReviewSheetWidth(viewportWidth);
  const maxPageWidthByHeight = Math.max(0, availableHeight / Math.SQRT2);
  const targetWidth = Math.max(0, Math.min(requestedPageWidth, maxPageWidthByHeight));
  const targetHeight = targetWidth * Math.SQRT2;
  const spreadWidth = targetWidth * 2 + pageGap;
  const safeTop = Math.max(topReserved, Math.round(topReserved + (availableHeight - targetHeight) / 2));
  const spreadLeft = Math.round((viewportWidth - spreadWidth) / 2);
  const rightPageLeft = Math.round((viewportWidth - targetWidth) / 2);
  const leftPageCenteredLeft = Math.round((viewportWidth - targetWidth) / 2);
  const safeLeft = Math.round(rightPageLeft - targetWidth - pageGap);
  const geometryTargets = [activeFlashcardBinderElement, flashcardBinderStageElement].filter(
    (target, index, targets) => target instanceof HTMLElement && targets.indexOf(target) === index
  );
  geometryTargets.forEach((target) => {
    target.style.setProperty("--flashcard-direct-note-left", `${Math.round(safeLeft)}px`);
    target.style.setProperty("--flashcard-direct-note-spread-left", `${Math.round(spreadLeft)}px`);
    target.style.setProperty("--flashcard-direct-note-left-page-left", `${Math.round(leftPageCenteredLeft)}px`);
    target.style.setProperty("--flashcard-direct-note-right-left", `${Math.round(safeLeft)}px`);
    target.style.setProperty("--flashcard-direct-note-top", `${Math.round(safeTop)}px`);
    target.style.setProperty("--flashcard-direct-note-width", `${Math.round(targetWidth)}px`);
    target.style.setProperty("--flashcard-direct-note-page-width", `${Math.round(targetWidth)}px`);
    target.style.setProperty("--flashcard-direct-note-gap", `${Math.round(pageGap)}px`);
    target.style.setProperty(
      "--flashcard-direct-note-close-left",
      `${Math.round(targetWidth + pageGap)}px`
    );
  });
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
  if (isFlashcardDirectNoteMode(binderList) || !binderList || !(binder instanceof Element) || !binderList.contains(binder)) {
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
  if (isFlashcardDirectNoteMode(binderList)) {
    closeFlashcardNotebook();
    setLiftedFlashcardNote(null);
    setFlashcardBinderFocusMode(false);
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

  const isDirectNoteMode = isFlashcardDirectNoteMode(binderList);
  if (isDirectNoteMode) {
    activeFlashcardBinderElement.classList.add("is-active-binder");
    setFlashcardDirectNotebookGeometry(note);
    mountFlashcardBinderStage(activeFlashcardBinderElement, binderList);
    setFlashcardDirectNotebookGeometry(note);
    setFlashcardBinderFocusMode(true);
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
    mode: "choice",
    pageTurnDirection: "",
    pageTurnPreview: null,
  };
  activeFlashcardBinderElement.classList.add("is-opening-note");
  window.setTimeout(() => {
    activeFlashcardBinderElement?.classList.remove("is-opening-note");
  }, 760);
  binderList.classList.add("is-note-open");
  setFlashcardBinderStageNoteOpen(true);
  renderFlashcardNotebook();
  recordActiveFlashcardNotebookProgress();
}

function closeFlashcardNotebook(options = {}) {
  const binderList = elements.flashcardBinderList;
  const shouldPreserveBinder = Boolean(options.preserveBinder);
  const activeBinder = activeFlashcardBinderElement;
  const isDirectNoteMode = isFlashcardDirectNoteMode(binderList);

  if (activeBinder) {
    Array.from(activeBinder.querySelectorAll(".flashcard-note-reader")).forEach((reader) => reader.remove());
    Array.from(activeBinder.querySelectorAll(".flashcard-note")).forEach((note) => {
      note.classList.remove("is-opened-note");
    });
  } else if (binderList) {
    Array.from(binderList.querySelectorAll(".flashcard-note-reader")).forEach((reader) => reader.remove());
  }
  flashcardBinderStageElement?.querySelectorAll(".flashcard-note-reader").forEach((reader) => reader.remove());
  flashcardBinderStageElement?.querySelectorAll(".flashcard-note-reader-close-btn").forEach((button) => button.remove());

  if (binderList) {
    binderList.classList.remove("is-note-open");
  }
  setFlashcardBinderStageNoteOpen(false);
  activeFlashcardNotebookState = null;
  setLiftedFlashcardNote(null);

  if (isDirectNoteMode) {
    restoreFlashcardBinderStage();
    setFlashcardBinderFocusMode(false);
    return;
  }
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

  if (action === "prev") {
    turnFlashcardNotebookPage(-1);
    return;
  }
  if (action === "next") {
    turnFlashcardNotebookPage(1);
    return;
  }
  if (action === "show-left") {
    activeFlashcardNotebookState.leftVisible = true;
    activeFlashcardNotebookState.pageTurnDirection = "show-left";
    renderFlashcardNotebook();
    recordActiveFlashcardNotebookProgress();
    return;
  }
  if (action === "hide-left") {
    activeFlashcardNotebookState.leftVisible = false;
    activeFlashcardNotebookState.pageTurnDirection = "hide-left";
    renderFlashcardNotebook();
    recordActiveFlashcardNotebookProgress();
    return;
  }
  if (action === "learn") {
    toggleLearnPopover();
    return;
  }
  if (action === "answer") {
    return;
  }
}

function normalizeFlashcardNotebookMode(mode) {
  const normalizedMode = normalizeFlashcardText(mode).toLowerCase();
  return ["choice", "text", "voice"].includes(normalizedMode) ? normalizedMode : "choice";
}

function setFlashcardNotebookMode(mode) {
  if (!activeFlashcardNotebookState) {
    return;
  }
  const nextMode = normalizeFlashcardNotebookMode(mode);
  if (activeFlashcardNotebookState.mode === nextMode) {
    return;
  }
  activeFlashcardNotebookState.mode = nextMode;
  renderFlashcardNotebook();
}

function turnFlashcardNotebookPage(offset) {
  if (!activeFlashcardNotebookState) {
    return;
  }
  const normalizedOffset = Number(offset);
  if (!Number.isFinite(normalizedOffset) || normalizedOffset === 0) {
    return;
  }
  const spreads = buildFlashcardNotebookSpreads(activeFlashcardNotebookState.note);
  const maxPageIndex = Math.max(0, spreads.length - 1);
  const currentPageIndex = activeFlashcardNotebookState.pageIndex;
  const nextPageIndex = Math.max(
    0,
    Math.min(maxPageIndex, currentPageIndex + Math.trunc(normalizedOffset))
  );
  if (nextPageIndex === currentPageIndex) {
    return;
  }
  const direction = normalizedOffset > 0 ? "next" : "prev";
  activeFlashcardNotebookState.pageTurnPreview = {
    direction,
    from: spreads[currentPageIndex] ?? createBlankFlashcardNotebookSpread(),
    to: spreads[nextPageIndex] ?? createBlankFlashcardNotebookSpread(),
  };
  activeFlashcardNotebookState.pageIndex = nextPageIndex;
  activeFlashcardNotebookState.leftVisible = false;
  activeFlashcardNotebookState.pageTurnDirection = direction;
  renderFlashcardNotebook();
  recordActiveFlashcardNotebookProgress();
}

function renderFlashcardNotebook() {
  if (!activeFlashcardNotebookState || !activeFlashcardBinderElement) {
    return;
  }

  Array.from(activeFlashcardBinderElement.querySelectorAll(".flashcard-note-reader")).forEach((reader) => reader.remove());
  flashcardBinderStageElement?.querySelectorAll(".flashcard-note-reader").forEach((reader) => reader.remove());
  flashcardBinderStageElement?.querySelectorAll(".flashcard-note-reader-close-btn").forEach((button) => button.remove());

  const spreads = buildFlashcardNotebookSpreads(activeFlashcardNotebookState.note);
  const maxPageIndex = Math.max(0, spreads.length - 1);
  activeFlashcardNotebookState.pageIndex = Math.max(
    0,
    Math.min(maxPageIndex, activeFlashcardNotebookState.pageIndex)
  );
  const spread = spreads[activeFlashcardNotebookState.pageIndex] ?? createBlankFlashcardNotebookSpread();
  const isLeftVisible = Boolean(activeFlashcardNotebookState.leftVisible);
  const pageTurnDirection = normalizeFlashcardText(activeFlashcardNotebookState.pageTurnDirection);
  const pageTurnPreview = activeFlashcardNotebookState.pageTurnPreview;
  activeFlashcardNotebookState.pageTurnDirection = "";
  activeFlashcardNotebookState.pageTurnPreview = null;

  const reader = document.createElement("section");
  reader.className = "flashcard-note-reader";
  reader.classList.toggle("is-left-visible", isLeftVisible);
  if (pageTurnDirection === "next" || pageTurnDirection === "prev") {
    reader.classList.add(`is-turning-${pageTurnDirection}`);
  }
  if (pageTurnDirection === "show-left" || pageTurnDirection === "hide-left") {
    reader.classList.add(`is-${pageTurnDirection}`);
  }
  reader.setAttribute("aria-label", `${getFlashcardNoteJapaneseLabel(activeFlashcardNotebookState.note)}のノート`);

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "flashcard-note-reader-close-btn";
  closeButton.dataset.flashcardNoteReaderAction = "close";
  closeButton.innerHTML = '<span class="material-symbols-rounded" aria-hidden="true">arrow_back</span><span>ノートを閉じる</span>';

  const pageWrap = document.createElement("div");
  pageWrap.className = "flashcard-note-reader-pages";
  pageWrap.append(
    createFlashcardNotebookPageElement(spread.left, "left"),
    createFlashcardNotebookPageElement(spread.right, "right")
  );
  pageWrap.append(closeButton);
  const leftToggleButton = document.createElement("button");
  leftToggleButton.type = "button";
  leftToggleButton.className = "flashcard-note-left-toggle-btn";
  leftToggleButton.dataset.flashcardNoteReaderAction = isLeftVisible ? "hide-left" : "show-left";
  leftToggleButton.innerHTML = isLeftVisible
    ? '<span class="material-symbols-rounded" aria-hidden="true">chevron_right</span><span>問題に戻る</span>'
    : '<span class="material-symbols-rounded" aria-hidden="true">chevron_left</span><span>テキストを見る</span>';
  pageWrap.append(leftToggleButton);
  if (pageTurnDirection === "next" || pageTurnDirection === "prev") {
    pageWrap.append(createFlashcardNotebookTurnSheet(pageTurnPreview, pageTurnDirection));
  }
  reader.append(pageWrap);

  const prevButton = document.createElement("button");
  prevButton.type = "button";
  prevButton.className = "flashcard-note-reader-side-nav flashcard-note-reader-side-nav-prev home-card-nav-btn home-card-nav-btn-prev";
  prevButton.dataset.flashcardNoteReaderAction = "prev";
  prevButton.innerHTML = '<span class="material-symbols-rounded home-card-nav-symbol" aria-hidden="true">chevron_left</span>';
  prevButton.setAttribute("aria-label", "前へ");
  prevButton.disabled = activeFlashcardNotebookState.pageIndex <= 0;

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.className = "flashcard-note-reader-side-nav flashcard-note-reader-side-nav-next home-card-nav-btn home-card-nav-btn-next";
  nextButton.dataset.flashcardNoteReaderAction = "next";
  nextButton.innerHTML = '<span class="material-symbols-rounded home-card-nav-symbol" aria-hidden="true">chevron_right</span>';
  nextButton.setAttribute("aria-label", "次へ");
  nextButton.disabled = activeFlashcardNotebookState.pageIndex >= maxPageIndex;

  const controls = document.createElement("div");
  controls.className = "flashcard-note-reader-controls";
  controls.setAttribute("aria-label", "Review Menu");

  const activeMode = normalizeFlashcardNotebookMode(activeFlashcardNotebookState.mode);
  const choiceModeButton = createFlashcardNotebookMenuButton("checklist", "3択", "choice", activeMode);
  const textModeButton = createFlashcardNotebookMenuButton("keyboard", "入力", "text", activeMode);
  const voiceModeButton = createFlashcardNotebookMenuButton("mic", "音声", "voice", activeMode);
  const answerButton = document.createElement("button");
  answerButton.type = "button";
  answerButton.className = "flashcard-note-reader-answer-btn";
  answerButton.dataset.flashcardNoteReaderAction = "answer";
  answerButton.innerHTML = '<span class="material-symbols-rounded" aria-hidden="true">check</span><span>答える</span>';

  controls.append(choiceModeButton, textModeButton, voiceModeButton, prevButton, nextButton, answerButton);
  reader.append(controls);
  const readerHost = flashcardBinderStageElement?.classList.contains("is-direct-note-stage")
    ? flashcardBinderStageElement
    : activeFlashcardBinderElement;
  readerHost.append(reader);
}

function createFlashcardNotebookTurnSheet(preview, direction) {
  const safeDirection = direction === "prev" ? "prev" : "next";
  const fallbackPreview = {
    from: createBlankFlashcardNotebookSpread(),
    to: createBlankFlashcardNotebookSpread(),
  };
  const turnPreview = preview && typeof preview === "object" ? preview : fallbackPreview;
  const frontPage = safeDirection === "next" ? turnPreview.from?.right : turnPreview.from?.left;
  const backPage = safeDirection === "next" ? turnPreview.to?.left : turnPreview.to?.right;
  const turnSheet = document.createElement("div");
  turnSheet.className = `flashcard-note-page-turn-sheet flashcard-note-page-turn-sheet-${safeDirection}`;
  turnSheet.setAttribute("aria-hidden", "true");

  const frontFace = document.createElement("div");
  frontFace.className = "flashcard-note-page-turn-face is-front";
  frontFace.append(createFlashcardNotebookPageElement(frontPage, "turn-front"));

  const backFace = document.createElement("div");
  backFace.className = "flashcard-note-page-turn-face is-back";
  backFace.append(createFlashcardNotebookPageElement(backPage, "turn-back"));

  turnSheet.append(frontFace, backFace);
  return turnSheet;
}

function createFlashcardNotebookMenuButton(iconName, label, mode, activeMode = "choice") {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "flashcard-note-reader-mode-btn";
  button.dataset.flashcardNoteMode = mode;
  button.setAttribute("aria-label", `${label}ボタン`);
  button.setAttribute("aria-pressed", String(normalizeFlashcardNotebookMode(mode) === normalizeFlashcardNotebookMode(activeMode)));
  button.classList.toggle("is-active", normalizeFlashcardNotebookMode(mode) === normalizeFlashcardNotebookMode(activeMode));
  button.innerHTML = `<span class="material-symbols-rounded" aria-hidden="true">${iconName}</span><span class="flashcard-note-reader-mode-label">${label}</span>`;
  return button;
}

function createFlashcardNotebookAvatarPreview() {
  const preview = document.createElement("div");
  preview.className = "flashcard-note-reader-avatar avater-preview";
  preview.dataset.flashcardNoteReaderAction = "learn";
  preview.setAttribute("role", "button");
  preview.setAttribute("tabindex", "0");
  preview.setAttribute("aria-label", "らーん");
  const baseImage = document.createElement("img");
  baseImage.className = "avater-base-image";
  baseImage.src = AVATER_BASE_IMAGE;
  baseImage.alt = "";
  preview.append(baseImage);
  renderAvaterPreview(preview);
  preview.querySelectorAll(".avater-layer").forEach((layer) => {
    layer.removeAttribute("role");
    layer.removeAttribute("tabindex");
    layer.removeAttribute("aria-label");
  });
  preview.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    event.preventDefault();
    toggleLearnPopover();
  });
  return preview;
}

function buildFlashcardNotebookSpreads(note) {
  const deck = resolveFlashcardDeckForNote(note);
  const noteLabel = getFlashcardNoteJapaneseLabel(note);
  const dateText = formatFlashcardNotebookDate(new Date());

  const cardEntries = deck?.units?.flatMap((unit) =>
    unit.cards.map((card) => ({
      unit,
      card,
    }))
  ) ?? [];

  if (cardEntries.length === 0) {
    return [
      {
        left: createFlashcardNotebookTextPage(noteLabel, dateText, ""),
        right: createFlashcardNotebookProblemPage({
          noteLabel,
          dateText,
          body: "このノートの問題データは準備中です。",
          answers: [],
          choices: [],
        }),
      },
    ];
  }

  return cardEntries.map((entry, index) => {
    const cardNumber = index + 1;
    return {
      left: createFlashcardNotebookTextPage(
        noteLabel,
        dateText,
        entry.card.preKnowledge || entry.card.hint || ""
      ),
      right: createFlashcardNotebookProblemPage({
        noteLabel,
        dateText,
        title: `問題 ${cardNumber}`,
        body: entry.card.prompt,
        imageSrc: entry.card.imageSrc,
        imageAlt: entry.card.imageAlt,
        answers: entry.card.answers,
        choices: entry.card.choices,
      }),
    };
  });
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

function createFlashcardNotebookTextPage(noteLabel, dateText, body) {
  return {
    kind: "text",
    noteLabel,
    dateText,
    body: normalizeFlashcardText(body),
  };
}

function createFlashcardNotebookProblemPage({ noteLabel, dateText, title, body, imageSrc, imageAlt, answers, choices }) {
  return {
    kind: "problem",
    noteLabel,
    dateText,
    title: normalizeFlashcardText(title),
    body: normalizeFlashcardText(body),
    imageSrc,
    imageAlt,
    answers: Array.isArray(answers) ? answers : [],
    choices: Array.isArray(choices) ? choices : [],
  };
}

function formatFlashcardNotebookDate(date) {
  const safeDate = date instanceof Date && !Number.isNaN(date.getTime()) ? date : new Date();
  const year = safeDate.getFullYear();
  const month = String(safeDate.getMonth() + 1).padStart(2, "0");
  const day = String(safeDate.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
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

  const inner = document.createElement("div");
  inner.className = "flashcard-note-paper-inner";
  inner.append(createFlashcardNotebookPageHeader(page));

  const body = document.createElement("section");
  body.className = "flashcard-note-paper-main";
  if (page.title) {
    const title = document.createElement("h3");
    title.className = "flashcard-note-paper-title";
    title.textContent = page.title;
    body.append(title);
  }
  if (page.subtitle) {
    const subtitle = document.createElement("p");
    subtitle.className = "flashcard-note-paper-subtitle";
    subtitle.textContent = page.subtitle;
    body.append(subtitle);
  }
  const bodyText = document.createElement("p");
  bodyText.className = "flashcard-note-paper-body";
  bodyText.textContent = page.body || "";
  body.append(bodyText);
  if (page.imageSrc) {
    const image = document.createElement("img");
    image.className = "flashcard-note-paper-image";
    image.src = page.imageSrc;
    image.alt = page.imageAlt || "";
    body.append(image);
  }
  if (Array.isArray(page.items) && page.items.length > 0) {
    const list = document.createElement("ol");
    list.className = "flashcard-note-paper-list";
    page.items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      list.append(listItem);
    });
    body.append(list);
  }
  inner.append(body);

  if (page.kind === "problem") {
    inner.append(createFlashcardNotebookAnswerArea(page));
  }

  pageElement.append(inner);

  return pageElement;
}

function createFlashcardNotebookPageHeader(page) {
  const header = document.createElement("header");
  header.className = "flashcard-note-paper-header";
  const noteName = document.createElement("span");
  noteName.className = "flashcard-note-paper-note-name";
  noteName.textContent = page.noteLabel || getFlashcardNoteJapaneseLabel(activeFlashcardNotebookState?.note);
  const date = document.createElement("time");
  date.className = "flashcard-note-paper-date";
  date.textContent = page.dateText || formatFlashcardNotebookDate(new Date());
  header.append(noteName, date);
  return header;
}

function createFlashcardNotebookAnswerArea(page) {
  const mode = normalizeFlashcardNotebookMode(activeFlashcardNotebookState?.mode);
  const area = document.createElement("section");
  area.className = `flashcard-note-answer-area is-${mode}`;
  area.setAttribute("aria-label", "答え入力");

  if (mode === "text") {
    const textarea = document.createElement("textarea");
    textarea.className = "flashcard-note-answer-textbox";
    textarea.rows = 5;
    textarea.placeholder = "答えを入力";
    area.append(textarea);
    return area;
  }

  if (mode === "voice") {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "flashcard-note-answer-voice-btn";
    button.innerHTML = '<span class="material-symbols-rounded" aria-hidden="true">mic</span><span>入力する</span>';
    const transcript = document.createElement("p");
    transcript.className = "flashcard-note-answer-transcript";
    transcript.textContent = "文字起こしがここに表示されます。";
    area.append(button, transcript);
    return area;
  }

  const choices = getFlashcardNotebookAnswerChoices(page);
  const list = document.createElement("div");
  list.className = "flashcard-note-answer-choice-list";
  choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "flashcard-note-answer-choice";
    button.textContent = choice || `選択肢 ${index + 1}`;
    list.append(button);
  });
  area.append(list);
  return area;
}

function getFlashcardNotebookAnswerChoices(page) {
  const source = Array.isArray(page.choices) && page.choices.length > 0 ? page.choices : page.answers;
  const choices = (Array.isArray(source) ? source : []).map((choice) => normalizeFlashcardText(choice)).filter(Boolean);
  while (choices.length < 3) {
    choices.push(`選択肢 ${choices.length + 1}`);
  }
  return choices.slice(0, 3);
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
  const managerDraftQuestions = loadApprovedManagerDraftFlashcardQuestions();
  const managerDraftDecks = normalizeRemoteFlashcardQuestionArray(managerDraftQuestions);
  let remoteDecks = [];
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
    remoteDecks = isFlashcardQuestionsApiFallbackPayload(payload) ? [] : normalizeRemoteFlashcardDecks(payload);
  } catch (error) {
    console.warn("Failed to load remote questions:", error);
  } finally {
    window.clearTimeout(timeoutId);
  }
  return mergeFlashcardDeckCollections(remoteDecks, managerDraftDecks);
}

function loadApprovedManagerDraftFlashcardQuestions() {
  let drafts = [];
  try {
    const rawDrafts = window.localStorage?.getItem(FLASHCARD_MANAGER_DRAFT_STORAGE_KEY);
    drafts = rawDrafts ? JSON.parse(rawDrafts) : [];
  } catch {
    drafts = [];
  }
  if (!Array.isArray(drafts)) {
    return [];
  }
  return drafts.map(normalizeManagerDraftFlashcardQuestion).filter(Boolean);
}

function normalizeManagerDraftFlashcardQuestion(draft) {
  if (!draft || typeof draft !== "object" || Array.isArray(draft)) {
    return null;
  }
  const payload = draft.payload && typeof draft.payload === "object" && !Array.isArray(draft.payload) ? draft.payload : {};
  const status = normalizeFlashcardText(draft.status ?? payload.status).toLowerCase();
  if (status !== "approved") {
    return null;
  }
  const contentHtml = normalizeFlashcardText(draft.contentHtml ?? draft.content_html ?? payload.contentHtml ?? payload.content_html);
  const questionText =
    normalizeFlashcardText(draft.contentText ?? draft.content_text ?? payload.contentText ?? payload.content_text) ||
    stripFlashcardHtml(contentHtml);
  if (!questionText) {
    return null;
  }
  const choices = normalizeManagerDraftFlashcardTextArray(draft.choices ?? payload.choices);
  const answers = normalizeManagerDraftFlashcardTextArray(
    draft.answers ?? payload.answers ?? payload.correctAnswers ?? payload.correctAnswer ?? payload.answer
  );
  const note = normalizeFlashcardText(draft.note ?? payload.note);
  const deckId = normalizeFlashcardText(draft.deckId ?? payload.deckId ?? draft.subjectId ?? payload.subjectId);
  return {
    id: normalizeFlashcardText(draft.remoteId ?? draft.submissionId ?? draft.sourceCsvId ?? draft.id),
    deckId,
    subjectId: normalizeFlashcardText(draft.subjectId ?? payload.subjectId) || deckId,
    subjectLabel: normalizeFlashcardText(draft.subjectLabel ?? payload.subjectLabel) || note,
    subjectName: normalizeFlashcardText(draft.subjectName ?? payload.subjectName),
    seriesId: normalizeFlashcardText(draft.seriesId ?? payload.seriesId),
    seriesLabel: normalizeFlashcardText(draft.seriesLabel ?? payload.seriesLabel ?? draft.binder ?? payload.binder),
    binder: normalizeFlashcardText(draft.binder ?? payload.binder),
    note,
    unit:
      [draft.textNumber ?? payload.textNumber, draft.textName ?? payload.textName].map(normalizeFlashcardText).filter(Boolean).join(" ") ||
      normalizeFlashcardText(draft.chapter ?? payload.chapter) ||
      FLASHCARD_REMOTE_DEFAULT_UNIT,
    unitName:
      [draft.textNumber ?? payload.textNumber, draft.textName ?? payload.textName].map(normalizeFlashcardText).filter(Boolean).join(" ") ||
      normalizeFlashcardText(draft.chapter ?? payload.chapter) ||
      FLASHCARD_REMOTE_DEFAULT_UNIT,
    chapter: normalizeFlashcardText(draft.chapter ?? payload.chapter),
    question: questionText,
    prompt: questionText,
    choices,
    answers,
    correctAnswers: answers,
    explanation: normalizeFlashcardText(draft.explanation ?? payload.explanation),
    answerType: normalizeFlashcardText(draft.answerType ?? payload.answerType),
  };
}

function normalizeManagerDraftFlashcardTextArray(value) {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeFlashcardText(item)).filter(Boolean);
  }
  const text = normalizeFlashcardText(value);
  return text ? [text] : [];
}

function isFlashcardQuestionsApiFallbackPayload(payload) {
  const questions = getRemoteFlashcardQuestionArray(payload);
  if (!questions || questions.length !== 1) {
    return false;
  }
  const [question] = questions;
  return (
    normalizeFlashcardText(question?.id) === "q_001" &&
    normalizeFlashcardText(question?.subject).toLowerCase() === "english" &&
    normalizeFlashcardText(question?.question) === "次の英文を和訳しなさい。"
  );
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
    question.deckId ??
      question.subjectId ??
      question.note ??
      question.subjectLabel ??
      question.subjectName ??
      question.subject ??
      question.deck ??
      question.deckLabel ??
      question.bookId ??
      question.binder
  );
  if (!rawSubject) {
    return FLASHCARD_REMOTE_DEFAULT_DECK_ID;
  }

  const lowerSubject = rawSubject.normalize("NFKC").toLowerCase();
  const hyphenSubject = lowerSubject.replace(/[\s_]+/g, "-");
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
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createRemoteFlashcardSource(deckId, question) {
  const catalogEntry = getFlashcardSubjectCatalogEntry(deckId);
  const rawLabel = normalizeFlashcardText(
    question.subjectLabel ??
      question.subjectName ??
      question.note ??
      question.deckLabel ??
      question.bookLabel ??
      question.subject ??
      question.binder
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

function mergeFlashcardDeckCollections(...deckCollections) {
  const deckById = new Map();
  deckCollections.flat().forEach((deck) => {
    const deckId = normalizeFlashcardText(deck?.id);
    if (!deckId) {
      return;
    }
    const units = Array.isArray(deck.units) ? deck.units.filter(Boolean) : [];
    const existing = deckById.get(deckId);
    if (!existing) {
      deckById.set(deckId, {
        ...deck,
        id: deckId,
        units: units.map((unit) => ({
          ...unit,
          cards: Array.isArray(unit.cards) ? unit.cards.filter(Boolean) : [],
        })),
      });
      return;
    }
    existing.units.push(
      ...units.map((unit) => ({
        ...unit,
        cards: Array.isArray(unit.cards) ? unit.cards.filter(Boolean) : [],
      }))
    );
    existing.label = existing.label || deck.label;
    existing.seriesId = existing.seriesId || deck.seriesId;
    existing.seriesLabel = existing.seriesLabel || deck.seriesLabel;
  });
  return Array.from(deckById.values()).map((deck) => ({
    ...deck,
    totalCards: deck.units.reduce((sum, unit) => sum + (Array.isArray(unit.cards) ? unit.cards.length : 0), 0),
  }));
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
  const choices = Array.isArray(rawCard.choices)
    ? rawCard.choices.map((choice) => normalizeFlashcardText(choice)).filter(Boolean)
    : [];
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
    choices,
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
    recordActiveFlashcardProgress();
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
  recordActiveFlashcardProgress();
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
  recordActiveFlashcardProgress();
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
  recordActiveFlashcardProgress();
}

function renderCoinBoard(options = {}) {
  if (!elements.reviewCoinValue) {
    return;
  }
  elements.reviewCoinBoard?.classList.toggle("is-unlimited", hasUnlimitedReviewCoins());
  if (hasUnlimitedReviewCoins()) {
    if (reviewCoinAnimationFrameId !== null) {
      window.cancelAnimationFrame(reviewCoinAnimationFrameId);
      reviewCoinAnimationFrameId = null;
    }
    elements.reviewCoinValue.textContent = "∞";
    renderReviewCoinMenu();
    return;
  }
  const targetValue = normalizeCoinAmount(state.reviewCoin);
  const fromValue = options.fromZero ? 0 : readCoinAmountFromElement(elements.reviewCoinValue);
  animateReviewCoinValue(fromValue, targetValue);
  renderReviewCoinMenu();
}

function renderMypageCoin() {
  if (!elements.mypageCoinValueNumber) {
    return;
  }
  elements.mypageCoinValueNumber.textContent = hasUnlimitedReviewCoins() ? "∞" : formatCoinAmount(state.reviewCoin);
  renderReviewCoinMenu();
}

function hasUnlimitedReviewCoins() {
  return Boolean(state.hasUnlimitedReviewCoins || getManagerAccessRole(managerAccessState));
}

function normalizeManagerRoleValue(value) {
  if (typeof value !== "string") {
    return "";
  }
  const normalized = value.trim().toLowerCase().replace(/[\s-]/g, "_");
  const compact = normalized.replace(/_/g, "");
  return MANAGER_REVIEW_COIN_ROLE_ALIASES[normalized] || MANAGER_REVIEW_COIN_ROLE_ALIASES[compact] || "";
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
    return MANAGER_REVIEW_COIN_ROLES.find((role) => value[role] === true || value[role] === "true") || "";
  }
  return normalizeManagerRoleValue(value);
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
    permissions: access.permissions && typeof access.permissions === "object" ? access.permissions : {},
  };
}

function createManagerAccessFromProfilePayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return null;
  }
  const managerAccess = normalizeManagerAccessPayload(payload.managerAccess);
  if (managerAccess && getManagerAccessRole(managerAccess)) {
    return managerAccess;
  }
  const member = payload.managerMember || payload.manager_member;
  if (!member || typeof member !== "object" || Array.isArray(member)) {
    return null;
  }
  return normalizeManagerAccessPayload({
    canAccess: true,
    status: "member",
    member,
    permissions: payload.permissions ?? managerAccessState?.permissions ?? {},
  });
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
  const avatarStatus =
    typeof value?.avatarStatus === "string" && ["preparing", "published"].includes(value.avatarStatus)
      ? value.avatarStatus
      : DEFAULT_STORE_CONFIG.avatarStatus;
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

function renderStoreConfig() {
  renderAvaterItemList(elements.storeAvatarHint, { storeMode: true });
}

function renderAvater() {
  state.avater = normalizeAvaterState(state.avater);
  elements.avaterPreviews.forEach(renderAvaterPreview);
  renderLearnAvaterDock();
  renderAvaterItemList(elements.loginAvaterItemList, { storeMode: false });
  renderAvaterItemList(elements.storeAvatarHint, { storeMode: true });
  updateAvaterControlState();
  renderReviewCoinMenu();
}

function renderAvaterPreview(preview) {
  if (!preview) {
    return;
  }
  const baseImage = preview.querySelector(".avater-base-image");
  if (baseImage) {
    baseImage.src = AVATER_BASE_IMAGE;
  }
  preview.querySelectorAll(".avater-layer, .avater-delete-popover").forEach((layer) => layer.remove());
  Object.values(state.avater.equipped || {}).forEach((itemId) => {
    const item = getAvaterItem(itemId);
    if (!item) {
      return;
    }
    const offset = getAvaterItemOffset(item.id);
    const layer = document.createElement("span");
    layer.className = `avater-layer ${item.className} avater-category-${item.category}${item.image?.dataUrl ? " has-custom-image" : ""}`;
    layer.dataset.avaterLayer = item.id;
    layer.dataset.avaterCategory = item.category;
    layer.style.setProperty("--avater-item-offset-x", `${offset.x}px`);
    layer.style.setProperty("--avater-item-offset-y", `${offset.y}px`);
    layer.setAttribute("role", "button");
    layer.setAttribute("tabindex", "0");
    layer.setAttribute("aria-label", `${item.name}を調整`);
    if (item.image?.dataUrl) {
      const image = document.createElement("img");
      image.src = item.image.dataUrl;
      image.alt = "";
      layer.append(image);
    }
    preview.append(layer);
  });
}

function renderAvaterItemList(container, options = {}) {
  if (!container) {
    return;
  }
  const storeMode = Boolean(options.storeMode);
  const items = getAvailableAvaterItems();
  const categoryButtons = AVATER_CATEGORY_ORDER.map((category) => {
    const label = AVATER_CATEGORY_LABELS[category] || category;
    const isActive = category === activeAvaterCategory;
    return `<button class="avater-category-tab ${isActive ? "is-active" : ""}" type="button" data-avater-category="${escapeHtml(category)}" aria-pressed="${String(isActive)}">${escapeHtml(label)}</button>`;
  }).join("");
  const categoryItems = items.filter((item) => item.category === activeAvaterCategory);
  const isNoneEquipped = !state.avater.equipped?.[activeAvaterCategory];
  const noneCard = `
      <article class="avater-item-card avater-none-card ${isNoneEquipped ? "is-equipped" : ""}" data-avater-none-category="${escapeHtml(activeAvaterCategory)}" aria-disabled="false">
        <div class="avater-item-sample avater-item-sample-none" aria-hidden="true"></div>
        <div class="avater-item-body">
          <p class="avater-item-category">${escapeHtml(AVATER_CATEGORY_LABELS[activeAvaterCategory] || activeAvaterCategory)}</p>
          <h3>なし</h3>
        </div>
        <button class="secondary" type="button" data-avater-none-category="${escapeHtml(activeAvaterCategory)}">
          ${isNoneEquipped ? "選択中" : "選ぶ"}
        </button>
      </article>
    `;
  const itemCards = categoryItems.map((item) => {
    const isUnlocked = isAvaterItemUnlocked(item.id);
    const isEquipped = state.avater.equipped?.[item.category] === item.id;
    const canAfford = hasUnlimitedReviewCoins() || state.reviewCoin >= item.cost;
    const canUseItem = isUnlocked || canAfford;
    const buttonText = isEquipped ? "選択中" : isUnlocked ? "追加する" : `${item.cost}`;
    const sampleImage = item.image?.dataUrl
      ? `<img class="avater-item-sample-image" src="${escapeHtml(item.image.dataUrl)}" alt="" />`
      : "";
    return `
      <article class="avater-item-card ${isEquipped ? "is-equipped" : ""}" draggable="${String(canUseItem)}" data-avater-item="${escapeHtml(item.id)}" aria-disabled="${String(!canUseItem)}">
        <div class="avater-item-sample ${item.className} avater-category-${item.category}${sampleImage ? " has-custom-image" : ""}" aria-hidden="true">${sampleImage}</div>
        <div class="avater-item-body">
          <p class="avater-item-category">${escapeHtml(AVATER_CATEGORY_LABELS[item.category] || item.category)}</p>
          <h3>${escapeHtml(item.name)}</h3>
          ${
            storeMode && !isUnlocked
              ? `<p class="avater-item-cost"><img src="./assets/icons/coin.png?v=20260326-1" alt="" aria-hidden="true" />${escapeHtml(String(item.cost))}</p>`
              : ""
          }
        </div>
        <button class="${isUnlocked ? "secondary" : "primary"}" type="button" data-avater-item="${escapeHtml(item.id)}" ${!canUseItem ? "disabled" : ""}>
          ${escapeHtml(buttonText)}
        </button>
      </article>
    `;
  }).join("");
  container.innerHTML = `
    <div class="avater-category-tabs" role="tablist" aria-label="Avaterカテゴリー">${categoryButtons}</div>
    <div class="avater-category-panel">
      ${noneCard}${itemCards}
    </div>
  `;
}

function getAvaterItem(itemId) {
  return getAvailableAvaterItems().find((item) => item.id === itemId) || null;
}

function getAvailableAvaterItems() {
  return [...AVATER_ITEMS, ...loadCustomAvaterItems()];
}

function loadCustomAvaterItems() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(AVATER_CUSTOM_ITEMS_KEY) || "[]");
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed
      .map((item) => ({
        id: String(item?.id || "").trim(),
        category: normalizeAvaterCategory(item?.category) || "accessory",
        name: String(item?.name || "").trim(),
        cost: normalizeCoinAmount(item?.cost),
        image: normalizeCustomAvaterItemImage(item?.image),
        className: "avater-item-custom",
      }))
      .filter((item) => item.id && item.name && Object.prototype.hasOwnProperty.call(AVATER_CATEGORY_LABELS, item.category));
  } catch {
    return [];
  }
}

function normalizeCustomAvaterItemImage(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  const dataUrl = typeof value.dataUrl === "string" && value.dataUrl.startsWith("data:image/") ? value.dataUrl : "";
  if (!dataUrl) {
    return null;
  }
  return {
    name: typeof value.name === "string" ? value.name : "",
    type: typeof value.type === "string" ? value.type : "",
    size: Number.isFinite(Number(value.size)) ? Number(value.size) : 0,
    dataUrl,
  };
}

function isAvaterItemUnlocked(itemId) {
  const item = getAvaterItem(itemId);
  if (!item) {
    return false;
  }
  return hasUnlimitedReviewCoins() || item.cost === 0 || Boolean(state.avater.unlockedItems?.[itemId]);
}

function handleAvaterNoneAction(category) {
  const normalizedCategory = normalizeAvaterCategory(category) || activeAvaterCategory;
  state.avater = normalizeAvaterState(state.avater);
  state.avater.equipped[normalizedCategory] = "";
  saveState();
  renderAvater();
}

function handleAvaterItemAction(itemId, options = {}) {
  const item = getAvaterItem(itemId);
  if (!item) {
    return;
  }
  const previousCoin = state.reviewCoin;
  const isAlreadyOwned = item.cost === 0 || Boolean(state.avater.unlockedItems?.[item.id]);
  if (!isAlreadyOwned) {
    if (!hasUnlimitedReviewCoins() && state.reviewCoin < item.cost) {
      return;
    }
    if (!hasUnlimitedReviewCoins()) {
      state.reviewCoin -= item.cost;
    }
    state.avater.unlockedItems[item.id] = true;
  }
  const isCurrentlyEquipped = state.avater.equipped[item.category] === item.id;
  state.avater.equipped[item.category] = options.forceEquip || !isCurrentlyEquipped ? item.id : "";
  saveState();
  if (previousCoin > state.reviewCoin) {
    markReviewCoinSpendAnimation();
  }
  renderCoinBoard();
  renderMypageCoin();
  renderAvater();
}

function normalizeAvaterCategory(value) {
  const category = typeof value === "string" ? value.trim() : "";
  return AVATER_CATEGORY_ORDER.includes(category) ? category : "";
}

function getAvaterItemOffset(itemId) {
  const offset = state.avater.itemOffsets?.[itemId] || {};
  return {
    x: Math.max(-56, Math.min(56, Number(offset.x) || 0)),
    y: Math.max(-56, Math.min(56, Number(offset.y) || 0)),
  };
}

function setAvaterItemOffset(itemId, offset) {
  if (!itemId) {
    return;
  }
  state.avater.itemOffsets = state.avater.itemOffsets && typeof state.avater.itemOffsets === "object" ? state.avater.itemOffsets : {};
  state.avater.itemOffsets[itemId] = {
    x: Math.max(-56, Math.min(56, Number(offset.x) || 0)),
    y: Math.max(-56, Math.min(56, Number(offset.y) || 0)),
  };
}

function handleAvaterLayerPointerDown(event) {
  const layer = event.target.closest("[data-avater-layer]");
  if (!layer || event.button !== 0) {
    return;
  }
  event.preventDefault();
  removeAvaterDeletePopovers();
  const itemId = layer.dataset.avaterLayer || "";
  avaterLayerDragState = {
    pointerId: event.pointerId,
    layer,
    itemId,
    startX: event.clientX,
    startY: event.clientY,
    startOffset: getAvaterItemOffset(itemId),
    moved: false,
  };
  layer.classList.add("is-dragging");
  layer.setPointerCapture?.(event.pointerId);
}

function handleAvaterLayerPointerMove(event) {
  if (!avaterLayerDragState || avaterLayerDragState.pointerId !== event.pointerId) {
    return;
  }
  const dx = event.clientX - avaterLayerDragState.startX;
  const dy = event.clientY - avaterLayerDragState.startY;
  if (Math.abs(dx) + Math.abs(dy) > 3) {
    avaterLayerDragState.moved = true;
  }
  const nextOffset = {
    x: avaterLayerDragState.startOffset.x + dx,
    y: avaterLayerDragState.startOffset.y + dy,
  };
  setAvaterItemOffset(avaterLayerDragState.itemId, nextOffset);
  avaterLayerDragState.layer.style.setProperty("--avater-item-offset-x", `${getAvaterItemOffset(avaterLayerDragState.itemId).x}px`);
  avaterLayerDragState.layer.style.setProperty("--avater-item-offset-y", `${getAvaterItemOffset(avaterLayerDragState.itemId).y}px`);
}

function finishAvaterLayerPointerDrag(event) {
  if (!avaterLayerDragState || avaterLayerDragState.pointerId !== event.pointerId) {
    return;
  }
  avaterLayerDragState.layer.classList.remove("is-dragging");
  avaterLayerDragState.layer.releasePointerCapture?.(event.pointerId);
  if (avaterLayerDragState.moved) {
    avaterLayerClickSuppressUntil = Date.now() + 180;
    saveState();
    renderAvater();
  } else {
    saveState();
  }
  avaterLayerDragState = null;
}

function handleAvaterPreviewClick(event) {
  const removeButton = event.target.closest("[data-avater-remove-item]");
  if (removeButton) {
    removeEquippedAvaterItem(removeButton.dataset.avaterRemoveItem || "");
    return;
  }
  const layer = event.target.closest("[data-avater-layer]");
  if (layer) {
    if (Date.now() < avaterLayerClickSuppressUntil) {
      return;
    }
    showAvaterDeletePopover(layer);
    return;
  }
  removeAvaterDeletePopovers();
}

function showAvaterDeletePopover(layer) {
  const preview = layer.closest("[data-avater-preview]");
  if (!preview) {
    return;
  }
  removeAvaterDeletePopovers();
  const previewRect = preview.getBoundingClientRect();
  const layerRect = layer.getBoundingClientRect();
  const popover = document.createElement("div");
  popover.className = "avater-delete-popover";
  popover.style.left = `${Math.max(18, Math.min(previewRect.width - 18, layerRect.left + layerRect.width / 2 - previewRect.left))}px`;
  popover.style.top = `${Math.max(8, layerRect.top - previewRect.top - 8)}px`;
  popover.innerHTML = `<button type="button" data-avater-remove-item="${escapeHtml(layer.dataset.avaterLayer || "")}">このアイテムを削除する</button>`;
  preview.append(popover);
}

function removeEquippedAvaterItem(itemId) {
  const item = getAvaterItem(itemId);
  if (!item || state.avater.equipped?.[item.category] !== item.id) {
    removeAvaterDeletePopovers();
    return;
  }
  state.avater.equipped[item.category] = "";
  saveState();
  renderAvater();
}

function removeAvaterDeletePopovers() {
  document.querySelectorAll(".avater-delete-popover").forEach((popover) => popover.remove());
}

function resetAvaterOffsets() {
  state.avater = normalizeAvaterState(state.avater);
  state.avater.itemOffsets = {};
  state.avater.offsetX = 0;
  state.avater.offsetY = 0;
  removeAvaterDeletePopovers();
  saveState();
  renderAvater();
}

function toggleAvaterScrollLock() {
  setAvaterScrollLock(!isAvaterScrollLocked);
}

function setAvaterScrollLock(shouldLock) {
  isAvaterScrollLocked = Boolean(shouldLock);
  document.documentElement.classList.toggle("avater-scroll-locked", isAvaterScrollLocked);
  document.body.classList.toggle("avater-scroll-locked", isAvaterScrollLocked);
  updateAvaterControlState();
}

function updateAvaterControlState() {
  if (!elements.avaterScrollLockBtn) {
    return;
  }
  elements.avaterScrollLockBtn.classList.toggle("is-active", isAvaterScrollLocked);
  elements.avaterScrollLockBtn.setAttribute("aria-pressed", String(isAvaterScrollLocked));
  const icon = elements.avaterScrollLockBtn.querySelector(".material-symbols-rounded");
  if (icon) {
    icon.textContent = isAvaterScrollLocked ? "lock" : "lock_open";
  }
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

function markReviewCoinSpendAnimation() {
  if (!elements.reviewCoinBoard) {
    return;
  }
  elements.reviewCoinBoard.classList.remove("is-spending");
  void elements.reviewCoinBoard.offsetWidth;
  elements.reviewCoinBoard.classList.add("is-spending");
  window.setTimeout(() => {
    elements.reviewCoinBoard?.classList.remove("is-spending");
  }, 700);
}

function toggleReviewCoinMenu() {
  if (isReviewCoinMenuOpen) {
    closeReviewCoinMenu();
    return;
  }
  openReviewCoinMenu();
}

function openStoreFromCoinBoard() {
  openReviewCoinMenu();
}

function openReviewCoinMenu() {
  closeInfoMenu();
  closeMypageSubmenu();
  closeLearnPopover();
  if (!state.auth.isLoggedIn) {
    promptLoginForMypage();
    return;
  }
  if (state.auth.provider !== "guest" && !hasUnlimitedReviewCoins() && !managerAccessState) {
    showAuthLoginRequiredDialog({
      targetScreen: "mypage",
      targetMypagePage: "top",
      onboardingStep: "nickname",
    });
    return;
  }
  isReviewCoinMenuOpen = true;
  document.documentElement.classList.add("review-coin-menu-scroll-locked");
  document.body.classList.add("review-coin-menu-open", "review-coin-menu-scroll-locked");
  renderReviewCoinMenu();
  const menu = ensureReviewCoinMenu();
  if (menu) {
    menu.hidden = false;
    menu.setAttribute("aria-hidden", "false");
  }
  elements.reviewCoinBoard?.setAttribute("aria-expanded", "true");
  syncReviewCoinMenuGeometry();
  window.requestAnimationFrame(syncReviewCoinMenuGeometry);
}

function closeReviewCoinMenu() {
  if (!isReviewCoinMenuOpen) {
    return;
  }
  isReviewCoinMenuOpen = false;
  document.documentElement.classList.remove("review-coin-menu-scroll-locked");
  document.body.classList.remove("review-coin-menu-open", "review-coin-menu-scroll-locked");
  elements.reviewCoinBoard?.setAttribute("aria-expanded", "false");
  const menu = document.getElementById("reviewCoinMenu");
  if (menu) {
    menu.hidden = true;
    menu.setAttribute("aria-hidden", "true");
  }
}

function ensureReviewCoinMenu() {
  let menu = document.getElementById("reviewCoinMenu");
  if (menu) {
    return menu;
  }
  if (!document.body) {
    return null;
  }
  menu = document.createElement("section");
  menu.id = "reviewCoinMenu";
  menu.className = "review-coin-menu";
  menu.hidden = true;
  menu.setAttribute("role", "dialog");
  menu.setAttribute("aria-modal", "false");
  menu.setAttribute("aria-hidden", "true");
  menu.setAttribute("aria-label", "Review Coin Menu");
  menu.innerHTML = `
    <div class="review-coin-menu-shell">
      <header class="review-coin-menu-head">
        <div>
          <p class="review-coin-menu-kicker">Review Coin</p>
          <h2>Review Coin Menu</h2>
        </div>
        <button class="review-coin-menu-close" type="button" data-review-coin-menu-close aria-label="閉じる">
          <span class="material-symbols-rounded" aria-hidden="true">close</span>
        </button>
      </header>
      <div class="review-coin-menu-balance" aria-label="Review Coin枚数">
        <img src="./assets/icons/coin.png?v=20260326-1" alt="" aria-hidden="true" />
        <span>Review Coin枚数</span>
        <strong data-review-coin-menu-balance>0</strong>
      </div>
      <div class="review-coin-menu-tabs" role="tablist" aria-label="Review Coin Menu">
        <button type="button" data-review-coin-menu-mode="theme" role="tab">カラーテーマ</button>
        <button type="button" data-review-coin-menu-mode="avater" role="tab">Avater</button>
      </div>
      <div class="review-coin-menu-layout">
        <div class="review-coin-menu-list" data-review-coin-menu-list></div>
        <div class="review-coin-menu-ran avater-preview avater-preview-large" data-avater-preview data-review-coin-menu-preview>
          <img class="avater-base-image" src="./assets/avater/らーん1-1.png" alt="" />
        </div>
        <aside class="review-coin-menu-detail">
          <div class="review-coin-menu-selected" data-review-coin-menu-selected></div>
          <button class="primary review-coin-menu-action" type="button" data-review-coin-menu-primary>着用する</button>
        </aside>
      </div>
    </div>
  `;
  menu.addEventListener("click", handleReviewCoinMenuClick);
  document.body.append(menu);
  elements.avaterPreviews.push(menu.querySelector("[data-review-coin-menu-preview]"));
  return menu;
}

function handleReviewCoinMenuClick(event) {
  const source = event.target instanceof Element ? event.target : null;
  if (!source) {
    return;
  }
  if (source.closest("[data-review-coin-menu-close]")) {
    closeReviewCoinMenu();
    return;
  }
  const modeButton = source.closest("[data-review-coin-menu-mode]");
  if (modeButton) {
    const mode = modeButton.dataset.reviewCoinMenuMode === "avater" ? "avater" : "theme";
    reviewCoinMenuMode = mode;
    reviewCoinMenuSelection = getDefaultReviewCoinMenuSelection(mode);
    renderReviewCoinMenu();
    return;
  }
  const themeButton = source.closest("[data-review-coin-menu-theme]");
  if (themeButton) {
    const theme = normalizeTheme(themeButton.dataset.reviewCoinMenuTheme);
    reviewCoinMenuSelection = { type: "theme", id: theme };
    renderReviewCoinMenu();
    return;
  }
  const avaterCategoryButton = source.closest("[data-review-coin-menu-avater-category]");
  if (avaterCategoryButton) {
    activeAvaterCategory = normalizeAvaterCategory(avaterCategoryButton.dataset.reviewCoinMenuAvaterCategory) || activeAvaterCategory;
    reviewCoinMenuSelection = { type: "avater-none", id: activeAvaterCategory };
    renderReviewCoinMenu();
    return;
  }
  const avaterNoneButton = source.closest("[data-review-coin-menu-avater-none]");
  if (avaterNoneButton) {
    const category = normalizeAvaterCategory(avaterNoneButton.dataset.reviewCoinMenuAvaterNone) || activeAvaterCategory;
    reviewCoinMenuSelection = { type: "avater-none", id: category };
    renderReviewCoinMenu();
    return;
  }
  const avaterButton = source.closest("[data-review-coin-menu-avater]");
  if (avaterButton) {
    reviewCoinMenuSelection = { type: "avater", id: avaterButton.dataset.reviewCoinMenuAvater || "" };
    renderReviewCoinMenu();
    return;
  }
  if (source.closest("[data-review-coin-menu-primary]")) {
    handleReviewCoinMenuPrimaryAction();
  }
}

function renderReviewCoinMenu() {
  const menu = document.getElementById("reviewCoinMenu");
  if (!menu && !isReviewCoinMenuOpen) {
    return;
  }
  const root = ensureReviewCoinMenu();
  if (!root) {
    return;
  }
  reviewCoinMenuSelection = normalizeReviewCoinMenuSelection(reviewCoinMenuSelection);
  const balance = root.querySelector("[data-review-coin-menu-balance]");
  if (balance) {
    balance.textContent = hasUnlimitedReviewCoins() ? "∞" : formatCoinAmount(state.reviewCoin);
  }
  root.querySelectorAll("[data-review-coin-menu-mode]").forEach((button) => {
    const isActive = button.dataset.reviewCoinMenuMode === reviewCoinMenuMode;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  const list = root.querySelector("[data-review-coin-menu-list]");
  if (list) {
    list.innerHTML = reviewCoinMenuMode === "avater" ? renderReviewCoinMenuAvaterList() : renderReviewCoinMenuThemeList();
  }
  const selected = root.querySelector("[data-review-coin-menu-selected]");
  if (selected) {
    selected.innerHTML =
      reviewCoinMenuMode === "avater" ? renderReviewCoinMenuAvaterDetail() : renderReviewCoinMenuThemeDetail();
  }
  updateReviewCoinMenuPrimaryButton(root);
  renderAvaterPreview(root.querySelector("[data-review-coin-menu-preview]"));
  if (isReviewCoinMenuOpen) {
    window.requestAnimationFrame(syncReviewCoinMenuGeometry);
  }
}

function getDefaultReviewCoinMenuSelection(mode = reviewCoinMenuMode) {
  if (mode === "avater") {
    const equippedItemId = state.avater?.equipped?.[activeAvaterCategory] || "";
    return equippedItemId ? { type: "avater", id: equippedItemId } : { type: "avater-none", id: activeAvaterCategory };
  }
  return { type: "theme", id: state.settings.theme };
}

function normalizeReviewCoinMenuSelection(selection) {
  if (reviewCoinMenuMode === "avater") {
    if (selection?.type === "avater" && getAvaterItem(selection.id)) {
      return { type: "avater", id: selection.id };
    }
    const category = normalizeAvaterCategory(selection?.id) || activeAvaterCategory;
    return { type: "avater-none", id: category };
  }
  return { type: "theme", id: normalizeTheme(selection?.id || state.settings.theme) };
}

function renderReviewCoinMenuThemeList() {
  return AVAILABLE_THEMES.map((themeKey) => {
    const isSelected = reviewCoinMenuSelection.type === "theme" && reviewCoinMenuSelection.id === themeKey;
    const isUnlocked = isThemeUnlocked(themeKey);
    const isCurrent = state.settings.theme === themeKey;
    const cost = getThemeUnlockCost(themeKey);
    return `
      <button class="review-coin-menu-item theme-menu-item ${isSelected ? "is-selected" : ""}" type="button" data-review-coin-menu-theme="${escapeHtml(themeKey)}">
        <span class="theme-swatch theme-swatch-${escapeHtml(themeKey)}" aria-hidden="true"></span>
        <span class="review-coin-menu-item-text">
          <strong>${escapeHtml(getThemeDisplayName(themeKey))}</strong>
          <small>${isCurrent ? "着用中" : isUnlocked ? "購入済み" : `${cost} Coin`}</small>
        </span>
      </button>
    `;
  }).join("");
}

function renderReviewCoinMenuAvaterList() {
  const categoryTabs = AVATER_CATEGORY_ORDER.map((category) => {
    const isActive = category === activeAvaterCategory;
    return `
      <button class="review-coin-menu-category ${isActive ? "is-active" : ""}" type="button" data-review-coin-menu-avater-category="${escapeHtml(category)}">
        ${escapeHtml(AVATER_CATEGORY_LABELS[category] || category)}
      </button>
    `;
  }).join("");
  const items = getAvailableAvaterItems().filter((item) => item.category === activeAvaterCategory);
  const isNoneSelected = reviewCoinMenuSelection.type === "avater-none" && reviewCoinMenuSelection.id === activeAvaterCategory;
  const noneCard = `
    <button class="review-coin-menu-item avater-menu-item ${isNoneSelected ? "is-selected" : ""}" type="button" data-review-coin-menu-avater-none="${escapeHtml(activeAvaterCategory)}">
      <span class="avater-item-sample avater-item-sample-none" aria-hidden="true"></span>
      <span class="review-coin-menu-item-text">
        <strong>なし</strong>
        <small>${state.avater.equipped?.[activeAvaterCategory] ? "はずす" : "選択中"}</small>
      </span>
    </button>
  `;
  const itemCards = items.map((item) => {
    const isSelected = reviewCoinMenuSelection.type === "avater" && reviewCoinMenuSelection.id === item.id;
    const isUnlocked = isAvaterItemUnlocked(item.id);
    const isEquipped = state.avater.equipped?.[item.category] === item.id;
    const sampleImage = item.image?.dataUrl
      ? `<img class="avater-item-sample-image" src="${escapeHtml(item.image.dataUrl)}" alt="" />`
      : "";
    return `
      <button class="review-coin-menu-item avater-menu-item ${isSelected ? "is-selected" : ""}" type="button" data-review-coin-menu-avater="${escapeHtml(item.id)}">
        <span class="avater-item-sample ${escapeHtml(item.className)} avater-category-${escapeHtml(item.category)}${sampleImage ? " has-custom-image" : ""}" aria-hidden="true">${sampleImage}</span>
        <span class="review-coin-menu-item-text">
          <strong>${escapeHtml(item.name)}</strong>
          <small>${isEquipped ? "着用中" : isUnlocked ? "購入済み" : `${item.cost} Coin`}</small>
        </span>
      </button>
    `;
  }).join("");
  const emptyMessage = items.length
    ? ""
    : `<p class="review-coin-menu-empty">このカテゴリーのアイテムはまだありません。</p>`;
  return `
    <div class="review-coin-menu-categories">${categoryTabs}</div>
    ${noneCard}
    ${itemCards}
    ${emptyMessage}
  `;
}

function renderReviewCoinMenuThemeDetail() {
  const themeKey = normalizeTheme(reviewCoinMenuSelection.id);
  const isUnlocked = isThemeUnlocked(themeKey);
  const isCurrent = state.settings.theme === themeKey;
  const cost = getThemeUnlockCost(themeKey);
  const balanceText = hasUnlimitedReviewCoins() ? "∞" : formatCoinAmount(state.reviewCoin);
  return `
    <div class="review-coin-menu-selected-preview">
      <span class="theme-swatch theme-swatch-${escapeHtml(themeKey)}" aria-hidden="true"></span>
    </div>
    <p class="review-coin-menu-selected-kind">カラーテーマ</p>
    <h3>${escapeHtml(getThemeDisplayName(themeKey))}</h3>
    <p class="review-coin-menu-selected-status">
      ${isCurrent ? "現在のテーマです。" : isUnlocked ? "購入済みです。着用できます。" : `${cost} Coinで購入できます。`}
    </p>
    <p class="review-coin-menu-selected-balance">所持: ${escapeHtml(balanceText)} Coin</p>
  `;
}

function renderReviewCoinMenuAvaterDetail() {
  if (reviewCoinMenuSelection.type === "avater-none") {
    const category = normalizeAvaterCategory(reviewCoinMenuSelection.id) || activeAvaterCategory;
    const isEquipped = !state.avater.equipped?.[category];
    return `
      <div class="review-coin-menu-selected-preview">
        <span class="avater-item-sample avater-item-sample-none" aria-hidden="true"></span>
      </div>
      <p class="review-coin-menu-selected-kind">Avater</p>
      <h3>${escapeHtml(AVATER_CATEGORY_LABELS[category] || category)}を外す</h3>
      <p class="review-coin-menu-selected-status">${isEquipped ? "このカテゴリーは何も着用していません。" : "このカテゴリーのアイテムを外します。"}</p>
    `;
  }
  const item = getAvaterItem(reviewCoinMenuSelection.id);
  if (!item) {
    return `<p class="review-coin-menu-empty">アイテムを選択してください。</p>`;
  }
  const isUnlocked = isAvaterItemUnlocked(item.id);
  const isEquipped = state.avater.equipped?.[item.category] === item.id;
  const sampleImage = item.image?.dataUrl
    ? `<img class="avater-item-sample-image" src="${escapeHtml(item.image.dataUrl)}" alt="" />`
    : "";
  return `
    <div class="review-coin-menu-selected-preview">
      <span class="avater-item-sample ${escapeHtml(item.className)} avater-category-${escapeHtml(item.category)}${sampleImage ? " has-custom-image" : ""}" aria-hidden="true">${sampleImage}</span>
    </div>
    <p class="review-coin-menu-selected-kind">Avater</p>
    <h3>${escapeHtml(item.name)}</h3>
    <p class="review-coin-menu-selected-status">
      ${isEquipped ? "現在着用中です。" : isUnlocked ? "購入済みです。着用できます。" : `${item.cost} Coinで購入できます。`}
    </p>
  `;
}

function updateReviewCoinMenuPrimaryButton(root = document.getElementById("reviewCoinMenu")) {
  const button = root?.querySelector("[data-review-coin-menu-primary]");
  if (!button) {
    return;
  }
  const action = getReviewCoinMenuPrimaryAction();
  button.textContent = action.label;
  button.disabled = action.disabled;
  button.classList.toggle("secondary", action.kind === "secondary");
  button.classList.toggle("primary", action.kind !== "secondary");
}

function getReviewCoinMenuPrimaryAction() {
  if (reviewCoinMenuMode === "theme") {
    const themeKey = normalizeTheme(reviewCoinMenuSelection.id);
    const isUnlocked = isThemeUnlocked(themeKey);
    const isCurrent = state.settings.theme === themeKey;
    const cost = getThemeUnlockCost(themeKey);
    if (isCurrent) {
      return { label: "着用中", disabled: true, kind: "secondary" };
    }
    if (isUnlocked) {
      return { label: "着用する", disabled: false, kind: "primary" };
    }
    if (!hasUnlimitedReviewCoins() && state.reviewCoin < cost) {
      return { label: "コイン不足", disabled: true, kind: "secondary" };
    }
    return { label: "購入して着用する", disabled: false, kind: "primary" };
  }
  if (reviewCoinMenuSelection.type === "avater-none") {
    const category = normalizeAvaterCategory(reviewCoinMenuSelection.id) || activeAvaterCategory;
    const isEquipped = !state.avater.equipped?.[category];
    return { label: isEquipped ? "選択中" : "はずす", disabled: isEquipped, kind: isEquipped ? "secondary" : "primary" };
  }
  const item = getAvaterItem(reviewCoinMenuSelection.id);
  if (!item) {
    return { label: "選択してください", disabled: true, kind: "secondary" };
  }
  const isUnlocked = isAvaterItemUnlocked(item.id);
  const isEquipped = state.avater.equipped?.[item.category] === item.id;
  if (isEquipped) {
    return { label: "着用中", disabled: true, kind: "secondary" };
  }
  if (isUnlocked) {
    return { label: "着用する", disabled: false, kind: "primary" };
  }
  if (!hasUnlimitedReviewCoins() && state.reviewCoin < item.cost) {
    return { label: "コイン不足", disabled: true, kind: "secondary" };
  }
  return { label: "購入して着用する", disabled: false, kind: "primary" };
}

function handleReviewCoinMenuPrimaryAction() {
  if (reviewCoinMenuMode === "theme") {
    const themeKey = normalizeTheme(reviewCoinMenuSelection.id);
    if (isThemeUnlocked(themeKey)) {
      updateThemeSetting(themeKey);
    } else {
      proceedThemeUnlock(themeKey);
    }
    reviewCoinMenuSelection = { type: "theme", id: themeKey };
    renderReviewCoinMenu();
    return;
  }
  if (reviewCoinMenuSelection.type === "avater-none") {
    handleAvaterNoneAction(reviewCoinMenuSelection.id);
    renderReviewCoinMenu();
    return;
  }
  const item = getAvaterItem(reviewCoinMenuSelection.id);
  if (!item) {
    return;
  }
  handleAvaterItemAction(item.id, { forceEquip: true });
  reviewCoinMenuSelection = { type: "avater", id: item.id };
  renderReviewCoinMenu();
}

function syncReviewCoinMenuGeometry() {
  const menu = document.getElementById("reviewCoinMenu");
  const board = elements.reviewCoinBoard;
  if (!menu || menu.hidden || !board) {
    return;
  }
  const viewportWidth = Math.max(0, window.innerWidth || document.documentElement.clientWidth || 0);
  const boardRect = board.getBoundingClientRect();
  const sideInset = viewportWidth <= 760 ? 32 : 16;
  const width = Math.min(580, Math.max(280, viewportWidth - sideInset * 2));
  const preferredLeft = boardRect.right - width;
  const left = Math.max(sideInset, Math.min(preferredLeft, viewportWidth - width - sideInset));
  const top = Math.max(12, boardRect.bottom + 12);
  const arrowX = Math.max(28, Math.min(boardRect.left + boardRect.width / 2 - left, width - 28));
  document.documentElement.style.setProperty("--review-coin-menu-left", `${left}px`);
  document.documentElement.style.setProperty("--review-coin-menu-top", `${top}px`);
  document.documentElement.style.setProperty("--review-coin-menu-width", `${width}px`);
  document.documentElement.style.setProperty("--review-coin-menu-arrow-x", `${arrowX}px`);

  const character = elements.navCharacter;
  if (!character) {
    return;
  }
  const menuRect = menu.getBoundingClientRect();
  const characterRect = character.getBoundingClientRect();
  const characterCenterX = characterRect.left + characterRect.width / 2;
  const characterCenterY = characterRect.top + characterRect.height / 2;
  const targetCenterX = menuRect.left + menuRect.width / 2;
  const targetCenterY = Math.min(window.innerHeight - 72, menuRect.bottom + characterRect.height * 0.32);
  document.documentElement.style.setProperty("--review-coin-menu-avatar-shift-x", `${targetCenterX - characterCenterX}px`);
  document.documentElement.style.setProperty("--review-coin-menu-avatar-shift-y", `${targetCenterY - characterCenterY}px`);
}

function getAuthNicknameText(fallbackText = "未設定") {
  if (!state.auth.isLoggedIn) {
    return fallbackText;
  }
  const nickname = normalizeNicknameText(state.auth.nickname);
  if (nickname) {
    return nickname;
  }
  return state.auth.provider === "guest" ? "Guest Mode" : fallbackText;
}

function renderMypageSettings() {
  const nicknameText = getAuthNicknameText();
  const isGuestMode = state.auth.isLoggedIn && state.auth.provider === "guest";
  const isGoogleAccount = state.auth.isLoggedIn && state.auth.provider === "google";
  const isReviewAccount = state.auth.isLoggedIn && state.auth.provider !== "guest";
  if (elements.infoMenuUser) {
    elements.infoMenuUser.hidden = isGuestMode;
  }
  if (elements.infoMenuNickname) {
    elements.infoMenuNickname.textContent = nicknameText;
  }
  if (elements.authNicknameText) {
    elements.authNicknameText.textContent = nicknameText;
  }
  if (elements.authEmailText) {
    const emailText = normalizeAccountEmailText(state.auth.email);
    elements.authEmailText.textContent = state.auth.isLoggedIn && emailText ? emailText : "未設定";
  }
  if (elements.authPasswordText) {
    const passwordText = normalizeAccountPasswordText(state.auth.password);
    elements.authPasswordText.textContent = state.auth.isLoggedIn && passwordText
      ? isAccountPasswordVisible
        ? passwordText
        : "*****"
      : "未設定";
  }
  syncAccountPasswordToggle(elements.authPasswordToggleBtn, isAccountPasswordVisible, "パスワード");
  if (elements.authLoginStatusText) {
    elements.authLoginStatusText.classList.toggle("is-logged-in", state.auth.isLoggedIn && state.auth.provider !== "guest");
    elements.authLoginStatusText.classList.toggle("is-guest", state.auth.isLoggedIn && state.auth.provider === "guest");
    elements.authLoginStatusText.classList.toggle("is-logged-out", !state.auth.isLoggedIn);
    if (!state.auth.isLoggedIn) {
      elements.authLoginStatusText.textContent = "未ログイン";
    } else if (state.auth.provider === "guest") {
      elements.authLoginStatusText.textContent = "Guest Mode";
    } else {
      elements.authLoginStatusText.textContent = "ログイン中";
    }
  }

  if (elements.logoutBtn) {
    elements.logoutBtn.disabled = !state.auth.isLoggedIn;
    elements.logoutBtn.classList.toggle("is-danger-action", isGuestMode);
    elements.logoutBtn.classList.toggle("secondary", !isGuestMode);
    elements.logoutBtn.classList.toggle("danger", isGuestMode);
  }
  if (elements.accountEditBtn) {
    elements.accountEditBtn.disabled = !state.auth.isLoggedIn;
    const icon = elements.accountEditBtn.querySelector(".material-symbols-rounded");
    if (isGuestMode) {
      if (icon) {
        icon.textContent = "person_add";
      }
      elements.accountEditBtn.setAttribute("aria-label", "Review Accountを作成する");
      elements.accountEditBtn.title = "Review Accountを作成する";
    } else if (isGoogleAccount) {
      if (icon) {
        icon.textContent = "manage_accounts";
      }
      elements.accountEditBtn.setAttribute("aria-label", "IdPを管理する");
      elements.accountEditBtn.title = "IdPを管理する";
    } else {
      if (icon) {
        icon.textContent = "edit";
      }
      elements.accountEditBtn.setAttribute("aria-label", "Review Accountを編集する");
      elements.accountEditBtn.title = "編集する";
    }
  }
  if (elements.deleteAccountBtn) {
    elements.deleteAccountBtn.disabled = !state.auth.isLoggedIn;
    elements.deleteAccountBtn.hidden = isGuestMode;
  }
  if (elements.authNicknameRow) {
    elements.authNicknameRow.hidden = isGuestMode;
  }
  if (elements.authEmailRow) {
    elements.authEmailRow.hidden = isGuestMode || isGoogleAccount;
  }
  if (elements.authPasswordRow) {
    elements.authPasswordRow.hidden = isGuestMode || isGoogleAccount;
  }
  if (elements.authGoogleRow) {
    elements.authGoogleRow.hidden = !isReviewAccount;
  }
  if (elements.authGoogleStatusText) {
    elements.authGoogleStatusText.textContent = isGoogleAccount ? "Google" : "Auth0";
  }
  if (elements.accountActionRow) {
    elements.accountActionRow.classList.toggle("is-guest-account-actions", isGuestMode);
  }
  renderThemeCardSelection();
  renderSettingsEducationCode();
}

function syncAccountPasswordToggle(button, isVisible, label = "パスワード") {
  if (!button) {
    return;
  }
  const icon = button.querySelector(".material-symbols-rounded");
  if (icon) {
    icon.textContent = isVisible ? "visibility_off" : "visibility";
  }
  const actionText = isVisible ? "非表示にする" : "表示する";
  button.setAttribute("aria-label", `${label}を${actionText}`);
  button.title = `${label}を${actionText}`;
}

function renderSettingsEducationCode() {
  const savedCodes = getSavedEducationCodes();
  if (elements.settingsEducationCodeStatusText) {
    elements.settingsEducationCodeStatusText.hidden = true;
  }
  if (elements.settingsEducationCodeList) {
    elements.settingsEducationCodeList.innerHTML = savedCodes.length
      ? savedCodes
          .map(
            (code) => {
              const displayName = getEducationCodeDisplayName(code);
              return `
              <article class="education-code-chip" data-education-code-chip="${escapeHtml(code)}">
                <span class="education-code-set-badge">
                  <span class="material-symbols-rounded" aria-hidden="true">check</span>
                </span>
                <strong>${escapeHtml(displayName)}</strong>
                <span class="education-code-menu-wrap">
                  <button class="secondary education-code-menu-btn" type="button" data-education-code-menu="${escapeHtml(code)}" aria-label="${escapeHtml(displayName)}のメニュー" aria-expanded="false">
                    <span class="material-symbols-rounded" aria-hidden="true">more_horiz</span>
                  </button>
                  <span class="education-code-menu" role="menu">
                    <button type="button" data-education-code-edit="${escapeHtml(code)}" role="menuitem">編集する</button>
                    <button type="button" data-education-code-remove="${escapeHtml(code)}" role="menuitem">削除する</button>
                  </span>
                </span>
              </article>
            `;
            }
          )
          .join("")
      : '<p class="hint-text education-code-empty">Education Codeはまだ追加されていません。</p>';
  }
  requestSavedEducationCodeDetailHydration();
  syncFlashcardNoteLibraryVisibility();
  syncSettingsEducationCodeSaveButton();
  syncSettingsEducationCodeScannerAvailability();
}

function getSavedEducationCodes() {
  return normalizeEducationCodeList(state.settings.educationCodes, state.settings.educationCode);
}

function getSavedEducationCodeDetails() {
  return normalizeEducationCodeDetails(state.settings.educationCodeDetails, getSavedEducationCodes());
}

function getEducationCodeDetail(code) {
  const normalizedCode = normalizeEducationCodeValue(code);
  if (!normalizedCode) {
    return null;
  }
  return getSavedEducationCodeDetails()[normalizedCode] ?? null;
}

function getEducationCodeDisplayName(code) {
  const detail = getEducationCodeDetail(code);
  const schoolName = normalizeSchoolName(detail?.schoolName);
  return schoolName || "学校名を確認中";
}

function commitSettingsEducationCodes(codes, detailUpdates = {}) {
  const normalizedCodes = normalizeEducationCodeList(codes);
  const existingDetails = getSavedEducationCodeDetails();
  const nextDetails = normalizeEducationCodeDetails(
    {
      ...existingDetails,
      ...detailUpdates,
    },
    normalizedCodes
  );
  state.settings.educationCodes = normalizedCodes;
  state.settings.educationCode = normalizedCodes[0] || "";
  state.settings.educationCodeDetails = nextDetails;
  saveState();
  refreshFlashcardNoteBinderMetrics();
}

function createEducationCodeDetailFromValidation(result) {
  if (!result || typeof result !== "object") {
    return null;
  }
  return {
    schoolName: normalizeSchoolName(result.schoolName),
    message: typeof result.message === "string" ? result.message.trim() : "",
    checkedAt: toJstIsoString(),
  };
}

function createEducationCodeDetailUpdate(code, result) {
  const normalizedCode = normalizeEducationCodeValue(code);
  const detail = createEducationCodeDetailFromValidation(result);
  return normalizedCode && detail ? { [normalizedCode]: detail } : {};
}

function requestSavedEducationCodeDetailHydration() {
  const savedCodes = getSavedEducationCodes();
  savedCodes.forEach((code) => {
    const detail = getEducationCodeDetail(code);
    if (normalizeSchoolName(detail?.schoolName)) {
      return;
    }
    if (pendingEducationCodeDetailRequests.has(code) || completedEducationCodeDetailRequests.has(code)) {
      return;
    }
    pendingEducationCodeDetailRequests.add(code);
    void hydrateSavedEducationCodeDetail(code);
  });
}

async function hydrateSavedEducationCodeDetail(code) {
  const normalizedCode = normalizeEducationCodeValue(code);
  if (!normalizedCode) {
    return;
  }
  try {
    const result = await validateEducationCodeValue(normalizedCode);
    if (!getSavedEducationCodes().includes(normalizedCode)) {
      return;
    }
    if (result.isValid) {
      const detailUpdate = createEducationCodeDetailUpdate(normalizedCode, result);
      if (Object.keys(detailUpdate).length > 0) {
        commitSettingsEducationCodes(getSavedEducationCodes(), detailUpdate);
        renderSettingsEducationCode();
      }
    }
  } finally {
    pendingEducationCodeDetailRequests.delete(normalizedCode);
    completedEducationCodeDetailRequests.add(normalizedCode);
  }
}

function toggleSettingsEducationCodeMenu(code) {
  const normalizedCode = normalizeEducationCodeValue(code);
  if (!normalizedCode || !elements.settingsEducationCodeList) {
    return;
  }
  const targetChip = elements.settingsEducationCodeList.querySelector(
    `[data-education-code-chip="${cssEscape(normalizedCode)}"]`
  );
  const shouldOpen = !targetChip?.classList.contains("is-menu-open");
  closeSettingsEducationCodeMenus();
  if (!targetChip || !shouldOpen) {
    return;
  }
  targetChip.classList.add("is-menu-open");
  targetChip.querySelector("[data-education-code-menu]")?.setAttribute("aria-expanded", "true");
}

function closeSettingsEducationCodeMenus() {
  elements.settingsEducationCodeList?.querySelectorAll(".education-code-chip.is-menu-open").forEach((chip) => {
    chip.classList.remove("is-menu-open");
    chip.querySelector("[data-education-code-menu]")?.setAttribute("aria-expanded", "false");
  });
}

function getSettingsEducationCodeValue() {
  return normalizeEducationCodeValue(elements.settingsEducationCodeInput?.value);
}

function renderSettingsEducationCodeFeedback(message, status) {
  if (!elements.settingsEducationCodeFeedback) {
    return;
  }
  elements.settingsEducationCodeFeedback.textContent = message;
  elements.settingsEducationCodeFeedback.classList.toggle("is-valid", status === "valid");
  elements.settingsEducationCodeFeedback.classList.toggle("is-invalid", status === "invalid");
}

function syncSettingsEducationCodeSaveButton() {
  if (!elements.settingsEducationCodeSaveBtn) {
    return;
  }
  const value = getSettingsEducationCodeValue();
  const cachedState = settingsEducationCodeValidationState.value === value ? settingsEducationCodeValidationState : null;
  const isUnchangedEdit = Boolean(settingsEducationCodeEditingCode && value === settingsEducationCodeEditingCode);
  const isDuplicate = getSavedEducationCodes().some(
    (savedCode) => savedCode === value && savedCode !== settingsEducationCodeEditingCode
  );
  const isKnownValid = Boolean(value && cachedState?.status === "valid" && cachedState?.isValid);
  elements.settingsEducationCodeSaveBtn.disabled = !value || isUnchangedEdit || isDuplicate || !isKnownValid;
}

function resetSettingsEducationCodeValidationState() {
  settingsEducationCodeValidationState = {
    value: "",
    isValid: false,
    message: "",
    schoolName: "",
    status: "",
  };
}

function clearSettingsEducationCodeValidationTimer() {
  if (settingsEducationCodeValidationTimerId) {
    window.clearTimeout(settingsEducationCodeValidationTimerId);
    settingsEducationCodeValidationTimerId = 0;
  }
}

function handleSettingsEducationCodeInput() {
  if (!elements.settingsEducationCodeInput) {
    return;
  }
  elements.settingsEducationCodeInput.value = normalizeEducationCodeValue(elements.settingsEducationCodeInput.value);
  clearSettingsEducationCodeValidationTimer();
  settingsEducationCodeValidationRequestId += 1;
  resetSettingsEducationCodeValidationState();
  renderSettingsEducationCodeFeedback("", "");
  syncSettingsEducationCodeSaveButton();

  const value = getSettingsEducationCodeValue();
  if (
    value &&
    getSavedEducationCodes().some((savedCode) => savedCode === value && savedCode !== settingsEducationCodeEditingCode)
  ) {
    settingsEducationCodeValidationState = {
      value,
      isValid: false,
      message: EDUCATION_CODE_DUPLICATE_MESSAGE,
      schoolName: "",
      status: "invalid",
    };
    renderSettingsEducationCodeFeedback(EDUCATION_CODE_DUPLICATE_MESSAGE, "invalid");
    syncSettingsEducationCodeSaveButton();
    return;
  }

  if (value) {
    settingsEducationCodeValidationTimerId = window.setTimeout(() => {
      settingsEducationCodeValidationTimerId = 0;
      void validateSettingsEducationCodeInput();
    }, 360);
  }
}

async function validateSettingsEducationCodeInput() {
  const value = getSettingsEducationCodeValue();
  if (!value) {
    settingsEducationCodeValidationState = {
      value: "",
      isValid: true,
      message: "",
      schoolName: "",
      status: "",
    };
    renderSettingsEducationCodeFeedback("", "");
    syncSettingsEducationCodeSaveButton();
    return true;
  }
  if (getSavedEducationCodes().some((savedCode) => savedCode === value && savedCode !== settingsEducationCodeEditingCode)) {
    settingsEducationCodeValidationState = {
      value,
      isValid: false,
      message: EDUCATION_CODE_DUPLICATE_MESSAGE,
      schoolName: "",
      status: "invalid",
    };
    renderSettingsEducationCodeFeedback(EDUCATION_CODE_DUPLICATE_MESSAGE, "invalid");
    syncSettingsEducationCodeSaveButton();
    return false;
  }
  if (settingsEducationCodeValidationState.value === value) {
    renderSettingsEducationCodeFeedback(
      settingsEducationCodeValidationState.message,
      settingsEducationCodeValidationState.status
    );
    syncSettingsEducationCodeSaveButton();
    return settingsEducationCodeValidationState.isValid;
  }

  const requestId = ++settingsEducationCodeValidationRequestId;
  renderSettingsEducationCodeFeedback("Education Codeを確認しています。", "");
  const result = await validateEducationCodeValue(value);
  if (requestId !== settingsEducationCodeValidationRequestId) {
    return false;
  }
  settingsEducationCodeValidationState = {
    value,
    isValid: result.isValid,
    message: result.message,
    schoolName: result.schoolName || "",
    status: result.status,
  };
  renderSettingsEducationCodeFeedback(result.message, result.status);
  syncSettingsEducationCodeSaveButton();
  return result.isValid;
}

async function saveSettingsEducationCode() {
  const value = getSettingsEducationCodeValue();
  if (!value) {
    syncSettingsEducationCodeSaveButton();
    return;
  }
  if (settingsEducationCodeEditingCode && value === settingsEducationCodeEditingCode) {
    closeSettingsEducationCodeDialog();
    return;
  }
  if (!(await validateSettingsEducationCodeInput())) {
    return;
  }
  const savedCodes = getSavedEducationCodes();
  const nextCodes = settingsEducationCodeEditingCode
    ? savedCodes.map((code) => (code === settingsEducationCodeEditingCode ? value : code))
    : [...savedCodes, value];
  const detailUpdate = createEducationCodeDetailUpdate(value, settingsEducationCodeValidationState);
  commitSettingsEducationCodes(nextCodes, detailUpdate);
  renderSettingsEducationCode();
  renderSettingsEducationCodeFeedback(
    settingsEducationCodeEditingCode ? "Education Codeを保存しました。" : "Education Codeを追加しました。",
    "valid"
  );
  closeSettingsEducationCodeDialog();
}

function removeSettingsEducationCode(code) {
  const normalizedCode = normalizeEducationCodeValue(code);
  if (!normalizedCode) {
    return;
  }
  const nextCodes = getSavedEducationCodes().filter((savedCode) => savedCode !== normalizedCode);
  commitSettingsEducationCodes(nextCodes);
  renderSettingsEducationCode();
}

function requestRemoveSettingsEducationCode(code) {
  const normalizedCode = normalizeEducationCodeValue(code);
  if (!getSavedEducationCodes().includes(normalizedCode)) {
    return;
  }

  const detail = getEducationCodeDetail(normalizedCode);
  const displayName = detail?.schoolName || normalizedCode;
  const message = `${displayName}のEducation Codeを削除しますか？`;
  pendingSettingsEducationCodeRemovalCode = normalizedCode;

  if (!elements.settingsEducationCodeRemoveDialog || typeof elements.settingsEducationCodeRemoveDialog.showModal !== "function") {
    const shouldRemove = window.confirm(message);
    if (shouldRemove) {
      removeSettingsEducationCode(normalizedCode);
    }
    pendingSettingsEducationCodeRemovalCode = "";
    return;
  }

  if (elements.settingsEducationCodeRemoveDialogMessage) {
    elements.settingsEducationCodeRemoveDialogMessage.textContent = message;
  }
  if (!elements.settingsEducationCodeRemoveDialog.open) {
    elements.settingsEducationCodeRemoveDialog.showModal();
  }
}

function closeSettingsEducationCodeRemoveDialog() {
  if (elements.settingsEducationCodeRemoveDialog?.open) {
    elements.settingsEducationCodeRemoveDialog.close();
  }
  pendingSettingsEducationCodeRemovalCode = "";
}

function handleSettingsEducationCodeRemoveDialogAction(action) {
  const normalizedAction = typeof action === "string" ? action.trim().toLowerCase() : "";
  if (normalizedAction === "cancel") {
    closeSettingsEducationCodeRemoveDialog();
    return;
  }
  if (normalizedAction !== "confirm") {
    return;
  }

  const codeToRemove = pendingSettingsEducationCodeRemovalCode;
  closeSettingsEducationCodeRemoveDialog();
  removeSettingsEducationCode(codeToRemove);
}

function openSettingsEducationCodeDialog(options = {}) {
  const editingCode = normalizeEducationCodeValue(options.code);
  settingsEducationCodeEditingCode = getSavedEducationCodes().includes(editingCode) ? editingCode : "";
  resetSettingsEducationCodeValidationState();
  renderSettingsEducationCodeFeedback("", "");
  if (elements.settingsEducationCodeInput) {
    elements.settingsEducationCodeInput.value = settingsEducationCodeEditingCode;
  }
  if (settingsEducationCodeEditingCode) {
    const detail = getEducationCodeDetail(settingsEducationCodeEditingCode);
    settingsEducationCodeValidationState = {
      value: settingsEducationCodeEditingCode,
      isValid: true,
      message: detail?.message || "",
      schoolName: detail?.schoolName || "",
      status: "valid",
    };
  }
  if (elements.settingsEducationCodeDialog) {
    const title = elements.settingsEducationCodeDialog.querySelector("#settingsEducationCodeDialogTitle");
    if (title) {
      title.textContent = settingsEducationCodeEditingCode ? "Education Codeを編集する" : "Education Codeを追加する";
    }
  }
  if (elements.settingsEducationCodeSaveBtn) {
    const icon = elements.settingsEducationCodeSaveBtn.querySelector(".material-symbols-rounded");
    const label = elements.settingsEducationCodeSaveBtn.querySelector("span:last-child");
    if (icon) {
      icon.textContent = settingsEducationCodeEditingCode ? "save" : "add";
    }
    if (label) {
      label.textContent = settingsEducationCodeEditingCode ? "保存する" : "追加する";
    }
  }
  syncSettingsEducationCodeSaveButton();
  syncSettingsEducationCodeScannerAvailability();
  if (elements.settingsEducationCodeDialog && typeof elements.settingsEducationCodeDialog.showModal === "function") {
    if (!elements.settingsEducationCodeDialog.open) {
      elements.settingsEducationCodeDialog.showModal();
    }
    window.setTimeout(() => elements.settingsEducationCodeInput?.focus(), 0);
    return;
  }
  elements.settingsEducationCodeInput?.focus();
}

function closeSettingsEducationCodeDialog() {
  stopSettingsEducationCodeScanner();
  clearSettingsEducationCodeValidationTimer();
  settingsEducationCodeValidationRequestId += 1;
  settingsEducationCodeEditingCode = "";
  if (elements.settingsEducationCodeDialog?.open) {
    elements.settingsEducationCodeDialog.close();
  }
}

function handleSettingsEducationCodeDialogClose() {
  stopSettingsEducationCodeScanner();
  clearSettingsEducationCodeValidationTimer();
  settingsEducationCodeValidationRequestId += 1;
  settingsEducationCodeEditingCode = "";
}

function setSettingsEducationCodeScannerVisible(isVisible) {
  if (elements.settingsEducationCodeScanner) {
    elements.settingsEducationCodeScanner.hidden = !isVisible;
  }
  if (elements.settingsEducationCodeStartScanBtn) {
    elements.settingsEducationCodeStartScanBtn.hidden = Boolean(isVisible);
  }
  if (elements.settingsEducationCodeStopScanBtn) {
    elements.settingsEducationCodeStopScanBtn.hidden = !Boolean(isVisible);
  }
}

function stopSettingsEducationCodeScanner() {
  settingsEducationCodeScanActive = false;
  if (settingsEducationCodeScanFrameId) {
    window.cancelAnimationFrame(settingsEducationCodeScanFrameId);
    settingsEducationCodeScanFrameId = 0;
  }
  if (settingsEducationCodeScanStream) {
    settingsEducationCodeScanStream.getTracks().forEach((track) => track.stop());
    settingsEducationCodeScanStream = null;
  }
  if (elements.settingsEducationCodeVideo) {
    elements.settingsEducationCodeVideo.pause();
    elements.settingsEducationCodeVideo.srcObject = null;
  }
  setSettingsEducationCodeScannerVisible(false);
}

function applySettingsEducationCodeValue(nextValue) {
  if (!elements.settingsEducationCodeInput) {
    return;
  }
  elements.settingsEducationCodeInput.value = normalizeEducationCodeValue(nextValue);
  handleSettingsEducationCodeInput();
}

async function scanSettingsEducationCodeFrame() {
  if (!settingsEducationCodeScanActive || !settingsEducationCodeDetector || !elements.settingsEducationCodeVideo) {
    return;
  }

  try {
    if (elements.settingsEducationCodeVideo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      const detections = await settingsEducationCodeDetector.detect(elements.settingsEducationCodeVideo);
      const detectedCode = extractEducationCodeFromQrText(detections?.[0]?.rawValue);
      if (detectedCode) {
        applySettingsEducationCodeValue(detectedCode);
        stopSettingsEducationCodeScanner();
        return;
      }
    }
  } catch {
    stopSettingsEducationCodeScanner();
    return;
  }

  settingsEducationCodeScanFrameId = window.requestAnimationFrame(() => {
    void scanSettingsEducationCodeFrame();
  });
}

async function startSettingsEducationCodeScanner() {
  const canUseQrScan = "BarcodeDetector" in window && Boolean(navigator.mediaDevices?.getUserMedia);
  if (!canUseQrScan) {
    return;
  }

  stopSettingsEducationCodeScanner();
  setSettingsEducationCodeScannerVisible(true);

  try {
    if (!settingsEducationCodeDetector) {
      settingsEducationCodeDetector = new BarcodeDetector({ formats: ["qr_code"] });
    }
    settingsEducationCodeScanStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" } },
      audio: false,
    });
    if (!elements.settingsEducationCodeVideo) {
      throw new Error("Video element is unavailable.");
    }
    elements.settingsEducationCodeVideo.srcObject = settingsEducationCodeScanStream;
    await elements.settingsEducationCodeVideo.play();
    settingsEducationCodeScanActive = true;
    void scanSettingsEducationCodeFrame();
  } catch {
    stopSettingsEducationCodeScanner();
  }
}

function syncSettingsEducationCodeScannerAvailability() {
  const canUseQrScan = "BarcodeDetector" in window && Boolean(navigator.mediaDevices?.getUserMedia);
  if (elements.settingsEducationCodeStartScanBtn) {
    elements.settingsEducationCodeStartScanBtn.disabled = !canUseQrScan;
  }
}

function renderAuthPanel() {
  const canUseAuth0Config = isAuth0Configured();
  const canLogin = Boolean(auth0Client) || canUseAuth0Config;
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
    button.textContent = isCurrentProvider ? "Review Account利用中" : IS_LOGIN_PAGE ? "ログインする" : "Review Accountを作成する";
  });
  if (elements.authConfigHint) {
    elements.authConfigHint.hidden = canUseAuth0Config;
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
  if (hasUnlimitedReviewCoins() && PREMIUM_THEMES.includes(normalizedTheme)) {
    state.settings.unlockedThemes[normalizedTheme] = true;
  }
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
      lockLabel.style.display = isUnlocked ? "none" : "";
      lockLabel.setAttribute("aria-hidden", String(isUnlocked));
    }
  });
}

function isThemeUnlocked(themeKey) {
  if (!AVAILABLE_THEMES.includes(themeKey)) {
    return false;
  }
  if (hasUnlimitedReviewCoins()) {
    return true;
  }
  return Boolean(state.settings.unlockedThemes?.[themeKey]);
}

function unlockThemeWithCoin(themeKey) {
  if (!PREMIUM_THEMES.includes(themeKey)) {
    return;
  }
  const unlockCost = getThemeUnlockCost(themeKey);
  if (!hasUnlimitedReviewCoins() && state.reviewCoin < unlockCost) {
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
    elements.themeUnlockCurrentCoin.textContent = hasUnlimitedReviewCoins() ? "∞" : REVIEW_COIN_FORMATTER.format(state.reviewCoin);
  }
  if (elements.themeUnlockAfterCoin) {
    elements.themeUnlockAfterCoin.textContent = hasUnlimitedReviewCoins()
      ? "∞"
      : REVIEW_COIN_FORMATTER.format(Math.max(0, state.reviewCoin - unlockCost));
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
  if (!PREMIUM_THEMES.includes(themeKey) || (!hasUnlimitedReviewCoins() && state.reviewCoin < unlockCost)) {
    return;
  }

  const previousCoin = state.reviewCoin;
  if (!hasUnlimitedReviewCoins()) {
    state.reviewCoin -= unlockCost;
  }
  state.settings.unlockedThemes[themeKey] = true;
  state.settings.themeUnlockPolicyVersion = THEME_UNLOCK_POLICY_VERSION;
  saveState();
  if (previousCoin > state.reviewCoin) {
    markReviewCoinSpendAnimation();
  }
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

function exportReviewData() {
  const snapshot = JSON.parse(JSON.stringify(state));
  const plainJson = JSON.stringify(snapshot);
  const payload = {
    app: "The Review",
    storageKey: STORAGE_KEY,
    format: REVIEW_DATA_EXPORT_FORMAT,
    exportedAt: toJstIsoString(),
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
  window.alert("Review Dataをエクスポートしました。");
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
    window.alert("Review Dataを読み取れませんでした。エクスポートしたJSONファイルを確認してください。");
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
      window.alert("Review Dataをインポートしました。");
      redirectToIndexPage();
      return;
    }
    window.alert("Review Dataをインポートしました。");
    renderAuthPanel();
    return;
  }

  if (!state.auth.isLoggedIn) {
    window.alert("Review Dataをインポートしました。");
    redirectToLoginPage();
    return;
  }

  applyTheme(state.settings.theme);
  dailyTryRun = createDailyTryRun();
  pauseSelfcheckTimer();
  selfcheckTimerRemainingSeconds = SELFCHECK_DEFAULT_TIMER_SECONDS;
  calendarViewDate = getCurrentMonthStartDate();
  markDailyLogin();
  renderAll();
  activateScreen(activeScreen);
  window.alert("Review Dataをインポートしました。");
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
  const keys = ["reviewCoin", "loginDays", "dailyTryRecords", "learningProgress", "settings", "auth"];
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
    button.hidden = true;
    button.classList.remove("is-active");
    button.setAttribute("aria-selected", "false");
    button.tabIndex = -1;
  });

  elements.settingsTabPanels.forEach((panel) => {
    panel.classList.add("is-active");
    panel.hidden = false;
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
  if (screen === "notice") {
    return "home";
  }
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

function adjustSelfcheckTimer(action) {
  const normalizedAction = typeof action === "string" ? action.trim().toLowerCase() : "";
  const minuteStep = 60;
  const secondStep = 5;
  if (normalizedAction === "minute-up") {
    selfcheckTimerRemainingSeconds += minuteStep;
  } else if (normalizedAction === "minute-down") {
    selfcheckTimerRemainingSeconds -= minuteStep;
  } else if (normalizedAction === "second-up") {
    selfcheckTimerRemainingSeconds += secondStep;
  } else if (normalizedAction === "second-down") {
    selfcheckTimerRemainingSeconds -= secondStep;
  } else {
    return;
  }
  selfcheckTimerRemainingSeconds = Math.max(0, Math.min(99 * 60 + 55, selfcheckTimerRemainingSeconds));
  renderSelfcheckTimerDisplay();
  updateSelfcheckTimerButtons();
}

function renderSelfcheckTimerDisplay() {
  if (!elements.selfcheckTimerDisplay && !elements.selfcheckTimerMinuteValue && !elements.selfcheckTimerSecondValue) {
    return;
  }

  const minutes = Math.floor(selfcheckTimerRemainingSeconds / 60);
  const seconds = selfcheckTimerRemainingSeconds % 60;
  const minuteText = String(minutes).padStart(2, "0");
  const secondText = String(seconds).padStart(2, "0");
  if (elements.selfcheckTimerDisplay) {
    elements.selfcheckTimerDisplay.textContent = `${minuteText}:${secondText}`;
  }
  if (elements.selfcheckTimerMinuteValue) {
    elements.selfcheckTimerMinuteValue.textContent = minuteText;
  }
  if (elements.selfcheckTimerSecondValue) {
    elements.selfcheckTimerSecondValue.textContent = secondText;
  }
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
  let shouldSave = false;
  if (!state.loginDays[key]) {
    state.loginDays[key] = true;
    shouldSave = true;
  }
  state.dailyLoginRewardDays = normalizeDailyLoginRewardDays(state.dailyLoginRewardDays);
  const streakCount = getConsecutiveLoginDayCount();
  const rewardAmount = getDailyLoginRewardAmount(streakCount);
  if (rewardAmount > 0 && !state.dailyLoginRewardDays[key]) {
    state.dailyLoginRewardDays[key] = rewardAmount;
    if (!hasUnlimitedReviewCoins()) {
      state.reviewCoin += rewardAmount;
    }
    shouldSave = true;
  }
  if (shouldSave) {
    saveState();
    renderCoinBoard();
    renderMypageCoin();
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

function getDailyLoginRewardAmount(dayCount) {
  const normalizedDay = Math.floor(Number(dayCount));
  if (!Number.isFinite(normalizedDay) || normalizedDay <= 0) {
    return 0;
  }
  if (normalizedDay === 1) {
    return DAILY_LOGIN_REWARD_RULES.firstDay;
  }
  if (normalizedDay === 3) {
    return DAILY_LOGIN_REWARD_RULES.thirdDay;
  }
  if (
    normalizedDay >= DAILY_LOGIN_REWARD_RULES.recurringFromDay &&
    (normalizedDay - DAILY_LOGIN_REWARD_RULES.recurringFromDay) %
      DAILY_LOGIN_REWARD_RULES.recurringIntervalDays ===
      0
  ) {
    return DAILY_LOGIN_REWARD_RULES.recurringAmount;
  }
  return 0;
}

function renderDailyLoginRewards(slots, windowSize, currentDay) {
  if (!elements.dailyLoginRewards) {
    return;
  }
  const rewards = slots.filter((slot) => slot.day != null && getDailyLoginRewardAmount(slot.day) > 0);
  const fragment = document.createDocumentFragment();
  rewards.forEach((slot) => {
    const reward = document.createElement("span");
    const amount = getDailyLoginRewardAmount(slot.day);
    reward.className = `daily-login-reward reward-day-${slot.day}`;
    reward.classList.toggle("is-claimed", slot.day <= currentDay);
    reward.style.left = `${dailyLoginSlotToPercent(slot.index, windowSize)}%`;
    reward.innerHTML = `
      <img src="./assets/icons/coin.png?v=20260326-1" alt="" aria-hidden="true" />
      <span>${escapeHtml(String(amount))}</span>
    `;
    fragment.append(reward);
  });
  elements.dailyLoginRewards.replaceChildren(fragment);
}

function renderDailyLogin() {
  const streakCount = getConsecutiveLoginDayCount();
  const displayCount = Math.max(1, streakCount);
  const isCurrentDayOne = displayCount === 1;
  const windowRadius = getDailyLoginWindowRadius();
  const windowSize = windowRadius * 2 + 1;
  const currentSlot = windowRadius;
  const anchorDay = displayCount;
  const slots = Array.from({ length: windowSize }, (_, index) => {
    const day = anchorDay + index - windowRadius;
    return {
      index,
      day: day >= 1 ? day : null,
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
    elements.dailyLoginTrack.style.setProperty("--daily-login-current-percent", `${currentPercent}%`);
    elements.dailyLoginTrack.classList.toggle("is-digit-one", isCurrentDayOne);
  }

  if (elements.dailyLoginProgressFill) {
    elements.dailyLoginProgressFill.style.left = "-100vw";
    elements.dailyLoginProgressFill.style.width = `calc(100vw + ${currentPercent}%)`;
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
  renderDailyLoginRewards(slots, windowSize, displayCount);

  if (elements.dailyLoginCard) {
    elements.dailyLoginCard.classList.toggle("is-reward-ready", getDailyLoginRewardAmount(displayCount) > 0);
  }
}

function createDailyTryRun() {
  const key = todayKey();
  const index = DAILY_TRY_QUESTIONS.length > 0 ? getDailyTryQuestionIndex(key) : -1;
  const record = state.dailyTryRecords[key];
  const question = index >= 0 ? DAILY_TRY_QUESTIONS[index] : null;
  const selected = Number.isInteger(record?.selected) ? record.selected : null;
  return {
    dateKey: key,
    questionIndex: index,
    selected: question && selected !== null && selected >= 0 && selected < question.choices.length ? selected : null,
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
  const hasQuestion = dailyTryRun.questionIndex >= 0 && Boolean(DAILY_TRY_QUESTIONS[dailyTryRun.questionIndex]);
  if (elements.dailyTryPanel) {
    elements.dailyTryPanel.hidden = !hasQuestion;
  }
  elements.homeCardCarousel?.classList.toggle("is-daily-try-empty", !hasQuestion);
  updateDailyTryNudgeState();
  if (!hasQuestion) {
    if (elements.dailyTryPrompt) {
      elements.dailyTryPrompt.innerHTML =
        '<span class="daily-try-placeholder-lead">まずは問題を解いてみましょう。</span><span class="daily-try-placeholder-note">この問題にTRY!は今まで解いた問題から出題されます。</span>';
    }
    if (elements.dailyTryChoiceList) {
      elements.dailyTryChoiceList.innerHTML = "";
    }
    if (elements.dailyTryFeedback) {
      elements.dailyTryFeedback.textContent = "";
    }
    if (elements.dailyTrySubmitBtn) {
      elements.dailyTrySubmitBtn.hidden = true;
      elements.dailyTrySubmitBtn.disabled = true;
    }
    updateHomeCardCarouselControls();
    return;
  }
  if (elements.dailyTryPrompt) {
    elements.dailyTryPrompt.innerHTML =
      '<span class="daily-try-placeholder-lead">まずは問題を解いてみましょう。</span><span class="daily-try-placeholder-note">この問題にTRY!は今まで解いた問題から出題されます。</span>';
  }
  if (elements.dailyTryChoiceList) {
    elements.dailyTryChoiceList.innerHTML = "";
  }
  if (elements.dailyTryFeedback) {
    elements.dailyTryFeedback.textContent = "";
  }
  if (elements.dailyTrySubmitBtn) {
    elements.dailyTrySubmitBtn.hidden = true;
    elements.dailyTrySubmitBtn.disabled = true;
  }
}

function submitDailyTryAnswer() {
  syncDailyTryByDate();
  if (dailyTryRun.questionIndex < 0) {
    return;
  }
  const question = DAILY_TRY_QUESTIONS[dailyTryRun.questionIndex];
  if (!question || dailyTryRun.submitted || dailyTryRun.selected === null) {
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
}

function startHomeGreetingTicker() {
  if (!elements.homeGreeting) {
    return;
  }
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
  if (!elements.homeGreeting) {
    return;
  }
  elements.homeGreeting.textContent = getHomeGreetingMessage(new Date());
}

function getHomeGreetingMessage(date) {
  const hour = date.getHours();
  const context = {
    hour,
    minute: date.getMinutes(),
    dateKey: keyFromDate(date),
    nickname: getAuthNicknameText("").trim(),
    streak: getConsecutiveLoginDayCount(date),
    reviewCoin: state.reviewCoin,
    isBusinessDay: isJapaneseBusinessDay(date),
    hasDailyTry: dailyTryRun.questionIndex >= 0,
    activeScreen,
  };
  return generateEmbeddedRanLine(context);
}

function generateEmbeddedRanLine(context) {
  const lines = [];
  const nickname = context.nickname && context.nickname !== "Guest Mode" ? `${context.nickname}さん、` : "";

  if (context.hour < 6) {
    lines.push(`${nickname}遅い時間までお疲れさま！睡眠も大事だから、無理のない範囲でね。`);
  } else if (context.hour < 11) {
    lines.push(`${nickname}おはよう！最初の1問は、頭の準備運動くらいの気持ちでいきましょう。`);
  } else if (context.hour < 18) {
    lines.push(`${nickname}できるかぎりやってみよ！絶対自分の力になるからね。`);
  } else {
    lines.push(`${nickname}少し進めるだけでも十分よー！`);
  }

  if (context.streak >= 7) {
    lines.push(`リビュー日数、${context.streak}日目！ちゃんと積み上がってるね！`);
  } else if (context.streak >= 2) {
    lines.push(`リビュー日数、${context.streak}日目！この調子で、昨日の自分からアップデートしよう！`);
  }

  if (!context.hasDailyTry) {
    lines.push("1日1問の問題があるからやってみよ。");
  }
  if (context.reviewCoin >= 100) {
    lines.push(`Review Coinが${REVIEW_COIN_FORMATTER.format(context.reviewCoin)}枚あるから何か買ってほしいな…！`);
  }
  if (!context.isBusinessDay) {
    lines.push("休みの日だけどがんばってるね！");
  }

  lines.push("今日もリビューしよう！");
  const seedSource = `${context.dateKey}:${context.hour}:${Math.floor(context.minute / 10)}:${context.streak}:${context.reviewCoin}:${context.activeScreen}`;
  const seed = Array.from(seedSource).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return lines[seed % lines.length];
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
  if (DAILY_TRY_QUESTIONS.length === 0) {
    return -1;
  }
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
    hasUnlimitedReviewCoins: false,
    loginDays: {},
    dailyLoginRewardDays: {},
    dailyTryRecords: {},
    learningProgress: createDefaultLearningProgressState(),
    settings: {
      theme: DEFAULT_THEME,
      unlockedThemes: createDefaultThemeUnlockState(),
      themeUnlockPolicyVersion: THEME_UNLOCK_POLICY_VERSION,
      educationCode: "",
      educationCodes: [],
      educationCodeDetails: {},
    },
    auth: {
      isLoggedIn: false,
      provider: null,
      displayName: "Guest Mode",
      nickname: "",
      email: null,
      password: "",
    },
    avater: createDefaultAvaterState(),
    sync: createDefaultReviewDataSyncState(),
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
    hasUnlimitedReviewCoins: Boolean(parsed?.hasUnlimitedReviewCoins),
    loginDays: parsed?.loginDays && typeof parsed.loginDays === "object" ? parsed.loginDays : {},
    dailyLoginRewardDays: normalizeDailyLoginRewardDays(parsed?.dailyLoginRewardDays),
    dailyTryRecords: parsed?.dailyTryRecords && typeof parsed.dailyTryRecords === "object" ? parsed.dailyTryRecords : {},
    learningProgress: normalizeLearningProgressState(parsed?.learningProgress ?? parsed?.progress ?? parsed?.noteProgress),
    settings: normalizeSettingsState(parsed?.settings),
    auth: normalizeAuthState(parsed?.auth),
    avater: normalizeAvaterState(parsed?.avater || parsed?.avatar),
    sync: normalizeReviewDataSyncState(parsed?.sync),
  };
}

function createDefaultReviewDataSyncState() {
  return {
    version: REVIEW_DATA_SYNC_VERSION,
    updatedAt: "",
    syncedAt: "",
    lastRemoteUpdatedAt: "",
  };
}

function normalizeReviewDataSyncState(value) {
  const fallback = createDefaultReviewDataSyncState();
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return fallback;
  }
  return {
    version: REVIEW_DATA_SYNC_VERSION,
    updatedAt: normalizeIsoDateString(value.updatedAt),
    syncedAt: normalizeIsoDateString(value.syncedAt),
    lastRemoteUpdatedAt: normalizeIsoDateString(value.lastRemoteUpdatedAt),
  };
}

function normalizeDailyLoginRewardDays(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  const normalized = {};
  Object.entries(value).forEach(([dateKey, amount]) => {
    const key = String(dateKey || "").trim();
    const normalizedAmount = normalizeCoinAmount(amount);
    if (/^\d{4}-\d{2}-\d{2}$/.test(key) && normalizedAmount > 0) {
      normalized[key] = normalizedAmount;
    }
  });
  return normalized;
}

function createDefaultLearningProgressState() {
  return {
    flashcards: {},
    notebooks: {},
  };
}

function normalizeLearningProgressState(value) {
  const fallback = createDefaultLearningProgressState();
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return fallback;
  }
  return {
    flashcards: normalizeLearningProgressRecordMap(value.flashcards),
    notebooks: normalizeLearningProgressRecordMap(value.notebooks),
  };
}

function normalizeLearningProgressRecordMap(value) {
  const normalized = {};
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return normalized;
  }
  Object.entries(value).forEach(([rawKey, rawRecord]) => {
    const key = normalizeLearningProgressKey(rawKey);
    if (!key || !rawRecord || typeof rawRecord !== "object" || Array.isArray(rawRecord)) {
      return;
    }
    normalized[key] = normalizeLearningProgressRecord(rawRecord);
  });
  return normalized;
}

function normalizeLearningProgressRecord(value) {
  const record = {};
  Object.entries(value || {}).forEach(([rawKey, rawValue]) => {
    const key = normalizeLearningProgressKey(rawKey);
    if (!key) {
      return;
    }
    if (rawValue === null || ["string", "number", "boolean"].includes(typeof rawValue)) {
      record[key] = rawValue;
    }
  });
  record.updatedAt = normalizeIsoDateString(value?.updatedAt);
  return record;
}

function normalizeLearningProgressKey(value) {
  return String(value ?? "").trim().slice(0, 120);
}

function createDefaultAvaterState() {
  return {
    baseImage: AVATER_BASE_IMAGE,
    equipped: {
      clothes: "",
      glasses: "",
      accessory: "",
    },
    unlockedItems: {},
    itemOffsets: {},
    offsetX: 0,
    offsetY: 0,
  };
}

function normalizeAvaterState(value) {
  const fallback = createDefaultAvaterState();
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return fallback;
  }
  const equipped = {
    ...fallback.equipped,
    ...(value.equipped && typeof value.equipped === "object" && !Array.isArray(value.equipped) ? value.equipped : {}),
  };
  Object.keys(equipped).forEach((category) => {
    const itemId = String(equipped[category] || "");
    if (itemId && !getAvailableAvaterItems().some((item) => item.id === itemId && item.category === category)) {
      equipped[category] = "";
    }
  });
  const itemOffsets = {};
  if (value.itemOffsets && typeof value.itemOffsets === "object" && !Array.isArray(value.itemOffsets)) {
    Object.entries(value.itemOffsets).forEach(([itemId, offset]) => {
      const normalizedItemId = String(itemId || "").trim();
      if (!normalizedItemId || !getAvaterItem(normalizedItemId)) {
        return;
      }
      itemOffsets[normalizedItemId] = {
        x: Math.max(-56, Math.min(56, Number(offset?.x) || 0)),
        y: Math.max(-56, Math.min(56, Number(offset?.y) || 0)),
      };
    });
  }
  return {
    baseImage: typeof value.baseImage === "string" && value.baseImage.trim() ? value.baseImage.trim() : fallback.baseImage,
    equipped,
    unlockedItems:
      value.unlockedItems && typeof value.unlockedItems === "object" && !Array.isArray(value.unlockedItems)
        ? {
            ...fallback.unlockedItems,
            ...value.unlockedItems,
          }
        : fallback.unlockedItems,
    itemOffsets,
    offsetX: Math.max(-24, Math.min(24, Number(value.offsetX) || 0)),
    offsetY: Math.max(-24, Math.min(24, Number(value.offsetY) || 0)),
  };
}

function normalizeSettingsState(value) {
  const storedTheme = normalizeTheme(value?.theme);
  const themeUnlockPolicyVersion = Number(value?.themeUnlockPolicyVersion);
  const preservePremiumUnlocks = themeUnlockPolicyVersion >= THEME_UNLOCK_POLICY_VERSION;
  const unlockedThemes = normalizeThemeUnlockState(value?.unlockedThemes, { preservePremiumUnlocks });
  const theme = unlockedThemes[storedTheme] ? storedTheme : DEFAULT_THEME;
  unlockedThemes[theme] = true;
  const educationCodes = normalizeEducationCodeList(value?.educationCodes, value?.educationCode ?? value?.schoolCode);
  const educationCodeDetails = normalizeEducationCodeDetails(
    value?.educationCodeDetails ?? value?.educationCodeNames ?? value?.educationCodeSchoolNames,
    educationCodes
  );
  return {
    theme,
    unlockedThemes,
    themeUnlockPolicyVersion: THEME_UNLOCK_POLICY_VERSION,
    educationCode: educationCodes[0] || "",
    educationCodes,
    educationCodeDetails,
  };
}

function normalizeTheme(value) {
  const normalizedValue = LEGACY_THEME_ALIASES[value] ?? value;
  return AVAILABLE_THEMES.includes(normalizedValue) ? normalizedValue : DEFAULT_THEME;
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

function normalizeAuthState(value) {
  const isLoggedIn = Boolean(value?.isLoggedIn);
  const provider =
    isLoggedIn && typeof value?.provider === "string" && value.provider.trim() ? value.provider.trim() : null;
  const displayName =
    isLoggedIn && typeof value?.displayName === "string" && value.displayName.trim()
      ? value.displayName.trim()
      : "Guest Mode";
  const nickname = isLoggedIn && normalizeNicknameText(value?.nickname) ? normalizeNicknameText(value.nickname) : "";
  const email = isLoggedIn && typeof value?.email === "string" && value.email.trim() ? value.email.trim() : null;
  const password = isLoggedIn ? normalizeAccountPasswordText(value?.password) : "";
  return {
    isLoggedIn,
    provider,
    displayName,
    nickname,
    email,
    password,
  };
}

function normalizeNicknameText(value) {
  return typeof value === "string" ? value.trim().slice(0, 24) : "";
}

function normalizeAccountEmailText(value) {
  return typeof value === "string" ? value.trim().slice(0, 120) : "";
}

function normalizeAccountPasswordText(value) {
  return typeof value === "string" ? value.trim().slice(0, 64) : "";
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

function normalizeIsoDateString(value) {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) {
    return "";
  }
  const time = Date.parse(text);
  return Number.isFinite(time) ? toJstIsoString(new Date(time)) : "";
}

function looksLikeAuth0Subject(value) {
  return /^[a-z0-9_-]+\|/i.test(String(value || "").trim());
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

function saveState(options = {}) {
  if (!options.skipTouch) {
    touchReviewDataSyncMetadata();
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (!options.skipRemoteSync) {
    scheduleReviewDataCloudPush();
  }
}

function touchReviewDataSyncMetadata(timestamp = toJstIsoString()) {
  state.sync = normalizeReviewDataSyncState(state.sync);
  state.sync.updatedAt = normalizeIsoDateString(timestamp) || toJstIsoString();
}

function ensureReviewDataSyncMetadata() {
  state.sync = normalizeReviewDataSyncState(state.sync);
  if (!state.sync.updatedAt) {
    state.sync.updatedAt = toJstIsoString();
  }
  return state.sync;
}

function canSyncReviewDataToCloud() {
  return Boolean(state.auth?.isLoggedIn && state.auth.provider !== "guest");
}

function scheduleReviewDataCloudPush() {
  if (isApplyingRemoteReviewData || !canSyncReviewDataToCloud()) {
    return;
  }
  if (reviewDataSyncTimerId) {
    window.clearTimeout(reviewDataSyncTimerId);
  }
  reviewDataSyncTimerId = window.setTimeout(() => {
    reviewDataSyncTimerId = 0;
    void pushReviewDataToCloud();
  }, REVIEW_DATA_SYNC_DEBOUNCE_MS);
}

function clearReviewDataSyncTimer() {
  if (reviewDataSyncTimerId) {
    window.clearTimeout(reviewDataSyncTimerId);
    reviewDataSyncTimerId = 0;
  }
}

async function syncReviewDataWithCloud(options = {}) {
  if (!canSyncReviewDataToCloud()) {
    return null;
  }
  clearReviewDataSyncTimer();
  if (reviewDataSyncInFlight) {
    reviewDataSyncQueued = true;
    return reviewDataSyncInFlight;
  }

  reviewDataSyncInFlight = (async () => {
    const token = await withTimeout(
      getAuth0AccessTokenForApi(),
      MANAGER_ACCESS_TOKEN_TIMEOUT_MS,
      null,
      "Review Data sync token"
    );
    if (!token) {
      return null;
    }

    const remoteReviewRecord = await fetchReviewDataFromCloud(token);
    if (remoteReviewRecord === undefined) {
      return null;
    }
    reviewDataCloudPullCompleted = true;
    if (remoteReviewRecord) {
      return handleRemoteReviewDataRecord(token, remoteReviewRecord, options);
    }

    ensureReviewDataSyncMetadata();
    const saved = await saveReviewDataSnapshotToCloud(token, serializeReviewDataForCloud());
    if (saved?.conflict && saved.reviewData) {
      return handleRemoteReviewDataRecord(token, saved.reviewData, { reason: "conflict" });
    }
    if (saved?.reviewData) {
      applyReviewDataRemoteMetadata(saved.reviewData);
    }
    return saved;
  })();

  try {
    return await reviewDataSyncInFlight;
  } finally {
    reviewDataSyncInFlight = null;
    if (reviewDataSyncQueued) {
      reviewDataSyncQueued = false;
      scheduleReviewDataCloudPush();
    }
  }
}

async function pushReviewDataToCloud() {
  if (!canSyncReviewDataToCloud()) {
    return null;
  }
  if (!reviewDataCloudPullCompleted) {
    return syncReviewDataWithCloud({ reason: "pre-push" });
  }
  if (reviewDataSyncInFlight) {
    reviewDataSyncQueued = true;
    return reviewDataSyncInFlight;
  }

  reviewDataSyncInFlight = (async () => {
    const token = await withTimeout(
      getAuth0AccessTokenForApi(),
      MANAGER_ACCESS_TOKEN_TIMEOUT_MS,
      null,
      "Review Data save token"
    );
    if (!token) {
      return null;
    }

    ensureReviewDataSyncMetadata();
    const saved = await saveReviewDataSnapshotToCloud(token, serializeReviewDataForCloud());
    if (saved?.conflict && saved.reviewData) {
      return handleRemoteReviewDataRecord(token, saved.reviewData, { reason: "conflict" });
    }
    if (saved?.reviewData) {
      applyReviewDataRemoteMetadata(saved.reviewData);
    }
    return saved;
  })();

  try {
    return await reviewDataSyncInFlight;
  } finally {
    reviewDataSyncInFlight = null;
    if (reviewDataSyncQueued) {
      reviewDataSyncQueued = false;
      scheduleReviewDataCloudPush();
    }
  }
}

async function handleRemoteReviewDataRecord(token, remoteRecord, options = {}) {
  const remoteState = normalizePersistedState(remoteRecord.data);
  const localState = normalizePersistedState(state);
  const mergedState = mergeReviewDataStates(localState, remoteState, remoteRecord);
  const localChanged = !reviewDataStateContentEquals(localState, mergedState);
  const remoteChanged = !reviewDataStateContentEquals(remoteState, mergedState);

  if (localChanged) {
    applyReviewDataState(mergedState, { render: options.render !== false });
  }

  if (remoteChanged) {
    const saved = await saveReviewDataSnapshotToCloud(token, serializeReviewDataForCloud(mergedState));
    if (saved?.reviewData) {
      applyReviewDataRemoteMetadata(saved.reviewData);
    }
    return saved;
  }

  applyReviewDataRemoteMetadata(remoteRecord);
  return {
    reviewData: remoteRecord,
  };
}

async function fetchReviewDataFromCloud(token) {
  try {
    const response = await fetch(`${REVIEW_API_BASE_URL}/me/review-data`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      console.warn("Failed to fetch Review Data:", response.status);
      return undefined;
    }
    const payload = await response.json().catch(() => null);
    return normalizeRemoteReviewDataRecord(payload?.reviewData);
  } catch (error) {
    console.warn("Failed to fetch Review Data:", error);
    return undefined;
  }
}

async function saveReviewDataSnapshotToCloud(token, snapshot) {
  try {
    const response = await fetch(`${REVIEW_API_BASE_URL}/me/review-data`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(snapshot),
    });
    const payload = await response.json().catch(() => null);
    if (response.status === 409 && payload?.conflict) {
      return {
        conflict: true,
        reviewData: normalizeRemoteReviewDataRecord(payload.reviewData),
      };
    }
    if (!response.ok) {
      console.warn("Failed to save Review Data:", response.status);
      return null;
    }
    return {
      reviewData: normalizeRemoteReviewDataRecord(payload?.reviewData),
    };
  } catch (error) {
    console.warn("Failed to save Review Data:", error);
    return null;
  }
}

async function deleteReviewDataFromCloud() {
  if (!canSyncReviewDataToCloud()) {
    return;
  }
  const token = await withTimeout(
    getAuth0AccessTokenForApi(),
    MANAGER_ACCESS_TOKEN_TIMEOUT_MS,
    null,
    "Review Data delete token"
  );
  if (!token) {
    return;
  }
  try {
    await fetch(`${REVIEW_API_BASE_URL}/me/review-data`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
  } catch (error) {
    console.warn("Failed to delete Review Data:", error);
  }
}

function serializeReviewDataForCloud(sourceState = state) {
  const snapshot = createReviewDataStateSnapshot(sourceState);
  snapshot.sync = normalizeReviewDataSyncState(snapshot.sync);
  if (!snapshot.sync.updatedAt) {
    snapshot.sync.updatedAt = toJstIsoString();
  }
  return {
    storageKey: REVIEW_DATA_STORAGE_KEY,
    clientUpdatedAt: snapshot.sync.updatedAt,
    data: snapshot,
  };
}

function createReviewDataStateSnapshot(sourceState = state) {
  const normalized = normalizePersistedState(JSON.parse(JSON.stringify(sourceState)));
  const cloudAuth = { ...normalized.auth };
  delete cloudAuth.password;
  return {
    reviewCoin: normalized.reviewCoin,
    hasUnlimitedReviewCoins: normalized.hasUnlimitedReviewCoins,
    loginDays: normalized.loginDays,
    dailyLoginRewardDays: normalized.dailyLoginRewardDays,
    dailyTryRecords: normalized.dailyTryRecords,
    learningProgress: normalized.learningProgress,
    settings: normalized.settings,
    auth: cloudAuth,
    avater: normalized.avater,
    sync: normalizeReviewDataSyncState(normalized.sync),
  };
}

function normalizeRemoteReviewDataRecord(record) {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    return null;
  }
  const storageKey =
    typeof record.storageKey === "string" && record.storageKey.trim() ? record.storageKey.trim() : REVIEW_DATA_STORAGE_KEY;
  if (storageKey !== REVIEW_DATA_STORAGE_KEY) {
    return null;
  }
  const data = createReviewDataPayloadFromRemoteRecord(record);
  return {
    storageKey,
    data,
    clientUpdatedAt: normalizeIsoDateString(record.clientUpdatedAt),
    updatedAt: normalizeIsoDateString(record.updatedAt),
  };
}

function createReviewDataPayloadFromRemoteRecord(record) {
  const data =
    record.data && typeof record.data === "object" && !Array.isArray(record.data) ? { ...record.data } : {};
  const loginDays = normalizePlainRemoteObject(record.loginDays);
  const dailyLoginRewardDays = normalizePlainRemoteObject(record.dailyLoginRewardDays);
  const dailyTryRecords = normalizePlainRemoteObject(record.dailyTryRecords);
  const learningProgress = normalizePlainRemoteObject(record.learningProgress);
  const existingLearningProgress = normalizePlainRemoteObject(data.learningProgress ?? data.progress ?? data.noteProgress);

  data.loginDays = Object.keys(loginDays).length > 0 || !data.loginDays ? loginDays : normalizePlainRemoteObject(data.loginDays);
  data.dailyLoginRewardDays =
    Object.keys(dailyLoginRewardDays).length > 0 || !data.dailyLoginRewardDays
      ? dailyLoginRewardDays
      : normalizePlainRemoteObject(data.dailyLoginRewardDays);
  data.dailyTryRecords =
    Object.keys(dailyTryRecords).length > 0 || !data.dailyTryRecords
      ? dailyTryRecords
      : normalizePlainRemoteObject(data.dailyTryRecords);
  data.learningProgress =
    Object.keys(learningProgress).length > 0 || Object.keys(existingLearningProgress).length === 0
      ? learningProgress
      : existingLearningProgress;

  if (Object.prototype.hasOwnProperty.call(record, "reviewCoin")) {
    const reviewCoin = normalizeCoinAmount(record.reviewCoin);
    data.reviewCoin = reviewCoin;
  }
  if (typeof record.hasUnlimitedReviewCoins === "boolean") {
    data.hasUnlimitedReviewCoins = Boolean(record.hasUnlimitedReviewCoins);
  }

  const settings = normalizePlainRemoteObject(record.settings);
  const educationCodes = Array.isArray(record.educationCodes) ? record.educationCodes : [];
  if (Object.keys(settings).length > 0 || educationCodes.length > 0 || record.colorTheme) {
    data.settings = {
      ...normalizePlainRemoteObject(data.settings),
      ...settings,
    };
    if (record.colorTheme) {
      data.settings.theme = record.colorTheme;
    }
    if (educationCodes.length > 0) {
      data.settings.educationCodes = educationCodes;
    }
  }

  const avater = normalizePlainRemoteObject(record.avater ?? record.avatar);
  const equippedAvater = normalizePlainRemoteObject(
    record.equippedAvater ?? record.equipped_avater ?? avater.equipped
  );
  const existingAvater = normalizePlainRemoteObject(data.avater ?? data.avatar);
  if (Object.keys(avater).length > 0 || Object.keys(equippedAvater).length > 0 || Object.keys(existingAvater).length > 0) {
    data.avater = {
      ...existingAvater,
      ...avater,
    };
    data.avater.equipped =
      Object.keys(equippedAvater).length > 0
        ? equippedAvater
        : normalizePlainRemoteObject(avater.equipped ?? existingAvater.equipped);
  }

  if (remoteRecordHasAuthFields(record)) {
    const auth = normalizePlainRemoteObject(data.auth);
    const nickname = normalizeNicknameText(record.nickname) || normalizeNicknameText(auth.nickname);
    const displayName =
      normalizeNicknameText(record.displayName) ||
      normalizeNicknameText(record.nickname) ||
      normalizeNicknameText(auth.displayName) ||
      "Guest Mode";
    data.auth = {
      ...auth,
      isLoggedIn:
        typeof record.isLoggedIn === "boolean"
          ? Boolean(record.isLoggedIn || auth.isLoggedIn)
          : Boolean(auth.isLoggedIn),
      provider:
        typeof record.authProvider === "string" && record.authProvider.trim()
          ? record.authProvider.trim()
          : auth.provider || null,
      displayName,
      nickname,
      email: typeof record.email === "string" && record.email.trim() ? record.email.trim() : auth.email || null,
    };
  }

  return data;
}

function normalizePlainRemoteObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? { ...value } : {};
}

function remoteRecordHasAuthFields(record) {
  return ["isLoggedIn", "authProvider", "displayName", "nickname", "email"].some((key) =>
    Object.prototype.hasOwnProperty.call(record, key)
  );
}

function applyReviewDataRemoteMetadata(remoteRecord) {
  const normalizedRecord = normalizeRemoteReviewDataRecord(remoteRecord);
  if (!normalizedRecord) {
    return;
  }
  state.sync = normalizeReviewDataSyncState(state.sync);
  state.sync.syncedAt = toJstIsoString();
  state.sync.lastRemoteUpdatedAt = normalizedRecord.updatedAt || normalizedRecord.clientUpdatedAt || "";
  saveState({ skipTouch: true, skipRemoteSync: true });
}

function applyReviewDataState(nextState, options = {}) {
  const normalizedNextState = normalizePersistedState(nextState);
  const localPassword = normalizeAccountPasswordText(state.auth?.password);
  if (localPassword && !normalizeAccountPasswordText(normalizedNextState.auth?.password)) {
    normalizedNextState.auth = normalizeAuthState({
      ...normalizedNextState.auth,
      password: localPassword,
    });
  }
  isApplyingRemoteReviewData = true;
  try {
    replaceState(normalizedNextState);
    saveState({ skipTouch: true, skipRemoteSync: true });
  } finally {
    isApplyingRemoteReviewData = false;
  }
  if (options.render !== false) {
    renderAfterReviewDataSync();
  }
}

function renderAfterReviewDataSync() {
  if (IS_LOGIN_PAGE) {
    renderAuthPanel();
    renderAvater();
    return;
  }
  markDailyLogin();
  renderDailyLogin();
  applyTheme(state.settings.theme);
  dailyTryRun = createDailyTryRun();
  renderAll();
  activateScreen(activeScreen);
}

function mergeReviewDataStates(localState, remoteState, remoteRecord = {}) {
  const local = normalizePersistedState(localState);
  const remote = normalizePersistedState(remoteState);
  const localUpdatedAt = getReviewStateUpdatedTime(local);
  const remoteServerUpdatedAt = getRemoteReviewRecordServerUpdatedTime(remoteRecord);
  const remoteClientUpdatedAt = getRemoteReviewRecordClientUpdatedTime(remoteRecord);
  const remoteRecordUpdatedAt = getRemoteReviewRecordUpdatedTime(remoteRecord);
  const remoteUpdatedAt = Math.max(getReviewStateUpdatedTime(remote), remoteRecordUpdatedAt);
  const localLastRemoteUpdatedAt = getReviewStateLastRemoteUpdatedTime(local);
  const remoteChangedAfterLastSync = Boolean(remoteServerUpdatedAt && remoteServerUpdatedAt > localLastRemoteUpdatedAt);
  const remoteWasEditedOutsideThisClient =
    remoteChangedAfterLastSync &&
    (!remoteClientUpdatedAt ||
      remoteClientUpdatedAt <= localLastRemoteUpdatedAt ||
      remoteServerUpdatedAt - remoteClientUpdatedAt > REVIEW_DATA_EXTERNAL_UPDATE_GRACE_MS);
  const preferRemote = remoteWasEditedOutsideThisClient || remoteUpdatedAt > localUpdatedAt;
  const preferred = preferRemote ? remote : local;
  const merged = normalizePersistedState(preferred);
  const bothStatesHaveSyncTimestamps = Boolean(local.sync?.updatedAt && remote.sync?.updatedAt);

  merged.reviewCoin = preferRemote
    ? normalizeCoinAmount(remote.reviewCoin)
    : bothStatesHaveSyncTimestamps
      ? normalizeCoinAmount(preferred.reviewCoin)
      : Math.max(normalizeCoinAmount(local.reviewCoin), normalizeCoinAmount(remote.reviewCoin));
  merged.hasUnlimitedReviewCoins = Boolean(preferred.hasUnlimitedReviewCoins);
  merged.loginDays = preferRemote ? remote.loginDays : mergeBooleanRecord(local.loginDays, remote.loginDays);
  merged.dailyLoginRewardDays = preferRemote
    ? remote.dailyLoginRewardDays
    : mergeNumberRecord(local.dailyLoginRewardDays, remote.dailyLoginRewardDays);
  merged.dailyTryRecords = mergeDailyTryRecordMap(local.dailyTryRecords, remote.dailyTryRecords, preferRemote);
  merged.learningProgress = mergeLearningProgressStates(local.learningProgress, remote.learningProgress, preferRemote);
  merged.settings = mergeReviewSettings(local.settings, remote.settings, preferRemote);
  merged.auth = mergeReviewAuth(local.auth, remote.auth, preferRemote);
  merged.avater = mergeReviewAvater(local.avater, remote.avater, preferRemote);

  const mergedEqualsLocal = reviewDataStateContentEquals(merged, local);
  const mergedEqualsRemote = reviewDataStateContentEquals(merged, remote);
  merged.sync = normalizeReviewDataSyncState(preferred.sync);
  if (!mergedEqualsLocal && !mergedEqualsRemote) {
    merged.sync.updatedAt = toJstIsoString();
  } else if (mergedEqualsRemote) {
    merged.sync.updatedAt =
      normalizeIsoDateString(remote.sync?.updatedAt) ||
      normalizeIsoDateString(remoteRecord.clientUpdatedAt) ||
      normalizeIsoDateString(remoteRecord.updatedAt) ||
      toJstIsoString();
  } else {
    merged.sync.updatedAt =
      normalizeIsoDateString(local.sync?.updatedAt) ||
      normalizeIsoDateString(remoteRecord.clientUpdatedAt) ||
      normalizeIsoDateString(remoteRecord.updatedAt) ||
      toJstIsoString();
  }
  merged.sync.syncedAt = "";
  merged.sync.lastRemoteUpdatedAt = normalizeIsoDateString(remoteRecord.updatedAt || remoteRecord.clientUpdatedAt);

  return normalizePersistedState(merged);
}

function mergeReviewSettings(localSettings, remoteSettings, preferRemote) {
  const local = normalizeSettingsState(localSettings);
  const remote = normalizeSettingsState(remoteSettings);
  const base = normalizeSettingsState(preferRemote ? remote : local);
  base.unlockedThemes = mergeBooleanRecord(local.unlockedThemes, remote.unlockedThemes);
  const educationCodes = normalizeEducationCodeList([...local.educationCodes, ...remote.educationCodes]);
  const preferredEducationCode = preferRemote ? remote.educationCode : local.educationCode;
  base.educationCodes = educationCodes;
  base.educationCode = educationCodes.includes(preferredEducationCode) ? preferredEducationCode : educationCodes[0] || "";
  base.educationCodeDetails = normalizeEducationCodeDetails(
    {
      ...local.educationCodeDetails,
      ...remote.educationCodeDetails,
    },
    educationCodes
  );
  return normalizeSettingsState(base);
}

function mergeReviewAuth(localAuth, remoteAuth, preferRemote = false) {
  const local = normalizeAuthState(localAuth);
  const remote = normalizeAuthState(remoteAuth);
  if (preferRemote) {
    return normalizeAuthState({
      ...remote,
      password: local.password || remote.password,
    });
  }
  if (local.isLoggedIn && local.provider !== "guest") {
    return local;
  }
  if (remote.isLoggedIn && remote.provider !== "guest") {
    return remote;
  }
  return local.isLoggedIn ? local : remote;
}

function mergeReviewAvater(localAvater, remoteAvater, preferRemote) {
  const local = normalizeAvaterState(localAvater);
  const remote = normalizeAvaterState(remoteAvater);
  const base = normalizeAvaterState(preferRemote ? remote : local);
  base.unlockedItems = mergeBooleanRecord(local.unlockedItems, remote.unlockedItems);
  return normalizeAvaterState(base);
}

function mergeBooleanRecord(...records) {
  const merged = {};
  records.forEach((record) => {
    if (!record || typeof record !== "object" || Array.isArray(record)) {
      return;
    }
    Object.keys(record)
      .sort()
      .forEach((key) => {
        if (record[key]) {
          merged[key] = true;
        }
      });
  });
  return merged;
}

function mergeNumberRecord(...records) {
  const merged = {};
  records.forEach((record) => {
    if (!record || typeof record !== "object" || Array.isArray(record)) {
      return;
    }
    Object.keys(record)
      .sort()
      .forEach((key) => {
        const amount = normalizeCoinAmount(record[key]);
        if (amount > 0) {
          merged[key] = Math.max(normalizeCoinAmount(merged[key]), amount);
        }
      });
  });
  return merged;
}

function mergeDailyTryRecordMap(localRecords, remoteRecords, preferRemote) {
  const merged = {};
  const keys = Array.from(
    new Set([...Object.keys(localRecords || {}), ...Object.keys(remoteRecords || {})])
  ).sort();
  keys.forEach((key) => {
    const localRecord = normalizeDailyTryRecord(localRecords?.[key]);
    const remoteRecord = normalizeDailyTryRecord(remoteRecords?.[key]);
    if (!localRecord && !remoteRecord) {
      return;
    }
    if (!localRecord || !remoteRecord) {
      merged[key] = localRecord || remoteRecord;
      return;
    }
    const preferred = preferRemote ? remoteRecord : localRecord;
    merged[key] = {
      ...preferred,
      answered: Boolean(localRecord.answered || remoteRecord.answered),
      correct: Boolean(localRecord.correct || remoteRecord.correct),
      rewarded: Boolean(localRecord.rewarded || remoteRecord.rewarded),
    };
  });
  return merged;
}

function mergeLearningProgressStates(localProgress, remoteProgress, preferRemote) {
  const local = normalizeLearningProgressState(localProgress);
  const remote = normalizeLearningProgressState(remoteProgress);
  return {
    flashcards: mergeLearningProgressRecordMaps(local.flashcards, remote.flashcards, preferRemote),
    notebooks: mergeLearningProgressRecordMaps(local.notebooks, remote.notebooks, preferRemote),
  };
}

function mergeLearningProgressRecordMaps(localRecords, remoteRecords, preferRemote) {
  const merged = {};
  const keys = Array.from(new Set([...Object.keys(localRecords || {}), ...Object.keys(remoteRecords || {})])).sort();
  keys.forEach((key) => {
    const localRecord = normalizeLearningProgressRecord(localRecords?.[key]);
    const remoteRecord = normalizeLearningProgressRecord(remoteRecords?.[key]);
    if (!localRecords?.[key]) {
      merged[key] = remoteRecord;
      return;
    }
    if (!remoteRecords?.[key]) {
      merged[key] = localRecord;
      return;
    }
    const localUpdatedAt = Date.parse(localRecord.updatedAt || "") || 0;
    const remoteUpdatedAt = Date.parse(remoteRecord.updatedAt || "") || 0;
    merged[key] = remoteUpdatedAt > localUpdatedAt || (remoteUpdatedAt === localUpdatedAt && preferRemote) ? remoteRecord : localRecord;
  });
  return merged;
}

function normalizeDailyTryRecord(record) {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    return null;
  }
  const selectedNumber = Number(record.selected);
  return {
    answered: Boolean(record.answered),
    selected: record.selected === null || record.selected === undefined ? null : Number.isFinite(selectedNumber) ? selectedNumber : null,
    correct: Boolean(record.correct),
    rewarded: Boolean(record.rewarded),
  };
}

function getReviewStateUpdatedTime(value) {
  const timestamp = normalizeIsoDateString(value?.sync?.updatedAt);
  return timestamp ? Date.parse(timestamp) : 0;
}

function getReviewStateLastRemoteUpdatedTime(value) {
  const timestamp = normalizeIsoDateString(value?.sync?.lastRemoteUpdatedAt);
  return timestamp ? Date.parse(timestamp) : 0;
}

function getRemoteReviewRecordUpdatedTime(record) {
  const updatedAt = normalizeIsoDateString(record?.updatedAt);
  const clientUpdatedAt = normalizeIsoDateString(record?.clientUpdatedAt);
  return Math.max(updatedAt ? Date.parse(updatedAt) : 0, clientUpdatedAt ? Date.parse(clientUpdatedAt) : 0);
}

function getRemoteReviewRecordClientUpdatedTime(record) {
  const clientUpdatedAt = normalizeIsoDateString(record?.clientUpdatedAt);
  return clientUpdatedAt ? Date.parse(clientUpdatedAt) : 0;
}

function getRemoteReviewRecordServerUpdatedTime(record) {
  const updatedAt = normalizeIsoDateString(record?.updatedAt);
  return updatedAt ? Date.parse(updatedAt) : 0;
}

function reviewDataStateContentEquals(a, b) {
  return JSON.stringify(getReviewDataStateContentSnapshot(a)) === JSON.stringify(getReviewDataStateContentSnapshot(b));
}

function getReviewDataStateContentSnapshot(value) {
  const normalized = normalizePersistedState(value);
  return {
    reviewCoin: normalized.reviewCoin,
    hasUnlimitedReviewCoins: normalized.hasUnlimitedReviewCoins,
    loginDays: normalized.loginDays,
    dailyLoginRewardDays: normalized.dailyLoginRewardDays,
    dailyTryRecords: normalized.dailyTryRecords,
    learningProgress: normalized.learningProgress,
    settings: normalized.settings,
    auth: normalized.auth,
    avater: normalized.avater,
  };
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

function cssEscape(value) {
  return window.CSS?.escape ? window.CSS.escape(String(value || "")) : String(value || "").replace(/["\\]/g, "\\$&");
}

function normalizeEducationCodeValue(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, EDUCATION_CODE_MAX_LENGTH);
}

function normalizeEducationCodeList(value, legacyValue = "") {
  const sourceValues = [];
  if (Array.isArray(value)) {
    sourceValues.push(...value);
  } else if (typeof value === "string" || typeof value === "number") {
    sourceValues.push(value);
  }
  if (legacyValue !== undefined && legacyValue !== null) {
    sourceValues.push(legacyValue);
  }
  const codes = [];
  sourceValues.forEach((item) => {
    const code = normalizeEducationCodeValue(item);
    if (code && !codes.includes(code)) {
      codes.push(code);
    }
  });
  return codes;
}

function normalizeSchoolName(value) {
  return String(value ?? "").normalize("NFKC").trim();
}

function normalizeEducationCodeDetails(value, validCodes = []) {
  const validCodeSet = new Set(normalizeEducationCodeList(validCodes));
  const details = {};
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return details;
  }
  Object.entries(value).forEach(([rawCode, rawDetail]) => {
    const code = normalizeEducationCodeValue(rawCode);
    if (!code || (validCodeSet.size > 0 && !validCodeSet.has(code))) {
      return;
    }
    const detail = rawDetail && typeof rawDetail === "object" && !Array.isArray(rawDetail) ? rawDetail : {};
    const schoolName = normalizeSchoolName(detail.schoolName ?? detail.school_name ?? rawDetail);
    const message = typeof detail.message === "string" ? detail.message.trim() : "";
    const checkedAt = normalizeIsoDateString(detail.checkedAt ?? detail.checked_at);
    details[code] = {
      schoolName,
      message,
      checkedAt,
    };
  });
  return details;
}

function extractEducationCodeFromQrText(rawValue) {
  const text = String(rawValue ?? "").trim();
  if (!text) {
    return "";
  }

  try {
    const parsedUrl = new URL(text, window.location.origin);
    const byQuery =
      parsedUrl.searchParams.get("educationCode") ||
      parsedUrl.searchParams.get("schoolCode") ||
      parsedUrl.searchParams.get("code");
    if (byQuery) {
      return normalizeEducationCodeValue(byQuery);
    }
    const pathSegments = parsedUrl.pathname
      .split("/")
      .map((part) => part.trim())
      .filter(Boolean);
    const pathCode = pathSegments.at(-1);
    if (pathCode && !pathCode.includes(".")) {
      return normalizeEducationCodeValue(pathCode);
    }
  } catch {
    // URLでない場合はそのまま次の判定へ進む
  }

  const keyValueMatch = text.match(/(?:educationCode|schoolCode|code)\s*[:=]\s*([A-Za-z0-9_-]+)/i);
  if (keyValueMatch?.[1]) {
    return normalizeEducationCodeValue(keyValueMatch[1]);
  }

  return normalizeEducationCodeValue(text);
}

function getEducationCodeValidationMessage(isValid, json = {}) {
  if (!isValid) {
    return EDUCATION_CODE_INVALID_MESSAGE;
  }
  const schoolName = typeof json.schoolName === "string" ? json.schoolName.trim() : "";
  const serverMessage = typeof json.message === "string" ? json.message.trim() : "";
  return serverMessage || (schoolName ? `これは${schoolName}のEducation Codeです。` : "Education Codeを確認しました。");
}

async function validateEducationCodeValue(value) {
  const code = normalizeEducationCodeValue(value);
  if (!code) {
    return {
      code,
      isValid: true,
      message: "",
      status: "",
    };
  }

  try {
    const response = await fetch(`${REVIEW_API_BASE_URL}/education-codes/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ code }),
    });
    const json = await response.json().catch(() => ({}));
    const isValid = response.ok && Boolean(json?.valid ?? json?.isValid ?? json?.ok);
    return {
      code,
      isValid,
      message: getEducationCodeValidationMessage(isValid, json),
      schoolName: typeof json?.schoolName === "string" ? json.schoolName.trim() : "",
      status: isValid ? "valid" : "invalid",
    };
  } catch {
    return {
      code,
      isValid: false,
      message: EDUCATION_CODE_INVALID_MESSAGE,
      schoolName: "",
      status: "invalid",
    };
  }
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
  const nicknameInput = document.getElementById("nicknameInput");
  const nicknameNextBtn = document.getElementById("nicknameNextBtn");
  const educationCodeInput = document.getElementById("educationCodeInput");
  const educationCodeFeedback = document.getElementById("educationCodeFeedback");
  const educationCodeNextBtn = document.getElementById("educationCodeNextBtn");
  const educationCodeStartScanBtn = document.getElementById("educationCodeStartScanBtn");
  const educationCodeStopScanBtn = document.getElementById("educationCodeStopScanBtn");
  const educationCodeScanner = document.getElementById("educationCodeScanner");
  const educationCodeVideo = document.getElementById("educationCodeVideo");
  const avatarInputs = Array.from(document.querySelectorAll('input[name="avatarPreset"]'));
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
    nickname: 3,
    educationCode: 4,
    avatar: 5,
  };
  const ONBOARDING_PROGRESS_LABEL_BY_STEP = {
    terms: "利用規約とプライバシーポリシーへの同意",
    auth: "Review Account",
    nickname: "Nickname",
    educationCode: "Education Code",
    avatar: "Avater",
  };

  let activeStepIndex = 0;
  let educationCodeScanStream = null;
  let educationCodeScanFrameId = 0;
  let educationCodeScanActive = false;
  let educationCodeDetector = null;
  let educationCodeValidationTimerId = 0;
  let educationCodeValidationRequestId = 0;
  let educationCodeValidationState = {
    value: "",
    isValid: true,
    message: "",
    schoolName: "",
    status: "",
  };

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
    let normalizedStepName = normalizeLoginOnboardingStep(stepName);
    if (normalizedStepName === "nickname" && state.auth?.provider === "guest") {
      normalizedStepName = "educationCode";
    }
    if (!normalizedStepName) {
      return false;
    }
    const targetIndex = steps.findIndex((step) => step.dataset.onboardingStep === normalizedStepName);
    if (targetIndex < 0) {
      return false;
    }
    setActiveStep(targetIndex);
    if (normalizedStepName === "nickname") {
      window.setTimeout(() => {
        nicknameInput?.focus();
      }, 0);
    }
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

  function getOnboardingNickname() {
    return normalizeNicknameText(nicknameInput?.value);
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
      nickname: getOnboardingNickname(),
      educationCode: getEducationCodeValue(),
      avatarPreset: getSelectedValue(avatarInputs),
    };
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(payload));
  }

  function syncTermsStep() {
    if (termsNextBtn) {
      termsNextBtn.disabled = !Boolean(termsAgreeCheckbox?.checked);
    }
  }

  function syncNicknameStep() {
    if (nicknameNextBtn) {
      nicknameNextBtn.disabled = getOnboardingNickname().length === 0;
    }
  }

  function syncNicknameInputLock() {
    if (!nicknameInput) {
      return;
    }
    const shouldLockNickname = false;
    nicknameInput.readOnly = shouldLockNickname;
    nicknameInput.setAttribute("aria-readonly", String(shouldLockNickname));
    nicknameInput.classList.toggle("is-readonly", shouldLockNickname);
  }

  function commitOnboardingNickname() {
    const nickname = getOnboardingNickname();
    if (!nickname || !state.auth.isLoggedIn) {
      return;
    }
    state.auth = normalizeAuthState({
      ...state.auth,
      nickname,
    });
    saveState();
    void syncReviewAccountProfileToApi();
  }

  function commitOnboardingEducationCode() {
    const code = getEducationCodeValue();
    if (code) {
      commitSettingsEducationCodes(
        [...getSavedEducationCodes(), code],
        createEducationCodeDetailUpdate(code, educationCodeValidationState)
      );
    } else {
      saveState();
    }
  }

  function getEducationCodeValue() {
    return normalizeEducationCodeValue(educationCodeInput?.value);
  }

  function renderEducationCodeFeedback(message, status) {
    if (!educationCodeFeedback) {
      return;
    }
    educationCodeFeedback.textContent = message;
    educationCodeFeedback.classList.toggle("is-valid", status === "valid");
    educationCodeFeedback.classList.toggle("is-invalid", status === "invalid");
  }

  function syncEducationCodeStep() {
    const value = getEducationCodeValue();
    const hasValue = value.length > 0;
    if (educationCodeNextBtn) {
      educationCodeNextBtn.disabled = false;
    }
    if (!hasValue) {
      educationCodeValidationState = {
        value: "",
        isValid: true,
        message: "",
        schoolName: "",
        status: "",
      };
      renderEducationCodeFeedback("", "");
      return true;
    }
    if (educationCodeValidationState.value === value) {
      renderEducationCodeFeedback(educationCodeValidationState.message, educationCodeValidationState.status);
      return educationCodeValidationState.isValid;
    }
    renderEducationCodeFeedback("", "");
    return false;
  }

  async function validateEducationCodeInput() {
    const value = getEducationCodeValue();
    const hasValue = value.length > 0;
    if (!hasValue) {
      syncEducationCodeStep();
      return true;
    }
    if (educationCodeValidationState.value === value) {
      renderEducationCodeFeedback(educationCodeValidationState.message, educationCodeValidationState.status);
      return educationCodeValidationState.isValid;
    }

    const requestId = ++educationCodeValidationRequestId;
    try {
      const result = await validateEducationCodeValue(value);
      const isValid = result.isValid;
      const message = result.message;
      if (requestId !== educationCodeValidationRequestId) {
        return false;
      }
      educationCodeValidationState = {
        value,
        isValid,
        message,
        schoolName: result.schoolName || "",
        status: isValid ? "valid" : "invalid",
      };
      renderEducationCodeFeedback(message, isValid ? "valid" : "invalid");
      return isValid;
    } catch {
      if (requestId !== educationCodeValidationRequestId) {
        return false;
      }
      educationCodeValidationState = {
        value,
        isValid: false,
        message: EDUCATION_CODE_INVALID_MESSAGE,
        schoolName: "",
        status: "invalid",
      };
      renderEducationCodeFeedback(EDUCATION_CODE_INVALID_MESSAGE, "invalid");
      return false;
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
    return extractEducationCodeFromQrText(rawValue);
  }

  function applyEducationCodeValue(nextValue) {
    if (!educationCodeInput) {
      return;
    }
    educationCodeInput.value = normalizeEducationCodeValue(nextValue);
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
    const initialNickname =
      typeof initialDraft.nickname === "string" && initialDraft.nickname.trim()
        ? initialDraft.nickname
        : state.auth?.nickname || "";
    if (nicknameInput && initialNickname) {
      nicknameInput.value = normalizeNicknameText(initialNickname);
    }
    const initialEducationCode =
      typeof initialDraft.educationCode === "string"
        ? initialDraft.educationCode
        : typeof initialDraft.schoolCode === "string"
          ? initialDraft.schoolCode
          : getSavedEducationCodes()[0] || "";
    if (educationCodeInput && initialEducationCode) {
      educationCodeInput.value = normalizeEducationCodeValue(initialEducationCode);
    }
    if (typeof initialDraft.avatarPreset === "string" && initialDraft.avatarPreset.trim()) {
      const avatarInput = avatarInputs.find((input) => input.value === initialDraft.avatarPreset);
      if (avatarInput) {
        avatarInput.checked = true;
      }
    }
  } else {
    if (nicknameInput && state.auth?.nickname) {
      nicknameInput.value = normalizeNicknameText(state.auth.nickname);
    }
    const savedEducationCode = getSavedEducationCodes()[0] || "";
    if (educationCodeInput && savedEducationCode) {
      educationCodeInput.value = normalizeEducationCodeValue(savedEducationCode);
    }
  }
  syncNicknameInputLock();

  termsAgreeCheckbox?.addEventListener("change", () => {
    syncTermsStep();
    saveDraft();
  });

  nicknameInput?.addEventListener("input", () => {
    syncNicknameStep();
    saveDraft();
  });

  educationCodeInput?.addEventListener("input", () => {
    educationCodeInput.value = normalizeEducationCodeValue(educationCodeInput.value);
    if (educationCodeValidationTimerId) {
      window.clearTimeout(educationCodeValidationTimerId);
      educationCodeValidationTimerId = 0;
    }
    educationCodeValidationRequestId += 1;
    educationCodeValidationState = {
      value: "",
      isValid: false,
      message: "",
      schoolName: "",
      status: "",
    };
    syncEducationCodeStep();
    if (getEducationCodeValue()) {
      educationCodeValidationTimerId = window.setTimeout(() => {
        educationCodeValidationTimerId = 0;
        void validateEducationCodeInput();
      }, 360);
    }
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

  window.addEventListener("the-review-login-onboarding-step", (event) => {
    if (setActiveStepByName(event.detail?.step)) {
      clearRequestedLoginOnboardingStep();
    }
  });

  document.addEventListener("click", async (event) => {
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
      const activeStepName = String(steps[activeStepIndex]?.dataset.onboardingStep || "");
      if (activeStepName === "nickname") {
        syncNicknameStep();
        if (getOnboardingNickname().length === 0) {
          return;
        }
        commitOnboardingNickname();
      }
      if (activeStepName === "educationCode") {
        if (!(await validateEducationCodeInput())) {
          return;
        }
        commitOnboardingEducationCode();
      }
      setActiveStep(activeStepIndex + 1);
      return;
    }
    if (direction === "prev") {
      let previousIndex = activeStepIndex - 1;
      if (steps[previousIndex]?.dataset.onboardingStep === "nickname" && state.auth?.provider === "guest") {
        previousIndex -= 1;
      }
      setActiveStep(previousIndex);
    }
  });

  onboardingSaveBtn?.addEventListener("click", () => {
    const nextNotificationSettings = getOnboardingNotificationSettingsFromToggles();
    commitOnboardingNickname();
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
  syncNicknameStep();
  syncNicknameInputLock();
  syncEducationCodeStep();
  if (!setActiveStepByName(getRequestedLoginOnboardingStep())) {
    setActiveStep(0);
  } else {
    clearRequestedLoginOnboardingStep();
  }

  window.addEventListener("beforeunload", stopEducationCodeScanner);
})();

function clampBinderUseTipPosition() {
  document
    .querySelectorAll(".flashcard-binder-use-tip, .flashcard-binder-use-tooltip, .flashcard-binder-action-tip")
    .forEach((tip) => {
      tip.style.removeProperty("left");
      tip.style.removeProperty("--binder-tip-arrow-x");
    });
}

function startBinderUseTipClampObserver() {
  clampBinderUseTipPosition();
}

startBinderUseTipClampObserver();

function clampBinderUseButtonPosition() {
  document.querySelectorAll(".flashcard-binder-use-btn").forEach((button) => {
    button.style.removeProperty("left");
    button.style.removeProperty("--binder-tip-arrow-x");
  });
}

function startBinderUseButtonClampObserver() {
  clampBinderUseButtonPosition();
}

startBinderUseButtonClampObserver();
