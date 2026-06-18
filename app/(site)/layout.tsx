import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/layout/JsonLd";
import { Navbar } from "@/components/layout/Navbar";
import { getProfile } from "@/lib/data";

export default async function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const profile = await getProfile();

  return (
    <>
      <JsonLd profile={profile} />
      <Navbar profileName={profile.name} />
      <main>{children}</main>
      <Footer profile={profile} />
    </>
  );
}
