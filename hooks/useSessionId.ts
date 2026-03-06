'use client';

import { useState } from 'react';

export function useSessionId() {
    const [sessionId, setSessionId] = useState<string>(() => {
        // Handle Server-Side Rendering (SSR)
        if (typeof window === 'undefined') return 'default-session';

        try {
            const stored = localStorage.getItem('chatSessionId');
            if (stored) return stored;

            // If no session ID exists, generate a new one
            const newId = `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
            localStorage.setItem('chatSessionId', newId);
            return newId;
        } catch (error) {
            console.error('Error accessing localStorage for session ID:', error);
            return 'default-session';
        }
    });

    const refreshSessionId = () => {
        const newId = `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        localStorage.setItem('chatSessionId', newId);
        setSessionId(newId);
        return newId;
    };

    return { sessionId, setSessionId, refreshSessionId };
}
