// Interface do curso. O conteúdo didático está em elementos <code> inertes.
// Somente o botão Executar cria um iframe sandbox sem acesso à página ou ao localStorage dela.
(() => {
  "use strict";
  const storageKey = "js-em-pratica:progresso:v1";
  const lastKey = "js-em-pratica:ultimo:v1";
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [
    ...context.querySelectorAll(selector),
  ];
  let completed = new Set();
  let lastModule = 1;
  let storageAvailable = true;
  let toastTimeout;
  let activeFilter = "all";

  function notify(message) {
    const toast = $(".toast");
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.hidden = true;
    }, 5500);
  }
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (Array.isArray(saved)) {
      completed = new Set(
        saved.filter((n) => Number.isInteger(n) && n >= 1 && n <= 16),
      );
    }
    const last = Number(localStorage.getItem(lastKey));
    if (Number.isInteger(last) && last >= 1 && last <= 16) lastModule = last;
  } catch {
    storageAvailable = false;
  }

  const current = Number(document.body.dataset.module);
  if (current >= 1 && current <= 16) {
    lastModule = current;
    try {
      localStorage.setItem(lastKey, String(current));
    } catch {
      storageAvailable = false;
    }
  }

  function normalize(text) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }
  function filterCards() {
    const input = $("#module-search");
    if (!input) return;
    const query = normalize(input.value.trim());
    let visible = 0;
    $$("[data-card]").forEach((card) => {
      const done = completed.has(Number(card.dataset.card));
      const matchesStatus =
        activeFilter === "all" || (activeFilter === "done" ? done : !done);
      const matchesQuery = normalize(card.dataset.search).includes(query);
      card.hidden = !(matchesStatus && matchesQuery);
      if (!card.hidden) visible++;
    });
    $(".no-results").hidden = visible > 0;
    $(".results-count").textContent =
      `${visible} ${visible === 1 ? "módulo encontrado" : "módulos encontrados"}.`;
  }
  function renderProgress() {
    $$("[data-progress-count]").forEach((el) => {
      el.textContent = completed.size;
    });
    $$("[data-progress-percent]").forEach((el) => {
      el.textContent = `${Math.round((completed.size / 16) * 100)}%`;
    });
    $$("[data-course-progress]").forEach((el) => {
      el.value = completed.size;
      el.textContent = `${completed.size} de 16`;
    });
    $$("[data-module-link]").forEach((link) => {
      $(".nav-check", link).hidden = !completed.has(
        Number(link.dataset.moduleLink),
      );
    });
    $$("[data-card]").forEach((card) => {
      const done = completed.has(Number(card.dataset.card));
      card.classList.toggle("is-complete", done);
      $(".card-status", card).textContent = done ? "Concluído ✓" : "Começar ↗";
    });
    $$("[data-complete]").forEach((button) => {
      const done = completed.has(Number(button.dataset.complete));
      button.setAttribute("aria-pressed", String(done));
      button.textContent = done
        ? "✓ Concluído · desfazer"
        : "✓ Marcar como concluído";
    });
    const resume = $("[data-resume]");
    if (resume && (completed.size > 0 || lastModule !== 1)) {
      const next =
        completed.size === 16
          ? 16
          : completed.has(lastModule)
            ? Array.from({ length: 16 }, (_, i) => i + 1).find(
                (id) => !completed.has(id),
              )
            : lastModule;
      resume.href = `./modulos/${String(next).padStart(2, "0")}.html`;
      resume.textContent =
        completed.size === 16
          ? "Revisitar o projeto →"
          : "Continuar aprendendo →";
    }
    filterCards();
  }
  renderProgress();
  if (!storageAvailable)
    notify(
      "O armazenamento está indisponível ou contém dados inválidos. Seu progresso vale apenas nesta página.",
    );

  $$("[data-complete]").forEach((button) =>
    button.addEventListener("click", () => {
      const id = Number(button.dataset.complete);
      if (completed.has(id)) completed.delete(id);
      else completed.add(id);
      let saved = true;
      try {
        localStorage.setItem(storageKey, JSON.stringify([...completed]));
      } catch {
        saved = false;
      }
      renderProgress();
      notify(
        saved
          ? completed.has(id)
            ? "Módulo concluído. Mais um passo na sua jornada!"
            : "Módulo marcado como não concluído."
          : "Progresso atualizado apenas nesta página. Não foi possível salvar no navegador.",
      );
    }),
  );
  $("#module-search")?.addEventListener("input", filterCards);
  $$("[data-filter]").forEach((button) =>
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      $$("[data-filter]").forEach((tab) => {
        tab.classList.toggle("selected", tab === button);
        tab.setAttribute("aria-pressed", String(tab === button));
      });
      filterCards();
    }),
  );

  const menu = $(".menu-toggle");
  const navigation = $("#course-navigation");
  function closeMenu(returnFocus = false) {
    menu.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
    if (returnFocus) menu.focus();
  }
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    navigation.classList.toggle("is-open", open);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true")
      closeMenu(true);
  });
  document.addEventListener("click", (event) => {
    if (!navigation.contains(event.target) && !menu.contains(event.target))
      closeMenu();
  });
  const mobile = window.matchMedia("(max-width: 760px)");
  mobile.addEventListener("change", () => closeMenu());
  // Keep the active module reachable even in a long, independently scrolling sidebar.
  const active = $(".module-link.active");
  if (active && !mobile.matches) {
    const nav = $(".module-nav");
    nav.scrollTop = Math.max(
      0,
      active.offsetTop - nav.offsetTop - nav.clientHeight / 2,
    );
  }

  async function copyText(text, button) {
    const previous = button.textContent;
    try {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const field = document.createElement("textarea");
        field.value = text;
        field.style.cssText = "position:fixed;left:-10000px;top:0";
        document.body.append(field);
        field.select();
        let copied;
        try {
          copied = document.execCommand("copy");
        } finally {
          field.remove();
          button.focus();
        }
        if (!copied) throw new Error("Cópia indisponível");
      }
      button.textContent = "Copiado ✓";
      notify("Código copiado. Cole no seu ambiente para experimentar.");
      setTimeout(() => {
        button.textContent = previous;
      }, 2200);
    } catch {
      notify(
        "Não foi possível copiar automaticamente. Selecione o código e use Ctrl+C ou ⌘C.",
      );
    }
  }

  // This script runs INSIDE the sandbox, not in the course's origin.
  function sandboxConsole() {
    const output = document.querySelector("#console-output");
    function format(value) {
      if (typeof value === "string") return value;
      if (value instanceof Error) return `${value.name}: ${value.message}`;
      if (value === undefined) return "undefined";
      try {
        return JSON.stringify(value, null, 2);
      } catch {
        return String(value);
      }
    }
    function print(type, args) {
      const row = document.createElement("pre");
      row.className = type;
      row.textContent = args.map(format).join(" ");
      output.append(row);
    }
    ["log", "info", "warn", "error"].forEach((type) => {
      console[type] = (...args) => print(type, args);
    });
    window.addEventListener("error", (event) => console.error(event.message));
    window.addEventListener("unhandledrejection", (event) =>
      console.error(event.reason),
    );
  }

  function runExample(example) {
    const code = $(".lesson-code", example).textContent;
    const html = $(".lesson-html", example)?.textContent || "";
    const output = $(".example-output", example);
    const frame = document.createElement("iframe");
    frame.title = "Resultado do exemplo JavaScript";
    frame.setAttribute("sandbox", "allow-scripts allow-forms");
    frame.setAttribute("referrerpolicy", "no-referrer");
    const script = (source) =>
      `<script>${source.replace(/<\/script/gi, "<\\/script")}<` + "/script>";
    frame.srcdoc = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; form-action 'none'; base-uri 'none'"><style>
      *{box-sizing:border-box}body{font:14px/1.6 Arial,sans-serif;color:#233b46;margin:18px;background:white;overflow-wrap:anywhere}h3{font-size:18px;margin:0 0 14px}p{margin:10px 0}label{font-size:13px;display:block}input:not([type=checkbox]){display:block;width:100%;max-width:340px;border:1px solid #b8c7bd;border-radius:4px;padding:8px;margin:5px 0 10px;font:inherit}button{background:#233b46;color:white;border:0;border-radius:4px;padding:8px 12px;font:12px Arial;cursor:pointer;margin:4px 5px 4px 0}input:focus-visible,button:focus-visible{outline:3px solid #d6502d;outline-offset:3px}ul{padding-left:22px}li{margin:9px 0}li label{display:inline-flex;align-items:center;gap:7px;margin-right:14px}input[type=checkbox]:checked+span{text-decoration:line-through;color:#77867a}.destaque{background:#eef0df;padding:8px;border-radius:4px}#console-output{margin-top:15px;font:11px/1.6 monospace;color:#36594c}#console-output pre{font:inherit;white-space:pre-wrap;overflow-wrap:anywhere;margin:0;padding:7px 0;border-bottom:1px solid #eef0e9}.error{color:#b73b2c}.warn{color:#97611b}.console-label{font:9px monospace;color:#7a8d80;letter-spacing:1px;margin:18px 0 5px}
      </style></head><body>${html}<div class="console-label">CONSOLE DE SAÍDA</div><div id="console-output" role="log" aria-live="polite"></div>${script(`(${sandboxConsole.toString()})();`)}${script(code)}</body></html>`;
    $(".frame-container", example).replaceChildren(frame);
    output.classList.toggle("is-console", !html);
    output.hidden = false;
    $(".run-button", example).innerHTML =
      '<span aria-hidden="true">↻</span> Executar novamente';
  }
  $$(".code-example").forEach((example) => {
    $(".copy-button", example).addEventListener("click", (event) =>
      copyText($(".lesson-code", example).textContent, event.currentTarget),
    );
    $(".copy-html", example)?.addEventListener("click", (event) =>
      copyText($(".lesson-html", example).textContent, event.currentTarget),
    );
    $(".run-button", example).addEventListener("click", () =>
      runExample(example),
    );
    $(".clear-output", example).addEventListener("click", () => {
      $(".frame-container", example).replaceChildren();
      $(".example-output", example).hidden = true;
      const button = $(".run-button", example);
      button.innerHTML = '<span aria-hidden="true">▷</span> Executar';
      button.focus();
    });
  });
})();
