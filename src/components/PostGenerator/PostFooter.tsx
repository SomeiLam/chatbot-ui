import { ThumbsUp, MessageSquare, Repeat, Send } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const PostFooter = () => {
  const { theme } = useTheme()

  const buttonClass = `flex items-center py-2 px-3 rounded-md transition-colors duration-200 ${
    theme === 'dark'
      ? 'hover:bg-gray-600 text-gray-300'
      : 'hover:bg-gray-100 text-gray-700'
  }`

  return (
    <div
      className={`border-t ${
        theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
      } p-2`}
    >
      <div
        className={`flex items-center justify-between text-sm ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        } mb-2 px-2`}
      >
        <span>128 likes</span>
        <span>32 comments</span>
      </div>

      <div className="flex justify-between px-2">
        <button className={buttonClass}>
          <ThumbsUp size={18} className="mr-2" />
          <span>Like</span>
        </button>

        <button className={buttonClass}>
          <MessageSquare size={18} className="mr-2" />
          <span>Comment</span>
        </button>

        <button className={buttonClass}>
          <Repeat size={18} className="mr-2" />
          <span>Repost</span>
        </button>

        <button className={buttonClass}>
          <Send size={18} className="mr-2" />
          <span>Send</span>
        </button>
      </div>
    </div>
  )
}

export default PostFooter
