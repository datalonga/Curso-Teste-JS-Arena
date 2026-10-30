import http from "node:http";
import path from "node:path";
import { readFile, stat } from "node:fs/promises";
const root = process.cwd();
const port = Number(process.env.PORT || 3000);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
};
http
  .createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://local");
      const pathname = decodeURIComponent(url.pathname);
      const relative =
        pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
      // Serve only the static course, never build scripts, tests or repository metadata.
      if (!(
        relative === "index.html" ||
        /^(assets|modulos)\/[a-zA-Z0-9._-]+$/.test(relative)
      )) {
        res.writeHead(404);
        res.end("Página não encontrada.");
        return;
      }
      const file = path.join(root, relative);
      if (!(await stat(file)).isFile()) throw new Error("Not a file");
      res.writeHead(200, {
        "Content-Type": mime[path.extname(file)] || "application/octet-stream",
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "no-cache",
      });
      res.end(await readFile(file));
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Página não encontrada.");
    }
  })
  .listen(port, "0.0.0.0", () =>
    console.log(`Curso disponível na porta ${port}`),
  );
