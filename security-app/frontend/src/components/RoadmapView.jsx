import React, { useMemo } from 'react';
import { useProgram } from '../context/ProgramContext';
import { generateRoadmap } from '../utils/roadmapLogic';
import { Link } from 'react-router-dom';

const RoadmapView = () => {
    const { controls } = useProgram();

    const horizons = useMemo(() => generateRoadmap(controls), [controls]);

    const HorizonColumn = ({ title, items, color, subtitle }) => (
        <div style={{ flex: 1, minWidth: '300px' }}>
            <div style={{
                background: `linear-gradient(to bottom, ${color}22, transparent)`,
                padding: '16px',
                borderTop: `4px solid ${color}`,
                borderRadius: '8px 8px 0 0',
                marginBottom: '16px'
            }}>
                <h2 style={{ margin: 0, fontSize: '18px', color: color }}>{title}</h2>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>{subtitle}</div>
                <div style={{ marginTop: '8px', fontWeight: 'bold' }}>{items.length} Initiatives</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {items.map(c => (
                    <div key={c.id} className="glass-panel" style={{ padding: '20px', borderLeft: `4px solid ${color}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                                {c.id}
                            </span>
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>WSJF: {c.wsjf.toFixed(1)}</span>
                        </div>
                        <h3 style={{ margin: 0, fontSize: '14px', marginBottom: '8px' }}>{c.title}</h3>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0, marginBottom: '12px', lineHeight: '1.4' }}>
                            {c.description}
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#aaa' }}>
                            <span>Effort: {c.effort}/5</span>
                            <span>Value: {c.risk_reduction}/10</span>
                        </div>

                        <Link to="/controls">
                            <button style={{
                                marginTop: '12px',
                                width: '100%',
                                padding: '8px',
                                background: 'rgba(255,255,255,0.05)',
                                border: 'none',
                                borderRadius: '4px',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '11px'
                            }}>
                                View Details
                            </button>
                        </Link>
                    </div>
                ))}
                {items.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                        Nothing strictly prioritized for this phase.
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ marginBottom: '8px' }}>Strategic Roadmap</h1>
                <p style={{ color: 'var(--text-muted)', maxWidth: '800px' }}>
                    This intelligent roadmap is generated using the <strong>Weighted Shortest Job First (WSJF)</strong> algorithm.
                    It prioritizes actions that deliver the highest risk reduction for the lowest implementation effort.
                </p>
            </div>

            <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '20px' }}>
                <HorizonColumn
                    title="Phase 1: Immediate"
                    subtitle="Day 1 - 30 (Quick Wins)"
                    items={horizons.now}
                    color="#00ff9d"
                />
                <HorizonColumn
                    title="Phase 2: Next"
                    subtitle="Day 31 - 90 (Projects)"
                    items={horizons.next}
                    color="#0088ff"
                />
                <HorizonColumn
                    title="Phase 3: Later"
                    subtitle="Day 90+ (Maturity)"
                    items={horizons.later}
                    color="#ff9900"
                />
            </div>
        </div>
    );
};

export default RoadmapView;
