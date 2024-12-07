import React from "react";
import "./App.css";
import "./index.css";
import OpportunitiesList from "./components/OpportunitiesList";
import HowArbitrageWorks from "./components/HowArbitrageWorks";
import Testimonials from "./components/Testimonials";

function App() {
  return (
    <div className="App">
      {/* Hero / Header Section */}
      <header className="bg-[#0E1A2B] text-center py-20">
        <h1 className="text-5xl font-bold text-white mb-4">PoliBets</h1>
        <p className="text-blue-400 text-xl">
          Your gateway to smart betting and arbitrage opportunities
        </p>
      </header>

      <main>
        {/* Arbitrage Opportunities Section */}
        <section className="section-spacing">
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
