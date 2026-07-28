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
import { QuotePage } from "./components/QuotePage";

export default function App() {
  const [activePage, setActivePage] = useState<"home" | "quote">("home");

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header
        activePage={activePage}
        onNavigateToHome={() => setActivePage("home")}
        onNavigateToQuotePage={() => setActivePage("quote")}
      />
      <main>
        {activePage === "home" ? (
          <>
            <Hero />
            <About />
            <Stats />
            <ServicesDetailed />
            <BlissBlends />
            <Clients />
            <Capabilities />
            <Reviews />
            <CTA onNavigateToQuotePage={() => setActivePage("quote")} />
          </>
        ) : (
          <QuotePage onBack={() => setActivePage("home")} />
        )}
      </main>
      <Footer />
    </div>
  );
}