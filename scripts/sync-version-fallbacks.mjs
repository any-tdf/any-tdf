import { resolve } from "node:path";

const workspaceRoot = resolve(import.meta.dir, "..");
const generatedFilePath = resolve(
  workspaceRoot,
  "packages/create-any-tdf/src/generatedVersions.js",
);
const commonManifest = await Bun.file(
  resolve(workspaceRoot, "packages/common/package.json"),
).json();
const expectedContent = `// 由 scripts/sync-version-fallbacks.mjs 生成，请勿直接修改。\nexport const commonFallbackVersion = '${commonManifest.version}';\n`;
const checkOnly = process.argv.includes("--check");

if (checkOnly) {
  const actualContent = await Bun.file(generatedFilePath).text();
  if (actualContent !== expectedContent) {
    console.error(
      `FAIL create-any-tdf common fallback must match ${commonManifest.name}@${commonManifest.version}.`,
    );
    process.exit(1);
  }

  console.log(
    `PASS create-any-tdf common fallback (${commonManifest.name}@${commonManifest.version})`,
  );
  process.exit(0);
}

await Bun.write(generatedFilePath, expectedContent);
console.log(
  `Synchronized create-any-tdf common fallback to ${commonManifest.name}@${commonManifest.version}.`,
);
