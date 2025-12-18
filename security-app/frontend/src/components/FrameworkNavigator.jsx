import React, { useState } from 'react';
import { useProgram } from '../context/ProgramContext';

const FrameworkNavigator = () => {
    const { currentLens, updateLens, frameworkStack, setFrameworkStack } = useProgram();
    const [showBuilder, setShowBuilder] = useState(false);

    // Mock Recommendation Logic
    const recommendStack = () => {
        // In a real app, this would read from a questionnaire
        const newStack = {
            primary: 'nist_csf_2',
            overlays: ['iso_27001_2022'], // Recommend ISO based on "Sales/Distribution" profile implied
            viewPreference: 'program'
        };
        setFrameworkStack(newStack);
        alert("Based on your profile (Sales & Distribution), we added ISO 27001 mapping to your stack.");
    };

    return (
        <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '28px' }}>Framework Navigator</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Define your strategy and choose your viewing lens.</p>
                </div>

                {/* Lens Switcher */}
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '4px', borderRadius: '8px', display: 'flex' }}>
                    <button
                        onClick={() => updateLens('program')}
                        style={{
                            padding: '8px 16px',
                            background: currentLens === 'program' ? 'var(--primary)' : 'transparent',
                            color: currentLens === 'program' ? 'black' : 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        Program View (NIST)
                    </button>
                    <button
                        onClick={() => updateLens('audit')}
                        style={{
                            padding: '8px 16px',
                            background: currentLens === 'audit' ? 'var(--primary)' : 'transparent',
                            color: currentLens === 'audit' ? 'black' : 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        Audit View (ISO)
                    </button>
                </div>
            </div>

            {/* Explainer / Dashboard */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
                <div className="glass-panel" style={{ padding: '32px', borderLeft: '4px solid #FFD700' }}>
                    <h2 style={{ marginTop: 0 }}>Strategy Layer</h2>
                    {currentLens === 'program' ? (
                        <>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>NIST CSF 2.0</div>
                            <p style={{ lineHeight: '1.6' }}>You are currently organizing your security program by <strong>Functions</strong> (Govern, Identify, Protect, Detect, Respond, Recover). This is the best language for communicating strategy to the Board and Executives.</p>
                        </>
                    ) : (
                        <>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#aaa' }}>NIST CSF 2.0 (Hidden)</div>
                            <p>Switch to "Program View" to see your strategic alignment.</p>
                        </>
                    )}
                </div>

                <div className="glass-panel" style={{ padding: '32px', borderLeft: '4px solid #0000FF' }}>
                    <h2 style={{ marginTop: 0 }}>Compliance & Audit Layer</h2>
                    {currentLens === 'audit' ? (
                        <>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>ISO/IEC 27001:2022</div>
                            <p style={{ lineHeight: '1.6' }}>You are actively mapping controls to <strong>ISO Clauses</strong> (5-8). This view is optimized for auditors, evidence collection, and preparing your Statement of Applicability (SoA).</p>
                        </>
                    ) : (
                        <>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#aaa' }}>ISO 27001 (Background)</div>
                            <p>Controls are mapped to ISO in the background. Switch to "Audit View" to prioritize certification requirements.</p>
                        </>
                    )}
                </div>
            </div>

            {/* Stack Builder */}
            <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ marginTop: 0 }}>Framework Stack Configuration</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ flex: 1 }}>
                        <p style={{ color: 'var(--text-muted)' }}>
                            Based on your profile <strong>(Automotive Sales & Distribution)</strong>, we recommend the following stack:
                        </p>
                        <ul style={{ lineHeight: '1.8' }}>
                            <li>✅ <strong>Program Structure:</strong> NIST CSF 2.0</li>
                            <li>✅ <strong>Control Catalog:</strong> NIST SP 800-53 Rev 5 (Moderate)</li>
                            <li>
                                {frameworkStack.overlays.includes('iso_27001_2022') ? '✅' : '⬜'} <strong>Certification Overlay:</strong> ISO 27001:2022
                            </li>
                        </ul>
                    </div>
                    <div>
                        <button
                            onClick={recommendStack}
                            style={{
                                padding: '12px 24px',
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: 'white',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Re-Run Recommendation Engine
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrameworkNavigator;
