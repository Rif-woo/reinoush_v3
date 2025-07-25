"use client";

import Image from "next/image";
import Link from "next/link";
import SectionTitle from "./ui/SectionTitle";

export default function Categories() {
    return (
        <div className="flex flex-col justify-center items-center gap-12 sm:gap-16 lg:gap-28 px-4 sm:px-6 lg:px-8">
            <SectionTitle title="Catégories" seeAll={false} />
            
            <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-15 w-full max-w-6xl">

                {/* Left Section - Feminine */}
                <div className="flex flex-col gap-4 lg:gap-6 w-full lg:w-auto">
                    {/* Title and subtitle */}
                    <div className="text-center lg:text-left">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-black mb-2 underline decoration-2 underline-offset-4">
                            Révélez votre<br />essence féminine
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg text-black italic">
                            Élégance - Séduction - Douceur
                        </p>
                    </div>
                    
                    {/* Product Image */}
                    <div className="relative flex-1 group cursor-pointer border-1 mx-auto lg:mx-0">
                        <div className="relative w-[250px] sm:w-[300px] lg:w-[350px] h-[300px] sm:h-[400px] lg:h-[500px] bg-black">
                            <Image
                                src="/parfums/Grace50.PNG"
                                alt="Grace Parfum Femme"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="transition-transform duration-300 group-hover:scale-105 opacity-50"
                            />
                        </div>
                        
                        {/* Bottom overlay with link */}
                        <div className="absolute bottom-4 left-4">
                            <Link 
                                href="/parfum-femme" 
                                className="flex items-center gap-2 text-white text-sm sm:text-base lg:text-xl font-medium hover:underline"
                            >
                                <span>Parfum Femme</span>
                                <div className="relative w-4 h-4 sm:w-5 sm:h-5">
                                    <Image
                                        src="/arrow_right.svg"
                                        alt="arrow svg"
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Section - Masculine */}
                <div className="flex flex-col gap-4 lg:gap-6 w-full lg:w-auto">
                    {/* Product Image */}
                    <div className="relative flex-1 group cursor-pointer mx-auto lg:mx-0">
                        <div className="relative w-[250px] sm:w-[300px] lg:w-[350px] h-[300px] sm:h-[400px] lg:h-[500px] bg-black border-1">
                            <Image
                                src="/parfums/Mighty50.PNG"
                                alt="Mighty Parfum Homme"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="transition-transform duration-300 group-hover:scale-105 opacity-50"
                            />
                        </div>
                        
                        {/* Bottom overlay with link */}
                        <div className="absolute bottom-4 left-4">
                            <Link 
                                href="/parfum-homme" 
                                className="flex items-center gap-2 text-white text-sm sm:text-base lg:text-xl font-medium hover:underline"
                            >
                                <span>Parfum Homme</span>
                                <div className="relative w-4 h-4 sm:w-5 sm:h-5">
                                <Image
                                    src="/arrow_right_blue.svg"
                                    alt="arrow svg"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            </Link>
                        </div>
                    </div>
                    
                    {/* Title and subtitle */}
                    <div className="text-center lg:text-left">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-black mb-2 underline decoration-2 underline-offset-4">
                            Affirmez votre<br />charisme
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg text-black italic">
                            Force - Élégance - Caractère
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
