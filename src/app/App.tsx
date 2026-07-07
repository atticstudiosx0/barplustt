import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Stats } from "./components/Stats";
import { ServicesDetailed } from "./components/ServicesDetailed";
import { BlissBlends } from "./components/BlissBlends";
import { Clients } from "./components/Clients";
import { Capabilities } from "./components/Capabilities";
import { Reviews } from "./components/Reviews";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { QuoteModal } from "./components/QuoteModal";

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
      <main>
        <Hero />
        <About />
        <Stats />
        <ServicesDetailed />
        <BlissBlends />
        <Clients />
        <Capabilities />
        <Reviews />
        <CTA onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
      </main>
      <Footer />
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </div>
  );
}