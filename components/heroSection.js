import NavBar from "./NavBar";
import Image from "next/image";
import HomeButton from "./ui/Button";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";


export default function HeroSection(){
    return (
        <div className="w-full flex flex-col justify-center items-center gap-12 sm:gap-8 md:gap-12 lg:gap-16 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">

            <div className="w-full flex flex-col justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-15">
               
                <div className="w-full flex justify-center items-center">
                   <SplitText
                        text="Plongez dans l'univers
                    envoûtant de nos parfums"
                         className="w-full max-w-[650px] text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl/normal px-4"
                        delay={100}
                        duration={0.9}
                        ease="power3.out"
                        splitType="words"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                        textAlign="center"
                   />

                </div>

                {/* Section des images - responsive */}
                <div className="relative flex justify-center items-center w-full max-w-6xl px-2">
                    {/* Image gauche */}
                    <div className="relative left-2 sm:left-4 md:left-6 lg:left-14 w-[100px] sm:w-[130px] md:w-[180px] lg:w-[230px] h-[140px] sm:h-[180px] md:h-[250px] lg:h-[320px] xl:h-[400px] -rotate-12 rounded-lg border border-gray-300 bg-black flex-shrink-0">
                          <Image
                            src="/Grace.webp"
                            alt="Parfum Grace"
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-lg shadow-lg opacity-80"
                        />
                    </div>
                    
                    {/* Image centrale */}
                    <div className="relative w-[140px] sm:w-[180px] md:w-[220px] lg:w-[280px] xl:w-[300px] h-[200px] sm:h-[260px] md:h-[320px] lg:h-[400px] xl:h-[480px] z-10 border rounded-lg mx-1 sm:mx-2 md:mx-4 flex-shrink-0">
                         <Image
                            src="/Grace50.PNG"
                            alt="Parfum Grace 50ml"
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-lg shadow-lg z-10"
                        />
                    </div>
                    
                    {/* Image droite */}
                     <div className="relative right-2 sm:right-4 md:right-6 lg:right-14 w-[100px] sm:w-[130px] md:w-[180px] lg:w-[230px] h-[140px] sm:h-[180px] md:h-[250px] lg:h-[320px] xl:h-[400px] rotate-12 rounded-lg border border-gray-300 bg-black flex-shrink-0">
                         <Image
                            src="/Mighty50.PNG"
                            alt="Parfum Mighty"
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-lg shadow-lg opacity-80"
                        />
                    </div>
                </div>

            </div>

            <HomeButton></HomeButton>
        </div>
    )
}
