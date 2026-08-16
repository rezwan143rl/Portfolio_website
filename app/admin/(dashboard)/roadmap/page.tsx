import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DeleteButton } from '@/components/admin/delete-button';
import { getRoadmapItems } from '@/lib/queries';
import { deleteRoadmapItem } from './actions';

const stages = ['now', 'next', 'future'] as const;

export default async function AdminRoadmapPage() {
  const items = await getRoadmapItems();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-text">Roadmap</h1>
        <Button asChild>
          <Link href="/admin/roadmap/new">New roadmap item</Link>
        </Button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {stages.map((stage) => (
          <div key={stage}>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-signal">{stage}</p>
            <div className="divide-y divide-border rounded-lg border border-border bg-surface">
              {items.filter((i) => i.stage === stage).length === 0 && (
                <p className="p-4 text-xs text-muted">Nothing here yet.</p>
              )}
              {items.filter((i) => i.stage === stage).map((item) => (
                <div key={item.id} className="p-4">
                  <p className="text-sm text-text">{item.title}</p>
                  {item.status && <Badge className="mt-1">{item.status}</Badge>}
                  <div className="mt-2 flex gap-2">
                    <Button asChild variant="secondary" size="sm">
                      <Link href={`/admin/roadmap/${item.id}/edit`}>Edit</Link>
                    </Button>
                    <DeleteButton action={deleteRoadmapItem.bind(null, item.id)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
