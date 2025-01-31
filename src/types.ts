export interface OllamaModel {
  name: string
  size: number
  lastUpdated: string
  status: 'running' | 'stopped'
}

export interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}
