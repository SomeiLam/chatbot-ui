import React from 'react'
import { useTheme } from '../../context/ThemeContext'

interface PostInputProps {
  topic: string
  onTopicChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onGenerate: () => void
  isLoading: boolean
}

const PostInput: React.FC<PostInputProps> = ({
  topic,
  onTopicChange,
  onGenerate,
  isLoading,
}) => {
  const { theme } = useTheme()
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={topic}
        onChange={onTopicChange}
        placeholder="Enter a topic for your LinkedIn post..."
        disabled={isLoading}
        className={`flex-1 px-4 py-2 rounded-lg border ${
          theme === 'dark'
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
            : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-blue-500'
        } focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200`}
        autoFocus
      />
      <button
        onClick={onGenerate}
        disabled={isLoading || !topic.trim()}
        className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
          isLoading || !topic.trim()
            ? 'bg-gray-400 cursor-not-allowed text-white'
            : theme === 'dark'
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        Generate
      </button>
    </div>
  )
}

export default PostInput
