import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FCFAF5]">
      <NavBar />
      <main className="pt-8 flex justify-center mx-auto">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
