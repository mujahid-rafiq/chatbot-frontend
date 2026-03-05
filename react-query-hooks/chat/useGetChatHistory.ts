'use client';

import { useQuery } from '@tanstack/react-query';
import { chatApi } from '@/lib/service/chatApi';

export default function useGetChatHistory(sessionId: string) {
    return useQuery({
        queryKey: ['chatHistory', sessionId],
        queryFn: () => chatApi.getHistory(sessionId),
        enabled: !!sessionId,
    });
}
