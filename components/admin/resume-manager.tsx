'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/admin/file-upload';
import { updateResumeUrl } from '@/app/admin/(dashboard)/resume/actions';

export function ResumeManager({ initialUrl }: { initialUrl: string | null }) {
  const [url, setUrl] = useState(initialUrl);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleUploaded({ url: newUrl }: { url: string; path: string }) {
    startTransition(async () => {
      const result = await updateResumeUrl(newUrl);
      if (result?.error) setError(result.error);
      else setUrl(newUrl);
    });
  }

  function handleRemove() {
    if (!confirm('Remove the current resume? The public /resume page will show its empty state until a new one is uploaded.')) {
      return;
    }
    startTransition(async () => {
      const result = await updateResumeUrl(null);
      if (result?.error) setError(result.error);
      else setUrl(null);
    });
  }

  return (
    <div className="max-w-lg space-y-6">
      {url ? (
        <div className="rounded-lg border border-border bg-surface p-4">
          <p className="text-sm text-text">Current resume</p>
          <a href={url} target="_blank" rel="noreferrer" className="mt-1 block truncate text-xs text-signal hover:underline">
            {url}
          </a>
        </div>
      ) : (
        <p className="text-sm text-muted">No resume uploaded yet.</p>
      )}

      <div className="flex flex-wrap gap-3">
        <FileUpload
          accept="application/pdf"
          label={url ? 'Replace resume' : 'Upload resume'}
          onUploaded={handleUploaded}
        />
        {url && (
          <Button type="button" variant="destructive" onClick={handleRemove} disabled={isPending}>
            Remove
          </Button>
        )}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
