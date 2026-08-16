import { SocialLinkForm } from '@/components/admin/social-link-form';
import { createSocialLink } from '../actions';

export default function NewSocialLinkPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-text">New social link</h1>
      <div className="mt-6">
        <SocialLinkForm action={createSocialLink} />
      </div>
    </div>
  );
}
