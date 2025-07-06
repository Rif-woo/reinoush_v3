"use client";

import { useState } from 'react';
import NavBar from '@/components/NavBar';
import ProductCard from '@/components/ui/ProductCard';
import HeroSectionSeparator from '@/components/ui/separator';
import SectionTitle from '@/components/ui/SectionTitle';

// Données des parfums homme
const hommeProductsData = [
  { id: 1, name: "Mighty", image: "/parfums/Mighty50.PNG", price: "8000 Fcfa", type: "Homme", volume: "50ml", category: "nouveau",isNew: true },
  { id: 2, name: "Favor", image: "/parfums/Favor50.PNG", price: "8000 Fcfa", type: "Homme", volume: "50ml", category: "nouveau" , isNew: true},
  { id: 3, name: "Mighty", image: "/parfums/Mighty.webp", price: "5000 Fcfa", type: "Homme", volume: "30ml", category: "bestseller"},
  { id: 4, name: "Favor", image: "/parfums/Favor.webp", price: "5000 Fcfa", type: "Homme", volume: "30ml", category: "bestseller"},
  ];

export default function ParfumHommePage() {
  const [priceFilter, setPriceFilter] = useState('all');
  const [volumeFilter, setVolumeFilter] = useState('all');

  // Filtrer les produits
  const filteredProducts = hommeProductsData.filter(product => {
    const priceMatch = priceFilter === 'all' || 
      (priceFilter === '8000' && product.price.includes('8000')) ||
      (priceFilter === '5000' && product.price.includes('5000'));
    const volumeMatch = volumeFilter === 'all' || product.volume === volumeFilter;
    
    return priceMatch && volumeMatch;
  });

  // Séparer les produits par catégorie pour l'affichage
  const bestSellers = hommeProductsData.filter(p => p.category === 'bestseller');
  const nouveautes = hommeProductsData.filter(p => p.category === 'nouveau');
  const allProducts = filteredProducts;

  return (
    <div className="min-h-screen bg-[#FCFAF5] sm:px-6 lg:px-8">
      <NavBar />
      
      {/* Ligne décorative */}
          {/* <HeroSectionSeparator></HeroSectionSeparator> */}
     

      {/* Header de la page */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-black mb-4">Tous nos Produits Homme</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Découvrez notre collection raffinée de parfums masculins, conçus avec<br />
          excellence pour révéler votre caractère unique.
        </p>
        <div className="w-24 h-px bg-black mx-auto mt-6"></div>
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
              <option value="8000">8000 Fcfa</option>
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
      <div className="max-w-6xl max-md:px-1 px-4 py-8 mx-auto">
        <div className="flex items-center gap-3 mb-8">
                <SectionTitle title="Nos Best Sellers" seeAll={false}></SectionTitle>
       
        </div>
        
        <div className="flex flex-wrap gap-6 max-md:justify-around sm:justify-start overflow-x-auto pb-4">
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
      <div className="max-w-6xl max-md:px-1 px-4 py-8 mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <SectionTitle title="Nouveautés" seeAll={false}></SectionTitle>
       
        </div>
        
        <div className="flex flex-wrap gap-6 max-md:justify-around sm:justify-start overflow-x-auto pb-4">
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
      <div className="max-w-6xl max-md:w-full max-md:px-1 px-4 py-8 mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <SectionTitle title="Tous Nos Produits Homme" seeAll={false}></SectionTitle>
        </div>
        
        <div className="w-full flex flex-wrap max-md:justify-around sm:justify-start gap-4 sm:gap-6">
          {allProducts.map((product) => (
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
