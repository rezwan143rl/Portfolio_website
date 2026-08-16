import { notFound } from 'next/navigation';
import { AchievementForm } from '@/components/admin/achievement-form';
import { getAchievementById } from '@/lib/queries';
import { updateAchievement } from '../../actions';

export default async function EditAchievementPage({ params }: { params: { id: string } }) {
  const achievement = await getAchievementById(params.id);
  if (!achievement) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl text-text">Edit achievement</h1>
      <div className="mt-6">
        <AchievementForm achievement={achievement} action={updateAchievement.bind(null, achievement.id)} />
      </div>
    </div>
  );
}
