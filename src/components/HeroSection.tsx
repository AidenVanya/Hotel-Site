'use client';

import Link from 'next/link';
import { useScrollEffects } from '@/hooks/useScrollEffects';

const STATS = [
  { num: '28+', label: 'Yıllık Deneyim' },
  { num: '120', label: 'Oda & Suite' },
  { num: '15k+', label: 'Mutlu Misafir' },
  { num: '5★', label: 'Yıldızlı Hizmet' },
];

export default function HeroSection() {
  useScrollEffects({ enableParallax: true, enableProgress: true });

  return (
    <>
      <style>{`
        @keyframes heroLineGrow {
          from { height: 0; opacity: 0; }
          to { height: 60px; opacity: 1; }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scrollDrop {
          0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
          30% { opacity: 1; }
          100% { transform: scaleY(1); transform-origin: top; opacity: 1; }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(8px); opacity: 1; }
        }
        .h-line  { animation: heroLineGrow  0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
        .h-eye   { animation: heroFadeUp    0.9s cubic-bezier(0.16,1,0.3,1) 0.35s both; }
        .h-title { animation: heroFadeUp    1s   cubic-bezier(0.16,1,0.3,1) 0.55s both; }
        .h-divider { animation: heroFadeIn  0.8s ease 0.85s both; }
        .h-desc  { animation: heroFadeUp    0.9s cubic-bezier(0.16,1,0.3,1) 0.9s both; }
        .h-cta   { animation: heroFadeUp    0.9s cubic-bezier(0.16,1,0.3,1) 1.1s both; }
        .h-badge { animation: heroFadeIn    1s   ease 1.2s both; }
        .h-scroll-line { animation: scrollDrop 1.2s cubic-bezier(0.16,1,0.3,1) 1.4s both; }
        .h-scroll-dot  { animation: scrollBounce 2s ease-in-out 2.6s infinite; }
        .hero-bg-img { transition: transform 0.1s linear; }
      `}</style>

      <div className="scroll-progress" />

      <section
        id="hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          paddingTop: '80px',
        }}
      >
        {/* Background image */}
        <div
          id="heroBg"
          className="hero-bg-img"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'scale(1.08)',
          }}
        />

        {/* Left dark panel — frames the text */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(100deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.75) 45%, rgba(10,10,10,0.15) 75%, transparent 100%)',
        }} />

        {/* Bottom fade to page background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.6) 75%, var(--black) 100%)',
        }} />

        {/* Top subtle vignette */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 70% 50%, transparent 40%, rgba(10,10,10,0.4) 100%)',
        }} />

        {/* Navbar zone darkening */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.65) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Location badge — top right */}
        <div className="h-badge" style={{
          position: 'absolute',
          top: '110px',
          right: '4rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(10,10,10,0.5)',
          border: '1px solid rgba(201,168,76,0.25)',
          backdropFilter: 'blur(8px)',
          padding: '0.5rem 1rem',
          zIndex: 3,
        }}>
          <svg width="10" height="12" viewBox="0 0 12 16" fill="var(--gold)">
            <path d="M6 0C3.24 0 1 2.24 1 5c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5zm0 6.5C5.17 6.5 4.5 5.83 4.5 5S5.17 3.5 6 3.5 7.5 4.17 7.5 5 6.83 6.5 6 6.5z"/>
          </svg>
          <span style={{ fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--white)' }}>
            İstanbul, Türkiye
          </span>
        </div>

        {/* Main content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          padding: '0 4rem',
        }}>
          {/* Gold vertical accent line */}
          <div className="h-line" style={{
            width: '2px',
            background: 'linear-gradient(to bottom, var(--gold), rgba(201,168,76,0.3))',
            marginBottom: '1.2rem',
          }} />

          {/* Eyebrow */}
          <div className="h-eye" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.6rem',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '1rem',
          }}>
            <span>Five Star Experience</span>
            <div style={{ height: '1px', width: '40px', background: 'var(--gold)', opacity: 0.5 }} />
            <span style={{ color: 'rgba(201,168,76,0.5)', letterSpacing: '0.3em' }}>EST. 1996</span>
          </div>

          {/* Title */}
          <h1 className="h-title" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 9vw, 8rem)',
            fontWeight: 300,
            lineHeight: 1.0,
            color: '#ffffff',
            marginBottom: 0,
            letterSpacing: '-0.01em',
          }}>
            Otelimize
            <br />
            <em style={{
              fontStyle: 'italic',
              color: 'var(--gold-light)',
              display: 'inline-block',
            }}>
              Hoş Geldiniz
            </em>
          </h1>

          {/* Gold divider */}
          <div className="h-divider" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            margin: '1.4rem 0',
          }}>
            <div style={{ width: '48px', height: '1px', background: 'var(--gold)' }} />
            <div style={{ width: '6px', height: '6px', background: 'var(--gold)', transform: 'rotate(45deg)' }} />
            <div style={{ width: '24px', height: '1px', background: 'rgba(201,168,76,0.4)' }} />
          </div>

          {/* Description */}
          <p className="h-desc" style={{
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.82)',
            maxWidth: '440px',
            lineHeight: 2,
            marginBottom: '2rem',
            fontWeight: 300,
          }}>
            İstanbul&apos;un kalbinde, 28 yıllık deneyim ve zarafetle tasarlanmış suitlerimizde
            kendinizi lüksün ve huzurun kucağına bırakın.
          </p>

          {/* CTA buttons */}
          <div className="h-cta" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/iletisim" className="btn-primary" style={{ padding: '1.1rem 2.8rem' }}>
              Rezervasyon Yap
            </Link>
            <Link href="/odalarimiz" className="btn-ghost" style={{ padding: '1.1rem 2.8rem' }}>
              Odaları Keşfet
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.6rem',
          zIndex: 2,
        }}>
          <div className="h-scroll-line" style={{
            width: '1px',
            height: '48px',
            background: 'linear-gradient(to bottom, var(--gold), rgba(201,168,76,0.2))',
          }} />
          <div className="h-scroll-dot" style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: 'var(--gold)',
          }} />
        </div>
      </section>

      {/* Stats bar */}
      <div style={{
        background: 'var(--charcoal)',
        borderTop: '1px solid rgba(201,168,76,0.2)',
        borderBottom: '1px solid rgba(201,168,76,0.08)',
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 4rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}>
          {STATS.map(({ num, label }, i) => (
            <div key={label} style={{
              textAlign: 'center',
              padding: '2.2rem 1rem',
              borderRight: i < 3 ? '1px solid rgba(201,168,76,0.1)' : 'none',
            }}>
              <div
                className="stat-num"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                  fontWeight: 300,
                  lineHeight: 1,
                  color: 'var(--gold)',
                  letterSpacing: '0.02em',
                }}
              >
                {num}
              </div>
              <div style={{
                fontSize: '0.58rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginTop: '0.5rem',
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
