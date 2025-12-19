import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgram } from '../context/ProgramContext';
import { DOCUMENT_TYPES, NIST_CSF_2 } from '../data/frameworkData';

// =============================================================================
// ROADMAP VIEW - 4-Phase Strategic Roadmap with NIST CSF alignment
// =============================================================================

const RoadmapView = () => {
    const { roadmapItems, programStats, maturityTier } = useProgram();
    const [filterFunction, setFilterFunction] = useState('all');
    const [viewMode, setViewMode] = useState('phases');

    // Phase configuration
    const phases = [
        {
            id: 1,
            label: 'Phase 1: Foundation',
            subtitle: 'Days 1-30',
            description: 'Critical policies and essential controls',
            color: '#ff4444'
        },
        {
            id: 2,
            label: 'Phase 2: Build',
            subtitle: 'Days 31-90',
            description: 'Standards, procedures, and key safeguards',
            color: '#ff9900'
        },
        {
            id: 3,
            label: 'Phase 3: Mature',
            subtitle: 'Days 91-180',
            description: 'Advanced controls and monitoring',
            color: '#0088ff'
        },
        {
            id: 4,
            label: 'Phase 4: Optimize',
            subtitle: 'Days 180+',
            description: 'Continuous improvement and automation',
            color: '#00ff9d'
        }
    ];

    // Filtered items
    const filteredItems = useMemo(() => {
        if (filterFunction === 'all') return roadmapItems;
        return roadmapItems.filter(item => item.functionId === filterFunction);
    }, [roadmapItems, filterFunction]);

    // Group items by phase
    const itemsByPhase = useMemo(() => {
        const grouped = { 1: [], 2: [], 3: [], 4: [] };
        filteredItems.forEach(item => {
            const phase = item.phase || 2;
            if (grouped[phase]) {
                grouped[phase].push(item);
            }
        });

        // Sort each phase by priority
        const priorityOrder = { 'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
        Object.keys(grouped).forEach(phase => {
            grouped[phase].sort((a, b) =>
                (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3)
            );
        });

        return grouped;
    }, [filteredItems]);

    // Group items by NIST function
    const itemsByFunction = useMemo(() => {
        const grouped = {};
        Object.keys(NIST_CSF_2).forEach(fn => {
            grouped[fn] = filteredItems.filter(item => item.functionId === fn);
        });
        return grouped;
    }, [filteredItems]);

    // Calculate total effort
    const totalEffort = useMemo(() =>
        filteredItems.reduce((sum, item) => sum + (item.effort || 3), 0),
        [filteredItems]
    );

    // =========================================================================
    // COMPONENTS
    // =========================================================================

    // Item component
    const RoadmapItem = ({ item }) => {
        const typeInfo = DOCUMENT_TYPES[item.type];
        const fn = NIST_CSF_2[item.functionId];

        return (
            <div
                className="glass-panel"
                style={{
                    padding: '14px',
                    marginBottom: '10px',
                    borderLeft: `4px solid ${fn?.color || '#888'}`
                }}
            >
                {/* Header */}
                <div style={{
                    display: 'flex',
                    gap: '6px',
                    marginBottom: '6px',
                    flexWrap: 'wrap',
                    alignItems: 'center'
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
                        background: `${typeInfo?.color}22`,
                        color: typeInfo?.color,
                        padding: '2px 5px',
                        borderRadius: '3px'
                    }}>
                        {typeInfo?.icon} {item.type}
                    </span>
                    <span style={{
                        fontSize: '9px',
                        background: `${fn?.color}22`,
                        color: fn?.color,
                        padding: '2px 5px',
                        borderRadius: '3px'
                    }}>
                        {fn?.icon} {fn?.name}
                    </span>
                    {item.priority === 'Critical' && (
                        <span style={{
                            fontSize: '9px',
                            background: 'rgba(255,68,68,0.2)',
                            color: '#ff4444',
                            padding: '2px 5px',
                            borderRadius: '3px'
                        }}>
                            ⚠️ Critical
                        </span>
                    )}
                </div>

                {/* Title */}
                <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>
                    {item.title}
                </div>

                {/* Subcategory reference */}
                {item.subcategoryId && (
                    <div style={{
                        fontSize: '10px',
                        color: 'var(--text-muted)',
                        marginBottom: '4px'
                    }}>
                        📎 {item.subcategoryId}
                    </div>
                )}

                {/* Footer */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '10px',
                    color: 'var(--text-muted)'
                }}>
                    <span>~{item.effort} days</span>
                    {item.isoRef && (
                        <span>ISO {item.isoRef[0]}</span>
                    )}
                </div>
            </div>
        );
    };

    // Phase column
    const PhaseColumn = ({ phase }) => {
        const items = itemsByPhase[phase.id] || [];
        const phaseEffort = items.reduce((sum, i) => sum + (i.effort || 3), 0);

        return (
            <div style={{ flex: 1, minWidth: '280px' }}>
                {/* Phase header */}
                <div style={{
                    background: `linear-gradient(to bottom, ${phase.color}22, transparent)`,
                    padding: '14px',
                    borderTop: `4px solid ${phase.color}`,
                    borderRadius: '6px 6px 0 0',
                    marginBottom: '14px'
                }}>
                    <h3 style={{
                        margin: 0,
                        fontSize: '14px',
                        color: phase.color
                    }}>
                        {phase.label}
                    </h3>
                    <div style={{
                        fontSize: '11px',
                        color: 'var(--text-muted)',
                        marginTop: '2px'
                    }}>
                        {phase.subtitle}
                    </div>
                    <div style={{
                        marginTop: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '11px'
                    }}>
                        <span style={{ fontWeight: 'bold' }}>{items.length} items</span>
                        <span style={{ color: 'var(--text-muted)' }}>~{phaseEffort} days</span>
                    </div>
                </div>

                {/* Items */}
                <div>
                    {items.map(item => (
                        <RoadmapItem key={item.id} item={item} />
                    ))}
                    {items.length === 0 && (
                        <div style={{
                            textAlign: 'center',
                            padding: '30px',
                            color: 'var(--text-muted)',
                            fontSize: '12px',
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: '6px'
                        }}>
                            ✓ Phase complete
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Function section
    const FunctionSection = ({ funcKey }) => {
        const fn = NIST_CSF_2[funcKey];
        const items = itemsByFunction[funcKey] || [];

        if (items.length === 0) return null;

        return (
            <div style={{ marginBottom: '24px' }}>
                <div style={{
                    padding: '12px 16px',
                    background: `${fn.color}15`,
                    borderLeft: `4px solid ${fn.color}`,
                    borderRadius: '4px',
                    marginBottom: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '18px' }}>{fn.icon}</span>
                        <span style={{ fontWeight: 'bold', color: fn.color }}>{fn.name}</span>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {items.length} items
                    </span>
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '12px'
                }}>
                    {items.map(item => (
                        <RoadmapItem key={item.id} item={item} />
                    ))}
                </div>
            </div>
        );
    };

    // Function filter bar
    const FunctionFilterBar = () => (
        <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            alignItems: 'center'
        }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginRight: '8px' }}>
                Filter by Function:
            </span>
            <button
                onClick={() => setFilterFunction('all')}
                style={{
                    padding: '8px 16px',
                    background: filterFunction === 'all' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '4px',
                    color: filterFunction === 'all' ? '#000' : 'white',
                    cursor: 'pointer',
                    fontSize: '11px',
                    fontWeight: filterFunction === 'all' ? 'bold' : 'normal'
                }}
            >
                All ({roadmapItems.length})
            </button>
            {Object.entries(NIST_CSF_2).map(([fn, fnData]) => {
                const count = roadmapItems.filter(i => i.functionId === fn).length;
                const isActive = filterFunction === fn;

                return (
                    <button
                        key={fn}
                        onClick={() => setFilterFunction(fn)}
                        style={{
                            padding: '8px 12px',
                            background: isActive ? fnData.color : 'rgba(255,255,255,0.1)',
                            border: isActive ? 'none' : `1px solid ${fnData.color}44`,
                            borderRadius: '4px',
                            color: isActive ? '#000' : fnData.color,
                            cursor: 'pointer',
                            fontSize: '11px',
                            fontWeight: isActive ? 'bold' : 'normal',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}
                    >
                        {fnData.icon} {count}
                    </button>
                );
            })}
        </div>
    );

    // =========================================================================
    // RENDER
    // =========================================================================

    return (
        <div style={{ padding: '24px' }}>
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                }}>
                    <div>
                        <h1 style={{ margin: 0, marginBottom: '8px' }}>Strategic Roadmap</h1>
                        <p style={{ margin: 0, color: 'var(--text-muted)', maxWidth: '600px' }}>
                            Prioritized items organized by phase and NIST CSF 2.0 function.
                        </p>
                    </div>
                    <Link to="/program">
                        <button style={{
                            padding: '10px 20px',
                            background: 'var(--primary)',
                            border: 'none',
                            borderRadius: '6px',
                            color: '#000',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}>
                            Update Program →
                        </button>
                    </Link>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="glass-panel" style={{
                padding: '16px 24px',
                marginBottom: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', gap: '32px' }}>
                    <div>
                        <div style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: maturityTier.color
                        }}>
                            {filteredItems.length}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                            Items Remaining
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                            ~{totalEffort}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                            Days Effort
                        </div>
                    </div>
                    <div>
                        <div style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#ff4444'
                        }}>
                            {filteredItems.filter(i => i.priority === 'Critical').length}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                            Critical Items
                        </div>
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: maturityTier.color
                    }}>
                        {programStats.completionPercent}% Complete
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {programStats.completed} of {programStats.total} items
                    </div>
                </div>
            </div>

            {/* View Toggle */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <FunctionFilterBar />
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={() => setViewMode('phases')}
                        style={{
                            padding: '8px 16px',
                            background: viewMode === 'phases' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '4px',
                            color: viewMode === 'phases' ? '#000' : 'white',
                            cursor: 'pointer',
                            fontSize: '11px',
                            fontWeight: viewMode === 'phases' ? 'bold' : 'normal'
                        }}
                    >
                        📊 By Phase
                    </button>
                    <button
                        onClick={() => setViewMode('functions')}
                        style={{
                            padding: '8px 16px',
                            background: viewMode === 'functions' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '4px',
                            color: viewMode === 'functions' ? '#000' : 'white',
                            cursor: 'pointer',
                            fontSize: '11px',
                            fontWeight: viewMode === 'functions' ? 'bold' : 'normal'
                        }}
                    >
                        🏛️ By Function
                    </button>
                </div>
            </div>

            {/* Content */}
            {viewMode === 'phases' ? (
                <div style={{
                    display: 'flex',
                    gap: '20px',
                    overflowX: 'auto',
                    paddingBottom: '16px'
                }}>
                    {phases.map(phase => (
                        <PhaseColumn key={phase.id} phase={phase} />
                    ))}
                </div>
            ) : (
                <div>
                    {Object.keys(NIST_CSF_2).map(fn => (
                        <FunctionSection key={fn} funcKey={fn} />
                    ))}
                </div>
            )}

            {/* Legend */}
            <div className="glass-panel" style={{
                padding: '14px 20px',
                marginTop: '24px',
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
                fontSize: '11px'
            }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 'bold' }}>
                    Document Types:
                </span>
                {Object.entries(DOCUMENT_TYPES).map(([type, info]) => (
                    <span key={type} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '2px',
                            background: info.color
                        }} />
                        {info.icon} {type}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default RoadmapView;
