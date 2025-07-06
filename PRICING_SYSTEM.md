# Système de Prix Géolocalisés - Reinoush

## Vue d'ensemble

Le site Reinoush utilise un système de prix totalement transparent basé sur la géolocalisation automatique :

- **Afrique** : Prix en FCFA (50ml = 8000 Fcfa, 30ml = 5000 Fcfa)
- **Europe & International** : Prix en EUR (50ml = 30€, 30ml = 20€)

**Le client ne sait pas que les prix changent selon sa localisation** - le système est complètement invisible.

## Fonctionnalités

### 🌍 Détection Automatique Silencieuse
- Géolocalisation via API `ipapi.co`
- Fallback sur la timezone du navigateur
- Détection à chaque visite pour une précision maximale

### 🔒 Système Totalement Transparent
- Aucun élément d'interface visible
- Aucune notification au client
- Aucune possibilité de changement manuel
- Prix affichés directement dans la bonne devise

## Architecture Technique

### Contextes React
- `PricingContext` : Gestion de la devise et des prix
- `CartContext` : Gestion du panier avec prix dynamiques
- `CartNotificationContext` : Notifications d'ajout au panier

### Composants
- `ProductCard` : Affichage des produits avec prix dynamiques

### Middleware
- Détection côté serveur pour les plateformes compatibles (Vercel, Cloudflare)
- Headers de géolocalisation pour optimiser l'expérience

## Configuration des Prix

```javascript
const PRICING = {
  FCFA: {
    '50ml': 8000,
    '30ml': 5000
  },
  EUR: {
    '50ml': 30,
    '30ml': 20
  }
};
```

## Pays Africains Supportés

Le système reconnaît automatiquement plus de 50 pays africains incluant :
- Algérie (DZ), Angola (AO), Bénin (BJ)
- Cameroun (CM), Côte d'Ivoire (CI), Égypte (EG)
- Ghana (GH), Kenya (KE), Maroc (MA)
- Nigeria (NG), Sénégal (SN), Afrique du Sud (ZA)
- Et bien d'autres...

## Utilisation

### Dans un composant
```javascript
import { usePricing } from '@/contexts/PricingContext';

function MonComposant() {
  const { getPrice, currency, isLoading } = usePricing();
  
  if (isLoading) {
    return <div>Chargement...</div>;
  }
  
  return (
    <div>
      <p>Prix 50ml: {getPrice('50ml')}</p>
      {/* Le client voit simplement le prix, sans savoir que la devise dépend de sa localisation */}
    </div>
  );
}
```

### API du contexte
- `getPrice(volume)` : Retourne le prix formaté
- `getPriceNumeric(volume)` : Retourne le prix numérique
- `currency` : Devise actuelle ('FCFA' ou 'EUR')
- `isLoading` : État de chargement de la détection

## Persistence

- **Aucune persistence** : Détection fraîche à chaque visite
- **Panier** : Les prix sont mis à jour dynamiquement
- **Expérience transparente** : Le client ne sait pas que sa localisation influence les prix

## Déploiement

Le système fonctionne :
- En développement local
- Sur Vercel (avec géolocalisation côté serveur)
- Sur toute plateforme supportant les headers de géolocalisation
- Avec fallback gracieux en cas d'échec de détection

## Maintenance

Pour modifier les prix, editez le fichier `contexts/PricingContext.js` et mettez à jour l'objet `PRICING`.

Pour ajouter des pays, modifiez le tableau `AFRICAN_COUNTRIES` dans le même fichier.
