import { test, expect } from "@playwright/test";
import { modules } from "../scripts/course.mjs";
import { projectStages } from "../scripts/project.mjs";

test("sumário, busca sem acentos, filtros, progresso e retomada", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("[data-card]:visible")).toHaveCount(16);
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.locator("#module-search").fill("funcoes e escopo");
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
  const expected = modules.reduce(
    (total, module) =>
      total +
      module.sections.filter((section) => section.code).length +
      module.exercises.length,
    0,
  );
  expect(tested).toBe(expected);
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

// Resolve exemplos editoriais pelo título, sem depender de posições fixas após ampliações.
async function abrirSecao(page, numero, titulo) {
  const index = modules[numero - 1].sections.findIndex(
    (section) => section.title === titulo,
  );
  expect(index, `Seção existente: ${titulo}`).toBeGreaterThanOrEqual(0);
  const codeIndex = modules[numero - 1].sections
    .slice(0, index)
    .filter((section) => section.code).length;
  await page.goto(`/modulos/${String(numero).padStart(2, "0")}.html`);
  const example = page.locator(".code-example").nth(codeIndex);
  await example.locator(".run-button").click();
  return example.frameLocator("iframe");
}

test("DOM ampliado: coleções, atributos, estilos, navegação, movimento e templates", async ({
  page,
}) => {
  let frame = await abrirSecao(
    page,
    11,
    "Seletores específicos e coleções estáticas ou vivas",
  );
  await expect(frame.locator("#painel li")).toHaveCount(3);
  await expect(frame.locator("#console-output pre").nth(0)).toHaveText("2");
  await expect(frame.locator("#console-output pre").nth(1)).toHaveText("3");
  frame = await abrirSecao(page, 11, "Atributos, propriedades e data-*");
  await expect(frame.locator("#acao")).toBeEnabled();
  await expect(frame.locator("#acao")).toHaveAttribute(
    "aria-label",
    "Abrir detalhes do módulo",
  );
  await expect(frame.locator("#acao")).not.toHaveAttribute("title");
  await expect(frame.locator("#console-output")).toContainText("12");
  frame = await abrirSecao(page, 11, "Classes, estilos, visibilidade e foco");
  await expect(frame.locator("#mensagem")).toBeVisible();
  await expect(frame.locator("#mensagem")).toHaveClass("destaque");
  await expect(frame.locator("#mensagem")).toHaveCSS(
    "border-left-width",
    "4px",
  );
  frame = await abrirSecao(
    page,
    11,
    "Navegação: pais, filhos, irmãos e ancestrais",
  );
  await expect(frame.locator("#console-output pre")).toHaveText([
    "true",
    "true",
    "ARTICLE",
    "DOM",
    "DOM",
    "2",
  ]);
  frame = await abrirSecao(
    page,
    11,
    "Inserir, mover, substituir e remover nós",
  );
  await expect(frame.locator("#etapas li")).toHaveText([
    "Revisar",
    "Construir",
    "Compartilhar",
  ]);
  frame = await abrirSecao(page, 11, "Templates, clonagem e DocumentFragment");
  await expect(frame.locator("#cartoes strong")).toHaveText([
    "Atributos",
    "Árvore",
    "Templates",
  ]);
  await expect(frame.locator("#console-output")).toContainText(
    "Fragmento ficou vazio: true",
  );
});

test("delegação trata descendentes e itens futuros; abort remove listeners", async ({
  page,
}) => {
  let frame = await abrirSecao(
    page,
    12,
    "Propagação e delegação em listas dinâmicas",
  );
  await expect(frame.locator("#tarefas li")).toHaveCount(2);
  await frame.locator("#tarefas button span").click();
  await expect(frame.locator("#tarefas li")).toHaveCount(1);
  await frame.locator("#tarefas button").click();
  await expect(frame.locator("#tarefas li")).toHaveCount(0);
  frame = await abrirSecao(
    page,
    12,
    "Duração dos listeners: once, remoção e AbortController",
  );
  await frame.locator("#teste").click();
  await expect(frame.locator("#console-output pre")).toHaveCount(2);
  await frame.locator("#parar").click();
  await frame.locator("#teste").click();
  await expect(frame.locator("#console-output pre")).toHaveCount(3);
});

test("formulários ampliados: FormData repetido e validade entre campos", async ({
  page,
}) => {
  let frame = await abrirSecao(page, 13, "FormData, name e valores repetidos");
  await frame.locator("#aluno").fill("Lia");
  await frame.locator('input[value="Eventos"]').check();
  await frame.locator("#turno").selectOption("noite");
  await frame.getByRole("button", { name: "Ver dados" }).click();
  await expect(frame.locator("#console-output")).toContainText("Lia");
  await expect(frame.locator("#console-output")).toContainText('"DOM"');
  await expect(frame.locator("#console-output")).toContainText('"Eventos"');
  await expect(frame.locator("#console-output")).toContainText("noite");
  frame = await abrirSecao(page, 13, "Validação cruzada e setCustomValidity");
  await frame.locator("#senha").fill("123456");
  await frame.locator("#confirmar").fill("654321");
  await expect(frame.locator("#confirmar")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await frame.getByRole("button", { name: "Conferir" }).click();
  await expect(frame.locator("#retorno-senha")).toBeEmpty();
  await frame.locator("#confirmar").fill("123456");
  await expect(frame.locator("#confirmar")).toHaveAttribute(
    "aria-invalid",
    "false",
  );
  await frame.getByRole("button", { name: "Conferir" }).click();
  await expect(frame.locator("#retorno-senha")).toContainText(
    "nenhum dado foi enviado",
  );
});

test("assíncrono ampliado: ordem, HTTP, falhas parciais e cancelamento", async ({
  page,
}) => {
  let frame = await abrirSecao(
    page,
    15,
    "Ordem de execução: pilha, microtarefas e temporizadores",
  );
  await expect(frame.locator("#console-output pre")).toHaveText([
    "1. início",
    "2. fim do código síncrono",
    "3. microtarefa",
    "4. temporizador",
  ]);
  frame = await abrirSecao(
    page,
    15,
    "Sequência, concorrência e resultados parciais",
  );
  await expect(frame.locator("#console-output")).toContainText("fulfilled");
  await expect(frame.locator("#console-output")).toContainText("rejected");
  frame = await abrirSecao(page, 15, "Respostas HTTP e leitura de JSON");
  await expect(frame.locator("#console-output")).toContainText("Promises");
  await expect(frame.locator("#console-output")).toContainText(
    "Erro tratado: Falha HTTP: 503",
  );
  frame = await abrirSecao(
    page,
    15,
    "Cancelamento cooperativo e estado da interface",
  );
  await expect(frame.locator("#console-output")).toContainText(
    "Espera cancelada com segurança.",
  );
  await expect(frame.locator("#console-output")).toContainText(
    "Carregamento encerrado.",
  );
});

test("evolução do projeto filtra a visão sem apagar dados e restaura foco", async ({
  page,
}) => {
  const frame = await abrirSecao(
    page,
    16,
    "Filtro e busca são uma visão, não o banco de dados",
  );
  await expect(frame.locator("#lista-visivel li")).toHaveCount(3);
  await frame.locator("#filtro").selectOption("pendentes");
  await expect(frame.locator("#lista-visivel li")).toHaveCount(2);
  // The selected pending item disappears immediately; click rather than re-check a detached locator.
  await frame.locator("#lista-visivel input").first().click();
  await expect(frame.locator("#lista-visivel li")).toHaveCount(1);
  await expect(frame.locator("#filtro")).toBeFocused();
  await frame.locator("#busca-projeto").fill("json");
  await expect(frame.locator("#lista-visivel li")).toContainText("JSON");
  await frame.locator("#filtro").selectOption("concluidas");
  await expect(frame.locator("#lista-visivel li")).toHaveCount(0);
  await expect(frame.locator("#total-visivel")).toContainText("Nenhum assunto");
  await frame.locator("#busca-projeto").fill("");
  await frame.locator("#filtro").selectOption("todas");
  await expect(frame.locator("#lista-visivel li")).toHaveCount(3);
  await expect(frame.locator("#total-visivel")).toHaveText(
    "Exibindo 3 de 3 assuntos.",
  );
});

test("comandos ficam em negrito em todos os módulos e fora dos blocos executáveis", async ({
  page,
}) => {
  for (const [index, module] of modules.entries()) {
    await page.goto(`/modulos/${String(index + 1).padStart(2, "0")}.html`);
    const texts = [
      module.intro,
      ...module.objectives,
      ...module.sections.flatMap((section) => section.text),
      ...module.mistakes,
      ...module.practices,
      ...module.exercises.flatMap((exercise) => [
        exercise.prompt,
        exercise.hint,
      ]),
      ...module.summary,
      projectStages[index].explanation,
      ...projectStages[index].changes,
      projectStages[index].observe,
      projectStages[index].challenge,
      projectStages[index].expected,
    ];
    const expectedCount = texts.reduce(
      (total, text) => total + [...text.matchAll(/`([^`\n]+)`/g)].length,
      0,
    );
    await expect(page.locator(".language-command")).toHaveCount(expectedCount);
    expect(
      await page
        .locator(".language-command")
        .evaluateAll((elements) =>
          elements.every(
            (element) =>
              element.tagName === "STRONG" &&
              Number(getComputedStyle(element).fontWeight) >= 700,
          ),
        ),
    ).toBe(true);
    await expect(page.locator(".code-example strong")).toHaveCount(0);
    await expect(page.locator("iframe")).toHaveCount(0);
    expect(
      await page
        .locator(
          ".lesson-header > p, .lesson-article p, .lesson-article li, .exercise h3",
        )
        .evaluateAll((elements) =>
          elements.every((element) => !element.textContent.includes("`")),
        ),
    ).toBe(true);
  }
  await page.goto("/modulos/11.html");
  const index = modules[10].sections.findIndex(
    (section) => section.title === "Inserir, mover, substituir e remover nós",
  );
  await expect(
    page
      .locator(`#parte-${index + 1} > p`)
      .first()
      .locator("strong"),
  ).toHaveText(["append()", "prepend()", "before()", "after()"]);
});
