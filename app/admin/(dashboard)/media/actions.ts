'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function createMediaRecord(url: string, type: string, altText?: string) {
  const supabase = createClient();
  const { error } = await supabase.from('media').insert({
    url,
    type,
    alt_text: altText ?? null,
  });
  if (error) return { error: error.message };

  revalidatePath('/admin/media');
  return { success: true };
}

export async function deleteMediaRecord(id: string, url: string) {
  const supabase = createClient();

  // The `media` table only stores the public URL, not the storage path, so
  // recover the path from the URL Supabase generates
  // (".../object/public/media/<path>") before removing the file itself.
  const marker = '/object/public/media/';
  const idx = url.indexOf(marker);
  if (idx !== -1) {
    const path = url.slice(idx + marker.length);
    await supabase.storage.from('media').remove([path]);
  }

  await supabase.from('media').delete().eq('id', id);
  revalidatePath('/admin/media');
}
