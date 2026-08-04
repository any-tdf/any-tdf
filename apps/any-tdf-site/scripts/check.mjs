import { resolve } from "node:path";

const appRoot = resolve(import.meta.dir, "..");
const manifest = await Bun.file(resolve(appRoot, "package.json")).json();
const html = await Bun.file(resolve(appRoot, "index.html")).text();
const script = await Bun.file(resolve(appRoot, "src/main.js")).text();
const styles = await Bun.file(resolve(appRoot, "src/styles.css")).text();
const anyTdfTheme = await Bun.file(
  resolve(appRoot, "../../packages/common/src/theme/anytdf.ts"),
).text();
const officialFrameworkAssets = {
  "svelte.svg": "e6a22ffd1efcfeb19eb63ea5f04c794f6b89349080f14158252cdf06db16c98a",
  "react-light.svg": "f06f8906159321315b77af4e86846b95f679d74ec0d681ef92101aa7c1ec8656",
  "react-dark.svg": "ad13942c43f70b5c43a04edb6e5ad6b12ff6a7c38ad301d38aaa3ed916ec904a",
  "vue.svg": "6f97b1f82a6dafdda0b53c347bdfb0b74cb3bf1d73ce8e40bbbb914115235886",
};

const requiredLinks = [
  "https://stdf.dev",
  "https://rtdf.dev",
  "https://vtdf.dev",
  "https://www.npmjs.com/package/stdf",
  "https://www.npmjs.com/package/rtdf",
  "https://www.npmjs.com/package/vtdf",
  "https://github.com/any-tdf/any-tdf",
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
  "languages",
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
const requiredArchitectureMotionHooks = [
  "portal-map-flow",
  "portal-map-line",
  "portal-map-flow-path",
];
const requiredAnyTdfLogoColors = [
  "oklch(0.467 0.296 264.886)",
  "oklch(0.845 0.153 80.597)",
];

if (manifest.private !== true)
  throw new Error("The portal Workspace must remain private.");
if (manifest.repository?.directory !== "apps/any-tdf-site")
  throw new Error("The portal repository directory is incorrect.");
if (manifest.dependencies?.lucide !== "catalog:")
  throw new Error("The portal must consume Lucide through the root catalog.");
if (!script.includes("createIcons") || !script.includes("from 'lucide'"))
  throw new Error("The portal must initialize its utility icons through Lucide.");

for (const link of requiredLinks) {
  if (!html.includes(link)) throw new Error(`The portal is missing ${link}.`);
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
  throw new Error("The RTDF product logo must retain the React atom.");
if (
  !html.includes('id="portal-rtdf-react-mask"') ||
  !html.includes('mask="url(#portal-rtdf-react-mask)"')
)
  throw new Error(
    "The RTDF product logo must preserve the official React geometry through its source asset.",
  );
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
for (const target of ["#products", "#architecture", "#principles"]) {
  if (!mobileNavigationMarkup?.includes(`href="${target}"`))
    throw new Error(`The mobile navigation must retain ${target}.`);
}
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
if (!html.includes('data-theme="auto"'))
  throw new Error("The portal must default to the automatic theme preference.");
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
if (!script.includes("const themePreferences = ['auto', 'light', 'dark']"))
  throw new Error("The portal must support automatic, light, and dark themes.");
if (!script.includes("if (currentTheme === 'auto') applyTheme('auto', false)"))
  throw new Error("The automatic theme must react to system theme changes.");

console.log(
  `PASS Any TDF portal (${requiredLinks.length} product and repository links, pure HTML/CSS/JavaScript)`,
);
