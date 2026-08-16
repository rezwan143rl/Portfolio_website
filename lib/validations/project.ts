import { z } from 'zod';

export const projectSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers, and hyphens only'),
  short_description: z.string().min(1, 'Short description is required').max(200),
  full_description: z.string().optional(),
  status: z.enum(['planned', 'in_progress', 'completed', 'archived']),
  featured: z.boolean().default(false),
  github_url: z.string().url().optional().or(z.literal('')),
  live_url: z.string().url().optional().or(z.literal('')),
  docs_url: z.string().url().optional().or(z.literal('')),
  video_url: z.string().url().optional().or(z.literal('')),
  problem: z.string().optional(),
  solution: z.string().optional(),
  my_role: z.string().optional(),
  challenges: z.string().optional(),
  what_i_learned: z.string().optional(),
  future_improvements: z.string().optional(),
  technology_ids: z.array(z.string()).default([]),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
