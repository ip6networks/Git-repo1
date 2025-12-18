# Security Program Repository

## Program Charter
This repository serves as the single source of truth for the Information Security Program. It is structured to align with **NIST Cybersecurity Framework (CSF) 2.0**, while leveraging **ISO/IEC 27001:2022** for control specifications and **SABSA/TOGAF** for architectural alignment.

## Repository Structure

### [01-Governance](./01-Governance)
**Purpose:** Define *what* we do and *why*.
- Policies & Standards
- Framework Mappings (NIST <-> ISO <-> Regulatory)
- Compliance Evidence

### [02-Architecture](./02-Architecture)
**Purpose:** Define *how* we build it securely.
- Security Architecture Principles (TOGAF)
- Business Attributes & Risk Drivers (SABSA)
- Reference Architectures & Patterns

### [03-Risk](./03-Risk)
**Purpose:** Track *what* could go wrong and our response.
- Risk Register (Strategic & Tactical)
- Remediation Plans (POAMs)
- Threat Modeling output via pragmatic artifacts

### [04-Operations](./04-Operations)
**Purpose:** Define *how* we run it day-to-day.
- Incident Response Plans
- Standard Operating Procedures (Runbooks)
- Operational metrics and reporting

## Core Framework
- **Primary Structure:** NIST CSF 2.0 (Govern, Identify, Protect, Detect, Respond, Recover)
- **Control Reference:** ISO/IEC 27001:2022
- **Maturity Goal:** Pragmatic improvement from Tier 1 (Partial) to target state (Tier 2/3) based on risk appetite.

## Frontend Application (Development Mode)
The `frontend/` directory contains a **React + Vite** application designed to visualize the security program status.

> [!NOTE]
> **Mock Data Usage**: Currently, the application runs in "Simulation Mode". It does **not** yet read the live Markdown files from the repository. All data (Risks, Policies, Progress Bars) is sourced from `src/data/mockData.js`.
> 
> **Assumptions**:
> *   The "Defcon" status is hardcoded to 3.
> *   Risk scores are simulated values.
> *   Policy "Published" status does not reflect the actual file state in `01-Governance`.

### Running the App
1. `cd frontend`
2. `npm install`
3. `npm run dev`
