// Código de aula é sempre texto no HTML gerado, inclusive tags de script.
export const escapeHTML = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char],
  );

// Nas explicações, crases delimitam referências técnicas, não HTML confiável.
// Escape cada parte separadamente e emita somente a marcação de ênfase prevista.
// Não use esta função em atributos, metadados ou blocos de código.
export function formatLessonText(value) {
  const text = String(value);
  let html = "";
  let cursor = 0;
  for (const match of text.matchAll(/`([^`\n]+)`/g)) {
    html += escapeHTML(text.slice(cursor, match.index));
    html += `<strong class="language-command">${escapeHTML(match[1])}</strong>`;
    cursor = match.index + match[0].length;
  }
  return html + escapeHTML(text.slice(cursor));
}

// Metadados e busca usam o mesmo conteúdo, sem os delimitadores editoriais.
export const plainLessonText = (value) =>
  String(value).replace(/`([^`\n]+)`/g, "$1");
