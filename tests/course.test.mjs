import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import vm from "node:vm";
import path from "node:path";
import { modules } from "../scripts/course.mjs";
import {
  escapeHTML,
  formatLessonText,
  plainLessonText,
} from "../scripts/html.mjs";

test("16 módulos completos com progressão e exemplos sintaticamente válidos", () => {
  assert.equal(modules.length, 16);
  for (const [i, m] of modules.entries()) {
    for (const key of ["title", "intro", "group"])
      assert.ok(m[key], `Módulo ${i + 1}: ${key}`);
    for (const key of [
      "objectives",
      "sections",
      "mistakes",
      "practices",
      "exercises",
      "summary",
    ]) {
      assert.ok(m[key].length >= 2, `Módulo ${i + 1}: ${key}`);
    }
    assert.ok(m.sections.some((s) => s.code));
    for (const section of m.sections) {
      assert.ok(section.text.length >= 2);
      if (section.code)
        new vm.Script(section.code, {
          filename: `modulo-${i + 1}-${section.title}.js`,
        });
    }
    for (const exercise of m.exercises) {
      assert.ok(exercise.prompt && exercise.hint && exercise.solution);
      new vm.Script(exercise.solution, {
        filename: `modulo-${i + 1}-exercicio.js`,
      });
    }
  }
});

test("HTML escapa código e caracteres especiais", () => {
  assert.equal(
    escapeHTML("<script>\"x\" & 'y'</script>"),
    "&lt;script&gt;&quot;x&quot; &amp; &#39;y&#39;&lt;/script&gt;",
  );
});

test("páginas são independentes, contêm o conteúdo e têm links locais válidos", async () => {
  const files = [
    "index.html",
    ...modules.map((_, i) => `modulos/${String(i + 1).padStart(2, "0")}.html`),
  ];
  for (const file of files) {
    const html = await readFile(file, "utf8");
    assert.match(html, /<html lang="pt-BR">/);
    assert.match(html, /<main id="conteudo"/);
    assert.equal(
      (html.match(/<script\b/g) || []).length,
      1,
      `${file}: apenas script externo da interface`,
    );
    assert.match(
      html,
      /<script src="(?:\.\/|\.\.\/)assets\/app.js" defer><\/script>/,
    );
    for (const match of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)) {
      const target = match[1].split("#")[0];
      assert.ok(!target.includes("://"), `${file}: sem dependência de rede`);
      await access(path.resolve(path.dirname(file), target));
    }
  }
  for (const [i, module] of modules.entries()) {
    const html = await readFile(files[i + 1], "utf8");
    assert.ok(html.includes(formatLessonText(module.intro)));
    assert.ok(html.includes('id="objetivos"'));
    assert.ok(html.includes('id="exercicios"'));
    assert.ok(html.includes('id="resumo"'));
    for (const section of module.sections) {
      if (section.code) assert.ok(html.includes(escapeHTML(section.code)));
    }
  }
});

test("todos os módulos foram ampliados, incluindo objetivos, exercícios e revisão", () => {
  for (const [i, module] of modules.entries()) {
    assert.ok(
      module.sections.length >= 5,
      `Módulo ${i + 1}: pelo menos 5 seções`,
    );
    assert.ok(
      module.exercises.length >= 4,
      `Módulo ${i + 1}: pelo menos 4 exercícios`,
    );
    assert.ok(
      module.objectives.length >= 5,
      `Módulo ${i + 1}: objetivos ampliados`,
    );
    assert.ok(module.mistakes.length >= 4);
    assert.ok(module.practices.length >= 4);
    assert.ok(module.summary.length >= 6);
    assert.equal(
      new Set(module.sections.map((section) => section.title)).size,
      module.sections.length,
    );
  }
  assert.equal(modules[10].sections.length, 8);
  assert.equal(modules[10].exercises.length, 6);
  assert.equal(modules[15].exercises.length, 6);
});

test("DOM cobre operações além de selecionar e criar, sem execução automática", () => {
  const code = modules[10].sections
    .map((section) => section.code || "")
    .join("\n");
  for (const api of [
    "getElementById",
    "getElementsByClassName",
    "Array.from",
    "dataset",
    "setAttribute",
    "removeAttribute",
    "getComputedStyle",
    "getBoundingClientRect",
    "closest",
    "matches",
    "contains",
    "prepend",
    "after",
    "replaceWith",
    "remove",
    "cloneNode",
    "createDocumentFragment",
  ]) {
    assert.ok(code.includes(api), `DOM: exemplo de ${api}`);
  }
});

test("referências técnicas viram negrito seguro, sem interpretar HTML editorial", () => {
  assert.equal(
    formatLessonText("`append()` insere no fim e `prepend()` no começo."),
    '<strong class="language-command">append()</strong> insere no fim e <strong class="language-command">prepend()</strong> no começo.',
  );
  assert.equal(
    formatLessonText('`setAttribute("aria-label", "A&B")`'),
    '<strong class="language-command">setAttribute(&quot;aria-label&quot;, &quot;A&amp;B&quot;)</strong>',
  );
  assert.equal(
    formatLessonText('`<img src=x onerror="alert(1)">` <script>'),
    '<strong class="language-command">&lt;img src=x onerror=&quot;alert(1)&quot;&gt;</strong> &lt;script&gt;',
  );
  assert.equal(
    formatLessonText("2 ** 3 e uma `crase aberta"),
    "2 ** 3 e uma `crase aberta",
  );
  assert.equal(
    plainLessonText("Use `const` e `console.log()` com cuidado."),
    "Use const e console.log() com cuidado.",
  );
  assert.equal(
    plainLessonText("Texto sem marcações & sem mudanças."),
    "Texto sem marcações & sem mudanças.",
  );
});

test("os 16 módulos renderizam as marcações em todas as áreas de prosa, sem alterar os códigos", async () => {
  for (const [i, module] of modules.entries()) {
    const html = await readFile(
      `modulos/${String(i + 1).padStart(2, "0")}.html`,
      "utf8",
    );
    const prose = [
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
    ];
    assert.ok(
      prose.some((text) => text.includes("`")),
      `Módulo ${i + 1} tem referências técnicas`,
    );
    for (const text of prose) {
      assert.ok(
        html.includes(formatLessonText(text)),
        `Módulo ${i + 1}: prosa formatada: ${text}`,
      );
      assert.equal(
        (text.match(/`/g) || []).length % 2,
        0,
        `Módulo ${i + 1}: marcações balanceadas`,
      );
    }
    const description = html.match(
      /<meta name="description" content="([^"]*)"/,
    )[1];
    assert.equal(description, escapeHTML(plainLessonText(module.intro)));
    const codeBlocks = [
      ...html.matchAll(/<code class="lesson-(code|html)">([\s\S]*?)<\/code>/g),
    ];
    const expectedBlocks = [
      ...module.sections
        .filter((section) => section.code)
        .flatMap((section) => [
          section.code,
          ...(section.html ? [section.html] : []),
        ]),
      ...module.exercises.flatMap((exercise) => [
        exercise.solution,
        ...(exercise.html ? [exercise.html] : []),
      ]),
    ];
    assert.deepEqual(
      codeBlocks.map((match) => match[2]),
      expectedBlocks.map(escapeHTML),
    );
    assert.ok(codeBlocks.every((match) => !match[2].includes("<strong")));
  }
});

test("o trecho solicitado destaca métodos, sem destacar palavras comuns por engano", () => {
  const section = modules[10].sections.find(
    (section) => section.title === "Inserir, mover, substituir e remover nós",
  );
  for (const method of ["append()", "prepend()", "before()", "after()"]) {
    assert.ok(
      formatLessonText(section.text[0]).includes(
        `<strong class="language-command">${method}</strong>`,
      ),
    );
  }
  const text = modules[10].sections
    .flatMap((section) => section.text)
    .find((text) => text.startsWith("Use `Array.from()`"));
  assert.ok(text.includes("Se for remover"));
  assert.ok(!text.includes("Se `for` remover"));
});
