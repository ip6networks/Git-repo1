import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProgram } from '../context/ProgramContext';
import { DOCUMENT_TYPES, PHASES } from '../data/programData';
import {
    generateRoadmap,
    calculateProgramMaturity,
    calculateMaturityByFunction,
    getNextActions,
    getBlockedItems
} from '../utils/roadmapLogic';

// =============================================================================
// VIRTUAL CISO DASHBOARD
// =============================================================================
// Main hub for the Virtual CISO experience. Shows:
// 1. Overall maturity score and progress
// 2. Maturity by NIST CSF function (radar-style)
// 3. Governance scorecard (by document type)
// 4. Prioritized next actions
// 5. Blocked items requiring attention
// =============================================================================

const VirtualCISODashboard = () => {
    const {
        governanceDocuments,
        controls,
        documentStats,
        profile,
        pendingRoadmapItems
    } = useProgram();

    // Calculate overall maturity
    const overallMaturity = useMemo(() =>
        calculateProgramMaturity(governanceDocuments),
        [governanceDocuments]
    );

    // Calculate maturity by NIST function
    const functionMaturity = useMemo(() =>
        calculateMaturityByFunction(governanceDocuments),
        [governanceDocuments]
    );

    // Generate roadmap
    const roadmap = useMemo(() =>
        generateRoadmap(controls, governanceDocuments, { riskAppetite: profile.riskAppetite }),
        [controls, governanceDocuments, profile.riskAppetite]
    );

    // Get next 5 priority actions
    const nextActions = useMemo(() =>
        getNextActions(controls, governanceDocuments, 5),
        [controls, governanceDocuments]
    );

    // Get blocked items
    const blockedItems = useMemo(() =>
        getBlockedItems(governanceDocuments).slice(0, 5),
        [governanceDocuments]
    );

    // Maturity level label
    const getMaturityLabel = (score) => {
        if (score >= 80) return { label: 'Optimizing', color: '#00ff9d' };
        if (score >= 60) return { label: 'Managed', color: '#0088ff' };
        if (score >= 40) return { label: 'Developing', color: '#ff9900' };
        if (score >= 20) return { label: 'Initial', color: '#ff6600' };
        return { label: 'Ad-Hoc', color: '#ff4444' };
    };

    const maturityInfo = getMaturityLabel(overallMaturity);

    // =========================================================================
    // COMPONENTS
    // =========================================================================

    // Circular progress indicator
    const CircularProgress = ({ value, size = 120, label, subtitle }) => (
        <div style={{ textAlign: 'center' }}>
            <div style={{
                width: size,
                height: size,
                borderRadius: '50%',
                background: `conic-gradient(var(--primary) ${value * 3.6}deg, rgba(255,255,255,0.1) 0deg)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto'
            }}>
                <div style={{
                    width: size - 16,
                    height: size - 16,
                    borderRadius: '50%',
                    background: '#1a1d24',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{ fontSize: size / 4, fontWeight: 'bold' }}>
                        {value}%
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                        {label}
                    </div>
                </div>
            </div>
            {subtitle && (
                <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text-muted)' }}>
                    {subtitle}
                </div>
            )}
        </div>
    );

    // Function maturity bar
    const FunctionBar = ({ name, score, itemCount }) => (
        <div style={{ marginBottom: 12 }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 4,
                fontSize: 12
            }}>
                <span>{name}</span>
                <span style={{ color: 'var(--text-muted)' }}>{score}%</span>
            </div>
            <div style={{
                height: 8,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 4,
                overflow: 'hidden'
            }}>
                <div style={{
                    height: '100%',
                    width: `${score}%`,
                    background: score >= 70 ? 'var(--primary)' : score >= 40 ? '#ff9900' : '#ff4444',
                    borderRadius: 4,
                    transition: 'width 0.3s ease'
                }} />
            </div>
        </div>
    );

    // Action card
    const ActionCard = ({ item, index }) => (
        <div
            className="glass-panel"
            style={{
                padding: 12,
                marginBottom: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                borderLeft: `4px solid ${DOCUMENT_TYPES[item.type]?.color || 'var(--primary)'}`
            }}
        >
            <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'rgba(0,255,157,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 'bold',
                color: 'var(--primary)'
            }}>
                {index + 1}
            </div>
            <div style={{ flex: 1 }}>
                <div style={{
                    fontSize: 13,
                    fontWeight: 'bold',
                    marginBottom: 2
                }}>
                    {item.title}
                </div>
                <div style={{
                    fontSize: 11,
                    color: 'var(--text-muted)',
                    display: 'flex',
                    gap: 8
                }}>
                    <span>{item.type}</span>
                    <span>•</span>
                    <span>{item.priority}</span>
                    <span>•</span>
                    <span>WSJF: {item.wsjf?.toFixed(1)}</span>
                </div>
            </div>
            <div style={{
                fontSize: 10,
                color: 'var(--text-muted)',
                textAlign: 'right'
            }}>
                ~{item.effort} days
            </div>
        </div>
    );

    // Document type scorecard
    const TypeScorecard = ({ type, stats }) => {
        const typeInfo = DOCUMENT_TYPES[type];
        return (
            <div style={{
                padding: 16,
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 8,
                borderLeft: `4px solid ${typeInfo?.color || '#888'}`
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 8
                }}>
                    <span style={{ fontSize: 20 }}>{typeInfo?.icon}</span>
                    <span style={{ fontWeight: 'bold' }}>{type}s</span>
                </div>
                <div style={{
                    display: 'flex',
                    gap: 16,
                    fontSize: 12
                }}>
                    <div>
                        <div style={{ color: '#ff4444', fontWeight: 'bold' }}>
                            {stats.notStarted}
                        </div>
                        <div style={{ color: 'var(--text-muted)', fontSize: 10 }}>
                            Not Started
                        </div>
                    </div>
                    <div>
                        <div style={{ color: '#ff9900', fontWeight: 'bold' }}>
                            {stats.draft}
                        </div>
                        <div style={{ color: 'var(--text-muted)', fontSize: 10 }}>
                            Draft
                        </div>
                    </div>
                    <div>
                        <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                            {stats.published}
                        </div>
                        <div style={{ color: 'var(--text-muted)', fontSize: 10 }}>
                            Published
                        </div>
                    </div>
                </div>
                <div style={{
                    marginTop: 8,
                    height: 4,
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: 2,
                    overflow: 'hidden'
                }}>
                    <div style={{
                        height: '100%',
                        width: `${stats.completionPercent}%`,
                        background: 'var(--primary)',
                        borderRadius: 2
                    }} />
                </div>
            </div>
        );
    };

    // =========================================================================
    // RENDER
    // =========================================================================

    return (
        <div style={{ padding: 24 }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 32
            }}>
                <div>
                    <h1 style={{ margin: 0, marginBottom: 8 }}>
                        Virtual CISO Dashboard
                    </h1>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                        Your organization's security program at a glance
                    </p>
                </div>
                <Link to="/assessment/governance">
                    <button style={{
                        padding: '12px 24px',
                        background: 'var(--primary)',
                        border: 'none',
                        borderRadius: 6,
                        color: '#000',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: 14
                    }}>
                        Start Assessment →
                    </button>
                </Link>
            </div>

            {/* Main Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 24,
                marginBottom: 32
            }}>
                {/* Overall Maturity */}
                <div className="glass-panel" style={{ padding: 24 }}>
                    <h3 style={{ margin: 0, marginBottom: 16, fontSize: 14 }}>
                        Program Maturity
                    </h3>
                    <CircularProgress
                        value={overallMaturity}
                        size={140}
                        label="Maturity"
                    />
                    <div style={{
                        textAlign: 'center',
                        marginTop: 16,
                        padding: '8px 16px',
                        background: `${maturityInfo.color}22`,
                        borderRadius: 4,
                        color: maturityInfo.color,
                        fontWeight: 'bold',
                        fontSize: 14
                    }}>
                        {maturityInfo.label}
                    </div>
                </div>

                {/* NIST CSF Function Maturity */}
                <div className="glass-panel" style={{ padding: 24 }}>
                    <h3 style={{ margin: 0, marginBottom: 16, fontSize: 14 }}>
                        Maturity by NIST CSF Function
                    </h3>
                    {functionMaturity.map(fn => (
                        <FunctionBar
                            key={fn.function}
                            name={fn.function}
                            score={fn.score}
                            itemCount={fn.itemCount}
                        />
                    ))}
                </div>

                {/* Roadmap Summary */}
                <div className="glass-panel" style={{ padding: 24 }}>
                    <h3 style={{ margin: 0, marginBottom: 16, fontSize: 14 }}>
                        Roadmap Summary
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        {[
                            { phase: 1, label: 'Phase 1', count: roadmap.summary.byPhase?.phase1 || 0, color: PHASES[1].color },
                            { phase: 2, label: 'Phase 2', count: roadmap.summary.byPhase?.phase2 || 0, color: PHASES[2].color },
                            { phase: 3, label: 'Phase 3', count: roadmap.summary.byPhase?.phase3 || 0, color: PHASES[3].color },
                            { phase: 4, label: 'Phase 4', count: roadmap.summary.byPhase?.phase4 || 0, color: PHASES[4].color }
                        ].map(p => (
                            <div key={p.phase} style={{
                                padding: 12,
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: 6,
                                borderTop: `3px solid ${p.color}`
                            }}>
                                <div style={{
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                    color: p.color
                                }}>
                                    {p.count}
                                </div>
                                <div style={{
                                    fontSize: 11,
                                    color: 'var(--text-muted)'
                                }}>
                                    {p.label}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{
                        marginTop: 16,
                        padding: 12,
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: 6,
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                            ~{roadmap.summary.estimatedDays} days
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                            Estimated total effort
                        </div>
                    </div>
                </div>
            </div>

            {/* Document Scorecard */}
            <div className="glass-panel" style={{ padding: 24, marginBottom: 32 }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 16
                }}>
                    <h3 style={{ margin: 0, fontSize: 14 }}>
                        Governance Document Scorecard
                    </h3>
                    <Link to="/library" style={{ color: 'var(--primary)', fontSize: 12 }}>
                        View Library →
                    </Link>
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gap: 12
                }}>
                    {['Policy', 'Standard', 'SOP', 'Playbook', 'Runbook', 'Guideline'].map(type => (
                        <TypeScorecard
                            key={type}
                            type={type}
                            stats={documentStats[type] || { notStarted: 0, draft: 0, published: 0, completionPercent: 0 }}
                        />
                    ))}
                </div>
            </div>

            {/* Priority Actions & Blocked Items */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: 24
            }}>
                {/* Next Priority Actions */}
                <div className="glass-panel" style={{ padding: 24 }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 16
                    }}>
                        <h3 style={{ margin: 0, fontSize: 14 }}>
                            🎯 Next Priority Actions
                        </h3>
                        <Link to="/roadmap" style={{ color: 'var(--primary)', fontSize: 12 }}>
                            View Full Roadmap →
                        </Link>
                    </div>
                    {nextActions.length > 0 ? (
                        nextActions.map((item, index) => (
                            <ActionCard key={item.id} item={item} index={index} />
                        ))
                    ) : (
                        <div style={{
                            textAlign: 'center',
                            padding: 40,
                            color: 'var(--text-muted)'
                        }}>
                            🎉 All items complete! Your program is mature.
                        </div>
                    )}
                </div>

                {/* Blocked Items */}
                <div className="glass-panel" style={{ padding: 24 }}>
                    <h3 style={{ margin: 0, fontSize: 14, marginBottom: 16 }}>
                        ⚠️ Blocked Items
                    </h3>
                    {blockedItems.length > 0 ? (
                        blockedItems.map(item => (
                            <div key={item.id} style={{
                                padding: 12,
                                marginBottom: 8,
                                background: 'rgba(255,68,68,0.1)',
                                borderRadius: 6,
                                borderLeft: '4px solid #ff4444'
                            }}>
                                <div style={{
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                    marginBottom: 4
                                }}>
                                    {item.title}
                                </div>
                                <div style={{
                                    fontSize: 10,
                                    color: 'var(--text-muted)'
                                }}>
                                    Blocked by: {item.blockedBy?.join(', ')}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{
                            textAlign: 'center',
                            padding: 24,
                            color: 'var(--primary)',
                            fontSize: 12
                        }}>
                            ✓ No blocked items
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VirtualCISODashboard;
