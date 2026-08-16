import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DeleteButton } from '@/components/admin/delete-button';
import { getCertifications } from '@/lib/queries';
import { deleteCertification } from './actions';

export default async function AdminCertificationsPage() {
  const certifications = await getCertifications();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-text">Certifications</h1>
        <Button asChild>
          <Link href="/admin/certifications/new">New certification</Link>
        </Button>
      </div>

      <div className="mt-6 divide-y divide-border rounded-lg border border-border bg-surface">
        {certifications.length === 0 && (
          <p className="p-6 text-sm text-muted">No certifications yet — add the first one above.</p>
        )}
        {certifications.map((c) => (
          <div key={c.id} className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-text">{c.name}</p>
              <p className="mt-1 text-xs text-muted">{c.issuing_org} · {c.date}</p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="secondary" size="sm">
                <Link href={`/admin/certifications/${c.id}/edit`}>Edit</Link>
              </Button>
              <DeleteButton action={deleteCertification.bind(null, c.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
