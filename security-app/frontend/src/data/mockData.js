export const SYSTEM_STATUS = {
    defcon: 5,
    systemStatus: 'OPTIMIZED',
    lastUpdated: '2025-12-16T09:00:00Z'
};

export const ROADMAP_PROGRESS = [
    { label: "GOVERN", value: 98, color: "var(--primary)" },
    { label: "IDENTIFY", value: 95, color: "var(--primary)" },
    { label: "PROTECT", value: 92, color: "var(--primary)" },
    { label: "DETECT", value: 96, color: "var(--primary)" },
    { label: "RESPOND", value: 99, color: "var(--primary)" }
];

export const TOP_RISKS = [
    { id: 'R-001', name: 'RANSOMWARE', score: 2, level: 'LOW', trend: 'down' },
    { id: 'R-002', name: 'SUPPLY CHAIN', score: 4, level: 'LOW', trend: 'stable' },
    { id: 'R-003', name: 'INSIDER', score: 3, level: 'LOW', trend: 'down' },
    { id: 'R-004', name: 'COMPLIANCE', score: 0, level: 'LOW', trend: 'stable' }
];

export const INITIATIVES = [
    { id: 'I-01', category: "GOVERN", title: "Continuous Compliance Monitoring Automation", status: "done" },
    { id: 'I-02', category: "IDENTIFY", title: "Real-time Asset Discovery & Reconciliation", status: "done" },
    { id: 'I-03', category: "PROTECT", title: "Zero Trust Architecture Implementation", status: "done" },
    { id: 'I-04', category: "RESPOND", title: "SOAR Automated Playbooks V2.0", status: "doing" }
];

export const POLICIES = [
    // --- GOVERNANCE & POLICY ---
    { id: 'POL-01', type: 'Policy', title: 'Global Information Security Policy', owner: 'CISO', lastReview: '2025-11-01', status: 'Published', mapping: ['NIST CSF: GV.PO', 'ISO 27001: 5.1'] },
    { id: 'POL-02', type: 'Policy', title: 'Acceptable Use Policy (AUP)', owner: 'HR/CISO', lastReview: '2025-08-15', status: 'Published', mapping: ['NIST CSF: PR.AA', 'ISO 27001: 5.10'] },
    { id: 'POL-03', type: 'Policy', title: 'Information Security Risk Management Policy', owner: 'CRO', lastReview: '2025-10-01', status: 'Published', mapping: ['NIST CSF: GV.RM', 'ISO 27001: 5.7'] },
    { id: 'POL-04', type: 'Policy', title: 'Data Classification & Handling Policy', owner: 'Privacy', lastReview: '2025-09-20', status: 'Published', mapping: ['NIST CSF: PR.DS', 'ISO 27001: 5.12'] },
    { id: 'POL-05', type: 'Policy', title: 'Third-Party Risk Management Policy', owner: 'Procurement', lastReview: '2025-07-30', status: 'Published', mapping: ['NIST CSF: GV.SC', 'ISO 27001: 5.19'] },

    // --- STANDARDS ---
    { id: 'STD-01', type: 'Standard', title: 'Encryption & Key Management Standard', owner: 'Crypto Lead', lastReview: '2025-09-20', status: 'Published', mapping: ['NIST CSF: PR.DS', 'ISO 27001: 8.24'] },
    { id: 'STD-02', type: 'Standard', title: 'Secure Software Development Standard (SSDLC)', owner: 'AppSec', lastReview: '2025-11-15', status: 'Published', mapping: ['NIST CSF: PR.PS', 'ISO 27001: 8.25'] },
    { id: 'STD-03', type: 'Standard', title: 'Endpoint Security Hardening Standard', owner: 'IT Ops', lastReview: '2025-12-05', status: 'Draft', mapping: ['NIST CSF: PR.PT', 'ISO 27001: 8.9'] },
    { id: 'STD-04', type: 'Standard', title: 'Identity & Access Management (IAM) Standard', owner: 'IAM Lead', lastReview: '2025-10-15', status: 'Published', mapping: ['NIST CSF: PR.AA', 'ISO 27001: 5.15'] },
    { id: 'STD-05', type: 'Standard', title: 'Network Security Architecture Standard', owner: 'NetSec', lastReview: '2025-11-20', status: 'Published', mapping: ['NIST CSF: PR.NW', 'ISO 27001: 8.20'] },

    // --- PROCEDURES (SOP) ---
    { id: 'SOP-01', type: 'SOP', title: 'User Access Onboarding Procedure', owner: 'IT Ops', lastReview: '2025-12-10', status: 'Published', mapping: ['NIST CSF: PR.AA', 'ISO 27001: 5.16'] },
    { id: 'SOP-02', type: 'SOP', title: 'Offboarding & Asset Recovery Procedure', owner: 'HR/IT', lastReview: '2025-11-25', status: 'Published', mapping: ['NIST CSF: PR.AA', 'ISO 27001: 5.17'] },
    { id: 'SOP-03', type: 'SOP', title: 'Vulnerability Scanning & Remediation SOP', owner: 'VMS', lastReview: '2025-12-01', status: 'Published', mapping: ['NIST CSF: PR.RA', 'ISO 27001: 8.8', 'NIST CSF: DE.CM'] },
    { id: 'SOP-04', type: 'SOP', title: 'Change Management Approval Procedure', owner: 'ITIL', lastReview: '2025-10-10', status: 'Published', mapping: ['NIST CSF: PR.CM', 'ISO 27001: 8.32'] },
    { id: 'SOP-05', type: 'SOP', title: 'Backup & Recovery Validation SOP', owner: 'IT Ops', lastReview: '2025-09-05', status: 'Published', mapping: ['NIST CSF: RC.RP', 'ISO 27001: 8.13'] },

    // --- PLAYBOOKS & RUNBOOKS ---
    { id: 'PB-01', type: 'Playbook', title: 'Ransomware Incident Response Playbook', owner: 'SecOps', lastReview: '2025-12-01', status: 'Published', mapping: ['NIST CSF: RS.RP', 'ISO 27001: 5.24'] },
    { id: 'PB-02', type: 'Playbook', title: 'Data Breach Notification Playbook', owner: 'Legal/CISO', lastReview: '2025-11-15', status: 'Published', mapping: ['NIST CSF: RS.CO', 'ISO 27001: 5.24'] },
    { id: 'PB-03', type: 'Playbook', title: 'DDoS Attack Mitigation Playbook', owner: 'NetSec', lastReview: '2025-10-20', status: 'Published', mapping: ['NIST CSF: RS.AN', 'ISO 27001: 5.26', 'NIST CSF: DE.AE'] },
    { id: 'RB-01', type: 'Runbook', title: 'SIEM Log Source Integration Runbook', owner: 'SIEM Eng', lastReview: '2025-12-15', status: 'Published', mapping: ['NIST CSF: DE.AE', 'ISO 27001: 8.15', 'NIST CSF: ID.AM'] },
    { id: 'RB-02', type: 'Runbook', title: 'Cloud IAM Role Audit Runbook', owner: 'CloudSec', lastReview: '2025-11-30', status: 'Published', mapping: ['NIST CSF: ID.IM', 'ISO 27001: 8.16', 'NIST CSF: PR.AA'] },

    // --- GUIDELINES ---
    { id: 'GB-01', type: 'Guideline', title: 'Remote Work Security Best Practices', owner: 'CISO', lastReview: '2025-11-20', status: 'Published', mapping: ['NIST CSF: PR.DS', 'ISO 27001: 6.7'] },
    { id: 'GB-02', type: 'Guideline', title: 'Secure Coding Practices for Web Apps', owner: 'AppSec', lastReview: '2025-10-05', status: 'Published', mapping: ['NIST CSF: PR.PS', 'ISO 27001: 8.28'] },
    { id: 'GB-03', type: 'Guideline', title: 'Password & MFA Configuration Guide', owner: 'IAM Lead', lastReview: '2025-09-15', status: 'Published', mapping: ['NIST CSF: PR.AA', 'ISO 27001: 5.15'] },

    // --- LOGICAL GAPS (NOT STARTED) ---
    { id: 'POL-06', type: 'Policy', title: 'AI & Machine Learning Usage Policy', owner: 'AI Risk', lastReview: 'N/A', status: 'Not Started', mapping: ['NIST CSF: GV.PO'] },
    { id: 'STD-06', type: 'Standard', title: 'Zero Trust Network Architecture Standard', owner: 'NetSec', lastReview: 'N/A', status: 'Not Started', mapping: ['NIST CSF: PR.NW', 'ISO 27001: 8.20'] },
    { id: 'SOP-06', type: 'SOP', title: 'Automated Secrets Management Rotation SOP', owner: 'DevSecOps', lastReview: 'N/A', status: 'Not Started', mapping: ['NIST CSF: PR.DS'] },
    { id: 'PB-04', type: 'Playbook', title: 'Supply Chain Compromise Response Playbook', owner: 'SecOps', lastReview: 'N/A', status: 'Draft', mapping: ['NIST CSF: RS.RP', 'NIST CSF: GV.SC'] },
    { id: 'RB-03', type: 'Runbook', title: 'Disaster Recovery Warm-Site Failover Runbook', owner: 'IT Ops', lastReview: 'N/A', status: 'Not Started', mapping: ['NIST CSF: RC.RP'] },
    { id: 'POL-07', type: 'Policy', title: 'Business Continuity & Disaster Recovery Policy', owner: 'CISO', lastReview: 'N/A', status: 'Not Started', mapping: ['NIST CSF: RC.RP', 'ISO 27001: 5.30'] },
    { id: 'STD-07', type: 'Standard', title: 'Security Logging & Monitoring Standard', owner: 'SOC Lead', lastReview: 'N/A', status: 'Not Started', mapping: ['NIST CSF: DE.CM', 'ISO 27001: 8.17'] }
];

export const GOVERNANCE_TEMPLATES = {
    Policy: `# [Organization Name] - Information Security Policy Template
## 1. Purpose
Define the high-level objectives and management intent for information security.
## 2. Scope
Applies to all employees, contractors, and third-party users accessing [Org Name] assets.
## 3. Policy Statements
- Mandatory high-level requirement 1...
- Mandatory high-level requirement 2...
## 4. Compliance
Violations may result in disciplinary action up to and including termination.
## 5. Governance
Owned by the CISO. Reviewed annually.`,

    Standard: `# [Organization Name] - Technical Security Standard Template
## 1. Overview
Requirements for the secure configuration of [System/Technology Name].
## 2. Mandatory Controls
- **Control ID-01**: Description of mandatory technical parameter.
- **Control ID-02**: Reference to specific version or cipher suite.
## 3. Implementation Guidance
Specific steps to reach the required state.
## 4. Monitoring & Enforcement
How compliance will be measured (e.g., config audit).
## 5. Exceptions
Process for requesting a deviation.`,

    Guideline: `# [Organization Name] - Security Guideline Template
## 1. Introduction
Recommended practices for [Topic Name].
## 2. Best Practices
- Recommendation 1 (Should vs Must)...
- Recommendation 2...
## 3. Resource References
Links to external standards or vendor documentation.
## 4. Implementation Tips
Helpful examples for operational teams.`,

    SOP: `# [Organization Name] - Standard Operating Procedure (SOP)
## 1. Activity Description
Detailed, step-by-step process for [Operational Task].
## 2. Roles & Responsibilities
- **Initiator**: Role responsible for starting the task.
- **Approver**: Role responsible for sign-off.
## 3. Procedural Steps
1. Step One...
2. Step Two...
3. Step Three...
## 4. Evidence Requirements
Logs, screenshots, or tickets required for audit proof.`,

    Playbook: `# [Organization Name] - Incident Response Playbook
## 1. Response Strategy
Strategic approach to managing [Incident Type (e.g., Ransomware)].
## 2. Trigger Conditions
When this playbook should be activated (Severity, Scope).
## 3. Communication Matrix
Who needs to be notified and when (Legal, PR, Execs).
## 4. Response Phases
- **Identification**: Initial signs...
- **Containment**: Immediate actions...
- **Eradication**: Root cause removal...
## 5. Post-Mortem Requirements
Checklist for the Lessons Learned session.`,

    Runbook: `# [Organization Name] - Technical Runbook
## 1. Objective
Tactical execution of [Specific Technical Action].
## 2. Prerequisites
Access rights, API keys, or pre-requisite automation tools.
## 3. Execution Commands
\`\`\`bash
# Command 1 to execute
sudo run system-audit --mode=fix
\`\`\`
## 4. Success Criteria
Expected output or terminal response signature.
## 5. Rollback Procedures
Steps to revert if execution fails.`
};

export const RISK_REGISTER = [
    { id: 'R-001', title: 'Advanced Persistent Threats (APT)', category: 'External', impact: 'High', probability: 'Low', owner: 'CISO', status: 'Mitigated' },
    { id: 'R-002', title: 'Supply Chain Compromise', category: 'Supply Chain', impact: 'High', probability: 'Low', owner: 'Vendor Risk', status: 'Mitigated' },
    { id: 'R-003', title: 'Data Sovereignty / Privacy', category: 'Legal', impact: 'Medium', probability: 'Low', owner: 'Privacy/Legal', status: 'Managed' },
    { id: 'R-004', title: 'AI/ML Model Poisoning', category: 'Emerging', impact: 'High', probability: 'Low', owner: 'AI Risk', status: 'Monitoring' },
    { id: 'R-005', title: 'Quantum Decryption Risk', category: 'Emerging', impact: 'Critical', probability: 'Very Low', owner: 'Crypto Lead', status: 'Accepting' }
];
