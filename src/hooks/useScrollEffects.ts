'use client';

import { useEffect, useRef, useCallback } from 'react';

interface ScrollEffectsOptions {
  enableParallax?: boolean;
  enableProgress?: boolean;
}

export function useScrollEffects(options: ScrollEffectsOptions = {}) {
  const { enableParallax = false, enableProgress = false } = options;
  const navRef = useRef<HTMLElement | null>(null);

  const setupReveal = useCallback(() => {
    const observer = new IntersectionObserver(
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

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Already visible on page load — show instantly, no animation
        el.classList.add('visible');
      } else {
        observer.observe(el);
      }
    });

    return observer;
  }, []);

  const setupStatCounters = useCallback(() => {
    function animateCounter(el: Element) {
      const original = el.textContent?.trim() ?? '';
      const isK = /k/i.test(original);
      const rawNum = parseFloat(original.replace(/[^\d.]/g, ''));
      const suffix = original.replace(/[\d.]/g, '').replace(/k/gi, '');
      if (isNaN(rawNum) || rawNum === 0) return;
      const duration = 2000;
      const start = performance.now();
      function tick(now: number) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = Math.round(eased * rawNum);
        el.textContent = val + (isK ? 'k' : '') + suffix;
        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = original;
          el.classList.add('shimmer');
        }
      }
      requestAnimationFrame(tick);
    }

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCounter(e.target);
            statsObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('.stat-num').forEach((el) => statsObserver.observe(el));
    return statsObserver;
  }, []);

  useEffect(() => {
    navRef.current = document.querySelector('nav');

    const handleNavScroll = () => {
      navRef.current?.classList.toggle('scrolled', window.scrollY > 50);
    };

    const handleParallax = () => {
      const heroBg = document.getElementById('heroBg');
      if (heroBg) {
        heroBg.style.transform = `scale(1.08) translateY(${window.scrollY * 0.3}px)`;
      }
    };

    const handleProgress = () => {
      const progressBar = document.querySelector<HTMLElement>('.scroll-progress');
      if (progressBar) {
        const total = document.body.scrollHeight - window.innerHeight;
        progressBar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
      }
    };

    const onScroll = () => {
      handleNavScroll();
      if (enableParallax) handleParallax();
      if (enableProgress) handleProgress();
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const revealObserver = setupReveal();
    const statsObserver = setupStatCounters();

    return () => {
      window.removeEventListener('scroll', onScroll);
      revealObserver.disconnect();
      statsObserver.disconnect();
    };
  }, [enableParallax, enableProgress, setupReveal, setupStatCounters]);
}
