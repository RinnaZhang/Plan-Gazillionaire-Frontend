import React from "react";
import "./App.css";
import "./index.css";
import Description from "./components/Description";
import OpportunitiesList from "./components/OpportunitiesList";
import HowArbitrageWorks from "./components/HowArbitrageWorks";
import ArbitrageCalculator from "./components/ArbitrageCalculator";

function App() {
  return (
    <div className="App">
      <header className="bg-[#0E1A2B] text-center py-6 fade-in">
        <h1 className="text-4xl font-bold">PoliBets</h1>
        <p className="text-blue-400 text-lg">
          Your gateway to smart betting and arbitrage opportunities
        </p>
      </header>
      <main>
        <section className="section-spacing fade-in">
          <Description />
        </section>
        <section className="section-spacing fade-in">
          <HowArbitrageWorks />
        </section>
        <section className="section-spacing fade-in">
          <ArbitrageCalculator />
        </section>
        <section className="section-spacing fade-in">
          <OpportunitiesList />
        </section>
      </main>
    </div>
  );
}

export default App;
