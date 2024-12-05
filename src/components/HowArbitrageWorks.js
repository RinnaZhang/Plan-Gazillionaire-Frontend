import React from "react";
import "../index.css";

function HowArbitrageWorks() {
    return (
      <section className="bg-[#0E1A2B] text-white py-14 px-10">
        <h2 className="text-4xl font-bold text-center mb-6">How Does Arbitrage Work?</h2>
        <div className="flex flex-wrap justify-center gap-12 items-start">
          {/* Explanation Section */}
          <div className="max-w-lg text-xl text-gray-300 leading-relaxed">
            <p>
              Arbitrage betting allows you to profit by exploiting price differences between platforms for the same event. For example:
            </p>
            <ul className="list-disc mt-4 ml-5">
              <li>On Kalshi, "No" is priced at <span className="text-blue-400">59¢</span>.</li>
              <li>On Polymarket, "Yes" is priced at <span className="text-pink-400">13¢</span>.</li>
            </ul>
            <p className="mt-6">
              You can bet <span className="text-blue-400">$59</span> on "No" at Kalshi and <span className="text-pink-400">$13</span> on "Yes" at Polymarket. Regardless of the outcome, your total payout will be $100.
            </p>
          </div>
  
          {/* Visual Chart */}
          <div className="bg-[#162639] p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-white">Example Comparison</h3>
            <div className="flex items-center justify-between">
              <div className="flex-1 text-center">
                <p className="text-lg text-gray-400">Kalshi</p>
                <div className="bg-blue-500 text-white font-bold text-3xl py-4 px-6 rounded mt-2">
                  59¢ <span className="text-base">No</span>
                </div>
              </div>
              <div className="flex-1 text-center">
                <p className="text-lg text-gray-400">Polymarket</p>
                <div className="bg-pink-500 text-white font-bold text-3xl py-4 px-6 rounded mt-2">
                  13¢ <span className="text-base">Yes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default HowArbitrageWorks;
  