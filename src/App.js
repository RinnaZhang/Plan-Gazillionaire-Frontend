import React from "react";
import "./App.css";
import "./index.css";
import Description from "./components/Description";
import HowArbitrageWorks from "./components/HowArbitrageWorks";
import Testimonials from "./components/Testimonials";
import OpportunitiesList from "./components/OpportunitiesList";

function App() {
  return (
    <div className="App">
      <header className="bg-[#0E1A2B] text-center py-6">
        <h1 className="text-4xl font-bold text-white">PoliBets</h1>
        <p className="text-blue-400 text-lg">
          Your gateway to smart betting and arbitrage opportunities
        </p>
      </header>
      <main>
        <section className="section-spacing">
          <Description />
        </section>
        <section className="section-spacing">
          <HowArbitrageWorks />
        </section>
        <section className="section-spacing">
          <Testimonials />
        </section>

        <section className="bg-[#0E1A2B] text-center py-6 px-10">
          <p className="text-4xl font-bold text-white">
            Finding bets with 
            <span className="text-blue-400"> lower risk </span>
            is extremely 
            <span className="text-blue-400"> time consuming</span>...
          </p>
          <p className="text-4xl font-bold text-white">
            but our tool finds them in seconds, 
            <span className="text-blue-400"> automatically</span>.
          </p>
        </section>

        <section className="section-spacing">
          <OpportunitiesList />
        </section>
      </main>
    </div>
  );
}

export default App;
