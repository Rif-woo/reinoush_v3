"use client";

import Link from "next/link";
import { useState } from 'react';
import CartIcon from './CartIcon';
import Cart from './Cart';

export default function NavBar(){
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    return(
        <>
        <nav className="w-full flex justify-center items-center">

                <div className="w-1/2 flex justify-around items-center">
                    <Link 
                        href=""
                        className="text-black text-xl"
                    >
                        Accueil
                    </Link>

                    <Link 
                        href="/parfum-homme"
                        className="text-black text-xl"
                    >
                        Parfum Homme
                    </Link>

                    <Link 
                        href="/parfum-femme"
                        className="text-black text-xl"
                    >
                        Parfum Femme
                    </Link>
                </div>

                <Link 
                    href="/"
                    className="text-black text-3xl font-bold w-full text-center"
                >
                    REINOUSH
                </Link>

                <div className="w-1/2 flex justify-around items-center">
                    <Link 
                        href="/produits"
                        className="text-black text-xl"
                    >
                        Produits
                    </Link>

                    <Link 
                        href=""
                        className="text-black text-xl"
                    >
                        À propos
                    </Link>


                    <Link 
                        href=""
                        className="text-black text-xl "
                    >
                        Contact
                    </Link>
                    
                    <CartIcon 
                        onClick={() => setIsCartOpen(true)}
                        className="ml-4"
                    />
                </div>

        </nav>
        
        <Cart 
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
        />
        </>
    )
}