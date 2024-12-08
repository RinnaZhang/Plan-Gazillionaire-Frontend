import React, { useState, useEffect } from "react";
import "../index.css";
import axios from "axios";
import OpportunityDetails from "./OpportunityDetails"; // Import the OpportunityDetails component

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
        const response = await axios.get(
          "https://plan-gazillionaire-872939346033.us-central1.run.app/api/v1/arbitrage"
        );
        const sortedOpportunities = response.data.sort((a, b) => b.profit - a.profit);
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
      <h2 className="text-3xl text-center text-white mb-6">
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
          <div className="modal-content">
            {/* Use OpportunityDetails component here */}
            <OpportunityDetails opportunity={selectedOpportunity} />
            <button className="close-button">Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default OpportunitiesList;
