import React from 'react'
import { Message } from '../../types'
import { useTheme } from '../../context/ThemeContext'

interface ChatMessageProps {
  message: Message
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { theme, accentColor } = useTheme()

  const isUser = message.sender === 'user'

  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Different styles based on sender
  const containerClasses = isUser ? 'ml-auto items-end' : 'mr-auto items-start'

  const messageBubbleClasses = isUser
    ? `${
        theme === 'dark' ? accentColor.darkBg : accentColor.lightBg
      } text-white`
    : theme === 'dark'
      ? 'bg-gray-700 text-white'
      : 'bg-gray-200 text-gray-800'

  return (
    <div
      className={`flex flex-col max-w-[80%] ${containerClasses} animate-fadeIn`}
      style={{
        animationDuration: '0.3s',
        animationFillMode: 'both',
      }}
    >
      <div
        className={`px-4 py-2 rounded-2xl shadow-sm ${messageBubbleClasses}`}
      >
        {message.content}
      </div>
      <span
        className={`text-xs mt-1 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}
      >
        {formatTime(message.timestamp)}
      </span>
    </div>
  )
}

export default ChatMessage
