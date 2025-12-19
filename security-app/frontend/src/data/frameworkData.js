// =============================================================================
// NIST CSF 2.0 COMPLETE FRAMEWORK DATA
// =============================================================================
// Full hierarchy: Functions → Categories → Subcategories
// Based on NIST Cybersecurity Framework 2.0 (February 2024)
// =============================================================================

// Document and control types
export const DOCUMENT_TYPES = {
    Policy: { icon: '📜', color: '#00ff9d', label: 'Policy', description: 'High-level mandates' },
    Standard: { icon: '📏', color: '#0088ff', label: 'Standard', description: 'Mandatory requirements' },
    SOP: { icon: '📋', color: '#ff9900', label: 'SOP', description: 'Step-by-step procedures' },
    Playbook: { icon: '📖', color: '#aa44ff', label: 'Playbook', description: 'Incident response guides' },
    Runbook: { icon: '⚙️', color: '#44aaff', label: 'Runbook', description: 'Technical execution' },
    Guideline: { icon: '💡', color: '#ffcc00', label: 'Guideline', description: 'Best practices' },
    Control: { icon: '🛡️', color: '#ff4488', label: 'Control', description: 'Technical safeguard' }
};

// Status options
export const STATUS_OPTIONS = ['Not Started', 'Draft', 'Published', 'Implemented'];

// =============================================================================
// NIST CSF 2.0 - COMPLETE SUBCATEGORY DEFINITIONS
// =============================================================================

export const NIST_CSF_2 = {
    // =========================================================================
    // GOVERN (GV) - 6 Categories, 17 Subcategories
    // =========================================================================
    GV: {
        id: 'GV',
        name: 'GOVERN',
        color: '#00ff9d',
        icon: '🏛️',
        description: 'Establish and monitor the organization\'s cybersecurity risk management strategy, expectations, and policy.',
        categories: {
            'GV.OC': {
                id: 'GV.OC',
                name: 'Organizational Context',
                description: 'The circumstances surrounding the organization\'s cybersecurity risk management decisions are understood.',
                subcategories: [
                    { id: 'GV.OC-01', text: 'The organizational mission is understood and informs cybersecurity risk management' },
                    { id: 'GV.OC-02', text: 'Internal and external stakeholders are understood, and their needs and expectations regarding cybersecurity risk management are understood and considered' },
                    { id: 'GV.OC-03', text: 'Legal, regulatory, and contractual requirements regarding cybersecurity — including privacy and civil liberties obligations — are understood and managed' },
                    { id: 'GV.OC-04', text: 'Critical objectives, capabilities, and services that stakeholders depend on or expect are understood and communicated' },
                    { id: 'GV.OC-05', text: 'Outcomes, capabilities, and services that the organization depends on are understood and communicated' }
                ]
            },
            'GV.RM': {
                id: 'GV.RM',
                name: 'Risk Management Strategy',
                description: 'The organization\'s priorities, constraints, risk tolerance, and assumptions are established and used to support operational risk decisions.',
                subcategories: [
                    { id: 'GV.RM-01', text: 'Risk management objectives are established and agreed to by organizational stakeholders' },
                    { id: 'GV.RM-02', text: 'Risk appetite and risk tolerance statements are established, communicated, and maintained' },
                    { id: 'GV.RM-03', text: 'Cybersecurity risk management activities and outcomes are included in enterprise risk management processes' },
                    { id: 'GV.RM-04', text: 'Strategic direction that describes appropriate risk response options is established and communicated' },
                    { id: 'GV.RM-05', text: 'Lines of communication across the organization are established for cybersecurity risks' },
                    { id: 'GV.RM-06', text: 'A standardized method for calculating, documenting, categorizing, and prioritizing cybersecurity risks is established and communicated' },
                    { id: 'GV.RM-07', text: 'Strategic opportunities are characterized and communicated to inform cybersecurity strategies' }
                ]
            },
            'GV.RR': {
                id: 'GV.RR',
                name: 'Roles, Responsibilities, and Authorities',
                description: 'Cybersecurity roles, responsibilities, and authorities to foster accountability, performance assessment, and improvement are established and communicated.',
                subcategories: [
                    { id: 'GV.RR-01', text: 'Organizational leadership is responsible and accountable for cybersecurity risk' },
                    { id: 'GV.RR-02', text: 'Roles, responsibilities, and authorities for cybersecurity risk management are established, communicated, understood, and enforced' },
                    { id: 'GV.RR-03', text: 'Adequate resources are allocated to support the cybersecurity program' },
                    { id: 'GV.RR-04', text: 'Cybersecurity is included in human resources practices' }
                ]
            },
            'GV.PO': {
                id: 'GV.PO',
                name: 'Policy',
                description: 'Organizational cybersecurity policy is established, communicated, and enforced.',
                subcategories: [
                    { id: 'GV.PO-01', text: 'A policy for managing cybersecurity risks is established based on organizational context, cybersecurity strategy, and priorities' },
                    { id: 'GV.PO-02', text: 'Policy is reviewed, updated, and communicated as required to maintain relevance and respond to changes in requirements, threats, technology, and organizational mission' }
                ]
            },
            'GV.OV': {
                id: 'GV.OV',
                name: 'Oversight',
                description: 'Results of organization-wide cybersecurity risk management activities and performance are used to inform, improve, and adjust the risk management strategy.',
                subcategories: [
                    { id: 'GV.OV-01', text: 'Cybersecurity risk management strategy outcomes are reviewed to inform and adjust strategy and direction' },
                    { id: 'GV.OV-02', text: 'The cybersecurity risk management strategy is reviewed and adjusted to ensure coverage of organizational requirements and risks' },
                    { id: 'GV.OV-03', text: 'Organizational cybersecurity risk management performance is evaluated and reviewed for adjustments needed' }
                ]
            },
            'GV.SC': {
                id: 'GV.SC',
                name: 'Cybersecurity Supply Chain Risk Management',
                description: 'Cyber supply chain risk management processes are identified, established, managed, monitored, and improved.',
                subcategories: [
                    { id: 'GV.SC-01', text: 'A cybersecurity supply chain risk management program, strategy, and policy are established' },
                    { id: 'GV.SC-02', text: 'Cybersecurity roles and responsibilities for suppliers, customers, and partners are established and coordinated' },
                    { id: 'GV.SC-03', text: 'Cybersecurity supply chain risk management is integrated into overall risk management processes' },
                    { id: 'GV.SC-04', text: 'Suppliers are known and prioritized by criticality' },
                    { id: 'GV.SC-05', text: 'Requirements to address cybersecurity risks are included in contracts' },
                    { id: 'GV.SC-06', text: 'Planning and due diligence are performed to reduce risks before entering into supplier relationships' },
                    { id: 'GV.SC-07', text: 'Risks posed by a supplier are understood, recorded, and monitored throughout the relationship' },
                    { id: 'GV.SC-08', text: 'Relevant suppliers and third-party partners are included in incident planning and response activities' },
                    { id: 'GV.SC-09', text: 'Supply chain security practices are integrated into cybersecurity and risk programs' },
                    { id: 'GV.SC-10', text: 'Cybersecurity supply chain risk management plans include provisions for activities after the conclusion of partnerships' }
                ]
            }
        }
    },

    // =========================================================================
    // IDENTIFY (ID) - 3 Categories, 10 Subcategories
    // =========================================================================
    ID: {
        id: 'ID',
        name: 'IDENTIFY',
        color: '#0088ff',
        icon: '🔍',
        description: 'Understand the organization\'s current cybersecurity risk posture to prioritize actions aligned with its mission and risk management strategy.',
        categories: {
            'ID.AM': {
                id: 'ID.AM',
                name: 'Asset Management',
                description: 'Assets that enable the organization to achieve business purposes are identified and managed.',
                subcategories: [
                    { id: 'ID.AM-01', text: 'Inventories of hardware managed by the organization are maintained' },
                    { id: 'ID.AM-02', text: 'Inventories of software, services, and systems managed by the organization are maintained' },
                    { id: 'ID.AM-03', text: 'Representations of authorized network communication and internal and external data flows are maintained' },
                    { id: 'ID.AM-04', text: 'Inventories of services provided by suppliers are maintained' },
                    { id: 'ID.AM-05', text: 'Assets are prioritized based on classification, criticality, resources, and impact on the mission' },
                    { id: 'ID.AM-07', text: 'Inventories of data and corresponding metadata for designated data types are maintained' },
                    { id: 'ID.AM-08', text: 'Systems, hardware, software, and services are managed throughout their life cycles' }
                ]
            },
            'ID.RA': {
                id: 'ID.RA',
                name: 'Risk Assessment',
                description: 'Assets are identified and the risks to those assets are understood.',
                subcategories: [
                    { id: 'ID.RA-01', text: 'Vulnerabilities in assets are identified, validated, and recorded' },
                    { id: 'ID.RA-02', text: 'Cyber threat intelligence is received from information sharing forums and sources' },
                    { id: 'ID.RA-03', text: 'Internal and external threats to the organization are identified and recorded' },
                    { id: 'ID.RA-04', text: 'Potential impacts and likelihoods of threats exploiting vulnerabilities are identified and recorded' },
                    { id: 'ID.RA-05', text: 'Threats, vulnerabilities, likelihoods, and impacts are used to understand inherent risk and inform risk response' },
                    { id: 'ID.RA-06', text: 'Risk responses are chosen, prioritized, and implemented' },
                    { id: 'ID.RA-07', text: 'Changes and exceptions are managed, assessed for risk impact, and documented' },
                    { id: 'ID.RA-08', text: 'Processes for receiving, analyzing, and responding to vulnerability disclosures are established' },
                    { id: 'ID.RA-09', text: 'The authenticity and integrity of hardware and software are assessed prior to deployment' },
                    { id: 'ID.RA-10', text: 'Critical suppliers are assessed prior to acquisition' }
                ]
            },
            'ID.IM': {
                id: 'ID.IM',
                name: 'Improvement',
                description: 'Improvements to organizational cybersecurity are identified from findings.',
                subcategories: [
                    { id: 'ID.IM-01', text: 'Improvements are identified from evaluations' },
                    { id: 'ID.IM-02', text: 'Improvements are identified from security tests, exercises, and incidents' },
                    { id: 'ID.IM-03', text: 'Improvements are identified from execution of operational processes' },
                    { id: 'ID.IM-04', text: 'Incident response plans incorporate lessons learned' }
                ]
            }
        }
    },

    // =========================================================================
    // PROTECT (PR) - 5 Categories, 27 Subcategories
    // =========================================================================
    PR: {
        id: 'PR',
        name: 'PROTECT',
        color: '#ff9900',
        icon: '🛡️',
        description: 'Implement safeguards to ensure delivery of critical services and reduce the likelihood and impact of adverse cybersecurity events.',
        categories: {
            'PR.AA': {
                id: 'PR.AA',
                name: 'Identity Management, Authentication, and Access Control',
                description: 'Access to physical and logical assets is limited to authorized users, services, and hardware.',
                subcategories: [
                    { id: 'PR.AA-01', text: 'Identities and credentials are issued, managed, revoked, and audited for authorized devices, users, and services' },
                    { id: 'PR.AA-02', text: 'Identities are proofed and bound to credentials based on context of interactions' },
                    { id: 'PR.AA-03', text: 'Users, services, and hardware are authenticated' },
                    { id: 'PR.AA-04', text: 'Identity assertions are protected, conveyed, and verified' },
                    { id: 'PR.AA-05', text: 'Access permissions, entitlements, and authorizations are defined, managed, enforced, and reviewed' },
                    { id: 'PR.AA-06', text: 'Physical access to assets is managed, monitored, and enforced' }
                ]
            },
            'PR.AT': {
                id: 'PR.AT',
                name: 'Awareness and Training',
                description: 'The organization\'s personnel are provided with cybersecurity awareness and training.',
                subcategories: [
                    { id: 'PR.AT-01', text: 'Personnel are provided with awareness and training so they possess knowledge and skills to perform tasks with cybersecurity risks in mind' },
                    { id: 'PR.AT-02', text: 'Individuals in specialized roles are provided awareness and training for their roles and responsibilities' }
                ]
            },
            'PR.DS': {
                id: 'PR.DS',
                name: 'Data Security',
                description: 'Data are managed consistent with the organization\'s risk strategy to protect the confidentiality, integrity, and availability of information.',
                subcategories: [
                    { id: 'PR.DS-01', text: 'The confidentiality, integrity, and availability of data-at-rest are protected' },
                    { id: 'PR.DS-02', text: 'The confidentiality, integrity, and availability of data-in-transit are protected' },
                    { id: 'PR.DS-10', text: 'The confidentiality, integrity, and availability of data-in-use are protected' },
                    { id: 'PR.DS-11', text: 'Backups of data are created, protected, maintained, and tested' }
                ]
            },
            'PR.PS': {
                id: 'PR.PS',
                name: 'Platform Security',
                description: 'The hardware, software, and services of physical and virtual platforms are managed consistent with the organization\'s risk strategy.',
                subcategories: [
                    { id: 'PR.PS-01', text: 'Configuration management practices are established and applied' },
                    { id: 'PR.PS-02', text: 'Software is maintained, replaced, and removed in accordance with policy' },
                    { id: 'PR.PS-03', text: 'Hardware is maintained, replaced, and removed in accordance with policy' },
                    { id: 'PR.PS-04', text: 'Log records are generated and available for continuous monitoring' },
                    { id: 'PR.PS-05', text: 'Installation and execution of unauthorized software is prevented' },
                    { id: 'PR.PS-06', text: 'Secure software development practices are integrated into the software development life cycle' }
                ]
            },
            'PR.IR': {
                id: 'PR.IR',
                name: 'Technology Infrastructure Resilience',
                description: 'Security architectures are managed with the organization\'s risk strategy to protect asset confidentiality, integrity, and availability.',
                subcategories: [
                    { id: 'PR.IR-01', text: 'Networks and environments are protected from unauthorized logical access and use' },
                    { id: 'PR.IR-02', text: 'Technology assets are protected from environmental threats' },
                    { id: 'PR.IR-03', text: 'Mechanisms are implemented to achieve resilience requirements in normal and adverse situations' },
                    { id: 'PR.IR-04', text: 'Adequate resource capacity to ensure availability is maintained' }
                ]
            }
        }
    },

    // =========================================================================
    // DETECT (DE) - 2 Categories, 8 Subcategories
    // =========================================================================
    DE: {
        id: 'DE',
        name: 'DETECT',
        color: '#aa44ff',
        icon: '👁️',
        description: 'Implement activities to identify the occurrence of cybersecurity events in a timely manner.',
        categories: {
            'DE.CM': {
                id: 'DE.CM',
                name: 'Continuous Monitoring',
                description: 'Assets are monitored to find anomalies, indicators of compromise, and other potentially adverse events.',
                subcategories: [
                    { id: 'DE.CM-01', text: 'Networks and network services are monitored to find potentially adverse events' },
                    { id: 'DE.CM-02', text: 'The physical environment is monitored to find potentially adverse events' },
                    { id: 'DE.CM-03', text: 'Computing hardware and software, runtime environments, and their data are monitored to find potentially adverse events' },
                    { id: 'DE.CM-06', text: 'External service provider activities and services are monitored to find potentially adverse events' },
                    { id: 'DE.CM-09', text: 'Personnel activity and technology usage are monitored to find potentially adverse events' }
                ]
            },
            'DE.AE': {
                id: 'DE.AE',
                name: 'Adverse Event Analysis',
                description: 'Anomalies, indicators of compromise, and other potentially adverse events are analyzed to characterize the events.',
                subcategories: [
                    { id: 'DE.AE-02', text: 'Potentially adverse events are analyzed to understand methods of attack and targets' },
                    { id: 'DE.AE-03', text: 'Event data are correlated from multiple sources' },
                    { id: 'DE.AE-04', text: 'The estimated impact and scope of adverse events are understood' },
                    { id: 'DE.AE-06', text: 'Information on adverse events is provided to authorized staff and tools' },
                    { id: 'DE.AE-07', text: 'Cyber threat intelligence and vulnerability information are used to analyze events' },
                    { id: 'DE.AE-08', text: 'Incidents are declared when adverse events meet defined criteria' }
                ]
            }
        }
    },

    // =========================================================================
    // RESPOND (RS) - 4 Categories, 13 Subcategories
    // =========================================================================
    RS: {
        id: 'RS',
        name: 'RESPOND',
        color: '#ff4444',
        icon: '🚨',
        description: 'Take action regarding a detected cybersecurity incident to minimize its impact.',
        categories: {
            'RS.MA': {
                id: 'RS.MA',
                name: 'Incident Management',
                description: 'Responses to detected cybersecurity incidents are managed.',
                subcategories: [
                    { id: 'RS.MA-01', text: 'The incident response plan is executed in coordination with relevant third parties' },
                    { id: 'RS.MA-02', text: 'Incident reports are triaged and validated' },
                    { id: 'RS.MA-03', text: 'Incidents are categorized and prioritized' },
                    { id: 'RS.MA-04', text: 'Incidents are escalated or elevated as needed' },
                    { id: 'RS.MA-05', text: 'The criteria for initiating incident recovery are applied' }
                ]
            },
            'RS.AN': {
                id: 'RS.AN',
                name: 'Incident Analysis',
                description: 'Investigations are conducted to ensure effective response and support forensics and recovery activities.',
                subcategories: [
                    { id: 'RS.AN-03', text: 'Analysis is performed to establish what has taken place during an incident and the root cause' },
                    { id: 'RS.AN-06', text: 'Actions performed during an investigation are recorded, and investigation integrity is preserved' },
                    { id: 'RS.AN-07', text: 'Incident data are collected, and their integrity and provenance are preserved' },
                    { id: 'RS.AN-08', text: 'Incidents are analyzed to identify indicators of compromise and attacker tactics, techniques, and procedures' }
                ]
            },
            'RS.CO': {
                id: 'RS.CO',
                name: 'Incident Response Reporting and Communication',
                description: 'Response activities are coordinated with internal and external stakeholders as required.',
                subcategories: [
                    { id: 'RS.CO-02', text: 'Internal and external stakeholders are notified of incidents in accordance with requirements' },
                    { id: 'RS.CO-03', text: 'Information is shared with designated internal and external stakeholders' }
                ]
            },
            'RS.MI': {
                id: 'RS.MI',
                name: 'Incident Mitigation',
                description: 'Activities are performed to prevent expansion of an event and mitigate its effects.',
                subcategories: [
                    { id: 'RS.MI-01', text: 'Incidents are contained' },
                    { id: 'RS.MI-02', text: 'Incidents are eradicated' }
                ]
            }
        }
    },

    // =========================================================================
    // RECOVER (RC) - 2 Categories, 6 Subcategories
    // =========================================================================
    RC: {
        id: 'RC',
        name: 'RECOVER',
        color: '#44aaff',
        icon: '🔄',
        description: 'Restore capabilities or services impaired due to a cybersecurity incident to return to normal operations.',
        categories: {
            'RC.RP': {
                id: 'RC.RP',
                name: 'Incident Recovery Plan Execution',
                description: 'Restoration activities are performed to ensure operational availability of systems and services.',
                subcategories: [
                    { id: 'RC.RP-01', text: 'The incident recovery portion of the incident response plan is executed once initiated from the incident response process' },
                    { id: 'RC.RP-02', text: 'Recovery actions are verified to restore affected assets to operational status' },
                    { id: 'RC.RP-03', text: 'Mission-critical functions are prioritized for restoration' },
                    { id: 'RC.RP-04', text: 'System reconstitution is completed to return to normal operations' },
                    { id: 'RC.RP-05', text: 'Integrity of restored assets is verified before returning to production' },
                    { id: 'RC.RP-06', text: 'End of incident recovery is declared based on criteria and authorized by designated stakeholders' }
                ]
            },
            'RC.CO': {
                id: 'RC.CO',
                name: 'Incident Recovery Communication',
                description: 'Restoration activities are coordinated with internal and external parties.',
                subcategories: [
                    { id: 'RC.CO-03', text: 'Recovery activities and progress are communicated to internal stakeholders and management' },
                    { id: 'RC.CO-04', text: 'Public updates on incident recovery are shared using approved methods and messaging' }
                ]
            }
        }
    }
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get all functions
 */
export const getAllFunctions = () => Object.values(NIST_CSF_2);

/**
 * Get all categories for a function
 */
export const getCategoriesForFunction = (functionId) => {
    const fn = NIST_CSF_2[functionId];
    return fn ? Object.values(fn.categories) : [];
};

/**
 * Get all subcategories for a category
 */
export const getSubcategoriesForCategory = (functionId, categoryId) => {
    const fn = NIST_CSF_2[functionId];
    if (!fn) return [];
    const cat = fn.categories[categoryId];
    return cat ? cat.subcategories : [];
};

/**
 * Get a flattened list of all subcategories
 */
export const getAllSubcategories = () => {
    const subcats = [];
    Object.values(NIST_CSF_2).forEach(fn => {
        Object.values(fn.categories).forEach(cat => {
            cat.subcategories.forEach(subcat => {
                subcats.push({
                    ...subcat,
                    functionId: fn.id,
                    functionName: fn.name,
                    categoryId: cat.id,
                    categoryName: cat.name
                });
            });
        });
    });
    return subcats;
};

/**
 * Count subcategories per function
 */
export const getSubcategoryCountByFunction = () => {
    const counts = {};
    Object.entries(NIST_CSF_2).forEach(([key, fn]) => {
        let count = 0;
        Object.values(fn.categories).forEach(cat => {
            count += cat.subcategories.length;
        });
        counts[key] = count;
    });
    return counts;
};

/**
 * Total counts
 */
export const getFrameworkStats = () => {
    let totalCategories = 0;
    let totalSubcategories = 0;

    Object.values(NIST_CSF_2).forEach(fn => {
        Object.values(fn.categories).forEach(cat => {
            totalCategories++;
            totalSubcategories += cat.subcategories.length;
        });
    });

    return {
        functions: Object.keys(NIST_CSF_2).length,
        categories: totalCategories,
        subcategories: totalSubcategories
    };
};
