import { mapProject, mapService, type DbProject, type DbService } from "@/lib/admin-mappers";
import { adminSupabaseRest } from "@/lib/admin-supabase";
import type { ContactMessage, Profile, Project, Service } from "@/types";

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
  name: string;
  category: string;
  level: Profile["skills"][number]["level"];
  sort_order: number;
};

type DbEducation = {
  title: string;
  provider: string;
  description: string;
  category: string;
  sort_order: number;
};

type DbContactMessage = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  opportunity_type: string;
  budget: string | null;
  link: string | null;
  message: string;
  status: ContactMessage["status"];
  created_at: string;
};

export async function getAdminProjects(): Promise<Project[]> {
  const data = await adminSupabaseRest<DbProject[]>("projects", {
    query: "select=*&order=is_featured.desc&order=featured_order.asc.nullslast&order=title.asc"
  });
  return data.map(mapProject);
}

export async function getAdminProject(id: string): Promise<Project | null> {
  const data = await adminSupabaseRest<DbProject[]>("projects", {
    query: `select=*&id=eq.${encodeURIComponent(id)}&limit=1`
  });
  return data[0] ? mapProject(data[0]) : null;
}

export async function getAdminServices(): Promise<Service[]> {
  const data = await adminSupabaseRest<DbService[]>("services", {
    query: "select=*&order=sort_order.asc&order=title.asc"
  });
  return data.map(mapService);
}

export async function getAdminService(id: string): Promise<Service | null> {
  const data = await adminSupabaseRest<DbService[]>("services", {
    query: `select=*&id=eq.${encodeURIComponent(id)}&limit=1`
  });
  return data[0] ? mapService(data[0]) : null;
}

export async function getAdminProfile(): Promise<Profile> {
  const [profiles, skills, education] = await Promise.all([
    adminSupabaseRest<DbProfile[]>("profile", { query: "select=*&id=eq.main&limit=1" }),
    adminSupabaseRest<DbSkill[]>("skills", { query: "select=*&order=sort_order.asc" }),
    adminSupabaseRest<DbEducation[]>("education_items", { query: "select=*&order=sort_order.asc" })
  ]);

  const profile = profiles[0];
  if (!profile) {
    throw new Error("Profile row with id=main does not exist. Run supabase/seed.sql first.");
  }

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
    education: education.map((item) => ({ title: item.title, provider: item.provider, description: item.description, category: item.category }))
  };
}

export async function getAdminMessages(): Promise<ContactMessage[]> {
  const data = await adminSupabaseRest<DbContactMessage[]>("contact_messages", {
    query: "select=*&order=created_at.desc"
  });

  return data.map((message) => ({
    id: message.id,
    name: message.name,
    email: message.email,
    company: message.company || undefined,
    opportunityType: message.opportunity_type,
    budget: message.budget || undefined,
    link: message.link || undefined,
    message: message.message,
    status: message.status,
    createdAt: message.created_at
  }));
}
