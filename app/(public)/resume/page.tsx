import type { Metadata } from 'next';
import { SectionHeading } from '@/components/site/section-heading';
import { Reveal } from '@/components/site/reveal';
import { EmptyState } from '@/components/site/empty-state';
import { Button } from '@/components/ui/button';
import { ResumeViewer } from '@/components/site/resume-viewer';
import { getSiteSettings } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Resume',
};

export default async function ResumePage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Reveal>
        <SectionHeading
          index={1}
          eyebrow="Professional profile"
          title="Resume"
        />
      </Reveal>

      {settings.resume_url ? (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a
                href={settings.resume_url}
                target="_blank"
                rel="noreferrer"
              >
                Open Resume
              </a>
            </Button>

            <Button asChild size="lg" variant="outline">
              <a href={settings.resume_url} download>
                Download Resume
              </a>
            </Button>
          </div>

          <ResumeViewer url={settings.resume_url} />
        </div>
      ) : (
        <EmptyState
          title="Not uploaded yet"
          body="A downloadable resume will appear here once it's added from the dashboard."
        />
      )}
    </div>
  );
}