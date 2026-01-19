import React, { useState, useEffect, useMemo } from 'react';
import { 
  Clock, 
  Users, 
  DollarSign, 
  MapPin, 
  Search,
  Filter,
  ChevronDown,
  Calendar,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  FileText,
  MessageSquare,
  Edit,
  Trash2,
  Eye,
  Plus,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Header from '../components/Header';

// Define types
interface MyJob {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  salaryType: string;
  postedDate: string;
  status: 'active' | 'pending' | 'completed' | 'expired';
  proposals: number;
  shortlisted: number;
  hired: number;
  category: string;
  description: string;
  isSaved?: boolean;
}

interface Proposal {
  id: number;
  jobId: number;
  jobTitle: string;
  client: string;
  budget: string;
  proposalDate: string;
  status: 'pending' | 'accepted' | 'rejected' | 'under_review';
  coverLetter: string;
  bidAmount: string;
  estimatedTime: string;
}

const MyJobsPage: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'posted' | 'proposals'>('posted');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Mock data for posted jobs (for clients)
  const [postedJobs, setPostedJobs] = useState<MyJob[]>([
    {
      id: 1,
      title: 'E-commerce Mobile App Design',
      company: 'ShopEasy Inc.',
      location: 'Remote',
      salary: '590',
      salaryType: 'Fixed Budget',
      postedDate: '1 day ago',
      status: 'active',
      proposals: 24,
      shortlisted: 3,
      hired: 0,
      category: 'Mobile App Design',
      description: 'Looking for a talented mobile app designer to create a modern e-commerce app.'
    },
    {
      id: 2,
      title: 'React Dashboard Development',
      company: 'TechCorp Solutions',
      location: 'New York, USA',
      salary: '24',
      salaryType: 'Hourly Rate',
      postedDate: '2 days ago',
      status: 'pending',
      proposals: 18,
      shortlisted: 5,
      hired: 1,
      category: 'Website Development',
      description: 'Need experienced React developer to build admin dashboard.'
    },
    {
      id: 3,
      title: 'Landing Page Copywriting',
      company: 'GrowthHack Agency',
      location: 'Remote',
      salary: '350',
      salaryType: 'Fixed Budget',
      postedDate: '8 days ago',
      status: 'completed',
      proposals: 12,
      shortlisted: 2,
      hired: 1,
      category: 'Copywriting',
      description: 'Looking for a copywriter to create compelling landing page copy.'
    },
    {
      id: 4,
      title: 'WordPress E-commerce Site',
      company: 'Boutique Store',
      location: 'London, UK',
      salary: '750',
      salaryType: 'Fixed Budget',
      postedDate: '5 days ago',
      status: 'expired',
      proposals: 22,
      shortlisted: 4,
      hired: 0,
      category: 'Website Development',
      description: 'Need WordPress developer to build e-commerce website.'
    },
    {
      id: 5,
      title: 'Social Media Graphics',
      company: 'Digital Marketing Co.',
      location: 'Remote',
      salary: '280',
      salaryType: 'Fixed Budget',
      postedDate: '6 days ago',
      status: 'active',
      proposals: 15,
      shortlisted: 2,
      hired: 0,
      category: 'Website Design',
      description: 'Graphic designer needed for social media campaign assets.'
    }
  ]);

  // Mock data for proposals (for freelancers)
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: 1,
      jobId: 1,
      jobTitle: 'E-commerce Mobile App Design',
      client: 'ShopEasy Inc.',
      budget: '590',
      proposalDate: '1 day ago',
      status: 'under_review',
      coverLetter: 'I have extensive experience in mobile app design with a focus on e-commerce...',
      bidAmount: '550',
      estimatedTime: '2 weeks'
    },
    {
      id: 2,
      jobId: 2,
      jobTitle: 'React Dashboard Development',
      client: 'TechCorp Solutions',
      budget: '24/hour',
      proposalDate: '2 days ago',
      status: 'accepted',
      coverLetter: 'I specialize in React dashboard development with real-time analytics...',
      bidAmount: '22',
      estimatedTime: '3 weeks'
    },
    {
      id: 3,
      jobId: 3,
      jobTitle: 'Landing Page Copywriting',
      client: 'GrowthHack Agency',
      budget: '350',
      proposalDate: '5 days ago',
      status: 'rejected',
      coverLetter: 'As a copywriter with 5 years of experience, I can create compelling...',
      bidAmount: '320',
      estimatedTime: '1 week'
    },
    {
      id: 4,
      jobId: 4,
      jobTitle: 'WordPress E-commerce Site',
      client: 'Boutique Store',
      budget: '750',
      proposalDate: '3 days ago',
      status: 'pending',
      coverLetter: 'I have built multiple WordPress e-commerce sites with WooCommerce...',
      bidAmount: '700',
      estimatedTime: '4 weeks'
    },
    {
      id: 5,
      jobId: 5,
      jobTitle: 'Social Media Graphics',
      client: 'Digital Marketing Co.',
      budget: '280',
      proposalDate: '1 week ago',
      status: 'under_review',
      coverLetter: 'I create eye-catching social media graphics that drive engagement...',
      bidAmount: '250',
      estimatedTime: '1 week'
    }
  ]);

  // Theme-based classes
  const getBackgroundClass = () => {
    return theme === 'dark' 
      ? 'bg-gray-900 text-gray-100' 
      : 'bg-gray-50 text-gray-900';
  };

  const getCardClass = () => {
    return theme === 'dark'
      ? 'bg-gray-800 border-gray-700'
      : 'bg-white border-gray-200';
  };

  const getTextPrimaryClass = () => {
    return theme === 'dark' ? 'text-white' : 'text-gray-900';
  };

  const getTextSecondaryClass = () => {
    return theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  };

  const getTextLightClass = () => {
    return theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  };

  const getBorderClass = () => {
    return theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
  };

  const getInputClass = () => {
    return theme === 'dark'
      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-accent-green'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-accent-green';
  };

  const getStatusBadgeClass = (status: string) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    
    switch (status) {
      case 'active':
      case 'accepted':
        return `${baseClasses} ${theme === 'dark' ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800'}`;
      case 'pending':
      case 'under_review':
        return `${baseClasses} ${theme === 'dark' ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-100 text-yellow-800'}`;
      case 'completed':
        return `${baseClasses} ${theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'}`;
      case 'expired':
      case 'rejected':
        return `${baseClasses} ${theme === 'dark' ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-800'}`;
      default:
        return `${baseClasses} ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800'}`;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'accepted':
        return <CheckCircle size={14} className="mr-1" />;
      case 'pending':
      case 'under_review':
        return <ClockIcon size={14} className="mr-1" />;
      case 'completed':
        return <CheckCircle size={14} className="mr-1" />;
      case 'expired':
      case 'rejected':
        return <XCircle size={14} className="mr-1" />;
      default:
        return null;
    }
  };

  // Filter jobs based on search and status
  const filteredJobs = useMemo(() => {
    let jobs = postedJobs;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      jobs = jobs.filter(job => 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      jobs = jobs.filter(job => job.status === statusFilter);
    }
    
    return jobs;
  }, [postedJobs, searchQuery, statusFilter]);

  // Filter proposals
  const filteredProposals = useMemo(() => {
    let filtered = proposals;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(proposal => 
        proposal.jobTitle.toLowerCase().includes(query) ||
        proposal.client.toLowerCase().includes(query)
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(proposal => proposal.status === statusFilter);
    }
    
    return filtered;
  }, [proposals, searchQuery, statusFilter]);

  // Calculate stats
  const stats = {
    active: postedJobs.filter(job => job.status === 'active').length,
    pending: postedJobs.filter(job => job.status === 'pending').length,
    completed: postedJobs.filter(job => job.status === 'completed').length,
    expired: postedJobs.filter(job => job.status === 'expired').length,
  };

  const proposalStats = {
    pending: proposals.filter(p => p.status === 'pending').length,
    under_review: proposals.filter(p => p.status === 'under_review').length,
    accepted: proposals.filter(p => p.status === 'accepted').length,
    rejected: proposals.filter(p => p.status === 'rejected').length,
  };

  const handleEditJob = (jobId: number) => {
    alert(`Editing job #${jobId}`);
    // In real app, navigate to edit job page
  };

  const handleDeleteJob = (jobId: number) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      setPostedJobs(prev => prev.filter(job => job.id !== jobId));
    }
  };

  const handleViewProposals = (jobId: number) => {
    alert(`Viewing proposals for job #${jobId}`);
    // In real app, navigate to proposals page
  };

  const handleWithdrawProposal = (proposalId: number) => {
    if (window.confirm('Are you sure you want to withdraw this proposal?')) {
      setProposals(prev => prev.filter(p => p.id !== proposalId));
    }
  };

  const handlePostNewJob = () => {
    alert('Redirecting to post job page...');
    // In real app, navigate to post job page
  };

  const statusOptions = user?.role === 'client' 
    ? [
        { value: 'all', label: 'All Status' },
        { value: 'active', label: 'Active' },
        { value: 'pending', label: 'Pending' },
        { value: 'completed', label: 'Completed' },
        { value: 'expired', label: 'Expired' },
      ]
    : [
        { value: 'all', label: 'All Status' },
        { value: 'pending', label: 'Pending' },
        { value: 'under_review', label: 'Under Review' },
        { value: 'accepted', label: 'Accepted' },
        { value: 'rejected', label: 'Rejected' },
      ];

  return (
    <div className={`min-h-screen ${getBackgroundClass()} transition-colors duration-300`}>
      <Header />
      
      <div className="max-w-8xl mx-auto px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className={`text-2xl md:text-3xl font-bold ${getTextPrimaryClass()} mb-2`}>
            My Jobs
          </h1>
          <p className={`${getTextSecondaryClass()}`}>
            {user?.role === 'client' 
              ? 'Manage your posted jobs and view proposals'
              : 'Track your submitted proposals and their status'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex border-b w-full sm:w-auto">
            <button
              onClick={() => {
                setActiveTab('posted');
                setStatusFilter('all');
              }}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'posted'
                  ? 'border-accent-green text-accent-green'
                  : `${theme === 'dark' ? 'text-gray-400 border-transparent hover:text-gray-300' : 'text-gray-500 border-transparent hover:text-gray-700'}`
              }`}
            >
              {user?.role === 'client' ? 'Posted Jobs' : 'Active Proposals'}
            </button>
            <button
              onClick={() => {
                setActiveTab('proposals');
                setStatusFilter('all');
              }}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'proposals'
                  ? 'border-accent-green text-accent-green'
                  : `${theme === 'dark' ? 'text-gray-400 border-transparent hover:text-gray-300' : 'text-gray-500 border-transparent hover:text-gray-700'}`
              }`}
            >
              {user?.role === 'client' ? 'Received Proposals' : 'Proposal History'}
            </button>
          </div>

          {activeTab === 'posted' && user?.role === 'client' && (
            <button
              onClick={handlePostNewJob}
              className="flex items-center gap-2 bg-accent-green text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-green-300 transition-colors whitespace-nowrap"
            >
              <Plus size={18} />
              Post New Job
            </button>
          )}
        </div>

        {/* Stats */}
        <div className={`${getCardClass()} rounded-xl border ${getBorderClass()} p-6 mb-8 transition-colors duration-300`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {activeTab === 'posted' ? (
              <>
                <div className="text-center p-4">
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                    {stats.active}
                  </div>
                  <div className={`text-sm ${getTextSecondaryClass()}`}>Active</div>
                </div>
                <div className="text-center p-4">
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>
                    {stats.pending}
                  </div>
                  <div className={`text-sm ${getTextSecondaryClass()}`}>Pending</div>
                </div>
                <div className="text-center p-4">
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                    {stats.completed}
                  </div>
                  <div className={`text-sm ${getTextSecondaryClass()}`}>Completed</div>
                </div>
                <div className="text-center p-4">
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                    {stats.expired}
                  </div>
                  <div className={`text-sm ${getTextSecondaryClass()}`}>Expired</div>
                </div>
              </>
            ) : (
              <>
                <div className="text-center p-4">
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>
                    {proposalStats.pending}
                  </div>
                  <div className={`text-sm ${getTextSecondaryClass()}`}>Pending</div>
                </div>
                <div className="text-center p-4">
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                    {proposalStats.under_review}
                  </div>
                  <div className={`text-sm ${getTextSecondaryClass()}`}>Under Review</div>
                </div>
                <div className="text-center p-4">
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                    {proposalStats.accepted}
                  </div>
                  <div className={`text-sm ${getTextSecondaryClass()}`}>Accepted</div>
                </div>
                <div className="text-center p-4">
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                    {proposalStats.rejected}
                  </div>
                  <div className={`text-sm ${getTextSecondaryClass()}`}>Rejected</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className={`${getCardClass()} rounded-xl border ${getBorderClass()} p-4 mb-6 transition-colors duration-300`}>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${getTextLightClass()}`} size={18} />
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'posted' ? 'jobs' : 'proposals'}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${getInputClass()} w-full pl-10 pr-4 py-2 rounded-lg border transition-colors duration-300`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${getTextLightClass()} hover:${getTextPrimaryClass()}`}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`${getInputClass()} appearance-none py-2 pl-4 pr-10 rounded-lg border transition-colors duration-300 w-full md:w-48`}
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Filter className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${getTextLightClass()} pointer-events-none`} size={16} />
            </div>
          </div>
        </div>

        {/* Jobs/Proposals List */}
        {activeTab === 'posted' ? (
          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <div className={`${getCardClass()} rounded-xl border ${getBorderClass()} p-12 text-center transition-colors duration-300`}>
                <div className="text-4xl mb-4">📝</div>
                <h3 className={`text-lg font-semibold ${getTextPrimaryClass()} mb-2`}>
                  No jobs found
                </h3>
                <p className={`${getTextSecondaryClass()} mb-6`}>
                  {searchQuery || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : user?.role === 'client' 
                      ? 'You haven\'t posted any jobs yet'
                      : 'You haven\'t submitted any proposals yet'}
                </p>
                {user?.role === 'client' && (
                  <button
                    onClick={handlePostNewJob}
                    className="bg-accent-green text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-green-300 transition-colors inline-flex items-center gap-2"
                  >
                    <Plus size={18} />
                    Post Your First Job
                  </button>
                )}
              </div>
            ) : (
              filteredJobs.map(job => (
                <div key={job.id} className={`${getCardClass()} rounded-xl border ${getBorderClass()} p-6 transition-colors duration-300 hover:shadow-lg`}>
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                        <h3 className={`text-lg font-semibold ${getTextPrimaryClass()}`}>
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={getStatusBadgeClass(job.status)}>
                            {getStatusIcon(job.status)}
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </span>
                          <span className={`text-xs ${getTextLightClass()}`}>
                            Posted {job.postedDate}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <DollarSign size={14} className={getTextLightClass()} />
                          <span className={getTextSecondaryClass()}>
                            {job.salaryType === 'Hourly Rate' ? `₵${job.salary}/hour` : `₵${job.salary} fixed`}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={14} className={getTextLightClass()} />
                          <span className={getTextSecondaryClass()}>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={14} className={getTextLightClass()} />
                          <span className={getTextSecondaryClass()}>{job.proposals} proposals</span>
                        </div>
                      </div>
                      
                      <p className={`${getTextSecondaryClass()} line-clamp-2 mb-4`}>
                        {job.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                          {job.category}
                        </span>
                        {job.shortlisted > 0 && (
                          <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                            {job.shortlisted} shortlisted
                          </span>
                        )}
                        {job.hired > 0 && (
                          <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800'}`}>
                            {job.hired} hired
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 min-w-[200px]">
                      {user?.role === 'client' ? (
                        <>
                          <button
                            onClick={() => handleViewProposals(job.id)}
                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
                              theme === 'dark'
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                          >
                            <MessageSquare size={16} />
                            View Proposals ({job.proposals})
                          </button>
                          <button
                            onClick={() => handleEditJob(job.id)}
                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md border transition-colors ${
                              theme === 'dark'
                                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <Edit size={16} />
                            Edit Job
                          </button>
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md border transition-colors ${
                              theme === 'dark'
                                ? 'border-red-900/50 text-red-400 hover:bg-red-900/30'
                                : 'border-red-200 text-red-600 hover:bg-red-50'
                            }`}
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleViewProposals(job.id)}
                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
                              theme === 'dark'
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                          >
                            <Eye size={16} />
                            View Details
                          </button>
                          <button
                            onClick={() => handleEditJob(job.id)}
                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md border transition-colors ${
                              theme === 'dark'
                                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <FileText size={16} />
                            Edit Proposal
                          </button>
                          <button
                            onClick={() => handleWithdrawProposal(job.id)}
                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md border transition-colors ${
                              theme === 'dark'
                                ? 'border-red-900/50 text-red-400 hover:bg-red-900/30'
                                : 'border-red-200 text-red-600 hover:bg-red-50'
                            }`}
                          >
                            <X size={16} />
                            Withdraw
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProposals.length === 0 ? (
              <div className={`${getCardClass()} rounded-xl border ${getBorderClass()} p-12 text-center transition-colors duration-300`}>
                <div className="text-4xl mb-4">📨</div>
                <h3 className={`text-lg font-semibold ${getTextPrimaryClass()} mb-2`}>
                  No proposals found
                </h3>
                <p className={`${getTextSecondaryClass()} mb-6`}>
                  {searchQuery || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : user?.role === 'client' 
                      ? 'You haven\'t received any proposals yet'
                      : 'You haven\'t submitted any proposals yet'}
                </p>
              </div>
            ) : (
              filteredProposals.map(proposal => (
                <div key={proposal.id} className={`${getCardClass()} rounded-xl border ${getBorderClass()} p-6 transition-colors duration-300 hover:shadow-lg`}>
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                        <h3 className={`text-lg font-semibold ${getTextPrimaryClass()}`}>
                          {proposal.jobTitle}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={getStatusBadgeClass(proposal.status)}>
                            {getStatusIcon(proposal.status)}
                            {proposal.status.replace('_', ' ').charAt(0).toUpperCase() + proposal.status.replace('_', ' ').slice(1)}
                          </span>
                          <span className={`text-xs ${getTextLightClass()}`}>
                            Submitted {proposal.proposalDate}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <span className={getTextSecondaryClass()}>
                            Client: <span className="font-medium">{proposal.client}</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign size={14} className={getTextLightClass()} />
                          <span className={getTextSecondaryClass()}>
                            Budget: <span className="font-medium">₵{proposal.budget}</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign size={14} className={getTextLightClass()} />
                          <span className={getTextSecondaryClass()}>
                            Your Bid: <span className="font-medium">₵{proposal.bidAmount}</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className={getTextLightClass()} />
                          <span className={getTextSecondaryClass()}>
                            Estimated: {proposal.estimatedTime}
                          </span>
                        </div>
                      </div>
                      
                      <p className={`${getTextSecondaryClass()} line-clamp-2 mb-4`}>
                        {proposal.coverLetter}
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-2 min-w-[200px]">
                      <button
                        onClick={() => alert(`Viewing proposal #${proposal.id}`)}
                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
                          theme === 'dark'
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        <Eye size={16} />
                        View Details
                      </button>
                      <button
                        onClick={() => alert(`Message ${proposal.client}`)}
                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md border transition-colors ${
                          theme === 'dark'
                            ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <MessageSquare size={16} />
                        Message Client
                      </button>
                      {(proposal.status === 'pending' || proposal.status === 'under_review') && (
                        <button
                          onClick={() => handleWithdrawProposal(proposal.id)}
                          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md border transition-colors ${
                            theme === 'dark'
                              ? 'border-red-900/50 text-red-400 hover:bg-red-900/30'
                              : 'border-red-200 text-red-600 hover:bg-red-50'
                          }`}
                        >
                          <X size={16} />
                          Withdraw Proposal
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Pagination (if needed) */}
        {((activeTab === 'posted' && filteredJobs.length > 0) || 
          (activeTab === 'proposals' && filteredProposals.length > 0)) && (
          <div className={`${getCardClass()} rounded-xl border ${getBorderClass()} p-4 mt-8 transition-colors duration-300`}>
            <div className="flex justify-between items-center">
              <div className={`text-sm ${getTextSecondaryClass()}`}>
                Showing {activeTab === 'posted' ? filteredJobs.length : filteredProposals.length} of{' '}
                {activeTab === 'posted' ? postedJobs.length : proposals.length} items
              </div>
              <div className="flex gap-2">
                <button
                  className={`px-3 py-1 rounded-md border transition-colors ${
                    theme === 'dark'
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50'
                  }`}
                  disabled
                >
                  Previous
                </button>
                <button
                  className={`px-3 py-1 rounded-md border transition-colors ${
                    theme === 'dark'
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobsPage;