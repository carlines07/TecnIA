/*
  TecnIA Quality Layer - version limpia
  No mete instrucciones dentro del temario del usuario.
  Solo muestra el bloque y expone funciones para que las herramientas lean el perfil.
*/
(function () {
  var STORAGE_KEY = "tecnia.qualityProfile.v2";

  var SOURCE_MAP = {
    lengua: ["RAE - DLE", "RAE - Diccionario panhispanico de dudas", "FundeuRAE"],
    ingles: ["Cambridge Dictionary", "Oxford Learner's Dictionaries", "WordReference", "Merriam-Webster"],
    derecho: ["BOE - legislacion consolidada", "Diccionario panhispanico del espanol juridico", "Codigo Civil o norma aplicable", "manual del profesor"],
    economia: ["CORE Econ", "Banco de Espana", "INE", "Eurostat", "BCE"],
    historia: ["manual recomendado", "Biblioteca Nacional de Espana", "museos o instituciones oficiales", "archivos historicos"],
    biologia: ["MedlinePlus", "OMS", "NIH / NCBI", "MSD Manual"],
    matematicas: ["Khan Academy", "Paul's Online Math Notes", "apuntes oficiales"],
    general: ["apuntes del profesor", "manual recomendado", "rubrica oficial", "fuentes oficiales o academicas"]
  };

  var SUBJECT_KEYWORDS = [
    { key: "lengua", words: ["lengua", "castellano", "gramatica", "sintaxis", "literatura"] },
    { key: "ingles", words: ["ingles", "english", "grammar", "vocabulary"] },
    { key: "derecho", words: ["derecho", "civil", "penal", "mercantil", "constitucional", "administrativo", "contrato", "obligacion", "codigo civil", "acreedor", "deudor"] },
    { key: "economia", words: ["economia", "microeconomia", "macroeconomia", "pib", "inflacion", "oferta", "demanda"] },
    { key: "historia", words: ["historia", "revolucion", "imperio", "guerra", "siglo"] },
    { key: "biologia", words: ["biologia", "genetica", "adn", "celula"] },
    { key: "matematicas", words: ["matematicas", "calculo", "algebra", "estadistica"] }
  ];

  function readStore() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
    catch (error) { return {}; }
  }

  function saveStore(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
    catch (error) {}
  }

  function getValue(id) {
    var el = document.getElementById(id);
    return el ? String(el.value || "").trim() : "";
  }

  function normalize(text) {
    return String(text || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function escapeHtml(text) {
    return String(text || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function detectSubject() {
    var joined = normalize([document.title, getValue("subject"), getValue("notes"), getValue("manualTopics"), getValue("teacherFocus")].join(" "));
    for (var i = 0; i < SUBJECT_KEYWORDS.length; i++) {
      var item = SUBJECT_KEYWORDS[i];
      for (var j = 0; j < item.words.length; j++) {
        if (joined.indexOf(normalize(item.words[j])) !== -1) return item.key;
      }
    }
    return "general";
  }

  function currentSources() {
    return SOURCE_MAP[detectSubject()] || SOURCE_MAP.general;
  }

  function injectStyles() {
    if (document.getElementById("tecniaQualityStyles")) return;
    var style = document.createElement("style");
    style.id = "tecniaQualityStyles";
    style.textContent =
      ".tecnia-quality-box{margin:0 0 20px;padding:20px;border-radius:24px;border:1px solid #bfdbfe;background:linear-gradient(135deg,#eff6ff,#f8fafc);color:#334155;box-shadow:0 12px 30px rgba(15,23,42,.07)}" +
      ".tecnia-quality-head{display:flex;justify-content:space-between;gap:18px;align-items:flex-start}.tecnia-quality-head strong{display:block;color:#0f172a;font-size:1.08rem;margin-bottom:6px}.tecnia-quality-head p,.tecnia-quality-rules li,.tecnia-quality-box small{line-height:1.62}.tecnia-quality-head p{margin:0}" +
      ".tecnia-quality-switch{display:inline-flex;align-items:center;gap:8px;white-space:nowrap;font-weight:900;color:#1d4ed8}.tecnia-quality-switch input{width:18px;height:18px}" +
      ".tecnia-quality-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:16px}.tecnia-quality-grid label{display:block;margin-bottom:8px;color:#0f172a;font-weight:900}.tecnia-quality-grid textarea{width:100%;border:1px solid #cbd5e1;border-radius:16px;padding:12px 13px;font:inherit;color:#0f172a;background:#fff}" +
      ".tecnia-quality-rules{margin-top:16px;padding:16px;border-radius:20px;background:#fff;border:1px solid #dbeafe}.tecnia-quality-rules strong{color:#0f172a}.tecnia-quality-rules ul{margin:10px 0 0 20px}.tecnia-quality-box small{display:block;margin-top:12px;color:#64748b}" +
      "@media(max-width:760px){.tecnia-quality-head{flex-direction:column}.tecnia-quality-grid{grid-template-columns:1fr}}";
    document.head.appendChild(style);
  }

  function createBox() {
    var store = readStore();
    var defaultSources = currentSources().join(", ");
    var box = document.createElement("div");
    box.id = "tecniaQualityBox";
    box.className = "tecnia-quality-box";
    box.innerHTML =
      '<div class="tecnia-quality-head"><div><strong>Modo precision 10/10</strong><p>Evita relleno. Prioriza limites, excepciones, articulos, prohibiciones, requisitos, efectos, sujetos, diferencias y errores tipicos.</p></div><label class="tecnia-quality-switch"><input type="checkbox" id="tecniaQualityEnabled" ' + (store.enabled === false ? "" : "checked") + '><span>Activo</span></label></div>' +
      '<div class="tecnia-quality-grid"><div><label for="tecniaQualityMustKeep">Datos que no pueden faltar</label><textarea id="tecniaQualityMustKeep" rows="4" placeholder="Ej: articulos, excepciones, prohibiciones, limites, sujetos, efectos, errores tipicos...">' + escapeHtml(store.mustKeep || "") + '</textarea></div><div><label for="tecniaQualitySources">Fuentes fiables o referencia del profesor</label><textarea id="tecniaQualitySources" rows="4" placeholder="Ej: BOE, RAE, WordReference, manual del profesor...">' + escapeHtml(store.sources || defaultSources) + '</textarea></div></div>' +
      '<div class="tecnia-quality-rules"><strong>Reglas de calidad:</strong><ul><li>No convertir estas instrucciones en temas de estudio.</li><li>No usar frases genericas si no aportan contenido.</li><li>Explicar que hace especial a cada concepto.</li><li>Incluir matices examinables y diferencias entre conceptos parecidos.</li><li>Si falta contexto, indicarlo en vez de inventarlo.</li></ul></div>' +
      '<small>Nota: esta web estatica no consulta internet automaticamente. Para RAE, WordReference, BOE o IA real en directo haria falta conectar una API o backend.</small>';
    return box;
  }

  function injectBox() {
    if (document.getElementById("tecniaQualityBox")) return;
    var form = document.querySelector("form") || document.querySelector(".tool-panel") || document.querySelector(".planner-panel") || document.querySelector(".panel");
    if (!form || !form.parentNode) return;
    form.parentNode.insertBefore(createBox(), form);
    ["tecniaQualityEnabled", "tecniaQualityMustKeep", "tecniaQualitySources"].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("input", saveProfile);
      el.addEventListener("change", saveProfile);
    });
  }

  function saveProfile() {
    var enabled = document.getElementById("tecniaQualityEnabled");
    saveStore({
      enabled: enabled ? enabled.checked : true,
      mustKeep: getValue("tecniaQualityMustKeep"),
      sources: getValue("tecniaQualitySources") || currentSources().join(", "),
      subjectType: detectSubject(),
      updatedAt: new Date().toISOString()
    });
  }

  function getProfile() {
    var store = readStore();
    var enabled = document.getElementById("tecniaQualityEnabled");
    return {
      enabled: enabled ? enabled.checked : store.enabled !== false,
      subjectType: detectSubject(),
      mustKeep: getValue("tecniaQualityMustKeep") || store.mustKeep || "",
      sources: getValue("tecniaQualitySources") || store.sources || currentSources().join(", "),
      rules: ["sin relleno", "matices diferenciales", "limites, excepciones, prohibiciones, requisitos, articulos y efectos", "diferenciar conceptos parecidos", "errores tipicos", "no inventar si falta contexto"]
    };
  }

  function getContextText() {
    var p = getProfile();
    if (!p.enabled) return "";
    return [
      "MODO PRECISION 10/10 TECNIA",
      "Datos que no pueden faltar: " + (p.mustKeep || "limites, excepciones, prohibiciones, articulos, requisitos, sujetos, efectos, diferencias y errores tipicos"),
      "Fuentes o referencia: " + p.sources,
      "Reglas: " + p.rules.join("; ")
    ].join("\n");
  }

  function cleanQualityNoise(text) {
    return String(text || "")
      .replace(/MODO PRECISI[OÓ]N 10\/10 TECNIA[\s\S]*$/i, "")
      .replace(/MODO PRECISION 10\/10 TECNIA[\s\S]*$/i, "")
      .replace(/Datos que no pueden faltar:\s*$/gim, "")
      .replace(/Fuentes fiables o referencia.*$/gim, "")
      .replace(/Identifica limites, excepciones, prohibiciones, requisitos, sujetos, efectos, articulos, errores tipicos y matices diferenciales\./gi, "")
      .replace(/Identifica límites, excepciones, prohibiciones, requisitos, sujetos, efectos, artículos, errores típicos y matices diferenciales\./gi, "")
      .trim();
  }

  window.TecniaQuality = {
    getProfile: getProfile,
    getContextText: getContextText,
    cleanQualityNoise: cleanQualityNoise,
    detectSubject: detectSubject,
    currentSources: currentSources
  };

  document.addEventListener("DOMContentLoaded", function () {
    injectStyles();
    injectBox();
  });
})();
