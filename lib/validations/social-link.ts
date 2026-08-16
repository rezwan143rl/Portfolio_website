import { z } from 'zod';

export const socialLinkSchema = z.object({
  platform: z.string().min(1, 'Platform is required'),
  url: z.string().url('Must be a valid URL'),
  visible: z.boolean().default(true),
});

export type SocialLinkFormValues = z.infer<typeof socialLinkSchema>;
