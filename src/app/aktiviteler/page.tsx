import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Aktiviteler & Hizmetler',
};

const ACTIVITY_BLOCKS = [
  {
    num: '01',
    icon: '♨',
    cat: 'Wellness & Sağlık',
    name: 'Hamam, Sauna\n& Spa Merkezi',
    desc: 'Geleneksel Türk hamamı ve modern spa anlayışını bir araya getiren merkezimizde, deneyimli terapistlerimiz eşliğinde kendinizi yenileyin. Çift kişilik hamam deneyimlerinden aromaterapi masajlarına kadar geniş bir yelpazede hizmet sunuyoruz.',
    features: ['Geleneksel Türk Hamamı', 'Aromaterapi Masajı', 'Taş Terapisi', 'Çift Kişilik Deneyimler', 'Sauna & Buhar Odası'],
    hours: 'Her Gün 08:00 – 22:00',
    img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80',
    reverse: false,
  },
  {
    num: '02',
    icon: '🍽',
    cat: 'Gurme Deneyimi',
    name: 'Fine Dining\nRestoran',
    desc: 'Ödüllü şefimiz liderliğinde, Türk ve dünya mutfağının en seçkin lezzetlerini modern yorumlarıyla sunuyoruz. Taze ve yerel malzemelerle hazırlanan her yemek, bir sanat eserine dönüşüyor.',
    features: ['Türk & Akdeniz Mutfağı', 'Şef\'s Table Deneyimi', 'Özel Şarap Seçkisi', 'Canlı Müzik (Cuma-Cumartesi)', 'Açık Teras'],
    hours: 'Kahvaltı: 07:00-10:30 · Öğle: 12:00-15:00 · Akşam: 18:00-23:00',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80',
    reverse: true,
  },
  {
    num: '03',
    icon: '💑',
    cat: 'Özel Anlar',
    name: 'Balayı &\nRomantik Paketler',
    desc: 'Hayatınızın en özel anını unutulmaz kılmak için özel olarak tasarlanmış balayı paketlerimiz, çiçek süslemesinden şampanya ikramına kadar tüm detayları kapsıyor.',
    features: ['Çiçek Dekorasyonu', 'Şampanya İkramı', 'Özel Jakuzili Suite', 'Özel Akşam Yemeği', 'Çift Masajı'],
    hours: 'Randevu ile 7/24',
    img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=900&q=80',
    reverse: false,
  },
  {
    num: '04',
    icon: '🏛',
    cat: 'İş & Organizasyon',
    name: 'Toplantı &\nKonferans Salonları',
    desc: 'Modern teknoloji altyapısı ve esnek konfigürasyon seçenekleriyle 4 farklı toplantı salonumuz, küçük iş görüşmelerinden büyük konferanslara kadar her türlü etkinliğe ev sahipliği yapmaktadır.',
    features: ['4K Projeksiyon & Ses Sistemi', '4 Farklı Salon Kapasitesi', 'Hızlı Wi-Fi Altyapısı', 'Catering Hizmeti', 'Sekreterya Desteği'],
    hours: 'İş Günleri 08:00 – 20:00',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
    reverse: true,
  },
  {
    num: '05',
    icon: '☕',
    cat: 'Konfor & Kolaylık',
    name: 'Oda Servisi\n7/24',
    desc: 'Gece yarısı canınız bir şeyler istese de sabahın erken saatlerinde odanızda kahvaltı yapmak istese de, 24 saat kesintisiz oda servisimizle her isteğiniz en kısa sürede karşılanır.',
    features: ['7/24 Tam Menü Servisi', '30 Dakika Teslimat Garantisi', 'Özel Diyet Menüsü', 'Premium İçecek Seçkisi', 'Kahvaltı in Bed'],
    hours: '7/24 Kesintisiz',
    img: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=900&q=80',
    reverse: false,
  },
  {
    num: '06',
    icon: '🎭',
    cat: 'Eğlence & Sosyal',
    name: 'Sky Bar &\nEğlence',
    desc: 'Çatı katımızdaki Sky Bar\'da İstanbul\'un eşsiz panoramik manzarasını izlerken, canlı müzik ve özel kokteyllerimizin tadını çıkarın. Her Cuma ve Cumartesi gecesi özel performanslar.',
    features: ['Panoramik Şehir Manzarası', 'Canlı Müzik Performansları', 'Craft Kokteyl Menüsü', 'DJ\'li Özel Geceler', 'Özel Etkinlik Alanı'],
    hours: 'Her Gün 18:00 – 02:00',
    img: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=900&q=80',
    reverse: true,
  },
];

const MINI_SERVICES = [
  { icon: '🏊', name: 'Yüzme Havuzu', desc: 'Açık ve kapalı olimpik yüzme havuzumuzda serinleyin.' },
  { icon: '💪', name: 'Fitness Center', desc: '7/24 açık, modern ekipmanlarla donatılmış spor salonumuz.' },
  { icon: '🚗', name: 'Valet Parking', desc: 'Profesyonel vale hizmetiyle araç park stresini unutun.' },
  { icon: '👨‍👩‍👧', name: 'Çocuk Kulübü', desc: 'Minik misafirlerimiz için güvenli ve eğlenceli bir ortam.' },
  { icon: '🛍', name: 'Butik Mağaza', desc: 'Yerel el sanatları ve lüks markaların buluşma noktası.' },
  { icon: '🎮', name: 'Game Lounge', desc: 'Genç misafirler için modern oyun salonu.' },
  { icon: '📚', name: 'Kütüphane', desc: 'Seçkin kitap koleksiyonu ve sessiz çalışma alanı.' },
  { icon: '🌅', name: 'Çatı Terası', desc: 'Gün batımını izleyebileceğiniz panoramik seyir terası.' },
];

export default function AktivitelerPage() {
  return (
    <>
      <PageHero
        title="Aktiviteler &"
        titleEmphasis="Hizmetlerimiz"
        breadcrumb="Aktiviteler"
        bgImage="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1800&q=80"
        height="65vh"
      />

      {/* Intro */}
      <section>
        <div className="section-inner">
          <div
            className="intro-section reveal"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}
          >
            <div>
              <div className="section-label">Hizmetlerimiz</div>
              <h2 className="section-title">Konaklamanızı<br />Deneyime Dönüştürüyoruz</h2>
            </div>
            <p className="intro-desc section-desc">
              Hotel Master&apos;da her an özeldir. Dünya standartlarında aktivitelerimiz, uzmanlıkla hazırlanmış programlarımız ve kişiselleştirilmiş hizmet anlayışımızla konaklamanızı hayatınızın en güzel deneyimine dönüştürüyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Activity Blocks */}
      <section className="activities-section" style={{ paddingTop: 0 }}>
        <div className="section-inner">
          {ACTIVITY_BLOCKS.map((act) => (
            <div
              key={act.num}
              className={`activity-block reveal${act.reverse ? ' reverse' : ''}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '5rem',
                alignItems: 'center',
                marginBottom: '7rem',
                direction: act.reverse ? 'rtl' : 'ltr',
              }}
            >
              <div className="activity-block-img" style={{ position: 'relative', direction: 'ltr' }}>
                <div
                  className="activity-block-num"
                  style={{
                    position: 'absolute',
                    top: '-1.5rem',
                    left: '-1.5rem',
                    fontFamily: 'var(--font-display)',
                    fontSize: '5rem',
                    fontWeight: 700,
                    color: 'rgba(201,168,76,0.12)',
                    lineHeight: 1,
                    zIndex: 0,
                  }}
                >
                  {act.num}
                </div>
                <Image
                  src={act.img}
                  alt={act.name}
                  width={600}
                  height={420}
                  style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block', position: 'relative', zIndex: 1 }}
                />
              </div>
              <div className="activity-block-info" style={{ direction: 'ltr' }}>
                <div className="act-icon" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{act.icon}</div>
                <div className="act-cat" style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.8rem' }}>{act.cat}</div>
                <div className="act-name" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, lineHeight: 1.2, marginBottom: '1rem', whiteSpace: 'pre-line' }}>{act.name}</div>
                <p className="act-desc section-desc" style={{ marginBottom: '1.5rem' }}>{act.desc}</p>
                <div className="act-features" style={{ marginBottom: '1.5rem' }}>
                  {act.features.map((f) => (
                    <div key={f} className="act-feature" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <div className="act-feature-dot" style={{ width: '4px', height: '4px', background: 'var(--gold)', flexShrink: 0 }} />
                      {f}
                    </div>
                  ))}
                </div>
                <div className="act-divider" style={{ height: '1px', background: 'rgba(201,168,76,0.2)', marginBottom: '1rem' }} />
                <div className="act-hours" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                  {act.hours}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mini Grid */}
      <div className="mini-grid-section" style={{ background: 'var(--charcoal)', padding: '7rem 0', textAlign: 'center' }}>
        <div className="mini-grid-inner" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 4rem' }}>
          <div className="mini-section-label reveal" style={{ fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Diğer Hizmetler</div>
          <h2 className="mini-section-title reveal reveal-delay-1 section-title" style={{ marginBottom: '3rem' }}>Ayrıcalıklı<br />Ek Hizmetler</h2>
          <div className="mini-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {MINI_SERVICES.map((s, i) => (
              <div key={s.name} className={`mini-card reveal reveal-delay-${(i % 4) + 1}`} style={{ background: 'var(--dark)', padding: '2rem 1.5rem', textAlign: 'center' }}>
                <div className="mini-icon" style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>{s.icon}</div>
                <div className="mini-name" style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 300, marginBottom: '0.5rem' }}>{s.name}</div>
                <p className="mini-desc section-desc" style={{ fontSize: '0.78rem' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Strip */}
      <div className="reserve-strip" style={{ background: 'var(--gold)', padding: '5rem 4rem' }}>
        <div className="reserve-inner" style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
          <div className="reserve-text reveal">
            <div className="strip-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--black)', lineHeight: 1.2 }}>
              Tüm Aktiviteleri<br />Keşfetmeye Hazır mısınız?
            </div>
            <div className="strip-sub" style={{ fontSize: '0.85rem', color: 'rgba(10,10,10,0.7)', marginTop: '0.5rem' }}>Rezervasyonunuzu yapın, kalanı bize bırakın.</div>
          </div>
          <Link href="/odalarimiz" className="reveal reveal-delay-1" style={{ flexShrink: 0, background: 'var(--black)', color: 'var(--gold)', border: 'none', padding: '1rem 2.5rem', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 500, display: 'inline-block' }}>
            Rezervasyon Yap
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
