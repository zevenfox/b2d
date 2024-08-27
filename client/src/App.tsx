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
import AllStartUpPage from './pages/AllStartUpPage';
import TechnologyStartUpPage from './pages/TechnologyPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/startup" element={<StartupPage />} />
        <Route path="/allstartup" element={<AllStartUpPage />} />
        <Route path="/technologystartup" element={<TechnologyStartUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
