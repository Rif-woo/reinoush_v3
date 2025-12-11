'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CHRISTMAS_ENABLED, SNOWFLAKES_COUNT, ANIMATION_DURATION } from '@/lib/christmasConfig';

export default function ChristmasSnowflakes() {
  const containerRef = useRef(null);
  const snowflakesRef = useRef([]);

  useEffect(() => {
    if (!CHRISTMAS_ENABLED) return;

    // Vérifier prefers-reduced-motion pour l'accessibilité
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (!containerRef.current) return;

    const snowflakes = [];
    const container = containerRef.current;

    // Créer les flocons de neige
    for (let i = 0; i < SNOWFLAKES_COUNT; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.textContent = '❄';
      snowflake.style.left = `${Math.random() * 100}%`;
      snowflake.style.fontSize = `${Math.random() * 1 + 0.5}em`;
      snowflake.style.opacity = Math.random() * 0.4 + 0.3;

      container.appendChild(snowflake);
      snowflakes.push(snowflake);

      // Animation GSAP pour chaque flocon
      gsap.fromTo(
        snowflake,
        {
          y: -20,
          rotation: 0,
        },
        {
          y: window.innerHeight + 20,
          x: gsap.utils.random(-100, 100),
          rotation: gsap.utils.random(0, 360),
          duration: gsap.utils.random(ANIMATION_DURATION.min, ANIMATION_DURATION.max),
          delay: gsap.utils.random(0, 5),
          repeat: -1,
          ease: 'none',
          onRepeat: function() {
            // Réinitialiser la position X aléatoirement à chaque répétition
            gsap.set(snowflake, {
              x: 0,
              left: `${Math.random() * 100}%`,
            });
          },
        }
      );
    }

    snowflakesRef.current = snowflakes;

    // Cleanup
    return () => {
      gsap.killTweensOf(snowflakes);
      snowflakes.forEach(s => s.remove());
    };
  }, []);

  if (!CHRISTMAS_ENABLED) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
    />
  );
}
