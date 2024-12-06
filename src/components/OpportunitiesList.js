import React, { useState, useEffect } from "react";
import "../index.css";
import axios from "axios";

const OpportunitiesList = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]); // For search filtering
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [sortOption, setSortOption] = useState("highest"); // Default sorting option
  const [searchTerm, setSearchTerm] = useState(""); // Search term

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://plan-gazillionaire-872939346033.us-central1.run.app/api/v1/arbitrage');            
        console.log("Fetched opportunities response:", response); // Add this line
        // Sort opportunities by profit in descending order initially
        const sortedOpportunities = response.data.sort((a, b) => b.profit - a.profit);
        setOpportunities(sortedOpportunities);
        setFilteredOpportunities(sortedOpportunities);
      } catch (err) {
        console.error("Error fetching opportunities:", err); // Add this line
        setError("Failed to fetch opportunities.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchOpportunities();
  }, []);

  // Sorting logic
  const sortOpportunities = (opps) => {
    let sorted = [...opps];
    if (sortOption === "lowest") {
      sorted = sorted.sort((a, b) => a.profit - b.profit);
    } else if (sortOption === "highest") {
      sorted = sorted.sort((a, b) => b.profit - a.profit);
    } else if (sortOption === "alphabetical") {
      sorted = sorted.sort((a, b) => a.bet_description_1.localeCompare(b.bet_description_1));
    }
    return sorted;
  };

  // Search logic
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = opportunities.filter((opp) =>
      opp.bet_description_1.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredOpportunities(sortOpportunities(filtered)); // Apply sorting to search results
  };

  // Sorting on change of sortOption
  useEffect(() => {
    setFilteredOpportunities(sortOpportunities(filteredOpportunities));
  }, [sortOption]);

  return (
    <section className="py-14 px-10 bg-[#0E1A2B]">
      <h2 className="text-3xl font-bold text-center text-white mb-10">Arbitrage Opportunities</h2>
      {loading && <p className="text-white text-center">Loading...</p>}
      {error && <p className="text-red-400 text-center">{error}</p>}

      {/* Search and Sorting */}
      <div className="flex justify-center mb-6 gap-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search opportunities..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded px-3 py-2 w-64"
        />

        {/* Sorting Dropdown */}
        <div>
          <label htmlFor="sort" className="text-white mr-4">Sort by:</label>
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

      {/* Opportunities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpportunities.map((opp) => (
          <div
            key={opp.arb_id}
            className="card cursor-pointer"
            onClick={() => setSelectedOpportunity(opp)}
          >
            {/* Event Title */}
            <h3 className="text-xl font-bold text-blue-400">{opp.bet_description_1}</h3>

            {/* Profit Information */}
            <p className="mt-2 text-pink-400 text-lg font-semibold">
              Potential Profit: ${opp.profit.toFixed(2)}
            </p>

            {/* Platform Names */}
            <p className="text-gray-300 text-sm">
              {opp.website_1} ↔ {opp.website_2}
            </p>

            {/* See Details Button */}
            <button className="button mt-4 block mx-auto">See Details</button>
          </div>
        ))}
      </div>

      {/* Modal for selected opportunity */}
      {selectedOpportunity && (
        <div className="modal-overlay" onClick={() => setSelectedOpportunity(null)}>
          <div className="modal-content">
            <h3 className="modal-header">Details for Arbitrage Opportunity</h3>
            <div className="modal-details">
              <p>
                <strong>Bet 1:</strong> {selectedOpportunity.bet_description_1} (
                {selectedOpportunity.website_1})
              </p>
              <p>
                <strong>Bet Side 1:</strong> {selectedOpportunity.bet_side_1}
              </p>
              <hr className="my-2" />
              <p>
                <strong>Bet 2:</strong> {selectedOpportunity.bet_description_2} (
                {selectedOpportunity.website_2})
              </p>
              <p>
                <strong>Bet Side 2:</strong> {selectedOpportunity.bet_side_2}
              </p>
              <p className="text-pink-400 font-bold">
                Profit: ${selectedOpportunity.profit.toFixed(2)}
              </p>
              <p>
                <strong>Timestamp:</strong>{" "}
                {new Date(selectedOpportunity.timestamp).toLocaleString()}
              </p>
            </div>
            <button className="close-button">Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default OpportunitiesList;
