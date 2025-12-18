import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useProgram } from '../context/ProgramContext';

const Card = ({ title, children, style = {} }) => (
    <div className="glass-panel" style={{ padding: '24px', height: '100%', ...style }}>
        <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px' }}>
            {title}
        </h3>
        {children}
    </div>
);

const MaturityWidget = ({ policies, color = 'var(--primary)', label = '/ 5.0' }) => {
    // Calculate average maturity
    const totalMaturity = policies.reduce((acc, p) => acc + (p.maturity || 0), 0);
    const avgMaturity = (totalMaturity / policies.length).toFixed(1);
    const percentage = ((avgMaturity / 5) * 100).toFixed(0);

    // If Audit View, we might mock a simpler "Readiness %" based on same data
    const displayValue = label.includes('100') ? percentage : avgMaturity;

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: color, marginBottom: '8px' }}>
                {displayValue} <span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>{label}</span>
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>Current Score</div>

            <div style={{ height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden', maxWidth: '200px', margin: '0 auto' }}>
                <div style={{ width: `${percentage}%`, height: '100%', background: color, transition: 'width 1s ease' }}></div>
            </div>
        </div>
    );
};

const NextActionItem = ({ item }) => (
    <Link to={`/library/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            cursor: 'pointer',
            transition: 'background 0.2s'
        }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
            <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                fontSize: '10px',
                color: 'var(--primary)',
                fontWeight: 'bold'
            }}>
                {item.id.split('-')[1] || 'GO'}
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>{item.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Priority: {item.priority}</div>
            </div>
            <div style={{ fontSize: '20px', color: 'var(--text-muted)' }}>→</div>
        </div>
    </Link>
);

const Dashboard = () => {
    const { profile, policies, frameworks, currentLens, risks, controls } = useProgram();

    // Dynamic Title based on Lens
    const maturityTitle = currentLens === 'audit' ? "ISO 27001 Readiness" : "Program Maturity";
    const maturityColor = currentLens === 'audit' ? "#0088ff" : "var(--primary)";

    // We can simulate some "progress" metrics based on status
    const getStatusCounts = (items) => {
        const counts = { 'Not Started': 0, 'Draft': 0, 'Published': 0 };
        items.forEach(i => {
            const s = i.status || 'Not Started';
            const key = s === 'Not Started' ? 'Not Started' : (s === 'Published' ? 'Published' : 'Draft');
            counts[key] = (counts[key] || 0) + 1;
        });
        return [
            { name: 'Not Started', value: counts['Not Started'] },
            { name: 'Draft', value: counts['Draft'] },
            { name: 'Published', value: counts['Published'] }
        ];
    };

    const policyStats = getStatusCounts(policies);

    // Filter for "Next Best Actions" (Critical priority + Not Started)
    const nextActions = policies
        .filter(p => p.priority === 'Critical' && p.status !== 'Published')
        .slice(0, 5);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto auto', gap: '24px' }}>
            {/* Header */}
            <div style={{ gridColumn: 'span 3' }}>
                <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Security Program Dashboard</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '0' }}>
                    Overview for <strong>{profile.name}</strong> ({profile.industry})
                </p>
            </div>

            {/* Maturity Score */}
            <Card title={maturityTitle}>
                <MaturityWidget policies={policies} color={maturityColor} label={currentLens === 'audit' ? '/ 100%' : '/ 5.0'} />
            </Card>

            {/* Policy Status Chart */}
            <Card title="Policy Implementation Status">
                <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={policyStats} layout="vertical" margin={{ left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 11, fill: '#888' }} />
                        <Tooltip contentStyle={{ background: '#333', border: 'none' }} />
                        <Bar dataKey="value" fill="#00ff9d" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </Card>

            {/* Control Coverage Meter */}
            <Card title="Control Implementation">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
                        {controls.filter(c => c.status === 'Implemented').length} <span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>/ {controls.length}</span>
                    </div>
                    <div style={{ width: '80%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                            width: `${controls.length > 0 ? (controls.filter(c => c.status === 'Implemented').length / controls.length) * 100 : 0}%`,
                            height: '100%',
                            background: '#00ff9d'
                        }}></div>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>Active Controls</div>
                </div>
            </Card>

            {/* Risk Summary */}
            <Card title="Top Risks">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {risks.slice(0, 3).map(r => (
                        <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                            <span style={{ color: 'var(--text-muted)' }}>{r.title}</span>
                            <span style={{
                                padding: '2px 8px',
                                borderRadius: '4px',
                                background: r.scores.residual.label === 'CRITICAL' ? 'rgba(255,50,50,0.2)' : 'rgba(255,165,0,0.2)',
                                color: r.scores.residual.label === 'CRITICAL' ? '#ff4444' : '#ffa500',
                                fontSize: '10px',
                                fontWeight: 'bold'
                            }}>
                                {r.scores.residual.label}
                            </span>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Library Stats (Simplified) */}
            <Card title="Library Stats">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', textAlign: 'center' }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px' }}>
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{policies.length}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Policies</div>
                    </div>
                </div>
            </Card>

            {/* Next Best Actions (Wide) */}
            <div style={{ gridColumn: 'span 2' }}>
                <Card title="Recommended Next Actions (Mature Baseline)">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {nextActions.map(item => (
                            <NextActionItem key={item.id} item={item} />
                        ))}
                        {nextActions.length === 0 && (
                            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                All critical items addressed! Great job.
                            </div>
                        )}
                    </div>
                </Card>
            </div>

            {/* Recent Activity / Educative Tip */}
            <Card title="Security Tip of the Day">
                <div style={{ background: 'linear-gradient(135deg, rgba(0,255,157,0.1) 0%, rgba(0,255,157,0) 100%)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(0,255,157,0.2)' }}>
                    <h4 style={{ marginTop: 0, color: 'var(--primary)' }}>Why "Define" before "Buy"?</h4>
                    <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--text-primary)' }}>
                        Many organizations buy a tool (e.g., a firewall) before writing the policy (e.g., Network Security).
                        This leads to "shelf-ware". Always define your <strong>requirements</strong> in a policy first, then buy the tool that enforces it.
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default Dashboard;


