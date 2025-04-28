import React from 'react'
import { EventFormData } from '../../types'
import { Loader2 } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

interface FormProps {
  handleSubmit: (e: React.FormEvent) => void
  formData: EventFormData
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
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <h2 className="text-xl font-semibold  mb-6">Event Planning Details</h2>
      <div>
        <label className="block text-sm font-medium  mb-1">Event Topic</label>
        <input
          type="text"
          name="topic"
          value={formData.topic}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm  focus:outline-green-500"
          required
          autoFocus
        />
      </div>

      <div>
        <label className="block text-sm font-medium  mb-1">
          Event Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium  mb-1">Event City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium  mb-1">
          Tentative Date
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium  mb-1">
          Expected Participants
        </label>
        <input
          type="number"
          name="participants"
          value={formData.participants}
          onChange={handleInputChange}
          min="0"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium  mb-1">Budget</label>
        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleInputChange}
          min="0"
          step="0.01"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium  mb-1">Venue Type</label>
        <input
          type="text"
          name="venueType"
          value={formData.venueType}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-500"
          required
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`flex-1 text-white py-2 px-4 rounded-md cursor-pointer
                         focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                         disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                           theme === 'dark'
                             ? 'bg-green-800 hover:bg-green-700'
                             : 'bg-green-600 hover:bg-green-700 '
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
