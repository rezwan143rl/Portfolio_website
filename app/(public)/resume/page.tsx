import type { Metadata } from 'next';
import { SectionHeading } from '@/components/site/section-heading';
import { Reveal } from '@/components/site/reveal';
import { EmptyState } from '@/components/site/empty-state';
import { Button } from '@/components/ui/button';
import { getSiteSettings } from '@/lib/queries';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Resume' };

export default async function ResumePage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Reveal><SectionHeading index={1} eyebrow="Professional profile" title="Resume" /></Reveal>
      {settings.resume_url ? (
        <div className="space-y-6">
          <Button asChild size="lg">
            <a href={settings.resume_url} target="_blank" rel="noreferrer">
              Download resume
            </a>
          </Button>
          <div className="overflow-hidden rounded-lg border border-border">
            <iframe src={settings.resume_url} className="h-[80vh] w-full" title="Resume preview" />
          </div>
        </div>
      ) : (
        <EmptyState title="Not uploaded yet" body="A downloadable resume will appear here once it's added from the dashboard." />
      )}
    </div>
  );
}
