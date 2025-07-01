"use client";

import { useState } from 'react';
import NavBar from '@/components/NavBar';
import ProductCard from '@/components/ui/ProductCard';
import HeroSectionSeparator from '@/components/ui/separator';
import SectionTitle from '@/components/ui/SectionTitle';

// Données des parfums femme
const femmeProductsData = [
  { id: 1, name: "Grace", image: "/Grace50.PNG", price: "5000 Fcfa", type: "Femme", volume: "50ml", category: "bestseller" },
  { id: 2, name: "Grace", image: "/Grace50.PNG", price: "3000 Fcfa", type: "Femme", volume: "30ml", category: "bestseller" },
  { id: 3, name: "Grace", image: "/Grace50.PNG", price: "5000 Fcfa", type: "Femme", volume: "50ml", category: "nouveau", isNew: true },
  { id: 4, name: "Grace", image: "/Grace50.PNG", price: "3000 Fcfa", type: "Femme", volume: "30ml", category: "nouveau", isNew: true },
  { id: 5, name: "Grace", image: "/Grace50.PNG", price: "5000 Fcfa", type: "Femme", volume: "50ml", category: "all" },
  { id: 6, name: "Grace", image: "/Grace50.PNG", price: "3000 Fcfa", type: "Femme", volume: "30ml", category: "all" },
  { id: 7, name: "Grace", image: "/Grace50.PNG", price: "5000 Fcfa", type: "Femme", volume: "50ml", category: "all" },
  { id: 8, name: "Grace", image: "/Grace50.PNG", price: "3000 Fcfa", type: "Femme", volume: "30ml", category: "all" },
  { id: 9, name: "Grace", image: "/Grace50.PNG", price: "5000 Fcfa", type: "Femme", volume: "50ml", category: "all" },
];

export default function ParfumFemmePage() {
  const [priceFilter, setPriceFilter] = useState('all');
  const [volumeFilter, setVolumeFilter] = useState('all');

  // Filtrer les produits
  const filteredProducts = femmeProductsData.filter(product => {
    const priceMatch = priceFilter === 'all' || 
      (priceFilter === '3000' && product.price.includes('3000')) ||
      (priceFilter === '5000' && product.price.includes('5000'));
    const volumeMatch = volumeFilter === 'all' || product.volume === volumeFilter;
    
    return priceMatch && volumeMatch;
  });

  // Séparer les produits par catégorie pour l'affichage
  const bestSellers = femmeProductsData.filter(p => p.category === 'bestseller');
  const nouveautes = femmeProductsData.filter(p => p.category === 'nouveau');
  const allProducts = filteredProducts;

  return (
    <div className="min-h-screen bg-[#FCFAF5] px-4 sm:px-6 lg:px-8">
      <NavBar />
      
      {/* Ligne décorative */}
        {/* <HeroSectionSeparator></HeroSectionSeparator> */}
   

      {/* Header de la page */}
      <div className="text-center py-8 sm:py-12 px-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">Parfums Femme</h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed">
          Découvrez notre collection exclusive de parfums féminins, créés avec
          <span className="hidden sm:inline"><br /></span>
          <span className="sm:hidden"> </span>
          passion pour révéler votre élégance naturelle.
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
              <option value="3000">3000 Fcfa</option>
              <option value="5000">5000 Fcfa</option>
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
              <option value="30ml">30ml</option>
              <option value="50ml">50ml</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section Nos Best Sellers */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <SectionTitle title="Nos Best Sellers" seeAll={false}></SectionTitle>
          
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-4">
          {bestSellers.map((product) => (
            <div key={product.id} className="flex-shrink-0">
              <ProductCard
                productName={product.name}
                productImage={product.image}
                productPrice={product.price}
                ProductType={product.type}
                ProductVolume={product.volume}
                isNew={product.isNew}
                isHomePage={false}

              />
            </div>
          ))}
        </div>
      </div>

      {/* Section Nouveautés */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <SectionTitle title="Nouveautés" seeAll={false}></SectionTitle>
          
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-4">
          {nouveautes.map((product) => (
            <div key={product.id} className="flex-shrink-0">
              <ProductCard
                productName={product.name}
                productImage={product.image}
                productPrice={product.price}
                ProductType={product.type}
                ProductVolume={product.volume}
                isNew={product.isNew}
                isHomePage={false}

              />
            </div>
          ))}
        </div>
      </div>

      {/* Section Tous Nos Produits */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <SectionTitle title="Tous Nos Produits Femme" seeAll={false}></SectionTitle>
        </div>
        
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6">
          {allProducts.map((product) => (
            // <ProductCard
            //   key={product.id}
            //   productName={product.name}
            //   productImage={product.image}
            //   productPrice={product.price}
            //   ProductType={product.type}
            //   ProductVolume={product.volume}
            //   isNew={product.isNew}
            //   isHomePage={false}
            // />

             <div key={product.id} className="flex-shrink-0">
                <ProductCard
                  productName={product.name}
                  productImage={product.image}
                  productPrice={product.price}
                  ProductType={product.type}
                  ProductVolume={product.volume}
                  isNew={product.isNew}
                  isHomePage={false}
                />
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}
