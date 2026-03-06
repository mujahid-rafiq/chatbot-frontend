'use client';

import { useEffect, useRef } from 'react';

/**
 * Custom hook to automatically resize a textarea's height based on its content.
 * @param value The reactive value (state) controlling the textarea content.
 * @returns A ref to be attached to the textarea element.
 */
export function useAutoResizeTextArea(value: string) {
    const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = ref.current;
        if (textarea) {
            // First reset height to auto to correctly shrink if text is deleted
            textarea.style.height = 'auto';
            // Set height based on the scroll height (content height)
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [value]);

    return ref;
}
