import { useState } from 'react'
import ChatMessages from '../Chat/ChatMessages'
import ChatInput from '../Chat/ChatInput'
import { useTheme } from '../../context/ThemeContext'
import { Message } from '../../types'
import Header from '../ui/Header'

const Chat = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'bot-1',
      content: 'Welcome! What is your practice name?',
      sender: 'bot',
      timestamp: new Date().toISOString(),
    },
  ])
  const [practiceName, setPracticeName] = useState<string>('')
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

    if (practiceName === '') {
      // Save practice name, ask for user name
      setPracticeName(message)
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
      }, 1000)
      setIsLoading(false)
    } else {
      // Final step: send to FastAPI backend
      setMessages((prev) => [...prev, userMessage])
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer: practiceName,
            inquiry: message,
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
    // <div className="w-7xl mx-auto px-4 py-8">
    <div
      className={`flex flex-col h-[80dvh] w-full max-w-4xl mx-auto shadow-lg rounded-xl overflow-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}
    >
      <Header agentIndex={1} />
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      {/* </div> */}
    </div>
  )
}

export default Chat
