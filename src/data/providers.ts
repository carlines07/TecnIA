import type { ProductSlug, Source, VerifiedFact } from "./types";

/**
 * IMPORTANT: Providers below are DEMO entries with fictitious names.
 * No real fees are published until verified against an official fee schedule.
 * To add a real provider: set isDemo=false and fill every fact with source + verifiedAt.
 */
export interface Provider {
  slug: string;
  name: string;
  type: "Bróker online" | "Banco" | "Plataforma de fondos";
  description: string;
  isDemo: boolean;
  commercialRelationship: boolean;
  products: ProductSlug[];
  facts: {
    letrasBonos: VerifiedFact;
    etf: VerifiedFact;
    custody: VerifiedFact;
    tradingFee: VerifiedFact;
    fxFee: VerifiedFact;
    transferFee: VerifiedFact;
    minimum: VerifiedFact;
    other: VerifiedFact;
  };
  feeSchedule?: Source;
  documentation?: Source;
  lastVerified: string | null;
}

const demo = (value: string): VerifiedFact => ({ value });

export const providers: Provider[] = [
  {
    slug: "demo-broker-alfa",
    name: "Bróker Alfa (demo)",
    type: "Bróker online",
    description: "Perfil ilustrativo de un bróker online con acceso a ETF de varias bolsas europeas.",
    isDemo: true,
    commercialRelationship: false,
    products: ["etf-acciones", "etf-renta-fija"],
    facts: {
      letrasBonos: demo("No"),
      etf: demo("Sí, varias bolsas"),
      custody: demo("Sin coste (ejemplo)"),
      tradingFee: demo("1,00 € por orden (ejemplo)"),
      fxFee: demo("0,25 % (ejemplo)"),
      transferFee: demo("Sin coste (ejemplo)"),
      minimum: demo("Sin mínimo (ejemplo)"),
      other: demo("Tarifa por bolsa distinta"),
    },
    lastVerified: null,
  },
  {
    slug: "demo-banco-beta",
    name: "Banco Beta (demo)",
    type: "Banco",
    description: "Perfil ilustrativo de un banco tradicional con servicio de valores y suscripción de deuda pública.",
    isDemo: true,
    commercialRelationship: false,
    products: ["letras-y-bonos", "etf-acciones", "fondos-y-cuentas"],
    facts: {
      letrasBonos: demo("Sí, subasta y mercado"),
      etf: demo("Sí, bolsa española"),
      custody: demo("0,20 % anual (ejemplo)"),
      tradingFee: demo("0,25 %, mín. 8 € (ejemplo)"),
      fxFee: demo("0,50 % (ejemplo)"),
      transferFee: demo("Por título (ejemplo)"),
      minimum: demo("Sin mínimo (ejemplo)"),
      other: demo("Cuenta asociada obligatoria"),
    },
    lastVerified: null,
  },
  {
    slug: "demo-plataforma-gamma",
    name: "Plataforma Gamma (demo)",
    type: "Plataforma de fondos",
    description: "Perfil ilustrativo de una plataforma de fondos indexados y cuenta remunerada.",
    isDemo: true,
    commercialRelationship: true,
    products: ["fondos-y-cuentas", "etf-renta-fija"],
    facts: {
      letrasBonos: demo("No"),
      etf: demo("Selección limitada"),
      custody: demo("Incluida (ejemplo)"),
      tradingFee: demo("Sin comisión en fondos (ejemplo)"),
      fxFee: demo("No aplica"),
      transferFee: demo("Sin coste (ejemplo)"),
      minimum: demo("10 € (ejemplo)"),
      other: demo("Gastos corrientes del fondo aparte"),
    },
    lastVerified: null,
  },
];

export const getProvider = (slug: string) => providers.find((p) => p.slug === slug);

export const factLabels: Record<keyof Provider["facts"], string> = {
  letrasBonos: "Acceso a Letras y bonos",
  etf: "Acceso a ETF",
  custody: "Custodia",
  tradingFee: "Comisión de compraventa",
  fxFee: "Cambio de divisa",
  transferFee: "Traspasos y retiradas",
  minimum: "Mínimos",
  other: "Otras condiciones",
};
