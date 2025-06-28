"use client";

import { useCart } from '@/contexts/CartContext';

export default function CartIcon({ onClick, className = "" }) {
  const { totalItems } = useCart();

  return (
    <button
      onClick={onClick}
      className={`relative p-2 text-gray-700 hover:text-black transition-colors ${className}`}
    >
      {/* Icône du panier */}
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>

      {/* Badge avec le nombre d'articles */}
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  );
}
