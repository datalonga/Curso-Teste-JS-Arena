# JavaScript em prática

Curso original em português, do nível iniciante ao intermediário, implementado com **HTML, CSS e JavaScript puro**, sem dependências no navegador, fontes externas ou serviços de terceiros.

## Executar

Com Node.js 22 ou superior:

```sh
npm start
```

Abra `http://localhost:3000`. O servidor escuta em `0.0.0.0` e aceita o host do preview. Para escolher outra porta, use `PORT=8080 npm start`.

Não é necessário instalar pacotes para servir ou gerar as páginas. Também é possível publicar `index.html`, `assets/` e `modulos/` em qualquer hospedagem estática, mantendo as pastas. Use HTTP/HTTPS, não `file://`, para comportamento consistente de armazenamento e cópia.

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
