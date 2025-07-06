import Image from "next/image";
import { useCart } from '@/contexts/CartContext';
import { useCartNotification } from '@/contexts/CartNotificationContext';

export default function ProductCard({
    productName = "Grâce", 
    productImage = "/Grace50.PNG", 
    productPrice = "5000 Fcfa", 
    ProductType = "Femme", 
    ProductVolume = "50ml", 
    isNew = false,
    isHomePage = true

}) {
    const { addItem } = useCart();
    const { showNotification } = useCartNotification();
    
    const handleAddToCart = () => {
        addItem({
            id: productName + '-' + Date.now(), // ID unique
            name: productName,
            image: productImage,
            price: productPrice,
            type: ProductType,
            volume: ProductVolume
        });
        showNotification(productName);between
    };
    
    // Function to get the correct background color for product type
    const getTypeColor = (type) => {
        switch(type?.toLowerCase()) {
            case 'femme':
                return 'bg-[#F227A7]';
            case 'homme':
                return 'bg-[#2563EB]';
            default:
                return 'bg-[#F227A7]';
        }
    };

    return (
        <div className={`flex flex-col ${isHomePage ? 'w-[280px] sm:w-[350px] lg:w-[370px] h-[450px] sm:h-[500px] lg:h-[550px] max-md:w-[310px]' : 'w-[170px] sm:w-[220px] lg:w-[250px] h-[290px] sm:h-[320px] lg:h-[350px]'} mx-auto `}>
            <div className="relative w-full h-full p-3 bg-black flex">
                <div className="w-full flex justify-between">
                    {isNew && (
                        <div className={`z-10 ${isHomePage ? 'w-28 h-7' : 'w-fit h-fit sm:px-2'} rounded-md bg-black max-md:w-fit max-md:h-fit max-md:px-2 max-md:rounded-sm`}>

                            <p className={`text-white ${isHomePage ? 'text-lg' : 'text-base max-md:text-[12px]'}  text-center`}>Nouveau</p>
                        </div>
                    )}
                    {!isNew && <div></div>}

                    <div className={`z-10 ${isHomePage ? 'w-28 h-7 ' : 'w-fit h-fit sm:px-2 '} rounded-md ${getTypeColor(ProductType)} max-md:w-fit max-md:h-fit max-md:px-2 max-md:rounded-sm`}>

                        <p className={`text-white ${isHomePage ? 'text-lg' : 'text-base max-md:text-[12px]'}  text-center`}>{ProductType}</p>
                    </div>
                </div>

               <Image
                    src={productImage}
                    alt={productName}
                    fill
                    style={{ objectFit: 'cover', opacity: 0.8 }}
                />
            </div>

            <div className={`w-full ${isHomePage ? 'h-1/9 border-2' : 'h-3/9 flex-col max-md:justify-center border-0'}  flex justify-between items-center p-2`}>
               <div className="flex items-center gap-2">
                    {/* fragance name text */}
                    <p className={`text-black ${isHomePage ? 'text-xl' : 'text-sm max-md:text-[18px]'}  font-medium max-md:text-base`}>{productName}</p>
                    {isHomePage && 
                        <div className="rounded-full w-2 h-2 bg-black"></div>
                    }
                    {/* fragance volume text */}
                    <p className={`${isHomePage ? 'text-xl' : 'text-sm max-md:text-[16px]'} max-md:text-base`}>{ProductVolume}</p>
               </div>

               <div className={`flex items-center ${isHomePage ? 'flex': 'flex-col max-md:gap-2'} `}>
                {/* price text */}
                    <p className={`${isHomePage ? 'text-xl' : 'text-sm max-md:text-[14px]'} font-bold max-md:text-base`}>{productPrice}</p>
                    <div className={`relative ${isHomePage ? 'w-6 h-6' : 'w-3 h-3 hidden'} `}>
                         <Image
                            src="/mini_arrow.svg"
                            alt="chevron"
                            fill
                            style={{ objectFit: 'contain'}}
                         />
                    </div>
                    {isHomePage ? <div 
                        onClick={handleAddToCart}
                        className="relative bg-black p-1 rounded-md cursor-pointer hover:bg-gray-800 transition-colors" aria-label="Add to cart">
                         <Image
                            src="/shop_icon.svg"
                            alt="shop icon"
                            style={{ objectFit: 'contain'}}
                            width={isHomePage ? 26 : 20 }
                            height={isHomePage ? 40 : 20}
                         />
                    </div> : <div 
                        onClick={handleAddToCart}
                        className="relative bg-black py-1 px-8 rounded-none cursor-pointer hover:bg-gray-800 transition-colors" aria-label="Add to cart">
                         <p className="text-white">Acheter</p>
                    </div>}
                    
               </div>
            </div>
        </div>
    )
}
