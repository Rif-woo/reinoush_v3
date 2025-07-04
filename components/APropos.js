import Image from "next/image";
import SectionTitle from "./ui/SectionTitle";

export default function APropos() {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-24 py-20 px-4">
            {/* Section Title */}
                <SectionTitle title="A Propos" />
            
            {/* Main Content */}
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left side - Text */}
                <div className="flex flex-col space-y-6">
                    <p className="text-2xl lg:text-2xl leading-relaxed font-[family-name:var(--font-anon)] max-lg:text-center">
                        Reinoush crée des parfums uniques qui allient tradition, innovation et élégance. Chaque fragrance est conçue pour révéler votre personnalité et raconter votre histoire.
                    </p>
                </div>
                
                {/* Right side - Product Images */}
                <div className="flex justify-center items-center">
                    <div className="relative w-full max-w-[600px] h-[400px] rounded-lg">
                        <div className="flex justify-center items-center h-full gap-4">
                            <div className="relative w-full h-full">
                                <Image
                                    src="/bg-header.webp"
                                    alt="Parfum Coco Jojo"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="drop-shadow-lg"
                                />
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
