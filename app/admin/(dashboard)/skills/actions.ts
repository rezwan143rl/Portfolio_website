'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { skillSchema } from '@/lib/validations/skill';

function parseForm(formData: FormData) {
  return skillSchema.safeParse({
    name: formData.get('name'),
    level: formData.get('level'),
    description: formData.get('description') || undefined,
    icon_url: formData.get('icon_url') || '',
    featured: formData.get('featured') === 'on',
  });
}

export async function createSkill(formData: FormData) {
  const parsed = parseForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid form data.' };

  const supabase = createClient();
  const { error } = await supabase.from('skills').insert(parsed.data);
  if (error) return { error: error.message };

  revalidatePath('/admin/skills');
  revalidatePath('/skills');
  redirect('/admin/skills');
}

export async function updateSkill(id: string, formData: FormData) {
  const parsed = parseForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid form data.' };

  const supabase = createClient();
  const { error } = await supabase.from('skills').update(parsed.data).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/skills');
  revalidatePath('/skills');
  redirect('/admin/skills');
}

export async function deleteSkill(id: string) {
  const supabase = createClient();
  await supabase.from('skills').delete().eq('id', id);
  revalidatePath('/admin/skills');
  revalidatePath('/skills');
}
