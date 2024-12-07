import React from "react";
import "./App.css";
import "./index.css";
import OpportunitiesList from "./components/OpportunitiesList";
import HowArbitrageWorks from "./components/HowArbitrageWorks";
import Testimonials from "./components/Testimonials";
import HeroSection from "./components/HeroSection";

function App() {
  return (
    <div className="App">
      {/* Full-Page Hero Section */}
      <HeroSection />

      <main>
        {/* Arbitrage Opportunities Section */}
        {/* Adding an id here so the hero arrow can scroll directly to it */}
        <section id="opportunities" className="section-spacing">
          <OpportunitiesList />
        </section>

        {/* How Arbitrage Works Section */}
        <section className="section-spacing">
          <HowArbitrageWorks />
        </section>

        {/* Testimonials Section */}
        <section className="section-spacing">
          <Testimonials />
        </section>
      </main>
    </div>
  );
}

export default App;
