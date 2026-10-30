import { defineConfig } from "@playwright/test";
import chromium from "@sparticuz/chromium";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
// The npm-distributed browser keeps tests usable in restricted Linux sandboxes.
// CHROMIUM_EXECUTABLE_PATH can select a locally installed browser instead.
const libraryPath = join(tmpdir(), "al2023", "lib");
if (process.platform === "linux" && !process.env.CHROMIUM_EXECUTABLE_PATH) {
  if (!existsSync(join(libraryPath, "libnspr4.so"))) {
    const target = join(tmpdir(), "al2023");
    mkdirSync(target, { recursive: true });
    execFileSync("tar", ["-x", "-C", target], {
      input: brotliDecompressSync(
        readFileSync(
          new URL(
            "./node_modules/@sparticuz/chromium/bin/al2023.tar.br",
            import.meta.url,
          ),
        ),
      ),
    });
  }
}

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.mjs",
  fullyParallel: false,
  workers: 1,
  timeout: 120000,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3000",
    viewport: { width: 1440, height: 1000 },
    launchOptions: {
      executablePath:
        process.env.CHROMIUM_EXECUTABLE_PATH ||
        (await chromium.executablePath()),
      args: [
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--use-gl=angle",
        "--use-angle=swiftshader",
        "--enable-unsafe-swiftshader",
      ],
      env: {
        ...process.env,
        LD_LIBRARY_PATH: [libraryPath, process.env.LD_LIBRARY_PATH]
          .filter(Boolean)
          .join(":"),
      },
      headless: true,
    },
  },
  webServer: {
    command: "node scripts/serve.mjs",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
  },
});
