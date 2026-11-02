// Mesmos dados das etapas anteriores. Agora a página reflete o estado.
const aluno = "Lia";
const minutosPorAssunto = Number("25");
let assuntos = [
  { id: "1", titulo: "Variáveis", concluida: true },
  { id: "2", titulo: "Funções", concluida: false },
  { id: "3", titulo: "DOM", concluida: false },
  { id: "4", titulo: "Eventos", concluida: false }
];
const lista = document.querySelector("#lista-estudos");
const aviso = document.querySelector("#aviso");
const chave = "js-em-pratica:projeto-evolutivo:v1";
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
let proximoId = 5;
function criarId() {
  while (assuntos.some((item) => item.id === String(proximoId))) proximoId++;
  return String(proximoId++);
}
const campo = document.querySelector("#novo-assunto");

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
function registrarMudanca(mensagem, focoId = null) {
  salvar();
  renderizar(focoId);
  aviso.textContent = mensagem;
}
function renderizar(focoId = null) {
  lista.replaceChildren();
  const visiveis = assuntos;
  for (const assunto of visiveis) {
    const item = document.createElement("li");
    const titulo = document.createElement("span");
    titulo.textContent = assunto.titulo;
    const rotulo = document.createElement("label");
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

      registrarMudanca("Assunto excluído.");
      campo.focus();
    });
    item.append(rotulo, excluir);
    lista.append(item);
  }
  document.querySelector("#vazio").hidden = visiveis.length !== 0;
  atualizarResumo();
  if (focoId !== null) {
    const controle = Array.from(lista.querySelectorAll("input")).find((elemento) => elemento.dataset.id === focoId);
    (controle ?? aviso).focus();
  }
}

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

renderizar();
console.log("Etapa 14: a lista vem dos dados, sem inserir HTML de usuários.");
