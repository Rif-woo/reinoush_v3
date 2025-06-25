import Image from "next/image";

export default function HeroSectionSeparator() {
    return <div className="flex items-center">
                <div className="w-1/2 h-[1px] bg-black"></div>
                    <div className="relative w-9 h-9">
                        <Image
                            src="/star.svg"
                            alt="chevron"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                <div className="w-1/2 h-[1px] bg-black"></div>
            </div>
}