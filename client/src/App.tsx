import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import './App.css';
import Homepage from './pages/Hompage';
import StartupPage from './pages/StartupPage';
import StartupFormPage from './pages/StartupFormPage'
import AdminPanel from './pages/Adminpanelpage';
import AllStartUpPage from './pages/AllStartUpPage';
import TechnologyStartUpPage from './pages/TechnologyPage';
import PrehomePage from "./pages/PrehomePage";
import IndexPage from './pages/IndexPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Homepage />} />
        <Route path="/startup" element={<StartupPage />} />
        <Route path="/startupform" element={<StartupFormPage />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/allstartup" element={<AllStartUpPage />} />
        <Route path="/technologystartup" element={<TechnologyStartUpPage />} />
        <Route path="/index" element={<IndexPage />} />
        <Route path="/" element={<PrehomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
