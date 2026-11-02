import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { readFile, access } from "node:fs/promises";
import path from "node:path";
import { projectStages } from "../scripts/project.mjs";
import { diffLines, projectSection } from "../scripts/project-render.mjs";
import { escapeHTML } from "../scripts/html.mjs";

test("16 etapas têm explicação original, trecho real e código válido", () => {
  assert.equal(projectStages.length, 16);
  for (const [index, stage] of projectStages.entries()) {
    assert.equal(stage.id, index + 1);
    for (const key of [
      "title",
      "before",
      "after",
      "explanation",
      "observe",
      "challenge",
      "expected",
      "focus",
    ])
      assert.ok(stage[key]);
    assert.ok(stage.changes.length >= 2);
    new vm.Script(stage.js, { filename: `etapa-${stage.id}.js` });
    assert.ok(
      stage.js.includes(stage.focus),
      `Trecho real da etapa ${stage.id}`,
    );
    assert.ok(stage.html.includes("Meu plano de estudos"));
    if (index) {
      assert.notEqual(stage.html, projectStages[index - 1].html);
      assert.notEqual(stage.js, projectStages[index - 1].js);
    }
  }
});

test("a progressão não antecipa manipulação DOM, eventos, persistência ou async", () => {
  for (const stage of projectStages.slice(0, 10)) {
    assert.ok(!stage.js.includes("document."));
    assert.ok(!stage.js.includes("localStorage"));
    assert.ok(stage.html.includes("HTML ainda é estático"));
  }
  assert.ok(projectStages[10].js.includes("document.createElement"));
  assert.ok(!projectStages[10].js.includes("addEventListener"));
  assert.ok(projectStages[11].js.includes("addEventListener"));
  assert.ok(!projectStages[11].html.includes("<form"));
  assert.ok(projectStages[12].html.includes("<form"));
  assert.ok(!projectStages[12].js.includes("localStorage."));
  assert.ok(projectStages[13].js.includes("JSON.parse"));
  assert.ok(!projectStages[13].js.includes("await "));
  assert.ok(projectStages[14].js.includes("await consultarSugestoes"));
  assert.ok(projectStages[15].js.includes("selecionarVisiveis"));
  assert.ok(projectStages[15].js.includes("editarForm.addEventListener"));
});

test("arquivos publicados são completos, copiáveis e não dependem da interface", async () => {
  for (const stage of projectStages) {
    const root = `projeto/${String(stage.id).padStart(2, "0")}`;
    assert.equal(await readFile(`${root}/index.html`, "utf8"), stage.html);
    assert.equal(await readFile(`${root}/app.js`, "utf8"), stage.js + "\n");
    assert.equal(await readFile(`${root}/estilo.css`, "utf8"), stage.css);
    assert.ok(!stage.js.includes("assets/app.js"));
    const ids = [...stage.html.matchAll(/\bid="([^"]+)"/g)].map(
      (match) => match[1],
    );
    assert.equal(new Set(ids).size, ids.length);
    for (const match of stage.html.matchAll(/(?:href|src)="([^"]+)"/g))
      await access(path.resolve(root, match[1]));
  }
});

test("comparação de linhas reconstrói as versões e não inventa diferenças", () => {
  for (const [index, stage] of projectStages.entries()) {
    for (const key of ["html", "css", "js"]) {
      const before = projectStages[index - 1]?.[key] || "";
      const lines = diffLines(before, stage[key]);
      assert.equal(
        lines
          .filter((line) => line.type !== "added")
          .map((line) => line.text)
          .join("\n"),
        before.trimEnd(),
      );
      assert.equal(
        lines
          .filter((line) => line.type !== "removed")
          .map((line) => line.text)
          .join("\n"),
        stage[key].trimEnd(),
      );
    }
  }
  assert.deepEqual(
    diffLines("a\nb\na", "a\nc\na").filter((line) => line.type !== "same"),
    [
      { type: "removed", text: "b" },
      { type: "added", text: "c" },
    ],
  );
});

test("as 16 integrações são inertes, escapam código e ligam todas as versões", async () => {
  const hub = await readFile("projeto/index.html", "utf8");
  assert.equal((hub.match(/class="project-roadmap-card"/g) || []).length, 16);
  for (const [index, stage] of projectStages.entries()) {
    const file = `modulos/${String(stage.id).padStart(2, "0")}.html`;
    const html = await readFile(file, "utf8");
    assert.ok(html.includes(projectSection(stage, projectStages[index - 1])));
    assert.ok(html.includes(escapeHTML(stage.html)));
    assert.ok(html.includes(escapeHTML(stage.js)));
    assert.equal((html.match(/<script\b/g) || []).length, 1);
    assert.ok(!html.includes("<iframe"));
    assert.equal(html.includes("<template data-project-previous"), index > 0);
    assert.ok(
      hub.includes(
        `href="../modulos/${String(stage.id).padStart(2, "0")}.html#pagina-em-evolucao"`,
      ),
    );
  }
});
