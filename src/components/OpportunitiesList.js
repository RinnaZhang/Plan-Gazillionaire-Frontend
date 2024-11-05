import React from 'react';
import OpportunityDetails from './OpportunityDetails';
import mockData from '../mockData'; 

function OpportunitiesList() {
  return (
    <div>
      {mockData.map((opp) => (
        <OpportunityDetails key={opp.id} opportunity={opp} />
      ))}
    </div>
  );
}

export default OpportunitiesList;
