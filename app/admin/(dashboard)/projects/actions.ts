'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { projectSchema } from '@/lib/validations/project';

function parseForm(formData: FormData) {
  return projectSchema.safeParse({
    name: formData.get('name'),
    slug: formData.get('slug'),
    short_description: formData.get('short_description'),
    full_description: formData.get('full_description') || undefined,
    status: formData.get('status'),
    featured: formData.get('featured') === 'on',
    github_url: formData.get('github_url') || '',
    live_url: formData.get('live_url') || '',
    docs_url: formData.get('docs_url') || '',
    video_url: formData.get('video_url') || '',
    problem: formData.get('problem') || undefined,
    solution: formData.get('solution') || undefined,
    my_role: formData.get('my_role') || undefined,
    challenges: formData.get('challenges') || undefined,
    what_i_learned: formData.get('what_i_learned') || undefined,
    future_improvements: formData.get('future_improvements') || undefined,
    technology_ids: formData.getAll('technology_ids').map(String),
  });
}

// Replaces the full set of technology links for a project. Simpler and
// safer than diffing add/remove for a checkbox list this size.
async function syncTechnologies(
  supabase: ReturnType<typeof createClient>,
  projectId: string,
  skillIds: string[]
) {
  await supabase.from('project_technologies').delete().eq('project_id', projectId);
  if (skillIds.length > 0) {
    await supabase
      .from('project_technologies')
      .insert(skillIds.map((skill_id) => ({ project_id: projectId, skill_id })));
  }
}

export async function createProject(formData: FormData) {
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid form data.' };
  }

  const { technology_ids, ...projectFields } = parsed.data;
  const supabase = createClient();
  const { data, error } = await supabase
    .from('projects')
    .insert(projectFields)
    .select('id')
    .single();
  if (error) return { error: error.message };

  await syncTechnologies(supabase, data.id, technology_ids);

  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  redirect('/admin/projects');
}

export async function updateProject(id: string, formData: FormData) {
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid form data.' };
  }

  const { technology_ids, ...projectFields } = parsed.data;
  const supabase = createClient();
  const { error } = await supabase.from('projects').update(projectFields).eq('id', id);
  if (error) return { error: error.message };

  await syncTechnologies(supabase, id, technology_ids);

  revalidatePath('/admin/projects');
  revalidatePath(`/projects/${parsed.data.slug}`);
  redirect('/admin/projects');
}

export async function deleteProject(id: string) {
  const supabase = createClient();
  await supabase.from('projects').delete().eq('id', id);
  revalidatePath('/admin/projects');
  revalidatePath('/projects');
}
