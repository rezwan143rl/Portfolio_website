'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input, Textarea, Label } from '@/components/ui/form';
import type { JourneyEntry } from '@/lib/types/database';

export function JourneyForm({
  entry,
  action,
}: {
  entry?: JourneyEntry;
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
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="year">Year</Label>
          <Input id="year" name="year" defaultValue={entry?.year} required />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input id="category" name="category" defaultValue={entry?.category ?? ''} />
        </div>
      </div>

      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={entry?.title} required />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={entry?.description ?? ''} />
      </div>

      <div>
        <Label htmlFor="image_url">Image URL</Label>
        <Input id="image_url" name="image_url" type="url" defaultValue={entry?.image_url ?? ''} />
      </div>

      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <input id="featured" name="featured" type="checkbox" defaultChecked={entry?.featured} className="h-4 w-4 rounded border-border" />
          <Label htmlFor="featured" className="mb-0">Featured</Label>
        </div>
        <div className="flex items-center gap-2">
          <input id="visible" name="visible" type="checkbox" defaultChecked={entry?.visible ?? true} className="h-4 w-4 rounded border-border" />
          <Label htmlFor="visible" className="mb-0">Visible on site</Label>
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Saving…' : entry ? 'Save changes' : 'Create entry'}
      </Button>
    </form>
  );
}
