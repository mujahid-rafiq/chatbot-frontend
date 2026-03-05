'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { chatApi } from '@/lib/service/chatApi';

export default function useDeleteClearHistory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (sessionId: string) => chatApi.clearHistory(sessionId),
        onSuccess: (_data, sessionId) => {
            queryClient.setQueryData(['chatHistory', sessionId], []);
        },
    });
}
