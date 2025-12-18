import React, { useState } from 'react';
import { useProgram } from '../context/ProgramContext';

const EvidenceRepository = () => {
    const { controls } = useProgram();
    const [filter, setFilter] = useState('All');

    // Extract all evidence requirements from controls
    const evidenceItems = controls.flatMap(c =>
        (c.evidence_requirements || []).map(ev => ({
            ...ev,
            controlId: c.id,
            controlTitle: c.title,
            domain: c.domain,
            status: 'Missing' // Mock status
        }))
    );

    const domains = ['All', ...new Set(evidenceItems.map(i => i.domain))];
    const filteredItems = filter === 'All' ? evidenceItems : evidenceItems.filter(i => i.domain === filter);

    return (
        <div style={{ padding: '24px' }}>
            <h1 style={{ marginBottom: '8px' }}>Evidence Locker</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
                Central repository for all compliance artifacts. Upload proofs here.
            </p>

            {/* Filter */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px' }}>
                {domains.map(d => (
                    <button
                        key={d}
                        onClick={() => setFilter(d)}
                        style={{
                            padding: '8px 16px',
                            background: filter === d ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                            color: filter === d ? 'black' : 'white',
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {d}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                {filteredItems.map((item, idx) => (
                    <div key={idx} className="glass-panel" style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <div style={{ background: '#333', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                                📄
                            </div>
                            <span style={{
                                fontSize: '10px',
                                background: item.status === 'Missing' ? 'rgba(255,100,100,0.1)' : 'rgba(100,255,100,0.1)',
                                color: item.status === 'Missing' ? '#ff6666' : '#66ff66',
                                padding: '4px 8px',
                                borderRadius: '4px'
                            }}>
                                {item.status.toUpperCase()}
                            </span>
                        </div>

                        <h4 style={{ margin: 0, marginBottom: '4px', fontSize: '14px' }}>{item.name}</h4>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                            Linked to: {item.controlId} ({item.frequency})
                        </div>

                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px', marginTop: '12px' }}>
                            <button style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px dashed rgba(255,255,255,0.2)',
                                background: 'transparent',
                                color: 'var(--text-muted)',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px'
                            }}>
                                + Upload File
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EvidenceRepository;
