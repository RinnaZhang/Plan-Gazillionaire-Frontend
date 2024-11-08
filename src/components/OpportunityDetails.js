import React from 'react';
import '../index.css';


function OpportunityDetails({ opportunity }) {

  return (
    <div className="box-color box-neon-green-light p-4 rounded-lg shadow-md transition duration-300 ease-in-out">
      <h3 className="text-2xl header-color font-semibold mb-2">{opportunity.title}</h3>
      <p className="text-dark-blue mb-1"><strong>Bet 1:</strong> {opportunity.bet1}</p>
      <p className="text-dark-blue mb-1"><strong>Bet 2:</strong> {opportunity.bet2}</p>
      <p className="text-dark-blue"><strong>Total Profit:</strong> {opportunity.profit}</p>
    </div>
  );
  
}

export default OpportunityDetails;
