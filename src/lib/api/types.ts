export interface Conversation {
    id: string;
    conversation: Message[];
  }
  
  export interface Message {
    role: "user" | "assistant" | "system";
    content: string;
  }
  
  export interface AITask {
    id: number;
    task_type: string;
    ai_output: string;
    created_at: Date;
  }
  
  export interface Subtask {
    id: number;
    title: string;
    completed: boolean;
  }
  
  export interface Tag {
    id: number;
    name: string;
  }
  