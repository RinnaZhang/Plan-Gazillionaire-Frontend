import React, { useState, useEffect } from 'react';
import '../index.css';
import axios from 'axios';

const OpportunitiesList = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  // Fetch arbitrage opportunities from the backend
  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("http://localhost:9000/api/v1/arbitrage");
        const opportunitiesData = response.data;

        // Fetch bet descriptions for each opportunity
        const enrichedOpportunities = await Promise.all(
          opportunitiesData.map(async (opportunity) => {
            const bet1Response = await axios.get(
              `http://localhost:9000/api/v1/bets/${opportunity.bet_id1}`
            );
            const bet2Response = await axios.get(
              `http://localhost:9000/api/v1/bets/${opportunity.bet_id2}`
            );

            return {
              ...opportunity,
              bet1Description: bet1Response.data.name,
              bet2Description: bet2Response.data.name,
            };
          })
        );

        setOpportunities(enrichedOpportunities);
      } catch (error) {
        console.error("Error fetching arbitrage opportunities:", error);
        setError("Failed to fetch opportunities.");
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  // Fetch details of a specific arbitrage opportunity
  const fetchOpportunityDetails = async (arb_id) => {
    try {
      const response = await axios.get(`http://localhost:9000/api/v1/arbitrage/${arb_id}`);
      console.log("Fetched Opportunity Details:", response.data);
      setSelectedOpportunity(response.data); // Ensure data is passed directly
    } catch (error) {
      console.error("Error fetching opportunity details:", error);
      setError("Failed to fetch opportunity details.");
    }
  };  

  return (
    <div>
      <h2>&nbsp;</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opportunities.map((opp, index) => (
          <div
            key={opp.arb_id}
            className="dark-bg box-neon-green-light p-4 rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer"
          >
            <h3 className="text-xl font-bold">Arbitrage Opportunity {index + 1}</h3>
            <p>Bet 1: {opp.bet1Description}</p>
            <p>Bet 2: {opp.bet2Description}</p>
            <p>Expected Profit: ${opp.profit}</p>

            <button
              onClick={() => fetchOpportunityDetails(opp.arb_id)}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              See Details
            </button>
          </div>
        ))}
      </div>

      {selectedOpportunity && (
        <div className="modal-overlay">
          {console.log("Selected Opportunity Data:", selectedOpportunity)}
          <div className="modal-content dark-bg p-4 rounded-lg shadow-md">
            <h3>Details for Arbitrage Opportunity</h3>
            <p>Bet 1: {selectedOpportunity.bet1Description || "N/A"}</p>
            <p>Bet 2: {selectedOpportunity.bet2Description || "N/A"}</p>
            <p>Profit: ${selectedOpportunity.profit.toFixed(2) || "N/A"}</p>
            <p>Timestamp: {selectedOpportunity.timestamp ? new Date(selectedOpportunity.timestamp).toLocaleString() : "N/A"}</p>
            <button
              onClick={() => setSelectedOpportunity(null)}
              className="close-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpportunitiesList;