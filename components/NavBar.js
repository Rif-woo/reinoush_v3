import Link from "next/link"

export default function NavBar(){
    return(
        <nav className="w-full flex justify-center items-center">

                <div className="w-1/2 flex justify-around items-center">
                    <Link 
                        href=""
                        className="text-black text-xl"
                    >
                        Accueil
                    </Link>

                    <Link 
                        href=""
                        className="text-black text-xl"
                    >
                        Parfum Homme
                    </Link>

                    <Link 
                        href=""
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
                        href=""
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
                </div>

        </nav>
    )
}