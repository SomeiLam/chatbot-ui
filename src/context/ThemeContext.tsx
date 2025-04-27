import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { AccentColor } from '../types'

// Define accent color options
const accentColorsData: AccentColor[] = [
  {
    name: 'blue',
    lightBg: 'bg-blue-500',
    darkBg: 'bg-blue-600',
    lightText: 'text-blue-500',
    darkText: 'text-blue-400',
    lightChatBg: 'bg-blue-50',
    darkChatBg: 'bg-indigo-900/50',
    focusRing: 'focus:ring-blue-500',
    spinner: 'border-blue-500',
  },
  {
    name: 'purple',
    lightBg: 'bg-purple-500',
    darkBg: 'bg-purple-600',
    lightText: 'text-purple-500',
    darkText: 'text-purple-400',
    lightChatBg: 'bg-purple-50',
    darkChatBg: 'bg-purple-900/50',
    focusRing: 'focus:ring-purple-500',
    spinner: 'border-purple-500',
  },
  {
    name: 'green',
    lightBg: 'bg-green-500',
    darkBg: 'bg-green-600',
    lightText: 'text-green-500',
    darkText: 'text-green-400',
    lightChatBg: 'bg-green-50',
    darkChatBg: 'bg-green-800/50',
    focusRing: 'focus:ring-green-500',
    spinner: 'border-green-500',
  },
  {
    name: 'amber',
    lightBg: 'bg-amber-500',
    darkBg: 'bg-amber-600',
    lightText: 'text-amber-500',
    darkText: 'text-amber-400',
    lightChatBg: 'bg-amber-50',
    darkChatBg: 'bg-amber-900/25',
    focusRing: 'focus:ring-amber-500',
    spinner: 'border-amber-500',
  },
]

// Create the context with default values
interface ThemeContextType {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  accentColor: AccentColor
  setAccentColor: (color: AccentColor) => void
  accentColors: AccentColor[]
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  accentColor: accentColorsData[0],
  setAccentColor: () => {},
  accentColors: accentColorsData,
})

// Hook for using the theme context
export const useTheme = () => useContext(ThemeContext)

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize state with stored values or defaults
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('theme')
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches

    return (storedTheme as 'light' | 'dark') || (prefersDark ? 'dark' : 'light')
  })

  const [accentColor, setAccentColor] = useState<AccentColor>(() => {
    const storedAccent = localStorage.getItem('accentColor')
    return storedAccent
      ? accentColorsData.find((color) => color.name === storedAccent) ||
          accentColorsData[0]
      : accentColorsData[0]
  })

  // Update local storage when theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme)

    // Update document with the current theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  // Update local storage when accent color changes
  useEffect(() => {
    localStorage.setItem('accentColor', accentColor.name)
  }, [accentColor])

  const contextValue = {
    theme,
    setTheme,
    accentColor,
    setAccentColor,
    accentColors: accentColorsData,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
