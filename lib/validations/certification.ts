import { z } from 'zod';

export const certificationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  issuing_org: z.string().min(1, 'Issuing organization is required'),
  date: z.string().optional(),
  credential_id: z.string().optional(),
  credential_url: z.string().url().optional().or(z.literal('')),
  image_url: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
});

export type CertificationFormValues = z.infer<typeof certificationSchema>;
