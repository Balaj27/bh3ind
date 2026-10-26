import type { Metadata, Viewport } from 'next';
import { siteUrl, siteTitle, siteDescription } from './site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: siteTitle, template: '%s | BH3 Industries' },
  description: siteDescription,
  applicationName: 'BH3 Industries',
  category: 'Electrical services',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'BH3 Industries',
    url: '/',
    title: siteTitle,
    description: siteDescription,
    images: [{ url: '/images/bh3-social-preview-v2.jpg', width: 1200, height: 630, type: 'image/jpeg', alt: 'BH3 Industries — Top-rated electricians in North Texas. Residential, commercial and 24/7 emergency electrical services. 972-761-1973.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [{ url: '/images/bh3-social-preview-v2.jpg', alt: 'BH3 Industries — North Texas electricians' }],
  },
};

export const viewport: Viewport = { themeColor: '#f3412b' };

const business = {
  '@context': 'https://schema.org',
  '@type': 'Electrician',
  '@id': new URL('/#business', siteUrl).href,
  name: 'BH3 Industries',
  url: siteUrl.href,
  logo: new URL('/logo.png', siteUrl).href,
  image: new URL('/images/bh3-social-preview-v2.jpg', siteUrl).href,
  description: siteDescription,
  telephone: '+1-972-761-1973',
  email: 'info@bh3ind.com',
  address: { '@type': 'PostalAddress', streetAddress: '4111 US-80 Suite 206', addressLocality: 'Mesquite', addressRegion: 'TX', postalCode: '75150', addressCountry: 'US' },
  areaServed: ['Mesquite', 'Garland', 'Sunnyvale', 'Seagoville', 'Dallas', 'Balch Springs', 'Forney', 'Terrell'].map(name => ({ '@type': 'City', name: `${name}, Texas` })),
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-US"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(business).replace(/</g, '\\u003c') }} />{children}</body></html>;
}
