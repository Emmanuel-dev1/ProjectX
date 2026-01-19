import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Basic validation
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      if (!email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      await login(email, password, rememberMe);
      navigate(redirect);
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = (role: 'client' | 'freelancer') => {
    const demoEmail = role === 'client' ? 'client@example.com' : 'freelancer@example.com';
    setEmail(demoEmail);
    setPassword('demo123');
    setRememberMe(true);
  };

  return (
    <div className="min-h-screen bg-bg-light">
      {/* Use existing Header component */}
      <Header />
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Demo Buttons */}
          <div className="mb-8">
            <p className="text-center text-text-secondary mb-4">Try demo accounts:</p>
            <div className="flex gap-3">
              <button
                onClick={() => demoLogin('freelancer')}
                className="flex-1 bg-accent-green/20 text-accent-green py-3 rounded-lg font-medium hover:bg-accent-green/30 transition-colors"
              >
                Freelancer Demo
              </button>
              <button
                onClick={() => demoLogin('client')}
                className="flex-1 bg-blue-500/20 text-blue-600 py-3 rounded-lg font-medium hover:bg-blue-500/30 transition-colors"
              >
                Client Demo
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-border-light p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-text-primary mb-2">Welcome Back</h2>
              <p className="text-text-secondary">Sign in to your account to continue</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                <AlertCircle className="text-red-500" size={20} />
                <span className="text-red-600 text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-accent-green border-gray-300 rounded focus:ring-accent-green"
                  />
                  <span className="ml-2 text-sm text-text-primary">Remember me</span>
                </label>
                <a
                  href="/forgot-password"
                  className="text-sm text-accent-green hover:text-green-600"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent-green text-text-primary font-bold py-4 rounded-lg hover:bg-green-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-text-primary border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>

              <div className="text-center">
                <p className="text-text-secondary">
                  Don't have an account?{' '}
                  <a
                    href="/register"
                    className="text-accent-green font-medium hover:text-green-600"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-border-light">
              <p className="text-center text-text-secondary text-sm">
                By continuing, you agree to our{' '}
                <a href="#" className="text-accent-green hover:text-green-600">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-accent-green hover:text-green-600">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;