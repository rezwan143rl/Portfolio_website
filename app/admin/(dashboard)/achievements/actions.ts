'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { achievementSchema } from '@/lib/validations/achievement';

function parseForm(formData: FormData) {
  return achievementSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description') || undefined,
    date: formData.get('date') || undefined,
    image_url: formData.get('image_url') || '',
    link: formData.get('link') || '',
    featured: formData.get('featured') === 'on',
  });
}

export async function createAchievement(formData: FormData) {
  const parsed = parseForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid form data.' };

  const supabase = createClient();
  const { error } = await supabase.from('achievements').insert(parsed.data);
  if (error) return { error: error.message };

  revalidatePath('/admin/achievements');
  revalidatePath('/achievements');
  revalidatePath('/');
  redirect('/admin/achievements');
}

export async function updateAchievement(id: string, formData: FormData) {
  const parsed = parseForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid form data.' };

  const supabase = createClient();
  const { error } = await supabase.from('achievements').update(parsed.data).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/achievements');
  revalidatePath('/achievements');
  revalidatePath('/');
  redirect('/admin/achievements');
}

export async function deleteAchievement(id: string) {
  const supabase = createClient();
  await supabase.from('achievements').delete().eq('id', id);
  revalidatePath('/admin/achievements');
  revalidatePath('/achievements');
  revalidatePath('/');
}
