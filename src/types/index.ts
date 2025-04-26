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
}
