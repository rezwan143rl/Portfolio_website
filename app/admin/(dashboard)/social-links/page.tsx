import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DeleteButton } from '@/components/admin/delete-button';
import { getSocialLinks } from '@/lib/queries';
import { deleteSocialLink } from './actions';

export default async function AdminSocialLinksPage() {
  const links = await getSocialLinks();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-text">Social links</h1>
        <Button asChild>
          <Link href="/admin/social-links/new">New link</Link>
        </Button>
      </div>

      <div className="mt-6 divide-y divide-border rounded-lg border border-border bg-surface">
        {links.length === 0 && (
          <p className="p-6 text-sm text-muted">No social links yet — add GitHub or LinkedIn above.</p>
        )}
        {links.map((link) => (
          <div key={link.id} className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-text">{link.platform}</p>
              <p className="mt-1 text-xs text-muted">{link.url}</p>
              {!link.visible && <Badge className="mt-1">Hidden</Badge>}
            </div>
            <div className="flex gap-2">
              <Button asChild variant="secondary" size="sm">
                <Link href={`/admin/social-links/${link.id}/edit`}>Edit</Link>
              </Button>
              <DeleteButton action={deleteSocialLink.bind(null, link.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
