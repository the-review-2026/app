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
    admin: "owner",
    administrator: "owner",
    manager: "owner",
    owner: "owner",
    オーナー: "owner",
    developer: "developer",
    dev: "developer",
    デベロッパー: "developer",
    checker: "checker",
    reviewer: "checker",
    チェッカー: "checker",
    system_designer: "system_designer",
    systemdesigner: "system_designer",
    システムデザイナー: "system_designer",
    character_designer: "character_designer",
    characterdesigner: "character_designer",
    キャラクターデザイナー: "character_designer",
  }),
  availableThemes: Object.freeze([
    "sea",
    "midnight",
    "forest",
    "aojiru",
    "lemonade",
    "strawberry",
    "the-paper",
    "the-black",
  ]),
  themeDisplayNames: Object.freeze({
    sea: "Sea",
    midnight: "Midnight",
    forest: "Forest",
    aojiru: "Aojiru",
    lemonade: "Lemonade",
    strawberry: "Strawberry",
    "the-paper": "The Paper",
    "the-black": "The Black",
  }),
  avaterCategoryLabels: Object.freeze({
    clothes: "うわぎ",
    glasses: "めがね",
    accessory: "アクセサリー",
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

// Temporary preview access: remove this seeded access when membership checks are restored.
const MANAGER_PREVIEW_ACCESS = {
  canAccess: true,
  status: "member",
  role: "owner",
  member: {
    role: "owner",
    display_name: "動作確認ユーザー",
  },
  permissions: {
    manageMembers: true,
    createProblems: true,
    reviewProblems: true,
    manageStore: true,
  },
};
window.__THE_REVIEW_MANAGER_ACCESS__ = MANAGER_PREVIEW_ACCESS;

// Keep the temporary preview role even when a signed-in non-member receives
// `canAccess: false` from the production access endpoint.
const nativeFetch = window.fetch.bind(window);
window.fetch = (input, init) => {
  const requestUrl = new URL(input instanceof Request ? input.url : String(input), window.location.href);
  if (requestUrl.origin === "https://api.the-review.net" && requestUrl.pathname === "/manager/me") {
    return Promise.resolve(
      new Response(JSON.stringify(MANAGER_PREVIEW_ACCESS), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );
  }
  return nativeFetch(input, init);
};

async function loadManager() {
  const managerRoot = document.querySelector("#managerRoot");
  const params = new URLSearchParams(window.location.search);
  const isFeatureMode = params.get("feature") === "1";
  const isDashboardEmbed = isFeatureMode && params.get("dashboard") === "1";
  try {
    const [templateResponse, runtimeResponse] = await Promise.all([
      fetch("manager-template.html", { cache: "no-store" }),
      fetch("manager-runtime.js", { cache: "no-store" }),
    ]);
    if (!templateResponse.ok || !runtimeResponse.ok) {
      throw new Error("Manager source could not be loaded.");
    }

    if (
      isFeatureMode &&
      window.parent !== window &&
      typeof window.parent.__THE_REVIEW_GET_ACCESS_TOKEN__ === "function" &&
      window.auth0?.createAuth0Client
    ) {
      const getParentAccessToken = window.parent.__THE_REVIEW_GET_ACCESS_TOKEN__;
      window.auth0.createAuth0Client = async () => ({
        isAuthenticated: async () => Boolean(await getParentAccessToken()),
        getTokenSilently: () => getParentAccessToken(),
      });
    }

    const template = document.createElement("template");
    template.innerHTML = await templateResponse.text();

    document.body.classList.toggle("manager-feature-page", isFeatureMode);
    document.body.classList.toggle("manager-dashboard-embed", isDashboardEmbed);
    managerRoot.classList.toggle("is-embedded-manager", isFeatureMode);
    managerRoot.replaceChildren(document.importNode(template.content, true));
    if (isFeatureMode && params.get("screen") === "members") {
      const membersTitle = managerRoot.querySelector("#screen-members h2");
      if (membersTitle) {
        membersTitle.textContent = "メンバーの追加・管理";
      }
    }
    const returnButton = managerRoot.querySelector('[data-menu-url="./index.html"]');
    if (returnButton) {
      returnButton.removeAttribute("data-menu-url");
      returnButton.addEventListener("click", () => {
        window.parent.postMessage({ type: "the-review-manager-close" }, window.location.origin);
      });
    }

    const managerSource = await runtimeResponse.text();
    new Function(managerSource)();

    const requestedScreen = params.get("screen") || "home";
    const allowedScreens = new Set(["home", "members", "problem", "store"]);
    const screen = allowedScreens.has(requestedScreen) ? requestedScreen : "home";
    document.querySelector(`[data-screen="${CSS.escape(screen)}"]`)?.click();

    if (isDashboardEmbed && window.parent !== window) {
      const reportHeight = () => {
        const height = Math.max(
          managerRoot.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.scrollHeight
        );
        window.parent.postMessage({ type: "the-review-manager-height", height }, window.location.origin);
      };
      const resizeObserver = new ResizeObserver(reportHeight);
      resizeObserver.observe(managerRoot);
      new MutationObserver(reportHeight).observe(managerRoot, {
        childList: true,
        subtree: true,
        attributes: true,
      });
      requestAnimationFrame(reportHeight);
    }
  } catch (error) {
    console.error("Failed to load The Review Manager:", error);
    managerRoot.innerHTML =
      '<p class="manager-load-error" role="alert">管理機能を読み込めませんでした。</p>';
  }
}

void loadManager();
