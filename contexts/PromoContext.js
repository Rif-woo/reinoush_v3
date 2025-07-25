"use client";


import { createContext, useContext, useState } from 'react';

const PromoContext = createContext();

export function PromoProvider({ children }) {
  // Codes promo et réductions associées
  const [promos, setPromos] = useState({
    'ANNIVREINOUSH': 0.10,  // 10% de réduction
  });

  // Code promo actuellement appliqué
  const [appliedPromo, setAppliedPromo] = useState(null);

  const applyPromo = (code) => {
    if (promos[code]) {
      setAppliedPromo(code);
      return true;
    }
    setAppliedPromo(null);
    return false;
  };

  const getDiscount = () => {
    if (appliedPromo && promos[appliedPromo]) {
      return promos[appliedPromo];
    }
    return 0;
  };

  const resetPromo = () => {
    setAppliedPromo(null);
  };

  const value = {
    appliedPromo,
    applyPromo,
    getDiscount,
    resetPromo
  };

  return (
    <PromoContext.Provider value={value}>
      {children}
    </PromoContext.Provider>
  );
}

export function usePromo() {
  const context = useContext(PromoContext);
  if (!context) {
    throw new Error('usePromo doit être utilisé dans un PromoProvider');
  }
  return context;
}
