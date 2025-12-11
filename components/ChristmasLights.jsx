'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CHRISTMAS_ENABLED } from '@/lib/christmasConfig';

export default function ChristmasLights() {
  const lightsContainerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!CHRISTMAS_ENABLED) return;

    // Vérifier prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (!lightsContainerRef.current) return;

    const container = lightsContainerRef.current;
    const lights = container.querySelectorAll('.light-bulb');

    // Animer chaque ampoule avec un délai différent pour créer un effet de scintillement
    lights.forEach((light, index) => {
      gsap.to(light, {
        opacity: 0.3,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: index * 0.15, // Décalage pour effet cascade
      });

      // Animation de balancement léger
      gsap.to(light, {
        y: '+=3',
        duration: 2 + (index % 3) * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.1,
      });
    });

    // Gérer le scroll pour cacher les guirlandes
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 50 && isVisible) {
        // Cacher les guirlandes
        gsap.to(container, {
          opacity: 0,
          y: -50,
          duration: 0.3,
          ease: 'power2.out',
        });
        setIsVisible(false);
      } else if (scrollY <= 50 && !isVisible) {
        // Réafficher les guirlandes
        gsap.to(container, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      gsap.killTweensOf(lights);
      gsap.killTweensOf(container);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  if (!CHRISTMAS_ENABLED) return null;

  // Couleurs des ampoules (rouge, vert, jaune, bleu)
  const lightColors = [
    '#FF4444', // Rouge
    '#44DD44', // Vert
    '#FFD700', // Jaune/Or
    '#4444FF', // Bleu
    '#FF4444', // Rouge
    '#44DD44', // Vert
    '#FFD700', // Jaune/Or
    '#4444FF', // Bleu
    '#FF4444', // Rouge
    '#44DD44', // Vert
    '#FFD700', // Jaune/Or
    '#4444FF', // Bleu
    '#FF4444', // Rouge
    '#44DD44', // Vert
    '#FFD700', // Jaune/Or
  ];

  return (
    <div
      ref={lightsContainerRef}
      className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
      aria-hidden="true"
    >
      {/* Fil de la guirlande */}
      <svg
        className="w-full h-12"
        viewBox="0 0 1200 50"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ligne ondulée pour le fil */}
        <path
          d="M0,25 Q100,15 200,25 T400,25 T600,25 T800,25 T1000,25 T1200,25"
          stroke="#2d3436"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
        />
      </svg>

      {/* Ampoules */}
      <div className="absolute top-0 left-0 right-0 flex justify-around px-4">
        {lightColors.map((color, index) => (
          <div
            key={index}
            className="light-bulb flex flex-col items-center"
            style={{
              filter: 'drop-shadow(0 0 8px ' + color + ')',
            }}
          >
            {/* Douille */}
            <div className="w-3 h-2 bg-gray-700 rounded-sm"></div>
            {/* Ampoule */}
            <div
              className="w-6 h-8 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${color} 0%, ${color}dd 50%, ${color}88 100%)`,
                boxShadow: `0 0 10px ${color}`,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
