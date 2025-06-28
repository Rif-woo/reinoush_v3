"use client";

import { createContext, useContext, useState } from 'react';
import CartNotification from '@/components/CartNotification';

const CartNotificationContext = createContext();

export function CartNotificationProvider({ children }) {
  const [notification, setNotification] = useState({
    isVisible: false,
    productName: '',
  });

  const showNotification = (productName) => {
    setNotification({
      isVisible: true,
      productName,
    });
  };

  const hideNotification = () => {
    setNotification({
      isVisible: false,
      productName: '',
    });
  };

  const value = {
    showNotification,
    hideNotification,
  };

  return (
    <CartNotificationContext.Provider value={value}>
      {children}
      <CartNotification
        isVisible={notification.isVisible}
        productName={notification.productName}
        onClose={hideNotification}
      />
    </CartNotificationContext.Provider>
  );
}

export function useCartNotification() {
  const context = useContext(CartNotificationContext);
  if (!context) {
    throw new Error('useCartNotification doit être utilisé dans un CartNotificationProvider');
  }
  return context;
}
