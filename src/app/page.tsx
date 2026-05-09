import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HeroSection from '@/components/HeroSection';
import RoomCard from '@/components/RoomCard';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Hotel Master — Anasayfa',
};

const ROOMS = [
  {
    category: 'Kategori 01',
    name: 'Executive Oda',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=700&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=700&q=80',
    ],
    price: 300,
    size: 45,
    view: 'Deniz Manzarası',
    capacity: 2,
    badge: 'En Çok Tercih',
  },
  {
    category: 'Kategori 02',
    name: 'Deluxe Oda',
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=700&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&q=80',
      'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=700&q=80',
    ],
    price: 200,
    size: 35,
    view: 'Bahçe Manzarası',
    capacity: 2,
  },
  {
    category: 'Kategori 03',
    name: 'Balayı Suite',
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=700&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=700&q=80',
    ],
    price: 450,
    size: 65,
    view: 'Panoramik Manzara',
    capacity: 2,
  },
];

const ACTIVITIES = [
  { icon: '☕', name: 'Oda Servisi', sub: '7/24 Kesintisiz Hizmet', img: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=700&q=80', wide: true },
  { icon: '♨', name: 'Hamam & Spa', sub: 'Wellness & Sağlık', img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&q=80' },
  { icon: '💑', name: 'Balayı Paketi', sub: 'Romantik Kaçış', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=700&q=80' },
  { icon: '🎭', name: 'Eğlence', sub: 'Bar & Gece Hayatı', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80' },
  { icon: '🏛', name: 'Toplantı', sub: 'İş & Konferans', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80' },
  { icon: '🍽', name: 'Restoran', sub: 'Gurme Mutfağı', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80' },
];

const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80', alt: 'Havuz', wide: true },
  { src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80', alt: 'Oda' },
  { src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80', alt: 'Havuz' },
  { src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80', alt: 'Lobi' },
  { src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80', alt: 'Spa' },
];

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Rooms Section */}
      <section className="rooms-section" id="rooms">
        <div className="section-inner">
          <div className="rooms-header reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <div className="section-label">Odalarımız</div>
              <h2 className="section-title">Zarafetle<br />Tasarlanmış Odalar</h2>
              <p className="section-desc" style={{ maxWidth: '420px' }}>
                Her detayı özenle tasarlanmış odalarımızda, konforun ve estetiğin mükemmel birlikteliğini yaşayın.
              </p>
            </div>
            <Link href="/odalarimiz" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              Tüm Odalar →
            </Link>
          </div>
          <div className="rooms-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {ROOMS.map((room, i) => (
              <RoomCard key={i} {...room} />
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="activities-section" id="activities">
        <div className="section-inner">
          <div className="activities-intro reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '3rem' }}>
            <div>
              <div className="section-label">Aktiviteler &amp; Hizmetler</div>
              <h2 className="section-title">Eşsiz Bir<br />Deneyim İçin</h2>
            </div>
            <p className="activities-desc section-desc">
              Dünya standartlarında hizmetlerimiz ve aktivitelerimizle konaklamanızı hayatınızın en özel anına dönüştürüyoruz.
            </p>
          </div>
          <div className="activities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 260px)', gap: '1rem' }}>
            {ACTIVITIES.map((act, i) => (
              <div
                key={i}
                className="activity-card"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  gridRow: act.wide ? 'span 2' : 'auto',
                }}
              >
                <div
                  className="activity-img"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url('${act.img}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.6s ease',
                  }}
                />
                <div className="activity-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 100%)' }} />
                <div className="activity-content" style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', zIndex: 2 }}>
                  <div className="activity-icon" style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{act.icon}</div>
                  <div className="activity-name" style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 300 }}>{act.name}</div>
                  <div className="activity-sub" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>{act.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="testimonial-section" style={{ background: 'var(--charcoal)', textAlign: 'center' }}>
        <div className="section-inner">
          <div className="section-label reveal" style={{ justifyContent: 'center' }}>Misafir Yorumları</div>
          <div className="stars reveal reveal-delay-1" style={{ color: 'var(--gold)', fontSize: '1.2rem', marginBottom: '1.5rem' }}>★★★★★</div>
          <blockquote className="testimonial-quote reveal reveal-delay-2" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, fontStyle: 'italic', color: 'var(--white)', maxWidth: '800px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
            &ldquo;Hotel Master&apos;da geçirdiğimiz balayı, ömrümüz boyunca unutamayacağımız bir deneyime dönüştü. Her detay mükemmeldi.&rdquo;
          </blockquote>
          <div className="testimonial-author reveal reveal-delay-3" style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            — Ayşe &amp; Mehmet K. — İstanbul
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section" id="gallery">
        <div className="section-inner">
          <div className="reveal" style={{ marginBottom: '3rem' }}>
            <div className="section-label">Görsel Galeri</div>
            <h2 className="section-title">Otelimizi Keşfedin</h2>
          </div>
          <div
            className="gallery-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 220px)', gap: '0.75rem' }}
          >
            {GALLERY.map((item, i) => (
              <div
                key={i}
                className="gallery-item reveal"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  gridRow: item.wide ? 'span 2' : 'auto',
                  cursor: 'pointer',
                }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {i === 0 && (
                  <div className="gallery-play" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(10,10,10,0.3)' }}>
                    <div className="play-btn" style={{ width: '56px', height: '56px', border: '1px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/galeri" className="btn-ghost">Tüm Fotoğraflar</Link>
          </div>
        </div>
      </section>

      <Footer variant="full" />
    </>
  );
}
