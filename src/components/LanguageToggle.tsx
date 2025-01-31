import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaEarthAmericas } from 'react-icons/fa6'

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'nl' ? 'en' : 'nl'
    i18n.changeLanguage(newLang)
  }

  return (
    <button 
      onClick={toggleLanguage} 
      className="p-2 bg-ollama-primary text-white rounded hover:bg-ollama-secondary"
    >
      <FaEarthAmericas size={20} />
    </button>
  )
}

export default LanguageToggle
