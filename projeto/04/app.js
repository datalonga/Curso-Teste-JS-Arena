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
