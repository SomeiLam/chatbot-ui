import React from 'react'
import { Message } from '../../types'
import { useTheme } from '../../context/ThemeContext'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Bot, User } from 'lucide-react'

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

  // Container alignment
  const wrapperClasses = isUser
    ? 'flex flex-row-reverse gap-2'
    : 'flex flex-row'

  // Bubble styles
  const messageBubbleClasses = isUser
    ? `${theme === 'dark' ? accentColor.darkBg : accentColor.lightBg} text-white`
    : theme === 'dark'
      ? 'bg-gray-700 text-white'
      : 'bg-gray-200/60 text-gray-800'

  return (
    <div
      className={`${wrapperClasses} items-start space-x-2 animate-fadeIn`}
      style={{ animationDuration: '0.3s', animationFillMode: 'both' }}
    >
      {/* Icon */}
      <div
        className={`flex-shrink-0 p-2 rounded-2xl ${theme === 'dark' ? accentColor.darkChatBg : accentColor.lightChatBg}`}
      >
        {isUser ? (
          <User
            className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-300' : 'text-blue-600'}`}
          />
        ) : (
          <Bot
            className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
          />
        )}
      </div>

      {/* Message & timestamp */}
      <div className="flex flex-col max-w-[80%]">
        <div
          className={`px-4 py-2 rounded-2xl shadow-sm ${messageBubbleClasses}`}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children, ...props }) => (
                <p className="mb-2 leading-relaxed" {...props}>
                  {children}
                </p>
              ),
              ul: ({ children, ...props }) => (
                <ul className="list-disc list-inside mb-2 space-y-1" {...props}>
                  {children}
                </ul>
              ),
              li: ({ children, ...props }) => (
                <li className="ml-4" {...props}>
                  {children}
                </li>
              ),
              a: ({ children, ...props }) => (
                <a
                  className="text-blue-500 hover:underline"
                  {...props}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
        <span
          className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
        >
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  )
}

export default ChatMessage
