import React, { useState } from 'react';
import { useProgram } from '../context/ProgramContext';

const ControlsView = () => {
    const { controls } = useProgram();

    return (
        <div style={{ padding: '24px' }}>
            <h1 style={{ marginBottom: '8px' }}>Controls Baseline (V2)</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
                Unified control set mapping back to NIST CSF 2.0 and ISO 27001.
            </p>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left' }}>
                            <th style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>ID</th>
                            <th style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)', width: '25%' }}>Control</th>
                            <th style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Frameworks</th>
                            <th style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Implementation & Evidence</th>
                            <th style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Phase</th>
                        </tr>
                    </thead>
                    <tbody>
                        {controls.map(control => (
                            <tr key={control.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '16px', verticalAlign: 'top' }}>
                                    <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{control.id}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{control.domain}</div>
                                </td>
                                <td style={{ padding: '16px', verticalAlign: 'top' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>{control.title}</div>
                                    <div style={{ color: '#ccc', lineHeight: '1.4' }}>{control.description}</div>
                                </td>
                                <td style={{ padding: '16px', verticalAlign: 'top', fontFamily: 'monospace', fontSize: '11px' }}>
                                    {control.framework_mappings && (
                                        <div style={{ display: 'grid', gap: '4px' }}>
                                            <div><span style={{ color: '#aaa' }}>NIST CSF:</span> {control.framework_mappings.nist_csf_2.join(', ')}</div>
                                            <div><span style={{ color: '#aaa' }}>800-53:</span> {control.framework_mappings.nist_800_53_r5.join(', ')}</div>
                                            <div><span style={{ color: '#aaa' }}>ISO 27002:</span> {control.framework_mappings.iso_27002_2022.join(', ')}</div>
                                        </div>
                                    )}
                                </td>
                                <td style={{ padding: '16px', verticalAlign: 'top' }}>
                                    <div style={{ marginBottom: '12px' }}>
                                        <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '2px' }}>Guidance</div>
                                        <div style={{ fontStyle: 'italic', color: '#ddd' }}>{control.implementation_guidance}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '2px' }}>Required Evidence</div>
                                        <ul style={{ margin: 0, paddingLeft: '16px', color: 'var(--primary)' }}>
                                            {control.evidence_requirements?.map(ev => (
                                                <li key={ev.id}>{ev.name} <span style={{ color: '#666' }}>({ev.frequency})</span></li>
                                            ))}
                                        </ul>
                                    </div>
                                </td>
                                <td style={{ padding: '16px', verticalAlign: 'top' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        background: control.phase === 1 ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                        color: control.phase === 1 ? '#00ff00' : '#aaa',
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                    }}>
                                        Phase {control.phase}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ControlsView;
