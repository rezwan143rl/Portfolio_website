import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DeleteButton } from '@/components/admin/delete-button';
import { getAchievements } from '@/lib/queries';
import { deleteAchievement } from './actions';

export default async function AdminAchievementsPage() {
  const achievements = await getAchievements();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-text">Achievements</h1>
        <Button asChild>
          <Link href="/admin/achievements/new">New achievement</Link>
        </Button>
      </div>

      <div className="mt-6 divide-y divide-border rounded-lg border border-border bg-surface">
        {achievements.length === 0 && (
          <p className="p-6 text-sm text-muted">No achievements yet — add the first one above.</p>
        )}
        {achievements.map((a) => (
          <div key={a.id} className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-text">{a.title} {a.featured && <span className="text-signal">★</span>}</p>
              <p className="mt-1 text-xs text-muted">{a.date}</p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="secondary" size="sm">
                <Link href={`/admin/achievements/${a.id}/edit`}>Edit</Link>
              </Button>
              <DeleteButton action={deleteAchievement.bind(null, a.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
