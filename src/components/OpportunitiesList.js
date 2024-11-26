import React, { useState, useEffect } from 'react';
import '../index.css';
import axios from 'axios';
import OpportunityDetails from './OpportunityDetails';

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

        setOpportunities(opportunitiesData);
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
      setLoading(true); // Set loading while fetching the specific opportunity
      const response = await axios.get(`http://localhost:9000/api/v1/arbitrage/${arb_id}`);
      console.log("Fetched Opportunity Details:", response.data);
      setSelectedOpportunity(response.data);
    } catch (error) {
      console.error("Error fetching opportunity details:", error);
      setError("Failed to fetch opportunity details.");
    } finally {
      setLoading(false);
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
            <p>{opp.bet_description_1} / {opp.bet_description_2}</p>

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
          <div className="modal-content">
            <div className="modal-header">Details for Arbitrage Opportunity</div>
            <div className="modal-details">
              <p><strong>Bet 1:</strong> {selectedOpportunity.bet_description_1} ({selectedOpportunity.website_1})</p>
              <p><strong>Bet Side 1:</strong> {selectedOpportunity.bet_side_1}</p>
              <hr style={{ margin: '10px 0' }} />
              <p><strong>Bet 2:</strong> {selectedOpportunity.bet_description_2} ({selectedOpportunity.website_2})</p>
              <p><strong>Bet Side 2:</strong> {selectedOpportunity.bet_side_2}</p>
              <hr style={{ margin: '10px 0' }} />
              <p><strong>Profit:</strong> ${selectedOpportunity.profit.toFixed(2)}</p>
              <p><strong>Timestamp:</strong> {selectedOpportunity.timestamp ? new Date(selectedOpportunity.timestamp).toLocaleString() : "N/A"}</p>
        </div>
        <button
          onClick={() => setSelectedOpportunity(null)}
          className="close-button"
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

