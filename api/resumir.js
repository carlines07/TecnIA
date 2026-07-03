module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Usa POST." });
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Falta OPENAI_API_KEY en Vercel. Añádela en Settings → Environment Variables."
      });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});

    const asignatura = String(body.asignatura || "Asignatura").slice(0, 120);
    const area = String(body.area || "Detectar automáticamente").slice(0, 80);
    const profundidad = String(body.profundidad || "premium").slice(0, 50);
    const objetivo = String(body.objetivo || "sacar un 10").slice(0, 80);
    const conceptosClave = String(body.conceptosClave || "").slice(0, 1500);

    let apuntes = String(body.apuntes || "");

    apuntes = apuntes
      .replace(/\r/g, "\n")
      .replace(/MODO PRECISI[OÓ]N 10\/10 TECNIA[\s\S]*$/i, "")
      .replace(/Datos que no pueden faltar[\s\S]*?(?=\n\n|$)/gi, "")
      .replace(/Fuentes fiables[\s\S]*?(?=\n\n|$)/gi, "")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    if (apuntes.split(/\s+/).length < 80) {
      return res.status(400).json({
        error: "Pega apuntes más completos para generar un resumen útil."
      });
    }

    if (apuntes.length > 65000) {
      apuntes = apuntes.slice(0, 65000) + "\n\n[Texto recortado automáticamente para controlar coste.]";
    }

    const systemPrompt = `Eres el motor académico de TecnIA. Transformas apuntes densos en material de estudio excelente.

REGLAS:
1. No hagas un resumen genérico.
2. No uses frases vacías como "este concepto debe estudiarse" si no aportan contenido.
3. Respeta el orden y epígrafes del temario.
4. Usa vocabulario propio del área indicada: Derecho, Economía, Historia, Lengua, Anatomía, Biología, Medicina, Fisiología, Psicología, Sociología o Contabilidad.
5. No elimines requisitos, excepciones, límites, causas, consecuencias, mecanismos, diferencias, artículos o términos técnicos.
6. Si algo es dudoso, ponlo en terminosParaRevisar.
7. Devuelve SOLO JSON válido. Nada de markdown. Nada de texto fuera del JSON.

ESTRUCTURA JSON:
{
  "titulo": "string",
  "areaAplicada": "string",
  "resumenEjecutivo": ["string"],
  "bloques": [
    {
      "titulo": "string",
      "ideaCentral": "string",
      "explicacion": ["string"],
      "noPuedeFaltar": ["string"],
      "matices": ["string"],
      "ejemploAplicado": "string"
    }
  ],
  "conceptosClave": [
    {
      "concepto": "string",
      "definicion": "string",
      "explicacion": "string",
      "matizDeExamen": "string",
      "diferenciaCon": "string"
    }
  ],
  "comparaciones": [
    {
      "titulo": "string",
      "diferencia": "string"
    }
  ],
  "casosPracticos": [
    {
      "titulo": "string",
      "supuesto": "string",
      "solucion": "string"
    }
  ],
  "erroresTipicos": [
    {
      "error": "string",
      "correccion": "string"
    }
  ],
  "preguntasExamen": ["string"],
  "checklist10": ["string"],
  "terminosParaRevisar": ["string"]
}`;

    const userPrompt = `ASIGNATURA: ${asignatura}
ÁREA: ${area}
PROFUNDIDAD: ${profundidad}
OBJETIVO: ${objetivo}
CONCEPTOS IMPORTANTES: ${conceptosClave || "No especificados"}

APUNTES:
${apuntes}`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.5",
        input: [
          { role: "developer", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        max_output_tokens: 6000
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || "Error de OpenAI."
      });
    }

    const text = data.output_text || extractText(data);
    const parsed = parseJson(text);

    if (!parsed) {
      return res.status(200).json({
        titulo: `Resumen de ${asignatura}`,
        areaAplicada: area,
        resumenEjecutivo: [
          "La IA respondió, pero no se pudo convertir perfectamente a JSON. Se conserva la respuesta para no perder información."
        ],
        bloques: [
          {
            titulo: "Respuesta de la IA",
            ideaCentral: "Contenido generado",
            explicacion: [text || "Sin contenido"],
            noPuedeFaltar: [],
            matices: [],
            ejemploAplicado: ""
          }
        ],
        conceptosClave: [],
        comparaciones: [],
        casosPracticos: [],
        erroresTipicos: [],
        preguntasExamen: [],
        checklist10: [],
        terminosParaRevisar: []
      });
    }

    return res.status(200).json(parsed);

  } catch (error) {
    return res.status(500).json({
      error: error.message || "Error interno generando el resumen."
    });
  }
};

function extractText(data) {
  try {
    return (data.output || [])
      .flatMap(item => item.content || [])
      .map(content => content.text || "")
      .join("\n")
      .trim();
  } catch {
    return "";
  }
}

function parseJson(text) {
  if (!text) return null;

  let cleaned = String(text)
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  const first = cleaned.indexOf("{");
  const last = cleaned.lastIndexOf("}");

  if (first >= 0 && last > first) {
    cleaned = cleaned.slice(first, last + 1);
  }

  try {
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}
