import { ButtonLink } from "@/components/ui/ButtonLink";

export function FinalCTA() {
  return (
    <section className="container-page py-20">
      <div className="glass-card grid gap-8 overflow-hidden rounded-[2.5rem] p-8 md:p-12 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">Contacto</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
            ¿Tienes una idea, proceso o problema que quieres convertir en una herramienta digital?
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Puedo ayudarte a estructurarlo, diseñar el flujo y construir una primera versión funcional con enfoque de producto.
          </p>
        </div>
        <div className="flex lg:justify-end">
          <ButtonLink href="/contacto">Contáctame</ButtonLink>
        </div>
      </div>
    </section>
  );
}
