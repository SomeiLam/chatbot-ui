import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import Markdown from '../ui/Markdown'

interface MarketingSummaryProps {
  marketingReport: string
}

const MarketingSummary: React.FC<MarketingSummaryProps> = ({
  marketingReport,
}) => {
  const { theme } = useTheme()
  const report = marketingReport
    .replace(/^```[\r\n]*/, '')
    .replace(/[\r\n]*```$/, '')

  const markdown = report.replace(/\\n/g, '\n')
  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">Marketing Report</h3>
      <div
        className={`prose lg:prose-xl prose-blue max-w-none py-4 px-6 rounded-2xl ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
        }`}
      >
        <Markdown markdown={markdown} />
      </div>
    </div>
  )
}

export default MarketingSummary
