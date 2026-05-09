import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import RoomsClient from '@/components/RoomsClient';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Odalarımız — Zarafetle Tasarlanmış',
};

export default function OdalarimizPage() {
  return (
    <>
      <PageHero
        title="Odalarımız &"
        titleEmphasis="Suitelerimiz"
        breadcrumb="Odalarımız"
        bgImage="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1800&q=80"
        height="60vh"
      />
      <section style={{ paddingTop: '3rem', paddingBottom: 0 }}>
        <RoomsClient />
      </section>
      <Footer />
    </>
  );
}
