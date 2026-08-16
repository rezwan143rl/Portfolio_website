'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const schema = z.object({
  hero_headline: z.string().min(1, 'Hero headline is required'),
  hero_subline: z.string().min(1, 'Hero subline is required'),
  currently_text: z.string().min(1, 'Currently text is required'),
});

export async function updateHomepageContent(formData: FormData) {
  const parsed = schema.safeParse({
    hero_headline: formData.get('hero_headline'),
    hero_subline: formData.get('hero_subline'),
    currently_text: formData.get('currently_text'),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid form data.' };

  const supabase = createClient();
  // site_settings is a singleton — id is always 1, so this always updates
  // the one existing row rather than creating a new one.
  const { error } = await supabase.from('site_settings').update(parsed.data).eq('id', 1);
  if (error) return { error: error.message };

  revalidatePath('/');
  revalidatePath('/admin/homepage');
  return { success: true };
}
