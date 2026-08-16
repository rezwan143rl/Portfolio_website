import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DeleteButton } from '@/components/admin/delete-button';
import { getAllJourneyEntries } from '@/lib/queries';
import { deleteJourneyEntry } from './actions';

export default async function AdminJourneyPage() {
  const entries = await getAllJourneyEntries();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-text">Journey</h1>
        <Button asChild>
          <Link href="/admin/journey/new">New entry</Link>
        </Button>
      </div>

      <div className="mt-6 divide-y divide-border rounded-lg border border-border bg-surface">
        {entries.length === 0 && (
          <p className="p-6 text-sm text-muted">No journey entries yet — add the first one above.</p>
        )}
        {entries.map((entry) => (
          <div key={entry.id} className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-text">
                {entry.year} — {entry.title} {entry.featured && <span className="text-signal">★</span>}
              </p>
              {!entry.visible && <Badge className="mt-1">Hidden</Badge>}
            </div>
            <div className="flex gap-2">
              <Button asChild variant="secondary" size="sm">
                <Link href={`/admin/journey/${entry.id}/edit`}>Edit</Link>
              </Button>
              <DeleteButton action={deleteJourneyEntry.bind(null, entry.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
