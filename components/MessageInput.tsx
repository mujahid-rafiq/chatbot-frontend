'use client';

import { useState } from 'react';

import { SendIcon } from '@/assets/svg';
import { useAutoResizeTextArea } from '@/hooks/useAutoResizeTextArea';
import { handleEnterSubmit } from '@/utils/keyboardHelper';


interface MessageInputProps {
    onSend: (message: string) => void;
    disabled: boolean;
}

export default function MessageInput({ onSend, disabled }: MessageInputProps) {
    const [input, setInput] = useState('');
    const textareaRef = useAutoResizeTextArea(input);

    const handleSend = () => {
        const trimmed = input.trim();
        if (!trimmed || disabled) return;
        onSend(trimmed);
        setInput('');
    };


    return (
        <div className="px-4 py-2 sm:py-6">
            <div className="max-w-3xl mx-auto relative flex items-end gap-2 sm:gap-4 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-2 pl-4 shadow-2xl transition-all focus-within:border-violet-500/50 focus-within:ring-4 focus-within:ring-violet-500/5">
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => handleEnterSubmit(e, handleSend)}

                    disabled={disabled}
                    rows={1}
                    placeholder={disabled ? 'AI is thinking...' : 'Type a message...'}
                    className="flex-1 max-h-40 py-3 bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 text-sm sm:text-base resize-none overflow-y-auto leading-relaxed"
                />

                <button
                    onClick={handleSend}
                    disabled={disabled || !input.trim()}
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 hover:from-violet-500 hover:to-indigo-600 text-white disabled:opacity-20 disabled:grayscale transition-all duration-300 active:scale-95 shadow-lg shadow-violet-900/20 group"
                    title="Send message"
                >
                    <SendIcon
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                </button>
            </div>
            <p className="text-center text-[10px] text-gray-500 mt-3 font-medium tracking-wide uppercase">
                Enter to send · Shift+Enter for newline
            </p>
        </div>
    );
}
