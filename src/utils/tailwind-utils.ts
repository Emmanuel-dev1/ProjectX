// Utility functions for Tailwind classes

// Combine multiple class names
export const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Job tag color utilities
export const getTagClasses = (tag: string) => {
  switch (tag) {
    case 'Fixed Budget':
    case 'Hourly Rate':
      return 'bg-tag-green-bg text-tag-green-text';
    case 'Entry':
    case 'Intermediate':
    case 'Advanced':
      return 'bg-tag-blue-bg text-tag-blue-text';
    default:
      return 'bg-tag-gray-bg text-tag-gray-text';
  }
};

// Notification color utilities
export const getNotificationColor = (type: string) => {
  switch (type) {
    case 'job': return '#3B82F6';
    case 'proposal': return '#8B5CF6';
    case 'payment': return '#10B981';
    case 'message': return '#F59E0B';
    default: return '#6B7280';
  }
};

// Gradient utilities
export const gradients = {
  dark: 'bg-gradient-to-br from-dark-gradient-start to-dark-gradient-end',
  user: 'bg-gradient-to-br from-indigo-500 to-purple-600',
};

// Animation utilities
export const animations = {
  slideDown: 'animate-slide-down',
  pulse: 'animate-pulse',
};

// Shadow utilities
export const shadows = {
  card: 'shadow-sm hover:shadow-md',
  dropdown: 'shadow-lg',
  header: 'shadow-header',
};

// Transition utilities
export const transitions = {
  all: 'transition-all duration-200 ease-in-out',
  colors: 'transition-colors duration-200 ease-in-out',
  transform: 'transition-transform duration-200 ease-in-out',
};