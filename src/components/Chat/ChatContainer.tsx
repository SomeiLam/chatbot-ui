import React, { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { AgentType } from '../../types'
import Agents from '../Agents/Agents'
import Chat from '../CustomerSupport/Chat'
import PostContainer from '../PostGenerator/PostContainer'
import PlannerContainer from '../EventPlanner/PlannerContainer'
import EmailContainer from '../EmailGenerator/EmailContainer'

const ChatContainer: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<AgentType>(
    'Customer Outreach Agent'
  )

  const { theme } = useTheme()
  console.log(selectedAgent)
  return (
    <div
      className={`min-h-screen bg-gradient-to-br transition-colors duration-300 ${
        theme === 'dark'
          ? 'from-gray-900 to-gray-800'
          : 'from-gray-100 to-gray-200'
      }`}
    >
      <div className="lg:w-7xl h-full mx-auto flex flex-col lg:flex-row gap-5 items-center justify-center p-[5%]">
        <Agents
          selectedAgent={selectedAgent}
          setSelectedAgent={setSelectedAgent}
        />
        {selectedAgent === 'Customer Support' && <Chat />}
        {selectedAgent === 'LinkedIn Post Generator' && <PostContainer />}
        {selectedAgent === 'Task Event Planner' && <PlannerContainer />}
        {selectedAgent === 'Customer Outreach Agent' && <EmailContainer />}
      </div>
    </div>
  )
}

export default ChatContainer
