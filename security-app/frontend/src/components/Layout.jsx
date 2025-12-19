import React from 'react';
import { NavLink } from 'react-router-dom';
import { useProgram } from '../context/ProgramContext';

// =============================================================================
// LAYOUT - Simplified navigation for Virtual CISO
// =============================================================================

const Sidebar = () => {
  const { programStats, maturityTier, risks } = useProgram();

  const criticalRisks = risks.filter(r => (r.scores?.inherent?.total || 0) >= 15).length;

  const navLinkStyle = {
    padding: '12px 24px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  return (
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
      top: 0,
      overflowY: 'auto'
    }}>
      {/* Brand */}
      <div style={{ padding: '0 24px', marginBottom: '24px' }}>
        <h2 style={{ margin: 0, color: 'var(--primary)', letterSpacing: '1px', fontSize: '16px' }}>
          🛡️ VIRTUAL CISO
        </h2>
        <div style={{
          marginTop: '8px',
          fontSize: '11px',
          color: 'var(--text-muted)'
        }}>
          Tier {maturityTier.tier}: {maturityTier.label}
        </div>
        <div style={{
          marginTop: '8px',
          height: '4px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${programStats.completionPercent}%`,
            background: maturityTier.color,
            borderRadius: '2px',
            transition: 'width 0.3s ease'
          }} />
        </div>
        <div style={{
          marginTop: '4px',
          fontSize: '10px',
          color: 'var(--text-muted)'
        }}>
          {programStats.completionPercent}% complete
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        <NavLink
          to="/"
          end
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          style={navLinkStyle}
        >
          <span>📊</span> Dashboard
        </NavLink>

        <NavLink
          to="/program"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          style={navLinkStyle}
        >
          <span>🏛️</span> Program Builder
        </NavLink>

        <NavLink
          to="/risk"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          style={navLinkStyle}
        >
          <span>⚠️</span> Risk Management
          {criticalRisks > 0 && (
            <span style={{
              marginLeft: 'auto',
              padding: '2px 8px',
              borderRadius: '10px',
              background: 'rgba(255,68,68,0.2)',
              color: '#ff4444',
              fontSize: '10px'
            }}>
              {criticalRisks}
            </span>
          )}
        </NavLink>

        <NavLink
          to="/roadmap"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          style={navLinkStyle}
        >
          <span>🗺️</span> Roadmap
        </NavLink>

        <div style={{
          height: '1px',
          background: 'rgba(255,255,255,0.1)',
          margin: '16px 24px'
        }} />

        <NavLink
          to="/frameworks"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          style={navLinkStyle}
        >
          <span>📚</span> Frameworks
        </NavLink>

        <NavLink
          to="/evidence"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          style={navLinkStyle}
        >
          <span>🗄️</span> Evidence
        </NavLink>
      </nav>

      {/* Footer Stats */}
      <div style={{
        padding: '16px 24px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        fontSize: '11px',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span>Items</span>
          <span>{programStats.completed}/{programStats.total}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Risks</span>
          <span>{risks.length}</span>
        </div>
      </div>
    </aside>
  );
};

const Header = () => {
  const { maturityTier, programStats } = useProgram();

  return (
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
          background: `${maturityTier.color}22`,
          color: maturityTier.color,
          fontSize: '12px',
          fontWeight: 'bold',
          border: `1px solid ${maturityTier.color}44`
        }}>
          TIER {maturityTier.tier}
        </span>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          {maturityTier.label}
        </span>
      </div>
      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
          {programStats.completed}
        </span>
        /{programStats.total} items complete
      </div>
    </header>
  );
};

export const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <Sidebar />
      <div className="main-content" style={{
        marginLeft: 'var(--sidebar-width)',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Header />
        <main style={{ padding: '32px', flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
};
