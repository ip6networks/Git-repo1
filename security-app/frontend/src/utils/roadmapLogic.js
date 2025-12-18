export const generateRoadmap = (controls) => {
    // 1. Filter for un-implemented controls
    const backlog = controls.filter(c => c.status !== 'Implemented' && c.status !== 'Published');

    // 2. Calculate WSJF Score (Weighted Shortest Job First)
    // Score = Risk Reduction / Effort
    const scoredBacklog = backlog.map(c => {
        const wsjf = (c.risk_reduction || 5) / (c.effort || 3);
        return { ...c, wsjf };
    });

    // 3. Sort by Score (Desc)
    scoredBacklog.sort((a, b) => b.wsjf - a.wsjf);

    // 4. Bucket into phases
    const horizons = {
        now: [], // High Score, Low Effort (Quick Wins)
        next: [], // High Score, High Effort (Projects)
        later: [] // Low Score
    };

    scoredBacklog.forEach(c => {
        if (c.wsjf >= 3) {
            horizons.now.push(c);
        } else if (c.wsjf >= 1.5) {
            horizons.next.push(c);
        } else {
            horizons.later.push(c);
        }
    });

    return horizons;
};
