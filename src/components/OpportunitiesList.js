import React from 'react';
import OpportunityDetails from './OpportunityDetails';
import mockData from '../mockData'; 

function OpportunitiesList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {mockData.map((opp) => (
        <div 
          key={opp.id}
          className=" dark-bg p-4 rounded-lg shadow-md hover:shadow-neon-green-light transition duration-300 ease-in-out"

        >
          <OpportunityDetails opportunity={opp} />
        </div>
      ))}
    </div>
  );
}

export default OpportunitiesList;
