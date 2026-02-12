import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>🍔 Foodingo Fullstack LIVE! 🎉</h1>
        <p><strong>Backend:</strong> localhost:8080 ✅ (4 microservices)</p>
        <p><strong>Frontend:</strong> localhost:3000 ✅ (React dashboard)</p>
        <p><strong>GitHub:</strong> chetanmeena45/foodingo-microservices ✅</p>
        <button className="btn btn-success btn-lg mt-3">
          Day 1 COMPLETE! 🚀
        </button>
      </header>
    </div>
  );
}

export default App;
