import { z } from 'zod';

export const achievementSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  date: z.string().optional(),
  image_url: z.string().url().optional().or(z.literal('')),
  link: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().default(false),
});

export type AchievementFormValues = z.infer<typeof achievementSchema>;
