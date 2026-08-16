import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DeleteButton } from '@/components/admin/delete-button';
import { getSkills } from '@/lib/queries';
import { deleteSkill } from './actions';

export default async function AdminSkillsPage() {
  const skills = await getSkills();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-text">Skills</h1>
        <Button asChild>
          <Link href="/admin/skills/new">New skill</Link>
        </Button>
      </div>

      <div className="mt-6 divide-y divide-border rounded-lg border border-border bg-surface">
        {skills.length === 0 && (
          <p className="p-6 text-sm text-muted">No skills yet — add the first one above.</p>
        )}
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-text">
                {skill.name} {skill.featured && <span className="text-signal">★</span>}
              </p>
              <Badge className="mt-1">{skill.level.replace('_', ' ')}</Badge>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="secondary" size="sm">
                <Link href={`/admin/skills/${skill.id}/edit`}>Edit</Link>
              </Button>
              <DeleteButton action={deleteSkill.bind(null, skill.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
