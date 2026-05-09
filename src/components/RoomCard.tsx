'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface RoomCardProps {
  category: string;
  name: string;
  images: string[];
  price: number;
  size: number;
  view: string;
  capacity: number;
  badge?: string;
}

export default function RoomCard({
  category,
  name,
  images,
  price,
  size,
  view,
  capacity,
  badge,
}: RoomCardProps) {
  const [idx, setIdx] = useState(0);

  return (
    <div
      className="room-card reveal"
      style={{
        background: 'var(--dark)',
        overflow: 'hidden',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div
        className="room-img-wrap"
        style={{ position: 'relative', height: '260px', overflow: 'hidden' }}
      >
        <Image
          src={images[idx]}
          alt={name}
          fill
          style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {badge && (
          <div
            className="room-badge"
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              background: 'var(--gold)',
              color: 'var(--black)',
              padding: '0.3rem 0.8rem',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 600,
              zIndex: 2,
            }}
          >
            {badge}
          </div>
        )}
        {images.length > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: '0.8rem',
              right: '0.8rem',
              display: 'flex',
              gap: '0.3rem',
              zIndex: 2,
            }}
          >
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: i === idx ? 'var(--gold)' : 'rgba(250,248,244,0.4)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="room-body" style={{ padding: '1.5rem' }}>
        <div
          className="room-type"
          style={{
            fontSize: '0.55rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '0.4rem',
          }}
        >
          {category}
        </div>
        <div
          className="room-name"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 300,
            marginBottom: '0.8rem',
          }}
        >
          {name}
        </div>
        <div
          className="room-features"
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}
        >
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{size} m²</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{view}</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{capacity} Kişi</span>
        </div>
        <div
          className="room-footer"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
        >
          <div>
            <div
              className="room-price-num"
              style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300 }}
            >
              ₺{price}
            </div>
            <div
              className="room-price-unit"
              style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}
            >
              / Gecelik
            </div>
          </div>
          <Link
            href="/odalarimiz"
            className="room-cta"
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            Detaylar
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
