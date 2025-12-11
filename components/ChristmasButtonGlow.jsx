'use client';

import { useEffect, useRef } from 'react';
import { CHRISTMAS_ENABLED } from '@/lib/christmasConfig';

export default function ChristmasButtonGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    if (!CHRISTMAS_ENABLED) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
  }, []);

  if (!CHRISTMAS_ENABLED) return null;

  return (
    <div
      ref={glowRef}
      className="absolute inset-0 pointer-events-none rounded-sm"
      style={{
        background: 'linear-gradient(45deg, #FF4444, #44DD44, #FFD700, #FF4444)',
        backgroundSize: '300% 300%',
        animation: 'christmasGlow 3s ease infinite',
        opacity: 0.3,
        filter: 'blur(8px)',
        zIndex: -1,
      }}
      aria-hidden="true"
    >
      <style jsx>{`
        @keyframes christmasGlow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
}
