'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionTitle from './ui/SectionTitle';

const Contact = () => {
  // Numéro WhatsApp de la manageuse (remplacez par le vrai numéro)
  const whatsappNumber = "+33789080132"; // Format international
  const whatsappMessage = "Bonjour, je souhaite avoir des informations sur vos parfums Reinoush.";
  
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="w-full max-w-fit py-12 sm:py-6 lg:py-6" id='contact'>
      {/* Section principale avec background */}
      <div className="relative w-full min-h-[50vh] sm:min-h-[55vh] lg:min-h-[40vh] flex flex-col items-center justify-center overflow-hidden">
        
        {/* Overlay pour améliorer la lisibilité */}
        <div className="absolute inset-0 z-10"></div>
        
        {/* Contenu principal */}
        <div className="relative z-20 text-center space-y-6 sm:space-y-8 px-6 sm:px-8 lg:px-12 max-w-2xl mx-auto">
          {/* Titre */}
          <div className="flex items-center justify-center">
            <SectionTitle title="Contact" seeAll={false}></SectionTitle>
          </div>

          {/* Description */}
          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-xl sm:text-xl lg:text-xl xl:text-2xl text-black font-bold leading-tight">
              Une question sur nos parfums ?
            </h2>
            <p className="text-base sm:text-lg lg:text-lg text-black/90 font-light leading-relaxed">
              Notre manageuse est à votre écoute pour vous conseiller et répondre à toutes vos questions.
            </p>
          </div>

          {/* Boutons de contact */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-4">
            {/* Bouton WhatsApp */}
            <button 
              onClick={handleWhatsAppClick}
              className="group bg-green-500 hover:bg-green-600 cursor-pointer text-white px-3 py-3 text-base font-semibold transition-all duration-300 rounded-lg flex items-center gap-3 transform hover:scale-105"
            >
              <Image 
                src="/icons8-whatsapp-144.svg" 
                alt="WhatsApp" 
                width={24} 
                height={24}
                className="group-hover:scale-110 transition-transform duration-300"
              />
              Contacter sur WhatsApp
            </button>
            
            {/* Bouton Email alternatif */}
            <Link 
              href="cissreinejosephine@gmail.com"
              className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-black border-2 border-white/30 hover:border-white/50 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-300 rounded-lg flex items-center gap-3"
            >
              <Image 
                src="/icons8-gmail-nouveau.svg" 
                alt="Email" 
                width={24} 
                height={24}
                className="group-hover:scale-110 transition-transform duration-300"
              />
              Envoyer un Email
            </Link>
          </div>
        </div>
      </div>
        
        {/* Section informations de contact */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 max-w-4xl mx-auto">
            {/* Horaires */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-black/5 rounded-full flex items-center justify-center">
                <Image src="/icons8-horloge.svg" alt="Horaires" width={32} height={32} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Horaires</h3>
              <div className="text-sm sm:text-base text-gray-600 space-y-1">
                <p>Lundi - Vendredi: 9h - 18h</p>
                <p>Samedi: 10h - 17h</p>
                <p>Dimanche: Fermé</p>
              </div>
            </div>
            
            {/* Réponse rapide */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-50 rounded-full flex items-center justify-center">
                <Image src="/icons8-message.svg" alt="Réponse rapide" width={32} height={32} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Réponse rapide</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Réponse sous 2h sur WhatsApp en journée
              </p>
            </div>
            
            {/* Support personnalisé */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center">
                <Image src="/icons8-support-en-ligne-50.png" alt="Support" width={32} height={32} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Conseils personnalisés</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Aide au choix de parfums selon vos préférences
              </p>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Contact;
