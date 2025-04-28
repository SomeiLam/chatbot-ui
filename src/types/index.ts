// Message interface
export interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: string
}

// Accent color interface
export interface AccentColor {
  name: string
  lightBg: string
  darkBg: string
  lightText: string
  darkText: string
  lightChatBg: string
  darkChatBg: string
  focusRing: string
  spinner: string
}

export type AgentType =
  | 'Customer Support'
  | 'Customer Outreach Agent'
  | 'Task Event Planner'
  | 'LinkedIn Post Generator'

export interface AgentData {
  name: AgentType
  description: string
  color: string
  index: number
}

export interface VenueDetails {
  name: string
  address: string
  capacity: number
  booking_status: string
}

export interface EventFormData {
  topic: string
  description: string
  city: string
  date: string
  participants: number
  budget: number
  venueType: string
}

export interface EmailFormData {
  practiceName: string
  industry: string
  recipientName: string
  recipientPosition: string
  recentEvent: string
  coreFeature?: string
}
