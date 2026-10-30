import { test, expect } from "@playwright/test";
import { modules } from "../scripts/course.mjs";

test("sumário, busca sem acentos, filtros, progresso e retomada", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("[data-card]:visible")).toHaveCount(16);
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.locator("#module-search").fill("funcoes");
  await expect(page.locator("[data-card]:visible")).toHaveCount(1);
  await page.locator("#module-search").fill("xxxxxx");
  await expect(page.locator(".no-results")).toBeVisible();
  await page.locator("#module-search").fill("");
  await page.locator('[data-filter="done"]').click();
  await expect(page.locator("[data-card]:visible")).toHaveCount(0);
  await page.goto("/modulos/03.html");
  await page.locator("[data-complete]").click();
  await expect(page.locator("[data-progress-count]")).toHaveText("1");
  await expect(page.locator("[data-progress-percent]")).toHaveText("6%");
  await page.reload();
  await expect(page.locator("[data-complete]")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.goto("/");
  await expect(page.locator('[data-card="3"]')).toHaveClass(/is-complete/);
  await expect(page.locator("[data-resume]")).toHaveAttribute(
    "href",
    "./modulos/01.html",
  );
  await page.locator('[data-filter="done"]').click();
  await expect(page.locator("[data-card]:visible")).toHaveCount(1);
  await page.goto("/modulos/03.html");
  await page.locator("[data-complete]").click();
  await expect(page.locator("[data-progress-count]")).toHaveText("0");
});

test("todos os exemplos e soluções rodam isoladamente, sem erros inesperados", async ({
  page,
}) => {
  const parentErrors = [];
  page.on("pageerror", (error) => parentErrors.push(error.message));
  let tested = 0;
  for (let i = 1; i <= modules.length; i++) {
    await page.goto(`/modulos/${String(i).padStart(2, "0")}.html`);
    await expect(page.locator("iframe")).toHaveCount(0);
    await page.locator("details.solution").evaluateAll((items) =>
      items.forEach((item) => {
        item.open = true;
      }),
    );
    const examples = page.locator(".code-example");
    for (let j = 0; j < (await examples.count()); j++) {
      const example = examples.nth(j);
      await example.locator(".run-button").click();
      const frame = example.frameLocator("iframe");
      await expect(frame.locator("#console-output")).toBeAttached();
      if (i === 15) await page.waitForTimeout(650);
      await expect(frame.locator("#console-output .error")).toHaveCount(0);
      await expect(example.locator("iframe")).toHaveAttribute(
        "sandbox",
        "allow-scripts allow-forms",
      );
      // A sandboxed example cannot read or modify the actual lesson.
      const child = await (
        await example.locator("iframe").elementHandle()
      ).contentFrame();
      expect(
        await child.evaluate(() => {
          try {
            return Boolean(parent.document.body);
          } catch {
            return false;
          }
        }),
      ).toBe(false);
      await example.locator(".clear-output").click();
      await expect(example.locator("iframe")).toHaveCount(0);
      tested++;
    }
  }
  expect(tested).toBeGreaterThanOrEqual(62);
  expect(parentErrors).toEqual([]);
});

test("eventos, formulário e projeto final interativos", async ({ page }) => {
  await page.goto("/modulos/12.html");
  await page.locator(".run-button").first().click();
  let frame = page.frameLocator("iframe").first();
  await frame.locator("#somar").click();
  await frame.locator("#somar").click();
  await expect(frame.locator("#contador")).toHaveText("2");
  await page.goto("/modulos/13.html");
  await page.locator(".run-button").nth(1).click();
  frame = page.frameLocator("iframe").first();
  await frame.locator("button").click();
  await expect(frame.locator("#resultado")).toHaveText(
    "Informe uma idade inteira entre 16 e 120.",
  );
  await frame.locator("#idade").fill("18");
  await frame.locator("#idade").press("Enter");
  await expect(frame.locator("#resultado")).toHaveText("Idade aceita!");
  await page.goto("/modulos/16.html");
  await page.locator(".run-button").first().click();
  frame = page.frameLocator("iframe").first();
  await frame.locator("#assunto").fill("   ");
  await frame.locator("#assunto").press("Enter");
  await expect(frame.locator("#assuntos li")).toHaveCount(0);
  await expect(frame.locator("#aviso")).toHaveText(
    "Informe um assunto de 1 a 80 caracteres.",
  );
  for (let i = 0; i < 2; i++) {
    await frame.locator("#assunto").fill("Revisar DOM");
    await frame.locator("#assunto").press("Enter");
  }
  await expect(frame.locator("#assuntos li")).toHaveCount(2);
  await frame.locator('input[type="checkbox"]').first().check();
  await expect(frame.locator("#pendencias")).toHaveText(
    "Assuntos pendentes: 1",
  );
  await frame
    .getByRole("button", { name: "Excluir Revisar DOM" })
    .first()
    .click();
  await expect(frame.locator("#assuntos li")).toHaveCount(1);
  await expect(frame.locator("#pendencias")).toHaveText(
    "Assuntos pendentes: 1",
  );
});

test("cópia usa apenas o conteúdo do bloco", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/modulos/11.html");
  await page.locator(".copy-button").first().click();
  await expect(page.locator(".copy-button").first()).toHaveText("Copiado ✓");
  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboard).toEqual(modules[10].sections[0].code);
  await expect(page.locator("iframe")).toHaveCount(0);
});

test("armazenamento indisponível não quebra a interface", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Blocked", "SecurityError");
      },
    });
  });
  await page.goto("/modulos/01.html");
  await page.locator("[data-complete]").click();
  await expect(page.locator("[data-progress-count]")).toHaveText("1");
  await expect(page.locator(".toast")).toContainText("Não foi possível salvar");
  await page.locator(".run-button").first().click();
  await expect(
    page.frameLocator("iframe").locator("#console-output"),
  ).toContainText("Total: R$ 36");
});

test("páginas sem transbordamento em desktop e celular, com navegação por teclado", async ({
  page,
}) => {
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (let i = 0; i <= 16; i++) {
      await page.goto(
        i === 0 ? "/" : `/modulos/${String(i).padStart(2, "0")}.html`,
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `module ${i}, width ${width}`,
      ).toBe(true);
    }
  }
  await page.locator(".menu-toggle").click();
  await expect(page.locator("#course-navigation")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#course-navigation")).toBeHidden();
  await expect(page.locator(".menu-toggle")).toBeFocused();
});

test("projeto persiste em uma página própria e se recupera de dados inválidos", async ({
  page,
}) => {
  const project = modules[15].sections[0];
  await page.route("**/projeto-teste", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Teste do projeto</title><body>${project.html}<script>${project.code}</script></body></html>`,
    }),
  );
  await page.goto("/projeto-teste");
  await page.locator("#assunto").fill("Estudar objetos");
  await page.locator("#assunto").press("Enter");
  await expect(page.locator("#aviso")).toHaveText(
    "Lista salva neste navegador.",
  );
  await page.reload();
  await expect(page.locator("#assuntos li")).toHaveCount(1);
  await page.locator('input[type="checkbox"]').check();
  await page.reload();
  await expect(page.locator('input[type="checkbox"]')).toBeChecked();
  await expect(page.locator("#pendencias")).toHaveText("Assuntos pendentes: 0");
  await page.evaluate(() =>
    localStorage.setItem("minha-lista-js:v1", "{inválido"),
  );
  await page.reload();
  await expect(page.locator("#assuntos li")).toHaveCount(0);
  await expect(page.locator("#aviso")).toContainText("Sem dados salvos");
  await page.locator("#assunto").fill("<img src=x onerror=alert(1)>");
  await page.locator("#assunto").press("Enter");
  await expect(page.locator("#assuntos img")).toHaveCount(0);
  await expect(page.locator("#assuntos span")).toHaveText(
    "<img src=x onerror=alert(1)>",
  );
});

test("progresso com formato inválido é recuperável e não executa conteúdo", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() =>
    localStorage.setItem("js-em-pratica:progresso:v1", "{inválido"),
  );
  await page.goto("/modulos/02.html");
  await expect(page.locator("[data-progress-count]")).toHaveText("0");
  await page.locator("[data-complete]").click();
  await page.reload();
  await expect(page.locator("[data-progress-count]")).toHaveText("1");
});

test("a demonstração assíncrona trata rejeição e finaliza a operação", async ({
  page,
}) => {
  await page.goto("/modulos/15.html");
  await page
    .locator(".lesson-code")
    .nth(1)
    .evaluate((code) => {
      code.textContent = code.textContent.replace(
        "await carregarPerfil(false)",
        "await carregarPerfil(true)",
      );
    });
  await page.locator(".run-button").nth(1).click();
  const output = page.frameLocator("iframe").locator("#console-output");
  await expect(output).toContainText("Não foi possível carregar o perfil.");
  await expect(output).toContainText("Consulta encerrada.");
});
