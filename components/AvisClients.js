"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "./ui/SectionTitle";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function AvisClients() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);
    const arrowsRef = useRef([]);

    const avis = [
        {
            id: 1,
            text: "Merci beaucoup pour les parfums ! 🤩 Chaque flacon est une véritable explosion de joie ! Je suis super contente d'avoir pris les quatre, ils sont tous incroyables. Continue à nous faire découvrir des trésors olfactifs comme ceux-ci !.",
            author: "Anna Biagi",
            rating: 1
        },
        {
            id: 2,
            text: "Merci pour le parfum ça sent hyper bon en plus du petit cadeau dedans ❤️❤️🥰c'est la meilleure j'aime trop.",
            author: "Cheikhouna Balle",
            rating: 2
        },
        {
            id: 3,
            text: "Merci beaucoup pour les parfums ! 🤩 Chaque flacon est une véritable explosion de joie ! Je suis super contente d'avoir pris les quatre, ils sont tous incroyables. Continue à nous faire découvrir des trésors olfactifs comme ceux-ci !.",
            author: "Anna Biagi",
            rating: 3
        }
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % avis.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + avis.length) % avis.length);
    };

    const renderStars = (rating) => {
        return Array.from({ length: rating }, (_, index) => (
            <span key={index} className="text-2xl ">❤️</span>
        ));
    };

    const getVisibleAvis = () => {
        const visible = [];
        for (let i = 0; i < 3; i++) {
            const index = (currentIndex + i) % avis.length;
            visible.push(avis[index]);
        }
        return visible;
    };

    // Animation lors du changement de slide
    const animateSlideChange = () => {
        if (cardsRef.current.length > 0) {
            // Animation de sortie
            gsap.to(cardsRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                ease: "power2.out",
                onComplete: () => {
                    // Animation d'entrée
                    gsap.fromTo(cardsRef.current, 
                        {
                            opacity: 0,
                            y: 30,
                            scale: 0.95
                        },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.6,
                            ease: "power3.out",
                            stagger: 0.1
                        }
                    );
                }
            });
        }
    };

    // Animations initiales
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animation du titre
            gsap.fromTo(titleRef.current,
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Animation des flèches
            gsap.fromTo(arrowsRef.current,
                {
                    opacity: 0,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Animation initiale des cartes
            gsap.fromTo(cardsRef.current,
                {
                    opacity: 0,
                    y: 60,
                    scale: 0.9
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Animation de hover pour les cartes
            cardsRef.current.forEach((card) => {
                if (card) {
                    card.addEventListener('mouseenter', () => {
                        gsap.to(card, {
                            y: -10,
                            scale: 1.02,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    });

                    card.addEventListener('mouseleave', () => {
                        gsap.to(card, {
                            y: 0,
                            scale: 1,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    });
                }
            });

            // Animation de hover pour les flèches
            arrowsRef.current.forEach((arrow) => {
                if (arrow) {
                    arrow.addEventListener('mouseenter', () => {
                        gsap.to(arrow, {
                            scale: 1.1,
                            duration: 0.2,
                            ease: "power2.out"
                        });
                    });

                    arrow.addEventListener('mouseleave', () => {
                        gsap.to(arrow, {
                            scale: 1,
                            duration: 0.2,
                            ease: "power2.out"
                        });
                    });
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Animation lors du changement d'index
    useEffect(() => {
        if (cardsRef.current.length > 0) {
            animateSlideChange();
        }
    }, [currentIndex]);

    return (
        <div ref={sectionRef} className="w-full max-w-fit mx-auto flex flex-col justify-center items-center border-2 py-8 sm:py-12 lg:py-16 px-4 ">
            {/* Section Title */}
            <div className="w-full mb-6 sm:mb-8 lg:mb-12">
                <div className="flex justify-center">
                    <div ref={titleRef} className="flex items-center gap-2 sm:gap-3">
                        <div className="flex gap-2 items-center">
                           <div className="relative w-6 h-6 sm:w-7 sm:h-7">
                                <Image
                                    src="/star_filled.svg"
                                    alt="star"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-anon)] text-center">
                                Vos Avis, Notre Plus Belle Fragrance
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Carousel Container */}
            <div className="relative w-full">
                {/* Navigation Arrows - Desktop */}
                <button 
                    ref={(el) => arrowsRef.current[0] = el}
                    onClick={prevSlide}
                    className=" hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-3 lg:p-4 hover:opacity-70 transition-opacity"
                    aria-label="Avis précédent"
                >
                    <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button 
                    ref={(el) => arrowsRef.current[1] = el}
                    onClick={nextSlide}
                    className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-3 lg:p-4 hover:opacity-70 transition-opacity"
                    aria-label="Avis suivant"
                >
                    <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Avis Cards */}
                <div className="flex flex-col md:flex-row justify-center gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-4 lg:px-16 ">
                    {/* Sur mobile, on affiche seulement 1 carte, sur tablette 2, sur desktop 3 */}
                    <div className="block md:hidden w-full bg-[#FFF8E6]">
                        {/* Version mobile - 1 carte */}
                        <div 
                            key={`${avis[currentIndex].id}-mobile`}
                            ref={(el) => cardsRef.current[0] = el}
                            className="w-full border-2 rounded-lg p-4 sm:p-6 flex flex-col justify-between min-h-[280px] "
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {renderStars(avis[currentIndex].rating)}
                            </div>
                            
                            {/* Review Text */}
                            <div className="flex-1">
                                <p className="text-base leading-relaxed font-[family-name:var(--font-anon)] text-gray-800">
                                    {avis[currentIndex].text}
                                </p>
                            </div>
                            
                            {/* Author */}
                            <div className="mt-6">
                                <p className="text-base font-italic font-[family-name:var(--font-anon)] text-gray-700">
                                    {avis[currentIndex].author}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Version tablette et desktop */}
                    <div className="hidden md:flex justify-center gap-4 sm:gap-6 lg:gap-8 w-full">
                        {getVisibleAvis().map((avisItem, index) => (
                            <div 
                                key={`${avisItem.id}-${index}`}
                                ref={(el) => cardsRef.current[index] = el}
                                className="flex-1 max-w-sm bg-[#FFF8E6] border-2 rounded-lg p-4 sm:p-6 lg:p-8 flex flex-col justify-between min-h-[300px] sm:min-h-[320px] lg:min-h-[350px]"
                            >
                                {/* Stars */}
                                <div className="flex gap-2 mb-6 ">
                                    {renderStars(avisItem.rating)}
                                </div>
                                
                                {/* Review Text */}
                                <div className="flex-1">
                                    <p className="text-lg leading-relaxed font-[family-name:var(--font-anon)] text-gray-800">
                                        {avisItem.text}
                                    </p>
                                </div>
                                
                                {/* Author */}
                                <div className="mt-8">
                                    <p className="text-lg font-italic font-[family-name:var(--font-anon)] text-gray-700">
                                        {avisItem.author}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Navigation mobile */}
                <div className="md:hidden mt-6 flex justify-center items-center gap-4">
                    <button 
                        onClick={prevSlide}
                        className="p-2 rounded-full border-2 border-black hover:bg-gray-100 transition-all duration-200"
                        aria-label="Avis précédent"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    
                    {/* Pagination dots */}
                    <div className="flex gap-2">
                        {avis.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                    index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
                                }`}
                                aria-label={`Aller à l'avis ${index + 1}`}
                            />
                        ))}
                    </div>
                    
                    <button 
                        onClick={nextSlide}
                        className="p-2 rounded-full border-2 border-black hover:bg-gray-100 transition-all duration-200"
                        aria-label="Avis suivant"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
