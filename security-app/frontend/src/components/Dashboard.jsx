import React from 'react';
import { Link } from 'react-router-dom';
import { useProgram } from '../context/ProgramContext';
import { NIST_CSF_2 } from '../data/frameworkData';

// =============================================================================
// DASHBOARD - Executive Summary with NIST CSF 2.0 alignment
// =============================================================================

const Dashboard = () => {
    const {
        programStats,
        statsByFunction,
        roadmapItems,
        maturityTier,
        risks,
        profile
    } = useProgram();

    // Critical risks count
    const criticalRisks = risks.filter(r =>
        (r.scores?.inherent?.total || 0) >= 15
    ).length;

    // High priority roadmap items
    const priorityItems = roadmapItems
        .filter(i => i.priority === 'Critical')
        .slice(0, 5);

    // Phase 1 items
    const phase1Items = roadmapItems.filter(i => i.phase === 1);

    // =========================================================================
    // COMPONENTS
    // =========================================================================

    // Maturity circle
    const MaturityCircle = () => {
        const size = 140;
        const strokeWidth = 12;
        const radius = (size - strokeWidth) / 2;
        const circumference = radius * 2 * Math.PI;
        const offset = circumference - (programStats.completionPercent / 100) * circumference;

        return (
            <div style={{ position: 'relative', width: size, height: size }}>
                <svg width={size} height={size}>
                    {/* Background circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth={strokeWidth}
                    />
                    {/* Progress circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={maturityTier.color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        style={{
                            transform: 'rotate(-90deg)',
                            transformOrigin: '50% 50%',
                            transition: 'stroke-dashoffset 0.5s ease'
                        }}
                    />
                </svg>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: '28px',
                        fontWeight: 'bold',
                        color: maturityTier.color
                    }}>
                        {programStats.completionPercent}%
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        Complete
                    </div>
                </div>
            </div>
        );
    };

    // NIST function bar
    const FunctionBar = ({ funcKey }) => {
        const fn = NIST_CSF_2[funcKey];
        const stats = statsByFunction[funcKey];

        return (
            <Link
                to="/program"
                style={{ textDecoration: 'none' }}
                onClick={() => {
                    // Could set active function via URL param
                }}
            >
                <div style={{
                    marginBottom: '12px',
                    padding: '10px 14px',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '6px',
                    borderLeft: `3px solid ${fn.color}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '14px' }}>{fn.icon}</span>
                            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{fn.name}</span>
                        </div>
                        <span style={{
                            fontSize: '12px',
                            fontWeight: 'bold',
                            color: fn.color
                        }}>
                            {stats.completionPercent}%
                        </span>
                    </div>
                    <div style={{
                        height: '6px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '3px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            height: '100%',
                            width: `${stats.completionPercent}%`,
                            background: fn.color,
                            borderRadius: '3px',
                            transition: 'width 0.3s ease'
                        }} />
                    </div>
                    <div style={{
                        fontSize: '10px',
                        color: 'var(--text-muted)',
                        marginTop: '4px'
                    }}>
                        {stats.completed}/{stats.total} items
                    </div>
                </div>
            </Link>
        );
    };

    // Quick action card
    const QuickAction = ({ to, icon, title, subtitle, color }) => (
        <Link to={to} style={{ textDecoration: 'none' }}>
            <div
                className="glass-panel"
                style={{
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    borderTop: `3px solid ${color}`
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>{icon}</div>
                <div style={{ fontWeight: 'bold', marginBottom: '4px', color: 'white' }}>{title}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{subtitle}</div>
            </div>
        </Link>
    );

    // =========================================================================
    // RENDER
    // =========================================================================

    return (
        <div style={{ padding: '24px' }}>
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ margin: 0, marginBottom: '8px' }}>
                    Security Program Dashboard
                </h1>
                <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                    {profile.name} • Program aligned with NIST CSF 2.0
                </p>
            </div>

            {/* Main Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>

                {/* Left Column - Maturity */}
                <div>
                    <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
                        <h3 style={{ margin: 0, marginBottom: '20px', fontSize: '14px' }}>
                            Program Maturity
                        </h3>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '16px'
                        }}>
                            <MaturityCircle />
                            <div style={{
                                padding: '8px 20px',
                                background: `${maturityTier.color}22`,
                                borderRadius: '20px',
                                color: maturityTier.color,
                                fontWeight: 'bold',
                                fontSize: '14px'
                            }}>
                                Tier {maturityTier.tier}: {maturityTier.label}
                            </div>
                        </div>

                        {/* Stats */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '12px',
                            marginTop: '24px'
                        }}>
                            <div style={{
                                padding: '12px',
                                background: 'rgba(0,255,157,0.1)',
                                borderRadius: '6px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--primary)' }}>
                                    {programStats.completed}
                                </div>
                                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Completed</div>
                            </div>
                            <div style={{
                                padding: '12px',
                                background: 'rgba(255,153,0,0.1)',
                                borderRadius: '6px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ff9900' }}>
                                    {programStats.draft}
                                </div>
                                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>In Progress</div>
                            </div>
                        </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="glass-panel" style={{ padding: '20px' }}>
                        <h3 style={{ margin: 0, marginBottom: '16px', fontSize: '14px' }}>
                            Key Metrics
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                    Total Items
                                </span>
                                <span style={{ fontWeight: 'bold' }}>{programStats.total}</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                    Roadmap Items
                                </span>
                                <span style={{ fontWeight: 'bold' }}>{roadmapItems.length}</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                    Phase 1 Remaining
                                </span>
                                <span style={{ fontWeight: 'bold', color: '#ff4444' }}>
                                    {phase1Items.length}
                                </span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                    Critical Risks
                                </span>
                                <span style={{
                                    fontWeight: 'bold',
                                    color: criticalRisks > 0 ? '#ff4444' : 'var(--primary)'
                                }}>
                                    {criticalRisks}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - NIST Coverage */}
                <div>
                    <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px'
                        }}>
                            <h3 style={{ margin: 0, fontSize: '14px' }}>
                                NIST CSF 2.0 Coverage
                            </h3>
                            <Link
                                to="/frameworks"
                                style={{
                                    fontSize: '11px',
                                    color: 'var(--primary)',
                                    textDecoration: 'none'
                                }}
                            >
                                View Framework →
                            </Link>
                        </div>

                        {Object.keys(NIST_CSF_2).map(fn => (
                            <FunctionBar key={fn} funcKey={fn} />
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '12px'
                    }}>
                        <QuickAction
                            to="/program"
                            icon="📋"
                            title="Program Builder"
                            subtitle="Build security program"
                            color="var(--primary)"
                        />
                        <QuickAction
                            to="/risk"
                            icon="⚠️"
                            title="Risk Center"
                            subtitle={`${criticalRisks} critical risks`}
                            color="#ff4444"
                        />
                        <QuickAction
                            to="/roadmap"
                            icon="🗺️"
                            title="Roadmap"
                            subtitle={`${roadmapItems.length} items remaining`}
                            color="#0088ff"
                        />
                        <QuickAction
                            to="/frameworks"
                            icon="🏛️"
                            title="Frameworks"
                            subtitle="NIST CSF & ISO 27001"
                            color="#ff9900"
                        />
                    </div>
                </div>
            </div>

            {/* Priority Items */}
            {priorityItems.length > 0 && (
                <div className="glass-panel" style={{ padding: '24px', marginTop: '24px' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '16px'
                    }}>
                        <h3 style={{ margin: 0, fontSize: '14px' }}>
                            🚨 Critical Priority Items
                        </h3>
                        <Link
                            to="/roadmap"
                            style={{
                                fontSize: '11px',
                                color: 'var(--primary)',
                                textDecoration: 'none'
                            }}
                        >
                            View All →
                        </Link>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '12px'
                    }}>
                        {priorityItems.map(item => {
                            const fn = NIST_CSF_2[item.functionId];
                            return (
                                <div
                                    key={item.id}
                                    style={{
                                        padding: '14px',
                                        background: 'rgba(255,68,68,0.08)',
                                        borderRadius: '6px',
                                        borderLeft: `3px solid ${fn?.color || '#ff4444'}`
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        gap: '6px',
                                        marginBottom: '6px'
                                    }}>
                                        <span style={{
                                            fontSize: '9px',
                                            background: 'rgba(255,255,255,0.1)',
                                            padding: '2px 5px',
                                            borderRadius: '3px'
                                        }}>
                                            {item.id}
                                        </span>
                                        <span style={{
                                            fontSize: '9px',
                                            background: `${fn?.color}22`,
                                            color: fn?.color,
                                            padding: '2px 5px',
                                            borderRadius: '3px'
                                        }}>
                                            {fn?.name}
                                        </span>
                                    </div>
                                    <div style={{
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        marginBottom: '4px'
                                    }}>
                                        {item.title}
                                    </div>
                                    <div style={{
                                        fontSize: '10px',
                                        color: 'var(--text-muted)'
                                    }}>
                                        Phase {item.phase} • ~{item.effort} days
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
