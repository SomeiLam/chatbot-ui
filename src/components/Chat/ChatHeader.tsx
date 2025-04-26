import React from 'react'
import { MessageSquare } from 'lucide-react'
import ThemeSwitcher from './ThemeSwitcher'
import { useTheme } from '../../context/ThemeContext'

interface ChatHeaderProps {
  title: string
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title }) => {
  const { theme, accentColor } = useTheme()

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 border-b transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gray-700 border-gray-600'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-center space-x-2">
        <MessageSquare
          className={`h-6 w-6 ${
            theme === 'dark' ? accentColor.darkText : accentColor.lightText
          }`}
        />
        <h2 className="font-semibold text-lg">{title}</h2>
      </div>
      <ThemeSwitcher />
    </div>
  )
}

export default ChatHeader
