import BestSellers from "@/components/BestSellers";
import Categories from "@/components/Categories";
import HeroSection from "@/components/heroSection";
import NavBar from "@/components/NavBar";
import NoteOlfactive from "@/components/NoteOlfactive";
import HeroSectionSeparator from "@/components/ui/separator";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <header className="w-full h-full flex flex-col gap-20 p-5 pb-20 pt-0">
            <NavBar></NavBar>

        <HeroSection></HeroSection>
      </header>
        <HeroSectionSeparator></HeroSectionSeparator>
      <main className="flex flex-col p-5 gap-48">
        <BestSellers></BestSellers>
        <Categories></Categories>
        <NoteOlfactive></NoteOlfactive>
      </main>
    </div>
  );
}
