import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import GalleryClient from '@/components/GalleryClient';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Galeri — Otelimizi Keşfedin',
};

export default function GaleriPage() {
  return (
    <>
      <PageHero
        title="Görsel"
        titleEmphasis="Galeri"
        breadcrumb="Galeri"
        bgImage="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1800&q=80"
        height="55vh"
      />
      <GalleryClient />
      <Footer />
    </>
  );
}
