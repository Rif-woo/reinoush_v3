'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CHRISTMAS_ENABLED } from '@/lib/christmasConfig';

export default function ChristmasDecor() {
  const decorRef = useRef(null);

  useEffect(() => {
    if (!CHRISTMAS_ENABLED) return;

    // Vérifier prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (!decorRef.current) return;

    // Animation de balancement doux
    gsap.to(decorRef.current, {
      rotation: 4,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => {
      gsap.killTweensOf(decorRef.current);
    };
  }, []);

  if (!CHRISTMAS_ENABLED) return null;

  return (
    <div
      ref={decorRef}
      className="inline-flex items-center justify-center ml-2 transition-transform hover:scale-110"
      title="Joyeuses fêtes!"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-green-600"
      >
        {/* Sapin de Noël stylisé */}
        <path
          d="M12 2L9 8H7L10 12H8L12 18L16 12H14L17 8H15L12 2Z"
          fill="currentColor"
          opacity="0.8"
        />
        {/* Étoile au sommet */}
        <circle cx="12" cy="2" r="1.5" fill="#FFD700" />
        {/* Tronc */}
        <rect x="11" y="18" width="2" height="3" fill="#8B4513" rx="0.5" />
      </svg>
    </div>
  );
}
