/*
  TecnIA Quality Layer
  Capa común de precisión académica para las herramientas de estudio.
  Añade un bloque "Modo precisión 10/10" para evitar relleno y priorizar matices.
  No consulta internet automáticamente: en una web estática no es posible sin backend/API.
*/

(function () {
  var STORAGE_KEY = "tecnia.qualityProfile.v1";

  var SOURCE_MAP = {
    lengua: [
      "RAE - Diccionario de la lengua española",
      "RAE - Diccionario panhispánico de dudas",
      "FundéuRAE"
    ],
    ingles: [
      "Cambridge Dictionary",
      "Oxford Learner's Dictionaries",
      "WordReference",
      "Merriam-Webster"
    ],
    derecho: [
      "BOE - legislación consolidada",
      "Diccionario panhispánico del español jurídico",
      "Código Civil o norma indicada por el profesor",
      "Manual recomendado de la asignatura"
    ],
    economia: [
      "CORE Econ",
      "Banco de España",
      "INE",
      "Eurostat",
      "BCE"
    ],
    historia: [
      "manual recomendado por el profesor",
      "Biblioteca Nacional de España",
      "museos o instituciones oficiales",
      "archivos históricos"
    ],
    biologia: [
      "MedlinePlus",
      "OMS",
      "NIH / NCBI",
      "MSD Manual"
    ],
    matematicas: [
      "Khan Academy",
      "Paul's Online Math Notes",
      "apuntes oficiales de la asignatura"
    ],
    general: [
      "apuntes del profesor",
      "manual recomendado",
      "rúbrica oficial del examen",
      "fuentes oficiales o académicas"
    ]
  };

  var SUBJECT_KEYWORDS = [
    { key: "lengua", words: ["lengua", "castellano", "gramatica", "gramática", "sintaxis", "literatura"] },
    { key: "ingles", words: ["ingles", "inglés", "english", "grammar", "vocabulary", "wordreference"] },
    { key: "derecho", words: ["derecho", "civil", "penal", "mercantil", "constitucional", "administrativo", "codigo civil", "código civil", "contrato", "obligacion", "obligación"] },
    { key: "economia", words: ["economia", "economía", "microeconomia", "microeconomía", "macroeconomia", "pib", "inflacion", "inflación", "oferta", "demanda"] },
    { key: "historia", words: ["historia", "revolucion", "revolución", "imperio", "guerra", "siglo"] },
    { key: "biologia", words: ["biologia", "biología", "medicina", "genetica", "genética", "adn", "celula", "célula"] },
    { key: "matematicas", words: ["matematicas", "matemáticas", "calculo", "cálculo", "algebra", "álgebra", "estadistica", "estadística"] }
  ];

  function readStore() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch (error) {
      return {};
    }
  }

  function saveStore(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn("TecnIA Quality: no se pudo guardar.", error);
    }
  }

  function getValue(id) {
    var el = document.getElementById(id);
    return el ? String(el.value || "").trim() : "";
  }

  function htmlEscape(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function normalize(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function detectSubject() {
    var joined = normalize([
      getValue("subject"),
      getValue("notes"),
      getValue("manualTopics"),
      getValue("teacherFocus"),
      document.title
    ].join(" "));

    for (var i = 0; i < SUBJECT_KEYWORDS.length; i++) {
      var item = SUBJECT_KEYWORDS[i];
      for (var j = 0; j < item.words.length; j++) {
        if (joined.indexOf(normalize(item.words[j])) !== -1) {
          return item.key;
        }
      }
    }

    return "general";
  }

  function currentSources() {
    var key = detectSubject();
    return SOURCE_MAP[key] || SOURCE_MAP.general;
  }

  function injectStyles() {
    if (document.getElementById("tecniaQualityStyles")) return;

    var style = document.createElement("style");
    style.id = "tecniaQualityStyles";
    style.textContent =
      ".tecnia-quality-box{" +
        "margin:0 0 20px;" +
        "padding:20px;" +
        "border-radius:24px;" +
        "border:1px solid #bfdbfe;" +
        "background:linear-gradient(135deg,#eff6ff,#f8fafc);" +
        "color:#334155;" +
        "box-shadow:0 12px 30px rgba(15,23,42,.07);" +
      "}" +
      ".tecnia-quality-head{" +
        "display:flex;" +
        "justify-content:space-between;" +
        "gap:18px;" +
        "align-items:flex-start;" +
      "}" +
      ".tecnia-quality-head strong{" +
        "display:block;" +
        "color:#0f172a;" +
        "font-size:1.08rem;" +
        "margin-bottom:6px;" +
      "}" +
      ".tecnia-quality-head p,.tecnia-quality-rules li,.tecnia-quality-box small{" +
        "line-height:1.62;" +
      "}" +
      ".tecnia-quality-head p{margin:0;}" +
      ".tecnia-quality-switch{" +
        "display:inline-flex;" +
        "align-items:center;" +
        "gap:8px;" +
        "white-space:nowrap;" +
        "font-weight:900;" +
        "color:#1d4ed8;" +
      "}" +
      ".tecnia-quality-switch input{" +
        "width:18px;" +
        "height:18px;" +
      "}" +
      ".tecnia-quality-grid{" +
        "display:grid;" +
        "grid-template-columns:1fr 1fr;" +
        "gap:14px;" +
        "margin-top:16px;" +
      "}" +
      ".tecnia-quality-grid label{" +
        "display:block;" +
        "margin-bottom:8px;" +
        "color:#0f172a;" +
        "font-weight:900;" +
      "}" +
      ".tecnia-quality-grid textarea{" +
        "width:100%;" +
        "border:1px solid #cbd5e1;" +
        "border-radius:16px;" +
        "padding:12px 13px;" +
        "font:inherit;" +
        "color:#0f172a;" +
        "background:#fff;" +
      "}" +
      ".tecnia-quality-rules{" +
        "margin-top:16px;" +
        "padding:16px;" +
        "border-radius:20px;" +
        "background:#fff;" +
        "border:1px solid #dbeafe;" +
      "}" +
      ".tecnia-quality-rules strong{color:#0f172a;}" +
      ".tecnia-quality-rules ul{margin:10px 0 0 20px;}" +
      ".tecnia-quality-box small{" +
        "display:block;" +
        "margin-top:12px;" +
        "color:#64748b;" +
      "}" +
      "@media(max-width:760px){" +
        ".tecnia-quality-head{flex-direction:column;}" +
        ".tecnia-quality-grid{grid-template-columns:1fr;}" +
      "}";

    document.head.appendChild(style);
  }

  function createQualityBox() {
    var store = readStore();
    var defaultSources = currentSources().join(", ");

    var box = document.createElement("div");
    box.id = "tecniaQualityBox";
    box.className = "tecnia-quality-box";

    box.innerHTML =
      '<div class="tecnia-quality-head">' +
        '<div>' +
          '<strong>Modo precisión 10/10</strong>' +
          '<p>Evita relleno y prioriza matices: límites, excepciones, artículos, prohibiciones, efectos, sujetos, errores típicos y fuentes fiables.</p>' +
        '</div>' +
        '<label class="tecnia-quality-switch">' +
          '<input type="checkbox" id="tecniaQualityEnabled" ' + (store.enabled === false ? "" : "checked") + '>' +
          '<span>Activo</span>' +
        '</label>' +
      '</div>' +

      '<div class="tecnia-quality-grid">' +
        '<div>' +
          '<label for="tecniaQualityMustKeep">Datos que no pueden faltar</label>' +
          '<textarea id="tecniaQualityMustKeep" rows="4" placeholder="Ej: artículos, excepciones, prohibiciones, límites, requisitos, sujetos, efectos, errores típicos...">' + htmlEscape(store.mustKeep || "") + '</textarea>' +
        '</div>' +
        '<div>' +
          '<label for="tecniaQualitySources">Fuentes fiables o referencia del profesor</label>' +
          '<textarea id="tecniaQualitySources" rows="4" placeholder="Ej: BOE, RAE, WordReference, manual del profesor...">' + htmlEscape(store.sources || defaultSources) + '</textarea>' +
        '</div>' +
      '</div>' +

      '<div class="tecnia-quality-rules">' +
        '<strong>Reglas de calidad:</strong>' +
        '<ul>' +
          '<li>No usar frases genéricas si no aportan contenido.</li>' +
          '<li>Explicar qué hace especial a cada concepto.</li>' +
          '<li>Incluir límites, excepciones, prohibiciones, requisitos, artículos y efectos cuando aparezcan.</li>' +
          '<li>Diferenciar conceptos parecidos para evitar errores de examen.</li>' +
          '<li>Si falta contexto, indicarlo en lugar de inventarlo.</li>' +
        '</ul>' +
      '</div>' +

      '<small>Nota: esta web estática no consulta RAE, WordReference, BOE u otras webs automáticamente. Esta capa añade las fuentes al contexto y al prompt. Para consulta automática real haría falta backend o API.</small>';

    return box;
  }

  function injectQualityBox() {
    if (document.getElementById("tecniaQualityBox")) return;

    var form =
      document.querySelector("form") ||
      document.querySelector(".tool-panel") ||
      document.querySelector(".planner-panel") ||
      document.querySelector(".panel");

    if (!form || !form.parentNode) return;

    var box = createQualityBox();
    form.parentNode.insertBefore(box, form);

    var enabled = document.getElementById("tecniaQualityEnabled");
    var mustKeep = document.getElementById("tecniaQualityMustKeep");
    var sources = document.getElementById("tecniaQualitySources");

    if (enabled) enabled.addEventListener("change", saveQualityFields);
    if (mustKeep) mustKeep.addEventListener("input", saveQualityFields);
    if (sources) sources.addEventListener("input", saveQualityFields);
  }

  function saveQualityFields() {
    var enabled = document.getElementById("tecniaQualityEnabled");
    saveStore({
      enabled: enabled ? enabled.checked : true,
      mustKeep: getValue("tecniaQualityMustKeep"),
      sources: getValue("tecniaQualitySources"),
      updatedAt: new Date().toISOString()
    });
  }

  function getQualityInstruction() {
    var enabled = document.getElementById("tecniaQualityEnabled");
    if (enabled && !enabled.checked) return "";

    var mustKeep = getValue("tecniaQualityMustKeep");
    var sources = getValue("tecniaQualitySources") || currentSources().join(", ");

    return [
      "",
      "MODO PRECISIÓN 10/10 TECNIA",
      "Objetivo: eliminar relleno y priorizar contenido de calidad para aspirar a la máxima nota.",
      "",
      "Datos que no pueden faltar:",
      mustKeep || "Identifica límites, excepciones, prohibiciones, requisitos, sujetos, efectos, artículos, errores típicos y matices diferenciales.",
      "",
      "Fuentes fiables o referencia que deben orientar la respuesta:",
      sources,
      "",
      "Reglas:",
      "1. No usar frases genéricas que no aporten contenido.",
      "2. Explicar qué hace especial a cada concepto.",
      "3. Incluir límites, excepciones, prohibiciones, artículos, requisitos y efectos cuando aparezcan.",
      "4. Diferenciar conceptos parecidos.",
      "5. Señalar errores típicos que podrían hacer perder puntos.",
      "6. Si la asignatura es lengua, priorizar RAE/FundéuRAE.",
      "7. Si la asignatura es inglés, usar diccionarios fiables como Cambridge, Oxford o WordReference.",
      "8. Si la asignatura es derecho, priorizar BOE, DPEJ/RAE y la norma indicada.",
      "9. Si falta un dato necesario, indicarlo en lugar de inventarlo."
    ].join("\n");
  }

  function appendInstructionToField(field, instruction) {
    if (!field || !instruction) return null;

    var original = field.value || "";
    if (original.indexOf("MODO PRECISIÓN 10/10 TECNIA") !== -1) return null;

    field.value = (original.trim() + "\n\n" + instruction).trim();

    return function restore() {
      field.value = original;
    };
  }

  function prepareBeforeSubmit() {
    saveQualityFields();

    var instruction = getQualityInstruction();
    if (!instruction) return;

    var ids = ["mustKeep", "teacherFocus", "extra", "notes", "manualTopics"];
    var restorers = [];

    for (var i = 0; i < ids.length; i++) {
      var field = document.getElementById(ids[i]);
      var restore = appendInstructionToField(field, instruction);
      if (restore) restorers.push(restore);
    }

    setTimeout(function () {
      for (var j = 0; j < restorers.length; j++) {
        restorers[j]();
      }
    }, 1500);
  }

  function hookForms() {
    var forms = document.querySelectorAll("form");
    for (var i = 0; i < forms.length; i++) {
      if (forms[i].getAttribute("data-tecnia-quality-hooked") === "true") continue;
      forms[i].setAttribute("data-tecnia-quality-hooked", "true");
      forms[i].addEventListener("submit", prepareBeforeSubmit, true);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    injectStyles();
    injectQualityBox();
    hookForms();
  });
})();
