'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { certificationSchema } from '@/lib/validations/certification';

function parseForm(formData: FormData) {
  return certificationSchema.safeParse({
    name: formData.get('name'),
    issuing_org: formData.get('issuing_org'),
    date: formData.get('date') || undefined,
    credential_id: formData.get('credential_id') || undefined,
    credential_url: formData.get('credential_url') || '',
    image_url: formData.get('image_url') || '',
    description: formData.get('description') || undefined,
  });
}

export async function createCertification(formData: FormData) {
  const parsed = parseForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid form data.' };

  const supabase = createClient();
  const { error } = await supabase.from('certifications').insert(parsed.data);
  if (error) return { error: error.message };

  revalidatePath('/admin/certifications');
  revalidatePath('/certifications');
  redirect('/admin/certifications');
}

export async function updateCertification(id: string, formData: FormData) {
  const parsed = parseForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid form data.' };

  const supabase = createClient();
  const { error } = await supabase.from('certifications').update(parsed.data).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/certifications');
  revalidatePath('/certifications');
  redirect('/admin/certifications');
}

export async function deleteCertification(id: string) {
  const supabase = createClient();
  await supabase.from('certifications').delete().eq('id', id);
  revalidatePath('/admin/certifications');
  revalidatePath('/certifications');
}
