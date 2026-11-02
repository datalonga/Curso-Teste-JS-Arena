import { escapeHTML as e, formatLessonText as prose } from "./html.mjs";

// LCS linha a linha: a comparação é derivada dos arquivos reais, não uma descrição fictícia.
export function diffLines(before, after) {
  const oldLines = before ? before.trimEnd().split("\n") : [];
  const newLines = after ? after.trimEnd().split("\n") : [];
  const table = Array.from(
    { length: oldLines.length + 1 },
    () => new Uint16Array(newLines.length + 1),
  );
  for (let i = oldLines.length - 1; i >= 0; i--) {
    for (let j = newLines.length - 1; j >= 0; j--) {
      table[i][j] =
        oldLines[i] === newLines[j]
          ? table[i + 1][j + 1] + 1
          : Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }
  const result = [];
  let i = 0;
  let j = 0;
  while (i < oldLines.length || j < newLines.length) {
    if (
      i < oldLines.length &&
      j < newLines.length &&
      oldLines[i] === newLines[j]
    ) {
      result.push({ type: "same", text: oldLines[i++] });
      j++;
    } else if (
      i < oldLines.length &&
      (j === newLines.length || table[i + 1][j] >= table[i][j + 1])
    ) {
      result.push({ type: "removed", text: oldLines[i++] });
    } else {
      result.push({ type: "added", text: newLines[j++] });
    }
  }
  return result;
}
const pad = (value) => String(value).padStart(2, "0");
const files = [
  ["html", "index.html"],
  ["css", "estilo.css"],
  ["js", "app.js"],
];
const sourceCode = (stage) =>
  files
    .map(([key]) => `<code data-project-file="${key}">${e(stage[key])}</code>`)
    .join("");
function sourceFiles(stage) {
  return `<details class="project-files"><summary>Arquivos completos desta etapa <span aria-hidden="true">+</span></summary><p>Copie ou baixe os três arquivos na mesma pasta, com os nomes abaixo. Sirva a pasta por HTTP/HTTPS. Não misture arquivos de etapas diferentes.</p>${files.map(([key, name]) => `<details class="project-file"><summary>${e(name)} <span>${key.toUpperCase()}</span></summary><div class="project-file-actions"><button type="button" data-project-copy="${key}">Copiar ${e(name)}</button><a href="../projeto/${pad(stage.id)}/${name}" download="${name}">Baixar arquivo ↓</a></div><pre tabindex="0" aria-label="Código completo de ${e(name)}"><code class="project-code" data-project-file="${key}">${e(stage[key])}</code></pre></details>`).join("")}</details>`;
}
function diffMarkup(before, current) {
  return files
    .map(([key, name]) => {
      const lines = diffLines(before?.[key] || "", current[key]);
      const changed = lines.filter((line) => line.type !== "same");
      if (!changed.length)
        return `<p class="project-unchanged">${name}: sem alterações em relação à etapa anterior.</p>`;
      const visible = lines
        .map((line, i) => ({ ...line, i }))
        .filter(
          (line) =>
            line.type !== "same" ||
            lines
              .slice(Math.max(0, line.i - 1), line.i + 2)
              .some((other) => other.type !== "same"),
        );
      let previousIndex = -1;
      const markup = visible
        .map((line) => {
          const gap =
            previousIndex >= 0 && line.i > previousIndex + 1
              ? '<span class="diff-gap">  … linhas mantidas …</span>'
              : "";
          previousIndex = line.i;
          const prefix =
            line.type === "added" ? "+" : line.type === "removed" ? "−" : " ";
          return `${gap}<span class="diff-${line.type}">${prefix} ${e(line.text)}</span>`;
        })
        .join("");
      return `<h4>${name}</h4><pre class="project-diff" tabindex="0" aria-label="Diferenças em ${name}"><code>${markup}</code></pre>`;
    })
    .join("");
}

export function projectSection(stage, previous) {
  return `<section class="progressive-project" id="pagina-em-evolucao" data-project-stage="${stage.id}" aria-labelledby="project-title">
  <header class="project-heading"><span class="eyebrow">UMA PÁGINA. UM CONCEITO A MAIS.</span><span class="project-step">ETAPA ${pad(stage.id)} / 16</span><h2 id="project-title">${e(stage.title)}<span>.</span></h2><p>Estamos construindo o <strong>Meu plano de estudos</strong>. Esta é a mesma página da etapa anterior, com uma nova camada de aprendizado.</p></header>
  <div class="project-evolution"><div><span>ANTES</span><p>${e(stage.before)}</p></div><span class="evolution-arrow" aria-hidden="true">→</span><div><span>AGORA</span><p>${e(stage.after)}</p></div></div>
  <p class="project-explanation">${prose(stage.explanation)}</p>
  <h3>O que muda nesta etapa</h3><ul class="project-changes">${stage.changes.map((change) => `<li>${prose(change)}</li>`).join("")}</ul>
  <h3>Encontre no código</h3><pre class="project-focus" tabindex="0"><code>${e(stage.focus)}</code></pre>
  <div class="project-observe"><strong>Observe na página</strong><p>${prose(stage.observe)}</p></div>
  <div class="project-controls"><button class="button primary project-run" type="button">Ver página desta etapa <span aria-hidden="true">▷</span></button>${previous ? '<button class="project-compare" type="button">Comparar com a anterior</button>' : ""}<a href="../projeto/${pad(stage.id)}/index.html" target="_blank" rel="noopener">Abrir página independente ↗ <span class="sr-only">(nova aba)</span></a></div>
  <p class="project-preview-note">A prévia só executa após seu clique, em uma área isolada. Cada abertura começa uma nova simulação. ${stage.id < 11 ? "Até a etapa 10, o HTML é estático e os cálculos aparecem no console; a ligação real com a página começa na etapa 11." : stage.id >= 14 ? "O isolamento bloqueia localStorage. Para testar persistência real, use a página independente; ela não altera seu progresso no curso." : "As alterações da prévia ficam apenas em memória."}</p>
  <div class="project-preview" hidden><div class="project-preview-toolbar"><span role="status" class="project-preview-status"></span><button class="project-close" type="button">Fechar prévia</button></div><div class="project-preview-frames"></div></div>
  <details class="project-differences"><summary>${previous ? `O que foi alterado desde a etapa ${pad(previous.id)}?` : "Os primeiros arquivos, linha a linha"} <span aria-hidden="true">+</span></summary><p>Comparação gerada dos arquivos completos. + indica adição; − indica remoção. O contexto próximo é mantido para orientar a leitura.</p>${diffMarkup(previous, stage)}</details>
  ${sourceFiles(stage)}
  ${previous ? `<template data-project-previous data-stage="${previous.id}">${sourceCode(previous)}</template>` : ""}
  <div class="project-challenge"><strong>Experimente uma mudança</strong><p>${prose(stage.challenge)}</p><p>Para editar, copie os arquivos completos para uma pasta própria. A prévia é uma demonstração, não um editor.</p><details><summary>O que devo observar?</summary><p>${prose(stage.expected)}</p></details></div>
  <nav class="project-pagination" aria-label="Etapas do projeto">${previous ? `<a href="./${pad(previous.id)}.html#pagina-em-evolucao">← Etapa ${pad(previous.id)}</a>` : "<span>Você está no começo.</span>"}<a href="../projeto/index.html">Ver a evolução completa</a>${stage.id < 16 ? `<a href="./${pad(stage.id + 1)}.html#pagina-em-evolucao">Etapa ${pad(stage.id + 1)} →</a>` : "<span>Seu projeto está completo ✓</span>"}</nav>
  </section>`.replace(/^[ \t]+$/gm, "");
}

export function projectOverview(stages) {
  return `<div class="breadcrumb"><a href="../index.html">O curso</a><span>/</span><strong>Página em evolução</strong></div><header class="lesson-header"><span class="eyebrow">DO PRIMEIRO HTML AO PROJETO COMPLETO</span><h1>Uma página que cresce com você<span>.</span></h1><p>Em vez de recomeçar em exemplos desconectados, acompanhe a construção do <strong>Meu plano de estudos</strong>. Cada módulo acrescenta uma peça ao mesmo projeto, preservando as versões anteriores.</p><div class="lesson-badges"><span>16 versões executáveis</span><span>HTML + CSS + JavaScript</span><span>Arquivos completos e comparação</span></div></header><section class="project-roadmap-intro"><h2>Como estudar nesta trilha</h2><ol><li>Leia o assunto do módulo e a explicação da etapa.</li><li>Preveja o resultado; depois abra a página ou compare com a versão anterior.</li><li>Confira as alterações e copie os três arquivos se quiser experimentar uma mudança.</li></ol><p>O CSS de apoio já está pronto e permanece igual. Nas etapas 1–10, os cálculos usam o console e o HTML evolui como estrutura estática. Na etapa 11 conectamos o DOM; depois chegam interação, formulário, persistência e assincronia. As etapas 14–16 compartilham os dados do projeto quando abertas fora da prévia.</p><a class="button primary" href="../modulos/01.html#pagina-em-evolucao">Começar pela etapa 01 →</a></section><div class="project-roadmap">${stages.map((stage) => `<article class="project-roadmap-card"><span class="eyebrow">ETAPA ${pad(stage.id)}</span><h2>${e(stage.title)}</h2><p>${e(stage.after)}</p><div><a href="../modulos/${pad(stage.id)}.html#pagina-em-evolucao">Estudar esta etapa →</a><a href="./${pad(stage.id)}/index.html" target="_blank" rel="noopener" aria-label="Abrir página da etapa ${pad(stage.id)} em nova aba">Abrir página ↗</a></div></article>`).join("")}</div>`;
}
