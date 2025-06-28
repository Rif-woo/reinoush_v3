import BestSellers from "@/components/BestSellers";
import Categories from "@/components/Categories";
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
      <main className="flex flex-col p-5 gap-48">
        <BestSellers></BestSellers>
        <Categories></Categories>
      </main>
    </div>
  );
}
