import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const dynamic = "force-dynamic";

export default function AdminHomePage() {
  return (
    <>
      <AdminPageHeader title="Home" description="En este sprint queda preparada la sección. La edición completa de hero, capacidades y secciones de home se implementará en el siguiente sprint de polish de admin." />
      <div className="glass-card rounded-3xl p-6 text-sm leading-7 text-slate-300">
        En Sprint 03 ya puedes controlar el contenido más importante de la home mediante proyectos destacados y servicios activos. La edición granular de textos de home se deja preparada para Sprint 04.
      </div>
    </>
  );
}
