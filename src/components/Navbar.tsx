'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '/', label: 'Anasayfa' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/odalarimiz', label: 'Odalarımız' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/aktiviteler', label: 'Aktiviteler' },
  { href: '/iletisim', label: 'İletişim' },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-open', isMenuOpen);
    return () => document.body.classList.remove('nav-open');
  }, [isMenuOpen]);

  const isTransparent = isHome && !isScrolled;

  const navClass = [
    !isTransparent ? 'nav--solid' : '',
    isScrolled ? 'scrolled' : '',
    isMenuOpen ? 'nav-open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={navClass}>
      <Link href="/" className="nav-logo" style={isTransparent ? { textShadow: '0 1px 12px rgba(0,0,0,0.5)' } : {}}>
        <span className="nav-logo-name">HOTEL MASTER</span>
        <span className="nav-logo-sub">Luxury &amp; Excellence</span>
      </Link>

      <ul className="nav-links" style={isTransparent ? { ['--link-color' as string]: 'rgba(255,255,255,0.95)' } : {}}>
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={pathname === href ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
              style={isTransparent ? {
                color: pathname === href ? 'var(--gold)' : 'rgba(255,255,255,0.92)',
                textShadow: '0 1px 10px rgba(0,0,0,0.7)',
              } : {}}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/iletisim"
        className="nav-reserve"
        style={isTransparent ? {
          borderColor: 'rgba(255,255,255,0.6)',
          color: 'rgba(255,255,255,0.92)',
          textShadow: '0 1px 8px rgba(0,0,0,0.5)',
        } : {}}
      >
        Rezervasyon Yap
      </Link>

      <button
        className="nav-toggle"
        aria-label="Menüyü aç"
        onClick={() => setIsMenuOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
