import { createClient } from '@/lib/supabase/server';
import type {
  Achievement,
  Certification,
  JourneyEntry,
  Media,
  Project,
  RoadmapItem,
  SiteSettings,
  Skill,
  SocialLink,
} from '@/lib/types/database';

// Every function here fails soft: if the database isn't reachable (e.g. no
// Supabase project configured yet), pages render their empty state instead
// of crashing the build.

// Supabase returns joined many-to-many rows as { skill: {...} }[], not a
// flat Skill[] — this normalizes that shape once, in one place, instead of
// leaving every caller to work around it (or silently render broken badges,
// which is what the `as unknown as Project` cast here used to do).
function mapProjectTechnologies(raw: any): Project {
  return {
    ...raw,
    technologies: Array.isArray(raw?.technologies)
      ? raw.technologies.map((t: { skill: Skill }) => t.skill).filter(Boolean)
      : [],
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const fallback: SiteSettings = {
    hero_headline: 'Building at the intersection of technology, engineering, automation and business.',
    hero_subline:
      "I'm Rezwan — a multidisciplinary engineer who learns by building, currently exploring software, automation, and the systems that connect them.",
    currently_text: '[ADD YOUR CURRENT FOCUS]',
    resume_url: null,
  };
  try {
    const supabase = createClient();
    const { data } = await supabase.from('site_settings').select('*').single();
    return data ?? fallback;
  } catch {
    return fallback;
  }
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase.from('social_links').select('*').order('order');
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getSocialLinkById(id: string): Promise<SocialLink | null> {
  try {
    const supabase = createClient();
    const { data } = await supabase.from('social_links').select('*').eq('id', id).single();
    return data ?? null;
  } catch {
    return null;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('projects')
      .select('*, technologies:project_technologies(skill:skills(*))')
      .eq('featured', true)
      .order('order');
    return (data ?? []).map(mapProjectTechnologies);
  } catch {
    return [];
  }
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase.from('projects').select('*').order('order');
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('projects')
      .select('*, gallery:project_gallery(*), technologies:project_technologies(skill:skills(*))')
      .eq('slug', slug)
      .single();
    return data ? mapProjectTechnologies(data) : null;
  } catch {
    return null;
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase.from('skills').select('*').order('order');
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getSkillById(id: string): Promise<Skill | null> {
  try {
    const supabase = createClient();
    const { data } = await supabase.from('skills').select('*').eq('id', id).single();
    return data ?? null;
  } catch {
    return null;
  }
}

export async function getAchievements(): Promise<Achievement[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase.from('achievements').select('*').order('order');
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getAchievementById(id: string): Promise<Achievement | null> {
  try {
    const supabase = createClient();
    const { data } = await supabase.from('achievements').select('*').eq('id', id).single();
    return data ?? null;
  } catch {
    return null;
  }
}

export async function getCertifications(): Promise<Certification[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase.from('certifications').select('*').order('order');
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getCertificationById(id: string): Promise<Certification | null> {
  try {
    const supabase = createClient();
    const { data } = await supabase.from('certifications').select('*').eq('id', id).single();
    return data ?? null;
  } catch {
    return null;
  }
}

export async function getRoadmapItems(): Promise<RoadmapItem[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase.from('roadmap_items').select('*').order('order');
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getRoadmapItemById(id: string): Promise<RoadmapItem | null> {
  try {
    const supabase = createClient();
    const { data } = await supabase.from('roadmap_items').select('*').eq('id', id).single();
    return data ?? null;
  } catch {
    return null;
  }
}

export async function getJourneyEntries(): Promise<JourneyEntry[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('journey_entries')
      .select('*')
      .eq('visible', true)
      .order('order');
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getMedia(): Promise<Media[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase.from('media').select('*').order('uploaded_at', { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

// Admin views need every entry, including ones hidden from the public site.
export async function getAllJourneyEntries(): Promise<JourneyEntry[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase.from('journey_entries').select('*').order('order');
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getJourneyEntryById(id: string): Promise<JourneyEntry | null> {
  try {
    const supabase = createClient();
    const { data } = await supabase.from('journey_entries').select('*').eq('id', id).single();
    return data ?? null;
  } catch {
    return null;
  }
}
