import React, { useState, useEffect } from 'react';
import axios from 'axios';
import matter from 'gray-matter';
import { GOVERNANCE_TEMPLATES } from '../data/mockData';
import { useGovernance } from '../context/GovernanceContext';
import GovernanceGuide from './GovernanceGuide';

const PolicyCenter = () => {
    const { documents, updateDocumentStatus } = useGovernance();
    const [filteredPolicies, setFilteredPolicies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState('library');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [activeTemplate, setActiveTemplate] = useState(null);

    useEffect(() => {
        const filtered = documents.filter(p => {
            const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
        setFilteredPolicies(filtered);
    }, [searchQuery, statusFilter, documents]);

    const getTypeColor = (type) => {
        switch (type) {
            case 'Policy': return '#00ff9d';
            case 'Standard': return '#00d2ff';
            case 'Guideline': return '#ffca28';
            case 'SOP': return '#ec407a';
            case 'Playbook': return '#7e57c2';
            case 'Runbook': return '#ef5350';
            default: return 'var(--text-muted)';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Published': return 'rgba(0, 255, 157, 0.1)';
            case 'Draft': return 'rgba(255, 215, 0, 0.1)';
            case 'Not Started': return 'rgba(255, 255, 255, 0.05)';
            default: return 'rgba(255, 255, 255, 0.05)';
        }
    };

    const getStatusTextColor = (status) => {
        switch (status) {
            case 'Published': return '#00ff9d';
            case 'Draft': return '#ffca28';
            case 'Not Started': return 'var(--text-muted)';
            default: return 'var(--text-muted)';
        }
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                    <h1 style={{ fontSize: '36px', marginBottom: '8px', fontWeight: '800', letterSpacing: '-1.5px', color: 'white' }}>GOVERNANCE CENTER</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Enterprise Strategy, Decision Support & Compliance Architecture</p>
                </div>
                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <button
                        onClick={() => setView('library')}
                        style={{
                            padding: '10px 28px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                            background: view === 'library' ? 'var(--primary)' : 'transparent',
                            color: view === 'library' ? 'black' : 'white',
                            fontWeight: '700', fontSize: '14px', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    >
                        LIBRARY
                    </button>
                    <button
                        onClick={() => setView('guide')}
                        style={{
                            padding: '10px 28px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                            background: view === 'guide' ? 'var(--primary)' : 'transparent',
                            color: view === 'guide' ? 'black' : 'white',
                            fontWeight: '700', fontSize: '14px', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    >
                        GUIDE & TOOLS
                    </button>
                </div>
            </div>

            {view === 'library' ? (
                <div>
                    <div style={{ display: 'flex', gap: '24px', marginBottom: '32px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div style={{ flex: '1 1 400px', maxWidth: '600px', position: 'relative' }}>
                            <input
                                type="text"
                                placeholder="Search documents by ID or title..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%', padding: '14px 20px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '14px', outline: 'none'
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {['All', 'Published', 'Draft', 'Not Started'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    style={{
                                        padding: '10px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)',
                                        background: statusFilter === status ? 'rgba(0, 255, 157, 0.1)' : 'rgba(255,255,255,0.02)',
                                        color: statusFilter === status ? 'var(--primary)' : 'var(--text-muted)',
                                        fontSize: '13px', cursor: 'pointer', fontWeight: '700', transition: 'all 0.2s'
                                    }}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '100px 0' }}>
                            <p style={{ color: 'var(--text-muted)' }}>Initializing enterprise governance library...</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                            {filteredPolicies.map((doc) => (
                                <div key={doc.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: getTypeColor(doc.type) }} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
                                        <span style={{
                                            fontFamily: 'monospace', color: getTypeColor(doc.type), fontSize: '10px', fontWeight: '800', border: `1px solid ${getTypeColor(doc.type)}`, padding: '2px 8px', borderRadius: '4px', letterSpacing: '1px'
                                        }}>
                                            {doc.type.toUpperCase()}
                                        </span>
                                        <span style={{
                                            fontSize: '11px', padding: '3px 10px', borderRadius: '12px',
                                            background: getStatusColor(doc.status),
                                            color: getStatusTextColor(doc.status),
                                            fontWeight: '700', letterSpacing: '0.5px'
                                        }}>
                                            {doc.status}
                                        </span>
                                    </div>
                                    <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '700', lineHeight: '1.4', color: 'white' }}>{doc.title}</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                                        <span>ID: <span style={{ fontFamily: 'monospace' }}>{doc.id}</span></span>
                                        <span>Owner: <span style={{ color: 'rgba(255,255,255,0.7)' }}>{doc.owner}</span></span>
                                    </div>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px', flex: 1 }}>
                                        {doc.mapping && doc.mapping.map(map => (
                                            <span key={map} style={{ fontSize: '10px', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '6px', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.03)' }}>
                                                {map}
                                            </span>
                                        ))}
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                                        <span style={{ color: 'var(--text-muted)' }}>Rev: {doc.lastReview}</span>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            {doc.status !== 'Published' && (
                                                <button
                                                    onClick={() => setActiveTemplate({ type: doc.type, title: doc.title })}
                                                    style={{
                                                        background: 'rgba(0, 255, 157, 0.1)', border: '1px solid var(--primary)', color: 'var(--primary)',
                                                        padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: '800'
                                                    }}
                                                >
                                                    TEMPLATE
                                                </button>
                                            )}
                                            <select
                                                value={doc.status}
                                                onChange={(e) => updateDocumentStatus(doc.id, e.target.value)}
                                                style={{
                                                    background: doc.status === 'Published' ? 'rgba(0, 255, 157, 0.15)' : doc.status === 'Draft' ? 'rgba(255, 215, 0, 0.15)' : 'rgba(255,255,255,0.05)',
                                                    border: `1px solid ${doc.status === 'Published' ? 'var(--primary)' : doc.status === 'Draft' ? '#ffca28' : 'rgba(255,255,255,0.2)'}`,
                                                    color: doc.status === 'Published' ? 'var(--primary)' : doc.status === 'Draft' ? '#ffca28' : 'white',
                                                    padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: '800',
                                                    appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none',
                                                    textAlign: 'center', minWidth: '110px'
                                                }}
                                            >
                                                <option value="Not Started">Not Started</option>
                                                <option value="Draft">Draft</option>
                                                <option value="Published">Published</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTemplate && (
                        <div style={{
                            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px'
                        }}>
                            <div className="glass-panel" style={{
                                maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto',
                                padding: '40px', position: 'relative', background: '#0a0a0a', border: '1px solid var(--primary)'
                            }}>
                                <button
                                    onClick={() => setActiveTemplate(null)}
                                    style={{
                                        position: 'absolute', top: '24px', right: '24px', background: 'transparent',
                                        border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '24px'
                                    }}
                                >
                                    ×
                                </button>
                                <div style={{ marginBottom: '32px' }}>
                                    <h2 style={{ color: 'var(--primary)', fontSize: '24px', marginBottom: '8px' }}>{activeTemplate.type.toUpperCase()} TEMPLATE</h2>
                                    <p style={{ color: 'var(--text-muted)' }}>Using this template for: <strong>{activeTemplate.title}</strong></p>
                                </div>
                                <div style={{
                                    background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '12px',
                                    fontFamily: 'monospace', whiteSpace: 'pre-wrap', color: '#ccc', fontSize: '13px', lineHeight: '1.6',
                                    marginBottom: '32px', border: '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    {GOVERNANCE_TEMPLATES[activeTemplate.type]}
                                </div>
                                <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(GOVERNANCE_TEMPLATES[activeTemplate.type]);
                                            alert('Template copied to clipboard!');
                                        }}
                                        style={{
                                            padding: '12px 24px', borderRadius: '8px', background: 'transparent',
                                            border: '1px solid var(--primary)', color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer'
                                        }}
                                    >
                                        COPY MARKDOWN
                                    </button>
                                    <button
                                        style={{
                                            padding: '12px 24px', borderRadius: '8px', background: 'var(--primary)',
                                            border: 'none', color: 'black', fontWeight: 'bold', cursor: 'pointer'
                                        }}
                                    >
                                        DOWNLOAD .MD
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <GovernanceGuide />
            )}
        </div>
    );
};

export default PolicyCenter;
