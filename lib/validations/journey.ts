import { z } from 'zod';

export const journeyEntrySchema = z.object({
  year: z.string().min(1, 'Year is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  category: z.string().optional(),
  image_url: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().default(false),
  visible: z.boolean().default(true),
});

export type JourneyEntryFormValues = z.infer<typeof journeyEntrySchema>;
