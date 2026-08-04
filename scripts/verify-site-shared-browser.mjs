import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const targets = [
  {
    name: "STDF",
    baseUrl: process.env.STDF_SITE_VERIFY_BASE_URL || "http://127.0.0.1:17888",
  },
  {
    name: "RTDF",
    baseUrl: process.env.RTDF_SITE_VERIFY_BASE_URL || "http://127.0.0.1:15173",
  },
  {
    name: "VTDF",
    baseUrl: process.env.VTDF_SITE_VERIFY_BASE_URL || "http://127.0.0.1:15886",
  },
];
const debugPort = Number(process.env.SITE_SHARED_BROWSER_DEBUG_PORT || 9240);
const chromePath =
  process.env.CHROME_PATH ||
  [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].find((path) => existsSync(path));
const userDataDir = mkdtempSync(join(tmpdir(), "any-tdf-site-shared-browser-"));

if (!chromePath) {
  console.error(
    "Chrome or Chromium executable was not found. Set CHROME_PATH to run browser verification.",
  );
  process.exit(1);
}

const sleep = (milliseconds) =>
  new Promise((resolvePromise) => setTimeout(resolvePromise, milliseconds));

const chrome = Bun.spawn(
  [
    chromePath,
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-dev-shm-usage",
    "--window-size=390,844",
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${userDataDir}`,
    "about:blank",
  ],
  { stdout: "ignore", stderr: "ignore" },
);

let cleaned = false;
const cleanup = () => {
  if (cleaned) return;
  cleaned = true;
  chrome.kill();
  rmSync(userDataDir, { recursive: true, force: true });
};

process.on("exit", cleanup);
process.on("SIGINT", () => {
  cleanup();
  process.exit(130);
});

const waitForJson = async (url) => {
  let lastError = "";
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const response = await fetch(url).catch((error) => {
      lastError = error instanceof Error ? error.message : String(error);
      return undefined;
    });
    if (response?.ok) return response.json();
    await sleep(100);
  }
  throw new Error(`Unable to connect to Chrome DevTools: ${lastError}`);
};

class CDPClient {
  id = 0;
  pending = new Map();
  handlers = new Map();

  constructor(socket) {
    this.socket = socket;
    this.socket.onmessage = (event) => {
      const message = JSON.parse(String(event.data));
      if (!message.id) {
        if (message.method) {
          this.handlers
            .get(message.method)
            ?.forEach((handler) => handler(message.params));
        }
        return;
      }
      const pending = this.pending.get(message.id);
      if (!pending) return;
      this.pending.delete(message.id);
      if (message.error) {
        pending.reject(new Error(message.error.message));
        return;
      }
      pending.resolve(message.result);
    };
  }

  static create = async (webSocketDebuggerUrl) => {
    const socket = new WebSocket(webSocketDebuggerUrl);
    await new Promise((resolvePromise, reject) => {
      socket.onopen = () => resolvePromise();
      socket.onerror = () =>
        reject(new Error("Unable to open DevTools websocket"));
    });
    return new CDPClient(socket);
  };

  call = (method, params = {}) => {
    const id = (this.id += 1);
    this.socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolvePromise, reject) => {
      this.pending.set(id, { resolve: resolvePromise, reject });
    });
  };

  evaluate = async (expression) => {
    const result = await this.call("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    if (result.exceptionDetails) {
      throw new Error(
        `Browser evaluation failed: ${JSON.stringify(result.exceptionDetails)}`,
      );
    }
    return result.result.value;
  };

  on = (method, handler) => {
    const handlers = this.handlers.get(method) || [];
    handlers.push(handler);
    this.handlers.set(method, handlers);
  };

  close = () => this.socket.close();
}

await waitForJson(`http://127.0.0.1:${debugPort}/json/version`);
const targetResponse = await fetch(
  `http://127.0.0.1:${debugPort}/json/new?about:blank`,
  { method: "PUT" },
);
if (!targetResponse.ok) {
  throw new Error(
    `Unable to create Chrome page target: ${targetResponse.status}`,
  );
}
const target = await targetResponse.json();
const page = await CDPClient.create(target.webSocketDebuggerUrl);
await page.call("Runtime.enable");
await page.call("Page.enable");
await page.call("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 844,
  deviceScaleFactor: 3,
  mobile: true,
});

const browserErrors = [];
const baselineBrowserErrorMessages = [
  "width 或 height 小于 20 会使移动端点击困难！",
];
page.on("Runtime.exceptionThrown", (params) => {
  browserErrors.push(JSON.stringify(params));
});
page.on("Runtime.consoleAPICalled", (params) => {
  if (params?.type !== "error") return;
  const message =
    params.args
      ?.map((argument) => String(argument.value ?? argument.description ?? ""))
      .join(" ") || "console.error";
  if (
    baselineBrowserErrorMessages.some((baseline) => message.includes(baseline))
  ) {
    return;
  }
  browserErrors.push(message);
});

const runInPage = (body) =>
  page.evaluate(`(async () => {
    ${body}
  })()`);

const waitFor = async (predicate, label, timeout = 15000) => {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    if (await predicate().catch(() => false)) return;
    await sleep(100);
  }
  throw new Error(`Timed out waiting for ${label}`);
};

const goto = async (baseUrl) => {
  browserErrors.length = 0;
  const url = new URL("/components?nav=button&tab=0&lang=zh_CN", baseUrl);
  await page.call("Page.navigate", { url: "about:blank" });
  await waitFor(
    () =>
      runInPage(
        `return location.href === "about:blank" && document.readyState === "complete";`,
      ),
    `blank page before ${baseUrl}`,
  );

  const navigation = await page.call("Page.navigate", { url: url.toString() });
  if (navigation.errorText) {
    throw new Error(`Unable to navigate to ${url}: ${navigation.errorText}`);
  }
  try {
    await waitFor(
      () =>
        runInPage(`
          return location.origin === ${JSON.stringify(url.origin)} &&
            location.pathname === ${JSON.stringify(url.pathname)} &&
            document.readyState !== "loading" &&
            Boolean(document.querySelector(".site-mobile-menu-button"));
        `),
      `mobile header at ${baseUrl}`,
    );
  } catch (error) {
    const pageState = await runInPage(`
      return {
        href: location.href,
        readyState: document.readyState,
        title: document.title,
        body: document.body?.innerText.slice(0, 240) || ""
      };
    `).catch((stateError) => ({ stateError: String(stateError) }));
    throw new Error(
      `${error instanceof Error ? error.message : String(error)}; page state: ${JSON.stringify(pageState)}; browser errors: ${browserErrors.join(" | ") || "none"}`,
    );
  }
  await sleep(200);
};

const assertMobileNavigation = async (siteName) => {
  const menuButtonVisible = await runInPage(`
    const button = document.querySelector(".site-mobile-menu-button");
    const rect = button?.getBoundingClientRect();
    return Boolean(button && rect && rect.width > 0 && rect.height > 0);
  `);
  if (!menuButtonVisible) {
    throw new Error(`${siteName} mobile menu button is not visible.`);
  }

  await runInPage(`
    document.querySelector(".site-mobile-menu-button")?.click();
  `);
  await waitFor(
    () =>
      runInPage(`
        const navigation = document.querySelector(".site-mobile-menu-nav");
        const rect = navigation?.getBoundingClientRect();
        return Boolean(navigation && rect && rect.width > 0 && rect.height > 0);
      `),
    `${siteName} mobile navigation panel`,
  );

  const navigation = await runInPage(`
    const root = document.querySelector(".site-mobile-menu-nav");
    const paths = [...(root?.querySelectorAll("a") || [])]
      .map((link) => new URL(link.href, location.href).pathname);
    return {
      paths,
      hasThemeButton: [...(root?.querySelectorAll("button") || [])]
        .some((button) => /^(主题|Theme)/.test((button.textContent || "").trim()))
    };
  `);
  for (const expectedPath of ["/guide", "/components", "/generator"]) {
    if (!navigation.paths.includes(expectedPath)) {
      throw new Error(
        `${siteName} mobile navigation is missing ${expectedPath}.`,
      );
    }
  }
  if (!navigation.hasThemeButton) {
    throw new Error(
      `${siteName} mobile navigation is missing the theme action.`,
    );
  }
};

const assertMobileTheme = async (siteName) => {
  await runInPage(`
    const root = document.querySelector(".site-mobile-menu-nav");
    const button = [...(root?.querySelectorAll("button") || [])]
      .find((candidate) => /^(主题|Theme)/.test((candidate.textContent || "").trim()));
    button?.click();
  `);
  await waitFor(
    () =>
      runInPage(`
        return [...document.querySelectorAll("button")]
          .some((button) => /^(← 返回|← Back)$/.test((button.textContent || "").trim()));
      `),
    `${siteName} mobile theme panel`,
  );

  const clickedDarkMode = await runInPage(`
    const button = [...document.querySelectorAll("button")]
      .find((candidate) => /^(暗模式|Dark)$/.test(candidate.getAttribute("aria-label") || ""));
    button?.click();
    return Boolean(button);
  `);
  if (!clickedDarkMode) {
    throw new Error(`${siteName} mobile theme panel is missing dark mode.`);
  }
  await waitFor(
    () =>
      runInPage(
        `return document.documentElement.getAttribute("data-mode") === "dark";`,
      ),
    `${siteName} dark mode`,
  );
};

const assertMobileLanguageSwitch = async (siteName) => {
  await runInPage(`
    const button = [...document.querySelectorAll("button")]
      .find((candidate) => /^(← 返回|← Back)$/.test((candidate.textContent || "").trim()));
    button?.click();
  `);
  await waitFor(
    () =>
      runInPage(`
        const navigation = document.querySelector(".site-mobile-menu-nav");
        const hasBackButton = [...document.querySelectorAll("button")]
          .some((button) => /^(← 返回|← Back)$/.test((button.textContent || "").trim()));
        return Boolean(navigation) && !hasBackButton;
      `),
    `${siteName} mobile navigation return`,
  );
  await sleep(100);

  const clickedLanguage = await runInPage(`
    const root = document.querySelector(".site-mobile-menu-nav")?.parentElement;
    const button = [...(root?.querySelectorAll("button") || [])]
      .find((candidate) => /^(English|简体中文)$/.test((candidate.textContent || "").trim()));
    button?.click();
    return Boolean(button);
  `);
  if (!clickedLanguage) {
    throw new Error(
      `${siteName} mobile navigation is missing language switch.`,
    );
  }

  try {
    await waitFor(
      () =>
        runInPage(`
          const url = new URL(location.href);
          return document.readyState !== "loading" &&
            url.pathname === "/components" &&
            url.searchParams.get("nav") === "button" &&
            url.searchParams.get("tab") === "0" &&
            localStorage.getItem("lang") === "en_US" &&
            document.querySelector(".site-mobile-menu-button")
              ?.getAttribute("aria-label") === "Open navigation menu";
        `),
      `${siteName} language switch`,
    );
  } catch (error) {
    const href = await runInPage(`return location.href;`).catch(
      () => "unknown",
    );
    throw new Error(
      `${error instanceof Error ? error.message : String(error)}; current URL: ${href}`,
    );
  }
};

const failures = [];
for (const site of targets) {
  try {
    await goto(site.baseUrl);
    await assertMobileNavigation(site.name);
    await assertMobileTheme(site.name);
    await assertMobileLanguageSwitch(site.name);
    if (browserErrors.length > 0) {
      throw new Error(`Browser errors: ${browserErrors.join("\n")}`);
    }
    console.log(`PASS ${site.name} shared mobile navigation contract`);
  } catch (error) {
    failures.push({
      site: site.name,
      reason: error instanceof Error ? error.message : String(error),
    });
    console.log(`FAIL ${site.name} shared mobile navigation contract`);
  }
}

page.close();
cleanup();

console.log(
  JSON.stringify(
    {
      checked: targets.length,
      failedCount: failures.length,
      failures,
    },
    null,
    2,
  ),
);

if (failures.length > 0) process.exit(1);
