"use client";

import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { usePricing } from '@/contexts/PricingContext';
import { usePromo } from '@/contexts/PromoContext';

export default function PaymentModal({ isOpen, onClose, onSuccess }) {
  const { items, clearCart } = useCart();
  const { getPriceNumeric, currency } = usePricing();
  const { applyPromo, getDiscount, appliedPromo, resetPromo } = usePromo();
  
  // États pour le code promo
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  
  // Calculer le total avec usePricing
  const subtotal = items.reduce((total, item) => {
    return total + (getPriceNumeric(item.volume) * item.quantity);
  }, 0);
  
  // Appliquer la réduction
  const discount = getDiscount();
  const totalPrice = subtotal * (1 - discount);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    adresse: '',
    commentaires: ''
  });
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Réinitialiser le formulaire quand le modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      setFormData({
        nom: '',
        prenom: '',
        telephone: '',
        adresse: '',
        commentaires: ''
      });
      setLocation(null);
      setLocationError('');
      // Réinitialiser les champs du code promo
      setPromoCode('');
      setPromoError('');
      setPromoSuccess('');
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const requestLocation = () => {
    setIsLoadingLocation(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('La géolocalisation n\'est pas supportée par ce navigateur.');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
        setIsLoadingLocation(false);
      },
      (error) => {
        let errorMessage = '';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'L\'accès à la localisation a été refusé.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Les informations de localisation ne sont pas disponibles.';
            break;
          case error.TIMEOUT:
            errorMessage = 'La demande de localisation a expiré.';
            break;
          default:
            errorMessage = 'Une erreur inconnue s\'est produite.';
            break;
        }
        setLocationError(errorMessage);
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation des champs requis
    if (!formData.nom || !formData.prenom || !formData.telephone) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    if (!location && !formData.adresse) {
      alert('Veuillez fournir votre position ou saisir une adresse de livraison.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Préparer les données de commande avec les prix unitaires
      const itemsWithUnitPrices = items.map(item => ({
        ...item,
        unitPrice: getPriceNumeric(item.volume)
      }));
      
      const orderData = {
        client: formData,
        items: itemsWithUnitPrices,
        subtotal: subtotal,
        discount: discount,
        totalPrice: totalPrice,
        appliedPromo: appliedPromo,
        currency: currency,
        location: location,
        orderDate: new Date().toISOString()
      };

      // Envoyer l'email
      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi de la commande');
      }

      // Succès
      clearCart();
      resetPromo(); // Réinitialiser le code promo après la commande
      onSuccess();
      onClose();
      alert('Commande envoyée avec succès ! Vous serez contacté dans les plus brefs délais.');

    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur s\'est produite lors de l\'envoi de la commande. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-[#FCFAF5] rounded-lg shadow-xl w-full max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-y-auto overflow-x-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Finaliser la commande
            </h2>
            <button
              onClick={onClose}
              className="rounded-md p-2 text-gray-400 hover:text-gray-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Code Promo */}
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Code Promo</h3>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                placeholder="Entrez votre code promo"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
              />
              <button
                type="button"
                onClick={() => {
                  if (promoCode.trim()) {
                    if (applyPromo(promoCode.trim())) {
                      setPromoError('');
                      setPromoSuccess(`Code ${promoCode} appliqué avec succès !`);
                    } else {
                      setPromoError('Code promo invalide');
                      setPromoSuccess('');
                    }
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap text-sm sm:flex-shrink-0"
              >
                Appliquer
              </button>
            </div>
            {promoError && (
              <p className="text-red-600 text-sm mt-2">{promoError}</p>
            )}
            {promoSuccess && (
              <div className="flex items-center justify-between mt-2">
                <p className="text-green-600 text-sm">{promoSuccess}</p>
                <button
                  type="button"
                  onClick={() => {
                    resetPromo();
                    setPromoCode('');
                    setPromoSuccess('');
                    setPromoError('');
                  }}
                  className="text-red-600 hover:text-red-800 text-sm underline"
                >
                  Supprimer
                </button>
              </div>
            )}
          </div>

          {/* Résumé de commande */}
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Résumé de votre commande</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>{(getPriceNumeric(item.volume) * item.quantity).toLocaleString()} {currency === 'EUR' ? '€' : 'Fcfa'}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sous-total:</span>
                <span>{subtotal.toLocaleString()} {currency === 'EUR' ? '€' : 'Fcfa'}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Réduction ({Math.round(discount * 100)}%):</span>
                  <span>-{(subtotal * discount).toLocaleString()} {currency === 'EUR' ? '€' : 'Fcfa'}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total:</span>
                <span>{Math.round(totalPrice).toLocaleString()} {currency === 'EUR' ? '€' : 'Fcfa'}</span>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            <div className="space-y-4">
              {/* Nom */}
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom *
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              {/* Prénom */}
              <div>
                <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom *
                </label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              {/* Téléphone */}
              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
                  Numéro de téléphone *
                </label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              {/* Position/Adresse */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position de livraison *
                </label>
                
                {/* Bouton géolocalisation */}
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={requestLocation}
                    disabled={isLoadingLocation}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoadingLocation ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Localisation en cours...</span>
                      </>
                    ) : (
                      <>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Utiliser ma position actuelle</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Affichage de la position */}
                {location && (
                  <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-md">
                    <div className="flex items-center space-x-2 text-green-800">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Position captée avec succès</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      Lat: {location.latitude.toFixed(6)}, Lng: {location.longitude.toFixed(6)}
                    </p>
                  </div>
                )}

                {/* Erreur de géolocalisation */}
                {locationError && (
                  <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-800">{locationError}</p>
                  </div>
                )}

                {/* Champ adresse alternative */}
                <div>
                  <label htmlFor="adresse" className="block text-sm font-medium text-gray-700 mb-1">
                    Ou saisissez votre adresse manuellement
                  </label>
                  <textarea
                    id="adresse"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Quartier, rue, repères..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>

              {/* Commentaires */}
              <div>
                <label htmlFor="commentaires" className="block text-sm font-medium text-gray-700 mb-1">
                  Commentaires (optionnel)
                </label>
                <textarea
                  id="commentaires"
                  name="commentaires"
                  value={formData.commentaires}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Instructions spéciales, préférences..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            {/* Boutons */}
            <div className="flex space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Confirmer la commande'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
