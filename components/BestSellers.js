
import ProductCard from "./ui/ProductCard";
import SectionTitle from "./ui/SectionTitle";

export default function BestSellers() {
    return (
        <div className="flex flex-col gap-10">
           <SectionTitle title="Nos Best Sellers" seeAll={true}></SectionTitle>
            <div>
                <ProductCard></ProductCard>

            </div>
        </div>
    )
}