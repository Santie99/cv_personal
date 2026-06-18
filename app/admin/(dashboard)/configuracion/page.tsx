import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getAdminEmails, getSupabaseServiceRoleKey } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default function AdminConfigPage() {
  return (
    <>
      <AdminPageHeader title="Configuración" description="Estado de configuración del panel privado." />
      <div className="glass-card rounded-3xl p-6 text-sm leading-7 text-slate-300">
        <p><strong className="text-white">Correos admin permitidos:</strong> {getAdminEmails().join(", ") || "No configurado"}</p>
        <p><strong className="text-white">Service Role Key:</strong> {getSupabaseServiceRoleKey() ? "Configurada" : "No configurada. El admin intentará usar RLS con el usuario autenticado."}</p>
        <p className="mt-4 text-slate-400">No muestres ni publiques nunca la Service Role Key. Debe quedarse solo en <code className="rounded bg-white/10 px-1">.env.local</code> y variables privadas de Vercel.</p>
      </div>
    </>
  );
}
