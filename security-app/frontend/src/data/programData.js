export const PROGRAM_DATA = {
    overview: {
        companyName: "Enterprise Corp",
        maturityModel: "NIST CSF 2.0",
        targetTier: 3
    },
    policies: [
        {
            id: "POL-01",
            type: "Policy",
            title: "Information Security / ISMS Policy",
            description: "The overarching mandate for the security program.",
            priority: "Critical",
            maturity: 1, // 1=Initial, 2=Managed, 3=Defined, 4=Quantitatively Managed, 5=Optimizing
            status: "Draft",
            content: {
                why: "Establishes the authority and scope of the security program.",
                what: "Defines the CISO role, executive support, and commitment to continuous improvement.",
                implementation: [
                    "Draft initial policy statement.",
                    "Get CEO/Board sign-off.",
                    "Publish to intranet.",
                    "Review annually."
                ]
            }
        },
        {
            id: "POL-02",
            type: "Policy",
            title: "Risk Management Policy",
            description: "Defines risk appetite, assessment methodology, and treatment.",
            priority: "Critical",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "We cannot fix everything. We must prioritize based on risk.",
                what: "Defines 'Low/Med/High' risk, acceptance criteria, and the Risk Register process.",
                implementation: [
                    "Define Risk Appetite Statement.",
                    "Select a Risk Assessment Framework (e.g., NIST SP 800-30).",
                    "Establish a Risk Committee."
                ]
            }
        },
        {
            id: "POL-03",
            type: "Policy",
            title: "Policy Exception / Waiver Policy",
            description: "The formal process for deviating from security rules.",
            priority: "Critical",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "Shadow IT happens when there is no formal way to say 'No' or 'Yes, but...'.",
                what: "Requires a formal request, risk acceptance, and expiration date for all exceptions.",
                implementation: [
                    "Create an Exception Request Form.",
                    "Define approval levels (Manager vs. CISO vs. CEO).",
                    "Track all active waivers in a register."
                ]
            }
        },
        {
            id: "POL-04",
            type: "Policy",
            title: "Asset Management Policy",
            description: "Inventory, ownership, and lifecycle of assets.",
            priority: "High",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "You cannot protect what you do not know you have.",
                what: "Requires all hardware and software to be inventoried and have an owner.",
                implementation: []
            }
        },
        {
            id: "POL-05",
            type: "Policy",
            title: "Data Classification & Handling Policy",
            description: "How to label and treat data (Public, Internal, Confidential, Restricted).",
            priority: "Critical",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "Not all data is equal. We shouldn't spend millions protecting the lunch menu.",
                what: "Defines 3-4 levels of classification and rules for encryption, transmission, and destruction.",
                implementation: []
            }
        },
        {
            id: "POL-06",
            type: "Policy",
            title: "Data Retention & Records Management",
            description: "How long to keep data and when to destroy it.",
            priority: "High",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "Hoarding data increases liability and storage costs.",
                what: "Sets retention schedules based on legal/regulatory requirements.",
                implementation: []
            }
        },
        {
            id: "POL-07",
            type: "Policy",
            title: "Acceptable Use Policy (AUP)",
            description: "Rules of behavior for employees using company systems.",
            priority: "Critical",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "Users need clear boundaries on what is allowed (e.g., no personal file sharing).",
                what: "Signed by all employees during onboarding.",
                implementation: []
            }
        },
        {
            id: "POL-08",
            type: "Policy",
            title: "Identity & Access Management (IAM) Policy",
            description: "Who gets access and how.",
            priority: "Critical",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "Identity is the new perimeter.",
                what: "Least Privilege, Need-to-Know, MFA requirements.",
                implementation: []
            }
        },
        {
            id: "POL-09",
            type: "Policy",
            title: "Privileged Access Management (PAM) Policy",
            description: "Special rules for admin accounts.",
            priority: "Critical",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "Admins hold the keys to the kingdom.",
                what: "No standing privileges, vaulting passwords, session recording.",
                implementation: []
            }
        },
        {
            id: "POL-10",
            type: "Policy",
            title: "Remote Access / Remote Work Policy",
            description: "Securing access from outside the office.",
            priority: "Critical",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "Remote work extends the attack surface.",
                what: "VPN/ZTNA requirements, no split-tunneling, device posture checks.",
                implementation: []
            }
        },
        {
            id: "POL-11",
            type: "Policy",
            title: "Endpoint & Mobile Security Policy",
            description: "Security requirements for laptops, phones, and tablets.",
            priority: "High",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "Endpoints are the primary entry point for attackers.",
                what: "MDM, Disk Encryption, EDR, OS Patching.",
                implementation: []
            }
        },
        {
            id: "POL-12",
            type: "Policy",
            title: "Network Security Policy",
            description: "Firewalls, segmentation, and wireless security.",
            priority: "High",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "Prevent lateral movement if a breach occurs.",
                what: "Default deny, 802.1x for wireless, DMZ separation.",
                implementation: []
            }
        },
        {
            id: "POL-13",
            type: "Policy",
            title: "Cryptography & Key Management Policy",
            description: "How we use encryption and manage keys.",
            priority: "High",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "Bad crypto is worse than no crypto (false sense of security).",
                what: "Approved algorithms (e.g., AES-256), key rotation lifecycles.",
                implementation: []
            }
        },
        {
            id: "POL-14",
            type: "Policy",
            title: "Vulnerability Management Policy",
            description: "Scanning and fixing security flaws.",
            priority: "Critical",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "Unpatched systems are low-hanging fruit for automated attacks.",
                what: "Quarterly vs Continuous scanning, remediation SLAs.",
                implementation: []
            }
        },
        {
            id: "POL-15",
            type: "Policy",
            title: "Patch Management Policy",
            description: "Deploying updates to software and OS.",
            priority: "Critical",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "Vulnerability management finds the hole; Patch management fixes it.",
                what: "Automated patching for endpoints, maintenance windows for servers.",
                implementation: []
            }
        },
        {
            id: "POL-16",
            type: "Policy",
            title: "Secure Configuration / Hardening Policy",
            description: "Baseline security settings for all systems.",
            priority: "High",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "Default configurations are often insecure.",
                what: "CIS Benchmarks, disabling unused services.",
                implementation: []
            }
        },
        {
            id: "POL-17",
            type: "Policy",
            title: "Change Management Policy",
            description: "Controlled changes to production systems.",
            priority: "High",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "Uncontrolled changes cause outages and security gaps.",
                what: "CAB (Change Advisory Board), back-out plans, testing requirements.",
                implementation: []
            }
        },
        {
            id: "POL-18",
            type: "Policy",
            title: "Logging & Monitoring Policy",
            description: "What to log and how long to keep it.",
            priority: "High",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "You can't detect what you don't see.",
                what: "Centralized logging (SIEM), retention for 1 year (hot/cold).",
                implementation: []
            }
        },
        {
            id: "POL-19",
            type: "Policy",
            title: "Incident Response Policy",
            description: "How we react to a breach.",
            priority: "Critical",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "Panic is not a strategy.",
                what: "IR Team definition, classification of SEV1/SEV2/SEV3.",
                implementation: []
            }
        },
        {
            id: "POL-20",
            type: "Policy",
            title: "Backup Policy",
            description: "Data backup frequency and testing.",
            priority: "Critical",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "Ransomware defense depends on clean backups.",
                what: "3-2-1 rule, immutable backups, annual restore testing.",
                implementation: []
            }
        },
        {
            id: "POL-21",
            type: "Policy",
            title: "Business Continuity & Disaster Recovery (BC/DR)",
            description: "Keeping the business running during disasters.",
            priority: "High",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "Survival of the business.",
                what: "BIA (Business Impact Analysis), RTO/RPO targets.",
                implementation: []
            }
        },
        {
            id: "POL-22",
            type: "Policy",
            title: "Third-Party / Supplier Security Policy",
            description: "Managing risk from vendors.",
            priority: "High",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "Vendors are often the weakest link.",
                what: "Due diligence before signing, right to audit clauses.",
                implementation: []
            }
        },
        {
            id: "POL-23",
            type: "Policy",
            title: "Security Awareness & Training Policy",
            description: "Training employees on security.",
            priority: "High",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "The human firewall needs patching too.",
                what: "Onboarding training, annual refresher, monthly phishing sims.",
                implementation: []
            }
        },
        {
            id: "POL-24",
            type: "Policy",
            title: "Physical Security Policy",
            description: "Protecting offices and hardware.",
            priority: "Medium",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "If they can steal the server, software security doesn't matter.",
                what: "Badge access, CCTV, visitor logs.",
                implementation: []
            }
        },
        {
            id: "POL-25",
            type: "Policy",
            title: "Privacy / Personal Data Protection Policy",
            description: "Handling PII/PHI compliance (GDPR, CCPA).",
            priority: "High",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "It's the law.",
                what: "Data subject rights, privacy notices, DPA requirements.",
                implementation: []
            }
        },
        {
            id: "POL-26",
            type: "Policy",
            title: "Data Loss Prevention (DLP) Policy",
            description: "Preventing sensitive data exfiltration.",
            priority: "Medium",
            maturity: 1,
            status: "Not Started",
            content: {
                why: "Accidental data leaks happen every day.",
                what: "Blocking USBs, monitoring email attachments, cloud sharing restrictions.",
                implementation: []
            }
        }
    ],
    standards: [
        {
            id: "STD-IAM-01",
            category: "Identity & Access",
            title: "MFA Standard",
            requirement: "MFA enforced for all users. Phishing-resistant MFA for admins and remote access.",
            status: "Not Started",
            maturity: 1
        },
        {
            id: "STD-IAM-02",
            category: "Identity & Access",
            title: "Account Lifecycle Standard",
            requirement: "Access removed within 24 hours of employee termination.",
            status: "Not Started",
            maturity: 1
        },
        {
            id: "STD-END-01",
            category: "Endpoint Security",
            title: "Workstation Hardening",
            requirement: "Disk encryption (BitLocker/FileVault) enabled on 100% of portable devices.",
            status: "Not Started",
            maturity: 1
        },
        {
            id: "STD-NET-01",
            category: "Network Security",
            title: "Segmentation Standard",
            requirement: "Guest Wi-Fi must be completely isolated from the corporate LAN.",
            status: "Not Started",
            maturity: 1
        },
        {
            id: "STD-CLOUD-01",
            category: "Cloud Security",
            title: "Cloud Logging Standard",
            requirement: "CloudTrail/Activity Logs enabled in all regions and shipped to central archive.",
            status: "Not Started",
            maturity: 1
        }
    ],
    guidelines: [
        {
            id: "GDL-01",
            category: "General",
            title: "Secure Configuration Guides",
            description: "Step-by-step hardening for M365, AWS, and Windows 11.",
            url: "#"
        },
        {
            id: "GDL-02",
            category: "Incident Response",
            title: "IR Playbooks",
            description: "Checklists for Phishing, Ransomware, and Lost Device scenarios.",
            url: "#"
        },
        {
            id: "GDL-03",
            category: "Remote Work",
            title: "Secure Home Office",
            description: "Tips for securing home Wi-Fi and physical workspace.",
            url: "#"
        }
    ]
};
