import React, { createContext, useContext, useState, useEffect } from 'react';
import { FRAMEWORK_DATA } from '../data/frameworkData';
import { FULL_BASELINE_CONTROLS, FULL_BASELINE_RISKS } from '../data/full_baseline_data';
import { PROGRAM_DATA } from '../data/programData'; // Importing previous data as seed

const ProgramContext = createContext();

export const useProgram = () => useContext(ProgramContext);

export const ProgramProvider = ({ children }) => {
    // Core Entity: Organization Profile
    const [profile, setProfile] = useState({
        name: "Acme Corp",
        industry: "Technology",
        size: "Small (<100)",
        riskAppetite: "Balanced",
        isConfigured: false
    });

    // Core Entity: Policies (Starting with Seed, but modifiable)
    const [policies, setPolicies] = useState(PROGRAM_DATA.policies);
    const [standards] = useState(PROGRAM_DATA.standards);
    const [guidelines] = useState(PROGRAM_DATA.guidelines);

    // Core Entity: Risks
    const [risks, setRisks] = useState(FULL_BASELINE_RISKS);

    // Core Entity: Controls (The Unified Baseline)
    const [controls, setControls] = useState(FULL_BASELINE_CONTROLS.map(c => ({
        ...c,
        maturity: 0,
        status: 'Not Started'
    })));

    // Module 4: Framework Navigator State
    const [currentLens, setCurrentLens] = useState('program'); // 'program' (NIST) or 'audit' (ISO)
    const [frameworkStack, setFrameworkStack] = useState({
        primary: 'nist_csf_2',
        overlays: [],
        viewPreference: 'program'
    });

    const updateLens = (lens) => {
        setCurrentLens(lens);
        // Also update the stack preference for persistence
        setFrameworkStack(prev => ({ ...prev, viewPreference: lens }));
    };

    // Action: Update Profile (called by Intake Wizard)
    const updateProfile = (newProfile) => {
        setProfile({ ...profile, ...newProfile, isConfigured: true });

        // Dynamic Logic: Adjust policies based on Industry?
        // For MVP, if Automotive, we might auto-enable a strict 'Supply Chain' policy
        if (newProfile.industry === 'Automotive') {
            console.log("Auto-tuning for Automotive Industry...");
            // Logic to update policies could go here
        }
    };

    // Action: Update Policy Status
    const updatePolicyStatus = (id, status, maturity) => {
        setPolicies(prev => prev.map(p =>
            p.id === id ? { ...p, status, maturity } : p
        ));
    };

    return (
        <ProgramContext.Provider value={{
            profile,
            updateProfile,
            policies,
            standards,
            guidelines,
            updatePolicyStatus,
            risks,
            controls,
            frameworks: FRAMEWORK_DATA,
            currentLens,
            updateLens,
            frameworkStack,
            setFrameworkStack
        }}>
            {children}
        </ProgramContext.Provider>
    );
};
