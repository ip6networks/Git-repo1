import React from 'react';

const OperationsView = () => (
    <div>
        <div style={{ marginBottom: '24px' }}>
            <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Security Operations</h1>
            <p style={{ color: 'var(--text-muted)' }}>Incident Response & SOC Metrics</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            <div className="glass-panel" style={{ padding: '24px' }}>
                <h3>Incident Metrics</h3>
                <ul>
                    <li>Total Incidents: 45</li>
                    <li>Resolved: 42</li>
                    <li>Average Response Time: 2.5 hours</li>
                    <li>Critical Incidents: 3</li>
                </ul>
            </div>

            <div className="glass-panel" style={{ padding: '24px' }}>
                <h3>SOC Performance</h3>
                <ul>
                    <li>Alerts Monitored: 10,000/day</li>
                    <li>False Positives: 5%</li>
                    <li>Mean Time to Detect: 15 minutes</li>
                    <li>Mean Time to Respond: 30 minutes</li>
                </ul>
            </div>

            <div className="glass-panel" style={{ padding: '24px' }}>
                <h3>Compliance Status</h3>
                <ul>
                    <li>NIST CSF Coverage: 85%</li>
                    <li>ISO 27001 Controls: 120/150</li>
                    <li>Audit Findings: 2 open</li>
                    <li>Next Review: Q1 2026</li>
                </ul>
            </div>
        </div>
    </div>
);

export default OperationsView;
