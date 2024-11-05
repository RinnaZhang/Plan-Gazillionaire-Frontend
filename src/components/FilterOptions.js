import React from 'react';
import '../index.css';

function FilterOptions() {
  
  return (
    <div className="flex justify-around items-center dark-bg p-4 rounded-lg shadow-md space-x-4">
      <button className="box-color box-neon-green-light p-3 rounded-lg hover:text-white transition duration-300 ease-in-out shadow-lg">
        Categories (Election, Middle East, etc)
      </button>
      <button className="box-color box-neon-green-light p-3 rounded-lg hover:text-white transition duration-300 ease-in-out shadow-lg">
        Timeframe (e.g., upcoming week, month)
      </button>
      <button className="box-color box-neon-green-light p-3 rounded-lg hover:text-white transition duration-300 ease-in-out shadow-lg">
        Profitability Threshold
      </button>
    </div>
  );
}

export default FilterOptions;
