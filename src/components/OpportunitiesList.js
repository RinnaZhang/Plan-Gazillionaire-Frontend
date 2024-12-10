import React, { useState, useEffect } from "react";
import "../index.css";
import axios from "axios";

const OpportunitiesList = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [sortOption, setSortOption] = useState("highest");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch arbitrage opportunities
        const arbitrageResponse = await axios.get(
          "https://plan-gazillionaire-872939346033.us-central1.run.app/api/v1/arbitrage"
        );

        // Fetch bets with URLs
        const betsResponse = await axios.get(
          "https://plan-gazillionaire-872939346033.us-central1.run.app/api/v1/bets"
        );

        // Create a map of bet_id to bet_url
        const betUrlMap = betsResponse.data.reduce((map, bet) => {
          map[bet.bet_id] = bet.bet_url;
          return map;
        }, {});

        // Merge bet_url into arbitrage opportunities
        const mergedOpportunities = arbitrageResponse.data.map((opp) => ({
          ...opp,
          bet_url1: betUrlMap[opp.bet_id1] || null,
          bet_url2: betUrlMap[opp.bet_id2] || null,
          bet_amount_1: opp.bet_amount_1 || 0,
          bet_amount_2: opp.bet_amount_2 || 0,
        }));

        // Sort the opportunities
        const sortedOpportunities = mergedOpportunities.sort(
          (a, b) => b.profit - a.profit
        );

        setOpportunities(sortedOpportunities);
        setFilteredOpportunities(sortedOpportunities);
      } catch (err) {
        console.error("Error fetching opportunities:", err);
        setError("Failed to fetch opportunities.");
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  const sortOpportunities = (opps) => {
    let sorted = [...opps];
    if (sortOption === "lowest") {
      sorted.sort((a, b) => a.profit - b.profit);
    } else if (sortOption === "highest") {
      sorted.sort((a, b) => b.profit - a.profit);
    } else if (sortOption === "alphabetical") {
      sorted.sort((a, b) =>
        a.bet_description_1.localeCompare(b.bet_description_1)
      );
    }
    return sorted;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = opportunities.filter((opp) =>
      opp.bet_description_1.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredOpportunities(sortOpportunities(filtered));
  };

  useEffect(() => {
    setFilteredOpportunities(sortOpportunities(filteredOpportunities));
  }, [sortOption]);

  return (
    <section className="px-10 bg-[#0E1A2B] pb-10">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Arbitrage Opportunities
      </h2>
      {loading && <p className="text-white text-center">Loading...</p>}
      {error && <p className="text-red-400 text-center">{error}</p>}

      {/* Search and Sorting */}
      <div className="flex justify-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search opportunities..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded px-3 py-2 w-64"
        />
        <div>
          <label htmlFor="sort" className="text-white mr-4">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="highest">Highest Profit</option>
            <option value="lowest">Lowest Profit</option>
            <option value="alphabetical">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Table Layout for Opportunities */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-white">
          <thead>
            <tr className="bg-[#162639]">
              <th className="py-3 px-4 font-bold text-left">Event</th>
              <th className="py-3 px-4 font-bold text-left">Potential Profit</th>
              <th className="py-3 px-4 font-bold text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOpportunities.map((opp) => (
              <tr
                key={opp.arb_id}
                className="border-b border-gray-700 hover:bg-[#1D2E47] transition-colors"
              >
                <td className="py-3 px-4 text-blue-400 font-medium text-left">
                  {opp.bet_description_1}
                </td>
                <td className="py-3 px-4 text-green-400 font-semibold text-left">
                  ${opp.profit.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    className="button"
                    onClick={() => setSelectedOpportunity(opp)}
                  >
                    See Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for selected opportunity */}
      {selectedOpportunity && (
        <div className="modal-overlay" onClick={() => setSelectedOpportunity(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <h4 className="text-lg font-bold mb-2 bebas-neue-regular">
                BET 1
              </h4>
              <p>
                <strong>Event:</strong> {selectedOpportunity.bet_description_1}
              </p>
              <p>
                <strong>Platform:</strong> {selectedOpportunity.website_1}
              </p>
              <p>
                <strong>Side:</strong> {selectedOpportunity.bet_side_1}
              </p>
              <p>
                <strong>Bet Amount:</strong> $
                {selectedOpportunity.bet_amount_1?.toFixed(2) || "N/A"}
              </p>
              {selectedOpportunity.bet_url1 && (
                <button
                  onClick={() =>
                    window.open(
                      selectedOpportunity.bet_url1,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition mt-2"
                >
                  Place Bet 1
                </button>
              )}

              <hr className="my-4 border-gray-600" />

              <h4 className="text-lg font-bold mb-2 bebas-neue-regular">
                BET 2
              </h4>
              <p>
                <strong>Event:</strong> {selectedOpportunity.bet_description_2}
              </p>
              <p>
                <strong>Platform:</strong> {selectedOpportunity.website_2}
              </p>
              <p>
                <strong>Side:</strong> {selectedOpportunity.bet_side_2}
              </p>
              <p>
                <strong>Bet Amount:</strong> $
                {selectedOpportunity.bet_amount_2?.toFixed(2) || "N/A"}
              </p>
              {selectedOpportunity.bet_url2 && (
                <button
                  onClick={() =>
                    window.open(
                      selectedOpportunity.bet_url2,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition mt-2"
                >
                  Place Bet 2
                </button>
              )}

              <hr className="my-4 border-gray-600" />

              <p className="text-green-400 font-bold mt-4">
                Profit: ${selectedOpportunity.profit.toFixed(2)}
              </p>

              <p className="text-sm text-gray-300">
                <strong>Timestamp:</strong>{" "}
                {new Date(selectedOpportunity.timestamp).toLocaleString()}
              </p>
            </div>

            <button
              className="close-button mt-4"
              onClick={() => setSelectedOpportunity(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default OpportunitiesList;
