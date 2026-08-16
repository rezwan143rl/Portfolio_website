'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea, Label } from '@/components/ui/form';
import type { SiteSettings } from '@/lib/types/database';
import { updateHomepageContent } from '@/app/admin/(dashboard)/homepage/actions';

export function HomepageForm({ settings }: { settings: SiteSettings }) {
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(formData) =>
        startTransition(async () => {
          const result = await updateHomepageContent(formData);
          if (result?.error) setMessage({ type: 'error', text: result.error });
          else setMessage({ type: 'success', text: 'Saved.' });
        })
      }
      className="max-w-lg space-y-6"
    >
      <div>
        <Label htmlFor="hero_headline">Hero headline</Label>
        <Textarea id="hero_headline" name="hero_headline" defaultValue={settings.hero_headline} required />
      </div>
      <div>
        <Label htmlFor="hero_subline">Hero subline</Label>
        <Textarea id="hero_subline" name="hero_subline" defaultValue={settings.hero_subline} required />
      </div>
      <div>
        <Label htmlFor="currently_text">Currently text</Label>
        <Textarea id="currently_text" name="currently_text" defaultValue={settings.currently_text} required />
      </div>

      {message && (
        <p className={message.type === 'error' ? 'text-sm text-red-400' : 'text-sm text-signal'}>
          {message.text}
        </p>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Saving…' : 'Save changes'}
      </Button>
    </form>
  );
}
