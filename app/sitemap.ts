import type { MetadataRoute } from 'next';

const routes = [
  '',
  '/projects',
  '/skills',
  '/achievements',
  '/certifications',
  '/roadmap',
  '/journey',
  '/resume',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
