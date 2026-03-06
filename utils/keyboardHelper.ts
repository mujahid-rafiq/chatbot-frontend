import { KeyboardEvent } from 'react';

/**
 * Generic helper to handle Form submission on Enter key (while allowing Shift+Enter for newlines).
 */
export function handleEnterSubmit(e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>, onAction: () => void) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onAction();
    }
}
