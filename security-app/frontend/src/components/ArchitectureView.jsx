import React from 'react';

const ArchitectureView = () => (
    <div>
        <div style={{ marginBottom: '24px' }}>
            <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Architecture Library</h1>
            <p style={{ color: 'var(--text-muted)' }}>TOGAF & SABSA Artifacts for Security Architecture</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="glass-panel" style={{ padding: '24px' }}>
                <h3>TOGAF ADM Phases</h3>
                <ul>
                    <li>Preliminary Phase</li>
                    <li>Architecture Vision</li>
                    <li>Business Architecture</li>
                    <li>Information Systems Architectures</li>
                    <li>Technology Architecture</li>
                    <li>Opportunities & Solutions</li>
                    <li>Migration Planning</li>
                    <li>Implementation Governance</li>
                    <li>Architecture Change Management</li>
                    <li>Requirements Management</li>
                </ul>
            </div>

            <div className="glass-panel" style={{ padding: '24px' }}>
                <h3>SABSA Matrix</h3>
                <p>Security attributes mapped to business attributes:</p>
                <ul>
                    <li>Contextual Security</li>
                    <li>Conceptual Security</li>
                    <li>Logical Security</li>
                    <li>Physical Security</li>
                    <li>Component Security</li>
                    <li>Operational Security</li>
                </ul>
            </div>
        </div>
    </div>
);

export default ArchitectureView;
