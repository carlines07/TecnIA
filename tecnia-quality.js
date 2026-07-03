/*
  TecnIA Quality Layer - modo silencioso
  Esta versión NO muestra bloques, NO añade fuentes fiables y NO mete instrucciones en el temario.
  Solo mantiene funciones vacías para que las páginas no den error si llaman a TecniaQuality.
*/
(function () {
  function cleanQualityNoise(text) {
    return String(text || "")
      .replace(/MODO PRECISI[OÓ]N 10\/10 TECNIA[\s\S]*$/i, "")
      .replace(/MODO PRECISION 10\/10 TECNIA[\s\S]*$/i, "")
      .replace(/Datos que no pueden faltar[\s\S]*?(?=\n\n|$)/gi, "")
      .replace(/Fuentes fiables[\s\S]*?(?=\n\n|$)/gi, "")
      .replace(/referencia del profesor[\s\S]*?(?=\n\n|$)/gi, "")
      .replace(/Si la asignatura es lengua[\s\S]*?(?=\n|$)/gi, "")
      .replace(/Si la asignatura es ingl[eé]s[\s\S]*?(?=\n|$)/gi, "")
      .replace(/Si la asignatura es derecho[\s\S]*?(?=\n|$)/gi, "")
      .replace(/No usar frases gen[eé]ricas[\s\S]*?(?=\n|$)/gi, "")
      .replace(/Explicar qu[eé] hace especial[\s\S]*?(?=\n|$)/gi, "")
      .replace(/Incluir l[ií]mites[\s\S]*?(?=\n|$)/gi, "")
      .replace(/Señalar errores t[ií]picos[\s\S]*?(?=\n|$)/gi, "")
      .replace(/Diferenciar conceptos parecidos[\s\S]*?(?=\n|$)/gi, "")
      .trim();
  }

  window.TecniaQuality = {
    getProfile: function () {
      return {
        enabled: false,
        mustKeep: "",
        sources: "",
        rules: []
      };
    },
    getContextText: function () {
      return "";
    },
    cleanQualityNoise: cleanQualityNoise,
    detectSubject: function () {
      return "general";
    },
    currentSources: function () {
      return [];
    }
  };
})();
