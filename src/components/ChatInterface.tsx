import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ollamaService } from '../services/ollamaService'
import { ChatMessage } from '../types'
import { FaPaperPlane } from 'react-icons/fa6'

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [selectedModel, setSelectedModel] = useState('llama2')
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()

  const sendMessage = async () => {
    if (!currentMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: currentMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setCurrentMessage('')
    setIsLoading(true)

    try {
      const aiResponse = await ollamaService.chat(selectedModel, currentMessage)
      const aiMessage: ChatMessage = {
        id: Date.now().toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Chat error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="mb-4">
        <select 
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="llama2">Llama 2</option>
          <option value="mistral">Mistral</option>
        </select>
      </div>
      <div className="h-64 overflow-y-auto mb-4 border p-2">
        {messages.map(msg => (
          <div 
            key={msg.id} 
            className={`mb-2 p-2 rounded ${
              msg.sender === 'user' 
                ? 'bg-blue-100 text-right' 
                : 'bg-green-100 text-left'
            }`}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="text-center text-gray-500">Laden...</div>
        )}
      </div>
      <div className="flex">
        <input 
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder={t('chat.placeholder')}
          className="flex-grow p-2 border rounded-l"
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button 
          onClick={sendMessage}
          className="bg-ollama-primary text-white p-2 rounded-r"
        >
          <FaPaperPlane size={20} />
        </button>
      </div>
    </div>
  )
}

export default ChatInterface
