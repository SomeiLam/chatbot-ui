import React, { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { EventFormData, VenueDetails } from '../../types'
import Header from '../ui/Header'
import Form from './Form'
import VenueSummary from './VenueSummary'
import MarketingSummary from './MarketingSummary'

const initialFormData: EventFormData = {
  topic: 'AI Developer Summit',
  description:
    'A one-day, hands-on summit in San Jose bringing together software engineers, healthcare IT leaders, and practice management partners to dive deep into the ONE API, explore the latest DentalLLM and Insights features, and share best-practice integration patterns.',
  city: 'San Jose, California',
  date: '2025-07-25',
  participants: 150,
  budget: 30000,
  venueType: 'Hotel conference center with main ballroom and breakout rooms',
}

const PlannerContainer = () => {
  const [formData, setFormData] = useState<EventFormData>(initialFormData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [venueDetails, setVenueDetails] = useState<VenueDetails | null>(null)
  const [marketingReport, setMarketingReport] = useState<string | null>(null)
  const [showReport, setShowReport] = useState(false)
  const { theme } = useTheme()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const payload = {
      event_topic: formData.topic,
      event_description: formData.description,
      event_city: formData.city,
      tentative_date: formData.date,
      expected_participants: Number(formData.participants),
      budget: Number(formData.budget),
      venue_type: formData.venueType,
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/plan-event`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )

      if (!res.ok) {
        const errText = await res.text()
        throw new Error(`API error ${res.status}: ${errText}`)
      }

      const data = await res.json()
      console.log('data', data)
      setVenueDetails(data.venueDetails)
      // setLogisticsConfirmation(data.logistics_confirmation);
      setMarketingReport(data.marketingReport)
      setShowReport(true)
    } catch (err) {
      console.error(err)
      setError('Failed to plan event. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setFormData(initialFormData)
    setVenueDetails(null)
    setMarketingReport(null)
    setError(null)
  }

  return (
    <div
      className={`flex flex-col h-[80dvh] w-full max-w-4xl mx-auto shadow-lg rounded-xl transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'
      }`}
    >
      <Header agentIndex={2} />
      <div className="overflow-y-auto">
        {showReport ? (
          <div className="flex flex-col">
            <span className="p-3">
              <span
                className="hover:underline cursor-pointer"
                onClick={() => setShowReport(false)}
              >
                Back
              </span>
            </span>
            {/* Venue Details Card */}
            {venueDetails && <VenueSummary venueDetails={venueDetails} />}

            {/* Marketing Report Card */}
            {marketingReport && (
              <MarketingSummary marketingReport={marketingReport} />
            )}
          </div>
        ) : (
          <Form
            handleSubmit={handleSubmit}
            formData={formData}
            handleInputChange={handleInputChange}
            isLoading={isLoading}
            handleReset={handleReset}
          />
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}
    </div>
  )
}

export default PlannerContainer
