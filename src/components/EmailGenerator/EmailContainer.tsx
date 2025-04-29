import React, { useState } from 'react'
import Header from '../ui/Header'
import { useTheme } from '../../context/ThemeContext'
import Form from './Form'
import { EmailFormData } from '../../types'
import EmailSummary from './EmailSummary'

const initialFormData: EmailFormData = {
  practiceName: 'Maple Grove Dental',
  industry: 'Dental Practice Management',
  recipientName: 'Dr. S. Christopher Chang',
  recipientPosition: 'Practice Owner',
  recentEvent: 'your recent fee survey results',
  coreFeature: '',
}

const EmailContainer = () => {
  const [formData, setFormData] = useState<EmailFormData>(initialFormData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState<string>('')
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
      lead_name: formData.practiceName,
      industry: formData.industry,
      recipient_name: formData.recipientName,
      recipient_position: formData.recipientPosition,
      recent_event: formData.recentEvent,
      core_feature: formData?.coreFeature || '',
    }

    try {
      const res = await fetch('http://localhost:8000/outreach-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errText = await res.text()
        throw new Error(`API error ${res.status}: ${errText}`)
      }

      const data = await res.json()
      let emailText: string = data.email

      // strip leading ```\n and trailing ```
      if (emailText.startsWith('```')) {
        // remove the opening fence
        emailText = emailText.replace(/^```[\r\n]*/, '')
        // remove the closing fence (and any trailing newlines)
        emailText = emailText.replace(/[\r\n]*```$/, '')
      }

      setEmail(emailText)
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
    setEmail('')
    setError(null)
  }

  return (
    <div
      className={`flex flex-col h-[80dvh] w-full max-w-4xl mx-auto shadow-lg rounded-xl overflow-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}
    >
      <Header agentIndex={3} />
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

            {/* Marketing Report Card */}
            {email && <EmailSummary email={email} />}
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

export default EmailContainer
