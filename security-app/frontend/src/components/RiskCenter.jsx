import React, { useState, useMemo } from 'react';
import { useProgram } from '../context/ProgramContext';
import { NIST_CSF_2 } from '../data/frameworkData';

// =============================================================================
// RISK CENTER - Risk Management aligned with NIST CSF
// =============================================================================

// Risk categories mapped to NIST CSF functions
const RISK_CATEGORIES = {
    'Governance': { functionId: 'GV', color: '#00ff9d', icon: '🏛️' },
    'Asset Management': { functionId: 'ID', color: '#0088ff', icon: '🔍' },
    'Access Control': { functionId: 'PR', color: '#ff9900', icon: '🔐' },
    'Data Protection': { functionId: 'PR', color: '#ff9900', icon: '🛡️' },
    'Detection': { functionId: 'DE', color: '#aa44ff', icon: '👁️' },
    'Incident Response': { functionId: 'RS', color: '#ff4444', icon: '🚨' },
    'Business Continuity': { functionId: 'RC', color: '#44aaff', icon: '🔄' },
    'Third Party': { functionId: 'GV', color: '#00ff9d', icon: '🤝' },
    'Compliance': { functionId: 'GV', color: '#00ff9d', icon: '📋' }
};

const RiskCenter = () => {
    const { risks, addRisk, updateRisk, deleteRisk, programItems } = useProgram();

    const [activeView, setActiveView] = useState('register');
    const [selectedRisk, setSelectedRisk] = useState(null);
    const [filterFunction, setFilterFunction] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);

    // Map risks to NIST functions
    const risksByFunction = useMemo(() => {
        const byFunc = {};
        Object.keys(NIST_CSF_2).forEach(fn => {
            byFunc[fn] = [];
        });

        risks.forEach(risk => {
            const category = RISK_CATEGORIES[risk.category];
            if (category && byFunc[category.functionId]) {
                byFunc[category.functionId].push(risk);
            }
        });

        return byFunc;
    }, [risks]);

    // Calculate risk matrix data
    const riskMatrix = useMemo(() => {
        const matrix = {};
        for (let impact = 5; impact >= 1; impact--) {
            for (let likelihood = 1; likelihood <= 5; likelihood++) {
                const key = `${likelihood}-${impact}`;
                matrix[key] = [];
            }
        }
        risks.forEach(risk => {
            const key = `${risk.scores?.inherent?.likelihood || 3}-${risk.scores?.inherent?.impact || 3}`;
            if (matrix[key]) {
                matrix[key].push(risk);
            }
        });
        return matrix;
    }, [risks]);

    // Risk stats by severity
    const riskStats = useMemo(() => {
        const critical = risks.filter(r => (r.scores?.inherent?.total || 0) >= 15).length;
        const high = risks.filter(r => {
            const score = r.scores?.inherent?.total || 0;
            return score >= 10 && score < 15;
        }).length;
        const medium = risks.filter(r => {
            const score = r.scores?.inherent?.total || 0;
            return score >= 5 && score < 10;
        }).length;
        const low = risks.filter(r => (r.scores?.inherent?.total || 0) < 5).length;

        return { total: risks.length, critical, high, medium, low };
    }, [risks]);

    // Risk stats by NIST function
    const riskStatsByFunction = useMemo(() => {
        const stats = {};
        Object.entries(NIST_CSF_2).forEach(([fn, fnData]) => {
            const fnRisks = risksByFunction[fn] || [];
            stats[fn] = {
                total: fnRisks.length,
                critical: fnRisks.filter(r => (r.scores?.inherent?.total || 0) >= 15).length,
                name: fnData.name,
                color: fnData.color,
                icon: fnData.icon
            };
        });
        return stats;
    }, [risksByFunction]);

    // Filtered risks
    const filteredRisks = useMemo(() => {
        if (filterFunction === 'all') return risks;
        return risksByFunction[filterFunction] || [];
    }, [risks, filterFunction, risksByFunction]);

    // Get cell color based on position
    const getCellColor = (likelihood, impact) => {
        const score = likelihood * impact;
        if (score >= 15) return '#ff444455';
        if (score >= 10) return '#ff660055';
        if (score >= 5) return '#ff990055';
        return '#ffcc0033';
    };

    // Get risk level
    const getRiskLevel = (score) => {
        if (score >= 15) return { label: 'Critical', color: '#ff4444' };
        if (score >= 10) return { label: 'High', color: '#ff6600' };
        if (score >= 5) return { label: 'Medium', color: '#ff9900' };
        return { label: 'Low', color: '#ffcc00' };
    };

    // =========================================================================
    // COMPONENTS
    // =========================================================================

    // Function filter bar
    const FunctionFilterBar = () => (
        <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '20px',
            flexWrap: 'wrap'
        }}>
            <button
                onClick={() => setFilterFunction('all')}
                style={{
                    padding: '8px 16px',
                    background: filterFunction === 'all' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '4px',
                    color: filterFunction === 'all' ? '#000' : 'white',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: filterFunction === 'all' ? 'bold' : 'normal'
                }}
            >
                All ({risks.length})
            </button>
            {Object.entries(NIST_CSF_2).map(([fn, fnData]) => {
                const count = risksByFunction[fn]?.length || 0;
                const isActive = filterFunction === fn;

                return (
                    <button
                        key={fn}
                        onClick={() => setFilterFunction(fn)}
                        style={{
                            padding: '8px 16px',
                            background: isActive ? `${fnData.color}` : 'rgba(255,255,255,0.1)',
                            border: isActive ? 'none' : `1px solid ${fnData.color}44`,
                            borderRadius: '4px',
                            color: isActive ? '#000' : fnData.color,
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: isActive ? 'bold' : 'normal',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        {fnData.icon} {fnData.name} ({count})
                    </button>
                );
            })}
        </div>
    );

    // Risk card
    const RiskCard = ({ risk }) => {
        const inherentScore = risk.scores?.inherent?.total || 0;
        const residualScore = risk.scores?.residual?.total || 0;
        const riskLevel = getRiskLevel(inherentScore);
        const category = RISK_CATEGORIES[risk.category];
        const fnData = category ? NIST_CSF_2[category.functionId] : null;

        return (
            <div
                className="glass-panel"
                style={{
                    padding: '16px',
                    marginBottom: '12px',
                    borderLeft: `4px solid ${riskLevel.color}`,
                    cursor: 'pointer'
                }}
                onClick={() => setSelectedRisk(risk)}
            >
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px'
                }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{
                            fontSize: '10px',
                            background: 'rgba(255,255,255,0.1)',
                            padding: '2px 6px',
                            borderRadius: '4px'
                        }}>
                            {risk.id}
                        </span>
                        <span style={{
                            fontSize: '10px',
                            background: `${riskLevel.color}22`,
                            color: riskLevel.color,
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontWeight: 'bold'
                        }}>
                            {riskLevel.label}
                        </span>
                        {fnData && (
                            <span style={{
                                fontSize: '10px',
                                background: `${fnData.color}22`,
                                color: fnData.color,
                                padding: '2px 8px',
                                borderRadius: '4px'
                            }}>
                                {fnData.icon} {fnData.name}
                            </span>
                        )}
                    </div>
                    <span style={{
                        fontSize: '10px',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: risk.status === 'Active' ? 'rgba(255,68,68,0.2)' : 'rgba(0,255,157,0.2)',
                        color: risk.status === 'Active' ? '#ff4444' : 'var(--primary)'
                    }}>
                        {risk.status}
                    </span>
                </div>

                <h4 style={{ margin: 0, marginBottom: '6px', fontSize: '14px' }}>
                    {risk.title}
                </h4>
                <p style={{
                    margin: 0,
                    marginBottom: '12px',
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    lineHeight: '1.4'
                }}>
                    {risk.description?.substring(0, 150)}...
                </p>

                {/* Scores */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', gap: '24px', fontSize: '11px' }}>
                        <div>
                            <span style={{ color: 'var(--text-muted)' }}>Inherent: </span>
                            <span style={{ color: riskLevel.color, fontWeight: 'bold' }}>
                                {inherentScore}
                            </span>
                        </div>
                        <div>
                            <span style={{ color: 'var(--text-muted)' }}>Residual: </span>
                            <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                                {residualScore}
                            </span>
                        </div>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {risk.category}
                    </div>
                </div>
            </div>
        );
    };

    // Heat map view
    const HeatMap = () => (
        <div style={{ padding: '24px' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '50px repeat(5, 1fr)',
                gridTemplateRows: 'repeat(5, 80px) 40px',
                gap: '4px',
                maxWidth: '600px',
                margin: '0 auto'
            }}>
                {/* Y-axis label */}
                <div style={{
                    gridColumn: '1',
                    gridRow: '1 / 6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    fontWeight: 'bold'
                }}>
                    IMPACT →
                </div>

                {/* Grid cells */}
                {[5, 4, 3, 2, 1].map(impact => (
                    <React.Fragment key={`row-${impact}`}>
                        {[1, 2, 3, 4, 5].map(likelihood => {
                            const key = `${likelihood}-${impact}`;
                            const cellRisks = riskMatrix[key] || [];

                            return (
                                <div
                                    key={key}
                                    style={{
                                        background: getCellColor(likelihood, impact),
                                        borderRadius: '4px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '8px',
                                        cursor: cellRisks.length > 0 ? 'pointer' : 'default'
                                    }}
                                    title={cellRisks.map(r => r.title).join('\n')}
                                >
                                    {cellRisks.length > 0 && (
                                        <>
                                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                                {cellRisks.length}
                                            </div>
                                            <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>
                                                risks
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </React.Fragment>
                ))}

                {/* X-axis spacer */}
                <div></div>

                {/* X-axis labels */}
                {[1, 2, 3, 4, 5].map(likelihood => (
                    <div
                        key={`x-${likelihood}`}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '11px',
                            color: 'var(--text-muted)'
                        }}
                    >
                        {likelihood}
                    </div>
                ))}
            </div>

            <div style={{
                textAlign: 'center',
                marginTop: '8px',
                fontSize: '12px',
                color: 'var(--text-muted)',
                fontWeight: 'bold'
            }}>
                LIKELIHOOD →
            </div>
        </div>
    );

    // NIST function breakdown
    const FunctionBreakdown = () => (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '12px',
            marginBottom: '24px'
        }}>
            {Object.entries(riskStatsByFunction).map(([fn, stats]) => (
                <div
                    key={fn}
                    className="glass-panel"
                    style={{
                        padding: '16px',
                        textAlign: 'center',
                        borderTop: `3px solid ${stats.color}`,
                        cursor: 'pointer'
                    }}
                    onClick={() => setFilterFunction(fn)}
                >
                    <div style={{ fontSize: '20px', marginBottom: '4px' }}>{stats.icon}</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.total}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{stats.name}</div>
                    {stats.critical > 0 && (
                        <div style={{
                            marginTop: '8px',
                            fontSize: '10px',
                            color: '#ff4444'
                        }}>
                            {stats.critical} critical
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    // Risk detail modal
    const RiskDetail = ({ risk }) => {
        const inherentScore = risk.scores?.inherent?.total || 0;
        const riskLevel = getRiskLevel(inherentScore);

        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100
            }}
                onClick={() => setSelectedRisk(null)}
            >
                <div
                    className="glass-panel"
                    style={{
                        width: '650px',
                        maxHeight: '85vh',
                        overflow: 'auto',
                        padding: '24px'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <h2 style={{ margin: 0 }}>{risk.title}</h2>
                        <button
                            onClick={() => setSelectedRisk(null)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'white',
                                fontSize: '24px',
                                cursor: 'pointer'
                            }}
                        >
                            ×
                        </button>
                    </div>

                    {/* Risk identifiers */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                        <span style={{
                            fontSize: '11px',
                            background: 'rgba(255,255,255,0.1)',
                            padding: '4px 8px',
                            borderRadius: '4px'
                        }}>
                            {risk.id}
                        </span>
                        <span style={{
                            fontSize: '11px',
                            background: `${riskLevel.color}22`,
                            color: riskLevel.color,
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontWeight: 'bold'
                        }}>
                            {riskLevel.label} Risk
                        </span>
                        <span style={{
                            fontSize: '11px',
                            background: 'rgba(255,255,255,0.1)',
                            padding: '4px 8px',
                            borderRadius: '4px'
                        }}>
                            {risk.category}
                        </span>
                    </div>

                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
                        {risk.description}
                    </p>

                    {/* Scores */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '16px',
                        marginBottom: '24px'
                    }}>
                        <div className="glass-panel" style={{ padding: '16px' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                                Inherent Risk
                            </div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: riskLevel.color }}>
                                {risk.scores?.inherent?.total || 0}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                L: {risk.scores?.inherent?.likelihood || 0} × I: {risk.scores?.inherent?.impact || 0}
                            </div>
                        </div>
                        <div className="glass-panel" style={{ padding: '16px' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                                Residual Risk
                            </div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary)' }}>
                                {risk.scores?.residual?.total || 0}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                L: {risk.scores?.residual?.likelihood || 0} × I: {risk.scores?.residual?.impact || 0}
                            </div>
                        </div>
                    </div>

                    {/* Treatment plan */}
                    <div style={{ marginBottom: '24px' }}>
                        <h4 style={{ marginBottom: '8px' }}>Treatment Plan</h4>
                        <div className="glass-panel" style={{ padding: '12px' }}>
                            <span style={{
                                padding: '4px 8px',
                                borderRadius: '4px',
                                background: 'rgba(0,255,157,0.2)',
                                color: 'var(--primary)',
                                fontSize: '12px'
                            }}>
                                {risk.treatment_plan}
                            </span>
                        </div>
                    </div>

                    {/* Key controls */}
                    {risk.key_controls && (
                        <div>
                            <h4 style={{ marginBottom: '8px' }}>Key Controls (Mitigating)</h4>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {risk.key_controls.map(ctrl => (
                                    <span key={ctrl} style={{
                                        padding: '6px 10px',
                                        borderRadius: '4px',
                                        background: 'rgba(255,255,255,0.1)',
                                        fontSize: '11px'
                                    }}>
                                        {ctrl}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // =========================================================================
    // RENDER
    // =========================================================================

    return (
        <div style={{ padding: '24px' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
            }}>
                <div>
                    <h1 style={{ margin: 0, marginBottom: '8px' }}>Risk Management</h1>
                    <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                        Risks organized by NIST CSF 2.0 functions
                    </p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    style={{
                        padding: '12px 24px',
                        background: 'var(--primary)',
                        border: 'none',
                        borderRadius: '6px',
                        color: '#000',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    + Add Risk
                </button>
            </div>

            {/* Severity Stats */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '16px',
                marginBottom: '24px'
            }}>
                <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{riskStats.total}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total Risks</div>
                </div>
                <div className="glass-panel" style={{ padding: '16px', textAlign: 'center', borderTop: '3px solid #ff4444' }}>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ff4444' }}>{riskStats.critical}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Critical</div>
                </div>
                <div className="glass-panel" style={{ padding: '16px', textAlign: 'center', borderTop: '3px solid #ff6600' }}>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ff6600' }}>{riskStats.high}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>High</div>
                </div>
                <div className="glass-panel" style={{ padding: '16px', textAlign: 'center', borderTop: '3px solid #ff9900' }}>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ff9900' }}>{riskStats.medium}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Medium</div>
                </div>
                <div className="glass-panel" style={{ padding: '16px', textAlign: 'center', borderTop: '3px solid #ffcc00' }}>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffcc00' }}>{riskStats.low}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Low</div>
                </div>
            </div>

            {/* Function Breakdown */}
            <h3 style={{ marginBottom: '12px', fontSize: '14px' }}>Risks by NIST CSF Function</h3>
            <FunctionBreakdown />

            {/* View Toggle */}
            <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '20px'
            }}>
                <button
                    onClick={() => setActiveView('register')}
                    style={{
                        padding: '10px 20px',
                        background: activeView === 'register' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '6px',
                        color: activeView === 'register' ? '#000' : 'white',
                        fontWeight: activeView === 'register' ? 'bold' : 'normal',
                        cursor: 'pointer'
                    }}
                >
                    📋 Register
                </button>
                <button
                    onClick={() => setActiveView('heatmap')}
                    style={{
                        padding: '10px 20px',
                        background: activeView === 'heatmap' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '6px',
                        color: activeView === 'heatmap' ? '#000' : 'white',
                        fontWeight: activeView === 'heatmap' ? 'bold' : 'normal',
                        cursor: 'pointer'
                    }}
                >
                    🎯 Heat Map
                </button>
            </div>

            {/* Content */}
            {activeView === 'register' ? (
                <>
                    <FunctionFilterBar />
                    <div>
                        {filteredRisks.map(risk => (
                            <RiskCard key={risk.id} risk={risk} />
                        ))}
                        {filteredRisks.length === 0 && (
                            <div style={{
                                textAlign: 'center',
                                padding: '60px',
                                color: 'var(--text-muted)'
                            }}>
                                No risks match the current filter
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="glass-panel">
                    <HeatMap />
                </div>
            )}

            {/* Risk Detail Modal */}
            {selectedRisk && <RiskDetail risk={selectedRisk} />}
        </div>
    );
};

export default RiskCenter;
