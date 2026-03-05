import { BaseAPIService } from "./baseApiService";
import { Message, SendMessageResponse } from "@/types/chat";

export class ChatApi extends BaseAPIService {
    sendMessage = (message: string, sessionId: string): Promise<SendMessageResponse> => {
        return this.post("/chat/send", { message, sessionId });
    };

    getHistory = (sessionId: string): Promise<Message[]> => {
        return this.get(`/chat/history/${sessionId}`);
    };

    clearHistory = (sessionId: string): Promise<void> => {
        return this.delete(`/chat/clear/${sessionId}`);
    };
}

export const chatApi = new ChatApi();
