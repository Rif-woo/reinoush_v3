"use client";

import { useState } from 'react';
import NavBar from '@/components/NavBar';
import ProductCard from '@/components/ui/ProductCard';
import SectionTitle from '@/components/ui/SectionTitle';
import { usePricing } from '@/contexts/PricingContext';


// Données des huiles parfumées
const huileProductsData = [
    { id: 1, name: "Divine", image: "/huile5mlDivine-removebg.png", type: "huile", volume: "5ml", category: "nouveau", isNew: false },
    { id: 2, name: "Grâce", image: "/huile5mlGrace-removebg.png", type: "huile", volume: "5ml", category: "nouveau", isNew: false },
    { id: 3, name: "Coco Jojo", image: "/huile5mlCocoJoja-removebg.png", type: "huile", volume: "5ml", category: "nouveau", isNew: false },
    { id: 4, name: "Divine", image: "/huileDivine.png", type: "huile", volume: "10ml", category: "bestseller", isNew: false },
    { id: 5, name: "Grâce", image: "/huileGrace.png", type: "huile", volume: "10ml", category: "bestseller", isNew: false },
    { id: 6, name: "Coco Jojo", image: "/huileCocoJojo.png", type: "huile", volume: "10ml", category: "bestseller", isNew: false },
];

export default function HuileParfumeePage() {
  const [priceFilter, setPriceFilter] = useState('all');
  const [volumeFilter, setVolumeFilter] = useState('all');
  const { getPriceNumeric, currency } = usePricing();

  // Filtrer les produits
  const filteredProducts = huileProductsData.filter(product => {
    const productPrice = getPriceNumeric(product.volume);
    const priceMatch = priceFilter === 'all' || 
      (priceFilter === '10ml' && product.volume === '10ml') ||
      (priceFilter === '5ml' && product.volume === '5ml');
    const volumeMatch = volumeFilter === 'all' || product.volume === volumeFilter;
    
    return priceMatch && volumeMatch;
  });

  // Séparer les produits par catégorie pour l'affichage
  const bestSellers = huileProductsData.filter(p => p.category === 'bestseller');
  const nouveautes = huileProductsData.filter(p => p.category === 'nouveau');
  const allProducts = filteredProducts;

  return (
    <div className="min-h-screen bg-[#FCFAF5] sm:px-6 lg:px-8">
      <NavBar />
      
      {/* Ligne décorative */}
        {/* <HeroSectionSeparator></HeroSectionSeparator> */}
   

      {/* Header de la page */}
      <div className="text-center py-8 sm:py-12 px-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">Nos Huiles Parfumées</h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed">
          Découvrez notre collection exclusive d'huiles parfumées, créées avec
          <span className="hidden sm:inline"><br /></span>
          <span className="sm:hidden"> </span>
          des ingrédients naturels pour une fragrance authentique et durable.
        </p>
        <div className="w-16 sm:w-24 h-px bg-black mx-auto mt-4 sm:mt-6"></div>
      </div>

      {/* Filtres */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {/* Filtre par prix */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Prix:</label>
            <select 
              value={priceFilter} 
              onChange={(e) => setPriceFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white"
            >
              <option value="all">Tous les prix</option>
              <option value="10ml">{getPriceNumeric('10ml')} {currency === 'EUR' ? '€' : 'Fcfa'} (10ml)</option>
              <option value="5ml">{getPriceNumeric('5ml')} {currency === 'EUR' ? '€' : 'Fcfa'} (5ml)</option>
            </select>
          </div>

          {/* Filtre par volume */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Volume:</label>
            <select 
              value={volumeFilter} 
              onChange={(e) => setVolumeFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white"
            >
              <option value="all">Tous les volumes</option>
              <option value="5ml">5ml</option>
              <option value="10ml">10ml</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section Nos Best Sellers */}
      <div className="max-w-6xl max-md:px-1 px-4 mx-auto py-8">
        <div className="flex items-center gap-3 mb-8">
          <SectionTitle title="Nos Best Sellers" seeAll={false}></SectionTitle>
          
        </div>
        
        <div className="flex flex-wrap gap-6 max-md:justify-around sm:justify-start overflow-x-auto pb-4">
          {bestSellers.map((product) => (
            <div key={product.id} className="flex-shrink-0">
              <ProductCard
                productName={product.name}
                productImage={product.image}
                ProductType={product.type}
                ProductVolume={product.volume}
                isNew={product.isNew}
                isHomePage={false}
                hasBackground={false}
                productType="huile"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Section Nouveautés */}
      {/* <div className="max-w-6xl max-md:px-1 px-4 mx-auto py-8">
        <div className="flex items-center gap-3 mb-8">
          <SectionTitle title="Nouveautés" seeAll={false}></SectionTitle>
          
        </div>
        
        <div className="flex flex-wrap gap-6 max-md:justify-around sm:justify-start overflow-x-auto pb-4">
          {nouveautes.map((product) => (
            <div key={product.id} className="flex-shrink-0">
              <ProductCard
                productName={product.name}
                productImage={product.image}
                ProductType={product.type}
                ProductVolume={product.volume}
                isNew={product.isNew}
                isHomePage={false}
                hasBackground={false}
                productType="huile"
              />
            </div>
          ))}
        </div>
      </div> */}

      {/* Section Toutes Nos Huiles Parfumées */}
      <div className="max-w-6xl max-md:w-full max-md:px-1 mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <SectionTitle title="Toutes Nos Huiles Parfumées" seeAll={false}></SectionTitle>
        </div>
        
        <div className="w-full flex flex-wrap max-md:justify-around sm:justify-start  gap-4 sm:gap-6">
          {allProducts.map((product) => (
             <div key={product.id} className="flex-shrink-0">
                <ProductCard
                  productName={product.name}
                  productImage={product.image}
                  ProductType={product.type}
                  ProductVolume={product.volume}
                  isNew={product.isNew}
                  isHomePage={false}
                  hasBackground={false}
                  productType="huile"
                />
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}