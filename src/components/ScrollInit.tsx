'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollInit() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver;

    const rafId = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('visible');
              observer.unobserve(e.target);
            }
          });
        },
        { threshold: 0.05 }
      );

      document.querySelectorAll<Element>('.reveal, .reveal-left, .reveal-right').forEach((el) => {
        el.classList.remove('visible');
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('visible');
        } else {
          observer.observe(el);
        }
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, [pathname]);

  // Scroll progress bar
  useEffect(() => {
    const nav = document.querySelector('nav');
    const progressBar = document.querySelector<HTMLElement>('.scroll-progress');

    const onScroll = () => {
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
      if (progressBar) {
        const total = document.body.scrollHeight - window.innerHeight;
        progressBar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
