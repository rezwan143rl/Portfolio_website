import { RoadmapForm } from '@/components/admin/roadmap-form';
import { createRoadmapItem } from '../actions';

export default function NewRoadmapItemPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-text">New roadmap item</h1>
      <div className="mt-6">
        <RoadmapForm action={createRoadmapItem} />
      </div>
    </div>
  );
}
