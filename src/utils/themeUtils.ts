// Utility functions for theme management
export const getThemeClass = (lightClass: string, darkClass: string) => {
  return `${lightClass} dark:${darkClass}`;
};

// Common theme-based class combinations
export const themeClasses = {
  bg: {
    light: 'bg-bg-light',
    dark: 'dark:bg-bg-dark',
    card: 'bg-bg-card dark:bg-bg-card-dark',
  },
  text: {
    primary: 'text-text-primary dark:text-text-primary-dark',
    secondary: 'text-text-secondary dark:text-text-secondary-dark',
  },
  border: {
    default: 'border-border dark:border-border-dark',
    light: 'border-border-light dark:border-border-light-dark',
  },
};