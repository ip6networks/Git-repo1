import React, { createContext, useContext, useState, useEffect } from 'react';
import { POLICIES } from '../data/mockData';

const GovernanceContext = createContext(null);

export const GovernanceProvider = ({ children }) => {
    // Initialize documents from POLICIES mock data, making status mutable
    const [documents, setDocuments] = useState(() =>
        POLICIES.map(p => ({ ...p }))
    );

    const updateDocumentStatus = (docId, newStatus) => {
        setDocuments(prevDocs =>
            prevDocs.map(doc =>
                doc.id === docId ? { ...doc, status: newStatus } : doc
            )
        );
    };

    // Derive statistics for components that need them
    const stats = {
        total: documents.length,
        published: documents.filter(d => d.status === 'Published').length,
        draft: documents.filter(d => d.status === 'Draft').length,
        notStarted: documents.filter(d => d.status === 'Not Started').length,
    };

    return (
        <GovernanceContext.Provider value={{ documents, updateDocumentStatus, stats }}>
            {children}
        </GovernanceContext.Provider>
    );
};

export const useGovernance = () => {
    const context = useContext(GovernanceContext);
    if (!context) {
        throw new Error('useGovernance must be used within a GovernanceProvider');
    }
    return context;
};

export default GovernanceContext;
