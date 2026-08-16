import { JourneyForm } from '@/components/admin/journey-form';
import { createJourneyEntry } from '../actions';

export default function NewJourneyEntryPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-text">New journey entry</h1>
      <div className="mt-6">
        <JourneyForm action={createJourneyEntry} />
      </div>
    </div>
  );
}
