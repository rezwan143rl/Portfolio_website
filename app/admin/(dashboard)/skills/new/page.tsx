import { SkillForm } from '@/components/admin/skill-form';
import { createSkill } from '../actions';

export default function NewSkillPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-text">New skill</h1>
      <div className="mt-6">
        <SkillForm action={createSkill} />
      </div>
    </div>
  );
}
