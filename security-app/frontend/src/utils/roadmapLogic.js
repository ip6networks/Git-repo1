// =============================================================================
// ROADMAP LOGIC - Intelligent Prioritization for Virtual CISO
// =============================================================================
// Generates a prioritized roadmap using:
// 1. WSJF (Weighted Shortest Job First) scoring
// 2. Dependency resolution (parent items before children)
// 3. Phase-based bucketing (4 horizons: Now, Next, Soon, Later)
// =============================================================================

import { PHASES } from '../data/programData';

/**
 * Resolve dependencies using topological sort
 * Ensures parent items come before dependent items
 */
const resolveDependencies = (items) => {
    const itemMap = new Map(items.map(item => [item.id, item]));
    const resolved = [];
    const visited = new Set();
    const visiting = new Set();

    const visit = (item) => {
        if (visited.has(item.id)) return;
        if (visiting.has(item.id)) {
            // Circular dependency detected, skip
            console.warn(`Circular dependency detected for ${item.id}`);
            return;
        }

        visiting.add(item.id);

        // Visit dependencies first
        if (item.dependencies && Array.isArray(item.dependencies)) {
            item.dependencies.forEach(depId => {
                const dep = itemMap.get(depId);
                if (dep && !visited.has(depId)) {
                    visit(dep);
                }
            });
        }

        visiting.delete(item.id);
        visited.add(item.id);
        resolved.push(item);
    };

    items.forEach(item => visit(item));
    return resolved;
};

/**
 * Calculate WSJF score for an item
 * Score = (Risk Reduction + Business Value) / Effort
 */
const calculateWSJF = (item, riskAppetite = 'Balanced') => {
    // Base values
    const riskReduction = item.risk_reduction || 5;
    const effort = item.effort || 3;

    // Priority multiplier
    const priorityMultiplier = {
        'Critical': 2.0,
        'High': 1.5,
        'Medium': 1.0,
        'Low': 0.5
    }[item.priority] || 1.0;

    // Risk appetite adjustment
    const appetiteMultiplier = {
        'Conservative': 1.3,  // Security First
        'Balanced': 1.0,
        'Aggressive': 0.7     // Speed First
    }[riskAppetite] || 1.0;

    // Calculate WSJF
    const score = ((riskReduction * priorityMultiplier * appetiteMultiplier) / effort);

    return Math.round(score * 100) / 100;
};

/**
 * Check if an item's dependencies are satisfied
 */
const areDependenciesSatisfied = (item, completedIds) => {
    if (!item.dependencies || item.dependencies.length === 0) {
        return true;
    }
    return item.dependencies.every(depId => completedIds.has(depId));
};

/**
 * Determine the recommended phase for an item based on WSJF and dependencies
 */
const determinePhase = (item, wsjfScore) => {
    // If item has an explicit phase, use it as a starting point
    const basePhase = item.phase || 2;

    // Adjust based on WSJF score
    if (wsjfScore >= 5) {
        return Math.min(basePhase, 1); // High WSJF = Phase 1
    } else if (wsjfScore >= 3) {
        return Math.min(basePhase, 2); // Medium-High WSJF = Phase 1-2
    } else if (wsjfScore >= 1.5) {
        return Math.max(basePhase, 2); // Medium WSJF = Phase 2-3
    } else {
        return Math.max(basePhase, 3); // Low WSJF = Phase 3-4
    }
};

/**
 * Main roadmap generation function
 * @param {Array} controls - Technical controls from baseline
 * @param {Array} governanceItems - Governance documents (policies, standards, etc.)
 * @param {Object} options - Configuration options
 * @returns {Object} Roadmap organized by horizons
 */
export const generateRoadmap = (controls = [], governanceItems = [], options = {}) => {
    const { riskAppetite = 'Balanced' } = options;

    // Combine all items (exclude already completed/published)
    const allItems = [
        ...controls.filter(c =>
            c.status !== 'Implemented' &&
            c.status !== 'Published'
        ).map(c => ({ ...c, itemType: 'control' })),
        ...governanceItems.filter(g =>
            g.status !== 'Published'
        ).map(g => ({ ...g, itemType: 'governance' }))
    ];

    // If no items, return empty roadmap
    if (allItems.length === 0) {
        return {
            now: [],
            next: [],
            soon: [],
            later: [],
            summary: {
                totalItems: 0,
                criticalCount: 0,
                estimatedDays: 0
            }
        };
    }

    // Resolve dependencies (topological sort)
    const orderedItems = resolveDependencies(allItems);

    // Calculate WSJF scores
    const scoredItems = orderedItems.map(item => ({
        ...item,
        wsjf: calculateWSJF(item, riskAppetite),
        recommendedPhase: determinePhase(item, calculateWSJF(item, riskAppetite))
    }));

    // Sort by WSJF within each phase group
    scoredItems.sort((a, b) => {
        // First sort by phase
        if (a.recommendedPhase !== b.recommendedPhase) {
            return a.recommendedPhase - b.recommendedPhase;
        }
        // Then by WSJF (descending)
        return b.wsjf - a.wsjf;
    });

    // Bucket into horizons
    const horizons = {
        now: [],    // Phase 1: Days 1-30 (Foundation)
        next: [],   // Phase 2: Days 31-90 (Build)
        soon: [],   // Phase 3: Days 91-180 (Mature)
        later: []   // Phase 4: Days 180+ (Optimize)
    };

    scoredItems.forEach(item => {
        switch (item.recommendedPhase) {
            case 1:
                horizons.now.push(item);
                break;
            case 2:
                horizons.next.push(item);
                break;
            case 3:
                horizons.soon.push(item);
                break;
            case 4:
            default:
                horizons.later.push(item);
                break;
        }
    });

    // Calculate summary statistics
    const summary = {
        totalItems: scoredItems.length,
        criticalCount: scoredItems.filter(i => i.priority === 'Critical').length,
        estimatedDays: scoredItems.reduce((sum, i) => sum + (i.effort || 3), 0),
        byType: {
            governance: scoredItems.filter(i => i.itemType === 'governance').length,
            controls: scoredItems.filter(i => i.itemType === 'control').length
        },
        byPhase: {
            phase1: horizons.now.length,
            phase2: horizons.next.length,
            phase3: horizons.soon.length,
            phase4: horizons.later.length
        }
    };

    return {
        ...horizons,
        summary
    };
};

/**
 * Generate roadmap from governance documents only
 * Simpler version for governance-focused views
 */
export const generateGovernanceRoadmap = (governanceDocuments, options = {}) => {
    return generateRoadmap([], governanceDocuments, options);
};

/**
 * Get next recommended actions (top 5 items by WSJF)
 */
export const getNextActions = (controls = [], governanceItems = [], limit = 5) => {
    const roadmap = generateRoadmap(controls, governanceItems);

    // Get top items from Phase 1
    const phase1Items = roadmap.now.slice(0, limit);

    // If not enough Phase 1 items, add Phase 2 items
    if (phase1Items.length < limit) {
        const remaining = limit - phase1Items.length;
        phase1Items.push(...roadmap.next.slice(0, remaining));
    }

    return phase1Items;
};

/**
 * Calculate overall program maturity percentage
 */
export const calculateProgramMaturity = (governanceDocuments) => {
    if (!governanceDocuments || governanceDocuments.length === 0) {
        return 0;
    }

    const publishedCount = governanceDocuments.filter(d => d.status === 'Published').length;
    const draftCount = governanceDocuments.filter(d => d.status === 'Draft').length;

    // Published = 100%, Draft = 50%, Not Started = 0%
    const score = (publishedCount * 100 + draftCount * 50) / governanceDocuments.length;
    return Math.round(score);
};

/**
 * Calculate maturity by NIST CSF function
 */
export const calculateMaturityByFunction = (governanceDocuments) => {
    const functions = {
        GOVERN: { prefix: 'GV', items: [], score: 0 },
        IDENTIFY: { prefix: 'ID', items: [], score: 0 },
        PROTECT: { prefix: 'PR', items: [], score: 0 },
        DETECT: { prefix: 'DE', items: [], score: 0 },
        RESPOND: { prefix: 'RS', items: [], score: 0 },
        RECOVER: { prefix: 'RC', items: [], score: 0 }
    };

    // Group documents by NIST function based on their mappings
    governanceDocuments.forEach(doc => {
        if (doc.nistCsfMapping && Array.isArray(doc.nistCsfMapping)) {
            doc.nistCsfMapping.forEach(mapping => {
                Object.entries(functions).forEach(([funcName, funcData]) => {
                    if (mapping.startsWith(funcData.prefix)) {
                        funcData.items.push(doc);
                    }
                });
            });
        }
    });

    // Calculate score for each function
    Object.keys(functions).forEach(funcName => {
        const items = functions[funcName].items;
        if (items.length > 0) {
            const publishedCount = items.filter(d => d.status === 'Published').length;
            const draftCount = items.filter(d => d.status === 'Draft').length;
            functions[funcName].score = Math.round(
                (publishedCount * 100 + draftCount * 50) / items.length
            );
        }
    });

    return Object.entries(functions).map(([name, data]) => ({
        function: name,
        score: data.score,
        itemCount: data.items.length
    }));
};

/**
 * Get blocked items (items with unsatisfied dependencies)
 */
export const getBlockedItems = (items) => {
    const completedIds = new Set(
        items.filter(i => i.status === 'Published' || i.status === 'Implemented')
            .map(i => i.id)
    );

    return items.filter(item =>
        item.status !== 'Published' &&
        item.status !== 'Implemented' &&
        !areDependenciesSatisfied(item, completedIds)
    ).map(item => ({
        ...item,
        blockedBy: item.dependencies.filter(depId => !completedIds.has(depId))
    }));
};

/**
 * Get items that are ready to start (no blockers)
 */
export const getReadyItems = (items) => {
    const completedIds = new Set(
        items.filter(i => i.status === 'Published' || i.status === 'Implemented')
            .map(i => i.id)
    );

    return items.filter(item =>
        item.status === 'Not Started' &&
        areDependenciesSatisfied(item, completedIds)
    );
};

// Export PHASES for use in UI
export { PHASES };
