import React from "react";
import "../index.css";
import kalshiScreenshot from "../assets/kalshi-screenshot.png";
import polymarketScreenshot from "../assets/polymarket-screenshot.png";

function Testimonials() {
  return (
    <section className="testimonials-section py-14 px-10">
      <h2 className="text-4xl font-bold text-center bebas-neue-regular mb-6">
        TESTIMONIALS
      </h2>
      <div className="testimonial-example bg-[#162639] p-6 rounded-lg shadow-md text-white">
        <h3 className="text-2xl font-semibold text-pink-400 mb-4 bebas-neue-regular">
          Example: Will Trump End the Department of Education?
        </h3>
        <p>
          The developer team identified an arbitrage opportunity by betting on{" "}
          <span className="text-blue-400">"Yes"</span> at Polymarket ($13) and{" "}
          <span className="text-pink-400">"No"</span> at Kalshi ($61). Combined,
          the total cost of betting was $74, guaranteeing a return of $100.
        </p>
        <p className="text-blue-400 mt-4 font-bold">
          ROI: 24.5% | Annualized Return: 6.125%<br />
          <span className="text-pink-400">RISK-FREE PROFIT</span>
        </p>
        <div className="testimonials-images-container flex justify-center gap-6 mt-6">
          <a
            href="https://kalshi.com/markets/kxdoed/doe-eliminated"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 transition transform duration-300"
          >
            <img
              src={kalshiScreenshot}
              alt="Kalshi Screenshot - Trump Education Bet"
              className="testimonials-image rounded-lg shadow-lg"
            />
          </a>
          <a
            href="https://polymarket.com/event/trump-ends-department-of-education-in-first-100-days?tid=1733450332628"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 transition transform duration-300"
          >
            <img
              src={polymarketScreenshot}
              alt="Polymarket Screenshot - Trump Education Bet"
              className="testimonials-image rounded-lg shadow-lg"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
