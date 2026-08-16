import { notFound } from 'next/navigation';
import { SocialLinkForm } from '@/components/admin/social-link-form';
import { getSocialLinkById } from '@/lib/queries';
import { updateSocialLink } from '../../actions';

export default async function EditSocialLinkPage({ params }: { params: { id: string } }) {
  const link = await getSocialLinkById(params.id);
  if (!link) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl text-text">Edit social link</h1>
      <div className="mt-6">
        <SocialLinkForm link={link} action={updateSocialLink.bind(null, link.id)} />
      </div>
    </div>
  );
}
