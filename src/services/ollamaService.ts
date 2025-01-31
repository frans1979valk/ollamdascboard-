import axios from 'axios'
import { OllamaModel, ChatMessage } from '../types'

const OLLAMA_BASE_URL = 'http://192.168.188.175:11434'

export const ollamaService = {
  async getModels(): Promise<OllamaModel[]> {
    try {
      const response = await axios.get(`${OLLAMA_BASE_URL}/api/tags`, {
        timeout: 5000  // 5 seconden timeout
      })
      return (response.data.models || []).map((model: any) => ({
        name: model.name || 'Unknown Model',
        size: model.size || 0,
        lastUpdated: model.modified_at || new Date().toISOString(),
        status: 'stopped'
      }))
    } catch (error) {
      console.error('Gedetailleerde fout bij ophalen modellen:', error)
      return []
    }
  },

  async startModel(modelName: string): Promise<boolean> {
    try {
      await axios.post(`${OLLAMA_BASE_URL}/api/pull`, { name: modelName }, {
        timeout: 10000  // Langere timeout voor model pull
      })
      return true
    } catch (error) {
      console.error(`Fout bij starten model ${modelName}:`, error)
      return false
    }
  },

  async stopModel(modelName: string): Promise<boolean> {
    try {
      await axios.post(`${OLLAMA_BASE_URL}/api/stop`, { name: modelName }, {
        timeout: 5000
      })
      return true
    } catch (error) {
      console.error(`Fout bij stoppen model ${modelName}:`, error)
      return false
    }
  },

  async chat(model: string, message: string): Promise<string> {
    try {
      const response = await axios.post(`${OLLAMA_BASE_URL}/api/chat`, {
        model,
        messages: [{ role: 'user', content: message }]
      }, {
        timeout: 10000
      })
      return response.data.message.content
    } catch (error) {
      console.error('Fout in chat:', error)
      return 'Er is een fout opgetreden bij communicatie met het model.'
    }
  }
}
