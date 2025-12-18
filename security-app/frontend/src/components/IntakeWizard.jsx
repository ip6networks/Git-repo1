import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgram } from '../context/ProgramContext';

const IntakeWizard = () => {
    const { updateProfile } = useProgram();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        industry: 'Automotive',
        size: 'Mid-Market (100-1000)',
        riskAppetite: 'Balanced',
        compliance: {
            iso27001: false,
            pci: false,
            gdpr: false
        }
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                compliance: { ...prev.compliance, [name]: checked }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleNext = () => setStep(prev => prev + 1);

    const handleSubmit = () => {
        updateProfile(formData);
        navigate('/'); // Go to Dashboard
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: '#1a1d24',
            color: 'white'
        }}>
            <div className="glass-panel" style={{ width: '600px', padding: '40px' }}>
                <div style={{ marginBottom: '32px', textAlign: 'center' }}>
                    <h1 style={{ margin: 0, color: 'var(--primary)' }}>Setup Your Security Program</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Step {step} of 3</p>
                </div>

                {step === 1 && (
                    <div className="step-content">
                        <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Organization Details</h2>
                        <label style={{ display: 'block', marginBottom: '16px' }}>
                            <div style={{ marginBottom: '8px', fontSize: '14px' }}>Company Name</div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Acme Automotive Logic"
                                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '4px' }}
                            />
                        </label>
                        <label style={{ display: 'block', marginBottom: '16px' }}>
                            <div style={{ marginBottom: '8px', fontSize: '14px' }}>Industry</div>
                            <select
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '12px', background: '#333', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '4px' }}
                            >
                                <option value="Automotive">Automotive (Sales & Distribution)</option>
                                <option value="Technology">Technology / SaaS</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Finance">Financial Services</option>
                            </select>
                        </label>
                        <button onClick={handleNext} style={{ width: '100%', padding: '12px', background: 'var(--primary)', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                            Next →
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="step-content">
                        <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Risk Context</h2>
                        <label style={{ display: 'block', marginBottom: '16px' }}>
                            <div style={{ marginBottom: '8px', fontSize: '14px' }}>Organization Size</div>
                            <select
                                name="size"
                                value={formData.size}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '12px', background: '#333', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '4px' }}
                            >
                                <option value="Small (<100)">Small (&lt;100 employees)</option>
                                <option value="Mid-Market (100-1000)">Mid-Market (100-1,000 employees)</option>
                                <option value="Enterprise (1000+)">Enterprise (1,000+ employees)</option>
                            </select>
                        </label>
                        <label style={{ display: 'block', marginBottom: '24px' }}>
                            <div style={{ marginBottom: '8px', fontSize: '14px' }}>Risk Appetite</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                                How aggressive are you with innovation vs. security controls?
                            </div>
                            <select
                                name="riskAppetite"
                                value={formData.riskAppetite}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '12px', background: '#333', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '4px' }}
                            >
                                <option value="Conservative">Conservative (Security First)</option>
                                <option value="Balanced">Balanced (Standard)</option>
                                <option value="Aggressive">Aggressive (Speed First)</option>
                            </select>
                        </label>
                        <button onClick={handleNext} style={{ width: '100%', padding: '12px', background: 'var(--primary)', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                            Next →
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="step-content">
                        <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Compliance Requirements</h2>
                        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Select frameworks you need to align with:</p>

                        <div style={{ display: 'flex', gap: '12px', flexDirection: 'column', marginBottom: '24px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                                <input type="checkbox" checked={true} disabled style={{ marginRight: '12px' }} />
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>NIST CSF 2.0 (Primary)</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Mandatory foundation</div>
                                </div>
                            </label>

                            <label style={{ display: 'flex', alignItems: 'center', padding: '12px', background: formData.compliance.iso27001 ? 'rgba(0,255,157,0.1)' : 'rgba(255,255,255,0.05)', border: formData.compliance.iso27001 ? '1px solid var(--primary)' : '1px solid transparent', borderRadius: '4px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    name="iso27001"
                                    checked={formData.compliance.iso27001}
                                    onChange={handleChange}
                                    style={{ marginRight: '12px' }}
                                />
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>ISO/IEC 27001:2022</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>For customer audits & certification</div>
                                </div>
                            </label>

                            <label style={{ display: 'flex', alignItems: 'center', padding: '12px', background: formData.compliance.pci ? 'rgba(0,255,157,0.1)' : 'rgba(255,255,255,0.05)', border: formData.compliance.pci ? '1px solid var(--primary)' : '1px solid transparent', borderRadius: '4px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    name="pci"
                                    checked={formData.compliance.pci}
                                    onChange={handleChange}
                                    style={{ marginRight: '12px' }}
                                />
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>PCI-DSS 4.0</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>If handling Credit Cards</div>
                                </div>
                            </label>
                        </div>

                        <button onClick={handleSubmit} style={{ width: '100%', padding: '12px', background: 'var(--primary)', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                            Generate Program →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IntakeWizard;
