import React from 'react';
import OpportunityDetails from './OpportunityDetails';
import mockData from '../mockData'; 
import '../index.css';

function OpportunitiesList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {mockData.map((opp) => (
        <div 
          key={opp.id}
          className=" dark-bg box-neon-green-light p-4 rounded-lg shadow-md transition duration-300 ease-in-out"

        >
          <OpportunityDetails opportunity={opp} />
        </div>
      ))}
    </div>
  );
}

export default OpportunitiesList;
