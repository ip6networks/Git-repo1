import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProgramProvider, useProgram } from './context/ProgramContext';
import { GovernanceProvider } from './context/GovernanceContext';
import { Layout } from './components/Layout';

// Core Components
import Dashboard from './components/Dashboard';
import ProgramBuilder from './components/ProgramBuilder';
import RiskCenter from './components/RiskCenter';
import RoadmapView from './components/RoadmapView';
import FrameworkNavigator from './components/FrameworkNavigator';
import EvidenceRepository from './components/EvidenceRepository';
import IntakeWizard from './components/IntakeWizard';

// Guard to redirect to Intake if not configured
const RequireConfig = ({ children }) => {
  const { profile } = useProgram();
  if (!profile.isConfigured) {
    return <Navigate to="/intake" replace />;
  }
  return children;
};

function App() {
  return (
    <ProgramProvider>
      <GovernanceProvider>
        <Router>
          <Routes>
            {/* Intake Wizard - No Layout */}
            <Route path="/intake" element={<IntakeWizard />} />

            {/* Dashboard */}
            <Route path="/" element={
              <RequireConfig>
                <Layout><Dashboard /></Layout>
              </RequireConfig>
            } />

            {/* Program Builder - Unified governance & controls */}
            <Route path="/program" element={
              <RequireConfig>
                <Layout><ProgramBuilder /></Layout>
              </RequireConfig>
            } />

            {/* Risk Management */}
            <Route path="/risk" element={
              <RequireConfig>
                <Layout><RiskCenter /></Layout>
              </RequireConfig>
            } />

            {/* Roadmap */}
            <Route path="/roadmap" element={
              <RequireConfig>
                <Layout><RoadmapView /></Layout>
              </RequireConfig>
            } />

            {/* Framework Reference */}
            <Route path="/frameworks" element={
              <RequireConfig>
                <Layout><FrameworkNavigator /></Layout>
              </RequireConfig>
            } />

            {/* Evidence Repository */}
            <Route path="/evidence" element={
              <RequireConfig>
                <Layout><EvidenceRepository /></Layout>
              </RequireConfig>
            } />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </GovernanceProvider>
    </ProgramProvider>
  );
}

export default App;
