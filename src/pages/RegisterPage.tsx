import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Briefcase, UserCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';

const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const defaultRole = (searchParams.get('role') as 'client' | 'freelancer') || 'freelancer';
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'client' | 'freelancer'>(defaultRole);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'client' || roleParam === 'freelancer') {
      setRole(roleParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      await register(name, email, password, role);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    {
      id: 'freelancer',
      icon: <UserCircle className="w-6 h-6" />,
      title: 'Freelancer',
      description: 'Find work and get hired',
      color: 'border-accent-green hover:border-accent-green bg-accent-green/5'
    },
    {
      id: 'client',
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Client',
      description: 'Hire talented freelancers',
      color: 'border-blue-500 hover:border-blue-500 bg-blue-50'
    }
  ];

  return (
    <div className="min-h-screen bg-bg-light">
      {/* Use existing Header component */}
      <Header />
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-border-light p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-text-primary mb-2">Join ProjectX</h2>
              <p className="text-text-secondary">Create your account to get started</p>
            </div>

            {/* Role Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-text-primary mb-4">
                I want to join as:
              </label>
              <div className="grid grid-cols-2 gap-4">
                {roles.map((roleOption) => (
                  <button
                    key={roleOption.id}
                    type="button"
                    onClick={() => setRole(roleOption.id as 'client' | 'freelancer')}
                    className={`p-4 border-2 rounded-lg text-center transition-all ${
                      role === roleOption.id
                        ? `${roleOption.color} border-2`
                        : 'border-border hover:border-text-light'
                    }`}
                  >
                    <div className={`mx-auto mb-3 ${
                      role === roleOption.id 
                        ? roleOption.id === 'freelancer' ? 'text-accent-green' : 'text-blue-500'
                        : 'text-gray-400'
                    }`}>
                      {roleOption.icon}
                    </div>
                    <div className="font-medium text-text-primary">{roleOption.title}</div>
                    <div className="text-xs text-text-secondary mt-1">{roleOption.description}</div>
                  </button>
                ))}
              </div>
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
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
              </div>

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
                <p className="text-xs text-text-secondary mt-2">
                  Must be at least 8 characters long
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent-green text-text-primary font-bold py-4 rounded-lg hover:bg-green-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-text-primary border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating account...
                  </>
                ) : (
                  `Join as ${role === 'freelancer' ? 'Freelancer' : 'Client'}`
                )}
              </button>

              <div className="text-center">
                <p className="text-text-secondary">
                  Already have an account?{' '}
                  <a
                    href="/login"
                    className="text-accent-green font-medium hover:text-green-600"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-border-light">
              <p className="text-center text-text-secondary text-sm">
                By creating an account, you agree to our{' '}
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

export default RegisterPage;