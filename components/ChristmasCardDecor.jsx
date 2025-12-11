'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CHRISTMAS_ENABLED } from '@/lib/christmasConfig';

export default function ChristmasCardDecor() {
  const decorRef = useRef(null);

  useEffect(() => {
    if (!CHRISTMAS_ENABLED) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (!decorRef.current) return;

    const container = decorRef.current;
    const numberOfStars = 4;

    // Créer des petites étoiles autour de la carte
    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement('div');
      star.className = 'christmas-card-star';
      star.innerHTML = '✨';

      // Positionner les étoiles aux coins
      const positions = [
        { top: '-8px', left: '-8px' },
        { top: '-8px', right: '-8px' },
        { bottom: '-8px', left: '-8px' },
        { bottom: '-8px', right: '-8px' }
      ];

      star.style.position = 'absolute';
      star.style.fontSize = '1.2em';
      star.style.pointerEvents = 'none';
      star.style.zIndex = '10';
      Object.assign(star.style, positions[i]);

      container.appendChild(star);

      // Animation de scintillement
      gsap.to(star, {
        opacity: 0.3,
        scale: 0.8,
        duration: 1.5 + i * 0.2,
        delay: i * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // Légère rotation
      gsap.to(star, {
        rotation: 360,
        duration: 4 + i,
        repeat: -1,
        ease: 'none',
      });
    }

    return () => {
      const stars = container.querySelectorAll('.christmas-card-star');
      gsap.killTweensOf(stars);
      stars.forEach(star => star.remove());
    };
  }, []);

  if (!CHRISTMAS_ENABLED) return null;

  return (
    <div
      ref={decorRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
