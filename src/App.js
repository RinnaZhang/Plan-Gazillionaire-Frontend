import React from "react";
import "./App.css";
import "./index.css";
import OpportunitiesList from "./components/OpportunitiesList";
import HowArbitrageWorks from "./components/HowArbitrageWorks";
import Testimonials from "./components/Testimonials";
import HeroSection from "./components/HeroSection";

function App() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="App">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full bg-[#0E1A2B] text-white flex justify-between items-center px-6 py-4 z-50 shadow">
        <div className="text-4xl font-bold cursor-pointer bebas-neue-regular" onClick={() => scrollToSection('top')}>
          PoliBets
        </div>
        <div className="flex space-x-6">
          <button
            className="text-white hover:text-blue-400 transition"
            onClick={() => scrollToSection("opportunities")}
          >
            Arbitrage Opportunities
          </button>
          <button
            className="text-white hover:text-blue-400 transition"
            onClick={() => scrollToSection("how-it-works")}
          >
            How Does Arbitrage Work?
          </button>
          <button
            className="text-white hover:text-blue-400 transition"
            onClick={() => scrollToSection("testimonials")}
          >
            Testimonials
          </button>
        </div>
      </nav>

      {/* Give HeroSection an ID at the top for easy scroll to top if needed */}
      <div id="top">
        <HeroSection />
      </div>

      <main>
        {/* Arbitrage Opportunities Section */}
        <section id="opportunities" className="section-spacing">
          <OpportunitiesList />
        </section>

        {/* How Arbitrage Works Section */}
        <section id="how-it-works" className="section-spacing">
          <HowArbitrageWorks />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="section-spacing">
          <Testimonials />
        </section>
      </main>
    </div>
  );
}

export default App;
