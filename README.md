# JavaScript em prática

Curso original em português, do nível iniciante ao intermediário, implementado com **HTML, CSS e JavaScript puro**, sem dependências no navegador, fontes externas ou serviços de terceiros.

## Executar

Com Node.js 22 ou superior:

```sh
npm start
```

Abra `http://localhost:3000`. O servidor escuta em `0.0.0.0` e aceita o host do preview. Para escolher outra porta, use `PORT=8080 npm start`.

Não é necessário instalar pacotes para servir ou gerar as páginas. Também é possível publicar `index.html`, `assets/`, `modulos/` e `projeto/` em qualquer hospedagem estática, mantendo as pastas. Use HTTP/HTTPS, não `file://`, para comportamento consistente de armazenamento e cópia.

## O curso

16 páginas HTML independentes, nesta ordem:

1. Programação: algoritmos, ambientes, carregamento de scripts e depuração inicial
2. Sintaxe: expressões, blocos, comentários, identificadores e escapes de strings
3. Variáveis: `let`, `const`, reatribuição, escopo, sombreamento e referências
4. Tipos: métodos de strings, conversões, leitura parcial e números válidos
5. Operadores: precedência, curto-circuito, `??`, atribuições e precisão monetária
6. Condicionais: `if`, `switch`, ternário, intervalos e validação antes da decisão
7. Laços: índices, acumuladores, buscas, interrupção e repetições aninhadas
8. Funções: retorno antecipado, callbacks, rest, funções puras e closures
9. Arrays: `map`, `filter`, `reduce`, `some`, `every`, cópias, ordenação e encadeamento
10. Objetos: propriedades próprias, desestruturação, `?.`, métodos, `this` e cópias aninhadas
11. DOM: seletores, coleções, atributos, propriedades, `dataset`, estilos, árvore, inserção, remoção e templates
12. Eventos: propagação, delegação, ação padrão, teclado e duração dos listeners
13. Formulários: `FormData`, controles, validação cruzada, reset e mensagens acessíveis
14. Persistência: limites do JSON, validação de formato, versões, migração e abas
15. Assincronia: microtarefas, concorrência, respostas HTTP, falhas parciais e cancelamento
16. Projeto: lista de estudos, edição por ID, busca e filtros, backup, testes e checklist de entrega

O curso ampliado reúne **89 seções de conteúdo, 88 exemplos de aula e 68 exercícios com dicas e soluções executáveis**: **156 blocos executáveis** ao todo (antes eram 63). Todos os módulos têm pelo menos cinco seções e quatro exercícios; DOM tem oito seções e seis exercícios, e o projeto final também tem seis exercícios. As estimativas foram revisadas para aproximadamente 20 horas, sem exigir um ritmo fixo.

Cada módulo inclui objetivos atualizados, explicações curtas e progressivas, exemplos, erros comuns, boas práticas, resumo e navegação anterior/próximo. As demonstrações novas são independentes: quando uma seção ilustra uma evolução do projeto em vez de uma versão completa para substituir a primeira, o texto explica essa distinção. A implementação inicial completa do projeto continua disponível com cadastro, conclusão, exclusão e persistência com fallback em memória.

O sumário tem busca sem distinção de acentos, filtros por conclusão, retomada e progresso local. O layout se adapta a celulares, tem menu por teclado, link de salto e mensagens acessíveis. A estimativa de duração é orientativa; a prática pode levar mais tempo.

## Separação entre interface e exemplos

- `assets/app.js`: apenas navegação, busca, cópia, progresso e criação das demonstrações.
- `scripts/course.mjs`: conteúdo inicial e composição dos módulos completos.
- `scripts/course-expansions.mjs`: aprofundamentos dos 16 módulos, incluindo novos objetivos, seções, exercícios e revisões.
- `scripts/build.mjs`: gera o sumário e todas as páginas estáticas com Node.js, sem bibliotecas.
- `scripts/html.mjs`: escapa caracteres especiais antes de inserir o conteúdo no HTML.
- `modulos/01.html` a `modulos/16.html`: conteúdo completo disponível mesmo sem JavaScript da interface.

**Nenhum exemplo é executado ao carregar um módulo.** Os códigos ficam escapados em `<pre><code>`. Ao clicar em Executar, uma nova demonstração é criada em `iframe` com `sandbox="allow-scripts allow-forms"`, **sem** `allow-same-origin`, navegação superior ou pop-ups. Uma CSP bloqueia rede, envios de formulário e recursos externos. Os handlers dos exemplos usam `preventDefault()` nos formulários. O console e os erros são exibidos dentro do próprio iframe. Executar novamente ou fechar a saída descarta o contexto anterior.

O iframe não pode ler o documento principal ou seu armazenamento. Por isso, os exemplos de `localStorage` tratam a indisponibilidade no sandbox. Para testar persistência real, o curso explica como copiar HTML e JavaScript para uma página própria servida por HTTP. O progresso do curso usa outras chaves, no contexto da página principal, sem relação com as demonstrações.

O botão Copiar usa a API de clipboard, com alternativa para ambientes sem essa API e mensagem de orientação se o navegador negar a cópia. A validação de formulário no cliente é apresentada como recurso de experiência, não como substituto da validação no servidor.

## Uma página que evolui com o conteúdo

A trilha **Meu plano de estudos** complementa os exemplos isolados com **16 versões da mesma página**, uma por módulo. Acesse `projeto/index.html` ou o link “Uma página, 16 evoluções” na navegação. Em cada módulo, a seção “Página em evolução” conecta o assunto a uma alteração concreta no projeto.

- **Etapas 1–10:** estrutura HTML, comentários, variáveis, conversões, cálculos, decisões, laços, funções, arrays e objetos. O HTML recebe novas partes, mas ainda é estático; os resultados JavaScript aparecem no console. Essa distinção é explicitada, sem antecipar DOM escondido.
- **Etapa 11:** a lista, os totais e o progresso passam a ser construídos a partir dos dados pelo DOM.
- **Etapa 12:** conclusão e exclusão respondem a eventos, com atualização de estado e foco.
- **Etapa 13:** formulário com validação, Enter, títulos repetidos e IDs independentes.
- **Etapa 14:** JSON e armazenamento local, com validação de formato e recuperação de falhas.
- **Etapa 15:** sugestões em uma consulta assíncrona simulada, incluindo carregamento, rejeição, recuperação e prevenção de duplicação.
- **Etapa 16:** busca, filtros e edição por ID completam a página sem apagar os dados ocultos pelos filtros.

Cada etapa explica **antes / agora**, o que mudou, um trecho localizado no código real, o que observar e uma experiência com resultado esperado. Há comparação visual com a versão anterior e um diff de HTML, CSS e JavaScript derivado dos próprios arquivos, com adições e remoções. O CSS de apoio está pronto desde a primeira etapa e permanece igual, para manter o foco em JavaScript.

Os arquivos completos ficam em `projeto/01/` a `projeto/16/`, cada pasta com `index.html`, `estilo.css` e `app.js`. Podem ser copiados ou baixados e servidos juntos em uma pasta independente; não dependem do JavaScript da interface do curso. Preserve os nomes e não misture versões. A comparação e a prévia não são editores: para fazer mudanças, use uma cópia local dos três arquivos.

**A prévia só executa após clicar em “Ver página desta etapa” ou “Comparar com a anterior”.** Ela usa um iframe sandbox com console próprio, sem acesso à página principal, à rede ou ao armazenamento dela. Comparar abre dois contextos independentes; executar de novo reinicia a simulação; fechar descarta os iframes. Os trechos completos e as versões anteriores são mantidos como texto escapado ou templates inertes, nunca como scripts da interface.

Ao abrir uma **página independente**, seu `app.js` é executado normalmente, como em qualquer projeto web. Nesse contexto, as etapas 14–16 compartilham a chave `js-em-pratica:projeto-evolutivo:v1`, separada do progresso do curso e dos outros exemplos. Para experimentar recarga persistente, use HTTP/HTTPS fora da prévia. Armazenamento bloqueado, JSON inválido ou formato incompatível não interrompem as interações em memória. A consulta de sugestões é simulada e não acessa serviços externos.

### Manutenção desta trilha

- `scripts/project.mjs`: conteúdo didático das etapas, documentos HTML e JavaScript de cada versão, além do CSS compartilhado.
- `scripts/project-render.mjs`: integração nos módulos, roadmap e comparação de linhas.
- `scripts/build.mjs`: gera também o roadmap e os 48 arquivos independentes do projeto.
- `assets/app.js`: apenas os controles de copiar, visualizar e comparar, separados do código do projeto.

Após editar, execute `npm run build`. Os testes verificam arquivos gerados idênticos às fontes, sintaxe, progressão, reconstrução dos diffs, execução das 16 versões, isolamento das prévias, cópia/download, validação, persistência entre versões, assincronia, filtros, edição e layout responsivo.

## Referências técnicas em negrito

Nos textos didáticos dos 16 módulos, comandos, métodos e APIs usam crases como marcação editorial: por exemplo, `` `append()` `` e `` `const` ``. A geração transforma essas referências em `<strong class="language-command">`, com peso de fonte 700. A marcação é explícita para não confundir comandos com palavras comuns em português, como “for” e “continue”.

A formatação cobre introduções, objetivos, explicações, erros comuns, boas práticas, enunciados, dicas e resumos. `formatLessonText()` em `scripts/html.mjs` escapa tanto texto comum quanto referências, sem aceitar HTML editorial arbitrário. Metadados e busca usam texto sem delimitadores. Os blocos de código, as soluções e o HTML de apoio continuam passando apenas pelo escape de HTML; copiar e executar não inclui marcação de negrito.

Ao adicionar um comando às explicações, delimite a referência com crases. Não adicione essas marcações dentro dos códigos dos exemplos. O build não tenta adivinhar palavras-chave ou modificar o conteúdo durante a navegação.

## Editar o conteúdo

Edite o conteúdo inicial em `scripts/course.mjs` ou os aprofundamentos em `scripts/course-expansions.mjs`. Os aprofundamentos são associados pelo número do módulo e anexados às seções existentes, preservando a sequência e os exemplos iniciais. Ajuste os templates em `scripts/build.mjs` quando necessário. Depois regenere:

```sh
npm run build
```

Os HTMLs gerados são versionados e podem ser publicados diretamente. Não edite apenas um HTML gerado se quiser preservar a alteração na próxima geração.

## Testar

```sh
npm ci
npm test              # Estrutura pedagógica, sintaxe, escaping e links locais
npm run test:browser  # Integração no Chromium
npm run test:all      # Ambas as suítes
```

As dependências de desenvolvimento são usadas **somente nos testes**, nunca pela aplicação. O Chromium distribuído por npm permite executar a suíte no ambiente Linux restrito do preview; a configuração extrai bibliotecas de suporte em uma pasta temporária. Para usar um Chromium instalado localmente, defina `CHROMIUM_EXECUTABLE_PATH=/caminho/do/chromium` (em outros sistemas, configure um executável compatível).

Os testes de navegador cobrem todos os 156 exemplos e soluções, isolamento dos iframes, busca, filtros, progresso persistente, clipboard, eventos, formulários, projeto final, JSON corrompido, armazenamento bloqueado, rejeição assíncrona e ausência de transbordamento horizontal nas 17 páginas em larguras de 1440, 390 e 320 pixels.

Há testes específicos para coleções estáticas/vivas do DOM, atributos e estilos, navegação na árvore, movimento e clonagem de nós, delegação com itens novos, remoção de listeners, `FormData` com valores repetidos, validação cruzada de senhas, ordem de microtarefas, respostas HTTP, cancelamento e filtros do projeto com restauração de foco. Os testes estruturais exigem a expansão de todos os módulos e verificam o conteúdo gerado.
