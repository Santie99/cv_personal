import { capabilities as fallbackCapabilities, profile as fallbackProfile, projects as fallbackProjects, services as fallbackServices } from "@/lib/mock-data";
import { isSupabaseConfigured, supabaseRest } from "@/lib/supabase-rest";
import type { Profile, Project, Service } from "@/types";

type DbProfile = {
  id: string;
  name: string;
  headline: string;
  short_bio: string;
  long_bio: string;
  profile_image_url: string;
  location: string;
  email: string;
  github_url: string;
  linkedin_url: string;
  x_url: string;
  whatsapp_url: string;
};

type DbSkill = {
  id: string;
  name: string;
  category: string;
  level: Profile["skills"][number]["level"];
  sort_order: number;
  is_active: boolean;
};

type DbEducationItem = {
  id: string;
  title: string;
  provider: string;
  description: string;
  category: string;
  sort_order: number;
  is_active: boolean;
};

type DbProject = {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  long_description: string;
  problem: string;
  solution: string;
  target_user: string;
  category: string;
  status: Project["status"];
  tags: string[] | null;
  stack: string[] | null;
  features: string[] | null;
  product_decisions: string[] | null;
  technical_challenges: string[] | null;
  learnings: string[] | null;
  potential: string[] | null;
  demo_url: string | null;
  github_url: string | null;
  video_url: string | null;
  cover_image_url: string;
  og_image_url: string | null;
  seo_title: string;
  seo_description: string;
  is_published: boolean;
  is_featured: boolean;
  featured_order: number;
  highlight_level: Project["highlightLevel"];
};

type DbService = {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  ideal_client: string;
  problem: string;
  deliverables: string[] | null;
  scope: string[] | null;
  exclusions: string[] | null;
  price_from: string;
  price_note: string;
  cta_text: string;
  is_active: boolean;
  sort_order: number;
};

type DbSiteSetting = {
  key: string;
  value: unknown;
};

const withFallback = async <T>(request: () => Promise<T>, fallback: T): Promise<T> => {
  if (!isSupabaseConfigured()) return fallback;

  try {
    return await request();
  } catch (error) {
    console.warn("[data] Supabase unavailable. Using local mock data.", error);
    return fallback;
  }
};

const sortProjectsForPortfolio = (projects: Project[]) =>
  [...projects].sort((a, b) => {
    if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;

    const orderA = Number.isFinite(a.featuredOrder) ? a.featuredOrder : 9999;
    const orderB = Number.isFinite(b.featuredOrder) ? b.featuredOrder : 9999;

    if (orderA !== orderB) return orderA - orderB;
    return a.title.localeCompare(b.title, "es");
  });

const mapProject = (project: DbProject): Project => ({
  id: project.id,
  title: project.title,
  slug: project.slug,
  shortDescription: project.short_description,
  longDescription: project.long_description,
  problem: project.problem,
  solution: project.solution,
  targetUser: project.target_user,
  category: project.category,
  status: project.status,
  tags: project.tags || [],
  stack: project.stack || [],
  features: project.features || [],
  productDecisions: project.product_decisions || [],
  technicalChallenges: project.technical_challenges || [],
  learnings: project.learnings || [],
  potential: project.potential || [],
  demoUrl: project.demo_url || undefined,
  githubUrl: project.github_url || undefined,
  videoUrl: project.video_url || undefined,
  coverImageUrl: project.cover_image_url,
  ogImageUrl: project.og_image_url || undefined,
  seoTitle: project.seo_title,
  seoDescription: project.seo_description,
  isPublished: project.is_published,
  isFeatured: project.is_featured,
  featuredOrder: project.featured_order,
  highlightLevel: project.highlight_level
});

const mapService = (service: DbService): Service => ({
  id: service.id,
  title: service.title,
  slug: service.slug,
  shortDescription: service.short_description,
  idealClient: service.ideal_client,
  problem: service.problem,
  deliverables: service.deliverables || [],
  scope: service.scope || [],
  exclusions: service.exclusions || [],
  priceFrom: service.price_from,
  priceNote: service.price_note,
  ctaText: service.cta_text,
  isActive: service.is_active,
  sortOrder: service.sort_order
});

export async function getProfile(): Promise<Profile> {
  return withFallback(async () => {
    const [profiles, skills, education] = await Promise.all([
      supabaseRest<DbProfile[]>("profile", { query: "id=eq.main&limit=1" }),
      supabaseRest<DbSkill[]>("skills", { query: "is_active=eq.true&order=sort_order.asc" }),
      supabaseRest<DbEducationItem[]>("education_items", { query: "is_active=eq.true&order=sort_order.asc" })
    ]);

    const profile = profiles[0];
    if (!profile) return fallbackProfile;

    return {
      name: profile.name,
      headline: profile.headline,
      shortBio: profile.short_bio,
      longBio: profile.long_bio,
      profileImageUrl: profile.profile_image_url,
      location: profile.location,
      email: profile.email,
      githubUrl: profile.github_url,
      linkedinUrl: profile.linkedin_url,
      xUrl: profile.x_url,
      whatsappUrl: profile.whatsapp_url,
      skills: skills.map((skill) => ({ name: skill.name, category: skill.category, level: skill.level })),
      education: education.map((item) => ({
        title: item.title,
        provider: item.provider,
        description: item.description,
        category: item.category
      }))
    };
  }, fallbackProfile);
}

export async function getPublishedProjects(): Promise<Project[]> {
  return withFallback(async () => {
    const data = await supabaseRest<DbProject[]>("projects", {
      query: "is_published=eq.true&order=is_featured.desc&order=featured_order.asc.nullslast&order=title.asc"
    });

    return sortProjectsForPortfolio(data.map(mapProject));
  }, sortProjectsForPortfolio(fallbackProjects.filter((project) => project.isPublished)));
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return withFallback(async () => {
    const data = await supabaseRest<DbProject[]>("projects", {
      query: "is_published=eq.true&is_featured=eq.true&order=featured_order.asc.nullslast&order=title.asc"
    });

    return sortProjectsForPortfolio(data.map(mapProject));
  }, sortProjectsForPortfolio(fallbackProjects.filter((project) => project.isPublished && project.isFeatured)));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return withFallback(async () => {
    const data = await supabaseRest<DbProject[]>("projects", {
      query: `slug=eq.${encodeURIComponent(slug)}&is_published=eq.true&limit=1`
    });

    return data[0] ? mapProject(data[0]) : null;
  }, fallbackProjects.find((project) => project.slug === slug && project.isPublished) || null);
}

export async function getActiveServices(): Promise<Service[]> {
  return withFallback(async () => {
    const data = await supabaseRest<DbService[]>("services", {
      query: "is_active=eq.true&order=sort_order.asc"
    });

    return data.map(mapService);
  }, fallbackServices.filter((service) => service.isActive).sort((a, b) => a.sortOrder - b.sortOrder));
}

export async function getCapabilities(): Promise<string[]> {
  return withFallback(async () => {
    const data = await supabaseRest<DbSiteSetting[]>("site_settings", {
      query: "key=eq.capabilities&limit=1"
    });

    const capabilities = data[0]?.value;
    return Array.isArray(capabilities) && capabilities.every((item) => typeof item === "string")
      ? capabilities
      : fallbackCapabilities;
  }, fallbackCapabilities);
}
