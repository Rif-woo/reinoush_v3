'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CHRISTMAS_ENABLED } from '@/lib/christmasConfig';

export default function ChristmasStars() {
  const starsContainerRef = useRef(null);

  useEffect(() => {
    if (!CHRISTMAS_ENABLED) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (!starsContainerRef.current) return;

    const container = starsContainerRef.current;
    const numberOfStars = 15;

    // Créer les étoiles
    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement('div');
      star.className = 'christmas-star';
      star.innerHTML = '✨';

      // Position aléatoire
      star.style.position = 'absolute';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.fontSize = `${Math.random() * 1 + 0.8}em`;
      star.style.pointerEvents = 'none';
      star.style.zIndex = '2';

      container.appendChild(star);

      // Animation de scintillement
      gsap.to(star, {
        opacity: 0,
        scale: 1.5,
        duration: gsap.utils.random(1.5, 3),
        delay: gsap.utils.random(0, 5),
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // Légère rotation
      gsap.to(star, {
        rotation: gsap.utils.random(-15, 15),
        duration: gsap.utils.random(2, 4),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    return () => {
      const stars = container.querySelectorAll('.christmas-star');
      gsap.killTweensOf(stars);
      stars.forEach(star => star.remove());
    };
  }, []);

  if (!CHRISTMAS_ENABLED) return null;

  return (
    <div
      ref={starsContainerRef}
      className="absolute inset-0 pointer-events-none z-[2]"
      aria-hidden="true"
    />
  );
}
