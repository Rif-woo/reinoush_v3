import Image from "next/image";
import Link from "next/link";

export default function SectionTitle({ title, seeAll}) {
    return(
         <div className="flex items-center gap-3">
            <div className="flex gap-2 items-center">
                <div className="relative w-7 h-7">
                    <Image
                        src="/star_filled.svg"
                        alt="chevron"
                        fill
                        style={{ objectFit: 'contain' }}
                    />
                </div>
                <h2 className="w-full text-left text-3xl lg:text-4xl max-md:text-lg">{title}</h2>
            </div>


            {seeAll && (
                <>
                    <div className="w-3 h-1 rounded-full bg-black"></div>

                    <Link href="/produits">
                        <p className="underline text-xl cursor-pointer max-lg:text-sm">Voir Tout</p>
                    </Link> 
                
                </>
            )}

        </div>
    )
}