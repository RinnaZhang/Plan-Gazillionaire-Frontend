import React from 'react';
import '../index.css';

function OpportunityDetails({ opportunity }) {
  if (!opportunity) {
    return <p>No details available</p>;
  }

  return (
    <div className="box-color box-neon-green-light p-4 rounded-lg shadow-md transition duration-300 ease-in-out">
      <h3 className="text-2xl header-color font-semibold mb-2">Details for Arbitrage Opportunity</h3>
      <p className="text-dark-blue mb-1"><strong>Bet 1:</strong> {opportunity.bet_description_1} ({opportunity.website_1})</p>
      <p className="text-dark-blue mb-1"><strong>Bet Side 1:</strong> {opportunity.bet_side_1}</p>
      <p className="text-dark-blue mb-1"><strong>Bet 2:</strong> {opportunity.bet_description_2} ({opportunity.website_2})</p>
      <p className="text-dark-blue mb-1"><strong>Bet Side 2:</strong> {opportunity.bet_side_2}</p>
      <p className="text-dark-blue"><strong>Profit:</strong> ${opportunity.profit.toFixed(2)}</p>
      <p className="text-dark-blue"><strong>Timestamp:</strong> {opportunity.timestamp ? new Date(opportunity.timestamp).toLocaleString() : "N/A"}</p>
    </div>
  );
}

export default OpportunityDetails;
