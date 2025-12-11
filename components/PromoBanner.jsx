'use client';

import { useState } from 'react';

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative w-full bg-gradient-to-r from-[#C41E3A] via-[#165B33] to-[#C41E3A] text-white py-3 px-4 text-center overflow-hidden"
         style={{
           backgroundSize: '200% 200%',
           animation: 'christmasGradient 5s ease infinite',
         }}>
      {/* Effet de brillance animé */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
        style={{
          animation: 'shine 3s infinite',
        }}
      />

      {/* Guirlandes décoratives en haut */}
      <div className="absolute top-0 left-0 right-0 flex justify-around text-2xl" style={{ animation: 'sway 3s ease-in-out infinite' }}>
        <span>🎄</span>
        <span>⭐</span>
        <span>🎁</span>
        <span>❄️</span>
        <span>🔔</span>
        <span className="max-sm:hidden">🎄</span>
        <span className="max-sm:hidden">⭐</span>
        <span className="max-sm:hidden">🎁</span>
      </div>

      <div className="relative z-10 flex items-center justify-center gap-2 flex-wrap">
        <span className="text-sm sm:text-base md:text-lg font-bold flex items-center gap-1">
          🎅 PROMOTION -10% avec le code
        </span>
        <span className="bg-white text-[#C41E3A] px-3 py-1 rounded-md font-bold text-sm sm:text-base md:text-lg shadow-lg">
          REINOUSH2025
        </span>
        <span className="text-xl">🎄</span>
      </div>

      {/* Bouton de fermeture */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-gray-200 transition-colors z-20 w-6 h-6 flex items-center justify-center"
        aria-label="Fermer la bannière"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes christmasGradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes sway {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
        }
      `}</style>
    </div>
  );
}
