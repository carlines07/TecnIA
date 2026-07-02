/*
  TecnIA Memory
  Guarda datos generales del estudiante en este navegador para no repetirlos entre herramientas.
  No crea cuentas ni envía datos a un servidor. Usa localStorage del navegador.
*/

(function () {
  const STORAGE_KEY = "tecnia.studyProfile.v1";
  const MAX_TEXT_LENGTH = 450000;

  const FIELD_CONFIG = [
    { ids: ["subject"], key: "subject", label: "Asignatura" },
    { ids: ["examType"], key: "examType", label: "Tipo de examen" },
    { ids: ["level"], key: "level", label: "Nivel actual" },
    { ids: ["difficulty"], key: "difficulty", label: "Dificultad" },
    { ids: ["teacherFocus"], key: "teacherFocus", label: "Matices del profesor", longText: true },
    { ids: ["mustKeep"], key: "mustKeep", label: "Datos que no quiere perder", longText: true },
    { ids: ["notes", "manualTopics"], key: "studyMaterial", label: "Apuntes o material de estudio", longText: true }
  ];

  function readProfile() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch (error) {
      return {};
    }
  }

  function saveProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      return true;
    } catch (error) {
      console.warn("TecnIA Memory: no se pudo guardar. Puede que el texto sea demasiado largo.", error);
      return false;
    }
  }

  function findField(ids) {
    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) return element;
    }
    return null;
  }

  function normalizeValue(value, longText) {
    let clean = String(value || "").trim();
    if (longText && clean.length > MAX_TEXT_LENGTH) {
      clean = clean.slice(0, MAX_TEXT_LENGTH);
    }
    return clean;
  }

  function restoreFields() {
    const profile = readProfile();

    FIELD_CONFIG.forEach((field) => {
      const element = findField(field.ids);
      const savedValue = profile[field.key];

      if (!element || savedValue === undefined || savedValue === null || savedValue === "") return;

      if (element.tagName === "SELECT") {
        const optionExists = Array.from(element.options).some(option => option.value === savedValue);
        if (optionExists) element.value = savedValue;
        return;
      }

      if (!element.value || element.value.trim() === "") {
        element.value = savedValue;
      }
    });
  }

  function collectCurrentFields() {
    const profile = readProfile();

    FIELD_CONFIG.forEach((field) => {
      const element = findField(field.ids);
      if (!element) return;

      const value = normalizeValue(element.value, field.longText);
      if (value) {
        profile[field.key] = value;
      }
    });

    profile.updatedAt = new Date().toISOString();
    return profile;
  }

  function saveCurrentFields(showMessage = false) {
    const ok = saveProfile(collectCurrentFields());

    if (showMessage) {
      showMemoryMessage(ok ? "Datos guardados para las herramientas de TecnIA." : "No se pudieron guardar los datos. Puede que el texto sea demasiado largo.");
    }

    return ok;
  }

  function clearMemory() {
    const confirmed = window.confirm("¿Quieres borrar los datos recordados por TecnIA en este navegador?");
    if (!confirmed) return;

    localStorage.removeItem(STORAGE_KEY);

    FIELD_CONFIG.forEach((field) => {
      const element = findField(field.ids);
      if (element) element.value = "";
    });

    showMemoryMessage("Datos restablecidos. Puedes rellenarlos de nuevo.");
  }

  function injectMemoryBox() {
    const form =
      document.querySelector("form") ||
      document.querySelector(".tool-panel") ||
      document.querySelector(".planner-panel") ||
      document.querySelector(".result-panel");

    if (!form || document.getElementById("tecniaMemoryBox")) return;

    const box = document.createElement("div");
    box.id = "tecniaMemoryBox";
    box.className = "tecnia-memory-box";
    box.innerHTML = `
      <div>
        <strong>Datos recordados de TecnIA</strong>
        <p>
          TecnIA puede recordar tus datos generales en este navegador para que no repitas asignatura,
          tipo de examen, nivel, apuntes o matices del profesor en cada herramienta.
        </p>
        <small>No se guarda en una cuenta ni se envía a un servidor. Solo queda en este navegador.</small>
      </div>
      <div class="tecnia-memory-actions">
        <button type="button" id="tecniaSaveMemory">Guardar datos actuales</button>
        <button type="button" id="tecniaResetMemory">Restablecer datos</button>
      </div>
      <div id="tecniaMemoryMessage" class="tecnia-memory-message" aria-live="polite"></div>
    `;

    form.parentNode.insertBefore(box, form);

    document.getElementById("tecniaSaveMemory").addEventListener("click", () => saveCurrentFields(true));
    document.getElementById("tecniaResetMemory").addEventListener("click", clearMemory);
  }

  function injectStyles() {
    if (document.getElementById("tecniaMemoryStyles")) return;

    const style = document.createElement("style");
    style.id = "tecniaMemoryStyles";
    style.textContent = `
      .tecnia-memory-box {
        margin: 0 0 20px;
        padding: 18px;
        border-radius: 22px;
        border: 1px solid #bfdbfe;
        background: linear-gradient(135deg, #eff6ff, #f8fafc);
        color: #334155;
        box-shadow: 0 10px 26px rgba(15, 23, 42, .06);
      }

      .tecnia-memory-box strong {
        display: block;
        color: #0f172a;
        font-size: 1.02rem;
        margin-bottom: 6px;
      }

      .tecnia-memory-box p {
        margin: 0 0 8px;
        line-height: 1.6;
      }

      .tecnia-memory-box small {
        color: #64748b;
        line-height: 1.5;
      }

      .tecnia-memory-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 14px;
      }

      .tecnia-memory-actions button {
        border: 1px solid #bfdbfe;
        background: #ffffff;
        color: #1d4ed8;
        border-radius: 999px;
        padding: 10px 14px;
        font-weight: 850;
        cursor: pointer;
      }

      .tecnia-memory-actions button:hover {
        background: #dbeafe;
      }

      .tecnia-memory-message {
        display: none;
        margin-top: 10px;
        color: #16a34a;
        font-weight: 850;
      }
    `;

    document.head.appendChild(style);
  }

  function showMemoryMessage(message) {
    const messageElement = document.getElementById("tecniaMemoryMessage");
    if (!messageElement) return;

    messageElement.textContent = message;
    messageElement.style.display = "block";

    setTimeout(() => {
      messageElement.style.display = "none";
    }, 2600);
  }

  function watchFields() {
    let timer = null;

    FIELD_CONFIG.forEach((field) => {
      const element = findField(field.ids);
      if (!element) return;

      const eventName = element.tagName === "SELECT" ? "change" : "input";
      element.addEventListener(eventName, () => {
        clearTimeout(timer);
        timer = setTimeout(() => saveCurrentFields(false), 600);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectStyles();
    restoreFields();
    injectMemoryBox();
    watchFields();
  });
})();
