export const FULL_BASELINE_CONTROLS = [
    // --- IDENTITY & ACCESS (The Perimeter) ---
    {
        id: "UC-AC-01",
        title: "Access Control Policy",
        domain: "Identity & Access",
        phase: 1,
        description: "Define and document rules for data access (RBAC), user lifecycle, and privilege management.",
        implementation_guidance: "Create a policy defining 'Least Privilege'. Ban shared accounts. Requre managerial approval for all new access.",
        evidence_requirements: [{ id: "EV-AC-01", name: "Access Control Policy (Signed)", frequency: "Annual" }],
        framework_mappings: { nist_csf_2: ["PR.AA-01"], nist_800_53_r5: ["AC-1"], iso_27002_2022: ["5.15"] },
        priority: "Critical", status: "Not Started", effort: 1, risk_reduction: 5
    },
    {
        id: "UC-AC-02",
        title: "Multi-Factor Authentication (MFA)",
        domain: "Identity & Access",
        phase: 1,
        description: "Enforce MFA for all user access to cloud applications, VPNs, and privileged accounts.",
        implementation_guidance: "Enforce via IdP (Okta/Azure). SMS is acceptable for Tier 2, but push/hardware keys required for Admins.",
        evidence_requirements: [{ id: "EV-AC-02", name: "MFA Configuration Config", frequency: "Quarterly" }],
        framework_mappings: { nist_csf_2: ["PR.AA-03"], nist_800_53_r5: ["IA-2"], iso_27002_2022: ["5.17", "8.5"] },
        priority: "Critical", status: "Not Started", effort: 2, risk_reduction: 10
    },
    {
        id: "UC-AC-03",
        title: "Privileged Access Management (PAM)",
        domain: "Identity & Access",
        phase: 2,
        description: "Restrict and monitor the use of administrative privileges.",
        implementation_guidance: "Dedicated admin accounts (admin_jdoe). No day-to-day browsing as admin. Vault passwords.",
        evidence_requirements: [{ id: "EV-AC-03", name: "Admin Group Membership Review", frequency: "Quarterly" }],
        framework_mappings: { nist_csf_2: ["PR.AA-05"], nist_800_53_r5: ["AC-6"], iso_27002_2022: ["8.2"] },
        priority: "High", status: "Not Started", effort: 3, risk_reduction: 8
    },
    {
        id: "UC-AC-04",
        title: "Offboarding & Deprovisioning",
        domain: "Identity & Access",
        phase: 1,
        description: "Revoke access within 24 hours of employee termination.",
        implementation_guidance: "Automate via HRIS linkage if possible. Otherwise, manual ticket required Day 0 of departure.",
        evidence_requirements: [{ id: "EV-AC-04", name: "Terminated User Sample Test", frequency: "Quarterly" }],
        framework_mappings: { nist_csf_2: ["PR.AA-06"], nist_800_53_r5: ["PS-4"], iso_27002_2022: ["6.5"] },
        priority: "Critical", status: "Not Started", effort: 2, risk_reduction: 9
    },

    // --- ASSET MANAGEMENT & ENDPOINT (The Fleet) ---
    {
        id: "UC-AM-01",
        title: "Hardware Asset Inventory",
        domain: "Asset Management",
        phase: 1,
        description: "Maintain an automated inventory of all physical devices.",
        implementation_guidance: "Deploy RMM/EDR agents to auto-discover. Block unmanaged devices from Corp Net.",
        evidence_requirements: [{ id: "EV-AM-01", name: "Asset List Export", frequency: "Monthly" }],
        framework_mappings: { nist_csf_2: ["ID.AM-01"], nist_800_53_r5: ["CM-8"], iso_27002_2022: ["5.9"] },
        priority: "High", status: "Not Started", effort: 3, risk_reduction: 7
    },
    {
        id: "UC-AM-02",
        title: "Software Inventory (SaaS & Apps)",
        domain: "Asset Management",
        phase: 2,
        description: "Identify and list all authorized software and SaaS applications.",
        implementation_guidance: "Connect to IdP to see OAuth grants. Use expense reports to find Shadow IT.",
        evidence_requirements: [{ id: "EV-AM-02", name: "Approved Software List", frequency: "Quarterly" }],
        framework_mappings: { nist_csf_2: ["ID.AM-02"], nist_800_53_r5: ["CM-8"], iso_27002_2022: ["5.9"] },
        priority: "Medium", status: "Not Started", effort: 4, risk_reduction: 5
    },
    {
        id: "UC-DE-01",
        title: "Endpoint Defense (EDR/NGAV)",
        domain: "Endpoint Security",
        phase: 1,
        description: "Deploy EDR agents to all workstations and servers with 'Block' mode enabled.",
        implementation_guidance: "CrowdStrike/SentinelOne/Defender. Ensure no exemptions for VIPs.",
        evidence_requirements: [{ id: "EV-DE-01", name: "EDR Coverage Report", frequency: "Monthly" }],
        framework_mappings: { nist_csf_2: ["DE.CM-01"], nist_800_53_r5: ["SI-4"], iso_27002_2022: ["8.7"] },
        priority: "Critical", status: "Not Started", effort: 3, risk_reduction: 10
    },
    {
        id: "UC-DE-02",
        title: "Disk Encryption",
        domain: "Endpoint Security",
        phase: 1,
        description: "Encrypt data at rest on all laptops and portable devices (BitLocker/FileVault).",
        implementation_guidance: "Enforce via MDM. Escrow keys to AD/Cloud for recovery.",
        evidence_requirements: [{ id: "EV-DE-02", name: "Encryption Compliance Report", frequency: "Monthly" }],
        framework_mappings: { nist_csf_2: ["PR.DS-01"], nist_800_53_r5: ["SC-28"], iso_27002_2022: ["8.1"] },
        priority: "High", status: "Not Started", effort: 2, risk_reduction: 8
    },
    {
        id: "UC-VM-01",
        title: "Vulnerability Management",
        domain: "Endpoint Security",
        phase: 2,
        description: "Regularly scan for and patch Critical/High vulnerabilities.",
        implementation_guidance: "Patch OS/Browsers within 14 days of release. use Auto-Update where possible.",
        evidence_requirements: [{ id: "EV-VM-01", name: "Vuln Scan Report (Clean)", frequency: "Monthly" }],
        framework_mappings: { nist_csf_2: ["ID.RA-01"], nist_800_53_r5: ["RA-5"], iso_27002_2022: ["8.8"] },
        priority: "High", status: "Not Started", effort: 5, risk_reduction: 9
    },

    // --- NETWORK & INFRASTRUCTURE ---
    {
        id: "UC-NW-01",
        title: "Network Perimeter Defense",
        domain: "Network Security",
        phase: 1,
        description: "Deny strictly all inbound traffic by default. Use Firewalls/Security Groups.",
        implementation_guidance: "No open RDP/SSH to internet. Use VPN or Zero Trust Proxy.",
        evidence_requirements: [{ id: "EV-NW-01", name: "Firewall Rules Review", frequency: "Annual" }],
        framework_mappings: { nist_csf_2: ["PR.AC-05"], nist_800_53_r5: ["SC-7"], iso_27002_2022: ["8.20"] },
        priority: "Critical", status: "Not Started", effort: 2, risk_reduction: 9
    },
    {
        id: "UC-NW-02",
        title: "Wi-Fi Security",
        domain: "Network Security",
        phase: 1,
        description: "Segregate Guest and Corporate Wi-Fi networks.",
        implementation_guidance: "WPA2/3 Enterprise for Corp. Isolated VLAN for Guest (no internal access).",
        evidence_requirements: [{ id: "EV-NW-02", name: "Wireless Config Screenshot", frequency: "Annual" }],
        framework_mappings: { nist_csf_2: ["PR.AC-05"], nist_800_53_r5: ["AC-18"], iso_27002_2022: ["8.23"] },
        priority: "Medium", status: "Not Started", effort: 2, risk_reduction: 6
    },
    {
        id: "UC-BK-01",
        title: "Data Backup & Restore",
        domain: "Resilience",
        phase: 1,
        description: "Maintain strictly isolated (immutable) backups of critical data.",
        implementation_guidance: "3-2-1 Rule. Ensure one copy is offsite or in a separate cloud account.",
        evidence_requirements: [{ id: "EV-BK-01", name: "Restore Test Log", frequency: "Quarterly" }],
        framework_mappings: { nist_csf_2: ["PR.IP-04"], nist_800_53_r5: ["CP-9"], iso_27002_2022: ["8.13"] },
        priority: "Critical", status: "Not Started", effort: 3, risk_reduction: 10
    },

    // --- GOVERNANCE & PEOPLE ---
    {
        id: "UC-GV-01",
        title: "Security Awareness Training",
        domain: "Human Resources",
        phase: 1,
        description: "Train all employees on security basics upon hire and annually.",
        implementation_guidance: "Cover Phishing, Password Safety, and Data Classification. Use KnowBe4/Proofpoint.",
        evidence_requirements: [{ id: "EV-GV-01", name: "Training Completion Report", frequency: "Annual" }],
        framework_mappings: { nist_csf_2: ["PR.AT-01"], nist_800_53_r5: ["AT-2"], iso_27002_2022: ["6.3"] },
        priority: "High", status: "Not Started", effort: 2, risk_reduction: 7
    },
    {
        id: "UC-GV-02",
        title: "Phishing Simulation",
        domain: "Human Resources",
        phase: 2,
        description: "Test employees with simulated phishing attacks to reinforce training.",
        implementation_guidance: "Monthly/Quarterly sims. Do not punish clickers; re-train them.",
        evidence_requirements: [{ id: "EV-GV-02", name: "Phishing Campaign Stats", frequency: "Quarterly" }],
        framework_mappings: { nist_csf_2: ["ID.RA-03"], nist_800_53_r5: ["AT-2(2)"], iso_27002_2022: ["6.3"] },
        priority: "Medium", status: "Not Started", effort: 3, risk_reduction: 6
    },
    {
        id: "UC-GV-03",
        title: "Vendor Risk Management",
        domain: "Supply Chain",
        phase: 2,
        description: "Assess security of critical third-party suppliers.",
        implementation_guidance: "Review SOC 2 reports for critical SaaS. Sign DPAs (Data Processing Agreements).",
        evidence_requirements: [{ id: "EV-GV-03", name: "Critical Vendor Review Log", frequency: "Annual" }],
        framework_mappings: { nist_csf_2: ["GV.SC-04"], nist_800_53_r5: ["SR-2"], iso_27002_2022: ["5.19"] },
        priority: "Medium", status: "Not Started", effort: 4, risk_reduction: 6
    },
    {
        id: "UC-IR-01",
        title: "Incident Response Plan",
        domain: "Incident Response",
        phase: 1,
        description: "Maintain a document guiding response to cyber incidents.",
        implementation_guidance: "Keep it simple: Roles, Call Trees, Cyber Insurance Hotline.",
        evidence_requirements: [{ id: "EV-IR-01", name: "IR Plan (PDF)", frequency: "Annual" }],
        framework_mappings: { nist_csf_2: ["RS.MA-01"], nist_800_53_r5: ["IR-2"], iso_27002_2022: ["5.24"] },
        priority: "High", status: "Not Started", effort: 2, risk_reduction: 8
    },
    {
        id: "UC-LG-01",
        title: "Audit Logging",
        domain: "Monitoring",
        phase: 2,
        description: "Retain logs for critical systems for at least 30-90 days.",
        implementation_guidance: "Centralize logs if possible (SIEM is Phase 3). Ensure IdP and Firewall logs are kept.",
        evidence_requirements: [{ id: "EV-LG-01", name: "Log Retention Configuration", frequency: "Annual" }],
        framework_mappings: { nist_csf_2: ["DE.AE-03"], nist_800_53_r5: ["AU-2"], iso_27002_2022: ["8.10"] },
        priority: "Medium", status: "Not Started", effort: 3, risk_reduction: 7
    }
];

export const FULL_BASELINE_RISKS = [
    {
        id: "RISK-01",
        title: "Ransomware Operations Halt",
        scenario: "Ransomware causing prolonged operational downtime",
        description: "Malware encrypts critical sales/shipping systems (ERP/WMS), halting revenue.",
        category: "Operational",
        status: "Open",
        scores: { inherent: { likelihood: 4, impact: 5, total: 20, label: "CRITICAL" }, residual: { likelihood: 2, impact: 4, total: 8, label: "MEDIUM" } },
        treatment_plan: "Mitigate",
        key_controls: ["UC-AC-02", "UC-DE-01", "UC-BK-01", "UC-IR-01"]
    },
    {
        id: "RISK-02",
        title: "Wire Fraud (BEC)",
        scenario: "CFO Impersonation leads to financial loss",
        description: "Attacker impersonates Exec/Vendor to trick Finance into wiring funds.",
        category: "Financial",
        status: "Open",
        scores: { inherent: { likelihood: 5, impact: 4, total: 20, label: "CRITICAL" }, residual: { likelihood: 3, impact: 4, total: 12, label: "HIGH" } },
        treatment_plan: "Mitigate",
        key_controls: ["UC-AC-02", "UC-GV-01", "UC-AC-03"]
    },
    {
        id: "RISK-03",
        title: "Data Leak (Customer List)",
        scenario: "Exfiltration of sensitive customer data",
        description: "Sensitive customer list exported from CRM by unauthorized user.",
        category: "Data",
        status: "Open",
        scores: { inherent: { likelihood: 4, impact: 3, total: 12, label: "HIGH" }, residual: { likelihood: 3, impact: 2, total: 6, label: "LOW" } },
        treatment_plan: "Transfer",
        key_controls: ["UC-AC-01", "UC-AC-04", "UC-AM-02"]
    },
    {
        id: "RISK-04",
        title: "Vendor Supply Chain Breach",
        scenario: "Compromise of a critical SaaS provider",
        description: "A major provider (e.g., Salesforce, DMS) is breached, exposing our data.",
        category: "Supply Chain",
        status: "Open",
        scores: { inherent: { likelihood: 3, impact: 4, total: 12, label: "HIGH" }, residual: { likelihood: 3, impact: 3, total: 9, label: "MEDIUM" } },
        treatment_plan: "Monitor",
        key_controls: ["UC-GV-03", "UC-IR-01"]
    }
];
