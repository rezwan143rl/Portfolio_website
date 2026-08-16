'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { journeyEntrySchema } from '@/lib/validations/journey';

function parseForm(formData: FormData) {
  return journeyEntrySchema.safeParse({
    year: formData.get('year'),
    title: formData.get('title'),
    description: formData.get('description') || undefined,
    category: formData.get('category') || undefined,
    image_url: formData.get('image_url') || '',
    featured: formData.get('featured') === 'on',
    visible: formData.get('visible') === 'on',
  });
}

export async function createJourneyEntry(formData: FormData) {
  const parsed = parseForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid form data.' };

  const supabase = createClient();
  const { error } = await supabase.from('journey_entries').insert(parsed.data);
  if (error) return { error: error.message };

  revalidatePath('/admin/journey');
  revalidatePath('/journey');
  redirect('/admin/journey');
}

export async function updateJourneyEntry(id: string, formData: FormData) {
  const parsed = parseForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid form data.' };

  const supabase = createClient();
  const { error } = await supabase.from('journey_entries').update(parsed.data).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/journey');
  revalidatePath('/journey');
  redirect('/admin/journey');
}

export async function deleteJourneyEntry(id: string) {
  const supabase = createClient();
  await supabase.from('journey_entries').delete().eq('id', id);
  revalidatePath('/admin/journey');
  revalidatePath('/journey');
}
