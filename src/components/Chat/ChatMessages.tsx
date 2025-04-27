import React, { useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import { Message } from '../../types'
import { useTheme } from '../../context/ThemeContext'

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div
      className={`flex-1 overflow-y-auto p-4 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
      }`}
    >
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading && (
          <div className="flex mb-2">
            <span
              className={`italic ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              💬 Sikka is typing
              <span className="ml-1">
                <span className="typing-dot">.</span>
                <span className="typing-dot">.</span>
                <span className="typing-dot">.</span>
              </span>
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default ChatMessages
