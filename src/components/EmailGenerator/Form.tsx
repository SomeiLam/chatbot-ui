import React from 'react'
import { EmailFormData } from '../../types'
import { Loader2 } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

interface FormProps {
  handleSubmit: (e: React.FormEvent) => void
  formData: EmailFormData
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  isLoading: boolean
  handleReset: () => void
}

const Form: React.FC<FormProps> = ({
  handleSubmit,
  formData,
  handleInputChange,
  isLoading,
  handleReset,
}) => {
  const { theme } = useTheme()

  return (
    <form
      onSubmit={handleSubmit}
      className="relative space-y-6 p-6 rounded shadow"
    >
      {isLoading && (
        <div
          className="
            absolute inset-0 
            bg-white/50     
            flex items-center justify-center
            z-10
          "
        >
          {/* Spinner */}
          <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <h2 className="text-xl font-semibold  mb-6">
        Generate Personalized Outreach Email
      </h2>
      <div>
        <label className="block text-sm font-medium  mb-1">
          Prospect Company Name
        </label>
        <input
          type="text"
          name="practiceName"
          value={formData.practiceName}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm  focus:outline-amber-500"
          required
          autoFocus
        />
      </div>

      <div>
        <label className="block text-sm font-medium  mb-1">
          Industry / Sector
        </label>
        <input
          type="text"
          name="industry"
          value={formData.industry}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-amber-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium  mb-1">
          Recipient’s Full Name
        </label>
        <input
          type="text"
          name="recipientName"
          value={formData.recipientName}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-amber-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium  mb-1">
          Recipient’s Position / Title
        </label>
        <input
          type="text"
          name="recipientPosition"
          value={formData.recipientPosition}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-amber-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium  mb-1">
          Recent Event or Trigger
        </label>
        <input
          type="text"
          name="participants"
          value={formData.recentEvent}
          onChange={handleInputChange}
          min="0"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-amber-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium  mb-1">
          Core Feature (optional)
        </label>
        <input
          type="text"
          name="coreFeature"
          value={formData.coreFeature}
          onChange={handleInputChange}
          min="0"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-amber-500"
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`flex-1 text-white py-2 px-4 rounded-md cursor-pointer
                         focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2
                         disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                           theme === 'dark'
                             ? 'bg-amber-800 hover:bg-amber-700'
                             : 'bg-amber-600 hover:bg-amber-700 '
                         }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Searching...
            </span>
          ) : (
            'Submit'
          )}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className={`flex-1 py-2 px-4 rounded-md  cursor-pointer
                         focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                         transition-colors ${
                           theme === 'dark'
                             ? 'bg-gray-700 hover:bg-gray-600'
                             : 'bg-gray-200 hover:bg-gray-300'
                         }`}
        >
          Reset
        </button>
      </div>
    </form>
  )
}

export default Form
