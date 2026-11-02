// O HTML apresenta o plano. O JavaScript ainda escreve apenas no console.
console.log("Minha página de estudos começou!");
console.log("Vamos construir uma etapa de cada vez.");

const aluno = "Lia";
const metaSemanal = 4;
let concluidas = 0;
concluidas += 1;
console.log(aluno, "concluiu", concluidas, "de", metaSemanal, "assuntos.");

const entradaMinutos = "25";
const minutosPorAssunto = Number(entradaMinutos);
console.log("Minutos válidos:", Number.isFinite(minutosPorAssunto));
console.log("Tipo antes:", typeof entradaMinutos, "depois:", typeof minutosPorAssunto);

const totalMinutos = metaSemanal * minutosPorAssunto;
const percentual = Math.round((concluidas / metaSemanal) * 100);
console.log("Tempo planejado:", totalMinutos, "minutos. Progresso:", percentual + "%");

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
}
