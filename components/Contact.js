import React from 'react';
import Image from 'next/image';
import SectionTitle from './ui/SectionTitle';

const Contact = () => {
  return (
    <div className="w-full flex justify-center items-center py-8 sm:py-12 lg:py-16" id='contact'>
      <div className="relative w-10/12 min-h-[35vh] sm:min-h-[40vh] lg:min-h-[45vh] flex flex-col items-center justify-center rounded-lg overflow-hidden">
        <Image 
          src="/contactBG.png"
          alt="Contact background"
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center'
          }}
          className="z-0"
        />
        {/* Contenu principal */}
        <div className="relative z-20 text-center space-y-4 sm:space-y-6 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto">
          {/* Titre avec étoile */}
          <div className="flex items-center justify-center space-x-2 sm:space-x-3">
            <SectionTitle title="Contact" seeAll={false}></SectionTitle>
          </div>

          {/* Sous-titre */}
          <div className="space-y-1 sm:space-y-2">
            <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-black font-light leading-relaxed">
              Une question ? Notre équipe
            </p>
            <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-black font-light leading-relaxed">
              est à votre écoute.
            </p>
          </div>

          {/* Bouton Contact */}
          <div className="pt-2 sm:pt-3 lg:pt-4">
            <button className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 text-sm sm:text-base lg:text-lg font-medium hover:bg-gray-800 transition-colors duration-300 rounded-none">
              Contactez nous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
