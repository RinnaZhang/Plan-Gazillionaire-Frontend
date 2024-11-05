import React from 'react';
import Description from './components/Description';
import SearchBar from './components/SearchBar';
import FilterOptions from './components/FilterOptions';
import OpportunitiesList from './components/OpportunitiesList';

function App() {
  return (
    <div className="App">
      <Description />
      <SearchBar />
      <FilterOptions />
      <OpportunitiesList />
    </div>
  );
}

export default App;

