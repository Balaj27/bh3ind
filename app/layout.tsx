import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BH3 Industries | Top-Rated Electricians in North Texas',
  description: 'Reliable electrical work backed by experience, honesty and dependable service. Residential, commercial and 24/7 emergency electricians in North Texas. Call 972-761-1973.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
