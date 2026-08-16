import { HomepageForm } from '@/components/admin/homepage-form';
import { getSiteSettings } from '@/lib/queries';

export default async function AdminHomepagePage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="font-display text-2xl text-text">Homepage content</h1>
      <p className="mt-1 text-sm text-muted">
        Edits the hero and &quot;Currently&quot; text shown on the public homepage.
      </p>
      <div className="mt-6">
        <HomepageForm settings={settings} />
      </div>
    </div>
  );
}
