import { Conversation, Message, AITask, Subtask, Tag } from './types';

const BASE_URL = 'http://127.0.0.1:8000';

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export async function startConversation(userId: string, userInput: string): Promise<Conversation> {
  return fetchJSON<Conversation>(`${BASE_URL}/start_conversation/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, conversation: [{ role: 'user', content: userInput }] }),
  });
}

export async function continueConversation(conversationId: string, userInput: string): Promise<Conversation> {
  return fetchJSON<Conversation>(`${BASE_URL}/continue_conversation/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ conversation_id: conversationId, user_message: userInput }),
  });
}

export async function submitFeedback(aiTask: AITask, userId: string, feedback: string, rating: number): Promise<void> {
  await fetch(`${BASE_URL}/feedback/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task_type: aiTask.task_type, ai_task_id: aiTask.id, user_id: userId, feedback, rating }),
  });
}

export async function generateSubtasks(taskId: number, userId: string): Promise<Subtask[]> {
  await fetch(`${BASE_URL}/auto_subtask/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tasks: [taskId], user_id: userId }),
  });
  return fetchJSON<Subtask[]>(`/api/task/${taskId}/subtasks`);
}

export async function generateTags(taskId: number, userId: string): Promise<Tag[]> {
  await fetch(`${BASE_URL}/auto_tag/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tasks: [taskId], user_id: userId }),
  });
  return fetchJSON<Tag[]>(`/api/task/${taskId}/tags`);
}
