import { notFound } from 'next/navigation';
import { CertificationForm } from '@/components/admin/certification-form';
import { getCertificationById } from '@/lib/queries';
import { updateCertification } from '../../actions';

export default async function EditCertificationPage({ params }: { params: { id: string } }) {
  const certification = await getCertificationById(params.id);
  if (!certification) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl text-text">Edit certification</h1>
      <div className="mt-6">
        <CertificationForm certification={certification} action={updateCertification.bind(null, certification.id)} />
      </div>
    </div>
  );
}
