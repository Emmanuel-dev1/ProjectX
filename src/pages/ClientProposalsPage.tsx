// pages/ClientProposalsPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  MessageSquare,
  Download,
  User,
  DollarSign,
  Calendar,
  FileText,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Proposal } from '../types';

const ClientProposalsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme } = useTheme();

  // Mock proposals data
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: '1',
      jobId: '1',
      freelancerId: '101',
      clientId: user?.id || 'client1',
      coverLetter: 'I have extensive experience in React and Node.js development. I have built similar e-commerce applications and can deliver high-quality code with clean architecture.',
      bidAmount: 2500,
      estimatedTime: '3 weeks',
      submittedAt: '2024-01-15T10:30:00Z',
      status: 'pending',
      freelancer: {
        id: '101',
        name: 'Alex Johnson',
        email: 'alex@example.com',
        role: 'freelancer',
        avatarInitials: 'AJ',
        title: 'Full Stack Developer',
        location: 'San Francisco, CA',
        rating: 4.9,
        completedJobs: 42,
        skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
        bio: 'Passionate about creating scalable web applications with modern technologies.'
      }
    },
    {
      id: '2',
      jobId: '1',
      freelancerId: '102',
      clientId: user?.id || 'client1',
      coverLetter: 'I specialize in UI/UX design and have worked on multiple e-commerce platforms. I focus on creating intuitive user experiences that drive conversions.',
      bidAmount: 1800,
      estimatedTime: '2 weeks',
      submittedAt: '2024-01-14T14:20:00Z',
      status: 'accepted',
      freelancer: {
        id: '102',
        name: 'Sarah Miller',
        email: 'sarah@example.com',
        role: 'freelancer',
        avatarInitials: 'SM',
        title: 'UI/UX Designer',
        location: 'New York, NY',
        rating: 4.7,
        completedJobs: 28,
        skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Web Design'],
        bio: 'Designer focused on creating beautiful and functional user interfaces.'
      }
    },
    {
      id: '3',
      jobId: '2',
      freelancerId: '103',
      clientId: user?.id || 'client1',
      coverLetter: 'With 5 years of experience in mobile app development, I have built successful apps for both iOS and Android platforms using React Native.',
      bidAmount: 3500,
      estimatedTime: '4 weeks',
      submittedAt: '2024-01-13T09:15:00Z',
      status: 'rejected',
      freelancer: {
        id: '103',
        name: 'Michael Chen',
        email: 'michael@example.com',
        role: 'freelancer',
        avatarInitials: 'MC',
        title: 'Mobile App Developer',
        location: 'Austin, TX',
        rating: 4.8,
        completedJobs: 35,
        skills: ['React Native', 'iOS', 'Android', 'Firebase', 'Redux'],
        bio: 'Building cross-platform mobile applications with exceptional performance.'
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  // Filter proposals
  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.freelancer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposal.coverLetter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || proposal.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Handle proposal actions
  const handleAcceptProposal = (proposalId: string) => {
    if (window.confirm('Are you sure you want to accept this proposal?')) {
      setProposals(prev => prev.map(p => 
        p.id === proposalId ? { ...p, status: 'accepted' } : p
      ));
      alert('Proposal accepted! You can now message the freelancer.');
    }
  };

  const handleRejectProposal = (proposalId: string) => {
    if (window.confirm('Are you sure you want to reject this proposal?')) {
      setProposals(prev => prev.map(p => 
        p.id === proposalId ? { ...p, status: 'rejected' } : p
      ));
      alert('Proposal rejected.');
    }
  };

  const handleMessageFreelancer = (proposalId: string) => {
    const proposal = proposals.find(p => p.id === proposalId);
    if (proposal) {
      alert(`Opening chat with ${proposal.freelancer?.name}`);
      // In real app, navigate to messages with this freelancer
    }
  };

  const handleViewProfile = (freelancerId: string) => {
    navigate(`/profile/${freelancerId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return { text: 'text-green-700', bg: 'bg-green-100', icon: <CheckCircle size={14} /> };
      case 'rejected':
        return { text: 'text-red-700', bg: 'bg-red-100', icon: <XCircle size={14} /> };
      case 'pending':
        return { text: 'text-yellow-700', bg: 'bg-yellow-100', icon: <Clock size={14} /> };
      default:
        return { text: 'text-gray-700', bg: 'bg-gray-100', icon: <Clock size={14} /> };
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-dark-gradient' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`sticky top-0 z-40 ${
        theme === 'dark' ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm'
      } border-b ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(-1)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft size={20} />
              <span className="font-medium hidden sm:inline">Back</span>
            </button>
            
            <h1 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Proposals
            </h1>
            
            <div className="w-10">{/* Spacer */}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Stats */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-xl ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            } shadow`}>
              <div className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {proposals.length}
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Total Proposals
              </div>
            </div>
            <div className={`p-4 rounded-xl ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            } shadow`}>
              <div className={`text-2xl font-bold text-green-600`}>
                {proposals.filter(p => p.status === 'accepted').length}
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Accepted
              </div>
            </div>
            <div className={`p-4 rounded-xl ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            } shadow`}>
              <div className={`text-2xl font-bold text-yellow-600`}>
                {proposals.filter(p => p.status === 'pending').length}
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Pending
              </div>
            </div>
            <div className={`p-4 rounded-xl ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            } shadow`}>
              <div className={`text-2xl font-bold text-red-600`}>
                {proposals.filter(p => p.status === 'rejected').length}
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Rejected
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className={`mb-6 p-4 rounded-xl ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        } shadow`}>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search size={20} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search proposals or freelancers..."
                  className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  filterStatus === 'all'
                    ? theme === 'dark'
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-100 text-gray-900'
                    : theme === 'dark'
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 ${
                  filterStatus === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : theme === 'dark'
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Clock size={14} />
                Pending
              </button>
              <button
                onClick={() => setFilterStatus('accepted')}
                className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 ${
                  filterStatus === 'accepted'
                    ? 'bg-green-100 text-green-800'
                    : theme === 'dark'
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <CheckCircle size={14} />
                Accepted
              </button>
              <button
                onClick={() => setFilterStatus('rejected')}
                className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 ${
                  filterStatus === 'rejected'
                    ? 'bg-red-100 text-red-800'
                    : theme === 'dark'
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <XCircle size={14} />
                Rejected
              </button>
            </div>
          </div>
        </div>

        {/* Proposals List */}
        <div className="space-y-4">
          {filteredProposals.map((proposal) => {
            const status = getStatusColor(proposal.status);
            return (
              <div
                key={proposal.id}
                className={`rounded-xl shadow overflow-hidden ${
                  theme === 'dark' ? 'bg-gray-900' : 'bg-white'
                }`}
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    {/* Freelancer Info */}
                    <div className="lg:w-64 flex-shrink-0">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {proposal.freelancer?.avatarInitials || 'F'}
                        </div>
                        <div>
                          <div className={`font-bold ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {proposal.freelancer?.name}
                          </div>
                          <div className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {proposal.freelancer?.title}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <div className={`text-sm font-medium ${
                              theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                            }`}>
                              ★ {proposal.freelancer?.rating || '5.0'}
                            </div>
                            <div className={`text-xs ${
                              theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                            }`}>
                              ({proposal.freelancer?.completedJobs || 0} jobs)
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {proposal.freelancer?.skills?.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 rounded text-xs ${
                              theme === 'dark'
                                ? 'bg-gray-800 text-gray-300'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                        {proposal.freelancer?.skills && proposal.freelancer.skills.length > 3 && (
                          <span className={`px-2 py-1 rounded text-xs ${
                            theme === 'dark'
                              ? 'bg-gray-800 text-gray-400'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            +{proposal.freelancer.skills.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        <button
                          onClick={() => handleViewProfile(proposal.freelancerId)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            theme === 'dark'
                              ? 'text-gray-300 hover:text-white hover:bg-gray-800 border border-gray-700'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-300'
                          }`}
                        >
                          <User size={14} />
                          View Profile
                        </button>
                        <button
                          onClick={() => handleMessageFreelancer(proposal.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            theme === 'dark'
                              ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 border border-blue-800'
                              : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-300'
                          }`}
                        >
                          <MessageSquare size={14} />
                          Message
                        </button>
                      </div>
                    </div>

                    {/* Proposal Details */}
                    <div className="flex-1">
                      {/* Proposal Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                        <div>
                          <div className={`font-bold ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            Proposal Details
                          </div>
                          <div className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Submitted {new Date(proposal.submittedAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                            {status.icon}
                            {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      {/* Cover Letter Preview */}
                      <div className={`mb-4 p-3 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                      }`}>
                        <div className={`text-sm line-clamp-3 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {proposal.coverLetter}
                        </div>
                        <button
                          onClick={() => setSelectedProposal(proposal)}
                          className={`text-sm font-medium mt-2 ${
                            theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                          }`}
                        >
                          Read full proposal
                        </button>
                      </div>

                      {/* Bid Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                        <div className={`p-3 rounded-lg ${
                          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            <DollarSign size={16} className={
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            } />
                            <div className={`text-sm font-medium ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              Bid Amount
                            </div>
                          </div>
                          <div className={`text-lg font-bold ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            ${proposal.bidAmount.toLocaleString()}
                          </div>
                        </div>
                        <div className={`p-3 rounded-lg ${
                          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            <Clock size={16} className={
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            } />
                            <div className={`text-sm font-medium ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              Estimated Time
                            </div>
                          </div>
                          <div className={`text-lg font-bold ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {proposal.estimatedTime}
                          </div>
                        </div>
                        <div className={`p-3 rounded-lg ${
                          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar size={16} className={
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            } />
                            <div className={`text-sm font-medium ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              Submitted
                            </div>
                          </div>
                          <div className={`text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {new Date(proposal.submittedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {proposal.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAcceptProposal(proposal.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors duration-200"
                          >
                            <CheckCircle size={16} />
                            Accept Proposal
                          </button>
                          <button
                            onClick={() => handleRejectProposal(proposal.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
                          >
                            <XCircle size={16} />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredProposals.length === 0 && (
            <div className={`text-center py-12 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <FileText size={48} className="mx-auto mb-4 opacity-50" />
              <div className="text-lg font-medium mb-2">No proposals found</div>
              <div className="text-sm">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try changing your search or filter criteria'
                  : 'No proposals have been submitted yet'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Proposal Detail Modal */}
      {selectedProposal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSelectedProposal(null)} />
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className={`relative w-full max-w-3xl rounded-2xl shadow-xl ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            }`} onClick={e => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className={`text-xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Full Proposal from {selectedProposal.freelancer?.name}
                    </h2>
                    <p className={`text-sm mt-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Submitted {new Date(selectedProposal.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedProposal(null)}
                    className={`p-2 rounded-lg ${
                      theme === 'dark'
                        ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <XCircle size={24} />
                  </button>
                </div>

                {/* Cover Letter */}
                <div className="mb-6">
                  <h3 className={`text-lg font-semibold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Cover Letter
                  </h3>
                  <div className={`p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-700'
                  }`}>
                    {selectedProposal.coverLetter}
                  </div>
                </div>

                {/* Bid Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className={`p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                  }`}>
                    <div className={`text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Bid Amount
                    </div>
                    <div className={`text-2xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      ${selectedProposal.bidAmount.toLocaleString()}
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                  }`}>
                    <div className={`text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Estimated Time
                    </div>
                    <div className={`text-xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {selectedProposal.estimatedTime}
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                  }`}>
                    <div className={`text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Status
                    </div>
                    <div className={`text-xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {selectedProposal.status.charAt(0).toUpperCase() + selectedProposal.status.slice(1)}
                    </div>
                  </div>
                </div>

                {/* Freelancer Info */}
                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <h3 className={`text-lg font-semibold mb-3 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    About the Freelancer
                  </h3>
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {selectedProposal.freelancer?.avatarInitials || 'F'}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div>
                          <div className={`font-bold text-lg ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {selectedProposal.freelancer?.name}
                          </div>
                          <div className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {selectedProposal.freelancer?.title} • {selectedProposal.freelancer?.location}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className={`font-medium ${
                            theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                          }`}>
                            ★ {selectedProposal.freelancer?.rating || '5.0'}
                          </div>
                          <div className={`text-sm ${
                            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                          }`}>
                            ({selectedProposal.freelancer?.completedJobs || 0} jobs)
                          </div>
                        </div>
                      </div>
                      <div className={`text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {selectedProposal.freelancer?.bio}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {selectedProposal.freelancer?.skills?.map((skill, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 rounded text-xs ${
                              theme === 'dark'
                                ? 'bg-gray-700 text-gray-300'
                                : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => handleMessageFreelancer(selectedProposal.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium border transition-colors duration-200 ${
                      theme === 'dark'
                        ? 'border-blue-800 text-blue-400 hover:bg-blue-900/30'
                        : 'border-blue-300 text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <MessageSquare size={18} />
                    Message Freelancer
                  </button>
                  <button
                    onClick={() => handleViewProfile(selectedProposal.freelancerId)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium border transition-colors duration-200 ${
                      theme === 'dark'
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <User size={18} />
                    View Full Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientProposalsPage;