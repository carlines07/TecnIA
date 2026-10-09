import type { ProductSlug, Source } from "./types";

export interface Product {
  slug: ProductSlug;
  name: string;
  short: string;
  cta: string;
  bullets: string[];
  intro: string;
  explanation: string[];
  characteristics: { label: string; text: string }[];
  risks: { label: string; text: string }[];
  costs: { label: string; text: string }[];
  routes: { label: string; text: string }[];
  guides: string[];
  sources: Source[];
}

export const officialSources = {
  tesoro: { label: "Tesoro Público", url: "https://www.tesoro.es" },
  cnmv: { label: "CNMV — Portal del inversor", url: "https://www.cnmv.es/portal/inversor/Indice.aspx" },
  bde: { label: "Banco de España — Portal del Cliente Bancario", url: "https://clientebancario.bde.es" },
  fgd: { label: "Fondo de Garantía de Depósitos", url: "https://www.fgd.es" },
} satisfies Record<string, Source>;

export const products: Product[] = [
  {
    slug: "letras-y-bonos",
    name: "Letras y bonos",
    short: "Deuda pública española: Letras del Tesoro, bonos y obligaciones del Estado.",
    cta: "Explorar renta fija",
    bullets: [
      "Letras del Tesoro",
      "Bonos y obligaciones del Estado",
      "Compra directa o a través de intermediarios",
      "Vencimientos, rentabilidad, riesgos y costes",
    ],
    intro:
      "Cuando compras deuda pública le prestas dinero al Estado a cambio de recibir intereses y la devolución del nominal al vencimiento.",
    explanation: [
      "Las Letras del Tesoro son valores a corto plazo. No pagan cupón: se compran por debajo de su valor nominal y al vencimiento se recibe el nominal completo. La diferencia es tu rendimiento.",
      "Los bonos y obligaciones del Estado son valores a medio y largo plazo que pagan un cupón periódico y devuelven el nominal al vencimiento.",
      "Si mantienes el valor hasta su vencimiento y el emisor cumple, conoces de antemano lo que recibirás. Si vendes antes, el precio dependerá del mercado en ese momento.",
    ],
    characteristics: [
      { label: "Emisor", text: "El Reino de España, a través del Tesoro Público." },
      { label: "Plazo", text: "Corto plazo (Letras) o medio y largo plazo (bonos y obligaciones)." },
      { label: "Forma de emisión", text: "Principalmente mediante subastas periódicas con calendario público." },
      { label: "Rendimiento", text: "Implícito (Letras) o mediante cupones (bonos y obligaciones)." },
    ],
    risks: [
      { label: "Riesgo de tipos de interés", text: "Si los tipos suben, el precio de los bonos ya emitidos baja. Afecta si vendes antes del vencimiento." },
      { label: "Riesgo de crédito", text: "La posibilidad, aunque se considere baja, de que el emisor no pague." },
      { label: "Riesgo de liquidez", text: "Vender antes del vencimiento puede implicar un precio peor o costes adicionales." },
      { label: "Inflación", text: "Si la inflación supera tu rentabilidad, pierdes poder adquisitivo." },
    ],
    costs: [
      { label: "Comisiones del intermediario", text: "Bancos y brókeres pueden cobrar por suscribir, custodiar, amortizar o vender." },
      { label: "Custodia", text: "Algunas entidades cobran por mantener los valores depositados." },
      { label: "Diferencial de precio", text: "En el mercado secundario existe una diferencia entre precio de compra y de venta." },
      { label: "Fiscalidad", text: "Los rendimientos tributan. Consulta la normativa vigente o a un asesor fiscal." },
    ],
    routes: [
      { label: "Compra directa al Tesoro", text: "A través de los procedimientos oficiales del Tesoro Público y el Banco de España." },
      { label: "Bancos", text: "Entidades que tramitan la suscripción en subasta o la compra en mercado." },
      { label: "Brókeres", text: "Algunos permiten operar deuda pública en mercado secundario." },
    ],
    guides: ["donde-comprar-letras-del-tesoro", "bonos-vs-etf-renta-fija"],
    sources: [officialSources.tesoro, officialSources.cnmv],
  },
  {
    slug: "etf-renta-fija",
    name: "ETF de renta fija",
    short: "Fondos cotizados que invierten en una cesta de bonos.",
    cta: "Descubrir ETF de bonos",
    bullets: [
      "Qué es un ETF de bonos",
      "Diferencias entre bonos individuales y ETF",
      "Duración, tipos, TER, spreads y riesgos",
      "Plataformas que permiten comprarlos",
    ],
    intro:
      "Un ETF de renta fija es un fondo que cotiza en bolsa y replica un índice de bonos. Con una sola compra accedes a muchos bonos distintos.",
    explanation: [
      "A diferencia de un bono individual, la mayoría de ETF de bonos no tienen fecha de vencimiento: el fondo vende los bonos próximos a vencer y compra otros nuevos para mantener su perfil.",
      "Por eso no hay un importe garantizado que recuperes en una fecha concreta. El valor del ETF fluctúa cada día según el precio de los bonos que contiene.",
      "Existen también ETF con vencimiento definido, que se comportan de forma más parecida a un bono individual.",
    ],
    characteristics: [
      { label: "Diversificación", text: "Exposición a decenas o cientos de emisiones en un solo producto." },
      { label: "Duración", text: "Indica cuánto se mueve el precio ante cambios en los tipos de interés." },
      { label: "Distribución", text: "Puede repartir los cupones (distribución) o reinvertirlos (acumulación)." },
      { label: "Cotización", text: "Se compra y se vende en bolsa durante la sesión, como una acción." },
    ],
    risks: [
      { label: "Tipos de interés", text: "A mayor duración, mayor sensibilidad del precio a los cambios de tipos." },
      { label: "Crédito", text: "Depende de la calidad de los emisores incluidos (gobiernos, empresas, alto rendimiento)." },
      { label: "Divisa", text: "Si los bonos están en otra moneda y el ETF no está cubierto, el tipo de cambio afecta al resultado." },
      { label: "Sin vencimiento", text: "No hay garantía de recuperar el importe invertido en una fecha concreta." },
    ],
    costs: [
      { label: "TER", text: "Gastos corrientes anuales del fondo, descontados de su valor." },
      { label: "Comisión de compraventa", text: "La cobra el bróker cada vez que operas." },
      { label: "Spread", text: "Diferencia entre precio de compra y de venta. Varía según el mercado." },
      { label: "Cambio de divisa", text: "Si compras en otra moneda, el bróker puede aplicar un coste de conversión." },
    ],
    routes: [
      { label: "Brókeres online", text: "La vía más habitual para comprar ETF en bolsa." },
      { label: "Bancos con servicio de valores", text: "Algunos permiten operar ETF, a menudo con costes distintos." },
    ],
    guides: ["bonos-vs-etf-renta-fija", "comparar-brokers-costes-etf"],
    sources: [officialSources.cnmv],
  },
  {
    slug: "etf-acciones",
    name: "ETF de acciones",
    short: "Fondos cotizados que replican índices de bolsa.",
    cta: "Explorar ETF de acciones",
    bullets: [
      "Qué es un ETF de renta variable",
      "Índices y diversificación",
      "TER, costes de transacción y divisa",
      "Dónde acceder a ellos",
    ],
    intro:
      "Un ETF de acciones replica un índice bursátil —por ejemplo, un índice mundial o europeo— y te permite invertir en muchas empresas a la vez.",
    explanation: [
      "Al comprar una participación del ETF, posees indirectamente una pequeña parte de todas las empresas del índice que replica.",
      "Su valor sube y baja con el mercado. La renta variable puede tener caídas importantes y prolongadas; está pensada habitualmente para horizontes largos.",
      "Antes de comprar conviene entender qué índice replica, en qué divisa cotiza, si reparte dividendos y cuánto cuesta mantenerlo.",
    ],
    characteristics: [
      { label: "Índice", text: "Determina en qué empresas, países y sectores inviertes." },
      { label: "Réplica", text: "Física (compra las acciones) o sintética (mediante derivados)." },
      { label: "Dividendos", text: "Acumulación (reinvierte) o distribución (reparte)." },
      { label: "Domicilio", text: "El país del fondo puede influir en la fiscalidad y la documentación disponible." },
    ],
    risks: [
      { label: "Riesgo de mercado", text: "El valor puede caer significativamente. Rentabilidades pasadas no garantizan las futuras." },
      { label: "Concentración", text: "Algunos índices dependen mucho de pocos países, sectores o empresas." },
      { label: "Divisa", text: "Las empresas cotizan en distintas monedas; el tipo de cambio afecta al resultado en euros." },
    ],
    costs: [
      { label: "TER", text: "Gastos corrientes anuales del fondo." },
      { label: "Comisión de compraventa", text: "Coste por operación que aplica el bróker." },
      { label: "Spread", text: "Diferencia entre el precio de compra y de venta." },
      { label: "Cambio de divisa", text: "Coste de convertir euros si compras en otra moneda." },
    ],
    routes: [
      { label: "Brókeres online", text: "Acceso a distintas bolsas europeas y, en algunos casos, internacionales." },
      { label: "Bancos", text: "Servicio de valores con condiciones propias." },
    ],
    guides: ["comparar-brokers-costes-etf"],
    sources: [officialSources.cnmv],
  },
  {
    slug: "fondos-y-cuentas",
    name: "Fondos y cuentas",
    short: "Fondos de inversión y cuentas remuneradas.",
    cta: "Ver fondos y cuentas",
    bullets: [
      "Fondos de inversión",
      "Cuentas remuneradas",
      "Condiciones, comisiones y limitaciones",
    ],
    intro:
      "Los fondos de inversión agrupan el dinero de muchos partícipes gestionado por una entidad. Las cuentas remuneradas son depósitos bancarios que pagan un interés.",
    explanation: [
      "Un fondo de inversión no cotiza en bolsa como un ETF: se suscribe y reembolsa al valor liquidativo, normalmente calculado una vez al día.",
      "Una cuenta remunerada es un producto bancario, no una inversión en mercados. Su interés y condiciones las fija la entidad y pueden cambiar.",
      "Los depósitos en entidades adheridas están cubiertos por el Fondo de Garantía de Depósitos hasta los límites legales; consulta las condiciones vigentes en la fuente oficial.",
    ],
    characteristics: [
      { label: "Fondos indexados y activos", text: "Replican un índice o buscan batirlo con gestión activa." },
      { label: "Traspasos", text: "En España, los traspasos entre fondos tienen un tratamiento fiscal específico. Verifica la normativa vigente." },
      { label: "Cuentas", text: "Disponibilidad del dinero, interés (TAE) y condiciones de remuneración." },
    ],
    risks: [
      { label: "Fondos", text: "Su valor depende de los activos en los que invierten; pueden perder valor." },
      { label: "Cuentas", text: "El interés puede ser promocional, limitado a un importe o cambiar con el tiempo." },
      { label: "Inflación", text: "Una remuneración baja puede no compensar la inflación." },
    ],
    costs: [
      { label: "Gastos corrientes", text: "Comisión de gestión y depósito incluidas en los gastos del fondo." },
      { label: "Suscripción y reembolso", text: "Algunos fondos aplican comisiones al entrar o salir." },
      { label: "Condiciones de la cuenta", text: "Mantenimiento, vinculaciones o requisitos de nómina." },
    ],
    routes: [
      { label: "Comercializadoras y plataformas de fondos", text: "Permiten contratar fondos de distintas gestoras." },
      { label: "Bancos", text: "Ofrecen fondos propios y de terceros, y cuentas remuneradas." },
    ],
    guides: ["comparar-brokers-costes-etf"],
    sources: [officialSources.cnmv, officialSources.bde, officialSources.fgd],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
