import type { MetadataRoute } from "next";
import { getActiveServices, getPublishedProjects } from "@/lib/data";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, services] = await Promise.all([getPublishedProjects(), getActiveServices()]);

  const staticRoutes = ["", "/proyectos", "/servicios", "/sobre-mi", "/contacto", "/notas"].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7
  }));

  const projectRoutes = projects.map((project) => ({
    url: absoluteUrl(`/proyectos/${project.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: project.isFeatured ? 0.85 : 0.65
  }));

  const serviceRoutes = services.map((service) => ({
    url: absoluteUrl(`/servicios#${service.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.55
  }));

  return [...staticRoutes, ...projectRoutes, ...serviceRoutes];
}
