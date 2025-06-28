import Image from "next/image";
import { useCart } from '@/contexts/CartContext';
import { useCartNotification } from '@/contexts/CartNotificationContext';

export default function ProductCard({
    productName = "Grace", 
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
        showNotification(productName);
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
        <div className={`flex flex-col ${isHomePage ? 'w-[350px] h-[550px]' : 'w-[250px] h-[350px]'} `}>
            <div className="relative w-full h-full p-3 bg-black flex">
                <div className="w-full flex justify-between">
                    {isNew && (
                        <div className={`z-10 ${isHomePage ? 'w-28 h-7' : 'w-20 h-7'} rounded-md bg-black`}>
                            <p className={`text-white ${isHomePage ? 'text-xl' : 'text-lg'}  text-center`}>Nouveau</p>
                        </div>
                    )}
                    {!isNew && <div></div>}

                    <div className={`z-10 ${isHomePage ? 'w-28 h-7 ' : 'w-20 h-7 '} rounded-md ${getTypeColor(ProductType)}`}>
                        <p className="text-white text-xl text-center">{ProductType}</p>
                    </div>
                </div>

               <Image
                    src={productImage}
                    alt={productName}
                    fill
                    style={{ objectFit: 'cover', opacity: 0.8 }}
                />
            </div>

            <div className="w-full h-1/9 border-2 flex justify-between items-center p-2">
               <div className="flex items-center gap-2">
                    <p className={`text-black ${isHomePage ? 'text-xl' : 'text-sm'}  font-bold`}>{productName}</p>
                    <div className="rounded-full w-2 h-2 bg-black"></div>
                    <p className={`${isHomePage ? 'text-xl' : 'text-sm'}`}>{ProductVolume}</p>
               </div>

               <div className="flex items-center">
                    <p className={`${isHomePage ? 'text-xl' : 'text-sm'} font-bold`}>{productPrice}</p>
                    <div className={`relative ${isHomePage ? 'w-6 h-6' : 'w-3 h-3'} `}>
                         <Image
                            src="/mini_arrow.svg"
                            alt="chevron"
                            fill
                            style={{ objectFit: 'contain'}}
                         />
                    </div>
               <div 
                        onClick={handleAddToCart}
                        className="relative bg-black p-1 rounded-md cursor-pointer hover:bg-gray-800 transition-colors" aria-label="Add to cart">
                         <Image
                            src="/shop_icon.svg"
                            alt="shop icon"
                            style={{ objectFit: 'contain'}}
                            width={isHomePage ? 26 : 20}
                            height={isHomePage ? 40 : 20}
                         />
                    </div>
               </div>
            </div>
        </div>
    )
}
