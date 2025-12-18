import React from 'react';
import { NavLink } from 'react-router-dom';
import { useProgram } from '../context/ProgramContext';

const SYSTEM_STATUS = {
  defcon: 3,
  systemStatus: "NOMINAL"
};

const Sidebar = () => (
  <aside className="sidebar" style={{
    width: 'var(--sidebar-width)',
    background: 'var(--bg-panel)',
    borderRight: '1px solid #2a2e36',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 0',
    position: 'fixed',
    height: '100vh',
    left: 0,
    top: 0
  }}>
    <div style={{ padding: '0 24px', marginBottom: '40px' }}>
      <h2 style={{ margin: 0, color: 'var(--primary)', letterSpacing: '1px' }}>CISO_ARCHITECT</h2>
      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Maturity: Initial (1/5)</span>
    </div>

    <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} style={{
        padding: '12px 24px', textDecoration: 'none', fontSize: '14px', fontWeight: 500,
        display: 'block'
      }} aria-label="Dashboard">
        DASHBOARD
      </NavLink>

      <NavLink to="/roadmap" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} style={{
        padding: '12px 24px', textDecoration: 'none', fontSize: '14px', fontWeight: 500,
        display: 'block'
      }} aria-label="Roadmap">
        ROADMAP
      </NavLink>
      <NavLink to="/frameworks" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} style={{
        padding: '12px 24px', textDecoration: 'none', fontSize: '14px', fontWeight: 500,
        display: 'block'
      }} aria-label="Framework Navigator">
        FRAMEWORKS
      </NavLink>

      <NavLink to="/governance" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} style={{
        padding: '12px 24px', textDecoration: 'none', fontSize: '14px', fontWeight: 500,
        display: 'block'
      }} aria-label="Security Library">
        GOVERNANCE (Policies)
      </NavLink>

      <NavLink to="/risks" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} style={{
        padding: '12px 24px', textDecoration: 'none', fontSize: '14px', fontWeight: 500,
        display: 'block'
      }} aria-label="Risk Register">
        RISK REGISTER
      </NavLink>

      <NavLink to="/controls" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} style={{
        padding: '12px 24px', textDecoration: 'none', fontSize: '14px', fontWeight: 500,
        display: 'block'
      }} aria-label="Controls">
        CONTROLS
      </NavLink>

      <NavLink to="/evidence" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} style={{
        padding: '12px 24px', textDecoration: 'none', fontSize: '14px', fontWeight: 500,
        display: 'block'
      }} aria-label="Evidence Locker">
        EVIDENCE
      </NavLink>
    </nav>
  </aside>
);

const Header = () => (
  <header style={{
    height: 'var(--header-height)',
    background: 'var(--bg-header)',
    backdropFilter: 'blur(10px)',
    borderBottom: 'var(--glass-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    position: 'sticky',
    top: 0,
    zIndex: 10
  }}>
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <span style={{
        padding: '4px 12px',
        borderRadius: '100px',
        background: 'rgba(255, 74, 74, 0.15)',
        color: 'var(--error)',
        fontSize: '12px',
        fontWeight: 'bold',
        border: '1px solid rgba(255, 74, 74, 0.3)'
      }}>
        DEFCON {SYSTEM_STATUS.defcon}
      </span>
    </div>
    <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
      System Status: <span style={{ color: 'var(--primary)' }}>{SYSTEM_STATUS.systemStatus}</span>
    </div>
  </header>
);

export const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <Sidebar />
      <div className="main-content" style={{ marginLeft: 'var(--sidebar-width)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ padding: '32px', flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
};
