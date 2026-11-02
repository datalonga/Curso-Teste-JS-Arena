// Aprofundamentos editoriais. JavaScript didático permanece em strings inertes.
// Os números correspondem à sequência pedagógica de scripts/course.mjs.
const section = (title, text, code, html) => ({ title, text, code, html });
const exercise = (prompt, hint, solution, html) => ({
  prompt,
  hint,
  solution,
  html,
});

export const expansions = {
  1: {
    short:
      "Planejamento, ambientes de execução e primeiros passos na depuração",
    duration: 40,
    objectives: [
      "Decompor uma tarefa em entrada, processamento e saída.",
      "Localizar o `console` e conferir o resultado esperado de um programa.",
    ],
    sections: [
      section(
        "Antes do código: descreva o problema",
        [
          "Um algoritmo é uma sequência finita de passos para resolver uma tarefa. Antes de escolher comandos, descreva em linguagem comum o que você tem, o que quer descobrir e como chegar lá. Não é necessário decorar uma linguagem para começar a pensar dessa forma.",
          "Para dividir uma conta: receba o valor total e o número de pessoas, divida o total pela quantidade e apresente a parte de cada pessoa. Defina também limites: dividir entre zero pessoas não faz sentido para esse problema. A validação dessas situações será construída ao longo do curso.",
          "No exemplo, os números já são conhecidos. Leia os comentários, preveja a saída e só então execute. Essa comparação entre previsão e resultado é uma ferramenta de aprendizagem que você pode usar em todos os módulos.",
        ],
        `// Entrada: conta de 90 reais para 3 pessoas.
// Processamento: dividir o total pela quantidade.
// Saída esperada: 30 reais por pessoa.
console.log(90 / 3); // 30
console.log("Cada pessoa paga R$ 30.");`,
      ),
      section(
        "Como uma página carrega JavaScript",
        [
          'Em um site próprio, o código costuma ficar em um arquivo com extensão .js. O documento HTML referencia esse arquivo com uma tag script, por exemplo <script `src`="app.js" `defer`></script>. O caminho de `src` é relativo ao documento, a menos que seja um endereço absoluto.',
          "Em um script clássico externo, `defer` permite baixar o arquivo durante a leitura do HTML e executá-lo depois de o documento ter sido analisado, antes de `DOMContentLoaded`. Não confunda essa opção com `async`, que executa assim que o arquivo estiver disponível e não garante a ordem entre scripts independentes.",
          "A linguagem usa recursos fornecidos pelo ambiente. `typeof` `document` informa se o nome `document` está disponível; nos nossos exemplos ele existe porque rodamos em um navegador. Não é necessário instalar Node.js para estudar as demonstrações deste curso.",
        ],
        `console.log("O ambiente oferece um documento?");
console.log(typeof document); // "object" no navegador
console.log("O ambiente oferece console?");
console.log(typeof console); // "object"`,
      ),
      section(
        "Observe, compare e investigue",
        [
          "Depurar é investigar por que um resultado não corresponde ao esperado. Comece reproduzindo o problema, confira os dados de entrada e observe os resultados intermediários. Um cálculo pode estar sintaticamente correto e ainda assim representar a regra errada.",
          "Uma mensagem como `ReferenceError` geralmente aponta um nome que não pôde ser encontrado; `SyntaxError` indica um problema na forma do código; `TypeError` pode indicar uma operação incompatível com um valor. Não tente resolver tudo de uma vez: leia a mensagem e a linha indicada.",
          "No `console` do navegador, você pode executar expressões pequenas. A aba Sources, ou Fontes, também permite definir pontos de parada para inspecionar um programa. Por enquanto, observar cada etapa com `console.log` já ajuda a descobrir onde um cálculo mudou.",
        ],
        `console.log("Preço de cada item:", 12);
console.log("Quantidade:", 4);
console.log("Subtotal:", 12 * 4);
console.log("Frete:", 6);
console.log("Total esperado: 54. Total calculado:", 12 * 4 + 6);`,
      ),
    ],
    mistakes: [
      "Começar a escrever comandos sem definir qual resultado o programa deve produzir.",
      "Alterar muitas linhas ao mesmo tempo e não saber qual mudança corrigiu o problema.",
    ],
    practices: [
      "Anote uma entrada simples e a saída esperada antes de executar.",
      "Separe problemas grandes em tarefas menores e verificáveis.",
    ],
    exercises: [
      exercise(
        "Descreva entrada, processamento e saída para converter 2 horas em minutos. Mostre o cálculo.",
        "Uma hora tem 60 minutos. Use comentários para registrar as três etapas.",
        `// Entrada: 2 horas.
// Processamento: multiplicar a quantidade por 60.
// Saída: quantidade de minutos.
console.log(2 * 60); // 120`,
      ),
      exercise(
        "Uma compra tem 3 itens de R$ 8 e frete de R$ 5. Mostre subtotal e total em mensagens separadas.",
        "Compare primeiro 3 * 8 e depois acrescente o frete.",
        `console.log("Subtotal:", 3 * 8); // 24
console.log("Total:", 3 * 8 + 5); // 29`,
      ),
    ],
    summary: [
      "Planejar entrada, processamento e saída ajuda a escolher as instruções.",
      "Carregamento do script e recursos disponíveis dependem do ambiente.",
      "Depurar é comparar o comportamento observado com uma expectativa concreta.",
    ],
  },
  2: {
    short: "Expressões, blocos, identificadores e strings com escapes",
    duration: 40,
    objectives: [
      "Distinguir expressões, instruções e blocos.",
      "Escrever strings com escapes e nomes válidos.",
    ],
    sections: [
      section(
        "Expressões, instruções e blocos",
        [
          'Uma expressão produz um valor, como 2 + 3 ou "Olá". Uma instrução organiza uma ação do programa: `console.log(2 + 3)`; é uma instrução que contém uma chamada e uma expressão aritmética. Nem tudo que ocupa uma linha é uma instrução completa.',
          "Espaços e quebras de linha normalmente podem separar os elementos do código, mas não devem dividir uma palavra ou o nome de uma variável. Chaves delimitam blocos e permitem agrupar instruções. Uma linha vazia pode separar etapas sem mudar o resultado.",
          "Use a formatação como um mapa visual. A indentação de duas posições adotada aqui torna mais fácil reconhecer o que está dentro de um bloco. Não adicione um ponto e vírgula automaticamente depois de toda chave: o lugar depende da construção.",
        ],
        `{
  console.log("Primeira etapa");
  console.log(2 + 3);
}

{
  console.log("Segunda etapa");
  console.log((2 + 3) * 4);
}`,
      ),
      section(
        "Aspas, escapes e textos com mais de uma linha",
        [
          "Para inserir uma aspa igual à que delimita a `string`, use uma barra invertida antes dela ou escolha o outro tipo de aspas. A sequência \\n representa uma quebra de linha, e \\\\ representa uma barra invertida dentro de uma `string`.",
          "Strings delimitadas por aspas simples ou duplas não aceitam uma quebra de linha literal sem tratamento. Template literals, delimitados por crases, podem ocupar várias linhas e também permitem interpolação. Aqui o objetivo é reconhecer as formas, antes de combinar textos com dados nos próximos módulos.",
          "Quando o código estiver dentro de HTML, mantenha em mente que há dois contextos diferentes: a sintaxe de HTML e a de JavaScript. No curso, as tags vistas nos blocos são apenas texto; copiar uma tag para uma `string` não a executa.",
        ],
        `console.log('Ela disse: "vamos praticar".');
console.log("Duas linhas:\\nprimeira e segunda.");
console.log("Uma barra invertida: \\\\");
console.log(\`Um texto
com quebra de linha real.\`);`,
      ),
      section(
        "Nomes válidos e erros que impedem a leitura",
        [
          "Identificadores são os nomes usados para variáveis e outras entidades. Eles podem incluir letras, algarismos, _ e $, mas não podem começar por algarismo. JavaScript aceita letras Unicode, embora nomes em camelCase sem acentos sejam uma convenção comum para facilitar a colaboração.",
          "Palavras reservadas como `const` e `return` têm função na linguagem e não podem ser usadas como nomes de variáveis nos mesmos contextos. precoTotal, preco_total e $preco são formas válidas; 2precos e preco-total não são nomes válidos de variável.",
          "Não executamos erros de sintaxe neste exemplo: os nomes incorretos aparecem só em comentários. Ao encontrar um erro real, confira também a linha anterior; uma aspa ou parêntese aberto pode fazer a mensagem apontar mais adiante.",
        ],
        `const precoTotal = 30;
const quantidadeDeItens = 2;
console.log(precoTotal, quantidadeDeItens);
// Inválido: const 2itens = 2;
// Inválido: const preco-total = 30;
// Diferente de precoTotal: precototal`,
      ),
    ],
    mistakes: [
      "Usar uma palavra reservada ou hífen como nome de variável.",
      "Achar que a linha indicada pelo erro é sempre a origem exata do problema.",
    ],
    practices: [
      "Use camelCase e mantenha nomes consistentes.",
      "Formate o código antes de procurar uma chave ou um parêntese perdido.",
    ],
    exercises: [
      exercise(
        'Mostre o texto Ela respondeu: "sim". incluindo as aspas da resposta.',
        "Delimite toda a `string` com aspas simples.",
        `console.log('Ela respondeu: "sim".');`,
      ),
      exercise(
        'Reescreva os nomes inválidos "valor-total" e "1aluno" como identificadores válidos e imprima seus valores.',
        "Use camelCase e inicie o nome com uma letra.",
        `const valorTotal = 45;
const primeiroAluno = "Lia";
console.log(valorTotal, primeiroAluno);`,
      ),
    ],
    summary: [
      "Expressões produzem valores; instruções e blocos organizam a execução.",
      "Escapes permitem representar aspas, barras e quebras de linha em strings.",
      "Nomes válidos e formatação consistente evitam erros de leitura do código.",
    ],
  },
  3: {
    short: "Declarações, reatribuição, escopo, sombreamento e referências",
    duration: 50,
    objectives: [
      "Explicar sombreamento e o tempo de vida de uma variável.",
      "Distinguir reatribuição de alteração de um objeto.",
    ],
    sections: [
      section(
        "Declaração, reatribuição e redeclaração",
        [
          "Declarar cria uma associação entre um nome e um valor. Reatribuir muda o valor associado a um nome existente e não repete `let`. Tentar declarar novamente o mesmo nome com `let` ou `const` no mesmo escopo provoca `SyntaxError`.",
          "`let` pode ser declarado sem um valor inicial; nesse caso começa com `undefined`. Mesmo assim, inicializar uma contagem em 0 costuma expressar melhor a intenção. `const` exige um inicializador, e tentar reatribuir uma constante já criada provoca `TypeError`.",
          "Você encontrará `var` em códigos antigos. Ele tem escopo de função, não de bloco, e permite redeclarações que tornam alguns erros menos evidentes. Este curso usa `let` e `const` para explicitar melhor as fronteiras de cada nome.",
        ],
        `let saldo;
console.log(saldo); // undefined
saldo = 20;
saldo = saldo + 5;
console.log(saldo); // 25
// Não repita "let saldo" neste mesmo escopo.`,
      ),
      section(
        "Sombreamento: mesmo nome, associações diferentes",
        [
          "Um bloco interno pode declarar um nome que já existe fora dele. Dentro desse bloco, o nome interno esconde temporariamente o externo: isso é sombreamento. A variável externa não é modificada por uma declaração interna de mesmo nome.",
          "Esse recurso é válido, mas pode confundir. Quando os valores representam coisas diferentes, prefira nomes diferentes. Se sua intenção é atualizar a variável externa, faça uma atribuição sem criar uma nova variável interna.",
          "O escopo é definido pela posição das declarações no código, não pela ordem em que você escolhe executar chamadas. No módulo de funções, isso ajudará a entender por que uma função consegue usar nomes do local onde foi criada.",
        ],
        `const status = "fora";
{
  const status = "dentro";
  console.log(status); // dentro
}
console.log(status); // fora

let pontos = 0;
{
  pontos = 10; // atualiza a associação externa
}
console.log(pontos); // 10`,
      ),
      section(
        "Constante não significa conteúdo congelado",
        [
          "Valores primitivos, como números e strings, não são objetos mutáveis. Atualizar um número em uma `let` troca o valor associado ao nome. Já um objeto possui propriedades que podem mudar mesmo quando sua referência está guardada em uma `const`.",
          "O exemplo antecipa um objeto simples: as chaves agrupam propriedades nomeadas, e o ponto acessa uma propriedade. Não é preciso dominar objetos agora; observe apenas que alterar `estudante.aulas` é diferente de escrever estudante = outroObjeto.",
          "Para organizar pequenos scripts, evite criar nomes desnecessários no escopo global. Use o menor escopo que comporte a tarefa e não dependa de variáveis globais para compartilhar todos os dados.",
        ],
        `const estudante = { nome: "Lia", aulas: 0 };
estudante.aulas = 1;
console.log(estudante.aulas); // 1
// A referência continua a mesma.
// estudante = { nome: "Ana" }; causaria erro de reatribuição.`,
      ),
    ],
    mistakes: [
      "Repetir `let` ao tentar apenas atualizar uma variável.",
      "Criar uma variável interna de mesmo nome esperando mudar a externa.",
    ],
    practices: [
      "Inicialize contadores e acumuladores com valores que expressem seu papel.",
      "Evite `var` em código novo e mantenha dados no menor escopo necessário.",
    ],
    exercises: [
      exercise(
        "Comece com saldo 100, retire 30 e depois acrescente 10 sem redeclarar saldo.",
        "Declare uma vez com `let` e faça duas atribuições.",
        `let saldo = 100;
saldo = saldo - 30;
saldo = saldo + 10;
console.log(saldo); // 80`,
      ),
      exercise(
        "Mostre que uma variável interna chamada nivel não altera a constante nivel externa.",
        "Crie um bloco com chaves e declare outra constante nele.",
        `const nivel = "iniciante";
{
  const nivel = "intermediário";
  console.log(nivel);
}
console.log(nivel); // iniciante`,
      ),
    ],
    summary: [
      "Atualizar um nome existente não exige uma nova declaração.",
      "Sombreamento cria outra associação, sem alterar automaticamente a externa.",
      "`const` protege a associação, não todas as propriedades de um objeto.",
    ],
  },
  4: {
    short: "Strings, conversões, números válidos e identificação de tipos",
    duration: 60,
    objectives: [
      "Tratar strings com métodos de normalização e busca.",
      "Distinguir conversão numérica completa de leitura parcial.",
    ],
    sections: [
      section(
        "Strings: consultar e produzir novos textos",
        [
          "Strings têm `length` e métodos como `trim()`, `toLowerCase()`, `toUpperCase()`, `includes()`, `startsWith()`, `slice()` e `replace()`. Eles permitem limpar espaços externos, padronizar letras, procurar trechos e recortar partes do texto.",
          "Esses métodos não alteram a `string` original: produzem novos valores. `replace()` com uma `string` de busca substitui a primeira ocorrência; `replaceAll()` substitui todas as ocorrências dessa `string`. `length` conta unidades de código UTF-16, não necessariamente caracteres visuais: alguns símbolos e emojis ocupam mais de uma unidade.",
          "Padronizar texto é útil para busca, mas não é apropriado para todos os campos: não transforme automaticamente uma senha em minúsculas, por exemplo. Escolha a transformação de acordo com a regra do dado.",
        ],
        `const original = "  JavaScript na web  ";
const limpo = original.trim();
console.log(limpo.toLowerCase());
console.log(limpo.includes("Script")); // true
console.log(limpo.startsWith("Java")); // true
console.log(limpo.slice(0, 10)); // JavaScript
console.log("a-a-a".replaceAll("-", " "));
console.log(original); // ainda tem os espaços externos`,
      ),
      section(
        "Números válidos, leitura parcial e arredondamento",
        [
          '`Number()` tenta converter a entrada inteira. `Number.parseInt(texto, 10)` lê um inteiro na base decimal até onde o formato permite; `Number.parseFloat()` faz leitura parcial de um número decimal. Por isso, `parseFloat("12.5kg")` resulta em 12.5, enquanto `Number("12.5kg")` resulta em `NaN`.',
          'Não use leitura parcial para aceitar um formulário que deveria conter apenas um número: "20abc" não é uma idade válida só porque `parseInt` extraiu 20. `Number.isFinite()` rejeita `NaN` e os infinitos, e `Number.isInteger()` verifica se um número é inteiro.',
          "`Math.round()`, `floor()`, `ceil()` e `trunc()` oferecem arredondamento ao mais próximo, para baixo, para cima e remoção da parte fracionária. `toFixed()` é voltado à representação com casas decimais e retorna uma `string`, não um número.",
        ],
        `console.log(Number("12.5kg")); // NaN
console.log(Number.parseFloat("12.5kg")); // 12.5
console.log(Number.parseInt("08", 10)); // 8
console.log(Number.isFinite(Infinity)); // false
console.log(Math.round(4.6), Math.floor(4.6), Math.ceil(4.1));
console.log(Math.trunc(-4.6)); // -4
console.log(typeof (12.5).toFixed(2)); // string`,
      ),
      section(
        "Ausência, booleanos e identificação de coleções",
        [
          "`null` e `undefined` não são strings vazias: representam ausência de valor de maneiras diferentes. Uma propriedade inexistente de objeto normalmente retorna `undefined`. Uma lista vazia e um objeto vazio são truthy, mesmo sem itens.",
          '`typeof` [] retorna "`object`", então não distingue arrays de outros objetos. Use `Array.isArray()` quando precisar conferir se um valor é uma lista. A existência do tipo adequado não garante que os dados internos sejam válidos; isso será importante ao ler `JSON`.',
          'Conversões implícitas podem esconder essas diferenças. Prefira verificações explícitas e faça pequenos testes antes de aceitar uma entrada. O texto "0" é truthy, mas o número 0 é falsy.',
        ],
        `console.log(Boolean("0")); // true
console.log(Boolean(0)); // false
console.log(Boolean([])); // true
console.log(typeof []); // object
console.log(Array.isArray([])); // true
console.log(Array.isArray({})); // false
console.log(null === undefined); // false`,
      ),
    ],
    mistakes: [
      "Achar que `trim()` modifica automaticamente a variável original.",
      'Aceitar "20abc" como número válido por usar `parseInt()` sem verificar o restante.',
    ],
    practices: [
      "Escolha entre converter todo o texto e extrair apenas um prefixo numérico.",
      "Use `Array.isArray()` para listas e não confie apenas em `typeof`.",
    ],
    exercises: [
      exercise(
        'Normalize "  APRENDER JavaScript  " para letras minúsculas e verifique se contém "javascript".',
        "Encadeie `trim()`, `toLowerCase()` e `includes()`.",
        `const texto = "  APRENDER JavaScript  ".trim().toLowerCase();
console.log(texto);
console.log(texto.includes("javascript")); // true`,
      ),
      exercise(
        'Compare a conversão completa e a leitura parcial de "18anos". Qual é adequada para validar uma idade textual?',
        "Compare `Number()` com `Number.parseInt()` e detecte `NaN`.",
        `const entrada = "18anos";
console.log(Number.parseInt(entrada, 10)); // 18 (leitura parcial)
console.log(Number.isNaN(Number(entrada))); // true
// A conversão completa rejeita o texto com unidade.`,
      ),
    ],
    summary: [
      "Métodos de strings retornam novos textos e não alteram o original.",
      "Leitura parcial com `parseInt`/`parseFloat` não equivale à validação completa.",
      "Listas vazias são truthy; `Array.isArray` identifica arrays.",
    ],
  },
  5: {
    short: "Cálculos, comparações, curto-circuito, valores padrão e precisão",
    duration: 55,
    objectives: [
      "Usar atribuições compostas sem confundir incremento e resultado.",
      "Escolher valores padrão com `||` e `??`.",
    ],
    sections: [
      section(
        "Atualizações com operadores de atribuição",
        [
          "Os operadores `+=`, `-=`, `*=` e `/=` combinam uma operação com a reatribuição. pontos `+=` 5 equivale, neste caso simples, a pontos = pontos + 5. Eles precisam de uma variável ou propriedade que possa receber o novo valor.",
          "`++` e `--` aumentam ou diminuem o valor em um. Na forma posfixada, como contador++, a expressão produz o valor anterior; na forma prefixada, como ++contador, produz o novo valor. Ambos atualizam o contador.",
          "Para quem está começando, prefira deixar incrementos em instruções próprias, em vez de misturá-los a cálculos longos. Assim, a ordem dos efeitos fica mais fácil de acompanhar.",
        ],
        `let pontos = 10;
pontos += 5;
pontos *= 2;
console.log(pontos); // 30

let contador = 1;
console.log(contador++); // 1; agora contador vale 2
console.log(++contador); // 3; agora contador vale 3`,
      ),
      section(
        "Valor padrão: falsy não é o mesmo que ausente",
        [
          "`||` devolve o primeiro operando se ele for truthy; caso contrário, devolve o segundo. `??` usa o segundo operando apenas quando o primeiro é `null` ou `undefined`. Essa diferença preserva valores como 0, `false` e uma `string` vazia quando eles são válidos.",
          "Um limite de tentativas igual a 0 pode significar que nenhuma tentativa é permitida. Usar `||` substituiria esse zero por outro número, enquanto `??` o preservaria. Defina o significado do dado antes de escolher o operador.",
          "Não misture `??` diretamente com `&&` ou `||` sem parênteses: a linguagem exige agrupamento explícito. Curto-circuito também significa que expressões do lado direito podem nem ser avaliadas.",
        ],
        `const tentativas = 0;
console.log(tentativas || 3); // 3
console.log(tentativas ?? 3); // 0
console.log(null ?? "sem valor"); // sem valor
console.log("" ?? "texto padrão"); // string vazia
console.log((null ?? "") || "visitante"); // visitante`,
      ),
      section(
        "Precisão e representação de valores monetários",
        [
          "Os números comuns de JavaScript usam ponto flutuante binário. Nem toda fração decimal tem representação exata nesse formato. Por isso, 0.1 + 0.2 não é estritamente igual a 0.3.",
          "Em cálculos simples de preços com duas casas, trabalhar com quantidades inteiras de centavos evita várias imprecisões das operações com frações. Isso não elimina todas as regras do domínio: descontos, impostos e arredondamentos ainda exigem uma política explícita.",
          "Não confunda apresentação com cálculo. Formatar duas casas com `toFixed(2)` cria um texto. Para comparar valores aproximados em outros problemas, é preciso escolher uma tolerância adequada ao domínio, não supor que uma tolerância única resolve qualquer escala.",
        ],
        `console.log(0.1 + 0.2 === 0.3); // false
const precoEmCentavos = 1990;
const quantidade = 3;
const totalEmCentavos = precoEmCentavos * quantidade;
console.log(totalEmCentavos); // 5970
console.log((totalEmCentavos / 100).toFixed(2)); // "59.70"`,
      ),
    ],
    mistakes: [
      "Usar `||` como padrão e sobrescrever um zero que deveria ser preservado.",
      "Guardar o resultado de `toFixed()` esperando continuar com um número.",
    ],
    practices: [
      "Evite efeitos colaterais escondidos em expressões grandes.",
      "Defina regras de unidade e arredondamento antes de calcular dinheiro.",
    ],
    exercises: [
      exercise(
        "Use `??` para preservar uma configuração de volume igual a zero e fornecer 50 apenas quando estiver ausente.",
        "Compare 0 `??` 50 com `undefined` `??` 50.",
        `const volumeSalvo = 0;
const volumeAusente = undefined;
console.log(volumeSalvo ?? 50); // 0
console.log(volumeAusente ?? 50); // 50`,
      ),
      exercise(
        "Calcule o total de dois itens de R$ 12,35 e frete de R$ 4,50 usando centavos.",
        "Represente os valores como 1235 e 450 antes de fazer a conta.",
        `const totalEmCentavos = 2 * 1235 + 450;
console.log(totalEmCentavos); // 2920
console.log((totalEmCentavos / 100).toFixed(2)); // "29.20"`,
      ),
    ],
    summary: [
      "Atribuições compostas atualizam valores; prefixo e posfixo produzem resultados diferentes.",
      "`??` preserva zero, `false` e `string` vazia ao tratar ausência.",
      "Unidades inteiras e regras de arredondamento tornam cálculos mais previsíveis.",
    ],
  },
  6: {
    short: "Faixas, validação de dados e escolhas com if, switch e ternário",
    duration: 55,
    objectives: [
      "Validar intervalos e combinar critérios sem caminhos ambíguos.",
      "Separar a condição de negócio da verdade lógica de um valor.",
    ],
    sections: [
      section(
        "Intervalos e condições que não se sobrepõem",
        [
          "Para verificar se um número está entre dois limites, escreva duas comparações ligadas por `&&`. A expressão 10 <= idade <= 20 não representa um intervalo matemático em JavaScript: a primeira comparação produz um booleano, que passa a participar da próxima operação.",
          "Em uma classificação, confira se todos os valores relevantes têm um caminho e se os limites estão incluídos onde deveriam. Os testes mais úteis costumam ser exatamente o limite e seus vizinhos.",
          "No exemplo, temperaturas abaixo de zero recebem uma mensagem, de zero até 30 recebem outra e valores maiores recebem a última. A ordem e os operadores tornam cada faixa explícita.",
        ],
        `const temperatura = 30;
if (temperatura < 0) {
  console.log("Abaixo de zero");
} else if (temperatura >= 0 && temperatura <= 30) {
  console.log("Faixa de zero a trinta");
} else {
  console.log("Acima de trinta");
}
const idade = 16;
console.log(idade >= 10 && idade <= 20); // true`,
      ),
      section(
        "Dados válidos antes da decisão",
        [
          'Um `if` não valida automaticamente o significado de um valor. O texto "`false`" é truthy; uma idade negativa também é truthy. Isso não quer dizer que representem autorização ou uma idade aceitável.',
          "Separe a validação de formato da decisão de negócio. Primeiro confira se a entrada está vazia e se a conversão produziu um inteiro dentro de uma faixa razoável. Só depois decida se a idade permite participar.",
          "Blocos aninhados podem representar essa sequência. Quando aprender funções, você poderá simplificar algumas dessas verificações com retornos antecipados. Aqui mantemos todas as etapas visíveis.",
        ],
        `const entrada = "18";
const idade = Number(entrada);
const idadeValida = entrada.trim() !== "" && Number.isInteger(idade)
  && idade >= 0 && idade <= 120;
if (!idadeValida) {
  console.log("Idade inválida");
} else if (idade >= 16) {
  console.log("Pode participar");
} else {
  console.log("Ainda não tem a idade mínima");
}`,
      ),
      section(
        "Escolha entre if, switch e operador condicional",
        [
          "Use `if` para faixas e combinações de condições. `switch` costuma ficar mais legível para comparar um mesmo valor com opções discretas. O operador condicional é útil para selecionar entre dois valores curtos, não para esconder um fluxo inteiro em uma expressão.",
          "Cada `case` não cria sozinho um novo escopo de bloco. Se você precisar declarar `const` ou `let` em vários casos, adicione chaves a cada um para manter os nomes locais separados. `break` continua necessário para evitar uma continuação involuntária.",
          "Uma decisão deve ser legível para quem volta ao código semanas depois. Evite níveis demais de aninhamento e valores misteriosos; nomes que explicam a condição ajudam mais que uma expressão compacta.",
        ],
        `const acao = "salvar";
switch (acao) {
  case "salvar": {
    const mensagem = "Dados salvos";
    console.log(mensagem);
    break;
  }
  case "cancelar": {
    const mensagem = "Operação cancelada";
    console.log(mensagem);
    break;
  }
  default:
    console.log("Ação desconhecida");
}
const ativo = true;
const rotulo = ativo ? "Ativo" : "Inativo";
console.log(rotulo);`,
      ),
    ],
    mistakes: [
      "Escrever uma comparação encadeada como 0 <= nota <= 10.",
      "Tratar qualquer valor truthy como se fosse um dado válido.",
    ],
    practices: [
      "Teste os valores de fronteira de cada faixa.",
      "Separe validação de entrada e decisão de negócio.",
    ],
    exercises: [
      exercise(
        "Classifique notas de 0 a 10: inválida fora dessa faixa, aprovado a partir de 6 e revisão abaixo de 6.",
        "Verifique a faixa inválida antes de classificar aprovação.",
        `const nota = 6;
if (!Number.isFinite(nota) || nota < 0 || nota > 10) {
  console.log("Nota inválida");
} else if (nota >= 6) {
  console.log("Aprovado");
} else {
  console.log("Revisão");
}`,
      ),
      exercise(
        'Calcule um rótulo "Disponível" ou "Esgotado" a partir de um estoque, usando o operador condicional.',
        "A condição deve comparar estoque com zero.",
        `const estoque = 0;
const rotulo = estoque > 0 ? "Disponível" : "Esgotado";
console.log(rotulo); // Esgotado`,
      ),
    ],
    summary: [
      "Um intervalo exige comparações explícitas para os dois limites.",
      "Dados truthy ainda podem ser inválidos para a regra de negócio.",
      "Escolha a estrutura que deixe as alternativas e seus escopos mais claros.",
    ],
  },
  7: {
    short: "Contadores, acumuladores, buscas e repetições aninhadas",
    duration: 60,
    objectives: [
      "Percorrer índices e usar acumuladores sem reinicializá-los a cada volta.",
      "Controlar buscas e repetições aninhadas.",
    ],
    sections: [
      section(
        "Índices, limites e acumuladores",
        [
          "Ao percorrer um array pelo índice, comece em 0 e continue enquanto o índice for menor que `length`. Para uma lista com três valores, os índices válidos são 0, 1 e 2. Usar <= `length` executaria uma volta extra.",
          "Um acumulador guarda um resultado parcial entre as voltas. Declare-o antes do laço; se ele for reiniciado dentro do bloco, perderá o total a cada repetição. Você pode usar o mesmo padrão para somar, contar ou montar texto.",
          "O índice serve quando a posição também importa, como numerar uma lista. Se você só precisa dos valores, `for...of` costuma ser uma escolha mais direta.",
        ],
        `const precos = [10, 15, 8];
let total = 0;
for (let indice = 0; indice < precos.length; indice++) {
  total += precos[indice];
  console.log("Item", indice + 1, "valor", precos[indice]);
}
console.log("Total:", total); // 33`,
      ),
      section(
        "Buscar e interromper no momento certo",
        [
          "Se o objetivo é encontrar apenas o primeiro resultado, continuar percorrendo tudo pode ser desnecessário. Use `break` depois de registrar o item encontrado. Se nenhum item passar, mantenha um valor explícito de ausência, como `null`.",
          "`continue` só pula a parte restante da volta atual. Em um `while`, uma atualização colocada depois de `continue` pode ser ignorada, deixando a condição sempre verdadeira. Por isso, verifique todos os caminhos que precisam avançar o estado.",
          "Evite alterar o tamanho da própria coleção enquanto a percorre, até entender bem as consequências. Itens removidos podem mudar de posição e fazer o laço pular valores.",
        ],
        `const notas = [4, 5, 8, 9];
let primeiraAprovada = null;
for (const nota of notas) {
  if (nota < 6) {
    continue;
  }
  primeiraAprovada = nota;
  break;
}
console.log(primeiraAprovada); // 8`,
      ),
      section(
        "Repetições aninhadas e do...while",
        [
          "Um laço pode conter outro. Para cada volta do externo, o interno executa seu próprio conjunto de voltas. Isso permite representar tabelas e combinações, mas a quantidade de operações cresce com o produto dos tamanhos.",
          "`break` sem rótulo encerra apenas o laço mais interno em que aparece. Prefira começar com limites pequenos, como duas linhas e três colunas, e desenhar a sequência esperada para não se perder.",
          "`do...while` verifica a condição depois do bloco, então executa ao menos uma vez. Use quando essa primeira execução for intencional. Não o use como substituto automático de `while`, que pode executar zero vezes.",
        ],
        `for (let linha = 1; linha <= 2; linha++) {
  for (let coluna = 1; coluna <= 3; coluna++) {
    console.log("Célula", linha, coluna);
  }
}
let tentativas = 0;
do {
  tentativas++;
  console.log("Tentativa", tentativas);
} while (tentativas < 1);`,
      ),
    ],
    mistakes: [
      "Reiniciar o acumulador dentro do laço.",
      "Supor que `break` encerra todos os laços aninhados.",
    ],
    practices: [
      "Confira zero itens, um item e vários itens ao testar um laço.",
      "Evite modificar a estrutura da lista durante uma travessia simples.",
    ],
    exercises: [
      exercise(
        "Conte quantas notas em [4, 7, 8, 5, 10] são pelo menos 6, usando um laço.",
        "Inicialize a contagem antes do laço e aumente só quando a condição passar.",
        `let aprovadas = 0;
for (const nota of [4, 7, 8, 5, 10]) {
  if (nota >= 6) {
    aprovadas++;
  }
}
console.log(aprovadas); // 3`,
      ),
      exercise(
        "Encontre o primeiro número maior que 20 em [8, 15, 23, 40] e pare a busca.",
        "Guarde o resultado antes de usar `break`.",
        `let encontrado = null;
for (const numero of [8, 15, 23, 40]) {
  if (numero > 20) {
    encontrado = numero;
    break;
  }
}
console.log(encontrado); // 23`,
      ),
    ],
    summary: [
      "Índices vão de zero a `length` - 1; acumuladores vivem fora do laço.",
      "`break` e `continue` controlam o caminho de cada repetição.",
      "Laços aninhados multiplicam o trabalho e `do...while` roda ao menos uma vez.",
    ],
  },
  8: {
    short: "Retorno, callbacks, parâmetros rest, funções puras e closures",
    duration: 75,
    objectives: [
      "Usar callbacks, parâmetros rest e retornos antecipados.",
      "Reconhecer closures e distinguir funções puras de efeitos externos.",
    ],
    sections: [
      section(
        "Retornos antecipados e responsabilidade única",
        [
          "Uma função pode ter mais de um `return`, embora cada chamada termine no primeiro que alcançar. Isso permite tratar entradas inválidas no começo e deixar o caminho principal menos aninhado. O valor escolhido para indicar invalidez precisa fazer parte do contrato da função.",
          "Uma função pura depende apenas dos argumentos e não altera estado externo. Para as mesmas entradas, produz o mesmo resultado. Nem toda função precisa ser pura: atualizar a página é um efeito legítimo, mas separar o cálculo da apresentação facilita testes.",
          "No exemplo, calcularPreco retorna `null` para dados inválidos. Quem chama decide como apresentar esse resultado. Observe que o `console` fica fora da função de cálculo.",
        ],
        `function calcularPreco(preco, quantidade) {
  if (!Number.isFinite(preco) || preco < 0) {
    return null;
  }
  if (!Number.isInteger(quantidade) || quantidade < 1) {
    return null;
  }
  return preco * quantidade;
}
console.log(calcularPreco(12, 3)); // 36
console.log(calcularPreco(12, 0)); // null`,
      ),
      section(
        "Funções são valores: callbacks e parâmetros rest",
        [
          "Funções podem ser guardadas em variáveis, passadas como argumentos e retornadas por outras funções. Um callback é uma função recebida por outra para ser chamada em um momento definido. Ele não é necessariamente assíncrono: no exemplo, a chamada acontece imediatamente.",
          "O parâmetro rest, escrito com três pontos antes do nome, reúne os argumentos restantes em um array. Ele precisa ser o último parâmetro. Isso permite escrever funções que aceitam uma quantidade variável de valores sem consultar variáveis globais.",
          "O importante é combinar o contrato: quais argumentos o callback recebe e qual resultado deve devolver? Nomes e exemplos pequenos ajudam a deixar essa relação explícita.",
        ],
        `function aplicar(valor, transformar) {
  return transformar(valor);
}
console.log(aplicar(5, (numero) => numero * 3)); // 15

function somar(...numeros) {
  let total = 0;
  for (const numero of numeros) {
    total += numero;
  }
  return total;
}
console.log(somar(2, 3, 4)); // 9
console.log(somar()); // 0`,
      ),
      section(
        "Closures: uma função lembra seu escopo",
        [
          "Uma closure permite que uma função continue acessando associações do escopo onde foi criada, mesmo depois de a função externa terminar. Isso não é uma cópia congelada dos valores: a associação pode continuar sendo atualizada.",
          "Na fábrica de contadores, cada chamada cria uma variável quantidade própria. A função retornada consegue lê-la e atualizá-la, mas o código externo não tem acesso direto a ela. Duas fábricas produzem estados independentes.",
          "Use esse padrão quando ele ajudar a organizar estado, não para esconder toda a lógica. Ao depurar callbacks, pergunte quais nomes pertencem ao escopo externo e em que momento eles podem mudar.",
        ],
        `function criarContador() {
  let quantidade = 0;
  return () => {
    quantidade += 1;
    return quantidade;
  };
}
const contarA = criarContador();
const contarB = criarContador();
console.log(contarA()); // 1
console.log(contarA()); // 2
console.log(contarB()); // 1`,
      ),
    ],
    mistakes: [
      "Achar que todo callback executa mais tarde de forma assíncrona.",
      "Alterar variáveis externas dentro de um cálculo sem perceber o efeito.",
    ],
    practices: [
      "Documente os argumentos e o significado do retorno.",
      "Separe cálculos puros de operações que atualizam estado ou interface.",
    ],
    exercises: [
      exercise(
        "Crie uma função `somarPositivos(...valores)` que `some` apenas números maiores que zero.",
        "Use rest para receber um array e um acumulador para percorrê-lo.",
        `function somarPositivos(...valores) {
  let total = 0;
  for (const valor of valores) {
    if (Number.isFinite(valor) && valor > 0) {
      total += valor;
    }
  }
  return total;
}
console.log(somarPositivos(3, -2, 4, 0)); // 7`,
      ),
      exercise(
        "Crie uma fábrica `criarSaudacao(prefixo)` que retorne uma função que recebe nome e monta uma mensagem.",
        "A função interna deve usar o prefixo do escopo externo.",
        `function criarSaudacao(prefixo) {
  return (nome) => \`\${prefixo}, \${nome}!\`;
}
const darBoasVindas = criarSaudacao("Bem-vinda");
console.log(darBoasVindas("Lia"));`,
      ),
    ],
    summary: [
      "Retornos antecipados tornam validações e contratos mais explícitos.",
      "Callbacks são funções passadas como valores; rest reúne argumentos em um array.",
      "Closures preservam o acesso ao escopo de criação e podem manter estado local.",
    ],
  },
  9: {
    short: "Transformação, redução, ordenação e cópia de listas",
    duration: 85,
    objectives: [
      "Acumular dados com `reduce` e testar condições com `some`/`every`.",
      "Distinguir métodos que alteram a lista de operações que criam cópias.",
    ],
    sections: [
      section(
        "Somatórios e verificações de uma coleção",
        [
          "`reduce()` percorre o array carregando um acumulador. O callback recebe o acumulador e o item atual, e seu retorno se torna o acumulador da próxima volta. Informe um valor inicial, principalmente quando a lista puder estar vazia.",
          "`some()` responde se pelo menos um item passa em uma condição; `every()` verifica se todos passam. Ambos interrompem a busca quando o resultado já é conhecido. Em uma lista vazia, `some()` retorna `false` e `every()` retorna `true`: não há item que viole a condição.",
          "Nem todo laço deve virar `reduce`. Use o método quando a transformação em um único resultado estiver clara; um `for...of` com acumulador também pode ser a opção mais legível para uma regra complexa.",
        ],
        `const notas = [5, 8, 9];
const soma = notas.reduce((total, nota) => total + nota, 0);
console.log(soma); // 22
console.log(notas.some((nota) => nota < 6)); // true
console.log(notas.every((nota) => nota >= 6)); // false
console.log([].reduce((total, numero) => total + numero, 0)); // 0
console.log([].every((numero) => numero > 0)); // true`,
      ),
      section(
        "Recortar, remover e combinar listas",
        [
          "`slice(inicio, fim)` retorna uma cópia de uma faixa, sem incluir o índice fim. `splice(inicio, quantidade, ...itens)` altera o array: remove itens e pode inserir outros na posição. O retorno de `splice` é o array dos itens removidos.",
          "O espalhamento em [...lista] cria uma cópia superficial. Ele também permite combinar listas. Os itens que forem objetos continuam sendo referências aos mesmos objetos; copiar o array não copia profundamente cada item.",
          "Desestruturação extrai posições para variáveis. O operador rest pode reunir os itens restantes, agora no lado da atribuição. Use nomes que indiquem o papel da posição para não depender de números espalhados no código.",
        ],
        `const assuntos = ["HTML", "CSS", "DOM", "Eventos"];
console.log(assuntos.slice(1, 3)); // ["CSS", "DOM"]
const removidos = assuntos.splice(1, 1, "JavaScript");
console.log(removidos); // ["CSS"]
console.log(assuntos);
const ampliada = [...assuntos, "JSON"];
const [primeiro, ...restantes] = ampliada;
console.log(primeiro, restantes);`,
      ),
      section(
        "Ordenação numérica sem surpresas",
        [
          "`sort()` altera o array original. Sem uma função comparadora, ele compara representações textuais, então [2, 10, 1] não fica automaticamente em ordem numérica. Para números crescentes, use (a, b) `=>` a - b; para decrescentes, b - a.",
          "Uma comparação negativa coloca a antes de b; positiva coloca a depois; zero indica equivalência para aquela ordenação. Para preservar o original, faça uma cópia antes de ordenar. `reverse()` também altera o array em que é chamado.",
          'Para textos, `localeCompare()` permite considerar regras linguísticas. Se o domínio depender de ordenação específica de português, indique "pt-BR" e teste casos com acentos. Não misture critérios numéricos e textuais sem definir uma política.',
        ],
        `const numeros = [2, 10, 1, 25];
const crescente = [...numeros].sort((a, b) => a - b);
console.log(crescente); // [1, 2, 10, 25]
console.log(numeros); // original preservado
const nomes = ["Zélia", "Ana", "Caio"];
console.log([...nomes].sort((a, b) => a.localeCompare(b, "pt-BR")));`,
      ),
      section(
        "Encadeamento e conversão entre texto e lista",
        [
          "`split()` divide um texto em partes de acordo com um separador. `join()` combina os itens de um array em uma `string` com um separador escolhido. Um texto vazio e espaços extras precisam ser considerados ao preparar entradas.",
          "É possível encadear `map` e `filter` para limpar e selecionar dados. Cada etapa deve ter uma responsabilidade clara. Para investigar o resultado, guarde etapas intermediárias em variáveis em vez de criar uma linha difícil de ler.",
          "Use `findIndex()` quando precisar da posição do primeiro item que passa em uma condição. Ele retorna -1 quando não encontra; não use esse valor diretamente como posição para remover um item, pois `splice(-1, 1)` removeria o último.",
        ],
        `const entrada = " DOM, Eventos, , JSON ";
const assuntos = entrada.split(",")
  .map((assunto) => assunto.trim())
  .filter((assunto) => assunto !== "");
console.log(assuntos.join(" • "));
const indice = assuntos.findIndex((assunto) => assunto === "Eventos");
if (indice !== -1) {
  assuntos.splice(indice, 1);
}
console.log(assuntos);`,
      ),
    ],
    mistakes: [
      "Usar `sort()` sem comparador esperando ordenação numérica.",
      "Passar -1 de uma busca malsucedida diretamente para `splice()`.",
    ],
    practices: [
      "Declare o valor inicial de `reduce()`.",
      "Confira quais métodos mutam o original antes de compartilhar uma lista.",
    ],
    exercises: [
      exercise(
        "Ordene [15, 3, 22, 8] de forma decrescente, preserve a lista original e calcule a soma.",
        "Copie com spread, ordene com b - a e acumule com `reduce`.",
        `const valores = [15, 3, 22, 8];
const ordenados = [...valores].sort((a, b) => b - a);
const soma = valores.reduce((total, valor) => total + valor, 0);
console.log(ordenados, soma); // [22, 15, 8, 3], 48
console.log(valores);`,
      ),
      exercise(
        'Transforme "  DOM, , eventos, `JSON` " em uma lista limpa em minúsculas e verifique se todos os itens são não vazios.',
        "Separe por vírgula, normalize com `map` e remova vazios com `filter`.",
        `const assuntos = "  DOM, , eventos, JSON ".split(",")
  .map((item) => item.trim().toLowerCase())
  .filter((item) => item !== "");
console.log(assuntos);
console.log(assuntos.every((item) => item.length > 0)); // true`,
      ),
    ],
    summary: [
      "`reduce` acumula; `some` e `every` respondem perguntas sobre a coleção.",
      "`slice` copia faixas, `splice` altera a lista e spread faz cópias superficiais.",
      "`sort` precisa de comparador para números; `findIndex` usa -1 para ausência.",
      "`split`, `map`, `filter` e `join` podem formar uma transformação legível em etapas.",
    ],
  },
  10: {
    short: "Propriedades, métodos, dados opcionais e objetos aninhados",
    duration: 75,
    objectives: [
      "Percorrer propriedades próprias e acessar dados opcionais.",
      "Usar métodos, desestruturação e cópias de objetos aninhados com cuidado.",
    ],
    sections: [
      section(
        "Enumerar propriedades e verificar existência",
        [
          "`Object.keys()` retorna nomes de propriedades próprias enumeráveis; `Object.values()` retorna seus valores; `Object.entries()` retorna pares de chave e valor. Esses arrays podem ser percorridos e transformados com os métodos que você já conhece.",
          "`Object.hasOwn(objeto, chave)` verifica se a propriedade pertence ao próprio objeto, inclusive quando seu valor é `undefined`. Isso é diferente de apenas ler `objeto.chave` e comparar o resultado com `undefined`.",
          "O operador `in` também verifica propriedades herdadas. Como ainda não estamos modelando protótipos, prefira `Object.hasOwn` quando a intenção for conferir campos de um registro de dados.",
        ],
        `const perfil = { nome: "Lia", pontos: 20, apelido: undefined };
console.log(Object.keys(perfil));
console.log(Object.values(perfil));
for (const [chave, valor] of Object.entries(perfil)) {
  console.log(chave, valor);
}
console.log(Object.hasOwn(perfil, "apelido")); // true
console.log(Object.hasOwn(perfil, "cidade")); // false`,
      ),
      section(
        "Dados opcionais e valores padrão",
        [
          "O encadeamento opcional `?.` interrompe o acesso e retorna `undefined` quando o valor imediatamente anterior é `null` ou `undefined`. Ele ajuda a consultar dados incompletos sem tentar acessar uma propriedade de uma ausência.",
          'Combine `?.` com `??` para fornecer um padrão apenas quando faltar valor. Na desestruturação, um padrão como nome = "visitante" só se aplica a `undefined`, não a `null`. Essa diferença importa quando dados chegam de formulários ou armazenamento.',
          "O encadeamento opcional não declara nomes que não existem e não valida o formato completo do dado. Ele também não pode ser usado no lado esquerdo de uma atribuição: use uma verificação explícita antes de atualizar uma estrutura opcional.",
        ],
        `const perfil = { nome: "Lia", contato: null, pontos: 0 };
console.log(perfil.contato?.email ?? "E-mail não informado");
console.log(perfil.pontos ?? 10); // 0
const { nome: nomeExibido, cidade = "Não informada" } = perfil;
console.log(nomeExibido, cidade);
const { apelido = "visitante" } = { apelido: null };
console.log(apelido); // null, o padrão não substitui null`,
      ),
      section(
        "Métodos e o valor de this",
        [
          "Um método pode usar `this` para acessar o objeto que recebe a chamada. Em `conta.depositar(5)`, a chamada feita por meio de conta fornece esse objeto como `this`. O método não fica permanentemente ligado à variável conta.",
          "Se você extrair o método e chamá-lo como uma função solta, o contexto pode mudar. Arrow functions não criam um `this` próprio; por isso não são uma substituição automática para métodos que precisam do objeto receptor.",
          "Para o projeto do curso, funções que recebem os dados como argumentos continuam sendo uma alternativa simples. Aprender `this` serve também para reconhecer quando um trecho depende da forma como é chamado.",
        ],
        `const conta = {
  saldo: 10,
  depositar(valor) {
    this.saldo += valor;
    return this.saldo;
  }
};
console.log(conta.depositar(5)); // 15
const outraConta = { saldo: 100, depositar: conta.depositar };
console.log(outraConta.depositar(5)); // 105
console.log(conta.saldo); // 15`,
      ),
      section(
        "Atualização de objetos aninhados e chaves dinâmicas",
        [
          "Uma cópia com spread repete apenas o primeiro nível. Para atualizar um objeto interno sem modificar o original, copie também o nível que será alterado. O resto das referências pode permanecer compartilhado quando isso for intencional.",
          "Chaves calculadas usam colchetes na criação ou atualização: { [campo]: valor }. Elas ajudam a produzir registros a partir de nomes de campos conhecidos. Não aceite qualquer chave externa para modificar configurações sensíveis; escolha uma lista de campos permitidos.",
          "`delete` remove uma propriedade de um objeto. Isso é diferente de atribuir `undefined`: nesse caso a chave continua existindo e `Object.hasOwn` ainda retorna `true`. Mantenha uma estrutura previsível para dados que serão persistidos.",
        ],
        `const original = { nome: "Lia", preferencias: { tema: "claro" } };
const atualizado = {
  ...original,
  preferencias: { ...original.preferencias, tema: "escuro" }
};
console.log(original.preferencias.tema); // claro
console.log(atualizado.preferencias.tema); // escuro
const campo = "cidade";
const registro = { [campo]: "Fortaleza", temporario: true };
delete registro.temporario;
console.log(registro);`,
      ),
    ],
    mistakes: [
      "Achar que um padrão de desestruturação também substitui `null`.",
      "Extrair um método que usa `this` e esperar que o receptor permaneça o mesmo.",
    ],
    practices: [
      "Use `Object.hasOwn` quando a presença da propriedade importa.",
      "Copie explicitamente os níveis que pretende atualizar sem afetar o original.",
    ],
    exercises: [
      exercise(
        "Receba um perfil sem contato e mostre um telefone padrão usando `?.` e `??`.",
        "O acesso opcional deve ficar antes de .telefone.",
        `const perfil = { nome: "Ana" };
const telefone = perfil.contato?.telefone ?? "Sem telefone";
console.log(telefone);`,
      ),
      exercise(
        "Crie uma nova versão de um produto alterando somente `estoque.disponivel`, sem mudar o objeto original.",
        "Faça uma cópia do objeto externo e outra de estoque.",
        `const produto = { nome: "Caderno", estoque: { disponivel: 5 } };
const novo = { ...produto, estoque: { ...produto.estoque, disponivel: 4 } };
console.log(produto.estoque.disponivel); // 5
console.log(novo.estoque.disponivel); // 4`,
      ),
    ],
    summary: [
      "`Object.entries` e `Object.hasOwn` ajudam a inspecionar registros.",
      "`?.` consulta caminhos opcionais e `??` trata ausência, sem validar toda a estrutura.",
      "`this` depende do receptor da chamada; cópias aninhadas exigem decisões por nível.",
    ],
  },
  11: {
    short: "Seletores, atributos, estilos, árvore, inserção e templates",
    duration: 110,
    objectives: [
      "Manipular atributos, propriedades, `dataset`, classes e estilos.",
      "Navegar na árvore e inserir, mover, substituir e remover elementos.",
      "Distinguir coleções estáticas de coleções vivas e usar templates.",
    ],
    sections: [
      section(
        "Seletores específicos e coleções estáticas ou vivas",
        [
          'Além de `querySelector()`, `document.getElementById("id")` encontra um elemento pelo ID sem o caractere #. `getElementsByClassName()` retorna uma `HTMLCollection` viva: ela reflete alterações posteriores na árvore. Já a `NodeList` devolvida por `querySelectorAll()` é estática: representa os resultados no momento da consulta.',
          "Você pode consultar dentro de um elemento, não apenas em `document`. Isso limita a busca a uma região e evita atingir componentes parecidos em outras partes da página. Seletores CSS também permitem combinar classes, atributos e relações entre elementos.",
          "Use `Array.from()` quando precisar de métodos de array em uma coleção DOM. Se for remover itens de uma coleção viva durante uma travessia, uma cópia estática evita que as posições mudem sob o seu laço. Uma `NodeList` estática não inclui automaticamente elementos inseridos depois da consulta.",
        ],
        `const area = document.getElementById("painel");
const estatica = area.querySelectorAll(".assunto");
const viva = area.getElementsByClassName("assunto");
const item = document.createElement("li");
item.className = "assunto";
item.textContent = "Eventos";
area.querySelector("ul").append(item);
console.log(estatica.length); // 2: resultado da consulta anterior
console.log(viva.length); // 3: reflete a inserção
console.log(Array.from(viva).map((elemento) => elemento.textContent));`,
        `<section id="painel"><ul><li class="assunto">DOM</li><li class="assunto">JSON</li></ul></section>`,
      ),
      section(
        "Atributos, propriedades e data-*",
        [
          "`getAttribute()`, `setAttribute()`, `hasAttribute()` e `removeAttribute()` trabalham com atributos HTML. `getAttribute` retorna `string` ou `null`. Propriedades do objeto DOM, como `value`, `checked` e `disabled`, podem representar o estado atual e ter tipos diferentes de strings.",
          'Um atributo booleano é verdadeiro pela presença: `disabled`="`false`" ainda deixa o botão desabilitado. Para controlar o estado, use `botao.disabled` = `false` ou remova o atributo. Em campos, `value` pode mudar com a digitação sem atualizar o atributo `value` original.',
          "`dataset` expõe atributos `data-*` como strings. `data-modulo-id` aparece como `elemento.dataset.moduloId`. Esses dados servem para associar identificadores à interface; não guarde segredos nem trate strings de `dataset` como números sem converter.",
        ],
        `const botao = document.querySelector("#acao");
console.log(botao.hasAttribute("disabled")); // true
botao.disabled = false;
botao.setAttribute("aria-label", "Abrir detalhes do módulo");
console.log(botao.getAttribute("aria-label"));
console.log(botao.dataset.moduloId); // "11"
console.log(Number(botao.dataset.moduloId) + 1); // 12
botao.removeAttribute("title");`,
        `<button id="acao" type="button" disabled title="Ação do módulo" data-modulo-id="11">Ver detalhes</button>`,
      ),
      section(
        "Classes, estilos, visibilidade e foco",
        [
          "`classList.contains()` verifica uma classe e `toggle(nome, forcar)` adiciona ou remove conforme um booleano. Prefira classes para estilos reutilizáveis. `style` permite ajustar estilos inline; para propriedades CSS com hífen ou variáveis customizadas, use `style.setProperty()`.",
          "`elemento.style` mostra os estilos inline, não todas as regras aplicadas. `getComputedStyle()` consulta os valores calculados pelo navegador. Ler geometria com `getBoundingClientRect()` permite obter dimensões e posições relativas à janela; os valores podem mudar com layout e rolagem.",
          "`hidden` esconde visualmente e da árvore de acessibilidade nas condições normais do HTML. Ao revelar uma área importante por uma ação, pense se deve mover o foco com `focus()`. Não mova o foco sem motivo a cada atualização, pois isso pode atrapalhar o uso por teclado.",
        ],
        `const mensagem = document.querySelector("#mensagem");
mensagem.hidden = false;
mensagem.classList.toggle("destaque", true);
mensagem.style.setProperty("border-left", "4px solid #36594c");
mensagem.style.padding = "12px";
console.log(mensagem.classList.contains("destaque")); // true
console.log(getComputedStyle(mensagem).display);
console.log("Largura positiva:", mensagem.getBoundingClientRect().width > 0);
mensagem.focus();`,
        `<p id="mensagem" hidden tabindex="-1">Conteúdo revelado com JavaScript.</p>`,
      ),
      section(
        "Navegação: pais, filhos, irmãos e ancestrais",
        [
          "`parentElement` aponta para o elemento pai; `children` contém apenas filhos que são elementos; `childNodes` inclui também nós de texto e comentários. Espaços e quebras de linha no HTML podem criar nós de texto, então `firstChild` nem sempre é o primeiro elemento.",
          "Use `firstElementChild`, `lastElementChild`, `nextElementSibling` e `previousElementSibling` quando quiser navegar apenas entre elementos. Esses acessos podem retornar `null` quando não há elemento correspondente. Verifique antes de tentar ler propriedades.",
          "`closest(seletor)` procura o próprio elemento e depois seus ancestrais até encontrar um que corresponda. `matches(seletor)` testa o próprio elemento. `contains(outroNo)` verifica pertencimento à subárvore, sendo útil para restringir ações à região esperada.",
        ],
        `const detalhe = document.querySelector("#detalhe");
const cartao = detalhe.closest(".cartao");
console.log(cartao.matches("article")); // true
console.log(cartao.contains(detalhe)); // true
console.log(detalhe.parentElement.tagName); // ARTICLE
console.log(cartao.firstElementChild.textContent); // DOM
console.log(detalhe.previousElementSibling.textContent); // DOM
console.log(cartao.children.length); // 2`,
        `<article class="cartao"><h3>DOM</h3><p id="detalhe">Explore a árvore da página.</p></article>`,
      ),
      section(
        "Inserir, mover, substituir e remover nós",
        [
          "`append()` insere no fim e `prepend()` no começo dos filhos. `before()` e `after()` inserem irmãos em relação a um elemento existente. Esses métodos recebem nós e também strings, que são inseridas como texto, sem interpretação de HTML.",
          "Um nó existente só pode ocupar uma posição na árvore: inserir esse mesmo nó em outro lugar o move, não cria uma cópia. `replaceWith()` troca um nó por outros; `replaceChildren()` substitui os filhos de um contêiner; `remove()` desconecta o próprio nó.",
          "Ao remover ou substituir a área com foco, considere para onde a pessoa deve continuar navegando. Para dados externos, mantenha `createElement` e `textContent` como padrão seguro em vez de concatenar strings em `innerHTML`.",
        ],
        `const lista = document.querySelector("#etapas");
const primeiro = lista.firstElementChild;
const novo = document.createElement("li");
novo.textContent = "Planejar";
lista.prepend(novo);
lista.append(primeiro); // move "Praticar" para o final
const substituto = document.createElement("li");
substituto.textContent = "Revisar";
novo.after(substituto);
novo.remove();
const final = document.createElement("li");
final.textContent = "Compartilhar";
lista.lastElementChild.replaceWith(final);
console.log(Array.from(lista.children).map((item) => item.textContent));`,
        `<ul id="etapas"><li>Praticar</li><li>Construir</li></ul>`,
      ),
      section(
        "Templates, clonagem e DocumentFragment",
        [
          "Um elemento template guarda conteúdo que não é renderizado até ser clonado e inserido. `template.content` é um `DocumentFragment`; `cloneNode(true)` faz uma cópia profunda dos seus nós e descendentes. Isso ajuda a repetir uma estrutura sem escrever HTML em strings de dados.",
          "Listeners registrados por `addEventListener` não são copiados por `cloneNode`. IDs também são clonados: evite duplicá-los na mesma página e registre o comportamento de cada cópia ou use delegação, apresentada no módulo de eventos.",
          "`DocumentFragment` é um contêiner temporário. Ao inseri-lo, seus filhos são movidos para o destino e o fragmento fica vazio. Ele pode organizar a montagem de vários nós fora da árvore visível; não presuma um ganho de desempenho universal sem medir o caso real.",
        ],
        `const modelo = document.querySelector("#modelo");
const fragmento = document.createDocumentFragment();
for (const nome of ["Atributos", "Árvore", "Templates"]) {
  const copia = modelo.content.cloneNode(true);
  copia.querySelector("strong").textContent = nome;
  fragmento.append(copia);
}
document.querySelector("#cartoes").append(fragmento);
console.log("Fragmento ficou vazio:", fragmento.childNodes.length === 0);`,
        `<template id="modelo"><li><strong></strong> — prática de DOM</li></template>
<ul id="cartoes"></ul>`,
      ),
    ],
    mistakes: [
      "Achar que `querySelectorAll()` atualiza seus resultados após inserções.",
      'Escrever `disabled`="`false`" esperando habilitar um botão.',
      "Confundir `childNodes` com `children` ou clonar IDs repetidos.",
    ],
    practices: [
      "Restrinja consultas ao contêiner relevante e confira retornos `null`.",
      "Prefira classes para apresentação e propriedades para estado atual de campos.",
      "Planeje foco e acessibilidade ao ocultar, remover ou substituir elementos.",
    ],
    exercises: [
      exercise(
        'Habilite o botão #enviar, atualize data-estado para "pronto" e adicione uma descrição acessível.',
        "Use `disabled` como booleano, `dataset` para strings e setAttribute para aria-label.",
        `const botao = document.querySelector("#enviar");
botao.disabled = false;
botao.dataset.estado = "pronto";
botao.setAttribute("aria-label", "Enviar atividade concluída");
console.log(botao.dataset.estado);`,
        `<button id="enviar" type="button" disabled data-estado="aguardando">Enviar</button>`,
      ),
      exercise(
        "A partir de #texto, encontre o article ancestral e altere apenas o título dele.",
        'Use `closest("article")` e faça uma consulta dentro do resultado.',
        `const texto = document.querySelector("#texto");
const artigo = texto.closest("article");
if (artigo) {
  artigo.querySelector("h3").textContent = "Título atualizado";
}`,
        `<article><h3>Antes</h3><div><p id="texto">Conteúdo do artigo.</p></div></article>`,
      ),
      exercise(
        "Mova o primeiro item de #fila para o final e remova o item que ficou em primeiro.",
        "`append` pode receber o próprio nó que já estava na lista.",
        `const fila = document.querySelector("#fila");
fila.append(fila.firstElementChild);
fila.firstElementChild.remove();
console.log(Array.from(fila.children).map((item) => item.textContent));`,
        `<ol id="fila"><li>A</li><li>B</li><li>C</li></ol>`,
      ),
      exercise(
        "Crie três itens com um `DocumentFragment` e substitua o conteúdo antigo de #destino.",
        "Monte o fragmento fora da lista e use `replaceChildren(fragmento)`.",
        `const fragmento = document.createDocumentFragment();
for (const assunto of ["Classes", "Atributos", "Nós"]) {
  const item = document.createElement("li");
  item.textContent = assunto;
  fragmento.append(item);
}
document.querySelector("#destino").replaceChildren(fragmento);`,
        `<ul id="destino"><li>Conteúdo antigo</li></ul>`,
      ),
    ],
    summary: [
      "Atributos, propriedades e `dataset` têm papéis e tipos diferentes.",
      "Coleções podem ser estáticas ou vivas; a árvore inclui nós além de elementos.",
      "Inserir um nó existente o move; clonagem, substituição e remoção são operações distintas.",
      "Templates e fragmentos organizam a criação de interfaces; foco e texto seguro continuam essenciais.",
    ],
  },
  12: {
    short: "Propagação, delegação, teclado e duração dos listeners",
    duration: 90,
    objectives: [
      "Aplicar delegação e entender propagação e ação padrão.",
      "Remover listeners e responder ao teclado sem perder a semântica nativa.",
    ],
    sections: [
      section(
        "Propagação e delegação em listas dinâmicas",
        [
          "No percurso de um evento, existe uma fase de captura em direção ao alvo e, para eventos que propagam, uma fase de bubbling em direção aos ancestrais. `addEventListener` usa bubbling por padrão; a opção `capture`: `true` permite observar na captura.",
          "Na delegação, um contêiner recebe eventos dos seus descendentes. Isso evita registrar um listener em cada item e funciona também para itens inseridos depois. `event.target` pode ser um elemento interno, como um span dentro de um botão; use `closest()` para encontrar o controle esperado.",
          "Confira se o controle pertence ao contêiner antes de agir. `dataset` pode identificar a ação. Não use o texto visível do botão como a única regra de negócio, pois ele pode mudar por apresentação ou tradução.",
        ],
        `const lista = document.querySelector("#tarefas");
lista.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const botao = event.target.closest("button[data-acao]");
  if (!botao || !lista.contains(botao)) return;
  if (botao.dataset.acao === "remover") {
    botao.closest("li").remove();
  }
});
const item = document.createElement("li");
item.textContent = "Item adicionado depois ";
const botao = document.createElement("button");
botao.type = "button";
botao.dataset.acao = "remover";
botao.textContent = "Remover";
item.append(botao);
lista.append(item);`,
        `<ul id="tarefas"><li>Revisar DOM <button type="button" data-acao="remover"><span>Remover</span></button></li></ul>`,
      ),
      section(
        "Ação padrão não é propagação",
        [
          "`preventDefault()` tenta cancelar a ação padrão de um evento cancelável, como navegar em um link ou enviar um formulário. Ele não interrompe a propagação. `stopPropagation()` interrompe a continuação do percurso entre nós, mas não cancela por si só a ação padrão.",
          "Use esses recursos apenas quando houver motivo. Cancelar comportamentos nativos sem oferecer uma alternativa pode impedir teclado, rolagem ou navegação. Um listener passivo, registrado com `passive`: `true`, promete não cancelar a ação padrão e não deve chamar `preventDefault()`.",
          "O exemplo cancela a navegação de demonstração, mas o contêiner ainda recebe o clique. Isso permite observar a diferença sem sair da aula. Para ações que não navegam, um botão normalmente é semanticamente melhor que um link.",
        ],
        `const area = document.querySelector("#area-eventos");
const link = document.querySelector("#link-demo");
link.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("Navegação cancelada:", event.defaultPrevented);
});
area.addEventListener("click", () => {
  console.log("O clique também chegou ao contêiner.");
});`,
        `<div id="area-eventos"><a id="link-demo" href="#destino-demo">Testar a propagação</a></div>
<p id="destino-demo">A página não será navegada.</p>`,
      ),
      section(
        "Duração dos listeners: once, remoção e AbortController",
        [
          "A opção `once`: `true` remove um listener após sua primeira execução. `removeEventListener()` permite remover manualmente, desde que você forneça a mesma referência de função e o mesmo valor de `capture` usado no registro.",
          "Duas funções de seta escritas com o mesmo corpo ainda são objetos diferentes. Para remover depois, guarde a função em uma variável ou use uma declaração nomeada. Isso evita acumular listeners ao reconstruir uma interface.",
          "`AbortController` permite reunir listeners com a opção `signal` e removê-los ao chamar `abort()`. Um `signal` abortado não pode ser reutilizado como se estivesse ativo; crie outro controller para um novo ciclo.",
        ],
        `const botao = document.querySelector("#teste");
const parar = document.querySelector("#parar");
const controller = new AbortController();
function registrarClique() {
  console.log("Clique registrado");
}
botao.addEventListener("click", registrarClique, { signal: controller.signal });
botao.addEventListener("click", () => console.log("Mensagem única"), { once: true });
parar.addEventListener("click", () => {
  controller.abort();
  console.log("O listener de registro foi removido.");
}, { once: true });`,
        `<button id="teste" type="button">Testar clique</button>
<button id="parar" type="button">Parar registro</button>`,
      ),
      section(
        "Teclado, foco e controles nativos",
        [
          '`keydown` informa a tecla por `event.key`, como "Escape" ou "Enter". Não dependa de códigos numéricos antigos de teclas. O layout de teclado e a digitação com composição também precisam ser considerados em interações mais avançadas.',
          "Um button nativo já reage a teclado e possui semântica apropriada. Não duplique um handler de clique com outro que simula a mesma ação no Enter, pois isso pode executar duas vezes. Use listeners de teclado para comportamentos extras, como limpar um campo com Escape.",
          "`focus` e `blur` não propagam da mesma forma que `focusin` e `focusout`, que podem ser usados em delegação. Mantenha uma indicação visual de foco e não `capture` atalhos globais comuns sem uma justificativa clara.",
        ],
        `const campo = document.querySelector("#busca");
const status = document.querySelector("#status-busca");
campo.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    campo.value = "";
    status.textContent = "Busca limpa. Continue digitando.";
  }
});
campo.addEventListener("input", () => {
  status.textContent = \`Buscando: \${campo.value}\`;
});`,
        `<label for="busca">Assunto (Escape limpa a busca)</label><input id="busca">
<p id="status-busca" role="status"></p>`,
      ),
    ],
    mistakes: [
      "Confundir `preventDefault()` com `stopPropagation()`.",
      "Tentar remover um listener fornecendo uma nova função anônima.",
    ],
    practices: [
      "Use delegação quando itens forem criados dinamicamente.",
      "Preserve o comportamento de teclado dos elementos nativos e remova listeners quando não forem mais necessários.",
    ],
    exercises: [
      exercise(
        "Use um único listener em #acoes para registrar qual botão foi acionado, inclusive quando o clique ocorrer no span interno.",
        "Encontre o botão com `closest` e leia `data-id`.",
        `const area = document.querySelector("#acoes");
area.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const botao = event.target.closest("button[data-id]");
  if (botao && area.contains(botao)) {
    document.querySelector("#resultado").textContent = \`Ação: \${botao.dataset.id}\`;
  }
});`,
        `<div id="acoes"><button type="button" data-id="revisar"><span>Revisar</span></button><button type="button" data-id="praticar">Praticar</button></div><p id="resultado" role="status"></p>`,
      ),
      exercise(
        "Registre uma mensagem que aparece apenas no primeiro clique, sem usar uma variável de contagem.",
        "A opção `once` faz a remoção automática.",
        `document.querySelector("#iniciar").addEventListener("click", () => {
  document.querySelector("#mensagem").textContent = "Primeiro clique recebido!";
}, { once: true });`,
        `<button id="iniciar" type="button">Iniciar</button><p id="mensagem" role="status"></p>`,
      ),
    ],
    summary: [
      "Delegação usa a propagação para tratar elementos atuais e futuros.",
      "Cancelar a ação padrão e interromper propagação são decisões diferentes.",
      "Referências estáveis, `once` e `AbortController` controlam a duração de listeners.",
      "Controles nativos e `event.key` ajudam a preservar o acesso pelo teclado.",
    ],
  },
  13: {
    short: "FormData, controles, validação cruzada e mensagens acessíveis",
    duration: 90,
    objectives: [
      "Ler controles distintos com `FormData` e `getAll`.",
      "Criar validação cruzada, mensagens acessíveis e limpeza coerente do formulário.",
    ],
    sections: [
      section(
        "FormData, name e valores repetidos",
        [
          "`new` `FormData(formulario)` reúne os controles elegíveis para envio. O atributo `name` identifica a chave; `id` associa rótulos e seletores, mas não substitui `name`. Campos desabilitados e checkboxes não marcados não entram normalmente na coleção.",
          "`get(nome)` retorna o primeiro valor ou `null`; `getAll(nome)` retorna todos os valores da chave. Isso é útil para vários checkboxes com o mesmo `name`. Valores de texto continuam sendo strings; faça conversões explícitas para contas.",
          "`Object.fromEntries(formData)` é conveniente para chaves únicas, mas perde valores repetidos ao ficar com apenas um por chave. `FormData` também pode conter arquivos; não suponha que todo valor sempre será `string` em qualquer formulário.",
        ],
        `document.querySelector("#preferencias").addEventListener("submit", (event) => {
  event.preventDefault();
  const dados = new FormData(event.currentTarget);
  console.log("Nome:", dados.get("nome"));
  console.log("Assuntos:", dados.getAll("assunto"));
  console.log("Turno:", dados.get("turno"));
});`,
        `<form id="preferencias"><label for="aluno">Nome</label><input id="aluno" name="nome" required>
<label><input type="checkbox" name="assunto" value="DOM" checked> DOM</label>
<label><input type="checkbox" name="assunto" value="Eventos"> Eventos</label>
<label for="turno">Turno</label><select id="turno" name="turno"><option value="manha">Manhã</option><option value="noite">Noite</option></select>
<button type="submit">Ver dados</button></form>`,
      ),
      section(
        "Validação cruzada e setCustomValidity",
        [
          'Uma regra pode envolver mais de um campo, como confirmar uma senha. `setCustomValidity(mensagem)` torna o controle inválido enquanto a mensagem for não vazia. Para retirar o erro, chame `setCustomValidity("")`; ele não desaparece automaticamente quando o valor muda.',
          "Atualize a validação no evento `input` dos campos envolvidos. Assim, a mensagem é recalculada antes da próxima tentativa de envio. `checkValidity()` retorna se o controle atende às restrições; `reportValidity()` também pede ao navegador para apresentar os problemas.",
          "A demonstração não salva nem envia senhas e não é um sistema de autenticação. Regras reais de autenticação envolvem servidor, armazenamento adequado e outros cuidados. Aqui, o objetivo é entender uma restrição entre campos.",
        ],
        `const form = document.querySelector("#senhas");
const senha = document.querySelector("#senha");
const confirmar = document.querySelector("#confirmar");
function validarConfirmacao() {
  const diferente = confirmar.value !== senha.value;
  confirmar.setCustomValidity(diferente ? "As senhas precisam ser iguais." : "");
  confirmar.setAttribute("aria-invalid", String(!confirmar.validity.valid));
}
senha.addEventListener("input", validarConfirmacao);
confirmar.addEventListener("input", validarConfirmacao);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#retorno-senha").textContent = "Conferência concluída; nenhum dado foi enviado.";
});`,
        `<form id="senhas"><label for="senha">Senha de demonstração (mínimo 6 caracteres)</label><input id="senha" type="password" required minlength="6" autocomplete="new-password">
<label for="confirmar">Confirme a senha</label><input id="confirmar" type="password" required minlength="6" autocomplete="new-password" aria-describedby="retorno-senha">
<button type="submit">Conferir</button></form><p id="retorno-senha" role="status"></p>`,
      ),
      section(
        "Checkbox, select e reset: estado atual dos controles",
        [
          "Para checkbox e radio, `checked` informa a seleção atual; `value` costuma ser uma `string` de identificação, não o estado de marcação. Para select simples, `value` traz o valor da opção selecionada. Em um select múltiplo, consulte `selectedOptions` ou use `FormData.getAll()`.",
          '`form.reset()` restaura valores padrão definidos no HTML; não significa necessariamente apagar tudo. Um campo com `value`="Lia" volta para Lia. Mensagens externas, estado em arrays e erros definidos com setCustomValidity não são automaticamente sincronizados por reset.',
          "Se a aplicação mantém estado próprio, escreva uma função de limpeza para restaurar também mensagens e validação. Não apague o formulário antes de confirmar que a operação importante foi concluída, pois a pessoa pode precisar corrigir ou reenviar os dados.",
        ],
        `const form = document.querySelector("#opcoes");
const aceita = document.querySelector("#aceita");
const nivel = document.querySelector("#nivel");
const status = document.querySelector("#estado-opcoes");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  status.textContent = \`Aceite: \${aceita.checked}. Nível: \${nivel.value}.\`;
});
form.addEventListener("reset", () => {
  status.textContent = "Valores padrão restaurados.";
});`,
        `<form id="opcoes"><label><input id="aceita" type="checkbox" value="sim" checked> Quero receber lembretes</label>
<label for="nivel">Nível</label><select id="nivel"><option value="iniciante">Iniciante</option><option value="intermediario">Intermediário</option></select>
<button type="submit">Conferir</button><button type="reset">Restaurar padrão</button></form><p id="estado-opcoes" role="status"></p>`,
      ),
      section(
        "Mensagens de erro que orientam a correção",
        [
          "Uma mensagem útil diz qual campo precisa mudar e o que é esperado. Associe a instrução ao controle com aria-describedby e use aria-invalid para refletir o erro conhecido. Não comunique a falha só por cor.",
          "Ao validar após o envio, mantenha o texto digitado para a correção e direcione o foco ao primeiro campo inválido quando isso ajudar. Evite mensagens agressivas a cada tecla antes de a pessoa ter chance de terminar a entrada.",
          "O exemplo usa `novalidate` para demonstrar um fluxo de mensagem próprio. Isso desativa a apresentação automática no envio, não a necessidade de conferir os dados. Nunca remova a validação nativa sem substituir os cuidados de orientação e acessibilidade.",
        ],
        `const form = document.querySelector("#apelido-form");
const campo = document.querySelector("#apelido");
const erro = document.querySelector("#erro-apelido");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const apelido = campo.value.trim();
  const valido = apelido.length >= 3 && apelido.length <= 20;
  campo.setAttribute("aria-invalid", String(!valido));
  erro.textContent = valido ? "Apelido aceito." : "Use de 3 a 20 caracteres, sem contar os espaços externos.";
  if (!valido) campo.focus();
});`,
        `<form id="apelido-form" novalidate><label for="apelido">Apelido</label><input id="apelido" required minlength="3" maxlength="20" aria-describedby="erro-apelido"><button type="submit">Validar</button></form><p id="erro-apelido" role="status"></p>`,
      ),
    ],
    mistakes: [
      "Esperar que `id` substitua `name` em `FormData`.",
      "Esquecer de limpar setCustomValidity ou ler `value` de um checkbox como booleano.",
    ],
    practices: [
      "Preserve as entradas quando houver erro e associe mensagens aos campos.",
      "Trate valores repetidos com `getAll()` e limpe explicitamente o estado auxiliar.",
    ],
    exercises: [
      exercise(
        'Ao enviar, leia todos os assuntos marcados e mostre uma lista separada por vírgula, ou "Nenhum assunto".',
        "Use `FormData.getAll()` e `join()`.",
        `document.querySelector("#assuntos-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const assuntos = new FormData(event.currentTarget).getAll("assunto");
  document.querySelector("#selecionados").textContent = assuntos.join(", ") || "Nenhum assunto";
});`,
        `<form id="assuntos-form"><label><input type="checkbox" name="assunto" value="DOM"> DOM</label><label><input type="checkbox" name="assunto" value="JSON"> JSON</label><button type="submit">Conferir</button></form><p id="selecionados" role="status"></p>`,
      ),
      exercise(
        "Valide um nome de 2 a 40 caracteres após `trim` e retorne uma mensagem específica em vez de apenas `true`/`false`.",
        "Retorne a primeira orientação aplicável e `string` vazia no sucesso.",
        `function validarNome(entrada) {
  const nome = entrada.trim();
  if (nome.length < 2) return "Informe ao menos 2 caracteres.";
  if (nome.length > 40) return "Use no máximo 40 caracteres.";
  return "";
}
console.log(validarNome(" A "));
console.log(validarNome(" Lia ") === ""); // true`,
      ),
    ],
    summary: [
      "`FormData` usa `name` e pode conter várias entradas com a mesma chave.",
      "setCustomValidity precisa ser atualizado e limpo explicitamente.",
      "`checked`, `value` e valores padrão representam aspectos diferentes dos controles.",
      "Mensagens associadas e manutenção do foco tornam a correção mais acessível.",
    ],
  },
  14: {
    short: "Serialização, validação, versões e armazenamento entre abas",
    duration: 80,
    objectives: [
      "Validar e versionar dados persistidos.",
      "Distinguir `localStorage`, `sessionStorage` e sincronização entre abas.",
    ],
    sections: [
      section(
        "JSON não preserva todos os tipos de JavaScript",
        [
          "Em objetos, propriedades com `undefined` ou funções são omitidas por `JSON.stringify`. Em arrays, posições com `undefined` são representadas como `null`. `NaN` e `Infinity` também são serializados como `null`. `JSON.parse` não restaura comportamentos, métodos ou tipos especiais automaticamente.",
          "Objetos `Date` usam uma representação textual de data na serialização habitual. Se precisar trabalhar de novo com métodos de data, reconstrua e valide esse valor na leitura. Referências circulares e `bigint` sem tratamento específico fazem stringify lançar erro.",
          "Não use `JSON.parse(JSON.stringify(objeto))` como uma solução universal de cópia: ela perde informações e só funciona para certos dados. Para persistir o projeto, escolha uma estrutura simples de strings, booleanos e listas de objetos com campos conhecidos.",
        ],
        `const registro = {
  titulo: "DOM",
  observacao: undefined,
  numeroInvalido: NaN,
  criadoEm: new Date("2026-01-15T12:00:00Z")
};
const texto = JSON.stringify(registro);
console.log(texto);
const lido = JSON.parse(texto);
console.log(typeof lido.criadoEm); // string
console.log(Object.hasOwn(lido, "observacao")); // false
console.log(JSON.stringify([undefined])); // [null]`,
      ),
      section(
        "Validação de formato e versão dos dados",
        [
          "Um `JSON` pode ser sintaticamente válido e ainda ter o formato errado, como um número no lugar de uma lista. Valide o contêiner e cada campo necessário antes de usar os dados. Evite copiar indiscriminadamente propriedades externas para objetos de configuração.",
          "Um envelope com versao e itens permite reconhecer o formato salvo. Quando a estrutura mudar, você pode migrar versões antigas conhecidas ou oferecer uma recuperação clara. Não trate qualquer formato desconhecido como se fosse a versão atual.",
          "O exemplo lê dois formatos conhecidos e reconstrói os itens usando apenas campos esperados. A versão antiga usa strings; a nova usa objetos com título e conclusão. Uma migração real também precisa definir como lidar com IDs, duplicação e limites do domínio.",
        ],
        `function lerRegistro(texto) {
  const dados = JSON.parse(texto);
  if (!dados || !Array.isArray(dados.itens)) {
    throw new Error("Registro sem lista de itens.");
  }
  if (dados.versao === 1 && dados.itens.every((item) => typeof item === "string" && item.trim() !== "")) {
    return { versao: 2, itens: dados.itens.map((titulo) => ({ titulo: titulo.trim(), concluida: false })) };
  }
  if (dados.versao === 2 && dados.itens.every((item) => item && typeof item.titulo === "string"
    && item.titulo.trim() !== "" && typeof item.concluida === "boolean")) {
    return { versao: 2, itens: dados.itens.map((item) => ({ titulo: item.titulo.trim(), concluida: item.concluida })) };
  }
  throw new Error("Versão ou itens incompatíveis.");
}
try {
  console.log(lerRegistro('{"versao":1,"itens":["DOM","Eventos"]}'));
} catch (erro) {
  console.log("Não foi possível recuperar:", erro.message);
}`,
      ),
      section(
        "localStorage, sessionStorage e eventos entre abas",
        [
          "`localStorage` é compartilhado por documentos da mesma origem e normalmente persiste entre sessões. `sessionStorage` também é separado por origem, mas fica associado à sessão de uma aba; normalmente sobrevive a recargas e é descartado ao encerrar essa sessão. Nenhum deles é armazenamento seguro de segredos.",
          "As operações dessas APIs são síncronas e podem bloquear a execução enquanto trabalham. Para listas pequenas isso costuma ser suficiente; dados grandes e consultas complexas pedem outras soluções, como `IndexedDB`, que está fora do escopo deste projeto.",
          "O evento `storage` é entregue a outros documentos que compartilham aquela área de armazenamento, não à própria janela que fez a gravação. A demonstração abaixo trata um evento sintético, apenas para exercitar o handler no sandbox; para observar a comunicação real de `localStorage`, use duas abas da mesma página fora do iframe.",
          "Sincronizar abas não resolve conflitos automaticamente: duas abas podem gravar versões diferentes e a última gravação substituir a anterior. Defina uma estratégia de recarga, aviso ou conciliação antes de prometer colaboração em tempo real.",
        ],
        `function receberMudanca(event) {
  if (event.key !== "estudos:estado:v2") return;
  try {
    const dados = event.newValue === null ? null : JSON.parse(event.newValue);
    console.log("Mudança observada:", dados);
  } catch (erro) {
    console.log("Mudança ignorada: JSON inválido.");
  }
}
window.addEventListener("storage", receberMudanca);
// Simulação local: não grava e não representa uma segunda aba real.
window.dispatchEvent(new StorageEvent("storage", {
  key: "estudos:estado:v2",
  newValue: '{"versao":2,"itens":[]}'
}));`,
      ),
    ],
    mistakes: [
      "Confundir `JSON` válido com dados válidos para a aplicação.",
      "Esperar que `storage` dispare na janela que fez a gravação.",
    ],
    practices: [
      "Versione os formatos e reconstrua apenas os campos permitidos.",
      "Ofereça recuperação e backup antes de descartar dados antigos ou incompatíveis.",
    ],
    exercises: [
      exercise(
        "Escreva uma função que reconheça uma lista de tarefas com titulo `string` não vazia e concluida booleano.",
        "Confirme primeiro `Array.isArray` e depois use `every`.",
        `function ehListaValida(dados) {
  return Array.isArray(dados) && dados.every((item) =>
    item && typeof item.titulo === "string" && item.titulo.trim() !== ""
    && typeof item.concluida === "boolean"
  );
}
console.log(ehListaValida([{ titulo: "DOM", concluida: false }])); // true
console.log(ehListaValida([{ titulo: "", concluida: "não" }])); // false`,
      ),
      exercise(
        "Crie um backup `JSON` com versão 1 e uma lista de assuntos; leia-o tratando erro e versão desconhecida.",
        "Guarde versao junto dos itens e valide ambos depois do parse.",
        `const backup = JSON.stringify({ versao: 1, assuntos: ["DOM", "JSON"] });
try {
  const dados = JSON.parse(backup);
  if (dados?.versao !== 1 || !Array.isArray(dados.assuntos)
    || !dados.assuntos.every((item) => typeof item === "string")) {
    throw new Error("Backup incompatível.");
  }
  console.log(dados.assuntos);
} catch (erro) {
  console.log(erro.message);
}`,
      ),
    ],
    summary: [
      "`JSON` preserva dados compatíveis, não funções, referências ou todos os tipos.",
      "Formatos versionados e validação por campo permitem evoluir a persistência.",
      "Armazenamento web é síncrono, pode falhar e não resolve conflitos entre abas.",
    ],
  },
  15: {
    short: "Promises, concorrência, respostas HTTP e cancelamento",
    duration: 110,
    objectives: [
      "Distinguir sequência, concorrência e fila de microtarefas.",
      "Conferir respostas HTTP, combinar resultados e cancelar tarefas cooperativas.",
    ],
    sections: [
      section(
        "Ordem de execução: pilha, microtarefas e temporizadores",
        [
          "O código síncrono atual termina antes de o navegador executar os callbacks pendentes de Promises. As reações de `Promise` entram na fila de microtarefas. O navegador processa essas microtarefas antes de avançar para a próxima tarefa, como um callback de temporizador.",
          "`setTimeout(fn, 0)` não significa executar agora. Ele agenda uma tarefa para uma oportunidade futura, depois que a execução atual e as microtarefas relevantes terminarem. Por isso a mensagem de `Promise` aparece antes da mensagem do temporizador no exemplo.",
          "Assincronia não transforma automaticamente um cálculo pesado em trabalho paralelo. Um laço muito longo continua ocupando a thread da interface. Para processamento pesado, é preciso repensar o algoritmo ou considerar Web Workers em um estudo posterior.",
        ],
        `console.log("1. início");
setTimeout(() => console.log("4. temporizador"), 0);
Promise.resolve().then(() => console.log("3. microtarefa"));
console.log("2. fim do código síncrono");`,
      ),
      section(
        "Sequência, concorrência e resultados parciais",
        [
          "Se uma tarefa depende do resultado de outra, aguarde em sequência. Se forem independentes, inicie ambas antes de aguardar, ou passe as operações para `Promise.all`. Isso permite sobrepor tempos de espera; não quer dizer que cálculos síncronos passaram a executar em paralelo.",
          "`Promise.all` mantém os resultados na ordem das entradas, não na ordem de conclusão, e rejeita quando uma entrada rejeita. As outras operações não são canceladas automaticamente. `Promise.allSettled` espera todas e retorna um registro com status e `value` ou reason para cada uma.",
          "`forEach` não aguarda automaticamente funções `async` passadas como callback. Para sequência, use `for...of` com `await`; para operações independentes, `map` seguido de `Promise.all` é um padrão frequente. Decida também se muitas requisições de uma vez exigem limite de concorrência.",
        ],
        `const esperar = (valor, tempo) => new Promise((resolve) => {
  setTimeout(() => resolve(valor), tempo);
});
async function carregarPainel() {
  const resultados = await Promise.all([
    esperar("Aulas", 80),
    esperar("Exercícios", 20)
  ]);
  console.log(resultados); // ["Aulas", "Exercícios"]
  const parciais = await Promise.allSettled([
    Promise.resolve("Perfil pronto"),
    Promise.reject(new Error("Notas indisponíveis"))
  ]);
  console.log(parciais.map((item) => item.status));
}
carregarPainel().catch((erro) => console.log(erro.message));`,
      ),
      section(
        "Respostas HTTP e leitura de JSON",
        [
          "`fetch(url, opcoes)` retorna uma `Promise` de `Response`. Antes de ler o corpo, confira `response.ok`, que é verdadeiro para códigos HTTP de 200 a 299. Depois, `await` `response.json()` interpreta o corpo e também pode falhar se o conteúdo não for `JSON` válido.",
          "Ler um `JSON` não garante o formato de seus dados. Valide campos antes de atualizar a interface. O corpo de uma `Response` normalmente só pode ser consumido uma vez; não tente chamar `json()` repetidamente sobre a mesma resposta sem planejar uma clonagem.",
          "Para manter a demonstração executável e independente de servidores externos, usamos `Response`, uma API real do navegador, construída em memória. Em uma aplicação conectada, a origem dessa resposta seria `await` `fetch` de uma URL real do seu projeto. Uma API de outra origem também depende da política CORS do servidor; no-cors não torna o `JSON` livremente legível.",
        ],
        `async function lerAssuntos(resposta) {
  if (!resposta.ok) {
    throw new Error(\`Falha HTTP: \${resposta.status}\`);
  }
  const dados = await resposta.json();
  if (!Array.isArray(dados) || !dados.every((item) => typeof item === "string")) {
    throw new Error("Formato de assuntos inválido.");
  }
  return dados;
}
async function demonstrarHTTP() {
  try {
    const resposta = new Response(JSON.stringify(["DOM", "Promises"]), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
    console.log(await lerAssuntos(resposta));
    await lerAssuntos(new Response("Serviço indisponível", { status: 503 }));
  } catch (erro) {
    console.log("Erro tratado:", erro.message);
  }
}
demonstrarHTTP();`,
      ),
      section(
        "Cancelamento cooperativo e estado da interface",
        [
          "`AbortController` expõe um `signal` que APIs como `fetch` podem observar. `abort()` sinaliza cancelamento, mas não interrompe qualquer função JavaScript arbitrária. Uma função própria precisa observar o `signal` e liberar recursos como temporizadores e listeners.",
          "Em uma busca com várias entradas rápidas, uma resposta antiga pode chegar depois de uma nova. Cancelar a operação anterior ou identificar qual solicitação ainda é atual evita exibir dados ultrapassados. O servidor pode continuar trabalhando mesmo depois de o cliente cancelar a espera.",
          "O exemplo implementa uma espera cancelável, não uma requisição real. Ela limpa o temporizador e remove seu listener tanto no sucesso quanto no cancelamento. Na interface de um projeto, use `finally` para encerrar o estado de carregamento e diferencie cancelamento de falha inesperada.",
        ],
        `function esperarComCancelamento(tempo, signal) {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Operação cancelada", "AbortError"));
      return;
    }
    const id = setTimeout(() => {
      signal.removeEventListener("abort", cancelar);
      resolve("Concluído");
    }, tempo);
    function cancelar() {
      clearTimeout(id);
      signal.removeEventListener("abort", cancelar);
      reject(new DOMException("Operação cancelada", "AbortError"));
    }
    signal.addEventListener("abort", cancelar, { once: true });
  });
}
async function demonstrarCancelamento() {
  const controller = new AbortController();
  try {
    const espera = esperarComCancelamento(100, controller.signal);
    controller.abort();
    console.log(await espera);
  } catch (erro) {
    console.log(erro.name === "AbortError" ? "Espera cancelada com segurança." : erro.message);
  } finally {
    console.log("Carregamento encerrado.");
  }
}
demonstrarCancelamento();`,
      ),
    ],
    mistakes: [
      "Usar `forEach(async ...)` esperando que o laço aguarde todas as Promises.",
      "Presumir que `Promise.all` cancela as outras operações quando uma falha.",
      "Tentar ler o mesmo corpo de `Response` várias vezes.",
    ],
    practices: [
      "Inicie tarefas independentes em conjunto e trate resultados parciais quando fizer sentido.",
      "Valide status HTTP e formato do `JSON` antes de renderizar.",
      "Planeje carregamento, cancelamento e proteção contra respostas antigas.",
    ],
    exercises: [
      exercise(
        "Processe [1, 2, 3] em sequência com `for...of` e `await`; retorne uma lista com os valores dobrados.",
        "Uma função `async` pode aguardar `Promise.resolve` para simular uma etapa assíncrona.",
        `async function dobrarEmSequencia(numeros) {
  const resultados = [];
  for (const numero of numeros) {
    resultados.push(await Promise.resolve(numero * 2));
  }
  return resultados;
}
dobrarEmSequencia([1, 2, 3]).then((valores) => console.log(valores));`,
      ),
      exercise(
        "Use `Promise.allSettled` para contar quantas operações deram certo sem perder as que falharam.",
        'Filtre os registros cujo status é "fulfilled".',
        `async function contarSucessos() {
  const resultados = await Promise.allSettled([
    Promise.resolve("A"),
    Promise.reject(new Error("Falhou")),
    Promise.resolve("C")
  ]);
  const sucessos = resultados.filter((item) => item.status === "fulfilled");
  console.log(sucessos.length); // 2
  console.log(sucessos.map((item) => item.value));
}
contarSucessos();`,
      ),
    ],
    summary: [
      "Microtarefas de Promises e tarefas de temporizadores têm momentos distintos de execução.",
      "`Promise.all` preserva a ordem e allSettled permite examinar resultados parciais.",
      "`Response.ok`, leitura única do corpo e validação do `JSON` fazem parte de uma consulta robusta.",
      "Cancelamento é cooperativo e a interface precisa distinguir estados e respostas antigas.",
    ],
  },
  16: {
    short: "Lista de estudos, edição, filtros, busca, backup e testes",
    duration: 150,
    objectives: [
      "Evoluir o projeto com filtros e busca derivados do estado.",
      "Validar alterações por ID e criar testes repetíveis para regras de negócio.",
      "Planejar acessibilidade, recuperação e entrega do projeto.",
    ],
    sections: [
      section(
        "Evolução do modelo: editar por ID sem mudar o original",
        [
          "Antes de acrescentar botões, defina a operação nos dados. Renomear uma tarefa deve localizar seu ID, validar o novo título e preservar a conclusão. Títulos repetidos são permitidos; o ID continua sendo a identidade.",
          "Uma função pura pode retornar uma nova lista com `map`, substituindo apenas o objeto alterado. Se o ID não existir ou o título estiver inválido, retornar a lista original deixa claro que não houve alteração. No fluxo real, você também deve apresentar uma mensagem de orientação.",
          "O trecho é uma unidade independente para estudar e testar. Para integrar à primeira versão, chame essa função ao confirmar uma edição, atribua o retorno a assuntos, salve e renderize. Prefira um campo de edição com rótulo e botões Salvar/Cancelar em vez de depender de prompt.",
        ],
        `function renomearAssunto(assuntos, id, entrada) {
  const titulo = entrada.trim();
  if (titulo.length < 1 || titulo.length > 80) return assuntos;
  return assuntos.map((item) => item.id === id ? { ...item, titulo } : item);
}
const original = [
  { id: "a", titulo: "DOM", concluida: false },
  { id: "b", titulo: "DOM", concluida: true }
];
const atualizada = renomearAssunto(original, "b", "Eventos");
console.log(original[1].titulo); // DOM
console.log(atualizada[1]); // apenas b foi renomeado`,
      ),
      section(
        "Filtro e busca são uma visão, não o banco de dados",
        [
          "Não substitua o estado principal por uma lista filtrada: os itens ocultos desapareceriam dos dados. Guarde todas as tarefas em assuntos e derive a lista visível de acordo com modo e termo. Conclusão, exclusão e edição continuam usando o ID do item original.",
          "A demonstração independente abaixo adiciona filtro e busca a um conjunto inicial. Ela usa as mesmas ideias da primeira versão, sem persistência para manter o foco na visão derivada. Marcar uma tarefa atualiza o estado e recalcula a lista.",
          "Ao filtrar pendentes, uma tarefa marcada como concluída pode sair da tela. O exemplo devolve o foco ao filtro nessa situação e preserva o checkbox quando o item continua visível. Apresente também uma mensagem para o conjunto vazio, diferente de uma lista quebrada.",
        ],
        `const assuntos = [
  { id: "a", titulo: "Estudar DOM", concluida: false },
  { id: "b", titulo: "Praticar eventos", concluida: true },
  { id: "c", titulo: "Revisar JSON", concluida: false }
];
const filtro = document.querySelector("#filtro");
const busca = document.querySelector("#busca-projeto");
const lista = document.querySelector("#lista-visivel");
function selecionarVisiveis() {
  const termo = busca.value.trim().toLocaleLowerCase("pt-BR");
  return assuntos.filter((item) => {
    const corresponde = filtro.value === "todas"
      || (filtro.value === "concluidas" ? item.concluida : !item.concluida);
    return corresponde && item.titulo.toLocaleLowerCase("pt-BR").includes(termo);
  });
}
function renderizar(focoId) {
  lista.replaceChildren();
  const visiveis = selecionarVisiveis();
  let proximoFoco = null;
  for (const assunto of visiveis) {
    const item = document.createElement("li");
    const rotulo = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = assunto.concluida;
    checkbox.addEventListener("change", () => {
      assunto.concluida = checkbox.checked;
      renderizar(assunto.id);
    });
    rotulo.append(checkbox, assunto.titulo);
    item.append(rotulo);
    lista.append(item);
    if (assunto.id === focoId) proximoFoco = checkbox;
  }
  document.querySelector("#total-visivel").textContent = visiveis.length === 0
    ? "Nenhum assunto corresponde à busca e ao filtro."
    : \`Exibindo \${visiveis.length} de \${assuntos.length} assuntos.\`;
  if (focoId) (proximoFoco ?? filtro).focus();
}
filtro.addEventListener("change", () => renderizar());
busca.addEventListener("input", () => renderizar());
renderizar();`,
        `<label for="busca-projeto">Buscar assunto</label><input id="busca-projeto" type="search">
<label for="filtro">Mostrar</label><select id="filtro"><option value="todas">Todas</option><option value="pendentes">Pendentes</option><option value="concluidas">Concluídas</option></select>
<p id="total-visivel" role="status"></p><ul id="lista-visivel"></ul>`,
      ),
      section(
        "Testes de regras antes de testar a interface",
        [
          "Um teste reproduzível organiza uma entrada, executa uma ação e compara o resultado com o esperado. Comece por funções sem DOM: elas são mais fáceis de exercitar com listas vazias, itens concluídos e IDs inexistentes.",
          "Na demonstração, a função verificar lança erro se uma expectativa falhar. Ela não é uma API especial do navegador: é uma função que nós mesmos definimos. As mensagens deixam explícita a regra testada, sem depender de observar a tela manualmente.",
          "Depois teste o fluxo completo: adicionar por Enter, rejeitar espaços, editar um de dois títulos iguais, mudar o filtro, excluir o item focado, recarregar com persistência e abrir dados inválidos. Para testar armazenamento de verdade, use a página própria fora do sandbox.",
        ],
        `function contarPendentes(itens) {
  return itens.filter((item) => !item.concluida).length;
}
function verificar(condicao, mensagem) {
  if (!condicao) throw new Error(mensagem);
  console.log("PASSOU:", mensagem);
}
verificar(contarPendentes([]) === 0, "Lista vazia tem zero pendências");
verificar(contarPendentes([{ concluida: true }]) === 0, "Concluída não conta como pendente");
verificar(contarPendentes([{ concluida: false }, { concluida: true }]) === 1,
  "Lista mista conta só as pendentes");`,
      ),
      section(
        "Checklist de entrega e próximos incrementos",
        [
          "Antes de publicar, separe estrutura HTML, estilos CSS e comportamento JS; mantenha o script com `defer` e sirva por HTTPS. Confira títulos da página, rótulos, ordem de tabulação, contraste, indicação de foco e mensagens de erro. Não use placeholders como único rótulo.",
          "Separe falha de gravação de falha da operação em memória. Se o navegador não permitir salvar, continue mostrando a lista e explique a limitação. Para um backup, exporte apenas os campos esperados; ao importar, valide versão, tamanho, títulos e IDs antes de substituir os dados atuais.",
          "Um próximo incremento pode ser prazo de estudo, categorias ou sincronização com servidor. Cada recurso altera regras: datas exigem política de fuso horário; servidor exige validação, autenticação quando cabível e tratamento de falhas de rede. Acrescente uma mudança por vez e novos testes para ela.",
          "O exemplo gera um backup textual, não faz download nem acessa a rede. O envelope versionado facilita evoluções e o campo de texto permite copiar o resultado. Para dados vindos de outras pessoas, continue usando `textContent` ou `value`, nunca interpretando títulos como HTML.",
        ],
        `const assuntos = [
  { id: "a", titulo: "Revisar DOM", concluida: false }
];
const backup = {
  versao: 1,
  itens: assuntos.map(({ id, titulo, concluida }) => ({ id, titulo, concluida }))
};
document.querySelector("#backup").value = JSON.stringify(backup, null, 2);
console.log("Backup preparado. Guarde uma cópia antes de substituir dados.");`,
        `<label for="backup">Backup JSON da lista de demonstração</label><textarea id="backup" rows="10" readonly style="width:100%"></textarea>`,
      ),
    ],
    mistakes: [
      "Sobrescrever a lista principal com o resultado de uma busca.",
      "Reconstruir controles e perder o foco sem oferecer um destino lógico.",
      "Importar um backup sem validar sua estrutura ou avisar sobre substituição.",
    ],
    practices: [
      "Mantenha dados completos e visão derivada separados.",
      "Teste regras puras e depois os fluxos de mouse, teclado e persistência.",
      "Faça pequenas entregas com checklist e recuperação para falhas de armazenamento.",
    ],
    exercises: [
      exercise(
        "Remova todas as concluídas sem modificar a lista original e verifique a quantidade restante.",
        "Use `filter` com a negação do booleano concluida.",
        `const assuntos = [
  { id: "a", titulo: "DOM", concluida: true },
  { id: "b", titulo: "JSON", concluida: false }
];
const pendentes = assuntos.filter((item) => !item.concluida);
console.log(pendentes.length); // 1
console.log(assuntos.length); // 2, original preservado`,
      ),
      exercise(
        "Escreva uma função de busca que ignore maiúsculas e espaços externos e preserve a lista completa.",
        "Normalize o termo e o título no callback de `filter`.",
        `function buscarAssuntos(assuntos, entrada) {
  const termo = entrada.trim().toLocaleLowerCase("pt-BR");
  return assuntos.filter((item) => item.titulo.toLocaleLowerCase("pt-BR").includes(termo));
}
const lista = [{ titulo: "Estudar DOM" }, { titulo: "JSON" }];
console.log(buscarAssuntos(lista, " dom "));
console.log(lista.length); // 2`,
      ),
      exercise(
        "Impeça importar itens com IDs duplicados. Retorne `true` somente para uma lista de IDs `string` não vazios e únicos.",
        "Valide o tipo e use `Set` para comparar a quantidade de IDs distintos.",
        `function idsValidos(itens) {
  if (!Array.isArray(itens)) return false;
  if (!itens.every((item) => item && typeof item.id === "string" && item.id.trim() !== "")) return false;
  return new Set(itens.map((item) => item.id)).size === itens.length;
}
console.log(idsValidos([{ id: "a" }, { id: "b" }])); // true
console.log(idsValidos([{ id: "a" }, { id: "a" }])); // false`,
      ),
      exercise(
        "Crie três verificações automatizadas para a busca: termo vazio, diferença de caixa e nenhum resultado.",
        "Defina uma função verificar que lance `Error` quando uma expectativa não for satisfeita.",
        `const lista = [{ titulo: "DOM" }, { titulo: "Eventos" }];
function buscar(entrada) {
  const termo = entrada.trim().toLowerCase();
  return lista.filter((item) => item.titulo.toLowerCase().includes(termo));
}
function verificar(condicao, descricao) {
  if (!condicao) throw new Error(descricao);
  console.log("PASSOU:", descricao);
}
verificar(buscar("").length === 2, "Termo vazio mantém todos");
verificar(buscar("dom")[0].titulo === "DOM", "Busca ignora caixa");
verificar(buscar("CSS").length === 0, "Assunto ausente não retorna itens");`,
      ),
    ],
    summary: [
      "Edições por ID preservam a identidade mesmo com títulos iguais.",
      "Busca e filtros derivam uma visão sem apagar o estado completo.",
      "Testes reproduzíveis, foco previsível e recuperação fazem parte do projeto, não são detalhes finais.",
    ],
  },
};
