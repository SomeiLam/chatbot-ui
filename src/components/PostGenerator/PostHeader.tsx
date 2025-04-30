import { Bot, Clock } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const PostHeader = () => {
  const { theme, accentColor } = useTheme()

  const formattedDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
  return (
    <div className="flex items-start p-4">
      <div
        className={`flex-shrink-0 p-2 rounded-2xl ${theme === 'dark' ? accentColor.darkChatBg : accentColor.lightChatBg}`}
      >
        <Bot className="w-6 h-6 rounded-full object-cover" />
      </div>

      <div className="ml-3 flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h3
              className={`font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              Amy AI
            </h3>
            <p
              className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
              }`}
            >
              Product Manager at Amy AI
            </p>
          </div>

          <div
            className={`flex items-center text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            <Clock size={14} className="mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostHeader
