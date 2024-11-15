import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import './App.css';
import Homepage from './pages/Hompage';
import StartupPage from './pages/StartupPage';
import StartupFormPage from './pages/StartupFormPage';
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
import ProtectedRoute from "./pages/components/ProtectedRoute";
import InvestorPanel from './pages/Investorpanel';
import InvestmentAgreement from './pages/investmentagreement';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/components/ResetPassword';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<PrehomePage />} />
          <Route path="/index" element={<IndexPage />} />
          <Route path="/investorform" element={<InvestorSignUp />}/>
          <Route path="/startupform" element={<StartupFormPage />}/>
          <Route path="/investment-agreement" element={<InvestmentAgreement />} />
          <Route path="/forgot-password" element={<ForgetPassword />}/>
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route 
              path="/investorpanel/:user_id" 
              element={
                <ProtectedRoute>
                  <InvestorPanel />
                </ProtectedRoute>
              } 
          />

          <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
          />

          <Route
              path="/startups/:id"
              element={
                <ProtectedRoute>
                  <StartupPage />
                </ProtectedRoute>
              }
          />

          <Route
              path="/adminpanel/:user_id"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
          />

          <Route
              path="/allstartup"
              element={
                <ProtectedRoute>
                  <AllStartUpPage />
                </ProtectedRoute>
              }
          />

          <Route
              path="/technologystartup"
              element={
                <ProtectedRoute>
                  <TechnologyStartUpPage />
                </ProtectedRoute>
              }
          />

          <Route
              path="/lifestylestartup"
              element={
                <ProtectedRoute>
                  <LifestylePage />
                </ProtectedRoute>
              }
          />

          <Route
              path="/cosmeticstartup"
              element={
                <ProtectedRoute>
                  <CosmeticPage />
                </ProtectedRoute>
              }
          />

          <Route
              path="/architecturestartup"
              element={
                <ProtectedRoute>
                  <ArchitecturePage />
                </ProtectedRoute>
              }
          />

          <Route
              path="/artstartup"
              element={
                <ProtectedRoute>
                  <ArtPage />
                </ProtectedRoute>
              }
          />

        </Routes>
      </Router>
  );
}

export default App;
