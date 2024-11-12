import React from 'react';
import './App.css';
import './index.css';
import Description from './components/Description';
import SearchBar from './components/SearchBar';
import FilterOptions from './components/FilterOptions';
import OpportunitiesList from './components/OpportunitiesList';

function App() {
  return (
    <div className="App light-bg min-h-screen p-6 text-white font-orbitron">
      <header className="text-center mb-8">
        <h1 className="text-4xl header-color mb-4">PoliBets</h1>
        <p className="header-color">Your gateway to smart betting and arbitrage opportunities</p>
      </header>
      <main className="space-y-8">
        <SearchBar />
        <FilterOptions />
        <Description />
        <OpportunitiesList />
      </main>
    </div>
  );
}

export default App;
