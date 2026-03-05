
export interface Message {
    id: string;
    role: 'user' | 'ai'; 
    content: string; 
    createdAt: string;   
}
export interface SendMessageResponse {
    userMessage: Message;
    aiMessage: Message;
}
