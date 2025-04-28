import { useTheme } from '../../context/ThemeContext'

const Loading = () => {
  const { theme } = useTheme()
  return (
    <div className="flex w-full items-center justify-center h-full">
      <span
        className={`italic ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        Generating post
        <span className="ml-1">
          <span className="typing-dot">.</span>
          <span className="typing-dot">.</span>
          <span className="typing-dot">.</span>
        </span>
      </span>
    </div>
  )
}

export default Loading
