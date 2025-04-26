# Modern Chatbot UI

A sleek, fully responsive chatbot interface built with modular React components and Tailwind CSS. Designed for seamless integration on desktop and mobile, it offers dynamic appearance options and polished micro-interactions for a premium user experience.

## Features

- **Responsive layout**  
  Adapts automatically between single-column mobile view and two-column desktop view.

- **Theme support**  
  Toggle between light, dark, and custom accent palettes via a built-in theme-switcher.

- **Clean header**  
  Space for branding or logo alongside the theme toggle control.

- **Polished message bubbles**  
  Rounded corners, subtle shadows, and distinct styles for user vs. bot messages.

- **Sticky input area**  
  Always visible at the bottom, with placeholder text, send icon, and animated focus/hover states.

- **Micro-interactions**  
  Fade-in of new messages, button ripple effect, and smooth scroll animations.

- **Modular architecture**  
  Individual React components for ChatWindow, MessageBubble, InputArea, ThemeSwitcher, etc.

## Getting Started

1. **Add the package to your project**  
   Use your preferred package manager to install the UI component library.

2. **Wrap your application**  
   Include the theme provider at the root level to enable color-theme switching.

3. **Render the Chatbot component**  
   Place the ChatWindow component wherever you want the chat interface to appear.

## Theming

- **Built-in palettes**  
  Out-of-the-box light and dark modes ensure immediate usability.

- **Custom accents**  
  Supply a JSON theme definition to override primary, secondary, and background colors.

- **Dynamic switching**  
  ThemeSwitcher control in the header updates the look in real time without reloads.

## Component Overview

- **ChatWindow**  
  Container for message flow and header controls.

- **MessageBubble**  
  Styled containers for individual messages, differentiating user and bot.

- **InputArea**  
  Controlled text input with send action and animated feedback.

- **ThemeSwitcher**  
  Toggle interface for cycling through available color themes.

## Customization

- **Styling**  
  Tailwind utility classes can be overridden or extended via your project’s configuration.

- **Behavior**  
  Pass callback props to handle message send events, input validation, and theme-change hooks.

- **Accessibility**  
  All interactive elements include ARIA attributes and keyboard navigation support by default.
