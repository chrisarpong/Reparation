import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    // Replace with actual production domain when known
    sitemap: 'https://reparations.mfa.gov.gh/sitemap.xml',
  };
}
