import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgram } from '../context/ProgramContext';
import { DOCUMENT_TYPES, PHASES } from '../data/programData';
import { generateGovernanceRoadmap, calculateProgramMaturity } from '../utils/roadmapLogic';

// =============================================================================
// GOVERNANCE ASSESSMENT WIZARD
// =============================================================================
// Multi-step wizard that guides users through assessing their current
// governance document status. Each document can be marked as:
// - Not Started (default)
// - Draft (work in progress)
// - Published (complete and approved)
// =============================================================================

const GovernanceAssessment = () => {
    const navigate = useNavigate();
    const {
        governanceDocuments,
        updateDocumentStatus,
        bulkUpdateDocumentStatus,
        documentStats,
        profile
    } = useProgram();

    // Current step in wizard (by document type)
    const [currentStep, setCurrentStep] = useState(0);
    const steps = ['Policy', 'Standard', 'SOP', 'Playbook', 'Runbook', 'Guideline'];

    // Filter documents by current step type
    const currentDocs = useMemo(() =>
        governanceDocuments.filter(d => d.type === steps[currentStep]),
        [governanceDocuments, currentStep]
    );

    // Group current docs by category
    const docsByCategory = useMemo(() => {
        const grouped = {};
        currentDocs.forEach(doc => {
            if (!grouped[doc.category]) {
                grouped[doc.category] = [];
            }
            grouped[doc.category].push(doc);
        });
        return grouped;
    }, [currentDocs]);

    // Calculate overall maturity
    const overallMaturity = useMemo(() =>
        calculateProgramMaturity(governanceDocuments),
        [governanceDocuments]
    );

    // Handle status change for a document
    const handleStatusChange = (docId, newStatus) => {
        updateDocumentStatus(docId, newStatus);
    };

    // Bulk mark all current step docs
    const handleBulkMark = (status) => {
        const ids = currentDocs.map(d => d.id);
        bulkUpdateDocumentStatus(ids, status);
    };

    // Navigation
    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Final step - go to roadmap
            navigate('/vciso');
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    // Status selector component
    const StatusSelector = ({ doc }) => {
        const statusOptions = ['Not Started', 'Draft', 'Published'];

        return (
            <div style={{ display: 'flex', gap: '8px' }}>
                {statusOptions.map(status => (
                    <button
                        key={status}
                        onClick={() => handleStatusChange(doc.id, status)}
                        style={{
                            padding: '6px 12px',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '11px',
                            fontWeight: doc.status === status ? 'bold' : 'normal',
                            background: doc.status === status
                                ? status === 'Published' ? 'var(--primary)'
                                    : status === 'Draft' ? '#ff9900'
                                        : 'rgba(255,255,255,0.2)'
                                : 'rgba(255,255,255,0.05)',
                            color: doc.status === status && status !== 'Not Started' ? '#000' : '#fff',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {status}
                    </button>
                ))}
            </div>
        );
    };

    // Progress indicator
    const ProgressBar = () => (
        <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '32px',
            padding: '16px',
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '8px'
        }}>
            {steps.map((step, index) => {
                const typeStats = documentStats[step] || { completionPercent: 0 };
                const isActive = index === currentStep;
                const isComplete = typeStats.completionPercent === 100;

                return (
                    <div
                        key={step}
                        onClick={() => setCurrentStep(index)}
                        style={{
                            flex: 1,
                            cursor: 'pointer',
                            textAlign: 'center',
                            padding: '12px 8px',
                            borderRadius: '6px',
                            background: isActive
                                ? 'rgba(0,255,157,0.2)'
                                : isComplete
                                    ? 'rgba(0,255,157,0.1)'
                                    : 'transparent',
                            border: isActive
                                ? '2px solid var(--primary)'
                                : '2px solid transparent',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <div style={{
                            fontSize: '20px',
                            marginBottom: '4px'
                        }}>
                            {DOCUMENT_TYPES[step]?.icon || '📄'}
                        </div>
                        <div style={{
                            fontSize: '11px',
                            fontWeight: isActive ? 'bold' : 'normal',
                            color: isActive ? 'var(--primary)' : 'var(--text-muted)'
                        }}>
                            {step}s
                        </div>
                        <div style={{
                            fontSize: '10px',
                            color: isComplete ? 'var(--primary)' : 'var(--text-muted)',
                            marginTop: '4px'
                        }}>
                            {typeStats.completionPercent}%
                        </div>
                    </div>
                );
            })}
        </div>
    );

    // Document card component
    const DocumentCard = ({ doc }) => (
        <div
            className="glass-panel"
            style={{
                padding: '16px',
                marginBottom: '12px',
                borderLeft: `4px solid ${DOCUMENT_TYPES[doc.type]?.color || '#888'}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px'
            }}
        >
            <div style={{ flex: 1 }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '4px'
                }}>
                    <span style={{
                        fontSize: '10px',
                        background: 'rgba(255,255,255,0.1)',
                        padding: '2px 6px',
                        borderRadius: '4px'
                    }}>
                        {doc.id}
                    </span>
                    <span style={{
                        fontSize: '10px',
                        color: doc.priority === 'Critical' ? '#ff4444'
                            : doc.priority === 'High' ? '#ff9900'
                                : 'var(--text-muted)'
                    }}>
                        {doc.priority}
                    </span>
                    <span style={{
                        fontSize: '10px',
                        color: 'var(--text-muted)'
                    }}>
                        ~{doc.effort} days
                    </span>
                </div>
                <div style={{
                    fontWeight: 'bold',
                    fontSize: '14px',
                    marginBottom: '4px'
                }}>
                    {doc.title}
                </div>
                <div style={{
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    lineHeight: '1.4'
                }}>
                    {doc.description}
                </div>
                {doc.dependencies && doc.dependencies.length > 0 && (
                    <div style={{
                        fontSize: '10px',
                        color: 'var(--text-muted)',
                        marginTop: '8px'
                    }}>
                        Depends on: {doc.dependencies.join(', ')}
                    </div>
                )}
            </div>
            <StatusSelector doc={doc} />
        </div>
    );

    return (
        <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ margin: 0, marginBottom: '8px' }}>
                    Governance Assessment
                </h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Mark the status of each governance document in your organization.
                    This assessment will generate a prioritized roadmap to reach full maturity.
                </p>

                {/* Overall Maturity Indicator */}
                <div className="glass-panel" style={{
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: `conic-gradient(var(--primary) ${overallMaturity * 3.6}deg, rgba(255,255,255,0.1) 0deg)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            background: '#1a1d24',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '20px',
                            fontWeight: 'bold'
                        }}>
                            {overallMaturity}%
                        </div>
                    </div>
                    <div>
                        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                            Overall Program Maturity
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                            {documentStats.overall?.published || 0} of {documentStats.overall?.total || 0} documents published
                        </div>
                        <div style={{ fontSize: '12px', color: '#ff9900', marginTop: '4px' }}>
                            {documentStats.overall?.draft || 0} in draft
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Steps */}
            <ProgressBar />

            {/* Current Step Header */}
            <div style={{ marginBottom: '24px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                }}>
                    <div>
                        <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '32px' }}>
                                {DOCUMENT_TYPES[steps[currentStep]]?.icon}
                            </span>
                            {steps[currentStep]}s
                        </h2>
                        <p style={{
                            color: 'var(--text-muted)',
                            margin: 0,
                            marginTop: '4px',
                            fontSize: '14px'
                        }}>
                            {DOCUMENT_TYPES[steps[currentStep]]?.description}
                        </p>
                    </div>

                    {/* Bulk Actions */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            onClick={() => handleBulkMark('Not Started')}
                            style={{
                                padding: '8px 16px',
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                borderRadius: '4px',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '12px'
                            }}
                        >
                            Mark All Not Started
                        </button>
                        <button
                            onClick={() => handleBulkMark('Published')}
                            style={{
                                padding: '8px 16px',
                                background: 'var(--primary)',
                                border: 'none',
                                borderRadius: '4px',
                                color: '#000',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: 'bold'
                            }}
                        >
                            Mark All Published
                        </button>
                    </div>
                </div>
            </div>

            {/* Document List by Category */}
            <div style={{ marginBottom: '32px' }}>
                {Object.entries(docsByCategory).map(([category, docs]) => (
                    <div key={category} style={{ marginBottom: '24px' }}>
                        <h3 style={{
                            fontSize: '14px',
                            color: 'var(--text-muted)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '12px',
                            paddingBottom: '8px',
                            borderBottom: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            {category} ({docs.filter(d => d.status === 'Published').length}/{docs.length})
                        </h3>
                        {docs.map(doc => (
                            <DocumentCard key={doc.id} doc={doc} />
                        ))}
                    </div>
                ))}
            </div>

            {/* Navigation */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '24px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '8px',
                position: 'sticky',
                bottom: '24px'
            }}>
                <button
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    style={{
                        padding: '12px 24px',
                        background: currentStep === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '4px',
                        color: currentStep === 0 ? '#666' : 'white',
                        cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                        fontSize: '14px'
                    }}
                >
                    ← Previous
                </button>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--text-muted)',
                    fontSize: '14px'
                }}>
                    Step {currentStep + 1} of {steps.length}
                </div>

                <button
                    onClick={handleNext}
                    style={{
                        padding: '12px 24px',
                        background: currentStep === steps.length - 1 ? 'var(--primary)' : 'rgba(0,255,157,0.2)',
                        border: 'none',
                        borderRadius: '4px',
                        color: currentStep === steps.length - 1 ? '#000' : 'var(--primary)',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold'
                    }}
                >
                    {currentStep === steps.length - 1 ? 'Generate Roadmap →' : 'Next →'}
                </button>
            </div>
        </div>
    );
};

export default GovernanceAssessment;
