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
const reviewLibraryScreen = document.querySelector("#reviewLibraryScreen");
const reviewLibraryHeader = reviewLibraryScreen.querySelector(".review-screen-header");
const reviewLibraryBack = document.querySelector("#reviewLibraryBack");
const reviewBookStatus = document.querySelector("#reviewBookStatus");
const reviewBookEmpty = document.querySelector("#reviewBookEmpty");
const reviewBookList = document.querySelector("#reviewBookList");
const reviewStartButton = document.querySelector("#reviewStartButton");
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
const AUTH0_CONFIG = window.AUTH0_CONFIG || {};
const AUTH0_DEFAULT_SCOPE = "openid profile email";
const NOTICE_READ_KEY = "the-review-notice-20260704-read";
const APP_SETTINGS_KEY = "the-review-app-settings-v1";
const REVIEW_PROGRESS_KEY = "the-review-progress";
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
let reviewDecks = [];
let selectedReviewDeck = null;
let reviewDeckLoadPromise = null;
let activeReviewCardIndex = 0;
let auth0Client = null;
let panelHistory = [];
let reviewReturnPanel = "";
let utilityReturnPanel = "";
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
  if (!appSettings.notifications || localStorage.getItem(NOTICE_READ_KEY) === "1") {
    return 0;
  }
  return document.querySelectorAll("[data-notice-unread]").length;
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

function markNoticeAsRead() {
  localStorage.setItem(NOTICE_READ_KEY, "1");
  document.querySelectorAll("[data-notice-unread]").forEach((notice) => {
    notice.removeAttribute("data-notice-unread");
    const meta = notice.querySelector(".notice-meta");
    if (meta) {
      meta.textContent = "既読";
    }
  });
  setupNotificationBadge();
  panelButtons.menu.setAttribute("aria-label", menuOpenLabel());
}

function syncNoticeReadState() {
  if (localStorage.getItem(NOTICE_READ_KEY) !== "1") {
    return;
  }
  document.querySelectorAll("[data-notice-unread]").forEach((notice) => {
    notice.removeAttribute("data-notice-unread");
    const meta = notice.querySelector(".notice-meta");
    if (meta) {
      meta.textContent = "既読";
    }
  });
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
  authUserEmail.textContent = "Guest Mode";
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
      renderReviewBooks(decks);
      return decks;
    })
    .catch((error) => {
      console.warn("教材データを読み込めませんでした。", error);
      renderReviewBooks([]);
      reviewBookEmpty.hidden = true;
      reviewBookStatus.hidden = false;
      reviewBookStatus.textContent = "教材データを読み込めませんでした。通信状態を確認して、もう一度お試しください。";
      return [];
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
  reviewSessionTitle.textContent = selectedReviewDeck.label;
  reviewLibraryScreen.hidden = true;
  reviewSessionScreen.hidden = false;
  renderActiveReviewCard();
}

function returnToReviewLibrary() {
  reviewSessionScreen.hidden = true;
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
reviewLibraryBack.addEventListener("click", navigateBackFromReviewLibrary);
reviewStartButton.addEventListener("click", startSelectedReview);
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
syncNoticeReadState();
setupNotificationBadge();
setupContinueButton();
panelButtons.menu.setAttribute("aria-label", menuOpenLabel());
void initializeAuth();
