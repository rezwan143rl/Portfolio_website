export type ProjectStatus = 'planned' | 'in_progress' | 'completed' | 'archived';
export type SkillLevel = 'learning' | 'familiar' | 'working_knowledge' | 'advanced' | 'building_with_it';
export type RoadmapStage = 'now' | 'next' | 'future';

export interface Category {
  id: string;
  name: string;
  slug: string;
  type: 'project' | 'skill' | 'achievement';
  order: number;
}

export interface Skill {
  id: string;
  name: string;
  category_id: string | null;
  level: SkillLevel;
  description: string | null;
  icon_url: string | null;
  featured: boolean;
  order: number;
}

export interface ProjectGalleryImage {
  id: string;
  project_id: string;
  image_url: string;
  caption: string | null;
  order: number;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  full_description: string | null;
  category_id: string | null;
  status: ProjectStatus;
  start_date: string | null;
  end_date: string | null;
  featured: boolean;
  thumbnail_url: string | null;
  github_url: string | null;
  live_url: string | null;
  docs_url: string | null;
  video_url: string | null;
  problem: string | null;
  solution: string | null;
  my_role: string | null;
  challenges: string | null;
  what_i_learned: string | null;
  future_improvements: string | null;
  github_repo: string | null;
  order: number;
  created_at: string;
  updated_at: string;
  gallery?: ProjectGalleryImage[];
  technologies?: Skill[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string | null;
  date: string | null;
  category_id: string | null;
  image_url: string | null;
  link: string | null;
  featured: boolean;
  order: number;
}

export interface Certification {
  id: string;
  name: string;
  issuing_org: string;
  date: string | null;
  credential_id: string | null;
  credential_url: string | null;
  image_url: string | null;
  description: string | null;
  order: number;
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  stage: RoadmapStage;
  status: string | null;
  priority: number | null;
  image_url: string | null;
  order: number;
}

export interface JourneyEntry {
  id: string;
  year: string;
  title: string;
  description: string | null;
  category: string | null;
  image_url: string | null;
  related_project_id: string | null;
  featured: boolean;
  visible: boolean;
  order: number;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  visible: boolean;
  order: number;
}

export interface Media {
  id: string;
  url: string;
  type: string | null;
  alt_text: string | null;
  uploaded_at: string;
}

export interface SiteSettings {
  hero_headline: string;
  hero_subline: string;
  currently_text: string;
  resume_url: string | null;
}
