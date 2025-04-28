import { agents } from '../../constants'
import { useTheme } from '../../context/ThemeContext'
import { AgentType } from '../../types'
import AgentIcon from './AgentIcon'

interface AgentsProps {
  selectedAgent: string
  setSelectedAgent: (agent: AgentType) => void
}

const Agents: React.FC<AgentsProps> = ({ selectedAgent, setSelectedAgent }) => {
  const { theme, setAccentColor, accentColors } = useTheme()

  return (
    <div className="flex flex-row lg:flex-col gap-5 lg:h-[80dvh] justify-between">
      {agents.map((agent) => {
        const color = accentColors.find((color) => color.name === agent.color)
        const isSelected = selectedAgent === agent.name
        const isDarkTheme = theme === 'dark'
        return (
          <button
            key={agent.name}
            className={`
              w-auto h-auto lg:w-[300px] flex flex-col p-5 lg:h-full max-w-4xl mx-auto items-start gap-3
              shadow-lg rounded-xl
              transition-transform duration-300 ease-out scale-95 hover:scale-100
              ${
                isDarkTheme
                  ? ` ${selectedAgent === agent.name ? `${color?.darkChatBg}` : 'bg-gray-800'}`
                  : ` ${selectedAgent === agent.name ? `${color?.lightChatBg}` : 'bg-gray-50'}`
              }
              ${isSelected ? 'scale-100' : 'cursor-pointer'}
            `}
            onClick={() => {
              setSelectedAgent(agent.name as AgentType)
              setAccentColor(accentColors[agent.index])
            }}
          >
            <div className="flex flex-row gap-5 items-center">
              <AgentIcon agentIndex={agent.index} isSelected={isSelected} />
              <h3
                className={`hidden lg:flex text-lg ${isSelected ? 'font-semibold' : ''} ${
                  isDarkTheme ? 'text-gray-300' : 'text-gray-800'
                }`}
              >
                {agent.name}
              </h3>
            </div>
            <p
              className={`hidden lg:flex text-sm ${
                isDarkTheme ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {agent.description}
            </p>
          </button>
        )
      })}
    </div>
  )
}

export default Agents
