import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgram } from '../context/ProgramContext';

const PolicyGenerator = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { policies, updatePolicyStatus } = useProgram();

    const policy = policies.find(p => p.id === id);

    // Local state for answers (mocking the "Decision Points")
    const [answers, setAnswers] = useState({
        strictness: 'Standard',
        approver: 'CISO'
    });

    if (!policy) return <div>Policy not found</div>;

    const handleSave = () => {
        // In a real app, this would regenerate the text based on answers.
        // For MVP, we just mark it as "Reviewing" or "Published" and increase maturity.
        updatePolicyStatus(id, 'Published', 3); // Defined
        navigate(`/library/${id}`);
    };

    return (
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '8px' }}>Policy Generator</h1>
            <h2 style={{ color: 'var(--primary)', marginTop: 0 }}>{policy.title}</h2>
            <p style={{ color: 'var(--text-muted)' }}>Customize this policy for your organization.</p>

            <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
                <h3 style={{ marginTop: 0 }}>Decision Points</h3>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Strictness Level</label>
                    <select
                        value={answers.strictness}
                        onChange={(e) => setAnswers({ ...answers, strictness: e.target.value })}
                        style={{ width: '100%', padding: '12px', background: '#333', color: 'white', border: '1px solid #555', borderRadius: '4px' }}
                    >
                        <option value="Relaxed">Relaxed (Startups, high trust)</option>
                        <option value="Standard">Standard (Enterprise baseline)</option>
                        <option value="Strict">Strict (Regulated industries)</option>
                    </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Policy Owner / Approver</label>
                    <input
                        type="text"
                        value={answers.approver}
                        onChange={(e) => setAnswers({ ...answers, approver: e.target.value })}
                        style={{ width: '100%', padding: '12px', background: '#333', color: 'white', border: '1px solid #555', borderRadius: '4px' }}
                    />
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
                <h3 style={{ marginTop: 0 }}>Preview</h3>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.6' }}>
                    <p><strong>1. Purpose</strong></p>
                    <p>{policy.content?.why || "To establish..."}</p>
                    <p><strong>2. Scope</strong></p>
                    <p>This policy applies to all employees and contractors.</p>
                    <p><strong>3. Policy Statement</strong></p>
                    <p>
                        {answers.strictness === 'Strict'
                            ? "ALL EXCEPTIONS must be approved by the Board. Zero tolerance for violations."
                            : "Exceptions require CISO approval. We trust our employees to act responsibly."}
                    </p>
                    <p><strong>4. Governance</strong></p>
                    <p>Approved by: {answers.approver}</p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
                <button
                    onClick={handleSave}
                    style={{ flex: 1, padding: '16px', background: 'var(--primary)', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', color: 'black' }}
                >
                    Publish Policy
                </button>
                <button
                    onClick={() => navigate(`/library/${id}`)}
                    style={{ padding: '16px 32px', background: 'transparent', border: '1px solid #555', borderRadius: '4px', color: 'white', cursor: 'pointer' }}
                >
                    Cancel
                </button>
            </div>
        </div >
    );
};

export default PolicyGenerator;
