"use client";

import { useState } from 'react';
import NavBar from '@/components/NavBar';
import ProductCard from '@/components/ui/ProductCard';
import SectionTitle from '@/components/ui/SectionTitle';
import HeroSectionSeparator from '@/components/ui/separator';
import { usePricing } from '@/contexts/PricingContext';

// Données de test pour les produits
const productsData = [
  // Parfums Femme
  { id: 2, name: "Divine", image: "/parfums/Divine50.PNG", type: "Femme", volume: "50ml", category: "nouveau", isNew: true, productType: "parfum" },
  { id: 3, name: "Coco Jojo", image: "/parfums/CocoJojo50.PNG", type: "Femme", volume: "50ml", category: "nouveau", isNew: true, productType: "parfum" },
  { id: 4, name: "Grâce", image: "/parfums/Grace50.PNG", type: "Femme", volume: "50ml", category: "nouveau", isNew: true, productType: "parfum" },
  { id: 1, name: "Grâce", image: "/parfums/Grace.webp", type: "Femme", volume: "30ml", category: "bestseller", productType: "parfum" },
  { id: 5, name: "Divine", image: "/parfums/Divine.webp", type: "Femme", volume: "30ml", category: "all", productType: "parfum" },
  { id: 6, name: "Coco Jojo", image: "/parfums/coco.webp", type: "Femme", volume: "30ml", category: "bestseller", productType: "parfum" },
  
  // Parfums Homme
  { id: 7, name: "Mighty", image: "/parfums/Mighty50.PNG", type: "Homme", volume: "50ml", category: "nouveau", isNew: true, productType: "parfum" },
  { id: 8, name: "Favor", image: "/parfums/Favor50.PNG", type: "Homme", volume: "50ml", category: "nouveau", isNew: true, productType: "parfum" },
  { id: 9, name: "Mighty", image: "/parfums/Mighty.webp", type: "Homme", volume: "30ml", category: "bestseller", productType: "parfum" },
  { id: 10, name: "Favor", image: "/parfums/Favor.webp", type: "Homme", volume: "30ml", category: "bestseller", productType: "parfum" },
  
  // Huiles Parfumées
  { id: 11, name: "Divine", image: "/huileDivine.png", type: "Femme", volume: "10ml", category: "nouveau", isNew: true, productType: "huile" },
  { id: 12, name: "Grâce", image: "/huileGrace.png", type: "Femme", volume: "10ml", category: "nouveau", isNew: true, productType: "huile" },
  { id: 13, name: "Coco Jojo", image: "/huileCocoJojo.png", type: "Femme", volume: "10ml", category: "nouveau", isNew: true, productType: "huile" },
  { id: 14, name: "Divine", image: "/huile5mlDivine-removebg.png", type: "Femme", volume: "5ml", category: "nouveau", isNew: true, productType: "huile" },
  { id: 15, name: "Grâce", image: "/huile5mlGrace-removebg.png", type: "Femme", volume: "5ml", category: "nouveau", isNew: true, productType: "huile" },
  { id: 16, name: "Coco Jojo", image: "/huile5mlCocoJoja-removebg.png", type: "Femme", volume: "5ml", category: "nouveau", isNew: true, productType: "huile" },
];

export default function ProduitsPage() {
  const [priceFilter, setPriceFilter] = useState('all');
  const [volumeFilter, setVolumeFilter] = useState('all');
  const { getPriceNumeric, currency } = usePricing();

  // Filtrer les produits
  const filteredProducts = productsData.filter(product => {
    const priceMatch = priceFilter === 'all' || 
      (priceFilter === '50ml' && product.volume === '50ml') ||
      (priceFilter === '30ml' && product.volume === '30ml') ||
      (priceFilter === '10ml' && product.volume === '10ml') ||
      (priceFilter === '5ml' && product.volume === '5ml');
    const volumeMatch = volumeFilter === 'all' || product.volume === volumeFilter;
    
    return priceMatch && volumeMatch;
  });

  // Séparer les produits par catégorie pour l'affichage
  const bestSellers = productsData.filter(p => p.category === 'bestseller');
  const nouveautes = productsData.filter(p => p.category === 'nouveau');
  const allProducts = filteredProducts;

  return (
    <div className="min-h-screen bg-[#FCFAF5] sm:px-6 lg:px-8">
      <NavBar />
      
      {/* Ligne décorative */}
     {/* <HeroSectionSeparator></HeroSectionSeparator> */}

      {/* Header de la page */}
      <div className="text-center py-8 sm:py-12 px-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">Tous nos Produits</h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed">
          Découvrez l&apos;intégralité de notre collection de parfums d&apos;exception, créés avec
          <span className="hidden sm:inline"><br /></span>
          <span className="sm:hidden"> </span>
          passion pour révéler votre personnalité unique.
        </p>
        <div className="w-16 sm:w-24 h-px bg-black mx-auto mt-4 sm:mt-6"></div>
      </div>

      {/* Filtres */}
      <div className="max-w-6xl mx-auto px-4 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6">
          {/* Filtre par prix */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-sm font-medium text-gray-700 min-w-max">Prix:</label>
            <select 
              value={priceFilter} 
              onChange={(e) => setPriceFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white flex-1 sm:flex-none min-w-[140px]"
            >
              <option value="all">Tous les prix</option>
              <option value="50ml">{getPriceNumeric('50ml')} {currency === 'EUR' ? '€' : 'Fcfa'} (50ml)</option>
              <option value="30ml">{getPriceNumeric('30ml')} {currency === 'EUR' ? '€' : 'Fcfa'} (30ml)</option>
              <option value="10ml">{getPriceNumeric('10ml')} {currency === 'EUR' ? '€' : 'Fcfa'} (10ml)</option>
              <option value="5ml">{getPriceNumeric('5ml')} {currency === 'EUR' ? '€' : 'Fcfa'} (5ml)</option>
            </select>
          </div>

          {/* Filtre par volume */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-sm font-medium text-gray-700 min-w-max">Volume:</label>
            <select 
              value={volumeFilter} 
              onChange={(e) => setVolumeFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white flex-1 sm:flex-none min-w-[140px]"
            >
              <option value="all">Tous les volumes</option>
              <option value="5ml">5ml</option>
              <option value="10ml">10ml</option>
              <option value="30ml">30ml</option>
              <option value="50ml">50ml</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section Nos Best Sellers */}
      <div className="max-w-6xl max-md:w-full max-md:px-1 mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
         <SectionTitle title="Nos Best Sellers" seeAll={false}></SectionTitle>
        </div>
        
        <div className="w-full flex flex-wrap max-md:justify-around gap-6 overflow-x-auto pb-4">
          {bestSellers.map((product) => (
            <div key={product.id} className="flex-shrink-0">
              <ProductCard
                productName={product.name}
                productImage={product.image}
                ProductType={product.type}
                ProductVolume={product.volume}
                isNew={product.isNew}
                isHomePage={false}
                hasBackground={product.productType === 'parfum'}
                productType={product.productType}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Section Nouveautés */}
      <div className="max-w-6xl max-md:w-full px-4 mx-auto max-md:px-1 py-8">

        <div className="flex items-center gap-3 mb-8">
          <SectionTitle title="Nouveautés" seeAll={false}></SectionTitle>
        </div>
        
        <div className="w-full flex flex-wrap max-md:justify-around gap-6 pb-4">
          {nouveautes.map((product) => (
            <div key={product.id} className="flex-shrink-0">
              <ProductCard
                productName={product.name}
                productImage={product.image}
                ProductType={product.type}
                ProductVolume={product.volume}
                isNew={product.isNew}
                isHomePage={false}
                hasBackground={product.productType === 'parfum'}
                productType={product.productType}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Section Tous Nos Produits */}
      <div className="max-w-6xl max-md:w-full max-md:px-1 mx-auto px-4 py-8">

        <div className="flex items-center gap-3 mb-8">
          <SectionTitle title="Tous Nos Produits" seeAll={false}></SectionTitle>  
        </div>
        
        <div className="w-full flex flex-wrap max-md:justify-around sm:justify-start gap-4 sm:gap-6">
          {allProducts.map((product) => (
            <div key={product.id} className="flex-shrink-0">
                <ProductCard
                  productName={product.name}
                  productImage={product.image}
                  ProductType={product.type}
                  ProductVolume={product.volume}
                  isNew={product.isNew}
                  isHomePage={false}
                  hasBackground={product.productType === 'parfum'}
                  productType={product.productType}
                />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
