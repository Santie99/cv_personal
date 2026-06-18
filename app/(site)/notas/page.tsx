import { SectionHeader } from "@/components/ui/SectionHeader";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Notas",
  description: "Notas futuras sobre construcción de productos, IA aplicada, desarrollo web y aprendizajes técnicos.",
  path: "/notas",
  keywords: ["build in public", "aprendizajes desarrollo web", "IA aplicada"]
});

export default function NotesPage() {
  return (
    <section className="container-page py-16 md:py-24">
      <SectionHeader
        eyebrow="Notas"
        title="Espacio preparado para contenido y aprendizajes."
        description="Esta sección queda creada como base para una futura fase. Podrá usarse para documentar proyectos, aprendizajes de Platzi, decisiones técnicas y build in public."
      />
      <div className="glass-card mt-10 rounded-[2rem] p-8 text-slate-300">
        Todavía no hay notas publicadas. En una fase posterior esta sección podrá conectarse a Supabase o Markdown.
      </div>
    </section>
  );
}
