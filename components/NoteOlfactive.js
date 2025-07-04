'use client'

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "./ui/SectionTitle";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const productsData = [
  { 
    id: 1, 
    name: "Grace", 
    image: "/Grace50.PNG", 
    price: "5000 Fcfa", 
    type: "Femme", 
    volume: "50ml", 
    description: "Un parfum à la fois raffiné et élégant, incarnant la grâce féminine",
    note_de_coeur: ["Rose de Bulgarie", "Jasmin", "Pivoine"],
    note_de_tete: ["Bergamote", "Citron", "Cassis"], 
    note_de_fond: ["Musc blanc", "Cèdre", "Ambre"]
  },
  { 
    id: 2, 
    name: "Mighty", 
    image: "/Mighty50.PNG", 
    price: "3000 Fcfa", 
    type: "Femme", 
    volume: "30ml", 
    description: "Une fragrance puissante qui révèle votre force intérieure",
    note_de_coeur: ["Épices orientales", "Cannelle", "Cardamome"], 
    note_de_tete: ["Poivre noir", "Gingembre", "Mandarine"], 
    note_de_fond: ["Oud", "Patchouli", "Vanille"]
  },
  { 
    id: 3, 
    name: "Favor", 
    image: "/Grace50.PNG", 
    price: "5000 Fcfa", 
    type: "Femme", 
    volume: "50ml", 
    description: "Le parfum de la séduction et du charme irrésistible",
    note_de_coeur: ["Ylang-ylang", "Tubéreuse", "Gardénia"], 
    note_de_tete: ["Pêche", "Litchi", "Freesia"], 
    note_de_fond: ["Santal", "Mousse de chêne", "Tonka"]
  },
  { 
    id: 4, 
    name: "Mystique", 
    image: "/Grace50.PNG", 
    price: "3000 Fcfa", 
    type: "Femme", 
    volume: "30ml", 
    description: "Une aura mystérieuse qui captive et intrigue",
    note_de_coeur: ["Iris", "Violette", "Magnolia"],
    note_de_tete: ["Aldéhydes", "Néroli", "Petit grain"], 
    note_de_fond: ["Encens", "Myrrhe", "Bois de rose"]
  },
  { 
    id: 5, 
    name: "Lumière", 
    image: "/Grace50.PNG", 
    price: "5000 Fcfa", 
    type: "Femme", 
    volume: "50ml", 
    description: "La luminosité d'un matin de printemps en bouteille",
    note_de_coeur: ["Muguet", "Lilas", "Cyclamen"], 
    note_de_tete: ["Citron vert", "Menthe", "Basilic"],
    note_de_fond: ["Musc", "Bois de santal", "Cachemire"]
  },
];
// Composant pour les notes individuelles avec animation
const NoteItem = ({ note, delay = 0 }) => {
  const noteRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(noteRef.current, 
      { 
        opacity: 0, 
        y: 20,
        scale: 0.8
      }, 
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: delay,
        ease: "back.out(1.7)"
      }
    );
  }, [delay]);
  
  return (
    <div 
      ref={noteRef}
      className="text-base md:text-base text-gray-700 italic hover:text-black transition-colors duration-300 cursor-pointer"
    >
      {note}
    </div>
  );
};

// Composant pour chaque section de notes
const NotesSection = ({ title, notes }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (isVisible && sectionRef.current) {
      gsap.fromTo(sectionRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [isVisible]);
  
  return (
    <div ref={sectionRef} className="mb-8 lg:mb-10">
      <h3 className="text-lg lg:text-xl font-bold text-black mb-2 lg:mb-3">
        {title}
      </h3>
      <div className="w-full h-px bg-black mb-4 lg:mb-6"></div>
      <div className="space-y-2">
        {notes.map((note, index) => (
          <NoteItem key={index} note={note} delay={index * 0.1} />
        ))}
      </div>
    </div>
  );
};

export default function NoteOlfactive() {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const productInfoRef = useRef(null);
  const notesRef = useRef(null);
  
  // Animation d'entrée du composant
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);
  
  // Animation lors du changement de produit
  const changeProduct = (newIndex) => {
    if (isAnimating || newIndex === index) return;
    
    setIsAnimating(true);
    
    // Animation de sortie
    const tl = gsap.timeline();
    
    tl.to([imageRef.current, productInfoRef.current, notesRef.current], {
      opacity: 0,
      x: newIndex > index ? -50 : 50,
      duration: 0.4,
      ease: "power2.in"
    })
    .call(() => {
      setIndex(newIndex);
    })
    .to([imageRef.current, productInfoRef.current, notesRef.current], {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1
    })
    .call(() => {
      setIsAnimating(false);
    });
  };
  
  const currentProduct = productsData[index];
  
  return (
    <div 
      ref={containerRef}
      className="flex flex-col justify-center items-center w-full px-4 sm:px-8 lg:px-0 xl:px-44 py-12 lg:py-20 gap-12 lg:gap-20 "
    >
      <SectionTitle title="Notes Olfactives" seeAll={false} />
      
      {/* Conteneur principal responsive */}
      <div className="flex flex-col xl:flex-row justify-between items-center xl:items-center w-full gap-8 lg:gap-12 xl:gap-16">
        
        {/* Section informations produit */}
        <div 
          ref={productInfoRef}
          className="flex flex-col justify-start items-center xl:items-start gap-6 lg:gap-8 w-full xl:w-1/4 text-center xl:text-left"
        >
          <div className="space-y-4 lg:space-y-6">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-black">
              {currentProduct.name}
            </h2>
            
            <p className="text-lg lg:text-xl xl:text-2xl text-gray-800 leading-relaxed max-w-md">
              {currentProduct.description}
            </p>
          </div>
          
          <button className="bg-[#FFF8E6] hover:bg-[#F5EFD6] text-black px-8 py-3 border border-black font-medium text-base transition-colors duration-300">
            Acheter
          </button>
          
          {/* Navigation */}
          <div className="flex items-center gap-6 lg:gap-8">
            <button 
              className="relative cursor-pointer w-10 h-10 lg:w-12 lg:h-12 hover:scale-110 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
              onClick={() => changeProduct(Math.max(0, index - 1))}
              disabled={index === 0 || isAnimating}
            >
              <Image
                src="/arrow-left.svg"
                alt="Précédent"
                fill
                style={{ objectFit: 'contain' }}
              />
            </button>
            
            <span className="text-2xl lg:text-3xl font-medium text-black">
              {currentProduct.id}
            </span>
            
            <button 
              className="relative cursor-pointer w-10 h-10 lg:w-12 lg:h-12 hover:scale-110 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
              onClick={() => changeProduct(Math.min(productsData.length - 1, index + 1))}
              disabled={index === productsData.length - 1 || isAnimating}
            >
              <Image
                src="/arrow-right.svg"
                alt="Suivant"
                fill
                style={{ objectFit: 'contain' }}
              />
            </button>
          </div>
        </div>
        
        {/* Image du produit */}
        <div 
          ref={imageRef}
          className="relative w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-[480px] xl:w-[320px] xl:h-[500px] group"
        >
          <div className="relative w-full h-full bg-white rounded-lg overflow-hidden shadow-lg transform group-hover:scale-105 transition-all duration-500">
            <Image
              src={currentProduct.image}
              alt={currentProduct.name}
              fill
              style={{ objectFit: 'cover' }}
              className="opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        </div>
        
        {/* Section des notes */}
        <div 
          ref={notesRef}
          className="w-full xl:w-1/4 border border-black p-6 lg:p-8"
        >
          <div className="space-y-6 lg:space-y-8">
            <NotesSection 
              title="Notes de coeur" 
              notes={currentProduct.note_de_coeur}
            />
            
            <NotesSection 
              title="Notes de tete" 
              notes={currentProduct.note_de_tete}
            />
            
            <NotesSection 
              title="Notes de fond" 
              notes={currentProduct.note_de_fond}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
