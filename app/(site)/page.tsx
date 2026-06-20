import { AboutPreview } from "@/components/sections/AboutPreview";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { getActiveServices, getCapabilities, getFeaturedProjects, getProfile } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  path: "/",
  title: "Santie Bernal · Product Builder Web & AI",
  description: "Construyo herramientas web e IA para convertir procesos complejos en sistemas simples, medibles y accionables."
});

export default async function HomePage() {
  const [profile, capabilities, projects, services] = await Promise.all([
    getProfile(),
    getCapabilities(),
    getFeaturedProjects(),
    getActiveServices()
  ]);

  return (
    <>
      <Hero profile={profile} capabilities={capabilities} />
      <FeaturedProjects projects={projects} />
      <ServicesPreview services={services} profile={profile} />
      <Process />
      <AboutPreview profile={profile} />
      <FinalCTA profile={profile} />
    </>
  );
}
