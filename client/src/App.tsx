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
import LifestylePage from "./pages/LifestylePage";
import CosmeticPage from "./pages/CosmeticPage";
import ArchitecturePage from "./pages/ArchitecturePage";
import ArtPage from "./pages/ArtPage";
import PrehomePage from "./pages/PrehomePage";
import IndexPage from './pages/IndexPage';
import InvestorSignUp from './pages/InvestorFormPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Homepage />} />
        <Route path="/startups/:id" element={<StartupPage />} />
        <Route path="/startupform" element={<StartupFormPage />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/allstartup" element={<AllStartUpPage />} />
        <Route path="/technologystartup" element={<TechnologyStartUpPage />} />
        <Route path="/lifestylestartup" element={<LifestylePage />} />
        <Route path="/cosmeticstartup" element={<CosmeticPage />} />
        <Route path="/architecturestartup" element={<ArchitecturePage />} />
        <Route path="/artstartup" element={<ArtPage />} />
        <Route path="/index" element={<IndexPage />} />
        <Route path="/investorform" element={<InvestorSignUp />} />
        <Route path="/" element={<PrehomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
