'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { chatApi } from '@/lib/service/chatApi';

export default function usePostSendMessage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ message, sessionId }: { message: string, sessionId: string }) =>
            chatApi.sendMessage(message, sessionId),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['chatHistory', variables.sessionId] });
        },
    });
}
