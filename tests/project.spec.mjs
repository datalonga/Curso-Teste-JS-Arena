import { test, expect } from "@playwright/test";
import { projectStages } from "../scripts/project.mjs";
const pad = (number) => String(number).padStart(2, "0");
async function openStage(page, id) {
  await page.goto(`/modulos/${pad(id)}.html#pagina-em-evolucao`);
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.locator(".project-run").click();
  const frame = page.locator(".project-preview").frameLocator("iframe");
  await expect(frame.locator("main h1")).toHaveText("Meu plano de estudos");
  return frame;
}

test("sumário apresenta uma trilha completa e arquivos podem ser copiados e baixados", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.locator(".project-home-link a").click();
  await expect(page.locator(".project-roadmap-card")).toHaveCount(16);
  await expect(page.locator("iframe")).toHaveCount(0);
  await page
    .locator(".project-roadmap-card")
    .nth(10)
    .getByText("Estudar esta etapa")
    .click();
  await expect(page.locator("#project-title")).toHaveText(
    "Os dados passam a desenhar a página.",
  );
  await page.locator(".project-files > summary").click();
  await page.locator(".project-file > summary").nth(2).click();
  await page.locator('[data-project-copy="js"]').click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    projectStages[10].js,
  );
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.locator(".project-file").nth(2).getByText("Baixar arquivo").click(),
  ]);
  expect(download.suggestedFilename()).toBe("app.js");
  await expect(page.locator("iframe")).toHaveCount(0);
});

test("as 16 páginas independentes funcionam sem o JavaScript do curso", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const stage of projectStages) {
    await page.goto(`/projeto/${pad(stage.id)}/index.html`);
    await expect(page.locator("main h1")).toHaveText("Meu plano de estudos");
    if (stage.id >= 11)
      await expect(page.locator("#lista-estudos li")).toHaveCount(4);
    else
      await expect(page.locator("main")).toContainText("HTML ainda é estático");
    await expect(page.locator(".site-header")).toHaveCount(0);
  }
  expect(errors).toEqual([]);
});

test("as 16 prévias só executam por clique e não acessam a página principal", async ({
  page,
}) => {
  for (const stage of projectStages) {
    const frame = await openStage(page, stage.id);
    await expect(frame.locator("#console-output")).toBeAttached();
    await expect(frame.locator("#console-output .error")).toHaveCount(0);
    const iframe = page.locator(".project-preview iframe");
    await expect(iframe).toHaveAttribute(
      "sandbox",
      "allow-scripts allow-forms",
    );
    const child = await (await iframe.elementHandle()).contentFrame();
    expect(
      await child.evaluate(() => {
        try {
          return Boolean(parent.document.body);
        } catch {
          return false;
        }
      }),
    ).toBe(false);
    if (stage.id >= 14)
      await expect(frame.locator("#persistencia")).toContainText(
        "nesta sessão",
      );
    await page.locator(".project-close").click();
    await expect(page.locator("iframe")).toHaveCount(0);
    await expect(page.locator(".project-run")).toBeFocused();
  }
});

test("comparação mostra versões reais e independentes e pode ser reiniciada", async ({
  page,
}) => {
  await page.goto("/modulos/12.html#pagina-em-evolucao");
  await page.locator(".project-compare").click();
  await expect(page.locator(".project-preview iframe")).toHaveCount(2);
  const before = page
    .locator(".project-preview figure")
    .first()
    .frameLocator("iframe");
  const current = page
    .locator(".project-preview figure")
    .last()
    .frameLocator("iframe");
  await expect(before.locator("#lista-estudos input")).toHaveCount(0);
  await expect(current.locator("#lista-estudos input")).toHaveCount(4);
  await current.locator("#lista-estudos input").nth(2).click();
  await expect(current.locator("#concluidas")).toHaveText("2");
  await expect(before.locator("#concluidas")).toHaveText("1");
  await page.locator(".project-run").click();
  await expect(page.locator(".project-preview iframe")).toHaveCount(1);
  await expect(
    page
      .locator(".project-preview")
      .frameLocator("iframe")
      .locator("#concluidas"),
  ).toHaveText("1");
});

test("formulário valida espaços, preserva títulos como texto e exclui por ID", async ({
  page,
}) => {
  const frame = await openStage(page, 13);
  await frame.locator("#novo-assunto").fill("   ");
  await frame.locator("#novo-assunto").press("Enter");
  await expect(frame.locator("#lista-estudos li")).toHaveCount(4);
  await expect(frame.locator("#aviso")).toContainText("1 a 80");
  for (let i = 0; i < 2; i++) {
    await frame.locator("#novo-assunto").fill("<img src=x onerror=alert(1)>");
    await frame.locator("#novo-assunto").press("Enter");
  }
  await expect(frame.locator("#lista-estudos li")).toHaveCount(6);
  await expect(frame.locator("#lista-estudos img")).toHaveCount(0);
  await frame
    .getByRole("button", {
      name: "Excluir <img src=x onerror=alert(1)>",
      exact: true,
    })
    .first()
    .click();
  await expect(frame.locator("#lista-estudos li")).toHaveCount(5);
  await expect(frame.locator("#novo-assunto")).toBeFocused();
});

test("JSON persiste entre etapas sem tocar o progresso e trata dados corrompidos", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() =>
    localStorage.setItem("js-em-pratica:progresso:v1", "[3]"),
  );
  await page.goto("/projeto/14/index.html");
  await page.locator("#novo-assunto").fill("Estudo persistente");
  await page.locator("#novo-assunto").press("Enter");
  await expect(page.locator("#persistencia")).toHaveText(
    "Plano salvo neste navegador.",
  );
  await page.reload();
  await expect(page.locator("#lista-estudos li")).toHaveCount(5);
  await page.goto("/projeto/16/index.html");
  await expect(page.locator("#lista-estudos li")).toHaveCount(5);
  expect(
    await page.evaluate(() =>
      localStorage.getItem("js-em-pratica:progresso:v1"),
    ),
  ).toBe("[3]");
  await page.evaluate(() =>
    localStorage.setItem("js-em-pratica:projeto-evolutivo:v1", '{"itens":'),
  );
  await page.reload();
  await expect(page.locator("#lista-estudos li")).toHaveCount(4);
  await expect(page.locator("#persistencia")).toContainText(
    "Sem dados salvos válidos",
  );
});

test("sugestões têm espera, sucesso, rejeição, recuperação e não duplicam títulos", async ({
  page,
}) => {
  const frame = await openStage(page, 15);
  await frame.locator("#carregar").click();
  await expect(frame.locator("#carregar")).toBeDisabled();
  await expect(frame.locator("#carga")).toContainText("Carregando");
  await expect(frame.locator("#lista-estudos li")).toHaveCount(6);
  await expect(frame.locator("#carregar")).toBeEnabled();
  await frame.locator("#carregar").click();
  await expect(frame.locator("#carga")).toContainText("0 sugestão");
  await expect(frame.locator("#lista-estudos li")).toHaveCount(6);
  await frame.locator("#falhar").check();
  await frame.locator("#carregar").click();
  await expect(frame.locator("#carga")).toContainText("indisponível");
  await expect(frame.locator("#carregar")).toBeEnabled();
  await expect(frame.locator("#lista-estudos li")).toHaveCount(6);
  await expect(frame.locator("#console-output .error")).toHaveCount(0);
});

test("projeto final mantém o estado completo ao filtrar e permite editar e cancelar", async ({
  page,
}) => {
  const frame = await openStage(page, 16);
  await frame.locator("#filtro").selectOption("pendentes");
  await expect(frame.locator("#lista-estudos li")).toHaveCount(3);
  await frame.locator("#lista-estudos input").first().click();
  await expect(frame.locator("#lista-estudos li")).toHaveCount(2);
  await expect(frame.locator("#filtro")).toBeFocused();
  await expect(frame.locator("#concluidas")).toHaveText("2");
  await frame.locator("#busca").fill("dom");
  await expect(frame.locator("#lista-estudos li")).toHaveCount(1);
  await frame.getByRole("button", { name: "Editar DOM", exact: true }).click();
  await frame.locator("#editar-titulo").fill("DOM na prática");
  await frame.locator("#editar-titulo").press("Enter");
  await expect(frame.locator("#lista-estudos li")).toContainText(
    "DOM na prática",
  );
  await expect(frame.locator("#editar-form")).toBeHidden();
  await frame
    .getByRole("button", { name: "Editar DOM na prática", exact: true })
    .click();
  await frame.locator("#editar-titulo").fill("Não salvar");
  await frame.locator("#cancelar-edicao").click();
  await expect(frame.locator("#lista-estudos li")).toContainText(
    "DOM na prática",
  );
  await frame.locator("#busca").fill("");
  await frame.locator("#filtro").selectOption("todas");
  await expect(frame.locator("#lista-estudos li")).toHaveCount(4);
  await expect(frame.locator("#total")).toHaveText("4");
});

test("roadmap, arquivos e comparações cabem em telas pequenas e rotas privadas são bloqueadas", async ({
  page,
  request,
}) => {
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const url of [
      "/projeto/index.html",
      ...projectStages.map((stage) => `/projeto/${pad(stage.id)}/index.html`),
    ]) {
      await page.goto(url);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${url} em ${width}px`,
      ).toBe(true);
    }
    await openStage(page, 16);
    await page.locator(".project-compare").click();
    await page.locator(".project-files > summary").click();
    await page.locator(".project-file > summary").first().click();
    await page.locator(".project-differences > summary").click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  for (const url of [
    "/scripts/project.mjs",
    "/.git/HEAD",
    "/projeto/01/secret.txt",
  ])
    expect((await request.get(url)).status()).toBe(404);
});
