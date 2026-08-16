'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input, Textarea, Label } from '@/components/ui/form';
import type { Skill } from '@/lib/types/database';

const levels = ['learning', 'familiar', 'working_knowledge', 'advanced', 'building_with_it'] as const;

export function SkillForm({
  skill,
  action,
}: {
  skill?: Skill;
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
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={skill?.name} required />
      </div>

      <div>
        <Label htmlFor="level">Level</Label>
        <select
          id="level"
          name="level"
          defaultValue={skill?.level ?? 'learning'}
          className="flex h-10 w-full rounded-md border border-border bg-surface px-3 text-sm text-text"
        >
          {levels.map((l) => (
            <option key={l} value={l}>
              {l.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={skill?.description ?? ''} />
      </div>

      <div>
        <Label htmlFor="icon_url">Icon URL</Label>
        <Input id="icon_url" name="icon_url" type="url" defaultValue={skill?.icon_url ?? ''} />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="featured"
          name="featured"
          type="checkbox"
          defaultChecked={skill?.featured}
          className="h-4 w-4 rounded border-border"
        />
        <Label htmlFor="featured" className="mb-0">
          Featured
        </Label>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Saving…' : skill ? 'Save changes' : 'Create skill'}
      </Button>
    </form>
  );
}
