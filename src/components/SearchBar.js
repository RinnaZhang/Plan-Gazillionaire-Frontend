import React from 'react';
import '../index.css';

function SearchBar() {
  return (
    <div className="flex justify-center">
      <input 
        type="text" 
        placeholder="Search bets..."
        className="w-2/3 p-3 rounded-lg bg-gray-700 text-[var(--text-color)] outline-none focus:ring-2 focus:ring-[var(--neon-green-light)] shadow-lg"

      />
    </div>
  );
}

export default SearchBar;
