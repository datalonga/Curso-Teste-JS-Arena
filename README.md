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

1. Programação e ambientes de execução do JavaScript
2. Sintaxe, instruções e comentários
3. Variáveis, constantes e escopo
4. Tipos de dados e conversões
5. Operadores e expressões
6. Condicionais: `if`, `else` e `switch`
7. Laços: `for`, `while` e `for...of`
8. Funções, parâmetros e retorno
9. Arrays e métodos essenciais
10. Objetos e propriedades
11. Seleção e alteração do DOM
12. Eventos e interação
13. Formulários e validação
14. JSON e `localStorage`
15. Promises, `async` e `await`
16. Projeto final: lista de estudos

Cada módulo contém objetivos, explicações, exemplos executáveis, erros comuns, boas práticas, dois exercícios com dicas e soluções, resumo e navegação anterior/próximo. O projeto final inclui cadastro, conclusão, exclusão, contagem de pendências e persistência com fallback em memória.

O sumário tem busca sem distinção de acentos, filtros por conclusão, retomada e progresso local. O layout se adapta a celulares, tem menu por teclado, link de salto e mensagens acessíveis. A estimativa de duração é orientativa; a prática pode levar mais tempo.

## Separação entre interface e exemplos

- `assets/app.js`: apenas navegação, busca, cópia, progresso e criação das demonstrações.
- `scripts/course.mjs`: fonte editorial dos módulos e dos trechos de aula.
- `scripts/build.mjs`: gera o sumário e todas as páginas estáticas com Node.js, sem bibliotecas.
- `scripts/html.mjs`: escapa caracteres especiais antes de inserir o conteúdo no HTML.
- `modulos/01.html` a `modulos/16.html`: conteúdo completo disponível mesmo sem JavaScript da interface.

**Nenhum exemplo é executado ao carregar um módulo.** Os códigos ficam escapados em `<pre><code>`. Ao clicar em Executar, uma nova demonstração é criada em `iframe` com `sandbox="allow-scripts allow-forms"`, **sem** `allow-same-origin`, navegação superior ou pop-ups. Uma CSP bloqueia rede, envios de formulário e recursos externos. Os handlers dos exemplos usam `preventDefault()` nos formulários. O console e os erros são exibidos dentro do próprio iframe. Executar novamente ou fechar a saída descarta o contexto anterior.

O iframe não pode ler o documento principal ou seu armazenamento. Por isso, os exemplos de `localStorage` tratam a indisponibilidade no sandbox. Para testar persistência real, o curso explica como copiar HTML e JavaScript para uma página própria servida por HTTP. O progresso do curso usa outras chaves, no contexto da página principal, sem relação com as demonstrações.

O botão Copiar usa a API de clipboard, com alternativa para ambientes sem essa API e mensagem de orientação se o navegador negar a cópia. A validação de formulário no cliente é apresentada como recurso de experiência, não como substituto da validação no servidor.

## Editar o conteúdo

Edite `scripts/course.mjs` e, se necessário, os templates de `scripts/build.mjs`. Depois regenere:

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

Os testes de navegador cobrem todos os 63 exemplos e soluções, isolamento dos iframes, busca, filtros, progresso persistente, clipboard, eventos, formulários, projeto final, JSON corrompido, armazenamento bloqueado, rejeição assíncrona e ausência de transbordamento horizontal nas 17 páginas em larguras de 1440, 390 e 320 pixels.
