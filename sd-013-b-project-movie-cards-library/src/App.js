import React from 'react';
import Header from './components/Header';
import movies from './data';
import MovieList from './components/MovieList';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <MovieList movies={ movies } />
      </div>
    </div>
  );
}

export default App;
