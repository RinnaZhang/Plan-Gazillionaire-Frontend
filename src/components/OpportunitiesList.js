import React, { useState, useEffect } from 'react';
import OpportunityDetails from './OpportunityDetails';
import '../index.css';
import axios from 'axios';

function OpportunitiesList() {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch all opportunities
  const fetchOpportunities = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:9000/api/v1/arbitrage');
      setOpportunities(response.data);
    } catch (error) {
      setError('Failed to load opportunities');
    } finally {
      setLoading(false);
    }
  };

  // fetch details of a specific opportunity by ID (user-selected)
  const fetchOpportunityDetails = async (arb_id) => {
    if (!arb_id) {
      setError('Invalid opportunity ID');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:9000/api/v1/arbitrage/${arb_id}`);
      setSelectedOpportunity(response.data);
    } catch (error) {
      setError('Failed to load opportunity details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  return (
    <div>
      <h2>&nbsp;</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opportunities.map((opp, index) => (
          <div 
            key={opp.arb_id}  // Ensure the key is unique
            className="dark-bg box-neon-green-light p-4 rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer"
          >
            {/* Display only a brief summary here */}
            <h3 className="text-xl font-bold">Arbitrage Opportunity {index + 1}</h3>
            <p>Expected Profit: ${opp.profit}</p>
            {/* Add the "See Details" button here */}
            <button 
              onClick={() => fetchOpportunityDetails(opp.arb_id)} 
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              See Details
            </button>
          </div>
        ))}
      </div>

      {/* Render the Opportunity Details as a Modal if an opportunity is selected */}
      {selectedOpportunity && (
        <div className="modal-overlay">
          <div className="modal-content dark-bg p-4 rounded-lg shadow-md">
            <OpportunityDetails opportunity={selectedOpportunity} />
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
}

export default OpportunitiesList;
