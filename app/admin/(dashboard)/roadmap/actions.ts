'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { roadmapItemSchema } from '@/lib/validations/roadmap';

function parseForm(formData: FormData) {
  const priority = formData.get('priority');
  return roadmapItemSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description') || undefined,
    category: formData.get('category') || undefined,
    stage: formData.get('stage'),
    status: formData.get('status') || undefined,
    priority: priority ? priority : undefined,
  });
}

export async function createRoadmapItem(formData: FormData) {
  const parsed = parseForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid form data.' };

  const supabase = createClient();
  const { error } = await supabase.from('roadmap_items').insert(parsed.data);
  if (error) return { error: error.message };

  revalidatePath('/admin/roadmap');
  revalidatePath('/roadmap');
  revalidatePath('/');
  redirect('/admin/roadmap');
}

export async function updateRoadmapItem(id: string, formData: FormData) {
  const parsed = parseForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid form data.' };

  const supabase = createClient();
  const { error } = await supabase.from('roadmap_items').update(parsed.data).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/roadmap');
  revalidatePath('/roadmap');
  revalidatePath('/');
  redirect('/admin/roadmap');
}

export async function deleteRoadmapItem(id: string) {
  const supabase = createClient();
  await supabase.from('roadmap_items').delete().eq('id', id);
  revalidatePath('/admin/roadmap');
  revalidatePath('/roadmap');
  revalidatePath('/');
}
