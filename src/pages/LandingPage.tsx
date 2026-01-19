import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Briefcase, 
  Shield, 
  Zap, 
  Star, 
  Globe,
  Search,
  TrendingUp,
  Award,
  Clock
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const stats = [
    { value: '50K+', label: 'Active Freelancers' },
    { value: '25K+', label: 'Jobs Posted' },
    { value: '$10M+', label: 'Paid to Freelancers' },
    { value: '4.9', label: 'Client Rating' },
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure Payments',
      description: 'Get paid securely through our escrow system'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Fast Matching',
      description: 'AI-powered job matching in seconds'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Reach',
      description: 'Work with clients from around the world'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Verified Clients',
      description: 'All clients are vetted and verified'
    },
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Create Profile',
      description: 'Sign up and create your professional profile'
    },
    {
      step: '2',
      title: 'Browse Opportunities',
      description: 'Find projects that match your skills'
    },
    {
      step: '3',
      title: 'Submit Proposal',
      description: 'Send your proposal to clients'
    },
    {
      step: '4',
      title: 'Get Paid',
      description: 'Complete work and receive payment'
    },
  ];

  return (
    <div className="min-h-screen bg-bg-light">
      {/* Navigation */}
      <nav className="bg-dark-gradient text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent-green rounded-md flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B0B0B" strokeWidth="2">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                  <path d="M2 17L12 22L22 17" />
                  <path d="M2 12L12 17L22 12" />
                </svg>
              </div>
              <span className="text-xl font-semibold">ProjectX</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-accent-green text-text-primary px-4 py-2 rounded-md font-medium hover:bg-green-300 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-dark-gradient text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Next
              <span className="text-accent-green block mt-2">Freelance Project</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10">
              Join thousands of freelancers and clients on ProjectX - the modern marketplace for creative talent
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register?role=freelancer"
                className="px-8 py-4 bg-accent-green text-text-primary font-bold rounded-lg hover:bg-green-300 transition-all transform hover:-translate-y-1"
              >
                Start Freelancing
                <ArrowRight className="inline ml-2" size={20} />
              </Link>
              <Link
                to="/register?role=client"
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all"
              >
                Hire Talent
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-text-primary mb-2">{stat.value}</div>
              <div className="text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Why Choose ProjectX?
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              We've built the platform that freelancers and clients love
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-accent-green mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-text-primary text-lg mb-2">{feature.title}</h3>
                <p className="text-text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              How It Works
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Get started in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                  <div className="w-12 h-12 bg-accent-green text-text-primary rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-text-primary text-lg mb-2">{step.title}</h3>
                  <p className="text-text-secondary">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-dark-gradient rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our community of talented freelancers and innovative clients
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register?role=freelancer"
                className="px-8 py-4 bg-accent-green text-text-primary font-bold rounded-lg hover:bg-green-300 transition-all"
              >
                Join as Freelancer
              </Link>
              <Link
                to="/register?role=client"
                className="px-8 py-4 bg-white text-text-primary font-bold rounded-lg hover:bg-gray-100 transition-all"
              >
                Hire Talent
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-accent-green flex items-center justify-center">
                  <span className="text-2xl">✦</span>
                </div>
                <h2 className="text-2xl font-bold">ProjectX</h2>
              </div>
              <p className="text-gray-400 mt-2">The modern freelance marketplace</p>
            </div>
            <div className="flex space-x-6">
              <Link to="/login" className="text-gray-400 hover:text-white">
                Login
              </Link>
              <Link to="/support" className="text-gray-400 hover:text-white">
                Support
              </Link>
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Terms
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 ProjectX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;