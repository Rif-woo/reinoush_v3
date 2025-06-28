"use client";

import Image from "next/image";
import Link from "next/link";
import SectionTitle from "./ui/SectionTitle";

export default function Categories() {
    return (
        <div className="flex flex-col justify-center items-center gap-28">
            <SectionTitle title="Categories" seeAll={false} />
            
            <div className="flex justify-center gap-15 h-[650px]">

                {/* Left Section - Feminine */}
                <div className="flex flex-col gap-6">
                    {/* Title and subtitle */}
                    <div>
                        <h2 className="text-4xl font-normal text-black mb-2 underline decoration-2 underline-offset-4">
                            Révélez votre<br />essence féminine
                        </h2>
                        <p className="text-lg text-black italic">
                            Élégance - Séduction - Douceur
                        </p>
                    </div>
                    
                    {/* Product Image */}
                    <div className="relative flex-1 group cursor-pointer border-1">
                        <div className="relative w-[350px] h-full bg-black">
                            <Image
                                src="/Grace50.PNG"
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
                                className="flex items-center gap-2 text-white text-xl font-medium hover:underline"
                            >
                            <span>Parfum Femme</span>
                            <div className="relative w-5 h-5">
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
                <div className="flex flex-col gap-6">
                    {/* Product Image */}
                    <div className="relative flex-1 group cursor-pointer">
                        <div className="relative w-[350px] h-full bg-black border-1">

                            <Image
                                src="/Mighty50.PNG"
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
                                className="flex items-center gap-2 text-white text-xl font-medium hover:underline"
                            >
                                <span>Parfum Homme</span>
                                <div className="relative w-5 h-5">
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
                    <div>
                        <h2 className="text-4xl font-normal text-black mb-2 underline decoration-2 underline-offset-4">
                            Affirmez votre<br />charisme
                        </h2>
                        <p className="text-lg text-black italic">
                            Force - Élégance - Caractère
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
