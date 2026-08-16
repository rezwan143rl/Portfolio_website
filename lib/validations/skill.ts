import { z } from 'zod';

export const skillSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  level: z.enum(['learning', 'familiar', 'working_knowledge', 'advanced', 'building_with_it']),
  description: z.string().optional(),
  icon_url: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().default(false),
});

export type SkillFormValues = z.infer<typeof skillSchema>;
