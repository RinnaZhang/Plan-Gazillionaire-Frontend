import React, { useState, useEffect } from 'react';
import OpportunityDetails from './OpportunityDetails';
import '../index.css';
import axios from 'axios';

function OpportunitiesList() {
  const [opportunites, setOpportunites] = useState([]);
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
      <h2>Arbitrage Opportunities</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opportunities.map((opp) => (
          <div 
            key={opp.id} // Ensure this matches the actual ID field returned by your API
            onClick={() => fetchOpportunityDetails(opp.id)} // Load details when clicked
            className="dark-bg box-neon-green-light p-4 rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer"
          >
            <OpportunityDetails opportunity={opp} />
          </div>
        ))}
      </div>

      {/* Render the Opportunity Details as a Modal if an opportunity is selected */}
      {selectedOpportunity && (
        <div className="modal-overlay">
          <div className="modal-content dark-bg p-4 rounded-lg shadow-md">
            <OpportunityDetails opportunity={selectedOpportunity} />
            <button onClick={() => setSelectedOpportunity(null)} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OpportunitiesList;
