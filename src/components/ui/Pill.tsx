import React from 'react'

type PillProps = {
  label: string
  onClick: () => void
  isDark: boolean
}

const Pill: React.FC<PillProps> = ({ label, onClick, isDark }) => {
  const baseStyles =
    'inline-block text-sm px-3 py-1 rounded-full cursor-pointer transition-border'
  const lightStyles = 'bg-gray-100 border border-gray-200 hover:border-gray-400'
  const darkStyles = 'bg-gray-700 border border-gray-600 hover:border-gray-300'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${isDark ? darkStyles : lightStyles}`}
    >
      {label}
    </button>
  )
}

export default Pill
