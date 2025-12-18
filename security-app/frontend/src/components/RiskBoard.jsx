import React, { useState, useEffect } from 'react';
import axios from 'axios';
import matter from 'gray-matter';
import { RISK_REGISTER } from '../data/mockData';

const RiskBoard = () => {
    const [risks, setRisks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRisks = async () => {
            try {
                // Attempt to fetch from GitHub
                const response = await axios.get('https://api.github.com/repos/ip6networks/Git-repo1/contents/03-Risk');
                const files = response.data.filter(file => file.name.endsWith('.md'));
                const risksData = await Promise.all(files.map(async (file) => {
                    const contentResponse = await axios.get(file.download_url);
                    const { data } = matter(contentResponse.data);
                    return {
                        id: file.name.replace('.md', ''),
                        title: data.title || file.name.replace('.md', ''),
                        category: data.category || 'General',
                        impact: data.impact || 'Medium',
                        probability: data.probability || 'Medium',
                        owner: data.owner || 'Unassigned',
                        status: data.status || 'Open'
                    };
                }));

                if (risksData.length > 0) {
                    setRisks(risksData);
                } else {
                    setRisks(RISK_REGISTER);
                }
            } catch (error) {
                console.log('API fetch failed or not configured (expected). Using Perfect Mock Data.', error);
                setRisks(RISK_REGISTER);
            } finally {
                setLoading(false);
            }
        };
        fetchRisks();
    }, []);

    return (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Risk Register</h1>
                <p style={{ color: 'var(--text-muted)' }}>Strategic and Tactical Risks</p>
            </div>

            {loading ? (
                <p>Loading risks...</p>
            ) : (
                <div className="glass-panel" style={{ overflow: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                                <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: 500 }}>ID</th>
                                <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: 500 }}>Risk Title</th>
                                <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: 500 }}>Category</th>
                                <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: 500 }}>Impact</th>
                                <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: 500 }}>Prob.</th>
                                <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: 500 }}>Owner</th>
                                <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: 500 }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {risks.map((risk) => (
                                <tr key={risk.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '16px 24px', fontFamily: 'monospace', color: 'var(--primary)' }}>{risk.id}</td>
                                    <td style={{ padding: '16px 24px', fontWeight: 500 }}>{risk.title}</td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                            {risk.category}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px 24px', color: risk.impact === 'Critical' || risk.impact === 'High' ? 'var(--error)' : 'inherit' }}>
                                        {risk.impact}
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>{risk.probability}</td>
                                    <td style={{ padding: '16px 24px' }}>{risk.owner}</td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <span style={{
                                            color: risk.status === 'Open' ? 'var(--error)' : (risk.status === 'Mitigated' ? 'var(--primary)' : 'var(--warning)'),
                                            fontWeight: 500
                                        }}>
                                            {risk.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RiskBoard;
