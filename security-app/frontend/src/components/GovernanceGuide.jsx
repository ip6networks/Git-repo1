import React, { useState } from 'react';

const GOVERNANCE_TAXONOMY = [
    {
        type: 'Policy',
        definition: 'High-level statements of intent and responsibility.',
        why: 'To set expectations for the organization and provide a basis for enforcement.',
        when: 'Broad security goals, compliance requirements, or organizational mandates.'
    },
    {
        type: 'Standard',
        definition: 'Mandatory technical or operational requirements.',
        why: 'To ensure consistency across the organization for specific technologies or processes.',
        when: 'Specific configurations (e.g., encryption), specific technologies, or mandatory steps.'
    },
    {
        type: 'Guideline',
        definition: 'Recommended practices or advice.',
        why: 'To provide flexibility while steering the organization toward best practices.',
        when: 'Non-mandatory best practices, helpful tips, or emerging technologies.'
    },
    {
        type: 'SOP',
        definition: 'Standard Operating Procedure. Detailed, step-by-step instructions.',
        why: 'To ensure tasks are performed correctly and consistently by anyone assigned to them.',
        when: 'Routine operational tasks like user onboarding or backup restoration.'
    },
    {
        type: 'Playbook',
        definition: 'Strategic response plans for specific scenarios.',
        why: 'To coordinate high-pressure responses with pre-defined strategies.',
        when: 'Incident response scenarios like Ransomware, Data Breach, or DDoS.'
    },
    {
        type: 'Runbook',
        definition: 'Granular, technical execution steps for automated or manual tasks.',
        why: 'To provide low-level technical clarity for engineers during implementation or maintenance.',
        when: 'Specific technical tasks like SIEM log onboarding or Cloud IAM role rotation.'
    }
];

const DECISION_TREE = {
    question: "What is your primary goal?",
    options: [
        {
            label: "Define mandatory high-level requirements",
            next: {
                question: "Is this for the entire organization or a specific technical area?",
                options: [
                    { label: "Entire Organization", result: "Policy", desc: "You need a Policy to set the cultural and legal foundation." },
                    { label: "Specific Technical Area", result: "Standard", desc: "You need a Standard to enforce technical consistency (e.g., Encryption Standard)." }
                ]
            }
        },
        {
            label: "Provide step-by-step instructions",
            next: {
                question: "Is this for routine operations or for responding to an active incident?",
                options: [
                    { label: "Routine Operations", result: "SOP", desc: "Use an SOP for repeatable business-as-usual tasks." },
                    {
                        label: "Incident Response",
                        next: {
                            question: "Is this a strategic coordination plan or low-level technical commands?",
                            options: [
                                { label: "Strategic Coordination", result: "Playbook", desc: "A Playbook helps coordinate high-pressure responses." },
                                { label: "Technical Commands", result: "Runbook", desc: "A Runbook provides the exact 'copy-paste' commands for engineers." }
                            ]
                        }
                    }
                ]
            }
        },
        {
            label: "Offer advice and best practices",
            result: "Guideline",
            desc: "Use a Guideline when you want to recommend best practices without making them mandatory."
        }
    ]
};

const MATURITY_ROADMAP = [
    {
        function: "GOVERN (GV)",
        items: [
            { id: "GV.PO-01", name: "Policy Management Process", maturity: "Published", desc: "Establish a lifecycle for policy creation, review, and retirement." },
            { id: "GV.RM-01", name: "Risk Management Strategy", maturity: "Published", desc: "Define how the org identifies and treats security risks." },
            { id: "GV.SC-01", name: "Supply Chain Risk Management", maturity: "Draft", desc: "Requirements for 3rd party vendors and service providers." }
        ]
    },
    {
        function: "IDENTIFY (ID)",
        items: [
            { id: "ID.AM-01", name: "Asset Management Standard", maturity: "Published", desc: "Inventory of physical and software assets." },
            { id: "ID.RA-01", name: "Risk Assessment Process", maturity: "Draft", desc: "Formal process for identifying and analyzing threats." },
            { id: "ID.IM-01", name: "Identity Management Strategy", maturity: "Published", desc: "Strategy for managing identities and access across the org." }
        ]
    },
    {
        function: "PROTECT (PR)",
        items: [
            { id: "PR.AA-01", name: "Access Control & MFA", maturity: "Published", desc: "MFA, Password complexity, and JIT access requirements." },
            { id: "PR.DS-01", name: "Data Security Standard", maturity: "Published", desc: "Mandatory encryption levels for data at rest and in transit." },
            { id: "PR.NW-01", name: "Network Security Standard", maturity: "Draft", desc: "Configuration standards for firewalls and network nodes." }
        ]
    },
    {
        function: "DETECT (DE)",
        items: [
            { id: "DE.CM-01", name: "Continuous Monitoring", maturity: "Not Started", desc: "Ongoing monitoring of systems to detect adverse events." },
            { id: "DE.AE-01", name: "Adverse Event Analysis", maturity: "Published", desc: "Log analysis and SIEM integration for threat detection." }
        ]
    },
    {
        function: "RESPOND (RS)",
        items: [
            { id: "RS.RP-01", name: "Incident Response Playbooks", maturity: "Published", desc: "Specific plans for Ransomware, Phishing, and Data Breach." },
            { id: "RS.CO-01", name: "Crisis Comm Plan", maturity: "Published", desc: "How to notify stakeholders and regulators during a breach." }
        ]
    },
    {
        function: "RECOVER (RC)",
        items: [
            { id: "RC.RP-01", name: "Recovery Planning", maturity: "Not Started", desc: "Procedures to restore systems after a security incident." },
            { id: "RC.AA-01", name: "Post-Incident Analysis", maturity: "Draft", desc: "Reviewing incidents to improve future detection and response." }
        ]
    }
];

import { POLICIES, GOVERNANCE_TEMPLATES } from '../data/mockData';

const TemplatesBrowser = () => {
    const [selectedType, setSelectedType] = useState('Policy');

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
                {Object.keys(GOVERNANCE_TEMPLATES).map(type => (
                    <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        style={{
                            padding: '10px 20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)',
                            background: selectedType === type ? 'rgba(0, 255, 157, 0.1)' : 'rgba(255,255,255,0.02)',
                            color: selectedType === type ? 'var(--primary)' : 'var(--text-muted)',
                            cursor: 'pointer', fontWeight: 'bold'
                        }}
                    >
                        {type.toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="glass-panel" style={{ padding: '32px', position: 'relative', background: 'rgba(0,0,0,0.2)' }}>
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(GOVERNANCE_TEMPLATES[selectedType]);
                        alert(`${selectedType} template copied to clipboard!`);
                    }}
                    style={{
                        position: 'absolute', top: '24px', right: '24px', padding: '8px 16px', borderRadius: '6px',
                        background: 'var(--primary)', color: 'black', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px'
                    }}
                >
                    COPY MARKDOWN
                </button>
                <div style={{
                    fontFamily: 'monospace', whiteSpace: 'pre-wrap', color: '#ccc', fontSize: '13px', lineHeight: '1.6',
                    maxHeight: '400px', overflowY: 'auto', paddingRight: '20px'
                }}>
                    {GOVERNANCE_TEMPLATES[selectedType]}
                </div>
            </div>
        </div>
    );
};

const PriorityEngine = () => {
    const gaps = POLICIES.filter(p => p.status === 'Not Started' || p.status === 'Draft');
    const highPriority = gaps.filter(p =>
        p.mapping?.some(m => m.includes('GV') || m.includes('PR') || m.includes('RC'))
    );

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '24px', color: 'var(--primary)', marginBottom: '12px' }}>Roadmap Priority Engine</h2>
                <p style={{ color: 'var(--text-muted)' }}>Analyzing governance gaps to generate high-priority implementation tasks.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid #ff4d4d' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#ff4d4d' }}>CRITICAL GAPS (Not Started)</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {gaps.filter(p => p.status === 'Not Started').map(p => (
                            <div key={p.id} style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{p.title}</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Maps to: {p.mapping?.join(', ')}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--primary)' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: 'var(--primary)' }}>PRIORITIZED ROADMAP ACTIONS</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {highPriority.slice(0, 4).map(p => (
                            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(0, 255, 157, 0.05)', borderRadius: '8px' }}>
                                <div style={{ fontSize: '20px' }}>🚀</div>
                                <div>
                                    <div style={{ fontSize: '13px', fontWeight: 'bold' }}>Develop {p.title}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Priority: HIGH | Reason: Foundation for {p.mapping?.[0]}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '32px', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', textAlign: 'center' }}>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    Priority is calculated based on **Impact Factor** (Recovery &gt; Protect &gt; Govern) and **Implementation Status**.
                    Tasks are automatically synchronized with the main Program Roadmap.
                </p>
            </div>
        </div>
    );
};

const GovernanceGuide = () => {
    const [activeTab, setActiveTab] = useState('taxonomy');
    const [currentQuestion, setCurrentQuestion] = useState(DECISION_TREE);
    const [decisionPath, setDecisionPath] = useState([]);
    const [finalResult, setFinalResult] = useState(null);

    const handleChoice = (option) => {
        setDecisionPath([...decisionPath, option.label]);
        if (option.result) {
            setFinalResult(option);
        } else if (option.next) {
            setCurrentQuestion(option.next);
        }
    };

    const resetDecision = () => {
        setCurrentQuestion(DECISION_TREE);
        setDecisionPath([]);
        setFinalResult(null);
    };

    return (
        <div className="glass-panel" style={{ padding: '32px', marginTop: '24px', minHeight: '600px' }}>
            <div style={{ display: 'flex', gap: '32px', marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px', overflowX: 'auto' }}>
                {['taxonomy', 'selector', 'templates', 'maturity', 'priority'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            background: 'transparent', border: 'none', color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
                            cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', position: 'relative', textTransform: 'uppercase',
                            letterSpacing: '1px', whiteSpace: 'nowrap'
                        }}
                    >
                        {tab === 'taxonomy' ? 'Taxonomy' : tab === 'selector' ? 'Decision Tool' : tab === 'templates' ? 'Templates' : tab === 'maturity' ? 'Maturity Roadmap' : 'Priority Engine'}
                        {activeTab === tab && <div style={{ position: 'absolute', bottom: '-17px', left: 0, width: '100%', height: '2px', background: 'var(--primary)' }} />}
                    </button>
                ))}
            </div>

            {activeTab === 'taxonomy' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                    {GOVERNANCE_TAXONOMY.map(item => (
                        <div key={item.type} style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '16px', fontSize: '20px', fontWeight: '800' }}>{item.type}</h4>
                            <p style={{ fontSize: '14px', marginBottom: '16px', lineHeight: '1.5' }}>{item.definition}</p>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px' }}>
                                <div style={{ marginBottom: '8px' }}><strong style={{ color: 'white' }}>WHY:</strong> {item.why}</div>
                                <div><strong style={{ color: 'white' }}>WHEN:</strong> {item.when}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'templates' && <TemplatesBrowser />}

            {activeTab === 'selector' && (
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {!finalResult ? (
                        <div style={{ textAlign: 'center', padding: '40px' }}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
                                {decisionPath.map((path, idx) => (
                                    <span key={idx} style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{path} {idx < decisionPath.length - 1 ? '→' : ''}</span>
                                ))}
                            </div>
                            <h3 style={{ fontSize: '24px', marginBottom: '24px' }}>{currentQuestion.question || currentQuestion.q}</h3>
                            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                {currentQuestion.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleChoice(opt)}
                                        className="glass-panel"
                                        style={{
                                            padding: '16px 32px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                            color: 'white', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', transition: 'all 0.2s'
                                        }}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '40px' }}>
                            <div style={{ fontSize: '48px', marginBottom: '24px' }}>🎯</div>
                            <h3 style={{ fontSize: '28px', color: 'var(--primary)', marginBottom: '16px' }}>Recommended: {finalResult.result}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '18px', marginBottom: '32px' }}>{finalResult.desc}</p>

                            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                                <button
                                    onClick={() => setActiveTab('templates')}
                                    style={{
                                        padding: '12px 24px', borderRadius: '8px', background: 'var(--primary)',
                                        color: 'black', border: 'none', fontWeight: 'bold', cursor: 'pointer'
                                    }}
                                >
                                    VIEW {finalResult.result.toUpperCase()} TEMPLATE
                                </button>
                                <button
                                    onClick={resetDecision}
                                    style={{
                                        padding: '12px 24px', background: 'transparent', border: '1px solid var(--primary)',
                                        color: 'var(--primary)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
                                    }}
                                >
                                    START OVER
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'maturity' && (
                <div>
                    <div style={{ marginBottom: '40px', padding: '24px', background: 'rgba(0, 255, 157, 0.05)', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                        <h3 style={{ marginBottom: '12px', fontSize: '20px' }}>Enterprise Maturity Path (Full NIST CSF 2.0)</h3>
                        <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            A mature enterprise moves from <strong>documented</strong> policies to <strong>measured</strong> and <strong>optimized</strong> operations.
                            This roadmap covers the critical baseline across all 6 NIST CSF 2.0 functions.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
                        {MATURITY_ROADMAP.map(group => (
                            <div key={group.function} className="glass-panel" style={{ padding: '24px' }}>
                                <h4 style={{ color: 'var(--primary)', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', fontSize: '18px' }}>
                                    {group.function}
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {group.items.map(item => (
                                        <div key={item.id} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                            <div style={{
                                                minWidth: '24px', height: '24px', borderRadius: '50%',
                                                background: item.maturity === 'Published' ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontSize: '10px', fontWeight: 'bold',
                                                marginTop: '4px'
                                            }}>
                                                {item.maturity === 'Published' ? '✓' : ''}
                                            </div>
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                    <span style={{ fontWeight: '700', fontSize: '15px' }}>{item.name}</span>
                                                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{item.id}</span>
                                                </div>
                                                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'priority' && <PriorityEngine />}
        </div>
    );
};

export default GovernanceGuide;
