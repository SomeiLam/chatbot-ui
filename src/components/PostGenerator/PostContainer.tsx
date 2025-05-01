import React, { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import PostCard from './PostCard'
import PostInput from './PostInput'
import Loading from './Loading'
import Header from '../ui/Header'
import Pill from '../ui/Pill'
import { topicIdeas } from '../../constants'

const PostContainer = () => {
  const [topic, setTopic] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [post, setPost] = useState('')

  const { theme } = useTheme()

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value)
  }

  const handleGenerate = async () => {
    if (!topic.trim()) return

    setIsLoading(true)
    setPost('')
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/generate-post`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic }),
        }
      )

      if (!res.ok) {
        const errText = await res.text()
        throw new Error(`API error: ${res.status} ${errText}`)
      }
      const { response: botContent } = await res.json()
      setPost(botContent)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`flex flex-col h-[80dvh] w-full max-w-4xl mx-auto shadow-lg rounded-xl overflow-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}
    >
      <Header agentIndex={0} />
      <div className="p-4">
        <PostInput
          topic={topic}
          onTopicChange={handleTopicChange}
          onGenerate={handleGenerate}
          isLoading={isLoading}
        />
      </div>
      {isLoading && <Loading />}
      <div className="overflow-y-auto">
        {post ? (
          <PostCard post={post} />
        ) : (
          !isLoading && (
            <div className="flex flex-row flex-wrap gap-5 mx-5">
              {topicIdeas.map((topic) => (
                <Pill
                  key={topic}
                  label={topic}
                  onClick={() => setTopic(topic)}
                  isDark={theme === 'dark'}
                />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default PostContainer
