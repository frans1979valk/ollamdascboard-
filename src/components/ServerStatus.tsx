import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { FaWifi } from 'react-icons/fa'
import { FaSlash } from 'react-icons/fa6'

const ServerStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [serverAddress, setServerAddress] = useState('http://192.168.188.175:11434')
  const { t } = useTranslation()

  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        await axios.get(`${serverAddress}/api/tags`)
        setIsConnected(true)
      } catch {
        setIsConnected(false)
      }
    }

    checkServerConnection()
    const interval = setInterval(checkServerConnection, 10000)
    return () => clearInterval(interval)
  }, [serverAddress])

  return (
    <div className="p-4 bg-white rounded shadow flex items-center justify-between">
      <div className="flex items-center">
        <span className="mr-2">{t('server.status')}:</span>
        {isConnected ? (
          <div className="flex items-center text-green-500">
            <FaWifi className="mr-1" size={20} />
            {t('server.connected')}
          </div>
        ) : (
          <div className="flex items-center text-red-500">
            <div className="relative mr-1">
              <FaWifi size={20} />
              <FaSlash className="absolute top-0 left-0 text-red-500" size={20} />
            </div>
            {t('server.disconnected')}
          </div>
        )}
      </div>
      <div className="text-sm text-gray-500">{serverAddress}</div>
    </div>
  )
}

export default ServerStatus
