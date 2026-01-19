import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'freelancer';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'client' | 'freelancer') => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check for stored auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('projectx_user');
    
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('projectx_user');
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string, rememberMe = false) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in a real app, this would be an API call
    // For demo purposes, we'll create a mock user based on email
    const mockUser: User = {
      id: Date.now().toString(),
      name: email === 'client@example.com' ? 'Client Demo' : 
            email === 'freelancer@example.com' ? 'Freelancer Demo' : 'Demo User',
      email,
      role: email === 'client@example.com' ? 'client' : 'freelancer',
    };
    
    // Store user in localStorage
    localStorage.setItem('projectx_user', JSON.stringify(mockUser));
    
    if (rememberMe) {
      localStorage.setItem('projectx_remember', 'true');
    }
    
    setAuthState({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const register = async (name: string, email: string, password: string, role: 'client' | 'freelancer') => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role,
    };
    
    // Store user in localStorage
    localStorage.setItem('projectx_user', JSON.stringify(newUser));
    
    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('projectx_user');
    localStorage.removeItem('projectx_remember');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateUser = (updates: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...updates };
      localStorage.setItem('projectx_user', JSON.stringify(updatedUser));
      setAuthState(prev => ({ ...prev, user: updatedUser }));
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};