const actionStatus = document.querySelector("#actionStatus");
const panelScrim = document.querySelector("#panelScrim");
const menuNotificationBadge = document.querySelector("#menuNotificationBadge");
const raanPanel = document.querySelector("#raanPanel");
const raanMenuButton = document.querySelector("#raanMenuButton");
const raanMenuBack = document.querySelector("#raanMenuBack");
const raanTodayText = document.querySelector("#raanTodayText");
const raanSeasonalText = document.querySelector("#raanSeasonalText");
const raanRecommendedSubject = document.querySelector("#raanRecommendedSubject");
const reviewButton = document.querySelector("#reviewButton");
const homeReviewNext = document.querySelector("#homeReviewNext");
const continueButton = document.querySelector("#continueButton");
const storeButton = document.querySelector("#storeButton");
const storeNext = document.querySelector("#storeNext");
const managerScreen = document.querySelector("#managerScreen");
const managerFrame = document.querySelector("#managerFrame");
const managerCloseButton = document.querySelector("#managerCloseButton");
const managerButtons = Array.from(document.querySelectorAll("[data-manager-screen]"));
const managerFeatureTitle = document.querySelector("#managerFeatureTitle");
const managerDashboard = document.querySelector("#managerDashboard");
const managerDashboardRefreshButton = document.querySelector("#managerDashboardRefreshButton");
const managerDashboardStatus = document.querySelector("#managerDashboardStatus");
const managerUserCount = document.querySelector("#managerUserCount");
const managerMemberCount = document.querySelector("#managerMemberCount");
const managerDatabaseSize = document.querySelector("#managerDatabaseSize");
const managerDatabaseSizeNote = document.querySelector("#managerDatabaseSizeNote");
const managerMembersFrame = document.querySelector("#managerMembersFrame");
const noticeManager = document.querySelector("#noticeManager");
const noticeManagerList = document.querySelector("#noticeManagerList");
const noticeManagerForm = document.querySelector("#noticeManagerForm");
const noticeManagerId = document.querySelector("#noticeManagerId");
const noticeManagerTitleInput = document.querySelector("#noticeManagerTitleInput");
const noticeManagerDateInput = document.querySelector("#noticeManagerDateInput");
const noticeManagerBodyInput = document.querySelector("#noticeManagerBodyInput");
const noticeManagerNewButton = document.querySelector("#noticeManagerNewButton");
const noticeManagerDeleteButton = document.querySelector("#noticeManagerDeleteButton");
const noticeManagerFeedback = document.querySelector("#noticeManagerFeedback");
const noticeMenuList = document.querySelector("#noticeMenuList");
const noticeDetailCard = document.querySelector("#noticeDetailCard");
const noticeDetailEmpty = document.querySelector("#noticeDetailEmpty");
const noticeDetailDate = document.querySelector("#noticeDetailDate");
const noticeDetailTitle = document.querySelector("#noticeDetailTitle");
const noticeDetailBody = document.querySelector("#noticeDetailBody");
const reviewLibraryScreen = document.querySelector("#reviewLibraryScreen");
const reviewLibraryHeader = reviewLibraryScreen.querySelector(".review-screen-header");
const reviewLibraryBack = document.querySelector("#reviewLibraryBack");
const reviewBookStatus = document.querySelector("#reviewBookStatus");
const reviewBookEmpty = document.querySelector("#reviewBookEmpty");
const reviewBookList = document.querySelector("#reviewBookList");
const reviewStartButton = document.querySelector("#reviewStartButton");
const notePracticeButton = document.querySelector("#notePracticeButton");
const rhythmPracticeButton = document.querySelector("#rhythmPracticeButton");
const reviewSessionScreen = document.querySelector("#reviewSessionScreen");
const reviewSessionBack = document.querySelector("#reviewSessionBack");
const reviewSessionTitle = document.querySelector("#reviewSessionTitle");
const reviewProgress = document.querySelector("#reviewProgress");
const reviewQuestionName = document.querySelector("#reviewQuestionName");
const reviewQuestionText = document.querySelector("#reviewQuestionText");
const reviewQuestionImage = document.querySelector("#reviewQuestionImage");
const reviewChoiceList = document.querySelector("#reviewChoiceList");
const reviewAnswer = document.querySelector("#reviewAnswer");
const reviewAnswerText = document.querySelector("#reviewAnswerText");
const reviewRevealButton = document.querySelector("#reviewRevealButton");
const reviewNextButton = document.querySelector("#reviewNextButton");
const authUserName = document.querySelector("#authUserName");
const authUserEmail = document.querySelector("#authUserEmail");
const authStatusMessage = document.querySelector("#authStatusMessage");
const authLoginButton = document.querySelector("#authLoginButton");
const authLogoutButton = document.querySelector("#authLogoutButton");
const profileCurrentStudy = document.querySelector("#profileCurrentStudy");
const utilityScreens = {
  store: document.querySelector("#storeScreen"),
  notice: document.querySelector("#noticeScreen"),
};
const notificationSetting = document.querySelector("#notificationSetting");
const soundSetting = document.querySelector("#soundSetting");
const performanceSetting = document.querySelector("#performanceSetting");
const performanceRecommendation = document.querySelector("#performanceRecommendation");
const REVIEW_API_URL = "https://api.the-review.net/flashcards";
const REVIEW_ACCOUNT_API_URL = "https://api.the-review.net/me";
const MANAGER_STATS_API_URL = "https://api.the-review.net/manager/stats";
const AUTH0_CONFIG = window.AUTH0_CONFIG || {};
const AUTH0_DEFAULT_SCOPE = "openid profile email";
const NOTICE_READ_KEY = "the-review-notice-20260704-read";
const NOTICE_STORAGE_KEY = "the-review-notices-v1";
const APP_SETTINGS_KEY = "the-review-app-settings-v1";
const REVIEW_PROGRESS_KEY = "the-review-progress";
const DEFAULT_NOTICE = Object.freeze({
  id: "home-update-20260704",
  title: "新しいお知らせがあります",
  body: "The Reviewの新しいホーム画面をご利用いただけます。今後のお知らせもこちらでご案内します。",
  date: "2026-07-04",
  isRead: false,
});
const REVIEW_SUBJECT_LABELS = {
  "reboot-modern-japanese": "現代の国語",
  "reboot-language-culture": "言語文化",
  "refine-logical-japanese": "論理国語",
  math1: "数学Ⅰ",
  "reboot-math-a": "数学Ａ",
  "refine-math-2": "数学Ⅱ",
  "refine-math-b": "数学Ｂ",
  "refine-math-c": "数学Ｃ",
  "reboot-logical-expression-1": "論理・表現Ⅰ",
  "refine-logical-expression-2": "論理・表現Ⅱ",
  ec1: "ＥＣⅠ",
  "refine-ec-2": "ＥＣⅡ",
  public: "公共",
  "refine-geography-general": "地理総合",
  "physics-basic": "物理基礎",
  "refine-physics": "物理",
  "reboot-chemistry-basic": "化学基礎",
  "refine-chemistry": "化学",
  "bio-basic": "生物基礎",
  "refine-biology": "生物",
  health: "保健",
  "refine-health": "保健",
  "refine-home-economics-basic": "家庭基礎",
  "ss-tech-theory-1": "ＳＳ科学技術理論Ⅰ（1分野）",
  "ss-tech-theory-2": "ＳＳ科学技術理論Ⅰ（2分野）",
  "ss-tech-theory-3": "ＳＳ科学技術理論Ⅰ（3分野）",
  "reboot-information-study": "情報",
  "morning-test-1-10": "朝学習テスト①〜⑩",
};
const SAMPLE_REVIEW_ROWS = Object.freeze([
  {
    id: "sample-ss-1",
    subject: "ss-tech-theory-1",
    subjectLabel: "ＳＳ科学技術理論Ⅰ（1分野）",
    questionName: "科学技術と社会",
    questionText: "科学技術を社会で活用するとき、最も大切な視点はどれですか。",
    choices: ["速さだけを優先する", "安全性・倫理・社会への影響を考える", "費用だけで決める"],
    answer: ["安全性・倫理・社会への影響を考える"],
    pageNumber: 1,
    questionNumber: 1,
  },
  {
    id: "sample-ss-2",
    subject: "ss-tech-theory-1",
    subjectLabel: "ＳＳ科学技術理論Ⅰ（1分野）",
    questionName: "データの読み方",
    questionText: "相関関係が見られる2つのデータについて、必ず言えることはどれですか。",
    choices: ["一方が他方の原因である", "関係の有無を追加調査する必要がある", "偶然ではあり得ない"],
    answer: ["関係の有無を追加調査する必要がある"],
    pageNumber: 1,
    questionNumber: 2,
  },
  {
    id: "sample-geo-1",
    subject: "refine-geography-general",
    subjectLabel: "地理総合",
    questionName: "日本の標準時",
    questionText: "日本標準時の基準となる標準時子午線は、東経何度ですか。",
    choices: ["東経120度", "東経135度", "東経150度"],
    answer: ["東経135度"],
    pageNumber: 1,
    questionNumber: 1,
  },
  {
    id: "sample-geo-2",
    subject: "refine-geography-general",
    subjectLabel: "地理総合",
    questionName: "地理情報システム",
    questionText: "位置情報と統計データなどを重ねて分析する仕組みを何といいますか。",
    choices: ["GPS", "GIS", "SNS"],
    answer: ["GIS"],
    pageNumber: 1,
    questionNumber: 2,
  },
  {
    id: "sample-math-1",
    subject: "math1",
    subjectLabel: "数学Ⅰ",
    questionName: "二次方程式",
    questionText: "x² − 5x + 6 = 0 の解を選んでください。",
    choices: ["x = 1, 6", "x = 2, 3", "x = −2, −3"],
    answer: ["x = 2, 3"],
    pageNumber: 1,
    questionNumber: 1,
  },
]);
let reviewDecks = [];
let selectedReviewDeck = null;
let reviewDeckLoadPromise = null;
let activeReviewCardIndex = 0;
let activeReviewMode = "standard";
let reviewAudioContext = null;
let auth0Client = null;
let panelHistory = [];
let reviewReturnPanel = "";
let utilityReturnPanel = "";
let managerReturnFocus = null;
let activeManagerFeature = "";
let managerStatsRequestId = 0;
let notices = [];
let selectedNoticeId = "";
const panels = {
  menu: document.querySelector("#menuPanel"),
  profile: document.querySelector("#profilePanel"),
};
const panelButtons = {
  menu: document.querySelector('[data-panel="menu"]'),
  profile: document.querySelector('[data-panel="profile"]'),
};
const panelButtonSettings = {
  menu: {
    icon: "menu",
    openLabel: "メニューを開く",
    closeLabel: "メニューを閉じる",
  },
  profile: {
    icon: "account_circle",
    openLabel: "マイページを開く",
    closeLabel: "マイページを閉じる",
  },
};
let appSettings = {
  notifications: true,
  sound: true,
  performanceLevel: 3,
};
let recommendedPerformanceLevel = 3;
const PERFORMANCE_LEVEL_LABELS = {
  1: "軽量",
  2: "バランス・低",
  3: "バランス・高",
  4: "高品質",
};

function getUnreadNoticeCount() {
  if (!appSettings.notifications) {
    return 0;
  }
  return notices.filter((notice) => !notice.isRead).length;
}

function openManagerScreen(screen = "home", trigger = null) {
  const featureSettings = {
    home: { title: "ダッシュボード", screen: "members" },
    problem: { title: "問題の作成・管理", screen: "problem" },
    store: { title: "アイテムの追加・管理", screen: "store" },
  };
  const feature = Object.prototype.hasOwnProperty.call(featureSettings, screen) ? screen : "home";
  const settings = featureSettings[feature];
  closeHeaderDrawers();
  closeRaanMenu();
  closePanels();
  managerReturnFocus = trigger instanceof HTMLElement ? trigger : document.activeElement;
  activeManagerFeature = feature;
  managerFeatureTitle.textContent = settings.title;
  const isHomeManager = feature === "home";
  managerDashboard.hidden = !isHomeManager;
  managerFrame.hidden = isHomeManager;
  managerFrame.src = isHomeManager
    ? "about:blank"
    : `manager.html?feature=1&screen=${encodeURIComponent(settings.screen)}`;
  managerMembersFrame.src = isHomeManager
    ? "manager.html?feature=1&dashboard=1&screen=members"
    : "about:blank";
  managerScreen.hidden = false;
  if (isHomeManager) {
    renderNoticeManager();
    void loadManagerDashboardStats();
  }
  managerCloseButton.focus();
}

function closeManagerScreen() {
  if (managerScreen.hidden) {
    return;
  }
  managerScreen.hidden = true;
  managerFrame.src = "about:blank";
  managerMembersFrame.src = "about:blank";
  managerFrame.hidden = false;
  managerDashboard.hidden = true;
  managerStatsRequestId += 1;
  activeManagerFeature = "";
  if (managerReturnFocus instanceof HTMLElement) {
    managerReturnFocus.focus();
  }
  managerReturnFocus = null;
}

async function loadManagerDashboardStats() {
  const requestId = ++managerStatsRequestId;
  managerDashboardRefreshButton.disabled = true;
  managerDashboardStatus.textContent = "利用状況を取得しています…";
  managerUserCount.textContent = "—";
  managerMemberCount.textContent = "—";
  managerDatabaseSize.textContent = "—";
  managerDatabaseSizeNote.textContent = "確認中";

  try {
    const accessToken = await getReviewAccessToken();
    if (!accessToken) {
      throw new Error("ログイン後に利用状況を確認できます。");
    }
    const response = await fetch(MANAGER_STATS_API_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`利用状況を取得できませんでした（${response.status}）。`);
    }
    const stats = await response.json();
    if (requestId !== managerStatsRequestId || activeManagerFeature !== "home") {
      return;
    }
    managerUserCount.textContent = formatManagerCount(stats.userCount);
    managerMemberCount.textContent = formatManagerCount(stats.memberCount);
    managerDatabaseSize.textContent = formatManagerBytes(stats.databaseBytes);
    managerDatabaseSizeNote.textContent =
      stats.databaseSizeSource === "database" ? "データベース使用量" : "保存データからの推定値";
    managerDashboardStatus.textContent = `最終更新 ${new Intl.DateTimeFormat("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date())}`;
  } catch (error) {
    if (requestId !== managerStatsRequestId) {
      return;
    }
    managerDashboardStatus.textContent = error instanceof Error ? error.message : "利用状況を取得できませんでした。";
    managerDatabaseSizeNote.textContent = "取得できませんでした";
  } finally {
    if (requestId === managerStatsRequestId) {
      managerDashboardRefreshButton.disabled = false;
    }
  }
}

function formatManagerCount(value) {
  const count = Number(value);
  return Number.isFinite(count) && count >= 0 ? new Intl.NumberFormat("ja-JP").format(Math.floor(count)) : "—";
}

function formatManagerBytes(value) {
  const bytes = Number(value);
  if (!Number.isFinite(bytes) || bytes < 0) {
    return "—";
  }
  if (bytes < 1024) {
    return `${Math.round(bytes)} B`;
  }
  const units = ["KB", "MB", "GB", "TB"];
  let size = bytes / 1024;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  return `${size >= 100 ? size.toFixed(0) : size.toFixed(1)} ${units[unitIndex]}`;
}

function menuOpenLabel() {
  const unreadNoticeCount = getUnreadNoticeCount();
  if (unreadNoticeCount === 0) {
    return panelButtonSettings.menu.openLabel;
  }
  return `${panelButtonSettings.menu.openLabel}、未読のお知らせ${unreadNoticeCount}件`;
}

function setupNotificationBadge() {
  const unreadNoticeCount = getUnreadNoticeCount();
  if (unreadNoticeCount === 0) {
    menuNotificationBadge.hidden = true;
    return;
  }

  menuNotificationBadge.hidden = false;
  menuNotificationBadge.textContent = unreadNoticeCount > 9 ? "9+" : String(unreadNoticeCount);
}

function detectRecommendedPerformanceLevel() {
  const logicalCores = Number(navigator.hardwareConcurrency) || 4;
  const deviceMemory = Number(navigator.deviceMemory) || 0;
  const pixelRatio = Math.min(Number(window.devicePixelRatio) || 1, 3);
  const screenWidth = Number(window.screen?.width) || window.innerWidth;
  const screenHeight = Number(window.screen?.height) || window.innerHeight;
  const renderedPixels = screenWidth * screenHeight * pixelRatio * pixelRatio;
  let level = 3;

  if (logicalCores <= 2 || (deviceMemory > 0 && deviceMemory <= 2)) {
    level = 1;
  } else if (logicalCores <= 4 || (deviceMemory > 0 && deviceMemory <= 4)) {
    level = 2;
  } else if (logicalCores >= 8 && (deviceMemory === 0 || deviceMemory >= 6)) {
    level = 4;
  }

  if (renderedPixels > 5_000_000) {
    level -= 1;
  }
  if (navigator.connection?.saveData || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    level = Math.min(level, 2);
  }

  return Math.min(4, Math.max(1, level));
}

function normalizePerformanceLevel(value, fallback = recommendedPerformanceLevel) {
  const level = Number(value);
  return Number.isInteger(level) && level >= 1 && level <= 4 ? level : fallback;
}

function applyPerformanceLevel(value) {
  const level = normalizePerformanceLevel(value);
  const position = ((level - 1) / 3) * 100;

  document.documentElement.dataset.performanceLevel = String(level);
  performanceSetting.value = String(level);
  performanceSetting.style.setProperty("--performance-progress", `${position}%`);
  performanceSetting.setAttribute("aria-valuetext", PERFORMANCE_LEVEL_LABELS[level]);
}

function setupPerformanceRecommendation() {
  recommendedPerformanceLevel = detectRecommendedPerformanceLevel();
  const position = ((recommendedPerformanceLevel - 1) / 3) * 100;
  performanceRecommendation.style.setProperty("--recommended-position", `${position}%`);
  performanceRecommendation.title = `この端末の推奨設定: ${PERFORMANCE_LEVEL_LABELS[recommendedPerformanceLevel]}`;
}

function loadAppSettings() {
  setupPerformanceRecommendation();
  try {
    const stored = JSON.parse(localStorage.getItem(APP_SETTINGS_KEY) || "{}");
    appSettings = {
      notifications: stored.notifications !== false,
      sound: stored.sound !== false,
      performanceLevel: normalizePerformanceLevel(
        stored.performanceLevel,
        stored.reducedMotion === true ? 1 : recommendedPerformanceLevel
      ),
    };
  } catch {
    appSettings = {
      notifications: true,
      sound: true,
      performanceLevel: recommendedPerformanceLevel,
    };
  }
  notificationSetting.checked = appSettings.notifications;
  soundSetting.checked = appSettings.sound;
  applyPerformanceLevel(appSettings.performanceLevel);
}

function saveAppSettings() {
  appSettings = {
    notifications: notificationSetting.checked,
    sound: soundSetting.checked,
    performanceLevel: normalizePerformanceLevel(performanceSetting.value),
  };
  localStorage.setItem(APP_SETTINGS_KEY, JSON.stringify(appSettings));
  applyPerformanceLevel(appSettings.performanceLevel);
  setupNotificationBadge();
  panelButtons.menu.setAttribute("aria-label", menuOpenLabel());
}

function normalizeNotice(value, index = 0) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  const title = String(value.title || "").trim();
  const body = String(value.body || "").trim();
  const date = /^\d{4}-\d{2}-\d{2}$/.test(String(value.date || "")) ? String(value.date) : "";
  if (!title || !body || !date) {
    return null;
  }
  return {
    id: String(value.id || `notice-${Date.now()}-${index}`).trim(),
    title,
    body,
    date,
    isRead: value.isRead === true,
  };
}

function loadNotices() {
  try {
    const stored = JSON.parse(localStorage.getItem(NOTICE_STORAGE_KEY) || "null");
    notices = (Array.isArray(stored) ? stored : [DEFAULT_NOTICE]).map(normalizeNotice).filter(Boolean);
  } catch {
    notices = [{ ...DEFAULT_NOTICE }];
  }
  if (localStorage.getItem(NOTICE_READ_KEY) === "1") {
    notices = notices.map((notice) =>
      notice.id === DEFAULT_NOTICE.id ? { ...notice, isRead: true } : notice
    );
    localStorage.removeItem(NOTICE_READ_KEY);
  }
  notices.sort((left, right) => right.date.localeCompare(left.date));
  selectedNoticeId = notices[0]?.id || "";
  saveNotices();
  renderNotices();
}

function saveNotices() {
  localStorage.setItem(NOTICE_STORAGE_KEY, JSON.stringify(notices));
}

function formatNoticeDate(date) {
  return String(date || "").replaceAll("-", ".");
}

function renderNotices() {
  noticeMenuList.replaceChildren();
  notices.forEach((notice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "notice-row";
    button.dataset.noticeId = notice.id;
    if (!notice.isRead) {
      button.dataset.noticeUnread = "";
    }

    const title = document.createElement("span");
    title.className = "notice-title";
    title.textContent = notice.title;
    const meta = document.createElement("span");
    meta.className = "notice-meta";
    meta.textContent = notice.isRead ? formatNoticeDate(notice.date) : "未読";
    button.append(title, meta);
    button.addEventListener("click", () => {
      selectedNoticeId = notice.id;
      openUtilityScreen("notice");
    });
    noticeMenuList.append(button);
  });

  const selectedNotice = notices.find((notice) => notice.id === selectedNoticeId) || notices[0] || null;
  selectedNoticeId = selectedNotice?.id || "";
  noticeDetailCard.hidden = !selectedNotice;
  noticeDetailEmpty.hidden = Boolean(selectedNotice);
  if (selectedNotice) {
    noticeDetailDate.dateTime = selectedNotice.date;
    noticeDetailDate.textContent = formatNoticeDate(selectedNotice.date);
    noticeDetailTitle.textContent = selectedNotice.title;
    noticeDetailBody.textContent = selectedNotice.body;
  }
  setupNotificationBadge();
  panelButtons.menu.setAttribute("aria-label", menuOpenLabel());
}

function markNoticeAsRead(noticeId = selectedNoticeId) {
  const target = notices.find((notice) => notice.id === noticeId);
  if (!target || target.isRead) {
    return;
  }
  target.isRead = true;
  saveNotices();
  renderNotices();
}

function resetNoticeManagerForm() {
  const localNow = new Date(Date.now() - new Date().getTimezoneOffset() * 60_000);
  noticeManagerId.value = "";
  noticeManagerTitleInput.value = "";
  noticeManagerDateInput.value = localNow.toISOString().slice(0, 10);
  noticeManagerBodyInput.value = "";
  noticeManagerDeleteButton.hidden = true;
  noticeManagerFeedback.textContent = "";
  renderNoticeManagerList();
  noticeManagerTitleInput.focus();
}

function selectNoticeForManagement(noticeId) {
  const notice = notices.find((item) => item.id === noticeId);
  if (!notice) {
    resetNoticeManagerForm();
    return;
  }
  noticeManagerId.value = notice.id;
  noticeManagerTitleInput.value = notice.title;
  noticeManagerDateInput.value = notice.date;
  noticeManagerBodyInput.value = notice.body;
  noticeManagerDeleteButton.hidden = false;
  noticeManagerFeedback.textContent = "";
  renderNoticeManagerList();
}

function renderNoticeManagerList() {
  noticeManagerList.replaceChildren();
  notices.forEach((notice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "notice-manager-list-item";
    button.classList.toggle("is-active", notice.id === noticeManagerId.value);
    button.innerHTML = `<strong></strong><span></span>`;
    button.querySelector("strong").textContent = notice.title;
    button.querySelector("span").textContent = formatNoticeDate(notice.date);
    button.addEventListener("click", () => selectNoticeForManagement(notice.id));
    noticeManagerList.append(button);
  });
}

function renderNoticeManager() {
  renderNoticeManagerList();
  if (noticeManagerId.value) {
    selectNoticeForManagement(noticeManagerId.value);
  } else if (notices[0]) {
    selectNoticeForManagement(notices[0].id);
  } else {
    resetNoticeManagerForm();
  }
}

function saveNoticeFromManager() {
  const id = noticeManagerId.value;
  const title = noticeManagerTitleInput.value.trim();
  const body = noticeManagerBodyInput.value.trim();
  const date = noticeManagerDateInput.value;
  if (!title || !body || !date) {
    noticeManagerFeedback.textContent = "タイトル、日付、本文を入力してください。";
    return;
  }

  const existing = notices.find((notice) => notice.id === id);
  if (existing) {
    existing.title = title;
    existing.body = body;
    existing.date = date;
  } else {
    const newNotice = {
      id: `notice-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      title,
      body,
      date,
      isRead: false,
    };
    notices.push(newNotice);
    noticeManagerId.value = newNotice.id;
  }
  notices.sort((left, right) => right.date.localeCompare(left.date));
  selectedNoticeId = noticeManagerId.value;
  saveNotices();
  renderNotices();
  selectNoticeForManagement(noticeManagerId.value);
  noticeManagerFeedback.textContent = existing ? "お知らせを更新しました。" : "お知らせを作成しました。";
}

function deleteNoticeFromManager() {
  const id = noticeManagerId.value;
  if (!id) {
    return;
  }
  notices = notices.filter((notice) => notice.id !== id);
  selectedNoticeId = notices[0]?.id || "";
  saveNotices();
  renderNotices();
  if (notices[0]) {
    selectNoticeForManagement(notices[0].id);
  } else {
    resetNoticeManagerForm();
  }
  noticeManagerFeedback.textContent = "お知らせを削除しました。";
}

function syncNoticeReadState() {
  renderNotices();
  setupNotificationBadge();
  panelButtons.menu.setAttribute("aria-label", menuOpenLabel());
}

function isAuth0Configured() {
  return Boolean(
    AUTH0_CONFIG.domain &&
      AUTH0_CONFIG.clientId &&
      !AUTH0_CONFIG.domain.includes("YOUR_") &&
      !AUTH0_CONFIG.clientId.includes("YOUR_")
  );
}

function hasAuth0CallbackParams() {
  const params = new URLSearchParams(window.location.search);
  return params.has("state") && (params.has("code") || params.has("error"));
}

function clearAuth0CallbackParams() {
  window.history.replaceState({}, document.title, `${window.location.pathname}${window.location.hash}`);
}

function setAuthStatus(message = "", isError = false) {
  if (!authStatusMessage) {
    return;
  }
  authStatusMessage.textContent = message;
  authStatusMessage.classList.toggle("is-error", isError);
}

function renderLoggedOutAuth() {
  authUserName.textContent = "ログインしていません";
  authUserEmail.textContent = "Guest Modeでご利用になっています。";
  authLoginButton.hidden = false;
  authLoginButton.disabled = false;
  authLogoutButton.hidden = true;
}

function renderLoggedInAuth(user) {
  const displayName =
    normalizeReviewText(user?.name) ||
    normalizeReviewText(user?.nickname) ||
    normalizeReviewText(user?.email) ||
    "Review Account";
  authUserName.textContent = displayName;
  authUserEmail.textContent = normalizeReviewText(user?.email) || "ログイン済み";
  authLoginButton.hidden = true;
  authLogoutButton.hidden = false;
  authLogoutButton.disabled = false;
}

async function ensureAuth0Client() {
  if (auth0Client) {
    return auth0Client;
  }
  if (!isAuth0Configured() || !window.auth0?.createAuth0Client) {
    return null;
  }
  auth0Client = await window.auth0.createAuth0Client({
    domain: AUTH0_CONFIG.domain,
    clientId: AUTH0_CONFIG.clientId,
    authorizationParams: {
      redirect_uri: AUTH0_CONFIG.redirectUri || new URL("./index.html", window.location.href).href,
      audience: AUTH0_CONFIG.audience,
      scope: AUTH0_CONFIG.scope || AUTH0_DEFAULT_SCOPE,
    },
  });
  return auth0Client;
}

async function getReviewAccessToken() {
  const client = await ensureAuth0Client();
  if (!client || !AUTH0_CONFIG.audience || !(await client.isAuthenticated())) {
    return null;
  }
  try {
    return await client.getTokenSilently({
      authorizationParams: {
        audience: AUTH0_CONFIG.audience,
        scope: AUTH0_CONFIG.scope || AUTH0_DEFAULT_SCOPE,
      },
    });
  } catch {
    return null;
  }
}

window.__THE_REVIEW_GET_ACCESS_TOKEN__ = getReviewAccessToken;

async function syncReviewAccount(user) {
  if (!auth0Client || !AUTH0_CONFIG.audience) {
    return;
  }
  try {
    const accessToken = await auth0Client.getTokenSilently({
      authorizationParams: {
        audience: AUTH0_CONFIG.audience,
        scope: AUTH0_CONFIG.scope || AUTH0_DEFAULT_SCOPE,
      },
    });
    if (!accessToken) {
      return;
    }
    await fetch(REVIEW_ACCOUNT_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        nickname: normalizeReviewText(user?.nickname || user?.name),
        email: normalizeReviewText(user?.email) || null,
      }),
    });
  } catch (error) {
    console.warn("Review Accountとの同期に失敗しました。", error);
  }
}

async function initializeAuth() {
  renderLoggedOutAuth();
  if (!isAuth0Configured()) {
    setAuthStatus("Auth0の設定が見つかりません。", true);
    authLoginButton.disabled = true;
    return;
  }
  if (!window.auth0?.createAuth0Client) {
    setAuthStatus("ログイン機能を読み込めませんでした。", true);
    authLoginButton.disabled = true;
    return;
  }

  try {
    setAuthStatus("ログイン状態を確認しています…");
    const client = await ensureAuth0Client();
    let redirectState = null;
    if (hasAuth0CallbackParams()) {
      try {
        const result = await client.handleRedirectCallback();
        redirectState = result?.appState || null;
      } finally {
        clearAuth0CallbackParams();
      }
    }

    const isAuthenticated = await client.isAuthenticated();
    if (!isAuthenticated) {
      renderLoggedOutAuth();
      setAuthStatus("");
      return;
    }

    const user = await client.getUser();
    renderLoggedInAuth(user);
    setAuthStatus("ログイン済み");
    void syncReviewAccount(user);
    if (redirectState?.targetPanel === "profile") {
      openPanel("profile");
    }
  } catch (error) {
    console.error("Auth0の初期化に失敗しました。", error);
    renderLoggedOutAuth();
    setAuthStatus("ログイン状態を確認できませんでした。", true);
  }
}

async function loginWithAuth0() {
  authLoginButton.disabled = true;
  setAuthStatus("ログイン画面へ移動しています…");
  try {
    const client = await ensureAuth0Client();
    if (!client) {
      throw new Error("Auth0 client is unavailable");
    }
    const authorizationParams = {
      redirect_uri: AUTH0_CONFIG.redirectUri || new URL("./index.html", window.location.href).href,
      audience: AUTH0_CONFIG.audience,
      scope: AUTH0_CONFIG.scope || AUTH0_DEFAULT_SCOPE,
    };
    if (AUTH0_CONFIG.defaultConnection) {
      authorizationParams.connection = AUTH0_CONFIG.defaultConnection;
    }
    await client.loginWithRedirect({
      appState: { targetPanel: "profile" },
      authorizationParams,
    });
  } catch (error) {
    console.error("Auth0ログインを開始できませんでした。", error);
    authLoginButton.disabled = false;
    setAuthStatus("ログインを開始できませんでした。", true);
  }
}

async function logoutFromAuth0() {
  authLogoutButton.disabled = true;
  setAuthStatus("ログアウトしています…");
  try {
    const client = await ensureAuth0Client();
    renderLoggedOutAuth();
    await client?.logout({
      logoutParams: {
        returnTo: AUTH0_CONFIG.redirectUri || new URL("./index.html", window.location.href).href,
      },
    });
  } catch (error) {
    console.error("Auth0ログアウトに失敗しました。", error);
    authLogoutButton.disabled = false;
    setAuthStatus("ログアウトできませんでした。", true);
  }
}

function setStatus(value) {
  actionStatus.textContent = `${value}を選択しました`;
}

function readReviewProgress() {
  try {
    const progress = JSON.parse(localStorage.getItem(REVIEW_PROGRESS_KEY) || "null");
    return progress && typeof progress === "object" && progress.deckId ? progress : null;
  } catch {
    return null;
  }
}

function setupContinueButton() {
  const progress = readReviewProgress();
  continueButton.hidden = !progress;
  profileCurrentStudy.textContent = progress?.label || "学習データはありません";
}

function saveReviewProgress() {
  if (!selectedReviewDeck) {
    return;
  }
  localStorage.setItem(
    REVIEW_PROGRESS_KEY,
    JSON.stringify({
      deckId: selectedReviewDeck.id,
      label: selectedReviewDeck.label,
      cardIndex: activeReviewCardIndex,
    })
  );
  setupContinueButton();
}

async function resumeReviewProgress() {
  const progress = readReviewProgress();
  if (!progress) {
    setupContinueButton();
    return;
  }
  closePanels();
  closeRaanMenu();
  closeUtilityScreens();
  await loadReviewDecks();
  selectedReviewDeck = reviewDecks.find((deck) => deck.id === progress.deckId) || null;
  if (!selectedReviewDeck) {
    localStorage.removeItem(REVIEW_PROGRESS_KEY);
    setupContinueButton();
    return;
  }
  activeReviewCardIndex = Math.min(
    Math.max(Number(progress.cardIndex) || 0, 0),
    selectedReviewDeck.cards.length - 1
  );
  reviewSessionTitle.textContent = selectedReviewDeck.label;
  activeReviewMode = "standard";
  reviewSessionScreen.dataset.reviewMode = activeReviewMode;
  reviewLibraryScreen.hidden = true;
  reviewSessionScreen.hidden = false;
  renderActiveReviewCard();
}

function normalizeReviewText(value) {
  if (typeof value === "string") {
    return value.trim();
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }
  return "";
}

function normalizeReviewTextArray(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeReviewText).filter(Boolean);
  }
  const text = normalizeReviewText(value);
  if (!text) {
    return [];
  }
  return text
    .split(/\r?\n|[|,、]/)
    .map(normalizeReviewText)
    .filter(Boolean);
}

function resolveReviewSubjectId(row) {
  return normalizeReviewText(row.subjectId ?? row.subject_id ?? row.subject ?? row.deckId ?? row.deck_id);
}

function resolveReviewSubjectLabel(row, subjectId) {
  const explicitLabel = normalizeReviewText(
    row.subjectLabel ?? row.subject_label ?? row.subjectName ?? row.subject_name ?? row.deckLabel
  );
  return REVIEW_SUBJECT_LABELS[subjectId] || explicitLabel || subjectId;
}

function normalizeReviewCard(row, index) {
  const questionText = normalizeReviewText(
    row.questionText ?? row.question_text ?? row.question ?? row.prompt ?? row.q
  );
  const questionName = normalizeReviewText(row.questionName ?? row.question_name ?? row.name);
  if (!questionText && !questionName) {
    return null;
  }

  const answers = normalizeReviewTextArray(row.answers ?? row.answer ?? row.a);
  const pageNumber = Number(row.pageNumber ?? row.page_number);
  const questionNumber = Number(row.questionNumber ?? row.question_number);
  return {
    id: normalizeReviewText(row.id) || `card-${index + 1}`,
    questionName,
    questionText: questionText || questionName,
    choices: normalizeReviewTextArray(row.choices ?? row.threeOptions ?? row.three_options),
    answers,
    image: normalizeReviewText(row.image ?? row.imageSrc ?? row.image_url),
    pageNumber: Number.isFinite(pageNumber) ? pageNumber : 0,
    questionNumber: Number.isFinite(questionNumber) ? questionNumber : index + 1,
  };
}

function buildReviewDecks(rows) {
  const deckMap = new Map();
  (Array.isArray(rows) ? rows : []).forEach((row, index) => {
    if (!row || typeof row !== "object") {
      return;
    }
    const subjectId = resolveReviewSubjectId(row);
    const card = normalizeReviewCard(row, index);
    if (!subjectId || !card) {
      return;
    }
    if (!deckMap.has(subjectId)) {
      deckMap.set(subjectId, {
        id: subjectId,
        label: resolveReviewSubjectLabel(row, subjectId),
        cards: [],
      });
    }
    deckMap.get(subjectId).cards.push(card);
  });

  return Array.from(deckMap.values())
    .map((deck) => ({
      ...deck,
      cards: deck.cards.sort(
        (left, right) =>
          left.pageNumber - right.pageNumber || left.questionNumber - right.questionNumber
      ),
    }))
    .sort((left, right) => left.label.localeCompare(right.label, "ja"));
}

function getReviewBookTone(subjectId, label) {
  const value = `${subjectId} ${label}`.normalize("NFKC").toLowerCase();
  if (/国語|japanese|language/.test(value)) {
    return "red";
  }
  if (/数学|math/.test(value)) {
    return "blue";
  }
  if (/英語|ec|english|論理・表現|朝学習/.test(value)) {
    return "yellow";
  }
  if (/物理|化学|生物|physics|chemistry|biology/.test(value)) {
    return "green";
  }
  if (/保健|家庭|情報|health|home|information/.test(value)) {
    return "gray";
  }
  return "blue";
}

function selectReviewDeck(deckId) {
  selectedReviewDeck = reviewDecks.find((deck) => deck.id === deckId) || null;
  reviewBookList.querySelectorAll(".review-book").forEach((book) => {
    const isSelected = book.dataset.deckId === selectedReviewDeck?.id;
    book.setAttribute("aria-selected", String(isSelected));
  });
  reviewStartButton.hidden = !selectedReviewDeck;
  if (selectedReviewDeck) {
    const selectedBook = reviewBookList.querySelector(`[data-deck-id="${CSS.escape(selectedReviewDeck.id)}"]`);
    selectedBook?.append(reviewStartButton);
    reviewBookStatus.hidden = false;
    reviewBookStatus.textContent = `${selectedReviewDeck.label}を選択中`;
  }
}

function renderReviewBooks(decks) {
  reviewLibraryHeader.append(reviewStartButton);
  reviewDecks = Array.isArray(decks) ? decks : [];
  selectedReviewDeck = null;
  reviewStartButton.hidden = true;
  reviewBookList.innerHTML = "";

  if (reviewDecks.length === 0) {
    reviewBookStatus.hidden = true;
    reviewBookEmpty.hidden = false;
    return;
  }

  reviewBookStatus.hidden = true;
  reviewBookEmpty.hidden = true;
  reviewDecks.forEach((deck, index) => {
    const book = document.createElement("article");
    book.className = "review-book";
    book.dataset.deckId = deck.id;
    book.dataset.tone = getReviewBookTone(deck.id, deck.label);
    book.style.setProperty("--book-index", String(index + 1));
    book.setAttribute("role", "option");
    book.setAttribute("aria-selected", "false");
    const selectButton = document.createElement("button");
    selectButton.type = "button";
    selectButton.className = "review-book-select";
    selectButton.setAttribute("aria-label", `${deck.label}、${deck.cards.length}問`);

    const title = document.createElement("span");
    title.className = "review-book-title";
    title.textContent = deck.label;

    const meta = document.createElement("span");
    meta.className = "review-book-meta";
    meta.textContent = `${deck.cards.length}問`;

    selectButton.append(title, meta);
    selectButton.addEventListener("click", () => selectReviewDeck(deck.id));
    book.append(selectButton);
    reviewBookList.append(book);
  });
}

function renderSampleReviewBooks(message = "サンプル教材を表示しています。Supabaseに接続すると教材データへ切り替わります。") {
  const sampleDecks = buildReviewDecks(SAMPLE_REVIEW_ROWS);
  renderReviewBooks(sampleDecks);
  reviewBookStatus.hidden = false;
  reviewBookStatus.textContent = message;
  return sampleDecks;
}

async function loadReviewDecks() {
  if (reviewDecks.length > 0) {
    return reviewDecks;
  }
  if (reviewDeckLoadPromise) {
    return reviewDeckLoadPromise;
  }

  reviewBookStatus.hidden = false;
  reviewBookEmpty.hidden = true;
  reviewBookStatus.textContent = "教材を読み込んでいます…";
  reviewDeckLoadPromise = fetch(REVIEW_API_URL, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`教材APIエラー: ${response.status}`);
      }
      return response.json();
    })
    .then((rows) => {
      const decks = buildReviewDecks(rows);
      if (decks.length === 0) {
        return renderSampleReviewBooks();
      }
      renderReviewBooks(decks);
      return decks;
    })
    .catch((error) => {
      console.warn("教材データを読み込めませんでした。", error);
      return renderSampleReviewBooks("オフライン用のサンプル教材を表示しています。");
    })
    .finally(() => {
      reviewDeckLoadPromise = null;
    });
  return reviewDeckLoadPromise;
}

function openReviewLibrary() {
  reviewReturnPanel = getOpenPanelName();
  closePanels();
  closeRaanMenu();
  reviewSessionScreen.hidden = true;
  reviewLibraryScreen.hidden = false;
  homeReviewNext.hidden = true;
  loadReviewDecks();
}

function closeReviewLibrary() {
  closeHeaderDrawers();
  reviewLibraryScreen.hidden = true;
  reviewSessionScreen.hidden = true;
  activeReviewMode = "standard";
  reviewSessionScreen.dataset.reviewMode = activeReviewMode;
  reviewButton.setAttribute("aria-pressed", "false");
  homeReviewNext.hidden = true;
  reviewReturnPanel = "";
}

function navigateBackFromReviewLibrary() {
  const returnPanel = reviewReturnPanel;
  closeReviewLibrary();
  if (returnPanel) {
    openPanel(returnPanel, { recordHistory: false });
  }
}

function closeUtilityScreens() {
  closeHeaderDrawers();
  Object.values(utilityScreens).forEach((screen) => {
    screen.hidden = true;
  });
  utilityReturnPanel = "";
}

function openUtilityScreen(name) {
  const target = utilityScreens[name];
  if (!target) {
    return;
  }
  const returnPanel = getOpenPanelName();
  closePanels();
  closeRaanMenu();
  closeReviewLibrary();
  closeUtilityScreens();
  utilityReturnPanel = returnPanel;
  target.hidden = false;
  if (name === "notice") {
    markNoticeAsRead();
  }
}

function navigateBackFromUtilityScreen() {
  const returnPanel = utilityReturnPanel;
  closeUtilityScreens();
  if (returnPanel) {
    openPanel(returnPanel, { recordHistory: false });
  }
}

function resolveReviewImageSource(value) {
  const source = normalizeReviewText(value).replaceAll("\\", "/");
  if (!source) {
    return "";
  }
  if (/^(?:https?:)?\/\//.test(source) || source.startsWith("/") || source.startsWith("./")) {
    return source;
  }
  return source.startsWith("data/") ? `./${source}` : `./data/${source}`;
}

function playRhythmTone(index = 0) {
  if (!appSettings.sound || activeReviewMode !== "rhythm") {
    return;
  }
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return;
  }
  reviewAudioContext ||= new AudioContextClass();
  const oscillator = reviewAudioContext.createOscillator();
  const gain = reviewAudioContext.createGain();
  const now = reviewAudioContext.currentTime;
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime([392, 523.25, 659.25][index % 3], now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.14, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
  oscillator.connect(gain);
  gain.connect(reviewAudioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.22);
}

function renderActiveReviewCard() {
  const cards = selectedReviewDeck?.cards || [];
  const card = cards[activeReviewCardIndex];
  if (!card) {
    return;
  }

  reviewProgress.textContent = `${activeReviewCardIndex + 1} / ${cards.length}`;
  reviewQuestionName.textContent = card.questionName || `問題 ${activeReviewCardIndex + 1}`;
  reviewQuestionText.textContent = card.questionText;
  reviewChoiceList.innerHTML = "";
  card.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "review-choice";
    button.textContent = `${index + 1}. ${choice}`;
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      reviewChoiceList.querySelectorAll(".review-choice").forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });
      playRhythmTone(index);
    });
    reviewChoiceList.append(button);
  });

  const imageSource = resolveReviewImageSource(card.image);
  reviewQuestionImage.hidden = !imageSource;
  reviewQuestionImage.src = imageSource;
  reviewQuestionImage.alt = imageSource ? `${selectedReviewDeck.label}の問題画像` : "";

  reviewAnswer.hidden = true;
  reviewAnswerText.textContent = card.answers.length > 0 ? card.answers.join(" / ") : "答えデータなし";
  reviewRevealButton.textContent = "答えを見る";
  reviewNextButton.textContent = activeReviewCardIndex === cards.length - 1 ? "最初の問題へ" : "次の問題";
  saveReviewProgress();
}

function startSelectedReview() {
  if (!selectedReviewDeck || selectedReviewDeck.cards.length === 0) {
    return;
  }
  activeReviewCardIndex = 0;
  activeReviewMode = "standard";
  reviewSessionScreen.dataset.reviewMode = activeReviewMode;
  reviewSessionTitle.textContent = selectedReviewDeck.label;
  reviewLibraryScreen.hidden = true;
  reviewSessionScreen.hidden = false;
  renderActiveReviewCard();
}

async function startPracticeReview(mode) {
  const decks = await loadReviewDecks();
  const preferredDeckId = mode === "note" ? "refine-geography-general" : "ss-tech-theory-1";
  selectedReviewDeck =
    decks.find((deck) => deck.id === preferredDeckId) ||
    decks[0] ||
    null;
  if (!selectedReviewDeck || selectedReviewDeck.cards.length === 0) {
    reviewBookStatus.hidden = false;
    reviewBookStatus.textContent = "演習に使える教材がありません。";
    return;
  }

  activeReviewMode = mode === "rhythm" ? "rhythm" : "note";
  activeReviewCardIndex = 0;
  reviewSessionScreen.dataset.reviewMode = activeReviewMode;
  reviewSessionTitle.textContent = activeReviewMode === "note" ? "ノートで演習" : "音ゲー";
  reviewLibraryScreen.hidden = true;
  reviewSessionScreen.hidden = false;
  renderActiveReviewCard();
}

function returnToReviewLibrary() {
  reviewSessionScreen.hidden = true;
  activeReviewMode = "standard";
  reviewSessionScreen.dataset.reviewMode = activeReviewMode;
  reviewLibraryScreen.hidden = false;
}

function closeRaanMenu() {
  document.querySelector(".app-frame")?.classList.remove("is-raan-menu-open");
  raanPanel.hidden = true;
  raanMenuBack.hidden = true;
  raanPanel.setAttribute("aria-hidden", "true");
  raanMenuButton.setAttribute("aria-expanded", "false");
  raanMenuButton.setAttribute("aria-label", "らーんメニューを開く");
}

function getRaanSeasonalMessage(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  if (month === 7 && day === 7) {
    return "七夕は、織姫と彦星の星や天の川、旧暦と新暦の違い、中国伝説と日本文化の融合、そして学問や技芸の上達を願う意味を学べる行事だそうですよ！";
  }
  if (month === 7 && day < 7) {
    return "もうすぐ七夕ですね。星や天の川、七夕にまつわる文化を少し調べてみるのも楽しそうですよ！";
  }
  if (month === 7) {
    return "夏の星空がきれいな季節ですね。暑さに気をつけながら、今日も少しずつ進めていきましょう！";
  }
  return "今日も新しいことをひとつ見つけて、自分のペースでリビューしていきましょう！";
}

function renderRaanMenu() {
  const now = new Date();
  raanTodayText.textContent = `今日は${now.getMonth() + 1}月${now.getDate()}日です。`;
  raanSeasonalText.textContent = getRaanSeasonalMessage(now);
  const recommendation =
    reviewDecks.length > 0 ? reviewDecks[now.getDate() % reviewDecks.length]?.label : "数学Ⅱ";
  raanRecommendedSubject.textContent = recommendation || "数学Ⅱ";
}

function closeHeaderDrawers() {
  document.querySelectorAll(".review-screen.is-header-drawer-open").forEach((screen) => {
    screen.classList.remove("is-header-drawer-open");
  });
  document.querySelectorAll(".screen-header-drawer").forEach((drawer) => {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
  });
  document.querySelectorAll("[data-header-drawer-toggle]").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
  });
}

function openRaanMenu() {
  closeHeaderDrawers();
  closePanels();
  renderRaanMenu();
  document.querySelector(".app-frame")?.classList.add("is-raan-menu-open");
  raanPanel.hidden = false;
  raanMenuBack.hidden = false;
  raanPanel.setAttribute("aria-hidden", "false");
  raanMenuButton.setAttribute("aria-expanded", "true");
  raanMenuButton.setAttribute("aria-label", "らーんメニューを閉じる");
  setStatus("らーんメニュー");
}

function getOpenPanelName() {
  return Object.entries(panels).find(([, panel]) => !panel.hidden)?.[0] || "";
}

function closePanels(options = {}) {
  if (!options.preserveHistory) {
    panelHistory = [];
  }
  panelScrim.hidden = true;
  Object.values(panels).forEach((panel) => {
    panel.hidden = true;
  });
  Object.entries(panelButtons).forEach(([name, button]) => {
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", name === "menu" ? menuOpenLabel() : panelButtonSettings[name].openLabel);
    button.querySelector(".header-icon").textContent = panelButtonSettings[name].icon;
  });
}

function openPanel(name, options = {}) {
  const currentPanelName = getOpenPanelName();
  if (options.recordHistory !== false && currentPanelName && currentPanelName !== name) {
    panelHistory.push(currentPanelName);
  }
  closeHeaderDrawers();
  closeRaanMenu();
  closePanels({ preserveHistory: true });
  panels[name].hidden = false;
  panelScrim.hidden = false;
  panelButtons[name].setAttribute("aria-expanded", "true");
  panelButtons[name].setAttribute("aria-label", panelButtonSettings[name].closeLabel);
  panelButtons[name].querySelector(".header-icon").textContent = "arrow_back";
  setStatus(name === "menu" ? "メニュー" : "マイページ");
}

function navigateBackFromPanel() {
  const previousPanel = panelHistory.pop();
  if (previousPanel) {
    openPanel(previousPanel, { recordHistory: false });
    return;
  }
  closePanels();
}

document.querySelectorAll("[data-panel]").forEach((button) => {
  button.addEventListener("click", () => {
    const panel = panels[button.dataset.panel];
    if (panel.hidden) {
      openPanel(button.dataset.panel);
    } else {
      navigateBackFromPanel();
    }
  });
});

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const labels = {
      continue: "続きから",
      review: "リビューする",
      store: "ストア",
    };

    const action = button.dataset.action;
    const isReviewAction = action === "review";
    const isStoreAction = action === "store";
    reviewButton.setAttribute("aria-pressed", String(isReviewAction));
    storeButton.setAttribute("aria-pressed", String(isStoreAction));
    homeReviewNext.hidden = !isReviewAction;
    storeNext.hidden = !isStoreAction;
    setStatus(labels[action]);
    if (action === "continue") {
      void resumeReviewProgress();
    }
  });
});

document.querySelectorAll("[data-header-drawer-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const drawer = document.getElementById(button.dataset.headerDrawerToggle);
    const shouldOpen = !drawer.classList.contains("is-open");
    closeHeaderDrawers();
    if (shouldOpen) {
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      drawer.closest(".review-screen")?.classList.add("is-header-drawer-open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

document.querySelectorAll("[data-header-drawer-close]").forEach((button) => {
  button.addEventListener("click", closeHeaderDrawers);
});

document.querySelectorAll("[data-utility-page]").forEach((button) => {
  button.addEventListener("click", () => openUtilityScreen(button.dataset.utilityPage));
});

document.querySelectorAll("[data-close-utility]").forEach((button) => {
  button.addEventListener("click", navigateBackFromUtilityScreen);
});

document.querySelectorAll("[data-navigation-home]").forEach((button) => {
  button.addEventListener("click", () => {
    closePanels();
    closeUtilityScreens();
  });
});

document.querySelectorAll("[data-navigation-review]").forEach((button) => {
  button.addEventListener("click", openReviewLibrary);
});

[notificationSetting, soundSetting].forEach((input) => {
  input.addEventListener("change", saveAppSettings);
});
performanceSetting.addEventListener("input", saveAppSettings);

homeReviewNext.addEventListener("click", openReviewLibrary);
storeNext.addEventListener("click", () => openUtilityScreen("store"));
managerButtons.forEach((button) => {
  button.addEventListener("click", () => openManagerScreen(button.dataset.managerScreen, button));
});
managerDashboardRefreshButton.addEventListener("click", () => {
  managerMembersFrame.contentWindow?.location.reload();
  void loadManagerDashboardStats();
});
noticeManagerNewButton.addEventListener("click", resetNoticeManagerForm);
noticeManagerDeleteButton.addEventListener("click", deleteNoticeFromManager);
noticeManagerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveNoticeFromManager();
});
managerCloseButton.addEventListener("click", closeManagerScreen);
window.addEventListener("message", (event) => {
  if (
    event.origin === window.location.origin &&
    event.source === managerMembersFrame.contentWindow &&
    event.data?.type === "the-review-manager-height"
  ) {
    const height = Number(event.data.height);
    if (Number.isFinite(height) && height > 0) {
      managerMembersFrame.style.height = `${Math.max(520, Math.ceil(height))}px`;
    }
    return;
  }
  if (
    event.origin === window.location.origin &&
    (event.source === managerFrame.contentWindow || event.source === managerMembersFrame.contentWindow) &&
    event.data?.type === "the-review-manager-close"
  ) {
    closeManagerScreen();
  }
});
reviewLibraryBack.addEventListener("click", navigateBackFromReviewLibrary);
reviewStartButton.addEventListener("click", startSelectedReview);
notePracticeButton.addEventListener("click", () => startPracticeReview("note"));
rhythmPracticeButton.addEventListener("click", () => startPracticeReview("rhythm"));
reviewSessionBack.addEventListener("click", returnToReviewLibrary);

reviewRevealButton.addEventListener("click", () => {
  const shouldShow = reviewAnswer.hidden;
  reviewAnswer.hidden = !shouldShow;
  reviewRevealButton.textContent = shouldShow ? "答えを隠す" : "答えを見る";
});

reviewNextButton.addEventListener("click", () => {
  const cardCount = selectedReviewDeck?.cards.length || 0;
  if (cardCount === 0) {
    return;
  }
  activeReviewCardIndex = (activeReviewCardIndex + 1) % cardCount;
  renderActiveReviewCard();
});

document.querySelectorAll("[data-close-panel]").forEach((button) => {
  button.addEventListener("click", closePanels);
});

panelScrim.addEventListener("click", closePanels);
raanMenuBack.addEventListener("click", closeRaanMenu);

raanMenuButton.addEventListener("click", () => {
  if (raanMenuButton.getAttribute("aria-expanded") === "true") {
    closeRaanMenu();
  } else {
    openRaanMenu();
  }
});

authLoginButton.addEventListener("click", loginWithAuth0);
authLogoutButton.addEventListener("click", logoutFromAuth0);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!managerScreen.hidden) {
      closeManagerScreen();
      return;
    }
    const openUtility = Object.values(utilityScreens).find((screen) => !screen.hidden);
    if (openUtility) {
      closeUtilityScreens();
      return;
    }
    if (!reviewSessionScreen.hidden) {
      returnToReviewLibrary();
      return;
    }
    if (!reviewLibraryScreen.hidden) {
      closeReviewLibrary();
      return;
    }
    closePanels();
    closeRaanMenu();
  }
});

loadAppSettings();
loadNotices();
setupNotificationBadge();
setupContinueButton();
panelButtons.menu.setAttribute("aria-label", menuOpenLabel());
void initializeAuth();
