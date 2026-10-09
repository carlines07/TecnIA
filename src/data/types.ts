
export type ProductSlug =
  | "letras-y-bonos"
  | "etf-renta-fija"
  | "etf-acciones"
  | "fondos-y-cuentas";

/** A source used to verify a financial fact. */
export interface Source {
  label: string;
  url: string;
}

/** A fact that must carry its own verification metadata.
 * value = null means "pending verification".
 */
export interface VerifiedFact {
  value: string | null;
  source?: Source;
  verifiedAt?: string; // ISO date
}
