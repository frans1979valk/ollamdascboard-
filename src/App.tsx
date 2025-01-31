import React from 'react'
import { useTranslation } from 'react-i18next'
import ModelList from './components/ModelList'
import ChatInterface from './components/ChatInterface'
import ServerStatus from './components/ServerStatus'
import LanguageToggle from './components/LanguageToggle'
import './i18n'

const App: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Ollama Models Dashboard</h1>
          <LanguageToggle />
        </div>
        
        <ServerStatus />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <ModelList />
          <ChatInterface />
        </div>
      </div>
    </div>
  )
}

export default App
