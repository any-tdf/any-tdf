import { resolve } from "node:path";

const workspaceRoot = resolve(import.meta.dir, "..");
const includeBrowser = process.argv.includes("--browser");
const createVitePreviewCommand = (workspace, port) => [
  resolve(workspaceRoot, workspace, "node_modules/.bin/vp"),
  "preview",
  "--host",
  "127.0.0.1",
  "--port",
  String(port),
  "--strictPort",
];
const targets = [
  {
    name: "@any-tdf/stdf-demo",
    baseUrl: "http://127.0.0.1:18888",
    baseUrlEnvironmentName: "STDF_VERIFY_BASE_URL",
    previewCwd: workspaceRoot,
    previewCommand: [
      process.execPath,
      resolve(workspaceRoot, "scripts/serve-static.mjs"),
      resolve(workspaceRoot, "apps/stdf-demo/build"),
      "18888",
    ],
  },
  {
    name: "@any-tdf/rtdf-demo",
    baseUrl: "http://127.0.0.1:14173",
    baseUrlEnvironmentName: "RTDF_VERIFY_BASE_URL",
    previewCwd: resolve(workspaceRoot, "apps/rtdf-demo"),
    previewCommand: createVitePreviewCommand("apps/rtdf-demo", 14173),
  },
  {
    name: "@any-tdf/vtdf-demo",
    baseUrl: "http://127.0.0.1:18886",
    baseUrlEnvironmentName: "VTDF_VERIFY_BASE_URL",
    previewCwd: resolve(workspaceRoot, "apps/vtdf-demo"),
    previewCommand: createVitePreviewCommand("apps/vtdf-demo", 18886),
  },
];

const sleep = (milliseconds) =>
  new Promise((resolvePromise) => setTimeout(resolvePromise, milliseconds));

const previews = targets.map((target) => {
  return Bun.spawn(target.previewCommand, {
    cwd: target.previewCwd,
    stdout: "inherit",
    stderr: "inherit",
  });
});

let cleaned = false;
const cleanup = () => {
  if (cleaned) return;
  cleaned = true;
  previews.forEach((preview) => preview.kill());
};

process.on("SIGINT", () => {
  cleanup();
  process.exit(130);
});
process.on("SIGTERM", () => {
  cleanup();
  process.exit(143);
});

const waitForPreview = async (target, preview) => {
  let lastError = "";
  await sleep(150);
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (preview.exitCode !== null) {
      throw new Error(`${target.name} preview exited with code ${preview.exitCode}.`);
    }
    const response = await fetch(target.baseUrl).catch((error) => {
      lastError = error instanceof Error ? error.message : String(error);
      return undefined;
    });
    if (response) return;
    await sleep(100);
  }
  throw new Error(`Timed out waiting for ${target.name} preview: ${lastError}`);
};

const runWorkspaceScript = async (target, script) => {
  const processResult = Bun.spawn([process.execPath, "run", "--filter", target.name, script], {
    cwd: workspaceRoot,
    env: {
      ...process.env,
      [target.baseUrlEnvironmentName]: target.baseUrl,
    },
    stdout: "inherit",
    stderr: "inherit",
  });
  const exitCode = await processResult.exited;
  if (exitCode !== 0) throw new Error(`${target.name} ${script} failed with code ${exitCode}.`);
};

try {
  await Promise.all(targets.map((target, index) => waitForPreview(target, previews[index])));

  for (const target of targets) {
    await runWorkspaceScript(target, "verify:routes");
    if (includeBrowser) await runWorkspaceScript(target, "verify:browser");
  }

  const stoppedPreview = targets.find((target, index) => previews[index].exitCode !== null);
  if (stoppedPreview)
    throw new Error(`${stoppedPreview.name} preview stopped before verification completed.`);
} finally {
  cleanup();
  await Promise.all(previews.map((preview) => preview.exited.catch(() => undefined)));
}
