export type AIMessageRole = "user" | "assistant";

export interface AIMessage {
    id: number;
    role: AIMessageRole;
    content: string;
}