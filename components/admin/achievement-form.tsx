'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input, Textarea, Label } from '@/components/ui/form';
import type { Achievement } from '@/lib/types/database';

export function AchievementForm({
  achievement,
  action,
}: {
  achievement?: Achievement;
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
      className="max-w-lg space-y-6"
    >
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={achievement?.title} required />
      </div>

      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" name="date" type="date" defaultValue={achievement?.date ?? ''} />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={achievement?.description ?? ''} />
      </div>

      <div>
        <Label htmlFor="image_url">Image URL</Label>
        <Input id="image_url" name="image_url" type="url" defaultValue={achievement?.image_url ?? ''} />
      </div>

      <div>
        <Label htmlFor="link">Link</Label>
        <Input id="link" name="link" type="url" defaultValue={achievement?.link ?? ''} />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="featured"
          name="featured"
          type="checkbox"
          defaultChecked={achievement?.featured}
          className="h-4 w-4 rounded border-border"
        />
        <Label htmlFor="featured" className="mb-0">Featured</Label>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Saving…' : achievement ? 'Save changes' : 'Create achievement'}
      </Button>
    </form>
  );
}
