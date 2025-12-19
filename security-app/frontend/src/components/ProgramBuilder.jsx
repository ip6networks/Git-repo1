import React, { useState, useMemo } from 'react';
import { useProgram } from '../context/ProgramContext';
import { NIST_CSF_2, DOCUMENT_TYPES, PPT_DIMENSIONS } from '../data/programData';

// =============================================================================
// PROGRAM BUILDER - Hierarchical NIST CSF 2.0 View
// Function → Category → Subcategory → Items
// =============================================================================

const ProgramBuilder = () => {
    const {
        programItems,
        updateItemStatus,
        programStats,
        maturityTier
    } = useProgram();

    // Current selections
    const [activeFunction, setActiveFunction] = useState('GV');
    const [expandedCategories, setExpandedCategories] = useState({});
    const [typeFilter, setTypeFilter] = useState('all');
    const [dimensionFilter, setDimensionFilter] = useState('all');

    // Get current function data
    const currentFunction = NIST_CSF_2[activeFunction];

    // Get items for current function
    const functionItems = useMemo(() =>
        programItems.filter(item => item.functionId === activeFunction),
        [programItems, activeFunction]
    );

    // Get items organized by category and subcategory
    const itemsByHierarchy = useMemo(() => {
        const hierarchy = {};

        Object.entries(currentFunction.categories).forEach(([catId, category]) => {
            hierarchy[catId] = {
                ...category,
                subcategories: {}
            };

            category.subcategories.forEach(subcat => {
                const items = functionItems.filter(item => {
                    const matchesSubcat = item.subcategoryId === subcat.id;
                    const matchesType = typeFilter === 'all' || item.type === typeFilter;
                    const matchesDimension = dimensionFilter === 'all' || item.dimension === dimensionFilter;
                    return matchesSubcat && matchesType && matchesDimension;
                });

                hierarchy[catId].subcategories[subcat.id] = {
                    ...subcat,
                    items
                };
            });
        });

        return hierarchy;
    }, [currentFunction, functionItems, typeFilter, dimensionFilter]);

    // Calculate stats for current function
    const functionStats = useMemo(() => {
        const total = functionItems.length;
        const completed = functionItems.filter(i =>
            i.status === 'Published' || i.status === 'Implemented'
        ).length;
        return {
            total,
            completed,
            percent: total > 0 ? Math.round((completed / total) * 100) : 0
        };
    }, [functionItems]);

    // Toggle category expansion
    const toggleCategory = (catId) => {
        setExpandedCategories(prev => ({
            ...prev,
            [catId]: !prev[catId]
        }));
    };

    // Expand all categories
    const expandAll = () => {
        const expanded = {};
        Object.keys(currentFunction.categories).forEach(catId => {
            expanded[catId] = true;
        });
        setExpandedCategories(expanded);
    };

    // =========================================================================
    // COMPONENTS
    // =========================================================================

    // Function tab bar
    const FunctionTabs = () => (
        <div style={{
            display: 'flex',
            gap: '6px',
            marginBottom: '24px',
            background: 'rgba(0,0,0,0.2)',
            padding: '8px',
            borderRadius: '8px',
            overflowX: 'auto'
        }}>
            {Object.entries(NIST_CSF_2).map(([key, fn]) => {
                const isActive = key === activeFunction;
                const fnItems = programItems.filter(i => i.functionId === key);
                const fnCompleted = fnItems.filter(i =>
                    i.status === 'Published' || i.status === 'Implemented'
                ).length;
                const fnPercent = fnItems.length > 0
                    ? Math.round((fnCompleted / fnItems.length) * 100)
                    : 0;

                return (
                    <button
                        key={key}
                        onClick={() => {
                            setActiveFunction(key);
                            setExpandedCategories({});
                        }}
                        style={{
                            flex: 1,
                            minWidth: '110px',
                            padding: '12px 14px',
                            background: isActive ? `${fn.color}15` : 'transparent',
                            border: isActive ? `2px solid ${fn.color}` : '2px solid transparent',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <div style={{ fontSize: '20px', marginBottom: '4px' }}>
                            {fn.icon}
                        </div>
                        <div style={{
                            fontSize: '11px',
                            fontWeight: 'bold',
                            color: isActive ? fn.color : 'white'
                        }}>
                            {fn.name}
                        </div>
                        <div style={{
                            fontSize: '10px',
                            color: 'var(--text-muted)',
                            marginTop: '4px'
                        }}>
                            {fnPercent}%
                        </div>
                    </button>
                );
            })}
        </div>
    );

    // Filter Controls
    const FilterControls = () => (
        <div className="glass-panel" style={{
            padding: '12px 16px',
            marginBottom: '20px',
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            flexWrap: 'wrap'
        }}>
            {/* Type Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Type:</span>
                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    style={{
                        padding: '6px 12px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '4px',
                        color: 'white',
                        fontSize: '12px',
                        minWidth: '120px'
                    }}
                >
                    <option value="all">All Types</option>
                    {Object.entries(DOCUMENT_TYPES).map(([type, info]) => (
                        <option key={type} value={type}>{info.icon} {type}</option>
                    ))}
                </select>
            </div>

            <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }}></div>

            {/* Dimension Filter (PPT) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Aspect:</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                        onClick={() => setDimensionFilter('all')}
                        style={{
                            padding: '6px 12px',
                            background: dimensionFilter === 'all' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '4px',
                            color: 'white',
                            fontSize: '11px',
                            cursor: 'pointer'
                        }}
                    >
                        All
                    </button>
                    {Object.values(PPT_DIMENSIONS).map(dim => (
                        <button
                            key={dim.id}
                            onClick={() => setDimensionFilter(dim.id)}
                            style={{
                                padding: '6px 12px',
                                background: dimensionFilter === dim.id ? `${dim.color}22` : 'rgba(255,255,255,0.05)',
                                border: dimensionFilter === dim.id ? `1px solid ${dim.color}66` : '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '4px',
                                color: dimensionFilter === dim.id ? dim.color : 'white',
                                fontSize: '11px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}
                        >
                            <span>{dim.icon}</span>
                            <span>{dim.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--text-muted)' }}>
                Showing {functionItems.filter(item =>
                    (typeFilter === 'all' || item.type === typeFilter) &&
                    (dimensionFilter === 'all' || item.dimension === dimensionFilter)
                ).length} items
            </div>
        </div>
    );

    // Category section
    const CategorySection = ({ catId, category }) => {
        const isExpanded = expandedCategories[catId];
        // Calculate filtered count just for display badge
        const catFilteredItems = itemsByHierarchy[catId]
            ? Object.values(itemsByHierarchy[catId].subcategories).flatMap(s => s.items)
            : [];

        return (
            <div style={{ marginBottom: '16px' }}>
                {/* Category Header */}
                <button
                    onClick={() => toggleCategory(catId)}
                    style={{
                        width: '100%',
                        padding: '16px 20px',
                        background: isExpanded
                            ? `${currentFunction.color}10`
                            : 'rgba(255,255,255,0.03)',
                        border: isExpanded
                            ? `1px solid ${currentFunction.color}44`
                            : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: isExpanded ? '8px 8px 0 0' : '8px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                            <span style={{
                                fontSize: '10px',
                                background: `${currentFunction.color}22`,
                                color: currentFunction.color,
                                padding: '3px 8px',
                                borderRadius: '4px',
                                fontWeight: 'bold'
                            }}>
                                {catId}
                            </span>
                            <span style={{ fontWeight: 'bold', color: 'white', fontSize: '14px' }}>
                                {category.name}
                            </span>
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', maxWidth: '700px' }}>
                            {category.description}
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        {catFilteredItems.length > 0 && (
                            <span style={{
                                fontSize: '11px',
                                background: 'rgba(255,255,255,0.1)',
                                padding: '2px 8px',
                                borderRadius: '10px'
                            }}>
                                {catFilteredItems.length} items
                            </span>
                        )}
                        <span style={{
                            fontSize: '16px',
                            color: 'var(--text-muted)',
                            transition: 'transform 0.2s ease',
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                        }}>
                            ▼
                        </span>
                    </div>
                </button>

                {/* Subcategories */}
                {isExpanded && (
                    <div style={{
                        background: 'rgba(0,0,0,0.2)',
                        borderRadius: '0 0 8px 8px',
                        border: `1px solid ${currentFunction.color}22`,
                        borderTop: 'none',
                        padding: '16px'
                    }}>
                        {category.subcategories.map(subcat => (
                            <SubcategorySection
                                key={subcat.id}
                                subcat={subcat}
                                items={itemsByHierarchy[catId]?.subcategories[subcat.id]?.items || []}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // Subcategory section
    const SubcategorySection = ({ subcat, items }) => {
        const completedItems = items.filter(i =>
            i.status === 'Published' || i.status === 'Implemented'
        ).length;
        const hasItems = items.length > 0;

        return (
            <div style={{
                marginBottom: '16px',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
                {/* Subcategory Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px'
                }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{
                                fontSize: '9px',
                                background: 'rgba(255,255,255,0.1)',
                                padding: '2px 6px',
                                borderRadius: '3px',
                                fontFamily: 'monospace'
                            }}>
                                {subcat.id}
                            </span>
                            {completedItems === items.length && items.length > 0 && (
                                <span style={{ color: 'var(--primary)', fontSize: '12px' }}>✓</span>
                            )}
                        </div>
                        <div style={{
                            fontSize: '12px',
                            color: 'var(--text-muted)',
                            maxWidth: '700px',
                            lineHeight: '1.5'
                        }}>
                            {subcat.text}
                        </div>
                    </div>
                    {hasItems && (
                        <div style={{
                            fontSize: '11px',
                            color: 'var(--text-muted)',
                            background: 'rgba(255,255,255,0.05)',
                            padding: '4px 8px',
                            borderRadius: '4px'
                        }}>
                            {completedItems}/{items.length}
                        </div>
                    )}
                </div>

                {/* Items for this subcategory */}
                {hasItems ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '10px',
                        marginLeft: '16px'
                    }}>
                        {items.map(item => (
                            <ItemCard key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div style={{
                        marginLeft: '16px',
                        padding: '12px',
                        background: 'rgba(255,255,255,0.02)',
                        borderRadius: '6px',
                        fontSize: '11px',
                        color: 'var(--text-muted)',
                        fontStyle: 'italic'
                    }}>
                        No items match the current filters
                    </div>
                )}
            </div>
        );
    };

    // Item card
    const ItemCard = ({ item }) => {
        const typeInfo = DOCUMENT_TYPES[item.type];
        const dimensionInfo = PPT_DIMENSIONS[item.dimension || 'Process'];

        return (
            <div style={{
                padding: '12px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '6px',
                borderLeft: `3px solid ${typeInfo?.color || '#888'}`
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    gap: '6px',
                    marginBottom: '6px',
                    flexWrap: 'wrap'
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
                    {/* PPT Tag */}
                    {dimensionInfo && (
                        <span style={{
                            fontSize: '9px',
                            background: `${dimensionInfo.color}22`,
                            color: dimensionInfo.color,
                            padding: '2px 5px',
                            borderRadius: '3px'
                        }}>
                            {dimensionInfo.icon} {dimensionInfo.label}
                        </span>
                    )}
                    {item.priority === 'Critical' && (
                        <span style={{
                            fontSize: '9px',
                            background: 'rgba(255,68,68,0.2)',
                            color: '#ff4444',
                            padding: '2px 5px',
                            borderRadius: '3px'
                        }}>
                            ⚠️
                        </span>
                    )}
                </div>

                {/* Title */}
                <div style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginBottom: '4px',
                    color: 'white'
                }}>
                    {item.title}
                </div>

                {/* Meta */}
                <div style={{
                    fontSize: '10px',
                    color: 'var(--text-muted)',
                    marginBottom: '10px'
                }}>
                    Phase {item.phase} • ~{item.effort} days
                    {item.isoRef && ` • ISO ${item.isoRef[0]}`}
                </div>

                {/* Status Buttons */}
                <div style={{ display: 'flex', gap: '4px' }}>
                    {['Not Started', 'Draft', 'Published'].map(status => (
                        <button
                            key={status}
                            onClick={() => updateItemStatus(item.id, status)}
                            style={{
                                flex: 1,
                                padding: '6px',
                                borderRadius: '4px',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '9px',
                                fontWeight: item.status === status ? 'bold' : 'normal',
                                background: item.status === status
                                    ? status === 'Published' ? 'var(--primary)'
                                        : status === 'Draft' ? '#ff9900'
                                            : 'rgba(255,255,255,0.2)'
                                    : 'rgba(255,255,255,0.05)',
                                color: item.status === status && status !== 'Not Started'
                                    ? '#000'
                                    : '#fff',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {status === 'Not Started' ? 'Not Started' : status}
                        </button>
                    ))}
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
            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ margin: 0, marginBottom: '8px' }}>Program Builder</h1>
                        <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                            Build your security program aligned with NIST CSF 2.0 hierarchy:
                            <strong> Function → Category → Subcategory</strong>
                        </p>
                    </div>
                    <div className="glass-panel" style={{
                        padding: '16px 24px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                    }}>
                        <div style={{ textAlign: 'center' }}>
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
                        <div style={{
                            padding: '8px 16px',
                            background: `${maturityTier.color}22`,
                            borderRadius: '4px',
                            color: maturityTier.color,
                            fontWeight: 'bold',
                            fontSize: '12px'
                        }}>
                            Tier {maturityTier.tier}
                        </div>
                    </div>
                </div>
            </div>

            {/* Function Tabs */}
            <FunctionTabs />

            {/* Function Header */}
            <div className="glass-panel" style={{
                padding: '20px 24px',
                marginBottom: '20px',
                borderLeft: `4px solid ${currentFunction.color}`
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 style={{
                            margin: 0,
                            marginBottom: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            color: currentFunction.color,
                            fontSize: '20px'
                        }}>
                            {currentFunction.icon} {currentFunction.name}
                        </h2>
                        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', maxWidth: '700px' }}>
                            {currentFunction.description}
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                {functionStats.completed}/{functionStats.total}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                Items Complete
                            </div>
                        </div>
                        <button
                            onClick={expandAll}
                            style={{
                                padding: '8px 16px',
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                borderRadius: '4px',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '11px'
                            }}
                        >
                            Expand All
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <FilterControls />

            {/* Categories */}
            {Object.entries(currentFunction.categories).map(([catId, category]) => (
                <CategorySection key={catId} catId={catId} category={category} />
            ))}
        </div>
    );
};

export default ProgramBuilder;
