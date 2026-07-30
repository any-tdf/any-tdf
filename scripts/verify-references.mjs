import { stat } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

const workspaceRoot = resolve(import.meta.dir, "..");
const rootManifest = await Bun.file(resolve(workspaceRoot, "package.json")).json();
const workspacePatterns = rootManifest.workspaces?.packages ?? [];
const repositoryUrl = "git+https://github.com/any-tdf/any-tdf.git";
const legacyRepositories = [
  "stdf",
  "rtdf",
  "vtdf",
  "common",
  "site-common",
  "react-motion",
  "react-confetti",
  "vue-motion",
  "vue-confetti",
];
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
  "node_modules",
  "reports",
]);
const textExtensions = new Set([
  ".cjs",
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".scss",
  ".sh",
  ".svelte",
  ".ts",
  ".tsx",
  ".txt",
  ".vue",
  ".yaml",
  ".yml",
]);
const textFileNames = new Set([".gitignore", ".npmignore", ".npmrc", "LICENSE"]);
const errors = [];

const normalizePath = (path) => path.replaceAll("\\", "/");
const isIgnoredPath = (path) => path.split("/").some((part) => ignoredDirectories.has(part));
const isTextFile = (path) => {
  const fileName = path.slice(path.lastIndexOf("/") + 1);
  return textExtensions.has(extname(fileName)) || textFileNames.has(fileName);
};
const getLineNumber = (content, index) => content.slice(0, index).split("\n").length;

const collectWorkspaceManifests = async () => {
  const manifestPaths = new Set();

  for (const pattern of workspacePatterns) {
    const glob = new Bun.Glob(`${pattern}/package.json`);
    for await (const path of glob.scan({ cwd: workspaceRoot, onlyFiles: true })) {
      manifestPaths.add(normalizePath(path));
    }
  }

  return [...manifestPaths].sort();
};

const manifestPaths = await collectWorkspaceManifests();
const workspaces = await Promise.all(
  manifestPaths.map(async (path) => ({
    path,
    manifest: await Bun.file(resolve(workspaceRoot, path)).json(),
  })),
);
let repositoryManifestCount = 0;

for (const { path, manifest } of workspaces) {
  if (!manifest.repository) {
    errors.push(`${path}: repository metadata is required.`);
    continue;
  }
  repositoryManifestCount += 1;

  if (typeof manifest.repository !== "object") {
    errors.push(`${path}: repository must use the object form.`);
    continue;
  }

  if (manifest.repository.url !== repositoryUrl) {
    errors.push(`${path}: repository.url must be ${repositoryUrl}.`);
  }

  const expectedDirectory = normalizePath(dirname(path));
  if (manifest.repository.directory !== expectedDirectory) {
    errors.push(
      `${path}: repository.directory must be ${expectedDirectory}, received ${manifest.repository.directory ?? "none"}.`,
    );
  }
}

const frameworkPackagePaths = ["packages/stdf/package.json", "packages/rtdf/package.json", "packages/vtdf/package.json"];
const frameworkManifests = await Promise.all(
  frameworkPackagePaths.map((path) => Bun.file(resolve(workspaceRoot, path)).json()),
);
const frameworkVersions = new Set(frameworkManifests.map((manifest) => manifest.version));
if (frameworkVersions.size !== 1) {
  errors.push(
    `stdf, rtdf, and vtdf versions must match, received ${frameworkManifests.map(({ name, version }) => `${name}@${version}`).join(", ")}.`,
  );
}

const changesetConfig = await Bun.file(resolve(workspaceRoot, ".changeset/config.json")).json();
const synchronizedFrameworkPackages = ["stdf", "rtdf", "vtdf"];
const hasFixedFrameworkGroup = (changesetConfig.fixed ?? []).some(
  (group) =>
    group.length === synchronizedFrameworkPackages.length &&
    synchronizedFrameworkPackages.every((packageName) => group.includes(packageName)),
);
if (!hasFixedFrameworkGroup) {
  errors.push("Changesets must keep stdf, rtdf, and vtdf in one fixed version group.");
}

const commonManifest = await Bun.file(resolve(workspaceRoot, "packages/common/package.json")).json();
const fallbackVersionsUrl = pathToFileURL(
  resolve(workspaceRoot, "tooling/create-any-tdf/src/fallbackVersions.js"),
).href;
const { fallbackVersions } = await import(fallbackVersionsUrl);
if (fallbackVersions[commonManifest.name] !== commonManifest.version) {
  errors.push(
    `create-any-tdf fallback for ${commonManifest.name} must be ${commonManifest.version}, received ${fallbackVersions[commonManifest.name] ?? "none"}.`,
  );
}

const legacyRepositoryPattern = new RegExp(
  `https://github\\.com/any-tdf/(${legacyRepositories.join("|")})([^\\s\"'\x60)<\\]]*)`,
  "g",
);
const legacySshRepositoryPattern = new RegExp(
  `git@github\\.com:any-tdf/(${legacyRepositories.join("|")})\\.git`,
  "g",
);
const legacyStackBlitzPattern = new RegExp(
  "https://stackblitz\\.com/github/any-tdf/(?:demo-)?(?:stdf|rtdf|vtdf)(?=[/?#\\s\"'\x60)<\\]]|$)[^\\s\"'\x60)<\\]]*",
  "g",
);
const legacyRepositoryServicePattern = new RegExp(
  `https://(?:img\\.shields\\.io/github/[^\\s/\"']+/|contrib\\.nn\\.ci/api\\?repo=)any-tdf/(${legacyRepositories.join("|")})(?=[?&#\\s\"'\x60)<\\]]|$)[^\\s\"'\x60)<\\]]*`,
  "g",
);
const monorepoSourcePattern =
  /https:\/\/github\.com\/any-tdf\/any-tdf\/(blob|tree)\/main\/([^\s"'\x60)<\]]+)/g;
const monorepoStackBlitzPattern =
  /https:\/\/stackblitz\.com\/github\/any-tdf\/any-tdf[^\s"'\x60)<\]]*/g;
const allFilesGlob = new Bun.Glob("**/*");
let scannedFileCount = 0;
let validatedSourceLinkCount = 0;
let validatedStackBlitzLinkCount = 0;

for await (const path of allFilesGlob.scan({ cwd: workspaceRoot, onlyFiles: true })) {
  const normalizedPath = normalizePath(path);
  if (isIgnoredPath(normalizedPath) || !isTextFile(normalizedPath)) continue;

  const content = await Bun.file(resolve(workspaceRoot, normalizedPath)).text();
  scannedFileCount += 1;

  for (const match of content.matchAll(legacyRepositoryPattern)) {
    const url = new URL(match[0]);
    const repositoryName = match[1];
    const repositoryPath = url.pathname.slice(`/any-tdf/${repositoryName}`.length);
    if (/^\/(?:issues|pull)\/\d+(?:[/?#].*)?$/.test(repositoryPath)) continue;
    errors.push(
      `${normalizedPath}:${getLineNumber(content, match.index)} uses an active link to the legacy ${repositoryName} repository: ${match[0]}`,
    );
  }

  for (const match of content.matchAll(legacySshRepositoryPattern)) {
    errors.push(
      `${normalizedPath}:${getLineNumber(content, match.index)} uses the legacy ${match[1]} Git remote: ${match[0]}`,
    );
  }

  for (const match of content.matchAll(legacyStackBlitzPattern)) {
    errors.push(
      `${normalizedPath}:${getLineNumber(content, match.index)} uses a legacy StackBlitz repository: ${match[0]}`,
    );
  }

  for (const match of content.matchAll(legacyRepositoryServicePattern)) {
    errors.push(
      `${normalizedPath}:${getLineNumber(content, match.index)} uses a service tied to the legacy ${match[1]} repository: ${match[0]}`,
    );
  }

  for (const match of content.matchAll(monorepoSourcePattern)) {
    if (match[0].includes("${")) continue;

    const sourceUrl = new URL(match[0]);
    const sourcePath = decodeURIComponent(match[2]).replace(/[?#].*$/, "");
    const absoluteSourcePath = resolve(workspaceRoot, sourcePath);
    const isInsideWorkspace = absoluteSourcePath.startsWith(`${workspaceRoot}${sep}`);
    validatedSourceLinkCount += 1;

    if (!isInsideWorkspace) {
      errors.push(`${normalizedPath}:${getLineNumber(content, match.index)} links outside the monorepo: ${sourceUrl.href}`);
      continue;
    }

    try {
      const sourceStats = await stat(absoluteSourcePath);
      const hasExpectedType = match[1] === "blob" ? sourceStats.isFile() : sourceStats.isDirectory();
      if (!hasExpectedType) {
        errors.push(
          `${normalizedPath}:${getLineNumber(content, match.index)} uses ${match[1]} for the wrong target type: ${sourceUrl.href}`,
        );
      }
    } catch {
      errors.push(`${normalizedPath}:${getLineNumber(content, match.index)} links to a missing monorepo path: ${sourceUrl.href}`);
    }
  }

  for (const match of content.matchAll(monorepoStackBlitzPattern)) {
    const stackBlitzUrl = new URL(match[0]);
    const filePath = stackBlitzUrl.searchParams.get("file");
    const startScript = stackBlitzUrl.searchParams.get("startScript");
    validatedStackBlitzLinkCount += 1;

    if (filePath && !filePath.includes("${")) {
      const absoluteFilePath = resolve(workspaceRoot, filePath);
      if (!absoluteFilePath.startsWith(`${workspaceRoot}${sep}`) || !(await Bun.file(absoluteFilePath).exists())) {
        errors.push(
          `${normalizedPath}:${getLineNumber(content, match.index)} links StackBlitz to a missing file: ${filePath}`,
        );
      }
    }

    if (startScript && !rootManifest.scripts?.[startScript]) {
      errors.push(
        `${normalizedPath}:${getLineNumber(content, match.index)} uses a missing StackBlitz start script: ${startScript}`,
      );
    }
  }
}

if (errors.length) {
  console.error(errors.map((error) => `FAIL ${error}`).join("\n"));
  process.exit(1);
}

console.log(
  `PASS monorepo references (${workspaces.length} Workspaces, ${repositoryManifestCount} repository manifests, ${validatedSourceLinkCount} source links, ${validatedStackBlitzLinkCount} StackBlitz links, ${scannedFileCount} text files)`,
);
