import Image from "next/image"
import Link from "next/link"
import ChristmasButtonGlow from "@/components/ChristmasButtonGlow"

export default function HomeButton(){
    return (
      <Link href="/produits" className="relative w-fit flex justify-self-center items-center border-1 gap-2 bg-[#FFF8E6] p-4 max-md:p-2 max-md:text-sm rounded-sm max-md:rounded-sm cursor-pointer overflow-hidden">
            <ChristmasButtonGlow />
            <p className="relative z-10">Découvrez nos parfums</p>

            <div className="relative w-4 h-4 z-10">
                <Image
                src="/arrow-chevron-down.svg"
                alt="chevron"
                fill
                style={{ objectFit: 'contain' }}
                />
            </div>

    </Link>

    )
}