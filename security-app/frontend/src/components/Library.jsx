import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgram } from '../context/ProgramContext';

const Library = () => {
    const { policies, frameworks } = useProgram();
    const [filter, setFilter] = useState('All');

    // For MVP, we'll focus heavily on Policies. Standards/Guidelines can be re-added later or derived.
    // We treat policies as the main list for now.
    const allItems = policies.map(p => ({ ...p, category: 'Policy' }));

    const filteredItems = filter === 'All'
        ? allItems
        : allItems.filter(item => item.category === filter);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Draft': return 'var(--warning)';
            case 'Published': return 'var(--primary)';
            case 'Not Started': return 'var(--text-muted)';
            default: return 'var(--text-muted)';
        }
    };

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ margin: 0 }}>Security Library</h1>
                    <p style={{ color: 'var(--text-muted)', margin: '8px 0 0 0' }}>Comprehensive list of Policies, Standards, and Guidelines.</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {['All', 'Policy', 'Standard', 'Guideline'].map(type => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            style={{
                                padding: '8px 16px',
                                background: filter === type ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                color: filter === type ? '#000' : 'var(--text-primary)',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
                {filteredItems.map(item => (
                    <Link
                        to={`/library/${item.id}`}
                        key={item.id}
                        style={{
                            textDecoration: 'none',
                            color: 'inherit'
                        }}
                    >
                        <div className="glass-panel" style={{
                            padding: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'transform 0.2s ease',
                            cursor: 'pointer'
                        }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                    <span style={{
                                        fontSize: '11px',
                                        padding: '4px 8px',
                                        background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '4px',
                                        color: 'var(--text-muted)'
                                    }}>
                                        {item.id}
                                    </span>
                                    <h3 style={{ margin: 0, fontSize: '18px' }}>{item.title}</h3>
                                </div>
                                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>{item.description || item.requirement}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                {item.category === 'Policy' && (
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Maturity</div>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            {[1, 2, 3, 4, 5].map(lvl => (
                                                <div key={lvl} style={{
                                                    width: '8px',
                                                    height: '8px',
                                                    borderRadius: '50%',
                                                    background: lvl <= (item.maturity || 0) ? 'var(--primary)' : 'rgba(255,255,255,0.1)'
                                                }} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div style={{
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    background: `rgba(255,255,255,0.05)`,
                                    border: `1px solid ${getStatusColor(item.status)}`,
                                    color: getStatusColor(item.status),
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    minWidth: '100px',
                                    textAlign: 'center'
                                }}>
                                    {item.status || 'Reference'}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Library;
