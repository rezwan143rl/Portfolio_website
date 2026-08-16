import { getSiteSettings } from '@/lib/queries';
import { ResumeManager } from '@/components/admin/resume-manager';

export default async function AdminResumePage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="font-display text-2xl text-text">Resume</h1>
      <p className="mt-1 text-sm text-muted">
        Uploads go to Supabase Storage; the URL is saved to the existing site settings row.
      </p>
      <div className="mt-6">
        <ResumeManager initialUrl={settings.resume_url} />
      </div>
    </div>
  );
}
