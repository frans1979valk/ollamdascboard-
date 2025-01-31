import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ollamaService } from '../services/ollamaService'
import { OllamaModel } from '../types'
import { FaCirclePlay, FaCircleStop } from 'react-icons/fa6'

const ModelList: React.FC = () => {
  const [models, setModels] = useState<OllamaModel[]>([])
  const { t } = useTranslation()

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const fetchedModels = await ollamaService.getModels()
        // Use JSON parse/stringify to create a deep clone
        setModels(JSON.parse(JSON.stringify(fetchedModels)))
      } catch (error) {
        console.error('Failed to fetch models:', error)
        setModels([])
      }
    }

    fetchModels()
    const intervalId = setInterval(fetchModels, 30000) // Refresh every 30 seconds

    return () => clearInterval(intervalId)
  }, [])

  const toggleModelStatus = async (model: OllamaModel) => {
    let result = false
    if (model.status === 'stopped') {
      result = await ollamaService.startModel(model.name)
    } else {
      result = await ollamaService.stopModel(model.name)
    }

    if (result) {
      setModels(prevModels => 
        prevModels.map(m => 
          m.name === model.name 
            ? { ...m, status: m.status === 'stopped' ? 'running' : 'stopped' } 
            : m
        )
      )
    }
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{t('models.available')}</h2>
      {models.length === 0 ? (
        <div className="text-center text-gray-500">Geen modellen beschikbaar</div>
      ) : (
        <ul>
          {models.map(model => (
            <li 
              key={model.name} 
              className="flex justify-between items-center p-2 border-b"
            >
              <div>
                <span className="font-semibold">{model.name}</span>
                <div className="text-sm text-gray-500">
                  {t('models.size')}: {(model.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
              <button 
                onClick={() => toggleModelStatus(model)}
                className={`p-2 rounded ${
                  model.status === 'running' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-green-500 text-white'
                }`}
              >
                {model.status === 'running' ? <FaCircleStop size={20} /> : <FaCirclePlay size={20} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ModelList
