import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProgramProvider, useProgram } from './context/ProgramContext';
import { Layout } from './components/Layout';
import Dashboard from './components/Dashboard';
import Library from './components/Library';
import ItemDetail from './components/ItemDetail';
import IntakeWizard from './components/IntakeWizard';
import PolicyGenerator from './components/PolicyGenerator';
import RiskRegister from './components/RiskRegister';
import ControlsView from './components/ControlsView';
import FrameworkNavigator from './components/FrameworkNavigator';
import RoadmapView from './components/RoadmapView';
import EvidenceRepository from './components/EvidenceRepository';
import PolicyCenter from './components/PolicyCenter';

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
      <Router>
        <Routes>
          <Route path="/intake" element={<IntakeWizard />} />
          <Route path="/" element={
            <RequireConfig>
              <Layout>
                <Dashboard />
              </Layout>
            </RequireConfig>
          } />
          <Route path="/roadmap" element={
            <RequireConfig>
              <Layout>
                <RoadmapView />
              </Layout>
            </RequireConfig>
          } />
          <Route path="/library" element={
            <RequireConfig>
              <Layout>
                <Library />
              </Layout>
            </RequireConfig>
          } />
          <Route path="/library/:id" element={
            <RequireConfig>
              <Layout>
                <ItemDetail />
              </Layout>
            </RequireConfig>
          } />
          <Route path="/library/:id/edit" element={
            <RequireConfig>
              <Layout>
                <PolicyGenerator />
              </Layout>
            </RequireConfig>
          } />
          <Route path="/frameworks" element={
            <RequireConfig>
              <Layout>
                <FrameworkNavigator />
              </Layout>
            </RequireConfig>
          } />
          <Route path="/risks" element={
            <RequireConfig>
              <Layout>
                <RiskRegister />
              </Layout>
            </RequireConfig>
          } />
          <Route path="/controls" element={
            <RequireConfig>
              <Layout>
                <ControlsView />
              </Layout>
            </RequireConfig>
          } />
          <Route path="/evidence" element={
            <RequireConfig>
              <Layout>
                <EvidenceRepository />
              </Layout>
            </RequireConfig>
          } />
          <Route path="/governance" element={
            <RequireConfig>
              <Layout>
                <PolicyCenter />
              </Layout>
            </RequireConfig>
          } />
        </Routes>
      </Router>
    </ProgramProvider>
  );
}

export default App;
