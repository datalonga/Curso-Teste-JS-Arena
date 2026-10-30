import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import vm from "node:vm";
import path from "node:path";
import { modules } from "../scripts/course.mjs";
import { escapeHTML } from "../scripts/html.mjs";

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
      if (section.code) new vm.Script(section.code);
    }
    for (const exercise of m.exercises) {
      assert.ok(exercise.prompt && exercise.hint && exercise.solution);
      new vm.Script(exercise.solution);
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
    assert.ok(html.includes(escapeHTML(module.intro)));
    assert.ok(html.includes('id="objetivos"'));
    assert.ok(html.includes('id="exercicios"'));
    assert.ok(html.includes('id="resumo"'));
    for (const section of module.sections) {
      if (section.code) assert.ok(html.includes(escapeHTML(section.code)));
    }
  }
});
