import React from "react";
import "../index.css";

function HowArbitrageWorks() {
  return (
    <section className="bg-[#0E1A2B] text-white py-14 px-10">
      <h2 className="text-4xl font-bold text-center bebas-neue-regular mb-6">
        HOW DOES ARBITRAGE WORK?
      </h2>
      <div className="flex flex-wrap justify-center gap-12 items-start">
        {/* Explanation Section */}
        <div className="max-w-lg text-xl text-gray-300 leading-relaxed">
          <p>
            Arbitrage betting allows you to profit by exploiting price
            differences between platforms for the same event. For example:
          </p>
          <ul className="list-disc mt-4 ml-5">
            <li>
              On Kalshi, "No" is priced at <span className="text-blue-400">60¢</span>.
            </li>
            <li>
              On Polymarket, "Yes" is priced at <span className="text-pink-400">20¢</span>.
            </li>
          </ul>
          <p className="mt-6">
            You can bet <span className="text-blue-400">$60</span> on "No" at
            Kalshi and <span className="text-pink-400">$20</span> on "Yes" at
            Polymarket. Regardless of the outcome, your total payout will be
            $100.
          </p>
        </div>

        {/* Visual Comparison */}
        <div className="bg-[#162639] p-6 rounded-lg shadow-lg w-[300px]">
          <h3 className="text-center text-white text-lg mb-4 bebas-neue-regular">
            Example Comparison
          </h3>
          <div className="flex justify-between">
            <div className="w-[120px] h-[100px] bg-blue-500 text-white font-bold text-center flex flex-col items-center justify-center rounded">
              <p className="text-sm">Kalshi</p>
              <p className="text-2xl">60¢</p>
              <p className="text-base">No</p>
            </div>
            <div className="w-[120px] h-[100px] bg-pink-500 text-white font-bold text-center flex flex-col items-center justify-center rounded">
              <p className="text-sm">Polymarket</p>
              <p className="text-2xl">20¢</p>
              <p className="text-base">Yes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowArbitrageWorks;
