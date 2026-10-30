// Conteúdo editorial. Estes trechos são renderizados como texto, nunca importados como código executável.
export const modules = [
  {
    title: "Primeiros passos com JavaScript",
    short: "O que é programação e onde o JavaScript é executado",
    duration: 20,
    group: "Fundamentos",
    intro:
      "Programar é descrever uma sequência de instruções para resolver um problema. Com JavaScript, essas instruções podem transformar uma página estática em uma experiência interativa.",
    objectives: [
      "Entender o que um programa faz.",
      "Distinguir o navegador do ambiente Node.js.",
      "Executar suas primeiras instruções no console.",
    ],
    sections: [
      {
        title: "Uma instrução de cada vez",
        text: [
          "Pense em uma receita: você recebe ingredientes, segue etapas e obtém um resultado. Um programa também trabalha com entradas, processamento e saídas. A ordem das instruções importa.",
          "No exemplo, o programa calcula o preço de três cadernos. console.log() exibe uma informação no console; não é um comando para escrever diretamente na página. Clique em Executar para ver a saída.",
        ],
        code: `const preco = 12;
const quantidade = 3;
const total = preco * quantidade;
console.log("Total: R$", total);`,
      },
      {
        title: "Onde o código roda?",
        text: [
          "Nos navegadores, JavaScript pode acessar a página por meio do DOM e responder a cliques. Para experimentar fora deste curso, abra as ferramentas de desenvolvimento (F12 ou o menu Inspecionar) e procure a aba Console.",
          "JavaScript também roda fora do navegador, por exemplo no Node.js, muito usado em servidores. A linguagem é a mesma, mas os recursos do ambiente mudam: document pertence ao ambiente do navegador e não está disponível por padrão no Node.js.",
          "HTML descreve a estrutura; CSS cuida da apresentação; JavaScript implementa o comportamento. Aqui, o botão Executar cria uma página de teste isolada. Nada nos blocos de código roda apenas por você abrir o módulo.",
        ],
        code: `console.log("Olá, JavaScript!");
console.log("Esta mensagem é a saída de um programa.");`,
      },
    ],
    mistakes: [
      "Esperar que console.log() desenhe um texto na página.",
      "Confundir JavaScript com Java: são linguagens diferentes.",
    ],
    practices: [
      "Experimente uma mudança por vez e observe a saída.",
      "Leia as mensagens de erro: elas ajudam a localizar problemas.",
    ],
    exercises: [
      {
        prompt:
          "Mostre seu nome e o que você deseja criar com JavaScript, em duas mensagens.",
        hint: "Use duas chamadas de console.log() com textos entre aspas.",
        solution: `console.log("Meu nome é Ana.");
console.log("Quero criar um organizador de estudos.");`,
      },
      {
        prompt:
          "Calcule o preço de quatro ingressos de R$ 15 e mostre o total.",
        hint: "O símbolo * representa multiplicação.",
        solution: `const total = 4 * 15;
console.log(total); // 60`,
      },
    ],
    summary: [
      "Um programa é uma sequência de instruções que processa dados.",
      "JavaScript funciona em diferentes ambientes, com recursos próprios de cada um.",
      "O console é uma ferramenta para observar resultados e investigar erros.",
    ],
  },
  {
    title: "Sintaxe, instruções e comentários",
    short: "Aprenda a ler e escrever suas primeiras linhas",
    duration: 20,
    group: "Fundamentos",
    intro:
      "A sintaxe é o conjunto de regras usado para escrever código. Pequenos detalhes, como aspas e letras maiúsculas, fazem diferença para o interpretador.",
    objectives: [
      "Reconhecer instruções e blocos.",
      "Usar comentários de linha e de bloco.",
      "Identificar erros simples de sintaxe.",
    ],
    sections: [
      {
        title: "Escrevendo instruções legíveis",
        text: [
          "Uma instrução expressa uma ação. Neste curso, usamos ponto e vírgula no final das instruções. JavaScript pode inserir alguns automaticamente, mas escrever de forma consistente evita ambiguidades.",
          "Textos precisam de delimitadores: aspas simples, duplas ou crases. JavaScript diferencia maiúsculas de minúsculas: console.log existe, mas Console.log não é o mesmo identificador.",
        ],
        code: `console.log("Uma instrução");
console.log('Outra instrução');
console.log(10 + 5);`,
      },
      {
        title: "Comentários explicam a intenção",
        text: [
          "Use // para comentar até o fim da linha e /* ... */ para comentários em bloco. O interpretador ignora os comentários. Prefira explicar o motivo de uma decisão em vez de repetir o que o código já diz.",
          "Chaves { } delimitam blocos em estruturas como condicionais e funções. A indentação não define os blocos em JavaScript, mas torna a leitura muito mais fácil. Um erro de sintaxe impede que aquele script seja executado.",
        ],
        code: `// Reservamos dois lugares para a equipe de apoio.
const lugaresTotais = 20;
const lugaresDisponiveis = lugaresTotais - 2;

/* Esta mensagem ajuda a conferir
   o resultado do cálculo. */
console.log(lugaresDisponiveis);`,
      },
    ],
    mistakes: [
      "Esquecer de fechar aspas, parênteses ou chaves.",
      'Usar aspas tipográficas (“ ”) no lugar de aspas de código (" ").',
    ],
    practices: [
      "Mantenha um estilo de indentação consistente.",
      "Escreva comentários curtos sobre decisões importantes.",
    ],
    exercises: [
      {
        prompt: 'Corrija a instrução console.log("Estudando JavaScript);',
        hint: "O texto precisa de uma aspa de fechamento.",
        solution: `console.log("Estudando JavaScript");`,
      },
      {
        prompt:
          "Escreva um comentário explicando um cálculo de desconto de 10 em um preço de 80.",
        hint: "Comece o comentário com //.",
        solution: `// O cupom reduz o preço em dez reais.
console.log(80 - 10);`,
      },
    ],
    summary: [
      "A sintaxe organiza instruções, textos e blocos.",
      "Nomes diferenciam letras maiúsculas de minúsculas.",
      "Comentários documentam intenções e não são executados.",
    ],
  },
  {
    title: "Variáveis, constantes e escopo",
    short: "Guarde valores com let e const",
    duration: 25,
    group: "Fundamentos",
    intro:
      "Variáveis dão nome aos dados de um programa. Escolher bons nomes e limitar onde eles existem deixa o código mais fácil de entender.",
    objectives: [
      "Declarar valores com let e const.",
      "Entender a diferença entre atribuição e declaração.",
      "Reconhecer o escopo de bloco.",
    ],
    sections: [
      {
        title: "Um nome para cada valor",
        text: [
          "Use const quando não pretende reatribuir o valor. Use let quando o valor associado ao nome vai mudar. A declaração cria a variável; a atribuição, com =, associa um valor a ela.",
          "Uma const deve receber valor na declaração. Ela impede reatribuição, mas não torna arrays e objetos imutáveis; veremos isso nos módulos seguintes.",
        ],
        code: `const curso = "JavaScript";
let aulasConcluidas = 0;
aulasConcluidas = aulasConcluidas + 1;
console.log(curso);
console.log(aulasConcluidas);`,
      },
      {
        title: "O espaço em que um nome existe",
        text: [
          "let e const têm escopo de bloco: uma variável declarada dentro de { } só pode ser acessada naquele bloco e em seus blocos internos. O código interno pode acessar nomes do escopo externo.",
          "Declare antes de usar. A região anterior à declaração de let ou const no mesmo escopo é chamada de zona morta temporal; tentar acessar o valor ali causa ReferenceError.",
        ],
        code: `const mensagem = "Estou no escopo externo";
{
  const detalhe = "Estou dentro do bloco";
  console.log(mensagem);
  console.log(detalhe);
}
// detalhe não pode ser acessado aqui.
console.log(mensagem);`,
      },
    ],
    mistakes: [
      "Tentar reatribuir uma const: const pontos = 1; pontos = 2; causa erro.",
      "Declarar com let dentro de um bloco e tentar usar fora dele.",
    ],
    practices: [
      "Prefira const e use let quando houver reatribuição.",
      "Escolha nomes como precoTotal em vez de nomes vagos como x.",
    ],
    exercises: [
      {
        prompt:
          "Crie uma constante nome e uma variável pontos. Some 5 aos pontos e mostre ambos.",
        hint: "Somar e reatribuir pode ser escrito como pontos = pontos + 5.",
        solution: `const nome = "Lia";
let pontos = 10;
pontos = pontos + 5;
console.log(nome, pontos);`,
      },
      {
        prompt:
          "Crie uma variável dentro de um bloco e mostre seu valor ainda dentro dele.",
        hint: "Use chaves e mantenha console.log() entre elas.",
        solution: `{
  const cidade = "Castelo do Piauí";
  console.log(cidade);
}`,
      },
    ],
    summary: [
      "const impede reatribuição; let permite mudar o valor associado ao nome.",
      "let e const respeitam o escopo de bloco.",
      "Nomes claros e declarações próximas do uso facilitam a manutenção.",
    ],
  },
  {
    title: "Tipos de dados e conversões",
    short: "Textos, números, booleanos e ausência de valor",
    duration: 25,
    group: "Fundamentos",
    intro:
      "O tipo de um valor influencia o resultado de uma operação. Aprenda a reconhecer os tipos mais comuns e a converter dados de maneira explícita.",
    objectives: [
      "Identificar string, number, boolean, null e undefined.",
      "Investigar valores com typeof.",
      "Converter textos em números com atenção a entradas inválidas.",
    ],
    sections: [
      {
        title: "Que tipo de dado é esse?",
        text: [
          "Strings representam textos, numbers representam números e booleans representam verdadeiro ou falso. undefined costuma indicar um valor ainda não definido; null é usado para indicar uma ausência de forma intencional.",
          "Os tipos primitivos também incluem bigint e symbol, que não serão necessários nos nossos projetos. Arrays e objetos são valores do tipo objeto. A linguagem tem tipagem dinâmica: uma variável declarada com let pode receber valores de tipos diferentes.",
          'typeof ajuda a inspecionar tipos. Há uma particularidade histórica: typeof null resulta em "object". Isso não significa que null seja um objeto.',
        ],
        code: `console.log(typeof "Olá"); // string
console.log(typeof 42); // number
console.log(typeof true); // boolean
let apelido;
console.log(apelido); // undefined
console.log(typeof null); // object (particularidade histórica)`,
      },
      {
        title: "Converta antes de calcular",
        text: [
          "Valores lidos de campos de texto normalmente são strings. Number() converte um valor em número; String() converte em texto; Boolean() converte em booleano. Uma conversão numérica inválida produz NaN, que pode ser detectado com Number.isNaN().",
          'Atenção: Number("") e Number("   ") retornam 0. Valide se a entrada está vazia antes da conversão. Boolean("false") resulta em true porque é uma string não vazia. Os valores falsy incluem false, 0, -0, 0n, "", null, undefined e NaN.',
        ],
        code: `const entrada = "24";
const idade = Number(entrada);
console.log(idade + 1); // 25
console.log("24" + 1); // "241"
console.log(Number.isNaN(Number("vinte"))); // true
console.log(String(100)); // "100"
console.log(Boolean("false")); // true`,
      },
    ],
    mistakes: [
      "Somar uma string numérica a um número e esperar sempre uma soma aritmética.",
      "Usar valor === NaN para detectar NaN; essa comparação é sempre falsa.",
    ],
    practices: [
      "Converta entradas explicitamente antes de fazer contas.",
      "Verifique strings vazias e use Number.isFinite() para aceitar apenas números finitos.",
    ],
    exercises: [
      {
        prompt: 'Converta "19.90" em número, some 5 e mostre o resultado.',
        hint: "Use ponto como separador decimal na conversão com Number().",
        solution: `const preco = Number("19.90");
console.log(preco + 5); // 24.9`,
      },
      {
        prompt: 'Verifique se converter o texto "abc" gera NaN.',
        hint: "Combine Number() e Number.isNaN().",
        solution: `const numero = Number("abc");
console.log(Number.isNaN(numero)); // true`,
      },
    ],
    summary: [
      "Valores têm tipos; variáveis com let podem receber tipos diferentes.",
      "Conversões explícitas evitam resultados inesperados.",
      "NaN e entradas vazias precisam de verificação própria.",
    ],
  },
  {
    title: "Operadores e expressões",
    short: "Calcule, compare e combine condições",
    duration: 25,
    group: "Fundamentos",
    intro:
      "Uma expressão produz um valor. Operadores permitem construir expressões para fazer contas, comparar dados e tomar decisões.",
    objectives: [
      "Usar operadores aritméticos e de comparação.",
      "Combinar booleanos com &&, || e !.",
      "Compreender precedência e interpolação de texto.",
    ],
    sections: [
      {
        title: "Do cálculo à comparação",
        text: [
          "Os operadores +, -, *, / e ** fazem soma, subtração, multiplicação, divisão e potência. O operador % calcula o resto da divisão, útil para verificar se um número inteiro é par.",
          "Compare com === (igualdade estrita) e !== (diferença estrita), que não convertem os tipos dos operandos. >, >=, < e <= comparam ordens. Não confunda =, que atribui, com ===, que compara.",
          "Multiplicação e divisão têm precedência sobre soma e subtração. Use parênteses para deixar a intenção clara. Valores decimais usam ponto flutuante: algumas contas, como 0.1 + 0.2, não têm representação exata.",
        ],
        code: `console.log(2 + 3 * 4); // 14
console.log((2 + 3) * 4); // 20
console.log(10 % 2 === 0); // true
console.log(5 === "5"); // false
const preco = 12.5;
console.log(\`Preço: R$ \${preco.toFixed(2)}\`);`,
      },
      {
        title: "Condições que trabalham juntas",
        text: [
          "Com valores booleanos, && exige que ambos sejam verdadeiros; || exige pelo menos um verdadeiro; ! inverte o booleano. && e || fazem curto-circuito: o segundo operando só é avaliado se necessário e o resultado pode ser um dos valores originais, não necessariamente um booleano.",
          "Template literals usam crases e permitem inserir expressões com ${...}. Elas ajudam a montar mensagens sem várias concatenações.",
        ],
        code: `const idade = 20;
const temIngresso = true;
const podeEntrar = idade >= 18 && temIngresso;
console.log(\`Pode entrar: \${podeEntrar}\`);
console.log(!temIngresso); // false
console.log(false || true); // true`,
      },
    ],
    mistakes: [
      "Usar = quando a intenção era comparar.",
      "Esquecer que + também concatena strings.",
    ],
    practices: [
      "Prefira === e !== para comparações previsíveis.",
      "Use parênteses em expressões com várias operações.",
    ],
    exercises: [
      {
        prompt: "Calcule a média de três notas: 7, 8 e 9.",
        hint: "Some as notas entre parênteses antes de dividir.",
        solution: `const media = (7 + 8 + 9) / 3;
console.log(media); // 8`,
      },
      {
        prompt:
          "Verifique se uma pessoa de 17 anos pode participar de uma atividade que exige ao menos 16 anos e autorização.",
        hint: "Combine a comparação de idade com o booleano de autorização.",
        solution: `const idade = 17;
const temAutorizacao = true;
console.log(idade >= 16 && temAutorizacao); // true`,
      },
    ],
    summary: [
      "Expressões combinam valores e operadores para produzir resultados.",
      "=== compara sem converter tipos.",
      "Operadores lógicos combinam condições; parênteses esclarecem a ordem.",
    ],
  },
  {
    title: "Condicionais e decisões",
    short: "Escolha caminhos com if, else e switch",
    duration: 25,
    group: "Lógica e dados",
    intro:
      "Programas precisam reagir a situações diferentes. Condicionais escolhem quais instruções executar de acordo com uma condição.",
    objectives: [
      "Criar decisões com if e else.",
      "Encadear condições com else if.",
      "Escolher entre casos com switch.",
    ],
    sections: [
      {
        title: "Um caminho para cada situação",
        text: [
          "if executa um bloco quando a condição é truthy. else oferece uma alternativa. Use else if quando houver mais de duas possibilidades. A primeira condição satisfeita define o bloco executado naquela cadeia.",
          "Ordene condições do caso mais específico para o mais geral. Na classificação abaixo, testar a nota 6 antes da nota 9 faria uma nota excelente cair na categoria errada.",
        ],
        code: `const nota = 9;
if (nota >= 9) {
  console.log("Excelente!");
} else if (nota >= 6) {
  console.log("Aprovado.");
} else {
  console.log("Vamos revisar o conteúdo.");
}`,
      },
      {
        title: "Comparando um valor com várias opções",
        text: [
          "switch é útil quando um mesmo valor é comparado com vários casos. As comparações usam igualdade estrita. break encerra o switch e evita continuar pelos casos seguintes; default trata o valor que não correspondeu a nenhum caso.",
          "Para uma escolha pequena que precisa produzir um valor, existe o operador condicional: condição ? valorSeVerdadeiro : valorSeFalso. Evite encadear muitas escolhas assim, pois a leitura fica difícil.",
        ],
        code: `const dia = "sábado";
switch (dia) {
  case "sábado":
  case "domingo":
    console.log("Dia de revisar com calma.");
    break;
  default:
    console.log("Dia de uma aula curta.");
}
const mensagem = 18 >= 18 ? "Maior de idade" : "Menor de idade";
console.log(mensagem);`,
      },
    ],
    mistakes: [
      "Esquecer break sem querer em um switch.",
      "Usar uma condição geral antes de uma mais específica.",
    ],
    practices: [
      "Use chaves mesmo quando o bloco tem só uma instrução.",
      "Teste os limites: exatamente 6, menor que 6 e maior que 6.",
    ],
    exercises: [
      {
        prompt:
          'Mostre "Frete grátis" se o total for pelo menos 100; caso contrário, mostre "Frete: R$ 15".',
        hint: "Use if com >= e uma alternativa else.",
        solution: `const total = 80;
if (total >= 100) {
  console.log("Frete grátis");
} else {
  console.log("Frete: R$ 15");
}`,
      },
      {
        prompt:
          'Use switch para traduzir o estado "concluido" ou "pendente" em uma mensagem. Trate outros valores.',
        hint: "Inclua default para estados desconhecidos.",
        solution: `const estado = "concluido";
switch (estado) {
  case "concluido":
    console.log("Tudo pronto!");
    break;
  case "pendente":
    console.log("Ainda há trabalho.");
    break;
  default:
    console.log("Estado desconhecido.");
}`,
      },
    ],
    summary: [
      "if e else selecionam blocos conforme uma condição.",
      "else if permite testar alternativas em sequência.",
      "switch compara um valor com casos e usa break para interromper a execução.",
    ],
  },
  {
    title: "Laços de repetição",
    short: "Repita tarefas com for, while e for...of",
    duration: 30,
    group: "Lógica e dados",
    intro:
      "Laços evitam repetir instruções manualmente. Você define o que deve acontecer e quando a repetição deve terminar.",
    objectives: [
      "Controlar repetições com for e while.",
      "Percorrer valores com for...of.",
      "Evitar laços infinitos e erros de limite.",
    ],
    sections: [
      {
        title: "Contagem com começo, condição e passo",
        text: [
          "for reúne três partes: inicialização, condição de continuação e atualização. A condição é verificada antes de cada volta. Se ela for falsa desde o início, o bloco não roda.",
          "while repete enquanto sua condição for truthy. Garanta que algum estado mude para tornar a condição falsa. Um laço infinito pode travar a página; teste sempre com limites pequenos.",
        ],
        code: `for (let numero = 1; numero <= 3; numero++) {
  console.log("Volta", numero);
}

let saldo = 3;
while (saldo > 0) {
  console.log("Saldo:", saldo);
  saldo--;
}`,
      },
      {
        title: "Percorrendo uma coleção",
        text: [
          "for...of percorre os valores de uma coleção iterável, como um array ou uma string. Quando só precisa dos valores, ele evita gerenciar índices manualmente.",
          "break encerra o laço. continue pula o restante da volta atual e segue para a próxima. Use esses comandos com cuidado para manter o fluxo fácil de acompanhar.",
        ],
        code: `const assuntos = ["variáveis", "condições", "laços"];
for (const assunto of assuntos) {
  console.log("Revisar:", assunto);
}

for (let numero = 1; numero <= 5; numero++) {
  if (numero === 3) {
    continue;
  }
  console.log(numero); // 1, 2, 4, 5
}`,
      },
    ],
    mistakes: [
      "Esquecer de atualizar a variável de controle em while.",
      "Usar <= array.length ao percorrer índices: o último índice é length - 1.",
    ],
    practices: [
      "Defina uma condição de parada antes de escrever o laço.",
      "Prefira for...of quando não precisar do índice.",
    ],
    exercises: [
      {
        prompt: "Mostre os números pares de 2 até 10 usando for.",
        hint: "Aumente o contador de dois em dois com += 2.",
        solution: `for (let numero = 2; numero <= 10; numero += 2) {
  console.log(numero);
}`,
      },
      {
        prompt: "Some os valores do array [10, 20, 30] com for...of.",
        hint: "Crie um acumulador com let antes do laço.",
        solution: `let total = 0;
for (const valor of [10, 20, 30]) {
  total += valor;
}
console.log(total); // 60`,
      },
    ],
    summary: [
      "for é conveniente para repetições com contador.",
      "while repete de acordo com uma condição.",
      "for...of percorre valores; todo laço precisa de uma estratégia de término.",
    ],
  },
  {
    title: "Funções e escopo",
    short: "Transforme instruções em peças reutilizáveis",
    duration: 30,
    group: "Lógica e dados",
    intro:
      "Funções agrupam uma tarefa e permitem executá-la com entradas diferentes. Elas ajudam a dividir um problema grande em partes menores.",
    objectives: [
      "Declarar e chamar funções com parâmetros.",
      "Distinguir retorno de impressão no console.",
      "Usar funções de seta e compreender o escopo local.",
    ],
    sections: [
      {
        title: "Entradas, processamento e retorno",
        text: [
          "Parâmetros são os nomes das entradas na definição; argumentos são os valores passados na chamada. return encerra a execução da função e entrega um valor a quem chamou.",
          "console.log() apenas exibe algo. Uma função sem return explícito retorna undefined. Variáveis declaradas dentro da função ficam no seu escopo local e não podem ser acessadas diretamente de fora.",
        ],
        code: `function calcularTotal(preco, quantidade) {
  const total = preco * quantidade;
  return total;
}
const compra = calcularTotal(15, 3);
console.log(compra); // 45
console.log(calcularTotal(8, 2)); // 16`,
      },
      {
        title: "Outras formas de escrever uma função",
        text: [
          "Uma função também pode ser atribuída a uma constante. Arrow functions usam =>. Se o corpo é uma única expressão, o retorno pode ser implícito. Com chaves, escreva return quando precisar retornar um valor.",
          "Parâmetros podem ter valores padrão, usados quando o argumento é omitido ou undefined. Funções de seta não têm seu próprio this; por enquanto, usaremos funções que recebem os dados explicitamente.",
        ],
        code: `const dobrar = (numero) => numero * 2;

function saudar(nome = "visitante") {
  return \`Olá, \${nome}!\`;
}
console.log(dobrar(6)); // 12
console.log(saudar());
console.log(saudar("Ravi"));`,
      },
    ],
    mistakes: [
      "Esquecer return em uma função que deveria produzir um resultado.",
      "Confundir definir uma função com chamá-la: calcularTotal não é o mesmo que calcularTotal(2, 3).",
    ],
    practices: [
      "Dê nomes que indiquem a tarefa, como calcularMedia.",
      "Prefira funções pequenas, com entradas e saídas claras.",
    ],
    exercises: [
      {
        prompt: "Crie calcularMedia(a, b) e retorne a média dos dois números.",
        hint: "Use return (a + b) / 2.",
        solution: `function calcularMedia(a, b) {
  return (a + b) / 2;
}
console.log(calcularMedia(7, 9)); // 8`,
      },
      {
        prompt:
          "Crie uma arrow function ehPar que retorna se um inteiro é par.",
        hint: "Verifique o resto da divisão por 2.",
        solution: `const ehPar = (numero) => numero % 2 === 0;
console.log(ehPar(8)); // true
console.log(ehPar(7)); // false`,
      },
    ],
    summary: [
      "Funções recebem argumentos por meio dos parâmetros.",
      "return devolve um resultado e encerra a chamada.",
      "Escopo local protege os detalhes internos de cada função.",
    ],
  },
  {
    title: "Arrays e métodos essenciais",
    short: "Organize e transforme listas de valores",
    duration: 35,
    group: "Lógica e dados",
    intro:
      "Um array reúne valores em uma lista ordenada. É uma estrutura útil para representar tarefas, produtos, notas e muitos outros conjuntos de dados.",
    objectives: [
      "Acessar índices e modificar listas.",
      "Transformar dados com map e selecionar com filter.",
      "Localizar valores com find e percorrer com forEach.",
    ],
    sections: [
      {
        title: "Listas começam no índice zero",
        text: [
          "Arrays são escritos com colchetes. O primeiro item tem índice 0; length informa a quantidade de itens. Acessar um índice que não existe normalmente resulta em undefined.",
          "push() adiciona ao final e pop() remove o último item, retornando-o. Esses métodos alteram o array original. Uma const impede trocar a referência da lista, mas permite alterar seus itens.",
        ],
        code: `const assuntos = ["HTML", "CSS"];
assuntos.push("JavaScript");
console.log(assuntos[0]); // HTML
console.log(assuntos.length); // 3
const ultimo = assuntos.pop();
console.log(ultimo); // JavaScript
console.log(assuntos);`,
      },
      {
        title: "Métodos que expressam uma intenção",
        text: [
          "map() cria um novo array com o resultado de transformar cada item. filter() cria um novo array apenas com os itens que passam em uma condição. find() retorna o primeiro item que passa, ou undefined se nenhum passar.",
          "includes() verifica se um valor está na lista. forEach() chama uma função para cada item, mas não cria uma lista de resultados. Os callbacks recebem o item e também podem receber seu índice. map e filter não alteram por si mesmos a estrutura da lista original; evite modificar objetos dentro dos callbacks sem necessidade.",
        ],
        code: `const notas = [5, 8, 9, 6];
const notasEmDobro = notas.map((nota) => nota * 2);
const aprovadas = notas.filter((nota) => nota >= 6);
console.log(notasEmDobro); // [10, 16, 18, 12]
console.log(aprovadas); // [8, 9, 6]
console.log(notas.find((nota) => nota > 8)); // 9
console.log(notas.includes(4)); // false
notas.forEach((nota, indice) => console.log(indice, nota));`,
      },
    ],
    mistakes: [
      "Acessar o primeiro item com índice 1 em vez de 0.",
      "Esperar que forEach() devolva um array transformado.",
    ],
    practices: [
      "Escolha o método pelo objetivo: transformar, filtrar ou encontrar.",
      "Use nomes no plural para listas e no singular para cada item.",
    ],
    exercises: [
      {
        prompt:
          "Dado [10, 20, 30], crie uma nova lista com os preços acrescidos de 5.",
        hint: "Use map() e retorne preco + 5.",
        solution: `const precos = [10, 20, 30];
const novosPrecos = precos.map((preco) => preco + 5);
console.log(novosPrecos);`,
      },
      {
        prompt:
          'Selecione os nomes com pelo menos 4 caracteres em ["Ana", "Bruno", "Lia", "Caio"].',
        hint: "Strings também têm a propriedade length.",
        solution: `const nomes = ["Ana", "Bruno", "Lia", "Caio"];
const selecionados = nomes.filter((nome) => nome.length >= 4);
console.log(selecionados); // ["Bruno", "Caio"]`,
      },
    ],
    summary: [
      "Arrays armazenam sequências acessadas por índices a partir de zero.",
      "push e pop alteram a lista original.",
      "map transforma, filter seleciona e find localiza o primeiro resultado.",
    ],
  },
  {
    title: "Objetos e propriedades",
    short: "Represente dados que pertencem à mesma coisa",
    duration: 30,
    group: "Lógica e dados",
    intro:
      "Objetos agrupam informações em propriedades nomeadas. Em vez de listas paralelas, podemos representar uma pessoa ou um produto em uma única estrutura.",
    objectives: [
      "Criar objetos e acessar propriedades.",
      "Atualizar dados e entender referências.",
      "Combinar objetos com arrays e desestruturação.",
    ],
    sections: [
      {
        title: "Dados com nomes",
        text: [
          "Um objeto literal usa chaves com pares de propriedade e valor. A notação de ponto acessa um nome conhecido; colchetes permitem usar uma string ou uma variável como chave. Uma propriedade ausente retorna undefined.",
          "Objetos também podem guardar funções, chamadas de métodos quando associadas a propriedades. Neste curso, vamos priorizar funções que recebem os objetos como argumentos para manter o fluxo explícito.",
        ],
        code: `const estudante = {
  nome: "Joana",
  aulasConcluidas: 4,
  ativo: true
};
console.log(estudante.nome);
const campo = "aulasConcluidas";
console.log(estudante[campo]);
estudante.aulasConcluidas += 1;
console.log(estudante);`,
      },
      {
        title: "Referências, cópias e listas de objetos",
        text: [
          "Atribuir um objeto a outra variável não cria uma cópia: ambas passam a se referir ao mesmo objeto. O espalhamento { ...objeto } cria uma cópia superficial: objetos internos ainda são compartilhados.",
          "A desestruturação extrai propriedades para variáveis. Arrays de objetos permitem representar coleções reais e usar os métodos que você já aprendeu.",
        ],
        code: `const original = { nome: "Lia", pontos: 10 };
const copia = { ...original, pontos: 20 };
const { nome } = copia;
console.log(nome, original.pontos, copia.pontos);

const produtos = [
  { nome: "Caderno", preco: 15 },
  { nome: "Caneta", preco: 4 }
];
const baratos = produtos.filter((produto) => produto.preco < 10);
console.log(baratos);`,
      },
    ],
    mistakes: [
      "Achar que const impede modificar propriedades de um objeto.",
      "Acreditar que { ...objeto } copia profundamente todos os objetos internos.",
    ],
    practices: [
      "Agrupe informações que descrevem a mesma entidade.",
      "Evite modificar objetos compartilhados sem deixar essa intenção clara.",
    ],
    exercises: [
      {
        prompt:
          "Crie um objeto livro com titulo, autor e lido. Depois marque lido como true.",
        hint: "Acesse a propriedade com livro.lido.",
        solution: `const livro = { titulo: "Meu primeiro código", autor: "Ana", lido: false };
livro.lido = true;
console.log(livro);`,
      },
      {
        prompt:
          "Extraia apenas os nomes de uma lista de dois produtos usando map().",
        hint: "O callback deve retornar produto.nome.",
        solution: `const produtos = [
  { nome: "Lápis", preco: 2 },
  { nome: "Borracha", preco: 3 }
];
console.log(produtos.map((produto) => produto.nome));`,
      },
    ],
    summary: [
      "Objetos reúnem propriedades nomeadas.",
      "Referências podem apontar para o mesmo objeto.",
      "Objetos e arrays juntos modelam dados de pequenos projetos.",
    ],
  },
  {
    title: "DOM: JavaScript encontra a página",
    short: "Selecione, crie e altere elementos HTML",
    duration: 35,
    group: "JavaScript na web",
    intro:
      "O navegador representa o documento HTML como uma árvore de objetos: o DOM. Com ele, JavaScript pode ler e modificar elementos visíveis.",
    objectives: [
      "Selecionar elementos com querySelector e querySelectorAll.",
      "Alterar texto e classes com segurança.",
      "Criar e inserir novos elementos.",
    ],
    sections: [
      {
        title: "Encontre o elemento e atualize o conteúdo",
        text: [
          "document.querySelector() recebe um seletor CSS e retorna o primeiro elemento encontrado ou null. querySelectorAll() retorna uma NodeList com todos os elementos correspondentes; ela pode ser percorrida com for...of.",
          "textContent altera o texto sem interpretá-lo como HTML. classList.add(), remove() e toggle() manipulam classes. No seu próprio site, carregue o script externo com defer para que ele rode depois da leitura do HTML. Nas demonstrações, o HTML de apoio já está disponível quando o código começa.",
        ],
        html: `<h3 id="titulo">Título original</h3>
<p class="dica">Esta dica será atualizada.</p>`,
        code: `const titulo = document.querySelector("#titulo");
if (titulo) {
  titulo.textContent = "Minha primeira alteração no DOM";
}
for (const dica of document.querySelectorAll(".dica")) {
  dica.textContent = "JavaScript modificou este texto.";
  dica.classList.add("destaque");
}
console.log("Elementos atualizados.");`,
      },
      {
        title: "Crie elementos, não strings de HTML",
        text: [
          "document.createElement() cria um elemento ainda desconectado da página. Depois de configurar seu texto, use append() para inseri-lo em um elemento existente. remove() permite remover um elemento.",
          "Evite colocar entradas de usuários em innerHTML: o navegador interpretaria o conteúdo como marcação, podendo introduzir vulnerabilidades. Para exibir texto, prefira textContent.",
        ],
        html: `<ul id="lista"></ul>`,
        code: `const lista = document.querySelector("#lista");
const assuntos = ["Selecionar", "Criar", "Inserir"];
for (const assunto of assuntos) {
  const item = document.createElement("li");
  item.textContent = assunto;
  lista.append(item);
}
console.log("Três itens inseridos.");`,
      },
    ],
    mistakes: [
      "Tentar usar uma propriedade de null quando o seletor não encontrou nada.",
      "Executar o script antes de o elemento existir.",
    ],
    practices: [
      "Use seletores claros e IDs únicos.",
      "Insira texto externo com textContent, não com innerHTML.",
    ],
    exercises: [
      {
        prompt:
          'Altere o texto do parágrafo #mensagem para "Pronto para aprender".',
        hint: "Selecione o elemento e atribua a textContent.",
        html: `<p id="mensagem">Aguardando...</p>`,
        solution: `const mensagem = document.querySelector("#mensagem");
mensagem.textContent = "Pronto para aprender";`,
      },
      {
        prompt:
          "Crie um parágrafo com seu objetivo de estudo e adicione-o em #area.",
        hint: "Combine createElement(), textContent e append().",
        html: `<section id="area"></section>`,
        solution: `const paragrafo = document.createElement("p");
paragrafo.textContent = "Vou praticar um pouco todos os dias.";
document.querySelector("#area").append(paragrafo);`,
      },
    ],
    summary: [
      "O DOM é a representação da página em objetos.",
      "Seletores localizam elementos; textContent atualiza textos.",
      "createElement e append permitem montar interfaces sem interpretar HTML de usuários.",
    ],
  },
  {
    title: "Eventos e interação",
    short: "Responda a cliques, digitação e ações do usuário",
    duration: 30,
    group: "JavaScript na web",
    intro:
      "Em vez de executar tudo de uma vez, uma interface aguarda ações. Eventos avisam quando um clique, uma digitação ou outra mudança aconteceu.",
    objectives: [
      "Registrar listeners com addEventListener.",
      "Usar o objeto de evento.",
      "Atualizar a interface a partir de um estado.",
    ],
    sections: [
      {
        title: "Uma função para quando o clique chegar",
        text: [
          "addEventListener() registra uma função que será chamada quando o evento ocorrer. Passe a função, sem chamá-la durante o registro. A função recebe um objeto com informações sobre o evento.",
          "No contador, a variável guarda o estado e a interface mostra esse estado. Ao receber um clique, primeiro atualizamos o número e depois o texto. Execute e use o botão dentro da demonstração.",
        ],
        html: `<button id="somar" type="button">Somar 1</button>
<p>Cliques: <strong id="contador">0</strong></p>`,
        code: `let cliques = 0;
const botao = document.querySelector("#somar");
const contador = document.querySelector("#contador");
botao.addEventListener("click", () => {
  cliques += 1;
  contador.textContent = String(cliques);
});
console.log("Clique em Somar 1 na demonstração.");`,
      },
      {
        title: "Digitação e o objeto de evento",
        text: [
          "input é disparado quando o usuário altera o valor de um campo. event.target indica onde o evento se originou; event.currentTarget é o elemento no qual o listener em execução foi registrado.",
          "Muitos eventos propagam de elementos internos para seus ancestrais: esse processo é chamado de bubbling. Isso permite delegar eventos de uma lista a um contêiner, embora aqui usemos listeners diretamente nos elementos.",
        ],
        html: `<label for="nome">Seu nome</label>
<input id="nome" placeholder="Digite aqui">
<p id="saudacao">Olá, visitante!</p>`,
        code: `const campo = document.querySelector("#nome");
const saudacao = document.querySelector("#saudacao");
campo.addEventListener("input", (event) => {
  const nome = event.currentTarget.value.trim();
  saudacao.textContent = \`Olá, \${nome || "visitante"}!\`;
});`,
      },
    ],
    mistakes: [
      'Escrever addEventListener("click", minhaFuncao()) e executar a função cedo demais.',
      "Usar uma div clicável quando um button nativo já oferece teclado e semântica.",
    ],
    practices: [
      "Use elementos HTML adequados para cada interação.",
      "Mantenha o estado separado do texto usado para apresentá-lo.",
    ],
    exercises: [
      {
        prompt:
          'Ao clicar em um botão, altere a mensagem de "Pendente" para "Concluído".',
        hint: "Registre um listener de click.",
        html: `<button id="concluir" type="button">Concluir</button>
<p id="estado">Pendente</p>`,
        solution: `document.querySelector("#concluir").addEventListener("click", () => {
  document.querySelector("#estado").textContent = "Concluído";
});`,
      },
      {
        prompt: "Mostre a quantidade de caracteres digitados em um campo.",
        hint: "Leia value.length a cada evento input.",
        html: `<label for="texto">Texto</label><input id="texto">
<p id="tamanho">0 caracteres</p>`,
        solution: `document.querySelector("#texto").addEventListener("input", (event) => {
  document.querySelector("#tamanho").textContent =
    \`\${event.currentTarget.value.length} caracteres\`;
});`,
      },
    ],
    summary: [
      "Listeners respondem a eventos sem executar imediatamente.",
      "O objeto de evento informa o alvo e o contexto da ação.",
      "A interface deve refletir o estado atualizado do programa.",
    ],
  },
  {
    title: "Formulários e validação",
    short: "Receba e confira os dados de entrada",
    duration: 35,
    group: "JavaScript na web",
    intro:
      "Formulários conectam as intenções das pessoas aos dados de um programa. Validar significa conferir se os dados atendem às regras antes de processá-los.",
    objectives: [
      "Tratar o evento submit e evitar recarregamentos.",
      "Usar validação nativa e regras em JavaScript.",
      "Converter e verificar entradas numéricas.",
    ],
    sections: [
      {
        title: "Comece com os recursos do HTML",
        text: [
          'label associa uma descrição ao campo. required, type="email", minlength, min e max ajudam a validar entradas usando o navegador. O evento submit pertence ao formulário: assim, tanto clicar no botão quanto pressionar Enter funcionam.',
          "event.preventDefault() impede a ação padrão de envio, que normalmente navegaria para outro endereço ou recarregaria a página. A validação nativa acontece antes do evento submit; campos inválidos impedem esse evento.",
        ],
        html: `<form id="cadastro">
  <label for="email">E-mail</label>
  <input id="email" type="email" required autocomplete="email">
  <button type="submit">Cadastrar</button>
</form>
<p id="retorno" role="status"></p>`,
        code: `const formulario = document.querySelector("#cadastro");
formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.querySelector("#email").value.trim();
  document.querySelector("#retorno").textContent =
    \`Cadastro de demonstração: \${email}\`;
});`,
      },
      {
        title: "Validação de uma regra de negócio",
        text: [
          "Mesmo quando o HTML ajuda, confira os dados antes de usá-los. trim() remove espaços das extremidades. Number.isFinite() verifica se o valor já convertido é um número finito; Number.isInteger() verifica se é inteiro.",
          "Validar no navegador melhora a experiência, mas não protege um servidor. Em um sistema real com backend, todas as regras importantes precisam ser verificadas também no servidor. Esta demonstração não envia dados.",
        ],
        html: `<form id="inscricao" novalidate>
  <label for="idade">Idade (16 a 120)</label>
  <input id="idade" type="number" min="16" max="120" step="1" required aria-describedby="resultado">
  <button type="submit">Verificar</button>
</form>
<p id="resultado" role="status"></p>`,
        code: `document.querySelector("#inscricao").addEventListener("submit", (event) => {
  event.preventDefault();
  const texto = document.querySelector("#idade").value.trim();
  const idade = Number(texto);
  const valida = texto !== "" && Number.isInteger(idade)
    && idade >= 16 && idade <= 120;
  document.querySelector("#resultado").textContent = valida
    ? "Idade aceita!"
    : "Informe uma idade inteira entre 16 e 120.";
});`,
      },
    ],
    mistakes: [
      "Escutar apenas o clique do botão e ignorar o envio por Enter.",
      "Converter uma entrada vazia em 0 e aceitá-la sem perceber.",
    ],
    practices: [
      "Associe cada campo a um label e mostre erros compreensíveis.",
      "Valide no cliente para orientar; no servidor para garantir as regras.",
    ],
    exercises: [
      {
        prompt:
          'Valide se o texto "  Ana  " tem ao menos três caracteres depois de remover espaços externos.',
        hint: "Use trim() antes de consultar length.",
        solution: `const nome = "  Ana  ".trim();
console.log(nome.length >= 3); // true`,
      },
      {
        prompt:
          "Valide um preço textual: deve ser não vazio, finito e maior que zero.",
        hint: "Combine trim(), Number() e Number.isFinite().",
        solution: `const entrada = "29.90";
const texto = entrada.trim();
const preco = Number(texto);
const valido = texto !== "" && Number.isFinite(preco) && preco > 0;
console.log(valido); // true`,
      },
    ],
    summary: [
      "submit trata o envio por clique e por teclado.",
      "O HTML oferece validação nativa; JavaScript implementa regras adicionais.",
      "Entradas precisam ser normalizadas, convertidas e verificadas.",
    ],
  },
  {
    title: "JSON e armazenamento local",
    short: "Guarde dados entre visitas com localStorage",
    duration: 35,
    group: "JavaScript na web",
    intro:
      "Até aqui, os dados desapareciam ao reiniciar um exemplo. JSON permite representar dados como texto, e localStorage pode guardar esse texto no navegador.",
    objectives: [
      "Serializar e ler dados com JSON.",
      "Usar setItem, getItem e removeItem.",
      "Tratar falhas e entender os limites do armazenamento local.",
    ],
    sections: [
      {
        title: "De objeto para texto e de volta",
        text: [
          "JSON é um formato de texto para troca de dados. Suas chaves e strings usam aspas duplas; não há comentários nem vírgula após o último item. JSON.stringify() transforma dados compatíveis em uma string; JSON.parse() interpreta um texto JSON.",
          "JSON não preserva tudo que existe em JavaScript: funções e undefined não são representados como propriedades de objeto, e datas são normalmente serializadas como strings. Texto inválido em JSON.parse() causa um erro.",
        ],
        code: `const tarefa = { titulo: "Revisar arrays", concluida: false };
const texto = JSON.stringify(tarefa);
console.log(texto);
const recuperada = JSON.parse(texto);
console.log(recuperada.titulo);
console.log(recuperada.concluida);`,
      },
      {
        title: "Persistência com cuidado",
        text: [
          "localStorage guarda pares de chave e valor como strings, associados à origem do site. getItem() retorna null se a chave não existir. Os dados costumam permanecer entre visitas, mas podem ser apagados pelo usuário ou bloqueados pelo navegador. Não use para senhas nem outros segredos.",
          "Use try...catch para tratar JSON inválido, bloqueio de armazenamento e falta de espaço. Valide o formato recuperado: um JSON válido não significa que os dados têm a estrutura esperada.",
          "Os exemplos deste curso rodam em um iframe isolado sem acesso ao armazenamento da página principal. Por segurança, localStorage pode ser bloqueado ali. O exemplo trata essa situação; para testar a persistência real, copie o código para uma página servida por HTTP no seu próprio ambiente. O progresso do curso usa o armazenamento da página principal separadamente.",
        ],
        code: `const chave = "curso-js:preferencias-demo";
try {
  const preferencias = { tema: "claro" };
  localStorage.setItem(chave, JSON.stringify(preferencias));
  const texto = localStorage.getItem(chave);
  const dados = texto === null ? null : JSON.parse(texto);
  if (dados && typeof dados.tema === "string") {
    console.log("Tema salvo:", dados.tema);
  }
  localStorage.removeItem(chave); // limpa apenas esta chave de teste
} catch (erro) {
  console.log("Armazenamento indisponível ou dados inválidos:", erro.message);
}`,
      },
    ],
    mistakes: [
      'Salvar um objeto diretamente e obter a string "[object Object]".',
      "Achar que localStorage é um banco de dados seguro ou sincronizado entre dispositivos.",
    ],
    practices: [
      "Use chaves com prefixos específicos do projeto.",
      "Trate erros e confira o formato dos dados recuperados.",
    ],
    exercises: [
      {
        prompt:
          "Converta uma lista de dois assuntos para JSON e reconstrua a lista.",
        hint: "Combine JSON.stringify() e JSON.parse().",
        solution: `const assuntos = ["DOM", "Eventos"];
const texto = JSON.stringify(assuntos);
const lista = JSON.parse(texto);
console.log(Array.isArray(lista)); // true
console.log(lista);`,
      },
      {
        prompt: 'Trate o erro ao tentar interpretar o texto "isto não é JSON".',
        hint: "Coloque JSON.parse() dentro de try...catch.",
        solution: `try {
  const dados = JSON.parse("isto não é JSON");
  console.log(dados);
} catch (erro) {
  console.log("Não foi possível ler os dados.");
}`,
      },
    ],
    summary: [
      "JSON transforma dados compatíveis em texto e permite reconstruí-los.",
      "localStorage guarda strings por origem e pode estar indisponível.",
      "Persistência exige tratamento de erros e validação dos dados lidos.",
    ],
  },
  {
    title: "JavaScript assíncrono",
    short: "Entenda Promises, async e await",
    duration: 40,
    group: "Prática e projeto",
    intro:
      "Algumas tarefas levam tempo, como uma requisição de rede. A programação assíncrona permite aguardar resultados sem bloquear a interface durante a espera.",
    objectives: [
      "Reconhecer os estados de uma Promise.",
      "Consumir Promises com then ou async/await.",
      "Tratar rejeições e entender a ordem de execução.",
    ],
    sections: [
      {
        title: "Uma promessa de resultado futuro",
        text: [
          "Uma Promise começa pendente e pode ser cumprida com um valor ou rejeitada com um motivo. then() registra uma reação ao sucesso; catch() trata a rejeição. setTimeout() agenda uma função para depois de um intervalo mínimo; o tempo exato depende da execução do navegador.",
          'Este exemplo simula uma consulta sem depender da internet. Observe que "Consulta iniciada" aparece antes dos dados. A espera não impede que o restante do script síncrono execute.',
        ],
        code: `function consultarAssuntos() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(["Promises", "async", "await"]), 500);
  });
}
consultarAssuntos()
  .then((assuntos) => console.log("Resultado:", assuntos))
  .catch((erro) => console.error(erro.message));
console.log("Consulta iniciada.");`,
      },
      {
        title: "Escrevendo a espera com async e await",
        text: [
          "Uma função async sempre retorna uma Promise. Dentro dela, await suspende apenas a continuação dessa função até que a Promise se resolva. Se a Promise for rejeitada, await lança o motivo como erro, que pode ser tratado com try...catch.",
          "Use finally para limpeza, como retirar um indicador de carregamento. Para tarefas independentes, Promise.all() permite aguardar todas em conjunto; ela rejeita se uma das entradas rejeitar.",
          "Em uma consulta real, fetch() retorna uma Promise de Response. Respostas HTTP como 404 não rejeitam automaticamente: confira response.ok antes de usar await response.json(). Não usamos um endpoint inventado nesta aula; as simulações abaixo são completas e executáveis.",
        ],
        code: `function carregarPerfil(deveFalhar = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (deveFalhar) {
        reject(new Error("Não foi possível carregar o perfil."));
      } else {
        resolve({ nome: "Lia" });
      }
    }, 400);
  });
}
async function iniciar() {
  console.log("Carregando...");
  try {
    const perfil = await carregarPerfil(false);
    console.log("Olá,", perfil.nome);
    // Troque false por true acima para testar o erro.
  } catch (erro) {
    console.error(erro.message);
  } finally {
    console.log("Consulta encerrada.");
  }
}
iniciar();`,
      },
    ],
    mistakes: [
      "Achar que await bloqueia toda a página.",
      "Esquecer de tratar uma Promise rejeitada.",
      "Presumir que fetch rejeita para qualquer erro HTTP.",
    ],
    practices: [
      "Mostre estados de carregamento, sucesso e erro.",
      "Não coloque await em sequência para tarefas independentes sem necessidade.",
    ],
    exercises: [
      {
        prompt:
          "Crie uma função async que aguarde Promise.resolve(42) e mostre o valor.",
        hint: "Use await dentro da função async e depois chame-a.",
        solution: `async function mostrarResposta() {
  const resposta = await Promise.resolve(42);
  console.log(resposta);
}
mostrarResposta();`,
      },
      {
        prompt:
          "Aguarde duas Promises independentes em conjunto e mostre seus resultados.",
        hint: "Use await Promise.all([...]).",
        solution: `async function carregarTudo() {
  try {
    const resultados = await Promise.all([
      Promise.resolve("Aulas"),
      Promise.resolve("Exercícios")
    ]);
    console.log(resultados);
  } catch (erro) {
    console.error(erro.message);
  }
}
carregarTudo();`,
      },
    ],
    summary: [
      "Promises representam resultados futuros e podem ser rejeitadas.",
      "async/await organiza o consumo de Promises sem bloquear a interface.",
      "Trate erros e diferencie falha de rede de resposta HTTP de erro.",
    ],
  },
  {
    title: "Projeto final: minha lista de estudos",
    short: "Conecte os fundamentos em um pequeno projeto web",
    duration: 60,
    group: "Prática e projeto",
    intro:
      "Hora de reunir o que você aprendeu. Vamos construir uma lista de estudos que permite cadastrar assuntos, marcar conclusões e excluir itens, com persistência quando o navegador permitir.",
    objectives: [
      "Integrar funções, arrays, objetos, DOM e eventos.",
      "Validar entradas e renderizar o estado da aplicação.",
      "Persistir dados com tratamento de falhas.",
    ],
    sections: [
      {
        title: "Planeje antes de escrever",
        text: [
          "O estado será um array de objetos com id, titulo e concluida. A interface será reconstruída a partir desse estado após cada ação. Assim, o HTML reflete os dados e não precisa ser usado como banco de informações.",
          "Critérios de aceite: impedir títulos vazios, limitar cada título a 80 caracteres, adicionar itens por Enter ou botão, alternar conclusão, excluir itens e mostrar quantos ainda estão pendentes. Persistência é um aprimoramento: a lista deve continuar funcionando mesmo quando ela estiver indisponível.",
          "Execute a implementação abaixo e experimente o fluxo. No iframe isolado, a lista funciona em memória; a mensagem de armazenamento explica a limitação. Em uma página própria servida por HTTP, ela usa localStorage.",
        ],
        html: `<h3>Minha lista de estudos</h3>
<form id="novo-assunto">
  <label for="assunto">O que você vai estudar?</label>
  <input id="assunto" required maxlength="80" autocomplete="off">
  <button type="submit">Adicionar</button>
</form>
<p id="aviso" role="status"></p>
<p id="pendencias"></p>
<ul id="assuntos"></ul>`,
        code: `const chave = "minha-lista-js:v1";
let assuntos = [];
const aviso = document.querySelector("#aviso");
const campo = document.querySelector("#assunto");

try {
  const texto = localStorage.getItem(chave);
  const dados = texto === null ? [] : JSON.parse(texto);
  const validos = Array.isArray(dados) && dados.every((item) =>
    item && typeof item.id === "string" &&
    typeof item.titulo === "string" && item.titulo.trim().length > 0 &&
    item.titulo.length <= 80 && typeof item.concluida === "boolean"
  );
  if (!validos || new Set(dados.map((item) => item.id)).size !== dados.length) {
    throw new Error("Formato inválido");
  }
  assuntos = dados;
} catch (erro) {
  aviso.textContent = "Sem dados salvos: a lista funciona nesta sessão.";
}

function salvar() {
  try {
    localStorage.setItem(chave, JSON.stringify(assuntos));
    aviso.textContent = "Lista salva neste navegador.";
  } catch (erro) {
    aviso.textContent = "Armazenamento indisponível: lista apenas nesta sessão.";
  }
}

function renderizar() {
  const lista = document.querySelector("#assuntos");
  lista.replaceChildren();
  for (const assunto of assuntos) {
    const item = document.createElement("li");
    const rotulo = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = assunto.concluida;
    checkbox.addEventListener("change", () => {
      assunto.concluida = checkbox.checked;
      salvar();
      atualizarContagem();
    });
    const titulo = document.createElement("span");
    titulo.textContent = assunto.titulo;
    rotulo.append(checkbox, titulo);
    const excluir = document.createElement("button");
    excluir.type = "button";
    excluir.textContent = "Excluir";
    excluir.setAttribute("aria-label", \`Excluir \${assunto.titulo}\`);
    excluir.addEventListener("click", () => {
      assuntos = assuntos.filter((item) => item.id !== assunto.id);
      salvar();
      renderizar();
      campo.focus();
    });
    item.append(rotulo, excluir);
    lista.append(item);
  }
  atualizarContagem();
}

function atualizarContagem() {
  const quantidade = assuntos.filter((item) => !item.concluida).length;
  document.querySelector("#pendencias").textContent =
    \`Assuntos pendentes: \${quantidade}\`;
}

document.querySelector("#novo-assunto").addEventListener("submit", (event) => {
  event.preventDefault();
  const titulo = campo.value.trim();
  if (titulo.length === 0 || titulo.length > 80) {
    aviso.textContent = "Informe um assunto de 1 a 80 caracteres.";
    campo.focus();
    return;
  }
  assuntos.push({ id: crypto.randomUUID(), titulo, concluida: false });
  campo.value = "";
  salvar();
  renderizar();
  campo.focus();
});
renderizar();`,
      },
      {
        title: "Leve o projeto para o seu computador",
        text: [
          'Crie uma pasta com index.html, style.css e app.js. Copie o HTML de apoio para o body do documento e o JavaScript para app.js. Carregue-o com <script src="app.js" defer></script> no HTML; mantenha a apresentação no arquivo CSS.',
          "Sirva a pasta com um servidor HTTP local da sua ferramenta de desenvolvimento. O método crypto.randomUUID() está disponível em contextos seguros (HTTPS e localhost) nos navegadores atuais. Use esse contexto para testar o projeto completo.",
          "Teste o fluxo com mouse e teclado. Recarregue a página para conferir a persistência; salve dois títulos iguais e exclua apenas um; tente cadastrar somente espaços. Abra as ferramentas do navegador para investigar erros e inspecionar o armazenamento.",
        ],
      },
    ],
    mistakes: [
      "Manter o estado só no HTML e perder a coerência depois de várias interações.",
      "Usar o título como identificador único, impedindo lidar corretamente com títulos repetidos.",
      "Interromper a aplicação inteira quando salvar os dados falha.",
    ],
    practices: [
      "Separe dados, renderização e persistência em funções pequenas.",
      "Use textContent para títulos e botões acessíveis por teclado.",
      "Teste entradas vazias, dados salvos inválidos e armazenamento bloqueado.",
    ],
    exercises: [
      {
        prompt:
          'Adicione um filtro "Todas / Pendentes / Concluídas". Comece escrevendo uma função que devolve a lista visível.',
        hint: "Não altere o estado original; retorne uma lista filtrada conforme o modo.",
        solution: `function filtrarAssuntos(assuntos, modo) {
  if (modo === "pendentes") {
    return assuntos.filter((item) => !item.concluida);
  }
  if (modo === "concluidas") {
    return assuntos.filter((item) => item.concluida);
  }
  return assuntos;
}
const lista = [{ titulo: "DOM", concluida: false }];
console.log(filtrarAssuntos(lista, "pendentes"));`,
      },
      {
        prompt:
          "Crie uma função que calcule o percentual de conclusão. Uma lista vazia deve retornar 0.",
        hint: "Conte as concluídas, divida pelo total e multiplique por 100.",
        solution: `function calcularProgresso(assuntos) {
  if (assuntos.length === 0) {
    return 0;
  }
  const concluidas = assuntos.filter((item) => item.concluida).length;
  return Math.round((concluidas / assuntos.length) * 100);
}
console.log(calcularProgresso([])); // 0
console.log(calcularProgresso([
  { concluida: true }, { concluida: false }
])); // 50`,
      },
    ],
    summary: [
      "Um projeto integra os fundamentos em um fluxo completo de entrada, estado e saída.",
      "Dados validados e funções pequenas tornam a aplicação mais previsível.",
      "Você já tem uma base para criar e ampliar pequenos projetos web. Continue praticando!",
    ],
  },
];
