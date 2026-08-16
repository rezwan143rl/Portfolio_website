import type { Metadata } from 'next';
import { SectionHeading } from '@/components/site/section-heading';
import { Reveal } from '@/components/site/reveal';
import { EmptyState } from '@/components/site/empty-state';
import { getCertifications } from '@/lib/queries';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Certifications' };

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <Reveal><SectionHeading index={1} eyebrow="Verified" title="Certifications" /></Reveal>
      {certifications.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((c) => (
            <div key={c.id} className="rounded-lg border border-border bg-surface p-5">
              <p className="font-display text-base text-text">{c.name}</p>
              <p className="mt-1 text-sm text-muted">{c.issuing_org} · {c.date}</p>
              {c.credential_url && (
                <a href={c.credential_url} target="_blank" rel="noreferrer" className="mt-2 inline-block font-mono text-xs uppercase text-signal hover:underline">
                  View credential →
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="None added yet" body="Certifications will appear here as they're earned." />
      )}
    </div>
  );
}
