import React, { useState } from 'react';
import { useProgram } from '../context/ProgramContext';
import { NIST_CSF_2, getFrameworkStats } from '../data/frameworkData';

// =============================================================================
// FRAMEWORK NAVIGATOR - Complete NIST CSF 2.0 and ISO 27001 Reference
// =============================================================================

// ISO 27001:2022 Clauses
const ISO_27001_CLAUSES = [
    {
        clause: '5',
        title: 'Organizational Controls',
        count: 37,
        controls: [
            '5.1 Policies for information security',
            '5.2 Information security roles and responsibilities',
            '5.3 Segregation of duties',
            '5.4 Management responsibilities',
            '5.5 Contact with authorities',
            '5.6 Contact with special interest groups',
            '5.7 Threat intelligence',
            '5.8 Information security in project management',
            '5.9 Inventory of information and other associated assets',
            '5.10 Acceptable use of information and other associated assets',
            '5.11 Return of assets',
            '5.12 Classification of information',
            '5.13 Labeling of information',
            '5.14 Information transfer',
            '5.15 Access control',
            '5.16 Identity management',
            '5.17 Authentication information',
            '5.18 Access rights',
            '5.19 Information security in supplier relationships',
            '5.20 Addressing information security within supplier agreements',
            '5.21 Managing information security in the ICT supply chain',
            '5.22 Monitoring, review and change management of supplier services',
            '5.23 Information security for use of cloud services',
            '5.24 Information security incident management planning and preparation',
            '5.25 Assessment and decision on information security events',
            '5.26 Response to information security incidents',
            '5.27 Learning from information security incidents',
            '5.28 Collection of evidence',
            '5.29 Information security during disruption',
            '5.30 ICT readiness for business continuity',
            '5.31 Legal, statutory, regulatory and contractual requirements',
            '5.32 Intellectual property rights',
            '5.33 Protection of records',
            '5.34 Privacy and protection of PII',
            '5.35 Independent review of information security',
            '5.36 Compliance with policies, rules and standards',
            '5.37 Documented operating procedures'
        ]
    },
    {
        clause: '6',
        title: 'People Controls',
        count: 8,
        controls: [
            '6.1 Screening',
            '6.2 Terms and conditions of employment',
            '6.3 Information security awareness, education and training',
            '6.4 Disciplinary process',
            '6.5 Responsibilities after termination or change of employment',
            '6.6 Confidentiality or non-disclosure agreements',
            '6.7 Remote working',
            '6.8 Information security event reporting'
        ]
    },
    {
        clause: '7',
        title: 'Physical Controls',
        count: 14,
        controls: [
            '7.1 Physical security perimeters',
            '7.2 Physical entry',
            '7.3 Securing offices, rooms and facilities',
            '7.4 Physical security monitoring',
            '7.5 Protecting against physical and environmental threats',
            '7.6 Working in secure areas',
            '7.7 Clear desk and clear screen',
            '7.8 Equipment siting and protection',
            '7.9 Security of assets off-premises',
            '7.10 Storage media',
            '7.11 Supporting utilities',
            '7.12 Cabling security',
            '7.13 Equipment maintenance',
            '7.14 Secure disposal or reuse of equipment'
        ]
    },
    {
        clause: '8',
        title: 'Technological Controls',
        count: 34,
        controls: [
            '8.1 User endpoint devices',
            '8.2 Privileged access rights',
            '8.3 Information access restriction',
            '8.4 Access to source code',
            '8.5 Secure authentication',
            '8.6 Capacity management',
            '8.7 Protection against malware',
            '8.8 Management of technical vulnerabilities',
            '8.9 Configuration management',
            '8.10 Information deletion',
            '8.11 Data masking',
            '8.12 Data leakage prevention',
            '8.13 Information backup',
            '8.14 Redundancy of information processing facilities',
            '8.15 Logging',
            '8.16 Monitoring activities',
            '8.17 Clock synchronization',
            '8.18 Use of privileged utility programs',
            '8.19 Installation of software on operational systems',
            '8.20 Networks security',
            '8.21 Security of network services',
            '8.22 Segregation of networks',
            '8.23 Web filtering',
            '8.24 Use of cryptography',
            '8.25 Secure development life cycle',
            '8.26 Application security requirements',
            '8.27 Secure system architecture and engineering principles',
            '8.28 Secure coding',
            '8.29 Security testing in development and acceptance',
            '8.30 Outsourced development',
            '8.31 Separation of development, test and production environments',
            '8.32 Change management',
            '8.33 Test information',
            '8.34 Protection of information systems during audit testing'
        ]
    }
];

// NIST CSF to ISO 27001 Mapping
const NIST_TO_ISO_MAPPING = {
    'GV': ['5.1', '5.2', '5.3', '5.4', '5.19', '5.20', '5.21', '5.22', '5.31', '5.35', '5.36'],
    'ID': ['5.7', '5.9', '5.10', '5.12', '5.13', '8.8'],
    'PR': ['5.15', '5.16', '5.17', '5.18', '6.3', '8.1', '8.2', '8.5', '8.7', '8.9', '8.13', '8.20', '8.24'],
    'DE': ['8.15', '8.16'],
    'RS': ['5.24', '5.25', '5.26', '5.27', '5.28'],
    'RC': ['5.29', '5.30', '8.13', '8.14']
};

const FrameworkNavigator = () => {
    const { currentLens, setCurrentLens, statsByFunction } = useProgram();
    const [activeFunction, setActiveFunction] = useState('GV');
    const [expandedCategories, setExpandedCategories] = useState({});
    const [activeISOClause, setActiveISOClause] = useState('5');

    const frameworkStats = getFrameworkStats();
    const currentFunction = NIST_CSF_2[activeFunction];

    // Toggle category expansion
    const toggleCategory = (catId) => {
        setExpandedCategories(prev => ({
            ...prev,
            [catId]: !prev[catId]
        }));
    };

    // =========================================================================
    // COMPONENTS
    // =========================================================================

    // Function tab
    const FunctionTab = ({ funcKey }) => {
        const fn = NIST_CSF_2[funcKey];
        const stats = statsByFunction[funcKey] || {};
        const isActive = funcKey === activeFunction;
        const catCount = Object.keys(fn.categories).length;
        let subcatCount = 0;
        Object.values(fn.categories).forEach(cat => {
            subcatCount += cat.subcategories.length;
        });

        return (
            <button
                onClick={() => {
                    setActiveFunction(funcKey);
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
                    textAlign: 'center'
                }}
            >
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>{fn.icon}</div>
                <div style={{
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: isActive ? fn.color : 'white'
                }}>
                    {fn.name}
                </div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {catCount} categories • {subcatCount} subcategories
                </div>
            </button>
        );
    };

    // Category section
    const CategorySection = ({ catId, category }) => {
        const isExpanded = expandedCategories[catId];
        const isoMappings = NIST_TO_ISO_MAPPING[activeFunction] || [];

        return (
            <div style={{ marginBottom: '12px' }}>
                <button
                    onClick={() => toggleCategory(catId)}
                    style={{
                        width: '100%',
                        padding: '14px 18px',
                        background: isExpanded
                            ? `${currentFunction.color}10`
                            : 'rgba(255,255,255,0.03)',
                        border: isExpanded
                            ? `1px solid ${currentFunction.color}44`
                            : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: isExpanded ? '6px 6px 0 0' : '6px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                            <span style={{
                                fontSize: '10px',
                                background: `${currentFunction.color}22`,
                                color: currentFunction.color,
                                padding: '3px 8px',
                                borderRadius: '4px',
                                fontWeight: 'bold',
                                fontFamily: 'monospace'
                            }}>
                                {catId}
                            </span>
                            <span style={{ fontWeight: 'bold', color: 'white', fontSize: '13px' }}>
                                {category.name}
                            </span>
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', maxWidth: '600px' }}>
                            {category.description}
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                            {category.subcategories.length} subcategories
                        </span>
                        <span style={{
                            fontSize: '14px',
                            color: 'var(--text-muted)',
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease'
                        }}>
                            ▼
                        </span>
                    </div>
                </button>

                {isExpanded && (
                    <div style={{
                        background: 'rgba(0,0,0,0.2)',
                        border: `1px solid ${currentFunction.color}22`,
                        borderTop: 'none',
                        borderRadius: '0 0 6px 6px',
                        padding: '12px 16px'
                    }}>
                        {category.subcategories.map((subcat, idx) => (
                            <div
                                key={subcat.id}
                                style={{
                                    padding: '10px 0',
                                    borderBottom: idx < category.subcategories.length - 1
                                        ? '1px solid rgba(255,255,255,0.05)'
                                        : 'none'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                    <span style={{
                                        fontSize: '10px',
                                        background: 'rgba(255,255,255,0.1)',
                                        padding: '3px 6px',
                                        borderRadius: '3px',
                                        fontFamily: 'monospace',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {subcat.id}
                                    </span>
                                    <span style={{
                                        fontSize: '12px',
                                        color: 'var(--text-muted)',
                                        lineHeight: '1.5'
                                    }}>
                                        {subcat.text}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // ISO Clause section
    const ISOClauseSection = ({ clause }) => {
        const isActive = clause.clause === activeISOClause;

        return (
            <div style={{ marginBottom: '12px' }}>
                <button
                    onClick={() => setActiveISOClause(isActive ? '' : clause.clause)}
                    style={{
                        width: '100%',
                        padding: '14px 18px',
                        background: isActive ? 'rgba(0,136,255,0.15)' : 'rgba(255,255,255,0.03)',
                        border: isActive ? '1px solid #0088ff' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: isActive ? '6px 6px 0 0' : '6px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{
                            fontSize: '11px',
                            background: '#0088ff',
                            color: '#000',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontWeight: 'bold'
                        }}>
                            Clause {clause.clause}
                        </span>
                        <span style={{ fontWeight: 'bold', color: 'white' }}>
                            {clause.title}
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                            {clause.controls.length} controls
                        </span>
                        <span style={{
                            fontSize: '14px',
                            color: 'var(--text-muted)',
                            transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease'
                        }}>
                            ▼
                        </span>
                    </div>
                </button>
                {isActive && (
                    <div style={{
                        background: 'rgba(0,0,0,0.2)',
                        border: '1px solid rgba(0,136,255,0.2)',
                        borderTop: 'none',
                        borderRadius: '0 0 6px 6px',
                        padding: '8px 16px'
                    }}>
                        {clause.controls.map((control, idx) => (
                            <div
                                key={idx}
                                style={{
                                    padding: '8px 0',
                                    borderBottom: idx < clause.controls.length - 1
                                        ? '1px solid rgba(255,255,255,0.03)'
                                        : 'none',
                                    fontSize: '12px',
                                    color: 'var(--text-muted)'
                                }}
                            >
                                {control}
                            </div>
                        ))}
                    </div>
                )}
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
                    <h1 style={{ margin: 0, marginBottom: '8px' }}>Framework Reference</h1>
                    <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                        NIST CSF 2.0 ({frameworkStats.functions} functions, {frameworkStats.categories} categories, {frameworkStats.subcategories} subcategories)
                        and ISO 27001:2022 (93 controls)
                    </p>
                </div>

                {/* Lens Switcher */}
                <div style={{
                    background: 'rgba(255,255,255,0.1)',
                    padding: '4px',
                    borderRadius: '8px',
                    display: 'flex'
                }}>
                    <button
                        onClick={() => setCurrentLens('program')}
                        style={{
                            padding: '10px 20px',
                            background: currentLens === 'program' ? 'var(--primary)' : 'transparent',
                            color: currentLens === 'program' ? 'black' : 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '12px'
                        }}
                    >
                        🏛️ NIST CSF 2.0
                    </button>
                    <button
                        onClick={() => setCurrentLens('audit')}
                        style={{
                            padding: '10px 20px',
                            background: currentLens === 'audit' ? '#0088ff' : 'transparent',
                            color: currentLens === 'audit' ? 'black' : 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '12px'
                        }}
                    >
                        📋 ISO 27001:2022
                    </button>
                </div>
            </div>

            {/* NIST CSF View */}
            {currentLens === 'program' && (
                <>
                    {/* Function Tabs */}
                    <div style={{
                        display: 'flex',
                        gap: '6px',
                        marginBottom: '24px',
                        background: 'rgba(0,0,0,0.2)',
                        padding: '8px',
                        borderRadius: '8px',
                        overflowX: 'auto'
                    }}>
                        {Object.keys(NIST_CSF_2).map(key => (
                            <FunctionTab key={key} funcKey={key} />
                        ))}
                    </div>

                    {/* Function Header */}
                    <div className="glass-panel" style={{
                        padding: '20px',
                        marginBottom: '24px',
                        borderLeft: `4px solid ${currentFunction.color}`
                    }}>
                        <h2 style={{
                            margin: 0,
                            marginBottom: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            color: currentFunction.color
                        }}>
                            {currentFunction.icon} {currentFunction.name} ({currentFunction.id})
                        </h2>
                        <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            {currentFunction.description}
                        </p>
                        {NIST_TO_ISO_MAPPING[activeFunction] && (
                            <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                    ISO 27001 mappings:
                                </span>
                                {NIST_TO_ISO_MAPPING[activeFunction].slice(0, 8).map(iso => (
                                    <span key={iso} style={{
                                        fontSize: '10px',
                                        background: 'rgba(0,136,255,0.2)',
                                        color: '#0088ff',
                                        padding: '2px 6px',
                                        borderRadius: '4px'
                                    }}>
                                        {iso}
                                    </span>
                                ))}
                                {NIST_TO_ISO_MAPPING[activeFunction].length > 8 && (
                                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                                        +{NIST_TO_ISO_MAPPING[activeFunction].length - 8} more
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Categories */}
                    {Object.entries(currentFunction.categories).map(([catId, category]) => (
                        <CategorySection key={catId} catId={catId} category={category} />
                    ))}
                </>
            )}

            {/* ISO 27001 View */}
            {currentLens === 'audit' && (
                <>
                    {/* ISO Overview */}
                    <div className="glass-panel" style={{
                        padding: '20px',
                        marginBottom: '24px',
                        borderLeft: '4px solid #0088ff'
                    }}>
                        <h2 style={{ margin: 0, marginBottom: '8px', color: '#0088ff' }}>
                            📋 ISO/IEC 27001:2022 Information Security Management
                        </h2>
                        <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            The international standard for establishing, implementing, maintaining, and continually improving an information security management system (ISMS).
                            Annex A contains 93 controls organized into 4 themes.
                        </p>
                    </div>

                    {/* ISO Stats */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '16px',
                        marginBottom: '24px'
                    }}>
                        {ISO_27001_CLAUSES.map(clause => (
                            <div
                                key={clause.clause}
                                className="glass-panel"
                                style={{
                                    padding: '16px',
                                    textAlign: 'center',
                                    borderTop: '3px solid #0088ff',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setActiveISOClause(clause.clause)}
                            >
                                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                    {clause.controls.length}
                                </div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                    Clause {clause.clause}
                                </div>
                                <div style={{ fontSize: '12px', marginTop: '4px' }}>
                                    {clause.title}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ISO Clauses */}
                    {ISO_27001_CLAUSES.map(clause => (
                        <ISOClauseSection key={clause.clause} clause={clause} />
                    ))}
                </>
            )}
        </div>
    );
};

export default FrameworkNavigator;
