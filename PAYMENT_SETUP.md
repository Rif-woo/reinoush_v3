# Configuration du système de paiement Reinoush

## Fonctionnalités

Le système de paiement comprend :
- Modal de commande avec formulaire client complet
- Géolocalisation automatique avec accord de l'utilisateur
- Envoi d'email automatique au gérant avec toutes les informations
- Interface responsive et intuitive

## Configuration Resend

### 1. Créer un compte Resend

1. Allez sur [resend.com](https://resend.com)
2. Créez un compte gratuit
3. Vérifiez votre email

### 2. Obtenir la clé API

1. Connectez-vous à votre dashboard Resend
2. Allez dans "API Keys"
3. Créez une nouvelle clé API
4. Copiez la clé (elle commence par `re_`)

### 3. Configuration des variables d'environnement

1. Copiez le fichier `.env.example` vers `.env.local` :
   ```bash
   cp .env.example .env.local
   ```

2. Modifiez `.env.local` avec vos vraies valeurs :
   ```bash
   # Votre clé API Resend
   RESEND_API_KEY=re_votre_vraie_cle_api
   
   # Email du gérant qui recevra les commandes
   MANAGER_EMAIL=votre-email@domaine.com
   ```

### 4. Configuration du domaine (optionnel mais recommandé)

Pour utiliser votre propre domaine dans les emails :

1. Dans le dashboard Resend, allez dans "Domains"
2. Ajoutez votre domaine
3. Configurez les enregistrements DNS comme indiqué
4. Une fois vérifié, modifiez la ligne `from:` dans `/app/api/send-order/route.js` :
   ```javascript
   from: 'Reinoush <noreply@votre-domaine.com>',
   ```

## Test du système

1. Ajoutez des produits au panier
2. Cliquez sur "Procéder au paiement"
3. Remplissez le formulaire
4. Autorisez la géolocalisation (optionnel)
5. Confirmez la commande

Un email sera envoyé au gérant avec toutes les informations de la commande.

## Fonctionnalités du modal

### Informations demandées :
- **Nom** (obligatoire)
- **Prénom** (obligatoire) 
- **Numéro de téléphone** (obligatoire)
- **Position GPS** (optionnelle, avec accord utilisateur)
- **Adresse manuelle** (alternative à la géolocalisation)
- **Commentaires** (optionnel)

### Géolocalisation :
- Demande d'autorisation à l'utilisateur
- Précision GPS avec latitude/longitude
- Lien Google Maps dans l'email
- Fallback vers adresse manuelle si refusée

### Email envoyé :
- Informations client complètes
- Détail de tous les articles commandés
- Total de la commande
- Position GPS si disponible
- Date et heure de la commande
- Format HTML responsive

## Sécurité

- La clé API Resend est stockée côté serveur uniquement
- Les coordonnées GPS ne sont transmises qu'avec l'accord explicite
- Validation des données côté client et serveur
- Protection contre les soumissions multiples

## Personnalisation

Vous pouvez personnaliser :
- Le template d'email dans `/app/api/send-order/route.js`
- Les champs du formulaire dans `/components/PaymentModal.js`
- Les validations et messages d'erreur
- Le style et les couleurs du modal
