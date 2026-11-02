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
  // Persistência será acrescentada na etapa 14.
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
      aviso.focus();
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

renderizar();
console.log("Etapa 12: a lista vem dos dados, sem inserir HTML de usuários.");
