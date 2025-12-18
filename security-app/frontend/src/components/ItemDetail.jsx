import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProgram } from '../context/ProgramContext';

const ItemDetail = () => {
    const { id } = useParams();
    const { policies, standards, guidelines } = useProgram();

    // Helper to find item across all arrays
    const item = [
        ...policies.map(p => ({ ...p, category: 'Policy' })),
        ...standards.map(s => ({ ...s, category: 'Standard' })),
        ...guidelines.map(g => ({ ...g, category: 'Guideline' }))
    ].find(i => i.id === id);

    if (!item) return <div style={{ padding: '40px' }}>Item not found</div>;

    return (
        <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
            <Link to="/library" style={{ display: 'inline-block', marginBottom: '24px', color: 'var(--text-muted)', textDecoration: 'none' }}>
                ← Back to Library
            </Link>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                <div>
                    <span style={{
                        display: 'inline-block',
                        background: 'var(--primary)',
                        color: 'black',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        marginBottom: '16px'
                    }}>
                        {item.category}
                    </span>
                    <h1 style={{ margin: 0, fontSize: '32px' }}>{item.title}</h1>
                    <p style={{ fontSize: '18px', color: 'var(--text-muted)', marginTop: '8px' }}>{item.description || item.requirement}</p>
                </div>
                {item.status && (
                    <div style={{
                        padding: '8px 16px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>Current Status</div>
                        <div style={{ fontWeight: 'bold', color: item.status === 'Published' ? 'var(--primary)' : 'var(--warning)' }}>
                            {item.status}
                        </div>
                    </div>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
                <div>
                    {item.content && (
                        <>
                            <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
                                <h3 style={{ marginTop: 0, color: 'var(--primary)' }}>Why this matters</h3>
                                <p style={{ lineHeight: '1.6' }}>{item.content.why}</p>
                            </div>

                            <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
                                <h3 style={{ marginTop: 0, color: 'var(--primary)' }}>What is required</h3>
                                <p style={{ lineHeight: '1.6' }}>{item.content.what}</p>
                            </div>

                            <div className="glass-panel" style={{ padding: '24px' }}>
                                <h3 style={{ marginTop: 0, color: 'var(--primary)' }}>Implementation Steps</h3>
                                {item.content.implementation && item.content.implementation.length > 0 ? (
                                    <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
                                        {item.content.implementation.map((step, index) => (
                                            <li key={index} style={{ marginBottom: '8px' }}>{step}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No specific implementation steps listed.</p>
                                )}
                            </div>
                        </>
                    )}

                    {!item.content && (
                        <div className="glass-panel" style={{ padding: '24px' }}>
                            <p>No detailed content available for this item.</p>
                        </div>
                    )}
                </div>

                <div>
                    {item.maturity && (
                        <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
                            <h3 style={{ marginTop: 0, fontSize: '16px' }}>Maturity Tracking</h3>
                            <div style={{ marginTop: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>Current Level:</span>
                                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{item.maturity} / 5</span>
                                </div>
                                <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: `${(item.maturity / 5) * 100}%`, height: '100%', background: 'var(--primary)' }}></div>
                                </div>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '16px', lineHeight: '1.4' }}>
                                    Level 1 represents ad-hoc processes. <br />
                                    Level 3 is the target for most policies (Defined & Documented).
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="glass-panel" style={{ padding: '24px' }}>
                        <h3 style={{ marginTop: 0, fontSize: '16px' }}>Actions</h3>
                        <Link to={`/library/${id}/edit`} style={{ textDecoration: 'none' }}>
                            <button style={{
                                width: '100%',
                                padding: '12px',
                                background: 'var(--primary)',
                                color: 'black',
                                border: 'none',
                                borderRadius: '4px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                marginTop: '8px'
                            }}>
                                Edit / Generate
                            </button>
                        </Link>
                        <button style={{
                            width: '100%',
                            padding: '12px',
                            background: 'rgba(255,255,255,0.05)',
                            color: 'white',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            marginTop: '8px'
                        }}>
                            View Source File
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ItemDetail;
