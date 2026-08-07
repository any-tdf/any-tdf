import { resolve } from "node:path";
import { themes as commonThemes } from "@any-tdf/common/theme/runtime";

const appRoot = resolve(import.meta.dir, "..");
const manifest = await Bun.file(resolve(appRoot, "package.json")).json();
const html = await Bun.file(resolve(appRoot, "index.html")).text();
const script = await Bun.file(resolve(appRoot, "src/main.js")).text();
const styles = await Bun.file(resolve(appRoot, "src/styles.css")).text();
const lightFavicon = await Bun.file(resolve(appRoot, "public/favicon.svg")).text();
const darkFavicon = await Bun.file(
  resolve(appRoot, "public/favicon-dark.svg"),
).text();
const anyTdfTheme = await Bun.file(
  resolve(appRoot, "../../packages/common/src/theme/anytdf.ts"),
).text();
const officialFrameworkAssets = {
  "svelte.svg": "e6a22ffd1efcfeb19eb63ea5f04c794f6b89349080f14158252cdf06db16c98a",
  "react-light.svg": "f06f8906159321315b77af4e86846b95f679d74ec0d681ef92101aa7c1ec8656",
  "react-dark.svg": "ad13942c43f70b5c43a04edb6e5ad6b12ff6a7c38ad301d38aaa3ed916ec904a",
  "vue.svg": "6f97b1f82a6dafdda0b53c347bdfb0b74cb3bf1d73ce8e40bbbb914115235886",
};
const supportAssetFiles = [
  "coffee.svg",
  "paypal.svg",
  "wechat_pay.svg",
  "alipay.svg",
  "wp_code.png",
  "ap_code.png",
];

const requiredLinks = [
  "https://stdf.dev",
  "https://rtdf.dev",
  "https://vtdf.dev",
  "https://www.npmjs.com/package/stdf",
  "https://www.npmjs.com/package/rtdf",
  "https://www.npmjs.com/package/vtdf",
  "https://github.com/any-tdf/any-tdf",
];
const requiredEcosystemResources = [
  {
    name: "@any-tdf/react-confetti",
    link: "https://react-confetti.any-tdf.dev",
  },
  {
    name: "@any-tdf/vue-confetti",
    link: "https://vue-confetti.any-tdf.dev",
  },
  {
    name: "@any-tdf/common",
    link: "https://www.npmjs.com/package/@any-tdf/common",
  },
  {
    name: "create-any-tdf",
    link: "https://www.npmjs.com/package/create-any-tdf",
  },
  {
    name: "@any-tdf/vite-plugin-md-ts",
    link: "https://www.npmjs.com/package/@any-tdf/vite-plugin-md-ts",
  },
  {
    name: "@any-tdf/vite-plugin-svg-symbol",
    link: "https://www.npmjs.com/package/@any-tdf/vite-plugin-svg-symbol",
  },
  {
    name: "$stdf",
    link: "https://github.com/any-tdf/any-tdf/tree/main/packages/skills/stdf-skill",
  },
  {
    name: "$rtdf",
    link: "https://github.com/any-tdf/any-tdf/tree/main/packages/skills/rtdf-skill",
  },
  {
    name: "$vtdf",
    link: "https://github.com/any-tdf/any-tdf/tree/main/packages/skills/vtdf-skill",
  },
  {
    name: "Any TDF for VS Code",
    link: "https://marketplace.visualstudio.com/items?itemName=STDF.stdf-vscode-extension",
  },
];
const forbiddenFrameworkDependencies = ["react", "react-dom", "svelte", "vue"];
const requiredAcronymWords = [
  "Simple",
  "Ready",
  "Visual",
  "Tiny",
  "Design",
  "Fast",
];
const requiredAcronymTranslations = [
  "简单",
  "即用",
  "视觉",
  "轻量",
  "设计",
  "快速",
];
const requiredMotionPackages = ["@any-tdf/react-motion", "@any-tdf/vue-motion"];
const requiredProductLogos = ["stdf", "rtdf", "vtdf"];
const requiredFrameworkLogos = ["svelte", "react", "vue"];
const requiredLucideIcons = [
  "blocks",
  "code-xml",
  "external-link",
  "layers",
  "menu",
  "monitor",
  "moon",
  "package-check",
  "package-open",
  "paintbrush",
  "panels-top-left",
  "plug",
  "refresh-cw",
  "repeat-2",
  "sun",
  "workflow",
  "x",
];
const requiredBrandIcons = ["github"];
const requiredSiteHeaderIcons = ["language", "github"];
const requiredArchitectureMotionHooks = [
  "portal-map-flow",
  "portal-map-line",
  "portal-map-flow-path",
];
const requiredAnyTdfLogoColors = [
  "oklch(0.467 0.296 264.886)",
  "oklch(0.845 0.153 80.597)",
];
const requiredPortalThemeProperties = [
  "color-primary",
  "color-dark",
  "color-bg-base",
  "color-bg-surface",
  "color-bg-overlay",
  "color-bg-highlight",
  "color-bg-base-dark",
  "color-bg-surface-dark",
  "color-bg-overlay-dark",
  "color-bg-highlight-dark",
  "color-text-primary",
  "color-text-dark",
  "color-text-on-primary",
  "color-text-on-dark",
];

if (manifest.private !== true)
  throw new Error("The portal Workspace must remain private.");
if (manifest.repository?.directory !== "apps/any-tdf-site")
  throw new Error("The portal repository directory is incorrect.");
if (manifest.dependencies?.lucide !== "catalog:")
  throw new Error("The portal must consume Lucide through the root catalog.");
if (manifest.dependencies?.["@any-tdf/common"] !== "workspace:*")
  throw new Error("The portal must consume the shared themes through @any-tdf/common.");
if (manifest.dependencies?.tailwindcss || manifest.devDependencies?.tailwindcss)
  throw new Error("The framework-neutral portal must not add Tailwind CSS for theme switching.");
if (commonThemes.length !== 42)
  throw new Error("The portal must expose all 42 built-in themes from @any-tdf/common.");
for (const theme of commonThemes) {
  for (const propertyName of requiredPortalThemeProperties) {
    if (typeof theme[propertyName] !== "string")
      throw new Error(`The ${theme.name} theme is missing ${propertyName}.`);
  }
}
if (!script.includes("import { themes } from '@any-tdf/common/theme/runtime'"))
  throw new Error("The portal must import theme data from the standalone common runtime.");
if (script.includes("switchTheme(") || script.includes("/theme/plugin"))
  throw new Error("The portal must apply its own CSS variables without the Tailwind theme plugin.");
if (
  !script.includes("root.style.setProperty(`--${propertyName}`, theme[propertyName])") ||
  !script.includes("localStorage.setItem(colorThemeStorageKey, theme.name)")
)
  throw new Error("The portal must apply and persist common theme values through local CSS variables.");
if (!script.includes("createIcons") || !script.includes("from 'lucide'"))
  throw new Error("The portal must initialize its utility icons through Lucide.");
if (
  !script.includes(
    "import { siteHeaderIconPaths } from '@any-tdf/site-common/site'",
  ) ||
  !script.includes(
    "siteHeaderIconPaths[icon.dataset.siteHeaderIcon]",
  )
)
  throw new Error(
    "The portal header must reuse the shared STDF language and GitHub icon paths.",
  );
if (!html.includes('data-theme-favicon'))
  throw new Error("The portal favicon must expose its theme-switching hook.");
if (!lightFavicon.includes('fill="#0B24FB"'))
  throw new Error("The light portal favicon must use the primary blue logo color.");
if (!darkFavicon.includes('fill="#FFC043"'))
  throw new Error("The dark portal favicon must use the dark yellow logo color.");
if (
  !script.includes("const faviconPaths = { light: '/favicon.svg', dark: '/favicon-dark.svg' }") ||
  !script.includes("favicon?.setAttribute('href', faviconPaths[currentMode])")
)
  throw new Error("The portal favicon must follow the active light or dark mode.");

for (const filename of supportAssetFiles) {
  const portalAsset = Bun.file(resolve(appRoot, "public/assets/fund", filename));
  const referenceAsset = Bun.file(
    resolve(appRoot, "../stdf-site/static/assets/fund", filename),
  );
  if (!(await portalAsset.exists()))
    throw new Error(`The support dialog is missing ${filename}.`);
  const portalHash = new Bun.CryptoHasher("sha256")
    .update(await portalAsset.arrayBuffer())
    .digest("hex");
  const referenceHash = new Bun.CryptoHasher("sha256")
    .update(await referenceAsset.arrayBuffer())
    .digest("hex");
  if (portalHash !== referenceHash)
    throw new Error(`The support dialog must reuse the STDF ${filename} asset.`);
}

if ([...html.matchAll(/data-support-trigger/g)].length !== 2)
  throw new Error("The support entry must be available in desktop and mobile navigation.");
for (const hook of [
  "data-support-dialog",
  'data-support-payment="wechat"',
  'data-support-payment="alipay"',
]) {
  if (!html.includes(hook))
    throw new Error(`The support dialog is missing ${hook}.`);
}
for (const link of [
  "https://www.buymeacoffee.com/dufu1991",
  "https://paypal.me/dufu1991",
]) {
  if (!html.includes(link))
    throw new Error(`The support dialog is missing ${link}.`);
}
if (
  !script.includes("currentUrl.searchParams.has('fund')") ||
  !script.includes("currentUrl.searchParams.delete('fund')")
)
  throw new Error("The support dialog must support and then remove the fund query parameter.");
if (
  !script.includes("closeSupportDialog") ||
  !script.includes("setActiveSupportPayment") ||
  !styles.includes(".portal-support-overlay") ||
  !styles.includes(".portal-support-panel")
)
  throw new Error("The support dialog interaction or presentation is incomplete.");
if (
  !script.includes("Any TDF 是一个免费、开源、持续演进的移动 Web 组件生态") ||
  !script.includes("Any TDF is a free, open-source, continuously evolving mobile Web component ecosystem")
)
  throw new Error("The support dialog must describe the Any TDF ecosystem in both languages.");

for (const link of requiredLinks) {
  if (!html.includes(link)) throw new Error(`The portal is missing ${link}.`);
}

for (const resource of requiredEcosystemResources) {
  if (!html.includes(resource.name))
    throw new Error(`The ecosystem directory is missing ${resource.name}.`);
  if (!html.includes(resource.link))
    throw new Error(`The ecosystem directory is missing ${resource.link}.`);
}

for (const dependency of forbiddenFrameworkDependencies) {
  if (
    manifest.dependencies?.[dependency] ||
    manifest.devDependencies?.[dependency]
  ) {
    throw new Error(`The pure HTML portal must not depend on ${dependency}.`);
  }
}

for (const icon of requiredLucideIcons) {
  if (!html.includes(`data-lucide="${icon}"`))
    throw new Error(`The portal is missing the ${icon} Lucide icon.`);
}

for (const icon of requiredBrandIcons) {
  if (!html.includes(`data-icon="${icon}"`))
    throw new Error(`The portal is missing the ${icon} brand icon.`);
}

for (const icon of requiredSiteHeaderIcons) {
  if ([...html.matchAll(new RegExp(`data-site-header-icon="${icon}"`, "g"))].length !== 2)
    throw new Error(
      `The desktop and mobile headers must both use the shared ${icon} icon.`,
    );
}
if (
  !/\.portal-header-symbol\s*\{[^}]*width:\s*1\.25rem;[^}]*height:\s*1\.25rem;[^}]*fill:\s*currentColor;[^}]*stroke:\s*none;/s.test(
    styles,
  ) ||
  !/\.portal-header-language-symbol\s*\{[^}]*width:\s*1rem;[^}]*height:\s*1rem;/s.test(
    styles,
  )
)
  throw new Error(
    "The shared header icons must keep the same language and GitHub dimensions as STDF.",
  );

for (const hook of requiredArchitectureMotionHooks) {
  if (!html.includes(hook))
    throw new Error(`The architecture preview is missing the ${hook} motion hook.`);
}

if (!styles.includes("@keyframes portal-map-flow"))
  throw new Error("The architecture preview is missing its directional flow animation.");
if (
  !/\.portal-map-flow-path\s*\{[^}]*stroke-dasharray:\s*1;[^}]*stroke-dashoffset:\s*1;/s.test(
    styles,
  )
)
  throw new Error(
    "The architecture signal must draw a continuous route instead of a detached dash.",
  );
if (/\.portal-map-connector::before|\.portal-map-connector span::/s.test(styles))
  throw new Error(
    "The architecture preview must not maintain a second disconnected CSS connector geometry.",
  );
if (!/\.portal-map-line\s*\{[^}]*stroke:\s*var\(--site-divider-strong\)/s.test(styles))
  throw new Error(
    "The architecture preview must retain an uninterrupted static SVG connector beneath its animated signal.",
  );
if (!styles.includes("@media (prefers-reduced-motion: reduce)"))
  throw new Error("The portal motion must respect reduced-motion preferences.");

for (const word of requiredAcronymWords) {
  if (!html.includes(`<span>${word}</span>`))
    throw new Error(`The product acronym cards are missing ${word}.`);
}

for (const translation of requiredAcronymTranslations) {
  if (!html.includes(`<small data-acronym-zh>${translation}</small>`))
    throw new Error(`The product acronym cards are missing ${translation}.`);
}

for (const motionPackage of requiredMotionPackages) {
  if (!html.includes(motionPackage))
    throw new Error(`The portal is missing ${motionPackage}.`);
}

for (const productLogo of requiredProductLogos) {
  if (!html.includes(`data-product-logo="${productLogo}"`))
    throw new Error(`The portal is missing the ${productLogo} product logo.`);
}

if (!html.includes('class="portal-product-logo-detail portal-product-logo-lightning"'))
  throw new Error("The STDF product logo is missing its animated lightning layer.");
if (
  !styles.includes("@keyframes portal-stdf-lightning") ||
  !/\.portal-product-logo-lightning\s*\{[^}]*animation:\s*portal-stdf-lightning 3s linear infinite;/s.test(
    styles,
  )
)
  throw new Error("The STDF lightning must continuously use the original three-second animation.");
if (
  !/@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*?\.portal-product-logo-lightning\s*\{[^}]*animation:\s*none;/s.test(
    styles,
  )
)
  throw new Error("The STDF lightning animation must respect reduced-motion preferences.");

for (const frameworkLogo of requiredFrameworkLogos) {
  if (!html.includes(`data-framework-logo="${frameworkLogo}"`))
    throw new Error(`The portal is missing the ${frameworkLogo} framework logo.`);
}

for (const [filename, expectedHash] of Object.entries(officialFrameworkAssets)) {
  const asset = Bun.file(resolve(appRoot, "public/frameworks", filename));
  if (!(await asset.exists())) throw new Error(`The official ${filename} asset is missing.`);
  const hash = new Bun.CryptoHasher("sha256").update(await asset.arrayBuffer()).digest("hex");
  if (hash !== expectedHash) throw new Error(`The official ${filename} asset has been modified.`);
}

if (!html.includes('data-logo-layer="react"'))
  throw new Error("The RTDF product logo must retain the React orbit layer.");
if (
  !html.includes('id="portal-rtdf-react-mask"') ||
  !html.includes('mask="url(#portal-rtdf-react-mask)"')
)
  throw new Error(
    "The RTDF product logo must preserve the official React geometry through its source asset.",
  );
if (
  !html.includes('id="portal-rtdf-react-core-cutout"') ||
  !html.includes('mask="url(#portal-rtdf-react-core-cutout)"')
)
  throw new Error("The RTDF product logo must omit the React core circle.");
if (!html.includes('class="portal-rtdf-orbit-motion" data-logo-layer="react"'))
  throw new Error("The RTDF product logo is missing its rotating React orbit layer.");
if (
  !styles.includes("@keyframes portal-rtdf-orbit-spin") ||
  !/\.portal-rtdf-orbit-motion\s*\{[^}]*animation:\s*portal-rtdf-orbit-spin 8s linear infinite;/s.test(
    styles,
  )
)
  throw new Error("The RTDF React orbit layer must rotate continuously around the logo center.");
if (
  !/@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*?\.portal-rtdf-orbit-motion\s*\{[^}]*animation:\s*none;/s.test(
    styles,
  )
)
  throw new Error("The RTDF orbit animation must respect reduced-motion preferences.");
const vtdfLogoStart = html.indexOf('data-product-logo="vtdf"');
const vtdfLogoMarkup = html.slice(vtdfLogoStart, html.indexOf("</svg>", vtdfLogoStart) + 6);
if (!vtdfLogoMarkup.includes('viewBox="0 0 80 80"'))
  throw new Error("The VTDF product card must retain the shared 80 by 80 logo coordinate system.");
if (!vtdfLogoMarkup.includes('data-logo-layer="vtdf-mark"'))
  throw new Error("The VTDF product logo must retain its diagonal checkmark layer.");
if (vtdfLogoMarkup.includes("M20 30H40L20 80V50H0L20 0V30Z"))
  throw new Error("The VTDF product logo must not reuse the STDF lightning mark.");
if (!vtdfLogoMarkup.includes('data-logo-shape="check"') || !vtdfLogoMarkup.includes('pathLength="1"'))
  throw new Error("The VTDF checkmark must use one continuous SVG path.");
if (
  vtdfLogoMarkup.includes("portal-vtdf-check-short-mask") ||
  vtdfLogoMarkup.includes("portal-vtdf-check-long-mask") ||
  vtdfLogoMarkup.includes('data-logo-arm="short"') ||
  vtdfLogoMarkup.includes('data-logo-arm="long"')
)
  throw new Error("The VTDF checkmark must not be split into separate arms.");
if (
  !styles.includes("@keyframes portal-vtdf-check-draw") ||
  styles.includes("@keyframes portal-vtdf-check-settle") ||
  !/\.portal-vtdf-check-motion\s*\{[^}]*animation:\s*portal-vtdf-check-draw 5s linear infinite;/s.test(
    styles,
  )
)
  throw new Error("The VTDF checkmark must draw continuously without scaling on a five-second cycle.");
if (
  !/@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*?\.portal-vtdf-check-motion\s*\{[^}]*animation:\s*none;[^}]*stroke-dashoffset:\s*0;/s.test(
    styles,
  )
)
  throw new Error("The VTDF checkmark must remain complete when reduced motion is requested.");
if (
  vtdfLogoMarkup.includes('data-logo-layer="vtdf-grid"') ||
  vtdfLogoMarkup.includes("<line") ||
  styles.includes("portal-vtdf-logo-grid")
)
  throw new Error("The VTDF construction guides belong only on the VTDF guide logo page.");
for (const assetPath of [
  "/frameworks/svelte.svg",
  "/frameworks/react-light.svg",
  "/frameworks/react-dark.svg",
  "/frameworks/vue.svg",
]) {
  if (!html.includes(assetPath)) throw new Error(`The portal is not using the official ${assetPath} asset.`);
}
if (html.includes('rx="84" ry="32"') || html.includes("portal-product-logo-react"))
  throw new Error("The portal must not redraw the React logo with custom SVG geometry.");

for (const logoColor of requiredAnyTdfLogoColors) {
  if (!anyTdfTheme.includes(logoColor))
    throw new Error(`The internal Any TDF theme no longer defines ${logoColor}.`);
  if (!styles.includes(logoColor))
    throw new Error(`The portal must reuse the internal Any TDF color ${logoColor}.`);
}
if (
  !styles.includes("--color-primary: oklch(0.467 0.296 264.886)") ||
  !styles.includes("--color-dark: oklch(0.845 0.153 80.597)")
)
  throw new Error(
    "The whole portal must use the internal Any TDF light and dark theme colors.",
  );
if (
  !styles.includes("--portal-product-logo-base: var(--anytdf-logo-primary)") ||
  !styles.includes("--portal-product-logo-layer: var(--anytdf-logo-dark)") ||
  !styles.includes("--portal-product-logo-base: var(--anytdf-logo-dark)") ||
  !styles.includes("--portal-product-logo-layer: var(--anytdf-logo-primary)")
)
  throw new Error(
    "The product logos must share the same reversible Any TDF layer palette.",
  );
for (const selector of [
  ".portal-renderer strong",
  ".portal-adapter-grid b",
  ".portal-motion-packages span",
]) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (!new RegExp(`${escapedSelector}\\s*\\{[^}]*color:\\s*var\\(--site-accent\\)`, "s").test(styles))
    throw new Error(`${selector} must follow the active Any TDF theme color.`);
}
if (styles.includes("--renderer-accent"))
  throw new Error(
    "Renderer labels must bind directly to the active Any TDF theme color.",
  );
if (/--portal-(?:svelte|react|vue):/.test(styles))
  throw new Error(
    "Framework-specific colors must be limited to the official framework logo assets.",
  );

const externalTargets = [
  ...html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g),
].map(([tag]) => tag);
if (externalTargets.some((tag) => !tag.includes('rel="noreferrer"'))) {
  throw new Error('Every external link must use rel="noreferrer".');
}
if (!script.includes("zh: {") || !script.includes("en: {"))
  throw new Error("The portal must retain Chinese and English content.");
if (!styles.includes("@import '@any-tdf/site-common/portal-styles';"))
  throw new Error("The portal must reuse the shared site visual language.");
if (!html.includes("viewport-fit=cover"))
  throw new Error("The portal must support mobile safe areas.");
if (!styles.includes("@media (max-width: 29.999rem)"))
  throw new Error("The portal must retain its compact mobile layout.");
const desktopNavigationMarkup = html.match(
  /<nav class="site-header-nav"[\s\S]*?<\/nav>/,
)?.[0];
if (!desktopNavigationMarkup)
  throw new Error("The portal desktop navigation is missing.");
if (/#(?:products|architecture|principles)/.test(desktopNavigationMarkup))
  throw new Error(
    "The desktop header must remain icon-only after the brand group.",
  );
const mobileNavigationMarkup = html.match(
  /<nav class="site-mobile-menu-nav"[\s\S]*?<\/nav>/,
)?.[0];
if (!mobileNavigationMarkup)
  throw new Error("The portal mobile navigation is missing.");
for (const target of ["#products", "#architecture", "#principles", "#resources"]) {
  if (mobileNavigationMarkup.includes(`href="${target}"`))
    throw new Error(`The compact mobile navigation must not include ${target}.`);
}
const mobileGithubMarkup = mobileNavigationMarkup.match(
  /<a\b[^>]*href="https:\/\/github\.com\/any-tdf\/any-tdf"[\s\S]*?<\/a>/,
)?.[0];
const mobileLanguageMarkup = mobileNavigationMarkup.match(
  /<button\b[^>]*data-language-toggle[\s\S]*?<\/button>/,
)?.[0];
if (!mobileGithubMarkup || mobileGithubMarkup.replace(/<[^>]+>/g, "").trim())
  throw new Error("The mobile GitHub action must remain icon-only.");
if (!mobileLanguageMarkup || mobileLanguageMarkup.replace(/<[^>]+>/g, "").trim())
  throw new Error("The mobile language action must remain icon-only.");
if (/\.portal-map-common\s*\{[^}]*border-left:/s.test(styles))
  throw new Error(
    "The shared core card must not use a single-sided accent border.",
  );
if (/\.portal-renderer\s*\{[^}]*border-top:/s.test(styles))
  throw new Error("Renderer cards must not use single-sided accent borders.");
if (styles.includes(".portal-product-card::before"))
  throw new Error("Product cards must not use a colored top-edge accent.");
if (
  !/\[data-product='svelte'\],\s*\[data-product='react'\],\s*\[data-product='vue'\]\s*\{\s*--product-accent:\s*var\(--site-accent\);/s.test(
    styles,
  )
)
  throw new Error("All product cards must use the Any TDF theme accent.");
if (/\.portal-architecture-content\s*\{[^}]*border-left:/s.test(styles))
  throw new Error(
    "The shared architecture layer must not use a colored left-edge accent.",
  );
if (/\.portal-adapter-grid\s*>\s*div\s*\{[^}]*border-top:/s.test(styles))
  throw new Error(
    "Architecture adapter cards must not use colored top-edge accents.",
  );
if (/\.portal-motion-packages\s*>\s*div\s*\{[^}]*border-top:/s.test(styles))
  throw new Error(
    "Motion package cards must not use colored top-edge accents.",
  );
if (!script.includes("desktopNavigation.addEventListener"))
  throw new Error(
    "The mobile menu must reset when desktop navigation returns.",
  );
if (!html.includes('data-theme="ANYTDF"'))
  throw new Error("The portal must default to the internal ANYTDF color theme.");
if (
  !html.includes("localStorage.getItem('theme_color') || 'ANYTDF'") ||
  !script.includes("const colorThemeStorageKey = 'theme_color'") ||
  !script.includes("const defaultColorTheme = 'ANYTDF'")
)
  throw new Error("The selected built-in color theme must persist across page loads.");
if ([...html.matchAll(/data-theme-options/g)].length !== 2)
  throw new Error("The desktop and mobile theme panels must both list the built-in themes.");
for (const mode of ["light", "dark", "auto"]) {
  if (
    [...html.matchAll(new RegExp(`data-mode-choice="${mode}"`, "g"))]
      .length !== 2
  )
    throw new Error(`The ${mode} mode must be available in both theme panels.`);
}
for (const hook of [
  "data-theme-panel-toggle",
  "data-theme-panel",
  "data-mobile-theme-open",
  "data-mobile-theme-panel",
  "data-mobile-theme-back",
]) {
  if (!html.includes(hook))
    throw new Error(`The theme interaction is missing ${hook}.`);
}
if (html.includes("data-theme-toggle"))
  throw new Error("Light and dark mode controls must live inside the theme panels.");
const desktopThemeControlStart = html.indexOf(
  'class="portal-theme-control"',
);
const firstSupportTrigger = html.indexOf(
  "data-support-trigger",
  desktopThemeControlStart,
);
const desktopThemeControlMarkup = html.slice(
  desktopThemeControlStart,
  firstSupportTrigger,
);
if (
  desktopThemeControlStart < 0 ||
  firstSupportTrigger < 0 ||
  desktopThemeControlMarkup.includes("href=")
)
  throw new Error("The theme panel must not include a theme generator link.");
if (
  !styles.includes(".portal-theme-popover") ||
  !styles.includes(".portal-mobile-theme-panel") ||
  !styles.includes(".portal-theme-options") ||
  !styles.includes(".portal-mode-switch")
)
  throw new Error("The desktop or mobile theme panel presentation is incomplete.");
if (!styles.includes(".site-mobile-menu-nav[hidden]"))
  throw new Error("The mobile primary menu must stay hidden behind the theme panel.");
const defaultTheme = commonThemes.find((theme) => theme.name === "ANYTDF");
if (!defaultTheme)
  throw new Error("@any-tdf/common must retain its internal ANYTDF theme.");
const normalizedStyles = styles.replaceAll("0.050", "0.05");
for (const propertyName of requiredPortalThemeProperties) {
  if (!script.includes(`'${propertyName}'`))
    throw new Error(`The portal does not apply ${propertyName}.`);
  const declaration = `--${propertyName}: ${defaultTheme[propertyName]};`.replaceAll(
    "0.050",
    "0.05",
  );
  if (!normalizedStyles.includes(declaration))
    throw new Error(`The portal fallback for ${propertyName} differs from ANYTDF.`);
}
for (const mapping of [
  "--site-bg-alt: var(--color-bg-highlight)",
  "--site-bg-soft: var(--color-bg-overlay)",
  "--site-bg-elevated: var(--color-bg-surface)",
  "--site-text: var(--color-text-primary)",
  "--site-on-accent: var(--color-text-on-primary)",
  "--site-bg-alt: var(--color-bg-highlight-dark)",
  "--site-bg-soft: var(--color-bg-overlay-dark)",
  "--site-bg-elevated: var(--color-bg-surface-dark)",
  "--site-text: var(--color-text-dark)",
  "--site-on-accent: var(--color-text-on-dark)",
]) {
  if (!styles.includes(mapping))
    throw new Error(`The full-page palette is missing ${mapping}.`);
}
if (!html.includes('data-i18n-aria="brandLabel"'))
  throw new Error("The portal brand must have a translated accessible label.");
const headerMarkup = html.match(/<header class="site-header">[\s\S]*?<\/header>/)?.[0];
if (!headerMarkup)
  throw new Error("The portal header is missing.");
if (headerMarkup.includes('class="site-brand-name"'))
  throw new Error("The portal header brand must remain logo-only.");
if (!html.includes('class="portal-logo-primary"'))
  throw new Error("The portal must retain the primary brand mark.");
if (html.includes('class="site-status"') || html.includes("ONE SYSTEM · THREE RENDERERS"))
  throw new Error(
    "The portal header must not include a secondary status label beside the brand.",
  );
if (!/\.portal-logo-primary\s*\{[^}]*fill:\s*var\(--portal-product-logo-base\)/s.test(styles))
  throw new Error(
    "The portal brand mark must follow the reversible internal Any TDF logo palette.",
  );
if (html.includes("portal-logo-secondary"))
  throw new Error(
    "The portal brand mark must not include the lightning overlay.",
  );
if (html.includes("<span>MENU</span>"))
  throw new Error("The mobile header menu action must remain icon-only.");
if (!script.includes("const modePreferences = ['auto', 'light', 'dark']"))
  throw new Error("The portal must support automatic, light, and dark themes.");
if (
  !script.includes(
    "if (currentModePreference === 'auto') applyModePreference('auto', false)",
  )
)
  throw new Error("The automatic theme must react to system theme changes.");

console.log(
  `PASS Any TDF portal (${commonThemes.length} common themes, ${requiredLinks.length} product and repository links, ${requiredEcosystemResources.length} ecosystem resources, pure HTML/CSS/JavaScript without Tailwind)`,
);
