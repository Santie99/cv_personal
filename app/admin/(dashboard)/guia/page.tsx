import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

const projectSteps = [
  "Crear o editar el proyecto desde /admin/proyectos.",
  "Completar título, slug, categoría, estado, resumen y descripción larga.",
  "Agregar problema, solución, usuario objetivo, funcionalidades, stack, decisiones y aprendizajes.",
  "Revisar SEO title y SEO description antes de publicarlo.",
  "Activar Publicado para que aparezca en /proyectos.",
  "Activar Destacado en home solo si debe competir por los 3 espacios principales.",
  "Asignar Orden destacado: 1 aparece primero, 2 segundo, 3 tercero.",
  "Guardar, revisar /proyectos, revisar la página individual y luego revisar la home."
];

const deploySteps = [
  "Confirmar que npm run typecheck y npm run build pasan localmente.",
  "Subir el proyecto a GitHub sin node_modules, .next ni .env.local.",
  "Importar el repositorio en Vercel.",
  "Configurar variables de entorno de producción en Vercel.",
  "Ejecutar deploy y revisar el dominio temporal de Vercel.",
  "Actualizar NEXT_PUBLIC_SITE_URL con la URL final de producción.",
  "Configurar Site URL y Redirect URLs en Supabase Auth.",
  "Crear o verificar el usuario admin en Supabase Auth.",
  "Entrar a /admin/login en producción y validar CRUD de proyectos."
];

export default function AdminGuidePage() {
  return (
    <>
      <AdminPageHeader
        title="Guía de operación"
        description="Flujo práctico para mantener proyectos, preparar deploy y revisar producción sin tocar código."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <GuideCard title="Actualizar proyectos desde /admin" items={projectSteps} />
        <GuideCard title="Checklist de deploy" items={deploySteps} />
      </div>

      <section className="glass-card mt-6 rounded-3xl p-6">
        <h2 className="text-xl font-black text-white">Reglas rápidas</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Rule title="Publicado" text="Si está activo, el proyecto aparece en /proyectos. Si está inactivo, queda como borrador." />
          <Rule title="Destacado" text="Solo controla si puede aparecer en la home. No basta con destacarlo: también debe estar publicado." />
          <Rule title="Orden destacado" text="La home muestra máximo 3 destacados. Usa 1, 2 y 3 para controlar el orden principal." />
        </div>
      </section>

      <section className="glass-card mt-6 rounded-3xl p-6">
        <h2 className="text-xl font-black text-white">Pruebas después de cada cambio</h2>
        <div className="mt-4 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
          <Link className="rounded-2xl border border-white/10 bg-white/5 p-4 font-bold text-cyan-200 hover:border-cyan-300/50" href="/proyectos">Abrir /proyectos</Link>
          <Link className="rounded-2xl border border-white/10 bg-white/5 p-4 font-bold text-cyan-200 hover:border-cyan-300/50" href="/">Abrir home pública</Link>
          <Link className="rounded-2xl border border-white/10 bg-white/5 p-4 font-bold text-cyan-200 hover:border-cyan-300/50" href="/admin/proyectos">Gestionar proyectos</Link>
          <Link className="rounded-2xl border border-white/10 bg-white/5 p-4 font-bold text-cyan-200 hover:border-cyan-300/50" href="/api/health">Ver health check</Link>
        </div>
      </section>
    </>
  );
}

function GuideCard({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="glass-card rounded-3xl p-6">
      <h2 className="text-xl font-black text-white">{title}</h2>
      <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
        {items.map((item, index) => (
          <li key={item} className="flex gap-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Rule({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <h3 className="font-black text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}
