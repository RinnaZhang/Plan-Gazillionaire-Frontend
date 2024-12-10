import React from "react";

function OpportunityDetails({ opportunity }) {
  if (!opportunity) {
    return <p>No details available</p>;
  }

  return (
    <div className="p-6 bg-[#162639] text-white rounded-lg shadow-md max-w-lg">
      <div className="mb-4">
        <h4 className="text-lg font-bold mb-2 bebas-neue-regular text-center">
          BET 1
        </h4>
        <p className="mb-1">
          <strong>Event:</strong> {opportunity.bet_description_1}
        </p>
        <p className="mb-1">
          <strong>Platform:</strong> {opportunity.website_1}
        </p>
        <p>
          <strong>Side:</strong> {opportunity.bet_side_1}
        </p>
      </div>

      <hr className="border-gray-600 my-4" />

      <div className="mb-4">
        <h4 className="text-lg font-bold mb-2 bebas-neue-regular text-center">
          BET 2
        </h4>
        <p className="mb-1">
          <strong>Event:</strong> {opportunity.bet_description_2}
        </p>
        <p className="mb-1">
          <strong>Platform:</strong> {opportunity.website_2}
        </p>
        <p>
          <strong>Side:</strong> {opportunity.bet_side_2}
        </p>
      </div>

      <hr className="border-gray-600 my-4" />

      <div className="flex justify-center items-center mb-4">
        <p className="font-bold text-green-400">
          Profit: ${opportunity.profit.toFixed(2)}
        </p>
      </div>

      <p className="text-sm text-gray-300 text-center">
        <strong>Timestamp:</strong>{" "}
        {opportunity.timestamp
          ? new Date(opportunity.timestamp).toLocaleString()
          : "N/A"}
      </p>
    </div>
  );
}

export default OpportunityDetails;