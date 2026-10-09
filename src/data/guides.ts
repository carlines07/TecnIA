        title: "Costes que debes revisar",
        paragraphs: [
          "Con plazos cortos, cualquier comisión fija pesa mucho sobre el rendimiento. Una comisión de 10 € sobre una inversión de 1.000 € equivale al 1 % del importe, y puede absorber gran parte del rendimiento de una Letra. Usa nuestra calculadora para estimarlo con tus propios datos.",
        ],
      },
      {
        id: "pasos",
        title: "Paso a paso (esquema general)",
        steps: [
          "Decide la vía: compra directa al Tesoro o a través de un intermediario.",
          "Consulta el calendario oficial de subastas y elige el plazo.",
          "Revisa los requisitos de acceso y, si usas un intermediario, su folleto de tarifas.",
          "Presenta tu petición (normalmente no competitiva) dentro del plazo indicado.",
          "Comprueba el resultado de la subasta y el importe cargado.",
          "Al vencimiento, recibirás el nominal en la cuenta asociada, salvo que solicites reinversión si está disponible.",
        ],
        review: "El esquema es general. Los pasos operativos concretos se publicarán tras verificarlos con la documentación oficial vigente.",
      },
      {
        id: "riesgos",
        title: "Riesgos y limitaciones",
        paragraphs: [
          "No conviene describir las Letras como productos «sin riesgo». Existe riesgo de crédito del emisor, aunque se considere bajo; riesgo de tipos si vendes antes del vencimiento, y riesgo de inflación si esta supera tu rentabilidad.",
          "Esta guía tiene carácter educativo y no constituye asesoramiento financiero personalizado.",
        ],
      },
    ],
    sources: [officialSources.tesoro, { label: "Banco de España", url: "https://www.bde.es" }, officialSources.cnmv],
    related: ["bonos-vs-etf-renta-fija", "comparar-brokers-costes-etf"],
  },
  {
    slug: "bonos-vs-etf-renta-fija",
    title: "Bonos individuales frente a ETF de renta fija",
    category: "Renta fija",
    summary:
      "Qué posees en cada caso, cómo se comportan ante los tipos de interés y por qué un ETF de bonos no garantiza recuperar tu dinero en una fecha concreta.",
    readingMinutes: 10,
    reviewedAt: null,
    flagship: true,
    products: ["letras-y-bonos", "etf-renta-fija"],
    terms: ["Bono", "ETF", "Duración", "TER", "Spread"],
    pros: [
      "Bono individual: vencimiento y flujos conocidos si el emisor cumple.",
      "ETF: diversificación inmediata y facilidad para comprar y vender en bolsa.",
    ],
    cons: [
      "Bono individual: menos diversificación y, a veces, menor liquidez para particulares.",
      "ETF: sin vencimiento en la mayoría de casos, gastos corrientes anuales (TER).",
    ],
    sections: [
      {
        id: "que-posees",
        title: "Qué posees en cada caso",
        paragraphs: [
          "Con un bono individual eres acreedor directo de un emisor concreto. Conoces el cupón, la fecha de vencimiento y el nominal que te devolverán.",
          "Con un ETF de renta fija posees participaciones de un fondo que, a su vez, mantiene una cartera de muchos bonos. No eres acreedor directo de cada emisor.",
        ],
      },
      {
        id: "vencimiento",
        title: "La gran diferencia: el vencimiento",
        paragraphs: [
          "Si compras un bono y lo mantienes hasta el vencimiento, las variaciones de precio intermedias dejan de importar: recibes el nominal (si el emisor paga).",
          "La mayoría de ETF de bonos renuevan constantemente su cartera para mantener una duración estable. No tienen una fecha en la que «devuelvan el nominal». Si los tipos suben y necesitas vender, puedes hacerlo con pérdidas.",
          "Los ETF con vencimiento definido son una excepción intermedia: liquidan la cartera en una fecha prevista.",
        ],
      },
      {
        id: "tipos",
        title: "Sensibilidad a los tipos de interés",
        paragraphs: [
          "Cuando los tipos de interés suben, los bonos ya emitidos valen menos, porque los nuevos pagan más. La duración resume esta sensibilidad.",
          "Regla aproximada: con una duración de 5 años, una subida de 1 punto en los tipos provoca una caída del precio de alrededor del 5 %. Es una aproximación educativa, no una predicción.",
        ],
      },
      {
        id: "costes",
        title: "Costes comparados",
        list: [
          "Bono individual: comisión de compra, custodia y posible diferencial de precio.",
          "ETF: comisión de compraventa del bróker, spread en bolsa y TER anual del fondo.",
          "En ambos: posible coste de cambio de divisa si el activo no está en euros.",
        ],
      },
      {
        id: "cuando",
        title: "Preguntas para orientarte",
        paragraphs: ["No te decimos qué elegir, pero estas preguntas ayudan a entender qué encaja con tu objetivo:"],
        list: [
          "¿Necesitas el dinero en una fecha concreta?",
          "¿Cuánto te importa poder vender en cualquier momento?",
          "¿Prefieres un único emisor o una cartera diversificada?",
          "¿Entiendes cómo afectaría una subida de tipos al valor de tu inversión?",
        ],
      },
    ],
    sources: [officialSources.cnmv, officialSources.tesoro],
    related: ["donde-comprar-letras-del-tesoro", "comparar-brokers-costes-etf"],
  },
  {
    slug: "comparar-brokers-costes-etf",
    title: "Cómo comparar brókeres y calcular los costes de comprar un ETF",
    category: "Costes",
    summary:
      "Separa los costes del bróker de los costes del producto, aprende a leer un folleto de tarifas y calcula cuánto te cuesta realmente cada compra.",
    readingMinutes: 11,
    reviewedAt: null,
    flagship: true,
    products: ["etf-acciones", "etf-renta-fija"],
    terms: ["TER", "Spread", "Custodia"],
    pros: [
      "Comparar con método evita fijarse solo en la comisión más visible.",
      "Calcular el coste en porcentaje permite comparar importes distintos.",
    ],
    cons: [
      "Las tarifas cambian: hay que revisar la fecha de verificación.",
      "El spread varía con el mercado y no siempre se publica.",
    ],
    sections: [
      {
        id: "dos-capas",
        title: "Dos capas de costes",
        paragraphs: ["El error más común es mezclar lo que cobra el bróker con lo que cuesta el propio ETF."],
        list: [
          "Costes del bróker: comisión de compraventa, custodia, cambio de divisa, traspasos y retiradas.",
          "Costes del producto: TER (gastos corrientes) y, en la práctica, el spread de cotización.",
        ],
      },
      {
        id: "folleto",
        title: "Cómo leer un folleto de tarifas",
        steps: [
          "Busca el documento oficial de tarifas en la web del bróker y anota su fecha.",
          "Localiza la tarifa de la bolsa donde cotiza el ETF que te interesa: suele variar por mercado.",
          "Comprueba si hay mínimos por operación, además del porcentaje.",
          "Revisa si cobran custodia, mantenimiento o inactividad.",
          "Mira el coste de cambio de divisa si el ETF cotiza en otra moneda.",
          "Verifica los costes de traspaso de valores a otra entidad.",
        ],
      },
      {
        id: "calculo",
        title: "Cómo calcular el coste de una compra",
        paragraphs: [
          "Coste de transacción = comisión del bróker + coste de cambio de divisa + otros costes fijos. Divide entre el importe invertido para obtener un porcentaje comparable.",
          "Ejemplo ilustrativo: inviertes 500 € con una comisión de 2 € → 0,40 % de coste de entrada. Si inviertes 5.000 € con la misma comisión, baja al 0,04 %. Las comisiones fijas penalizan las compras pequeñas.",
          "El TER es diferente: es un coste anual sobre el valor de tu inversión, no un coste de compra. No lo sumes directamente al coste de transacción.",
        ],
      },
      {
        id: "lo-que-importa",
        title: "Más allá de la comisión",
        list: [
          "¿Ofrece el ETF concreto que buscas, en la bolsa y divisa que prefieres?",
          "¿Qué protección tienen tus valores y en qué país está regulada la entidad?",
          "¿Cómo es la información fiscal que proporciona?",
          "¿Existen relaciones comerciales que debas conocer? En TecnIA las señalamos siempre.",
        ],
      },
    ],
    sources: [officialSources.cnmv],
    related: ["bonos-vs-etf-renta-fija", "donde-comprar-letras-del-tesoro"],
  },
];

/** Shorter educational articles (cards). Link to a guide when one exists. */
export const articles: { title: string; category: string; description: string; minutes: number; guide?: string; term?: string }[] = [
  { title: "Bonos frente a ETF de bonos", category: "Renta fija", description: "Qué posees, vencimiento y riesgo de tipos en cada caso.", minutes: 10, guide: "bonos-vs-etf-renta-fija" },
  { title: "Qué es el TER y cómo afecta a tu rentabilidad", category: "Costes", description: "El coste anual que se descuenta del valor de tu fondo.", minutes: 4, term: "TER" },
  { title: "Qué es el spread y por qué importa", category: "Costes", description: "La diferencia entre comprar y vender que no aparece en la tarifa.", minutes: 4, term: "Spread" },
  { title: "Cómo afectan los tipos de interés a los bonos", category: "Renta fija", description: "Duración, precios y por qué suben y bajan.", minutes: 6, guide: "bonos-vs-etf-renta-fija" },
  { title: "Qué costes revisar antes de comprar un ETF", category: "ETF", description: "Comisión, divisa, custodia, TER y spread.", minutes: 11, guide: "comparar-brokers-costes-etf" },
  { title: "Cómo funcionan las Letras del Tesoro", category: "Renta fija", description: "Emisión al descuento, subastas y vencimientos.", minutes: 12, guide: "donde-comprar-letras-del-tesoro" },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
