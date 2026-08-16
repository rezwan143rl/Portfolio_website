import { CertificationForm } from '@/components/admin/certification-form';
import { createCertification } from '../actions';

export default function NewCertificationPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-text">New certification</h1>
      <div className="mt-6">
        <CertificationForm action={createCertification} />
      </div>
    </div>
  );
}
