import { resolve } from "node:path";

const workspaceRoot = resolve(import.meta.dir, "..");
const sharedOnly = process.argv.includes("--shared-only");
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
    name: "@any-tdf/stdf-site",
    baseUrl: "http://127.0.0.1:17888",
    baseUrlEnvironmentName: "STDF_SITE_VERIFY_BASE_URL",
    previewCwd: workspaceRoot,
    previewCommand: [
      process.execPath,
      resolve(workspaceRoot, "scripts/serve-static.mjs"),
      resolve(workspaceRoot, "apps/stdf-site/build"),
      "17888",
    ],
  },
  {
    name: "@any-tdf/rtdf-site",
    baseUrl: "http://127.0.0.1:15173",
    baseUrlEnvironmentName: "RTDF_SITE_VERIFY_BASE_URL",
    previewCwd: resolve(workspaceRoot, "apps/rtdf-site"),
    previewCommand: createVitePreviewCommand("apps/rtdf-site", 15173),
  },
  {
    name: "@any-tdf/vtdf-site",
    baseUrl: "http://127.0.0.1:15886",
    baseUrlEnvironmentName: "VTDF_SITE_VERIFY_BASE_URL",
    previewCwd: resolve(workspaceRoot, "apps/vtdf-site"),
    previewCommand: createVitePreviewCommand("apps/vtdf-site", 15886),
  },
];

const sleep = (milliseconds) =>
  new Promise((resolvePromise) => setTimeout(resolvePromise, milliseconds));

const previews = targets.map((target) =>
  Bun.spawn(target.previewCommand, {
    cwd: target.previewCwd,
    stdout: "inherit",
    stderr: "inherit",
  }),
);

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
      throw new Error(
        `${target.name} preview exited with code ${preview.exitCode}.`,
      );
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

const runBrowserVerification = async (target) => {
  const verification = Bun.spawn(
    [process.execPath, "run", "--filter", target.name, "verify:browser"],
    {
      cwd: workspaceRoot,
      env: {
        ...process.env,
        [target.baseUrlEnvironmentName]: target.baseUrl,
      },
      stdout: "inherit",
      stderr: "inherit",
    },
  );
  const exitCode = await verification.exited;
  if (exitCode !== 0) {
    throw new Error(
      `${target.name} verify:browser failed with code ${exitCode}.`,
    );
  }
};

const runSharedBrowserVerification = async () => {
  const verification = Bun.spawn(
    [process.execPath, "run", "scripts/verify-site-shared-browser.mjs"],
    {
      cwd: workspaceRoot,
      env: targets.reduce(
        (environment, target) => ({
          ...environment,
          [target.baseUrlEnvironmentName]: target.baseUrl,
        }),
        { ...process.env },
      ),
      stdout: "inherit",
      stderr: "inherit",
    },
  );
  const exitCode = await verification.exited;
  if (exitCode !== 0) {
    throw new Error(
      `Shared site browser verification failed with code ${exitCode}.`,
    );
  }
};

const runUiParityVerification = async () => {
  const verification = Bun.spawn(
    [process.execPath, "run", "--filter", "@any-tdf/site-common", "verify:ui"],
    {
      cwd: workspaceRoot,
      env: targets.reduce(
        (environment, target) => ({
          ...environment,
          [target.baseUrlEnvironmentName]: target.baseUrl,
        }),
        { ...process.env },
      ),
      stdout: "inherit",
      stderr: "inherit",
    },
  );
  const exitCode = await verification.exited;
  if (exitCode !== 0) {
    throw new Error(`Site UI parity verification failed with code ${exitCode}.`);
  }
};

try {
  await Promise.all(
    targets.map((target, index) => waitForPreview(target, previews[index])),
  );

  if (!sharedOnly) {
    for (const target of targets) await runBrowserVerification(target);
  }
  await runSharedBrowserVerification();
  await runUiParityVerification();

  const stoppedPreview = targets.find(
    (target, index) => previews[index].exitCode !== null,
  );
  if (stoppedPreview) {
    throw new Error(
      `${stoppedPreview.name} preview stopped before verification completed.`,
    );
  }
} finally {
  cleanup();
  await Promise.all(
    previews.map((preview) => preview.exited.catch(() => undefined)),
  );
}
