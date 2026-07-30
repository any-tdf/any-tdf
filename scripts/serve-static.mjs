import { resolve, sep } from "node:path";

const directory = process.argv[2];
const port = Number(process.argv[3]);

if (!directory || !Number.isInteger(port)) {
  throw new Error("Usage: bun run scripts/serve-static.mjs <directory> <port>");
}

const root = resolve(directory);

const resolveFile = async (pathname) => {
  const decodedPath = decodeURIComponent(pathname);
  const relativePath = decodedPath.replace(/^\/+/, "");
  const candidates = decodedPath.endsWith("/")
    ? [`${relativePath}index.html`]
    : [relativePath, `${relativePath}.html`, `${relativePath}/index.html`];

  for (const candidate of candidates) {
    const filePath = resolve(root, candidate);
    if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) continue;
    const file = Bun.file(filePath);
    if (await file.exists()) return file;
  }

  const fallback = Bun.file(resolve(root, "404.html"));
  return (await fallback.exists()) ? fallback : undefined;
};

const server = Bun.serve({
  hostname: "127.0.0.1",
  port,
  fetch: async (request) => {
    const file = await resolveFile(new URL(request.url).pathname);
    return file ? new Response(file) : new Response("Not found", { status: 404 });
  },
});

console.log(`Serving ${root} at ${server.url}`);
