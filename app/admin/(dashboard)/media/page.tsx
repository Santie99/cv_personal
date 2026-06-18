import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const dynamic = "force-dynamic";

export default function AdminMediaPage() {
  return (
    <>
      <AdminPageHeader title="Media" description="Sección preparada para gestión de imágenes. En este sprint las imágenes se administran usando rutas públicas como /profile/santie-profile.jpeg o /projects/funded-os.svg." />
      <div className="glass-card rounded-3xl p-6 text-sm leading-7 text-slate-300">
        Para cambiar imágenes ahora, sube los archivos a <code className="rounded bg-white/10 px-1">public/profile</code> o <code className="rounded bg-white/10 px-1">public/projects</code> y pega la ruta en proyectos o perfil desde el admin.
      </div>
    </>
  );
}
