import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      nl: {
        translation: {
          models: {
            title: 'Ollama Modellen',
            available: 'Beschikbare Modellen',
            size: 'Grootte',
            lastUpdated: 'Laatste Update'
          },
          chat: {
            placeholder: 'Typ hier je bericht...',
            send: 'Verzenden'
          },
          server: {
            status: 'Server Status',
            connected: 'Verbonden',
            disconnected: 'Verbroken'
          }
        }
      },
      en: {
        translation: {
          models: {
            title: 'Ollama Models',
            available: 'Available Models',
            size: 'Size',
            lastUpdated: 'Last Updated'
          },
          chat: {
            placeholder: 'Type your message...',
            send: 'Send'
          },
          server: {
            status: 'Server Status',
            connected: 'Connected',
            disconnected: 'Disconnected'
          }
        }
      }
    },
    lng: 'nl',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
