"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProjectDeleteButton } from "@/components/admin/ProjectActions";
import type { Project } from "@/types";

export function ProjectsAdminClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data.projects || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <AdminPageHeader title="Proyectos" description="Crea, edita, publica, despublica y cambia qué proyectos aparecen como destacados en la home." actionHref="/admin/proyectos/nuevo" actionLabel="Nuevo proyecto" />
      {loading ? <div className="glass-card rounded-3xl p-8 text-slate-300">Cargando proyectos...</div> : (
        <div className="space-y-3">
          {projects.map((project) => (
            <article key={project.id} className="glass-card rounded-3xl p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-200">{project.category}</span>
                    <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-200">{project.status}</span>
                    {project.isPublished ? <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200">Publicado</span> : <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-200">Borrador</span>}
                    {project.isFeatured ? <span className="rounded-full bg-violet-400/10 px-3 py-1 text-xs font-bold text-violet-200">Destacado #{project.featuredOrder}</span> : null}
                  </div>
                  <h2 className="mt-3 text-xl font-black text-white">{project.title}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{project.shortDescription}</p>
                  <p className="mt-2 text-xs text-slate-500">/{project.slug}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href={`/proyectos/${project.slug}`} className="rounded-xl border border-white/10 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-white/10">Ver</Link>
                  <Link href={`/admin/proyectos/${project.id}/editar`} className="rounded-xl bg-cyan-300 px-3 py-2 text-xs font-black text-slate-950 hover:bg-cyan-200">Editar</Link>
                  <ProjectDeleteButton id={project.id} title={project.title} />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
