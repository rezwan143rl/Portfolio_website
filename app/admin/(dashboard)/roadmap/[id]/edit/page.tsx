import { notFound } from 'next/navigation';
import { RoadmapForm } from '@/components/admin/roadmap-form';
import { getRoadmapItemById } from '@/lib/queries';
import { updateRoadmapItem } from '../../actions';

export default async function EditRoadmapItemPage({ params }: { params: { id: string } }) {
  const item = await getRoadmapItemById(params.id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl text-text">Edit roadmap item</h1>
      <div className="mt-6">
        <RoadmapForm item={item} action={updateRoadmapItem.bind(null, item.id)} />
      </div>
    </div>
  );
}
