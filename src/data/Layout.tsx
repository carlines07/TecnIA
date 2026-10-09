import { Link } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useState, type ReactNode } from "react";

const nav = [
  { to: "/productos", label: "Productos financieros" },
  { to: "/comparador", label: "Comparador" },
  { to: "/guias", label: "Guías" },
  { to: "/herramientas", label: "Herramientas" },
] as const;

export function Wordmark() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="TecnIA Finanzas, inicio">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink font-display text-lg text-ink-foreground">T</span>
      <span className="font-display text-xl tracking-tight text-foreground">
        TecnIA <span className="text-primary">Finanzas</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Wordmark />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/buscar" aria-label="Buscar" className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground">
            <Search className="h-4 w-4" />
          </Link>
          <Link to="/productos" className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex">
            Explorar productos
          </Link>
          <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted lg:hidden" onClick={() => setOpen(!open)} aria-label="Menú" aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t bg-background lg:hidden" aria-label="Móvil">
          <div className="container-page flex flex-col py-3">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-3 text-base font-medium">
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

const footerLinks = [
  { slug: "sobre", label: "Sobre TecnIA" },
  { slug: "metodologia", label: "Metodología de comparación" },
  { slug: "fuentes", label: "Fuentes y actualización de datos" },
  { slug: "aviso-legal", label: "Aviso legal" },
  { slug: "privacidad", label: "Política de privacidad" },
  { slug: "cookies", label: "Política de cookies" },
  { slug: "contacto", label: "Contacto" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-ink-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl">TecnIA Finanzas</p>
          <p className="mt-3 max-w-sm text-sm opacity-70">
            Plataforma de educación financiera y descubrimiento de productos. Contenido informativo; no constituye asesoramiento financiero personalizado. TecnIA no es una entidad registrada en la CNMV.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest opacity-60">Explorar</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.to}><Link to={n.to} className="opacity-80 hover:opacity-100">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest opacity-60">TecnIA</p>
          <ul className="mt-4 space-y-2 text-sm">
            {footerLinks.map((l) => (
              <li key={l.slug}><Link to="/info/$slug" params={{ slug: l.slug }} className="opacity-80 hover:opacity-100">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <p className="container-page py-5 text-xs opacity-60">
          © {new Date().getFullYear()} TecnIA Finanzas · tecniaia.com · Invertir conlleva riesgos. Las rentabilidades pasadas no garantizan rentabilidades futuras.
        </p>
      </div>
    </footer>
  );
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="border-b bg-secondary/60">
      <div className="container-page py-14 md:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl leading-tight md:text-5xl">{title}</h1>
        {children && <div className="mt-4 max-w-2xl text-lg text-muted-foreground">{children}</div>}
      </div>
    </section>
  );
}

export function DemoBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-warning px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-warning-foreground">
      Datos de ejemplo
    </span>
  );
}

export function ReviewNote({ children }: { children: ReactNode }) {
  return (
    <div className="my-5 rounded-lg border border-warning-foreground/20 bg-warning px-4 py-3 text-sm text-warning-foreground">
      <strong className="font-bold">Pendiente de revisión editorial · </strong>
      {children}
    </div>
  );
}

export function formatDate(iso: string | null) {
  if (!iso) return "Pendiente de verificación";
  return new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
}
