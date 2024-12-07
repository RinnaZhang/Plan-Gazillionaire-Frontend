import React from "react";

function HeroSection() {
  const scrollToOpportunities = () => {
    const opportunitiesSection = document.getElementById("opportunities");
    if (opportunitiesSection) {
      opportunitiesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="relative bg-[#0E1A2B] h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Background gradient overlay (optional) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0E1A2B] to-[#162639] opacity-70 pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-white mb-4">
          PoliBets
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Your ultimate platform for exploring smart betting strategies and arbitrage opportunities.
        </p>
        {/* "Get Started" button now scrolls down on click */}
        <button
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105"
          onClick={scrollToOpportunities}
        >
          Get Started
        </button>
      </div>

      {/* Bouncing Arrow */}
      <div className="absolute bottom-10 w-full flex justify-center">
        <div
          className="text-white text-4xl animate-bounce cursor-pointer"
          onClick={scrollToOpportunities}
        >
          &#x25BC;
        </div>
      </div>
    </header>
  );
}

export default HeroSection;
