import { getMedia } from '@/lib/queries';
import { MediaLibrary } from '@/components/admin/media-library';

export default async function AdminMediaPage() {
  const media = await getMedia();

  return (
    <div>
      <h1 className="font-display text-2xl text-text">Media</h1>
      <p className="mt-1 text-sm text-muted">
        Upload images and files here, then copy the URL into any image field elsewhere in the dashboard.
      </p>
      <div className="mt-6">
        <MediaLibrary initialMedia={media} />
      </div>
    </div>
  );
}
