'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input, Textarea, Label } from '@/components/ui/form';
import type { RoadmapItem } from '@/lib/types/database';

const stages = ['now', 'next', 'future'] as const;

export function RoadmapForm({
  item,
  action,
}: {
  item?: RoadmapItem;
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
        <Input id="title" name="title" defaultValue={item?.title} required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="stage">Stage</Label>
          <select
            id="stage"
            name="stage"
            defaultValue={item?.stage ?? 'now'}
            className="flex h-10 w-full rounded-md border border-border bg-surface px-3 text-sm text-text"
          >
            {stages.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="priority">Priority</Label>
          <Input id="priority" name="priority" type="number" defaultValue={item?.priority ?? ''} />
        </div>
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Input id="category" name="category" defaultValue={item?.category ?? ''} />
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <Input id="status" name="status" defaultValue={item?.status ?? ''} placeholder="e.g. exploring, in progress" />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={item?.description ?? ''} />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Saving…' : item ? 'Save changes' : 'Create roadmap item'}
      </Button>
    </form>
  );
}
