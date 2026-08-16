'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { uploadToMediaBucket } from '@/lib/storage';

export function FileUpload({
  accept,
  onUploaded,
  label = 'Upload file',
}: {
  accept?: string;
  onUploaded: (result: { url: string; path: string }) => void | Promise<void>;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    const result = await uploadToMediaBucket(file);
    setIsUploading(false);

    if ('error' in result) {
      setError(result.error);
      return;
    }
    await onUploaded(result);
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
        id="file-upload-input"
      />
      <Button
        type="button"
        variant="secondary"
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
      >
        {isUploading ? 'Uploading…' : label}
      </Button>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}
