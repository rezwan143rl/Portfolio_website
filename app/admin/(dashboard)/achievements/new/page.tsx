import { AchievementForm } from '@/components/admin/achievement-form';
import { createAchievement } from '../actions';

export default function NewAchievementPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-text">New achievement</h1>
      <div className="mt-6">
        <AchievementForm action={createAchievement} />
      </div>
    </div>
  );
}
