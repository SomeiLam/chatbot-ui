import React from 'react'
import { MessageSquareText, Mails, MapPinned, Linkedin } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

interface AgentIconProps {
  agentIndex: number
  isSelected?: boolean
}

const AgentIcon: React.FC<AgentIconProps> = ({
  agentIndex,
  isSelected = true,
}) => {
  const { theme, accentColors } = useTheme()
  const color = accentColors[agentIndex]
  const isDarkTheme = theme === 'dark'

  return (
    <>
      {agentIndex === 0 ? (
        <Linkedin
          className={`h-5 w-5 ${isSelected ? (isDarkTheme ? color?.darkText : color?.lightText) : 'text-gray-400'}`}
        />
      ) : agentIndex === 1 ? (
        <MessageSquareText
          className={`h-5 w-5 ${isSelected ? (isDarkTheme ? color?.darkText : color?.lightText) : 'text-gray-400'}`}
        />
      ) : agentIndex === 2 ? (
        <MapPinned
          className={`h-5 w-5 ${isSelected ? (isDarkTheme ? color?.darkText : color?.lightText) : 'text-gray-400'}`}
        />
      ) : (
        <Mails
          className={`h-5 w-5 ${isSelected ? (isDarkTheme ? color?.darkText : color?.lightText) : 'text-gray-400'}`}
        />
      )}
    </>
  )
}

export default AgentIcon
