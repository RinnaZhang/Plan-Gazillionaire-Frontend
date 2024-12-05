import React from "react";
import "../index.css";

function ArbitrageCalculator() {
  const kalshiNoPrice = 59; // "No" on Kalshi
  const polymarketYesPrice = 13; // "Yes" on Polymarket

  const totalCost = kalshiNoPrice + polymarketYesPrice;
  const guaranteedPayout = 100;
  const profit = guaranteedPayout - totalCost;

  return (
    <section className="bg-[#0E1A2B] text-white py-14 px-10">
      <h2 className="text-4xl font-bold text-center mb-6">Arbitrage Calculator</h2>
      <div className="flex flex-col md:flex-row justify-center items-start gap-12">
        {/* Explanation */}
        <div className="max-w-lg text-xl text-gray-300 leading-relaxed">
          <p>Using this example:</p>
          <ul className="list-disc mt-4 ml-5">
            <li>
              Bet <span className="text-blue-400">$59</span> on "No" at Kalshi.
            </li>
            <li>
              Bet <span className="text-pink-400">$13</span> on "Yes" at Polymarket.
            </li>
          </ul>
          <p className="mt-6 text-xl">
            Total cost: <span className="text-blue-400">${totalCost}</span>.
          </p>
          <p className="mt-4 text-xl">
            Guaranteed payout: <span className="text-blue-400">${guaranteedPayout}</span>.
          </p>
          <p className="mt-6 font-bold text-2xl text-center text-pink-400">
            Arbitrage profit: <span className="text-red-400">${profit}</span>.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ArbitrageCalculator;


  