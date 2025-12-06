export interface ChatMessage {
  sender: string;     
  text: string;
  time: string;        // 09:20 AM
}

export interface MessagesByDate {
  [dateKey: string]: ChatMessage[];
}

export interface ChatSession {
  sessionId: string;
  createdAt: string;
  messages: MessagesByDate;
}