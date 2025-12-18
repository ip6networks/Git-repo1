export const FRAMEWORK_DATA = {
    nist: {
        name: "NIST CSF 2.0",
        functions: [
            { id: "GOVERN", name: "Govern (GV)", color: "#FFD700" },
            { id: "IDENTIFY", name: "Identify (ID)", color: "#4B0082" },
            { id: "PROTECT", name: "Protect (PR)", color: "#0000FF" },
            { id: "DETECT", name: "Detect (DE)", color: "#FFA500" },
            { id: "RESPOND", name: "Respond (RS)", color: "#FF4500" },
            { id: "RECOVER", name: "Recover (RC)", color: "#008000" }
        ]
    },
    iso: {
        name: "ISO/IEC 27001:2022",
        clauses: [
            { id: "5", name: "Organizational Controls" },
            { id: "6", name: "People Controls" },
            { id: "7", name: "Physical Controls" },
            { id: "8", name: "Technological Controls" }
        ]
    },
    unifiedControls: [
        {
            id: "UC-GV-01",
            title: "Security Policy Management",
            description: "Establish and maintain high-level information security policies approved by leadership.",
            domain: "Governance",
            phase: 1,
            framework_mappings: {
                nist_csf_2: ["GV.PO-01"],
                nist_800_53_r5: ["PM-1"],
                iso_27002_2022: ["5.1"],
                cis_v8: ["1.1"]
            },
            implementation_guidance: "Draft the 'Core 8' policies (Acceptable Use, Access Control, etc.) and get CISO/CEO sign-off. Publish to Intranet.",
            evidence_requirements: [
                { id: "EV-01", name: "Policy Set (signed/dated)", frequency: "Annual" },
                { id: "EV-02", name: "Policy Review Meeting Minutes", frequency: "Annual" }
            ],
            priority: "Critical", // Legacy field for dashboard compatibility if needed
            status: "Not Started"
        },
        {
            id: "UC-ID-01",
            title: "Hardware Asset Inventory",
            description: "Maintain an automated inventory of all physical devices.",
            domain: "Asset Management",
            phase: 1,
            framework_mappings: {
                nist_csf_2: ["ID.AM-01"],
                nist_800_53_r5: ["CM-8"],
                iso_27002_2022: ["5.9"],
                cis_v8: ["1.1", "1.2"]
            },
            implementation_guidance: "Deploy EDR agents to auto-discover workstations. Use network scanners for printers/IoT.",
            evidence_requirements: [
                { id: "EV-03", name: "Asset Inventory Export", frequency: "Monthly" }
            ],
            priority: "High",
            status: "Not Started"
        },
        {
            id: "UC-AC-01",
            title: "Access Control Policy",
            description: "Define rules for logical access based on least privilege.",
            domain: "Identity & Access",
            phase: 1,
            framework_mappings: {
                nist_csf_2: ["PR.AA-01"],
                nist_800_53_r5: ["AC-1"],
                iso_27002_2022: ["5.15"],
                cis_v8: ["6.1"]
            },
            implementation_guidance: "Create RBAC (Role Based Access Control) groups in your IdP. Avoid direct user assignment.",
            evidence_requirements: [
                { id: "EV-04", name: "Access Control Policy", frequency: "Annual" }
            ],
            priority: "Critical",
            status: "Not Started"
        },
        {
            id: "UC-AC-02",
            title: "Multi-Factor Authentication (MFA)",
            description: "Enforce MFA for all remote access, privileged accounts, and cloud apps.",
            domain: "Identity & Access",
            phase: 1,
            framework_mappings: {
                nist_csf_2: ["PR.AA-03"],
                nist_800_53_r5: ["IA-2"],
                iso_27002_2022: ["5.17"],
                cis_v8: ["6.3"]
            },
            implementation_guidance: "Enable via Identity Provider (Okta/Azure). Disable SMS for admins; use App or Hardware keys.",
            evidence_requirements: [
                { id: "EV-05", name: "MFA Configuration Screenshot", frequency: "Quarterly" },
                { id: "EV-06", name: "MFA Exclusion List", frequency: "Quarterly" }
            ],
            priority: "Critical",
            status: "Not Started"
        },
        {
            id: "UC-DE-01",
            title: "Endpoint Defense (EDR)",
            description: "Deploy EDR agents to all workstations and servers.",
            domain: "Endpoint Security",
            phase: 1,
            framework_mappings: {
                nist_csf_2: ["DE.CM-01"],
                nist_800_53_r5: ["SI-4"],
                iso_27002_2022: ["8.7"],
                cis_v8: ["10.1"]
            },
            implementation_guidance: "Install agents (CrowdStrike/SentinelOne/Defender) on 100% of endpoints. Enable 'Block' mode.",
            evidence_requirements: [
                { id: "EV-07", name: "EDR Coverage Report", frequency: "Monthly" }
            ],
            priority: "Critical",
            status: "Not Started"
        },
        {
            id: "UC-IR-01",
            title: "Incident Response Plan",
            description: "Document and test a plan for responding to security incidents.",
            domain: "Incident Response",
            phase: 2,
            framework_mappings: {
                nist_csf_2: ["RS.MA-01"],
                nist_800_53_r5: ["IR-2"],
                iso_27002_2022: ["5.24"],
                cis_v8: ["17.1"]
            },
            implementation_guidance: "Draft a 1-page 'Panic Card' for Day 1. Evolve into full IR plan in Phase 2.",
            evidence_requirements: [
                { id: "EV-08", name: "IR Plan PDF", frequency: "Annual" },
                { id: "EV-09", name: "Tabletop Test Report", frequency: "Annual" }
            ],
            priority: "High",
            status: "Not Started"
        }
    ],
    riskScenarios: [
        {
            id: "RISK-01",
            title: "Ransomware Outage",
            scenario: "Ransomware causing prolonged operational downtime",
            description: "Malware encrypts critical sales/shipping systems (ERP/WMS), halting revenue.",
            category: "Operational",
            status: "Open",
            scores: {
                inherent: { likelihood: 4, impact: 5, total: 20, label: "CRITICAL" },
                residual: { likelihood: 2, impact: 4, total: 8, label: "MEDIUM" }
            },
            treatment_plan: "Mitigate",
            key_controls: ["UC-AC-02", "UC-DE-01", "UC-IR-01"]
        },
        {
            id: "RISK-02",
            title: "Business Email Compromise (BEC)",
            scenario: "Wire Fraud via CFO Impersonation",
            description: "Attacker impersonates CEO/Vendor to trick Finance into wiring funds.",
            category: "Financial",
            status: "Open",
            scores: {
                inherent: { likelihood: 5, impact: 4, total: 20, label: "CRITICAL" },
                residual: { likelihood: 3, impact: 4, total: 12, label: "HIGH" }
            },
            treatment_plan: "Mitigate",
            key_controls: ["UC-AC-02", "UC-GV-01"] // Awareness implied in policy
        },
        {
            id: "RISK-03",
            title: "SaaS Data Leak",
            scenario: "Customer List Exported from CRM",
            description: "Sensitive customer list exported from CRM by unauthorized user or departing emp.",
            category: "Data",
            status: "Open",
            scores: {
                inherent: { likelihood: 4, impact: 3, total: 12, label: "HIGH" },
                residual: { likelihood: 3, impact: 2, total: 6, label: "LOW" }
            },
            treatment_plan: "Transfer",
            key_controls: ["UC-AC-01"]
        }
    ]
};
