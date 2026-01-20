import Image from "next/image";
import Link from "next/link";
import HeroSectionSeparator from "./ui/separator";

export default function Footer() {
    return (
        <footer className="py-16 px-8 w-full">
            {/* Separator */}
            <div className="mb-16">
                <HeroSectionSeparator />
            </div>

            {/* Footer Content */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
                    {/* Logo/Brand */}
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold text-black">Reinoush</h2>
                    </div>

                    {/* Navigation Column 1 */}
                    <div className="text-center md:text-left">
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-600 hover:text-black transition-colors">
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link href="/parfum-homme" className="text-gray-600 hover:text-black transition-colors">
                                    Parfums Hommes
                                </Link>
                            </li>
                            <li>
                                <Link href="/parfum-femme" className="text-gray-600 hover:text-black transition-colors">
                                    Parfums Femmes
                                </Link>
                            </li>
                              <li>
                                <Link href="/huile-parfumee" className="text-gray-600 hover:text-black transition-colors">
                                    Huiles Parfumées
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Navigation Column 2 */}
                    <div className="text-center md:text-left">
                        <ul className="space-y-2">
                             <li>
                                <Link href="/apropos" className="text-gray-600 hover:text-black transition-colors">
                                    À propos
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-600 hover:text-black transition-colors">
                                    Contact
                                </Link>
                            </li>
                             <li>
                                <Link href="/produits" className="text-gray-600 hover:text-black transition-colors">
                                    Tous nos Produits
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-semibold mb-4 text-black">Réseaux sociaux</h3>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <Link href="https://www.instagram.com/reiinoushh" target="_blank" className="hover:opacity-80 transition-opacity">
                                <Image
                                    src="/instagram.svg"
                                    alt="Instagram"
                                    width={24}
                                    height={24}
                                />
                            </Link>
                            <Link href="https://www.tiktok.com/@reiinoush?is_from_webapp=1&sender_device=pc" target="_blank" className="hover:opacity-80 transition-opacity">
                                <Image
                                    src="/tiktok.svg"
                                    alt="TikTok"
                                    width={24}
                                    height={24}
                                />
                            </Link>
                            <Link href="https://www.facebook.com/profile.php?id=61561506902241" target="_blank" className="hover:opacity-80 transition-opacity">
                                <Image
                                    src="/facebook.svg"
                                    alt="Facebook"
                                    width={24}
                                    height={24}
                                />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-gray-500 text-sm">
                    <p>© 2025 Nos Parfums. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
}
