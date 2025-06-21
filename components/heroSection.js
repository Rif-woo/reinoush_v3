import NavBar from "./NavBar";
import Image from "next/image";
import HomeButton from "./ui/Button";

export default function HeroSection(){
    return (
        <div className="w-full flex flex-col justify-center items-center gap-18">

            <NavBar></NavBar>
            
            {/* <div className="h-[80px]"></div> */}

            <div className="w-full flex flex-col justify-center items-center gap-15">
               
                <div className="w-full flex justify-center items-center">
                    <h1 className="w-[600px] text-center text-4xl/relaxed">Plongez dans l'univers
                    envoûtant de nos parfums</h1>

                </div>

                {/* <div className="h-[50px]"></div> */}

                <div className="relative flex justify-center items-center">
                    <div className="relative left-13 w-[230px] h-[400px] -rotate-12 rounded-lg border-1 border-gray-300 bg-black">
                          <Image
                            src="/Grace.webp"
                            alt="hero section image"
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-lg shadow-lg opacity-80"
                        />
                    </div>
                    <div className="relative w-[300px] h-[480px] z-10 border-1 rounded-lg">
                         <Image
                            src="/Grace50.PNG"
                            alt="hero section image"
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-lg shadow-lg z-10"
                        />
                    </div>
                     <div className="relative right-13 w-[230px] h-[400px] rotate-12 rounded-lg border-1 border-gray-300 bg-black">
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