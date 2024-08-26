import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Homepage from './pages/Hompage';
import StartupPage from './pages/StartupPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/startup" element={<StartupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
