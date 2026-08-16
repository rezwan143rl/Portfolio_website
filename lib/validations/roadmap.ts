import { z } from 'zod';

export const roadmapItemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  category: z.string().optional(),
  stage: z.enum(['now', 'next', 'future']),
  status: z.string().optional(),
  priority: z.coerce.number().int().optional(),
});

export type RoadmapItemFormValues = z.infer<typeof roadmapItemSchema>;
