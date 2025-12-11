'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CHRISTMAS_ENABLED } from '@/lib/christmasConfig';

export default function ChristmasMessage() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const messageRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);

    // Vérifier si l'utilisateur a déjà fermé le message
    const dismissed = localStorage.getItem('christmas-message-dismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
      return;
    }

    // Vérifier prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && messageRef.current) {
      // Animation d'entrée
      gsap.fromTo(
        messageRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, []);

  const handleDismiss = () => {
    if (messageRef.current) {
      gsap.to(messageRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          setIsVisible(false);
          localStorage.setItem('christmas-message-dismissed', 'true');
        },
      });
    } else {
      setIsVisible(false);
      localStorage.setItem('christmas-message-dismissed', 'true');
    }
  };

  if (!CHRISTMAS_ENABLED || !isVisible || !isMounted) return null;

  return (
    <div
      ref={messageRef}
      className="bg-gradient-to-r from-primaryBG via-[#FFF8E6] to-primaryBG py-3 px-4 relative z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center relative">
        <p className="text-center text-sm md:text-base font-medium text-accent">
          Joyeuses Fêtes et bonnes découvertes avec Reinoush
        </p>

        <button
          onClick={handleDismiss}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:bg-black/5 rounded-full transition-colors"
          aria-label="Fermer le message"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-accent"
          >
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
