import React from 'react';
import { useProgram } from '../context/ProgramContext';

const RiskRegister = () => {
    const { risks } = useProgram();

    // Helper to render score badge
    const ScoreBadge = ({ scoreObject }) => (
        <div style={{ textAlign: 'center', minWidth: '80px' }}>
            <div style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: scoreObject.label === 'CRITICAL' ? '#ff4d4d' :
                    scoreObject.label === 'HIGH' ? '#ff9900' :
                        scoreObject.label === 'MEDIUM' ? '#ffff00' : '#00cc00'
            }}>
                {scoreObject.total}
            </div>
            <div style={{ fontSize: '10px', fontWeight: 'bold', color: 'white', marginTop: '4px', background: 'rgba(255,255,255,0.1)', padding: '2px 4px', borderRadius: '4px' }}>
                {scoreObject.label}
            </div>
        </div>
    );

    return (
        <div style={{ padding: '24px' }}>
            <h1 style={{ marginBottom: '8px' }}>Risk Register (V2)</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
                Manage strategic risks using Inherent vs. Residual scoring.
            </p>

            <div style={{ display: 'grid', gap: '16px' }}>
                {risks.map(risk => (
                    <div key={risk.id} className="glass-panel" style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        background: 'rgba(255,255,255,0.1)',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        color: 'var(--text-muted)'
                                    }}>
                                        {risk.id}
                                    </span>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        background: 'rgba(255,255,255,0.05)',
                                        fontSize: '12px',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        {risk.category}
                                    </span>
                                </div>
                                <h3 style={{ margin: 0, marginBottom: '8px' }}>{risk.title}</h3>
                                <div style={{ fontSize: '14px', fontStyle: 'italic', color: '#aaa', marginBottom: '8px' }}>"{risk.scenario}"</div>
                                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px', maxWidth: '600px' }}>{risk.description}</p>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>Treatment</div>
                                <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{risk.treatment_plan}</div>
                            </div>
                        </div>

                        {/* Scores Section */}
                        <div style={{
                            display: 'flex',
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '8px',
                            padding: '16px'
                        }}>
                            {/* Inherent */}
                            <div style={{ flex: 1, borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '4px' }}>INHERENT RISK</div>
                                    <div style={{ fontSize: '11px', color: '#666' }}>Before Controls</div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div><div style={{ fontSize: '10px', color: '#666' }}>LIKELIHOOD</div><div style={{ fontWeight: 'bold' }}>{risk.scores.inherent.likelihood}</div></div>
                                    <div><div style={{ fontSize: '10px', color: '#666' }}>IMPACT</div><div style={{ fontWeight: 'bold' }}>{risk.scores.inherent.impact}</div></div>
                                    <ScoreBadge scoreObject={risk.scores.inherent} />
                                </div>
                            </div>

                            {/* Residual */}
                            <div style={{ flex: 1, paddingLeft: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '4px' }}>RESIDUAL RISK</div>
                                    <div style={{ fontSize: '11px', color: '#666' }}>Current State</div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div><div style={{ fontSize: '10px', color: '#666' }}>LIKELIHOOD</div><div style={{ fontWeight: 'bold' }}>{risk.scores.residual.likelihood}</div></div>
                                    <div><div style={{ fontSize: '10px', color: '#666' }}>IMPACT</div><div style={{ fontWeight: 'bold' }}>{risk.scores.residual.impact}</div></div>
                                    <ScoreBadge scoreObject={risk.scores.residual} />
                                </div>
                            </div>
                        </div>

                        {/* Mitigations */}
                        <div style={{ marginTop: '16px' }}>
                            <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Key Controls (Mitigations)</div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {risk.key_controls.map(c => (
                                    <span key={c} style={{ fontSize: '12px', background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px' }}>
                                        {c}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RiskRegister;
