import React from 'react'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import { useTheme } from '../../context/ThemeContext'

interface PostCardProps {
  post: string
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { theme } = useTheme()
  return (
    <div
      className={`w-5/6 mx-auto my-10 animate-fade-in rounded-lg shadow-md ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-white'
      } transition-colors duration-300`}
      style={{ animationDuration: '0.5s' }}
    >
      <PostHeader />

      <div className="p-4">
        <p
          className={`text-base whitespace-pre-line ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
          }`}
        >
          {post}
        </p>
      </div>

      <PostFooter />
    </div>
  )
}

export default PostCard
