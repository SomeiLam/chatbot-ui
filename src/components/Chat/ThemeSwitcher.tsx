import React from 'react'
import { Sun, Moon, Palette } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, accentColor, setAccentColor, accentColors } =
    useTheme()

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  // Cycle through accent colors
  const cycleAccentColor = () => {
    const currentIndex = accentColors.findIndex(
      (color) => color.name === accentColor.name
    )
    const nextIndex = (currentIndex + 1) % accentColors.length
    setAccentColor(accentColors[nextIndex])
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={cycleAccentColor}
        className={`p-1.5 rounded-full transition-colors duration-300 ${
          theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
        }`}
        title="Change accent color"
      >
        <Palette
          className={`h-5 w-5 ${
            theme === 'dark' ? accentColor.darkText : accentColor.lightText
          }`}
        />
      </button>

      <button
        onClick={toggleTheme}
        className={`p-1.5 rounded-full transition-colors duration-300 ${
          theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
        }`}
        title={
          theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
        }
      >
        {theme === 'light' ? (
          <Moon className="h-5 w-5 text-gray-700" />
        ) : (
          <Sun className="h-5 w-5 text-yellow-300" />
        )}
      </button>
    </div>
  )
}

export default ThemeSwitcher
