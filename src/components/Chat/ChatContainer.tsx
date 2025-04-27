import React, { useState } from 'react'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import { useTheme } from '../../context/ThemeContext'
import { Message } from '../../types'

const ChatContainer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'bot-1',
      content: 'Welcome! What is your practice name?',
      sender: 'bot',
      timestamp: new Date().toISOString(),
    },
  ])
  const [step, setStep] = useState<number>(0)
  const [practiceName, setPracticeName] = useState<string>('')
  const [userName, setUserName] = useState<string>('')

  const { theme } = useTheme()

  const handleSendMessage = async (message: string) => {
    if (message.trim() === '') return
    setIsLoading(true)

    const timestamp = new Date().toISOString()
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: message,
      sender: 'user',
      timestamp,
    }

    if (step === 0) {
      // Save practice name, ask for user name
      setPracticeName(message)
      setMessages((prev) => [...prev, userMessage])
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now() + 1}`,
            content: 'Great! What is your name?',
            sender: 'bot',
            timestamp: new Date().toISOString(),
          },
        ])
      }, 1000)
      setIsLoading(false)
      setStep(1)
    } else if (step === 1) {
      // Save user name, ask main question
      setUserName(message)
      setMessages((prev) => [...prev, userMessage])
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now() + 1}`,
            content: 'How can I help you today?',
            sender: 'bot',
            timestamp: new Date().toISOString(),
          },
        ])
        setIsLoading(false)
      }, 1000)
      setStep(2)
    } else {
      // Final step: send to FastAPI backend
      setMessages((prev) => [...prev, userMessage])
      try {
        const res = await fetch('http://localhost:8000/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer: practiceName,
            person: userName,
            inquiry: message,
            history:
              message.length >= 5 ? messages.slice(5, messages.length) : [],
          }),
        })
        const { response: botContent } = await res.json()
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now() + 1}`,
            content: botContent,
            sender: 'bot',
            timestamp: new Date().toISOString(),
          },
        ])
      } catch (error) {
        console.error('Error sending message:', error)
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now() + 1}`,
            content: 'Sorry, something went wrong.',
            sender: 'bot',
            timestamp: new Date().toISOString(),
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }
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
          className={`flex flex-col h-[80dvh] w-full max-w-4xl mx-auto shadow-lg rounded-xl overflow-hidden transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gray-800 text-white'
              : 'bg-white text-gray-800'
          }`}
        >
          <ChatHeader title="Sikka Chatbot Assistant" />
          <ChatMessages messages={messages} isLoading={isLoading} />
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}

export default ChatContainer
