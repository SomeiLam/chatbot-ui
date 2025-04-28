import React from 'react'
import { VenueDetails as Venue } from '../../types'
import { useTheme } from '../../context/ThemeContext'

interface VenueDetailsProps {
  venueDetails: Venue
}

const VenueSummary: React.FC<VenueDetailsProps> = ({ venueDetails }) => {
  const { theme, accentColor } = useTheme()

  return (
    <div className=" p-6 border-b border-gray-200">
      <h3 className="text-xl font-semibold mb-4">Venue Details</h3>
      <div className="space-y-3">
        <div
          className={`flex justify-between px-5 py-2 rounded-4xl ${
            theme === 'dark' ? accentColor.darkChatBg : accentColor.lightChatBg
          }`}
        >
          <span
            className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}`}
          >
            Name:
          </span>
          <span className="font-medium">{venueDetails.name}</span>
        </div>
        <div
          className={`flex justify-between px-5 py-2 rounded-4xl ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
          }`}
        >
          <span
            className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}`}
          >
            Address:
          </span>
          <span className="font-medium">{venueDetails.address}</span>
        </div>
        <div
          className={`flex justify-between px-5 py-2 rounded-4xl ${
            theme === 'dark' ? accentColor.darkChatBg : accentColor.lightChatBg
          }`}
        >
          <span
            className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}`}
          >
            Capacity:
          </span>
          <span className="font-medium">{venueDetails.capacity} people</span>
        </div>
        <div
          className={`flex justify-between px-5 py-2 rounded-4xl ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
          }`}
        >
          <span
            className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}`}
          >
            Status:
          </span>
          <span className="font-medium">{venueDetails.booking_status}</span>
        </div>
      </div>
    </div>
  )
}

export default VenueSummary
