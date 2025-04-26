import React, { useState } from 'react'
import { Send } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

interface ChatInputProps {
  onSendMessage: (message: string) => void
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('')
  const { theme, accentColor } = useTheme()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }

  return (
    <div
      className={`border-t p-3 transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gray-700 border-gray-600'
          : 'bg-white border-gray-200'
      }`}
    >
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className={`flex-1 py-2 px-4 rounded-full outline-none transition-all duration-300 focus:ring-2 ${accentColor.focusRing} ${
            theme === 'dark'
              ? ` text-white placeholder-gray-400  ${accentColor.darkChatBg}`
              : ` text-gray-800 placeholder-gray-500 ${accentColor.lightChatBg}`
          }`}
        />
        <button
          type="submit"
          className={`p-2 rounded-full transition-all duration-300 ${
            message.trim() === ''
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:shadow-md active:scale-95'
          } ${theme === 'dark' ? accentColor.darkBg : accentColor.lightBg}`}
          disabled={message.trim() === ''}
        >
          <Send className="h-5 w-5 text-white" />
        </button>
      </form>
    </div>
  )
}

export default ChatInput
