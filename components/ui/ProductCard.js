import Image from "next/image";

export default function ProductCard({
    productName, 
    productImage, 
    productPrice, 
    ProductType, 
    ProductVolume, 
    isNew
}) {
    return (
        <div className="flex flex-col w-[350px] h-[550px]">

            <div className="relative w-full h-full p-3 bg-black flex">
                <div className="w-full flex justify-between">
                    <div className="z-10 w-28 h-7 rounded-md bg-black">
                        <p className="text-white text-xl text-center">Nouveau</p>
                    </div>

                    <div className="z-10 w-28 h-7 rounded-md bg-[#F227A7]">
                        <p className="text-white text-xl text-center">Femme</p>
                    </div>
                </div>

               <Image
                    src="/Grace50.PNG"
                    alt="chevron"
                    fill
                    style={{ objectFit: 'cover', opacity: 0.8 }}
                />
            </div>

            <div className="w-full h-1/9 border-2 flex justify-between items-center p-2">
               
               <div className="flex items-center gap-2">
                    <p className="text-black text-2xl font-bold">Grace</p>
                    <div className="rounded-full w-2 h-2 bg-black"></div>
                    <p className="text-2xl">50ml</p>
               </div>

               <div className="flex items-center">
                    <p>5000 Fcfa</p>
                    <div className="relative w-6 h-6">
                         <Image
                            src="/mini_arrow.svg"
                            alt="chevron"
                            fill
                            style={{ objectFit: 'contain'}}
                         />
                    </div>
                    <div className="relative bg-black p-1 rounded-md">
                         <Image
                            src="/shop_icon.svg"
                            alt="chevron"
                            style={{ objectFit: 'contain'}}
                            width={26}
                            height={40}
                         />
                    </div>
               </div>
            </div>
        </div>
    )
}