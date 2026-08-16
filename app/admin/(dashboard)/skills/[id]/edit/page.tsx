import { notFound } from 'next/navigation';
import { SkillForm } from '@/components/admin/skill-form';
import { getSkillById } from '@/lib/queries';
import { updateSkill } from '../../actions';

export default async function EditSkillPage({ params }: { params: { id: string } }) {
  const skill = await getSkillById(params.id);
  if (!skill) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl text-text">Edit skill</h1>
      <div className="mt-6">
        <SkillForm skill={skill} action={updateSkill.bind(null, skill.id)} />
      </div>
    </div>
  );
}
