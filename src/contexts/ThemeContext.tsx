import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Default to light theme initially
  const [theme, setThemeState] = useState<Theme>('light');
  const [isMounted, setIsMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem('projectx-theme');
      
      if (storedTheme === 'light' || storedTheme === 'dark') {
        setThemeState(storedTheme as Theme);
      } else {
        // Detect system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setThemeState(systemPrefersDark ? 'dark' : 'light');
      }
    } catch (error) {
      console.error('Error reading theme from localStorage:', error);
      setThemeState('light');
    }
    
    setIsMounted(true);
  }, []);

  // Update HTML class and localStorage when theme changes
  useEffect(() => {
    if (!isMounted) return;
    
    const root = document.documentElement;
    
    // Remove both classes first
    root.classList.remove('light', 'dark');
    
    // Add the current theme class
    root.classList.add(theme);
    
    // Also set data-theme attribute for CSS variables if needed
    root.setAttribute('data-theme', theme);
    
    // Store preference
    try {
      localStorage.setItem('projectx-theme', theme);
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
  }, [theme, isMounted]);

  const toggleTheme = () => {
    console.log('Toggling theme from', theme, 'to', theme === 'light' ? 'dark' : 'light');
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Prevent flash of unstyled content by not rendering until theme is determined
  if (!isMounted) {
    return null; // Or a minimal loader
  }

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};