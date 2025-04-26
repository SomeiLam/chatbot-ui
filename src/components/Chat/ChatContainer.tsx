import React, { useState } from 'react'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import { useTheme } from '../../context/ThemeContext'
import { Message } from '../../types'

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! How can I help you today?',
      sender: 'bot',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
      id: '2',
      content: 'I have a question about your services.',
      sender: 'user',
      timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    },
    {
      id: '3',
      content:
        "Sure, I'd be happy to help! What would you like to know about our services?",
      sender: 'bot',
      timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    },
  ])

  const { theme } = useTheme()

  const handleSendMessage = (message: string) => {
    if (message.trim() === '') return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: `Thanks for your message: "${message}". How can I assist you further?`,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 bg-gradient-to-br  transition-colors duration-300 ${
        theme === 'dark'
          ? 'from-gray-900 to-gray-800'
          : 'from-gray-100 to-gray-200'
      }`}
    >
      <div className="w-full max-w-4xl">
        <div
          className={`flex flex-col h-[600px] w-full max-w-4xl mx-auto shadow-lg rounded-xl overflow-hidden transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gray-800 text-white'
              : 'bg-white text-gray-800'
          }`}
        >
          <ChatHeader title="Chatbot Assistant" />
          <ChatMessages messages={messages} />
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  )
}

export default ChatContainer
