import ThemeSwitcher from './ThemeSwitcher'
import { useTheme } from '../../context/ThemeContext'
import AgentIcon from '../Agents/AgentIcon'
import { agents } from '../../constants'

interface HeaderProps {
  agentIndex: 0 | 1 | 2 | 3
}

const Header: React.FC<HeaderProps> = ({ agentIndex }) => {
  const { theme } = useTheme()
  const agent = agents.find((agent) => agent.index === agentIndex)

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 border-b transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gray-700 border-gray-600'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-center space-x-2">
        <AgentIcon agentIndex={agentIndex} />
        <h2 className="font-semibold text-lg">
          Sikka {agent?.name || 'Assistant'}
        </h2>
      </div>
      <ThemeSwitcher />
    </div>
  )
}

export default Header
