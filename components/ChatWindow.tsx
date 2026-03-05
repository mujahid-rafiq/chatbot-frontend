'use client';

import { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import LoadingIndicator from './LoadingIndicator';
import MessageInput from './MessageInput';
import { TrashIcon, XIcon } from '@/assets/svg';
import useGetChatHistory from '@/react-query-hooks/chat/useGetChatHistory';
import usePostSendMessage from '@/react-query-hooks/chat/usePostSendMessage';
import useDeleteClearHistory from '@/react-query-hooks/chat/useDeleteClearHistory';

export default function ChatWindow() {
    // A unique session ID for this browser — persisted in localStorage
    const [sessionId, setSessionId] = useState<string>(() => {
        if (typeof window === 'undefined') return 'default-session';
        const stored = localStorage.getItem('chatSessionId');
        if (stored) return stored;
        const newId = `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        localStorage.setItem('chatSessionId', newId);
        return newId;
    });

    const bottomRef = useRef<HTMLDivElement>(null);

    // React Query Hooks
    const { data: messages = [], isLoading: isLoadingHistory } = useGetChatHistory(sessionId);
    const sendMessageMutation = usePostSendMessage();
    const clearHistoryMutation = useDeleteClearHistory();

    const [error, setError] = useState<string | null>(null);

    // Scroll to the bottom whenever messages change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, sendMessageMutation.isPending]);

    // Submit a message
    async function handleSend(userText: string) {
        if (!userText.trim()) return;
        setError(null);

        sendMessageMutation.mutate({ message: userText, sessionId }, {
            onError: (err: any) => {
                const message = err.response?.data?.message || err.message || 'Something went wrong. Please try again.';
                setError(message);
            }
        });
    }

    // Clear current history
    async function handleClearChat() {
        if (!messages.length) return;
        if (!confirm('Are you sure you want to clear this entire conversation history? This cannot be undone.')) return;

        clearHistoryMutation.mutate(sessionId, {
            onError: () => {
                setError('Could not clear history on server.');
            }
        });
    }

    // Generate a fresh session ID
    function handleNewChat() {
        const newId = `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        localStorage.setItem('chatSessionId', newId);
        setSessionId(newId);
    }

    return (
        <div className="flex flex-col h-screen bg-gray-950 text-white selection:bg-violet-500/30">
            {/* Header */}
            <header className="bg-gray-900/90 backdrop-blur-md border-b border-gray-800/80 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center text-xl shadow-lg shadow-violet-900/20">
                        🤖
                    </div>
                    <div>
                        <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">Ollama AI</h1>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <p className="text-[10px] sm:text-xs text-gray-400 font-medium uppercase tracking-widest">Active System</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    {messages.length > 0 && (
                        <button
                            onClick={handleClearChat}
                            className="p-2 hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded-lg transition-colors"
                            title="Clear entire history"
                        >
                            <TrashIcon />
                        </button>
                    )}

                    <button
                        onClick={handleNewChat}
                        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-gray-700
              rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200"
                    >
                        <span className="text-lg">+</span>
                        <span className="hidden sm:inline">New Chat</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
                <div className="max-w-3xl mx-auto flex flex-col gap-6">
                    {isLoadingHistory && (
                        <div className="flex flex-col items-center justify-center py-20 gap-3">
                            <div className="w-10 h-10 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
                            <p className="text-xs text-gray-500 font-medium animate-pulse">Restoring your conversation...</p>
                        </div>
                    )}

                    {!isLoadingHistory && messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-12 sm:py-24 gap-6 text-center animate-in fade-in zoom-in duration-500">
                            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center text-5xl shadow-2xl shadow-violet-900/30">
                                🤖
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">How can I help you today?</h2>
                                <p className="text-gray-400 text-sm sm:text-base max-w-sm mx-auto">
                                    Ask me questions, generate code, or simply chat. I have a memory of our previous messages.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg mt-4 px-4">
                                {[
                                    '🚀 Write a React hook for fetching data',
                                    '🌌 What are the latest space discoveries?',
                                    '🍿 Recommend a movie based on Interstellar',
                                    '🍳 Suggest a dinner recipe with chicken'
                                ].map((prompt) => (
                                    <button
                                        key={prompt}
                                        onClick={() => handleSend(prompt.slice(3))}
                                        className="text-left text-xs sm:text-sm bg-gray-900/50 hover:bg-violet-900/20 border border-gray-800
                      hover:border-violet-500/50 rounded-2xl px-5 py-4 text-gray-300 transition-all duration-300
                      hover:scale-[1.02] shadow-sm"
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {messages.map((msg) => (
                        <MessageBubble key={msg.id} message={msg} />
                    ))}

                    {sendMessageMutation.isPending && <LoadingIndicator />}

                    {error && (
                        <div className="flex items-center gap-3 bg-red-950/20 border border-red-900/50 rounded-2xl px-5 py-4 text-red-400 text-sm animate-in slide-in-from-bottom-2 duration-300">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-900/50 flex items-center justify-center text-xs">⚠️</span>
                            <p className="flex-1">{error}</p>
                            <button
                                onClick={() => setError(null)}
                                className="opacity-60 hover:opacity-100 transition-opacity"
                            >
                                <XIcon />
                            </button>
                        </div>
                    )}

                    <div ref={bottomRef} className="h-4" />
                </div>
            </main>

            <footer className="w-full max-w-4xl mx-auto pb-4">
                <MessageInput onSend={handleSend} disabled={sendMessageMutation.isPending} />
            </footer>
        </div>
    );
}
