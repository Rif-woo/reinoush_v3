import NavBar from "./NavBar";
import Image from "next/image";
import HomeButton from "./ui/Button";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";


export default function HeroSection(){
    return (
        <div className="w-full flex flex-col justify-center items-center gap-8 md:gap-12 lg:gap-17 px-4 sm:px-6 lg:px-8">

            

            <div className="w-full flex flex-col justify-center items-center gap-8 md:gap-12 lg:gap-15">
               
                <div className="w-full flex justify-center items-center">
                   <SplitText
                        text="Plongez dans l'univers
                    envoûtant de nos parfums"
                         className="w-full max-w-[650px] text-center text-2xl sm:text-3xl md:text-4xl/normal px-4"
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


                <div className="relative flex justify-center items-center overflow-x-auto">
                    <div className="relative left-4 lg:left-14 sm:left-8 md:left-13 w-[150px] sm:w-[180px] md:w-[230px] h-[250px] sm:h-[320px] md:h-[400px] -rotate-12 rounded-lg border-1 border-gray-300 bg-black">
                          <Image
                            src="/Grace.webp"
                            alt="hero section image"
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-lg shadow-lg opacity-80"
                        />
                    </div>
                    <div className="relative w-[200px] sm:w-[250px] md:w-[300px] h-[320px] sm:h-[400px] md:h-[480px] z-10 border-1 rounded-lg mx-2 sm:mx-4">
                         <Image
                            src="/Grace50.PNG"
                            alt="hero section image"
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-lg shadow-lg z-10"
                        />
                    </div>
                     <div className="relative right-4 lg:right-14 sm:right-8 md:right-13 w-[150px] sm:w-[180px] md:w-[230px] h-[250px] sm:h-[320px] md:h-[400px] rotate-12 rounded-lg border-1 border-gray-300 bg-black">
                         <Image
                            src="/Mighty50.PNG"
                            alt="hero section image"
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
