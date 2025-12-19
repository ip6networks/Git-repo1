// =============================================================================
// SECURITY PROGRAM DATA - Items mapped to NIST CSF 2.0 Subcategories
// =============================================================================

import { DOCUMENT_TYPES, NIST_CSF_2 } from './frameworkData';

// Re-export for convenience
export { DOCUMENT_TYPES, NIST_CSF_2 };
export const NIST_FUNCTIONS = {
    GV: NIST_CSF_2.GV,
    ID: NIST_CSF_2.ID,
    PR: NIST_CSF_2.PR,
    DE: NIST_CSF_2.DE,
    RS: NIST_CSF_2.RS,
    RC: NIST_CSF_2.RC
};

// People, Process, Technology Dimensions
export const PPT_DIMENSIONS = {
    People: { id: 'People', label: 'People', icon: '👥', color: '#ff4488' },
    Process: { id: 'Process', label: 'Process', icon: '📝', color: '#00ccff' },
    Technology: { id: 'Technology', label: 'Technology', icon: '💻', color: '#aa44ff' }
};

// =============================================================================
// PROGRAM ITEMS - Mapped to subcategories
// =============================================================================

export const PROGRAM_ITEMS = [
    // =========================================================================
    // GOVERN (GV) Items
    // =========================================================================

    // GV.OC - Organizational Context
    { id: 'GV-POL-001', type: 'Policy', title: 'Information Security Policy', description: 'High-level policy establishing the information security program, CISO authority, and executive commitment.', subcategoryId: 'GV.OC-01', categoryId: 'GV.OC', functionId: 'GV', priority: 'Critical', phase: 1, effort: 3, status: 'Not Started', isoRef: ['5.1', '5.2'], dimension: 'Process' },
    { id: 'GV-POL-002', type: 'Policy', title: 'Legal & Regulatory Compliance Policy', description: 'Defines how legal, regulatory, and contractual cybersecurity requirements are identified and managed.', subcategoryId: 'GV.OC-03', categoryId: 'GV.OC', functionId: 'GV', priority: 'High', phase: 1, effort: 4, status: 'Not Started', isoRef: ['5.31', '5.34'], dimension: 'Process' },
    { id: 'GV-STD-001', type: 'Standard', title: 'Stakeholder Communication Standard', description: 'Defines how cybersecurity risks are communicated to internal and external stakeholders.', subcategoryId: 'GV.OC-02', categoryId: 'GV.OC', functionId: 'GV', priority: 'Medium', phase: 2, effort: 2, status: 'Not Started', isoRef: ['5.1'], dimension: 'Process' },

    // GV.RM - Risk Management Strategy
    { id: 'GV-POL-003', type: 'Policy', title: 'Risk Management Policy', description: 'Defines risk appetite, tolerance levels, assessment methodology, and risk treatment options.', subcategoryId: 'GV.RM-01', categoryId: 'GV.RM', functionId: 'GV', priority: 'Critical', phase: 1, effort: 5, status: 'Not Started', isoRef: ['5.7', '6.1'], dimension: 'Process' },
    { id: 'GV-STD-002', type: 'Standard', title: 'Risk Appetite Statement', description: 'Documents organizational risk appetite and tolerance thresholds for cybersecurity risks.', subcategoryId: 'GV.RM-02', categoryId: 'GV.RM', functionId: 'GV', priority: 'High', phase: 1, effort: 3, status: 'Not Started', isoRef: ['5.7'], dimension: 'Process' },
    { id: 'GV-STD-003', type: 'Standard', title: 'Risk Scoring Methodology', description: 'Standardized method for calculating, categorizing, and prioritizing cybersecurity risks.', subcategoryId: 'GV.RM-06', categoryId: 'GV.RM', functionId: 'GV', priority: 'High', phase: 1, effort: 3, status: 'Not Started', isoRef: ['5.7'], dimension: 'Process' },
    { id: 'GV-SOP-001', type: 'SOP', title: 'Risk Communication Procedure', description: 'Process for communicating cybersecurity risks across organizational levels.', subcategoryId: 'GV.RM-05', categoryId: 'GV.RM', functionId: 'GV', priority: 'Medium', phase: 2, effort: 2, status: 'Not Started', isoRef: ['5.7'], dimension: 'Process' },

    // GV.RR - Roles, Responsibilities, Authorities
    { id: 'GV-STD-004', type: 'Standard', title: 'Security Roles & Responsibilities Matrix (RACI)', description: 'Defines roles, responsibilities, and authorities for cybersecurity across the organization.', subcategoryId: 'GV.RR-02', categoryId: 'GV.RR', functionId: 'GV', priority: 'High', phase: 1, effort: 3, status: 'Not Started', isoRef: ['5.2', '5.3'], dimension: 'People' },
    { id: 'GV-CTL-001', type: 'Control', title: 'Security Steering Committee', description: 'Executive oversight body accountable for cybersecurity risk decisions.', subcategoryId: 'GV.RR-01', categoryId: 'GV.RR', functionId: 'GV', priority: 'High', phase: 1, effort: 2, status: 'Not Started', isoRef: ['5.1'], riskReduction: 5, dimension: 'People' },

    // GV.PO - Policy
    { id: 'GV-POL-004', type: 'Policy', title: 'Policy Exception Management', description: 'Formal process for requesting, approving, and tracking policy exceptions.', subcategoryId: 'GV.PO-02', categoryId: 'GV.PO', functionId: 'GV', priority: 'High', phase: 1, effort: 2, status: 'Not Started', isoRef: ['5.1'], dimension: 'Process' },
    { id: 'GV-CTL-002', type: 'Control', title: 'Annual Policy Review Cycle', description: 'Process to review, update, and communicate policies at least annually.', subcategoryId: 'GV.PO-02', categoryId: 'GV.PO', functionId: 'GV', priority: 'Medium', phase: 2, effort: 2, status: 'Not Started', isoRef: ['5.1'], riskReduction: 3, dimension: 'Process' },

    // GV.OV - Oversight
    { id: 'GV-CTL-003', type: 'Control', title: 'Quarterly Risk Review', description: 'Executive review of cybersecurity risk management outcomes and strategy adjustments.', subcategoryId: 'GV.OV-01', categoryId: 'GV.OV', functionId: 'GV', priority: 'Medium', phase: 2, effort: 2, status: 'Not Started', isoRef: ['5.1'], riskReduction: 5, dimension: 'Process' },
    { id: 'GV-CTL-004', type: 'Control', title: 'Security Metrics Dashboard', description: 'Dashboard to track and report cybersecurity program performance.', subcategoryId: 'GV.OV-03', categoryId: 'GV.OV', functionId: 'GV', priority: 'Medium', phase: 2, effort: 3, status: 'Not Started', isoRef: ['5.1'], riskReduction: 4, dimension: 'Technology' },

    // GV.SC - Supply Chain Risk Management
    { id: 'GV-POL-005', type: 'Policy', title: 'Third-Party Risk Management Policy', description: 'Requirements for managing cybersecurity risks from suppliers and third parties.', subcategoryId: 'GV.SC-01', categoryId: 'GV.SC', functionId: 'GV', priority: 'High', phase: 2, effort: 5, status: 'Not Started', isoRef: ['5.19', '5.20', '5.21'], dimension: 'Process' },
    { id: 'GV-STD-005', type: 'Standard', title: 'Vendor Security Assessment Standard', description: 'Criteria and process for assessing supplier cybersecurity before engagement.', subcategoryId: 'GV.SC-06', categoryId: 'GV.SC', functionId: 'GV', priority: 'High', phase: 2, effort: 4, status: 'Not Started', isoRef: ['5.21', '5.22'], dimension: 'Process' },
    { id: 'GV-SOP-002', type: 'SOP', title: 'Vendor Onboarding Security Review', description: 'Due diligence procedure before entering supplier relationships.', subcategoryId: 'GV.SC-06', categoryId: 'GV.SC', functionId: 'GV', priority: 'Medium', phase: 2, effort: 3, status: 'Not Started', isoRef: ['5.21'], dimension: 'Process' },

    // =========================================================================
    // IDENTIFY (ID) Items
    // =========================================================================

    // ID.AM - Asset Management
    { id: 'ID-POL-001', type: 'Policy', title: 'Asset Management Policy', description: 'Requirements for inventorying, classifying, and managing all IT assets.', subcategoryId: 'ID.AM-01', categoryId: 'ID.AM', functionId: 'ID', priority: 'High', phase: 1, effort: 3, status: 'Not Started', isoRef: ['5.9', '8.1'], dimension: 'Process' },
    { id: 'ID-POL-002', type: 'Policy', title: 'Data Classification Policy', description: 'Classification levels and handling requirements for organizational data.', subcategoryId: 'ID.AM-07', categoryId: 'ID.AM', functionId: 'ID', priority: 'Critical', phase: 1, effort: 5, status: 'Not Started', isoRef: ['5.12', '5.13'], dimension: 'Process' },
    { id: 'ID-STD-001', type: 'Standard', title: 'Hardware Inventory Standard', description: 'Required attributes and update frequency for hardware asset tracking.', subcategoryId: 'ID.AM-01', categoryId: 'ID.AM', functionId: 'ID', priority: 'High', phase: 1, effort: 3, status: 'Not Started', isoRef: ['5.9'], dimension: 'Process' },
    { id: 'ID-STD-002', type: 'Standard', title: 'Software Inventory Standard', description: 'Required attributes and update frequency for software and SaaS tracking.', subcategoryId: 'ID.AM-02', categoryId: 'ID.AM', functionId: 'ID', priority: 'High', phase: 1, effort: 3, status: 'Not Started', isoRef: ['5.9'], dimension: 'Process' },
    { id: 'ID-CTL-001', type: 'Control', title: 'Hardware Asset Discovery', description: 'Automated discovery and tracking of all hardware assets.', subcategoryId: 'ID.AM-01', categoryId: 'ID.AM', functionId: 'ID', priority: 'High', phase: 1, effort: 4, status: 'Not Started', isoRef: ['5.9'], riskReduction: 7, dimension: 'Technology' },
    { id: 'ID-CTL-002', type: 'Control', title: 'Software Asset Management (SAM)', description: 'Tool for discovering and managing software inventory.', subcategoryId: 'ID.AM-02', categoryId: 'ID.AM', functionId: 'ID', priority: 'High', phase: 1, effort: 4, status: 'Not Started', isoRef: ['5.9'], riskReduction: 6, dimension: 'Technology' },

    // ID.RA - Risk Assessment
    { id: 'ID-SOP-001', type: 'SOP', title: 'Risk Assessment Procedure', description: 'Step-by-step process for conducting cybersecurity risk assessments.', subcategoryId: 'ID.RA-05', categoryId: 'ID.RA', functionId: 'ID', priority: 'High', phase: 1, effort: 4, status: 'Not Started', isoRef: ['5.7', '8.8'], dimension: 'Process' },
    { id: 'ID-CTL-003', type: 'Control', title: 'Vulnerability Scanner', description: 'Continuous vulnerability scanning of all networked assets.', subcategoryId: 'ID.RA-01', categoryId: 'ID.RA', functionId: 'ID', priority: 'Critical', phase: 1, effort: 5, status: 'Not Started', isoRef: ['8.8'], riskReduction: 9, dimension: 'Technology' },
    { id: 'ID-CTL-004', type: 'Control', title: 'Threat Intelligence Feed', description: 'Integration of external cyber threat intelligence.', subcategoryId: 'ID.RA-02', categoryId: 'ID.RA', functionId: 'ID', priority: 'Medium', phase: 2, effort: 3, status: 'Not Started', isoRef: ['5.7'], riskReduction: 5, dimension: 'Technology' },
    { id: 'ID-SOP-002', type: 'SOP', title: 'Vulnerability Disclosure Handling', description: 'Process for receiving and responding to vulnerability disclosures.', subcategoryId: 'ID.RA-08', categoryId: 'ID.RA', functionId: 'ID', priority: 'Medium', phase: 2, effort: 2, status: 'Not Started', isoRef: ['8.8'], dimension: 'Process' },

    // =========================================================================
    // PROTECT (PR) Items
    // =========================================================================

    // PR.AA - Identity Management, Authentication, Access Control
    { id: 'PR-POL-001', type: 'Policy', title: 'Access Control Policy', description: 'Least privilege, need-to-know, and role-based access requirements.', subcategoryId: 'PR.AA-05', categoryId: 'PR.AA', functionId: 'PR', priority: 'Critical', phase: 1, effort: 4, status: 'Not Started', isoRef: ['5.15', '5.16'], dimension: 'Process' },
    { id: 'PR-POL-002', type: 'Policy', title: 'Privileged Access Management Policy', description: 'Special controls for administrative accounts: vaulting, JIT access, session recording.', subcategoryId: 'PR.AA-05', categoryId: 'PR.AA', functionId: 'PR', priority: 'Critical', phase: 1, effort: 5, status: 'Not Started', isoRef: ['8.2'], dimension: 'Process' },
    { id: 'PR-STD-001', type: 'Standard', title: 'MFA Standard', description: 'Multi-factor authentication required for all users; phishing-resistant for admins.', subcategoryId: 'PR.AA-03', categoryId: 'PR.AA', functionId: 'PR', priority: 'Critical', phase: 1, effort: 3, status: 'Not Started', isoRef: ['5.17', '8.5'], dimension: 'Process' },
    { id: 'PR-STD-002', type: 'Standard', title: 'Password Standard', description: 'Minimum 14 characters, complexity requirements, secure storage.', subcategoryId: 'PR.AA-03', categoryId: 'PR.AA', functionId: 'PR', priority: 'High', phase: 1, effort: 1, status: 'Not Started', isoRef: ['5.17'], dimension: 'Process' },
    { id: 'PR-SOP-001', type: 'SOP', title: 'User Onboarding Procedure', description: 'Access provisioning steps for new employees.', subcategoryId: 'PR.AA-01', categoryId: 'PR.AA', functionId: 'PR', priority: 'High', phase: 1, effort: 2, status: 'Not Started', isoRef: ['5.16'], dimension: 'Process' },
    { id: 'PR-SOP-002', type: 'SOP', title: 'User Offboarding Procedure', description: 'Access revocation within 24 hours of termination.', subcategoryId: 'PR.AA-01', categoryId: 'PR.AA', functionId: 'PR', priority: 'Critical', phase: 1, effort: 2, status: 'Not Started', isoRef: ['5.18'], dimension: 'Process' },
    { id: 'PR-SOP-003', type: 'SOP', title: 'Access Review Procedure', description: 'Quarterly review of user access rights and entitlements.', subcategoryId: 'PR.AA-05', categoryId: 'PR.AA', functionId: 'PR', priority: 'High', phase: 2, effort: 2, status: 'Not Started', isoRef: ['5.18'], dimension: 'Process' },
    { id: 'PR-CTL-001', type: 'Control', title: 'Multi-Factor Authentication (MFA)', description: 'MFA enabled for all cloud applications and VPN access.', subcategoryId: 'PR.AA-03', categoryId: 'PR.AA', functionId: 'PR', priority: 'Critical', phase: 1, effort: 3, status: 'Not Started', isoRef: ['8.5'], riskReduction: 9, dimension: 'Technology' },
    { id: 'PR-CTL-002', type: 'Control', title: 'Privileged Access Management (PAM)', description: 'Password vaulting and just-in-time access for admin accounts.', subcategoryId: 'PR.AA-05', categoryId: 'PR.AA', functionId: 'PR', priority: 'Critical', phase: 1, effort: 5, status: 'Not Started', isoRef: ['8.2'], riskReduction: 8, dimension: 'Technology' },

    // PR.AT - Awareness and Training
    { id: 'PR-POL-003', type: 'Policy', title: 'Security Awareness Training Policy', description: 'Training requirements for all employees including onboarding and annual refresher.', subcategoryId: 'PR.AT-01', categoryId: 'PR.AT', functionId: 'PR', priority: 'High', phase: 1, effort: 3, status: 'Not Started', isoRef: ['6.3'], dimension: 'Process' },
    { id: 'PR-POL-004', type: 'Policy', title: 'Acceptable Use Policy', description: 'Rules of behavior for employees using company systems and data.', subcategoryId: 'PR.AT-01', categoryId: 'PR.AT', functionId: 'PR', priority: 'Critical', phase: 1, effort: 2, status: 'Not Started', isoRef: ['5.10'], dimension: 'People' },
    { id: 'PR-CTL-003', type: 'Control', title: 'Security Awareness Platform', description: 'Automated training delivery with tracking and reporting.', subcategoryId: 'PR.AT-01', categoryId: 'PR.AT', functionId: 'PR', priority: 'High', phase: 1, effort: 2, status: 'Not Started', isoRef: ['6.3'], riskReduction: 6, dimension: 'Technology' },
    { id: 'PR-CTL-004', type: 'Control', title: 'Phishing Simulation', description: 'Monthly simulated phishing campaigns with remediation training.', subcategoryId: 'PR.AT-02', categoryId: 'PR.AT', functionId: 'PR', priority: 'Medium', phase: 2, effort: 2, status: 'Not Started', isoRef: ['6.3'], riskReduction: 5, dimension: 'Technology' },

    // PR.DS - Data Security
    { id: 'PR-POL-005', type: 'Policy', title: 'Cryptography Policy', description: 'Approved algorithms, key management, and encryption requirements.', subcategoryId: 'PR.DS-01', categoryId: 'PR.DS', functionId: 'PR', priority: 'High', phase: 2, effort: 4, status: 'Not Started', isoRef: ['8.24'], dimension: 'Process' },
    { id: 'PR-STD-003', type: 'Standard', title: 'Encryption Standard', description: 'AES-256 at rest, TLS 1.2+ in transit, RSA-2048+ for keys.', subcategoryId: 'PR.DS-01', categoryId: 'PR.DS', functionId: 'PR', priority: 'High', phase: 2, effort: 3, status: 'Not Started', isoRef: ['8.24'], dimension: 'Process' },
    { id: 'PR-CTL-005', type: 'Control', title: 'Disk Encryption', description: 'BitLocker/FileVault on all portable devices.', subcategoryId: 'PR.DS-01', categoryId: 'PR.DS', functionId: 'PR', priority: 'High', phase: 1, effort: 2, status: 'Not Started', isoRef: ['8.24'], riskReduction: 7, dimension: 'Technology' },
    { id: 'PR-CTL-006', type: 'Control', title: 'Immutable Backups', description: '3-2-1 backup strategy with immutable off-site copies.', subcategoryId: 'PR.DS-11', categoryId: 'PR.DS', functionId: 'PR', priority: 'Critical', phase: 1, effort: 4, status: 'Not Started', isoRef: ['8.13'], riskReduction: 9, dimension: 'Technology' },

    // PR.PS - Platform Security
    { id: 'PR-POL-006', type: 'Policy', title: 'Endpoint Security Policy', description: 'Requirements for laptops, desktops, and mobile devices: EDR, encryption, patching.', subcategoryId: 'PR.PS-01', categoryId: 'PR.PS', functionId: 'PR', priority: 'Critical', phase: 1, effort: 4, status: 'Not Started', isoRef: ['8.1', '8.9'], dimension: 'Process' },
    { id: 'PR-POL-007', type: 'Policy', title: 'Patch Management Policy', description: 'Patching SLAs by severity, maintenance windows, and exception process.', subcategoryId: 'PR.PS-02', categoryId: 'PR.PS', functionId: 'PR', priority: 'Critical', phase: 1, effort: 3, status: 'Not Started', isoRef: ['8.8'], dimension: 'Process' },
    { id: 'PR-STD-004', type: 'Standard', title: 'Workstation Hardening Standard', description: 'CIS Benchmark baselines for Windows and macOS workstations.', subcategoryId: 'PR.PS-01', categoryId: 'PR.PS', functionId: 'PR', priority: 'High', phase: 2, effort: 4, status: 'Not Started', isoRef: ['8.9'], dimension: 'Process' },
    { id: 'PR-STD-005', type: 'Standard', title: 'Server Hardening Standard', description: 'CIS Benchmark baselines for production servers.', subcategoryId: 'PR.PS-01', categoryId: 'PR.PS', functionId: 'PR', priority: 'High', phase: 2, effort: 5, status: 'Not Started', isoRef: ['8.9'], dimension: 'Process' },
    { id: 'PR-STD-006', type: 'Standard', title: 'Vulnerability Remediation SLA', description: 'Critical: 7 days, High: 30 days, Medium: 90 days, Low: 180 days.', subcategoryId: 'PR.PS-02', categoryId: 'PR.PS', functionId: 'PR', priority: 'Critical', phase: 1, effort: 2, status: 'Not Started', isoRef: ['8.8'], dimension: 'Process' },
    { id: 'PR-SOP-004', type: 'SOP', title: 'Patch Deployment Procedure', description: 'Testing and deploying patches to endpoints and servers.', subcategoryId: 'PR.PS-02', categoryId: 'PR.PS', functionId: 'PR', priority: 'High', phase: 1, effort: 2, status: 'Not Started', isoRef: ['8.8'], dimension: 'Process' },
    { id: 'PR-CTL-007', type: 'Control', title: 'Endpoint Detection & Response (EDR)', description: 'EDR agent deployed on all endpoints with 24/7 monitoring.', subcategoryId: 'PR.PS-01', categoryId: 'PR.PS', functionId: 'PR', priority: 'Critical', phase: 1, effort: 4, status: 'Not Started', isoRef: ['8.7'], riskReduction: 10, dimension: 'Technology' },

    // PR.IR - Technology Infrastructure Resilience
    { id: 'PR-POL-008', type: 'Policy', title: 'Network Security Policy', description: 'Firewall rules, segmentation, wireless security, and perimeter defense.', subcategoryId: 'PR.IR-01', categoryId: 'PR.IR', functionId: 'PR', priority: 'High', phase: 1, effort: 4, status: 'Not Started', isoRef: ['8.20', '8.21'], dimension: 'Process' },
    { id: 'PR-CTL-008', type: 'Control', title: 'Network Segmentation', description: 'VLANs separating prod, dev, guest, and IoT networks.', subcategoryId: 'PR.IR-01', categoryId: 'PR.IR', functionId: 'PR', priority: 'High', phase: 2, effort: 5, status: 'Not Started', isoRef: ['8.22'], riskReduction: 7, dimension: 'Technology' },

    // =========================================================================
    // DETECT (DE) Items
    // =========================================================================

    // DE.CM - Continuous Monitoring
    { id: 'DE-POL-001', type: 'Policy', title: 'Logging & Monitoring Policy', description: 'Log sources, retention periods, and security monitoring requirements.', subcategoryId: 'DE.CM-01', categoryId: 'DE.CM', functionId: 'DE', priority: 'High', phase: 2, effort: 5, status: 'Not Started', isoRef: ['8.15', '8.16'], dimension: 'Process' },
    { id: 'DE-STD-001', type: 'Standard', title: 'Security Logging Standard', description: 'Required log sources, formats, and retention periods.', subcategoryId: 'DE.CM-01', categoryId: 'DE.CM', functionId: 'DE', priority: 'High', phase: 2, effort: 4, status: 'Not Started', isoRef: ['8.15', '8.17'], dimension: 'Process' },
    { id: 'DE-CTL-001', type: 'Control', title: 'SIEM Platform', description: 'Centralized log aggregation with correlation and alerting.', subcategoryId: 'DE.CM-01', categoryId: 'DE.CM', functionId: 'DE', priority: 'High', phase: 2, effort: 7, status: 'Not Started', isoRef: ['8.15', '8.16'], riskReduction: 8, dimension: 'Technology' },
    { id: 'DE-CTL-002', type: 'Control', title: 'Network IDS/IPS', description: 'Network-based intrusion detection at perimeter and critical segments.', subcategoryId: 'DE.CM-01', categoryId: 'DE.CM', functionId: 'DE', priority: 'Medium', phase: 3, effort: 5, status: 'Not Started', isoRef: ['8.16'], riskReduction: 6, dimension: 'Technology' },

    // DE.AE - Adverse Event Analysis
    { id: 'DE-SOP-001', type: 'SOP', title: 'Log Review Procedure', description: 'Daily review of security alerts and anomalies.', subcategoryId: 'DE.AE-02', categoryId: 'DE.AE', functionId: 'DE', priority: 'High', phase: 2, effort: 2, status: 'Not Started', isoRef: ['8.16'], dimension: 'Process' },
    { id: 'DE-SOP-002', type: 'SOP', title: 'Alert Triage Procedure', description: 'Process for analyzing and escalating security alerts.', subcategoryId: 'DE.AE-04', categoryId: 'DE.AE', functionId: 'DE', priority: 'High', phase: 2, effort: 2, status: 'Not Started', isoRef: ['8.16'], dimension: 'Process' },

    // =========================================================================
    // RESPOND (RS) Items
    // =========================================================================

    // RS.MA - Incident Management
    { id: 'RS-POL-001', type: 'Policy', title: 'Incident Response Policy', description: 'IR team structure, severity classification, and escalation requirements.', subcategoryId: 'RS.MA-01', categoryId: 'RS.MA', functionId: 'RS', priority: 'Critical', phase: 1, effort: 5, status: 'Not Started', isoRef: ['5.24', '5.25'], dimension: 'Process' },
    { id: 'RS-SOP-001', type: 'SOP', title: 'Incident Triage Procedure', description: 'Initial assessment, classification, and escalation process.', subcategoryId: 'RS.MA-02', categoryId: 'RS.MA', functionId: 'RS', priority: 'Critical', phase: 1, effort: 2, status: 'Not Started', isoRef: ['5.25'], dimension: 'Process' },

    // RS.AN - Incident Analysis
    { id: 'RS-SOP-002', type: 'SOP', title: 'Evidence Collection Procedure', description: 'Forensic evidence preservation and chain of custody.', subcategoryId: 'RS.AN-07', categoryId: 'RS.AN', functionId: 'RS', priority: 'High', phase: 2, effort: 3, status: 'Not Started', isoRef: ['5.28'], dimension: 'Process' },

    // RS.CO - Incident Response Communication
    { id: 'RS-SOP-003', type: 'SOP', title: 'Incident Notification Procedure', description: 'Process for notifying stakeholders about security incidents.', subcategoryId: 'RS.CO-02', categoryId: 'RS.CO', functionId: 'RS', priority: 'High', phase: 1, effort: 2, status: 'Not Started', isoRef: ['5.24'], dimension: 'Process' },

    // RS.MI - Incident Mitigation
    { id: 'RS-PB-001', type: 'Playbook', title: 'Ransomware Response Playbook', description: 'Strategic response to ransomware including containment and recovery.', subcategoryId: 'RS.MI-01', categoryId: 'RS.MI', functionId: 'RS', priority: 'Critical', phase: 1, effort: 5, status: 'Not Started', isoRef: ['5.24', '5.26'], dimension: 'Process' },
    { id: 'RS-PB-002', type: 'Playbook', title: 'Phishing Response Playbook', description: 'Handling reported phishing and potential account compromise.', subcategoryId: 'RS.MI-01', categoryId: 'RS.MI', functionId: 'RS', priority: 'Critical', phase: 1, effort: 3, status: 'Not Started', isoRef: ['5.24'], dimension: 'Process' },
    { id: 'RS-PB-003', type: 'Playbook', title: 'Data Breach Response Playbook', description: 'Response to confirmed data exfiltration including notification requirements.', subcategoryId: 'RS.MI-01', categoryId: 'RS.MI', functionId: 'RS', priority: 'Critical', phase: 1, effort: 7, status: 'Not Started', isoRef: ['5.24', '5.34'], dimension: 'Process' },
    { id: 'RS-PB-004', type: 'Playbook', title: 'Account Compromise Playbook', description: 'Response to stolen credentials or hijacked accounts.', subcategoryId: 'RS.MI-01', categoryId: 'RS.MI', functionId: 'RS', priority: 'High', phase: 1, effort: 3, status: 'Not Started', isoRef: ['5.24'], dimension: 'Process' },
    { id: 'RS-RB-001', type: 'Runbook', title: 'Endpoint Isolation Runbook', description: 'Steps to isolate compromised endpoint via EDR.', subcategoryId: 'RS.MI-01', categoryId: 'RS.MI', functionId: 'RS', priority: 'Critical', phase: 1, effort: 1, status: 'Not Started', isoRef: ['5.26'], dimension: 'Process' },
    { id: 'RS-RB-002', type: 'Runbook', title: 'Credential Reset Runbook', description: 'Force password reset and MFA re-enrollment.', subcategoryId: 'RS.MI-02', categoryId: 'RS.MI', functionId: 'RS', priority: 'High', phase: 1, effort: 1, status: 'Not Started', isoRef: ['5.17'], dimension: 'Process' },

    // =========================================================================
    // RECOVER (RC) Items
    // =========================================================================

    // RC.RP - Incident Recovery Plan Execution
    { id: 'RC-POL-001', type: 'Policy', title: 'Business Continuity Policy', description: 'BIA requirements, RTO/RPO targets, and continuity planning.', subcategoryId: 'RC.RP-01', categoryId: 'RC.RP', functionId: 'RC', priority: 'High', phase: 2, effort: 7, status: 'Not Started', isoRef: ['5.29', '5.30'], dimension: 'Process' },
    { id: 'RC-POL-002', type: 'Policy', title: 'Backup Policy', description: 'Backup frequency, testing, and 3-2-1 strategy requirements.', subcategoryId: 'RC.RP-02', categoryId: 'RC.RP', functionId: 'RC', priority: 'Critical', phase: 1, effort: 3, status: 'Not Started', isoRef: ['8.13'], dimension: 'Process' },
    { id: 'RC-SOP-001', type: 'SOP', title: 'Backup Verification Procedure', description: 'Testing backup integrity and restore capability.', subcategoryId: 'RC.RP-02', categoryId: 'RC.RP', functionId: 'RC', priority: 'High', phase: 1, effort: 2, status: 'Not Started', isoRef: ['8.13'], dimension: 'Process' },
    { id: 'RC-SOP-002', type: 'SOP', title: 'Data Restore Procedure', description: 'Steps to restore data from backups.', subcategoryId: 'RC.RP-02', categoryId: 'RC.RP', functionId: 'RC', priority: 'High', phase: 1, effort: 2, status: 'Not Started', isoRef: ['8.13'], dimension: 'Process' },
    { id: 'RC-PB-001', type: 'Playbook', title: 'BC/DR Activation Playbook', description: 'Steps to activate continuity and recovery plans.', subcategoryId: 'RC.RP-01', categoryId: 'RC.RP', functionId: 'RC', priority: 'High', phase: 2, effort: 5, status: 'Not Started', isoRef: ['5.30'], dimension: 'Process' },
    { id: 'RC-RB-001', type: 'Runbook', title: 'DR Failover Runbook', description: 'Technical steps for failover to DR site.', subcategoryId: 'RC.RP-04', categoryId: 'RC.RP', functionId: 'RC', priority: 'High', phase: 3, effort: 5, status: 'Not Started', isoRef: ['5.30'], dimension: 'Process' },

    // RC.CO - Incident Recovery Communication
    { id: 'RC-SOP-003', type: 'SOP', title: 'Post-Incident Review Procedure', description: 'Lessons learned and improvement actions after incidents.', subcategoryId: 'RC.CO-03', categoryId: 'RC.CO', functionId: 'RC', priority: 'Medium', phase: 2, effort: 2, status: 'Not Started', isoRef: ['5.27'], dimension: 'Process' }
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export const getAllItems = () => PROGRAM_ITEMS;

export const getItemsByFunction = (functionId) =>
    PROGRAM_ITEMS.filter(item => item.functionId === functionId);

export const getItemsByCategory = (categoryId) =>
    PROGRAM_ITEMS.filter(item => item.categoryId === categoryId);

export const getItemsBySubcategory = (subcategoryId) =>
    PROGRAM_ITEMS.filter(item => item.subcategoryId === subcategoryId);

export const getItemsByType = (type) =>
    PROGRAM_ITEMS.filter(item => item.type === type);

export const getItemsByStatus = (status) =>
    PROGRAM_ITEMS.filter(item => item.status === status);

export const getItemsByPhase = (phase) =>
    PROGRAM_ITEMS.filter(item => item.phase === phase);

export const getItemsByDimension = (dimension) =>
    PROGRAM_ITEMS.filter(item => item.dimension === dimension);
