/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Your custom color palette matching the design
      colors: {
        // Dark theme colors
        'dark': {
          'bg': '#0B0B0B',
          'gradient-start': '#0B0B0B',
          'gradient-end': '#1A1A1A',
        },
        // Accent colors
        'accent': {
          'green': '#7CFFB2',
          'green-dark': '#5CDB95',
        },
        // Background colors
        'bg': {
          'light': '#F7F8FA',
          'dark': '#0B0B0B',
          'card': '#FFFFFF',
          'card-dark': '#1A1A1A',
        },
        // Text colors
        'text': {
          'primary': '#111111',
          'primary-dark': '#FFFFFF',
          'secondary': '#6B7280',
          'secondary-dark': '#9CA3AF',
          'light': '#9CA3AF',
          'light-dark': '#6B7280',
        },
        // Border colors
        'border': {
          'DEFAULT': '#E5E7EB',
          'DEFAULT-dark': '#374151',
          'light': '#F3F4F6',
          'light-dark': '#1F2937',
        },
        // Notification colors
        'notification': {
          'job': '#3B82F6',
          'proposal': '#8B5CF6',
          'payment': '#10B981',
          'message': '#F59E0B',
        },
      },
      // Border radius
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '24px',
        'pill': '9999px',
      },
      // Box shadows
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'header': '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      // Background images
      backgroundImage: {
        'dark-gradient': 'linear-gradient(135deg, #0B0B0B 0%, #1A1A1A 100%)',
        'user-avatar': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      // Animations
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-down': 'slideDown 0.2s ease-out',
      },
      keyframes: {
        slideDown: {
          'from': { opacity: '0', transform: 'translateY(-10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      // Custom transition
      transitionProperty: {
        'all': 'all',
      },
      // Line clamp
      lineClamp: {
        2: '2',
        3: '3',
      },
      // Max width
      maxWidth: {
        '8xl': '1200px',
      },
      // Custom utilities
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}