import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { FULL_BASELINE_RISKS } from '../data/full_baseline_data';
import { PROGRAM_ITEMS, NIST_CSF_2 } from '../data/programData';

const ProgramContext = createContext();

export const useProgram = () => useContext(ProgramContext);

// =============================================================================
// PROGRAM PROVIDER - Central state management for Virtual CISO
// =============================================================================

export const ProgramProvider = ({ children }) => {
    // =========================================================================
    // Organization Profile
    // =========================================================================
    const [profile, setProfile] = useState({
        name: "Acme Corp",
        industry: "Technology",
        size: "Small (<100)",
        riskAppetite: "Balanced",
        isConfigured: false
    });

    // =========================================================================
    // Security Program Items (unified state for all docs + controls)
    // =========================================================================
    const [programItems, setProgramItems] = useState(() => {
        return PROGRAM_ITEMS.map(item => ({
            ...item,
            status: item.status || 'Not Started'
        }));
    });

    // =========================================================================
    // Risk Register
    // =========================================================================
    const [risks, setRisks] = useState(FULL_BASELINE_RISKS);

    // =========================================================================
    // Framework Lens
    // =========================================================================
    const [currentLens, setCurrentLens] = useState('program');

    // =========================================================================
    // ACTIONS
    // =========================================================================

    const updateProfile = useCallback((newProfile) => {
        setProfile(prev => ({ ...prev, ...newProfile, isConfigured: true }));
    }, []);

    const updateItemStatus = useCallback((id, status) => {
        setProgramItems(prev => prev.map(item =>
            item.id === id ? { ...item, status } : item
        ));
    }, []);

    const bulkUpdateStatus = useCallback((ids, status) => {
        setProgramItems(prev => prev.map(item =>
            ids.includes(item.id) ? { ...item, status } : item
        ));
    }, []);

    const addRisk = useCallback((risk) => {
        setRisks(prev => [...prev, { ...risk, id: `RISK-${Date.now()}` }]);
    }, []);

    const updateRisk = useCallback((id, updates) => {
        setRisks(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
    }, []);

    const deleteRisk = useCallback((id) => {
        setRisks(prev => prev.filter(r => r.id !== id));
    }, []);

    // =========================================================================
    // COMPUTED: Items by function
    // =========================================================================
    const itemsByFunction = useMemo(() => {
        const byFunc = {};
        Object.keys(NIST_CSF_2).forEach(fn => {
            byFunc[fn] = programItems.filter(item => item.functionId === fn);
        });
        return byFunc;
    }, [programItems]);

    // =========================================================================
    // COMPUTED: Items by category
    // =========================================================================
    const itemsByCategory = useMemo(() => {
        const byCat = {};
        programItems.forEach(item => {
            if (!byCat[item.categoryId]) {
                byCat[item.categoryId] = [];
            }
            byCat[item.categoryId].push(item);
        });
        return byCat;
    }, [programItems]);

    // =========================================================================
    // COMPUTED: Stats by function
    // =========================================================================
    const statsByFunction = useMemo(() => {
        const stats = {};
        Object.keys(NIST_CSF_2).forEach(fn => {
            const items = itemsByFunction[fn];
            const total = items.length;
            const completed = items.filter(i =>
                i.status === 'Published' || i.status === 'Implemented'
            ).length;
            const draft = items.filter(i => i.status === 'Draft').length;

            stats[fn] = {
                total,
                completed,
                draft,
                notStarted: total - completed - draft,
                completionPercent: total > 0 ? Math.round((completed / total) * 100) : 0
            };
        });
        return stats;
    }, [itemsByFunction]);

    // =========================================================================
    // COMPUTED: Stats by category
    // =========================================================================
    const statsByCategory = useMemo(() => {
        const stats = {};
        Object.entries(itemsByCategory).forEach(([catId, items]) => {
            const total = items.length;
            const completed = items.filter(i =>
                i.status === 'Published' || i.status === 'Implemented'
            ).length;

            stats[catId] = {
                total,
                completed,
                completionPercent: total > 0 ? Math.round((completed / total) * 100) : 0
            };
        });
        return stats;
    }, [itemsByCategory]);

    // =========================================================================
    // COMPUTED: Overall program stats
    // =========================================================================
    const programStats = useMemo(() => {
        const total = programItems.length;
        const completed = programItems.filter(i =>
            i.status === 'Published' || i.status === 'Implemented'
        ).length;
        const draft = programItems.filter(i => i.status === 'Draft').length;

        // Count by type
        const byType = {};
        const types = ['Policy', 'Standard', 'SOP', 'Playbook', 'Runbook', 'Guideline', 'Control'];
        types.forEach(type => {
            const typeItems = programItems.filter(i => i.type === type);
            byType[type] = {
                total: typeItems.length,
                completed: typeItems.filter(i =>
                    i.status === 'Published' || i.status === 'Implemented'
                ).length
            };
        });

        // Count by phase
        const byPhase = {};
        [1, 2, 3, 4].forEach(phase => {
            const phaseItems = programItems.filter(i => i.phase === phase);
            byPhase[phase] = {
                total: phaseItems.length,
                completed: phaseItems.filter(i =>
                    i.status === 'Published' || i.status === 'Implemented'
                ).length
            };
        });

        return {
            total,
            completed,
            draft,
            notStarted: total - completed - draft,
            completionPercent: total > 0 ? Math.round((completed / total) * 100) : 0,
            byType,
            byPhase
        };
    }, [programItems]);

    // =========================================================================
    // COMPUTED: Roadmap items (not completed)
    // =========================================================================
    const roadmapItems = useMemo(() => {
        return programItems.filter(i =>
            i.status !== 'Published' && i.status !== 'Implemented'
        );
    }, [programItems]);

    // =========================================================================
    // COMPUTED: Maturity tier
    // =========================================================================
    const maturityTier = useMemo(() => {
        const pct = programStats.completionPercent;
        if (pct >= 80) return { tier: 5, label: 'Optimizing', color: '#00ff9d' };
        if (pct >= 60) return { tier: 4, label: 'Managed', color: '#0088ff' };
        if (pct >= 40) return { tier: 3, label: 'Defined', color: '#ff9900' };
        if (pct >= 20) return { tier: 2, label: 'Developing', color: '#ff6600' };
        return { tier: 1, label: 'Initial', color: '#ff4444' };
    }, [programStats.completionPercent]);

    // =========================================================================
    // CONTEXT VALUE
    // =========================================================================
    const value = {
        // Profile
        profile,
        updateProfile,

        // Program Items
        programItems,
        updateItemStatus,
        bulkUpdateStatus,
        itemsByFunction,
        itemsByCategory,
        statsByFunction,
        statsByCategory,
        programStats,
        roadmapItems,
        maturityTier,

        // Risk
        risks,
        addRisk,
        updateRisk,
        deleteRisk,

        // Framework
        nistFunctions: NIST_CSF_2,
        currentLens,
        setCurrentLens
    };

    return (
        <ProgramContext.Provider value={value}>
            {children}
        </ProgramContext.Provider>
    );
};
