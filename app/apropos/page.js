import APropos from "@/components/APropos";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-[#FCFAF5]">
      <NavBar />
      <main className="pt-8">
        <APropos />
      </main>
      <Footer />
    </div>
  );
}
