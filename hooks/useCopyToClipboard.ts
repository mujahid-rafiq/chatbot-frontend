'use client';

import { useState, useCallback } from 'react';

/**
 * Custom hook to handle copying text to the clipboard with a temporary success state.
 * @param timeout How long to show the copied/success state (default 2000ms).
 * @returns [isCopied, copyFunction]
 */
export function useCopyToClipboard(timeout: number = 2000) {
    const [isCopied, setIsCopied] = useState(false);

    const copy = useCallback(async (text: string) => {
        try {
            if (!navigator.clipboard) {
                throw new Error('Clipboard API not available');
            }
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), timeout);
            return true;
        } catch (error) {
            console.error('Failed to copy text:', error);
            setIsCopied(false);
            return false;
        }
    }, [timeout]);

    return [isCopied, copy] as const;
}
