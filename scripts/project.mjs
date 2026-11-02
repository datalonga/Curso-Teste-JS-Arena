// Uma mesma página, 16 versões reais. Os códigos abaixo são conteúdo didático.
// O gerador os grava em arquivos próprios; o curso só os executa após uma ação explícita.
export const projectCSS = `:root { font-family: Arial, sans-serif; color: #21343c; background: #f2f3eb; }
* { box-sizing: border-box; }
body { margin: 0; padding: 24px; }
main { max-width: 720px; margin: auto; background: white; padding: 28px; border: 1px solid #dce1d3; border-radius: 16px; }
h1 { font-size: 32px; letter-spacing: -1px; margin: 8px 0 12px; }
h2 { font-size: 18px; margin: 0 0 12px; }
p { line-height: 1.7; }
.etapa { color: #9e462b; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; }
.apoio { color: #526757; background: #f1f5e9; border-radius: 8px; padding: 12px; font-size: 13px; }
section { margin: 24px 0; }
.resumo { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.resumo div { padding: 14px; background: #f7f7f1; border: 1px solid #e3e6d9; border-radius: 8px; }
.resumo dt { font-size: 11px; color: #5c6b62; margin-bottom: 8px; }
.resumo dd { font-weight: bold; margin: 0; font-size: 18px; }
label { display: block; font-size: 13px; margin: 12px 0 6px; }
input:not([type=checkbox]), select { width: 100%; padding: 11px; border: 1px solid #b6c2b2; border-radius: 5px; font: inherit; background: white; }
button { border: 0; border-radius: 5px; padding: 10px 13px; margin: 10px 6px 0 0; background: #233b46; color: white; font: inherit; font-size: 12px; cursor: pointer; }
button:disabled { opacity: .55; cursor: wait; }
button.secundario { background: #e9eee1; color: #233b46; }
:focus-visible { outline: 3px solid #c75231; outline-offset: 3px; }
ul { list-style: none; padding: 0; }
li { border-bottom: 1px solid #e9ecdf; padding: 12px 0; overflow-wrap: anywhere; }
li label { display: inline-flex; align-items: center; gap: 9px; margin: 0 10px 0 0; }
input[type=checkbox]:checked + span { text-decoration: line-through; color: #687a64; }
li button { padding: 6px 9px; margin-top: 5px; }
progress { width: 100%; height: 9px; accent-color: #4c7352; }
#aviso, #persistencia, #carga { font-size: 12px; }
[hidden] { display: none !important; }
@media (max-width: 480px) { body { padding: 10px; } main { padding: 20px; } h1 { font-size: 27px; } .resumo { grid-template-columns: 1fr; } }
`;

const titles = ["Variáveis", "Funções", "DOM", "Eventos"];
const initialData = `[
  { id: "1", titulo: "Variáveis", concluida: true },
  { id: "2", titulo: "Funções", concluida: false },
  { id: "3", titulo: "DOM", concluida: false },
  { id: "4", titulo: "Eventos", concluida: false }
]`;
const fundamentals = [];
fundamentals[1] = `console.log("Minha página de estudos começou!");`;
fundamentals[2] = `// O HTML apresenta o plano. O JavaScript ainda escreve apenas no console.
${fundamentals[1]}
console.log("Vamos construir uma etapa de cada vez.");`;
fundamentals[3] = `${fundamentals[2]}

const aluno = "Lia";
const metaSemanal = 4;
let concluidas = 0;
concluidas += 1;
console.log(aluno, "concluiu", concluidas, "de", metaSemanal, "assuntos.");`;
fundamentals[4] = `${fundamentals[3]}

const entradaMinutos = "25";
const minutosPorAssunto = Number(entradaMinutos);
console.log("Minutos válidos:", Number.isFinite(minutosPorAssunto));
console.log("Tipo antes:", typeof entradaMinutos, "depois:", typeof minutosPorAssunto);`;
const calculation = `const totalMinutos = metaSemanal * minutosPorAssunto;
const percentual = Math.round((concluidas / metaSemanal) * 100);
console.log("Tempo planejado:", totalMinutos, "minutos. Progresso:", percentual + "%");`;
fundamentals[5] = `${fundamentals[4]}

${calculation}`;
fundamentals[6] = `${fundamentals[5]}

if (percentual === 100) {
  console.log("Meta concluída!");
} else if (percentual > 0) {
  console.log("Bom começo. Continue praticando!");
} else {
  console.log("Escolha o primeiro assunto.");
}
switch (metaSemanal) {
  case 4:
    console.log("Plano de quatro assuntos por semana.");
    break;
  default:
    console.log("Plano personalizado.");
}`;
const listCode = `const titulos = ["Variáveis", "Funções", "DOM", "Eventos"];
for (let indice = 0; indice < titulos.length; indice++) {
  console.log(indice + 1, titulos[indice]);
}`;
fundamentals[7] = `${fundamentals[6]}

${listCode}`;
const functions = `function calcularPercentual(feitas, total) {
  if (total === 0) return 0;
  return Math.round((feitas / total) * 100);
}
function formatarTempo(minutos) {
  return minutos + " min";
}
const totalMinutos = metaSemanal * minutosPorAssunto;
const percentual = calcularPercentual(concluidas, metaSemanal);
console.log("Tempo:", formatarTempo(totalMinutos), "Progresso:", percentual + "%");`;
fundamentals[8] = fundamentals[7].replace(calculation, functions);
fundamentals[9] = `${fundamentals[8]}

const pendentes = titulos.filter((titulo) => titulo !== "Variáveis");
const rotulos = pendentes.map((titulo) => "Revisar: " + titulo);
console.log(rotulos.join(" | "));
console.log("DOM está no plano:", titulos.includes("DOM"));`;
fundamentals[10] = fundamentals[9]
  .replace(
    'const titulos = ["Variáveis", "Funções", "DOM", "Eventos"];',
    `const assuntos = ${initialData};
const titulos = assuntos.map((assunto) => assunto.titulo);`,
  )
  .replace(
    'const pendentes = titulos.filter((titulo) => titulo !== "Variáveis");',
    "const pendentes = assuntos.filter((assunto) => !assunto.concluida).map((assunto) => assunto.titulo);",
  );

function interactiveJS(stage) {
  const hasEvents = stage >= 12;
  const hasForm = stage >= 13;
  const persists = stage >= 14;
  const hasAsync = stage >= 15;
  const final = stage === 16;
  return `// Mesmos dados das etapas anteriores. Agora a página reflete o estado.
const aluno = "Lia";
const minutosPorAssunto = Number("25");
let assuntos = ${initialData};
const lista = document.querySelector("#lista-estudos");
const aviso = document.querySelector("#aviso");
${
  persists
    ? `const chave = "js-em-pratica:projeto-evolutivo:v1";
const persistencia = document.querySelector("#persistencia");
try {
  const texto = localStorage.getItem(chave);
  if (texto !== null) {
    const dados = JSON.parse(texto);
    const validos = Array.isArray(dados) && dados.length <= 100 && dados.every((item, indice) =>
      item && typeof item.id === "string" && item.id.trim() !== "" &&
      typeof item.titulo === "string" && item.titulo.trim().length >= 1 && item.titulo.length <= 80 &&
      typeof item.concluida === "boolean" && dados.findIndex((outro) => outro?.id === item.id) === indice
    );
    if (!validos) throw new Error("Formato inválido");
    assuntos = dados.map(({ id, titulo, concluida }) => ({ id, titulo, concluida }));
  }
  persistencia.textContent = "Armazenamento disponível neste navegador.";
} catch (erro) {
  persistencia.textContent = "Sem dados salvos válidos. O plano continua funcionando nesta sessão.";
}
function salvar() {
  try {
    localStorage.setItem(chave, JSON.stringify(assuntos));
    persistencia.textContent = "Plano salvo neste navegador.";
  } catch (erro) {
    persistencia.textContent = "Não foi possível salvar. Alterações apenas nesta sessão.";
  }
}
`
    : ""
}${
    hasForm
      ? `let proximoId = 5;
function criarId() {
  while (assuntos.some((item) => item.id === String(proximoId))) proximoId++;
  return String(proximoId++);
}
const campo = document.querySelector("#novo-assunto");
`
      : ""
  }${
    final
      ? `const filtro = document.querySelector("#filtro");
const busca = document.querySelector("#busca");
const editarForm = document.querySelector("#editar-form");
const editarCampo = document.querySelector("#editar-titulo");
let idEmEdicao = null;
function selecionarVisiveis() {
  const termo = busca.value.trim().toLocaleLowerCase("pt-BR");
  return assuntos.filter((item) => {
    const corresponde = filtro.value === "todas"
      || (filtro.value === "concluidas" ? item.concluida : !item.concluida);
    return corresponde && item.titulo.toLocaleLowerCase("pt-BR").includes(termo);
  });
}
`
      : ""
  }
function calcularPercentual(feitas, total) {
  if (total === 0) return 0;
  return Math.round((feitas / total) * 100);
}
function atualizarResumo() {
  const feitas = assuntos.filter((item) => item.concluida).length;
  document.querySelector("#nome-aluno").textContent = aluno;
  document.querySelector("#total").textContent = String(assuntos.length);
  document.querySelector("#concluidas").textContent = String(feitas);
  document.querySelector("#tempo").textContent = assuntos.length * minutosPorAssunto + " min";
  document.querySelector("#progresso").value = calcularPercentual(feitas, assuntos.length);
}
${
  hasEvents
    ? `function registrarMudanca(mensagem, focoId = null) {
  ${persists ? "salvar();" : "// Persistência será acrescentada na etapa 14."}
  renderizar(focoId);
  aviso.textContent = mensagem;
}
`
    : ""
}function renderizar(focoId = null) {
  lista.replaceChildren();
  const visiveis = ${final ? "selecionarVisiveis()" : "assuntos"};
  for (const assunto of visiveis) {
    const item = document.createElement("li");
    const titulo = document.createElement("span");
    titulo.textContent = assunto.titulo;
    ${
      hasEvents
        ? `const rotulo = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.dataset.id = assunto.id;
    checkbox.checked = assunto.concluida;
    checkbox.addEventListener("change", () => {
      assunto.concluida = checkbox.checked;
      registrarMudanca("Conclusão atualizada.", assunto.id);
    });
    rotulo.append(checkbox, titulo);
    const excluir = document.createElement("button");
    excluir.type = "button";
    excluir.className = "secundario";
    excluir.textContent = "Excluir";
    excluir.setAttribute("aria-label", "Excluir " + assunto.titulo);
    excluir.addEventListener("click", () => {
      assuntos = assuntos.filter((outro) => outro.id !== assunto.id);
      ${final ? `if (idEmEdicao === assunto.id) cancelarEdicao();` : ""}
      registrarMudanca("Assunto excluído.");
      ${hasForm ? "campo.focus();" : "aviso.focus();"}
    });
    item.append(rotulo, excluir);${
      final
        ? `
    const editar = document.createElement("button");
    editar.type = "button";
    editar.className = "secundario";
    editar.textContent = "Editar";
    editar.setAttribute("aria-label", "Editar " + assunto.titulo);
    editar.addEventListener("click", () => {
      idEmEdicao = assunto.id;
      editarCampo.value = assunto.titulo;
      editarForm.hidden = false;
      editarCampo.focus();
    });
    item.append(editar);`
        : ""
    }`
        : `item.append(titulo, assunto.concluida ? " — concluído" : " — pendente");`
    }
    lista.append(item);
  }
  document.querySelector("#vazio").hidden = visiveis.length !== 0;
  atualizarResumo();
  ${
    hasEvents
      ? `if (focoId !== null) {
    const controle = Array.from(lista.querySelectorAll("input")).find((elemento) => elemento.dataset.id === focoId);
    (controle ?? ${final ? "filtro" : "aviso"}).focus();
  }`
      : ""
  }
}
${
  hasForm
    ? `
document.querySelector("#adicionar-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const titulo = campo.value.trim();
  if (titulo.length < 1 || titulo.length > 80 || assuntos.length >= 100) {
    aviso.textContent = "Use de 1 a 80 caracteres. O limite do plano é 100 assuntos.";
    campo.focus();
    return;
  }
  assuntos.push({ id: criarId(), titulo, concluida: false });
  campo.value = "";
  registrarMudanca("Assunto adicionado.");
  campo.focus();
});
`
    : ""
}${
    hasAsync
      ? `
function consultarSugestoes(deveFalhar) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (deveFalhar) reject(new Error("Consulta de demonstração indisponível. Tente novamente."));
      else resolve(["JSON", "Promises"]);
    }, 350);
  });
}
const carregar = document.querySelector("#carregar");
const carga = document.querySelector("#carga");
carregar.addEventListener("click", async () => {
  carregar.disabled = true;
  carga.textContent = "Carregando sugestões de uma consulta simulada...";
  try {
    const sugestoes = await consultarSugestoes(document.querySelector("#falhar").checked);
    let adicionadas = 0;
    for (const titulo of sugestoes) {
      if (assuntos.length < 100 && !assuntos.some((item) => item.titulo === titulo)) {
        assuntos.push({ id: criarId(), titulo, concluida: false });
        adicionadas++;
      }
    }
    registrarMudanca("Sugestões processadas.");
    carga.textContent = adicionadas + " sugestão(ões) adicionada(s). Sem duplicar títulos existentes.";
  } catch (erro) {
    carga.textContent = erro.message;
  } finally {
    carregar.disabled = false;
  }
});
`
      : ""
  }${
    final
      ? `
function cancelarEdicao() {
  idEmEdicao = null;
  editarForm.hidden = true;
}
document.querySelector("#cancelar-edicao").addEventListener("click", () => {
  cancelarEdicao();
  campo.focus();
});
editarForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titulo = editarCampo.value.trim();
  if (titulo.length < 1 || titulo.length > 80) {
    aviso.textContent = "A edição precisa de 1 a 80 caracteres.";
    editarCampo.focus();
    return;
  }
  assuntos = assuntos.map((item) => item.id === idEmEdicao ? { ...item, titulo } : item);
  cancelarEdicao();
  registrarMudanca("Assunto renomeado, mantendo sua conclusão e seu ID.");
  campo.focus();
});
filtro.addEventListener("change", () => renderizar());
busca.addEventListener("input", () => renderizar());
`
      : ""
  }
renderizar();
console.log("Etapa ${stage}: a lista vem dos dados, sem inserir HTML de usuários.");`;
}

function pageHTML(stage) {
  const label = String(stage).padStart(2, "0");
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Meu plano de estudos · Etapa ${label}</title>
  <link rel="stylesheet" href="estilo.css">
  <script src="app.js" defer></script>
</head>
<body>
  <main>
    <header>
      <p class="etapa">Meu primeiro projeto · Etapa ${label} de 16</p>
      <h1>Meu plano de estudos</h1>
      <p>Um lugar para organizar o que vou aprender com JavaScript.</p>
    </header>${
      stage >= 2
        ? `
    <!-- A estrutura HTML continua existindo quando o JavaScript não executa. -->
    <p class="apoio">Estudar um pouco, experimentar e revisar: esse é o plano.</p>`
        : ""
    }${
      stage >= 3
        ? `
    <p>Plano de <strong id="nome-aluno">Lia</strong> · ${stage < 11 ? "4 assuntos por semana." : "um assunto de cada vez."}</p>`
        : ""
    }${
      stage >= 4
        ? `
    <p>Estimativa por assunto: 25 minutos. ${stage < 11 ? "Por enquanto, este texto está escrito no HTML." : "Os totais abaixo são atualizados pelo JavaScript."}</p>`
        : ""
    }${
      stage >= 5
        ? `
    <dl class="resumo" aria-label="Resumo do plano">
      <div><dt>Assuntos</dt><dd id="total">4</dd></div>
      <div><dt>Concluídos</dt><dd id="concluidas">1</dd></div>
      <div><dt>Tempo planejado</dt><dd id="tempo">100 min</dd></div>
    </dl>`
        : ""
    }${
      stage >= 6
        ? `
    <p id="aviso" role="status" tabindex="-1">${stage < 11 ? "Bom começo. Continue praticando! (Texto inicial do HTML.)" : "O plano está pronto para estudar."}</p>`
        : ""
    }${
      stage >= 7
        ? `
    <section aria-labelledby="titulo-lista">
      <h2 id="titulo-lista">Minha lista de estudos</h2>
      <ul id="lista-estudos">${stage < 11 ? "\n" + titles.map((title, index) => "        <li>" + title + (stage >= 10 ? (index === 0 ? " — concluído" : " — pendente") : "") + "</li>").join("\n") + "\n      " : ""}</ul>${
        stage >= 11
          ? `
      <p id="vazio" hidden>Nenhum assunto corresponde a esta visão.</p>`
          : ""
      }
    </section>`
        : ""
    }${
      stage >= 8
        ? `
    <section aria-label="Conclusão do plano">
      <label for="progresso">Progresso de estudos</label>
      <progress id="progresso" value="25" max="100">25%</progress>
    </section>`
        : ""
    }${
      stage >= 9 && stage < 11
        ? `
    <p class="apoio">A seleção de pendentes e seus rótulos podem ser conferidos no console.</p>`
        : ""
    }${
      stage >= 13
        ? `
    <form id="adicionar-form" novalidate>
      <h2>Adicionar um assunto</h2>
      <label for="novo-assunto">O que você quer estudar?</label>
      <input id="novo-assunto" name="titulo" required maxlength="80" autocomplete="off" aria-describedby="aviso">
      <button type="submit">Adicionar</button>
    </form>`
        : ""
    }${
      stage >= 14
        ? `
    <p id="persistencia" role="status">Verificando armazenamento...</p>`
        : ""
    }${
      stage >= 15
        ? `
    <section aria-labelledby="titulo-sugestoes">
      <h2 id="titulo-sugestoes">Próximos assuntos</h2>
      <p>Consulta simulada, sem depender da internet.</p>
      <label><input id="falhar" type="checkbox"> Simular falha na consulta</label>
      <button id="carregar" type="button">Carregar sugestões</button>
      <p id="carga" role="status"></p>
    </section>`
        : ""
    }${
      stage === 16
        ? `
    <section aria-label="Busca e filtro">
      <label for="busca">Buscar por título</label>
      <input id="busca" type="search">
      <label for="filtro">Mostrar assuntos</label>
      <select id="filtro">
        <option value="todas">Todos</option>
        <option value="pendentes">Pendentes</option>
        <option value="concluidas">Concluídos</option>
      </select>
    </section>
    <form id="editar-form" hidden novalidate>
      <h2>Editar assunto</h2>
      <label for="editar-titulo">Novo título</label>
      <input id="editar-titulo" required maxlength="80" aria-describedby="aviso">
      <button type="submit">Salvar edição</button>
      <button id="cancelar-edicao" class="secundario" type="button">Cancelar</button>
    </form>`
        : ""
    }${
      stage < 11
        ? `
    <p class="apoio">Nesta etapa, o HTML ainda é estático. Abra o console ou use a prévia do curso para acompanhar o JavaScript. A ligação com o DOM começa na etapa 11.</p>`
        : ""
    }
  </main>
</body>
</html>
`;
}

const editorial = [
  {
    title: "A página nasce",
    before: "Ainda não temos uma página nem um programa.",
    after: "Um documento com título, apresentação e um script externo.",
    explanation:
      "O HTML define a estrutura do plano de estudos. O arquivo app.js executa no navegador e usa `console.log()` para confirmar que começou. O CSS já vem pronto e será mantido: o foco desta trilha é a evolução do JavaScript.",
    changes: [
      "Criamos index.html, estilo.css e app.js na mesma pasta.",
      "O atributo `defer` permite executar o script depois da leitura do documento.",
    ],
    observe:
      "Veja o título na página e a mensagem no console da prévia. São duas saídas diferentes, não uma alteração automática do HTML.",
    challenge: "Troque a mensagem de console.log por seu objetivo de estudo.",
    expected: "O título continua igual; apenas a mensagem de console muda.",
    focus: 'console.log("Minha página de estudos começou!");',
  },
  {
    title: "Uma estrutura que podemos ler",
    before: "O documento só apresenta o nome do projeto.",
    after:
      "Uma orientação de estudo aparece no HTML e o código ganha comentários.",
    explanation:
      "Acrescentamos uma frase de orientação à página e um comentário com `//` ao script. O comentário explica o papel do código, mas não aparece como uma mensagem executada. A marcação <!-- ... --> é comentário HTML, não comentário JavaScript.",
    changes: [
      "O HTML recebe um parágrafo de orientação.",
      "Duas instruções `console.log()` mostram a ordem de execução.",
    ],
    observe:
      "Compare as duas mensagens no console. O comentário não vira uma terceira mensagem.",
    challenge:
      "Adicione um comentário de bloco ao script explicando seu plano.",
    expected:
      "As mensagens de saída permanecem as mesmas; os comentários só ajudam a ler o código.",
    focus:
      "// O HTML apresenta o plano. O JavaScript ainda escreve apenas no console.",
  },
  {
    title: "O plano ganha dados",
    before: "Os textos estão fixos e não há valores nomeados no programa.",
    after: "Nome, meta semanal e quantidade concluída têm nomes no JavaScript.",
    explanation:
      "Usamos `const` para o nome e a meta e `let` para a quantidade que aumenta. A página mostra uma apresentação estática de Lia; ainda não estamos lendo nem alterando o DOM. O console deixa você acompanhar o estado do programa.",
    changes: [
      "O HTML passa a identificar de quem é o plano.",
      "O programa incrementa a quantidade concluída sem redeclarar a variável.",
    ],
    observe:
      "Encontre no console: Lia concluiu 1 de 4 assuntos. A variável muda com a atribuição, não por estar escrita na página.",
    challenge:
      "Aumente concluidas mais uma vez depois da primeira atualização.",
    expected:
      "O console deve informar 2 de 4; o HTML estático não é atualizado nesta etapa.",
    focus: "let concluidas = 0;\nconcluidas += 1;",
  },
  {
    title: "Textos viram números",
    before: "Só contamos assuntos.",
    after: "O plano também registra uma estimativa de minutos por assunto.",
    explanation:
      'O dado de entrada "25" é uma `string`. `Number()` converte esse texto para um `number`, que poderá participar dos cálculos. A estimativa apresentada no HTML ainda é conteúdo fixo, não um campo que o script lê.',
    changes: [
      "A estimativa aparece na página.",
      "O console compara os tipos antes e depois de converter e usa `Number.isFinite()`.",
    ],
    observe:
      'Procure "Tipo antes: string depois: number". Altere a entrada para "abc" e observe o resultado da verificação, sem considerar NaN como uma duração válida.',
    challenge: 'Experimente a entrada "30" e depois uma string vazia.',
    expected:
      '"30" vira 30; a string vazia vira 0, mostrando por que uma entrada vazia precisa de validação própria.',
    focus:
      'const entradaMinutos = "25";\nconst minutosPorAssunto = Number(entradaMinutos);',
  },
  {
    title: "Tempo e progresso calculados",
    before: "Temos duração, meta e quantidade concluída separados.",
    after: "O programa calcula tempo total e percentual de conclusão.",
    explanation:
      "A multiplicação combina quantidade e duração. A divisão e a multiplicação por 100 produzem o percentual, e `Math.round()` arredonda a apresentação. Os cartões do HTML usam os valores iniciais escritos manualmente; os cálculos são conferidos no console até a etapa do DOM.",
    changes: [
      "A página recebe três cartões de resumo.",
      "A expressão do progresso usa parênteses para deixar a ordem clara.",
    ],
    observe:
      "Com quatro assuntos de 25 minutos e um concluído, o console informa 100 minutos e 25%.",
    challenge: "Mude a meta para 5 e confira os dois cálculos.",
    expected:
      "O console deve mostrar 125 minutos e 20%. Os cartões continuam fixos nesta etapa.",
    focus: calculation,
  },
  {
    title: "Uma mensagem para cada situação",
    before: "O programa calcula resultados, mas não os classifica.",
    after: "O progresso decide a mensagem que o programa apresenta.",
    explanation:
      "`if`, `else if` e `else` separam nenhum progresso, algum progresso e meta concluída. `switch` compara a meta com casos conhecidos. A mensagem visível no HTML é a versão inicial de referência; as decisões reais aparecem no console.",
    changes: [
      "O HTML ganha uma área de status que será atualizada mais adiante.",
      "Condições escolhem uma mensagem sem executar todos os caminhos.",
    ],
    observe:
      'O console escolhe "Bom começo" para 25%. Não deve aparecer "Meta concluída" ao mesmo tempo.',
    challenge: "Faça concluidas chegar a 4 antes do cálculo do percentual.",
    expected: "O percentual vira 100 e o ramo de meta concluída é escolhido.",
    focus: 'if (percentual === 100) {\n  console.log("Meta concluída!");',
  },
  {
    title: "A lista entra no plano",
    before: "A meta é apenas um número sem os nomes dos assuntos.",
    after:
      "Uma lista de quatro assuntos aparece na página e é percorrida no programa.",
    explanation:
      "O array guarda os títulos em ordem. O laço `for` usa índices de zero até `length - 1` para numerar as saídas. O HTML ainda contém seus próprios itens; esta duplicação é temporária e será removida quando usarmos o DOM.",
    changes: [
      "A lista HTML apresenta Variáveis, Funções, DOM e Eventos.",
      "Um laço produz quatro linhas no console, sem repetir instruções manualmente.",
    ],
    observe:
      "A primeira posição é zero, mas a apresentação usa indice + 1 para mostrar 1 a 4.",
    challenge: 'Adicione "JSON" ao array do script.',
    expected:
      "O console passa a listar cinco títulos; a lista HTML só mudará automaticamente na etapa 11.",
    focus: listCode,
  },
  {
    title: "Cálculos reutilizáveis",
    before: "A conta do progresso está escrita diretamente no fluxo principal.",
    after: "Uma função calcula o progresso e outra formata a duração.",
    explanation:
      "Substituímos a fórmula solta por `calcularPercentual(feitas, total)`. O `return` entrega o resultado à chamada, e o caso total igual a zero evita uma divisão sem sentido para uma lista vazia. A página recebe uma barra de progresso com o valor inicial fixo.",
    changes: [
      "O script organiza o cálculo em funções pequenas.",
      "A barra HTML ajuda a visualizar o significado de 25%, ainda como marcação estática.",
    ],
    observe:
      "A função é chamada para calcular o mesmo resultado anterior: refatorar a organização não deveria mudar a regra.",
    challenge:
      "Chame calcularPercentual(0, 0) e calcularPercentual(2, 4) no final do script.",
    expected: "As chamadas retornam 0 e 50, respectivamente.",
    focus:
      "function calcularPercentual(feitas, total) {\n  if (total === 0) return 0;\n  return Math.round((feitas / total) * 100);\n}",
  },
  {
    title: "Uma visão dos pendentes",
    before: "O programa percorre toda a lista sem selecionar itens.",
    after: "Filtramos títulos e criamos rótulos para os estudos pendentes.",
    explanation:
      '`filter()` seleciona os títulos diferentes de "Variáveis", que está concluído neste conjunto inicial. `map()` transforma cada pendente em uma mensagem e `join()` combina as mensagens. Na próxima etapa a conclusão deixará de depender do texto do título.',
    changes: [
      "Um aviso na página orienta a conferir a seleção no console.",
      "As transformações criam novos arrays sem apagar o array de títulos.",
    ],
    observe:
      "O console reúne Funções, DOM e Eventos. A lista original permanece com quatro assuntos.",
    challenge:
      "Retorne somente títulos com mais de seis caracteres usando filter.",
    expected:
      "A seleção inclui Variáveis e Funções, sem modificar os títulos originais.",
    focus:
      'const pendentes = titulos.filter((titulo) => titulo !== "Variáveis");\nconst rotulos = pendentes.map((titulo) => "Revisar: " + titulo);',
  },
  {
    title: "Cada assunto tem identidade",
    before: "A conclusão é inferida comparando um título específico.",
    after: "Cada assunto possui ID, título e um booleano de conclusão.",
    explanation:
      "O array agora contém objetos. `assunto.concluida` informa o estado real, e `assunto.id` distingue itens mesmo que tenham títulos iguais. Mantemos a seleção por `filter()`, mas ela usa o booleano em vez de adivinhar pelo texto.",
    changes: [
      "O HTML inicial passa a mostrar os estados concluído e pendente.",
      "O modelo de dados que será usado até o final fica definido.",
    ],
    observe:
      "Mude concluida em um objeto e confira a seleção no console. Alterar só o título não deve decidir mais se ele está concluído.",
    challenge:
      "Renomeie o título Variáveis para outro nome, mantendo concluida: true.",
    expected:
      "Esse item continua fora dos pendentes porque a condição depende do booleano, não do título.",
    focus: `const assuntos = ${initialData};`,
  },
  {
    title: "Os dados passam a desenhar a página",
    before: "Há uma lista escrita no HTML e outra representada nos dados.",
    after: "O JavaScript monta a lista e atualiza os cartões e a barra.",
    explanation:
      "O HTML deixa o contêiner vazio. `querySelector()`, `createElement()`, `textContent` e `append()` conectam o estado ao documento. Consolidamos os cálculos das etapas anteriores em `atualizarResumo()` e a montagem em `renderizar()`.",
    changes: [
      "Não há mais quatro títulos duplicados no HTML.",
      "A lista e os totais passam a refletir o array de objetos. A interação chega na etapa seguinte.",
    ],
    observe:
      "Agora, mudar um título ou concluida no array realmente muda a página ao executá-la novamente.",
    challenge: "Adicione um quinto objeto com ID único ao array.",
    expected: "A lista mostra cinco itens e o tempo total passa a 125 minutos.",
    focus: "lista.replaceChildren();\n  const visiveis = assuntos;",
  },
  {
    title: "O plano responde às suas ações",
    before: "O programa só desenha o estado inicial.",
    after: "Checkboxes alteram a conclusão e botões excluem assuntos.",
    explanation:
      "`addEventListener()` reage a `change` e `click`. Primeiro atualizamos o estado, depois renderizamos novamente e recalculamos o resumo. Os IDs permitem excluir apenas o item acionado. A interface restaura o foco após a reconstrução dos controles.",
    changes: [
      "A conclusão passa a ser uma ação de verdade, não um texto estático.",
      "Excluir recalcula total, tempo e progresso. As alterações ainda só existem em memória.",
    ],
    observe:
      "Marque DOM e veja o total concluído aumentar. Exclua um item e confira o novo denominador do progresso.",
    challenge: "Conclua todos os assuntos e depois exclua todos.",
    expected:
      "A barra chega a 100%; com a lista vazia, ela volta para zero sem dividir por zero.",
    focus:
      'checkbox.addEventListener("change", () => {\n      assunto.concluida = checkbox.checked;\n      registrarMudanca("Conclusão atualizada.", assunto.id);\n    });',
  },
  {
    title: "Você escolhe o próximo assunto",
    before: "Só podemos alterar ou excluir os assuntos iniciais.",
    after: "Um formulário cadastra novos títulos com validação.",
    explanation:
      "O evento `submit` funciona por clique e por Enter. `preventDefault()` evita a navegação, `trim()` normaliza o título e uma validação limita a entrada a 1–80 caracteres e o plano a 100 itens. O ID é gerado separadamente do título.",
    changes: [
      "O formulário tem rótulo, campo e mensagem associada.",
      "São permitidos títulos repetidos com IDs diferentes, mas não títulos compostos só por espaços.",
    ],
    observe:
      "Adicione dois assuntos iguais e exclua só um. Digite espaços: a validação deve manter a lista inalterada.",
    challenge:
      'Tente adicionar "  Revisar DOM  " e confira o título resultante.',
    expected:
      'O título fica "Revisar DOM" sem os espaços externos; o campo recebe foco para uma nova entrada.',
    focus:
      "const titulo = campo.value.trim();\n  if (titulo.length < 1 || titulo.length > 80 || assuntos.length >= 100) {",
  },
  {
    title: "O plano lembra da sua visita",
    before: "Recarregar descarta as alterações em memória.",
    after:
      "A lista é serializada, validada e recuperada quando o armazenamento permite.",
    explanation:
      "`JSON.stringify()`, `JSON.parse()` e `localStorage` acrescentam persistência sem trocar a estrutura dos dados. A leitura verifica tipos, títulos, limite e IDs únicos. O `try...catch` mantém a aplicação utilizável mesmo quando salvar falha.",
    changes: [
      "As etapas 14, 15 e 16 compartilham apenas a chave do projeto, separada do progresso do curso.",
      "Na prévia isolada, o armazenamento é bloqueado. Abra a página em outra aba por HTTP/HTTPS para testar recarga real.",
    ],
    observe:
      "Na prévia, veja a mensagem de funcionamento apenas nesta sessão. Na página independente, adicione um item, recarregue e confira sua permanência.",
    challenge:
      "Abra a página independente, altere a conclusão de um assunto e recarregue.",
    expected:
      "O estado retorna quando o navegador permite armazenamento. Em caso de bloqueio, a mensagem deve explicar a limitação, sem quebrar a lista.",
    focus: "localStorage.setItem(chave, JSON.stringify(assuntos));",
  },
  {
    title: "Carregar também exige esperar",
    before: "Todos os dados são obtidos imediatamente.",
    after:
      "Uma consulta simulada traz sugestões com carregamento, sucesso e falha.",
    explanation:
      "Uma `Promise` simula o tempo de uma consulta com `setTimeout()`. O listener usa `async`, `await`, `try...catch` e `finally`: desabilita o botão durante a espera e o habilita mesmo após falha. Não usamos um servidor ou uma API fictícia.",
    changes: [
      "Um botão adiciona JSON e Promises como sugestões, sem duplicar títulos existentes.",
      "Uma opção permite testar rejeição de propósito e observar o caminho de recuperação.",
    ],
    observe:
      'Clique em carregar e note a espera. Ative "Simular falha" e repita: a lista permanece disponível e o botão volta a funcionar.',
    challenge: "Carregue duas vezes e depois simule uma falha.",
    expected:
      "A segunda consulta não duplica as sugestões. Na falha, aparece uma orientação e o botão é reabilitado.",
    focus:
      'const sugestoes = await consultarSugestoes(document.querySelector("#falhar").checked);',
  },
  {
    title: "Uma página completa, feita por você",
    before:
      "Já cadastramos, concluímos, excluímos, salvamos e carregamos dados.",
    after:
      "Busca, filtros e edição por ID conectam todas as ideias em um projeto final.",
    explanation:
      "`filter()` deriva uma visão sem apagar o estado completo. `map()` renomeia somente o ID em edição. `textContent` continua protegendo títulos como texto. A estrutura HTML, o CSS e o JavaScript permanecem separados em três arquivos que você pode copiar ou baixar.",
    changes: [
      "Busca e seleção de pendentes ou concluídos trabalham juntas.",
      "A edição preserva a conclusão e a identidade. Mensagens, foco e lista vazia completam o fluxo.",
    ],
    observe:
      "Filtre pendentes, conclua um item e observe que ele sai dessa visão sem ser apagado. Volte a Todos para encontrá-lo. Edite um de dois títulos iguais.",
    challenge:
      "Teste o fluxo completo por teclado: cadastrar, filtrar, editar, cancelar e carregar sugestões.",
    expected:
      "Os totais consideram todos os assuntos, não apenas a visão filtrada. As alterações persistem fora da prévia, se o armazenamento estiver disponível.",
    focus:
      'return corresponde && item.titulo.toLocaleLowerCase("pt-BR").includes(termo);',
  },
];

export const projectStages = editorial.map((stage, index) => ({
  ...stage,
  id: index + 1,
  html: pageHTML(index + 1),
  css: projectCSS,
  js: (index < 10 ? fundamentals[index + 1] : interactiveJS(index + 1))
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n"),
}));
