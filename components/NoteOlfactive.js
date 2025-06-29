'use client'

import { useState } from "react";
import SectionTitle from "./ui/SectionTitle";
import Image from "next/image";
const productsData = [
  { id: 1, name: "Grace", image: "/Grace50.PNG", price: "5000 Fcfa", type: "Femme", volume: "50ml", note_de_coeur: ["Fruits rouges", "Fruits rouges"],note_de_tete: ["Menthe", "Lavande"], note_de_fond: ["Menthe", "Lavande"] },
  { id: 2, name: "mighty", image: "/Mighty50.PNG", price: "3000 Fcfa", type: "Femme", volume: "30ml", note_de_coeur: ["Fruits rouges", "Fruits rouges"], note_de_tete: ["Menthe", "Lavande"], note_de_fond: ["Menthe", "Lavande"]},
  { id: 3, name: "favor", image: "/Grace50.PNG", price: "5000 Fcfa", type: "Femme", volume: "50ml", note_de_coeur: ["Fruits rouges", "Fruits rouges"], note_de_tete: ["Menthe", "Lavande"], note_de_fond: ["Menthe", "Lavande"] },
  { id: 4, name: "Grace", image: "/Grace50.PNG", price: "3000 Fcfa", type: "Femme", volume: "30ml", note_de_coeur: ["Fruits rouges", "Fruits rouges"],note_de_tete: ["Menthe", "Lavande"], note_de_fond: ["Menthe", "Lavande"] },
  { id: 5, name: "Grace", image: "/Grace50.PNG", price: "5000 Fcfa", type: "Femme", volume: "50ml", note_de_coeur: ["Fruits rouges", "Fruits rouges"], note_de_tete: ["Menthe", "Lavande"],note_de_fond: ["Menthe", "Lavande"] },
];
export default function NoteOlfactive() {
    const [index, setIndex] = useState(0)
    return (
        <div className="flex flex-col justify-center items-center w-full px-44 gap-20">
            <SectionTitle title="Notes Olfactives" seeAll={false} />
            
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-col justify-start items-start gap-5 w-1/4">
                    <p className="text-3xl font-bold">{productsData[index].name}</p>

                    <p className="text-3xl">Un parfum à la fois raffiné, élégant</p>

                    <button className="bg-[#FFF8E6] w-28 h-12 border-1 cursor-pointer">Acheter</button>
                    
                    <div className="flex gap-5">
                    <button className="relative cursor-pointer w-10 h-10" onClick={() => index > 0 ? setIndex(index - 1) : index}>
                        <Image
                            src="/arrow-left.svg"
                            alt="hero section image"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </button>

                    <p className="text-3xl">{productsData[index].id}</p>

                    <button className="relative cursor-pointer w-10 h-10" onClick={() => index + 1< productsData.length ? setIndex(index + 1) : index}>
                        <Image
                            src="/arrow-right.svg"
                            alt="hero section image"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </button>

                    </div>
                </div>

                <div className="relative w-[250px] h-[400px] bg-black rounded-lg">
                       <Image
                            src={productsData[index].image}
                            alt="hero section image"
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-lg opacity-80"
                        />
                </div>

                <div className="border-2 w-1/4 h-[450px] p-5">
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col">
                            <p className="font-bold text-2xl">Notes de coeur</p>
                            <div className="w-full border-1"></div>
                            {
                                productsData[index].note_de_coeur.map((element) => (
                                    <div className="flex flex-col text-xl">
                                        {element}
                                    </div>
                                ))
                            }
                        </div>

                        <div className="flex flex-col">
                            <p className="font-bold text-2xl">Notes de tete</p>
                            <div className="w-full border-1"></div>

                               {
                                    productsData[index].note_de_fond.map((element) => (
                                        <div className="flex flex-col text-xl">
                                            {element}
                                        </div>
                                    ))
                                }
                        </div>


                        <div className="flex flex-col">
                            <p className="font-bold text-2xl">Notes de fond</p>
                            <div className="w-full border-1"></div>
                               {
                                    productsData[index].note_de_tete.map((element) => (
                                        <div className="flex flex-col text-xl">
                                            {element}
                                        </div>
                                    ))
                                }
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}