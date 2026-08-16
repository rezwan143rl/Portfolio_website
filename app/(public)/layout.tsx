import { Nav } from '@/components/site/nav';
import { Footer } from '@/components/site/footer';
import { getSocialLinks } from '@/lib/queries';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const socialLinks = await getSocialLinks();
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer socialLinks={socialLinks} />
    </>
  );
}
