import type { Metadata } from 'next';
import { Cormorant_Garamond, Open_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import ScrollInit from '@/components/ScrollInit';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Hotel Master — Luxury & Excellence',
    template: '%s | Hotel Master',
  },
  description:
    "Hotel Master — İstanbul'un kalbinde lüks ve zarafeti bir arada sunan 5 yıldızlı otel deneyimi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${cormorant.variable} ${openSans.variable}`} suppressHydrationWarning>
        <Navbar />
        <ScrollInit />
        {children}
      </body>
    </html>
  );
}
