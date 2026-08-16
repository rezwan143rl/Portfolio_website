'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { socialLinkSchema } from '@/lib/validations/social-link';

function parseForm(formData: FormData) {
  return socialLinkSchema.safeParse({
    platform: formData.get('platform'),
    url: formData.get('url'),
    visible: formData.get('visible') === 'on',
  });
}

export async function createSocialLink(formData: FormData) {
  const parsed = parseForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid form data.' };

  const supabase = createClient();
  const { error } = await supabase.from('social_links').insert(parsed.data);
  if (error) return { error: error.message };

  revalidatePath('/admin/social-links');
  revalidatePath('/', 'layout');
  redirect('/admin/social-links');
}

export async function updateSocialLink(id: string, formData: FormData) {
  const parsed = parseForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid form data.' };

  const supabase = createClient();
  const { error } = await supabase.from('social_links').update(parsed.data).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/social-links');
  revalidatePath('/', 'layout');
  redirect('/admin/social-links');
}

export async function deleteSocialLink(id: string) {
  const supabase = createClient();
  await supabase.from('social_links').delete().eq('id', id);
  revalidatePath('/admin/social-links');
  revalidatePath('/', 'layout');
}
