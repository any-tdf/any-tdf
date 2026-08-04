import { readFile, readdir } from "node:fs/promises";
import { relative, resolve } from "node:path";

const workspaceRoot = resolve(import.meta.dir, "..");
const rootManifest = await Bun.file(resolve(workspaceRoot, "package.json")).json();
const workspacePatterns = rootManifest.workspaces?.packages ?? [];
const ignoredDirectories = new Set([
  ".bun",
  ".git",
  ".svelte-kit",
  ".turbo",
  ".vercel",
  ".vite",
  "build",
  "coverage",
  "demo-dist",
  "dist",
  "dist-ssr",
  "node_modules",
  "out",
  ".output",
  "reports",
  "site-dist",
]);
const excludedDirectories = new Set(["logo-concepts", "raatdf", "site-backup"]);
const localToolDirectories = new Set([
  ".agent",
  ".agents",
  ".claude",
  ".codex",
  ".idea",
  ".vscode",
]);
const forbiddenNestedFiles = new Set([
  ".gitattributes",
  ".gitignore",
  ".gitmodules",
  "LICENSE",
]);
const rootReadmePaths = [
  "README.md",
  "readme/README_zh_CN.md",
  "readme/README_zh_TW.md",
  "readme/README_ja_JP.md",
  "readme/README_ko_KR.md",
  "readme/README_es_ES.md",
  "readme/README_ru_RU.md",
  "readme/README_fr_FR.md",
  "readme/README_de_DE.md",
  "readme/README_it_IT.md",
];
const repositoryUrl = "git+https://github.com/any-tdf/any-tdf.git";
const repositoryWebUrl = "https://github.com/any-tdf/any-tdf";
const rootLicenseUrl = `${repositoryWebUrl}/blob/main/LICENSE`;
const errors = [];
const rootQualityScripts = {
	"quality:prepare": "turbo run build",
	"quality:check": "bun run quality:prepare && bun run format:check && bun run lint",
  format: "vp fmt --disable-nested-config",
  "format:check": "vp fmt --check --disable-nested-config",
  lint: "vp lint --disable-nested-config",
};
const rootOnlyDevDependencies = new Set(["@changesets/cli", "turbo"]);
const executableDependencyRules = new Map([
  ["changeset", "@changesets/cli"],
  ["publint", "publint"],
  ["rollup", "rollup"],
  ["svelte-check", "svelte-check"],
  ["svelte-kit", "@sveltejs/kit"],
  ["svelte-package", "@sveltejs/package"],
  ["tsc", "typescript"],
  ["turbo", "turbo"],
  ["vsce", "@vscode/vsce"],
  ["vue-tsc", "vue-tsc"],
  ["vp", "vite-plus"],
]);
const catalogProtocols = new Map();

const normalizePath = (path) => path.replaceAll("\\", "/");
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const registerCatalog = (catalog, protocol) => {
  for (const dependencyName of Object.keys(catalog ?? {})) {
    const protocols = catalogProtocols.get(dependencyName) ?? new Set();
    protocols.add(protocol);
    catalogProtocols.set(dependencyName, protocols);
  }
};

registerCatalog(rootManifest.workspaces?.catalog, "catalog:");
for (const [catalogName, catalog] of Object.entries(rootManifest.workspaces?.catalogs ?? {})) {
  registerCatalog(catalog, `catalog:${catalogName}`);
}

const collectWorkspaceManifests = async () => {
  const manifestPaths = new Set();

  for (const pattern of workspacePatterns) {
    const glob = new Bun.Glob(`${pattern}/package.json`);
    let matches = 0;

    for await (const path of glob.scan({ cwd: workspaceRoot, onlyFiles: true })) {
      manifestPaths.add(normalizePath(path));
      matches += 1;
    }

    if (matches === 0) errors.push(`Workspace pattern matched no packages: ${pattern}`);
  }

  return [...manifestPaths].sort();
};

const inspectTree = async (directory, isRoot = false) => {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = resolve(directory, entry.name);
    const relativePath = normalizePath(relative(workspaceRoot, absolutePath));

    if (entry.isDirectory()) {
      if (entry.name === ".git") {
        if (!isRoot) errors.push(`Nested Git repository found: ${relativePath}`);
        continue;
      }

      if (entry.name === ".github" && !isRoot) {
        errors.push(`Nested GitHub metadata found: ${relativePath}`);
        continue;
      }

      if (localToolDirectories.has(entry.name)) {
        errors.push(`Local AI or editor configuration found: ${relativePath}`);
        continue;
      }

      if (excludedDirectories.has(entry.name)) {
        errors.push(`Excluded directory found: ${relativePath}`);
        continue;
      }

      if (ignoredDirectories.has(entry.name)) continue;
      await inspectTree(absolutePath);
      continue;
    }

    if (entry.name === ".DS_Store") errors.push(`macOS metadata found: ${relativePath}`);
    if (!isRoot && forbiddenNestedFiles.has(entry.name)) {
      errors.push(`Nested repository metadata found: ${relativePath}`);
    }
  }
};

const inspectReadme = async (path) => {
  const absolutePath = resolve(workspaceRoot, path);
  const file = Bun.file(absolutePath);
  if (!(await file.exists())) {
    errors.push(`Required README is missing: ${path}`);
    return "";
  }

  const bytes = await readFile(absolutePath);
  let content = "";
  try {
    content = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    errors.push(`README is not valid UTF-8: ${path}`);
    return "";
  }

  for (const marker of ["stdf", "rtdf", "vtdf", "https://stdf.dev", "https://rtdf.dev", "https://vtdf.dev"]) {
    if (!content.toLowerCase().includes(marker)) errors.push(`${path} is missing ${marker}.`);
  }
  if (!content.includes(repositoryWebUrl)) errors.push(`${path} is missing ${repositoryWebUrl}.`);
  if (!content.includes(rootLicenseUrl)) errors.push(`${path} is missing the root License link.`);
  return content;
};

const inspectViteConfigs = async () => {
  const glob = new Bun.Glob("**/vite.config.ts");

  for await (const path of glob.scan({ cwd: workspaceRoot, onlyFiles: true })) {
    const normalizedPath = normalizePath(path);

    if (
      normalizedPath === "vite.config.ts" ||
      normalizedPath.startsWith("packages/create-any-tdf/templates/") ||
      normalizedPath.includes("/node_modules/")
    )
      continue;

    const source = await Bun.file(resolve(workspaceRoot, normalizedPath)).text();
    if (/^\s*(?:fmt|lint):\s*\{/m.test(source)) {
      errors.push(`Nested Vite+ quality config found: ${normalizedPath}`);
    }
  }
};

const inspectTailwindTemplates = async () => {
  const templates = new Map([
    ["packages/create-any-tdf/templates/react/vrtt/src/index.css", "rtdf/source.css"],
    ["packages/create-any-tdf/templates/svelte/sktt/src/app.css", "stdf/source.css"],
    ["packages/create-any-tdf/templates/svelte/vstt/src/app.css", "stdf/source.css"],
    ["packages/create-any-tdf/templates/vue/vrtt/src/index.css", "vtdf/source.css"],
  ]);

  for (const [path, sourceEntry] of templates) {
    const source = await Bun.file(resolve(workspaceRoot, path)).text();
    if (!source.includes(`@import '${sourceEntry}';`)) {
      errors.push(`${path}: Tailwind template must import ${sourceEntry}.`);
    }
    if (/node_modules\/(?:@any-tdf\/common|stdf|rtdf|vtdf)\/dist/.test(source)) {
      errors.push(`${path}: Tailwind source discovery must not depend on a hoisted node_modules path.`);
    }
  }
};

const inspectManifestDependencies = (path, manifest, isRoot = false) => {
  const availableDependencies = new Set([
    ...Object.keys(manifest.dependencies ?? {}),
    ...Object.keys(manifest.devDependencies ?? {}),
    ...Object.keys(manifest.optionalDependencies ?? {}),
  ]);
  const commands = Object.values(manifest.scripts ?? {}).join("\n");

  if (availableDependencies.has("@typescript/native-preview")) {
    errors.push(`${path}: @typescript/native-preview is obsolete; use stable TypeScript 7.`);
  }

  if (commands.includes("svelte-check")) {
    if (!commands.includes("--tsgo-experimental-api")) {
      errors.push(`${path}: svelte-check must use --tsgo-experimental-api.`);
    }
    if (manifest.devDependencies?.["@typescript/native"] !== "catalog:") {
      errors.push(`${path}: Svelte native checks must declare @typescript/native via catalog:.`);
    }
    if (manifest.devDependencies?.typescript !== "catalog:") {
      errors.push(`${path}: Svelte native checks must keep the TypeScript 6 API via catalog:.`);
    }
  }

  if (commands.includes("vue-tsc") && manifest.devDependencies?.typescript !== "catalog:vue-native") {
    errors.push(`${path}: vue-tsc must use the TypeScript 7 bridge via catalog:vue-native.`);
  }

  for (const [executable, dependencyName] of executableDependencyRules) {
    const executablePattern = new RegExp(
      `(?:^|[\\s;&|])${escapeRegExp(executable)}(?=\\s|$)`,
      "m",
    );
    if (executablePattern.test(commands) && !availableDependencies.has(dependencyName)) {
      errors.push(`${path}: scripts use ${executable}, but ${dependencyName} is not declared.`);
    }
  }

  for (const [dependencyName, version] of Object.entries(manifest.devDependencies ?? {})) {
    const protocols = catalogProtocols.get(dependencyName);
    if (protocols && !protocols.has(version)) {
      errors.push(
        `${path}: devDependencies.${dependencyName} must use ${[...protocols].join(" or ")}, received ${version}`,
      );
    }

    if (!isRoot && rootOnlyDevDependencies.has(dependencyName)) {
      errors.push(`${path}: ${dependencyName} is a root-only development dependency.`);
    }
  }
};

if (rootManifest.private !== true) errors.push("Root package must be private.");
if (rootManifest.license !== "MIT") errors.push("Root package license must be MIT.");
if (rootManifest.packageManager !== "bun@1.3.14")
  errors.push("Root packageManager must be bun@1.3.14.");
if (!workspacePatterns.length) errors.push("No Bun Workspace patterns are configured.");
if (rootManifest.devDependencies?.["vite-plus"] !== "catalog:")
  errors.push("Root vite-plus dependency must use catalog:.");
if (rootManifest.scripts?.["publish:npm"] !== "bun run scripts/publish-packages.mjs") {
  errors.push("Root publish:npm script must use the Bun TGZ publisher.");
}
if (rootManifest.scripts?.release !== "bun run scripts/github-releases.mjs") {
  errors.push("Root release script must create GitHub Release notes.");
}

for (const [name, command] of Object.entries(rootQualityScripts)) {
  if (rootManifest.scripts?.[name] !== command) {
    errors.push(`Root script ${name} must be: ${command}`);
  }
}
inspectManifestDependencies("package.json", rootManifest, true);

const manifestPaths = await collectWorkspaceManifests();
const workspaces = await Promise.all(
  manifestPaths.map(async (path) => ({
    path,
    manifest: await Bun.file(resolve(workspaceRoot, path)).json(),
  })),
);
const names = new Map();
const publicReadmes = new Map();
let publicWorkspaceCount = 0;

for (const { path, manifest } of workspaces) {
	if (!manifest.name) {
		errors.push(`Workspace has no package name: ${path}`);
		continue;
	}
  const workspaceDirectory = path.slice(0, path.lastIndexOf("/"));

  const existingPath = names.get(manifest.name);
  if (existingPath)
    errors.push(`Duplicate package name ${manifest.name}: ${existingPath}, ${path}`);
  else names.set(manifest.name, path);

  if (path.startsWith("apps/") && manifest.private !== true)
    errors.push(`Application must be private: ${path}`);
  if (manifest.repository?.directory !== workspaceDirectory) {
    errors.push(`${path}: repository.directory must be ${workspaceDirectory}.`);
  }

  if (manifest.private !== true) {
    publicWorkspaceCount += 1;
    const readmePath = `${workspaceDirectory}/README.md`;
    const readmeFile = Bun.file(resolve(workspaceRoot, readmePath));

    if (!(await readmeFile.exists())) {
      errors.push(`${path}: public package must have its own README.md.`);
    } else {
      const readme = await readmeFile.text();
      if (!readme.includes(manifest.name)) errors.push(`${readmePath}: package name ${manifest.name} is missing.`);
      if (!readme.includes(rootLicenseUrl)) errors.push(`${readmePath}: root License link is missing.`);
      const duplicatePath = publicReadmes.get(readme);
      if (duplicatePath) errors.push(`${readmePath}: README duplicates ${duplicatePath}.`);
      else publicReadmes.set(readme, readmePath);
    }

    if (manifest.license !== "MIT") errors.push(`${path}: public package license must be MIT.`);
    if (manifest.repository?.url !== repositoryUrl) errors.push(`${path}: repository.url must be ${repositoryUrl}.`);
    if (!manifest.files?.includes("README.md")) errors.push(`${path}: files must include README.md.`);
    if (!manifest.files?.includes("LICENSE")) errors.push(`${path}: files must include the staged LICENSE.`);
    if (!manifest.scripts?.prepack?.includes("package-license.mjs stage")) {
      errors.push(`${path}: prepack must stage the root License.`);
    }
    if (!manifest.scripts?.postpack?.includes("package-license.mjs clean")) {
      errors.push(`${path}: postpack must remove the staged License.`);
    }
    if (!manifest.scripts?.package?.includes("publint")) {
      errors.push(`${path}: public package checks must run Publint.`);
    }
  }

  if (["stdf", "rtdf", "vtdf"].includes(manifest.name)) {
    if (manifest.dependencies?.["@any-tdf/common"] !== "workspace:^") {
      errors.push(`${path}: @any-tdf/common must be a runtime dependency using workspace:^.`);
    }
    if (manifest.devDependencies?.["@any-tdf/common"]) {
      errors.push(`${path}: @any-tdf/common must not remain in devDependencies.`);
    }
    if (manifest.scripts?.build?.includes("prepare-framework-dist")) {
      errors.push(`${path}: build must not copy @any-tdf/common into the framework package.`);
    }
    if (!manifest.files?.includes("source.css") || !manifest.exports?.["./source.css"]) {
      errors.push(`${path}: framework packages must publish a Tailwind source.css entry.`);
    }
  }

  if (manifest.name === "@any-tdf/common") {
    if (!manifest.files?.includes("source.css") || !manifest.exports?.["./source.css"]) {
      errors.push(`${path}: common must publish the Tailwind source.css entry.`);
    }
  }

  for (const [name, command] of Object.entries(manifest.scripts ?? {})) {
    if (/\bvp (?:check|fmt|lint)\b/.test(command)) {
      errors.push(`${path}: script ${name} must use the root Vite+ quality commands.`);
    }
  }

  inspectManifestDependencies(path, manifest);
}

const publishWorkflowPath = ".github/workflows/publish-npm.yml";
const publishWorkflow = await Bun.file(resolve(workspaceRoot, publishWorkflowPath)).text();
const ciWorkflowPath = ".github/workflows/ci.yml";
const ciWorkflow = await Bun.file(resolve(workspaceRoot, ciWorkflowPath)).text();
const requiredPublishWorkflowFragments = [
  "workflow_run:",
  "- CI",
  "github.event.workflow_run.conclusion == 'success'",
  "actions/download-artifact@v4",
  "name: npm-publish-metadata",
  "run-id: ${{ github.event.workflow_run.id }}",
  "BASE_SHA: ${{ steps.comparison.outputs.base-sha }}",
];
const requiredCiWorkflowFragments = [
  "BASE_SHA: ${{ github.event.before }}",
  "actions/upload-artifact@v4",
  "name: npm-publish-metadata",
];

for (const fragment of requiredPublishWorkflowFragments) {
  if (!publishWorkflow.includes(fragment)) {
    errors.push(`${publishWorkflowPath}: npm publishing must wait for CI and consume ${fragment}.`);
  }
}
for (const fragment of requiredCiWorkflowFragments) {
  if (!ciWorkflow.includes(fragment)) {
    errors.push(`${ciWorkflowPath}: CI must preserve npm publish metadata with ${fragment}.`);
  }
}

const sharedDevDependencies = new Map();
for (const { path, manifest } of [
  { path: "package.json", manifest: rootManifest },
  ...workspaces,
]) {
  for (const [dependencyName, version] of Object.entries(manifest.devDependencies ?? {})) {
    if (version.startsWith("workspace:")) continue;
    const consumers = sharedDevDependencies.get(dependencyName) ?? [];
    consumers.push({ path, version });
    sharedDevDependencies.set(dependencyName, consumers);
  }
}

for (const [dependencyName, consumers] of sharedDevDependencies) {
  if (consumers.length < 2 || consumers.every(({ version }) => version.startsWith("catalog:")))
    continue;
  errors.push(
    `Shared development dependency ${dependencyName} must use a root catalog: ${consumers.map(({ path, version }) => `${path}=${version}`).join(", ")}`,
  );
}

for (const { path, manifest } of workspaces) {
  const expectedProtocol = manifest.private === true ? "workspace:*" : "workspace:^";

  for (const section of [
    "dependencies",
    "devDependencies",
    "peerDependencies",
    "optionalDependencies",
  ]) {
    for (const [dependencyName, version] of Object.entries(manifest[section] ?? {})) {
      if (!names.has(dependencyName)) continue;
      if (version !== expectedProtocol) {
        errors.push(
          `${path}: ${section}.${dependencyName} must use ${expectedProtocol}, received ${version}`,
        );
      }
    }
  }
}

const lockGlob = new Bun.Glob("**/bun.lock{,b}");
const lockFiles = [];

for await (const path of lockGlob.scan({ cwd: workspaceRoot, onlyFiles: true })) {
  const normalizedPath = normalizePath(path);
  if (normalizedPath.includes("/node_modules/")) continue;
  lockFiles.push(normalizedPath);
}

lockFiles.sort();
if (lockFiles.length !== 1 || lockFiles[0] !== "bun.lock") {
  errors.push(`Expected only the root bun.lock, received: ${lockFiles.join(", ") || "none"}`);
}

await inspectTree(workspaceRoot, true);
await inspectViteConfigs();
await inspectTailwindTemplates();
await Promise.all(rootReadmePaths.map(inspectReadme));

for (const rootFile of [".gitignore", "LICENSE"]) {
  if (!(await Bun.file(resolve(workspaceRoot, rootFile)).exists())) errors.push(`Missing root ${rootFile}.`);
}

if (errors.length) {
  console.error(errors.map((error) => `FAIL ${error}`).join("\n"));
  process.exit(1);
}

console.log(
  `PASS monorepo structure (${workspaces.length} Workspaces, ${publicWorkspaceCount} public packages, ${rootReadmePaths.length} root README languages, ${catalogProtocols.size} catalog dependencies, ${lockFiles.length} lockfile)`,
);
