import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import Markdown from '../ui/Markdown'

interface EmailSummaryProps {
  email: string
}

const EmailSummary: React.FC<EmailSummaryProps> = ({ email }) => {
  const { theme } = useTheme()

  return (
    <div className="p-6">
      <div
        className={`prose lg:prose-xl prose-blue max-w-none py-4 px-6 rounded-2xl ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
        }`}
      >
        <Markdown markdown={email} />
      </div>
    </div>
  )
}

export default EmailSummary
