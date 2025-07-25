"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ProductCard from "./ui/ProductCard";
import SectionTitle from "./ui/SectionTitle";

// Sample product data - replace with your actual data
const bestSellersData = [
    {
        id: 1,
        productName: "Grâce",
        productImage: "/parfums/Grace50.PNG",
        ProductType: "Femme",
        ProductVolume: "50ml",
        isNew: true
    },
    {
        id: 2,
        productName: "Mighty",
        productImage: "/parfums/Mighty50.PNG",
        ProductType: "Homme",
        ProductVolume: "50ml",
        isNew: true
    },
    {
        id: 3,
        productName: "Coco Jojo",
        productImage: "/parfums/CocoJojo50.PNG",
        ProductType: "Femme",
        ProductVolume: "50ml",
        isNew: true
    },
    {
        id: 4,
        productName: "Favor",
        productImage: "/parfums/Favor50.PNG",
        ProductType: "Homme",
        ProductVolume: "50ml",
        isNew: true
    },
    {
        id: 5,
        productName: "Favor",
        productImage: "/parfums/Favor.webp",
        ProductType: "Homme",
        ProductVolume: "30ml",
        isNew: false
    },

    {
        id: 6,
        productName: "Grâce",
        productImage: "/parfums/Grace.webp",
        ProductType: "Femme",
        ProductVolume: "30ml",
        isNew: false
    },

];

export default function BestSellers() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        slidesToScroll: 1,
        skipSnaps: false,
        loop: false
    });
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback((emblaApi) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect(emblaApi);
        emblaApi.on('reInit', onSelect);
        emblaApi.on('select', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="flex flex-col justify-self-start w-full gap-10">
            <div className="flex justify-between items-center">
                <SectionTitle title="Nos Best Sellers" seeAll={true}></SectionTitle>
                
                {/* Navigation buttons */}
                <div className="flex gap-4">
                    <button
                        className={`w-12 h-12 max-md:w-10 max-md:h-10 rounded-full border-2 border-black flex items-center justify-center transition-all duration-200 ${
                            prevBtnDisabled 
                                ? 'opacity-50 cursor-not-allowed' 
                                : 'hover:bg-black hover:text-white'
                        }`}

                        onClick={scrollPrev}
                        disabled={prevBtnDisabled}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <button
                        className={`w-12 h-12 max-md:w-10 max-md:h-10 rounded-full border-2 border-black flex items-center justify-center transition-all duration-200 ${
                            nextBtnDisabled 
                                ? 'opacity-50 cursor-not-allowed' 
                                : 'hover:bg-black hover:text-white'
                        }`}
                        onClick={scrollNext}
                        disabled={nextBtnDisabled}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Embla Carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-6">
                    {bestSellersData.map((product) => (
                        <div key={product.id} className="flex-none">
                            <ProductCard
                                productName={product.productName}
                                productImage={product.productImage}
                                ProductType={product.ProductType}
                                ProductVolume={product.ProductVolume}
                                isNew={product.isNew}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
