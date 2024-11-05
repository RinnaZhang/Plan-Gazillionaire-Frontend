import React from 'react';

function OpportunityDetails({ opportunity }) {
  return (
    <div>
      <h3>{opportunity.title}</h3>
      <p>{opportunity.bet1}</p>
      <p>{opportunity.bet2}</p>
      <p>Total Profit: {opportunity.profit}</p>
    </div>
  );
}

export default OpportunityDetails;
