const STORAGE_KEY = "the-review-quest-v1";
const HOME_GREETING_REFRESH_MS = 60 * 1000;
const AUTH_INIT_TIMEOUT_MS = 8000;
const AUTH0_SDK_URL = "https://cdn.auth0.com/js/auth0-spa-js/2.18/auth0-spa-js.production.js";
const AUTH0_SDK_LOAD_TIMEOUT_MS = 4500;
const FLASHCARD_INIT_TIMEOUT_MS = 5000;
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
const FLASHCARD_REMOTE_DEFAULT_DECK_ID = "ec1";
const FLASHCARD_REMOTE_DEFAULT_UNIT = "Questions";
const FLASHCARD_MANAGER_DRAFT_STORAGE_KEY = "the-review-manager-drafts-v1";
const RAN_HOME_GREETING_TEMPLATES = Object.freeze([
  "{nickname}遅い時間までお疲れさま！睡眠も大事だから、無理のない範囲でね。",
  "{nickname}まずは1問だけでも大丈夫。始められた時点でもう進み始めてるんだ。",
  "{nickname}焦らなくていいよ。できるところから一緒に整えていこうね。",
  "{nickname}今日もリビューしに来てくれてえらいね。少し進めるだけでも大丈夫だよ。",
  "{nickname}集中できる時はサクサクと、疲れている時は軽めにいこう。",
  "{nickname}今日の積み重ねは、きっと明日の自分の助けになる。",
  "{nickname}分からないところを見つけた？大事な成果のひとつだね。",
  "{nickname}一気に完璧にしなくていいよ。少しずつ覚え直していこうね。",
  "{nickname}今の気分に合わせて、無理なく進めていこう。",
  "{nickname}手をつけられただけでもすごいよ。この調子でいこうね。",
  "{nickname}迷ったら、前に間違えたところから見直すのがおすすめだよ。",
  "{nickname}今日は軽く確認するだけでも十分。続けることを大事にしようね。",
  "{nickname}眠気が強い時は深追いしないでね。休むのも作戦だよ。",
  "{nickname}できた問題も、もう一度リビューしておこう。",
  "{nickname}問題につまづくことは、伸びしろがある証拠だよ！",
  "{nickname}リビュー日数、{streak}日目だよ。ちゃんと続いていてすてき…！",
  "{nickname}今日もここまで来られたね。えらい、えらい。",
  "{nickname}難しい問題ほど、ゆっくり分けて考えれば大丈夫だよ。",
  "{nickname}今はできなくても、次にはできるさ。",
  "{nickname}朝のリビューは、頭の準備運動にぴったり。",
  "{nickname}お昼の少しの時間でも、記憶にはちゃんと定着する。",
  "{nickname}夕方のリビューは、今日の学びをしまっておく時間にしよう。",
  "{nickname}夜はがんばりすぎ注意だよ。できる分だけで大丈夫。",
  "{nickname}1ページずつ見れば大丈夫。ノートは急がなくても逃げないよ。",
  "{nickname}答えを見る前に少し考えたなら、それだけで力になってるよ。",
  "{nickname}今日は正解数より、思い出そうとした回数を大事にしようね。",
  "{nickname}忘れていたところは、また覚え直せば大丈夫だよ。",
  "{nickname}昨日より分かってきたなら、それはちゃんとした成長だね。",
  "{nickname}深呼吸してから始めよう。落ち着くと見えるものが増えていくよ！",
  "{nickname}今日はどのノートからいく？気になるところを選んでみようね。",
  "{nickname}短いリビューでも、続ければ大きな力になるよ。",
  "{nickname}間違いはわるものじゃないよ。次がんばろう。",
  "{nickname}解けたらちゃんと喜ぼうね。小さな達成感も大事だよ。",
  "{nickname}集中が切れたら一度休もうね。戻ってこられたらそれで十分。",
  "{nickname}今日の自分に合うペースでいこうね。無理はしなくていいよ。",
  "{nickname}ノートを開いたら、まず問題名だけ眺めてみるのもありだよ。",
  "{nickname}覚えにくいところは、声に出すと少し残りやすいよ。",
  "{nickname}選択肢を比べる時は、違いを言葉にしてみるといいよ。",
  "{nickname}答え合わせまでできたら、今日はかなりいい流れだよ。",
  "{nickname}分かったつもりのところほど、軽く確認しておこうね。",
  "{nickname}今日はここまででも大丈夫。続けるための余力も残しておこうね。",
  "{nickname}リビューしようとする姿勢がもう立派だよ。ゆっくり進もうね。",
  "{nickname}悩んだ問題は印象に残りやすいよ。今が覚えるチャンスだね。",
  "{nickname}目標は大きくても、今日の一歩は小さくて大丈夫だよ。",
  "{nickname}ノートを開く前より、少しでも思い出せたら勝ちだよ。",
  "{nickname}疲れている日は、得意な問題でリズムを作るのもいいよ。",
  "{nickname}今日のリビューが、未来の安心につながっていくよ。",
  "{nickname}焦らず、でも止まらず。らーんもそばで見ているよ。",
  "{nickname}最後に1問だけ見て終わるのも、きれいな締め方だよ。",
  "{nickname}Review Coinは{coin}枚だよ。何か買ってほしいな…！"
]);
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

setIndexLoginPageMode(IS_LOGIN_PAGE);
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
  return Boolean(document.getElementById("loginShell")) && !state.auth.isLoggedIn && !hasAuth0CallbackParams();
}

function setIndexLoginPageMode(isActive) {
  const active = Boolean(isActive);
  document.body?.classList.toggle("login-page", active);
  const loginShell = document.getElementById("loginShell");
  if (loginShell) {
    loginShell.hidden = !active;
  }
  const appHeader = document.querySelector(".app-header");
  if (appHeader) {
    appHeader.hidden = active;
  }
  const appScreens = document.getElementById("appScreens");
  if (appScreens) {
    appScreens.hidden = active;
  }
  const homeGreeting = document.getElementById("homeGreeting");
  if (homeGreeting) {
    homeGreeting.hidden = active;
  }
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
  setIndexLoginPageMode(false);
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
    setIndexLoginPageMode(true);
    bindSharedDataAndGuestDialogEvents();
    bindReviewDataCloudRefreshEvents();
    bindLoginPageAuthEvents();
    renderAuthPanel();
    renderAvater();
    return;
  }
  if (redirectToIndexPageIfNeeded()) {
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
  setIndexLoginPageMode(true);
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

function redirectToIndexPageIfNeeded() {
  return false;
}

function redirectToIndexPage(options = {}) {
  isNavigationRedirectPending = true;
  const url = new URL("./index.html", window.location.href);
  const onboardingStep = normalizeLoginOnboardingStep(options.onboardingStep);
  if (onboardingStep) {
    url.searchParams.set("onboarding", onboardingStep);
  }
  window.location.replace(url.toString());
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
    const embeddedScriptText =
      typeof window.THE_REVIEW_MANAGER_MIGRATED_SCRIPT_SOURCE === "string"
        ? window.THE_REVIEW_MANAGER_MIGRATED_SCRIPT_SOURCE
        : "";
    const scriptText = embeddedScriptText;
    if (!(template instanceof HTMLTemplateElement) || !scriptText) {
      throw new Error("Manager source is not embedded.");
    }

    const root = document.createElement("section");
    root.className = "manager-migrated-root manager-page is-embedded-manager";
    root.dataset.theme = "manager";
    root.append(document.importNode(template.content, true));

    elements.managerMount.replaceChildren(root);
    publishManagerAccessForMigratedManager();
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
  redirectToIndexPage();
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
    redirectToIndexPage({ onboardingStep });
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
  redirectToIndexPage();
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

function getFlashcardLookupKeysForValues(values) {
  const keys = [];
  (Array.isArray(values) ? values : [values]).forEach((value) => {
    const normalizedValue = normalizeFlashcardText(value);
    if (!normalizedValue) {
      return;
    }
    keys.push(normalizedValue);
    const lookupKey = toFlashcardLabelLookupKey(normalizedValue);
    if (lookupKey) {
      keys.push(lookupKey);
    }
  });
  return Array.from(new Set(keys));
}

function getFlashcardDeckLookupKeys(deck) {
  if (!deck || typeof deck !== "object") {
    return [];
  }
  const catalogEntry = getFlashcardSubjectCatalogEntry(deck.id);
  return getFlashcardLookupKeysForValues([
    deck.id,
    deck.label,
    catalogEntry?.label,
    getFlashcardBookEnglishTitle(deck.id),
  ]);
}

function getFlashcardNoteLookupKeys(note) {
  if (!(note instanceof Element)) {
    return [];
  }
  const aliasDeckId = resolveFlashcardDeckAliasIdForNote(note);
  const aliasCatalogEntry = getFlashcardSubjectCatalogEntry(aliasDeckId);
  return getFlashcardLookupKeysForValues([
    note.dataset.flashcardDeckId,
    note.querySelector(".flashcard-note-jp")?.textContent,
    note.querySelector(".flashcard-note-en")?.textContent,
    note.getAttribute("aria-label"),
    aliasDeckId,
    aliasCatalogEntry?.label,
    getFlashcardBookEnglishTitle(aliasDeckId),
  ]);
}

function createFlashcardDeckProblemCountByLabelMap() {
  const map = new Map();
  if (!flashcardState || !Array.isArray(flashcardState.decks)) {
    return map;
  }
  flashcardState.decks.forEach((deck) => {
    const totalCards = Number.isFinite(deck?.totalCards) ? Math.max(0, Math.round(deck.totalCards)) : 0;
    getFlashcardDeckLookupKeys(deck).forEach((lookupKey) => {
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
    getFlashcardLookupKeysForValues([label, deck.id, deck.label, getFlashcardBookEnglishTitle(deck.id)]).forEach((lookupKey) => {
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
    getFlashcardDeckLookupKeys(deck).forEach((lookupKey) => {
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
    getFlashcardLookupKeysForValues([label, deck.id, deck.label, getFlashcardBookEnglishTitle(deck.id)]).forEach((lookupKey) => {
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
  for (const lookupKey of getFlashcardNoteLookupKeys(note)) {
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
  for (const lookupKey of getFlashcardNoteLookupKeys(note)) {
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

  const answerChoice = target.closest("[data-flashcard-answer-choice]");
  if (answerChoice && isInFlashcardBinderInteractionSurface(answerChoice)) {
    selectFlashcardNotebookAnswerChoice(answerChoice);
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
  return Math.max(0, Math.min(456, safeViewportWidth - 64));
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
    submitActiveFlashcardNotebookAnswer(actionButton);
    return;
  }
}

function selectFlashcardNotebookAnswerChoice(choiceButton) {
  if (!(choiceButton instanceof HTMLElement)) {
    return;
  }
  const list = choiceButton.closest(".flashcard-note-answer-choice-list");
  if (!list) {
    return;
  }
  Array.from(list.querySelectorAll("[data-flashcard-answer-choice]")).forEach((button) => {
    const isSelected = button === choiceButton;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

function submitActiveFlashcardNotebookAnswer(actionButton) {
  const reader = actionButton?.closest?.(".flashcard-note-reader");
  const page = getActiveFlashcardNotebookProblemPage();
  if (!reader || !page) {
    return;
  }
  const submittedAnswer = readFlashcardNotebookSubmittedAnswer(reader);
  const feedback = reader.querySelector("[data-flashcard-answer-feedback]");
  if (!submittedAnswer) {
    if (feedback) {
      feedback.textContent = "答えを入力してください。";
      feedback.classList.remove("is-correct", "is-wrong");
    }
    return;
  }
  const correctAnswer = Array.isArray(page.answers) ? page.answers.map(normalizeFlashcardText).find(Boolean) || "" : "";
  const isCorrect = isFlashcardNotebookAnswerCorrect(submittedAnswer, page.answers);
  const progress = ensureLearningProgressState();
  const answerKey = getFlashcardNotebookAnswerRecordKey(page);
  progress.notebooks[answerKey] = {
    ...(progress.notebooks[answerKey] ?? {}),
    deckId: normalizeFlashcardText(activeFlashcardNotebookState?.note?.dataset?.flashcardDeckId),
    noteLabel: getFlashcardNoteJapaneseLabel(activeFlashcardNotebookState?.note),
    cardId: normalizeFlashcardText(page.cardId),
    questionName: normalizeFlashcardText(page.title),
    pageNumber: Number(page.pageNumber) || 1,
    questionNumber: Number(page.questionNumber) || 1,
    mode: normalizeFlashcardNotebookMode(activeFlashcardNotebookState?.mode),
    selectedAnswer: submittedAnswer,
    answer: correctAnswer,
    answered: true,
    correct: isCorrect,
    updatedAt: toJstIsoString(),
  };
  saveState();
  if (feedback) {
    feedback.textContent = isCorrect ? "正解です。" : `もう一度確認しよう。答え: ${correctAnswer || "未設定"}`;
    feedback.classList.toggle("is-correct", isCorrect);
    feedback.classList.toggle("is-wrong", !isCorrect);
  }
}

function getActiveFlashcardNotebookProblemPage() {
  if (!activeFlashcardNotebookState?.note) {
    return null;
  }
  const spreads = buildFlashcardNotebookSpreads(activeFlashcardNotebookState.note);
  const pageIndex = Math.max(0, Math.min(Math.max(0, spreads.length - 1), Number(activeFlashcardNotebookState.pageIndex) || 0));
  return spreads[pageIndex]?.right?.kind === "problem" ? spreads[pageIndex].right : null;
}

function readFlashcardNotebookSubmittedAnswer(reader) {
  const mode = normalizeFlashcardNotebookMode(activeFlashcardNotebookState?.mode);
  if (mode === "text") {
    return normalizeFlashcardText(reader.querySelector("[data-flashcard-answer-input='text']")?.value);
  }
  const selectedChoice = reader.querySelector("[data-flashcard-answer-choice].is-selected");
  return normalizeFlashcardText(selectedChoice?.dataset.flashcardAnswerChoice || selectedChoice?.textContent);
}

function isFlashcardNotebookAnswerCorrect(answer, answers) {
  const submitted = normalizeFlashcardAnswerForCompare(answer);
  if (!submitted) {
    return false;
  }
  return (Array.isArray(answers) ? answers : []).some((candidate) => normalizeFlashcardAnswerForCompare(candidate) === submitted);
}

function normalizeFlashcardAnswerForCompare(value) {
  return normalizeFlashcardText(value)
    .normalize("NFKC")
    .replace(/[\s\u3000]+/g, "")
    .toLowerCase();
}

function getFlashcardNotebookAnswerRecord(page) {
  const progress = ensureLearningProgressState();
  return progress.notebooks[getFlashcardNotebookAnswerRecordKey(page)] ?? null;
}

function getFlashcardNotebookAnswerRecordKey(page) {
  const deckId = normalizeFlashcardText(activeFlashcardNotebookState?.note?.dataset?.flashcardDeckId);
  const noteLabel = getFlashcardNoteJapaneseLabel(activeFlashcardNotebookState?.note);
  const pageNumber = Number(page?.pageNumber) || Number(activeFlashcardNotebookState?.pageIndex) + 1 || 1;
  const questionNumber = Number(page?.questionNumber) || pageNumber;
  const cardId = normalizeFlashcardText(page?.cardId) || `p${pageNumber}-q${questionNumber}`;
  return `${deckId || toFlashcardLabelLookupKey(noteLabel)}::${cardId}`;
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
        title: entry.card.questionName || `問題 ${cardNumber}`,
        body: entry.card.prompt,
        cardId: entry.card.remoteId || entry.card.id,
        pageNumber: entry.card.pageNumber,
        questionNumber: entry.card.questionNumber || cardNumber,
        imageSrc: entry.card.imageSrc,
        imageAlt: entry.card.imageAlt,
        tableData: entry.card.tableData,
        graphData: entry.card.graphData,
        questionTextPlacement: entry.card.questionTextPlacement,
        imagePlacement: entry.card.imagePlacement,
        tablePlacement: entry.card.tablePlacement,
        graphPlacement: entry.card.graphPlacement,
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

function createFlashcardNotebookProblemPage({
  noteLabel,
  dateText,
  title,
  body,
  cardId,
  pageNumber,
  questionNumber,
  imageSrc,
  imageAlt,
  tableData,
  graphData,
  questionTextPlacement,
  imagePlacement,
  tablePlacement,
  graphPlacement,
  answers,
  choices,
}) {
  return {
    kind: "problem",
    noteLabel,
    dateText,
    title: normalizeFlashcardText(title),
    body: normalizeFlashcardText(body),
    cardId: normalizeFlashcardText(cardId),
    pageNumber: Number.isFinite(Number(pageNumber)) ? Math.max(1, Math.floor(Number(pageNumber))) : 1,
    questionNumber: Number.isFinite(Number(questionNumber)) ? Math.max(1, Math.floor(Number(questionNumber))) : 1,
    imageSrc,
    imageAlt,
    tableData,
    graphData,
    questionTextPlacement: normalizeFlashcardPlacement(questionTextPlacement, 10),
    imagePlacement: normalizeFlashcardPlacement(imagePlacement, 20),
    tablePlacement: normalizeFlashcardPlacement(tablePlacement, 30),
    graphPlacement: normalizeFlashcardPlacement(graphPlacement, 40),
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
  appendFlashcardNotebookPageBlocks(body, page);
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

function appendFlashcardNotebookPageBlocks(body, page) {
  const blocks = [];
  if (page.body) {
    blocks.push({
      type: "text",
      placement: normalizeFlashcardPlacement(page.questionTextPlacement, 10),
      render: () => {
        const bodyText = document.createElement("p");
        bodyText.className = "flashcard-note-paper-body flashcard-note-paper-block";
        bodyText.dataset.flashcardBlockType = "question-text";
        bodyText.textContent = page.body || "";
        return bodyText;
      },
    });
  }
  if (page.imageSrc) {
    blocks.push({
      type: "image",
      placement: normalizeFlashcardPlacement(page.imagePlacement, 20),
      render: () => {
        const image = document.createElement("img");
        image.className = "flashcard-note-paper-image flashcard-note-paper-block";
        image.dataset.flashcardBlockType = "image";
        image.src = page.imageSrc;
        image.alt = page.imageAlt || "";
        return image;
      },
    });
  }
  if (page.tableData) {
    blocks.push({
      type: "table",
      placement: normalizeFlashcardPlacement(page.tablePlacement, 30),
      render: () => createFlashcardNotebookTableElement(page.tableData),
    });
  }
  if (page.graphData) {
    blocks.push({
      type: "graph",
      placement: normalizeFlashcardPlacement(page.graphPlacement, 40),
      render: () => createFlashcardNotebookGraphElement(page.graphData),
    });
  }

  blocks
    .sort((a, b) => (Number(a.placement.order) || 0) - (Number(b.placement.order) || 0))
    .forEach((block) => {
      const element = block.render();
      element.dataset.flashcardPlacementArea = block.placement.area || "right";
      element.dataset.flashcardPlacementOrder = String(Number(block.placement.order) || 0);
      applyFlashcardPlacementStyle(element, block.placement);
      body.append(element);
    });
}

function applyFlashcardPlacementStyle(element, placement) {
  if (!(element instanceof HTMLElement) || !placement || typeof placement !== "object") {
    return;
  }
  ["x", "y", "width", "height"].forEach((key) => {
    const value = normalizeFlashcardText(placement[key]);
    if (value) {
      element.style.setProperty(`--flashcard-placement-${key}`, value);
    }
  });
  const align = normalizeFlashcardText(placement.align);
  if (align) {
    element.dataset.flashcardPlacementAlign = align;
  }
}

function createFlashcardNotebookTableElement(tableData) {
  const wrapper = document.createElement("div");
  wrapper.className = "flashcard-note-paper-table-wrap flashcard-note-paper-block";
  wrapper.dataset.flashcardBlockType = "table";
  const rows = normalizeFlashcardTableRows(tableData);
  if (rows.length === 0) {
    wrapper.textContent = normalizeFlashcardText(tableData);
    return wrapper;
  }
  const table = document.createElement("table");
  table.className = "flashcard-note-paper-table";
  rows.forEach((row, rowIndex) => {
    const tr = document.createElement("tr");
    row.forEach((cell) => {
      const cellElement = document.createElement(rowIndex === 0 ? "th" : "td");
      cellElement.textContent = normalizeFlashcardText(cell);
      tr.append(cellElement);
    });
    table.append(tr);
  });
  wrapper.append(table);
  return wrapper;
}

function normalizeFlashcardTableRows(tableData) {
  if (Array.isArray(tableData)) {
    return tableData
      .map((row) => (Array.isArray(row) ? row : [row]).map((cell) => normalizeFlashcardText(cell)))
      .filter((row) => row.some(Boolean));
  }
  if (tableData && typeof tableData === "object") {
    const headers = Array.isArray(tableData.headers) ? tableData.headers : Array.isArray(tableData.columns) ? tableData.columns : [];
    const rows = Array.isArray(tableData.rows) ? tableData.rows : [];
    return [headers, ...rows]
      .filter((row) => Array.isArray(row) && row.length > 0)
      .map((row) => row.map((cell) => normalizeFlashcardText(cell)));
  }
  return [];
}

function createFlashcardNotebookGraphElement(graphData) {
  const wrapper = document.createElement("div");
  wrapper.className = "flashcard-note-paper-graph flashcard-note-paper-block";
  wrapper.dataset.flashcardBlockType = "graph";
  const graphSrc = typeof graphData === "string" ? resolveFlashcardImageSrc(graphData) : normalizeFlashcardText(graphData?.src ?? graphData?.url);
  if (graphSrc) {
    const image = document.createElement("img");
    image.src = graphSrc;
    image.alt = normalizeFlashcardText(graphData?.alt) || "";
    wrapper.append(image);
    return wrapper;
  }
  wrapper.textContent = typeof graphData === "object" ? JSON.stringify(graphData) : normalizeFlashcardText(graphData);
  return wrapper;
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
    textarea.dataset.flashcardAnswerInput = "text";
    textarea.rows = 5;
    textarea.placeholder = "答えを入力";
    area.append(textarea, createFlashcardNotebookFeedbackElement(page));
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
    area.append(button, transcript, createFlashcardNotebookFeedbackElement(page));
    return area;
  }

  const choices = getFlashcardNotebookAnswerChoices(page);
  const list = document.createElement("div");
  list.className = "flashcard-note-answer-choice-list";
  choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "flashcard-note-answer-choice";
    button.dataset.flashcardAnswerChoice = choice;
    button.setAttribute("aria-pressed", "false");
    button.textContent = choice || `選択肢 ${index + 1}`;
    list.append(button);
  });
  area.append(list, createFlashcardNotebookFeedbackElement(page));
  return area;
}

function createFlashcardNotebookFeedbackElement(page) {
  const feedback = document.createElement("p");
  feedback.className = "flashcard-note-answer-feedback";
  feedback.dataset.flashcardAnswerFeedback = "1";
  feedback.setAttribute("aria-live", "polite");
  const record = getFlashcardNotebookAnswerRecord(page);
  if (record?.answered) {
    feedback.textContent = record.correct ? "正解です。" : `もう一度確認しよう。答え: ${record.answer || "未設定"}`;
    feedback.classList.toggle("is-correct", Boolean(record.correct));
    feedback.classList.toggle("is-wrong", !record.correct);
  }
  return feedback;
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
  const supabaseQuestions = await loadSupabaseFlashcardQuestions();
  const supabaseDecks = normalizeRemoteFlashcardQuestionArray(supabaseQuestions);
  const managerDraftQuestions = loadApprovedManagerDraftFlashcardQuestions();
  const managerDraftDecks = normalizeRemoteFlashcardQuestionArray(managerDraftQuestions);
  return mergeFlashcardDeckCollections(supabaseDecks, managerDraftDecks);
}

async function loadSupabaseFlashcardQuestions() {
  try {
    const response = await withTimeout(
      fetch(`${REVIEW_API_BASE_URL}/flashcards`, {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }),
      FLASHCARD_INIT_TIMEOUT_MS,
      null,
      "Supabase flashcards"
    );
    if (!response || !response.ok) {
      return [];
    }
    const payload = await response.json().catch(() => []);
    return Array.isArray(payload) ? payload : [];
  } catch (error) {
    console.warn("Failed to load Supabase flashcards:", error);
    return [];
  }
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
  const pageNumber = Number(question.pageNumber ?? question.page_number);
  if (Number.isFinite(pageNumber) && pageNumber > 0) {
    return `Page ${Math.floor(pageNumber)}`;
  }
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
    questionName: question.questionName ?? question.question_name ?? question.name,
    pageNumber: question.pageNumber ?? question.page_number,
    questionNumber: question.questionNumber ?? question.question_number,
    table: question.table,
    graph: question.graph,
    choices: question.choices ?? question.threeOptions ?? question.three_options,
    questionTextPlacement: question.questionTextPlacement ?? question.question_text_placement,
    imagePlacement: question.imagePlacement ?? question.image_placement,
    tablePlacement: question.tablePlacement ?? question.table_placement,
    graphPlacement: question.graphPlacement ?? question.graph_placement,
  };
}

function buildRemoteFlashcardPrompt(question) {
  const basePrompt = normalizeFlashcardText(
    question.q ??
      question.questionText ??
      question.question_text ??
      question.question ??
      question.prompt ??
      question.contentText ??
      stripFlashcardHtml(question.contentHtml)
  );
  const choices = normalizeFlashcardChoiceArray(question.choices ?? question.threeOptions ?? question.three_options);
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
  pushAnswer(question.answer);
  if (answers.length === 0) {
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
  const prompt = normalizeFlashcardText(
    rawCard.q ?? rawCard.questionText ?? rawCard.question_text ?? rawCard.question ?? rawCard.prompt ?? rawCard.contentText
  );
  if (!prompt) {
    return null;
  }

  const answers = normalizeFlashcardAnswers(rawCard);
  const choices = normalizeFlashcardChoiceArray(rawCard.choices ?? rawCard.threeOptions ?? rawCard.three_options);
  const pageNumber = Number(rawCard.pageNumber ?? rawCard.page_number);
  const questionNumber = Number(rawCard.questionNumber ?? rawCard.question_number);
  return {
    id: `${sourceId}-u${unitIndex + 1}-c${cardIndex + 1}`,
    remoteId: normalizeFlashcardText(rawCard.id),
    questionName: normalizeFlashcardText(rawCard.questionName ?? rawCard.question_name ?? rawCard.name),
    pageNumber: Number.isFinite(pageNumber) && pageNumber > 0 ? Math.floor(pageNumber) : unitIndex + 1,
    questionNumber: Number.isFinite(questionNumber) && questionNumber > 0 ? Math.floor(questionNumber) : cardIndex + 1,
    prompt,
    imageSrc: resolveFlashcardImageSrc(
      rawCard.i ?? rawCard.image ?? rawCard.img ?? rawCard.imageSrc ?? rawCard.imageUrl
    ),
    imageAlt: normalizeFlashcardText(rawCard.iAlt ?? rawCard.imageAlt ?? rawCard.alt),
    tableData: normalizeFlashcardBlockData(rawCard.table ?? rawCard.tableData),
    graphData: normalizeFlashcardBlockData(rawCard.graph ?? rawCard.graphData),
    questionTextPlacement: normalizeFlashcardPlacement(rawCard.questionTextPlacement ?? rawCard.question_text_placement, 10),
    imagePlacement: normalizeFlashcardPlacement(rawCard.imagePlacement ?? rawCard.image_placement, 20),
    tablePlacement: normalizeFlashcardPlacement(rawCard.tablePlacement ?? rawCard.table_placement, 30),
    graphPlacement: normalizeFlashcardPlacement(rawCard.graphPlacement ?? rawCard.graph_placement, 40),
    preKnowledge: normalizeFlashcardText(
      rawCard.preKnowledge ?? rawCard.pre ?? rawCard.before ?? rawCard.knowledge ?? rawCard.k
    ),
    hint: normalizeFlashcardText(rawCard.h ?? rawCard.hint ?? rawCard.note ?? rawCard.explanation),
    answers,
    choices,
  };
}

function normalizeFlashcardChoiceArray(value) {
  if (Array.isArray(value)) {
    return value.map((choice) => normalizeFlashcardText(choice)).filter(Boolean).slice(0, 3);
  }
  const text = normalizeFlashcardText(value);
  if (!text) {
    return [];
  }
  return text
    .split(/\r?\n|[|,、]/)
    .map((choice) => normalizeFlashcardText(choice))
    .filter(Boolean)
    .slice(0, 3);
}

function normalizeFlashcardBlockData(value) {
  if (value == null) {
    return null;
  }
  if (typeof value === "object") {
    return value;
  }
  return normalizeFlashcardText(value) || null;
}

function normalizeFlashcardPlacement(value, fallbackOrder = 0) {
  const fallback = {
    area: "right",
    order: fallbackOrder,
  };
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return fallback;
  }
  const order = Number(value.order ?? value.z ?? value.index);
  return {
    area: normalizeFlashcardText(value.area ?? value.page ?? value.side) || fallback.area,
    order: Number.isFinite(order) ? order : fallbackOrder,
    x: normalizeFlashcardText(value.x),
    y: normalizeFlashcardText(value.y),
    width: normalizeFlashcardText(value.width),
    height: normalizeFlashcardText(value.height),
    align: normalizeFlashcardText(value.align),
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

function renderAvaterPreview(preview, equippedOverride = null) {
  if (!preview) {
    return;
  }
  const baseImage = preview.querySelector(".avater-base-image");
  if (baseImage) {
    baseImage.src = AVATER_BASE_IMAGE;
  }
  preview.querySelectorAll(".avater-layer, .avater-delete-popover").forEach((layer) => layer.remove());
  const equipped =
    equippedOverride && typeof equippedOverride === "object" && !Array.isArray(equippedOverride)
      ? equippedOverride
      : state.avater.equipped || {};
  Object.values(equipped).forEach((itemId) => {
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
  renderAvaterPreview(elements.navCharacter);
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
      <div class="review-coin-menu-balance" aria-label="Review Coin枚数">
        <img src="./assets/icons/coin.png?v=20260326-1" alt="" aria-hidden="true" />
        <span>Review Coin枚数</span>
        <strong data-review-coin-menu-balance>0</strong>
      </div>
      <div class="review-coin-menu-layout">
        <div class="review-coin-menu-list" data-review-coin-menu-list></div>
        <aside class="review-coin-menu-detail">
          <div class="review-coin-menu-selected" data-review-coin-menu-selected></div>
          <button class="primary review-coin-menu-action" type="button" data-review-coin-menu-primary>着用する</button>
        </aside>
      </div>
    </div>
  `;
  menu.addEventListener("click", handleReviewCoinMenuClick);
  document.body.append(menu);
  return menu;
}

function handleReviewCoinMenuClick(event) {
  event.stopPropagation();
  const source = event.target instanceof Element ? event.target : null;
  if (!source) {
    return;
  }
  if (source.closest("[data-review-coin-menu-close]")) {
    closeReviewCoinMenu();
    return;
  }
  const themeButton = source.closest("[data-review-coin-menu-theme]");
  if (themeButton) {
    const theme = normalizeTheme(themeButton.dataset.reviewCoinMenuTheme);
    reviewCoinMenuSelection = { type: "theme", id: theme };
    handleReviewCoinMenuThemeAction(theme);
    renderReviewCoinMenu({ keepScroll: true });
    return;
  }
  const avaterCategoryButton = source.closest("[data-review-coin-menu-avater-category]");
  if (avaterCategoryButton) {
    activeAvaterCategory = normalizeAvaterCategory(avaterCategoryButton.dataset.reviewCoinMenuAvaterCategory) || activeAvaterCategory;
    reviewCoinMenuSelection = { type: "avater-none", id: activeAvaterCategory };
    renderReviewCoinMenu({ keepScroll: true });
    return;
  }
  const avaterNoneButton = source.closest("[data-review-coin-menu-avater-none]");
  if (avaterNoneButton) {
    const category = normalizeAvaterCategory(avaterNoneButton.dataset.reviewCoinMenuAvaterNone) || activeAvaterCategory;
    reviewCoinMenuSelection = { type: "avater-none", id: category };
    renderReviewCoinMenu({ keepScroll: true });
    return;
  }
  const avaterButton = source.closest("[data-review-coin-menu-avater]");
  if (avaterButton) {
    reviewCoinMenuSelection = { type: "avater", id: avaterButton.dataset.reviewCoinMenuAvater || "" };
    renderReviewCoinMenu({ keepScroll: true });
    return;
  }
  if (source.closest("[data-review-coin-menu-primary]")) {
    handleReviewCoinMenuPrimaryAction();
  }
}

function renderReviewCoinMenu(options = {}) {
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
  const list = root.querySelector("[data-review-coin-menu-list]");
  if (list) {
    const previousScrollTop = list.scrollTop;
    list.innerHTML = renderReviewCoinMenuCatalog();
    if (options.keepScroll) {
      list.scrollTop = previousScrollTop;
    }
  }
  const selected = root.querySelector("[data-review-coin-menu-selected]");
  if (selected) {
    selected.innerHTML = reviewCoinMenuSelection.type === "theme" ? "" : renderReviewCoinMenuAvaterDetail();
  }
  root.classList.toggle("is-theme-selected", reviewCoinMenuSelection.type === "theme");
  root.classList.toggle("is-avater-selected", reviewCoinMenuSelection.type !== "theme");
  updateReviewCoinMenuPrimaryButton(root);
  if (isReviewCoinMenuOpen) {
    renderAvaterPreview(elements.navCharacter, getReviewCoinMenuPreviewEquipped());
  }
  if (isReviewCoinMenuOpen) {
    window.requestAnimationFrame(syncReviewCoinMenuGeometry);
  }
}

function handleReviewCoinMenuThemeAction(themeKey) {
  const normalizedTheme = normalizeTheme(themeKey);
  if (state.settings.theme === normalizedTheme) {
    return;
  }
  if (isThemeUnlocked(normalizedTheme)) {
    updateThemeSetting(normalizedTheme);
    return;
  }
  const cost = getThemeUnlockCost(normalizedTheme);
  if (hasUnlimitedReviewCoins() || state.reviewCoin >= cost) {
    proceedThemeUnlock(normalizedTheme);
  }
}

function getReviewCoinMenuPreviewEquipped() {
  const currentEquipped =
    state.avater?.equipped && typeof state.avater.equipped === "object" && !Array.isArray(state.avater.equipped)
      ? state.avater.equipped
      : {};
  const equipped = {
    ...currentEquipped,
  };
  if (reviewCoinMenuSelection.type === "avater-none") {
    const category = normalizeAvaterCategory(reviewCoinMenuSelection.id);
    if (category) {
      delete equipped[category];
    }
    return equipped;
  }
  if (reviewCoinMenuSelection.type === "avater") {
    const item = getAvaterItem(reviewCoinMenuSelection.id);
    if (item) {
      equipped[item.category] = item.id;
    }
  }
  return equipped;
}

function normalizeReviewCoinMenuSelection(selection) {
  if (selection?.type === "avater" && getAvaterItem(selection.id)) {
    return { type: "avater", id: selection.id };
  }
  if (selection?.type === "avater-none") {
    const category = normalizeAvaterCategory(selection.id) || activeAvaterCategory;
    return { type: "avater-none", id: category };
  }
  return { type: "theme", id: normalizeTheme(selection?.id || state.settings.theme) };
}

function renderReviewCoinMenuCatalog() {
  return `
    <section class="review-coin-menu-section review-coin-menu-theme-section" aria-labelledby="reviewCoinMenuThemeTitle">
      <h3 id="reviewCoinMenuThemeTitle" class="review-coin-menu-section-title">カラーテーマ</h3>
      <div class="review-coin-menu-theme-row">
        ${renderReviewCoinMenuThemeList()}
      </div>
    </section>
    <section class="review-coin-menu-section review-coin-menu-avater-section" aria-labelledby="reviewCoinMenuAvaterTitle">
      <h3 id="reviewCoinMenuAvaterTitle" class="review-coin-menu-section-title">Avater</h3>
      ${renderReviewCoinMenuAvaterList()}
    </section>
  `;
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
          <small>${isCurrent ? "着色中" : isUnlocked ? "購入済み" : `${cost} Coin`}</small>
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
  const emptyMessage = "";
  return `
    <div class="review-coin-menu-categories">${categoryTabs}</div>
    <div class="review-coin-menu-avater-row">
      ${noneCard}
      ${itemCards}
    </div>
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
  if (reviewCoinMenuSelection.type === "theme") {
    button.hidden = true;
    button.disabled = true;
    return;
  }
  button.hidden = false;
  const action = getReviewCoinMenuPrimaryAction();
  button.textContent = action.label;
  button.disabled = action.disabled;
  button.classList.toggle("secondary", action.kind === "secondary");
  button.classList.toggle("primary", action.kind !== "secondary");
}

function getReviewCoinMenuPrimaryAction() {
  if (reviewCoinMenuSelection.type === "theme") {
    const themeKey = normalizeTheme(reviewCoinMenuSelection.id);
    const isUnlocked = isThemeUnlocked(themeKey);
    const isCurrent = state.settings.theme === themeKey;
    const cost = getThemeUnlockCost(themeKey);
    if (isCurrent) {
      return { label: "着色中", disabled: true, kind: "secondary" };
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
  if (reviewCoinMenuSelection.type === "theme") {
    handleReviewCoinMenuThemeAction(reviewCoinMenuSelection.id);
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
  const menuNavRect = document.querySelector(".top-nav")?.getBoundingClientRect();
  const hasMenuNavRect = Boolean(
    menuNavRect &&
      Number.isFinite(menuNavRect.left) &&
      Number.isFinite(menuNavRect.width) &&
      menuNavRect.width > 0
  );
  const sideInset = hasMenuNavRect ? 0 : viewportWidth <= 760 ? 32 : 16;
  const navWidth = hasMenuNavRect ? menuNavRect.width : 0;
  const width = Math.min(Math.max(280, navWidth || 560), Math.max(280, viewportWidth - sideInset * 2));
  const preferredLeft = hasMenuNavRect ? menuNavRect.left : boardRect.right - width;
  const left = hasMenuNavRect
    ? Math.max(0, Math.min(preferredLeft, viewportWidth - width))
    : Math.max(sideInset, Math.min(preferredLeft, viewportWidth - width - sideInset));
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
  document.documentElement.style.setProperty("--review-coin-menu-avatar-shift-x", "0px");
  document.documentElement.style.setProperty("--review-coin-menu-avatar-shift-y", "0px");
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
    redirectToIndexPage();
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
  const lines = RAN_HOME_GREETING_TEMPLATES;
  const nickname = context.nickname && context.nickname !== "Guest Mode" ? `${context.nickname}さん、` : "";
  const seedSource = `${context.dateKey}:${context.hour}:${Math.floor(context.minute / 10)}:${context.streak}:${context.reviewCoin}:${context.activeScreen}`;
  const seed = Array.from(seedSource).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const template = lines[seed % lines.length] || lines[0] || "";
  return template
    .replaceAll("{nickname}", nickname)
    .replaceAll("{streak}", REVIEW_COIN_FORMATTER.format(Math.max(0, Number(context.streak) || 0)))
    .replaceAll("{coin}", hasUnlimitedReviewCoins() ? "∞" : REVIEW_COIN_FORMATTER.format(Math.max(0, Number(context.reviewCoin) || 0)));
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
      : new URL("./index.html", window.location.href).href;
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

// Index onboarding script
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
/* BEGIN_MANAGER_MIGRATED_SCRIPT_SOURCE */
window.THE_REVIEW_MANAGER_MIGRATED_SCRIPT_SOURCE = (() => {
  const source = [
    "CiAgICAgICgoKSA9PiB7CiAgICAgICAgY29uc3QgQVBQX1NUQVRFX0tFWSA9ICJ0aGUtcmV2aWV3LXF1ZXN0LXYxIjsKICAgICAgICBjb25zdCBNQU5BR0VSX0RSQUZUX0tFWSA9ICJ0aGUtcmV2aWV3LW1hbmFnZXItZHJhZnRzLXYxIjsKICAgICAgICBjb25zdCBNQU5BR0VSX09VVEJPWF9LRVkgPSAidGhlLXJldmlldy1tYW5hZ2VyLW91dGJveC12MSI7CiAgICAgICAgY29uc3QgTUFOQUdFUl9BUElfQkFTRV9LRVkgPSAidGhlLXJldmlldy1tYW5hZ2VyLWFwaS1iYXNlIjsKICAgICAgICBjb25zdCBTVE9SRV9DT05GSUdfS0VZID0gInRoZS1yZXZpZXctc3RvcmUtY29uZmlnLXYxIjsKICAgICAgICBjb25zdCBBVkFURVJfQ1VTVE9NX0lURU1TX0tFWSA9ICJ0aGUtcmV2aWV3LWF2YXRlci1pdGVtcy12MSI7CiAgICAgICAgY29uc3QgTUFOQUdFUl9NSUdSQVRFRF9EQVRBID0gd2luZG93LlRIRV9SRVZJRVdfTUFOQUdFUl9NSUdSQVRFRF9EQVRBOwogICAgICAgIGlmICghTUFOQUdFUl9NSUdSQVRFRF9EQVRBKSB7CiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIk1hbmFnZXIgbWlncmF0ZWQgZGF0YSBpcyBub3QgYXZhaWxhYmxlLiIpOwogICAgICAgIH0KICAgICAgICBjb25zdCBERUZBVUxUX1NUT1JFX0NPTkZJRyA9IE1BTkFHRVJfTUlHUkFURURfREFUQS5kZWZhdWx0U3RvcmVDb25maWc7CiAgICAgICAgY29uc3QgREVGQVVMVF9BUElfQkFTRSA9ICJodHRwczovL2FwaS50aGUtcmV2aWV3Lm5ldCI7CiAgICAgICAgY29uc3QgTUFOQUdFUl9ST0xFX0xBQkVMUyA9IE1BTkFHRVJfTUlHUkFURURfREFUQS5yb2xlTGFiZWxzOwogICAgICAgIGNvbnN0IE1BTkFHRVJfUk9MRV9JRFMgPSBPYmplY3QuZnJlZXplKE9iamVjdC5rZXlzKE1BTkFHRVJfUk9MRV9MQUJFTFMpLmZpbHRlcigo",
    "cm9sZSkgPT4gcm9sZSAhPT0gInVzZXIiKSk7CiAgICAgICAgY29uc3QgTUFOQUdFUl9ST0xFX0FMSUFTRVMgPSBNQU5BR0VSX01JR1JBVEVEX0RBVEEucm9sZUFsaWFzZXM7CiAgICAgICAgY29uc3QgTUFOQUdFUl9USEVNRV9JRFMgPSBPYmplY3QuZnJlZXplKE1BTkFHRVJfTUlHUkFURURfREFUQS5hdmFpbGFibGVUaGVtZXMgfHwgWyJzZWEiXSk7CiAgICAgICAgY29uc3QgTUFOQUdFUl9USEVNRV9MQUJFTFMgPSBNQU5BR0VSX01JR1JBVEVEX0RBVEEudGhlbWVEaXNwbGF5TmFtZXMgfHwge307CiAgICAgICAgY29uc3QgTUFOQUdFUl9BVkFURVJfQ0FURUdPUllfTEFCRUxTID0gTUFOQUdFUl9NSUdSQVRFRF9EQVRBLmF2YXRlckNhdGVnb3J5TGFiZWxzOwogICAgICAgIGNvbnN0IE1BTkFHRVJfQVZBVEVSX0lURU1fQ0xBU1NFUyA9IE1BTkFHRVJfTUlHUkFURURfREFUQS5hdmF0ZXJJdGVtQ2xhc3NlczsKICAgICAgICBjb25zdCBOT1RFX0JZX0JJTkRFUiA9IE1BTkFHRVJfTUlHUkFURURfREFUQS5ub3RlQnlCaW5kZXI7CiAgICAgICAgY29uc3QgREVGQVVMVF9DSEFQVEVSX0NPTkZJRyA9IE1BTkFHRVJfTUlHUkFURURfREFUQS5kZWZhdWx0Q2hhcHRlckNvbmZpZzsKCiAgICAgICAgY29uc3QgQ0hBUFRFUl9DT05GSUdfQllfTk9URSA9IHt9OwoKICAgICAgICBjb25zdCBTVEFUVVNfTEFCRUwgPSB7CiAgICAgICAgICBkcmFmdDogIuS4i+abuOOBjSIsCiAgICAgICAgICBwZW5kaW5nOiAi5om/6KqN5b6F44GhIiwKICAgICAgICAgIGFwcHJvdmVkOiAi5YWs6ZaL5riI44G/IiwKICAgICAgICAgIHJlamVjdGVkOiAi5beu44GX5oi744GXIiwKICAgICAgICB9OwogICAgICAgIGNvbnN0IE1BTkFHRVJfU0NSRUVOX1RJVExFUyA9IHsKICAgICAgICAgIGhvbWU6ICLjg4jjg4Pjg5ci",
    "LAogICAgICAgICAgbWVtYmVyczogIuODpuODvOOCtuODvCIsCiAgICAgICAgICBwcm9ibGVtOiAi5ZWP6aGMIiwKICAgICAgICAgIHN0b3JlOiAi44K544OI44KiIiwKICAgICAgICB9OwoKICAgICAgICBjb25zdCBzdGF0ZSA9IHsKICAgICAgICAgIGFjdGl2ZVNjcmVlbjogImhvbWUiLAogICAgICAgICAgYXV0aDBDbGllbnQ6IG51bGwsCiAgICAgICAgICBkcmFmdHM6IGxvYWRNYW5hZ2VyUHJvYmxlbURyYWZ0cygpLAogICAgICAgICAgYXV0aDogbG9hZEF1dGhTdW1tYXJ5KCksCiAgICAgICAgICBtYW5hZ2VyQWNjZXNzOiBudWxsLAogICAgICAgICAgbWFuYWdlck1lbWJlcnM6IFtdLAogICAgICAgICAgYWN0aXZlQXZhdGVyQ2F0ZWdvcnk6ICJjbG90aGVzIiwKICAgICAgICAgIGFjdGl2ZVN0b3JlVGFiOiAiY3JlYXRlIiwKICAgICAgICAgIGluZm9NZW51Q2xvc2VUaW1lcklkOiBudWxsLAogICAgICAgICAgZHJhZ2dpbmdJZDogbnVsbCwKICAgICAgICAgIGxhc3REcmFnT3ZlcktleTogbnVsbCwKICAgICAgICAgIHByb2JsZW1JbWFnZURhdGE6IG51bGwsCiAgICAgICAgICBzZWxlY3RlZExpc3RCaW5kZXI6ICIiLAogICAgICAgICAgc2VsZWN0ZWRMaXN0Tm90ZTogIiIsCiAgICAgICAgICBzZWxlY3RlZExpc3RDaGFwdGVyOiAiYWxsIiwKICAgICAgICAgIHBlbmRpbmdQcm9ibGVtRHJhZnQ6IG51bGwsCiAgICAgICAgICBsYXN0UHJvYmxlbVN0ZXA6ICJjcmVhdGUiLAogICAgICAgICAgYWN0aXZlUHJvYmxlbVRhYjogImNyZWF0ZSIsCiAgICAgICAgICBzZWxlY3RlZFBlbmRpbmdRdWVzdGlvbklkOiAiIiwKICAgICAgICAgIHRleHRCbG9ja3M6IFtdLAogICAgICAgICAgZHJhZ2dpbmdUZXh0QmxvY2tJZDogIiIsCiAgICAgICAgICBub3RlYm9va0Jsb2NrczogW10sCiAgICAg",
    "ICAgICBjc3ZJbXBvcnREcmFmdHM6IFtdLAogICAgICAgICAgYWN0aXZlTm90ZWJvb2tCbG9ja0lkOiAiIiwKICAgICAgICAgIG5vdGVib29rRHJhZ1N0YXRlOiBudWxsLAogICAgICAgICAgbm90ZWJvb2tMb25nUHJlc3NUaW1lcklkOiBudWxsLAogICAgICAgICAgbm90ZWJvb2tTdXBwcmVzc1N1cmZhY2VDbGljazogZmFsc2UsCiAgICAgICAgICB2ZWN0b3JHcmFwaExpbmVzOiBbXSwKICAgICAgICAgIHZlY3RvckdyYXBoUG9pbnRlclN0YXRlOiBudWxsLAogICAgICAgICAgYXZhdGVySXRlbUltYWdlRGF0YTogbnVsbCwKICAgICAgICAgIGFjdGl2ZVN0b3JlSXRlbUlkOiAiIiwKICAgICAgICAgIHJldmlld0RhdGFTbmFwc2hvdDogbnVsbCwKICAgICAgICAgIHBlbmRpbmdNYW5hZ2VyTWVtYmVyQWN0aW9uOiBudWxsLAogICAgICAgIH07CgogICAgICAgIGNvbnN0IGVsZW1lbnRzID0gewogICAgICAgICAgYXBwTG9hZGVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiYXBwTG9hZGVyIiksCiAgICAgICAgICBpbmZvTWVudVRyaWdnZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJpbmZvTWVudVRyaWdnZXIiKSwKICAgICAgICAgIGluZm9NZW51Q2xvc2VCdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJpbmZvTWVudUNsb3NlQnRuIiksCiAgICAgICAgICBpbmZvTWVudVBhbmVsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiaW5mb01lbnVQYW5lbCIpLAogICAgICAgICAgbWFuYWdlckluZm9NZW51Tmlja25hbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJtYW5hZ2VySW5mb01lbnVOaWNrbmFtZSIpLAogICAgICAgICAgbWVudUl0ZW1zOiBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIi5pbmZvLW1lbnUtaXRlbSIpKSwKICAgICAgICAgIHNjcmVl",
    "bnM6IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgiLnNjcmVlbiIpKSwKICAgICAgICAgIG5hdkJ1dHRvbnM6IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgiW2RhdGEtc2NyZWVuXSIpKSwKICAgICAgICAgIGhvbWVMaW5rczogQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCJbZGF0YS1ob21lLWxpbmtdIikpLAogICAgICAgICAgcHVibGlzaGVkQmluZGVyU2VsZWN0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgicHVibGlzaGVkQmluZGVyU2VsZWN0IiksCiAgICAgICAgICBwdWJsaXNoZWROb3RlTWVudTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInB1Ymxpc2hlZE5vdGVNZW51IiksCiAgICAgICAgICBwdWJsaXNoZWRDaGFwdGVyU2VsZWN0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgicHVibGlzaGVkQ2hhcHRlclNlbGVjdCIpLAogICAgICAgICAgcHVibGlzaGVkQ2hhcHRlckxhYmVsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgicHVibGlzaGVkQ2hhcHRlckxhYmVsIiksCiAgICAgICAgICBxdWVzdGlvbkxpc3RVcGRhdGVkQXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJxdWVzdGlvbkxpc3RVcGRhdGVkQXQiKSwKICAgICAgICAgIGNyZWF0ZWRRdWVzdGlvbkxpc3Q6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJjcmVhdGVkUXVlc3Rpb25MaXN0IiksCiAgICAgICAgICBwcm9ibGVtVGFiQnV0dG9uczogQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCJbZGF0YS1wcm9ibGVtLXRhYl0iKSksCiAgICAgICAgICBwcm9ibGVtVGFiUGFuZWxzOiBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIltkYXRhLXByb2JsZW0tdGFiLXBhbmVsXSIpKSwKICAgICAgICAgIHN0b3Jl",
    "VGFiQnV0dG9uczogQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCJbZGF0YS1zdG9yZS10YWJdIikpLAogICAgICAgICAgc3RvcmVUYWJQYW5lbHM6IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgiW2RhdGEtc3RvcmUtdGFiLXBhbmVsXSIpKSwKICAgICAgICAgIHByb2JsZW1DcmVhdGVGb3JtOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgicHJvYmxlbUNyZWF0ZUZvcm0iKSwKICAgICAgICAgIHByb2JsZW1TdGVwczogQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCJbZGF0YS1wcm9ibGVtLXN0ZXBdIikpLAogICAgICAgICAgcGVuZGluZ1F1ZXN0aW9uTGlzdDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInBlbmRpbmdRdWVzdGlvbkxpc3QiKSwKICAgICAgICAgIHBlbmRpbmdRdWVzdGlvbkVtcHR5OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgicGVuZGluZ1F1ZXN0aW9uRW1wdHkiKSwKICAgICAgICAgIHBlbmRpbmdRdWVzdGlvbkVkaXRvclBhbmVsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgicGVuZGluZ1F1ZXN0aW9uRWRpdG9yUGFuZWwiKSwKICAgICAgICAgIHBlbmRpbmdRdWVzdGlvbkJpbmRlcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInBlbmRpbmdRdWVzdGlvbkJpbmRlciIpLAogICAgICAgICAgcGVuZGluZ1F1ZXN0aW9uTm90ZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInBlbmRpbmdRdWVzdGlvbk5vdGUiKSwKICAgICAgICAgIHBlbmRpbmdRdWVzdGlvbkNoYXB0ZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJwZW5kaW5nUXVlc3Rpb25DaGFwdGVyIiksCiAgICAgICAgICBwZW5kaW5nUXVlc3Rpb25TdGF0dXM6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJwZW5kaW5nUXVlc3Rpb25TdGF0",
    "dXMiKSwKICAgICAgICAgIHBlbmRpbmdRdWVzdGlvbkVkaXRvcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInBlbmRpbmdRdWVzdGlvbkVkaXRvciIpLAogICAgICAgICAgcGVuZGluZ1F1ZXN0aW9uU2F2ZUJ0bjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInBlbmRpbmdRdWVzdGlvblNhdmVCdG4iKSwKICAgICAgICAgIHBlbmRpbmdRdWVzdGlvbkFwcHJvdmVCdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJwZW5kaW5nUXVlc3Rpb25BcHByb3ZlQnRuIiksCiAgICAgICAgICBwZW5kaW5nUXVlc3Rpb25GZWVkYmFjazogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInBlbmRpbmdRdWVzdGlvbkZlZWRiYWNrIiksCiAgICAgICAgICBzYXZlUHJvYmxlbURyYWZ0QnRuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgic2F2ZVByb2JsZW1EcmFmdEJ0biIpLAogICAgICAgICAgcmVzZXRQcm9ibGVtRm9ybUJ0bjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInJlc2V0UHJvYmxlbUZvcm1CdG4iKSwKICAgICAgICAgIGJpbmRlclNlbGVjdDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImJpbmRlclNlbGVjdCIpLAogICAgICAgICAgbm90ZVNlbGVjdDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIm5vdGVTZWxlY3QiKSwKICAgICAgICAgIGNoYXB0ZXJTZWxlY3Q6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJjaGFwdGVyU2VsZWN0IiksCiAgICAgICAgICBjaGFwdGVyRmllbGRMYWJlbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImNoYXB0ZXJGaWVsZExhYmVsIiksCiAgICAgICAgICB0ZXh0TnVtYmVySW5wdXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJ0ZXh0TnVtYmVySW5wdXQiKSwKICAgICAgICAgIHRleHROYW1lSW5wdXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJ0",
    "ZXh0TmFtZUlucHV0IiksCiAgICAgICAgICB0ZXh0QmxvY2tMaXN0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgidGV4dEJsb2NrTGlzdCIpLAogICAgICAgICAgdGV4dEJsb2NrQWRkQnV0dG9uczogQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCJbZGF0YS1hZGQtdGV4dC1ibG9ja10iKSksCiAgICAgICAgICBxdWVzdGlvbk51bWJlcklucHV0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgicXVlc3Rpb25OdW1iZXJJbnB1dCIpLAogICAgICAgICAgcXVlc3Rpb25OYW1lSW5wdXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJxdWVzdGlvbk5hbWVJbnB1dCIpLAogICAgICAgICAgcHJvYmxlbUNzdklucHV0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgicHJvYmxlbUNzdklucHV0IiksCiAgICAgICAgICBwcm9ibGVtQ3N2TG9hZEJ0bjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInByb2JsZW1Dc3ZMb2FkQnRuIiksCiAgICAgICAgICBwcm9ibGVtQ3N2U3VibWl0TWlzc2luZ0J0bjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInByb2JsZW1Dc3ZTdWJtaXRNaXNzaW5nQnRuIiksCiAgICAgICAgICBwcm9ibGVtQ3N2SW1wb3J0U3VtbWFyeTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInByb2JsZW1Dc3ZJbXBvcnRTdW1tYXJ5IiksCiAgICAgICAgICBwcm9ibGVtQ3N2SW1wb3J0TGlzdDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInByb2JsZW1Dc3ZJbXBvcnRMaXN0IiksCiAgICAgICAgICBwcm9ibGVtSW1hZ2VJbnB1dDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInByb2JsZW1JbWFnZUlucHV0IiksCiAgICAgICAgICBzZWxlY3RQcm9ibGVtSW1hZ2VCdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJzZWxlY3RQcm9ibGVtSW1hZ2VCdG4iKSwKICAg",
    "ICAgICAgIHZpZXdQcm9ibGVtSW1hZ2VCdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJ2aWV3UHJvYmxlbUltYWdlQnRuIiksCiAgICAgICAgICBwcm9ibGVtSW1hZ2VQcmV2aWV3V3JhcDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInByb2JsZW1JbWFnZVByZXZpZXdXcmFwIiksCiAgICAgICAgICBwcm9ibGVtSW1hZ2VNZXRhOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgicHJvYmxlbUltYWdlTWV0YSIpLAogICAgICAgICAgY2xlYXJQcm9ibGVtSW1hZ2VCdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJjbGVhclByb2JsZW1JbWFnZUJ0biIpLAogICAgICAgICAgcHJvYmxlbUVkaXRvcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInByb2JsZW1FZGl0b3IiKSwKICAgICAgICAgIGVkaXRvclRvb2xiYXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJlZGl0b3JUb29sYmFyIiksCiAgICAgICAgICB2ZWN0b3JHcmFwaERpYWxvZzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInZlY3RvckdyYXBoRGlhbG9nIiksCiAgICAgICAgICB2ZWN0b3JHcmFwaE1vZGVTZWxlY3Q6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJ2ZWN0b3JHcmFwaE1vZGVTZWxlY3QiKSwKICAgICAgICAgIHZlY3RvckdyYXBoU3ZnOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgidmVjdG9yR3JhcGhTdmciKSwKICAgICAgICAgIHZlY3RvckdyYXBoR3JpZDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInZlY3RvckdyYXBoR3JpZCIpLAogICAgICAgICAgdmVjdG9yR3JhcGhMaW5lczogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInZlY3RvckdyYXBoTGluZXMiKSwKICAgICAgICAgIHZlY3RvckdyYXBoUHJldmlldzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInZlY3RvckdyYXBoUHJldmlldyIpLAog",
    "ICAgICAgICAgdmVjdG9yR3JhcGhBY3Rpb25CdXR0b25zOiBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIltkYXRhLXZlY3Rvci1ncmFwaC1hY3Rpb25dIikpLAogICAgICAgICAgbm90ZWJvb2tFZGl0b3JUb29sYmFyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgibm90ZWJvb2tFZGl0b3JUb29sYmFyIiksCiAgICAgICAgICBub3RlYm9va0VkaXRvckJvb2s6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJub3RlYm9va0VkaXRvckJvb2siKSwKICAgICAgICAgIG5vdGVib29rVGV4dFN1cmZhY2U6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJub3RlYm9va1RleHRTdXJmYWNlIiksCiAgICAgICAgICBub3RlYm9va1F1ZXN0aW9uU3VyZmFjZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIm5vdGVib29rUXVlc3Rpb25TdXJmYWNlIiksCiAgICAgICAgICBub3RlYm9va1RleHRTdWJqZWN0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgibm90ZWJvb2tUZXh0U3ViamVjdCIpLAogICAgICAgICAgbm90ZWJvb2tRdWVzdGlvblN1YmplY3Q6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJub3RlYm9va1F1ZXN0aW9uU3ViamVjdCIpLAogICAgICAgICAgbm90ZWJvb2tFZGl0b3JEYXRlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgibm90ZWJvb2tFZGl0b3JEYXRlIiksCiAgICAgICAgICBub3RlYm9va0VkaXRvckRhdGVzOiBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIltkYXRhLW5vdGVib29rLWVkaXRvci1kYXRlXSIpKSwKICAgICAgICAgIGVkaXRvcldvcmRDb3VudDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImVkaXRvcldvcmRDb3VudCIpLAogICAgICAgICAgZWRpdG9yQ2hhckNvdW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiZWRp",
    "dG9yQ2hhckNvdW50IiksCiAgICAgICAgICBwcm9vZnJlYWRpbmdGZWVkYmFjazogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInByb29mcmVhZGluZ0ZlZWRiYWNrIiksCiAgICAgICAgICBwcm9maWxlTmlja25hbWVWYWx1ZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInByb2ZpbGVOaWNrbmFtZVZhbHVlIiksCiAgICAgICAgICBwcm9maWxlUm9sZVZhbHVlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgicHJvZmlsZVJvbGVWYWx1ZSIpLAogICAgICAgICAgbWFuYWdlckF2YXRlclByZXZpZXdzOiBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIltkYXRhLW1hbmFnZXItYXZhdGVyLXByZXZpZXddIikpLAogICAgICAgICAgbWFuYWdlck1lbWJlcnNQYW5lbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIm1hbmFnZXJNZW1iZXJzUGFuZWwiKSwKICAgICAgICAgIG1hbmFnZXJNZW1iZXJzUmVmcmVzaEJ0bjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIm1hbmFnZXJNZW1iZXJzUmVmcmVzaEJ0biIpLAogICAgICAgICAgbWFuYWdlck1lbWJlclNlYXJjaElucHV0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgibWFuYWdlck1lbWJlclNlYXJjaElucHV0IiksCiAgICAgICAgICBtYW5hZ2VyTWVtYmVyc1N0YXR1czogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIm1hbmFnZXJNZW1iZXJzU3RhdHVzIiksCiAgICAgICAgICBtYW5hZ2VyTWVtYmVyc0xpc3Q6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJtYW5hZ2VyTWVtYmVyc0xpc3QiKSwKICAgICAgICAgIGF2YXRlckl0ZW1OYW1lSW5wdXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJhdmF0ZXJJdGVtTmFtZUlucHV0IiksCiAgICAgICAgICBhdmF0ZXJJdGVtQ2F0ZWdvcnlTZWxlY3Q6IGRvY3VtZW50LmdldEVs",
    "ZW1lbnRCeUlkKCJhdmF0ZXJJdGVtQ2F0ZWdvcnlTZWxlY3QiKSwKICAgICAgICAgIGF2YXRlckl0ZW1Db3N0SW5wdXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJhdmF0ZXJJdGVtQ29zdElucHV0IiksCiAgICAgICAgICBhdmF0ZXJJdGVtSW1hZ2VJbnB1dDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImF2YXRlckl0ZW1JbWFnZUlucHV0IiksCiAgICAgICAgICBhdmF0ZXJJdGVtSW1hZ2VEcm9wem9uZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImF2YXRlckl0ZW1JbWFnZURyb3B6b25lIiksCiAgICAgICAgICBhdmF0ZXJJdGVtSW1hZ2VQcmV2aWV3OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiYXZhdGVySXRlbUltYWdlUHJldmlldyIpLAogICAgICAgICAgYXZhdGVySXRlbUltYWdlRW1wdHk6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJhdmF0ZXJJdGVtSW1hZ2VFbXB0eSIpLAogICAgICAgICAgYXZhdGVySXRlbUltYWdlTWV0YTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImF2YXRlckl0ZW1JbWFnZU1ldGEiKSwKICAgICAgICAgIGFkanVzdEF2YXRlckl0ZW1JbWFnZUJ0bjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImFkanVzdEF2YXRlckl0ZW1JbWFnZUJ0biIpLAogICAgICAgICAgY2xlYXJBdmF0ZXJJdGVtSW1hZ2VCdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJjbGVhckF2YXRlckl0ZW1JbWFnZUJ0biIpLAogICAgICAgICAgYXZhdGVySXRlbUltYWdlQWRqdXN0RGlhbG9nOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiYXZhdGVySXRlbUltYWdlQWRqdXN0RGlhbG9nIiksCiAgICAgICAgICBhdmF0ZXJJdGVtQWRqdXN0SW1hZ2U6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJhdmF0ZXJJdGVtQWRqdXN0SW1hZ2UiKSwKICAgICAgICAgIGF2YXRl",
    "ckl0ZW1JbWFnZVNjYWxlSW5wdXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJhdmF0ZXJJdGVtSW1hZ2VTY2FsZUlucHV0IiksCiAgICAgICAgICBhdmF0ZXJJdGVtSW1hZ2VTY2FsZVhJbnB1dDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImF2YXRlckl0ZW1JbWFnZVNjYWxlWElucHV0IiksCiAgICAgICAgICBhdmF0ZXJJdGVtSW1hZ2VTY2FsZVlJbnB1dDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImF2YXRlckl0ZW1JbWFnZVNjYWxlWUlucHV0IiksCiAgICAgICAgICBhdmF0ZXJJdGVtSW1hZ2VPZmZzZXRYSW5wdXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJhdmF0ZXJJdGVtSW1hZ2VPZmZzZXRYSW5wdXQiKSwKICAgICAgICAgIGF2YXRlckl0ZW1JbWFnZU9mZnNldFlJbnB1dDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImF2YXRlckl0ZW1JbWFnZU9mZnNldFlJbnB1dCIpLAogICAgICAgICAgYXZhdGVySXRlbUltYWdlUm90YXRlSW5wdXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJhdmF0ZXJJdGVtSW1hZ2VSb3RhdGVJbnB1dCIpLAogICAgICAgICAgYXZhdGVySXRlbUltYWdlQWRqdXN0QnV0dG9uczogQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCJbZGF0YS1hdmF0ZXItaW1hZ2UtYWRqdXN0LWFjdGlvbl0iKSksCiAgICAgICAgICBhZGRBdmF0ZXJJdGVtQnRuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiYWRkQXZhdGVySXRlbUJ0biIpLAogICAgICAgICAgbWFuYWdlckF2YXRlckl0ZW1MaXN0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgibWFuYWdlckF2YXRlckl0ZW1MaXN0IiksCiAgICAgICAgICBzdG9yZUNvbmZpZ0ZlZWRiYWNrOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgic3RvcmVDb25maWdGZWVkYmFjayIpLAogICAg",
    "ICAgICAgcHJvYmxlbUltYWdlRGlhbG9nOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgicHJvYmxlbUltYWdlRGlhbG9nIiksCiAgICAgICAgICBwcm9ibGVtRGlhbG9nSW1hZ2U6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJwcm9ibGVtRGlhbG9nSW1hZ2UiKSwKICAgICAgICAgIHByb2JsZW1EaWFsb2dJbWFnZU1ldGE6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJwcm9ibGVtRGlhbG9nSW1hZ2VNZXRhIiksCiAgICAgICAgICBpbWFnZURpYWxvZ0J1dHRvbnM6IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgiW2RhdGEtaW1hZ2UtZGlhbG9nLWFjdGlvbl0iKSksCiAgICAgICAgICBwcm9ibGVtUmVzZXREaWFsb2c6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJwcm9ibGVtUmVzZXREaWFsb2ciKSwKICAgICAgICAgIHJlc2V0RGlhbG9nQnV0dG9uczogQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCJbZGF0YS1yZXNldC1kaWFsb2ctYWN0aW9uXSIpKSwKICAgICAgICAgIG1hbmFnZXJNZW1iZXJBY3Rpb25EaWFsb2c6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJtYW5hZ2VyTWVtYmVyQWN0aW9uRGlhbG9nIiksCiAgICAgICAgICBtYW5hZ2VyTWVtYmVyQWN0aW9uRGlhbG9nVGl0bGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJtYW5hZ2VyTWVtYmVyQWN0aW9uRGlhbG9nVGl0bGUiKSwKICAgICAgICAgIG1hbmFnZXJNZW1iZXJBY3Rpb25EaWFsb2dNZXNzYWdlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgibWFuYWdlck1lbWJlckFjdGlvbkRpYWxvZ01lc3NhZ2UiKSwKICAgICAgICAgIG1hbmFnZXJNZW1iZXJBY3Rpb25Db25maXJtQnRuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgibWFuYWdlck1lbWJlckFjdGlvbkNvbmZpcm1C",
    "dG4iKSwKICAgICAgICAgIG1hbmFnZXJNZW1iZXJEaWFsb2dCdXR0b25zOiBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIltkYXRhLW1hbmFnZXItbWVtYmVyLWRpYWxvZy1hY3Rpb25dIikpLAogICAgICAgICAgcHJvYmxlbUNvbmZpcm1EaWFsb2c6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJwcm9ibGVtQ29uZmlybURpYWxvZyIpLAogICAgICAgICAgY29uZmlybVByb2JsZW1Ob3RlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiY29uZmlybVByb2JsZW1Ob3RlIiksCiAgICAgICAgICBjb25maXJtUHJvYmxlbUNoYXB0ZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJjb25maXJtUHJvYmxlbUNoYXB0ZXIiKSwKICAgICAgICAgIGNvbmZpcm1Qcm9ibGVtSW1hZ2U6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJjb25maXJtUHJvYmxlbUltYWdlIiksCiAgICAgICAgICBjb25maXJtUHJvYmxlbUNvbnRlbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJjb25maXJtUHJvYmxlbUNvbnRlbnQiKSwKICAgICAgICAgIGNvbmZpcm1EaWFsb2dCdXR0b25zOiBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIltkYXRhLWNvbmZpcm0tZGlhbG9nLWFjdGlvbl0iKSksCiAgICAgICAgfTsKCiAgICAgICAgaW5pdGlhbGl6ZSgpOwoKICAgICAgICBhc3luYyBmdW5jdGlvbiBpbml0aWFsaXplKCkgewogICAgICAgICAgaW5pdGlhbGl6ZU1lbnUoKTsKICAgICAgICAgIGluaXRpYWxpemVOYXZpZ2F0aW9uKCk7CiAgICAgICAgICBpbml0aWFsaXplTWFuYWdlck1lbWJlcnMoKTsKICAgICAgICAgIGluaXRpYWxpemVTdG9yZVNldHRpbmdzKCk7CiAgICAgICAgICBpbml0aWFsaXplU3RvcmVUYWJzKCk7CiAgICAgICAgICByZW5kZXJTdG9yZVNldHRpbmdz",
    "KCk7CiAgICAgICAgICByZW5kZXJNYW5hZ2VyQWNjZXNzKCk7CiAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigidGhlLXJldmlldy1tYW5hZ2VyLWFjY2VzcyIsIChldmVudCkgPT4gewogICAgICAgICAgICBpZiAoIWFwcGx5TWFuYWdlckFjY2VzcyhldmVudC5kZXRhaWwpICYmICFldmVudC5kZXRhaWwpIHsKICAgICAgICAgICAgICBzdGF0ZS5tYW5hZ2VyQWNjZXNzID0gewogICAgICAgICAgICAgICAgY2FuQWNjZXNzOiBmYWxzZSwKICAgICAgICAgICAgICAgIHN0YXR1czogInVzZXIiLAogICAgICAgICAgICAgICAgcm9sZTogbnVsbCwKICAgICAgICAgICAgICB9OwogICAgICAgICAgICAgIHJlbmRlck1hbmFnZXJBY2Nlc3MoKTsKICAgICAgICAgICAgfQogICAgICAgICAgfSk7CiAgICAgICAgICB2b2lkIGluaXRpYWxpemVNYW5hZ2VyQWNjZXNzKCk7CiAgICAgICAgICBwcnVuZVNlZWREcmFmdHMoKTsKICAgICAgICAgIGluaXRpYWxpemVQdWJsaXNoZWRGaWx0ZXJzKCk7CiAgICAgICAgICBpbml0aWFsaXplUHJvYmxlbVRhYnMoKTsKICAgICAgICAgIGluaXRpYWxpemVQZW5kaW5nUXVlc3Rpb25NYW5hZ2VyKCk7CiAgICAgICAgICBpbml0aWFsaXplUHJvYmxlbUZvcm0oKTsKICAgICAgICAgIGluaXRpYWxpemVRdWVzdGlvbkxpc3REbkQoKTsKICAgICAgICAgIHJlbmRlclF1ZXN0aW9uTGlzdCgpOwogICAgICAgICAgcmVuZGVyUGVuZGluZ1F1ZXN0aW9uTWFuYWdlcigpOwogICAgICAgICAgcmVuZGVyUHJvZmlsZSgpOwogICAgICAgICAgcmVuZGVyUHJvYmxlbUltYWdlUHJldmlldygpOwogICAgICAgICAgcmVuZGVyVGV4dEJsb2NrcygpOwogICAgICAgICAgcmVuZGVyQXZhdGVySXRlbUltYWdlUHJldmlldygpOwogICAgICAgICAgdXBkYXRlRWRpdG9yQ291",
    "bnRzKCk7CiAgICAgICAgICBub3RpZnlNYW5hZ2VyU2NyZWVuQ2hhbmdlKHN0YXRlLmFjdGl2ZVNjcmVlbik7CiAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7CiAgICAgICAgICAgIGlmIChlbGVtZW50cy5hcHBMb2FkZXIpIHsKICAgICAgICAgICAgICBlbGVtZW50cy5hcHBMb2FkZXIuc3R5bGUuZGlzcGxheSA9ICJub25lIjsKICAgICAgICAgICAgfQogICAgICAgICAgfSwgODApOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gcHJ1bmVTZWVkRHJhZnRzKCkgewogICAgICAgICAgY29uc3QgY2xlYW5lZERyYWZ0cyA9IHN0YXRlLmRyYWZ0cy5maWx0ZXIoKGRyYWZ0KSA9PiB7CiAgICAgICAgICAgIGlmICh0eXBlb2YgZHJhZnQ/LmlkID09PSAic3RyaW5nIiAmJiBkcmFmdC5pZC5zdGFydHNXaXRoKCJzZWVkLXRlc3QtIikpIHsKICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcmV0dXJuICEvXuODhuOCueODiDBbMS0zXSQvLnRlc3QoU3RyaW5nKGRyYWZ0Py5jb250ZW50VGV4dCB8fCAiIikpOwogICAgICAgICAgfSk7CiAgICAgICAgICBpZiAoY2xlYW5lZERyYWZ0cy5sZW5ndGggIT09IHN0YXRlLmRyYWZ0cy5sZW5ndGgpIHsKICAgICAgICAgICAgc3RhdGUuZHJhZnRzID0gY2xlYW5lZERyYWZ0czsKICAgICAgICAgICAgc2F2ZUpzb24oTUFOQUdFUl9EUkFGVF9LRVksIHN0YXRlLmRyYWZ0cyk7CiAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBpbml0aWFsaXplTWVudSgpIHsKICAgICAgICAgIGlmICghZWxlbWVudHMuaW5mb01lbnVUcmlnZ2VyIHx8ICFlbGVtZW50cy5pbmZvTWVudVBhbmVsKSB7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KCiAgICAgICAgICBlbGVtZW50",
    "cy5pbmZvTWVudVRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCAoKSA9PiB7CiAgICAgICAgICAgIGlmIChlbGVtZW50cy5pbmZvTWVudVBhbmVsLmNsYXNzTGlzdC5jb250YWlucygiaXMtb3BlbiIpKSB7CiAgICAgICAgICAgICAgY2xvc2VJbmZvTWVudSgpOwogICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgfQogICAgICAgICAgICBvcGVuSW5mb01lbnUoKTsKICAgICAgICAgIH0pOwoKICAgICAgICAgIGVsZW1lbnRzLmluZm9NZW51Q2xvc2VCdG4/LmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIiwgY2xvc2VJbmZvTWVudSk7CgogICAgICAgICAgZWxlbWVudHMubWVudUl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHsKICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsICgpID0+IHsKICAgICAgICAgICAgICBjb25zdCBsaW5rU2NyZWVuID0gaXRlbS5kYXRhc2V0Lm1lbnVMaW5rOwogICAgICAgICAgICAgIGNvbnN0IGxpbmtVcmwgPSBpdGVtLmRhdGFzZXQubWVudVVybDsKCiAgICAgICAgICAgICAgaWYgKGxpbmtTY3JlZW4pIHsKICAgICAgICAgICAgICAgIHN3aXRjaFNjcmVlbihsaW5rU2NyZWVuKTsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgaWYgKGxpbmtVcmwpIHsKICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbGlua1VybDsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgY2xvc2VJbmZvTWVudSgpOwogICAgICAgICAgICB9KTsKICAgICAgICAgIH0pOwoKICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIiwgKGV2ZW50KSA9PiB7CiAgICAgICAgICAgIGlmICghZWxlbWVudHMuaW5mb01lbnVQYW5lbCB8fCAhZWxlbWVudHMuaW5mb01lbnVUcmlnZ2VyKSB7CiAg",
    "ICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmICgKICAgICAgICAgICAgICBldmVudC50YXJnZXQgaW5zdGFuY2VvZiBFbGVtZW50ICYmCiAgICAgICAgICAgICAgIWVsZW1lbnRzLmluZm9NZW51UGFuZWwuY29udGFpbnMoZXZlbnQudGFyZ2V0KSAmJgogICAgICAgICAgICAgICFlbGVtZW50cy5pbmZvTWVudVRyaWdnZXIuY29udGFpbnMoZXZlbnQudGFyZ2V0KQogICAgICAgICAgICApIHsKICAgICAgICAgICAgICBjbG9zZUluZm9NZW51KCk7CiAgICAgICAgICAgIH0KICAgICAgICAgIH0pOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gb3BlbkluZm9NZW51KCkgewogICAgICAgICAgaWYgKCFlbGVtZW50cy5pbmZvTWVudVBhbmVsIHx8ICFlbGVtZW50cy5pbmZvTWVudVRyaWdnZXIpIHsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQogICAgICAgICAgaWYgKHN0YXRlLmluZm9NZW51Q2xvc2VUaW1lcklkICE9PSBudWxsKSB7CiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoc3RhdGUuaW5mb01lbnVDbG9zZVRpbWVySWQpOwogICAgICAgICAgICBzdGF0ZS5pbmZvTWVudUNsb3NlVGltZXJJZCA9IG51bGw7CiAgICAgICAgICB9CiAgICAgICAgICBlbGVtZW50cy5pbmZvTWVudVBhbmVsLmhpZGRlbiA9IGZhbHNlOwogICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7CiAgICAgICAgICAgIGVsZW1lbnRzLmluZm9NZW51UGFuZWw/LmNsYXNzTGlzdC5hZGQoImlzLW9wZW4iKTsKICAgICAgICAgIH0pOwogICAgICAgICAgZWxlbWVudHMuaW5mb01lbnVUcmlnZ2VyLnNldEF0dHJpYnV0ZSgiYXJpYS1leHBhbmRlZCIsICJ0cnVlIik7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBjbG9z",
    "ZUluZm9NZW51KCkgewogICAgICAgICAgaWYgKCFlbGVtZW50cy5pbmZvTWVudVBhbmVsIHx8ICFlbGVtZW50cy5pbmZvTWVudVRyaWdnZXIpIHsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQogICAgICAgICAgZWxlbWVudHMuaW5mb01lbnVQYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCJpcy1vcGVuIik7CiAgICAgICAgICBlbGVtZW50cy5pbmZvTWVudVRyaWdnZXIuc2V0QXR0cmlidXRlKCJhcmlhLWV4cGFuZGVkIiwgImZhbHNlIik7CiAgICAgICAgICBpZiAoc3RhdGUuaW5mb01lbnVDbG9zZVRpbWVySWQgIT09IG51bGwpIHsKICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChzdGF0ZS5pbmZvTWVudUNsb3NlVGltZXJJZCk7CiAgICAgICAgICB9CiAgICAgICAgICBzdGF0ZS5pbmZvTWVudUNsb3NlVGltZXJJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHsKICAgICAgICAgICAgaWYgKCFlbGVtZW50cy5pbmZvTWVudVBhbmVsPy5jbGFzc0xpc3QuY29udGFpbnMoImlzLW9wZW4iKSkgewogICAgICAgICAgICAgIGVsZW1lbnRzLmluZm9NZW51UGFuZWwuaGlkZGVuID0gdHJ1ZTsKICAgICAgICAgICAgfQogICAgICAgICAgICBzdGF0ZS5pbmZvTWVudUNsb3NlVGltZXJJZCA9IG51bGw7CiAgICAgICAgICB9LCAyNDApOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gaW5pdGlhbGl6ZU5hdmlnYXRpb24oKSB7CiAgICAgICAgICBlbGVtZW50cy5uYXZCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4gewogICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCAoKSA9PiBzd2l0Y2hTY3JlZW4oYnV0dG9uLmRhdGFzZXQuc2NyZWVuIHx8ICJob21lIikpOwogICAgICAgICAgfSk7CiAgICAgICAgICBlbGVtZW50cy5ob21lTGlua3MuZm9y",
    "RWFjaCgoYnV0dG9uKSA9PiB7CiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsICgpID0+IHN3aXRjaFNjcmVlbihidXR0b24uZGF0YXNldC5ob21lTGluayB8fCAiaG9tZSIpKTsKICAgICAgICAgIH0pOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gaW5pdGlhbGl6ZU1hbmFnZXJNZW1iZXJzKCkgewogICAgICAgICAgZWxlbWVudHMubWFuYWdlck1lbWJlcnNSZWZyZXNoQnRuPy5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsICgpID0+IHsKICAgICAgICAgICAgdm9pZCBsb2FkTWFuYWdlck1lbWJlcnMoKTsKICAgICAgICAgIH0pOwogICAgICAgICAgZWxlbWVudHMubWFuYWdlck1lbWJlclNlYXJjaElucHV0Py5hZGRFdmVudExpc3RlbmVyKCJpbnB1dCIsIHJlbmRlck1hbmFnZXJNZW1iZXJzKTsKICAgICAgICAgIGVsZW1lbnRzLm1hbmFnZXJNZW1iZXJzTGlzdD8uYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCAoZXZlbnQpID0+IHsKICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudAogICAgICAgICAgICAgID8gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoIltkYXRhLW1hbmFnZXItbWVtYmVyLXNhdmVdLCBbZGF0YS1tYW5hZ2VyLW1lbWJlci1sb2dvdXRdLCBbZGF0YS1tYW5hZ2VyLW1lbWJlci1kZWxldGVdLCBbZGF0YS1tYW5hZ2VyLW1lbWJlci1kZXRhaWwtdG9nZ2xlXSIpCiAgICAgICAgICAgICAgOiBudWxsOwogICAgICAgICAgICBpZiAoIXRhcmdldCkgewogICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgfQogICAgICAgICAgICBjb25zdCBjYXJkID0gdGFyZ2V0LmNsb3Nlc3QoIltkYXRhLW1hbmFnZXItbWVtYmVyLWlkXSIpOwogICAgICAgICAgICBpZiAoIWNhcmQpIHsKICAg",
    "ICAgICAgICAgICByZXR1cm47CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKHRhcmdldC5tYXRjaGVzKCJbZGF0YS1tYW5hZ2VyLW1lbWJlci1kZXRhaWwtdG9nZ2xlXSIpKSB7CiAgICAgICAgICAgICAgdG9nZ2xlTWFuYWdlck1lbWJlckRldGFpbChjYXJkKTsKICAgICAgICAgICAgICByZXR1cm47CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKHRhcmdldC5tYXRjaGVzKCJbZGF0YS1tYW5hZ2VyLW1lbWJlci1sb2dvdXRdIikpIHsKICAgICAgICAgICAgICByZXF1ZXN0TWFuYWdlck1lbWJlckFjdGlvbigibG9nb3V0IiwgY2FyZC5kYXRhc2V0Lm1hbmFnZXJNZW1iZXJJZCB8fCAiIik7CiAgICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmICh0YXJnZXQubWF0Y2hlcygiW2RhdGEtbWFuYWdlci1tZW1iZXItZGVsZXRlXSIpKSB7CiAgICAgICAgICAgICAgcmVxdWVzdE1hbmFnZXJNZW1iZXJBY3Rpb24oImRlbGV0ZSIsIGNhcmQuZGF0YXNldC5tYW5hZ2VyTWVtYmVySWQgfHwgIiIpOwogICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgfQogICAgICAgICAgICB2b2lkIHNhdmVNYW5hZ2VyTWVtYmVyQWNjZXNzKGNhcmQuZGF0YXNldC5tYW5hZ2VyTWVtYmVySWQgfHwgIiIpOwogICAgICAgICAgfSk7CiAgICAgICAgICBlbGVtZW50cy5tYW5hZ2VyTWVtYmVyc0xpc3Q/LmFkZEV2ZW50TGlzdGVuZXIoImNoYW5nZSIsIChldmVudCkgPT4gewogICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgaW5zdGFuY2VvZiBFbGVtZW50ID8gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoIltkYXRhLW1hbmFnZXItbWVtYmVyLXJvbGVdIikgOiBudWxsOwogICAgICAgICAgICBpZiAoIXRhcmdldCkgewogICAgICAgICAgICAg",
    "IHJldHVybjsKICAgICAgICAgICAgfQogICAgICAgICAgICBzeW5jTWFuYWdlck1lbWJlclJldmlld0NvaW5GaWVsZCh0YXJnZXQuY2xvc2VzdCgiW2RhdGEtbWFuYWdlci1tZW1iZXItaWRdIikpOwogICAgICAgICAgfSk7CiAgICAgICAgICBlbGVtZW50cy5tYW5hZ2VyTWVtYmVyRGlhbG9nQnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHsKICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIiwgKCkgPT4gewogICAgICAgICAgICAgIGhhbmRsZU1hbmFnZXJNZW1iZXJBY3Rpb25EaWFsb2coYnV0dG9uLmRhdGFzZXQubWFuYWdlck1lbWJlckRpYWxvZ0FjdGlvbik7CiAgICAgICAgICAgIH0pOwogICAgICAgICAgfSk7CiAgICAgICAgICBlbGVtZW50cy5tYW5hZ2VyTWVtYmVyQWN0aW9uRGlhbG9nPy5hZGRFdmVudExpc3RlbmVyKCJjYW5jZWwiLCAoKSA9PiB7CiAgICAgICAgICAgIHN0YXRlLnBlbmRpbmdNYW5hZ2VyTWVtYmVyQWN0aW9uID0gbnVsbDsKICAgICAgICAgIH0pOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gaW5pdGlhbGl6ZVN0b3JlU2V0dGluZ3MoKSB7CiAgICAgICAgICBlbGVtZW50cy5hZGRBdmF0ZXJJdGVtQnRuPy5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIGFkZE1hbmFnZXJBdmF0ZXJJdGVtKTsKICAgICAgICAgIGVsZW1lbnRzLmF2YXRlckl0ZW1JbWFnZURyb3B6b25lPy5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsICgpID0+IHsKICAgICAgICAgICAgZWxlbWVudHMuYXZhdGVySXRlbUltYWdlSW5wdXQ/LmNsaWNrKCk7CiAgICAgICAgICB9KTsKICAgICAgICAgIGVsZW1lbnRzLmF2YXRlckl0ZW1JbWFnZURyb3B6b25lPy5hZGRFdmVudExpc3RlbmVyKCJrZXlkb3duIiwgKGV2ZW50KSA9PiB7CiAgICAgICAgICAgIGlm",
    "IChldmVudC5rZXkgPT09ICJFbnRlciIgfHwgZXZlbnQua2V5ID09PSAiICIpIHsKICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOwogICAgICAgICAgICAgIGVsZW1lbnRzLmF2YXRlckl0ZW1JbWFnZUlucHV0Py5jbGljaygpOwogICAgICAgICAgICB9CiAgICAgICAgICB9KTsKICAgICAgICAgIGVsZW1lbnRzLmF2YXRlckl0ZW1JbWFnZUlucHV0Py5hZGRFdmVudExpc3RlbmVyKCJjaGFuZ2UiLCBhc3luYyAoKSA9PiB7CiAgICAgICAgICAgIGF3YWl0IHN5bmNBdmF0ZXJJdGVtSW1hZ2VGcm9tRmlsZShlbGVtZW50cy5hdmF0ZXJJdGVtSW1hZ2VJbnB1dD8uZmlsZXM/LlswXSB8fCBudWxsKTsKICAgICAgICAgIH0pOwogICAgICAgICAgZWxlbWVudHMuYWRqdXN0QXZhdGVySXRlbUltYWdlQnRuPy5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIG9wZW5BdmF0ZXJJdGVtSW1hZ2VBZGp1c3REaWFsb2cpOwogICAgICAgICAgZWxlbWVudHMuY2xlYXJBdmF0ZXJJdGVtSW1hZ2VCdG4/LmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIiwgY2xlYXJBdmF0ZXJJdGVtSW1hZ2UpOwogICAgICAgICAgWwogICAgICAgICAgICBlbGVtZW50cy5hdmF0ZXJJdGVtSW1hZ2VTY2FsZUlucHV0LAogICAgICAgICAgICBlbGVtZW50cy5hdmF0ZXJJdGVtSW1hZ2VTY2FsZVhJbnB1dCwKICAgICAgICAgICAgZWxlbWVudHMuYXZhdGVySXRlbUltYWdlU2NhbGVZSW5wdXQsCiAgICAgICAgICAgIGVsZW1lbnRzLmF2YXRlckl0ZW1JbWFnZU9mZnNldFhJbnB1dCwKICAgICAgICAgICAgZWxlbWVudHMuYXZhdGVySXRlbUltYWdlT2Zmc2V0WUlucHV0LAogICAgICAgICAgICBlbGVtZW50cy5hdmF0ZXJJdGVtSW1hZ2VSb3RhdGVJbnB1dCwKICAgICAgICAgIF0uZm9yRWFjaCgoaW5wdXQpID0+IHsK",
    "ICAgICAgICAgICAgaW5wdXQ/LmFkZEV2ZW50TGlzdGVuZXIoImlucHV0IiwgdXBkYXRlQXZhdGVySXRlbUltYWdlQWRqdXN0bWVudFByZXZpZXcpOwogICAgICAgICAgfSk7CiAgICAgICAgICBlbGVtZW50cy5hdmF0ZXJJdGVtSW1hZ2VBZGp1c3RCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4gewogICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCAoKSA9PiB7CiAgICAgICAgICAgICAgY29uc3QgYWN0aW9uID0gYnV0dG9uLmRhdGFzZXQuYXZhdGVySW1hZ2VBZGp1c3RBY3Rpb24gfHwgIiI7CiAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PT0gImFwcGx5IikgewogICAgICAgICAgICAgICAgdm9pZCBhcHBseUF2YXRlckl0ZW1JbWFnZUFkanVzdG1lbnQoKTsKICAgICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgY2xvc2VEaWFsb2coZWxlbWVudHMuYXZhdGVySXRlbUltYWdlQWRqdXN0RGlhbG9nKTsKICAgICAgICAgICAgfSk7CiAgICAgICAgICB9KTsKICAgICAgICAgIFsiZHJhZ2VudGVyIiwgImRyYWdvdmVyIl0uZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7CiAgICAgICAgICAgIGVsZW1lbnRzLmF2YXRlckl0ZW1JbWFnZURyb3B6b25lPy5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgKGV2ZW50KSA9PiB7CiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsKICAgICAgICAgICAgICBlbGVtZW50cy5hdmF0ZXJJdGVtSW1hZ2VEcm9wem9uZT8uY2xhc3NMaXN0LmFkZCgiaXMtZHJhZ292ZXIiKTsKICAgICAgICAgICAgICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyKSB7CiAgICAgICAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICJjb3B5IjsKICAgICAgICAgICAg",
    "ICB9CiAgICAgICAgICAgIH0pOwogICAgICAgICAgfSk7CiAgICAgICAgICBbImRyYWdsZWF2ZSIsICJkcmFnZW5kIl0uZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7CiAgICAgICAgICAgIGVsZW1lbnRzLmF2YXRlckl0ZW1JbWFnZURyb3B6b25lPy5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgKCkgPT4gewogICAgICAgICAgICAgIGVsZW1lbnRzLmF2YXRlckl0ZW1JbWFnZURyb3B6b25lPy5jbGFzc0xpc3QucmVtb3ZlKCJpcy1kcmFnb3ZlciIpOwogICAgICAgICAgICB9KTsKICAgICAgICAgIH0pOwogICAgICAgICAgZWxlbWVudHMuYXZhdGVySXRlbUltYWdlRHJvcHpvbmU/LmFkZEV2ZW50TGlzdGVuZXIoImRyb3AiLCBhc3luYyAoZXZlbnQpID0+IHsKICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsKICAgICAgICAgICAgZWxlbWVudHMuYXZhdGVySXRlbUltYWdlRHJvcHpvbmU/LmNsYXNzTGlzdC5yZW1vdmUoImlzLWRyYWdvdmVyIik7CiAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBBcnJheS5mcm9tKGV2ZW50LmRhdGFUcmFuc2Zlcj8uZmlsZXMgfHwgW10pLmZpbmQoKGl0ZW0pID0+IGl0ZW0udHlwZS5zdGFydHNXaXRoKCJpbWFnZS8iKSkgfHwgbnVsbDsKICAgICAgICAgICAgYXdhaXQgc3luY0F2YXRlckl0ZW1JbWFnZUZyb21GaWxlKGZpbGUpOwogICAgICAgICAgfSk7CiAgICAgICAgICBlbGVtZW50cy5tYW5hZ2VyQXZhdGVySXRlbUxpc3Q/LmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIiwgKGV2ZW50KSA9PiB7CiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBpbnN0YW5jZW9mIEVsZW1lbnQgPyBldmVudC50YXJnZXQgOiBudWxsOwogICAgICAgICAgICBjb25zdCBkZWxldGVCdXR0b24gPSB0YXJnZXQ/LmNsb3Nlc3QoIltkYXRh",
    "LW1hbmFnZXItYXZhdGVyLWRlbGV0ZV0iKTsKICAgICAgICAgICAgaWYgKGRlbGV0ZUJ1dHRvbikgewogICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOwogICAgICAgICAgICAgIGRlbGV0ZU1hbmFnZXJBdmF0ZXJJdGVtKGRlbGV0ZUJ1dHRvbi5kYXRhc2V0Lm1hbmFnZXJBdmF0ZXJEZWxldGUgfHwgIiIpOwogICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgfQogICAgICAgICAgICBjb25zdCBjYXRlZ29yeUJ1dHRvbiA9IHRhcmdldD8uY2xvc2VzdCgiW2RhdGEtbWFuYWdlci1hdmF0ZXItY2F0ZWdvcnldIik7CiAgICAgICAgICAgIGlmIChjYXRlZ29yeUJ1dHRvbikgewogICAgICAgICAgICAgIHN0YXRlLmFjdGl2ZUF2YXRlckNhdGVnb3J5ID0gbm9ybWFsaXplTWFuYWdlckF2YXRlckNhdGVnb3J5KGNhdGVnb3J5QnV0dG9uLmRhdGFzZXQubWFuYWdlckF2YXRlckNhdGVnb3J5KTsKICAgICAgICAgICAgICBzdGF0ZS5hY3RpdmVTdG9yZUl0ZW1JZCA9ICIiOwogICAgICAgICAgICAgIHJlbmRlck1hbmFnZXJBdmF0ZXJJdGVtcygpOwogICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgfQogICAgICAgICAgICBjb25zdCBpdGVtQ2FyZCA9IHRhcmdldD8uY2xvc2VzdCgiW2RhdGEtbWFuYWdlci1hdmF0ZXItaXRlbV0iKTsKICAgICAgICAgICAgaWYgKCFpdGVtQ2FyZCkgewogICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgfQogICAgICAgICAgICBjb25zdCBpdGVtSWQgPSBpdGVtQ2FyZC5kYXRhc2V0Lm1hbmFnZXJBdmF0ZXJJdGVtIHx8ICIiOwogICAgICAgICAgICBzdGF0ZS5hY3RpdmVTdG9yZUl0ZW1JZCA9IHN0YXRlLmFjdGl2ZVN0b3JlSXRlbUlkID09PSBpdGVtSWQgPyAiIiA6IGl0ZW1JZDsKICAgICAgICAgICAgcmVuZGVy",
    "TWFuYWdlckF2YXRlckl0ZW1zKCk7CiAgICAgICAgICB9KTsKICAgICAgICAgIGVsZW1lbnRzLm1hbmFnZXJBdmF0ZXJJdGVtTGlzdD8uYWRkRXZlbnRMaXN0ZW5lcigia2V5ZG93biIsIChldmVudCkgPT4gewogICAgICAgICAgICBpZiAoZXZlbnQua2V5ICE9PSAiRW50ZXIiICYmIGV2ZW50LmtleSAhPT0gIiAiKSB7CiAgICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGNvbnN0IGl0ZW1DYXJkID0gZXZlbnQudGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudCA/IGV2ZW50LnRhcmdldC5jbG9zZXN0KCJbZGF0YS1tYW5hZ2VyLWF2YXRlci1pdGVtXSIpIDogbnVsbDsKICAgICAgICAgICAgaWYgKCFpdGVtQ2FyZCkgewogICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgfQogICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOwogICAgICAgICAgICBjb25zdCBpdGVtSWQgPSBpdGVtQ2FyZC5kYXRhc2V0Lm1hbmFnZXJBdmF0ZXJJdGVtIHx8ICIiOwogICAgICAgICAgICBzdGF0ZS5hY3RpdmVTdG9yZUl0ZW1JZCA9IHN0YXRlLmFjdGl2ZVN0b3JlSXRlbUlkID09PSBpdGVtSWQgPyAiIiA6IGl0ZW1JZDsKICAgICAgICAgICAgcmVuZGVyTWFuYWdlckF2YXRlckl0ZW1zKCk7CiAgICAgICAgICB9KTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGluaXRpYWxpemVTdG9yZVRhYnMoKSB7CiAgICAgICAgICBlbGVtZW50cy5zdG9yZVRhYkJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7CiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsICgpID0+IHsKICAgICAgICAgICAgICBzZXRNYW5hZ2VyU3RvcmVUYWIoYnV0dG9uLmRhdGFzZXQuc3RvcmVUYWIgfHwgImNyZWF0ZSIpOwogICAgICAgICAgICB9KTsK",
    "ICAgICAgICAgIH0pOwogICAgICAgICAgc2V0TWFuYWdlclN0b3JlVGFiKHN0YXRlLmFjdGl2ZVN0b3JlVGFiKTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHNldE1hbmFnZXJTdG9yZVRhYih0YWJOYW1lKSB7CiAgICAgICAgICBjb25zdCBub3JtYWxpemVkVGFiID0gdGFiTmFtZSA9PT0gIm1hbmFnZSIgPyAibWFuYWdlIiA6ICJjcmVhdGUiOwogICAgICAgICAgc3RhdGUuYWN0aXZlU3RvcmVUYWIgPSBub3JtYWxpemVkVGFiOwogICAgICAgICAgZWxlbWVudHMuc3RvcmVUYWJCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4gewogICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGJ1dHRvbi5kYXRhc2V0LnN0b3JlVGFiID09PSBub3JtYWxpemVkVGFiOwogICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgiaXMtYWN0aXZlIiwgaXNBY3RpdmUpOwogICAgICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKCJhcmlhLXNlbGVjdGVkIiwgU3RyaW5nKGlzQWN0aXZlKSk7CiAgICAgICAgICB9KTsKICAgICAgICAgIGVsZW1lbnRzLnN0b3JlVGFiUGFuZWxzLmZvckVhY2goKHBhbmVsKSA9PiB7CiAgICAgICAgICAgIHBhbmVsLmhpZGRlbiA9IHBhbmVsLmRhdGFzZXQuc3RvcmVUYWJQYW5lbCAhPT0gbm9ybWFsaXplZFRhYjsKICAgICAgICAgIH0pOwogICAgICAgICAgaWYgKG5vcm1hbGl6ZWRUYWIgPT09ICJtYW5hZ2UiKSB7CiAgICAgICAgICAgIHJlbmRlck1hbmFnZXJBdmF0ZXJJdGVtcygpOwogICAgICAgICAgfQogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gbm9ybWFsaXplTWFuYWdlclJvbGVWYWx1ZSh2YWx1ZSkgewogICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gInN0cmluZyIpIHsKICAgICAgICAgICAgcmV0dXJuICIiOwogICAgICAgICAgfQog",
    "ICAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IHZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1tccy1dL2csICJfIik7CiAgICAgICAgICBjb25zdCBjb21wYWN0ID0gbm9ybWFsaXplZC5yZXBsYWNlKC9fL2csICIiKTsKICAgICAgICAgIHJldHVybiBNQU5BR0VSX1JPTEVfQUxJQVNFU1tub3JtYWxpemVkXSB8fCBNQU5BR0VSX1JPTEVfQUxJQVNFU1tjb21wYWN0XSB8fCAiIjsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGdldE1hbmFnZXJSb2xlRnJvbVZhbHVlKHZhbHVlKSB7CiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHsKICAgICAgICAgICAgcmV0dXJuIHZhbHVlLm1hcChnZXRNYW5hZ2VyUm9sZUZyb21WYWx1ZSkuZmluZChCb29sZWFuKSB8fCAiIjsKICAgICAgICAgIH0KICAgICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICJvYmplY3QiKSB7CiAgICAgICAgICAgIGNvbnN0IGRpcmVjdFJvbGUgPSBbCiAgICAgICAgICAgICAgdmFsdWUucm9sZSwKICAgICAgICAgICAgICB2YWx1ZS5tYW5hZ2VyUm9sZSwKICAgICAgICAgICAgICB2YWx1ZS5tYW5hZ2VyX3JvbGUsCiAgICAgICAgICAgICAgdmFsdWUucm9sZU5hbWUsCiAgICAgICAgICAgICAgdmFsdWUucm9sZV9uYW1lLAogICAgICAgICAgICAgIHZhbHVlLnJvbGVzLAogICAgICAgICAgICAgIHZhbHVlLm1hbmFnZXJSb2xlcywKICAgICAgICAgICAgICB2YWx1ZS5tYW5hZ2VyX3JvbGVzLAogICAgICAgICAgICBdCiAgICAgICAgICAgICAgLm1hcChnZXRNYW5hZ2VyUm9sZUZyb21WYWx1ZSkKICAgICAgICAgICAgICAuZmluZChCb29sZWFuKTsKICAgICAgICAgICAgaWYgKGRpcmVjdFJvbGUpIHsKICAgICAgICAgICAgICByZXR1cm4gZGlyZWN0Um9sZTsKICAg",
    "ICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gTUFOQUdFUl9ST0xFX0lEUy5maW5kKChyb2xlKSA9PiB2YWx1ZVtyb2xlXSA9PT0gdHJ1ZSB8fCB2YWx1ZVtyb2xlXSA9PT0gInRydWUiKSB8fCAiIjsKICAgICAgICAgIH0KICAgICAgICAgIHJldHVybiBub3JtYWxpemVNYW5hZ2VyUm9sZVZhbHVlKHZhbHVlKTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGdldE1hbmFnZXJBY2Nlc3NNZW1iZXIoYWNjZXNzKSB7CiAgICAgICAgICBpZiAoIWFjY2VzcyB8fCB0eXBlb2YgYWNjZXNzICE9PSAib2JqZWN0IiB8fCBBcnJheS5pc0FycmF5KGFjY2VzcykpIHsKICAgICAgICAgICAgcmV0dXJuIG51bGw7CiAgICAgICAgICB9CiAgICAgICAgICBjb25zdCBjYW5kaWRhdGVzID0gWwogICAgICAgICAgICBhY2Nlc3MubWVtYmVyLAogICAgICAgICAgICBhY2Nlc3MubWFuYWdlck1lbWJlciwKICAgICAgICAgICAgYWNjZXNzLm1hbmFnZXJfbWVtYmVyLAogICAgICAgICAgICBhY2Nlc3MucHJvZmlsZSwKICAgICAgICAgICAgYWNjZXNzLnVzZXIsCiAgICAgICAgICBdOwogICAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZXMuZmluZCgoY2FuZGlkYXRlKSA9PiBjYW5kaWRhdGUgJiYgdHlwZW9mIGNhbmRpZGF0ZSA9PT0gIm9iamVjdCIgJiYgIUFycmF5LmlzQXJyYXkoY2FuZGlkYXRlKSkgfHwgbnVsbDsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGdldE1hbmFnZXJBY2Nlc3NSb2xlKGFjY2VzcykgewogICAgICAgICAgY29uc3QgbWVtYmVyID0gZ2V0TWFuYWdlckFjY2Vzc01lbWJlcihhY2Nlc3MpOwogICAgICAgICAgY29uc3QgY2FuZGlkYXRlcyA9IFsKICAgICAgICAgICAgYWNjZXNzPy5yb2xlLAogICAgICAgICAgICBhY2Nlc3M/Lm1hbmFnZXJSb2xlLAogICAgICAgICAgICBh",
    "Y2Nlc3M/Lm1hbmFnZXJfcm9sZSwKICAgICAgICAgICAgYWNjZXNzPy5yb2xlTmFtZSwKICAgICAgICAgICAgYWNjZXNzPy5yb2xlX25hbWUsCiAgICAgICAgICAgIGFjY2Vzcz8ucm9sZXMsCiAgICAgICAgICAgIGFjY2Vzcz8ubWFuYWdlclJvbGVzLAogICAgICAgICAgICBhY2Nlc3M/Lm1hbmFnZXJfcm9sZXMsCiAgICAgICAgICAgIGFjY2Vzcz8uc3RhdHVzLAogICAgICAgICAgICBhY2Nlc3M/LmFwcF9tZXRhZGF0YSwKICAgICAgICAgICAgYWNjZXNzPy5wZXJtaXNzaW9ucz8ucm9sZSwKICAgICAgICAgICAgYWNjZXNzPy5wZXJtaXNzaW9ucz8ubWFuYWdlclJvbGUsCiAgICAgICAgICAgIGFjY2Vzcz8ucGVybWlzc2lvbnMsCiAgICAgICAgICAgIG1lbWJlcj8ucm9sZSwKICAgICAgICAgICAgbWVtYmVyPy5tYW5hZ2VyUm9sZSwKICAgICAgICAgICAgbWVtYmVyPy5tYW5hZ2VyX3JvbGUsCiAgICAgICAgICAgIG1lbWJlcj8ucm9sZU5hbWUsCiAgICAgICAgICAgIG1lbWJlcj8ucm9sZV9uYW1lLAogICAgICAgICAgICBtZW1iZXI/LnJvbGVzLAogICAgICAgICAgICBtZW1iZXI/Lm1hbmFnZXJSb2xlcywKICAgICAgICAgICAgbWVtYmVyPy5tYW5hZ2VyX3JvbGVzLAogICAgICAgICAgICBtZW1iZXI/LmFwcF9tZXRhZGF0YSwKICAgICAgICAgICAgbWVtYmVyPy5wZXJtaXNzaW9ucz8ucm9sZSwKICAgICAgICAgICAgbWVtYmVyPy5wZXJtaXNzaW9ucywKICAgICAgICAgIF07CiAgICAgICAgICByZXR1cm4gY2FuZGlkYXRlcy5tYXAoZ2V0TWFuYWdlclJvbGVGcm9tVmFsdWUpLmZpbmQoQm9vbGVhbikgfHwgIiI7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBub3JtYWxpemVNYW5hZ2VyQWNjZXNzUGF5bG9hZChhY2Nlc3MpIHsKICAgICAgICAgIGlmICghYWNjZXNzIHx8IHR5",
    "cGVvZiBhY2Nlc3MgIT09ICJvYmplY3QiIHx8IEFycmF5LmlzQXJyYXkoYWNjZXNzKSkgewogICAgICAgICAgICByZXR1cm4gbnVsbDsKICAgICAgICAgIH0KICAgICAgICAgIGNvbnN0IHJvbGUgPSBnZXRNYW5hZ2VyQWNjZXNzUm9sZShhY2Nlc3MpOwogICAgICAgICAgY29uc3QgbWVtYmVyID0gZ2V0TWFuYWdlckFjY2Vzc01lbWJlcihhY2Nlc3MpOwogICAgICAgICAgY29uc3Qgbm9ybWFsaXplZE1lbWJlciA9IG1lbWJlciB8fCByb2xlID8geyAuLi4obWVtYmVyIHx8IHt9KSwgcm9sZTogcm9sZSB8fCBtZW1iZXI/LnJvbGUgfHwgIiIgfSA6IG51bGw7CiAgICAgICAgICByZXR1cm4gewogICAgICAgICAgICAuLi5hY2Nlc3MsCiAgICAgICAgICAgIGNhbkFjY2VzczogYWNjZXNzLmNhbkFjY2VzcyA9PT0gZmFsc2UgPyBmYWxzZSA6IEJvb2xlYW4ocm9sZSksCiAgICAgICAgICAgIHN0YXR1czogYWNjZXNzLnN0YXR1cyB8fCAocm9sZSA/ICJtZW1iZXIiIDogInVzZXIiKSwKICAgICAgICAgICAgcm9sZSwKICAgICAgICAgICAgLi4uKG5vcm1hbGl6ZWRNZW1iZXIgPyB7IG1lbWJlcjogbm9ybWFsaXplZE1lbWJlciB9IDoge30pLAogICAgICAgICAgfTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGdldFNlZWRlZE1hbmFnZXJBY2Nlc3MoKSB7CiAgICAgICAgICByZXR1cm4gbm9ybWFsaXplTWFuYWdlckFjY2Vzc1BheWxvYWQod2luZG93Ll9fVEhFX1JFVklFV19NQU5BR0VSX0FDQ0VTU19fKTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGFwcGx5TWFuYWdlckFjY2VzcyhhY2Nlc3MpIHsKICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRBY2Nlc3MgPSBub3JtYWxpemVNYW5hZ2VyQWNjZXNzUGF5bG9hZChhY2Nlc3MpOwogICAgICAgICAgaWYgKCFub3JtYWxpemVkQWNj",
    "ZXNzIHx8ICFnZXRNYW5hZ2VyQWNjZXNzUm9sZShub3JtYWxpemVkQWNjZXNzKSkgewogICAgICAgICAgICByZXR1cm4gZmFsc2U7CiAgICAgICAgICB9CiAgICAgICAgICBzdGF0ZS5tYW5hZ2VyQWNjZXNzID0gbm9ybWFsaXplZEFjY2VzczsKICAgICAgICAgIGFwcGx5TWFuYWdlclByb2ZpbGVGcm9tQWNjZXNzKG5vcm1hbGl6ZWRBY2Nlc3MpOwogICAgICAgICAgcmVuZGVyTWFuYWdlckFjY2VzcygpOwogICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgfQoKICAgICAgICBhc3luYyBmdW5jdGlvbiBpbml0aWFsaXplTWFuYWdlckFjY2VzcygpIHsKICAgICAgICAgIGNvbnN0IHNlZWRlZEFjY2VzcyA9IGdldFNlZWRlZE1hbmFnZXJBY2Nlc3MoKTsKICAgICAgICAgIGlmIChzZWVkZWRBY2Nlc3MpIHsKICAgICAgICAgICAgYXBwbHlNYW5hZ2VyQWNjZXNzKHNlZWRlZEFjY2Vzcyk7CiAgICAgICAgICB9CgogICAgICAgICAgbGV0IHRva2VuID0gbnVsbDsKICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgIHRva2VuID0gYXdhaXQgZ2V0QXV0aDBBY2Nlc3NUb2tlbigpOwogICAgICAgICAgfSBjYXRjaCB7CiAgICAgICAgICAgIHRva2VuID0gbnVsbDsKICAgICAgICAgIH0KICAgICAgICAgIGlmICghdG9rZW4pIHsKICAgICAgICAgICAgaWYgKHNlZWRlZEFjY2VzcykgewogICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgfQogICAgICAgICAgICBzdGF0ZS5tYW5hZ2VyQWNjZXNzID0gewogICAgICAgICAgICAgIGNhbkFjY2VzczogZmFsc2UsCiAgICAgICAgICAgICAgc3RhdHVzOiAibG9jYWwiLAogICAgICAgICAgICAgIHJvbGU6IG51bGwsCiAgICAgICAgICAgIH07CiAgICAgICAgICAgIHJlbmRlck1hbmFnZXJBY2Nlc3MoKTsKICAgICAgICAgICAgcmV0dXJuOwog",
    "ICAgICAgICAgfQoKICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7cmVzb2x2ZUFwaUJhc2UoKX0vbWFuYWdlci9tZWAsIHsKICAgICAgICAgICAgICBoZWFkZXJzOiB7CiAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCwKICAgICAgICAgICAgICAgIEFjY2VwdDogImFwcGxpY2F0aW9uL2pzb24iLAogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgIH0pOwogICAgICAgICAgICBjb25zdCBqc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+IG51bGwpOwogICAgICAgICAgICBzdGF0ZS5tYW5hZ2VyQWNjZXNzID0KICAgICAgICAgICAgICBub3JtYWxpemVNYW5hZ2VyQWNjZXNzUGF5bG9hZChyZXNwb25zZS5vayA/IGpzb24gOiBudWxsKSB8fAogICAgICAgICAgICAgIHNlZWRlZEFjY2VzcyB8fAogICAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgIGNhbkFjY2VzczogZmFsc2UsCiAgICAgICAgICAgICAgICBzdGF0dXM6ICJlcnJvciIsCiAgICAgICAgICAgICAgICByb2xlOiBudWxsLAogICAgICAgICAgICAgIH07CiAgICAgICAgICB9IGNhdGNoIHsKICAgICAgICAgICAgc3RhdGUubWFuYWdlckFjY2VzcyA9IHNlZWRlZEFjY2VzcyB8fCB7CiAgICAgICAgICAgICAgY2FuQWNjZXNzOiBmYWxzZSwKICAgICAgICAgICAgICBzdGF0dXM6ICJvZmZsaW5lIiwKICAgICAgICAgICAgICByb2xlOiBudWxsLAogICAgICAgICAgICB9OwogICAgICAgICAgfQogICAgICAgICAgYXBwbHlNYW5hZ2VyUHJvZmlsZUZyb21BY2Nlc3Moc3RhdGUubWFuYWdlckFjY2Vzcyk7CiAgICAgICAgICBhd2FpdCBsb2FkUmV2aWV3RGF0YVNuYXBzaG90RnJvbUFwaSh0b2tlbik7CiAgICAg",
    "ICAgICByZW5kZXJNYW5hZ2VyQWNjZXNzKCk7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiByZW5kZXJNYW5hZ2VyQWNjZXNzKCkgewogICAgICAgICAgY29uc3QgYWNjZXNzID0gc3RhdGUubWFuYWdlckFjY2VzczsKICAgICAgICAgIGNvbnN0IHJvbGUgPSBnZXRNYW5hZ2VyQWNjZXNzUm9sZShhY2Nlc3MpOwogICAgICAgICAgaWYgKGVsZW1lbnRzLnByb2ZpbGVSb2xlVmFsdWUpIHsKICAgICAgICAgICAgZWxlbWVudHMucHJvZmlsZVJvbGVWYWx1ZS50ZXh0Q29udGVudCA9ICFhY2Nlc3MKICAgICAgICAgICAgICA/ICLnorroqo3kuK0iCiAgICAgICAgICAgICAgOiByb2xlCiAgICAgICAgICAgICAgICA/IE1BTkFHRVJfUk9MRV9MQUJFTFNbcm9sZV0gfHwgcm9sZQogICAgICAgICAgICAgICAgOiBNQU5BR0VSX1JPTEVfTEFCRUxTLnVzZXI7CiAgICAgICAgICB9CgogICAgICAgICAgaWYgKGVsZW1lbnRzLm1hbmFnZXJNZW1iZXJzUGFuZWwpIHsKICAgICAgICAgICAgZWxlbWVudHMubWFuYWdlck1lbWJlcnNQYW5lbC5oaWRkZW4gPSByb2xlICE9PSAib3duZXIiIHx8IGFjY2Vzcz8uY2FuQWNjZXNzICE9PSB0cnVlOwogICAgICAgICAgfQogICAgICAgICAgaWYgKHJvbGUgPT09ICJvd25lciIgJiYgYWNjZXNzPy5jYW5BY2Nlc3MgPT09IHRydWUpIHsKICAgICAgICAgICAgdm9pZCBsb2FkTWFuYWdlck1lbWJlcnMoKTsKICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdGUuYWN0aXZlU2NyZWVuID09PSAibWVtYmVycyIpIHsKICAgICAgICAgICAgdm9pZCBsb2FkTWFuYWdlck1lbWJlcnMoKTsKICAgICAgICAgIH0KICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIiNzY3JlZW4taG9tZSAubWFuYWdlci1hY2Nlc3Mtbm90ZSIpPy5yZW1vdmUoKTsKCiAgICAgICAgICBj",
    "b25zdCBzaG91bGRSZXN0cmljdCA9ICFhY2Nlc3MgfHwgYWNjZXNzLmNhbkFjY2VzcyA9PT0gZmFsc2U7CiAgICAgICAgICBjb25zdCBhbGxvd2VkU2NyZWVucyA9IG5ldyBTZXQoWyJob21lIl0pOwogICAgICAgICAgZWxlbWVudHMubmF2QnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHsKICAgICAgICAgICAgYnV0dG9uLmRpc2FibGVkID0gc2hvdWxkUmVzdHJpY3QgJiYgIWFsbG93ZWRTY3JlZW5zLmhhcyhidXR0b24uZGF0YXNldC5zY3JlZW4gfHwgIiIpOwogICAgICAgICAgfSk7CiAgICAgICAgICBlbGVtZW50cy5ob21lTGlua3MuZm9yRWFjaCgoYnV0dG9uKSA9PiB7CiAgICAgICAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9IHNob3VsZFJlc3RyaWN0ICYmICFhbGxvd2VkU2NyZWVucy5oYXMoYnV0dG9uLmRhdGFzZXQuaG9tZUxpbmsgfHwgIiIpOwogICAgICAgICAgfSk7CgogICAgICAgICAgaWYgKCFhY2Nlc3MgfHwgIXNob3VsZFJlc3RyaWN0KSB7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KCiAgICAgICAgICBjb25zdCBwYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIiNzY3JlZW4taG9tZSAucGFuZWwiKTsKICAgICAgICAgIGlmIChwYW5lbCAmJiAhcGFuZWwucXVlcnlTZWxlY3RvcigiLm1hbmFnZXItYWNjZXNzLW5vdGUiKSkgewogICAgICAgICAgICBjb25zdCBub3RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgicCIpOwogICAgICAgICAgICBub3RlLmNsYXNzTmFtZSA9ICJoaW50LXRleHQgbWFuYWdlci1hY2Nlc3Mtbm90ZSI7CiAgICAgICAgICAgIG5vdGUudGV4dENvbnRlbnQgPQogICAgICAgICAgICAgICJUaGUgUmV2aWV3IE1hbmFnZXLjga/lvbnlibLjgYzku5jkuI7jgZXjgozjgovjgajliKnnlKjjgafjgY3jgb7jgZnjgILjgqrjg7zj",
    "g4rjg7zjgavmqKnpmZDjgYzku5jkuI7jgZXjgozjgabjgYTjgovjgYvnorroqo3jgZfjgabjgY/jgaDjgZXjgYTjgIIiOwogICAgICAgICAgICBwYW5lbC5hcHBlbmQobm90ZSk7CiAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBjYW5NYW5hZ2VNYW5hZ2VyTWVtYmVycygpIHsKICAgICAgICAgIHJldHVybiBzdGF0ZS5tYW5hZ2VyQWNjZXNzPy5jYW5BY2Nlc3MgPT09IHRydWUgJiYgZ2V0TWFuYWdlckFjY2Vzc1JvbGUoc3RhdGUubWFuYWdlckFjY2VzcykgPT09ICJvd25lciI7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBsb2FkU3RvcmVDb25maWcoKSB7CiAgICAgICAgICB0cnkgewogICAgICAgICAgICBjb25zdCByYXcgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkVfQ09ORklHX0tFWSk7CiAgICAgICAgICAgIHJldHVybiBub3JtYWxpemVTdG9yZUNvbmZpZyhyYXcgPyBKU09OLnBhcnNlKHJhdykgOiBudWxsKTsKICAgICAgICAgIH0gY2F0Y2ggewogICAgICAgICAgICByZXR1cm4gbm9ybWFsaXplU3RvcmVDb25maWcobnVsbCk7CiAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBub3JtYWxpemVTdG9yZUNvbmZpZyh2YWx1ZSkgewogICAgICAgICAgY29uc3QgYXZhdGFyU3RhdHVzID0gbm9ybWFsaXplU3RvcmVBdmF0YXJTdGF0dXModmFsdWU/LmF2YXRhclN0YXR1cyk7CiAgICAgICAgICBjb25zdCBhdmF0YXJNZXNzYWdlID0gdHlwZW9mIHZhbHVlPy5hdmF0YXJNZXNzYWdlID09PSAic3RyaW5nIiAmJiB2YWx1ZS5hdmF0YXJNZXNzYWdlLnRyaW0oKQogICAgICAgICAgICA/IHZhbHVlLmF2YXRhck1lc3NhZ2UudHJpbSgpCiAgICAgICAgICAgIDogYXZhdGFyU3RhdHVzID09PSAicHVibGlzaGVkIgogICAg",
    "ICAgICAgICAgID8gIuWFrOmWi+S4rSIKICAgICAgICAgICAgICA6IERFRkFVTFRfU1RPUkVfQ09ORklHLmF2YXRhck1lc3NhZ2U7CiAgICAgICAgICByZXR1cm4gewogICAgICAgICAgICBhdmF0YXJTdGF0dXMsCiAgICAgICAgICAgIGF2YXRhck1lc3NhZ2UsCiAgICAgICAgICB9OwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gbm9ybWFsaXplU3RvcmVBdmF0YXJTdGF0dXModmFsdWUpIHsKICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gInB1Ymxpc2hlZCIgPyAicHVibGlzaGVkIiA6ICJwcmVwYXJpbmciOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gcmVuZGVyU3RvcmVTZXR0aW5ncygpIHsKICAgICAgICAgIHJlbmRlck1hbmFnZXJBdmF0ZXJJdGVtcygpOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gcmVuZGVyU3RvcmVQcmV2aWV3RnJvbUZvcm0oKSB7CiAgICAgICAgICByZW5kZXJNYW5hZ2VyQXZhdGVySXRlbXMoKTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHJlbmRlclN0b3JlUHJldmlldyhjb25maWcgPSBsb2FkU3RvcmVDb25maWcoKSkgewogICAgICAgICAgcmVuZGVyTWFuYWdlckF2YXRlckl0ZW1zKCk7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBzYXZlU3RvcmVTZXR0aW5ncygpIHsKICAgICAgICAgIHJlbmRlck1hbmFnZXJBdmF0ZXJJdGVtcygpOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gbG9hZE1hbmFnZXJBdmF0ZXJJdGVtcygpIHsKICAgICAgICAgIHJldHVybiBsb2FkSnNvbihBVkFURVJfQ1VTVE9NX0lURU1TX0tFWSwgW10pOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gc2F2ZU1hbmFnZXJBdmF0ZXJJdGVtcyhpdGVtcykgewogICAgICAgICAgc2F2ZUpzb24oQVZBVEVSX0NVU1RPTV9JVEVNU19LRVksIGl0",
    "ZW1zKTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGFkZE1hbmFnZXJBdmF0ZXJJdGVtKCkgewogICAgICAgICAgY29uc3QgbmFtZSA9IFN0cmluZyhlbGVtZW50cy5hdmF0ZXJJdGVtTmFtZUlucHV0Py52YWx1ZSB8fCAiIikudHJpbSgpOwogICAgICAgICAgY29uc3QgY2F0ZWdvcnkgPSBub3JtYWxpemVNYW5hZ2VyQXZhdGVyQ2F0ZWdvcnkoZWxlbWVudHMuYXZhdGVySXRlbUNhdGVnb3J5U2VsZWN0Py52YWx1ZSk7CiAgICAgICAgICBjb25zdCBjb3N0ID0gTWF0aC5tYXgoMCwgTWF0aC5mbG9vcihOdW1iZXIoZWxlbWVudHMuYXZhdGVySXRlbUNvc3RJbnB1dD8udmFsdWUpIHx8IDApKTsKICAgICAgICAgIGNvbnN0IGltYWdlID0gc3RhdGUuYXZhdGVySXRlbUltYWdlRGF0YSA/IHsgLi4uc3RhdGUuYXZhdGVySXRlbUltYWdlRGF0YSB9IDogbnVsbDsKICAgICAgICAgIGlmICghbmFtZSkgewogICAgICAgICAgICBpZiAoZWxlbWVudHMuc3RvcmVDb25maWdGZWVkYmFjaykgewogICAgICAgICAgICAgIGVsZW1lbnRzLnN0b3JlQ29uZmlnRmVlZGJhY2sudGV4dENvbnRlbnQgPSAi44Ki44Kk44OG44Og5ZCN44KS5YWl5Yqb44GX44Gm44GP44Gg44GV44GE44CCIjsKICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CiAgICAgICAgICBjb25zdCBpdGVtcyA9IGxvYWRNYW5hZ2VyQXZhdGVySXRlbXMoKTsKICAgICAgICAgIGl0ZW1zLnB1c2goewogICAgICAgICAgICBpZDogYGN1c3RvbS0ke0RhdGUubm93KCkudG9TdHJpbmcoMzYpfWAsCiAgICAgICAgICAgIG5hbWUsCiAgICAgICAgICAgIGNhdGVnb3J5LAogICAgICAgICAgICBjb3N0LAogICAgICAgICAgICBpbWFnZSwKICAgICAgICAgIH0pOwogICAgICAgICAgc2F2ZU1hbmFnZXJBdmF0ZXJJ",
    "dGVtcyhpdGVtcyk7CiAgICAgICAgICBpZiAoZWxlbWVudHMuYXZhdGVySXRlbU5hbWVJbnB1dCkgewogICAgICAgICAgICBlbGVtZW50cy5hdmF0ZXJJdGVtTmFtZUlucHV0LnZhbHVlID0gIiI7CiAgICAgICAgICB9CiAgICAgICAgICBjbGVhckF2YXRlckl0ZW1JbWFnZSgpOwogICAgICAgICAgaWYgKGVsZW1lbnRzLnN0b3JlQ29uZmlnRmVlZGJhY2spIHsKICAgICAgICAgICAgZWxlbWVudHMuc3RvcmVDb25maWdGZWVkYmFjay50ZXh0Q29udGVudCA9ICJBdmF0ZXLjgqLjgqTjg4bjg6DjgpLov73liqDjgZfjgb7jgZfjgZ/jgIIiOwogICAgICAgICAgfQogICAgICAgICAgcmVuZGVyTWFuYWdlckF2YXRlckl0ZW1zKCk7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBkZWxldGVNYW5hZ2VyQXZhdGVySXRlbShpdGVtSWQpIHsKICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRJZCA9IFN0cmluZyhpdGVtSWQgfHwgIiIpLnRyaW0oKTsKICAgICAgICAgIGlmICghbm9ybWFsaXplZElkKSB7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KICAgICAgICAgIGNvbnN0IGl0ZW1zID0gbG9hZE1hbmFnZXJBdmF0ZXJJdGVtcygpOwogICAgICAgICAgY29uc3QgbmV4dEl0ZW1zID0gaXRlbXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmlkICE9PSBub3JtYWxpemVkSWQpOwogICAgICAgICAgaWYgKG5leHRJdGVtcy5sZW5ndGggPT09IGl0ZW1zLmxlbmd0aCkgewogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CiAgICAgICAgICBzYXZlTWFuYWdlckF2YXRlckl0ZW1zKG5leHRJdGVtcyk7CiAgICAgICAgICBzdGF0ZS5hY3RpdmVTdG9yZUl0ZW1JZCA9ICIiOwogICAgICAgICAgaWYgKGVsZW1lbnRzLnN0b3JlQ29uZmlnRmVlZGJhY2spIHsKICAgICAgICAgICAgZWxlbWVu",
    "dHMuc3RvcmVDb25maWdGZWVkYmFjay50ZXh0Q29udGVudCA9ICLjgqLjgqTjg4bjg6DjgpLliYrpmaTjgZfjgb7jgZfjgZ/jgIIiOwogICAgICAgICAgfQogICAgICAgICAgcmVuZGVyTWFuYWdlckF2YXRlckl0ZW1zKCk7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBub3JtYWxpemVNYW5hZ2VyQXZhdGVyQ2F0ZWdvcnkodmFsdWUpIHsKICAgICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gU3RyaW5nKHZhbHVlIHx8ICIiKS50cmltKCk7CiAgICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKE1BTkFHRVJfQVZBVEVSX0NBVEVHT1JZX0xBQkVMUywgY2F0ZWdvcnkpID8gY2F0ZWdvcnkgOiAiYWNjZXNzb3J5IjsKICAgICAgICB9CgogICAgICAgIGFzeW5jIGZ1bmN0aW9uIHN5bmNBdmF0ZXJJdGVtSW1hZ2VGcm9tRmlsZShmaWxlKSB7CiAgICAgICAgICBpZiAoIWZpbGUpIHsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQogICAgICAgICAgaWYgKCFmaWxlLnR5cGUuc3RhcnRzV2l0aCgiaW1hZ2UvIikpIHsKICAgICAgICAgICAgaWYgKGVsZW1lbnRzLnN0b3JlQ29uZmlnRmVlZGJhY2spIHsKICAgICAgICAgICAgICBlbGVtZW50cy5zdG9yZUNvbmZpZ0ZlZWRiYWNrLnRleHRDb250ZW50ID0gIueUu+WDj+ODleOCoeOCpOODq+OCkumBuOaKnuOBl+OBpuOBj+OBoOOBleOBhOOAgiI7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQogICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgY29uc3QgZGF0YVVybCA9IGF3YWl0IGZpbGVUb0RhdGFVcmwoZmlsZSk7CiAgICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IGNyZWF0ZURlZmF1bHRBdmF0ZXJJbWFnZVRyYW5zZm9ybSgpOwogICAgICAgICAgICBj",
    "b25zdCBhZGp1c3RlZCA9IGF3YWl0IHJlbmRlckFkanVzdGVkQXZhdGVySW1hZ2UoZGF0YVVybCwgdHJhbnNmb3JtKTsKICAgICAgICAgICAgc3RhdGUuYXZhdGVySXRlbUltYWdlRGF0YSA9IHsKICAgICAgICAgICAgICBuYW1lOiBmaWxlLm5hbWUsCiAgICAgICAgICAgICAgdHlwZTogZmlsZS50eXBlLAogICAgICAgICAgICAgIHNpemU6IGFkanVzdGVkLnNpemUsCiAgICAgICAgICAgICAgZGF0YVVybDogYWRqdXN0ZWQuZGF0YVVybCwKICAgICAgICAgICAgICBzb3VyY2VEYXRhVXJsOiBkYXRhVXJsLAogICAgICAgICAgICAgIHRyYW5zZm9ybSwKICAgICAgICAgICAgfTsKICAgICAgICAgICAgcmVuZGVyQXZhdGVySXRlbUltYWdlUHJldmlldygpOwogICAgICAgICAgICBvcGVuQXZhdGVySXRlbUltYWdlQWRqdXN0RGlhbG9nKCk7CiAgICAgICAgICAgIGlmIChlbGVtZW50cy5zdG9yZUNvbmZpZ0ZlZWRiYWNrKSB7CiAgICAgICAgICAgICAgZWxlbWVudHMuc3RvcmVDb25maWdGZWVkYmFjay50ZXh0Q29udGVudCA9ICIiOwogICAgICAgICAgICB9CiAgICAgICAgICB9IGNhdGNoIHsKICAgICAgICAgICAgc3RhdGUuYXZhdGVySXRlbUltYWdlRGF0YSA9IG51bGw7CiAgICAgICAgICAgIHJlbmRlckF2YXRlckl0ZW1JbWFnZVByZXZpZXcoKTsKICAgICAgICAgICAgaWYgKGVsZW1lbnRzLnN0b3JlQ29uZmlnRmVlZGJhY2spIHsKICAgICAgICAgICAgICBlbGVtZW50cy5zdG9yZUNvbmZpZ0ZlZWRiYWNrLnRleHRDb250ZW50ID0gIueUu+WDj+OBruiqreOBv+i+vOOBv+OBq+WkseaVl+OBl+OBvuOBl+OBn+OAgiI7CiAgICAgICAgICAgIH0KICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGNyZWF0ZURlZmF1bHRBdmF0ZXJJbWFnZVRyYW5zZm9ybSgpIHsKICAg",
    "ICAgICAgIHJldHVybiB7CiAgICAgICAgICAgIHNjYWxlOiAxMDAsCiAgICAgICAgICAgIHNjYWxlWDogMTAwLAogICAgICAgICAgICBzY2FsZVk6IDEwMCwKICAgICAgICAgICAgb2Zmc2V0WDogMCwKICAgICAgICAgICAgb2Zmc2V0WTogMCwKICAgICAgICAgICAgcm90YXRlOiAwLAogICAgICAgICAgfTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZUF2YXRlckltYWdlVHJhbnNmb3JtKHRyYW5zZm9ybSkgewogICAgICAgICAgY29uc3QgZmFsbGJhY2sgPSBjcmVhdGVEZWZhdWx0QXZhdGVySW1hZ2VUcmFuc2Zvcm0oKTsKICAgICAgICAgIGNvbnN0IGNsYW1wTnVtYmVyID0gKHZhbHVlLCBtaW4sIG1heCwgZmFsbGJhY2tWYWx1ZSkgPT4gewogICAgICAgICAgICBjb25zdCBudW1iZXIgPSBOdW1iZXIodmFsdWUpOwogICAgICAgICAgICBpZiAoIU51bWJlci5pc0Zpbml0ZShudW1iZXIpKSB7CiAgICAgICAgICAgICAgcmV0dXJuIGZhbGxiYWNrVmFsdWU7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcmV0dXJuIE1hdGgubWluKG1heCwgTWF0aC5tYXgobWluLCBudW1iZXIpKTsKICAgICAgICAgIH07CiAgICAgICAgICByZXR1cm4gewogICAgICAgICAgICBzY2FsZTogY2xhbXBOdW1iZXIodHJhbnNmb3JtPy5zY2FsZSwgNDAsIDIyMCwgZmFsbGJhY2suc2NhbGUpLAogICAgICAgICAgICBzY2FsZVg6IGNsYW1wTnVtYmVyKHRyYW5zZm9ybT8uc2NhbGVYLCA2MCwgMTYwLCBmYWxsYmFjay5zY2FsZVgpLAogICAgICAgICAgICBzY2FsZVk6IGNsYW1wTnVtYmVyKHRyYW5zZm9ybT8uc2NhbGVZLCA2MCwgMTYwLCBmYWxsYmFjay5zY2FsZVkpLAogICAgICAgICAgICBvZmZzZXRYOiBjbGFtcE51bWJlcih0cmFuc2Zvcm0/Lm9mZnNldFgsIC0xMjAsIDEyMCwgZmFs",
    "bGJhY2sub2Zmc2V0WCksCiAgICAgICAgICAgIG9mZnNldFk6IGNsYW1wTnVtYmVyKHRyYW5zZm9ybT8ub2Zmc2V0WSwgLTEyMCwgMTIwLCBmYWxsYmFjay5vZmZzZXRZKSwKICAgICAgICAgICAgcm90YXRlOiBjbGFtcE51bWJlcih0cmFuc2Zvcm0/LnJvdGF0ZSwgLTQ1LCA0NSwgZmFsbGJhY2sucm90YXRlKSwKICAgICAgICAgIH07CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiByZWFkQXZhdGVySW1hZ2VUcmFuc2Zvcm1JbnB1dHMoKSB7CiAgICAgICAgICByZXR1cm4gbm9ybWFsaXplQXZhdGVySW1hZ2VUcmFuc2Zvcm0oewogICAgICAgICAgICBzY2FsZTogZWxlbWVudHMuYXZhdGVySXRlbUltYWdlU2NhbGVJbnB1dD8udmFsdWUsCiAgICAgICAgICAgIHNjYWxlWDogZWxlbWVudHMuYXZhdGVySXRlbUltYWdlU2NhbGVYSW5wdXQ/LnZhbHVlLAogICAgICAgICAgICBzY2FsZVk6IGVsZW1lbnRzLmF2YXRlckl0ZW1JbWFnZVNjYWxlWUlucHV0Py52YWx1ZSwKICAgICAgICAgICAgb2Zmc2V0WDogZWxlbWVudHMuYXZhdGVySXRlbUltYWdlT2Zmc2V0WElucHV0Py52YWx1ZSwKICAgICAgICAgICAgb2Zmc2V0WTogZWxlbWVudHMuYXZhdGVySXRlbUltYWdlT2Zmc2V0WUlucHV0Py52YWx1ZSwKICAgICAgICAgICAgcm90YXRlOiBlbGVtZW50cy5hdmF0ZXJJdGVtSW1hZ2VSb3RhdGVJbnB1dD8udmFsdWUsCiAgICAgICAgICB9KTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHNldEF2YXRlckltYWdlVHJhbnNmb3JtSW5wdXRzKHRyYW5zZm9ybSkgewogICAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUF2YXRlckltYWdlVHJhbnNmb3JtKHRyYW5zZm9ybSk7CiAgICAgICAgICBpZiAoZWxlbWVudHMuYXZhdGVySXRlbUltYWdlU2NhbGVJbnB1dCkgewogICAg",
    "ICAgICAgICBlbGVtZW50cy5hdmF0ZXJJdGVtSW1hZ2VTY2FsZUlucHV0LnZhbHVlID0gU3RyaW5nKG5vcm1hbGl6ZWQuc2NhbGUpOwogICAgICAgICAgfQogICAgICAgICAgaWYgKGVsZW1lbnRzLmF2YXRlckl0ZW1JbWFnZVNjYWxlWElucHV0KSB7CiAgICAgICAgICAgIGVsZW1lbnRzLmF2YXRlckl0ZW1JbWFnZVNjYWxlWElucHV0LnZhbHVlID0gU3RyaW5nKG5vcm1hbGl6ZWQuc2NhbGVYKTsKICAgICAgICAgIH0KICAgICAgICAgIGlmIChlbGVtZW50cy5hdmF0ZXJJdGVtSW1hZ2VTY2FsZVlJbnB1dCkgewogICAgICAgICAgICBlbGVtZW50cy5hdmF0ZXJJdGVtSW1hZ2VTY2FsZVlJbnB1dC52YWx1ZSA9IFN0cmluZyhub3JtYWxpemVkLnNjYWxlWSk7CiAgICAgICAgICB9CiAgICAgICAgICBpZiAoZWxlbWVudHMuYXZhdGVySXRlbUltYWdlT2Zmc2V0WElucHV0KSB7CiAgICAgICAgICAgIGVsZW1lbnRzLmF2YXRlckl0ZW1JbWFnZU9mZnNldFhJbnB1dC52YWx1ZSA9IFN0cmluZyhub3JtYWxpemVkLm9mZnNldFgpOwogICAgICAgICAgfQogICAgICAgICAgaWYgKGVsZW1lbnRzLmF2YXRlckl0ZW1JbWFnZU9mZnNldFlJbnB1dCkgewogICAgICAgICAgICBlbGVtZW50cy5hdmF0ZXJJdGVtSW1hZ2VPZmZzZXRZSW5wdXQudmFsdWUgPSBTdHJpbmcobm9ybWFsaXplZC5vZmZzZXRZKTsKICAgICAgICAgIH0KICAgICAgICAgIGlmIChlbGVtZW50cy5hdmF0ZXJJdGVtSW1hZ2VSb3RhdGVJbnB1dCkgewogICAgICAgICAgICBlbGVtZW50cy5hdmF0ZXJJdGVtSW1hZ2VSb3RhdGVJbnB1dC52YWx1ZSA9IFN0cmluZyhub3JtYWxpemVkLnJvdGF0ZSk7CiAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBvcGVuQXZhdGVySXRlbUltYWdlQWRqdXN0RGlhbG9nKCkgewog",
    "ICAgICAgICAgY29uc3QgaW1hZ2VEYXRhID0gc3RhdGUuYXZhdGVySXRlbUltYWdlRGF0YTsKICAgICAgICAgIGlmICghaW1hZ2VEYXRhKSB7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KICAgICAgICAgIHNldEF2YXRlckltYWdlVHJhbnNmb3JtSW5wdXRzKGltYWdlRGF0YS50cmFuc2Zvcm0pOwogICAgICAgICAgdXBkYXRlQXZhdGVySXRlbUltYWdlQWRqdXN0bWVudFByZXZpZXcoKTsKICAgICAgICAgIHNob3dEaWFsb2coZWxlbWVudHMuYXZhdGVySXRlbUltYWdlQWRqdXN0RGlhbG9nKTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHVwZGF0ZUF2YXRlckl0ZW1JbWFnZUFkanVzdG1lbnRQcmV2aWV3KCkgewogICAgICAgICAgY29uc3QgaW1hZ2VEYXRhID0gc3RhdGUuYXZhdGVySXRlbUltYWdlRGF0YTsKICAgICAgICAgIGlmICghZWxlbWVudHMuYXZhdGVySXRlbUFkanVzdEltYWdlIHx8ICFpbWFnZURhdGEpIHsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQogICAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gcmVhZEF2YXRlckltYWdlVHJhbnNmb3JtSW5wdXRzKCk7CiAgICAgICAgICBjb25zdCBwcmV2aWV3U2NhbGVYID0gKHRyYW5zZm9ybS5zY2FsZSAvIDEwMCkgKiAodHJhbnNmb3JtLnNjYWxlWCAvIDEwMCk7CiAgICAgICAgICBjb25zdCBwcmV2aWV3U2NhbGVZID0gKHRyYW5zZm9ybS5zY2FsZSAvIDEwMCkgKiAodHJhbnNmb3JtLnNjYWxlWSAvIDEwMCk7CiAgICAgICAgICBlbGVtZW50cy5hdmF0ZXJJdGVtQWRqdXN0SW1hZ2Uuc3JjID0gaW1hZ2VEYXRhLnNvdXJjZURhdGFVcmwgfHwgaW1hZ2VEYXRhLmRhdGFVcmwgfHwgIiI7CiAgICAgICAgICBlbGVtZW50cy5hdmF0ZXJJdGVtQWRqdXN0SW1hZ2UuYWx0ID0gaW1hZ2VEYXRhLm5hbWUg",
    "fHwgIiI7CiAgICAgICAgICBlbGVtZW50cy5hdmF0ZXJJdGVtQWRqdXN0SW1hZ2Uuc3R5bGUuc2V0UHJvcGVydHkoIi0taW1hZ2UtYWRqdXN0LXgiLCBgJHt0cmFuc2Zvcm0ub2Zmc2V0WH1weGApOwogICAgICAgICAgZWxlbWVudHMuYXZhdGVySXRlbUFkanVzdEltYWdlLnN0eWxlLnNldFByb3BlcnR5KCItLWltYWdlLWFkanVzdC15IiwgYCR7dHJhbnNmb3JtLm9mZnNldFl9cHhgKTsKICAgICAgICAgIGVsZW1lbnRzLmF2YXRlckl0ZW1BZGp1c3RJbWFnZS5zdHlsZS5zZXRQcm9wZXJ0eSgiLS1pbWFnZS1hZGp1c3Qtcm90YXRlIiwgYCR7dHJhbnNmb3JtLnJvdGF0ZX1kZWdgKTsKICAgICAgICAgIGVsZW1lbnRzLmF2YXRlckl0ZW1BZGp1c3RJbWFnZS5zdHlsZS5zZXRQcm9wZXJ0eSgiLS1pbWFnZS1hZGp1c3Qtc2NhbGUteCIsIFN0cmluZyhwcmV2aWV3U2NhbGVYKSk7CiAgICAgICAgICBlbGVtZW50cy5hdmF0ZXJJdGVtQWRqdXN0SW1hZ2Uuc3R5bGUuc2V0UHJvcGVydHkoIi0taW1hZ2UtYWRqdXN0LXNjYWxlLXkiLCBTdHJpbmcocHJldmlld1NjYWxlWSkpOwogICAgICAgIH0KCiAgICAgICAgYXN5bmMgZnVuY3Rpb24gYXBwbHlBdmF0ZXJJdGVtSW1hZ2VBZGp1c3RtZW50KCkgewogICAgICAgICAgY29uc3QgaW1hZ2VEYXRhID0gc3RhdGUuYXZhdGVySXRlbUltYWdlRGF0YTsKICAgICAgICAgIGlmICghaW1hZ2VEYXRhKSB7CiAgICAgICAgICAgIGNsb3NlRGlhbG9nKGVsZW1lbnRzLmF2YXRlckl0ZW1JbWFnZUFkanVzdERpYWxvZyk7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IHJlYWRBdmF0ZXJJbWFnZVRyYW5zZm9ybUlucHV0cygpOwogICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgY29uc3QgYWRqdXN0ZWQg",
    "PSBhd2FpdCByZW5kZXJBZGp1c3RlZEF2YXRlckltYWdlKGltYWdlRGF0YS5zb3VyY2VEYXRhVXJsIHx8IGltYWdlRGF0YS5kYXRhVXJsLCB0cmFuc2Zvcm0pOwogICAgICAgICAgICBzdGF0ZS5hdmF0ZXJJdGVtSW1hZ2VEYXRhID0gewogICAgICAgICAgICAgIC4uLmltYWdlRGF0YSwKICAgICAgICAgICAgICBkYXRhVXJsOiBhZGp1c3RlZC5kYXRhVXJsLAogICAgICAgICAgICAgIHNpemU6IGFkanVzdGVkLnNpemUsCiAgICAgICAgICAgICAgdHJhbnNmb3JtLAogICAgICAgICAgICB9OwogICAgICAgICAgICByZW5kZXJBdmF0ZXJJdGVtSW1hZ2VQcmV2aWV3KCk7CiAgICAgICAgICAgIGNsb3NlRGlhbG9nKGVsZW1lbnRzLmF2YXRlckl0ZW1JbWFnZUFkanVzdERpYWxvZyk7CiAgICAgICAgICB9IGNhdGNoIHsKICAgICAgICAgICAgaWYgKGVsZW1lbnRzLnN0b3JlQ29uZmlnRmVlZGJhY2spIHsKICAgICAgICAgICAgICBlbGVtZW50cy5zdG9yZUNvbmZpZ0ZlZWRiYWNrLnRleHRDb250ZW50ID0gIueUu+WDj+OBruiqv+aVtOOCkuWPjeaYoOOBp+OBjeOBvuOBm+OCk+OBp+OBl+OBn+OAgiI7CiAgICAgICAgICAgIH0KICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIGFzeW5jIGZ1bmN0aW9uIHJlbmRlckFkanVzdGVkQXZhdGVySW1hZ2Uoc291cmNlRGF0YVVybCwgdHJhbnNmb3JtKSB7CiAgICAgICAgICBjb25zdCBpbWFnZSA9IGF3YWl0IGxvYWRJbWFnZUVsZW1lbnQoc291cmNlRGF0YVVybCk7CiAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJjYW52YXMiKTsKICAgICAgICAgIGNvbnN0IHdpZHRoID0gNTEyOwogICAgICAgICAgY29uc3QgaGVpZ2h0ID0gMzg0OwogICAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGg7CiAgICAgICAg",
    "ICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0OwogICAgICAgICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCIyZCIpOwogICAgICAgICAgaWYgKCFjb250ZXh0KSB7CiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiY2FudmFzLWNvbnRleHQtdW5hdmFpbGFibGUiKTsKICAgICAgICAgIH0KICAgICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpOwogICAgICAgICAgY29udGV4dC5zYXZlKCk7CiAgICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZSh3aWR0aCAvIDIgKyB0cmFuc2Zvcm0ub2Zmc2V0WCAqIDEuNywgaGVpZ2h0IC8gMiArIHRyYW5zZm9ybS5vZmZzZXRZICogMS43KTsKICAgICAgICAgIGNvbnRleHQucm90YXRlKCh0cmFuc2Zvcm0ucm90YXRlICogTWF0aC5QSSkgLyAxODApOwogICAgICAgICAgY29uc3QgYmFzZVNjYWxlID0gMzQwIC8gTWF0aC5tYXgoMSwgaW1hZ2UubmF0dXJhbFdpZHRoLCBpbWFnZS5uYXR1cmFsSGVpZ2h0KTsKICAgICAgICAgIGNvbnN0IHNjYWxlID0gdHJhbnNmb3JtLnNjYWxlIC8gMTAwOwogICAgICAgICAgY29udGV4dC5zY2FsZShiYXNlU2NhbGUgKiBzY2FsZSAqICh0cmFuc2Zvcm0uc2NhbGVYIC8gMTAwKSwgYmFzZVNjYWxlICogc2NhbGUgKiAodHJhbnNmb3JtLnNjYWxlWSAvIDEwMCkpOwogICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIC1pbWFnZS5uYXR1cmFsV2lkdGggLyAyLCAtaW1hZ2UubmF0dXJhbEhlaWdodCAvIDIpOwogICAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7CiAgICAgICAgICBjb25zdCBkYXRhVXJsID0gY2FudmFzLnRvRGF0YVVSTCgiaW1hZ2UvcG5nIik7CiAgICAgICAgICByZXR1cm4gewogICAgICAgICAgICBkYXRhVXJsLAogICAgICAgICAgICBzaXplOiBl",
    "c3RpbWF0ZURhdGFVcmxCeXRlU2l6ZShkYXRhVXJsKSwKICAgICAgICAgIH07CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBsb2FkSW1hZ2VFbGVtZW50KHNyYykgewogICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHsKICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTsKICAgICAgICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4gcmVzb2x2ZShpbWFnZSk7CiAgICAgICAgICAgIGltYWdlLm9uZXJyb3IgPSAoKSA9PiByZWplY3QobmV3IEVycm9yKCJpbWFnZS1sb2FkLWZhaWxlZCIpKTsKICAgICAgICAgICAgaW1hZ2Uuc3JjID0gc3JjOwogICAgICAgICAgfSk7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBlc3RpbWF0ZURhdGFVcmxCeXRlU2l6ZShkYXRhVXJsKSB7CiAgICAgICAgICBjb25zdCBwYXlsb2FkID0gU3RyaW5nKGRhdGFVcmwgfHwgIiIpLnNwbGl0KCIsIilbMV0gfHwgIiI7CiAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5mbG9vcigocGF5bG9hZC5sZW5ndGggKiAzKSAvIDQpKTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHJlbmRlckF2YXRlckl0ZW1JbWFnZVByZXZpZXcoKSB7CiAgICAgICAgICBjb25zdCBpbWFnZURhdGEgPSBzdGF0ZS5hdmF0ZXJJdGVtSW1hZ2VEYXRhOwogICAgICAgICAgaWYgKGVsZW1lbnRzLmF2YXRlckl0ZW1JbWFnZVByZXZpZXcpIHsKICAgICAgICAgICAgZWxlbWVudHMuYXZhdGVySXRlbUltYWdlUHJldmlldy5oaWRkZW4gPSAhaW1hZ2VEYXRhOwogICAgICAgICAgICBlbGVtZW50cy5hdmF0ZXJJdGVtSW1hZ2VQcmV2aWV3LnNyYyA9IGltYWdlRGF0YT8uZGF0YVVybCB8fCAiIjsKICAgICAgICAgICAgZWxlbWVudHMuYXZhdGVySXRlbUltYWdlUHJl",
    "dmlldy5hbHQgPSBpbWFnZURhdGE/Lm5hbWUgfHwgIiI7CiAgICAgICAgICB9CiAgICAgICAgICBpZiAoZWxlbWVudHMuYXZhdGVySXRlbUltYWdlRW1wdHkpIHsKICAgICAgICAgICAgZWxlbWVudHMuYXZhdGVySXRlbUltYWdlRW1wdHkuaGlkZGVuID0gQm9vbGVhbihpbWFnZURhdGEpOwogICAgICAgICAgfQogICAgICAgICAgaWYgKGVsZW1lbnRzLmF2YXRlckl0ZW1JbWFnZU1ldGEpIHsKICAgICAgICAgICAgY29uc3Qgc2l6ZUtiID0gaW1hZ2VEYXRhPy5zaXplID8gTWF0aC5tYXgoMSwgTWF0aC5yb3VuZChpbWFnZURhdGEuc2l6ZSAvIDEwMjQpKSA6IDA7CiAgICAgICAgICAgIGVsZW1lbnRzLmF2YXRlckl0ZW1JbWFnZU1ldGEudGV4dENvbnRlbnQgPSBpbWFnZURhdGEgPyBgJHtpbWFnZURhdGEubmFtZX0gKCR7c2l6ZUtifUtCKWAgOiAiIjsKICAgICAgICAgIH0KICAgICAgICAgIGlmIChlbGVtZW50cy5hZGp1c3RBdmF0ZXJJdGVtSW1hZ2VCdG4pIHsKICAgICAgICAgICAgZWxlbWVudHMuYWRqdXN0QXZhdGVySXRlbUltYWdlQnRuLmRpc2FibGVkID0gIWltYWdlRGF0YTsKICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGNsZWFyQXZhdGVySXRlbUltYWdlKCkgewogICAgICAgICAgc3RhdGUuYXZhdGVySXRlbUltYWdlRGF0YSA9IG51bGw7CiAgICAgICAgICBpZiAoZWxlbWVudHMuYXZhdGVySXRlbUltYWdlSW5wdXQpIHsKICAgICAgICAgICAgZWxlbWVudHMuYXZhdGVySXRlbUltYWdlSW5wdXQudmFsdWUgPSAiIjsKICAgICAgICAgIH0KICAgICAgICAgIGNsb3NlRGlhbG9nKGVsZW1lbnRzLmF2YXRlckl0ZW1JbWFnZUFkanVzdERpYWxvZyk7CiAgICAgICAgICByZW5kZXJBdmF0ZXJJdGVtSW1hZ2VQcmV2aWV3KCk7CiAgICAgICAgfQoKICAgICAg",
    "ICBmdW5jdGlvbiBnZXRNYW5hZ2VyQXZhdGVySXRlbUltYWdlKGl0ZW0pIHsKICAgICAgICAgIGNvbnN0IGltYWdlID0gaXRlbT8uaW1hZ2U7CiAgICAgICAgICByZXR1cm4gaW1hZ2UgJiYgdHlwZW9mIGltYWdlLmRhdGFVcmwgPT09ICJzdHJpbmciICYmIGltYWdlLmRhdGFVcmwgPyBpbWFnZSA6IG51bGw7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiByZW5kZXJNYW5hZ2VyQXZhdGVySXRlbXMoKSB7CiAgICAgICAgICBpZiAoIWVsZW1lbnRzLm1hbmFnZXJBdmF0ZXJJdGVtTGlzdCkgewogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CiAgICAgICAgICBjb25zdCBpdGVtcyA9IGxvYWRNYW5hZ2VyQXZhdGVySXRlbXMoKTsKICAgICAgICAgIGNvbnN0IGFjdGl2ZUNhdGVnb3J5ID0gbm9ybWFsaXplTWFuYWdlckF2YXRlckNhdGVnb3J5KHN0YXRlLmFjdGl2ZUF2YXRlckNhdGVnb3J5KTsKICAgICAgICAgIGNvbnN0IGNhdGVnb3J5VGFicyA9IE9iamVjdC5lbnRyaWVzKE1BTkFHRVJfQVZBVEVSX0NBVEVHT1JZX0xBQkVMUykKICAgICAgICAgICAgLm1hcCgoW2NhdGVnb3J5LCBsYWJlbF0pID0+IHsKICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGNhdGVnb3J5ID09PSBhY3RpdmVDYXRlZ29yeTsKICAgICAgICAgICAgICByZXR1cm4gYDxidXR0b24gY2xhc3M9ImF2YXRlci1jYXRlZ29yeS10YWIgJHtpc0FjdGl2ZSA/ICJpcy1hY3RpdmUiIDogIiJ9IiB0eXBlPSJidXR0b24iIGRhdGEtbWFuYWdlci1hdmF0ZXItY2F0ZWdvcnk9IiR7ZXNjYXBlSHRtbChjYXRlZ29yeSl9IiBhcmlhLXByZXNzZWQ9IiR7U3RyaW5nKGlzQWN0aXZlKX0iPiR7ZXNjYXBlSHRtbChsYWJlbCl9PC9idXR0b24+YDsKICAgICAgICAgICAgfSkKICAgICAgICAgICAgLmpvaW4oIiIpOwog",
    "ICAgICAgICAgY29uc3QgdmlzaWJsZUl0ZW1zID0gaXRlbXMuZmlsdGVyKChpdGVtKSA9PiBub3JtYWxpemVNYW5hZ2VyQXZhdGVyQ2F0ZWdvcnkoaXRlbS5jYXRlZ29yeSkgPT09IGFjdGl2ZUNhdGVnb3J5KTsKICAgICAgICAgIGNvbnN0IGNhcmRzID0gdmlzaWJsZUl0ZW1zCiAgICAgICAgICAgIC5tYXAoCiAgICAgICAgICAgICAgKGl0ZW0pID0+IHsKICAgICAgICAgICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gbm9ybWFsaXplTWFuYWdlckF2YXRlckNhdGVnb3J5KGl0ZW0uY2F0ZWdvcnkpOwogICAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBpdGVtLmlkID09PSBzdGF0ZS5hY3RpdmVTdG9yZUl0ZW1JZDsKICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlID0gZ2V0TWFuYWdlckF2YXRlckl0ZW1JbWFnZShpdGVtKTsKICAgICAgICAgICAgICAgIHJldHVybiBgCiAgICAgICAgICAgICAgICA8YXJ0aWNsZQogICAgICAgICAgICAgICAgICBjbGFzcz0ibWFuYWdlci1zdG9yZS1pdGVtJHtpc0FjdGl2ZSA/ICIgaXMtYWN0aXZlIiA6ICIifSIKICAgICAgICAgICAgICAgICAgZGF0YS1tYW5hZ2VyLWF2YXRlci1pdGVtPSIke2VzY2FwZUh0bWwoaXRlbS5pZCl9IgogICAgICAgICAgICAgICAgICByb2xlPSJidXR0b24iCiAgICAgICAgICAgICAgICAgIHRhYmluZGV4PSIwIgogICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPSIke2VzY2FwZUh0bWwoaXRlbS5uYW1lIHx8ICLmnKroqK3lrpoiKX3jga7mk43kvZwiCiAgICAgICAgICAgICAgICA+CiAgICAgICAgICAgICAgICAgICR7CiAgICAgICAgICAgICAgICAgICAgaW1hZ2UKICAgICAgICAgICAgICAgICAgICAgID8gYDxpbWcgY2xhc3M9Im1hbmFnZXItc3RvcmUtaXRlbS1pbWFnZSIgc3JjPSIke2VzY2FwZUh0bWwoaW1h",
    "Z2UuZGF0YVVybCl9IiBhbHQ9IiIgLz5gCiAgICAgICAgICAgICAgICAgICAgICA6IGA8c3BhbiBjbGFzcz0ibWFuYWdlci1zdG9yZS1pdGVtLWltYWdlIGF2YXRlci1pdGVtLWN1c3RvbSBhdmF0ZXItY2F0ZWdvcnktJHtlc2NhcGVIdG1sKGNhdGVnb3J5KX0iIGFyaWEtaGlkZGVuPSJ0cnVlIj48L3NwYW4+YAogICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9Im1hbmFnZXItc3RvcmUtaXRlbS1tYWluIj4KICAgICAgICAgICAgICAgICAgICA8aDM+JHtlc2NhcGVIdG1sKGl0ZW0ubmFtZSB8fCAi5pyq6Kit5a6aIil9PC9oMz4KICAgICAgICAgICAgICAgICAgICA8cD4ke2VzY2FwZUh0bWwoTUFOQUdFUl9BVkFURVJfQ0FURUdPUllfTEFCRUxTW2NhdGVnb3J5XSl9PC9wPgogICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPSJtYW5hZ2VyLXN0b3JlLXByaWNlIj48aW1nIHNyYz0iLi9hc3NldHMvaWNvbnMvY29pbi5wbmc/dj0yMDI2MDMyNi0xIiBhbHQ9IiIgYXJpYS1oaWRkZW49InRydWUiIC8+JHtlc2NhcGVIdG1sKFN0cmluZyhpdGVtLmNvc3QgfHwgMCkpfTwvcD4KICAgICAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgICAgICAgICR7CiAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUKICAgICAgICAgICAgICAgICAgICAgID8gYDxkaXYgY2xhc3M9Im1hbmFnZXItc3RvcmUtZGVsZXRlLWJ1YmJsZSIgcm9sZT0iZGlhbG9nIiBhcmlhLWxhYmVsPSLjgqLjgqTjg4bjg6DliYrpmaQiPgogICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT0iYnV0dG9uIiBkYXRhLW1hbmFnZXItYXZhdGVyLWRlbGV0ZT0iJHtlc2NhcGVIdG1sKGl0ZW0uaWQpfSI+44GT44Gu44Ki44Kk44OG44Og44KS5YmK6Zmk44GZ44KLPC9idXR0",
    "b24+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmAKICAgICAgICAgICAgICAgICAgICAgIDogIiIKICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgPC9hcnRpY2xlPgogICAgICAgICAgICAgIGA7CiAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgKQogICAgICAgICAgICAuam9pbigiIik7CiAgICAgICAgICBlbGVtZW50cy5tYW5hZ2VyQXZhdGVySXRlbUxpc3QuaW5uZXJIVE1MID0gYAogICAgICAgICAgICA8ZGl2IGNsYXNzPSJhdmF0ZXItY2F0ZWdvcnktdGFicyIgcm9sZT0idGFibGlzdCIgYXJpYS1sYWJlbD0iQXZhdGVy44Kr44OG44K044Oq44O8Ij4ke2NhdGVnb3J5VGFic308L2Rpdj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0ibWFuYWdlci1wdWJsaXNoZWQtYXZhdGVyLWl0ZW1zIj4KICAgICAgICAgICAgICAke2NhcmRzIHx8ICc8cCBjbGFzcz0iaGludC10ZXh0Ij7ov73liqDjgZXjgozjgZ9BdmF0ZXLjgqLjgqTjg4bjg6Djga/jgYLjgorjgb7jgZvjgpPjgII8L3A+J30KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICBgOwogICAgICAgIH0KCiAgICAgICAgYXN5bmMgZnVuY3Rpb24gbG9hZE1hbmFnZXJNZW1iZXJzKCkgewogICAgICAgICAgaWYgKCFjYW5NYW5hZ2VNYW5hZ2VyTWVtYmVycygpKSB7CiAgICAgICAgICAgIGlmIChlbGVtZW50cy5tYW5hZ2VyTWVtYmVyc1BhbmVsKSB7CiAgICAgICAgICAgICAgZWxlbWVudHMubWFuYWdlck1lbWJlcnNQYW5lbC5oaWRkZW4gPSBmYWxzZTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAoZWxlbWVudHMubWFuYWdlck1lbWJlcnNTdGF0dXMpIHsKICAgICAgICAgICAgICBlbGVtZW50cy5tYW5hZ2VyTWVtYmVyc1N0YXR1cy50ZXh0Q29udGVudCA9ICLjg6bjg7zjgrbjg7znrqHnkIbj",
    "ga9Pd25lcuOBruOBv+WIqeeUqOOBp+OBjeOBvuOBmeOAgiI7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKGVsZW1lbnRzLm1hbmFnZXJNZW1iZXJzTGlzdCkgewogICAgICAgICAgICAgIGVsZW1lbnRzLm1hbmFnZXJNZW1iZXJzTGlzdC5pbm5lckhUTUwgPSAiIjsKICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CgogICAgICAgICAgZWxlbWVudHMubWFuYWdlck1lbWJlcnNQYW5lbC5oaWRkZW4gPSBmYWxzZTsKICAgICAgICAgIGVsZW1lbnRzLm1hbmFnZXJNZW1iZXJzU3RhdHVzLnRleHRDb250ZW50ID0gIuiqreOBv+i+vOOBv+S4reOBp+OBmeOAgiI7CgogICAgICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCBnZXRBdXRoMEFjY2Vzc1Rva2VuKCk7CiAgICAgICAgICBpZiAoIXRva2VuKSB7CiAgICAgICAgICAgIGVsZW1lbnRzLm1hbmFnZXJNZW1iZXJzU3RhdHVzLnRleHRDb250ZW50ID0gIuODreOCsOOCpOODs+aDheWgseOCkueiuuiqjeOBp+OBjeOBvuOBm+OCk+OBp+OBl+OBn+OAgiI7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KCiAgICAgICAgICB0cnkgewogICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3Jlc29sdmVBcGlCYXNlKCl9L21hbmFnZXIvbWVtYmVyc2AsIHsKICAgICAgICAgICAgICBoZWFkZXJzOiB7CiAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCwKICAgICAgICAgICAgICAgIEFjY2VwdDogImFwcGxpY2F0aW9uL2pzb24iLAogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgIH0pOwogICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7CiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBUEkgJHtyZXNwb25zZS5zdGF0dXN9",
    "YCk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgY29uc3QgbWVtYmVycyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTsKICAgICAgICAgICAgc3RhdGUubWFuYWdlck1lbWJlcnMgPSBBcnJheS5pc0FycmF5KG1lbWJlcnMpID8gbWVtYmVycyA6IFtdOwogICAgICAgICAgICByZW5kZXJNYW5hZ2VyTWVtYmVycygpOwogICAgICAgICAgfSBjYXRjaCB7CiAgICAgICAgICAgIGVsZW1lbnRzLm1hbmFnZXJNZW1iZXJzU3RhdHVzLnRleHRDb250ZW50ID0gIuODpuODvOOCtuODvOS4gOimp+OCkuWPluW+l+OBp+OBjeOBvuOBm+OCk+OBp+OBl+OBn+OAgiI7CiAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiByZW5kZXJNYW5hZ2VyTWVtYmVycygpIHsKICAgICAgICAgIGlmICghZWxlbWVudHMubWFuYWdlck1lbWJlcnNMaXN0IHx8ICFlbGVtZW50cy5tYW5hZ2VyTWVtYmVyc1N0YXR1cykgewogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CgogICAgICAgICAgY29uc3QgcXVlcnkgPSBub3JtYWxpemVNYW5hZ2VyTWVtYmVyU2VhcmNoVGV4dChlbGVtZW50cy5tYW5hZ2VyTWVtYmVyU2VhcmNoSW5wdXQ/LnZhbHVlIHx8ICIiKTsKICAgICAgICAgIGNvbnN0IHZpc2libGVNZW1iZXJzID0gcXVlcnkKICAgICAgICAgICAgPyBzdGF0ZS5tYW5hZ2VyTWVtYmVycy5maWx0ZXIoKG1lbWJlcikgPT4KICAgICAgICAgICAgICAgIGdldE1hbmFnZXJNZW1iZXJTZWFyY2hWYWx1ZXMobWVtYmVyKQogICAgICAgICAgICAgICAgICAubWFwKG5vcm1hbGl6ZU1hbmFnZXJNZW1iZXJTZWFyY2hUZXh0KQogICAgICAgICAgICAgICAgICAuc29tZSgodmFsdWUpID0+IHZhbHVlLmluY2x1ZGVzKHF1ZXJ5KSksCiAgICAgICAgICAgICAgKQogICAgICAgICAgICA6IHN0YXRlLm1hbmFn",
    "ZXJNZW1iZXJzOwoKICAgICAgICAgIGlmIChzdGF0ZS5tYW5hZ2VyTWVtYmVycy5sZW5ndGggPT09IDApIHsKICAgICAgICAgICAgZWxlbWVudHMubWFuYWdlck1lbWJlcnNTdGF0dXMudGV4dENvbnRlbnQgPSAi6KGo56S644Gn44GN44KL44Om44O844K244O844Gv44GE44G+44Gb44KT44CCIjsKICAgICAgICAgICAgZWxlbWVudHMubWFuYWdlck1lbWJlcnNMaXN0LmlubmVySFRNTCA9ICIiOwogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CgogICAgICAgICAgZWxlbWVudHMubWFuYWdlck1lbWJlcnNTdGF0dXMudGV4dENvbnRlbnQgPSB2aXNpYmxlTWVtYmVycy5sZW5ndGgKICAgICAgICAgICAgPyAi44Om44O844K244O844GuUmV2aWV3IERhdGHjgpLnt6jpm4bjgafjgY3jgb7jgZnjgIIiCiAgICAgICAgICAgIDogIuS4gOiHtOOBmeOCi+ODpuODvOOCtuODvOOBr+OBhOOBvuOBm+OCk+OAgiI7CiAgICAgICAgICBlbGVtZW50cy5tYW5hZ2VyTWVtYmVyc0xpc3QuaW5uZXJIVE1MID0gdmlzaWJsZU1lbWJlcnMKICAgICAgICAgICAgLm1hcCgobWVtYmVyKSA9PiB7CiAgICAgICAgICAgICAgY29uc3QgaWQgPSBtZW1iZXI/LmlkIHx8ICIiOwogICAgICAgICAgICAgIGNvbnN0IHJvbGVWYWx1ZSA9IG1lbWJlcj8ucm9sZSB8fCAidXNlciI7CiAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGdldE1hbmFnZXJNZW1iZXJOaWNrbmFtZShtZW1iZXIpOwogICAgICAgICAgICAgIGNvbnN0IHN1YiA9IG1lbWJlcj8uZW1haWwgfHwgbWVtYmVyPy5hdXRoMF9zdWIgfHwgIiI7CiAgICAgICAgICAgICAgY29uc3QgcmV2aWV3Q29pbiA9IGdldE1hbmFnZXJNZW1iZXJSZXZpZXdDb2luKG1lbWJlcik7CiAgICAgICAgICAgICAgY29uc3QgaGFzVW5saW1pdGVkUmV2aWV3Q29pbnMgPSBy",
    "b2xlVmFsdWUgIT09ICJ1c2VyIjsKICAgICAgICAgICAgICBjb25zdCByZXZpZXdEYXlzID0gZ2V0TWFuYWdlck1lbWJlclJldmlld0RheXMobWVtYmVyKTsKICAgICAgICAgICAgICBjb25zdCByb2xlTGFiZWwgPSBNQU5BR0VSX1JPTEVfTEFCRUxTW3JvbGVWYWx1ZV0gfHwgTUFOQUdFUl9ST0xFX0xBQkVMUy51c2VyOwogICAgICAgICAgICAgIGNvbnN0IHJvbGVUYWcgPSByb2xlVmFsdWUgJiYgcm9sZVZhbHVlICE9PSAidXNlciIKICAgICAgICAgICAgICAgID8gYDxzcGFuIGNsYXNzPSJtYW5hZ2VyLW1lbWJlci1yb2xlLXRhZyI+JHtlc2NhcGVIdG1sKHJvbGVMYWJlbCl9PC9zcGFuPmAKICAgICAgICAgICAgICAgIDogIiI7CiAgICAgICAgICAgICAgY29uc3Qgcm9sZU9wdGlvbnMgPSBPYmplY3QuZW50cmllcyhNQU5BR0VSX1JPTEVfTEFCRUxTKQogICAgICAgICAgICAgICAgLm1hcCgoW3ZhbHVlLCBsYWJlbF0pID0+IGA8b3B0aW9uIHZhbHVlPSIke2VzY2FwZUh0bWwodmFsdWUpfSIgJHt2YWx1ZSA9PT0gcm9sZVZhbHVlID8gInNlbGVjdGVkIiA6ICIifT4ke2VzY2FwZUh0bWwobGFiZWwpfTwvb3B0aW9uPmApCiAgICAgICAgICAgICAgICAuam9pbigiIik7CgogICAgICAgICAgICAgIHJldHVybiBgCiAgICAgICAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz0ibWFuYWdlci1tZW1iZXItY2FyZCIgZGF0YS1tYW5hZ2VyLW1lbWJlci1pZD0iJHtlc2NhcGVIdG1sKGlkKX0iPgogICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJtYW5hZ2VyLW1lbWJlci1hdmF0YXIgYXZhdGVyLXByZXZpZXciIGFyaWEtaGlkZGVuPSJ0cnVlIj4KICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPSJhdmF0ZXItYmFzZS1pbWFnZSIgc3JjPSIuL2Fzc2V0cy9hdmF0ZXIv44KJ44O844KTMS0x",
    "LnBuZyIgYWx0PSIiIC8+CiAgICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJtYW5hZ2VyLW1lbWJlci1tYWluIj4KICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJtYW5hZ2VyLW1lbWJlci1pZGVudGl0eSR7cm9sZVRhZyA/ICIiIDogIiBoYXMtbm8tcm9sZS10YWcifSI+CiAgICAgICAgICAgICAgICAgICAgICAke3JvbGVUYWd9CiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz0ibWFuYWdlci1tZW1iZXItbmFtZSI+JHtlc2NhcGVIdG1sKG5hbWUpfTwvcD4KICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPSJtYW5hZ2VyLW1lbWJlci1zdWIiPiR7ZXNjYXBlSHRtbChzdWIpfTwvcD4KICAgICAgICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJtYW5hZ2VyLW1lbWJlci1hY3Rpb25zIj4KICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9InByaW1hcnkgYmxhY2stYnV0dG9uIG1hbmFnZXItbWVtYmVyLWRldGFpbC10b2dnbGUiIHR5cGU9ImJ1dHRvbiIgZGF0YS1tYW5hZ2VyLW1lbWJlci1kZXRhaWwtdG9nZ2xlIGFyaWEtZXhwYW5kZWQ9ImZhbHNlIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9Im1hdGVyaWFsLXN5bWJvbHMtcm91bmRlZCIgYXJpYS1oaWRkZW49InRydWUiPmVkaXQ8L3NwYW4+CiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlJldmlldyBEYXRh44KS57eo6ZuG44GZ44KLPC9zcGFuPgogICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+CiAgICAgICAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJtYW5hZ2VyLW1lbWJl",
    "ci1kZXRhaWwiIGRhdGEtbWFuYWdlci1tZW1iZXItZGV0YWlsIGhpZGRlbj4KICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJtYW5hZ2VyLW1lbWJlci1kZXRhaWwtZ3JpZCI+CiAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9Im1hbmFnZXItbWVtYmVyLWRldGFpbC1maWVsZCBpcy13aWRlIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UmV2aWV3IERhdGHvvIhKU09O77yJPC9zcGFuPgogICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgZGF0YS1tYW5hZ2VyLW1lbWJlci1yZXZpZXctZGF0YS1qc29uIHNwZWxsY2hlY2s9ImZhbHNlIj4ke2VzY2FwZUh0bWwoc3RyaW5naWZ5TWFuYWdlckpzb24oZ2V0TWFuYWdlck1lbWJlclJldmlld0RhdGEobWVtYmVyKSkpfTwvdGV4dGFyZWE+CiAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPgogICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPSJtYW5hZ2VyLW1lbWJlci1kZXRhaWwtZmllbGQgaXMtd2lkZSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPuW9ueWJsjwvc3Bhbj4KICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBkYXRhLW1hbmFnZXItbWVtYmVyLXJvbGUgYXJpYS1sYWJlbD0i5b255YmyIj4ke3JvbGVPcHRpb25zfTwvc2VsZWN0PgogICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD4KICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz0ibWFuYWdlci1tZW1iZXItZGV0YWlsLWZpZWxkIG1hbmFnZXItbWVtYmVyLXJldmlldy1jb2luLWZpZWxkJHtoYXNVbmxpbWl0ZWRSZXZpZXdDb2lucyA/ICIgaXMtdW5saW1pdGVkIiA6ICIifSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlJldmlldyBDb2luPC9zcGFuPgogICAgICAgICAg",
    "ICAgICAgICAgICAgICA8aW5wdXQKICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLW1hbmFnZXItbWVtYmVyLXJldmlldy1jb2luCiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT0iJHtoYXNVbmxpbWl0ZWRSZXZpZXdDb2lucyA/ICJ0ZXh0IiA6ICJudW1iZXIifSIKICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dG1vZGU9IiR7aGFzVW5saW1pdGVkUmV2aWV3Q29pbnMgPyAidGV4dCIgOiAibnVtZXJpYyJ9IgogICAgICAgICAgICAgICAgICAgICAgICAgIG1pbj0iMCIKICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwPSIxIgogICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPSIke2VzY2FwZUh0bWwoaGFzVW5saW1pdGVkUmV2aWV3Q29pbnMgPyAi4oie5p6aIiA6IFN0cmluZyhyZXZpZXdDb2luKSl9IgogICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtcmV2aWV3LWNvaW4tdmFsdWU9IiR7ZXNjYXBlSHRtbChTdHJpbmcocmV2aWV3Q29pbikpfSIKICAgICAgICAgICAgICAgICAgICAgICAgICAke2hhc1VubGltaXRlZFJldmlld0NvaW5zID8gImRpc2FibGVkIiA6ICIifQogICAgICAgICAgICAgICAgICAgICAgICAvPgogICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD4KICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz0ibWFuYWdlci1tZW1iZXItZGV0YWlsLWZpZWxkIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+44Oq44OT44Ol44O85pel5pWwPC9zcGFuPgogICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgZGF0YS1tYW5hZ2VyLW1lbWJlci1yZXZpZXctZGF5cyB0eXBlPSJudW1iZXIiIGlucHV0bW9kZT0ibnVtZXJpYyIgbWluPSIwIiBzdGVwPSIxIiB2YWx1ZT0iJHtlc2NhcGVIdG1sKFN0cmluZyhyZXZp",
    "ZXdEYXlzKSl9IiAvPgogICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD4KICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz0ibWFuYWdlci1tZW1iZXItZGV0YWlsLWZpZWxkIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+Tmlja25hbWU8L3NwYW4+CiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBkYXRhLW1hbmFnZXItbWVtYmVyLW5pY2tuYW1lIHR5cGU9InRleHQiIHZhbHVlPSIke2VzY2FwZUh0bWwoZ2V0TWFuYWdlck1lbWJlclJhd05pY2tuYW1lKG1lbWJlcikpfSIgLz4KICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+CiAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9Im1hbmFnZXItbWVtYmVyLWRldGFpbC1maWVsZCI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPuODoeODvOODq+OCouODieODrOOCuTwvc3Bhbj4KICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGRhdGEtbWFuYWdlci1tZW1iZXItZW1haWwgdHlwZT0iZW1haWwiIHZhbHVlPSIke2VzY2FwZUh0bWwoZ2V0TWFuYWdlck1lbWJlckVtYWlsKG1lbWJlcikpfSIgLz4KICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+CiAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9Im1hbmFnZXItbWVtYmVyLWRldGFpbC1maWVsZCBpcy13aWRlIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+44Kr44Op44O844OG44O844Oe44O7RWR1Y2F0aW9uIENvZGXjg7vos7zlhaXnirbms4HjgarjganvvIhKU09O77yJPC9zcGFuPgogICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgZGF0YS1tYW5hZ2VyLW1lbWJlci1zZXR0aW5ncy1qc29uIHNwZWxsY2hlY2s9ImZhbHNlIj4ke2VzY2FwZUh0bWwoc3RyaW5naWZ5TWFuYWdlckpz",
    "b24oZ2V0TWFuYWdlck1lbWJlclNldHRpbmdzKG1lbWJlcikpKX08L3RleHRhcmVhPgogICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD4KICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz0ibWFuYWdlci1tZW1iZXItZGV0YWlsLWZpZWxkIGlzLXdpZGUiPgogICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5BdmF0ZXLvvIhKU09O77yJPC9zcGFuPgogICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgZGF0YS1tYW5hZ2VyLW1lbWJlci1hdmF0ZXItanNvbiBzcGVsbGNoZWNrPSJmYWxzZSI+JHtlc2NhcGVIdG1sKHN0cmluZ2lmeU1hbmFnZXJKc29uKGdldE1hbmFnZXJNZW1iZXJBdmF0ZXJTdGF0ZShtZW1iZXIpLmF2YXRlcikpfTwvdGV4dGFyZWE+CiAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPgogICAgICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9Im1hbmFnZXItbWVtYmVyLWRldGFpbC1hY3Rpb25zIj4KICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9InNlY29uZGFyeSB3aGl0ZS1idXR0b24iIHR5cGU9ImJ1dHRvbiIgZGF0YS1tYW5hZ2VyLW1lbWJlci1sb2dvdXQ+CiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJtYXRlcmlhbC1zeW1ib2xzLXJvdW5kZWQiIGFyaWEtaGlkZGVuPSJ0cnVlIj5sb2dvdXQ8L3NwYW4+CiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPuODreOCsOOCouOCpuODiDwvc3Bhbj4KICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPgogICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0ic2Vjb25kYXJ5IHdoaXRlLWJ1dHRvbiIgdHlwZT0iYnV0dG9uIiBkYXRhLW1hbmFnZXItbWVtYmVyLWRlbGV0ZT4KICAgICAg",
    "ICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9Im1hdGVyaWFsLXN5bWJvbHMtcm91bmRlZCIgYXJpYS1oaWRkZW49InRydWUiPmRlbGV0ZTwvc3Bhbj4KICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+5YmK6Zmk44GZ44KLPC9zcGFuPgogICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+CiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSJwcmltYXJ5IiB0eXBlPSJidXR0b24iIGRhdGEtbWFuYWdlci1tZW1iZXItc2F2ZT4KICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9Im1hdGVyaWFsLXN5bWJvbHMtcm91bmRlZCIgYXJpYS1oaWRkZW49InRydWUiPnNhdmU8L3NwYW4+CiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPuS/neWtmOOBmeOCizwvc3Bhbj4KICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPgogICAgICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgICAgIDwvYXJ0aWNsZT4KICAgICAgICAgICAgICBgOwogICAgICAgICAgICB9KQogICAgICAgICAgICAuam9pbigiIik7CiAgICAgICAgICByZW5kZXJNYW5hZ2VyTWVtYmVyQXZhdGVyUHJldmlld3ModmlzaWJsZU1lbWJlcnMpOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gZ2V0TWFuYWdlck1lbWJlclJhd05pY2tuYW1lKG1lbWJlcikgewogICAgICAgICAgY29uc3QgY2FuZGlkYXRlcyA9IFsKICAgICAgICAgICAgbWVtYmVyPy5uaWNrbmFtZSwKICAgICAgICAgICAgbWVtYmVyPy5wcm9maWxlPy5uaWNrbmFtZSwKICAgICAgICAgICAgbWVtYmVyPy51c2VyX21ldGFkYXRhPy5uaWNrbmFtZSwKICAgICAgICAgICAgbWVtYmVyPy5kaXNwbGF5X25hbWUsCiAgICAgICAgICAgIG1lbWJlcj8ubmFtZSwK",
    "ICAgICAgICAgIF07CiAgICAgICAgICBjb25zdCBuaWNrbmFtZSA9IGNhbmRpZGF0ZXMKICAgICAgICAgICAgLm1hcCgodmFsdWUpID0+IFN0cmluZyh2YWx1ZSB8fCAiIikudHJpbSgpKQogICAgICAgICAgICAuZmluZCgodmFsdWUpID0+IHZhbHVlICYmICFsb29rc0xpa2VBdXRoMFN1YmplY3QodmFsdWUpKTsKICAgICAgICAgIHJldHVybiBuaWNrbmFtZSB8fCAiIjsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGdldE1hbmFnZXJNZW1iZXJOaWNrbmFtZShtZW1iZXIpIHsKICAgICAgICAgIHJldHVybiBnZXRNYW5hZ2VyTWVtYmVyUmF3Tmlja25hbWUobWVtYmVyKSB8fCAiTmlja25hbWXmnKroqK3lrpoiOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gbm9ybWFsaXplTWFuYWdlck1lbWJlclNlYXJjaFRleHQodmFsdWUpIHsKICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUgfHwgIiIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1tcc1x1MzAwMF0rL2csICIiKTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGdldE1hbmFnZXJNZW1iZXJTZWFyY2hWYWx1ZXMobWVtYmVyKSB7CiAgICAgICAgICBjb25zdCByb2xlVmFsdWUgPSBtZW1iZXI/LnJvbGUgfHwgInVzZXIiOwogICAgICAgICAgY29uc3Qgcm9sZUxhYmVsID0gTUFOQUdFUl9ST0xFX0xBQkVMU1tyb2xlVmFsdWVdIHx8IE1BTkFHRVJfUk9MRV9MQUJFTFMudXNlcjsKICAgICAgICAgIGNvbnN0IHJvbGVBbGlhc2VzID0gT2JqZWN0LmVudHJpZXMoTUFOQUdFUl9ST0xFX0FMSUFTRVMpCiAgICAgICAgICAgIC5maWx0ZXIoKFssIG5vcm1hbGl6ZWRSb2xlXSkgPT4gbm9ybWFsaXplZFJvbGUgPT09IHJvbGVWYWx1ZSkKICAgICAgICAgICAgLm1hcCgoW2FsaWFzXSkgPT4gYWxpYXMpOwogICAgICAg",
    "ICAgcmV0dXJuIFsKICAgICAgICAgICAgZ2V0TWFuYWdlck1lbWJlclJhd05pY2tuYW1lKG1lbWJlciksCiAgICAgICAgICAgIGdldE1hbmFnZXJNZW1iZXJOaWNrbmFtZShtZW1iZXIpLAogICAgICAgICAgICBtZW1iZXI/LmVtYWlsLAogICAgICAgICAgICBtZW1iZXI/LmF1dGgwX3N1YiwKICAgICAgICAgICAgcm9sZVZhbHVlLAogICAgICAgICAgICByb2xlTGFiZWwsCiAgICAgICAgICAgIC4uLnJvbGVBbGlhc2VzLAogICAgICAgICAgXTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGdldE1hbmFnZXJNZW1iZXJSZXZpZXdDb2luKG1lbWJlcikgewogICAgICAgICAgY29uc3QgdmFsdWUgPSBOdW1iZXIobWVtYmVyPy5yZXZpZXdDb2luID8/IG1lbWJlcj8ucmV2aWV3X2NvaW4gPz8gbWVtYmVyPy5kYXRhPy5yZXZpZXdDb2luID8/IDApOwogICAgICAgICAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSkgJiYgdmFsdWUgPj0gMCA/IE1hdGguZmxvb3IodmFsdWUpIDogMDsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGdldE1hbmFnZXJNZW1iZXJSZXZpZXdEYXlzKG1lbWJlcikgewogICAgICAgICAgY29uc3QgZGlyZWN0VmFsdWUgPSBOdW1iZXIobWVtYmVyPy5yZXZpZXdEYXlzID8/IG1lbWJlcj8ucmV2aWV3X2RheXMpOwogICAgICAgICAgaWYgKE51bWJlci5pc0Zpbml0ZShkaXJlY3RWYWx1ZSkgJiYgZGlyZWN0VmFsdWUgPj0gMCkgewogICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihkaXJlY3RWYWx1ZSk7CiAgICAgICAgICB9CiAgICAgICAgICBjb25zdCBsb2dpbkRheXMgPSBnZXRNYW5hZ2VyTWVtYmVyTG9naW5EYXlzKG1lbWJlcik7CiAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMobG9naW5EYXlzKS5sZW5ndGg7CiAgICAgICAgfQoKICAgICAg",
    "ICBmdW5jdGlvbiBnZXRNYW5hZ2VyTWVtYmVyTG9naW5EYXlzKG1lbWJlcikgewogICAgICAgICAgY29uc3QgY2FuZGlkYXRlcyA9IFsKICAgICAgICAgICAgbWVtYmVyPy5sb2dpbkRheXMsCiAgICAgICAgICAgIG1lbWJlcj8ubG9naW5fZGF5cywKICAgICAgICAgICAgbWVtYmVyPy5yZXZpZXdQZXJpb2Q/LmxvZ2luRGF5cywKICAgICAgICAgICAgbWVtYmVyPy5yZXZpZXdfcGVyaW9kPy5sb2dpbkRheXMsCiAgICAgICAgICAgIG1lbWJlcj8uZGF0YT8ubG9naW5EYXlzLAogICAgICAgICAgXTsKICAgICAgICAgIGNvbnN0IGZvdW5kID0gY2FuZGlkYXRlcy5maW5kKCh2YWx1ZSkgPT4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAib2JqZWN0IiAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSkpOwogICAgICAgICAgcmV0dXJuIGZvdW5kIHx8IHt9OwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gZ2V0TWFuYWdlck1lbWJlclVubGltaXRlZFJldmlld0NvaW5zKG1lbWJlcikgewogICAgICAgICAgcmV0dXJuIEJvb2xlYW4obWVtYmVyPy5oYXNVbmxpbWl0ZWRSZXZpZXdDb2lucyA/PyBtZW1iZXI/Lmhhc191bmxpbWl0ZWRfcmV2aWV3X2NvaW5zID8/IG1lbWJlcj8uZGF0YT8uaGFzVW5saW1pdGVkUmV2aWV3Q29pbnMpOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gZ2V0TWFuYWdlck1lbWJlckVtYWlsKG1lbWJlcikgewogICAgICAgICAgcmV0dXJuIFN0cmluZyhtZW1iZXI/LmVtYWlsID8/IG1lbWJlcj8uZGF0YT8uYXV0aD8uZW1haWwgPz8gIiIpOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gZ2V0TWFuYWdlck1lbWJlckVkdWNhdGlvbkNvZGVzKG1lbWJlcikgewogICAgICAgICAgY29uc3QgY2FuZGlkYXRlcyA9IFsKICAgICAgICAgICAgbWVtYmVyPy5lZHVjYXRp",
    "b25Db2RlcywKICAgICAgICAgICAgbWVtYmVyPy5lZHVjYXRpb25fY29kZXMsCiAgICAgICAgICAgIG1lbWJlcj8uc2V0dGluZ3M/LmVkdWNhdGlvbkNvZGVzLAogICAgICAgICAgICBtZW1iZXI/LmRhdGE/LnNldHRpbmdzPy5lZHVjYXRpb25Db2RlcywKICAgICAgICAgIF07CiAgICAgICAgICBjb25zdCBmb3VuZCA9IGNhbmRpZGF0ZXMuZmluZCgodmFsdWUpID0+IEFycmF5LmlzQXJyYXkodmFsdWUpKTsKICAgICAgICAgIHJldHVybiBmb3VuZCB8fCBbXTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGdldE1hbmFnZXJNZW1iZXJDb2xvclRoZW1lKG1lbWJlcikgewogICAgICAgICAgcmV0dXJuIFN0cmluZyhtZW1iZXI/LmNvbG9yVGhlbWUgPz8gbWVtYmVyPy5jb2xvcl90aGVtZSA/PyBtZW1iZXI/LnNldHRpbmdzPy50aGVtZSA/PyBtZW1iZXI/LmRhdGE/LnNldHRpbmdzPy50aGVtZSA/PyAiIik7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBnZXRNYW5hZ2VyTWVtYmVyU2V0dGluZ3MobWVtYmVyKSB7CiAgICAgICAgICByZXR1cm4gZ2V0UGxhaW5NYW5hZ2VyT2JqZWN0KG1lbWJlcj8uc2V0dGluZ3MgPz8gbWVtYmVyPy5kYXRhPy5zZXR0aW5ncyk7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBnZXRNYW5hZ2VyTWVtYmVyUmV2aWV3RGF0YShtZW1iZXIpIHsKICAgICAgICAgIHJldHVybiBnZXRQbGFpbk1hbmFnZXJPYmplY3QobWVtYmVyPy5yZXZpZXdEYXRhID8/IG1lbWJlcj8ucmV2aWV3X2RhdGEgPz8gbWVtYmVyPy5sZWFybmluZ1Byb2dyZXNzID8/IG1lbWJlcj8uZGF0YT8ubGVhcm5pbmdQcm9ncmVzcyk7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBnZXRQbGFpbk1hbmFnZXJPYmplY3QodmFsdWUpIHsKICAgICAgICAgIHJldHVybiB2YWx1ZSAm",
    "JiB0eXBlb2YgdmFsdWUgPT09ICJvYmplY3QiICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDoge307CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBzdHJpbmdpZnlNYW5hZ2VySnNvbih2YWx1ZSkgewogICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGdldFBsYWluTWFuYWdlck9iamVjdCh2YWx1ZSksIG51bGwsIDIpOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gc3RyaW5naWZ5TWFuYWdlckpzb25BcnJheSh2YWx1ZSkgewogICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbXSwgbnVsbCwgMik7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiByZWFkTWFuYWdlckpzb25GaWVsZChjYXJkLCBzZWxlY3RvciwgbGFiZWwpIHsKICAgICAgICAgIGNvbnN0IHJhdyA9IGNhcmQ/LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpPy52YWx1ZSB8fCAiIjsKICAgICAgICAgIGlmICghcmF3LnRyaW0oKSkgewogICAgICAgICAgICByZXR1cm4ge307CiAgICAgICAgICB9CiAgICAgICAgICB0cnkgewogICAgICAgICAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKHJhdyk7CiAgICAgICAgICAgIGlmICghcGFyc2VkIHx8IHR5cGVvZiBwYXJzZWQgIT09ICJvYmplY3QiIHx8IEFycmF5LmlzQXJyYXkocGFyc2VkKSkgewogICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigib2JqZWN0LXJlcXVpcmVkIik7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcmV0dXJuIHBhcnNlZDsKICAgICAgICAgIH0gY2F0Y2ggewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7bGFiZWx944GuSlNPTuOCkueiuuiqjeOBl+OBpuOBj+OBoOOBleOBhOOAgmApOwogICAgICAgICAgfQogICAgICAgIH0KCiAgICAg",
    "ICAgZnVuY3Rpb24gcmVhZE1hbmFnZXJKc29uQXJyYXlGaWVsZChjYXJkLCBzZWxlY3RvciwgbGFiZWwpIHsKICAgICAgICAgIGNvbnN0IHJhdyA9IGNhcmQ/LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpPy52YWx1ZSB8fCAiIjsKICAgICAgICAgIGlmICghcmF3LnRyaW0oKSkgewogICAgICAgICAgICByZXR1cm4gW107CiAgICAgICAgICB9CiAgICAgICAgICB0cnkgewogICAgICAgICAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKHJhdyk7CiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShwYXJzZWQpKSB7CiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJhcnJheS1yZXF1aXJlZCIpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHJldHVybiBwYXJzZWQubWFwKCh2YWx1ZSkgPT4gU3RyaW5nKHZhbHVlIHx8ICIiKS50cmltKCkpLmZpbHRlcihCb29sZWFuKTsKICAgICAgICAgIH0gY2F0Y2ggewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7bGFiZWx944GuSlNPTumFjeWIl+OCkueiuuiqjeOBl+OBpuOBj+OBoOOBleOBhOOAgmApOwogICAgICAgICAgfQogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gdG9nZ2xlTWFuYWdlck1lbWJlckRldGFpbChjYXJkKSB7CiAgICAgICAgICBjb25zdCBkZXRhaWwgPSBjYXJkPy5xdWVyeVNlbGVjdG9yKCJbZGF0YS1tYW5hZ2VyLW1lbWJlci1kZXRhaWxdIik7CiAgICAgICAgICBjb25zdCBidXR0b24gPSBjYXJkPy5xdWVyeVNlbGVjdG9yKCJbZGF0YS1tYW5hZ2VyLW1lbWJlci1kZXRhaWwtdG9nZ2xlXSIpOwogICAgICAgICAgaWYgKCFkZXRhaWwpIHsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQogICAgICAgICAgY29uc3Qgc2hvdWxkT3BlbiA9IGRldGFpbC5oaWRkZW47CiAgICAgICAgICBkZXRh",
    "aWwuaGlkZGVuID0gIXNob3VsZE9wZW47CiAgICAgICAgICBidXR0b24/LnNldEF0dHJpYnV0ZSgiYXJpYS1leHBhbmRlZCIsIFN0cmluZyhzaG91bGRPcGVuKSk7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBzeW5jTWFuYWdlck1lbWJlclJldmlld0NvaW5GaWVsZChjYXJkKSB7CiAgICAgICAgICBjb25zdCByb2xlID0gY2FyZD8ucXVlcnlTZWxlY3RvcigiW2RhdGEtbWFuYWdlci1tZW1iZXItcm9sZV0iKT8udmFsdWUgfHwgInVzZXIiOwogICAgICAgICAgY29uc3QgZmllbGQgPSBjYXJkPy5xdWVyeVNlbGVjdG9yKCIubWFuYWdlci1tZW1iZXItcmV2aWV3LWNvaW4tZmllbGQiKTsKICAgICAgICAgIGNvbnN0IGlucHV0ID0gY2FyZD8ucXVlcnlTZWxlY3RvcigiW2RhdGEtbWFuYWdlci1tZW1iZXItcmV2aWV3LWNvaW5dIik7CiAgICAgICAgICBpZiAoIWZpZWxkIHx8ICFpbnB1dCkgewogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CiAgICAgICAgICBjb25zdCBpc1VubGltaXRlZCA9IHJvbGUgIT09ICJ1c2VyIjsKICAgICAgICAgIGNvbnN0IHN0b3JlZFZhbHVlID0gaW5wdXQuZGF0YXNldC5yZXZpZXdDb2luVmFsdWUgfHwgU3RyaW5nKE51bWJlcihpbnB1dC52YWx1ZSkgfHwgMCk7CiAgICAgICAgICBpbnB1dC5kYXRhc2V0LnJldmlld0NvaW5WYWx1ZSA9IHN0b3JlZFZhbHVlOwogICAgICAgICAgZmllbGQuY2xhc3NMaXN0LnRvZ2dsZSgiaXMtdW5saW1pdGVkIiwgaXNVbmxpbWl0ZWQpOwogICAgICAgICAgaW5wdXQuZGlzYWJsZWQgPSBpc1VubGltaXRlZDsKICAgICAgICAgIGlucHV0LnR5cGUgPSBpc1VubGltaXRlZCA/ICJ0ZXh0IiA6ICJudW1iZXIiOwogICAgICAgICAgaW5wdXQuaW5wdXRNb2RlID0gaXNVbmxpbWl0ZWQgPyAidGV4dCIgOiAibnVtZXJp",
    "YyI7CiAgICAgICAgICBpbnB1dC52YWx1ZSA9IGlzVW5saW1pdGVkID8gIuKInuaemiIgOiBzdG9yZWRWYWx1ZTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGdldE1hbmFnZXJNZW1iZXJBdmF0ZXJTdGF0ZShtZW1iZXIpIHsKICAgICAgICAgIGNvbnN0IGF2YXRlciA9IFttZW1iZXI/LmF2YXRlciwgbWVtYmVyPy5hdmF0YXIsIG1lbWJlcj8uZGF0YT8uYXZhdGVyLCBtZW1iZXI/LmRhdGE/LmF2YXRhcl0uZmluZCgKICAgICAgICAgICAgKHZhbHVlKSA9PiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICJvYmplY3QiICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSwKICAgICAgICAgICkgfHwge307CiAgICAgICAgICBjb25zdCBlcXVpcHBlZCA9IFttZW1iZXI/LmVxdWlwcGVkQXZhdGVyLCBtZW1iZXI/LmVxdWlwcGVkX2F2YXRlciwgYXZhdGVyPy5lcXVpcHBlZF0uZmluZCgKICAgICAgICAgICAgKHZhbHVlKSA9PiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICJvYmplY3QiICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSwKICAgICAgICAgICkgfHwge307CiAgICAgICAgICBjb25zdCBpdGVtT2Zmc2V0cyA9IGF2YXRlcj8uaXRlbU9mZnNldHMgJiYgdHlwZW9mIGF2YXRlci5pdGVtT2Zmc2V0cyA9PT0gIm9iamVjdCIgPyBhdmF0ZXIuaXRlbU9mZnNldHMgOiB7fTsKICAgICAgICAgIHJldHVybiB7IGF2YXRlcjogeyAuLi5hdmF0ZXIsIGVxdWlwcGVkIH0sIGVxdWlwcGVkLCBpdGVtT2Zmc2V0cyB9OwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gcmVuZGVyTWFuYWdlck1lbWJlckF2YXRlclByZXZpZXdzKG1lbWJlcnMpIHsKICAgICAgICAgIGlmICghZWxlbWVudHMubWFuYWdlck1lbWJlcnNMaXN0KSB7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KICAgICAg",
    "ICAgIGNvbnN0IG1hbmFnZXJJdGVtcyA9IG5ldyBNYXAobG9hZE1hbmFnZXJBdmF0ZXJJdGVtcygpLm1hcCgoaXRlbSkgPT4gW2l0ZW0uaWQsIGl0ZW1dKSk7CiAgICAgICAgICBtZW1iZXJzLmZvckVhY2goKG1lbWJlcikgPT4gewogICAgICAgICAgICBjb25zdCBpZCA9IG1lbWJlcj8uaWQgfHwgIiI7CiAgICAgICAgICAgIGNvbnN0IHByZXZpZXcgPSBlbGVtZW50cy5tYW5hZ2VyTWVtYmVyc0xpc3QucXVlcnlTZWxlY3RvcigKICAgICAgICAgICAgICBgW2RhdGEtbWFuYWdlci1tZW1iZXItaWQ9IiR7Y3NzRXNjYXBlKGlkKX0iXSAubWFuYWdlci1tZW1iZXItYXZhdGFyYCwKICAgICAgICAgICAgKTsKICAgICAgICAgICAgaWYgKCFwcmV2aWV3KSB7CiAgICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGNvbnN0IHsgZXF1aXBwZWQsIGl0ZW1PZmZzZXRzIH0gPSBnZXRNYW5hZ2VyTWVtYmVyQXZhdGVyU3RhdGUobWVtYmVyKTsKICAgICAgICAgICAgcHJldmlldy5xdWVyeVNlbGVjdG9yQWxsKCIuYXZhdGVyLWxheWVyIikuZm9yRWFjaCgobGF5ZXIpID0+IGxheWVyLnJlbW92ZSgpKTsKICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMoZXF1aXBwZWQpLmZvckVhY2goKFtjYXRlZ29yeSwgaXRlbUlkXSkgPT4gewogICAgICAgICAgICAgIGNvbnN0IGl0ZW1JZFRleHQgPSBTdHJpbmcoaXRlbUlkIHx8ICIiKTsKICAgICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBNQU5BR0VSX0FWQVRFUl9JVEVNX0NMQVNTRVNbaXRlbUlkVGV4dF0gfHwgKGl0ZW1JZFRleHQuc3RhcnRzV2l0aCgiY3VzdG9tLSIpID8gImF2YXRlci1pdGVtLWN1c3RvbSIgOiAiIik7CiAgICAgICAgICAgICAgaWYgKCFjbGFzc05hbWUpIHsKICAgICAgICAgICAgICAgIHJldHVybjsK",
    "ICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgY29uc3QgbWFuYWdlckl0ZW0gPSBtYW5hZ2VySXRlbXMuZ2V0KGl0ZW1JZFRleHQpOwogICAgICAgICAgICAgIGNvbnN0IGltYWdlID0gZ2V0TWFuYWdlckF2YXRlckl0ZW1JbWFnZShtYW5hZ2VySXRlbSk7CiAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gaXRlbU9mZnNldHNbaXRlbUlkVGV4dF0gfHwge307CiAgICAgICAgICAgICAgY29uc3QgbGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJzcGFuIik7CiAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NOYW1lID0gYGF2YXRlci1sYXllciAke2NsYXNzTmFtZX0gYXZhdGVyLWNhdGVnb3J5LSR7Y2F0ZWdvcnl9JHtpbWFnZSA/ICIgaGFzLWN1c3RvbS1pbWFnZSIgOiAiIn1gOwogICAgICAgICAgICAgIGxheWVyLnN0eWxlLnNldFByb3BlcnR5KCItLWF2YXRlci1pdGVtLW9mZnNldC14IiwgYCR7TnVtYmVyKG9mZnNldC54KSB8fCAwfXB4YCk7CiAgICAgICAgICAgICAgbGF5ZXIuc3R5bGUuc2V0UHJvcGVydHkoIi0tYXZhdGVyLWl0ZW0tb2Zmc2V0LXkiLCBgJHtOdW1iZXIob2Zmc2V0LnkpIHx8IDB9cHhgKTsKICAgICAgICAgICAgICBsYXllci5zZXRBdHRyaWJ1dGUoImFyaWEtaGlkZGVuIiwgInRydWUiKTsKICAgICAgICAgICAgICBpZiAoaW1hZ2UpIHsKICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImltZyIpOwogICAgICAgICAgICAgICAgaW1hZ2VFbGVtZW50LnNyYyA9IGltYWdlLmRhdGFVcmw7CiAgICAgICAgICAgICAgICBpbWFnZUVsZW1lbnQuYWx0ID0gIiI7CiAgICAgICAgICAgICAgICBsYXllci5hcHBlbmQoaW1hZ2VFbGVtZW50KTsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgcHJl",
    "dmlldy5hcHBlbmQobGF5ZXIpOwogICAgICAgICAgICB9KTsKICAgICAgICAgIH0pOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gbG9va3NMaWtlQXV0aDBTdWJqZWN0KHZhbHVlKSB7CiAgICAgICAgICByZXR1cm4gL15bYS16MC05Xy1dK1x8L2kudGVzdChTdHJpbmcodmFsdWUgfHwgIiIpLnRyaW0oKSk7CiAgICAgICAgfQoKICAgICAgICBhc3luYyBmdW5jdGlvbiBzYXZlTWFuYWdlck1lbWJlckFjY2VzcyhtZW1iZXJJZCkgewogICAgICAgICAgaWYgKCFtZW1iZXJJZCB8fCAhY2FuTWFuYWdlTWFuYWdlck1lbWJlcnMoKSkgewogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CgogICAgICAgICAgY29uc3QgY2FyZCA9IEFycmF5LmZyb20oZWxlbWVudHMubWFuYWdlck1lbWJlcnNMaXN0Py5xdWVyeVNlbGVjdG9yQWxsKCJbZGF0YS1tYW5hZ2VyLW1lbWJlci1pZF0iKSB8fCBbXSkuZmluZCgKICAgICAgICAgICAgKGl0ZW0pID0+IGl0ZW0uZGF0YXNldC5tYW5hZ2VyTWVtYmVySWQgPT09IG1lbWJlcklkCiAgICAgICAgICApOwogICAgICAgICAgY29uc3Qgcm9sZSA9IGNhcmQ/LnF1ZXJ5U2VsZWN0b3IoIltkYXRhLW1hbmFnZXItbWVtYmVyLXJvbGVdIik/LnZhbHVlIHx8ICJ1c2VyIjsKICAgICAgICAgIGNvbnN0IHJldmlld0NvaW5JbnB1dCA9IGNhcmQ/LnF1ZXJ5U2VsZWN0b3IoIltkYXRhLW1hbmFnZXItbWVtYmVyLXJldmlldy1jb2luXSIpOwogICAgICAgICAgY29uc3QgcmV2aWV3Q29pbiA9IE51bWJlcihyZXZpZXdDb2luSW5wdXQ/LmRhdGFzZXQucmV2aWV3Q29pblZhbHVlIHx8IHJldmlld0NvaW5JbnB1dD8udmFsdWUgfHwgMCk7CiAgICAgICAgICBjb25zdCByZXZpZXdEYXlzID0gTnVtYmVyKGNhcmQ/LnF1ZXJ5U2VsZWN0b3IoIltkYXRhLW1hbmFnZXIt",
    "bWVtYmVyLXJldmlldy1kYXlzXSIpPy52YWx1ZSB8fCAwKTsKICAgICAgICAgIGNvbnN0IG5pY2tuYW1lID0gY2FyZD8ucXVlcnlTZWxlY3RvcigiW2RhdGEtbWFuYWdlci1tZW1iZXItbmlja25hbWVdIik/LnZhbHVlLnRyaW0oKSB8fCAiIjsKICAgICAgICAgIGNvbnN0IGVtYWlsID0gY2FyZD8ucXVlcnlTZWxlY3RvcigiW2RhdGEtbWFuYWdlci1tZW1iZXItZW1haWxdIik/LnZhbHVlLnRyaW0oKSB8fCAiIjsKICAgICAgICAgIGNvbnN0IHNhdmVCdXR0b24gPSBjYXJkPy5xdWVyeVNlbGVjdG9yKCJbZGF0YS1tYW5hZ2VyLW1lbWJlci1zYXZlXSIpOwogICAgICAgICAgaWYgKHNhdmVCdXR0b24pIHsKICAgICAgICAgICAgc2F2ZUJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7CiAgICAgICAgICB9CiAgICAgICAgICBlbGVtZW50cy5tYW5hZ2VyTWVtYmVyc1N0YXR1cy50ZXh0Q29udGVudCA9ICLkv53lrZjkuK3jgafjgZnjgIIiOwoKICAgICAgICAgIGxldCBzZXR0aW5nczsKICAgICAgICAgIGxldCBhdmF0ZXI7CiAgICAgICAgICBsZXQgcmV2aWV3RGF0YTsKICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgIHNldHRpbmdzID0gcmVhZE1hbmFnZXJKc29uRmllbGQoY2FyZCwgIltkYXRhLW1hbmFnZXItbWVtYmVyLXNldHRpbmdzLWpzb25dIiwgIuioreWumiIpOwogICAgICAgICAgICBhdmF0ZXIgPSByZWFkTWFuYWdlckpzb25GaWVsZChjYXJkLCAiW2RhdGEtbWFuYWdlci1tZW1iZXItYXZhdGVyLWpzb25dIiwgIkF2YXRlciIpOwogICAgICAgICAgICByZXZpZXdEYXRhID0gcmVhZE1hbmFnZXJKc29uRmllbGQoY2FyZCwgIltkYXRhLW1hbmFnZXItbWVtYmVyLXJldmlldy1kYXRhLWpzb25dIiwgIlJldmlldyBEYXRhIik7CiAgICAgICAgICB9IGNhdGNoIChlcnJvcikgewogICAgICAg",
    "ICAgICBlbGVtZW50cy5tYW5hZ2VyTWVtYmVyc1N0YXR1cy50ZXh0Q29udGVudCA9IGVycm9yPy5tZXNzYWdlIHx8ICJKU09O44KS56K66KqN44GX44Gm44GP44Gg44GV44GE44CCIjsKICAgICAgICAgICAgaWYgKHNhdmVCdXR0b24pIHsKICAgICAgICAgICAgICBzYXZlQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQoKICAgICAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgZ2V0QXV0aDBBY2Nlc3NUb2tlbigpOwogICAgICAgICAgaWYgKCF0b2tlbikgewogICAgICAgICAgICBlbGVtZW50cy5tYW5hZ2VyTWVtYmVyc1N0YXR1cy50ZXh0Q29udGVudCA9ICLjg63jgrDjgqTjg7Pmg4XloLHjgpLnorroqo3jgafjgY3jgb7jgZvjgpPjgafjgZfjgZ/jgIIiOwogICAgICAgICAgICBpZiAoc2F2ZUJ1dHRvbikgewogICAgICAgICAgICAgIHNhdmVCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTsKICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CgogICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtyZXNvbHZlQXBpQmFzZSgpfS9tYW5hZ2VyL21lbWJlcnMvJHtlbmNvZGVVUklDb21wb25lbnQobWVtYmVySWQpfWAsIHsKICAgICAgICAgICAgICBtZXRob2Q6ICJQQVRDSCIsCiAgICAgICAgICAgICAgaGVhZGVyczogewogICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsCiAgICAgICAgICAgICAgICAiQ29udGVudC1UeXBlIjogImFwcGxpY2F0aW9uL2pzb24iLAogICAgICAgICAgICAgICAgQWNjZXB0OiAiYXBwbGljYXRpb24vanNvbiIsCiAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgICBi",
    "b2R5OiBKU09OLnN0cmluZ2lmeSh7CiAgICAgICAgICAgICAgICByb2xlLAogICAgICAgICAgICAgICAgbmlja25hbWUsCiAgICAgICAgICAgICAgICByZXZpZXdDb2luOiBOdW1iZXIuaXNGaW5pdGUocmV2aWV3Q29pbikgJiYgcmV2aWV3Q29pbiA+PSAwID8gTWF0aC5mbG9vcihyZXZpZXdDb2luKSA6IDAsCiAgICAgICAgICAgICAgICBoYXNVbmxpbWl0ZWRSZXZpZXdDb2luczogcm9sZSAhPT0gInVzZXIiLAogICAgICAgICAgICAgICAgcmV2aWV3RGF5czogTnVtYmVyLmlzRmluaXRlKHJldmlld0RheXMpICYmIHJldmlld0RheXMgPj0gMCA/IE1hdGguZmxvb3IocmV2aWV3RGF5cykgOiAwLAogICAgICAgICAgICAgICAgZW1haWwsCiAgICAgICAgICAgICAgICBzZXR0aW5ncywKICAgICAgICAgICAgICAgIGF2YXRlciwKICAgICAgICAgICAgICAgIHJldmlld0RhdGEsCiAgICAgICAgICAgICAgfSksCiAgICAgICAgICAgIH0pOwogICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7CiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBUEkgJHtyZXNwb25zZS5zdGF0dXN9YCk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgY29uc3QgdXBkYXRlZCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTsKICAgICAgICAgICAgc3RhdGUubWFuYWdlck1lbWJlcnMgPSBzdGF0ZS5tYW5hZ2VyTWVtYmVycy5tYXAoKG1lbWJlcikgPT4gKG1lbWJlci5pZCA9PT0gbWVtYmVySWQgPyB1cGRhdGVkIDogbWVtYmVyKSk7CiAgICAgICAgICAgIGVsZW1lbnRzLm1hbmFnZXJNZW1iZXJzU3RhdHVzLnRleHRDb250ZW50ID0gIuS/neWtmOOBl+OBvuOBl+OBn+OAgiI7CiAgICAgICAgICAgIHJlbmRlck1hbmFnZXJNZW1iZXJzKCk7CiAgICAgICAgICB9IGNhdGNoIHsKICAgICAgICAgICAgZWxlbWVu",
    "dHMubWFuYWdlck1lbWJlcnNTdGF0dXMudGV4dENvbnRlbnQgPSAi5L+d5a2Y44Gn44GN44G+44Gb44KT44Gn44GX44Gf44CCIjsKICAgICAgICAgICAgaWYgKHNhdmVCdXR0b24pIHsKICAgICAgICAgICAgICBzYXZlQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7CiAgICAgICAgICAgIH0KICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHJlcXVlc3RNYW5hZ2VyTWVtYmVyQWN0aW9uKGFjdGlvbiwgbWVtYmVySWQpIHsKICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRBY3Rpb24gPSBhY3Rpb24gPT09ICJkZWxldGUiID8gImRlbGV0ZSIgOiBhY3Rpb24gPT09ICJsb2dvdXQiID8gImxvZ291dCIgOiAiIjsKICAgICAgICAgIGlmICghbm9ybWFsaXplZEFjdGlvbiB8fCAhbWVtYmVySWQgfHwgIWNhbk1hbmFnZU1hbmFnZXJNZW1iZXJzKCkpIHsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQogICAgICAgICAgY29uc3QgbWVtYmVyID0gc3RhdGUubWFuYWdlck1lbWJlcnMuZmluZCgoaXRlbSkgPT4gaXRlbT8uaWQgPT09IG1lbWJlcklkKTsKICAgICAgICAgIGNvbnN0IG5hbWUgPSBnZXRNYW5hZ2VyTWVtYmVyTmlja25hbWUobWVtYmVyKTsKICAgICAgICAgIGNvbnN0IGNvcHkgPQogICAgICAgICAgICBub3JtYWxpemVkQWN0aW9uID09PSAiZGVsZXRlIgogICAgICAgICAgICAgID8gewogICAgICAgICAgICAgICAgICB0aXRsZTogIuODpuODvOOCtuODvOOCkuWJiumZpOOBmeOCiyIsCiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGAke25hbWV944KSU3VwYWJhc2XjgYvjgonliYrpmaTjgZfjgb7jgZnjgILjgojjgo3jgZfjgYTjgafjgZnjgYvvvJ9gLAogICAgICAgICAgICAgICAgICBjb25maXJtVGV4dDogIuWJiumZpOOBmeOCiyIsCiAgICAgICAgICAg",
    "ICAgICAgIGNvbmZpcm1DbGFzczogImRhbmdlciIsCiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgOiB7CiAgICAgICAgICAgICAgICAgIHRpdGxlOiAi44Ot44Kw44Ki44Km44OIIiwKICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYCR7bmFtZX3jgpLjg63jgrDjgqLjgqbjg4jnirbmhYvjgavjgZfjgb7jgZnjgILjgojjgo3jgZfjgYTjgafjgZnjgYvvvJ9gLAogICAgICAgICAgICAgICAgICBjb25maXJtVGV4dDogIuODreOCsOOCouOCpuODiCIsCiAgICAgICAgICAgICAgICAgIGNvbmZpcm1DbGFzczogInByaW1hcnkiLAogICAgICAgICAgICAgICAgfTsKICAgICAgICAgIHN0YXRlLnBlbmRpbmdNYW5hZ2VyTWVtYmVyQWN0aW9uID0geyBhY3Rpb246IG5vcm1hbGl6ZWRBY3Rpb24sIG1lbWJlcklkIH07CiAgICAgICAgICBpZiAoIWVsZW1lbnRzLm1hbmFnZXJNZW1iZXJBY3Rpb25EaWFsb2cgfHwgdHlwZW9mIGVsZW1lbnRzLm1hbmFnZXJNZW1iZXJBY3Rpb25EaWFsb2cuc2hvd01vZGFsICE9PSAiZnVuY3Rpb24iKSB7CiAgICAgICAgICAgIGlmICh3aW5kb3cuY29uZmlybShjb3B5Lm1lc3NhZ2UpKSB7CiAgICAgICAgICAgICAgdm9pZCBwZXJmb3JtTWFuYWdlck1lbWJlckFjdGlvbihub3JtYWxpemVkQWN0aW9uLCBtZW1iZXJJZCk7CiAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgc3RhdGUucGVuZGluZ01hbmFnZXJNZW1iZXJBY3Rpb24gPSBudWxsOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KICAgICAgICAgIGlmIChlbGVtZW50cy5tYW5hZ2VyTWVtYmVyQWN0aW9uRGlhbG9nVGl0bGUpIHsKICAgICAgICAgICAgZWxlbWVudHMubWFuYWdlck1lbWJlckFjdGlvbkRpYWxvZ1RpdGxlLnRleHRDb250ZW50ID0g",
    "Y29weS50aXRsZTsKICAgICAgICAgIH0KICAgICAgICAgIGlmIChlbGVtZW50cy5tYW5hZ2VyTWVtYmVyQWN0aW9uRGlhbG9nTWVzc2FnZSkgewogICAgICAgICAgICBlbGVtZW50cy5tYW5hZ2VyTWVtYmVyQWN0aW9uRGlhbG9nTWVzc2FnZS50ZXh0Q29udGVudCA9IGNvcHkubWVzc2FnZTsKICAgICAgICAgIH0KICAgICAgICAgIGlmIChlbGVtZW50cy5tYW5hZ2VyTWVtYmVyQWN0aW9uQ29uZmlybUJ0bikgewogICAgICAgICAgICBlbGVtZW50cy5tYW5hZ2VyTWVtYmVyQWN0aW9uQ29uZmlybUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCJwcmltYXJ5IiwgImRhbmdlciIpOwogICAgICAgICAgICBlbGVtZW50cy5tYW5hZ2VyTWVtYmVyQWN0aW9uQ29uZmlybUJ0bi5jbGFzc0xpc3QuYWRkKGNvcHkuY29uZmlybUNsYXNzKTsKICAgICAgICAgICAgZWxlbWVudHMubWFuYWdlck1lbWJlckFjdGlvbkNvbmZpcm1CdG4udGV4dENvbnRlbnQgPSBjb3B5LmNvbmZpcm1UZXh0OwogICAgICAgICAgfQogICAgICAgICAgaWYgKCFlbGVtZW50cy5tYW5hZ2VyTWVtYmVyQWN0aW9uRGlhbG9nLm9wZW4pIHsKICAgICAgICAgICAgZWxlbWVudHMubWFuYWdlck1lbWJlckFjdGlvbkRpYWxvZy5zaG93TW9kYWwoKTsKICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGhhbmRsZU1hbmFnZXJNZW1iZXJBY3Rpb25EaWFsb2coYWN0aW9uKSB7CiAgICAgICAgICBjb25zdCBub3JtYWxpemVkQWN0aW9uID0gdHlwZW9mIGFjdGlvbiA9PT0gInN0cmluZyIgPyBhY3Rpb24udHJpbSgpLnRvTG93ZXJDYXNlKCkgOiAiIjsKICAgICAgICAgIGlmIChub3JtYWxpemVkQWN0aW9uID09PSAiY2FuY2VsIikgewogICAgICAgICAgICBzdGF0ZS5wZW5kaW5nTWFuYWdlck1lbWJlckFjdGlvbiA9IG51bGw7",
    "CiAgICAgICAgICAgIGNsb3NlTWFuYWdlck1lbWJlckFjdGlvbkRpYWxvZygpOwogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CiAgICAgICAgICBpZiAobm9ybWFsaXplZEFjdGlvbiAhPT0gImNvbmZpcm0iKSB7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KICAgICAgICAgIGNvbnN0IHBlbmRpbmdBY3Rpb24gPSBzdGF0ZS5wZW5kaW5nTWFuYWdlck1lbWJlckFjdGlvbjsKICAgICAgICAgIHN0YXRlLnBlbmRpbmdNYW5hZ2VyTWVtYmVyQWN0aW9uID0gbnVsbDsKICAgICAgICAgIGNsb3NlTWFuYWdlck1lbWJlckFjdGlvbkRpYWxvZygpOwogICAgICAgICAgdm9pZCBwZXJmb3JtTWFuYWdlck1lbWJlckFjdGlvbihwZW5kaW5nQWN0aW9uPy5hY3Rpb24sIHBlbmRpbmdBY3Rpb24/Lm1lbWJlcklkKTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGNsb3NlTWFuYWdlck1lbWJlckFjdGlvbkRpYWxvZygpIHsKICAgICAgICAgIGlmIChlbGVtZW50cy5tYW5hZ2VyTWVtYmVyQWN0aW9uRGlhbG9nPy5vcGVuKSB7CiAgICAgICAgICAgIGVsZW1lbnRzLm1hbmFnZXJNZW1iZXJBY3Rpb25EaWFsb2cuY2xvc2UoKTsKICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIGFzeW5jIGZ1bmN0aW9uIHBlcmZvcm1NYW5hZ2VyTWVtYmVyQWN0aW9uKGFjdGlvbiwgbWVtYmVySWQpIHsKICAgICAgICAgIGlmIChhY3Rpb24gPT09ICJsb2dvdXQiKSB7CiAgICAgICAgICAgIGF3YWl0IGxvZ291dE1hbmFnZXJNZW1iZXIobWVtYmVySWQpOwogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CiAgICAgICAgICBpZiAoYWN0aW9uID09PSAiZGVsZXRlIikgewogICAgICAgICAgICBhd2FpdCBkZWxldGVNYW5hZ2VyTWVtYmVyKG1lbWJlcklkKTsKICAgICAgICAgIH0KICAg",
    "ICAgICB9CgogICAgICAgIGFzeW5jIGZ1bmN0aW9uIGxvZ291dE1hbmFnZXJNZW1iZXIobWVtYmVySWQpIHsKICAgICAgICAgIGlmICghbWVtYmVySWQgfHwgIWNhbk1hbmFnZU1hbmFnZXJNZW1iZXJzKCkpIHsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQogICAgICAgICAgY29uc3QgY2FyZCA9IEFycmF5LmZyb20oZWxlbWVudHMubWFuYWdlck1lbWJlcnNMaXN0Py5xdWVyeVNlbGVjdG9yQWxsKCJbZGF0YS1tYW5hZ2VyLW1lbWJlci1pZF0iKSB8fCBbXSkuZmluZCgKICAgICAgICAgICAgKGl0ZW0pID0+IGl0ZW0uZGF0YXNldC5tYW5hZ2VyTWVtYmVySWQgPT09IG1lbWJlcklkCiAgICAgICAgICApOwogICAgICAgICAgc2V0TWFuYWdlck1lbWJlckFjdGlvbkJ1dHRvbnNEaXNhYmxlZChjYXJkLCB0cnVlKTsKICAgICAgICAgIGVsZW1lbnRzLm1hbmFnZXJNZW1iZXJzU3RhdHVzLnRleHRDb250ZW50ID0gIuODreOCsOOCouOCpuODiOOCkuWPjeaYoOOBl+OBpuOBhOOBvuOBmeOAgiI7CiAgICAgICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdldEF1dGgwQWNjZXNzVG9rZW4oKTsKICAgICAgICAgIGlmICghdG9rZW4pIHsKICAgICAgICAgICAgZWxlbWVudHMubWFuYWdlck1lbWJlcnNTdGF0dXMudGV4dENvbnRlbnQgPSAi44Ot44Kw44Kk44Oz5oOF5aCx44KS56K66KqN44Gn44GN44G+44Gb44KT44Gn44GX44Gf44CCIjsKICAgICAgICAgICAgc2V0TWFuYWdlck1lbWJlckFjdGlvbkJ1dHRvbnNEaXNhYmxlZChjYXJkLCBmYWxzZSk7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7cmVzb2x2ZUFwaUJhc2UoKX0vbWFuYWdlci9tZW1iZXJzLyR7ZW5jb2Rl",
    "VVJJQ29tcG9uZW50KG1lbWJlcklkKX1gLCB7CiAgICAgICAgICAgICAgbWV0aG9kOiAiUEFUQ0giLAogICAgICAgICAgICAgIGhlYWRlcnM6IHsKICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLAogICAgICAgICAgICAgICAgIkNvbnRlbnQtVHlwZSI6ICJhcHBsaWNhdGlvbi9qc29uIiwKICAgICAgICAgICAgICAgIEFjY2VwdDogImFwcGxpY2F0aW9uL2pzb24iLAogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBsb2dpblN0YXR1czogImxvZ2dlZF9vdXQiIH0pLAogICAgICAgICAgICB9KTsKICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykgewogICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQVBJICR7cmVzcG9uc2Uuc3RhdHVzfWApOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7CiAgICAgICAgICAgIHN0YXRlLm1hbmFnZXJNZW1iZXJzID0gc3RhdGUubWFuYWdlck1lbWJlcnMubWFwKChtZW1iZXIpID0+IChtZW1iZXIuaWQgPT09IG1lbWJlcklkID8gdXBkYXRlZCA6IG1lbWJlcikpOwogICAgICAgICAgICBlbGVtZW50cy5tYW5hZ2VyTWVtYmVyc1N0YXR1cy50ZXh0Q29udGVudCA9ICLjg63jgrDjgqLjgqbjg4jjgpLlj43mmKDjgZfjgb7jgZfjgZ/jgIIiOwogICAgICAgICAgICByZW5kZXJNYW5hZ2VyTWVtYmVycygpOwogICAgICAgICAgfSBjYXRjaCB7CiAgICAgICAgICAgIGVsZW1lbnRzLm1hbmFnZXJNZW1iZXJzU3RhdHVzLnRleHRDb250ZW50ID0gIuODreOCsOOCouOCpuODiOOCkuWPjeaYoOOBp+OBjeOBvuOBm+OCk+OBp+OBl+OBn+OAgiI7CiAgICAgICAgICAgIHNldE1hbmFnZXJNZW1iZXJBY3Rp",
    "b25CdXR0b25zRGlzYWJsZWQoY2FyZCwgZmFsc2UpOwogICAgICAgICAgfQogICAgICAgIH0KCiAgICAgICAgYXN5bmMgZnVuY3Rpb24gZGVsZXRlTWFuYWdlck1lbWJlcihtZW1iZXJJZCkgewogICAgICAgICAgaWYgKCFtZW1iZXJJZCB8fCAhY2FuTWFuYWdlTWFuYWdlck1lbWJlcnMoKSkgewogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CiAgICAgICAgICBjb25zdCBjYXJkID0gQXJyYXkuZnJvbShlbGVtZW50cy5tYW5hZ2VyTWVtYmVyc0xpc3Q/LnF1ZXJ5U2VsZWN0b3JBbGwoIltkYXRhLW1hbmFnZXItbWVtYmVyLWlkXSIpIHx8IFtdKS5maW5kKAogICAgICAgICAgICAoaXRlbSkgPT4gaXRlbS5kYXRhc2V0Lm1hbmFnZXJNZW1iZXJJZCA9PT0gbWVtYmVySWQKICAgICAgICAgICk7CiAgICAgICAgICBzZXRNYW5hZ2VyTWVtYmVyQWN0aW9uQnV0dG9uc0Rpc2FibGVkKGNhcmQsIHRydWUpOwogICAgICAgICAgZWxlbWVudHMubWFuYWdlck1lbWJlcnNTdGF0dXMudGV4dENvbnRlbnQgPSAi5YmK6Zmk44GX44Gm44GE44G+44GZ44CCIjsKICAgICAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgZ2V0QXV0aDBBY2Nlc3NUb2tlbigpOwogICAgICAgICAgaWYgKCF0b2tlbikgewogICAgICAgICAgICBlbGVtZW50cy5tYW5hZ2VyTWVtYmVyc1N0YXR1cy50ZXh0Q29udGVudCA9ICLjg63jgrDjgqTjg7Pmg4XloLHjgpLnorroqo3jgafjgY3jgb7jgZvjgpPjgafjgZfjgZ/jgIIiOwogICAgICAgICAgICBzZXRNYW5hZ2VyTWVtYmVyQWN0aW9uQnV0dG9uc0Rpc2FibGVkKGNhcmQsIGZhbHNlKTsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQogICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtyZXNvbHZlQXBpQmFz",
    "ZSgpfS9tYW5hZ2VyL21lbWJlcnMvJHtlbmNvZGVVUklDb21wb25lbnQobWVtYmVySWQpfWAsIHsKICAgICAgICAgICAgICBtZXRob2Q6ICJERUxFVEUiLAogICAgICAgICAgICAgIGhlYWRlcnM6IHsKICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLAogICAgICAgICAgICAgICAgQWNjZXB0OiAiYXBwbGljYXRpb24vanNvbiIsCiAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgfSk7CiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHsKICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFQSSAke3Jlc3BvbnNlLnN0YXR1c31gKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBzdGF0ZS5tYW5hZ2VyTWVtYmVycyA9IHN0YXRlLm1hbmFnZXJNZW1iZXJzLmZpbHRlcigoaXRlbSkgPT4gaXRlbT8uaWQgIT09IG1lbWJlcklkKTsKICAgICAgICAgICAgZWxlbWVudHMubWFuYWdlck1lbWJlcnNTdGF0dXMudGV4dENvbnRlbnQgPSAi5YmK6Zmk44GX44G+44GX44Gf44CCIjsKICAgICAgICAgICAgcmVuZGVyTWFuYWdlck1lbWJlcnMoKTsKICAgICAgICAgIH0gY2F0Y2ggewogICAgICAgICAgICBlbGVtZW50cy5tYW5hZ2VyTWVtYmVyc1N0YXR1cy50ZXh0Q29udGVudCA9ICLliYrpmaTjgafjgY3jgb7jgZvjgpPjgafjgZfjgZ/jgIIiOwogICAgICAgICAgICBzZXRNYW5hZ2VyTWVtYmVyQWN0aW9uQnV0dG9uc0Rpc2FibGVkKGNhcmQsIGZhbHNlKTsKICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHNldE1hbmFnZXJNZW1iZXJBY3Rpb25CdXR0b25zRGlzYWJsZWQoY2FyZCwgZGlzYWJsZWQpIHsKICAgICAgICAgIGNhcmQ/LnF1ZXJ5U2VsZWN0b3JBbGwoIltkYXRhLW1hbmFnZXItbWVtYmVyLXNhdmVdLCBbZGF0YS1t",
    "YW5hZ2VyLW1lbWJlci1sb2dvdXRdLCBbZGF0YS1tYW5hZ2VyLW1lbWJlci1kZWxldGVdIikuZm9yRWFjaCgoYnV0dG9uKSA9PiB7CiAgICAgICAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9IEJvb2xlYW4oZGlzYWJsZWQpOwogICAgICAgICAgfSk7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBzd2l0Y2hTY3JlZW4oc2NyZWVuTmFtZSkgewogICAgICAgICAgc3RhdGUuYWN0aXZlU2NyZWVuID0gc2NyZWVuTmFtZTsKICAgICAgICAgIGVsZW1lbnRzLnNjcmVlbnMuZm9yRWFjaCgoc2NyZWVuKSA9PiB7CiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gc2NyZWVuLmlkID09PSBgc2NyZWVuLSR7c2NyZWVuTmFtZX1gOwogICAgICAgICAgICBzY3JlZW4uY2xhc3NMaXN0LnRvZ2dsZSgiaXMtYWN0aXZlIiwgaXNBY3RpdmUpOwogICAgICAgICAgICBzY3JlZW4uaGlkZGVuID0gIWlzQWN0aXZlOwogICAgICAgICAgfSk7CiAgICAgICAgICBlbGVtZW50cy5uYXZCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4gewogICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgiaXMtYWN0aXZlIiwgYnV0dG9uLmRhdGFzZXQuc2NyZWVuID09PSBzY3JlZW5OYW1lKTsKICAgICAgICAgIH0pOwogICAgICAgICAgaWYgKHNjcmVlbk5hbWUgPT09ICJtZW1iZXJzIikgewogICAgICAgICAgICB2b2lkIGxvYWRNYW5hZ2VyTWVtYmVycygpOwogICAgICAgICAgfQogICAgICAgICAgbm90aWZ5TWFuYWdlclNjcmVlbkNoYW5nZShzY3JlZW5OYW1lKTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIG5vdGlmeU1hbmFnZXJTY3JlZW5DaGFuZ2Uoc2NyZWVuTmFtZSkgewogICAgICAgICAgY29uc3Qgbm9ybWFsaXplZFNjcmVlbiA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2Fs",
    "bChNQU5BR0VSX1NDUkVFTl9USVRMRVMsIHNjcmVlbk5hbWUpID8gc2NyZWVuTmFtZSA6ICJob21lIjsKICAgICAgICAgIGNvbnN0IHRpdGxlID0gTUFOQUdFUl9TQ1JFRU5fVElUTEVTW25vcm1hbGl6ZWRTY3JlZW5dOwogICAgICAgICAgY29uc3QgaG9zdFRpdGxlID0gd2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIiNzY3JlZW4tbWFuYWdlciA+IC5wYWdlLXRpdGxlLXJvdyAucGFnZS1zY3JpcHQtdGl0bGUiKTsKICAgICAgICAgIGlmIChob3N0VGl0bGUpIHsKICAgICAgICAgICAgaG9zdFRpdGxlLnRleHRDb250ZW50ID0gdGl0bGU7CiAgICAgICAgICB9CiAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudCgKICAgICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCJ0aGUtcmV2aWV3LW1hbmFnZXItc2NyZWVuLWNoYW5nZSIsIHsKICAgICAgICAgICAgICBkZXRhaWw6IHsKICAgICAgICAgICAgICAgIHNjcmVlbjogbm9ybWFsaXplZFNjcmVlbiwKICAgICAgICAgICAgICAgIHRpdGxlLAogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgIH0pCiAgICAgICAgICApOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gaW5pdGlhbGl6ZVB1Ymxpc2hlZEZpbHRlcnMoKSB7CiAgICAgICAgICBjb25zdCBiaW5kZXJzID0gT2JqZWN0LmtleXMoTk9URV9CWV9CSU5ERVIpOwogICAgICAgICAgaWYgKCFlbGVtZW50cy5wdWJsaXNoZWRCaW5kZXJTZWxlY3QgfHwgIWVsZW1lbnRzLnB1Ymxpc2hlZE5vdGVNZW51KSB7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KCiAgICAgICAgICBzdGF0ZS5zZWxlY3RlZExpc3RCaW5kZXIgPSBzdGF0ZS5zZWxlY3RlZExpc3RCaW5kZXIgfHwgYmluZGVyc1swXSB8fCAiIjsKICAgICAgICAgIGVsZW1lbnRzLnB1Ymxpc2hlZEJpbmRlclNl",
    "bGVjdC5pbm5lckhUTUwgPSBiaW5kZXJzCiAgICAgICAgICAgIC5tYXAoKGJpbmRlcikgPT4gYDxvcHRpb24gdmFsdWU9IiR7ZXNjYXBlSHRtbChiaW5kZXIpfSI+JHtlc2NhcGVIdG1sKGJpbmRlcil9PC9vcHRpb24+YCkKICAgICAgICAgICAgLmpvaW4oIiIpOwogICAgICAgICAgZWxlbWVudHMucHVibGlzaGVkQmluZGVyU2VsZWN0LnZhbHVlID0gc3RhdGUuc2VsZWN0ZWRMaXN0QmluZGVyOwoKICAgICAgICAgIGVsZW1lbnRzLnB1Ymxpc2hlZEJpbmRlclNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCJjaGFuZ2UiLCAoKSA9PiB7CiAgICAgICAgICAgIHN0YXRlLnNlbGVjdGVkTGlzdEJpbmRlciA9IGVsZW1lbnRzLnB1Ymxpc2hlZEJpbmRlclNlbGVjdC52YWx1ZTsKICAgICAgICAgICAgc3RhdGUuc2VsZWN0ZWRMaXN0Tm90ZSA9ICIiOwogICAgICAgICAgICByZW5kZXJQdWJsaXNoZWROb3RlTWVudSgpOwogICAgICAgICAgICByZW5kZXJRdWVzdGlvbkxpc3QoKTsKICAgICAgICAgIH0pOwoKICAgICAgICAgIHJlbmRlclB1Ymxpc2hlZE5vdGVNZW51KCk7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBpbml0aWFsaXplUHJvYmxlbVRhYnMoKSB7CiAgICAgICAgICBlbGVtZW50cy5wcm9ibGVtVGFiQnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHsKICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIiwgKCkgPT4gewogICAgICAgICAgICAgIHNldFByb2JsZW1NYW5hZ2VyVGFiKGJ1dHRvbi5kYXRhc2V0LnByb2JsZW1UYWIgfHwgImNyZWF0ZSIpOwogICAgICAgICAgICB9KTsKICAgICAgICAgIH0pOwogICAgICAgICAgc2V0UHJvYmxlbU1hbmFnZXJUYWIoc3RhdGUuYWN0aXZlUHJvYmxlbVRhYik7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBz",
    "ZXRQcm9ibGVtTWFuYWdlclRhYih0YWJOYW1lKSB7CiAgICAgICAgICBjb25zdCBub3JtYWxpemVkVGFiID0gdGFiTmFtZSA9PT0gIm1hbmFnZSIgPyAibWFuYWdlIiA6ICJjcmVhdGUiOwogICAgICAgICAgc3RhdGUuYWN0aXZlUHJvYmxlbVRhYiA9IG5vcm1hbGl6ZWRUYWI7CiAgICAgICAgICBlbGVtZW50cy5wcm9ibGVtVGFiQnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHsKICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBidXR0b24uZGF0YXNldC5wcm9ibGVtVGFiID09PSBub3JtYWxpemVkVGFiOwogICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgiaXMtYWN0aXZlIiwgaXNBY3RpdmUpOwogICAgICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKCJhcmlhLXNlbGVjdGVkIiwgU3RyaW5nKGlzQWN0aXZlKSk7CiAgICAgICAgICB9KTsKICAgICAgICAgIGVsZW1lbnRzLnByb2JsZW1UYWJQYW5lbHMuZm9yRWFjaCgocGFuZWwpID0+IHsKICAgICAgICAgICAgcGFuZWwuaGlkZGVuID0gcGFuZWwuZGF0YXNldC5wcm9ibGVtVGFiUGFuZWwgIT09IG5vcm1hbGl6ZWRUYWI7CiAgICAgICAgICB9KTsKICAgICAgICAgIGlmIChub3JtYWxpemVkVGFiID09PSAibWFuYWdlIikgewogICAgICAgICAgICByZW5kZXJQZW5kaW5nUXVlc3Rpb25NYW5hZ2VyKCk7CiAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBpbml0aWFsaXplUGVuZGluZ1F1ZXN0aW9uTWFuYWdlcigpIHsKICAgICAgICAgIGVsZW1lbnRzLnBlbmRpbmdRdWVzdGlvbkxpc3Q/LmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIiwgKGV2ZW50KSA9PiB7CiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGV2ZW50LnRhcmdldCBpbnN0YW5jZW9mIEVsZW1lbnQgPyBldmVudC50YXJnZXQuY2xvc2Vz",
    "dCgiW2RhdGEtcGVuZGluZy1xdWVzdGlvbi1pZF0iKSA6IG51bGw7CiAgICAgICAgICAgIGlmICghcm93KSB7CiAgICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHN0YXRlLnNlbGVjdGVkUGVuZGluZ1F1ZXN0aW9uSWQgPSByb3cuZGF0YXNldC5wZW5kaW5nUXVlc3Rpb25JZCB8fCAiIjsKICAgICAgICAgICAgcmVuZGVyUGVuZGluZ1F1ZXN0aW9uTWFuYWdlcigpOwogICAgICAgICAgfSk7CiAgICAgICAgICBlbGVtZW50cy5wZW5kaW5nUXVlc3Rpb25TYXZlQnRuPy5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsICgpID0+IHsKICAgICAgICAgICAgdm9pZCBzYXZlUGVuZGluZ1F1ZXN0aW9uRWRpdCgpOwogICAgICAgICAgfSk7CiAgICAgICAgICBlbGVtZW50cy5wZW5kaW5nUXVlc3Rpb25BcHByb3ZlQnRuPy5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsICgpID0+IHsKICAgICAgICAgICAgdm9pZCBhcHByb3ZlU2VsZWN0ZWRQZW5kaW5nUXVlc3Rpb24oKTsKICAgICAgICAgIH0pOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gcmVuZGVyUHVibGlzaGVkTm90ZU1lbnUoKSB7CiAgICAgICAgICBpZiAoIWVsZW1lbnRzLnB1Ymxpc2hlZE5vdGVNZW51KSB7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KICAgICAgICAgIGNvbnN0IG5vdGVzID0gTk9URV9CWV9CSU5ERVJbc3RhdGUuc2VsZWN0ZWRMaXN0QmluZGVyXSA/PyBbXTsKICAgICAgICAgIGlmICghbm90ZXMuaW5jbHVkZXMoc3RhdGUuc2VsZWN0ZWRMaXN0Tm90ZSkpIHsKICAgICAgICAgICAgc3RhdGUuc2VsZWN0ZWRMaXN0Tm90ZSA9IG5vdGVzWzBdIHx8ICIiOwogICAgICAgICAgfQoKICAgICAgICAgIGVsZW1lbnRzLnB1Ymxpc2hlZE5vdGVNZW51LmlubmVySFRNTCA9IG5v",
    "dGVzCiAgICAgICAgICAgIC5tYXAoCiAgICAgICAgICAgICAgKG5vdGUpID0+IGAKICAgICAgICAgICAgICAgIDxidXR0b24KICAgICAgICAgICAgICAgICAgY2xhc3M9InB1Ymxpc2hlZC1ub3RlLWJ1dHRvbiR7bm90ZSA9PT0gc3RhdGUuc2VsZWN0ZWRMaXN0Tm90ZSA/ICIgaXMtYWN0aXZlIiA6ICIifSIKICAgICAgICAgICAgICAgICAgdHlwZT0iYnV0dG9uIgogICAgICAgICAgICAgICAgICByb2xlPSJvcHRpb24iCiAgICAgICAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9IiR7bm90ZSA9PT0gc3RhdGUuc2VsZWN0ZWRMaXN0Tm90ZSA/ICJ0cnVlIiA6ICJmYWxzZSJ9IgogICAgICAgICAgICAgICAgICBkYXRhLW5vdGU9IiR7ZXNjYXBlSHRtbChub3RlKX0iCiAgICAgICAgICAgICAgICA+JHtlc2NhcGVIdG1sKG5vdGUpfTwvYnV0dG9uPgogICAgICAgICAgICAgIGAsCiAgICAgICAgICAgICkKICAgICAgICAgICAgLmpvaW4oIiIpOwoKICAgICAgICAgIGVsZW1lbnRzLnB1Ymxpc2hlZE5vdGVNZW51LnF1ZXJ5U2VsZWN0b3JBbGwoIltkYXRhLW5vdGVdIikuZm9yRWFjaCgoYnV0dG9uKSA9PiB7CiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsICgpID0+IHsKICAgICAgICAgICAgICBzdGF0ZS5zZWxlY3RlZExpc3ROb3RlID0gYnV0dG9uLmRhdGFzZXQubm90ZSB8fCAiIjsKICAgICAgICAgICAgICByZW5kZXJQdWJsaXNoZWROb3RlTWVudSgpOwogICAgICAgICAgICAgIHJlbmRlclF1ZXN0aW9uTGlzdCgpOwogICAgICAgICAgICB9KTsKICAgICAgICAgIH0pOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gdXBkYXRlUHVibGlzaGVkQ2hhcHRlck9wdGlvbnMoKSB7CiAgICAgICAgICBpZiAoIWVsZW1lbnRzLnB1Ymxpc2hlZENoYXB0ZXJTZWxl",
    "Y3QpIHsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQogICAgICAgICAgY29uc3QgY29uZmlnID0gZ2V0Q2hhcHRlckNvbmZpZyhzdGF0ZS5zZWxlY3RlZExpc3ROb3RlKTsKICAgICAgICAgIGlmIChlbGVtZW50cy5wdWJsaXNoZWRDaGFwdGVyTGFiZWwpIHsKICAgICAgICAgICAgZWxlbWVudHMucHVibGlzaGVkQ2hhcHRlckxhYmVsLnRleHRDb250ZW50ID0gY29uZmlnLmxhYmVsOwogICAgICAgICAgfQoKICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBbeyB2YWx1ZTogImFsbCIsIGxhYmVsOiAi44GZ44G544GmIiB9LCAuLi5jb25maWcub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gKHsgdmFsdWU6IG9wdGlvbiwgbGFiZWw6IG9wdGlvbiB9KSldOwogICAgICAgICAgaWYgKCFvcHRpb25zLnNvbWUoKG9wdGlvbikgPT4gb3B0aW9uLnZhbHVlID09PSBzdGF0ZS5zZWxlY3RlZExpc3RDaGFwdGVyKSkgewogICAgICAgICAgICBzdGF0ZS5zZWxlY3RlZExpc3RDaGFwdGVyID0gImFsbCI7CiAgICAgICAgICB9CiAgICAgICAgICBlbGVtZW50cy5wdWJsaXNoZWRDaGFwdGVyU2VsZWN0LmlubmVySFRNTCA9IG9wdGlvbnMKICAgICAgICAgICAgLm1hcCgob3B0aW9uKSA9PiBgPG9wdGlvbiB2YWx1ZT0iJHtlc2NhcGVIdG1sKG9wdGlvbi52YWx1ZSl9Ij4ke2VzY2FwZUh0bWwob3B0aW9uLmxhYmVsKX08L29wdGlvbj5gKQogICAgICAgICAgICAuam9pbigiIik7CiAgICAgICAgICBlbGVtZW50cy5wdWJsaXNoZWRDaGFwdGVyU2VsZWN0LnZhbHVlID0gc3RhdGUuc2VsZWN0ZWRMaXN0Q2hhcHRlcjsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGluaXRpYWxpemVQcm9ibGVtRm9ybSgpIHsKICAgICAgICAgIHBvcHVsYXRlQmluZGVyT3B0aW9ucygpOwogICAgICAgICAgdXBkYXRl",
    "Tm90ZU9wdGlvbnMoKTsKCiAgICAgICAgICBlbGVtZW50cy5iaW5kZXJTZWxlY3Q/LmFkZEV2ZW50TGlzdGVuZXIoImNoYW5nZSIsICgpID0+IHsKICAgICAgICAgICAgdXBkYXRlTm90ZU9wdGlvbnMoKTsKICAgICAgICAgICAgcmVuZGVyTm90ZWJvb2tFZGl0b3JGcmFtZSgpOwogICAgICAgICAgICB1cGRhdGVQcm9ibGVtUHJldmlldygpOwogICAgICAgICAgfSk7CiAgICAgICAgICBlbGVtZW50cy5ub3RlU2VsZWN0Py5hZGRFdmVudExpc3RlbmVyKCJjaGFuZ2UiLCAoKSA9PiB7CiAgICAgICAgICAgIHN5bmNCaW5kZXJGcm9tU2VsZWN0ZWROb3RlKCk7CiAgICAgICAgICAgIHVwZGF0ZUNoYXB0ZXJPcHRpb25zKCk7CiAgICAgICAgICAgIHJlbmRlck5vdGVib29rRWRpdG9yRnJhbWUoKTsKICAgICAgICAgICAgdXBkYXRlUHJvYmxlbVByZXZpZXcoKTsKICAgICAgICAgIH0pOwogICAgICAgICAgW2VsZW1lbnRzLnRleHROdW1iZXJJbnB1dCwgZWxlbWVudHMudGV4dE5hbWVJbnB1dCwgZWxlbWVudHMucXVlc3Rpb25OdW1iZXJJbnB1dCwgZWxlbWVudHMucXVlc3Rpb25OYW1lSW5wdXRdLmZvckVhY2goKGlucHV0KSA9PiB7CiAgICAgICAgICAgIGlucHV0Py5hZGRFdmVudExpc3RlbmVyKCJpbnB1dCIsIHVwZGF0ZVByb2JsZW1QcmV2aWV3KTsKICAgICAgICAgIH0pOwoKICAgICAgICAgIGVsZW1lbnRzLnByb2JsZW1Dc3ZMb2FkQnRuPy5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsICgpID0+IHsKICAgICAgICAgICAgdm9pZCBsb2FkUHJvYmxlbUNzdkltcG9ydCgpOwogICAgICAgICAgfSk7CiAgICAgICAgICBlbGVtZW50cy5wcm9ibGVtQ3N2SW5wdXQ/LmFkZEV2ZW50TGlzdGVuZXIoImNoYW5nZSIsICgpID0+IHsKICAgICAgICAgICAgdm9pZCBsb2FkUHJvYmxlbUNzdkltcG9y",
    "dCgpOwogICAgICAgICAgfSk7CiAgICAgICAgICBlbGVtZW50cy5wcm9ibGVtQ3N2U3VibWl0TWlzc2luZ0J0bj8uYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCAoKSA9PiB7CiAgICAgICAgICAgIHZvaWQgc3VibWl0TWlzc2luZ1Byb2JsZW1Dc3ZEcmFmdHMoKTsKICAgICAgICAgIH0pOwoKICAgICAgICAgIGVsZW1lbnRzLnRleHRCbG9ja0FkZEJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7CiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsICgpID0+IHsKICAgICAgICAgICAgICBhZGRUZXh0QmxvY2soYnV0dG9uLmRhdGFzZXQuYWRkVGV4dEJsb2NrIHx8ICJib2R5Iik7CiAgICAgICAgICAgIH0pOwogICAgICAgICAgfSk7CiAgICAgICAgICBpbml0aWFsaXplVGV4dEJsb2NrTGlzdCgpOwoKICAgICAgICAgIGVsZW1lbnRzLm5vdGVib29rRWRpdG9yVG9vbGJhcj8uYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCAoZXZlbnQpID0+IHsKICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZXZlbnQudGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudCA/IGV2ZW50LnRhcmdldC5jbG9zZXN0KCJbZGF0YS1hZGQtbm90ZWJvb2stYmxvY2tdIikgOiBudWxsOwogICAgICAgICAgICBpZiAoIWJ1dHRvbikgewogICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgfQogICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOwogICAgICAgICAgICBhZGROb3RlYm9va0Jsb2NrKGJ1dHRvbi5kYXRhc2V0LmFkZE5vdGVib29rQmxvY2sgfHwgInRleHQiKTsKICAgICAgICAgIH0pOwoKICAgICAgICAgIGVsZW1lbnRzLmVkaXRvclRvb2xiYXI/LmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIiwgKGV2ZW50KSA9PiB7CiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9",
    "IGV2ZW50LnRhcmdldCBpbnN0YW5jZW9mIEVsZW1lbnQgPyBldmVudC50YXJnZXQuY2xvc2VzdCgiYnV0dG9uIikgOiBudWxsOwogICAgICAgICAgICBpZiAoIWJ1dHRvbikgewogICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgfQogICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOwoKICAgICAgICAgICAgY29uc3QgYmxvY2tUeXBlID0gYnV0dG9uLmRhdGFzZXQuYWRkTm90ZWJvb2tCbG9jazsKICAgICAgICAgICAgaWYgKGJsb2NrVHlwZSkgewogICAgICAgICAgICAgIGFkZE5vdGVib29rQmxvY2soYmxvY2tUeXBlKTsKICAgICAgICAgICAgICByZXR1cm47CiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIGVsZW1lbnRzLnByb2JsZW1FZGl0b3IuZm9jdXMoKTsKCiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmQgPSBidXR0b24uZGF0YXNldC5jb21tYW5kOwogICAgICAgICAgICBpZiAoY29tbWFuZCkgewogICAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKGNvbW1hbmQsIGZhbHNlKTsKICAgICAgICAgICAgICB1cGRhdGVFZGl0b3JDb3VudHMoKTsKICAgICAgICAgICAgICByZXR1cm47CiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIGNvbnN0IGluc2VydFR5cGUgPSBidXR0b24uZGF0YXNldC5pbnNlcnQ7CiAgICAgICAgICAgIGlmIChpbnNlcnRUeXBlID09PSAiY2hvaWNlIikgewogICAgICAgICAgICAgIGluc2VydFRleHRBdEN1cnNvcigi44KiLiBcbuOCpC4gXG7jgqYuICIpOwogICAgICAgICAgICAgIHVwZGF0ZUVkaXRvckNvdW50cygpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChpbnNlcnRUeXBlID09PSAiZm9ybXVsYSIpIHsKICAgICAgICAgICAgICBpbnNlcnRUZXh0QXRDdXJzb3IoIiAkYV4yICsgYl4yID0gY14yJCAiKTsK",
    "ICAgICAgICAgICAgICB1cGRhdGVFZGl0b3JDb3VudHMoKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAoaW5zZXJ0VHlwZSA9PT0gImltYWdlIikgewogICAgICAgICAgICAgIGVsZW1lbnRzLnByb2JsZW1JbWFnZUlucHV0Py5jbGljaygpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChpbnNlcnRUeXBlID09PSAidmVjdG9yLWdyYXBoIikgewogICAgICAgICAgICAgIG9wZW5WZWN0b3JHcmFwaERpYWxvZygpOwogICAgICAgICAgICB9CiAgICAgICAgICB9KTsKCiAgICAgICAgICBpbml0aWFsaXplVmVjdG9yR3JhcGhFZGl0b3IoKTsKCiAgICAgICAgICBlbGVtZW50cy5wcm9ibGVtRWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIoImlucHV0IiwgKCkgPT4gewogICAgICAgICAgICB1cGRhdGVFZGl0b3JDb3VudHMoKTsKICAgICAgICAgIH0pOwoKICAgICAgICAgIGluaXRpYWxpemVOb3RlYm9va0VkaXRvcigpOwoKICAgICAgICAgIGVsZW1lbnRzLnByb2JsZW1JbWFnZUlucHV0Py5hZGRFdmVudExpc3RlbmVyKCJjaGFuZ2UiLCBhc3luYyAoKSA9PiB7CiAgICAgICAgICAgIGF3YWl0IHN5bmNQcm9ibGVtSW1hZ2VGcm9tSW5wdXQoeyBpbnNlcnRJbnRvRWRpdG9yOiB0cnVlIH0pOwogICAgICAgICAgfSk7CgogICAgICAgICAgZWxlbWVudHMuc2VsZWN0UHJvYmxlbUltYWdlQnRuPy5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsICgpID0+IHsKICAgICAgICAgICAgZWxlbWVudHMucHJvYmxlbUltYWdlSW5wdXQ/LmNsaWNrKCk7CiAgICAgICAgICB9KTsKCiAgICAgICAgICBlbGVtZW50cy52aWV3UHJvYmxlbUltYWdlQnRuPy5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsICgpID0+IHsKICAgICAgICAgICAgc2hvd1Byb2JsZW1JbWFnZURpYWxvZygpOwogICAgICAgICAg",
    "fSk7CgogICAgICAgICAgZWxlbWVudHMuY2xlYXJQcm9ibGVtSW1hZ2VCdG4/LmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIiwgKCkgPT4gewogICAgICAgICAgICBjbGVhclByb2JsZW1JbWFnZSgpOwogICAgICAgICAgfSk7CgogICAgICAgICAgZWxlbWVudHMuaW1hZ2VEaWFsb2dCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4gewogICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCAoKSA9PiB7CiAgICAgICAgICAgICAgaWYgKGJ1dHRvbi5kYXRhc2V0LmltYWdlRGlhbG9nQWN0aW9uID09PSAiY2xlYXIiKSB7CiAgICAgICAgICAgICAgICBjbGVhclByb2JsZW1JbWFnZSgpOwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgICBjbG9zZURpYWxvZyhlbGVtZW50cy5wcm9ibGVtSW1hZ2VEaWFsb2cpOwogICAgICAgICAgICB9KTsKICAgICAgICAgIH0pOwoKICAgICAgICAgIGVsZW1lbnRzLnByb2JsZW1DcmVhdGVGb3JtLmFkZEV2ZW50TGlzdGVuZXIoInN1Ym1pdCIsIGFzeW5jIChldmVudCkgPT4gewogICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOwogICAgICAgICAgICBhd2FpdCBwcmVwYXJlUHJvYmxlbUNvbmZpcm1hdGlvbigpOwogICAgICAgICAgfSk7CgogICAgICAgICAgZWxlbWVudHMuc2F2ZVByb2JsZW1EcmFmdEJ0bj8uYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCBhc3luYyAoKSA9PiB7CiAgICAgICAgICAgIGF3YWl0IHNhdmVQcm9ibGVtQXNEcmFmdCgpOwogICAgICAgICAgfSk7CgogICAgICAgICAgZWxlbWVudHMucmVzZXRQcm9ibGVtRm9ybUJ0bj8uYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCAoKSA9PiB7CiAgICAgICAgICAgIHNob3dSZXNldFByb2JsZW1EaWFsb2coKTsKICAgICAgICAgIH0pOwoKICAgICAgICAg",
    "IGVsZW1lbnRzLnJlc2V0RGlhbG9nQnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHsKICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIiwgKCkgPT4gewogICAgICAgICAgICAgIGlmIChidXR0b24uZGF0YXNldC5yZXNldERpYWxvZ0FjdGlvbiA9PT0gImNsZWFyIikgewogICAgICAgICAgICAgICAgcmVzZXRQcm9ibGVtQ29tcG9zZXIoKTsKICAgICAgICAgICAgICAgIGVsZW1lbnRzLnByb29mcmVhZGluZ0ZlZWRiYWNrLnRleHRDb250ZW50ID0gIiI7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIGNsb3NlRGlhbG9nKGVsZW1lbnRzLnByb2JsZW1SZXNldERpYWxvZyk7CiAgICAgICAgICAgIH0pOwogICAgICAgICAgfSk7CgogICAgICAgICAgZWxlbWVudHMuY29uZmlybURpYWxvZ0J1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7CiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIGFzeW5jICgpID0+IHsKICAgICAgICAgICAgICBpZiAoYnV0dG9uLmRhdGFzZXQuY29uZmlybURpYWxvZ0FjdGlvbiA9PT0gInN1Ym1pdCIpIHsKICAgICAgICAgICAgICAgIGF3YWl0IHN1Ym1pdENvbmZpcm1lZFByb2JsZW0oKTsKICAgICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgc3RhdGUucGVuZGluZ1Byb2JsZW1EcmFmdCA9IG51bGw7CiAgICAgICAgICAgICAgc2V0UHJvYmxlbVN0ZXAoImNyZWF0ZSIpOwogICAgICAgICAgICAgIGNsb3NlRGlhbG9nKGVsZW1lbnRzLnByb2JsZW1Db25maXJtRGlhbG9nKTsKICAgICAgICAgICAgfSk7CiAgICAgICAgICB9KTsKCiAgICAgICAgICB1cGRhdGVQcm9ibGVtUHJldmlldygpOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gaW5pdGlh",
    "bGl6ZVZlY3RvckdyYXBoRWRpdG9yKCkgewogICAgICAgICAgaWYgKCFlbGVtZW50cy52ZWN0b3JHcmFwaFN2ZykgewogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CiAgICAgICAgICByZW5kZXJWZWN0b3JHcmFwaEdyaWQoKTsKICAgICAgICAgIHJlbmRlclZlY3RvckdyYXBoTGluZXMoKTsKICAgICAgICAgIGVsZW1lbnRzLnZlY3RvckdyYXBoU3ZnLmFkZEV2ZW50TGlzdGVuZXIoInBvaW50ZXJkb3duIiwgaGFuZGxlVmVjdG9yR3JhcGhQb2ludGVyRG93bik7CiAgICAgICAgICBlbGVtZW50cy52ZWN0b3JHcmFwaFN2Zy5hZGRFdmVudExpc3RlbmVyKCJwb2ludGVybW92ZSIsIGhhbmRsZVZlY3RvckdyYXBoUG9pbnRlck1vdmUpOwogICAgICAgICAgZWxlbWVudHMudmVjdG9yR3JhcGhTdmcuYWRkRXZlbnRMaXN0ZW5lcigicG9pbnRlcnVwIiwgZmluaXNoVmVjdG9yR3JhcGhQb2ludGVyKTsKICAgICAgICAgIGVsZW1lbnRzLnZlY3RvckdyYXBoU3ZnLmFkZEV2ZW50TGlzdGVuZXIoInBvaW50ZXJjYW5jZWwiLCBmaW5pc2hWZWN0b3JHcmFwaFBvaW50ZXIpOwogICAgICAgICAgZWxlbWVudHMudmVjdG9yR3JhcGhBY3Rpb25CdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4gewogICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCAoKSA9PiB7CiAgICAgICAgICAgICAgaGFuZGxlVmVjdG9yR3JhcGhBY3Rpb24oYnV0dG9uLmRhdGFzZXQudmVjdG9yR3JhcGhBY3Rpb24gfHwgIiIpOwogICAgICAgICAgICB9KTsKICAgICAgICAgIH0pOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gb3BlblZlY3RvckdyYXBoRGlhbG9nKCkgewogICAgICAgICAgc3RhdGUudmVjdG9yR3JhcGhMaW5lcyA9IFtdOwogICAgICAgICAgc3RhdGUudmVjdG9yR3JhcGhQ",
    "b2ludGVyU3RhdGUgPSBudWxsOwogICAgICAgICAgcmVuZGVyVmVjdG9yR3JhcGhHcmlkKCk7CiAgICAgICAgICByZW5kZXJWZWN0b3JHcmFwaExpbmVzKCk7CiAgICAgICAgICBzaG93RGlhbG9nKGVsZW1lbnRzLnZlY3RvckdyYXBoRGlhbG9nLCAoKSA9PiB7CiAgICAgICAgICAgIHdpbmRvdy5hbGVydCgi44Kw44Op44OV5L2c5oiQ44OE44O844Or44KS6ZaL44GR44G+44Gb44KT44Gn44GX44Gf44CCIik7CiAgICAgICAgICB9KTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGhhbmRsZVZlY3RvckdyYXBoQWN0aW9uKGFjdGlvbikgewogICAgICAgICAgaWYgKGFjdGlvbiA9PT0gImNhbmNlbCIpIHsKICAgICAgICAgICAgY2xvc2VEaWFsb2coZWxlbWVudHMudmVjdG9yR3JhcGhEaWFsb2cpOwogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CiAgICAgICAgICBpZiAoYWN0aW9uID09PSAidW5kbyIpIHsKICAgICAgICAgICAgc3RhdGUudmVjdG9yR3JhcGhMaW5lcy5wb3AoKTsKICAgICAgICAgICAgcmVuZGVyVmVjdG9yR3JhcGhMaW5lcygpOwogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CiAgICAgICAgICBpZiAoYWN0aW9uID09PSAiY2xlYXIiKSB7CiAgICAgICAgICAgIHN0YXRlLnZlY3RvckdyYXBoTGluZXMgPSBbXTsKICAgICAgICAgICAgcmVuZGVyVmVjdG9yR3JhcGhMaW5lcygpOwogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CiAgICAgICAgICBpZiAoYWN0aW9uID09PSAiaW5zZXJ0IikgewogICAgICAgICAgICBpbnNlcnRWZWN0b3JHcmFwaEludG9FZGl0b3IoKTsKICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHJlbmRlclZlY3RvckdyYXBoR3JpZCgpIHsKICAgICAgICAgIGlmICghZWxlbWVudHMudmVjdG9y",
    "R3JhcGhHcmlkKSB7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KICAgICAgICAgIGNvbnN0IHdpZHRoID0gNjQwOwogICAgICAgICAgY29uc3QgaGVpZ2h0ID0gNDAwOwogICAgICAgICAgY29uc3Qgc3RlcCA9IDQwOwogICAgICAgICAgZWxlbWVudHMudmVjdG9yR3JhcGhHcmlkLmlubmVySFRNTCA9ICIiOwogICAgICAgICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7CiAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8PSB3aWR0aDsgeCArPSBzdGVwKSB7CiAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZChjcmVhdGVTdmdMaW5lKHgsIDAsIHgsIGhlaWdodCwgeCA9PT0gd2lkdGggLyAyID8gInZlY3Rvci1heGlzLWxpbmUiIDogInZlY3Rvci1ncmlkLWxpbmUiKSk7CiAgICAgICAgICB9CiAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8PSBoZWlnaHQ7IHkgKz0gc3RlcCkgewogICAgICAgICAgICBmcmFnbWVudC5hcHBlbmQoY3JlYXRlU3ZnTGluZSgwLCB5LCB3aWR0aCwgeSwgeSA9PT0gaGVpZ2h0IC8gMiA/ICJ2ZWN0b3ItYXhpcy1saW5lIiA6ICJ2ZWN0b3ItZ3JpZC1saW5lIikpOwogICAgICAgICAgfQogICAgICAgICAgZWxlbWVudHMudmVjdG9yR3JhcGhHcmlkLmFwcGVuZChmcmFnbWVudCk7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiByZW5kZXJWZWN0b3JHcmFwaExpbmVzKCkgewogICAgICAgICAgaWYgKCFlbGVtZW50cy52ZWN0b3JHcmFwaExpbmVzKSB7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KICAgICAgICAgIGVsZW1lbnRzLnZlY3RvckdyYXBoTGluZXMuaW5uZXJIVE1MID0gIiI7CiAgICAgICAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJh",
    "Z21lbnQoKTsKICAgICAgICAgIHN0YXRlLnZlY3RvckdyYXBoTGluZXMuZm9yRWFjaCgobGluZSkgPT4gewogICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gY3JlYXRlU3ZnTGluZShsaW5lLngxLCBsaW5lLnkxLCBsaW5lLngyLCBsaW5lLnkyLCAidmVjdG9yLWdyYXBoLWxpbmUiKTsKICAgICAgICAgICAgY29uc3Qga2luZCA9IGxpbmUua2luZCA9PT0gImFuc3dlciIgPyAiYW5zd2VyIiA6ICJ2ZWN0b3IiOwogICAgICAgICAgICBlbGVtZW50LmRhdGFzZXQubGluZUtpbmQgPSBraW5kOwogICAgICAgICAgICBpZiAoa2luZCA9PT0gInZlY3RvciIpIHsKICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgibWFya2VyLWVuZCIsICJ1cmwoI3ZlY3RvckdyYXBoQXJyb3cpIik7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kKGVsZW1lbnQpOwogICAgICAgICAgfSk7CiAgICAgICAgICBlbGVtZW50cy52ZWN0b3JHcmFwaExpbmVzLmFwcGVuZChmcmFnbWVudCk7CiAgICAgICAgICBpZiAoZWxlbWVudHMudmVjdG9yR3JhcGhQcmV2aWV3KSB7CiAgICAgICAgICAgIGVsZW1lbnRzLnZlY3RvckdyYXBoUHJldmlldy5oaWRkZW4gPSB0cnVlOwogICAgICAgICAgfQogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gY3JlYXRlU3ZnTGluZSh4MSwgeTEsIHgyLCB5MiwgY2xhc3NOYW1lKSB7CiAgICAgICAgICBjb25zdCBsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIsICJsaW5lIik7CiAgICAgICAgICBsaW5lLnNldEF0dHJpYnV0ZSgieDEiLCBTdHJpbmcoeDEpKTsKICAgICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCJ5MSIsIFN0cmluZyh5MSkpOwogICAgICAgICAgbGluZS5zZXRBdHRyaWJ1",
    "dGUoIngyIiwgU3RyaW5nKHgyKSk7CiAgICAgICAgICBsaW5lLnNldEF0dHJpYnV0ZSgieTIiLCBTdHJpbmcoeTIpKTsKICAgICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCJjbGFzcyIsIGNsYXNzTmFtZSk7CiAgICAgICAgICByZXR1cm4gbGluZTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGhhbmRsZVZlY3RvckdyYXBoUG9pbnRlckRvd24oZXZlbnQpIHsKICAgICAgICAgIGlmICghKGVsZW1lbnRzLnZlY3RvckdyYXBoU3ZnIGluc3RhbmNlb2YgU1ZHU1ZHRWxlbWVudCkpIHsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQogICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsKICAgICAgICAgIGNvbnN0IHBvaW50ID0gZ2V0VmVjdG9yR3JhcGhQb2ludGVyUG9pbnQoZXZlbnQpOwogICAgICAgICAgc3RhdGUudmVjdG9yR3JhcGhQb2ludGVyU3RhdGUgPSB7CiAgICAgICAgICAgIHBvaW50ZXJJZDogZXZlbnQucG9pbnRlcklkLAogICAgICAgICAgICBzdGFydDogcG9pbnQsCiAgICAgICAgICAgIGN1cnJlbnQ6IHBvaW50LAogICAgICAgICAgfTsKICAgICAgICAgIHVwZGF0ZVZlY3RvckdyYXBoUHJldmlldyhwb2ludCwgcG9pbnQpOwogICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgZWxlbWVudHMudmVjdG9yR3JhcGhTdmcuc2V0UG9pbnRlckNhcHR1cmUoZXZlbnQucG9pbnRlcklkKTsKICAgICAgICAgIH0gY2F0Y2ggewogICAgICAgICAgICAvLyBEcmFnZ2luZyBjb250aW51ZXMgd2l0aCB3aW5kb3cgcG9pbnRlciBldmVudHMgd2hlcmUgY2FwdHVyZSBpcyB1bmF2YWlsYWJsZS4KICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGhhbmRsZVZlY3RvckdyYXBoUG9pbnRlck1vdmUoZXZlbnQpIHsKICAgICAgICAgIGNvbnN0IHBvaW50",
    "ZXJTdGF0ZSA9IHN0YXRlLnZlY3RvckdyYXBoUG9pbnRlclN0YXRlOwogICAgICAgICAgaWYgKCFwb2ludGVyU3RhdGUgfHwgcG9pbnRlclN0YXRlLnBvaW50ZXJJZCAhPT0gZXZlbnQucG9pbnRlcklkKSB7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7CiAgICAgICAgICBwb2ludGVyU3RhdGUuY3VycmVudCA9IGdldFZlY3RvckdyYXBoUG9pbnRlclBvaW50KGV2ZW50KTsKICAgICAgICAgIHVwZGF0ZVZlY3RvckdyYXBoUHJldmlldyhwb2ludGVyU3RhdGUuc3RhcnQsIHBvaW50ZXJTdGF0ZS5jdXJyZW50KTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGZpbmlzaFZlY3RvckdyYXBoUG9pbnRlcihldmVudCkgewogICAgICAgICAgY29uc3QgcG9pbnRlclN0YXRlID0gc3RhdGUudmVjdG9yR3JhcGhQb2ludGVyU3RhdGU7CiAgICAgICAgICBpZiAoIXBvaW50ZXJTdGF0ZSB8fCBwb2ludGVyU3RhdGUucG9pbnRlcklkICE9PSBldmVudC5wb2ludGVySWQpIHsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQogICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsKICAgICAgICAgIGNvbnN0IGVuZCA9IGdldFZlY3RvckdyYXBoUG9pbnRlclBvaW50KGV2ZW50KTsKICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IE1hdGguaHlwb3QoZW5kLnggLSBwb2ludGVyU3RhdGUuc3RhcnQueCwgZW5kLnkgLSBwb2ludGVyU3RhdGUuc3RhcnQueSk7CiAgICAgICAgICBpZiAobGVuZ3RoID49IDE2KSB7CiAgICAgICAgICAgIHN0YXRlLnZlY3RvckdyYXBoTGluZXMucHVzaCh7CiAgICAgICAgICAgICAgeDE6IHBvaW50ZXJTdGF0ZS5zdGFydC54LAogICAgICAgICAgICAgIHkxOiBwb2ludGVyU3RhdGUuc3RhcnQu",
    "eSwKICAgICAgICAgICAgICB4MjogZW5kLngsCiAgICAgICAgICAgICAgeTI6IGVuZC55LAogICAgICAgICAgICAgIGtpbmQ6IGVsZW1lbnRzLnZlY3RvckdyYXBoTW9kZVNlbGVjdD8udmFsdWUgPT09ICJhbnN3ZXIiID8gImFuc3dlciIgOiAidmVjdG9yIiwKICAgICAgICAgICAgfSk7CiAgICAgICAgICB9CiAgICAgICAgICBzdGF0ZS52ZWN0b3JHcmFwaFBvaW50ZXJTdGF0ZSA9IG51bGw7CiAgICAgICAgICByZW5kZXJWZWN0b3JHcmFwaExpbmVzKCk7CiAgICAgICAgICB0cnkgewogICAgICAgICAgICBlbGVtZW50cy52ZWN0b3JHcmFwaFN2Zz8ucmVsZWFzZVBvaW50ZXJDYXB0dXJlKGV2ZW50LnBvaW50ZXJJZCk7CiAgICAgICAgICB9IGNhdGNoIHsKICAgICAgICAgICAgLy8gTm90aGluZyB0byByZWxlYXNlLgogICAgICAgICAgfQogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gdXBkYXRlVmVjdG9yR3JhcGhQcmV2aWV3KHN0YXJ0LCBlbmQpIHsKICAgICAgICAgIGlmICghZWxlbWVudHMudmVjdG9yR3JhcGhQcmV2aWV3KSB7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KICAgICAgICAgIGVsZW1lbnRzLnZlY3RvckdyYXBoUHJldmlldy5oaWRkZW4gPSBmYWxzZTsKICAgICAgICAgIGVsZW1lbnRzLnZlY3RvckdyYXBoUHJldmlldy5zZXRBdHRyaWJ1dGUoIngxIiwgU3RyaW5nKHN0YXJ0LngpKTsKICAgICAgICAgIGVsZW1lbnRzLnZlY3RvckdyYXBoUHJldmlldy5zZXRBdHRyaWJ1dGUoInkxIiwgU3RyaW5nKHN0YXJ0LnkpKTsKICAgICAgICAgIGVsZW1lbnRzLnZlY3RvckdyYXBoUHJldmlldy5zZXRBdHRyaWJ1dGUoIngyIiwgU3RyaW5nKGVuZC54KSk7CiAgICAgICAgICBlbGVtZW50cy52ZWN0b3JHcmFwaFByZXZpZXcuc2V0QXR0cmlidXRlKCJ5MiIsIFN0",
    "cmluZyhlbmQueSkpOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gZ2V0VmVjdG9yR3JhcGhQb2ludGVyUG9pbnQoZXZlbnQpIHsKICAgICAgICAgIGNvbnN0IHN2ZyA9IGVsZW1lbnRzLnZlY3RvckdyYXBoU3ZnOwogICAgICAgICAgaWYgKCEoc3ZnIGluc3RhbmNlb2YgU1ZHU1ZHRWxlbWVudCkpIHsKICAgICAgICAgICAgcmV0dXJuIHsgeDogMzIwLCB5OiAyMDAgfTsKICAgICAgICAgIH0KICAgICAgICAgIGNvbnN0IHBvaW50ID0gc3ZnLmNyZWF0ZVNWR1BvaW50KCk7CiAgICAgICAgICBwb2ludC54ID0gZXZlbnQuY2xpZW50WDsKICAgICAgICAgIHBvaW50LnkgPSBldmVudC5jbGllbnRZOwogICAgICAgICAgY29uc3QgbWF0cml4ID0gc3ZnLmdldFNjcmVlbkNUTSgpOwogICAgICAgICAgY29uc3QgbG9jYWwgPSBtYXRyaXggPyBwb2ludC5tYXRyaXhUcmFuc2Zvcm0obWF0cml4LmludmVyc2UoKSkgOiBwb2ludDsKICAgICAgICAgIHJldHVybiBzbmFwVmVjdG9yR3JhcGhQb2ludChsb2NhbC54LCBsb2NhbC55KTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHNuYXBWZWN0b3JHcmFwaFBvaW50KHgsIHkpIHsKICAgICAgICAgIGNvbnN0IHN0ZXAgPSAyMDsKICAgICAgICAgIHJldHVybiB7CiAgICAgICAgICAgIHg6IE1hdGgubWF4KDAsIE1hdGgubWluKDY0MCwgTWF0aC5yb3VuZCh4IC8gc3RlcCkgKiBzdGVwKSksCiAgICAgICAgICAgIHk6IE1hdGgubWF4KDAsIE1hdGgubWluKDQwMCwgTWF0aC5yb3VuZCh5IC8gc3RlcCkgKiBzdGVwKSksCiAgICAgICAgICB9OwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gaW5zZXJ0VmVjdG9yR3JhcGhJbnRvRWRpdG9yKCkgewogICAgICAgICAgaWYgKCFzdGF0ZS52ZWN0b3JHcmFwaExpbmVzLmxlbmd0aCkgewogICAgICAg",
    "ICAgICBlbGVtZW50cy5wcm9vZnJlYWRpbmdGZWVkYmFjay50ZXh0Q29udGVudCA9ICLjgrDjg6njg5Xjgavnt5rjgpIx5pys5Lul5LiK5byV44GE44Gm44GP44Gg44GV44GE44CCIjsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQogICAgICAgICAgY29uc3Qgc3ZnID0gYnVpbGRWZWN0b3JHcmFwaFN2Z1RleHQoc3RhdGUudmVjdG9yR3JhcGhMaW5lcyk7CiAgICAgICAgICBjb25zdCBkYXRhVXJsID0gYGRhdGE6aW1hZ2Uvc3ZnK3htbDtjaGFyc2V0PXV0Zi04LCR7ZW5jb2RlVVJJQ29tcG9uZW50KHN2Zyl9YDsKICAgICAgICAgIGluc2VydFByb2JsZW1JbWFnZUludG9FZGl0b3IoewogICAgICAgICAgICBuYW1lOiAi44Kw44Op44OV44O744OZ44Kv44OI44OrIiwKICAgICAgICAgICAgZGF0YVVybCwKICAgICAgICAgIH0pOwogICAgICAgICAgY2xvc2VEaWFsb2coZWxlbWVudHMudmVjdG9yR3JhcGhEaWFsb2cpOwogICAgICAgICAgZWxlbWVudHMucHJvb2ZyZWFkaW5nRmVlZGJhY2sudGV4dENvbnRlbnQgPSAiIjsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGJ1aWxkVmVjdG9yR3JhcGhTdmdUZXh0KGxpbmVzKSB7CiAgICAgICAgICBjb25zdCB3aWR0aCA9IDY0MDsKICAgICAgICAgIGNvbnN0IGhlaWdodCA9IDQwMDsKICAgICAgICAgIGNvbnN0IHN0ZXAgPSA0MDsKICAgICAgICAgIGNvbnN0IGdyaWRMaW5lcyA9IFtdOwogICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPD0gd2lkdGg7IHggKz0gc3RlcCkgewogICAgICAgICAgICBncmlkTGluZXMucHVzaCgKICAgICAgICAgICAgICBgPGxpbmUgeDE9IiR7eH0iIHkxPSIwIiB4Mj0iJHt4fSIgeTI9IiR7aGVpZ2h0fSIgc3Ryb2tlPSIke3ggPT09IHdpZHRoIC8gMiA/ICIjOGE5NWEzIiA6ICIjZGNlNmVmIn0i",
    "IHN0cm9rZS13aWR0aD0iJHt4ID09PSB3aWR0aCAvIDIgPyAyIDogMX0iIC8+YCwKICAgICAgICAgICAgKTsKICAgICAgICAgIH0KICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDw9IGhlaWdodDsgeSArPSBzdGVwKSB7CiAgICAgICAgICAgIGdyaWRMaW5lcy5wdXNoKAogICAgICAgICAgICAgIGA8bGluZSB4MT0iMCIgeTE9IiR7eX0iIHgyPSIke3dpZHRofSIgeTI9IiR7eX0iIHN0cm9rZT0iJHt5ID09PSBoZWlnaHQgLyAyID8gIiM4YTk1YTMiIDogIiNkY2U2ZWYifSIgc3Ryb2tlLXdpZHRoPSIke3kgPT09IGhlaWdodCAvIDIgPyAyIDogMX0iIC8+YCwKICAgICAgICAgICAgKTsKICAgICAgICAgIH0KICAgICAgICAgIGNvbnN0IGdyYXBoTGluZXMgPSBsaW5lcwogICAgICAgICAgICAubWFwKChsaW5lKSA9PiB7CiAgICAgICAgICAgICAgY29uc3Qga2luZCA9IGxpbmUua2luZCA9PT0gImFuc3dlciIgPyAiYW5zd2VyIiA6ICJ2ZWN0b3IiOwogICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0ga2luZCA9PT0gImFuc3dlciIgPyAiIzBiN2M0YiIgOiAiIzFkNGY5MSI7CiAgICAgICAgICAgICAgY29uc3QgbWFya2VyID0ga2luZCA9PT0gInZlY3RvciIgPyAnIG1hcmtlci1lbmQ9InVybCgjdmVjdG9yR3JhcGhFeHBvcnRBcnJvdykiJyA6ICIiOwogICAgICAgICAgICAgIHJldHVybiBgPGxpbmUgeDE9IiR7bGluZS54MX0iIHkxPSIke2xpbmUueTF9IiB4Mj0iJHtsaW5lLngyfSIgeTI9IiR7bGluZS55Mn0iIHN0cm9rZT0iJHtjb2xvcn0iIHN0cm9rZS13aWR0aD0iJHtraW5kID09PSAiYW5zd2VyIiA/IDUgOiA0fSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiR7bWFya2VyfSAvPmA7CiAgICAgICAgICAgIH0pCiAgICAgICAgICAgIC5qb2lu",
    "KCIiKTsKICAgICAgICAgIHJldHVybiBgPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIke3dpZHRofSIgaGVpZ2h0PSIke2hlaWdodH0iIHZpZXdCb3g9IjAgMCAke3dpZHRofSAke2hlaWdodH0iIHJvbGU9ImltZyIgYXJpYS1sYWJlbD0i44Kw44Op44OV44O744OZ44Kv44OI44OrIj48ZGVmcz48bWFya2VyIGlkPSJ2ZWN0b3JHcmFwaEV4cG9ydEFycm93IiBtYXJrZXJXaWR0aD0iMTAiIG1hcmtlckhlaWdodD0iMTAiIHJlZlg9IjgiIHJlZlk9IjUiIG9yaWVudD0iYXV0byIgbWFya2VyVW5pdHM9InN0cm9rZVdpZHRoIj48cGF0aCBkPSJNIDAgMCBMIDEwIDUgTCAwIDEwIHoiIGZpbGw9IiMxZDRmOTEiLz48L21hcmtlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2ZmZmZmZiIvPiR7Z3JpZExpbmVzLmpvaW4oIiIpfSR7Z3JhcGhMaW5lc308L3N2Zz5gOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gaW5pdGlhbGl6ZVRleHRCbG9ja0xpc3QoKSB7CiAgICAgICAgICBpZiAoIWVsZW1lbnRzLnRleHRCbG9ja0xpc3QpIHsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQogICAgICAgICAgZWxlbWVudHMudGV4dEJsb2NrTGlzdC5hZGRFdmVudExpc3RlbmVyKCJpbnB1dCIsIChldmVudCkgPT4gewogICAgICAgICAgICBjb25zdCBibG9ja0NhcmQgPSBldmVudC50YXJnZXQgaW5zdGFuY2VvZiBFbGVtZW50ID8gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoIltkYXRhLXRleHQtYmxvY2staWRdIikgOiBudWxsOwogICAgICAgICAgICBjb25zdCBibG9jayA9IGdldFRleHRCbG9ja0J5SWQoYmxvY2tDYXJkPy5nZXRBdHRyaWJ1dGUoImRhdGEtdGV4dC1ibG9jay1pZCIpIHx8ICIiKTsKICAgICAgICAgICAg",
    "aWYgKCFibG9jaykgewogICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgfQogICAgICAgICAgICBibG9jay50ZXh0ID0gZXZlbnQudGFyZ2V0Py50ZXh0Q29udGVudCB8fCAiIjsKICAgICAgICAgICAgdXBkYXRlUHJvYmxlbVByZXZpZXcoKTsKICAgICAgICAgIH0pOwogICAgICAgICAgZWxlbWVudHMudGV4dEJsb2NrTGlzdC5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIChldmVudCkgPT4gewogICAgICAgICAgICBjb25zdCBkZWxldGVCdXR0b24gPSBldmVudC50YXJnZXQgaW5zdGFuY2VvZiBFbGVtZW50ID8gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoIltkYXRhLWRlbGV0ZS10ZXh0LWJsb2NrXSIpIDogbnVsbDsKICAgICAgICAgICAgaWYgKCFkZWxldGVCdXR0b24pIHsKICAgICAgICAgICAgICByZXR1cm47CiAgICAgICAgICAgIH0KICAgICAgICAgICAgZGVsZXRlVGV4dEJsb2NrKGRlbGV0ZUJ1dHRvbi5nZXRBdHRyaWJ1dGUoImRhdGEtZGVsZXRlLXRleHQtYmxvY2siKSB8fCAiIik7CiAgICAgICAgICB9KTsKICAgICAgICAgIGVsZW1lbnRzLnRleHRCbG9ja0xpc3QuYWRkRXZlbnRMaXN0ZW5lcigiZHJhZ3N0YXJ0IiwgKGV2ZW50KSA9PiB7CiAgICAgICAgICAgIGNvbnN0IGJsb2NrQ2FyZCA9IGV2ZW50LnRhcmdldCBpbnN0YW5jZW9mIEVsZW1lbnQgPyBldmVudC50YXJnZXQuY2xvc2VzdCgiW2RhdGEtdGV4dC1ibG9jay1pZF0iKSA6IG51bGw7CiAgICAgICAgICAgIGlmICghKGJsb2NrQ2FyZCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgewogICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgfQogICAgICAgICAgICBzdGF0ZS5kcmFnZ2luZ1RleHRCbG9ja0lkID0gYmxvY2tDYXJkLmRhdGFzZXQudGV4dEJsb2NrSWQgfHwgIiI7CiAgICAgICAgICAgIGJs",
    "b2NrQ2FyZC5jbGFzc0xpc3QuYWRkKCJpcy1kcmFnZ2luZyIpOwogICAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXI/LnNldERhdGEoInRleHQvcGxhaW4iLCBzdGF0ZS5kcmFnZ2luZ1RleHRCbG9ja0lkKTsKICAgICAgICAgICAgaWYgKGV2ZW50LmRhdGFUcmFuc2ZlcikgewogICAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gIm1vdmUiOwogICAgICAgICAgICB9CiAgICAgICAgICB9KTsKICAgICAgICAgIGVsZW1lbnRzLnRleHRCbG9ja0xpc3QuYWRkRXZlbnRMaXN0ZW5lcigiZHJhZ2VuZCIsIChldmVudCkgPT4gewogICAgICAgICAgICBjb25zdCBibG9ja0NhcmQgPSBldmVudC50YXJnZXQgaW5zdGFuY2VvZiBFbGVtZW50ID8gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoIltkYXRhLXRleHQtYmxvY2staWRdIikgOiBudWxsOwogICAgICAgICAgICBibG9ja0NhcmQ/LmNsYXNzTGlzdC5yZW1vdmUoImlzLWRyYWdnaW5nIik7CiAgICAgICAgICAgIHBlcnNpc3RUZXh0QmxvY2tPcmRlckZyb21Eb20oKTsKICAgICAgICAgICAgc3RhdGUuZHJhZ2dpbmdUZXh0QmxvY2tJZCA9ICIiOwogICAgICAgICAgfSk7CiAgICAgICAgICBlbGVtZW50cy50ZXh0QmxvY2tMaXN0LmFkZEV2ZW50TGlzdGVuZXIoImRyYWdvdmVyIiwgKGV2ZW50KSA9PiB7CiAgICAgICAgICAgIGlmICghc3RhdGUuZHJhZ2dpbmdUZXh0QmxvY2tJZCkgewogICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgfQogICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOwogICAgICAgICAgICBjb25zdCBkcmFnZ2luZ0NhcmQgPSBlbGVtZW50cy50ZXh0QmxvY2tMaXN0LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXRleHQtYmxvY2staWQ9IiR7Y3NzRXNjYXBlKHN0YXRlLmRyYWdn",
    "aW5nVGV4dEJsb2NrSWQpfSJdYCk7CiAgICAgICAgICAgIGNvbnN0IHRhcmdldENhcmQgPSBldmVudC50YXJnZXQgaW5zdGFuY2VvZiBFbGVtZW50ID8gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoIltkYXRhLXRleHQtYmxvY2staWRdIikgOiBudWxsOwogICAgICAgICAgICBpZiAoIShkcmFnZ2luZ0NhcmQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgfHwgISh0YXJnZXRDYXJkIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHx8IGRyYWdnaW5nQ2FyZCA9PT0gdGFyZ2V0Q2FyZCkgewogICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgfQogICAgICAgICAgICBjb25zdCByZWN0ID0gdGFyZ2V0Q2FyZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTsKICAgICAgICAgICAgY29uc3QgYmVmb3JlID0gZXZlbnQuY2xpZW50WSA8IHJlY3QudG9wICsgcmVjdC5oZWlnaHQgLyAyOwogICAgICAgICAgICBlbGVtZW50cy50ZXh0QmxvY2tMaXN0Lmluc2VydEJlZm9yZShkcmFnZ2luZ0NhcmQsIGJlZm9yZSA/IHRhcmdldENhcmQgOiB0YXJnZXRDYXJkLm5leHRFbGVtZW50U2libGluZyk7CiAgICAgICAgICB9KTsKICAgICAgICAgIGVsZW1lbnRzLnRleHRCbG9ja0xpc3QuYWRkRXZlbnRMaXN0ZW5lcigiZHJvcCIsIChldmVudCkgPT4gewogICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOwogICAgICAgICAgICBwZXJzaXN0VGV4dEJsb2NrT3JkZXJGcm9tRG9tKCk7CiAgICAgICAgICB9KTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGFkZFRleHRCbG9jayh0eXBlID0gImJvZHkiKSB7CiAgICAgICAgICBjb25zdCBub3JtYWxpemVkVHlwZSA9IHR5cGUgPT09ICJoZWFkaW5nIiA/ICJoZWFkaW5nIiA6ICJib2R5IjsKICAgICAgICAgIGNvbnN0IGJsb2NrID0gewogICAgICAgICAg",
    "ICBpZDogYHRleHRfJHtEYXRlLm5vdygpfV8ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMTYpLnNsaWNlKDIsIDcpfWAsCiAgICAgICAgICAgIHR5cGU6IG5vcm1hbGl6ZWRUeXBlLAogICAgICAgICAgICB0ZXh0OiAiIiwKICAgICAgICAgIH07CiAgICAgICAgICBzdGF0ZS50ZXh0QmxvY2tzLnB1c2goYmxvY2spOwogICAgICAgICAgcmVuZGVyVGV4dEJsb2NrcygpOwogICAgICAgICAgdXBkYXRlUHJvYmxlbVByZXZpZXcoKTsKICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gewogICAgICAgICAgICBlbGVtZW50cy50ZXh0QmxvY2tMaXN0CiAgICAgICAgICAgICAgPy5xdWVyeVNlbGVjdG9yKGBbZGF0YS10ZXh0LWJsb2NrLWlkPSIke2Nzc0VzY2FwZShibG9jay5pZCl9Il0gW2NvbnRlbnRlZGl0YWJsZV1gKQogICAgICAgICAgICAgID8uZm9jdXMoKTsKICAgICAgICAgIH0pOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gZGVsZXRlVGV4dEJsb2NrKGJsb2NrSWQpIHsKICAgICAgICAgIGNvbnN0IG5leHRCbG9ja3MgPSBzdGF0ZS50ZXh0QmxvY2tzLmZpbHRlcigoYmxvY2spID0+IGJsb2NrLmlkICE9PSBibG9ja0lkKTsKICAgICAgICAgIGlmIChuZXh0QmxvY2tzLmxlbmd0aCA9PT0gc3RhdGUudGV4dEJsb2Nrcy5sZW5ndGgpIHsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQogICAgICAgICAgc3RhdGUudGV4dEJsb2NrcyA9IG5leHRCbG9ja3M7CiAgICAgICAgICByZW5kZXJUZXh0QmxvY2tzKCk7CiAgICAgICAgICB1cGRhdGVQcm9ibGVtUHJldmlldygpOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gZ2V0VGV4dEJsb2NrQnlJZChibG9ja0lkKSB7CiAgICAgICAgICByZXR1cm4gc3RhdGUudGV4dEJsb2Nrcy5maW5kKChi",
    "bG9jaykgPT4gYmxvY2suaWQgPT09IGJsb2NrSWQpIHx8IG51bGw7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiByZW5kZXJUZXh0QmxvY2tzKCkgewogICAgICAgICAgaWYgKCFlbGVtZW50cy50ZXh0QmxvY2tMaXN0KSB7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KICAgICAgICAgIGlmICghc3RhdGUudGV4dEJsb2Nrcy5sZW5ndGgpIHsKICAgICAgICAgICAgZWxlbWVudHMudGV4dEJsb2NrTGlzdC5pbm5lckhUTUwgPSBgPHAgY2xhc3M9ImhpbnQtdGV4dCI+6KaL5Ye644GX44G+44Gf44Gv5pys5paH44KS6L+95Yqg44GX44Gm44GP44Gg44GV44GE44CCPC9wPmA7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KICAgICAgICAgIGVsZW1lbnRzLnRleHRCbG9ja0xpc3QuaW5uZXJIVE1MID0gc3RhdGUudGV4dEJsb2NrcwogICAgICAgICAgICAubWFwKChibG9jaykgPT4gewogICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBibG9jay50eXBlID09PSAiaGVhZGluZyIgPyAiaGVhZGluZyIgOiAiYm9keSI7CiAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSB0eXBlID09PSAiaGVhZGluZyIgPyAi44OG44Kt44K544OI5paH77yI6KaL5Ye644GX77yJIiA6ICLjg4bjgq3jgrnjg4jmlofvvIjmnKzmlofvvIkiOwogICAgICAgICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdHlwZSA9PT0gImhlYWRpbmciID8gIuimi+WHuuOBl+OCkuWFpeWKmyIgOiAi5pys5paH44KS5YWl5YqbIjsKICAgICAgICAgICAgICByZXR1cm4gYAogICAgICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9InRleHQtYmxvY2stY2FyZCIgZGF0YS10ZXh0LWJsb2NrLWlkPSIke2VzY2FwZUh0bWwoYmxvY2suaWQpfSI+CiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9ImRyYWct",
    "aGFuZGxlIHRleHQtYmxvY2stZ3JpcCIgdHlwZT0iYnV0dG9uIiBhcmlhLWxhYmVsPSLkuKbjgbPmm7/jgYgiIGRyYWdnYWJsZT0idHJ1ZSI+PC9idXR0b24+CiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9InRleHQtYmxvY2stbWFpbiI+CiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9InRleHQtYmxvY2stdHlwZSI+JHtlc2NhcGVIdG1sKGxhYmVsKX08L3A+CiAgICAgICAgICAgICAgICAgICAgPGRpdgogICAgICAgICAgICAgICAgICAgICAgY2xhc3M9InRleHQtYmxvY2stZWRpdG9yIgogICAgICAgICAgICAgICAgICAgICAgY29udGVudGVkaXRhYmxlPSJwbGFpbnRleHQtb25seSIKICAgICAgICAgICAgICAgICAgICAgIHJvbGU9InRleHRib3giCiAgICAgICAgICAgICAgICAgICAgICBhcmlhLW11bHRpbGluZT0idHJ1ZSIKICAgICAgICAgICAgICAgICAgICAgIGRhdGEtcGxhY2Vob2xkZXI9IiR7ZXNjYXBlSHRtbChwbGFjZWhvbGRlcil9IgogICAgICAgICAgICAgICAgICAgID4ke2VzY2FwZUh0bWwoYmxvY2sudGV4dCB8fCAiIil9PC9kaXY+CiAgICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSJzZWNvbmRhcnkgd2hpdGUtYnV0dG9uIHRleHQtYmxvY2stZGVsZXRlIiB0eXBlPSJidXR0b24iIGRhdGEtZGVsZXRlLXRleHQtYmxvY2s9IiR7ZXNjYXBlSHRtbChibG9jay5pZCl9IiBhcmlhLWxhYmVsPSLliYrpmaQiPgogICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJtYXRlcmlhbC1zeW1ib2xzLXJvdW5kZWQiIGFyaWEtaGlkZGVuPSJ0cnVlIj5kZWxldGU8L3NwYW4+CiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPgogICAgICAgICAgICAgICAgPC9hcnRpY2xlPgogICAgICAgICAgICAgIGA7CiAgICAg",
    "ICAgICAgIH0pCiAgICAgICAgICAgIC5qb2luKCIiKTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHBlcnNpc3RUZXh0QmxvY2tPcmRlckZyb21Eb20oKSB7CiAgICAgICAgICBpZiAoIWVsZW1lbnRzLnRleHRCbG9ja0xpc3QgfHwgIXN0YXRlLnRleHRCbG9ja3MubGVuZ3RoKSB7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KICAgICAgICAgIGNvbnN0IGlkcyA9IEFycmF5LmZyb20oZWxlbWVudHMudGV4dEJsb2NrTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCJbZGF0YS10ZXh0LWJsb2NrLWlkXSIpKQogICAgICAgICAgICAubWFwKChpdGVtKSA9PiBpdGVtLmdldEF0dHJpYnV0ZSgiZGF0YS10ZXh0LWJsb2NrLWlkIikgfHwgIiIpCiAgICAgICAgICAgIC5maWx0ZXIoQm9vbGVhbik7CiAgICAgICAgICBjb25zdCBibG9ja01hcCA9IG5ldyBNYXAoc3RhdGUudGV4dEJsb2Nrcy5tYXAoKGJsb2NrKSA9PiBbYmxvY2suaWQsIGJsb2NrXSkpOwogICAgICAgICAgY29uc3Qgb3JkZXJlZCA9IGlkcy5tYXAoKGlkKSA9PiBibG9ja01hcC5nZXQoaWQpKS5maWx0ZXIoQm9vbGVhbik7CiAgICAgICAgICBpZiAob3JkZXJlZC5sZW5ndGggPT09IHN0YXRlLnRleHRCbG9ja3MubGVuZ3RoKSB7CiAgICAgICAgICAgIHN0YXRlLnRleHRCbG9ja3MgPSBvcmRlcmVkOwogICAgICAgICAgfQogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gaW5pdGlhbGl6ZU5vdGVib29rRWRpdG9yKCkgewogICAgICAgICAgaWYgKCFlbGVtZW50cy5ub3RlYm9va0VkaXRvckJvb2spIHsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQoKICAgICAgICAgIGVsZW1lbnRzLm5vdGVib29rRWRpdG9yQm9vay5hZGRFdmVudExpc3RlbmVyKCJpbnB1dCIsIChldmVudCkgPT4gewogICAgICAgICAgICBj",
    "b25zdCBibG9ja0VsZW1lbnQgPQogICAgICAgICAgICAgIGV2ZW50LnRhcmdldCBpbnN0YW5jZW9mIEVsZW1lbnQgPyBldmVudC50YXJnZXQuY2xvc2VzdCgiW2RhdGEtbm90ZWJvb2stYmxvY2staWRdIikgOiBudWxsOwogICAgICAgICAgICBpZiAoIWJsb2NrRWxlbWVudCkgewogICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgfQogICAgICAgICAgICBjb25zdCBibG9jayA9IGdldE5vdGVib29rQmxvY2tCeUlkKGJsb2NrRWxlbWVudC5kYXRhc2V0Lm5vdGVib29rQmxvY2tJZCB8fCAiIik7CiAgICAgICAgICAgIGlmICghYmxvY2spIHsKICAgICAgICAgICAgICByZXR1cm47CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYmxvY2sudGV4dCA9IGJsb2NrRWxlbWVudC50ZXh0Q29udGVudCB8fCAiIjsKICAgICAgICAgICAgc3luY05vdGVib29rRWRpdG9yVG9Qcm9ibGVtRWRpdG9yKCk7CiAgICAgICAgICB9KTsKCiAgICAgICAgICBlbGVtZW50cy5ub3RlYm9va0VkaXRvckJvb2suYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCAoZXZlbnQpID0+IHsKICAgICAgICAgICAgY29uc3QgYmxvY2tFbGVtZW50ID0KICAgICAgICAgICAgICBldmVudC50YXJnZXQgaW5zdGFuY2VvZiBFbGVtZW50ID8gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoIltkYXRhLW5vdGVib29rLWJsb2NrLWlkXSIpIDogbnVsbDsKICAgICAgICAgICAgaWYgKGJsb2NrRWxlbWVudCkgewogICAgICAgICAgICAgIHNldEFjdGl2ZU5vdGVib29rQmxvY2soYmxvY2tFbGVtZW50LmRhdGFzZXQubm90ZWJvb2tCbG9ja0lkIHx8ICIiKTsKICAgICAgICAgICAgICByZXR1cm47CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKHN0YXRlLm5vdGVib29rU3VwcHJlc3NTdXJmYWNlQ2xpY2spIHsKICAgICAgICAgICAg",
    "ICBzdGF0ZS5ub3RlYm9va1N1cHByZXNzU3VyZmFjZUNsaWNrID0gZmFsc2U7CiAgICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGNvbnN0IHN1cmZhY2UgPQogICAgICAgICAgICAgIGV2ZW50LnRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ID8gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoIltkYXRhLW5vdGVib29rLXBhZ2Utc3VyZmFjZV0iKSA6IG51bGw7CiAgICAgICAgICAgIGlmICghKHN1cmZhY2UgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgfHwgZXZlbnQudGFyZ2V0ICE9PSBzdXJmYWNlKSB7CiAgICAgICAgICAgICAgc2V0QWN0aXZlTm90ZWJvb2tCbG9jaygiIik7CiAgICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBzdXJmYWNlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOwogICAgICAgICAgICBjb25zdCBwYWdlID0gc3VyZmFjZS5kYXRhc2V0Lm5vdGVib29rUGFnZVN1cmZhY2UgPT09ICJxdWVzdGlvbiIgPyAicXVlc3Rpb24iIDogInRleHQiOwogICAgICAgICAgICBhZGROb3RlYm9va0Jsb2NrKHBhZ2UgPT09ICJxdWVzdGlvbiIgPyAicXVlc3Rpb24iIDogInRleHQiLCB7CiAgICAgICAgICAgICAgcGFnZSwKICAgICAgICAgICAgICB4OiBldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0LAogICAgICAgICAgICAgIHk6IGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcCwKICAgICAgICAgICAgfSk7CiAgICAgICAgICB9KTsKCiAgICAgICAgICBlbGVtZW50cy5ub3RlYm9va0VkaXRvckJvb2suYWRkRXZlbnRMaXN0ZW5lcigicG9pbnRlcmRvd24iLCBoYW5kbGVOb3RlYm9va1BvaW50ZXJEb3duKTsKICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCJwb2ludGVybW92ZSIsIGhh",
    "bmRsZU5vdGVib29rUG9pbnRlck1vdmUpOwogICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoInBvaW50ZXJ1cCIsIGZpbmlzaE5vdGVib29rUG9pbnRlckludGVyYWN0aW9uKTsKICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCJwb2ludGVyY2FuY2VsIiwgZmluaXNoTm90ZWJvb2tQb2ludGVySW50ZXJhY3Rpb24pOwoKICAgICAgICAgIHJlbmRlck5vdGVib29rRWRpdG9yRnJhbWUoKTsKICAgICAgICAgIHJlbmRlck5vdGVib29rRWRpdG9yKCk7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBhZGROb3RlYm9va0Jsb2NrKHR5cGUsIG9wdGlvbnMgPSB7fSkgewogICAgICAgICAgY29uc3Qgbm9ybWFsaXplZFR5cGUgPSBbImhlYWRpbmciLCAidGV4dCIsICJxdWVzdGlvbiIsICJmb3JtdWxhIl0uaW5jbHVkZXModHlwZSkgPyB0eXBlIDogInRleHQiOwogICAgICAgICAgY29uc3QgcGFnZSA9IG9wdGlvbnMucGFnZSB8fCAobm9ybWFsaXplZFR5cGUgPT09ICJxdWVzdGlvbiIgfHwgbm9ybWFsaXplZFR5cGUgPT09ICJmb3JtdWxhIiA/ICJxdWVzdGlvbiIgOiAidGV4dCIpOwogICAgICAgICAgY29uc3Qgc3VyZmFjZSA9IGdldE5vdGVib29rU3VyZmFjZShwYWdlKTsKICAgICAgICAgIGNvbnN0IHJlY3QgPSBzdXJmYWNlPy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTsKICAgICAgICAgIGNvbnN0IHNhbWVQYWdlQ291bnQgPSBzdGF0ZS5ub3RlYm9va0Jsb2Nrcy5maWx0ZXIoKGJsb2NrKSA9PiBibG9jay5wYWdlID09PSBwYWdlKS5sZW5ndGg7CiAgICAgICAgICBjb25zdCBjZWxsID0gZ2V0Tm90ZWJvb2tDZWxsU2l6ZSgpOwogICAgICAgICAgY29uc3QgbWF4V2lkdGggPSBNYXRoLm1heChjZWxsICogNywgTWF0aC5mbG9vcigocmVjdD8ud2lkdGggfHwgMzYw",
    "KSAtIGNlbGwgKiAyKSk7CiAgICAgICAgICBjb25zdCBibG9jayA9IHsKICAgICAgICAgICAgaWQ6IGBub3RlYm9va18ke0RhdGUubm93KCl9XyR7TWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc2xpY2UoMiwgNyl9YCwKICAgICAgICAgICAgdHlwZTogbm9ybWFsaXplZFR5cGUsCiAgICAgICAgICAgIHBhZ2UsCiAgICAgICAgICAgIHg6IE51bWJlci5pc0Zpbml0ZShvcHRpb25zLngpID8gTWF0aC5yb3VuZChvcHRpb25zLnggLyBjZWxsKSAqIGNlbGwgOiBjZWxsLAogICAgICAgICAgICB5OiBOdW1iZXIuaXNGaW5pdGUob3B0aW9ucy55KSA/IE1hdGgucm91bmQob3B0aW9ucy55IC8gY2VsbCkgKiBjZWxsIDogY2VsbCArIHNhbWVQYWdlQ291bnQgKiBjZWxsICogMywKICAgICAgICAgICAgdzogTWF0aC5taW4obWF4V2lkdGgsIG5vcm1hbGl6ZWRUeXBlID09PSAiaGVhZGluZyIgPyBjZWxsICogMTQgOiBjZWxsICogMTYpLAogICAgICAgICAgICBoOiBub3JtYWxpemVkVHlwZSA9PT0gImhlYWRpbmciID8gY2VsbCAqIDIgOiBjZWxsICogMywKICAgICAgICAgICAgdGV4dDogIiIsCiAgICAgICAgICB9OwogICAgICAgICAgc3RhdGUubm90ZWJvb2tCbG9ja3MucHVzaChjbGFtcE5vdGVib29rQmxvY2soYmxvY2spKTsKICAgICAgICAgIHN0YXRlLmFjdGl2ZU5vdGVib29rQmxvY2tJZCA9IGJsb2NrLmlkOwogICAgICAgICAgcmVuZGVyTm90ZWJvb2tFZGl0b3IoKTsKICAgICAgICAgIHN5bmNOb3RlYm9va0VkaXRvclRvUHJvYmxlbUVkaXRvcigpOwogICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7CiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZWQgPSBBcnJheS5mcm9tKGVsZW1lbnRzLm5vdGVib29rRWRpdG9yQm9vaz8ucXVlcnlTZWxlY3RvckFsbCgi",
    "W2RhdGEtbm90ZWJvb2stYmxvY2staWRdIikgfHwgW10pLmZpbmQoCiAgICAgICAgICAgICAgKGl0ZW0pID0+IGl0ZW0uZ2V0QXR0cmlidXRlKCJkYXRhLW5vdGVib29rLWJsb2NrLWlkIikgPT09IGJsb2NrLmlkLAogICAgICAgICAgICApOwogICAgICAgICAgICBpZiAoY3JlYXRlZCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7CiAgICAgICAgICAgICAgY3JlYXRlZC5mb2N1cygpOwogICAgICAgICAgICB9CiAgICAgICAgICB9KTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHJlbmRlck5vdGVib29rRWRpdG9yRnJhbWUoKSB7CiAgICAgICAgICBjb25zdCBub3RlID0gZWxlbWVudHMubm90ZVNlbGVjdD8udmFsdWUgfHwgIuaVsOWtpuKFoCI7CiAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTsKICAgICAgICAgIGNvbnN0IGRhdGVMYWJlbCA9IGAke1N0cmluZyhkYXRlLmdldEZ1bGxZZWFyKCkpLnNsaWNlKC0yKX0uJHtkYXRlLmdldE1vbnRoKCkgKyAxfS4ke2RhdGUuZ2V0RGF0ZSgpfWA7CiAgICAgICAgICBzZXRUZXh0Q29udGVudChlbGVtZW50cy5ub3RlYm9va1RleHRTdWJqZWN0LCBub3RlKTsKICAgICAgICAgIHNldFRleHRDb250ZW50KGVsZW1lbnRzLm5vdGVib29rUXVlc3Rpb25TdWJqZWN0LCBub3RlKTsKICAgICAgICAgIHNldFRleHRDb250ZW50KGVsZW1lbnRzLm5vdGVib29rRWRpdG9yRGF0ZSwgZGF0ZUxhYmVsKTsKICAgICAgICAgIGVsZW1lbnRzLm5vdGVib29rRWRpdG9yRGF0ZXM/LmZvckVhY2goKGRhdGVFbGVtZW50KSA9PiB7CiAgICAgICAgICAgIGRhdGVFbGVtZW50LnRleHRDb250ZW50ID0gZGF0ZUxhYmVsOwogICAgICAgICAgICBkYXRlRWxlbWVudC5kYXRlVGltZSA9IGRhdGUudG9JU09TdHJpbmcoKTsKICAgICAgICAgIH0pOwogICAg",
    "ICAgIH0KCiAgICAgICAgZnVuY3Rpb24gcmVuZGVyTm90ZWJvb2tFZGl0b3IoKSB7CiAgICAgICAgICBjb25zdCBzdXJmYWNlcyA9IHsKICAgICAgICAgICAgdGV4dDogZWxlbWVudHMubm90ZWJvb2tUZXh0U3VyZmFjZSwKICAgICAgICAgICAgcXVlc3Rpb246IGVsZW1lbnRzLm5vdGVib29rUXVlc3Rpb25TdXJmYWNlLAogICAgICAgICAgfTsKICAgICAgICAgIE9iamVjdC52YWx1ZXMoc3VyZmFjZXMpLmZvckVhY2goKHN1cmZhY2UpID0+IHsKICAgICAgICAgICAgaWYgKHN1cmZhY2UpIHsKICAgICAgICAgICAgICBzdXJmYWNlLmlubmVySFRNTCA9ICIiOwogICAgICAgICAgICB9CiAgICAgICAgICB9KTsKCiAgICAgICAgICBzdGF0ZS5ub3RlYm9va0Jsb2Nrcy5mb3JFYWNoKChibG9jaykgPT4gewogICAgICAgICAgICBjb25zdCBzdXJmYWNlID0gc3VyZmFjZXNbYmxvY2sucGFnZV0gfHwgc3VyZmFjZXMudGV4dDsKICAgICAgICAgICAgaWYgKCFzdXJmYWNlKSB7CiAgICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGNsYW1wTm90ZWJvb2tCbG9jayhibG9jayk7CiAgICAgICAgICAgIGNvbnN0IGJsb2NrRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImRpdiIpOwogICAgICAgICAgICBibG9ja0VsZW1lbnQuY2xhc3NOYW1lID0gIm5vdGVib29rLWVkaXRvci1ibG9jayI7CiAgICAgICAgICAgIGJsb2NrRWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCJpcy1zZWxlY3RlZCIsIGJsb2NrLmlkID09PSBzdGF0ZS5hY3RpdmVOb3RlYm9va0Jsb2NrSWQpOwogICAgICAgICAgICBibG9ja0VsZW1lbnQuZGF0YXNldC5ub3RlYm9va0Jsb2NrSWQgPSBibG9jay5pZDsKICAgICAgICAgICAgYmxvY2tFbGVtZW50LmRhdGFzZXQuYmxvY2tUeXBlID0g",
    "YmxvY2sudHlwZTsKICAgICAgICAgICAgYmxvY2tFbGVtZW50LnNldEF0dHJpYnV0ZSgiY29udGVudGVkaXRhYmxlIiwgInBsYWludGV4dC1vbmx5Iik7CiAgICAgICAgICAgIGJsb2NrRWxlbWVudC5zZXRBdHRyaWJ1dGUoInJvbGUiLCAidGV4dGJveCIpOwogICAgICAgICAgICBibG9ja0VsZW1lbnQuc2V0QXR0cmlidXRlKCJhcmlhLW11bHRpbGluZSIsICJ0cnVlIik7CiAgICAgICAgICAgIGJsb2NrRWxlbWVudC5zZXRBdHRyaWJ1dGUoInNwZWxsY2hlY2siLCAiZmFsc2UiKTsKICAgICAgICAgICAgYmxvY2tFbGVtZW50LnNldEF0dHJpYnV0ZSgiZGF0YS1wbGFjZWhvbGRlciIsIGdldE5vdGVib29rQmxvY2tQbGFjZWhvbGRlcihibG9jay50eXBlKSk7CiAgICAgICAgICAgIGJsb2NrRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgiLS1ibG9jay14IiwgU3RyaW5nKGJsb2NrLngpKTsKICAgICAgICAgICAgYmxvY2tFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCItLWJsb2NrLXkiLCBTdHJpbmcoYmxvY2sueSkpOwogICAgICAgICAgICBibG9ja0VsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoIi0tYmxvY2stdyIsIFN0cmluZyhibG9jay53KSk7CiAgICAgICAgICAgIGJsb2NrRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgiLS1ibG9jay1oIiwgU3RyaW5nKGJsb2NrLmgpKTsKICAgICAgICAgICAgYmxvY2tFbGVtZW50LnRleHRDb250ZW50ID0gYmxvY2sudGV4dDsKICAgICAgICAgICAgc3VyZmFjZS5hcHBlbmQoYmxvY2tFbGVtZW50KTsKICAgICAgICAgIH0pOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gaGFuZGxlTm90ZWJvb2tQb2ludGVyRG93bihldmVudCkgewogICAgICAgICAgY29uc3QgYmxvY2tFbGVtZW50ID0KICAgICAgICAgICAgZXZlbnQudGFyZ2V0IGluc3Rh",
    "bmNlb2YgRWxlbWVudCA/IGV2ZW50LnRhcmdldC5jbG9zZXN0KCJbZGF0YS1ub3RlYm9vay1ibG9jay1pZF0iKSA6IG51bGw7CiAgICAgICAgICBpZiAoIShibG9ja0VsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQogICAgICAgICAgY29uc3QgYmxvY2sgPSBnZXROb3RlYm9va0Jsb2NrQnlJZChibG9ja0VsZW1lbnQuZGF0YXNldC5ub3RlYm9va0Jsb2NrSWQgfHwgIiIpOwogICAgICAgICAgY29uc3Qgc3VyZmFjZSA9IGJsb2NrRWxlbWVudC5jbG9zZXN0KCJbZGF0YS1ub3RlYm9vay1wYWdlLXN1cmZhY2VdIik7CiAgICAgICAgICBpZiAoIWJsb2NrIHx8ICEoc3VyZmFjZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgewogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CgogICAgICAgICAgc2V0QWN0aXZlTm90ZWJvb2tCbG9jayhibG9jay5pZCk7CiAgICAgICAgICBjbGVhck5vdGVib29rTG9uZ1ByZXNzVGltZXIoKTsKICAgICAgICAgIHN0YXRlLm5vdGVib29rRHJhZ1N0YXRlID0gewogICAgICAgICAgICBibG9jaywKICAgICAgICAgICAgYmxvY2tFbGVtZW50LAogICAgICAgICAgICBzdXJmYWNlLAogICAgICAgICAgICBwb2ludGVySWQ6IGV2ZW50LnBvaW50ZXJJZCwKICAgICAgICAgICAgc3RhcnRYOiBldmVudC5jbGllbnRYLAogICAgICAgICAgICBzdGFydFk6IGV2ZW50LmNsaWVudFksCiAgICAgICAgICAgIG9yaWdpblg6IGJsb2NrLngsCiAgICAgICAgICAgIG9yaWdpblk6IGJsb2NrLnksCiAgICAgICAgICAgIGRyYWdnaW5nOiBmYWxzZSwKICAgICAgICAgIH07CiAgICAgICAgICBzdGF0ZS5ub3RlYm9va0xvbmdQcmVzc1RpbWVySWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7CiAgICAg",
    "ICAgICAgIHN0YXJ0Tm90ZWJvb2tCbG9ja0RyYWcoZXZlbnQucG9pbnRlcklkKTsKICAgICAgICAgIH0sIDI4MCk7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBoYW5kbGVOb3RlYm9va1BvaW50ZXJNb3ZlKGV2ZW50KSB7CiAgICAgICAgICBjb25zdCBkcmFnU3RhdGUgPSBzdGF0ZS5ub3RlYm9va0RyYWdTdGF0ZTsKICAgICAgICAgIGlmICghZHJhZ1N0YXRlIHx8IGRyYWdTdGF0ZS5wb2ludGVySWQgIT09IGV2ZW50LnBvaW50ZXJJZCkgewogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CiAgICAgICAgICBjb25zdCBkZWx0YVggPSBldmVudC5jbGllbnRYIC0gZHJhZ1N0YXRlLnN0YXJ0WDsKICAgICAgICAgIGNvbnN0IGRlbHRhWSA9IGV2ZW50LmNsaWVudFkgLSBkcmFnU3RhdGUuc3RhcnRZOwogICAgICAgICAgaWYgKCFkcmFnU3RhdGUuZHJhZ2dpbmcgJiYgTWF0aC5oeXBvdChkZWx0YVgsIGRlbHRhWSkgPiA5KSB7CiAgICAgICAgICAgIGNsZWFyTm90ZWJvb2tMb25nUHJlc3NUaW1lcigpOwogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CiAgICAgICAgICBpZiAoIWRyYWdTdGF0ZS5kcmFnZ2luZykgewogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CgogICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsKICAgICAgICAgIGNvbnN0IGNlbGwgPSBnZXROb3RlYm9va0NlbGxTaXplKCk7CiAgICAgICAgICBkcmFnU3RhdGUuYmxvY2sueCA9IE1hdGgucm91bmQoKGRyYWdTdGF0ZS5vcmlnaW5YICsgZGVsdGFYKSAvIGNlbGwpICogY2VsbDsKICAgICAgICAgIGRyYWdTdGF0ZS5ibG9jay55ID0gTWF0aC5yb3VuZCgoZHJhZ1N0YXRlLm9yaWdpblkgKyBkZWx0YVkpIC8gY2VsbCkgKiBjZWxsOwogICAgICAgICAgY2xhbXBOb3RlYm9va0Jsb2Nr",
    "KGRyYWdTdGF0ZS5ibG9jaywgZHJhZ1N0YXRlLnN1cmZhY2UpOwogICAgICAgICAgZHJhZ1N0YXRlLmJsb2NrRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgiLS1ibG9jay14IiwgU3RyaW5nKGRyYWdTdGF0ZS5ibG9jay54KSk7CiAgICAgICAgICBkcmFnU3RhdGUuYmxvY2tFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCItLWJsb2NrLXkiLCBTdHJpbmcoZHJhZ1N0YXRlLmJsb2NrLnkpKTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHN0YXJ0Tm90ZWJvb2tCbG9ja0RyYWcocG9pbnRlcklkKSB7CiAgICAgICAgICBjb25zdCBkcmFnU3RhdGUgPSBzdGF0ZS5ub3RlYm9va0RyYWdTdGF0ZTsKICAgICAgICAgIGlmICghZHJhZ1N0YXRlIHx8IGRyYWdTdGF0ZS5wb2ludGVySWQgIT09IHBvaW50ZXJJZCkgewogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CiAgICAgICAgICBkcmFnU3RhdGUuZHJhZ2dpbmcgPSB0cnVlOwogICAgICAgICAgZHJhZ1N0YXRlLmJsb2NrRWxlbWVudC5jbGFzc0xpc3QuYWRkKCJpcy1kcmFnZ2luZyIpOwogICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgZHJhZ1N0YXRlLmJsb2NrRWxlbWVudC5zZXRQb2ludGVyQ2FwdHVyZShwb2ludGVySWQpOwogICAgICAgICAgfSBjYXRjaCB7CiAgICAgICAgICAgIC8vIFBvaW50ZXIgY2FwdHVyZSBpcyBvcHRpb25hbDsgZHJhZ2dpbmcgc3RpbGwgd29ya3Mgd2l0aG91dCBpdC4KICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGZpbmlzaE5vdGVib29rUG9pbnRlckludGVyYWN0aW9uKGV2ZW50KSB7CiAgICAgICAgICBjb25zdCBkcmFnU3RhdGUgPSBzdGF0ZS5ub3RlYm9va0RyYWdTdGF0ZTsKICAgICAgICAgIGNsZWFyTm90ZWJvb2tMb25nUHJlc3NUaW1lcigpOwogICAgICAgICAg",
    "aWYgKCFkcmFnU3RhdGUgfHwgZHJhZ1N0YXRlLnBvaW50ZXJJZCAhPT0gZXZlbnQucG9pbnRlcklkKSB7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KICAgICAgICAgIGRyYWdTdGF0ZS5ibG9ja0VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgiaXMtZHJhZ2dpbmciKTsKICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgIGRyYWdTdGF0ZS5ibG9ja0VsZW1lbnQucmVsZWFzZVBvaW50ZXJDYXB0dXJlKGV2ZW50LnBvaW50ZXJJZCk7CiAgICAgICAgICB9IGNhdGNoIHsKICAgICAgICAgICAgLy8gTm90aGluZyB0byByZWxlYXNlIGluIGJyb3dzZXJzIHRoYXQgc2tpcHBlZCBjYXB0dXJlLgogICAgICAgICAgfQogICAgICAgICAgaWYgKGRyYWdTdGF0ZS5kcmFnZ2luZykgewogICAgICAgICAgICBzeW5jTm90ZWJvb2tFZGl0b3JUb1Byb2JsZW1FZGl0b3IoKTsKICAgICAgICAgICAgc3RhdGUubm90ZWJvb2tTdXBwcmVzc1N1cmZhY2VDbGljayA9IHRydWU7CiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHsKICAgICAgICAgICAgICBzdGF0ZS5ub3RlYm9va1N1cHByZXNzU3VyZmFjZUNsaWNrID0gZmFsc2U7CiAgICAgICAgICAgIH0sIDApOwogICAgICAgICAgfQogICAgICAgICAgc3RhdGUubm90ZWJvb2tEcmFnU3RhdGUgPSBudWxsOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gY2xlYXJOb3RlYm9va0xvbmdQcmVzc1RpbWVyKCkgewogICAgICAgICAgaWYgKHN0YXRlLm5vdGVib29rTG9uZ1ByZXNzVGltZXJJZCkgewogICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHN0YXRlLm5vdGVib29rTG9uZ1ByZXNzVGltZXJJZCk7CiAgICAgICAgICAgIHN0YXRlLm5vdGVib29rTG9uZ1ByZXNzVGltZXJJZCA9IG51bGw7CiAgICAgICAgICB9CiAgICAg",
    "ICAgfQoKICAgICAgICBmdW5jdGlvbiBzZXRBY3RpdmVOb3RlYm9va0Jsb2NrKGJsb2NrSWQpIHsKICAgICAgICAgIHN0YXRlLmFjdGl2ZU5vdGVib29rQmxvY2tJZCA9IGJsb2NrSWQ7CiAgICAgICAgICBlbGVtZW50cy5ub3RlYm9va0VkaXRvckJvb2s/LnF1ZXJ5U2VsZWN0b3JBbGwoIltkYXRhLW5vdGVib29rLWJsb2NrLWlkXSIpLmZvckVhY2goKGJsb2NrKSA9PiB7CiAgICAgICAgICAgIGJsb2NrLmNsYXNzTGlzdC50b2dnbGUoImlzLXNlbGVjdGVkIiwgYmxvY2suZ2V0QXR0cmlidXRlKCJkYXRhLW5vdGVib29rLWJsb2NrLWlkIikgPT09IGJsb2NrSWQpOwogICAgICAgICAgfSk7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBnZXROb3RlYm9va0Jsb2NrQnlJZChibG9ja0lkKSB7CiAgICAgICAgICByZXR1cm4gc3RhdGUubm90ZWJvb2tCbG9ja3MuZmluZCgoYmxvY2spID0+IGJsb2NrLmlkID09PSBibG9ja0lkKSB8fCBudWxsOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gZ2V0Tm90ZWJvb2tTdXJmYWNlKHBhZ2UpIHsKICAgICAgICAgIHJldHVybiBwYWdlID09PSAicXVlc3Rpb24iID8gZWxlbWVudHMubm90ZWJvb2tRdWVzdGlvblN1cmZhY2UgOiBlbGVtZW50cy5ub3RlYm9va1RleHRTdXJmYWNlOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gZ2V0Tm90ZWJvb2tDZWxsU2l6ZSgpIHsKICAgICAgICAgIHJldHVybiAyNDsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGNsYW1wTm90ZWJvb2tCbG9jayhibG9jaywgc3VyZmFjZSA9IGdldE5vdGVib29rU3VyZmFjZShibG9jay5wYWdlKSkgewogICAgICAgICAgY29uc3QgY2VsbCA9IGdldE5vdGVib29rQ2VsbFNpemUoKTsKICAgICAgICAgIGNvbnN0IG1heFggPSBNYXRoLm1heCgwLCBNYXRoLmZsb29y",
    "KCgoc3VyZmFjZT8uY2xpZW50V2lkdGggfHwgMzYwKSAtIGJsb2NrLncpIC8gY2VsbCkgKiBjZWxsKTsKICAgICAgICAgIGNvbnN0IG1heFkgPSBNYXRoLm1heCgwLCBNYXRoLmZsb29yKCgoc3VyZmFjZT8uY2xpZW50SGVpZ2h0IHx8IDQyMCkgLSBibG9jay5oKSAvIGNlbGwpICogY2VsbCk7CiAgICAgICAgICBibG9jay54ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4obWF4WCwgTWF0aC5yb3VuZChibG9jay54IC8gY2VsbCkgKiBjZWxsKSk7CiAgICAgICAgICBibG9jay55ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4obWF4WSwgTWF0aC5yb3VuZChibG9jay55IC8gY2VsbCkgKiBjZWxsKSk7CiAgICAgICAgICBibG9jay53ID0gTWF0aC5tYXgoY2VsbCAqIDUsIE1hdGgucm91bmQoYmxvY2sudyAvIGNlbGwpICogY2VsbCk7CiAgICAgICAgICBibG9jay5oID0gTWF0aC5tYXgoY2VsbCAqIDIsIE1hdGgucm91bmQoYmxvY2suaCAvIGNlbGwpICogY2VsbCk7CiAgICAgICAgICByZXR1cm4gYmxvY2s7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBnZXROb3RlYm9va0Jsb2NrUGxhY2Vob2xkZXIodHlwZSkgewogICAgICAgICAgaWYgKHR5cGUgPT09ICJoZWFkaW5nIikgewogICAgICAgICAgICByZXR1cm4gIuimi+WHuuOBlyI7CiAgICAgICAgICB9CiAgICAgICAgICBpZiAodHlwZSA9PT0gInF1ZXN0aW9uIikgewogICAgICAgICAgICByZXR1cm4gIuWVj+mhjOaWhyI7CiAgICAgICAgICB9CiAgICAgICAgICBpZiAodHlwZSA9PT0gImZvcm11bGEiKSB7CiAgICAgICAgICAgIHJldHVybiAiYV4yICsgYl4yID0gY14yIjsKICAgICAgICAgIH0KICAgICAgICAgIHJldHVybiAi5pys5paHIjsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHN5bmNOb3RlYm9va0VkaXRvclRvUHJvYmxl",
    "bUVkaXRvcigpIHsKICAgICAgICAgIGlmICghZWxlbWVudHMucHJvYmxlbUVkaXRvcikgewogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CiAgICAgICAgICBjb25zdCBwYWdlT3JkZXIgPSB7IHRleHQ6IDAsIHF1ZXN0aW9uOiAxIH07CiAgICAgICAgICBjb25zdCBibG9ja3MgPSBbLi4uc3RhdGUubm90ZWJvb2tCbG9ja3NdCiAgICAgICAgICAgIC5maWx0ZXIoKGJsb2NrKSA9PiBTdHJpbmcoYmxvY2sudGV4dCB8fCAiIikudHJpbSgpKQogICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gKHBhZ2VPcmRlclthLnBhZ2VdID8/IDApIC0gKHBhZ2VPcmRlcltiLnBhZ2VdID8/IDApIHx8IGEueSAtIGIueSB8fCBhLnggLSBiLngpOwogICAgICAgICAgZWxlbWVudHMucHJvYmxlbUVkaXRvci5pbm5lckhUTUwgPSBibG9ja3MKICAgICAgICAgICAgLm1hcCgoYmxvY2spID0+IHsKICAgICAgICAgICAgICBjb25zdCB0YWcgPSBibG9jay50eXBlID09PSAiaGVhZGluZyIgPyAiaDMiIDogInAiOwogICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gYmxvY2sudHlwZSA9PT0gInF1ZXN0aW9uIiA/ICLllY/poYwiIDogYmxvY2sudHlwZSA9PT0gImZvcm11bGEiID8gIuaVsOW8jyIgOiAiIjsKICAgICAgICAgICAgICBjb25zdCBwcmVmaXggPSBsYWJlbCA/IGA8c3Ryb25nPiR7bGFiZWx9PC9zdHJvbmc+IGAgOiAiIjsKICAgICAgICAgICAgICByZXR1cm4gYDwke3RhZ30+JHtwcmVmaXh9JHtlc2NhcGVIdG1sKGJsb2NrLnRleHQpLnJlcGxhY2UoL1xuL2csICI8YnI+Iil9PC8ke3RhZ30+YDsKICAgICAgICAgICAgfSkKICAgICAgICAgICAgLmpvaW4oIiIpOwogICAgICAgICAgdXBkYXRlRWRpdG9yQ291bnRzKCk7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBwb3B1bGF0ZUJpbmRl",
    "ck9wdGlvbnMoKSB7CiAgICAgICAgICBjb25zdCBiaW5kZXJzID0gT2JqZWN0LmtleXMoTk9URV9CWV9CSU5ERVIpOwogICAgICAgICAgaWYgKCFlbGVtZW50cy5iaW5kZXJTZWxlY3QpIHsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQogICAgICAgICAgZWxlbWVudHMuYmluZGVyU2VsZWN0LmlubmVySFRNTCA9IGJpbmRlcnMKICAgICAgICAgICAgLm1hcCgoYmluZGVyKSA9PiBgPG9wdGlvbiB2YWx1ZT0iJHtlc2NhcGVIdG1sKGJpbmRlcil9Ij4ke2VzY2FwZUh0bWwoYmluZGVyKX08L29wdGlvbj5gKQogICAgICAgICAgICAuam9pbigiIik7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiB1cGRhdGVOb3RlT3B0aW9ucygpIHsKICAgICAgICAgIGlmICghZWxlbWVudHMubm90ZVNlbGVjdCkgewogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CiAgICAgICAgICBjb25zdCBiaW5kZXJFbnRyaWVzID0gT2JqZWN0LmVudHJpZXMoTk9URV9CWV9CSU5ERVIpOwogICAgICAgICAgZWxlbWVudHMubm90ZVNlbGVjdC5pbm5lckhUTUwgPSBiaW5kZXJFbnRyaWVzCiAgICAgICAgICAgIC5tYXAoKFtiaW5kZXIsIG5vdGVzXSkgPT4gewogICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSAobm90ZXMgfHwgW10pCiAgICAgICAgICAgICAgICAubWFwKChub3RlKSA9PiBgPG9wdGlvbiB2YWx1ZT0iJHtlc2NhcGVIdG1sKG5vdGUpfSIgZGF0YS1iaW5kZXI9IiR7ZXNjYXBlSHRtbChiaW5kZXIpfSI+JHtlc2NhcGVIdG1sKG5vdGUpfTwvb3B0aW9uPmApCiAgICAgICAgICAgICAgICAuam9pbigiIik7CiAgICAgICAgICAgICAgcmV0dXJuIGA8b3B0Z3JvdXAgbGFiZWw9IiR7ZXNjYXBlSHRtbChiaW5kZXIpfSI+JHtvcHRpb25zfTwvb3B0Z3JvdXA+YDsKICAgICAgICAgICAg",
    "fSkKICAgICAgICAgICAgLmpvaW4oIiIpOwogICAgICAgICAgc3luY0JpbmRlckZyb21TZWxlY3RlZE5vdGUoKTsKICAgICAgICAgIHVwZGF0ZUNoYXB0ZXJPcHRpb25zKCk7CiAgICAgICAgICB1cGRhdGVQcm9ibGVtUHJldmlldygpOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gc3luY0JpbmRlckZyb21TZWxlY3RlZE5vdGUoKSB7CiAgICAgICAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IGVsZW1lbnRzLm5vdGVTZWxlY3Q/LnNlbGVjdGVkT3B0aW9ucz8uWzBdIHx8IG51bGw7CiAgICAgICAgICBjb25zdCBiaW5kZXIgPSBzZWxlY3RlZE9wdGlvbj8uZGF0YXNldD8uYmluZGVyIHx8IE9iamVjdC5rZXlzKE5PVEVfQllfQklOREVSKVswXSB8fCAiIjsKICAgICAgICAgIGlmIChlbGVtZW50cy5iaW5kZXJTZWxlY3QpIHsKICAgICAgICAgICAgZWxlbWVudHMuYmluZGVyU2VsZWN0LnZhbHVlID0gYmluZGVyOwogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIGJpbmRlcjsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHVwZGF0ZUNoYXB0ZXJPcHRpb25zKCkgewogICAgICAgICAgaWYgKCFlbGVtZW50cy5jaGFwdGVyU2VsZWN0KSB7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IGdldENoYXB0ZXJDb25maWcoZWxlbWVudHMubm90ZVNlbGVjdD8udmFsdWUgfHwgIiIpOwogICAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gZWxlbWVudHMuY2hhcHRlclNlbGVjdC52YWx1ZTsKICAgICAgICAgIGlmIChlbGVtZW50cy5jaGFwdGVyRmllbGRMYWJlbCkgewogICAgICAgICAgICBlbGVtZW50cy5jaGFwdGVyRmllbGRMYWJlbC50ZXh0Q29udGVudCA9IGNvbmZpZy5sYWJlbDsKICAgICAgICAgIH0KICAgICAgICAgIGVs",
    "ZW1lbnRzLmNoYXB0ZXJTZWxlY3QuaW5uZXJIVE1MID0gWwogICAgICAgICAgICBgPG9wdGlvbiB2YWx1ZT0iIiBkaXNhYmxlZD4ke2VzY2FwZUh0bWwoY29uZmlnLmxhYmVsKX3jgpLpgbjmip7jgZfjgabjgY/jgaDjgZXjgYQ8L29wdGlvbj5gLAogICAgICAgICAgICAuLi5jb25maWcub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gYDxvcHRpb24gdmFsdWU9IiR7ZXNjYXBlSHRtbChvcHRpb24pfSI+JHtlc2NhcGVIdG1sKG9wdGlvbil9PC9vcHRpb24+YCksCiAgICAgICAgICBdLmpvaW4oIiIpOwogICAgICAgICAgZWxlbWVudHMuY2hhcHRlclNlbGVjdC52YWx1ZSA9IGNvbmZpZy5vcHRpb25zLmluY2x1ZGVzKGN1cnJlbnRWYWx1ZSkgPyBjdXJyZW50VmFsdWUgOiAiIjsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVByb2JsZW1QcmV2aWV3KCkgewogICAgICAgICAgY29uc3QgYmluZGVyID0gc3luY0JpbmRlckZyb21TZWxlY3RlZE5vdGUoKTsKICAgICAgICAgIGNvbnN0IG5vdGUgPSBlbGVtZW50cy5ub3RlU2VsZWN0Py52YWx1ZS50cmltKCkgfHwgIiI7CiAgICAgICAgICBjb25zdCB0ZXh0TnVtYmVyID0gZWxlbWVudHMudGV4dE51bWJlcklucHV0Py52YWx1ZS50cmltKCkgfHwgIiI7CiAgICAgICAgICBjb25zdCB0ZXh0TmFtZSA9IGVsZW1lbnRzLnRleHROYW1lSW5wdXQ/LnZhbHVlLnRyaW0oKSB8fCAiIjsKICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uTnVtYmVyID0gZWxlbWVudHMucXVlc3Rpb25OdW1iZXJJbnB1dD8udmFsdWUudHJpbSgpIHx8ICIiOwogICAgICAgICAgY29uc3QgcXVlc3Rpb25OYW1lID0gZWxlbWVudHMucXVlc3Rpb25OYW1lSW5wdXQ/LnZhbHVlLnRyaW0oKSB8fCAiIjsKICAgICAgICAgIGNvbnN0IGNvbnRlbnRUZXh0ID0gZ2V0UHJvYmxl",
    "bUVkaXRvckNvbnRlbnRUZXh0KCkucmVwbGFjZSgvXHMrL2csICIgIikudHJpbSgpOwoKICAgICAgICAgIGNvbnN0IG1pc3NpbmdGaWVsZHMgPSBbXTsKICAgICAgICAgIGlmICghbm90ZSkgewogICAgICAgICAgICBtaXNzaW5nRmllbGRzLnB1c2goIuODjuODvOODiCIpOwogICAgICAgICAgfQogICAgICAgICAgaWYgKCF0ZXh0TnVtYmVyKSB7CiAgICAgICAgICAgIG1pc3NpbmdGaWVsZHMucHVzaCgi44OG44Kt44K544OI55Wq5Y+3Iik7CiAgICAgICAgICB9CiAgICAgICAgICBpZiAoIXRleHROYW1lKSB7CiAgICAgICAgICAgIG1pc3NpbmdGaWVsZHMucHVzaCgi44OG44Kt44K544OI5ZCNIik7CiAgICAgICAgICB9CiAgICAgICAgICBpZiAoIXF1ZXN0aW9uTnVtYmVyKSB7CiAgICAgICAgICAgIG1pc3NpbmdGaWVsZHMucHVzaCgi5ZWP6aGM55Wq5Y+3Iik7CiAgICAgICAgICB9CiAgICAgICAgICBpZiAoIXF1ZXN0aW9uTmFtZSkgewogICAgICAgICAgICBtaXNzaW5nRmllbGRzLnB1c2goIuWVj+mhjOWQjSIpOwogICAgICAgICAgfQogICAgICAgICAgaWYgKCFjb250ZW50VGV4dCkgewogICAgICAgICAgICBtaXNzaW5nRmllbGRzLnB1c2goIuWVj+mhjOaWhyIpOwogICAgICAgICAgfQoKICAgICAgICAgIGVsZW1lbnRzLnByb2JsZW1DcmVhdGVGb3JtPy5jbGFzc0xpc3QudG9nZ2xlKCJpcy1yZWFkeSIsIG1pc3NpbmdGaWVsZHMubGVuZ3RoID09PSAwKTsKICAgICAgICAgIHNldFByb2JsZW1TdGVwKG1pc3NpbmdGaWVsZHMubGVuZ3RoID09PSAwID8gImNvbmZpcm0iIDogImNyZWF0ZSIpOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gZ2V0UHJvYmxlbUVkaXRvckNvbnRlbnRUZXh0KCkgewogICAgICAgICAgY29uc3QgdGV4dCA9IChlbGVtZW50cy5wcm9ibGVtRWRpdG9y",
    "Py50ZXh0Q29udGVudCB8fCAiIikudHJpbSgpOwogICAgICAgICAgaWYgKHRleHQpIHsKICAgICAgICAgICAgcmV0dXJuIHRleHQ7CiAgICAgICAgICB9CiAgICAgICAgICBjb25zdCBpbWFnZUxhYmVscyA9IEFycmF5LmZyb20oZWxlbWVudHMucHJvYmxlbUVkaXRvcj8ucXVlcnlTZWxlY3RvckFsbCgiaW1nIikgfHwgW10pCiAgICAgICAgICAgIC5tYXAoKGltYWdlKSA9PiBpbWFnZS5nZXRBdHRyaWJ1dGUoImFsdCIpIHx8ICLnlLvlg48iKQogICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pOwogICAgICAgICAgcmV0dXJuIGltYWdlTGFiZWxzLmpvaW4oIiAiKTsKICAgICAgICB9CgogICAgICAgIGFzeW5jIGZ1bmN0aW9uIGxvYWRQcm9ibGVtQ3N2SW1wb3J0KCkgewogICAgICAgICAgY29uc3QgZmlsZSA9IGVsZW1lbnRzLnByb2JsZW1Dc3ZJbnB1dD8uZmlsZXM/LlswXSB8fCBudWxsOwogICAgICAgICAgc3RhdGUuY3N2SW1wb3J0RHJhZnRzID0gW107CiAgICAgICAgICBpZiAoIWZpbGUpIHsKICAgICAgICAgICAgcmVuZGVyUHJvYmxlbUNzdkltcG9ydCgiQ1NW44KS6YG45oqe44GX44Gm44GP44Gg44GV44GE44CCIik7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KCiAgICAgICAgICB0cnkgewogICAgICAgICAgICBjb25zdCB0ZXh0ID0gYXdhaXQgZmlsZS50ZXh0KCk7CiAgICAgICAgICAgIGNvbnN0IHJvd3MgPSBwYXJzZUNzdlJvd3ModGV4dCk7CiAgICAgICAgICAgIGlmIChyb3dzLmxlbmd0aCA8IDIpIHsKICAgICAgICAgICAgICByZW5kZXJQcm9ibGVtQ3N2SW1wb3J0KCJDU1bjgavoqq3jgb/ovrzjgoHjgovllY/poYzjgYzjgYLjgorjgb7jgZvjgpPjgIIiKTsKICAgICAgICAgICAgICByZXR1cm47CiAgICAgICAgICAgIH0KICAgICAgICAgICAgY29uc3Qg",
    "aGVhZGVycyA9IHJvd3NbMF0ubWFwKChoZWFkZXIpID0+IG5vcm1hbGl6ZUNzdkhlYWRlcihoZWFkZXIpKTsKICAgICAgICAgICAgc3RhdGUuY3N2SW1wb3J0RHJhZnRzID0gcm93cwogICAgICAgICAgICAgIC5zbGljZSgxKQogICAgICAgICAgICAgIC5tYXAoKHJvdywgaW5kZXgpID0+IGNyZWF0ZVByb2JsZW1EcmFmdEZyb21Dc3ZSZWNvcmQoY3JlYXRlQ3N2UmVjb3JkKGhlYWRlcnMsIHJvdyksIGluZGV4KSkKICAgICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pOwogICAgICAgICAgICByZW5kZXJQcm9ibGVtQ3N2SW1wb3J0KCk7CiAgICAgICAgICB9IGNhdGNoIHsKICAgICAgICAgICAgc3RhdGUuY3N2SW1wb3J0RHJhZnRzID0gW107CiAgICAgICAgICAgIHJlbmRlclByb2JsZW1Dc3ZJbXBvcnQoIkNTVuOCkuiqreOBv+i+vOOCgeOBvuOBm+OCk+OBp+OBl+OBn+OAguODleOCoeOCpOODq+W9ouW8j+OCkueiuuiqjeOBl+OBpuOBj+OBoOOBleOBhOOAgiIpOwogICAgICAgICAgfQogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gcGFyc2VDc3ZSb3dzKHRleHQpIHsKICAgICAgICAgIGNvbnN0IHJvd3MgPSBbXTsKICAgICAgICAgIGxldCByb3cgPSBbXTsKICAgICAgICAgIGxldCBjZWxsID0gIiI7CiAgICAgICAgICBsZXQgcXVvdGVkID0gZmFsc2U7CiAgICAgICAgICBjb25zdCBzb3VyY2UgPSBTdHJpbmcodGV4dCB8fCAiIikucmVwbGFjZSgvXlx1RkVGRi8sICIiKTsKICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzb3VyY2UubGVuZ3RoOyBpbmRleCArPSAxKSB7CiAgICAgICAgICAgIGNvbnN0IGNoYXIgPSBzb3VyY2VbaW5kZXhdOwogICAgICAgICAgICBjb25zdCBuZXh0ID0gc291cmNlW2luZGV4ICsgMV07CiAgICAgICAgICAgIGlmIChxdW90ZWQp",
    "IHsKICAgICAgICAgICAgICBpZiAoY2hhciA9PT0gJyInICYmIG5leHQgPT09ICciJykgewogICAgICAgICAgICAgICAgY2VsbCArPSAnIic7CiAgICAgICAgICAgICAgICBpbmRleCArPSAxOwogICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhciA9PT0gJyInKSB7CiAgICAgICAgICAgICAgICBxdW90ZWQgPSBmYWxzZTsKICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgY2VsbCArPSBjaGFyOwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgICBjb250aW51ZTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAoY2hhciA9PT0gJyInKSB7CiAgICAgICAgICAgICAgcXVvdGVkID0gdHJ1ZTsKICAgICAgICAgICAgICBjb250aW51ZTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAoY2hhciA9PT0gIiwiKSB7CiAgICAgICAgICAgICAgcm93LnB1c2goY2VsbCk7CiAgICAgICAgICAgICAgY2VsbCA9ICIiOwogICAgICAgICAgICAgIGNvbnRpbnVlOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChjaGFyID09PSAiXG4iKSB7CiAgICAgICAgICAgICAgcm93LnB1c2goY2VsbCk7CiAgICAgICAgICAgICAgaWYgKHJvdy5zb21lKCh2YWx1ZSkgPT4gU3RyaW5nKHZhbHVlIHx8ICIiKS50cmltKCkpKSB7CiAgICAgICAgICAgICAgICByb3dzLnB1c2gocm93KTsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgcm93ID0gW107CiAgICAgICAgICAgICAgY2VsbCA9ICIiOwogICAgICAgICAgICAgIGNvbnRpbnVlOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChjaGFyICE9PSAiXHIiKSB7CiAgICAgICAgICAgICAgY2VsbCArPSBjaGFyOwogICAgICAgICAgICB9CiAgICAgICAgICB9CiAgICAgICAgICByb3cucHVzaChjZWxsKTsKICAgICAg",
    "ICAgIGlmIChyb3cuc29tZSgodmFsdWUpID0+IFN0cmluZyh2YWx1ZSB8fCAiIikudHJpbSgpKSkgewogICAgICAgICAgICByb3dzLnB1c2gocm93KTsKICAgICAgICAgIH0KICAgICAgICAgIHJldHVybiByb3dzOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gbm9ybWFsaXplQ3N2SGVhZGVyKGhlYWRlcikgewogICAgICAgICAgcmV0dXJuIFN0cmluZyhoZWFkZXIgfHwgIiIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1tcc19dKy9nLCAiLSIpOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gY3JlYXRlQ3N2UmVjb3JkKGhlYWRlcnMsIHJvdykgewogICAgICAgICAgcmV0dXJuIGhlYWRlcnMucmVkdWNlKChyZWNvcmQsIGhlYWRlciwgaW5kZXgpID0+IHsKICAgICAgICAgICAgaWYgKGhlYWRlcikgewogICAgICAgICAgICAgIHJlY29yZFtoZWFkZXJdID0gU3RyaW5nKHJvd1tpbmRleF0gfHwgIiIpLnRyaW0oKTsKICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gcmVjb3JkOwogICAgICAgICAgfSwge30pOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gZ2V0Q3N2RmllbGQocmVjb3JkLCAuLi5rZXlzKSB7CiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7CiAgICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRLZXkgPSBub3JtYWxpemVDc3ZIZWFkZXIoa2V5KTsKICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyZWNvcmQsIG5vcm1hbGl6ZWRLZXkpICYmIHJlY29yZFtub3JtYWxpemVkS2V5XSkgewogICAgICAgICAgICAgIHJldHVybiByZWNvcmRbbm9ybWFsaXplZEtleV07CiAgICAgICAgICAgIH0KICAgICAgICAgIH0KICAgICAgICAgIHJldHVybiAiIjsKICAgICAgICB9CgogICAgICAg",
    "IGZ1bmN0aW9uIGNyZWF0ZVByb2JsZW1EcmFmdEZyb21Dc3ZSZWNvcmQocmVjb3JkLCBpbmRleCkgewogICAgICAgICAgY29uc3Qgc291cmNlQ3N2SWQgPSBnZXRDc3ZGaWVsZChyZWNvcmQsICJpZCIpOwogICAgICAgICAgY29uc3QgcmF3Tm90ZSA9IGdldENzdkZpZWxkKHJlY29yZCwgIm5vdGUiKTsKICAgICAgICAgIGNvbnN0IG5vdGVNZXRhID0gcmVzb2x2ZUNzdk5vdGVNZXRhKHJhd05vdGUpOwogICAgICAgICAgY29uc3QgY2hhcHRlciA9IGdldENzdkZpZWxkKHJlY29yZCwgImNoYXB0ZXIiKTsKICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uTnVtYmVyID0gZ2V0Q3N2RmllbGQocmVjb3JkLCAicXVlc3Rpb24tbnVtYmVyIiwgInF1ZXN0aW9uX251bWJlciIpOwogICAgICAgICAgY29uc3QgcXVlc3Rpb25OYW1lID0gZ2V0Q3N2RmllbGQocmVjb3JkLCAicXVlc3Rpb24tbmFtZSIsICJxdWVzdGlvbl9uYW1lIikgfHwgYFEke3F1ZXN0aW9uTnVtYmVyIHx8IGluZGV4ICsgMX1gOwogICAgICAgICAgY29uc3QgcXVlc3Rpb25UZXh0ID0gZ2V0Q3N2RmllbGQocmVjb3JkLCAicXVlc3Rpb24tdGV4dCIsICJxdWVzdGlvbl90ZXh0IiwgImNvbnRlbnQtdGV4dCIsICJjb250ZW50X3RleHQiKTsKICAgICAgICAgIGNvbnN0IGFuc3dlciA9IGdldENzdkZpZWxkKHJlY29yZCwgImFuc3dlciIsICJjb3JyZWN0LWFuc3dlciIsICJjb3JyZWN0X2Fuc3dlciIpOwogICAgICAgICAgY29uc3QgY2hvaWNlcyA9IHNwbGl0Q3N2Q2hvaWNlcyhnZXRDc3ZGaWVsZChyZWNvcmQsICJ0aHJlZS1vcHRpb24iLCAidGhyZWVfb3B0aW9uIiwgImNob2ljZXMiKSk7CiAgICAgICAgICBjb25zdCBleHBsYW5hdGlvbiA9IGdldENzdkZpZWxkKHJlY29yZCwgImV4cGxhbmF0aW9uIik7CiAgICAgICAgICBpZiAoIXF1",
    "ZXN0aW9uVGV4dCkgewogICAgICAgICAgICByZXR1cm4gbnVsbDsKICAgICAgICAgIH0KICAgICAgICAgIGNvbnN0IHRleHROdW1iZXIgPSBjaGFwdGVyIHx8ICJDU1YiOwogICAgICAgICAgY29uc3QgdGV4dE5hbWUgPSBjaGFwdGVyID8gYENoYXB0ZXIgJHtjaGFwdGVyfWAgOiAiQ1NWIEltcG9ydCI7CiAgICAgICAgICBjb25zdCBzYWZlSWQgPSBzb3VyY2VDc3ZJZCB8fCBgY3N2XyR7RGF0ZS5ub3coKX1fJHtpbmRleH1gOwogICAgICAgICAgY29uc3Qgc3VibWl0dGVkQXQgPSB0b0pzdElzb1N0cmluZygpOwogICAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZVByb2JsZW1EcmFmdCh7CiAgICAgICAgICAgIGlkOiBgY3N2XyR7c2FmZUlkfWAsCiAgICAgICAgICAgIHJlbW90ZUlkOiBudWxsLAogICAgICAgICAgICBzdWJtaXNzaW9uSWQ6IGlzVXVpZFRleHQoc291cmNlQ3N2SWQpID8gc291cmNlQ3N2SWQgOiAiIiwKICAgICAgICAgICAgc291cmNlQ3N2SWQsCiAgICAgICAgICAgIHRyYW5zcG9ydDogImNzdiIsCiAgICAgICAgICAgIGJpbmRlcjogbm90ZU1ldGEuYmluZGVyLAogICAgICAgICAgICBub3RlOiBub3RlTWV0YS5ub3RlLAogICAgICAgICAgICBjaGFwdGVyLAogICAgICAgICAgICBzZWN0aW9uOiAiIiwKICAgICAgICAgICAgdGV4dE51bWJlciwKICAgICAgICAgICAgdGV4dE5hbWUsCiAgICAgICAgICAgIHRleHRCbG9ja3M6IGV4cGxhbmF0aW9uID8gW3sgaWQ6IGBjc3ZfdGV4dF8ke2luZGV4fWAsIHR5cGU6ICJib2R5IiwgdGV4dDogZXhwbGFuYXRpb24gfV0gOiBbXSwKICAgICAgICAgICAgcXVlc3Rpb25OdW1iZXIsCiAgICAgICAgICAgIHF1ZXN0aW9uTmFtZSwKICAgICAgICAgICAgaW1hZ2U6IG51bGwsCiAgICAgICAgICAgIG5vdGVib29rQmxvY2tzOiBjcmVhdGVD",
    "c3ZOb3RlYm9va0Jsb2Nrcyh7CiAgICAgICAgICAgICAgaWQ6IHNhZmVJZCwKICAgICAgICAgICAgICBpbmRleCwKICAgICAgICAgICAgICBxdWVzdGlvbk5hbWUsCiAgICAgICAgICAgICAgcXVlc3Rpb25UZXh0LAogICAgICAgICAgICAgIGNob2ljZXMsCiAgICAgICAgICAgICAgZXhwbGFuYXRpb24sCiAgICAgICAgICAgIH0pLAogICAgICAgICAgICBjb250ZW50SHRtbDogdGV4dFRvRWRpdG9ySHRtbChxdWVzdGlvblRleHQpLAogICAgICAgICAgICBjb250ZW50VGV4dDogcXVlc3Rpb25UZXh0LAogICAgICAgICAgICBhbnN3ZXJzOiBhbnN3ZXIgPyBbYW5zd2VyXSA6IFtdLAogICAgICAgICAgICBjaG9pY2VzLAogICAgICAgICAgICBleHBsYW5hdGlvbiwKICAgICAgICAgICAgYW5zd2VyVHlwZTogY2hvaWNlcy5sZW5ndGggPiAwID8gImNob2ljZSIgOiAidGV4dCIsCiAgICAgICAgICAgIGRlY2tJZDogbm90ZU1ldGEuZGVja0lkLAogICAgICAgICAgICBzdWJqZWN0SWQ6IG5vdGVNZXRhLmRlY2tJZCwKICAgICAgICAgICAgc3ViamVjdExhYmVsOiBub3RlTWV0YS5ub3RlLAogICAgICAgICAgICBzdWJqZWN0TmFtZTogbm90ZU1ldGEuc3ViamVjdE5hbWUsCiAgICAgICAgICAgIHNlcmllc0lkOiBub3RlTWV0YS5zZXJpZXNJZCwKICAgICAgICAgICAgc2VyaWVzTGFiZWw6IG5vdGVNZXRhLmJpbmRlciwKICAgICAgICAgICAgc3VibWl0dGVkQXQsCiAgICAgICAgICAgIHN0YXR1czogImFwcHJvdmVkIiwKICAgICAgICAgIH0pOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gcmVzb2x2ZUNzdk5vdGVNZXRhKHJhd05vdGUpIHsKICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcocmF3Tm90ZSB8fCAiIikudHJpbSgpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvW++8",
    "v19cc10rL2csICItIik7CiAgICAgICAgICBpZiAobm9ybWFsaXplZCA9PT0gIm1hdGhlbWF0aWNzLWMiIHx8IG5vcm1hbGl6ZWQgPT09ICJtYXRoZW1hdGljc2MiIHx8IG5vcm1hbGl6ZWQgPT09ICLmlbDlraZjIiB8fCBub3JtYWxpemVkID09PSAi5pWw5a2m772DIikgewogICAgICAgICAgICByZXR1cm4gewogICAgICAgICAgICAgIGJpbmRlcjogIlJlZmluZSAybmQgRWRpdGlvbiIsCiAgICAgICAgICAgICAgbm90ZTogIuaVsOWtpu+8oyIsCiAgICAgICAgICAgICAgZGVja0lkOiAicmVmaW5lLW1hdGgtYyIsCiAgICAgICAgICAgICAgc3ViamVjdE5hbWU6ICJNYXRoZW1hdGljcyBDIiwKICAgICAgICAgICAgICBzZXJpZXNJZDogInJldmlldy0ybmQtZWRpdGlvbiIsCiAgICAgICAgICAgIH07CiAgICAgICAgICB9CiAgICAgICAgICByZXR1cm4gewogICAgICAgICAgICBiaW5kZXI6IHN5bmNCaW5kZXJGcm9tU2VsZWN0ZWROb3RlKCkgfHwgIlJlZmluZSAybmQgRWRpdGlvbiIsCiAgICAgICAgICAgIG5vdGU6IGVsZW1lbnRzLm5vdGVTZWxlY3Q/LnZhbHVlIHx8ICLmlbDlrabvvKMiLAogICAgICAgICAgICBkZWNrSWQ6ICIiLAogICAgICAgICAgICBzdWJqZWN0TmFtZTogcmF3Tm90ZSB8fCAiIiwKICAgICAgICAgICAgc2VyaWVzSWQ6ICIiLAogICAgICAgICAgfTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHNwbGl0Q3N2Q2hvaWNlcyh2YWx1ZSkgewogICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSB8fCAiIikKICAgICAgICAgICAgLnNwbGl0KC9ccytcL1xzKyg/PVtBLVphLXrvvKEt77y6772BLe+9ml06fFtBLVphLXrvvKEt77y6772BLe+9ml3vvJopLykKICAgICAgICAgICAgLm1hcCgoY2hvaWNlKSA9PiBjaG9pY2UudHJpbSgpKQogICAgICAgICAgICAuZmls",
    "dGVyKEJvb2xlYW4pOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gY3JlYXRlQ3N2Tm90ZWJvb2tCbG9ja3MoeyBpZCwgaW5kZXgsIHF1ZXN0aW9uTmFtZSwgcXVlc3Rpb25UZXh0LCBjaG9pY2VzLCBleHBsYW5hdGlvbiB9KSB7CiAgICAgICAgICBjb25zdCBiYXNlID0gU3RyaW5nKGlkIHx8IGluZGV4KS5yZXBsYWNlKC9bXmEtejAtOS1dL2dpLCAiXyIpOwogICAgICAgICAgY29uc3QgcXVlc3Rpb25DaG9pY2VUZXh0ID0gY2hvaWNlcy5sZW5ndGggPiAwID8gY2hvaWNlcy5qb2luKCJcbiIpIDogIiI7CiAgICAgICAgICByZXR1cm4gWwogICAgICAgICAgICB7CiAgICAgICAgICAgICAgaWQ6IGBjc3ZfJHtiYXNlfV9xdWVzdGlvbl90aXRsZWAsCiAgICAgICAgICAgICAgdHlwZTogImhlYWRpbmciLAogICAgICAgICAgICAgIHBhZ2U6ICJxdWVzdGlvbiIsCiAgICAgICAgICAgICAgeDogMjQsCiAgICAgICAgICAgICAgeTogMjQsCiAgICAgICAgICAgICAgdzogMzYwLAogICAgICAgICAgICAgIGg6IDM2LAogICAgICAgICAgICAgIHRleHQ6IHF1ZXN0aW9uTmFtZSwKICAgICAgICAgICAgfSwKICAgICAgICAgICAgewogICAgICAgICAgICAgIGlkOiBgY3N2XyR7YmFzZX1fcXVlc3Rpb25fYm9keWAsCiAgICAgICAgICAgICAgdHlwZTogInF1ZXN0aW9uIiwKICAgICAgICAgICAgICBwYWdlOiAicXVlc3Rpb24iLAogICAgICAgICAgICAgIHg6IDI0LAogICAgICAgICAgICAgIHk6IDcyLAogICAgICAgICAgICAgIHc6IDM5MiwKICAgICAgICAgICAgICBoOiA5NiwKICAgICAgICAgICAgICB0ZXh0OiBxdWVzdGlvblRleHQsCiAgICAgICAgICAgIH0sCiAgICAgICAgICAgIC4uLihxdWVzdGlvbkNob2ljZVRleHQKICAgICAgICAgICAgICA/IFsKICAgICAgICAgICAgICAgICAgewog",
    "ICAgICAgICAgICAgICAgICAgIGlkOiBgY3N2XyR7YmFzZX1fcXVlc3Rpb25fY2hvaWNlc2AsCiAgICAgICAgICAgICAgICAgICAgdHlwZTogInRleHQiLAogICAgICAgICAgICAgICAgICAgIHBhZ2U6ICJxdWVzdGlvbiIsCiAgICAgICAgICAgICAgICAgICAgeDogMjQsCiAgICAgICAgICAgICAgICAgICAgeTogMTg0LAogICAgICAgICAgICAgICAgICAgIHc6IDM5MiwKICAgICAgICAgICAgICAgICAgICBoOiA5MiwKICAgICAgICAgICAgICAgICAgICB0ZXh0OiBxdWVzdGlvbkNob2ljZVRleHQsCiAgICAgICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgICBdCiAgICAgICAgICAgICAgOiBbXSksCiAgICAgICAgICAgIC4uLihleHBsYW5hdGlvbgogICAgICAgICAgICAgID8gWwogICAgICAgICAgICAgICAgICB7CiAgICAgICAgICAgICAgICAgICAgaWQ6IGBjc3ZfJHtiYXNlfV90ZXh0X2V4cGxhbmF0aW9uYCwKICAgICAgICAgICAgICAgICAgICB0eXBlOiAidGV4dCIsCiAgICAgICAgICAgICAgICAgICAgcGFnZTogInRleHQiLAogICAgICAgICAgICAgICAgICAgIHg6IDI0LAogICAgICAgICAgICAgICAgICAgIHk6IDcyLAogICAgICAgICAgICAgICAgICAgIHc6IDM5MiwKICAgICAgICAgICAgICAgICAgICBoOiAxODAsCiAgICAgICAgICAgICAgICAgICAgdGV4dDogZXhwbGFuYXRpb24sCiAgICAgICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgICBdCiAgICAgICAgICAgICAgOiBbXSksCiAgICAgICAgICBdOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gcmVuZGVyUHJvYmxlbUNzdkltcG9ydChtZXNzYWdlID0gIiIpIHsKICAgICAgICAgIGNvbnN0IHRvdGFsID0gc3RhdGUuY3N2SW1wb3J0RHJhZnRzLmxlbmd0aDsKICAgICAgICAgIGNvbnN0IG1pc3NpbmdE",
    "cmFmdHMgPSBnZXRNaXNzaW5nUHJvYmxlbUNzdkRyYWZ0cygpOwogICAgICAgICAgY29uc3QgbWlzc2luZ0lkcyA9IG5ldyBTZXQobWlzc2luZ0RyYWZ0cy5tYXAoKGRyYWZ0KSA9PiBkcmFmdC5pZCkpOwogICAgICAgICAgaWYgKGVsZW1lbnRzLnByb2JsZW1Dc3ZJbXBvcnRTdW1tYXJ5KSB7CiAgICAgICAgICAgIGVsZW1lbnRzLnByb2JsZW1Dc3ZJbXBvcnRTdW1tYXJ5LnRleHRDb250ZW50ID0KICAgICAgICAgICAgICBtZXNzYWdlIHx8ICh0b3RhbCA/IGBDU1YgJHt0b3RhbH3ku7bjgpLoqq3jgb/ovrzjgb/jgb7jgZfjgZ/jgILov73liqDlr77osaHjga8ke21pc3NpbmdEcmFmdHMubGVuZ3RofeS7tuOBp+OBmeOAgmAgOiAiQ1NW44KS6YG45oqe44GX44Gm44GP44Gg44GV44GE44CCIik7CiAgICAgICAgICB9CiAgICAgICAgICBpZiAoZWxlbWVudHMucHJvYmxlbUNzdlN1Ym1pdE1pc3NpbmdCdG4pIHsKICAgICAgICAgICAgZWxlbWVudHMucHJvYmxlbUNzdlN1Ym1pdE1pc3NpbmdCdG4uZGlzYWJsZWQgPSBtaXNzaW5nRHJhZnRzLmxlbmd0aCA9PT0gMDsKICAgICAgICAgIH0KICAgICAgICAgIGlmICghZWxlbWVudHMucHJvYmxlbUNzdkltcG9ydExpc3QpIHsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQogICAgICAgICAgaWYgKCF0b3RhbCkgewogICAgICAgICAgICBlbGVtZW50cy5wcm9ibGVtQ3N2SW1wb3J0TGlzdC5pbm5lckhUTUwgPSAiIjsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQogICAgICAgICAgZWxlbWVudHMucHJvYmxlbUNzdkltcG9ydExpc3QuaW5uZXJIVE1MID0gc3RhdGUuY3N2SW1wb3J0RHJhZnRzCiAgICAgICAgICAgIC5zbGljZSgwLCA2MCkKICAgICAgICAgICAgLm1hcCgoZHJhZnQpID0+IHsKICAgICAgICAgICAgICBjb25z",
    "dCBpc01pc3NpbmcgPSBtaXNzaW5nSWRzLmhhcyhkcmFmdC5pZCk7CiAgICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBnZXREcmFmdERpc3BsYXlUaXRsZShkcmFmdCk7CiAgICAgICAgICAgICAgY29uc3QgbWV0YSA9IFtkcmFmdC5zb3VyY2VDc3ZJZCwgdHJ1bmNhdGVUZXh0KGRyYWZ0LmNvbnRlbnRUZXh0IHx8ICIiLCA0OCldLmZpbHRlcihCb29sZWFuKS5qb2luKCIgLyAiKTsKICAgICAgICAgICAgICByZXR1cm4gYAogICAgICAgICAgICAgICAgPGxpIGNsYXNzPSJtYW5hZ2VyLXF1ZXN0aW9uLWl0ZW0iPgogICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJtYW5hZ2VyLXF1ZXN0aW9uLW1haW4iPgogICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPSJtYW5hZ2VyLXF1ZXN0aW9uLXRpdGxlIj4ke2VzY2FwZUh0bWwodGl0bGUpfTwvcD4KICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz0ibWFuYWdlci1xdWVzdGlvbi1tZXRhIj4ke2VzY2FwZUh0bWwobWV0YSl9PC9wPgogICAgICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9InN0YXR1cy1jaGlwICR7aXNNaXNzaW5nID8gInBlbmRpbmciIDogImFwcHJvdmVkIn0iPiR7aXNNaXNzaW5nID8gIui/veWKoOWvvuixoSIgOiAi55m76Yyy5riI44G/In08L3NwYW4+CiAgICAgICAgICAgICAgICA8L2xpPgogICAgICAgICAgICAgIGA7CiAgICAgICAgICAgIH0pCiAgICAgICAgICAgIC5qb2luKCIiKTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGdldE1pc3NpbmdQcm9ibGVtQ3N2RHJhZnRzKCkgewogICAgICAgICAgaWYgKCFzdGF0ZS5jc3ZJbXBvcnREcmFmdHMubGVuZ3RoKSB7CiAgICAgICAgICAgIHJldHVybiBbXTsKICAgICAgICAgIH0KICAgICAgICAgIGNvbnN0IGV4aXN0",
    "aW5nS2V5cyA9IG5ldyBTZXQoKTsKICAgICAgICAgIHN0YXRlLmRyYWZ0cy5mb3JFYWNoKChkcmFmdCkgPT4gewogICAgICAgICAgICBnZXRQcm9ibGVtRHJhZnRJZGVudGl0eUtleXMoZHJhZnQpLmZvckVhY2goKGtleSkgPT4gZXhpc3RpbmdLZXlzLmFkZChrZXkpKTsKICAgICAgICAgIH0pOwogICAgICAgICAgcmV0dXJuIHN0YXRlLmNzdkltcG9ydERyYWZ0cy5maWx0ZXIoKGRyYWZ0KSA9PiB7CiAgICAgICAgICAgIGNvbnN0IGtleXMgPSBnZXRQcm9ibGVtRHJhZnRJZGVudGl0eUtleXMoZHJhZnQpOwogICAgICAgICAgICByZXR1cm4gIWtleXMuc29tZSgoa2V5KSA9PiBleGlzdGluZ0tleXMuaGFzKGtleSkpOwogICAgICAgICAgfSk7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBnZXRQcm9ibGVtRHJhZnRJZGVudGl0eUtleXMoZHJhZnQpIHsKICAgICAgICAgIGNvbnN0IGtleXMgPSBbXTsKICAgICAgICAgIGNvbnN0IHJlbW90ZUlkID0gU3RyaW5nKGRyYWZ0Py5yZW1vdGVJZCB8fCAiIikudHJpbSgpOwogICAgICAgICAgY29uc3Qgc3VibWlzc2lvbklkID0gU3RyaW5nKGRyYWZ0Py5zdWJtaXNzaW9uSWQgfHwgIiIpLnRyaW0oKTsKICAgICAgICAgIGNvbnN0IHNvdXJjZUNzdklkID0gU3RyaW5nKGRyYWZ0Py5zb3VyY2VDc3ZJZCB8fCAiIikudHJpbSgpOwogICAgICAgICAgaWYgKHJlbW90ZUlkKSBrZXlzLnB1c2goYGlkOiR7cmVtb3RlSWQudG9Mb3dlckNhc2UoKX1gKTsKICAgICAgICAgIGlmIChzdWJtaXNzaW9uSWQpIGtleXMucHVzaChgaWQ6JHtzdWJtaXNzaW9uSWQudG9Mb3dlckNhc2UoKX1gKTsKICAgICAgICAgIGlmIChzb3VyY2VDc3ZJZCkga2V5cy5wdXNoKGBjc3Y6JHtzb3VyY2VDc3ZJZC50b0xvd2VyQ2FzZSgpfWApOwogICAgICAgICAgaWYgKGlzVXVp",
    "ZFRleHQoc291cmNlQ3N2SWQpKSBrZXlzLnB1c2goYGlkOiR7c291cmNlQ3N2SWQudG9Mb3dlckNhc2UoKX1gKTsKICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uS2V5ID0gW2RyYWZ0Py5ub3RlLCBkcmFmdD8uY2hhcHRlciwgZHJhZnQ/LnF1ZXN0aW9uTnVtYmVyLCBkcmFmdD8ucXVlc3Rpb25OYW1lXQogICAgICAgICAgICAubWFwKG5vcm1hbGl6ZVByb2JsZW1JZGVudGl0eVRleHQpCiAgICAgICAgICAgIC5qb2luKCJ8Iik7CiAgICAgICAgICBpZiAocXVlc3Rpb25LZXkucmVwbGFjZSgvXHwvZywgIiIpKSB7CiAgICAgICAgICAgIGtleXMucHVzaChgcXVlc3Rpb246JHtxdWVzdGlvbktleX1gKTsKICAgICAgICAgIH0KICAgICAgICAgIGNvbnN0IGNvbnRlbnRLZXkgPSBbZHJhZnQ/Lm5vdGUsIGRyYWZ0Py5jb250ZW50VGV4dF0ubWFwKG5vcm1hbGl6ZVByb2JsZW1JZGVudGl0eVRleHQpLmpvaW4oInwiKTsKICAgICAgICAgIGlmIChjb250ZW50S2V5LnJlcGxhY2UoL1x8L2csICIiKSkgewogICAgICAgICAgICBrZXlzLnB1c2goYGNvbnRlbnQ6JHtjb250ZW50S2V5fWApOwogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChrZXlzKSk7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBub3JtYWxpemVQcm9ibGVtSWRlbnRpdHlUZXh0KHZhbHVlKSB7CiAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlIHx8ICIiKS5ub3JtYWxpemUoIk5GS0MiKS50cmltKCkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9ccysvZywgIiIpOwogICAgICAgIH0KCiAgICAgICAgYXN5bmMgZnVuY3Rpb24gc3VibWl0TWlzc2luZ1Byb2JsZW1Dc3ZEcmFmdHMoKSB7CiAgICAgICAgICBjb25zdCBkcmFmdHMgPSBnZXRNaXNzaW5nUHJvYmxlbUNzdkRyYWZ0cygpOwogICAg",
    "ICAgICAgaWYgKCFkcmFmdHMubGVuZ3RoKSB7CiAgICAgICAgICAgIHJlbmRlclByb2JsZW1Dc3ZJbXBvcnQoIui/veWKoOWvvuixoeOBruWVj+mhjOOBr+OBguOCiuOBvuOBm+OCk+OAgiIpOwogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CiAgICAgICAgICBjb25zdCBub3cgPSB0b0pzdElzb1N0cmluZygpOwogICAgICAgICAgbWVyZ2VQcm9ibGVtRHJhZnRzKAogICAgICAgICAgICBkcmFmdHMubWFwKChkcmFmdCkgPT4gKHsKICAgICAgICAgICAgICAuLi5kcmFmdCwKICAgICAgICAgICAgICBzdGF0dXM6ICJhcHByb3ZlZCIsCiAgICAgICAgICAgICAgdHJhbnNwb3J0OiAibG9jYWwiLAogICAgICAgICAgICAgIHJlbW90ZUlkOiBudWxsLAogICAgICAgICAgICAgIGFwcHJvdmVkQXQ6IG5vdywKICAgICAgICAgICAgICB1cGRhdGVkQXQ6IG5vdywKICAgICAgICAgICAgfSkpCiAgICAgICAgICApOwogICAgICAgICAgc2F2ZUpzb24oTUFOQUdFUl9EUkFGVF9LRVksIHN0YXRlLmRyYWZ0cyk7CiAgICAgICAgICByZW5kZXJRdWVzdGlvbkxpc3QoKTsKICAgICAgICAgIHJlbmRlclByb2JsZW1Dc3ZJbXBvcnQoYCR7ZHJhZnRzLmxlbmd0aH3ku7bjgpLjg63jg7zjgqvjg6vjga7llY/poYzjg4fjg7zjgr/jgbjov73liqDjgZfjgb7jgZfjgZ/jgIJgKTsKICAgICAgICB9CgoKICAgICAgICBmdW5jdGlvbiBtZXJnZVByb2JsZW1EcmFmdHMobmV4dERyYWZ0cykgewogICAgICAgICAgY29uc3QgaW5kZXhCeVJlbW90ZUlkID0gbmV3IE1hcCgKICAgICAgICAgICAgc3RhdGUuZHJhZnRzCiAgICAgICAgICAgICAgLm1hcCgoZHJhZnQsIGluZGV4KSA9PiBbU3RyaW5nKGRyYWZ0LnJlbW90ZUlkIHx8IGRyYWZ0LnN1Ym1pc3Npb25JZCB8fCBkcmFmdC5zb3VyY2VDc3ZJZCB8fCAiIiks",
    "IGluZGV4XSkKICAgICAgICAgICAgICAuZmlsdGVyKChba2V5XSkgPT4ga2V5KQogICAgICAgICAgKTsKICAgICAgICAgIG5leHREcmFmdHMuZm9yRWFjaCgoZHJhZnQpID0+IHsKICAgICAgICAgICAgY29uc3Qga2V5ID0gU3RyaW5nKGRyYWZ0LnJlbW90ZUlkIHx8IGRyYWZ0LnN1Ym1pc3Npb25JZCB8fCBkcmFmdC5zb3VyY2VDc3ZJZCB8fCAiIik7CiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0ga2V5ID8gaW5kZXhCeVJlbW90ZUlkLmdldChrZXkpIDogLTE7CiAgICAgICAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKGluZGV4KSAmJiBpbmRleCA+PSAwKSB7CiAgICAgICAgICAgICAgc3RhdGUuZHJhZnRzW2luZGV4XSA9IHsgLi4uc3RhdGUuZHJhZnRzW2luZGV4XSwgLi4uZHJhZnQsIGlkOiBzdGF0ZS5kcmFmdHNbaW5kZXhdLmlkIH07CiAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgc3RhdGUuZHJhZnRzLnVuc2hpZnQoZHJhZnQpOwogICAgICAgICAgICB9CiAgICAgICAgICB9KTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHNob3dNYW5hZ2VyTG9naW5SZXF1aXJlZERpYWxvZygpIHsKICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93LnNob3dBdXRoTG9naW5SZXF1aXJlZERpYWxvZyA9PT0gImZ1bmN0aW9uIikgewogICAgICAgICAgICB3aW5kb3cuc2hvd0F1dGhMb2dpblJlcXVpcmVkRGlhbG9nKHsKICAgICAgICAgICAgICB0YXJnZXRTY3JlZW46ICJtYW5hZ2VyIiwKICAgICAgICAgICAgICBvbmJvYXJkaW5nU3RlcDogIm5pY2tuYW1lIiwKICAgICAgICAgICAgfSk7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KICAgICAgICAgIHdpbmRvdy5hbGVydCgi44Ot44Kw44Kk44Oz44GM5b+F6KaB44Gn44GZ44CC44KC44GG5LiA5bqm44Ot44Kw",
    "44Kk44Oz44GX44Gm44GL44KJ57aa6KGM44GX44Gm44GP44Gg44GV44GE44CCIik7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBpc1V1aWRUZXh0KHZhbHVlKSB7CiAgICAgICAgICByZXR1cm4gL15bMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfSQvaS50ZXN0KFN0cmluZyh2YWx1ZSB8fCAiIikudHJpbSgpKTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHNldFByZXZpZXdUZXh0KGVsZW1lbnQsIHZhbHVlLCBmYWxsYmFjaykgewogICAgICAgICAgaWYgKCFlbGVtZW50KSB7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KICAgICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSB2YWx1ZSB8fCBmYWxsYmFjazsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHNldFRleHRDb250ZW50KGVsZW1lbnQsIHZhbHVlKSB7CiAgICAgICAgICBpZiAoZWxlbWVudCkgewogICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gdmFsdWU7CiAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBhc3luYyBmdW5jdGlvbiBwcmVwYXJlUHJvYmxlbUNvbmZpcm1hdGlvbigpIHsKICAgICAgICAgIGNvbnN0IGRyYWZ0ID0gYXdhaXQgY3JlYXRlUHJvYmxlbURyYWZ0RnJvbUZvcm0oInBlbmRpbmciKTsKICAgICAgICAgIGlmICghZHJhZnQpIHsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQoKICAgICAgICAgIHN0YXRlLnBlbmRpbmdQcm9ibGVtRHJhZnQgPSBkcmFmdDsKICAgICAgICAgIHBvcHVsYXRlUHJvYmxlbUNvbmZpcm1EaWFsb2coZHJhZnQpOwogICAgICAgICAgc2V0UHJvYmxlbVN0ZXAoImNvbmZpcm0iKTsKICAgICAgICAgIHNob3dEaWFsb2coZWxlbWVudHMucHJvYmxl",
    "bUNvbmZpcm1EaWFsb2csICgpID0+IHsKICAgICAgICAgICAgaWYgKHdpbmRvdy5jb25maXJtKCLllY/poYzjgpLmj5Dlh7rjgZfjgb7jgZnjgILjgojjgo3jgZfjgYTjgafjgZnjgYvvvJ8iKSkgewogICAgICAgICAgICAgIHN1Ym1pdENvbmZpcm1lZFByb2JsZW0oKTsKICAgICAgICAgICAgfQogICAgICAgICAgfSk7CiAgICAgICAgfQoKICAgICAgICBhc3luYyBmdW5jdGlvbiBzdWJtaXRDb25maXJtZWRQcm9ibGVtKCkgewogICAgICAgICAgY29uc3QgZHJhZnQgPSBzdGF0ZS5wZW5kaW5nUHJvYmxlbURyYWZ0OwogICAgICAgICAgaWYgKCFkcmFmdCkgewogICAgICAgICAgICBjbG9zZURpYWxvZyhlbGVtZW50cy5wcm9ibGVtQ29uZmlybURpYWxvZyk7CiAgICAgICAgICAgIHNldFByb2JsZW1TdGVwKCJjcmVhdGUiKTsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQoKICAgICAgICAgIGRyYWZ0LnN1Ym1pdHRlZEF0ID0gdG9Kc3RJc29TdHJpbmcoKTsKICAgICAgICAgIHNldFByb2JsZW1TdGVwKCJzdWJtaXQiKTsKICAgICAgICAgIGF3YWl0IHN1Ym1pdFByb2JsZW1Gb3JQcm9vZnJlYWRpbmcoZHJhZnQpOwogICAgICAgIH0KCiAgICAgICAgYXN5bmMgZnVuY3Rpb24gc3VibWl0UHJvYmxlbUZvclByb29mcmVhZGluZyhkcmFmdCkgewogICAgICAgICAgaWYgKCFkcmFmdCkgewogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CgogICAgICAgICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZWxlbWVudHMucHJvYmxlbUNyZWF0ZUZvcm0ucXVlcnlTZWxlY3RvcignYnV0dG9uW3R5cGU9InN1Ym1pdCJdJyk7CiAgICAgICAgICBpZiAoc3VibWl0QnV0dG9uIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHsKICAgICAgICAgICAgc3VibWl0QnV0dG9uLmRpc2FibGVk",
    "ID0gdHJ1ZTsKICAgICAgICAgIH0KICAgICAgICAgIGVsZW1lbnRzLnByb29mcmVhZGluZ0ZlZWRiYWNrLnRleHRDb250ZW50ID0gIumAgeS/oeOBl+OBpuOBhOOBvuOBmS4uLiI7CgogICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc3VibWl0VG9NYW5hZ2VyQXBpKGRyYWZ0KTsKICAgICAgICAgICAgZHJhZnQudHJhbnNwb3J0ID0gcmVzdWx0LnRyYW5zcG9ydDsKICAgICAgICAgICAgZHJhZnQucmVtb3RlSWQgPSByZXN1bHQucmVtb3RlSWQ7CiAgICAgICAgICAgIGRyYWZ0LnN0YXR1cyA9IHJlc3VsdC5zdGF0dXM7CgogICAgICAgICAgICBzdGF0ZS5kcmFmdHMudW5zaGlmdChkcmFmdCk7CiAgICAgICAgICAgIHNhdmVKc29uKE1BTkFHRVJfRFJBRlRfS0VZLCBzdGF0ZS5kcmFmdHMpOwogICAgICAgICAgICByZW5kZXJRdWVzdGlvbkxpc3QoKTsKCiAgICAgICAgICAgIHJlc2V0UHJvYmxlbUNvbXBvc2VyKCk7CiAgICAgICAgICAgIHN0YXRlLnBlbmRpbmdQcm9ibGVtRHJhZnQgPSBudWxsOwogICAgICAgICAgICBjbG9zZURpYWxvZyhlbGVtZW50cy5wcm9ibGVtQ29uZmlybURpYWxvZyk7CiAgICAgICAgICAgIGVsZW1lbnRzLnByb29mcmVhZGluZ0ZlZWRiYWNrLnRleHRDb250ZW50ID0KICAgICAgICAgICAgICByZXN1bHQudHJhbnNwb3J0ID09PSAiYXBpIgogICAgICAgICAgICAgICAgPyAi5o+Q5Ye644GX44G+44GX44Gf44CC44GK55ay44KM44GV44G+44Gn44GX44Gf44CCIgogICAgICAgICAgICAgICAgOiAiQVBJ44Gr5o6l57aa44Gn44GN44Gq44GL44Gj44Gf44Gf44KB44CB44Ot44O844Kr44Or5LiL5pu444GN44Go44GX44Gm5L+d5a2Y44GX44G+44GX44Gf44CCIjsKICAgICAgICAgIH0gY2F0Y2ggewogICAgICAgICAgICBlbGVt",
    "ZW50cy5wcm9vZnJlYWRpbmdGZWVkYmFjay50ZXh0Q29udGVudCA9ICLpgIHkv6HjgavlpLHmlZfjgZfjgb7jgZfjgZ/jgILjgZfjgbDjgonjgY/jgZfjgabjgYvjgonlho3oqabooYzjgZfjgabjgY/jgaDjgZXjgYTjgIIiOwogICAgICAgICAgfSBmaW5hbGx5IHsKICAgICAgICAgICAgaWYgKHN1Ym1pdEJ1dHRvbiBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7CiAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgc2V0UHJvYmxlbVN0ZXAoImNyZWF0ZSIpOwogICAgICAgICAgfQogICAgICAgIH0KCiAgICAgICAgYXN5bmMgZnVuY3Rpb24gc2F2ZVByb2JsZW1Bc0RyYWZ0KCkgewogICAgICAgICAgY29uc3QgZHJhZnQgPSBhd2FpdCBjcmVhdGVQcm9ibGVtRHJhZnRGcm9tRm9ybSgiZHJhZnQiKTsKICAgICAgICAgIGlmICghZHJhZnQpIHsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQoKICAgICAgICAgIHN0YXRlLmRyYWZ0cy51bnNoaWZ0KGRyYWZ0KTsKICAgICAgICAgIHNhdmVKc29uKE1BTkFHRVJfRFJBRlRfS0VZLCBzdGF0ZS5kcmFmdHMpOwogICAgICAgICAgcmVuZGVyUXVlc3Rpb25MaXN0KCk7CiAgICAgICAgICByZXNldFByb2JsZW1Db21wb3NlcigpOwogICAgICAgICAgZWxlbWVudHMucHJvb2ZyZWFkaW5nRmVlZGJhY2sudGV4dENvbnRlbnQgPSAi5LiL5pu444GN44Go44GX44Gm5L+d5a2Y44GX44G+44GX44Gf44CCIjsKICAgICAgICB9CgogICAgICAgIGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVByb2JsZW1EcmFmdEZyb21Gb3JtKHN0YXR1cykgewogICAgICAgICAgY29uc3QgYmluZGVyID0gc3luY0JpbmRlckZyb21TZWxlY3RlZE5vdGUoKTsKICAgICAgICAgIGNvbnN0IG5v",
    "dGUgPSBlbGVtZW50cy5ub3RlU2VsZWN0Py52YWx1ZS50cmltKCkgfHwgIiI7CiAgICAgICAgICBjb25zdCBjaGFwdGVyID0gIiI7CiAgICAgICAgICBjb25zdCB0ZXh0TnVtYmVyID0gZWxlbWVudHMudGV4dE51bWJlcklucHV0Py52YWx1ZS50cmltKCkgfHwgIiI7CiAgICAgICAgICBjb25zdCB0ZXh0TmFtZSA9IGVsZW1lbnRzLnRleHROYW1lSW5wdXQ/LnZhbHVlLnRyaW0oKSB8fCAiIjsKICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uTnVtYmVyID0gZWxlbWVudHMucXVlc3Rpb25OdW1iZXJJbnB1dD8udmFsdWUudHJpbSgpIHx8ICIiOwogICAgICAgICAgY29uc3QgcXVlc3Rpb25OYW1lID0gZWxlbWVudHMucXVlc3Rpb25OYW1lSW5wdXQ/LnZhbHVlLnRyaW0oKSB8fCAiIjsKICAgICAgICAgIGNvbnN0IHRleHRCbG9ja3MgPSBzdGF0ZS50ZXh0QmxvY2tzCiAgICAgICAgICAgIC5tYXAoKGJsb2NrKSA9PiAoewogICAgICAgICAgICAgIGlkOiBibG9jay5pZCwKICAgICAgICAgICAgICB0eXBlOiBibG9jay50eXBlID09PSAiaGVhZGluZyIgPyAiaGVhZGluZyIgOiAiYm9keSIsCiAgICAgICAgICAgICAgdGV4dDogU3RyaW5nKGJsb2NrLnRleHQgfHwgIiIpLnRyaW0oKSwKICAgICAgICAgICAgfSkpCiAgICAgICAgICAgIC5maWx0ZXIoKGJsb2NrKSA9PiBibG9jay50ZXh0KTsKICAgICAgICAgIGNvbnN0IG5vdGVib29rQmxvY2tzID0gc3RhdGUubm90ZWJvb2tCbG9ja3MKICAgICAgICAgICAgLm1hcCgoYmxvY2spID0+ICh7CiAgICAgICAgICAgICAgaWQ6IGJsb2NrLmlkLAogICAgICAgICAgICAgIHR5cGU6IGJsb2NrLnR5cGUsCiAgICAgICAgICAgICAgcGFnZTogYmxvY2sucGFnZSwKICAgICAgICAgICAgICB4OiBibG9jay54LAogICAgICAgICAgICAgIHk6IGJsb2NrLnksCiAg",
    "ICAgICAgICAgICAgdzogYmxvY2sudywKICAgICAgICAgICAgICBoOiBibG9jay5oLAogICAgICAgICAgICAgIHRleHQ6IFN0cmluZyhibG9jay50ZXh0IHx8ICIiKS50cmltKCksCiAgICAgICAgICAgIH0pKQogICAgICAgICAgICAuZmlsdGVyKChibG9jaykgPT4gYmxvY2sudGV4dCk7CiAgICAgICAgICBjb25zdCBjb250ZW50SHRtbCA9IG5vcm1hbGl6ZUVkaXRvckh0bWwoZWxlbWVudHMucHJvYmxlbUVkaXRvci5pbm5lckhUTUwpOwogICAgICAgICAgY29uc3QgY29udGVudFRleHQgPSBnZXRQcm9ibGVtRWRpdG9yQ29udGVudFRleHQoKTsKCiAgICAgICAgICBjb25zdCBtaXNzaW5nRmllbGRzID0gW107CiAgICAgICAgICBpZiAoIW5vdGUpIHsKICAgICAgICAgICAgbWlzc2luZ0ZpZWxkcy5wdXNoKCLjg47jg7zjg4giKTsKICAgICAgICAgIH0KICAgICAgICAgIGlmICghdGV4dE51bWJlcikgewogICAgICAgICAgICBtaXNzaW5nRmllbGRzLnB1c2goIuODhuOCreOCueODiOeVquWPtyIpOwogICAgICAgICAgfQogICAgICAgICAgaWYgKCF0ZXh0TmFtZSkgewogICAgICAgICAgICBtaXNzaW5nRmllbGRzLnB1c2goIuODhuOCreOCueODiOWQjSIpOwogICAgICAgICAgfQogICAgICAgICAgaWYgKCFxdWVzdGlvbk51bWJlcikgewogICAgICAgICAgICBtaXNzaW5nRmllbGRzLnB1c2goIuWVj+mhjOeVquWPtyIpOwogICAgICAgICAgfQogICAgICAgICAgaWYgKCFxdWVzdGlvbk5hbWUpIHsKICAgICAgICAgICAgbWlzc2luZ0ZpZWxkcy5wdXNoKCLllY/poYzlkI0iKTsKICAgICAgICAgIH0KICAgICAgICAgIGlmICghY29udGVudFRleHQpIHsKICAgICAgICAgICAgbWlzc2luZ0ZpZWxkcy5wdXNoKCLllY/poYzmlociKTsKICAgICAgICAgIH0KICAgICAgICAgIGlmIChtaXNzaW5n",
    "RmllbGRzLmxlbmd0aCkgewogICAgICAgICAgICBlbGVtZW50cy5wcm9vZnJlYWRpbmdGZWVkYmFjay50ZXh0Q29udGVudCA9IGAke21pc3NpbmdGaWVsZHMuam9pbigi44O7Iil944KS5YWl5Yqb44GX44Gm44GP44Gg44GV44GE44CCYDsKICAgICAgICAgICAgdXBkYXRlUHJvYmxlbVByZXZpZXcoKTsKICAgICAgICAgICAgcmV0dXJuIG51bGw7CiAgICAgICAgICB9CgogICAgICAgICAgY29uc3QgaW1hZ2UgPSBhd2FpdCBnZXRQcm9ibGVtSW1hZ2VQYXlsb2FkKCk7CiAgICAgICAgICBpZiAoaW1hZ2UgPT09IHVuZGVmaW5lZCkgewogICAgICAgICAgICByZXR1cm4gbnVsbDsKICAgICAgICAgIH0KCiAgICAgICAgICByZXR1cm4gewogICAgICAgICAgICBpZDogYGRyYWZ0XyR7RGF0ZS5ub3coKX1fJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDE2KS5zbGljZSgyLCA4KX1gLAogICAgICAgICAgICBiaW5kZXIsCiAgICAgICAgICAgIG5vdGUsCiAgICAgICAgICAgIGNoYXB0ZXIsCiAgICAgICAgICAgIHNlY3Rpb246ICIiLAogICAgICAgICAgICB0ZXh0TnVtYmVyLAogICAgICAgICAgICB0ZXh0TmFtZSwKICAgICAgICAgICAgdGV4dEJsb2NrcywKICAgICAgICAgICAgcXVlc3Rpb25OdW1iZXIsCiAgICAgICAgICAgIHF1ZXN0aW9uTmFtZSwKICAgICAgICAgICAgaW1hZ2UsCiAgICAgICAgICAgIGNvbnRlbnRIdG1sLAogICAgICAgICAgICBjb250ZW50VGV4dCwKICAgICAgICAgICAgbm90ZWJvb2tCbG9ja3MsCiAgICAgICAgICAgIHN1Ym1pdHRlZEF0OiB0b0pzdElzb1N0cmluZygpLAogICAgICAgICAgICBzdGF0dXMsCiAgICAgICAgICAgIHJlbW90ZUlkOiBudWxsLAogICAgICAgICAgICB0cmFuc3BvcnQ6ICJsb2NhbCIsCiAgICAgICAgICB9OwogICAgICAgIH0KCiAgICAgICAg",
    "YXN5bmMgZnVuY3Rpb24gc3luY1Byb2JsZW1JbWFnZUZyb21JbnB1dChvcHRpb25zID0ge30pIHsKICAgICAgICAgIGNvbnN0IGZpbGUgPSBlbGVtZW50cy5wcm9ibGVtSW1hZ2VJbnB1dD8uZmlsZXM/LlswXSB8fCBudWxsOwogICAgICAgICAgaWYgKCFmaWxlKSB7CiAgICAgICAgICAgIHN0YXRlLnByb2JsZW1JbWFnZURhdGEgPSBudWxsOwogICAgICAgICAgICByZW5kZXJQcm9ibGVtSW1hZ2VQcmV2aWV3KCk7CiAgICAgICAgICAgIHVwZGF0ZVByb2JsZW1QcmV2aWV3KCk7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KCiAgICAgICAgICB0cnkgewogICAgICAgICAgICBjb25zdCBkYXRhVXJsID0gYXdhaXQgZmlsZVRvRGF0YVVybChmaWxlKTsKICAgICAgICAgICAgc3RhdGUucHJvYmxlbUltYWdlRGF0YSA9IHsKICAgICAgICAgICAgICBuYW1lOiBmaWxlLm5hbWUsCiAgICAgICAgICAgICAgdHlwZTogZmlsZS50eXBlLAogICAgICAgICAgICAgIHNpemU6IGZpbGUuc2l6ZSwKICAgICAgICAgICAgICBkYXRhVXJsLAogICAgICAgICAgICB9OwogICAgICAgICAgICBpZiAob3B0aW9ucy5pbnNlcnRJbnRvRWRpdG9yKSB7CiAgICAgICAgICAgICAgaW5zZXJ0UHJvYmxlbUltYWdlSW50b0VkaXRvcihzdGF0ZS5wcm9ibGVtSW1hZ2VEYXRhKTsKICAgICAgICAgICAgICBzdGF0ZS5wcm9ibGVtSW1hZ2VEYXRhID0gbnVsbDsKICAgICAgICAgICAgICBpZiAoZWxlbWVudHMucHJvYmxlbUltYWdlSW5wdXQpIHsKICAgICAgICAgICAgICAgIGVsZW1lbnRzLnByb2JsZW1JbWFnZUlucHV0LnZhbHVlID0gIiI7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIHJlbmRlclByb2JsZW1JbWFnZVByZXZpZXcoKTsKICAgICAgICAgICAgdXBkYXRlUHJvYmxl",
    "bVByZXZpZXcoKTsKICAgICAgICAgIH0gY2F0Y2ggewogICAgICAgICAgICBzdGF0ZS5wcm9ibGVtSW1hZ2VEYXRhID0gbnVsbDsKICAgICAgICAgICAgcmVuZGVyUHJvYmxlbUltYWdlUHJldmlldygpOwogICAgICAgICAgICB1cGRhdGVQcm9ibGVtUHJldmlldygpOwogICAgICAgICAgICBlbGVtZW50cy5wcm9vZnJlYWRpbmdGZWVkYmFjay50ZXh0Q29udGVudCA9ICLnlLvlg4/jga7oqq3jgb/ovrzjgb/jgavlpLHmlZfjgZfjgb7jgZfjgZ/jgILliKXjga7nlLvlg4/jgafoqabjgZfjgabjgY/jgaDjgZXjgYTjgIIiOwogICAgICAgICAgfQogICAgICAgIH0KCiAgICAgICAgYXN5bmMgZnVuY3Rpb24gZ2V0UHJvYmxlbUltYWdlUGF5bG9hZCgpIHsKICAgICAgICAgIHN0YXRlLnByb2JsZW1JbWFnZURhdGEgPSBudWxsOwogICAgICAgICAgaWYgKGVsZW1lbnRzLnByb2JsZW1JbWFnZUlucHV0KSB7CiAgICAgICAgICAgIGVsZW1lbnRzLnByb2JsZW1JbWFnZUlucHV0LnZhbHVlID0gIiI7CiAgICAgICAgICB9CiAgICAgICAgICByZW5kZXJQcm9ibGVtSW1hZ2VQcmV2aWV3KCk7CiAgICAgICAgICByZXR1cm4gbnVsbDsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHBvcHVsYXRlUHJvYmxlbUNvbmZpcm1EaWFsb2coZHJhZnQpIHsKICAgICAgICAgIHNldFByZXZpZXdUZXh0KGVsZW1lbnRzLmNvbmZpcm1Qcm9ibGVtTm90ZSwgZHJhZnQubm90ZSwgIi0iKTsKICAgICAgICAgIGlmIChlbGVtZW50cy5jb25maXJtUHJvYmxlbUNvbnRlbnQpIHsKICAgICAgICAgICAgZWxlbWVudHMuY29uZmlybVByb2JsZW1Db250ZW50LnRleHRDb250ZW50ID0gWwogICAgICAgICAgICAgIGRyYWZ0LnRleHROdW1iZXIgfHwgZHJhZnQudGV4dE5hbWUgPyBg44OG44Kt44K544OIICR7W2RyYWZ0LnRl",
    "eHROdW1iZXIsIGRyYWZ0LnRleHROYW1lXS5maWx0ZXIoQm9vbGVhbikuam9pbigiICIpfWAgOiAiIiwKICAgICAgICAgICAgICBkcmFmdC5xdWVzdGlvbk51bWJlciB8fCBkcmFmdC5xdWVzdGlvbk5hbWUgPyBg5ZWP6aGMICR7W2RyYWZ0LnF1ZXN0aW9uTnVtYmVyLCBkcmFmdC5xdWVzdGlvbk5hbWVdLmZpbHRlcihCb29sZWFuKS5qb2luKCIgIil9YCA6ICIiLAogICAgICAgICAgICAgIGRyYWZ0LmNvbnRlbnRUZXh0IHx8ICIiLAogICAgICAgICAgICBdCiAgICAgICAgICAgICAgLmZpbHRlcihCb29sZWFuKQogICAgICAgICAgICAgIC5qb2luKCJcblxuIik7CiAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBzaG93UHJvYmxlbUltYWdlRGlhbG9nKCkgewogICAgICAgICAgaWYgKCFzdGF0ZS5wcm9ibGVtSW1hZ2VEYXRhKSB7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KICAgICAgICAgIGlmIChlbGVtZW50cy5wcm9ibGVtRGlhbG9nSW1hZ2UpIHsKICAgICAgICAgICAgZWxlbWVudHMucHJvYmxlbURpYWxvZ0ltYWdlLnNyYyA9IHN0YXRlLnByb2JsZW1JbWFnZURhdGEuZGF0YVVybDsKICAgICAgICAgICAgZWxlbWVudHMucHJvYmxlbURpYWxvZ0ltYWdlLmFsdCA9IHN0YXRlLnByb2JsZW1JbWFnZURhdGEubmFtZSB8fCAi5re75LuY55S75YOPIjsKICAgICAgICAgIH0KICAgICAgICAgIGlmIChlbGVtZW50cy5wcm9ibGVtRGlhbG9nSW1hZ2VNZXRhKSB7CiAgICAgICAgICAgIGNvbnN0IHNpemVLYiA9IE1hdGgubWF4KDEsIE1hdGgucm91bmQoc3RhdGUucHJvYmxlbUltYWdlRGF0YS5zaXplIC8gMTAyNCkpOwogICAgICAgICAgICBlbGVtZW50cy5wcm9ibGVtRGlhbG9nSW1hZ2VNZXRhLnRleHRDb250ZW50ID0gYCR7c3RhdGUucHJvYmxlbUlt",
    "YWdlRGF0YS5uYW1lfSAoJHtzaXplS2J9S0IpYDsKICAgICAgICAgIH0KICAgICAgICAgIHNob3dEaWFsb2coZWxlbWVudHMucHJvYmxlbUltYWdlRGlhbG9nKTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHNob3dSZXNldFByb2JsZW1EaWFsb2coKSB7CiAgICAgICAgICBzaG93RGlhbG9nKGVsZW1lbnRzLnByb2JsZW1SZXNldERpYWxvZywgKCkgPT4gewogICAgICAgICAgICBjb25zdCBzaG91bGRDbGVhciA9IHdpbmRvdy5jb25maXJtKCLlhaXlipvkuK3jga7lhoXlrrnjgpLliYrpmaTjgZfjgb7jgZnjgILjgojjgo3jgZfjgYTjgafjgZnjgYvvvJ8iKTsKICAgICAgICAgICAgaWYgKHNob3VsZENsZWFyKSB7CiAgICAgICAgICAgICAgcmVzZXRQcm9ibGVtQ29tcG9zZXIoKTsKICAgICAgICAgICAgICBlbGVtZW50cy5wcm9vZnJlYWRpbmdGZWVkYmFjay50ZXh0Q29udGVudCA9ICIiOwogICAgICAgICAgICB9CiAgICAgICAgICB9KTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHJlbmRlclByb2JsZW1JbWFnZVByZXZpZXcoKSB7CiAgICAgICAgICBpZiAoIWVsZW1lbnRzLnByb2JsZW1JbWFnZVByZXZpZXdXcmFwIHx8ICFlbGVtZW50cy5wcm9ibGVtSW1hZ2VNZXRhKSB7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KCiAgICAgICAgICBpZiAoIXN0YXRlLnByb2JsZW1JbWFnZURhdGEpIHsKICAgICAgICAgICAgZWxlbWVudHMucHJvYmxlbUltYWdlUHJldmlld1dyYXAuaGlkZGVuID0gdHJ1ZTsKICAgICAgICAgICAgZWxlbWVudHMucHJvYmxlbUltYWdlTWV0YS50ZXh0Q29udGVudCA9ICIiOwogICAgICAgICAgICBpZiAoZWxlbWVudHMudmlld1Byb2JsZW1JbWFnZUJ0bikgewogICAgICAgICAgICAgIGVsZW1lbnRzLnZpZXdQcm9ibGVtSW1hZ2VCdG4u",
    "ZGlzYWJsZWQgPSB0cnVlOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHVwZGF0ZVByb2JsZW1QcmV2aWV3KCk7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KCiAgICAgICAgICBlbGVtZW50cy5wcm9ibGVtSW1hZ2VQcmV2aWV3V3JhcC5oaWRkZW4gPSBmYWxzZTsKICAgICAgICAgIGNvbnN0IHNpemVLYiA9IE1hdGgubWF4KDEsIE1hdGgucm91bmQoc3RhdGUucHJvYmxlbUltYWdlRGF0YS5zaXplIC8gMTAyNCkpOwogICAgICAgICAgZWxlbWVudHMucHJvYmxlbUltYWdlTWV0YS50ZXh0Q29udGVudCA9IGAke3N0YXRlLnByb2JsZW1JbWFnZURhdGEubmFtZX0gKCR7c2l6ZUtifUtCKWA7CiAgICAgICAgICBpZiAoZWxlbWVudHMudmlld1Byb2JsZW1JbWFnZUJ0bikgewogICAgICAgICAgICBlbGVtZW50cy52aWV3UHJvYmxlbUltYWdlQnRuLmRpc2FibGVkID0gZmFsc2U7CiAgICAgICAgICB9CiAgICAgICAgICB1cGRhdGVQcm9ibGVtUHJldmlldygpOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gY2xlYXJQcm9ibGVtSW1hZ2UoKSB7CiAgICAgICAgICBpZiAoZWxlbWVudHMucHJvYmxlbUltYWdlSW5wdXQpIHsKICAgICAgICAgICAgZWxlbWVudHMucHJvYmxlbUltYWdlSW5wdXQudmFsdWUgPSAiIjsKICAgICAgICAgIH0KICAgICAgICAgIHN0YXRlLnByb2JsZW1JbWFnZURhdGEgPSBudWxsOwogICAgICAgICAgcmVuZGVyUHJvYmxlbUltYWdlUHJldmlldygpOwogICAgICAgICAgdXBkYXRlUHJvYmxlbVByZXZpZXcoKTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGluc2VydFByb2JsZW1JbWFnZUludG9FZGl0b3IoaW1hZ2VEYXRhKSB7CiAgICAgICAgICBpZiAoIWVsZW1lbnRzLnByb2JsZW1FZGl0b3IgfHwgIWltYWdlRGF0YT8uZGF0YVVybCkgewog",
    "ICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CiAgICAgICAgICBjb25zdCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImltZyIpOwogICAgICAgICAgaW1hZ2UuY2xhc3NOYW1lID0gIm1hbmFnZXItZWRpdG9yLWltYWdlIjsKICAgICAgICAgIGltYWdlLnNyYyA9IGltYWdlRGF0YS5kYXRhVXJsOwogICAgICAgICAgaW1hZ2UuYWx0ID0gaW1hZ2VEYXRhLm5hbWUgfHwgIuWVj+mhjOeUu+WDjyI7CiAgICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7CiAgICAgICAgICBjb25zdCBjYW5Vc2VTZWxlY3Rpb24gPQogICAgICAgICAgICBzZWxlY3Rpb24gJiYKICAgICAgICAgICAgc2VsZWN0aW9uLnJhbmdlQ291bnQgPiAwICYmCiAgICAgICAgICAgIGVsZW1lbnRzLnByb2JsZW1FZGl0b3IuY29udGFpbnMoc2VsZWN0aW9uLmdldFJhbmdlQXQoMCkuY29tbW9uQW5jZXN0b3JDb250YWluZXIpOwogICAgICAgICAgaWYgKGNhblVzZVNlbGVjdGlvbikgewogICAgICAgICAgICBjb25zdCByYW5nZSA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApOwogICAgICAgICAgICByYW5nZS5kZWxldGVDb250ZW50cygpOwogICAgICAgICAgICByYW5nZS5pbnNlcnROb2RlKGltYWdlKTsKICAgICAgICAgICAgcmFuZ2Uuc2V0U3RhcnRBZnRlcihpbWFnZSk7CiAgICAgICAgICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpOwogICAgICAgICAgICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7CiAgICAgICAgICAgIHNlbGVjdGlvbi5hZGRSYW5nZShyYW5nZSk7CiAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICBlbGVtZW50cy5wcm9ibGVtRWRpdG9yLmFwcGVuZChpbWFnZSk7CiAgICAgICAgICB9CiAgICAgICAgICBlbGVtZW50cy5wcm9ibGVtRWRp",
    "dG9yLmFwcGVuZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJiciIpKTsKICAgICAgICAgIHVwZGF0ZUVkaXRvckNvdW50cygpOwogICAgICAgICAgdXBkYXRlUHJvYmxlbVByZXZpZXcoKTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGZpbGVUb0RhdGFVcmwoZmlsZSkgewogICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHsKICAgICAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTsKICAgICAgICAgICAgcmVhZGVyLm9ubG9hZCA9ICgpID0+IHJlc29sdmUodHlwZW9mIHJlYWRlci5yZXN1bHQgPT09ICJzdHJpbmciID8gcmVhZGVyLnJlc3VsdCA6ICIiKTsKICAgICAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSAoKSA9PiByZWplY3QobmV3IEVycm9yKCJmaWxlLXJlYWQtZmFpbGVkIikpOwogICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTsKICAgICAgICAgIH0pOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gcmVzZXRQcm9ibGVtQ29tcG9zZXIoKSB7CiAgICAgICAgICBlbGVtZW50cy5wcm9ibGVtRWRpdG9yLmlubmVySFRNTCA9ICIiOwogICAgICAgICAgaWYgKGVsZW1lbnRzLnRleHROdW1iZXJJbnB1dCkgewogICAgICAgICAgICBlbGVtZW50cy50ZXh0TnVtYmVySW5wdXQudmFsdWUgPSAiIjsKICAgICAgICAgIH0KICAgICAgICAgIGlmIChlbGVtZW50cy50ZXh0TmFtZUlucHV0KSB7CiAgICAgICAgICAgIGVsZW1lbnRzLnRleHROYW1lSW5wdXQudmFsdWUgPSAiIjsKICAgICAgICAgIH0KICAgICAgICAgIGlmIChlbGVtZW50cy5xdWVzdGlvbk51bWJlcklucHV0KSB7CiAgICAgICAgICAgIGVsZW1lbnRzLnF1ZXN0aW9uTnVtYmVySW5wdXQudmFsdWUgPSAiIjsKICAgICAgICAgIH0KICAg",
    "ICAgICAgIGlmIChlbGVtZW50cy5xdWVzdGlvbk5hbWVJbnB1dCkgewogICAgICAgICAgICBlbGVtZW50cy5xdWVzdGlvbk5hbWVJbnB1dC52YWx1ZSA9ICIiOwogICAgICAgICAgfQogICAgICAgICAgc3RhdGUudGV4dEJsb2NrcyA9IFtdOwogICAgICAgICAgcmVuZGVyVGV4dEJsb2NrcygpOwogICAgICAgICAgc3RhdGUubm90ZWJvb2tCbG9ja3MgPSBbXTsKICAgICAgICAgIHN0YXRlLmFjdGl2ZU5vdGVib29rQmxvY2tJZCA9ICIiOwogICAgICAgICAgcmVuZGVyTm90ZWJvb2tFZGl0b3IoKTsKICAgICAgICAgIGNsZWFyUHJvYmxlbUltYWdlKCk7CiAgICAgICAgICB1cGRhdGVFZGl0b3JDb3VudHMoKTsKICAgICAgICAgIHVwZGF0ZVByb2JsZW1QcmV2aWV3KCk7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiB1cGRhdGVFZGl0b3JDb3VudHMoKSB7CiAgICAgICAgICBjb25zdCB0ZXh0ID0gZWxlbWVudHMucHJvYmxlbUVkaXRvcj8udGV4dENvbnRlbnQgfHwgIiI7CiAgICAgICAgICBjb25zdCBub3JtYWxpemVkID0gdGV4dC5yZXBsYWNlKC9ccysvZywgIiAiKS50cmltKCk7CiAgICAgICAgICBjb25zdCBjaGFyQ291bnQgPSBub3JtYWxpemVkLmxlbmd0aDsKICAgICAgICAgIGNvbnN0IHdvcmRDb3VudCA9IGNvdW50V29yZHMobm9ybWFsaXplZCk7CgogICAgICAgICAgaWYgKGVsZW1lbnRzLmVkaXRvcldvcmRDb3VudCkgewogICAgICAgICAgICBlbGVtZW50cy5lZGl0b3JXb3JkQ291bnQudGV4dENvbnRlbnQgPSBTdHJpbmcod29yZENvdW50KTsKICAgICAgICAgIH0KICAgICAgICAgIGlmIChlbGVtZW50cy5lZGl0b3JDaGFyQ291bnQpIHsKICAgICAgICAgICAgZWxlbWVudHMuZWRpdG9yQ2hhckNvdW50LnRleHRDb250ZW50ID0gU3RyaW5nKGNoYXJDb3VudCk7CiAgICAg",
    "ICAgICB9CiAgICAgICAgICB1cGRhdGVQcm9ibGVtUHJldmlldygpOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gY291bnRXb3Jkcyh0ZXh0KSB7CiAgICAgICAgICBpZiAoIXRleHQpIHsKICAgICAgICAgICAgcmV0dXJuIDA7CiAgICAgICAgICB9CiAgICAgICAgICBjb25zdCB0b2tlbnMgPSB0ZXh0Lm1hdGNoKC9bQS1aYS16MC05XSt8W+OBgS3jgpPjgqEt44Oz5LiALem+r+ODvF0rL2cpOwogICAgICAgICAgcmV0dXJuIHRva2VucyA/IHRva2Vucy5sZW5ndGggOiAwOwogICAgICAgIH0KCgogICAgICAgIGFzeW5jIGZ1bmN0aW9uIHN1Ym1pdFRvTWFuYWdlckFwaShkcmFmdCkgewogICAgICAgICAgcmV0dXJuIHsKICAgICAgICAgICAgdHJhbnNwb3J0OiAibG9jYWwiLAogICAgICAgICAgICByZW1vdGVJZDogbnVsbCwKICAgICAgICAgICAgc3RhdHVzOiBkcmFmdD8uc3RhdHVzIHx8ICJwZW5kaW5nIiwKICAgICAgICAgIH07CiAgICAgICAgfQoKICAgICAgICBhc3luYyBmdW5jdGlvbiB1cGRhdGVRdWVzdGlvblN1Ym1pc3Npb25BcGkoZHJhZnQsIHBhdGNoID0ge30pIHsKICAgICAgICAgIHJldHVybiB7CiAgICAgICAgICAgIHRyYW5zcG9ydDogImxvY2FsIiwKICAgICAgICAgICAgcmVtb3RlSWQ6IG51bGwsCiAgICAgICAgICAgIHN0YXR1czogcGF0Y2guc3RhdHVzIHx8IGRyYWZ0Py5zdGF0dXMgfHwgInBlbmRpbmciLAogICAgICAgICAgfTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHF1ZXVlT3V0Ym94KHBheWxvYWQpIHsKICAgICAgICAgIGNvbnN0IG91dGJveCA9IGxvYWRKc29uKE1BTkFHRVJfT1VUQk9YX0tFWSwgW10pOwogICAgICAgICAgb3V0Ym94LnB1c2goewogICAgICAgICAgICBxdWV1ZWRBdDogdG9Kc3RJc29TdHJpbmcoKSwKICAgICAgICAgICAg",
    "cGF5bG9hZCwKICAgICAgICAgIH0pOwogICAgICAgICAgc2F2ZUpzb24oTUFOQUdFUl9PVVRCT1hfS0VZLCBvdXRib3gpOwogICAgICAgIH0KCiAgICAgICAgYXN5bmMgZnVuY3Rpb24gZ2V0QXV0aDBBY2Nlc3NUb2tlbigpIHsKICAgICAgICAgIGNvbnN0IGF1dGgwTGliID0gd2luZG93LmF1dGgwOwogICAgICAgICAgY29uc3QgY29uZmlnID0gd2luZG93LkFVVEgwX0NPTkZJRzsKICAgICAgICAgIGlmICghYXV0aDBMaWI/LmNyZWF0ZUF1dGgwQ2xpZW50IHx8ICFjb25maWc/LmRvbWFpbiB8fCAhY29uZmlnPy5jbGllbnRJZCkgewogICAgICAgICAgICByZXR1cm4gbnVsbDsKICAgICAgICAgIH0KCiAgICAgICAgICBpZiAoIXN0YXRlLmF1dGgwQ2xpZW50KSB7CiAgICAgICAgICAgIHN0YXRlLmF1dGgwQ2xpZW50ID0gYXdhaXQgYXV0aDBMaWIuY3JlYXRlQXV0aDBDbGllbnQoewogICAgICAgICAgICAgIGRvbWFpbjogY29uZmlnLmRvbWFpbiwKICAgICAgICAgICAgICBjbGllbnRJZDogY29uZmlnLmNsaWVudElkLAogICAgICAgICAgICAgIGF1dGhvcml6YXRpb25QYXJhbXM6IHsKICAgICAgICAgICAgICAgIHJlZGlyZWN0X3VyaTogd2luZG93LmxvY2F0aW9uLmhyZWYsCiAgICAgICAgICAgICAgICBzY29wZTogY29uZmlnLnNjb3BlIHx8ICJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsCiAgICAgICAgICAgICAgICAuLi4oY29uZmlnLmF1ZGllbmNlID8geyBhdWRpZW5jZTogY29uZmlnLmF1ZGllbmNlIH0gOiB7fSksCiAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgfSk7CiAgICAgICAgICB9CgogICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgY29uc3QgYXV0aGVudGljYXRlZCA9IGF3YWl0IHN0YXRlLmF1dGgwQ2xpZW50LmlzQXV0aGVudGljYXRlZCgpOwogICAgICAgICAgICBp",
    "ZiAoIWF1dGhlbnRpY2F0ZWQpIHsKICAgICAgICAgICAgICByZXR1cm4gbnVsbDsKICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gYXdhaXQgc3RhdGUuYXV0aDBDbGllbnQuZ2V0VG9rZW5TaWxlbnRseSh7CiAgICAgICAgICAgICAgYXV0aG9yaXphdGlvblBhcmFtczogewogICAgICAgICAgICAgICAgYXVkaWVuY2U6IGNvbmZpZy5hdWRpZW5jZSB8fCBERUZBVUxUX0FQSV9CQVNFLAogICAgICAgICAgICAgICAgc2NvcGU6IGNvbmZpZy5zY29wZSB8fCAib3BlbmlkIHByb2ZpbGUgZW1haWwiLAogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgIH0pOwogICAgICAgICAgfSBjYXRjaCB7CiAgICAgICAgICAgIHJldHVybiBudWxsOwogICAgICAgICAgfQogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gaW5pdGlhbGl6ZVF1ZXN0aW9uTGlzdERuRCgpIHsKICAgICAgICAgIGVsZW1lbnRzLmNyZWF0ZWRRdWVzdGlvbkxpc3QuYWRkRXZlbnRMaXN0ZW5lcigiZHJhZ3N0YXJ0IiwgKGV2ZW50KSA9PiB7CiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGV2ZW50LnRhcmdldCBpbnN0YW5jZW9mIEVsZW1lbnQgPyBldmVudC50YXJnZXQuY2xvc2VzdCgiLm1hbmFnZXItcXVlc3Rpb24taXRlbSIpIDogbnVsbDsKICAgICAgICAgICAgaWYgKCFyb3cpIHsKICAgICAgICAgICAgICByZXR1cm47CiAgICAgICAgICAgIH0KICAgICAgICAgICAgc3RhdGUuZHJhZ2dpbmdJZCA9IHJvdy5kYXRhc2V0LmlkIHx8IG51bGw7CiAgICAgICAgICAgIHN0YXRlLmxhc3REcmFnT3ZlcktleSA9IG51bGw7CiAgICAgICAgICAgIHJvdy5jbGFzc0xpc3QuYWRkKCJpcy1kcmFnZ2luZyIpOwogICAgICAgICAgICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyKSB7CiAgICAgICAgICAgICAgZXZlbnQuZGF0YVRyYW5z",
    "ZmVyLnNldERhdGEoInRleHQvcGxhaW4iLCBzdGF0ZS5kcmFnZ2luZ0lkIHx8ICIiKTsKICAgICAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICJtb3ZlIjsKICAgICAgICAgICAgfQogICAgICAgICAgfSk7CgogICAgICAgICAgZWxlbWVudHMuY3JlYXRlZFF1ZXN0aW9uTGlzdC5hZGRFdmVudExpc3RlbmVyKCJkcmFnZW5kIiwgKGV2ZW50KSA9PiB7CiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGV2ZW50LnRhcmdldCBpbnN0YW5jZW9mIEVsZW1lbnQgPyBldmVudC50YXJnZXQuY2xvc2VzdCgiLm1hbmFnZXItcXVlc3Rpb24taXRlbSIpIDogbnVsbDsKICAgICAgICAgICAgaWYgKHJvdykgewogICAgICAgICAgICAgIHJvdy5jbGFzc0xpc3QucmVtb3ZlKCJpcy1kcmFnZ2luZyIpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHBlcnNpc3REcmFmdE9yZGVyRnJvbURvbSgpOwogICAgICAgICAgICBzdGF0ZS5kcmFnZ2luZ0lkID0gbnVsbDsKICAgICAgICAgICAgc3RhdGUubGFzdERyYWdPdmVyS2V5ID0gbnVsbDsKICAgICAgICAgIH0pOwoKICAgICAgICAgIGVsZW1lbnRzLmNyZWF0ZWRRdWVzdGlvbkxpc3QuYWRkRXZlbnRMaXN0ZW5lcigiZHJhZ292ZXIiLCAoZXZlbnQpID0+IHsKICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsKICAgICAgICAgICAgaWYgKCFzdGF0ZS5kcmFnZ2luZ0lkKSB7CiAgICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgICB9CgogICAgICAgICAgICBjb25zdCBkcmFnZ2luZ1JvdyA9IGdldFF1ZXN0aW9uUm93QnlJZChzdGF0ZS5kcmFnZ2luZ0lkKTsKICAgICAgICAgICAgY29uc3QgdGFyZ2V0Um93ID0gZXZlbnQudGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudCA/IGV2ZW50LnRhcmdldC5jbG9zZXN0KCIu",
    "bWFuYWdlci1xdWVzdGlvbi1pdGVtIikgOiBudWxsOwogICAgICAgICAgICBpZiAoIWRyYWdnaW5nUm93IHx8ICF0YXJnZXRSb3cgfHwgZHJhZ2dpbmdSb3cgPT09IHRhcmdldFJvdykgewogICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgfQoKICAgICAgICAgICAgY29uc3QgdGFyZ2V0UmVjdCA9IHRhcmdldFJvdy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTsKICAgICAgICAgICAgY29uc3Qgc2hvdWxkSW5zZXJ0QmVmb3JlID0gZXZlbnQuY2xpZW50WSA8IHRhcmdldFJlY3QudG9wICsgdGFyZ2V0UmVjdC5oZWlnaHQgLyAyOwogICAgICAgICAgICBjb25zdCBob3ZlcktleSA9IGAke3RhcmdldFJvdy5kYXRhc2V0LmlkfToke3Nob3VsZEluc2VydEJlZm9yZSA/ICJiZWZvcmUiIDogImFmdGVyIn1gOwogICAgICAgICAgICBpZiAoc3RhdGUubGFzdERyYWdPdmVyS2V5ID09PSBob3ZlcktleSkgewogICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgfQogICAgICAgICAgICBzdGF0ZS5sYXN0RHJhZ092ZXJLZXkgPSBob3ZlcktleTsKCiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzUmVjdHMgPSBzbmFwc2hvdFF1ZXN0aW9uUm93UmVjdHMoKTsKICAgICAgICAgICAgaWYgKHNob3VsZEluc2VydEJlZm9yZSkgewogICAgICAgICAgICAgIGlmICh0YXJnZXRSb3cucHJldmlvdXNFbGVtZW50U2libGluZyA9PT0gZHJhZ2dpbmdSb3cpIHsKICAgICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgZWxlbWVudHMuY3JlYXRlZFF1ZXN0aW9uTGlzdC5pbnNlcnRCZWZvcmUoZHJhZ2dpbmdSb3csIHRhcmdldFJvdyk7CiAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgaWYgKHRhcmdldFJvdy5uZXh0RWxlbWVudFNpYmxpbmcg",
    "PT09IGRyYWdnaW5nUm93KSB7CiAgICAgICAgICAgICAgICByZXR1cm47CiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIGVsZW1lbnRzLmNyZWF0ZWRRdWVzdGlvbkxpc3QuaW5zZXJ0QmVmb3JlKGRyYWdnaW5nUm93LCB0YXJnZXRSb3cubmV4dEVsZW1lbnRTaWJsaW5nKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBhbmltYXRlUXVlc3Rpb25Sb3dTaGlmdChwcmV2aW91c1JlY3RzKTsKICAgICAgICAgIH0pOwoKICAgICAgICAgIGVsZW1lbnRzLmNyZWF0ZWRRdWVzdGlvbkxpc3QuYWRkRXZlbnRMaXN0ZW5lcigiZHJvcCIsIChldmVudCkgPT4gewogICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOwogICAgICAgICAgICBwZXJzaXN0RHJhZnRPcmRlckZyb21Eb20oKTsKICAgICAgICAgIH0pOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gZ2V0UXVlc3Rpb25Sb3dCeUlkKGlkKSB7CiAgICAgICAgICBpZiAoIWlkKSB7CiAgICAgICAgICAgIHJldHVybiBudWxsOwogICAgICAgICAgfQogICAgICAgICAgY29uc3Qgcm93cyA9IEFycmF5LmZyb20oZWxlbWVudHMuY3JlYXRlZFF1ZXN0aW9uTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCIubWFuYWdlci1xdWVzdGlvbi1pdGVtIikpOwogICAgICAgICAgcmV0dXJuIHJvd3MuZmluZCgocm93KSA9PiByb3cuZGF0YXNldC5pZCA9PT0gaWQpIHx8IG51bGw7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBzbmFwc2hvdFF1ZXN0aW9uUm93UmVjdHMoKSB7CiAgICAgICAgICBjb25zdCByZWN0cyA9IG5ldyBNYXAoKTsKICAgICAgICAgIGNvbnN0IHJvd3MgPSBlbGVtZW50cy5jcmVhdGVkUXVlc3Rpb25MaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoIi5tYW5hZ2VyLXF1ZXN0aW9uLWl0ZW0iKTsKICAgICAgICAgIHJvd3MuZm9y",
    "RWFjaCgocm93KSA9PiB7CiAgICAgICAgICAgIGlmIChyb3cgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiByb3cuZGF0YXNldC5pZCkgewogICAgICAgICAgICAgIHJlY3RzLnNldChyb3cuZGF0YXNldC5pZCwgcm93LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTsKICAgICAgICAgICAgfQogICAgICAgICAgfSk7CiAgICAgICAgICByZXR1cm4gcmVjdHM7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBhbmltYXRlUXVlc3Rpb25Sb3dTaGlmdChwcmV2aW91c1JlY3RzKSB7CiAgICAgICAgICBjb25zdCByb3dzID0gZWxlbWVudHMuY3JlYXRlZFF1ZXN0aW9uTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCIubWFuYWdlci1xdWVzdGlvbi1pdGVtIik7CiAgICAgICAgICByb3dzLmZvckVhY2goKHJvdykgPT4gewogICAgICAgICAgICBpZiAoIShyb3cgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgfHwgIXJvdy5kYXRhc2V0LmlkKSB7CiAgICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzID0gcHJldmlvdXNSZWN0cy5nZXQocm93LmRhdGFzZXQuaWQpOwogICAgICAgICAgICBpZiAoIXByZXZpb3VzKSB7CiAgICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgICB9CgogICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gcm93LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOwogICAgICAgICAgICBjb25zdCBkZWx0YVkgPSBwcmV2aW91cy50b3AgLSBjdXJyZW50LnRvcDsKICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRlbHRhWSkgPCAxKSB7CiAgICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgICB9CgogICAgICAgICAgICByb3cuZ2V0QW5pbWF0aW9ucygpLmZvckVhY2goKGFuaW1hdGlvbikgPT4gYW5pbWF0aW9uLmNhbmNlbCgpKTsK",
    "ICAgICAgICAgICAgcm93LmFuaW1hdGUoCiAgICAgICAgICAgICAgWwogICAgICAgICAgICAgICAgeyB0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKCR7ZGVsdGFZfXB4KWAgfSwKICAgICAgICAgICAgICAgIHsgdHJhbnNmb3JtOiAidHJhbnNsYXRlWSgwcHgpIiB9LAogICAgICAgICAgICAgIF0sCiAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgZHVyYXRpb246IDE4MCwKICAgICAgICAgICAgICAgIGVhc2luZzogImN1YmljLWJlemllcigwLjIyLCAxLCAwLjM2LCAxKSIsCiAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgKTsKICAgICAgICAgIH0pOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gcGVyc2lzdERyYWZ0T3JkZXJGcm9tRG9tKCkgewogICAgICAgICAgY29uc3QgaWRzID0gQXJyYXkuZnJvbShlbGVtZW50cy5jcmVhdGVkUXVlc3Rpb25MaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoIi5tYW5hZ2VyLXF1ZXN0aW9uLWl0ZW0iKSkKICAgICAgICAgICAgLm1hcCgocm93KSA9PiByb3cuZGF0YXNldC5pZCB8fCAiIikKICAgICAgICAgICAgLmZpbHRlcihCb29sZWFuKTsKICAgICAgICAgIGlmICghaWRzLmxlbmd0aCkgewogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CgogICAgICAgICAgY29uc3QgZHJhZnRNYXAgPSBuZXcgTWFwKHN0YXRlLmRyYWZ0cy5tYXAoKGRyYWZ0KSA9PiBbZHJhZnQuaWQsIGRyYWZ0XSkpOwogICAgICAgICAgY29uc3Qgb3JkZXJlZERyYWZ0cyA9IGlkcy5tYXAoKGlkKSA9PiBkcmFmdE1hcC5nZXQoaWQpKS5maWx0ZXIoQm9vbGVhbik7CiAgICAgICAgICBpZiAob3JkZXJlZERyYWZ0cy5sZW5ndGggIT09IHN0YXRlLmRyYWZ0cy5sZW5ndGgpIHsKICAgICAgICAgICAgY29uc3QgaWRTZXQgPSBuZXcgU2V0KGlkcyk7CiAgICAgICAgICAg",
    "IHN0YXRlLmRyYWZ0cy5mb3JFYWNoKChkcmFmdCkgPT4gewogICAgICAgICAgICAgIGlmICghaWRTZXQuaGFzKGRyYWZ0LmlkKSkgewogICAgICAgICAgICAgICAgb3JkZXJlZERyYWZ0cy5wdXNoKGRyYWZ0KTsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0pOwogICAgICAgICAgfQoKICAgICAgICAgIHN0YXRlLmRyYWZ0cyA9IG9yZGVyZWREcmFmdHM7CiAgICAgICAgICBzYXZlSnNvbihNQU5BR0VSX0RSQUZUX0tFWSwgc3RhdGUuZHJhZnRzKTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGdldERyYWZ0RGlzcGxheVRpdGxlKGRyYWZ0KSB7CiAgICAgICAgICBjb25zdCBxdWVzdGlvblRpdGxlID0gW2RyYWZ0Py5xdWVzdGlvbk51bWJlciwgZHJhZnQ/LnF1ZXN0aW9uTmFtZV0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oIiAiKTsKICAgICAgICAgIGNvbnN0IHRleHRUaXRsZSA9IFtkcmFmdD8udGV4dE51bWJlciwgZHJhZnQ/LnRleHROYW1lXS5maWx0ZXIoQm9vbGVhbikuam9pbigiICIpOwogICAgICAgICAgY29uc3QgaXRlbVRpdGxlID0gcXVlc3Rpb25UaXRsZSB8fCB0ZXh0VGl0bGUgfHwgIuacquioreWumuOBruWVj+mhjCI7CiAgICAgICAgICByZXR1cm4gW2RyYWZ0Py5iaW5kZXIsIGRyYWZ0Py5ub3RlLCBpdGVtVGl0bGVdLmZpbHRlcihCb29sZWFuKS5qb2luKCIgLyAiKTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHJlbmRlclF1ZXN0aW9uTGlzdCgpIHsKICAgICAgICAgIGNvbnN0IGxpc3QgPSBlbGVtZW50cy5jcmVhdGVkUXVlc3Rpb25MaXN0OwogICAgICAgICAgbGlzdC5pbm5lckhUTUwgPSAiIjsKICAgICAgICAgIHVwZGF0ZVF1ZXN0aW9uTGlzdFRpbWVzdGFtcCgpOwoKICAgICAgICAgIGNvbnN0IHZpc2libGVEcmFmdHMgPSBzdGF0ZS5kcmFmdHMu",
    "ZmlsdGVyKChkcmFmdCkgPT4gewogICAgICAgICAgICBpZiAoc3RhdGUuc2VsZWN0ZWRMaXN0QmluZGVyICYmIGRyYWZ0LmJpbmRlciAhPT0gc3RhdGUuc2VsZWN0ZWRMaXN0QmluZGVyKSB7CiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChzdGF0ZS5zZWxlY3RlZExpc3ROb3RlICYmIGRyYWZ0Lm5vdGUgIT09IHN0YXRlLnNlbGVjdGVkTGlzdE5vdGUpIHsKICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgICB9KTsKCiAgICAgICAgICBpZiAoIXZpc2libGVEcmFmdHMubGVuZ3RoKSB7CiAgICAgICAgICAgIGxpc3QuaW5uZXJIVE1MID0gYDxsaSBjbGFzcz0ibWFuYWdlci1lbXB0eS1ub3RlIj7jgb7jgaDllY/poYzjga/jgYLjgorjgb7jgZvjgpPjgILmlrDjgZfjgYTllY/poYzjgpLkvZzmiJDjgZfjgabjgY/jgaDjgZXjgYTjgII8L2xpPmA7CiAgICAgICAgICAgIHJlbmRlclBlbmRpbmdRdWVzdGlvbk1hbmFnZXIoKTsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQoKICAgICAgICAgIGNvbnN0IHJvd3MgPSB2aXNpYmxlRHJhZnRzLm1hcCgoZHJhZnQpID0+IHsKICAgICAgICAgICAgY29uc3Qgc3RhdHVzID0gbm9ybWFsaXplU3RhdHVzKGRyYWZ0LnN0YXR1cyk7CiAgICAgICAgICAgIGNvbnN0IHRleHRTbmlwcGV0ID0gdHJ1bmNhdGVUZXh0KGRyYWZ0LmNvbnRlbnRUZXh0IHx8ICIiLCAzMik7CiAgICAgICAgICAgIGNvbnN0IGltYWdlTWV0YSA9IGRyYWZ0LmltYWdlPy5uYW1lID8gYOeUu+WDjzogJHt0cnVuY2F0ZVRleHQoZHJhZnQuaW1hZ2UubmFtZSwgMjQpfWAgOiAi55S75YOP44Gq44GXIjsKICAgICAgICAgICAgY29uc3Qg",
    "bWV0YVRleHQgPSBbZm9ybWF0RGF0ZShkcmFmdC5zdWJtaXR0ZWRBdCksIHRleHRTbmlwcGV0LCBpbWFnZU1ldGFdLmpvaW4oIiAvICIpOwogICAgICAgICAgICBjb25zdCB0aXRsZVRleHQgPSBnZXREcmFmdERpc3BsYXlUaXRsZShkcmFmdCk7CiAgICAgICAgICAgIGNvbnN0IGRyYWdnaW5nQ2xhc3MgPSBkcmFmdC5pZCA9PT0gc3RhdGUuZHJhZ2dpbmdJZCA/ICIgaXMtZHJhZ2dpbmciIDogIiI7CiAgICAgICAgICAgIHJldHVybiBgCiAgICAgICAgICAgICAgPGxpIGNsYXNzPSJtYW5hZ2VyLXF1ZXN0aW9uLWl0ZW0ke2RyYWdnaW5nQ2xhc3N9IiBkYXRhLWlkPSIke2VzY2FwZUh0bWwoZHJhZnQuaWQpfSI+CiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJtYW5hZ2VyLXF1ZXN0aW9uLW1haW4iPgogICAgICAgICAgICAgICAgICA8cCBjbGFzcz0ibWFuYWdlci1xdWVzdGlvbi10aXRsZSI+JHtlc2NhcGVIdG1sKHRpdGxlVGV4dCl9PC9wPgogICAgICAgICAgICAgICAgICA8cCBjbGFzcz0ibWFuYWdlci1xdWVzdGlvbi1tZXRhIj4ke2VzY2FwZUh0bWwobWV0YVRleHQpfTwvcD4KICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9InN0YXR1cy1jaGlwICR7ZXNjYXBlSHRtbChzdGF0dXMpfSI+JHtlc2NhcGVIdG1sKFNUQVRVU19MQUJFTFtzdGF0dXNdKX08L3NwYW4+CiAgICAgICAgICAgICAgPC9saT4KICAgICAgICAgICAgYDsKICAgICAgICAgIH0pOwoKICAgICAgICAgIGxpc3QuaW5uZXJIVE1MID0gcm93cy5qb2luKCIiKTsKICAgICAgICAgIHJlbmRlclBlbmRpbmdRdWVzdGlvbk1hbmFnZXIoKTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGdldFBlbmRpbmdRdWVzdGlvbkRyYWZ0cygpIHsKICAgICAgICAgIHJldHVybiBzdGF0",
    "ZS5kcmFmdHMuZmlsdGVyKChkcmFmdCkgPT4gbm9ybWFsaXplU3RhdHVzKGRyYWZ0LnN0YXR1cykgPT09ICJwZW5kaW5nIik7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBnZXRTZWxlY3RlZFBlbmRpbmdRdWVzdGlvbigpIHsKICAgICAgICAgIGNvbnN0IHBlbmRpbmdEcmFmdHMgPSBnZXRQZW5kaW5nUXVlc3Rpb25EcmFmdHMoKTsKICAgICAgICAgIGlmICghcGVuZGluZ0RyYWZ0cy5sZW5ndGgpIHsKICAgICAgICAgICAgc3RhdGUuc2VsZWN0ZWRQZW5kaW5nUXVlc3Rpb25JZCA9ICIiOwogICAgICAgICAgICByZXR1cm4gbnVsbDsKICAgICAgICAgIH0KICAgICAgICAgIGxldCBzZWxlY3RlZERyYWZ0ID0gcGVuZGluZ0RyYWZ0cy5maW5kKChkcmFmdCkgPT4gZHJhZnQuaWQgPT09IHN0YXRlLnNlbGVjdGVkUGVuZGluZ1F1ZXN0aW9uSWQpIHx8IG51bGw7CiAgICAgICAgICBpZiAoIXNlbGVjdGVkRHJhZnQpIHsKICAgICAgICAgICAgc2VsZWN0ZWREcmFmdCA9IHBlbmRpbmdEcmFmdHNbMF07CiAgICAgICAgICAgIHN0YXRlLnNlbGVjdGVkUGVuZGluZ1F1ZXN0aW9uSWQgPSBzZWxlY3RlZERyYWZ0LmlkOwogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIHNlbGVjdGVkRHJhZnQ7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiByZW5kZXJQZW5kaW5nUXVlc3Rpb25NYW5hZ2VyKCkgewogICAgICAgICAgaWYgKCFlbGVtZW50cy5wZW5kaW5nUXVlc3Rpb25MaXN0KSB7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KICAgICAgICAgIGNvbnN0IHBlbmRpbmdEcmFmdHMgPSBnZXRQZW5kaW5nUXVlc3Rpb25EcmFmdHMoKTsKICAgICAgICAgIGNvbnN0IHNlbGVjdGVkRHJhZnQgPSBnZXRTZWxlY3RlZFBlbmRpbmdRdWVzdGlvbigpOwogICAgICAgICAgZWxlbWVudHMu",
    "cGVuZGluZ1F1ZXN0aW9uTGlzdC5pbm5lckhUTUwgPSBwZW5kaW5nRHJhZnRzLmxlbmd0aAogICAgICAgICAgICA/IHBlbmRpbmdEcmFmdHMKICAgICAgICAgICAgICAgIC5tYXAoKGRyYWZ0KSA9PiB7CiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gZHJhZnQuaWQgPT09IHN0YXRlLnNlbGVjdGVkUGVuZGluZ1F1ZXN0aW9uSWQ7CiAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHRTbmlwcGV0ID0gdHJ1bmNhdGVUZXh0KGRyYWZ0LmNvbnRlbnRUZXh0IHx8ICIiLCAzOCk7CiAgICAgICAgICAgICAgICAgIGNvbnN0IHRpdGxlVGV4dCA9IGdldERyYWZ0RGlzcGxheVRpdGxlKGRyYWZ0KTsKICAgICAgICAgICAgICAgICAgY29uc3QgbWV0YVRleHQgPSBbZm9ybWF0RGF0ZShkcmFmdC5zdWJtaXR0ZWRBdCksIHRleHRTbmlwcGV0XS5maWx0ZXIoQm9vbGVhbikuam9pbigiIC8gIik7CiAgICAgICAgICAgICAgICAgIHJldHVybiBgCiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPSJtYW5hZ2VyLXF1ZXN0aW9uLWl0ZW0ke2lzQWN0aXZlID8gIiBpcy1hY3RpdmUiIDogIiJ9IiBkYXRhLXBlbmRpbmctcXVlc3Rpb24taWQ9IiR7ZXNjYXBlSHRtbChkcmFmdC5pZCl9Ij4KICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9Im1hbmFnZXItcXVlc3Rpb24tbWFpbiI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPSJtYW5hZ2VyLXF1ZXN0aW9uLXRpdGxlIj4ke2VzY2FwZUh0bWwodGl0bGVUZXh0IHx8ICLmnKroqK3lrprjga7llY/poYwiKX08L3A+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPSJtYW5hZ2VyLXF1ZXN0aW9uLW1ldGEiPiR7ZXNjYXBlSHRtbChtZXRhVGV4dCl9PC9wPgogICAgICAgICAgICAgICAgICAgICAgPC9kaXY+CiAg",
    "ICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0ic3RhdHVzLWNoaXAgcGVuZGluZyI+JHtlc2NhcGVIdG1sKFNUQVRVU19MQUJFTC5wZW5kaW5nKX08L3NwYW4+CiAgICAgICAgICAgICAgICAgICAgPC9saT4KICAgICAgICAgICAgICAgICAgYDsKICAgICAgICAgICAgICAgIH0pCiAgICAgICAgICAgICAgICAuam9pbigiIikKICAgICAgICAgICAgOiBgPGxpIGNsYXNzPSJtYW5hZ2VyLWVtcHR5LW5vdGUiPuacquaJv+iqjeOBruWVj+mhjOOBr+OBguOCiuOBvuOBm+OCk+OAgjwvbGk+YDsKCiAgICAgICAgICBjb25zdCBoYXNTZWxlY3Rpb24gPSBCb29sZWFuKHNlbGVjdGVkRHJhZnQpOwogICAgICAgICAgaWYgKGVsZW1lbnRzLnBlbmRpbmdRdWVzdGlvbkVtcHR5KSB7CiAgICAgICAgICAgIGVsZW1lbnRzLnBlbmRpbmdRdWVzdGlvbkVtcHR5LmhpZGRlbiA9IGhhc1NlbGVjdGlvbjsKICAgICAgICAgIH0KICAgICAgICAgIGlmIChlbGVtZW50cy5wZW5kaW5nUXVlc3Rpb25FZGl0b3JQYW5lbCkgewogICAgICAgICAgICBlbGVtZW50cy5wZW5kaW5nUXVlc3Rpb25FZGl0b3JQYW5lbC5oaWRkZW4gPSAhaGFzU2VsZWN0aW9uOwogICAgICAgICAgfQogICAgICAgICAgaWYgKCFzZWxlY3RlZERyYWZ0KSB7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KCiAgICAgICAgICBzZXRUZXh0Q29udGVudChlbGVtZW50cy5wZW5kaW5nUXVlc3Rpb25CaW5kZXIsIHNlbGVjdGVkRHJhZnQuYmluZGVyIHx8ICItIik7CiAgICAgICAgICBzZXRUZXh0Q29udGVudChlbGVtZW50cy5wZW5kaW5nUXVlc3Rpb25Ob3RlLCBzZWxlY3RlZERyYWZ0Lm5vdGUgfHwgIi0iKTsKICAgICAgICAgIHNldFRleHRDb250ZW50KGVsZW1lbnRzLnBlbmRpbmdRdWVzdGlvblN0YXR1cywgU1RBVFVTX0xB",
    "QkVMW25vcm1hbGl6ZVN0YXR1cyhzZWxlY3RlZERyYWZ0LnN0YXR1cyldKTsKICAgICAgICAgIGlmIChlbGVtZW50cy5wZW5kaW5nUXVlc3Rpb25FZGl0b3IpIHsKICAgICAgICAgICAgZWxlbWVudHMucGVuZGluZ1F1ZXN0aW9uRWRpdG9yLnZhbHVlID0gc2VsZWN0ZWREcmFmdC5jb250ZW50VGV4dCB8fCAiIjsKICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIGFzeW5jIGZ1bmN0aW9uIHNhdmVQZW5kaW5nUXVlc3Rpb25FZGl0KCkgewogICAgICAgICAgY29uc3QgZHJhZnQgPSBzdGF0ZS5kcmFmdHMuZmluZCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gc3RhdGUuc2VsZWN0ZWRQZW5kaW5nUXVlc3Rpb25JZCk7CiAgICAgICAgICBpZiAoIWRyYWZ0IHx8IG5vcm1hbGl6ZVN0YXR1cyhkcmFmdC5zdGF0dXMpICE9PSAicGVuZGluZyIpIHsKICAgICAgICAgICAgc2V0VGV4dENvbnRlbnQoZWxlbWVudHMucGVuZGluZ1F1ZXN0aW9uRmVlZGJhY2ssICLnt6jpm4bjgafjgY3jgovmnKrmib/oqo3jga7llY/poYzjgpLpgbjmip7jgZfjgabjgY/jgaDjgZXjgYTjgIIiKTsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQogICAgICAgICAgY29uc3QgbmV4dFRleHQgPSBTdHJpbmcoZWxlbWVudHMucGVuZGluZ1F1ZXN0aW9uRWRpdG9yPy52YWx1ZSB8fCAiIikudHJpbSgpOwogICAgICAgICAgaWYgKCFuZXh0VGV4dCkgewogICAgICAgICAgICBzZXRUZXh0Q29udGVudChlbGVtZW50cy5wZW5kaW5nUXVlc3Rpb25GZWVkYmFjaywgIuWVj+mhjOacrOaWh+OCkuWFpeWKm+OBl+OBpuOBj+OBoOOBleOBhOOAgiIpOwogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CiAgICAgICAgICBkcmFmdC5jb250ZW50VGV4dCA9IG5leHRUZXh0OwogICAgICAgICAgZHJhZnQuY29udGVudEh0",
    "bWwgPSB0ZXh0VG9FZGl0b3JIdG1sKG5leHRUZXh0KTsKICAgICAgICAgIGRyYWZ0LnVwZGF0ZWRBdCA9IHRvSnN0SXNvU3RyaW5nKCk7CiAgICAgICAgICBpZiAoZHJhZnQucmVtb3RlSWQpIHsKICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdXBkYXRlUXVlc3Rpb25TdWJtaXNzaW9uQXBpKGRyYWZ0LCB7IGNvbnRlbnRUZXh0OiBkcmFmdC5jb250ZW50VGV4dCwgY29udGVudEh0bWw6IGRyYWZ0LmNvbnRlbnRIdG1sIH0pOwogICAgICAgICAgICBpZiAocmVzdWx0KSB7CiAgICAgICAgICAgICAgZHJhZnQudHJhbnNwb3J0ID0gImFwaSI7CiAgICAgICAgICAgICAgZHJhZnQucmVtb3RlSWQgPSByZXN1bHQucmVtb3RlSWQgfHwgZHJhZnQucmVtb3RlSWQ7CiAgICAgICAgICAgICAgZHJhZnQuc3RhdHVzID0gcmVzdWx0LnN0YXR1cyB8fCBkcmFmdC5zdGF0dXM7CiAgICAgICAgICAgIH0KICAgICAgICAgIH0KICAgICAgICAgIHNhdmVKc29uKE1BTkFHRVJfRFJBRlRfS0VZLCBzdGF0ZS5kcmFmdHMpOwogICAgICAgICAgcmVuZGVyUXVlc3Rpb25MaXN0KCk7CiAgICAgICAgICBzZXRUZXh0Q29udGVudChlbGVtZW50cy5wZW5kaW5nUXVlc3Rpb25GZWVkYmFjaywgIue3qOmbhuOCkuS/neWtmOOBl+OBvuOBl+OBn+OAgiIpOwogICAgICAgIH0KCiAgICAgICAgYXN5bmMgZnVuY3Rpb24gYXBwcm92ZVNlbGVjdGVkUGVuZGluZ1F1ZXN0aW9uKCkgewogICAgICAgICAgY29uc3QgZHJhZnQgPSBzdGF0ZS5kcmFmdHMuZmluZCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gc3RhdGUuc2VsZWN0ZWRQZW5kaW5nUXVlc3Rpb25JZCk7CiAgICAgICAgICBpZiAoIWRyYWZ0IHx8IG5vcm1hbGl6ZVN0YXR1cyhkcmFmdC5zdGF0dXMpICE9PSAicGVuZGluZyIpIHsKICAgICAgICAgICAgc2V0VGV4",
    "dENvbnRlbnQoZWxlbWVudHMucGVuZGluZ1F1ZXN0aW9uRmVlZGJhY2ssICLmib/oqo3jgafjgY3jgovmnKrmib/oqo3jga7llY/poYzjgpLpgbjmip7jgZfjgabjgY/jgaDjgZXjgYTjgIIiKTsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQogICAgICAgICAgc2V0VGV4dENvbnRlbnQoZWxlbWVudHMucGVuZGluZ1F1ZXN0aW9uRmVlZGJhY2ssICLmib/oqo3jgpLkv53lrZjjgZfjgabjgYTjgb7jgZnjgIIiKTsKICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHVwZGF0ZVF1ZXN0aW9uU3VibWlzc2lvbkFwaShkcmFmdCwgeyBzdGF0dXM6ICJhcHByb3ZlZCIgfSk7CiAgICAgICAgICBpZiAoIXJlc3VsdCAmJiBkcmFmdC50cmFuc3BvcnQgPT09ICJhcGkiKSB7CiAgICAgICAgICAgIHNldFRleHRDb250ZW50KGVsZW1lbnRzLnBlbmRpbmdRdWVzdGlvbkZlZWRiYWNrLCAi5om/6KqN44KSU3VwYWJhc2Xjgbjkv53lrZjjgafjgY3jgb7jgZvjgpPjgafjgZfjgZ/jgILpgJrkv6HnirbmhYvjgpLnorroqo3jgZfjgabjgY/jgaDjgZXjgYTjgIIiKTsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQogICAgICAgICAgZHJhZnQuc3RhdHVzID0gImFwcHJvdmVkIjsKICAgICAgICAgIGlmIChyZXN1bHQ/LnJlbW90ZUlkKSB7CiAgICAgICAgICAgIGRyYWZ0LnJlbW90ZUlkID0gcmVzdWx0LnJlbW90ZUlkOwogICAgICAgICAgfQogICAgICAgICAgZHJhZnQudHJhbnNwb3J0ID0gcmVzdWx0Py50cmFuc3BvcnQgfHwgZHJhZnQudHJhbnNwb3J0IHx8ICJsb2NhbCI7CiAgICAgICAgICBkcmFmdC5hcHByb3ZlZEF0ID0gdG9Kc3RJc29TdHJpbmcoKTsKICAgICAgICAgIGRyYWZ0LnVwZGF0ZWRBdCA9IGRyYWZ0LmFwcHJvdmVkQXQ7CiAgICAgICAgICBzYXZlSnNvbihNQU5B",
    "R0VSX0RSQUZUX0tFWSwgc3RhdGUuZHJhZnRzKTsKICAgICAgICAgIHN0YXRlLnNlbGVjdGVkUGVuZGluZ1F1ZXN0aW9uSWQgPSAiIjsKICAgICAgICAgIHJlbmRlclF1ZXN0aW9uTGlzdCgpOwogICAgICAgICAgc2V0VGV4dENvbnRlbnQoZWxlbWVudHMucGVuZGluZ1F1ZXN0aW9uRmVlZGJhY2ssICLllY/poYzjgpLmib/oqo3jgZfjgb7jgZfjgZ/jgIIiKTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVF1ZXN0aW9uTGlzdFRpbWVzdGFtcCgpIHsKICAgICAgICAgIGlmICghZWxlbWVudHMucXVlc3Rpb25MaXN0VXBkYXRlZEF0KSB7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KICAgICAgICAgIGNvbnN0IGxhdGVzdFRpbWUgPSBzdGF0ZS5kcmFmdHMucmVkdWNlKChsYXRlc3QsIGRyYWZ0KSA9PiB7CiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZShkcmFmdC5zdWJtaXR0ZWRBdCB8fCAiIikuZ2V0VGltZSgpOwogICAgICAgICAgICByZXR1cm4gTnVtYmVyLmlzTmFOKHRpbWUpID8gbGF0ZXN0IDogTWF0aC5tYXgobGF0ZXN0LCB0aW1lKTsKICAgICAgICAgIH0sIDApOwoKICAgICAgICAgIGlmICghbGF0ZXN0VGltZSkgewogICAgICAgICAgICBlbGVtZW50cy5xdWVzdGlvbkxpc3RVcGRhdGVkQXQudGV4dENvbnRlbnQgPSAi5pyA57WC5pu05pawOiAtIjsKICAgICAgICAgICAgZWxlbWVudHMucXVlc3Rpb25MaXN0VXBkYXRlZEF0LnJlbW92ZUF0dHJpYnV0ZSgiZGF0ZXRpbWUiKTsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQoKICAgICAgICAgIGNvbnN0IGxhdGVzdERhdGUgPSBuZXcgRGF0ZShsYXRlc3RUaW1lKTsKICAgICAgICAgIGVsZW1lbnRzLnF1ZXN0aW9uTGlzdFVwZGF0ZWRBdC50ZXh0Q29udGVudCA9IGDmnIDntYLm",
    "m7TmlrA6ICR7Zm9ybWF0RGF0ZVRpbWUobGF0ZXN0RGF0ZSl9YDsKICAgICAgICAgIGVsZW1lbnRzLnF1ZXN0aW9uTGlzdFVwZGF0ZWRBdC5kYXRlVGltZSA9IGxhdGVzdERhdGUudG9JU09TdHJpbmcoKTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHJlbmRlclByb2ZpbGUoKSB7CiAgICAgICAgICBjb25zdCBuaWNrbmFtZSA9IHN0YXRlLmF1dGgubmlja25hbWUgfHwgKHN0YXRlLmF1dGgucHJvdmlkZXIgPT09ICJndWVzdCIgPyAiR3Vlc3QgTW9kZSIgOiAi5pyq6Kit5a6aIik7CiAgICAgICAgICBpZiAoZWxlbWVudHMucHJvZmlsZU5pY2tuYW1lVmFsdWUpIHsKICAgICAgICAgICAgZWxlbWVudHMucHJvZmlsZU5pY2tuYW1lVmFsdWUudGV4dENvbnRlbnQgPSBuaWNrbmFtZTsKICAgICAgICAgIH0KICAgICAgICAgIGlmIChlbGVtZW50cy5tYW5hZ2VySW5mb01lbnVOaWNrbmFtZSkgewogICAgICAgICAgICBlbGVtZW50cy5tYW5hZ2VySW5mb01lbnVOaWNrbmFtZS50ZXh0Q29udGVudCA9IG5pY2tuYW1lOwogICAgICAgICAgfQogICAgICAgICAgcmVuZGVyTWFuYWdlckF2YXRlclByZXZpZXcoKTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGFwcGx5TWFuYWdlclByb2ZpbGVGcm9tQWNjZXNzKGFjY2VzcykgewogICAgICAgICAgY29uc3QgbWVtYmVyID0gYWNjZXNzPy5tZW1iZXI7CiAgICAgICAgICBjb25zdCBkaXNwbGF5TmFtZSA9IHR5cGVvZiBtZW1iZXI/LmRpc3BsYXlfbmFtZSA9PT0gInN0cmluZyIgPyBtZW1iZXIuZGlzcGxheV9uYW1lLnRyaW0oKSA6ICIiOwogICAgICAgICAgY29uc3QgZW1haWwgPSB0eXBlb2YgbWVtYmVyPy5lbWFpbCA9PT0gInN0cmluZyIgPyBtZW1iZXIuZW1haWwudHJpbSgpIDogIiI7CiAgICAgICAgICBpZiAoIWRpc3BsYXlOYW1l",
    "ICYmICFlbWFpbCkgewogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CiAgICAgICAgICBzdGF0ZS5hdXRoID0gewogICAgICAgICAgICAuLi5zdGF0ZS5hdXRoLAogICAgICAgICAgICBkaXNwbGF5TmFtZTogZGlzcGxheU5hbWUgfHwgc3RhdGUuYXV0aC5kaXNwbGF5TmFtZSwKICAgICAgICAgICAgbmlja25hbWU6IGRpc3BsYXlOYW1lIHx8IHN0YXRlLmF1dGgubmlja25hbWUsCiAgICAgICAgICAgIGVtYWlsOiBlbWFpbCB8fCBzdGF0ZS5hdXRoLmVtYWlsLAogICAgICAgICAgfTsKICAgICAgICAgIHJlbmRlclByb2ZpbGUoKTsKICAgICAgICB9CgogICAgICAgIGFzeW5jIGZ1bmN0aW9uIGxvYWRSZXZpZXdEYXRhU25hcHNob3RGcm9tQXBpKHRva2VuKSB7CiAgICAgICAgICBpZiAoIXRva2VuKSB7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgIH0KICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaENsb3VkRGF0YVNuYXBzaG90KHRva2VuLCAiL21lL3Jldmlldy1kYXRhIiwgInJldmlld0RhdGEiKTsKICAgICAgICAgIGlmICghZGF0YSB8fCB0eXBlb2YgZGF0YSAhPT0gIm9iamVjdCIgfHwgQXJyYXkuaXNBcnJheShkYXRhKSkgewogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CiAgICAgICAgICBzdGF0ZS5yZXZpZXdEYXRhU25hcHNob3QgPSBkYXRhOwogICAgICAgICAgc3RhdGUuYXV0aCA9IGNyZWF0ZUF1dGhTdW1tYXJ5RnJvbUFwcFN0YXRlKGRhdGEsIHN0YXRlLmF1dGgpOwogICAgICAgICAgcmVuZGVyUHJvZmlsZSgpOwogICAgICAgIH0KCiAgICAgICAgYXN5bmMgZnVuY3Rpb24gbG9hZFF1ZXN0aW9uU3VibWlzc2lvbnNGcm9tQXBpKCkgewogICAgICAgICAgcmV0dXJuOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gbm9ybWFsaXpl",
    "UXVlc3Rpb25TdWJtaXNzaW9uRHJhZnQoc3VibWlzc2lvbikgewogICAgICAgICAgaWYgKCFzdWJtaXNzaW9uIHx8IHR5cGVvZiBzdWJtaXNzaW9uICE9PSAib2JqZWN0IiB8fCBBcnJheS5pc0FycmF5KHN1Ym1pc3Npb24pKSB7CiAgICAgICAgICAgIHJldHVybiBudWxsOwogICAgICAgICAgfQogICAgICAgICAgY29uc3QgaWQgPSBTdHJpbmcoc3VibWlzc2lvbi5pZCB8fCAiIikudHJpbSgpOwogICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHN1Ym1pc3Npb24ucGF5bG9hZCAmJiB0eXBlb2Ygc3VibWlzc2lvbi5wYXlsb2FkID09PSAib2JqZWN0IiA/IHN1Ym1pc3Npb24ucGF5bG9hZCA6IHt9OwogICAgICAgICAgaWYgKCFpZCkgewogICAgICAgICAgICByZXR1cm4gbnVsbDsKICAgICAgICAgIH0KICAgICAgICAgIHJldHVybiBub3JtYWxpemVQcm9ibGVtRHJhZnQoewogICAgICAgICAgICBpZDogYHJlbW90ZV8ke2lkfWAsCiAgICAgICAgICAgIHJlbW90ZUlkOiBpZCwKICAgICAgICAgICAgdHJhbnNwb3J0OiAiYXBpIiwKICAgICAgICAgICAgYmluZGVyOiBzdWJtaXNzaW9uLmJpbmRlciA/PyBwYXlsb2FkLmJpbmRlciA/PyAiIiwKICAgICAgICAgICAgbm90ZTogc3VibWlzc2lvbi5ub3RlID8/IHBheWxvYWQubm90ZSA/PyAiIiwKICAgICAgICAgICAgY2hhcHRlcjogc3VibWlzc2lvbi5jaGFwdGVyID8/IHBheWxvYWQuY2hhcHRlciA/PyAiIiwKICAgICAgICAgICAgc2VjdGlvbjogc3VibWlzc2lvbi5zZWN0aW9uID8/IHBheWxvYWQuc2VjdGlvbiA/PyAiIiwKICAgICAgICAgICAgdGV4dE51bWJlcjogc3VibWlzc2lvbi50ZXh0TnVtYmVyID8/IHN1Ym1pc3Npb24udGV4dF9udW1iZXIgPz8gcGF5bG9hZC50ZXh0TnVtYmVyID8/ICIiLAogICAgICAgICAgICB0ZXh0TmFtZTog",
    "c3VibWlzc2lvbi50ZXh0TmFtZSA/PyBzdWJtaXNzaW9uLnRleHRfbmFtZSA/PyBwYXlsb2FkLnRleHROYW1lID8/ICIiLAogICAgICAgICAgICB0ZXh0QmxvY2tzOiBBcnJheS5pc0FycmF5KHN1Ym1pc3Npb24udGV4dEJsb2NrcykgPyBzdWJtaXNzaW9uLnRleHRCbG9ja3MgOiBBcnJheS5pc0FycmF5KHBheWxvYWQudGV4dEJsb2NrcykgPyBwYXlsb2FkLnRleHRCbG9ja3MgOiBbXSwKICAgICAgICAgICAgcXVlc3Rpb25OdW1iZXI6IHN1Ym1pc3Npb24ucXVlc3Rpb25OdW1iZXIgPz8gc3VibWlzc2lvbi5xdWVzdGlvbl9udW1iZXIgPz8gcGF5bG9hZC5xdWVzdGlvbk51bWJlciA/PyAiIiwKICAgICAgICAgICAgcXVlc3Rpb25OYW1lOiBzdWJtaXNzaW9uLnF1ZXN0aW9uTmFtZSA/PyBzdWJtaXNzaW9uLnF1ZXN0aW9uX25hbWUgPz8gcGF5bG9hZC5xdWVzdGlvbk5hbWUgPz8gIiIsCiAgICAgICAgICAgIGltYWdlOiBzdWJtaXNzaW9uLmltYWdlID8/IHBheWxvYWQuaW1hZ2UgPz8gbnVsbCwKICAgICAgICAgICAgbm90ZWJvb2tCbG9ja3M6IEFycmF5LmlzQXJyYXkoc3VibWlzc2lvbi5ub3RlYm9va0Jsb2NrcykKICAgICAgICAgICAgICA/IHN1Ym1pc3Npb24ubm90ZWJvb2tCbG9ja3MKICAgICAgICAgICAgICA6IEFycmF5LmlzQXJyYXkocGF5bG9hZC5ub3RlYm9va0Jsb2NrcykKICAgICAgICAgICAgICAgID8gcGF5bG9hZC5ub3RlYm9va0Jsb2NrcwogICAgICAgICAgICAgICAgOiBbXSwKICAgICAgICAgICAgY29udGVudEh0bWw6IHN1Ym1pc3Npb24uY29udGVudEh0bWwgPz8gc3VibWlzc2lvbi5jb250ZW50X2h0bWwgPz8gcGF5bG9hZC5jb250ZW50SHRtbCA/PyAiIiwKICAgICAgICAgICAgY29udGVudFRleHQ6IHN1Ym1pc3Npb24uY29udGVudFRleHQgPz8gc3VibWlzc2lv",
    "bi5jb250ZW50X3RleHQgPz8gcGF5bG9hZC5jb250ZW50VGV4dCA/PyAiIiwKICAgICAgICAgICAgc3VibWl0dGVkQXQ6IHN1Ym1pc3Npb24uc3VibWl0dGVkQXQgPz8gc3VibWlzc2lvbi5zdWJtaXR0ZWRfYXQgPz8gcGF5bG9hZC5zdWJtaXR0ZWRBdCA/PyAiIiwKICAgICAgICAgICAgYXBwcm92ZWRBdDogc3VibWlzc2lvbi5hcHByb3ZlZEF0ID8/IHN1Ym1pc3Npb24uYXBwcm92ZWRfYXQgPz8gcGF5bG9hZC5hcHByb3ZlZEF0ID8/ICIiLAogICAgICAgICAgICB1cGRhdGVkQXQ6IHN1Ym1pc3Npb24udXBkYXRlZEF0ID8/IHN1Ym1pc3Npb24udXBkYXRlZF9hdCA/PyAiIiwKICAgICAgICAgICAgYW5zd2VyVHlwZTogcGF5bG9hZC5hbnN3ZXJUeXBlID8/ICIiLAogICAgICAgICAgICBhbnN3ZXJzOiBBcnJheS5pc0FycmF5KHBheWxvYWQuYW5zd2VycykgPyBwYXlsb2FkLmFuc3dlcnMgOiBbXSwKICAgICAgICAgICAgY2hvaWNlczogQXJyYXkuaXNBcnJheShwYXlsb2FkLmNob2ljZXMpID8gcGF5bG9hZC5jaG9pY2VzIDogW10sCiAgICAgICAgICAgIGV4cGxhbmF0aW9uOiBwYXlsb2FkLmV4cGxhbmF0aW9uID8/ICIiLAogICAgICAgICAgICBkZWNrSWQ6IHBheWxvYWQuZGVja0lkID8/ICIiLAogICAgICAgICAgICBzdWJqZWN0SWQ6IHBheWxvYWQuc3ViamVjdElkID8/ICIiLAogICAgICAgICAgICBzdWJqZWN0TGFiZWw6IHBheWxvYWQuc3ViamVjdExhYmVsID8/ICIiLAogICAgICAgICAgICBzdWJqZWN0TmFtZTogcGF5bG9hZC5zdWJqZWN0TmFtZSA/PyAiIiwKICAgICAgICAgICAgc2VyaWVzSWQ6IHBheWxvYWQuc2VyaWVzSWQgPz8gIiIsCiAgICAgICAgICAgIHNlcmllc0xhYmVsOiBwYXlsb2FkLnNlcmllc0xhYmVsID8/ICIiLAogICAgICAgICAgICBzb3VyY2VDc3ZJZDog",
    "cGF5bG9hZC5zb3VyY2VDc3ZJZCA/PyAiIiwKICAgICAgICAgICAgc3VibWlzc2lvbklkOiBpZCwKICAgICAgICAgICAgc3RhdHVzOiBzdWJtaXNzaW9uLnN0YXR1cyA/PyBwYXlsb2FkLnN0YXR1cyA/PyAicGVuZGluZyIsCiAgICAgICAgICB9KTsKICAgICAgICB9CgogICAgICAgIGFzeW5jIGZ1bmN0aW9uIGZldGNoQ2xvdWREYXRhU25hcHNob3QodG9rZW4sIHBhdGgsIHJlc3BvbnNlS2V5KSB7CiAgICAgICAgICB0cnkgewogICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3Jlc29sdmVBcGlCYXNlKCl9JHtwYXRofWAsIHsKICAgICAgICAgICAgICBoZWFkZXJzOiB7CiAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCwKICAgICAgICAgICAgICAgIEFjY2VwdDogImFwcGxpY2F0aW9uL2pzb24iLAogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgIH0pOwogICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7CiAgICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCkuY2F0Y2goKCkgPT4gbnVsbCk7CiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBqc29uPy5bcmVzcG9uc2VLZXldPy5kYXRhOwogICAgICAgICAgICBpZiAoIWRhdGEgfHwgdHlwZW9mIGRhdGEgIT09ICJvYmplY3QiIHx8IEFycmF5LmlzQXJyYXkoZGF0YSkpIHsKICAgICAgICAgICAgICByZXR1cm4gbnVsbDsKICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gZGF0YTsKICAgICAgICAgIH0gY2F0Y2ggewogICAgICAgICAgICByZXR1cm4gbnVsbDsKICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHJlbmRlck1hbmFnZXJBdmF0ZXJQ",
    "cmV2aWV3KCkgewogICAgICAgICAgY29uc3QgYXBwU3RhdGUgPSBzdGF0ZS5yZXZpZXdEYXRhU25hcHNob3QgfHwgbG9hZEpzb24oQVBQX1NUQVRFX0tFWSwge30pOwogICAgICAgICAgY29uc3QgYXZhdGVyID0gYXBwU3RhdGU/LmF2YXRlciB8fCB7fTsKICAgICAgICAgIGNvbnN0IGVxdWlwcGVkID0gYXZhdGVyPy5lcXVpcHBlZCAmJiB0eXBlb2YgYXZhdGVyLmVxdWlwcGVkID09PSAib2JqZWN0IiA/IGF2YXRlci5lcXVpcHBlZCA6IHt9OwogICAgICAgICAgY29uc3QgaXRlbU9mZnNldHMgPSBhdmF0ZXI/Lml0ZW1PZmZzZXRzICYmIHR5cGVvZiBhdmF0ZXIuaXRlbU9mZnNldHMgPT09ICJvYmplY3QiID8gYXZhdGVyLml0ZW1PZmZzZXRzIDoge307CiAgICAgICAgICBjb25zdCBtYW5hZ2VySXRlbXMgPSBuZXcgTWFwKGxvYWRNYW5hZ2VyQXZhdGVySXRlbXMoKS5tYXAoKGl0ZW0pID0+IFtpdGVtLmlkLCBpdGVtXSkpOwogICAgICAgICAgZWxlbWVudHMubWFuYWdlckF2YXRlclByZXZpZXdzLmZvckVhY2goKHByZXZpZXcpID0+IHsKICAgICAgICAgICAgcHJldmlldy5xdWVyeVNlbGVjdG9yQWxsKCIuYXZhdGVyLWxheWVyIikuZm9yRWFjaCgobGF5ZXIpID0+IGxheWVyLnJlbW92ZSgpKTsKICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMoZXF1aXBwZWQpLmZvckVhY2goKFtjYXRlZ29yeSwgaXRlbUlkXSkgPT4gewogICAgICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IE1BTkFHRVJfQVZBVEVSX0lURU1fQ0xBU1NFU1tpdGVtSWRdIHx8IChTdHJpbmcoaXRlbUlkKS5zdGFydHNXaXRoKCJjdXN0b20tIikgPyAiYXZhdGVyLWl0ZW0tY3VzdG9tIiA6ICIiKTsKICAgICAgICAgICAgICBpZiAoIWNsYXNzTmFtZSkgewogICAgICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgICAg",
    "IH0KICAgICAgICAgICAgICBjb25zdCBtYW5hZ2VySXRlbSA9IG1hbmFnZXJJdGVtcy5nZXQoaXRlbUlkKTsKICAgICAgICAgICAgICBjb25zdCBpbWFnZSA9IGdldE1hbmFnZXJBdmF0ZXJJdGVtSW1hZ2UobWFuYWdlckl0ZW0pOwogICAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IGl0ZW1PZmZzZXRzW2l0ZW1JZF0gfHwge307CiAgICAgICAgICAgICAgY29uc3QgbGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJzcGFuIik7CiAgICAgICAgICAgICAgbGF5ZXIuY2xhc3NOYW1lID0gYGF2YXRlci1sYXllciAke2NsYXNzTmFtZX0gYXZhdGVyLWNhdGVnb3J5LSR7Y2F0ZWdvcnl9JHtpbWFnZSA/ICIgaGFzLWN1c3RvbS1pbWFnZSIgOiAiIn1gOwogICAgICAgICAgICAgIGxheWVyLnN0eWxlLnNldFByb3BlcnR5KCItLWF2YXRlci1pdGVtLW9mZnNldC14IiwgYCR7TnVtYmVyKG9mZnNldC54KSB8fCAwfXB4YCk7CiAgICAgICAgICAgICAgbGF5ZXIuc3R5bGUuc2V0UHJvcGVydHkoIi0tYXZhdGVyLWl0ZW0tb2Zmc2V0LXkiLCBgJHtOdW1iZXIob2Zmc2V0LnkpIHx8IDB9cHhgKTsKICAgICAgICAgICAgICBsYXllci5zZXRBdHRyaWJ1dGUoImFyaWEtaGlkZGVuIiwgInRydWUiKTsKICAgICAgICAgICAgICBpZiAoaW1hZ2UpIHsKICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImltZyIpOwogICAgICAgICAgICAgICAgaW1hZ2VFbGVtZW50LnNyYyA9IGltYWdlLmRhdGFVcmw7CiAgICAgICAgICAgICAgICBpbWFnZUVsZW1lbnQuYWx0ID0gIiI7CiAgICAgICAgICAgICAgICBsYXllci5hcHBlbmQoaW1hZ2VFbGVtZW50KTsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgcHJldmlldy5hcHBlbmQobGF5ZXIpOwog",
    "ICAgICAgICAgICB9KTsKICAgICAgICAgIH0pOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gbm9ybWFsaXplRWRpdG9ySHRtbChodG1sKSB7CiAgICAgICAgICByZXR1cm4gaHRtbC5yZXBsYWNlKC88ZGl2Pjxicj48XC9kaXY+L2csICIiKS5yZXBsYWNlKC9eXHMrfFxzKyQvZywgIiIpOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gdGV4dFRvRWRpdG9ySHRtbCh0ZXh0KSB7CiAgICAgICAgICByZXR1cm4gU3RyaW5nKHRleHQgfHwgIiIpCiAgICAgICAgICAgIC5zcGxpdCgvXHI/XG57Mix9LykKICAgICAgICAgICAgLm1hcCgocGFyYWdyYXBoKSA9PiBgPHA+JHtlc2NhcGVIdG1sKHBhcmFncmFwaCkucmVwbGFjZSgvXHI/XG4vZywgIjxicj4iKX08L3A+YCkKICAgICAgICAgICAgLmpvaW4oIiIpOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gbG9hZEF1dGhTdW1tYXJ5KCkgewogICAgICAgICAgY29uc3QgZmFsbGJhY2sgPSB7CiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAi5pyq6Kit5a6aIiwKICAgICAgICAgICAgbmlja25hbWU6ICLmnKroqK3lrpoiLAogICAgICAgICAgICBlbWFpbDogIuacquioreWumiIsCiAgICAgICAgICAgIHByb3ZpZGVyOiAi5pyq6Kit5a6aIiwKICAgICAgICAgIH07CiAgICAgICAgICB0cnkgewogICAgICAgICAgICBjb25zdCByYXcgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oQVBQX1NUQVRFX0tFWSk7CiAgICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IHJhdyA/IEpTT04ucGFyc2UocmF3KSA6IG51bGw7CiAgICAgICAgICAgIGNvbnN0IGF1dGggPSBwYXJzZWQ/LmF1dGggPz8ge307CiAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlOYW1lID0gdHlwZW9mIGF1dGguZGlzcGxheU5hbWUgPT09ICJzdHJpbmciICYmIGF1dGguZGlz",
    "cGxheU5hbWUudHJpbSgpID8gYXV0aC5kaXNwbGF5TmFtZS50cmltKCkgOiAiIjsKICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSB0eXBlb2YgYXV0aC5wcm92aWRlciA9PT0gInN0cmluZyIgJiYgYXV0aC5wcm92aWRlci50cmltKCkgPyBhdXRoLnByb3ZpZGVyLnRyaW0oKSA6IGZhbGxiYWNrLnByb3ZpZGVyOwogICAgICAgICAgICBjb25zdCBuaWNrbmFtZSA9CiAgICAgICAgICAgICAgKHR5cGVvZiBhdXRoLm5pY2tuYW1lID09PSAic3RyaW5nIiAmJiBhdXRoLm5pY2tuYW1lLnRyaW0oKSkgfHwKICAgICAgICAgICAgICAocHJvdmlkZXIgPT09ICJndWVzdCIgPyAiR3Vlc3QgTW9kZSIgOiBkaXNwbGF5TmFtZSAmJiBkaXNwbGF5TmFtZSAhPT0gIkd1ZXN0IE1vZGUiID8gZGlzcGxheU5hbWUgOiBmYWxsYmFjay5uaWNrbmFtZSk7CiAgICAgICAgICAgIHJldHVybiB7CiAgICAgICAgICAgICAgZGlzcGxheU5hbWU6IGRpc3BsYXlOYW1lIHx8IGZhbGxiYWNrLmRpc3BsYXlOYW1lLAogICAgICAgICAgICAgIG5pY2tuYW1lLAogICAgICAgICAgICAgIGVtYWlsOiBhdXRoLmVtYWlsIHx8IGZhbGxiYWNrLmVtYWlsLAogICAgICAgICAgICAgIHByb3ZpZGVyLAogICAgICAgICAgICB9OwogICAgICAgICAgfSBjYXRjaCB7CiAgICAgICAgICAgIHJldHVybiBmYWxsYmFjazsKICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUF1dGhTdW1tYXJ5RnJvbUFwcFN0YXRlKGFwcFN0YXRlLCBmYWxsYmFjayA9IHt9KSB7CiAgICAgICAgICBjb25zdCBhdXRoID0gYXBwU3RhdGU/LmF1dGggPz8ge307CiAgICAgICAgICBjb25zdCBkaXNwbGF5TmFtZSA9IHR5cGVvZiBhdXRoLmRpc3BsYXlOYW1lID09PSAic3RyaW5nIiAmJiBhdXRoLmRpc3BsYXlOYW1lLnRyaW0o",
    "KSA/IGF1dGguZGlzcGxheU5hbWUudHJpbSgpIDogIiI7CiAgICAgICAgICBjb25zdCBwcm92aWRlciA9CiAgICAgICAgICAgIHR5cGVvZiBhdXRoLnByb3ZpZGVyID09PSAic3RyaW5nIiAmJiBhdXRoLnByb3ZpZGVyLnRyaW0oKQogICAgICAgICAgICAgID8gYXV0aC5wcm92aWRlci50cmltKCkKICAgICAgICAgICAgICA6IGZhbGxiYWNrLnByb3ZpZGVyIHx8ICLmnKroqK3lrpoiOwogICAgICAgICAgY29uc3Qgbmlja25hbWUgPQogICAgICAgICAgICAodHlwZW9mIGF1dGgubmlja25hbWUgPT09ICJzdHJpbmciICYmIGF1dGgubmlja25hbWUudHJpbSgpKSB8fAogICAgICAgICAgICAocHJvdmlkZXIgPT09ICJndWVzdCIKICAgICAgICAgICAgICA/ICJHdWVzdCBNb2RlIgogICAgICAgICAgICAgIDogZGlzcGxheU5hbWUgJiYgZGlzcGxheU5hbWUgIT09ICJHdWVzdCBNb2RlIgogICAgICAgICAgICAgICAgPyBkaXNwbGF5TmFtZQogICAgICAgICAgICAgICAgOiBmYWxsYmFjay5uaWNrbmFtZSB8fCAi5pyq6Kit5a6aIik7CiAgICAgICAgICByZXR1cm4gewogICAgICAgICAgICBkaXNwbGF5TmFtZTogZGlzcGxheU5hbWUgfHwgZmFsbGJhY2suZGlzcGxheU5hbWUgfHwgIuacquioreWumiIsCiAgICAgICAgICAgIG5pY2tuYW1lLAogICAgICAgICAgICBlbWFpbDogYXV0aC5lbWFpbCB8fCBmYWxsYmFjay5lbWFpbCB8fCAi5pyq6Kit5a6aIiwKICAgICAgICAgICAgcHJvdmlkZXIsCiAgICAgICAgICB9OwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gaW5zZXJ0VGV4dEF0Q3Vyc29yKHRleHQpIHsKICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTsKICAgICAgICAgIGlmICghc2VsZWN0aW9uIHx8IHNlbGVjdGlvbi5yYW5nZUNvdW50ID09",
    "PSAwKSB7CiAgICAgICAgICAgIGVsZW1lbnRzLnByb2JsZW1FZGl0b3IudGV4dENvbnRlbnQgPSBgJHtlbGVtZW50cy5wcm9ibGVtRWRpdG9yLnRleHRDb250ZW50IHx8ICIifSR7dGV4dH1gOwogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CiAgICAgICAgICBjb25zdCByYW5nZSA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApOwogICAgICAgICAgcmFuZ2UuZGVsZXRlQ29udGVudHMoKTsKICAgICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTsKICAgICAgICAgIHJhbmdlLmluc2VydE5vZGUobm9kZSk7CiAgICAgICAgICByYW5nZS5zZXRTdGFydEFmdGVyKG5vZGUpOwogICAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7CiAgICAgICAgICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7CiAgICAgICAgICBzZWxlY3Rpb24uYWRkUmFuZ2UocmFuZ2UpOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gcmVzb2x2ZUFwaUJhc2UoKSB7CiAgICAgICAgICByZXR1cm4gREVGQVVMVF9BUElfQkFTRTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGdldENoYXB0ZXJDb25maWcobm90ZSkgewogICAgICAgICAgcmV0dXJuIENIQVBURVJfQ09ORklHX0JZX05PVEVbbm90ZV0gfHwgREVGQVVMVF9DSEFQVEVSX0NPTkZJRzsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGNyZWF0ZU51bWJlcmVkT3B0aW9ucyhwcmVmaXgsIHN1ZmZpeCwgY291bnQpIHsKICAgICAgICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBjb3VudCB9LCAoXywgaW5kZXgpID0+IGAke3ByZWZpeH0ke2luZGV4ICsgMX0ke3N1ZmZpeH1gKTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHNldFByb2JsZW1TdGVwKHN0ZXBOYW1lKSB7CiAgICAgICAg",
    "ICBzdGF0ZS5sYXN0UHJvYmxlbVN0ZXAgPSBzdGVwTmFtZTsKICAgICAgICAgIGVsZW1lbnRzLnByb2JsZW1TdGVwcy5mb3JFYWNoKChzdGVwKSA9PiB7CiAgICAgICAgICAgIGNvbnN0IHN0ZXBJZCA9IHN0ZXAuZGF0YXNldC5wcm9ibGVtU3RlcDsKICAgICAgICAgICAgY29uc3QgaXNDcmVhdGUgPSBzdGVwSWQgPT09ICJjcmVhdGUiOwogICAgICAgICAgICBjb25zdCBpc0NvbmZpcm0gPSBzdGVwSWQgPT09ICJjb25maXJtIjsKICAgICAgICAgICAgY29uc3QgaXNTdWJtaXQgPSBzdGVwSWQgPT09ICJzdWJtaXQiOwogICAgICAgICAgICBzdGVwLmNsYXNzTGlzdC50b2dnbGUoImlzLWFjdGl2ZSIsIHN0ZXBJZCA9PT0gc3RlcE5hbWUpOwogICAgICAgICAgICBzdGVwLmNsYXNzTGlzdC50b2dnbGUoImlzLWNvbXBsZXRlIiwgKHN0ZXBOYW1lID09PSAiY29uZmlybSIgJiYgaXNDcmVhdGUpIHx8IChzdGVwTmFtZSA9PT0gInN1Ym1pdCIgJiYgKGlzQ3JlYXRlIHx8IGlzQ29uZmlybSkpKTsKICAgICAgICAgICAgaWYgKHN0ZXBOYW1lID09PSAiY3JlYXRlIiAmJiAoaXNDb25maXJtIHx8IGlzU3VibWl0KSkgewogICAgICAgICAgICAgIHN0ZXAuY2xhc3NMaXN0LnJlbW92ZSgiaXMtY29tcGxldGUiKTsKICAgICAgICAgICAgfQogICAgICAgICAgfSk7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBzaG93RGlhbG9nKGRpYWxvZywgZmFsbGJhY2spIHsKICAgICAgICAgIGlmIChkaWFsb2cgJiYgdHlwZW9mIGRpYWxvZy5zaG93TW9kYWwgPT09ICJmdW5jdGlvbiIpIHsKICAgICAgICAgICAgaWYgKCFkaWFsb2cub3BlbikgewogICAgICAgICAgICAgIGRpYWxvZy5zaG93TW9kYWwoKTsKICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm47CiAgICAgICAgICB9CiAgICAgICAgICBp",
    "ZiAodHlwZW9mIGZhbGxiYWNrID09PSAiZnVuY3Rpb24iKSB7CiAgICAgICAgICAgIGZhbGxiYWNrKCk7CiAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBjbG9zZURpYWxvZyhkaWFsb2cpIHsKICAgICAgICAgIGlmIChkaWFsb2c/Lm9wZW4pIHsKICAgICAgICAgICAgZGlhbG9nLmNsb3NlKCk7CiAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiB0b0pzdElzb1N0cmluZyh2YWx1ZSA9IG5ldyBEYXRlKCkpIHsKICAgICAgICAgIGNvbnN0IGRhdGUgPSB2YWx1ZSBpbnN0YW5jZW9mIERhdGUgPyB2YWx1ZSA6IG5ldyBEYXRlKHZhbHVlKTsKICAgICAgICAgIGNvbnN0IHRpbWUgPSBkYXRlLmdldFRpbWUoKTsKICAgICAgICAgIGlmICghTnVtYmVyLmlzRmluaXRlKHRpbWUpKSB7CiAgICAgICAgICAgIHJldHVybiAiIjsKICAgICAgICAgIH0KICAgICAgICAgIGNvbnN0IGpzdERhdGUgPSBuZXcgRGF0ZSh0aW1lICsgOSAqIDYwICogNjAgKiAxMDAwKTsKICAgICAgICAgIGNvbnN0IHllYXIgPSBqc3REYXRlLmdldFVUQ0Z1bGxZZWFyKCk7CiAgICAgICAgICBjb25zdCBtb250aCA9IFN0cmluZyhqc3REYXRlLmdldFVUQ01vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCAiMCIpOwogICAgICAgICAgY29uc3QgZGF5ID0gU3RyaW5nKGpzdERhdGUuZ2V0VVRDRGF0ZSgpKS5wYWRTdGFydCgyLCAiMCIpOwogICAgICAgICAgY29uc3QgaG91cnMgPSBTdHJpbmcoanN0RGF0ZS5nZXRVVENIb3VycygpKS5wYWRTdGFydCgyLCAiMCIpOwogICAgICAgICAgY29uc3QgbWludXRlcyA9IFN0cmluZyhqc3REYXRlLmdldFVUQ01pbnV0ZXMoKSkucGFkU3RhcnQoMiwgIjAiKTsKICAgICAgICAgIGNvbnN0IHNlY29uZHMgPSBTdHJpbmcoanN0RGF0ZS5nZXRVVENTZWNv",
    "bmRzKCkpLnBhZFN0YXJ0KDIsICIwIik7CiAgICAgICAgICBjb25zdCBtaWxsaXNlY29uZHMgPSBTdHJpbmcoanN0RGF0ZS5nZXRVVENNaWxsaXNlY29uZHMoKSkucGFkU3RhcnQoMywgIjAiKTsKICAgICAgICAgIHJldHVybiBgJHt5ZWFyfS0ke21vbnRofS0ke2RheX1UJHtob3Vyc306JHttaW51dGVzfToke3NlY29uZHN9LiR7bWlsbGlzZWNvbmRzfSswOTowMGA7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBub3JtYWxpemVQcm9ibGVtRHJhZnQoZHJhZnQpIHsKICAgICAgICAgIGlmICghZHJhZnQgfHwgdHlwZW9mIGRyYWZ0ICE9PSAib2JqZWN0IiB8fCBBcnJheS5pc0FycmF5KGRyYWZ0KSkgewogICAgICAgICAgICByZXR1cm4gbnVsbDsKICAgICAgICAgIH0KICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IG5vcm1hbGl6ZVN0YXR1cyhkcmFmdC5zdGF0dXMgfHwgKGRyYWZ0LnJlbW90ZUlkIHx8IGRyYWZ0LnRyYW5zcG9ydCA9PT0gImFwaSIgPyAicGVuZGluZyIgOiAiZHJhZnQiKSk7CiAgICAgICAgICByZXR1cm4gewogICAgICAgICAgICAuLi5kcmFmdCwKICAgICAgICAgICAgaWQ6IFN0cmluZyhkcmFmdC5pZCB8fCBkcmFmdC5yZW1vdGVJZCB8fCBgZHJhZnRfJHtEYXRlLm5vdygpfV8ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMTYpLnNsaWNlKDIsIDgpfWApLAogICAgICAgICAgICBzdGF0dXMsCiAgICAgICAgICAgIHRyYW5zcG9ydDogZHJhZnQudHJhbnNwb3J0IHx8IChkcmFmdC5yZW1vdGVJZCA/ICJhcGkiIDogImxvY2FsIiksCiAgICAgICAgICAgIHJlbW90ZUlkOiBkcmFmdC5yZW1vdGVJZCA/PyBudWxsLAogICAgICAgICAgICBhbnN3ZXJzOiBBcnJheS5pc0FycmF5KGRyYWZ0LmFuc3dlcnMpID8gZHJhZnQuYW5zd2VycyA6IFtdLAogICAgICAgICAgICBjaG9p",
    "Y2VzOiBBcnJheS5pc0FycmF5KGRyYWZ0LmNob2ljZXMpID8gZHJhZnQuY2hvaWNlcyA6IFtdLAogICAgICAgICAgICBleHBsYW5hdGlvbjogdHlwZW9mIGRyYWZ0LmV4cGxhbmF0aW9uID09PSAic3RyaW5nIiA/IGRyYWZ0LmV4cGxhbmF0aW9uIDogIiIsCiAgICAgICAgICAgIHNvdXJjZUNzdklkOiB0eXBlb2YgZHJhZnQuc291cmNlQ3N2SWQgPT09ICJzdHJpbmciID8gZHJhZnQuc291cmNlQ3N2SWQgOiAiIiwKICAgICAgICAgICAgc3VibWlzc2lvbklkOiB0eXBlb2YgZHJhZnQuc3VibWlzc2lvbklkID09PSAic3RyaW5nIiA/IGRyYWZ0LnN1Ym1pc3Npb25JZCA6ICIiLAogICAgICAgICAgfTsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGxvYWRNYW5hZ2VyUHJvYmxlbURyYWZ0cygpIHsKICAgICAgICAgIGNvbnN0IGRyYWZ0cyA9IGxvYWRKc29uKE1BTkFHRVJfRFJBRlRfS0VZLCBbXSk7CiAgICAgICAgICByZXR1cm4gKEFycmF5LmlzQXJyYXkoZHJhZnRzKSA/IGRyYWZ0cyA6IFtdKS5tYXAobm9ybWFsaXplUHJvYmxlbURyYWZ0KS5maWx0ZXIoQm9vbGVhbik7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBub3JtYWxpemVTdGF0dXMoc3RhdHVzKSB7CiAgICAgICAgICBpZiAoc3RhdHVzID09PSAiZHJhZnQiIHx8IHN0YXR1cyA9PT0gImFwcHJvdmVkIiB8fCBzdGF0dXMgPT09ICJyZWplY3RlZCIpIHsKICAgICAgICAgICAgcmV0dXJuIHN0YXR1czsKICAgICAgICAgIH0KICAgICAgICAgIHJldHVybiAicGVuZGluZyI7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiB0cnVuY2F0ZVRleHQodGV4dCwgbGVuZ3RoKSB7CiAgICAgICAgICBpZiAodGV4dC5sZW5ndGggPD0gbGVuZ3RoKSB7CiAgICAgICAgICAgIHJldHVybiB0ZXh0OwogICAgICAgICAgfQogICAgICAg",
    "ICAgcmV0dXJuIGAke3RleHQuc2xpY2UoMCwgbGVuZ3RoKX0uLi5gOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gZm9ybWF0RGF0ZSh2YWx1ZSkgewogICAgICAgICAgaWYgKCF2YWx1ZSkgewogICAgICAgICAgICByZXR1cm4gIi0iOwogICAgICAgICAgfQogICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHZhbHVlKTsKICAgICAgICAgIGlmIChOdW1iZXIuaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSB7CiAgICAgICAgICAgIHJldHVybiAiLSI7CiAgICAgICAgICB9CiAgICAgICAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpOwogICAgICAgICAgY29uc3QgbW9udGggPSBTdHJpbmcoZGF0ZS5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgIjAiKTsKICAgICAgICAgIGNvbnN0IGRheSA9IFN0cmluZyhkYXRlLmdldERhdGUoKSkucGFkU3RhcnQoMiwgIjAiKTsKICAgICAgICAgIHJldHVybiBgJHt5ZWFyfS8ke21vbnRofS8ke2RheX1gOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gZm9ybWF0RGF0ZVRpbWUoZGF0ZSkgewogICAgICAgICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTsKICAgICAgICAgIGNvbnN0IG1vbnRoID0gU3RyaW5nKGRhdGUuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsICIwIik7CiAgICAgICAgICBjb25zdCBkYXkgPSBTdHJpbmcoZGF0ZS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsICIwIik7CiAgICAgICAgICBjb25zdCBob3VycyA9IFN0cmluZyhkYXRlLmdldEhvdXJzKCkpLnBhZFN0YXJ0KDIsICIwIik7CiAgICAgICAgICBjb25zdCBtaW51dGVzID0gU3RyaW5nKGRhdGUuZ2V0TWludXRlcygpKS5wYWRTdGFydCgyLCAiMCIpOwogICAgICAgICAgcmV0dXJuIGAke3llYXJ9LyR7bW9udGh9LyR7ZGF5fSAke2hv",
    "dXJzfToke21pbnV0ZXN9YDsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIGVzY2FwZUh0bWwodmFsdWUpIHsKICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpCiAgICAgICAgICAgIC5yZXBsYWNlQWxsKCImIiwgIiZhbXA7IikKICAgICAgICAgICAgLnJlcGxhY2VBbGwoIjwiLCAiJmx0OyIpCiAgICAgICAgICAgIC5yZXBsYWNlQWxsKCI+IiwgIiZndDsiKQogICAgICAgICAgICAucmVwbGFjZUFsbCgnIicsICImcXVvdDsiKQogICAgICAgICAgICAucmVwbGFjZUFsbCgiJyIsICImIzM5OyIpOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24gY3NzRXNjYXBlKHZhbHVlKSB7CiAgICAgICAgICByZXR1cm4gd2luZG93LkNTUz8uZXNjYXBlID8gd2luZG93LkNTUy5lc2NhcGUoU3RyaW5nKHZhbHVlIHx8ICIiKSkgOiBTdHJpbmcodmFsdWUgfHwgIiIpLnJlcGxhY2UoL1siXFxdL2csICJcXCQmIik7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBsb2FkSnNvbihrZXksIGZhbGxiYWNrKSB7CiAgICAgICAgICB0cnkgewogICAgICAgICAgICBjb25zdCByYXcgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTsKICAgICAgICAgICAgcmV0dXJuIHJhdyA/IEpTT04ucGFyc2UocmF3KSA6IGZhbGxiYWNrOwogICAgICAgICAgfSBjYXRjaCB7CiAgICAgICAgICAgIHJldHVybiBmYWxsYmFjazsKICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIHNhdmVKc29uKGtleSwgdmFsdWUpIHsKICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7CiAgICAgICAgICB9IGNhdGNoIHsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgfQogICAgICAgIH0K",
    "ICAgICAgfSkoKTs="
  ].join("");
  const binary = atob(source);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  if (typeof TextDecoder === "function") {
    return new TextDecoder("utf-8").decode(bytes);
  }
  return decodeURIComponent(escape(binary));
})();
/* END_MANAGER_MIGRATED_SCRIPT_SOURCE */
