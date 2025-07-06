"use client";

import Link from "next/link";
import { useState } from 'react';
import CartIcon from './CartIcon';
import Cart from './Cart';

export default function NavBar() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    return (
        <>
            <nav className="bg-[#FCFAF5] shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link 
                                href="/"
                                className="text-black text-xl sm:text-2xl lg:text-3xl font-bold"
                            >
                                REINOUSH
                            </Link>
                        </div>

                        {/* Menu Desktop */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link 
                                    href="/"
                                    className="text-black hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Accueil
                                </Link>
                                <Link 
                                    href="/parfum-homme"
                                    className="text-black hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Parfum Hommes
                                </Link>
                                <Link 
                                    href="/parfum-femme"
                                    className="text-black hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Parfum Femmes
                                </Link>
                                <Link 
                                    href="/produits"
                                    className="text-black hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Produits
                                </Link>
                                <Link 
                                    href="/apropos"
                                    className="text-black hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    À propos
                                </Link>
                                <Link 
                                    href="/contact"
                                    className="text-black hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Contact
                                </Link>
                            </div>
                        </div>

                        {/* Cart et Menu Mobile */}
                        <div className="flex items-center space-x-4">
                            <CartIcon 
                                onClick={() => setIsCartOpen(true)}
                                className=""
                            />
                            
                            {/* Bouton Menu Mobile */}
                            <div className="md:hidden">
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black transition-colors"
                                    aria-expanded="false"
                                >
                                    <span className="sr-only">Ouvrir le menu principal</span>
                                    {/* Icône Hamburger */}
                                    {!isMobileMenuOpen ? (
                                        <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    ) : (
                                        <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu Mobile */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
                            <Link 
                                href="/"
                                className="text-black hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Accueil
                            </Link>
                            <Link 
                                href="/parfum-homme"
                                className="text-black hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Parfum Homme
                            </Link>
                            <Link 
                                href="/parfum-femme"
                                className="text-black hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Parfum Femme
                            </Link>
                            <Link 
                                href="/produits"
                                className="text-black hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Produits
                            </Link>
                            <Link 
                                href="/apropos"
                                className="text-black hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                À propos
                            </Link>
                            <Link 
                                href="/contact"
                                className="text-black hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
            
            <Cart 
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </>
    );
}
