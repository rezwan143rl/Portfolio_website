'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input, Textarea, Label } from '@/components/ui/form';
import type { Certification } from '@/lib/types/database';

export function CertificationForm({
  certification,
  action,
}: {
  certification?: Certification;
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
        <Input id="name" name="name" defaultValue={certification?.name} required />
      </div>
      <div>
        <Label htmlFor="issuing_org">Issuing organization</Label>
        <Input id="issuing_org" name="issuing_org" defaultValue={certification?.issuing_org} required />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" name="date" type="date" defaultValue={certification?.date ?? ''} />
      </div>
      <div>
        <Label htmlFor="credential_id">Credential ID</Label>
        <Input id="credential_id" name="credential_id" defaultValue={certification?.credential_id ?? ''} />
      </div>
      <div>
        <Label htmlFor="credential_url">Credential URL</Label>
        <Input id="credential_url" name="credential_url" type="url" defaultValue={certification?.credential_url ?? ''} />
      </div>
      <div>
        <Label htmlFor="image_url">Certificate image URL</Label>
        <Input id="image_url" name="image_url" type="url" defaultValue={certification?.image_url ?? ''} />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={certification?.description ?? ''} />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Saving…' : certification ? 'Save changes' : 'Create certification'}
      </Button>
    </form>
  );
}
