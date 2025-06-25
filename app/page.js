import BestSellers from "@/components/BestSellers";
import HeroSection from "@/components/heroSection";
import HeroSectionSeparator from "@/components/ui/separator";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <header className="w-full h-full p-5 pb-20">
        <HeroSection></HeroSection>
      </header>
        <HeroSectionSeparator></HeroSectionSeparator>
      <main className="p-5">
        <BestSellers></BestSellers>
      </main>
    </div>
  );
}
