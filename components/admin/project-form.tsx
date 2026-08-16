'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input, Textarea, Label } from '@/components/ui/form';
import type { Project, Skill } from '@/lib/types/database';

const statuses = ['planned', 'in_progress', 'completed', 'archived'] as const;

const textFields: { name: keyof Project; label: string }[] = [
  { name: 'full_description', label: 'Full description' },
  { name: 'problem', label: 'Problem' },
  { name: 'solution', label: 'Solution' },
  { name: 'my_role', label: 'My role' },
  { name: 'challenges', label: 'Challenges' },
  { name: 'what_i_learned', label: 'What I learned' },
  { name: 'future_improvements', label: 'Future improvements' },
];

const urlFields: { name: keyof Project; label: string }[] = [
  { name: 'github_url', label: 'GitHub URL' },
  { name: 'live_url', label: 'Live demo URL' },
  { name: 'docs_url', label: 'Docs URL' },
  { name: 'video_url', label: 'Video URL' },
];

export function ProjectForm({
  project,
  allSkills,
  selectedSkillIds = [],
  action,
}: {
  project?: Project;
  allSkills: Skill[];
  selectedSkillIds?: string[];
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
      className="max-w-2xl space-y-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" defaultValue={project?.name} required />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" defaultValue={project?.slug} required />
        </div>
      </div>

      <div>
        <Label htmlFor="short_description">Short description</Label>
        <Textarea
          id="short_description"
          name="short_description"
          defaultValue={project?.short_description}
          maxLength={200}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            defaultValue={project?.status ?? 'planned'}
            className="flex h-10 w-full rounded-md border border-border bg-surface px-3 text-sm text-text"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end gap-2 pb-2">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            defaultChecked={project?.featured}
            className="h-4 w-4 rounded border-border"
          />
          <Label htmlFor="featured" className="mb-0">
            Featured on homepage
          </Label>
        </div>
      </div>

      <div>
        <Label>Technologies</Label>
        {allSkills.length > 0 ? (
          <div className="flex flex-wrap gap-3 rounded-md border border-border bg-surface p-3">
            {allSkills.map((skill) => (
              <label key={skill.id} className="flex items-center gap-1.5 text-sm text-text">
                <input
                  type="checkbox"
                  name="technology_ids"
                  value={skill.id}
                  defaultChecked={selectedSkillIds.includes(skill.id)}
                  className="h-3.5 w-3.5 rounded border-border"
                />
                {skill.name}
              </label>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">
            No skills yet — add some under Skills first, then come back to tag this project.
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {urlFields.map((field) => (
          <div key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              name={field.name}
              type="url"
              defaultValue={(project?.[field.name] as string) ?? ''}
            />
          </div>
        ))}
      </div>

      {textFields.map((field) => (
        <div key={field.name}>
          <Label htmlFor={field.name}>{field.label}</Label>
          <Textarea
            id={field.name}
            name={field.name}
            defaultValue={(project?.[field.name] as string) ?? ''}
          />
        </div>
      ))}

      {error && <p className="text-sm text-red-400">{error}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Saving…' : project ? 'Save changes' : 'Create project'}
      </Button>
    </form>
  );
}
