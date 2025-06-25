import Image from "next/image"

export default function HomeButton(){
    return (
      <div className=" w-fit flex justify-self-center items-center border-1 gap-2 bg-[#FFF8E6] p-4 rounded-lg cursor-pointer">
            <p>Decouvrez nos parfums</p>

            <div className="relative w-4 h-4">
                <Image
                src="/arrow-chevron-down.svg"
                alt="chevron"
                fill
                style={{ objectFit: 'contain' }}
                />
            </div>

    </div>

    )
}