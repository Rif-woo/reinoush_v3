'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CHRISTMAS_ENABLED } from '@/lib/christmasConfig';

export default function ChristmasCorners() {
  const topLeftRef = useRef(null);
  const topRightRef = useRef(null);

  useEffect(() => {
    if (!CHRISTMAS_ENABLED) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Animation pour les décorations
    if (topLeftRef.current) {
      gsap.to(topLeftRef.current, {
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    if (topRightRef.current) {
      gsap.to(topRightRef.current, {
        rotation: -5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    return () => {
      gsap.killTweensOf([topLeftRef.current, topRightRef.current]);
    };
  }, []);

  if (!CHRISTMAS_ENABLED) return null;

  return (
    <>
      {/* Décoration coin supérieur gauche */}
      <div
        ref={topLeftRef}
        className="absolute top-4 left-4 z-10 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-70"
        >
          {/* Branches de sapin */}
          <path
            d="M10,20 Q15,15 20,20 Q25,15 30,20"
            stroke="#2D7A3E"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M8,28 Q15,23 22,28 Q29,23 36,28"
            stroke="#2D7A3E"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Baies rouges */}
          <circle cx="15" cy="22" r="3" fill="#C41E3A" />
          <circle cx="25" cy="22" r="3" fill="#C41E3A" />
          <circle cx="18" cy="30" r="3" fill="#C41E3A" />
        </svg>
      </div>

      {/* Décoration coin supérieur droit */}
      <div
        ref={topRightRef}
        className="absolute top-4 right-4 z-10 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-70"
        >
          {/* Branches de sapin (miroir) */}
          <path
            d="M50,20 Q45,15 40,20 Q35,15 30,20"
            stroke="#2D7A3E"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M52,28 Q45,23 38,28 Q31,23 24,28"
            stroke="#2D7A3E"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Baies rouges */}
          <circle cx="45" cy="22" r="3" fill="#C41E3A" />
          <circle cx="35" cy="22" r="3" fill="#C41E3A" />
          <circle cx="42" cy="30" r="3" fill="#C41E3A" />
        </svg>
      </div>
    </>
  );
}
