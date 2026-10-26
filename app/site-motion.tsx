'use client';

import { useEffect, useRef } from 'react';

const revealSelector = '.section-heading, .service-card, .about-visual, .about-copy, .contact-copy, .contact-form, .neighbors h2, .google-reviews-toolbar, .google-review-card, .areas-copy, .area-map, .cta-inner, .footer-main';

export function SiteMotion() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let dispose = () => {};

    function setup() {
      dispose();
      if (reducedMotion.matches) return;

      const animations = new Set<Animation>();
      const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));
      const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          if (element.classList.contains('reveal-awaiting')) {
            const siblings = Array.from(element.parentElement?.children || []);
            const delay = element.matches('.service-card, .google-review-card') ? (siblings.indexOf(element) % 3) * 90 : 0;
            const animation = element.animate([
              { opacity: 0, transform: 'translateY(28px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ], { duration: 720, delay, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both' });
            animations.add(animation);
            animation.onfinish = () => {
              element.classList.remove('reveal-awaiting');
              animation.cancel();
              animations.delete(animation);
            };
          }
          observer?.unobserve(element);
        }
      }, { threshold: .08, rootMargin: '0px 0px -25px 0px' }) : null;

      if (observer) for (const element of elements) {
        if (element.getBoundingClientRect().top > window.innerHeight) element.classList.add('reveal-awaiting');
        observer.observe(element);
      }

      // Offscreen electrical effects pause instead of running throughout the page.
      const circuits = document.querySelectorAll<HTMLElement>('.electrical-current, .hero-energy');
      const circuitObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
        for (const entry of entries) entry.target.classList.toggle('current-in-view', entry.isIntersecting && !document.hidden);
      }, { rootMargin: '80px' }) : null;
      circuits.forEach(element => circuitObserver?.observe(element));

      let frame = 0;
      const updateProgress = () => {
        const range = document.documentElement.scrollHeight - window.innerHeight;
        document.documentElement.style.setProperty('--page-progress', String(range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0));
        frame = 0;
      };
      const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateProgress); };
      const onVisibility = () => circuits.forEach(element => {
        const bounds = element.getBoundingClientRect();
        element.classList.toggle('current-in-view', !document.hidden && bounds.bottom > -80 && bounds.top < window.innerHeight + 80);
      });
      updateProgress();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      document.addEventListener('visibilitychange', onVisibility);

      dispose = () => {
        observer?.disconnect();
        circuitObserver?.disconnect();
        elements.forEach(element => element.classList.remove('reveal-awaiting'));
        circuits.forEach(element => element.classList.remove('current-in-view'));
        animations.forEach(animation => animation.cancel());
        cancelAnimationFrame(frame);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        document.removeEventListener('visibilitychange', onVisibility);
        document.documentElement.style.removeProperty('--page-progress');
      };
    }

    setup();
    reducedMotion.addEventListener('change', setup);
    return () => { dispose(); reducedMotion.removeEventListener('change', setup); };
  }, []);

  return <div className="scroll-current" aria-hidden="true"><span /></div>;
}

const energyParticles = Array.from({ length: 20 }, (_, index) => ({
  left: `${53 + (index * 13) % 44}%`,
  top: `${28 + (index * 17) % 60}%`,
  animationDelay: `${(index * -.83).toFixed(2)}s`,
  animationDuration: `${7 + index % 5}s`,
}));

export function HeroEnergy() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const effect = ref.current;
    const hero = effect?.closest<HTMLElement>('.hero');
    if (!effect || !hero) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      effect.style.removeProperty('--energy-x');
      effect.style.removeProperty('--energy-y');
    };
    const onMove = (event: PointerEvent) => {
      if (reducedMotion.matches || !finePointer.matches || event.pointerType !== 'mouse') return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const bounds = hero.getBoundingClientRect();
        const x = Math.min(1, Math.max(0, (pointerX - bounds.left) / bounds.width));
        const y = Math.min(1, Math.max(0, (pointerY - bounds.top) / bounds.height));
        effect.style.setProperty('--energy-x', `${(x - .5) * 75}px`);
        effect.style.setProperty('--energy-y', `${(y - .5) * 45}px`);
        frame = 0;
      });
    };
    hero.addEventListener('pointermove', onMove, { passive: true });
    hero.addEventListener('pointerleave', reset);
    reducedMotion.addEventListener('change', reset);
    finePointer.addEventListener('change', reset);
    return () => {
      reset();
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', reset);
      reducedMotion.removeEventListener('change', reset);
      finePointer.removeEventListener('change', reset);
    };
  }, []);

  return <div className="hero-energy" ref={ref} aria-hidden="true">
    <div className="hero-energy-focus"><div className="hero-energy-bloom" /><div className="hero-energy-aura" /></div>
    <div className="hero-energy-dust">{energyParticles.map((style, index) => <span key={index} className={`hero-energy-particle particle-size-${index % 3}`} style={style} />)}</div>
  </div>;
}

export function ElectricalCurrent({ variant }: { variant: 'contact' | 'cta' | 'footer' }) {
  const paths = variant === 'footer'
    ? ['M0 90H180L220 130H500', 'M1440 280H1320L1270 330V560L1220 610H950', 'M0 670H170L205 705H730L765 740H1440']
    : variant === 'cta'
    ? ['M0 28H225L252 55H665L692 28H1440', 'M1440 140H1180L1153 113H800L773 140H0']
    : ['M1440 125H1250L1200 75H950L910 115H750', 'M0 645H200L250 595H520L565 640H950L1000 690H1440', 'M1392 0V270L1340 322V510L1392 562V800'];

  return <div className={`electrical-current electrical-current-${variant}`} aria-hidden="true">
    <svg viewBox={variant === 'cta' ? '0 0 1440 170' : '0 0 1440 800'} preserveAspectRatio="none" focusable="false">
      {paths.map((path, index) => <g key={path}>
        <path className="current-track" d={path} fill="none" />
        <path className="current-stream" d={path} fill="none" pathLength="100" style={{ animationDelay: `${index * -2.3}s` }} />
      </g>)}
    </svg>
  </div>;
}
