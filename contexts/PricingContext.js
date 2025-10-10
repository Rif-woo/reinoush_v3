"use client";

import { createContext, useContext, useEffect, useState } from 'react';

// Mapping des prix selon le volume et la devise
const PRICING = {
  FCFA: {
    '50ml': 8000,
    '30ml': 5000,
    '10ml': 1500,
    '5ml': 1000
  },
  EUR: {
    '50ml': 30,
    '30ml': 20,
    '10ml': 10,
    '5ml': 6
  }
};

// Pays africains (liste non exhaustive des principaux pays)
const AFRICAN_COUNTRIES = [
  'DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CM', 'CV', 'CF', 'TD', 'KM', 'CG', 'CD', 
  'CI', 'DJ', 'EG', 'GQ', 'ER', 'ET', 'GA', 'GM', 'GH', 'GN', 'GW', 'KE', 'LS', 
  'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU', 'MA', 'MZ', 'NA', 'NE', 'NG', 'RW', 
  'ST', 'SN', 'SC', 'SL', 'SO', 'ZA', 'SS', 'SD', 'SZ', 'TZ', 'TG', 'TN', 'UG', 
  'ZM', 'ZW'
];

const PricingContext = createContext();

export function PricingProvider({ children }) {
  const [currency, setCurrency] = useState('FCFA');
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour détecter la géolocalisation via l'API
  const detectUserLocation = async () => {
    try {
      // Option 1: Utiliser une API de géolocalisation gratuite
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      if (data.country_code) {
        const countryCode = data.country_code.toUpperCase();
        
        // Définir la devise selon la localisation
        if (AFRICAN_COUNTRIES.includes(countryCode)) {
          setCurrency('FCFA');
        } else {
          setCurrency('EUR');
        }
      }
    } catch (error) {
      console.log('Erreur de géolocalisation:', error);
      // En cas d'erreur, utiliser FCFA par défaut (pour l'Afrique)
      setCurrency('FCFA');
    } finally {
      setIsLoading(false);
    }
  };

  // Alternative: détecter via le timezone
  const detectByTimezone = () => {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      // Timezones africaines courantes
      const africanTimezones = [
        'Africa/', 'Atlantic/Cape_Verde', 'Indian/Mauritius', 
        'Indian/Mayotte', 'Indian/Reunion'
      ];
      
      const isAfricanTimezone = africanTimezones.some(tz => timezone.includes(tz));
      
      if (isAfricanTimezone) {
        setCurrency('FCFA');
      } else {
        setCurrency('EUR');
      }
    } catch (error) {
      console.log('Erreur de détection timezone:', error);
      setCurrency('FCFA');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Toujours détecter la géolocalisation à chaque visite
    detectUserLocation();
  }, []);

  // Plus besoin de sauvegarder la devise car elle est toujours auto-détectée

  // Fonction pour obtenir le prix formaté
  const getPrice = (volume) => {
    const price = PRICING[currency][volume] || PRICING[currency]['50ml'];
    const symbol = currency === 'EUR' ? '€' : 'Fcfa';
    return `${price} ${symbol}`;
  };

  // Fonction pour obtenir le prix numérique
  const getPriceNumeric = (volume) => {
    return PRICING[currency][volume] || PRICING[currency]['50ml'];
  };

  // Pas de changement manuel - détection automatique uniquement

  const value = {
    currency,
    isLoading,
    getPrice,
    getPriceNumeric
  };

  return (
    <PricingContext.Provider value={value}>
      {children}
    </PricingContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte
export function usePricing() {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error('usePricing doit être utilisé dans un PricingProvider');
  }
  return context;
}
