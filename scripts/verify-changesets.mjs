import { readdir } from "node:fs/promises";
import { resolve } from "node:path";

const workspaceRoot = resolve(import.meta.dir, "..");
const changesetDirectory = resolve(workspaceRoot, ".changeset");

export const parseChangesetReleases = (source, filename = "changeset") => {
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!frontmatter) throw new Error(`${filename}: missing Changeset frontmatter.`);

  return frontmatter[1]
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const release = line.match(/^(?:"([^"]+)"|'([^']+)'|([^:]+)):\s*(major|minor|patch)$/);
      if (!release) throw new Error(`${filename}: invalid release entry: ${line}`);
      return { name: (release[1] ?? release[2] ?? release[3]).trim(), type: release[4] };
    });
};

export const findAlphaChangesetReleases = (changesets, versionsByName) =>
  changesets.flatMap(({ filename, releases }) =>
    releases.flatMap(({ name }) => {
      const version = versionsByName.get(name);
      return version?.includes("-alpha") ? [{ filename, name, version }] : [];
    }),
  );

const collectWorkspaceVersions = async () => {
  const rootManifest = await Bun.file(resolve(workspaceRoot, "package.json")).json();
  const versionsByName = new Map();

  for (const pattern of rootManifest.workspaces?.packages ?? []) {
    const glob = new Bun.Glob(`${pattern}/package.json`);
    for await (const path of glob.scan({ cwd: workspaceRoot, onlyFiles: true })) {
      const manifest = await Bun.file(resolve(workspaceRoot, path)).json();
      versionsByName.set(manifest.name, manifest.version);
    }
  }

  return versionsByName;
};

export const verifyChangesets = async () => {
  const filenames = (await readdir(changesetDirectory))
    .filter((filename) => filename.endsWith(".md") && filename !== "README.md")
    .sort();
  const changesets = await Promise.all(
    filenames.map(async (filename) => ({
      filename: `.changeset/${filename}`,
      releases: parseChangesetReleases(await Bun.file(resolve(changesetDirectory, filename)).text(), filename),
    })),
  );
  const alphaReleases = findAlphaChangesetReleases(changesets, await collectWorkspaceVersions());

  if (alphaReleases.length > 0) {
    for (const { filename, name, version } of alphaReleases) {
      console.error(`FAIL Alpha package must be versioned directly and omitted from Changesets: ${name}@${version} (${filename})`);
    }
    return false;
  }

  console.log(`PASS Changeset release policy (${filenames.length} pending)`);
  return true;
};

if (import.meta.main && !(await verifyChangesets())) process.exit(1);
