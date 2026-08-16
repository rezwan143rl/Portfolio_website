'use client';

import { useState } from 'react';
import { FileUpload } from '@/components/admin/file-upload';
import { createMediaRecord, deleteMediaRecord } from '@/app/admin/(dashboard)/media/actions';
import type { Media } from '@/lib/types/database';

export function MediaLibrary({ initialMedia }: { initialMedia: Media[] }) {
  const [media, setMedia] = useState(initialMedia);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function handleUploaded({ url }: { url: string; path: string }) {
    const type = url.match(/\.(png|jpe?g|webp|gif|svg)$/i) ? 'image' : 'file';
    await createMediaRecord(url, type);
    setMedia((prev) => [
      { id: crypto.randomUUID(), url, type, alt_text: null, uploaded_at: new Date().toISOString() },
      ...prev,
    ]);
  }

  function handleCopy(item: Media) {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId((id) => (id === item.id ? null : id)), 1500);
  }

  return (
    <div>
      <FileUpload label="Upload file" onUploaded={handleUploaded} />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {media.length === 0 && (
          <p className="text-sm text-muted">Nothing uploaded yet.</p>
        )}
        {media.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-lg border border-border bg-surface">
            {item.type === 'image' ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.url} alt={item.alt_text ?? ''} className="h-32 w-full object-cover" />
            ) : (
              <div className="flex h-32 w-full items-center justify-center bg-surface2 font-mono text-xs text-muted">
                file
              </div>
            )}
            <div className="p-3">
              <p className="truncate text-xs text-muted">{item.url.split('/').pop()}</p>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(item)}
                  className="rounded-sm border border-border px-2 py-1 font-mono text-xs text-muted hover:text-text"
                >
                  {copiedId === item.id ? 'Copied' : 'Copy URL'}
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    if (!confirm("Delete this file? This can't be undone.")) return;
                    await deleteMediaRecord(item.id, item.url);
                    setMedia((prev) => prev.filter((m) => m.id !== item.id));
                  }}
                  className="rounded-sm border border-red-500/30 px-2 py-1 font-mono text-xs text-red-400 hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
