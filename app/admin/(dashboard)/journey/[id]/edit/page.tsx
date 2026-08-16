import { notFound } from 'next/navigation';
import { JourneyForm } from '@/components/admin/journey-form';
import { getJourneyEntryById } from '@/lib/queries';
import { updateJourneyEntry } from '../../actions';

export default async function EditJourneyEntryPage({ params }: { params: { id: string } }) {
  const entry = await getJourneyEntryById(params.id);
  if (!entry) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl text-text">Edit journey entry</h1>
      <div className="mt-6">
        <JourneyForm entry={entry} action={updateJourneyEntry.bind(null, entry.id)} />
      </div>
    </div>
  );
}
