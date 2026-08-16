'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function updateResumeUrl(url: string | null) {
  const supabase = createClient();
  const { error } = await supabase.from('site_settings').update({ resume_url: url }).eq('id', 1);
  if (error) return { error: error.message };

  revalidatePath('/resume');
  revalidatePath('/admin/resume');
  return { success: true };
}
