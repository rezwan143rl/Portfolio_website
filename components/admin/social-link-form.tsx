'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input, Label } from '@/components/ui/form';
import type { SocialLink } from '@/lib/types/database';

export function SocialLinkForm({
  link,
  action,
}: {
  link?: SocialLink;
  action: (formData: FormData) => Promise<{ error?: string } | void>;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(formData) =>
        startTransition(async () => {
          const result = await action(formData);
          if (result?.error) setError(result.error);
        })
      }
      className="max-w-md space-y-6"
    >
      <div>
        <Label htmlFor="platform">Platform</Label>
        <Input id="platform" name="platform" defaultValue={link?.platform} placeholder="GitHub" required />
      </div>
      <div>
        <Label htmlFor="url">URL</Label>
        <Input id="url" name="url" type="url" defaultValue={link?.url} placeholder="https://github.com/..." required />
      </div>
      <div className="flex items-center gap-2">
        <input id="visible" name="visible" type="checkbox" defaultChecked={link?.visible ?? true} className="h-4 w-4 rounded border-border" />
        <Label htmlFor="visible" className="mb-0">Visible in footer</Label>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Saving…' : link ? 'Save changes' : 'Add link'}
      </Button>
    </form>
  );
}
