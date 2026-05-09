import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ContactClient from '@/components/ContactClient';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'İletişim & Rezervasyon',
};

export default function IletisimPage() {
  return (
    <>
      <PageHero
        title="İletişim &"
        titleEmphasis="Rezervasyon"
        breadcrumb="İletişim"
        bgImage="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1800&q=80"
        height="55vh"
      />

      {/* Info Strip */}
      <div style={{ background: 'var(--dark)', borderBottom: '1px solid rgba(201,168,76,0.12)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem 4rem', display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>, label: 'Adres', value: 'Cumhuriyet Cad. No:392, Bakırköy / İstanbul' },
            { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.66A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" /></svg>, label: 'Telefon', value: '+90 533 833 36 63' },
            { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>, label: 'E-Posta', value: 'rezervasyon@hotelmaster.com' },
            { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>, label: 'Resepsiyon', value: '7/24 Açık' },
          ].map(({ icon, label, value }) => (
            <div key={label} style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
              <span style={{ color: 'var(--gold)' }}>{icon}</span>
              <div>
                <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--white)' }}>{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ContactClient />
      <Footer />
    </>
  );
}
