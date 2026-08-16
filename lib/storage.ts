import { createClient } from '@/lib/supabase/client';

export async function uploadToMediaBucket(file: File): Promise<{ url: string; path: string } | { error: string }> {
  const supabase = createClient();
  const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

  const { error } = await supabase.storage.from('media').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) return { error: error.message };

  const { data } = supabase.storage.from('media').getPublicUrl(path);
  return { url: data.publicUrl, path };
}

export async function deleteFromMediaBucket(path: string) {
  const supabase = createClient();
  await supabase.storage.from('media').remove([path]);
}
