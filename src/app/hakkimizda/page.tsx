import type { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Hakkımızda — 28 Yıllık Zarafet',
};

const VALUES = [
  { icon: '🛡', name: 'Güven & Güvenlik', desc: 'Misafirlerimizin güvenliği her şeyden önce gelir. 7/24 güvenlik ve modern sistemlerimizle huzurla konaklamanızı sağlıyoruz.' },
  { icon: '❤', name: 'Misafir Odaklılık', desc: 'Her misafirimize özel, kişiselleştirilmiş hizmet anlayışıyla beklentilerin ötesinde bir konaklama deneyimi yaşatıyoruz.' },
  { icon: '⭐', name: 'Mükemmellik', desc: 'Detaylara verdiğimiz önem ve mükemmellik tutkumuzla her hizmetimizi en yüksek standartlarda sunuyoruz.' },
  { icon: '🌿', name: 'Yerel Kültür', desc: 'Türk misafirperverliğini ve zengin kültürel mirasımızı modern lüks anlayışıyla harmanlayarak benzersiz bir deneyim yaratıyoruz.' },
  { icon: '♻', name: 'Sürdürülebilirlik', desc: 'Çevreye duyarlı uygulamalarımız ve sürdürülebilir enerji kullanımımızla gelecek nesillere daha yaşanabilir bir dünya bırakmayı hedefliyoruz.' },
  { icon: '🤝', name: 'Ekip Ruhu', desc: 'Deneyimli ve tutkulu ekibimiz, her misafirimize unutulmaz anlar yaşatmak için bir aile gibi çalışmaktadır.' },
];

const TEAM = [
  { name: 'Ahmet Yılmaz', role: 'Genel Müdür', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
  { name: 'Selin Kaya', role: 'Operasyon Müdürü', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  { name: 'Kemal Demir', role: 'Şef & Restoran Müdürü', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Ayla Şahin', role: 'Spa & Wellness Direktörü', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
];

const TIMELINE = [
  { year: '1996', title: 'Kuruluş', desc: 'Hotel Master, Ahmet Yılmaz tarafından İstanbul\'un kalbinde lüks konaklama vizyonuyla kuruldu.', left: true },
  { year: '2003', title: 'Genişleme', desc: 'Otelimiz 80 yeni oda ve suite ekleyerek kapasitesini iki katına çıkardı.', left: false },
  { year: '2010', title: '5★ Sertifikası', desc: 'Turizm Bakanlığı tarafından beş yıldız statüsüne layık görüldük.', left: true },
  { year: '2019', title: 'Dijital Dönüşüm', desc: 'Akıllı oda sistemleri ve dijital misafir hizmetleri devreye alındı.', left: false },
  { year: '2024', title: 'Yeniden Doğuş', desc: 'Tam renovasyon ile Hotel Master, çağdaş lüksü tarihi zarafetle buluşturuyor.', left: true },
];

const AWARDS = [
  { year: '2023', icon: '🏆', name: 'En İyi Butik Otel\nTürkiye' },
  { year: '2022', icon: '⭐', name: 'TripAdvisor\nTravellers Choice' },
  { year: '2021', icon: '🌿', name: 'Sürdürülebilir\nOtelcilik Ödülü' },
  { year: '2020', icon: '🍽', name: 'En İyi Otel\nRestoranı' },
  { year: '2019', icon: '♨', name: 'Luxury Spa\nAward' },
];

export default function HakkimizdaPage() {
  return (
    <>
      <PageHero
        title="28 Yıllık"
        titleEmphasis="Zarafet ve Tutku"
        breadcrumb="Hakkımızda"
        bgImage="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1800&q=80"
        height="70vh"
      />

      {/* Story Section */}
      <section className="story-section">
        <div className="section-inner">
          <div className="story-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
            <div className="story-img-wrap reveal" style={{ position: 'relative' }}>
              <Image
                className="story-img-main"
                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"
                alt="Hotel iç mekan"
                width={600}
                height={420}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div
                className="story-img-accent"
                style={{ position: 'absolute', bottom: '-2rem', right: '-2rem', width: '220px', overflow: 'hidden' }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80"
                  alt="Restoran"
                  width={220}
                  height={160}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div
                className="story-badge"
                style={{
                  position: 'absolute', top: '1.5rem', left: '-2rem',
                  background: 'var(--gold)', padding: '1rem 1.5rem', textAlign: 'center', color: 'var(--black)'
                }}
              >
                <div className="story-badge-num" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600 }}>5★</div>
                <div className="story-badge-text" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Lüks Otel</div>
              </div>
            </div>
            <div className="reveal reveal-delay-1">
              <div className="section-label">Hikayemiz</div>
              <h2 className="section-title">Konaklamanın<br />Ötesine Geçiyoruz</h2>
              <div className="story-divider" style={{ width: '60px', height: '1px', background: 'var(--gold)', margin: '1.5rem 0' }} />
              <p className="story-desc section-desc" style={{ marginBottom: '1rem' }}>
                1996 yılında Ahmet Yılmaz tarafından kurulan Hotel Master, İstanbul&apos;un en prestijli adreslerinden birinde misafirlerini ağırlamaktadır. 28 yıllık deneyimimizle, lüks konaklama anlayışını sürekli yeniden tanımlıyoruz.
              </p>
              <p className="story-desc section-desc">
                Türkiye&apos;nin en prestijli tatil destinasyonlarından biri olarak, uluslararası standartlarda hizmet anlayışımız ve Anadolu&apos;nun sıcak misafirperverliğini harmanlayarak eşsiz bir deneyim sunuyoruz.
              </p>
              <div className="story-divider" style={{ width: '60px', height: '1px', background: 'var(--gold)', margin: '1.5rem 0' }} />
              <div className="story-signature" style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 300, fontStyle: 'italic' }}>Ahmet Yılmaz</div>
              <div className="story-signature-title" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginTop: '0.3rem' }}>Genel Müdür, Hotel Master</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section" style={{ background: 'var(--charcoal)' }}>
        <div className="section-inner">
          <div className="values-header reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Değerlerimiz</div>
            <h2 className="section-title">Bizi Biz Yapan<br />Temel İlkeler</h2>
          </div>
          <div
            className="values-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}
          >
            {VALUES.map((v, i) => (
              <div
                key={v.name}
                className={`value-card reveal reveal-delay-${i + 1}`}
                style={{ background: 'var(--dark)', padding: '2rem', borderTop: '1px solid rgba(201,168,76,0.2)' }}
              >
                <div className="value-icon" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{v.icon}</div>
                <div className="value-name" style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 300, marginBottom: '0.75rem' }}>{v.name}</div>
                <p className="value-desc section-desc" style={{ fontSize: '0.8rem' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="section-inner">
          <div className="team-header reveal" style={{ marginBottom: '3rem' }}>
            <div className="section-label">Ekibimiz</div>
            <h2 className="section-title">Deneyimli<br />Profesyoneller</h2>
          </div>
          <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            {TEAM.map((member, i) => (
              <div key={member.name} className={`team-card reveal reveal-delay-${i + 1}`} style={{ overflow: 'hidden' }}>
                <Image
                  className="team-img"
                  src={member.img}
                  alt={member.name}
                  width={400}
                  height={300}
                  style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                />
                <div className="team-body" style={{ padding: '1rem', background: 'var(--dark)', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
                  <div className="team-name" style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 300 }}>{member.name}</div>
                  <div className="team-role" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--gold)', marginTop: '0.25rem' }}>{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section" style={{ background: 'var(--charcoal)' }}>
        <div className="section-inner">
          <div className="timeline-header reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Tarihçemiz</div>
            <h2 className="section-title">28 Yıllık<br />Yolculuk</h2>
          </div>
          <div className="timeline" style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(201,168,76,0.2)', transform: 'translateX(-50%)' }} />
            {TIMELINE.map((item, i) => (
              <div key={item.year} className="timeline-item reveal" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'center', marginBottom: '3rem' }}>
                {item.left ? (
                  <>
                    <div style={{ textAlign: 'right' }}>
                      <div className="timeline-year" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>{item.year}</div>
                      <div className="timeline-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 300, margin: '0.3rem 0' }}>{item.title}</div>
                      <p className="timeline-desc section-desc" style={{ fontSize: '0.78rem' }}>{item.desc}</p>
                    </div>
                    <div className="timeline-dot" style={{ width: '32px', height: '32px', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.8rem', color: 'var(--black)' }}>★</div>
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <div className="timeline-dot" style={{ width: '32px', height: '32px', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.8rem', color: 'var(--black)' }}>★</div>
                    <div>
                      <div className="timeline-year" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>{item.year}</div>
                      <div className="timeline-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 300, margin: '0.3rem 0' }}>{item.title}</div>
                      <p className="timeline-desc section-desc" style={{ fontSize: '0.78rem' }}>{item.desc}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <div className="awards-section" style={{ background: 'var(--dark)', padding: '5rem 0' }}>
        <div className="awards-inner" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 4rem' }}>
          <div className="awards-title reveal" style={{ fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)', textAlign: 'center', marginBottom: '2.5rem' }}>Ödüller &amp; Sertifikalar</div>
          <div className="awards-grid" style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            {AWARDS.map((award, i) => (
              <div key={award.year} className={`award-item reveal reveal-delay-${i + 1}`} style={{ textAlign: 'center' }}>
                <div className="award-icon" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{award.icon}</div>
                <div className="award-year" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '0.3rem' }}>{award.year}</div>
                <div className="award-name" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{award.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
