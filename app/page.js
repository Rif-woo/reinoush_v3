import HeroSection from "@/components/heroSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-5">
      <header className="w-full h-full">
        <HeroSection></HeroSection>
      </header>
    </div>
  );
}
