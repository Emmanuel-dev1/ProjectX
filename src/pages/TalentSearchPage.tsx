// pages/TalentSearchPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  MapPin, 
  Filter, 
  Star, 
  CheckCircle, 
  Briefcase, 
  Users,
  Globe,
  X,
  ChevronDown,
  Heart,
  MessageSquare,
  Award,
  Clock,
  TrendingUp,
  Shield,
  Calendar,
  BookOpen,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Pin,
  Coffee,
  Zap
} from 'lucide-react';
import Header from '../components/Header';

interface Talent {
  id: number;
  name: string;
  title: string;
  tagline: string;
  location: string;
  rate: string;
  rating: number;
  reviews: number;
  skills: string[];
  experience: string;
  availability: string;
  verified: boolean;
  profileImage: string;
  portfolioUrl?: string;
  hourlyRate: number;
  totalEarnings: string;
  successRate: number;
  responseTime: string;
  languages: string[];
  education: string;
  completedJobs: number;
  memberSince: string;
  preferredTypes: string[];
  isSaved: boolean;
}

const TalentSearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [rateRange, setRateRange] = useState<[number, number]>([20, 200]);
  const [availability, setAvailability] = useState<string>('all');
  const [experienceLevel, setExperienceLevel] = useState<string>('all');
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savedTalents, setSavedTalents] = useState<number[]>([]);
  const [talentList, setTalentList] = useState<Talent[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const filterRef = useRef<HTMLDivElement>(null);

  // Skill options
  const skills = [
    'React', 'TypeScript', 'Node.js', 'UI/UX', 'Python', 'Mobile', 
    'DevOps', 'AWS', 'GraphQL', 'MongoDB', 'Docker', 'Next.js',
    'Figma', 'Adobe XD', 'WordPress', 'Shopify', 'SEO', 'Marketing',
    'Java', 'C#', 'PHP', 'Swift', 'Kotlin', 'Flutter',
    'Machine Learning', 'Data Science', 'Blockchain', 'Cybersecurity'
  ];

  const availabilityOptions = [
    { value: 'all', label: 'All Availability' },
    { value: 'immediate', label: 'Immediate', color: 'bg-green-500' },
    { value: 'full-time', label: 'Full Time', color: 'bg-blue-500' },
    { value: 'part-time', label: 'Part Time', color: 'bg-purple-500' },
    { value: 'contract', label: 'Contract', color: 'bg-orange-500' },
  ];

  const experienceOptions = [
    { value: 'all', label: 'All Experience' },
    { value: 'entry', label: 'Entry (0-2 years)' },
    { value: 'mid', label: 'Mid (2-5 years)' },
    { value: 'senior', label: 'Senior (5+ years)' },
  ];

  const sortOptions = [
    { value: 'rating', label: 'Highest Rating' },
    { value: 'rate', label: 'Lowest Rate' },
    { value: 'experience', label: 'Most Experience' },
    { value: 'jobs', label: 'Most Jobs Completed' },
    { value: 'response', label: 'Fastest Response' },
  ];

  // Mock talent data
  useEffect(() => {
    const mockTalents: Talent[] = [
      {
        id: 1,
        name: 'Alex Johnson',
        title: 'Senior React Developer',
        tagline: 'Building scalable web applications with modern tech',
        location: 'San Francisco, CA',
        rate: 'GHS 85/hr',
        hourlyRate: 85,
        rating: 4.9,
        reviews: 127,
        skills: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Node.js', 'AWS'],
        experience: '8 years',
        availability: 'Full Time',
        verified: true,
        profileImage: '👨‍💻',
        portfolioUrl: 'https://alexjohnson.dev',
        totalEarnings: 'GHS 250,000+',
        successRate: 98,
        responseTime: '< 2 hours',
        languages: ['English', 'Spanish'],
        education: 'MIT, Computer Science',
        completedJobs: 42,
        memberSince: '2020',
        preferredTypes: ['Web Apps', 'SaaS', 'E-commerce'],
        isSaved: false
      },
      {
        id: 2,
        name: 'Sarah Chen',
        title: 'UI/UX Designer',
        tagline: 'Creating beautiful, user-centered digital experiences',
        location: 'Remote',
        rate: 'GHS 65/hr',
        hourlyRate: 65,
        rating: 4.8,
        reviews: 89,
        skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
        experience: '6 years',
        availability: 'Immediate',
        verified: true,
        profileImage: '👩‍🎨',
        portfolioUrl: 'https://sarahchen.design',
        totalEarnings: 'GHS 180,000+',
        successRate: 96,
        responseTime: '< 1 hour',
        languages: ['English', 'Mandarin'],
        education: 'Parsons School of Design',
        completedJobs: 35,
        memberSince: '2019',
        preferredTypes: ['Mobile Apps', 'Web Design', 'Branding'],
        isSaved: true
      },
      {
        id: 3,
        name: 'Marcus Rodriguez',
        title: 'Full Stack Developer',
        tagline: 'Expert in building end-to-end web solutions',
        location: 'Austin, TX',
        rate: 'GHS 95/hr',
        hourlyRate: 95,
        rating: 5.0,
        reviews: 203,
        skills: ['React', 'Node.js', 'AWS', 'Docker', 'Python', 'PostgreSQL'],
        experience: '10 years',
        availability: 'Part Time',
        verified: true,
        profileImage: '👨‍💻',
        portfolioUrl: 'https://marcus.dev',
        totalEarnings: 'GHS 400,000+',
        successRate: 99,
        responseTime: '< 3 hours',
        languages: ['English', 'Portuguese'],
        education: 'Stanford University',
        completedJobs: 67,
        memberSince: '2018',
        preferredTypes: ['Enterprise', 'Startups', 'APIs'],
        isSaved: false
      },
      {
        id: 4,
        name: 'Emma Wilson',
        title: 'Mobile App Developer',
        tagline: 'Native iOS & Android specialist',
        location: 'New York, NY',
        rate: 'GHS 75/hr',
        hourlyRate: 75,
        rating: 4.7,
        reviews: 56,
        skills: ['React Native', 'iOS', 'Android', 'Firebase', 'Swift'],
        experience: '5 years',
        availability: 'Full Time',
        verified: true,
        profileImage: '👩‍💻',
        portfolioUrl: 'https://emmawilson.dev',
        totalEarnings: 'GHS 150,000+',
        successRate: 94,
        responseTime: '< 4 hours',
        languages: ['English', 'French'],
        education: 'Carnegie Mellon',
        completedJobs: 28,
        memberSince: '2020',
        preferredTypes: ['Mobile Apps', 'Cross-platform'],
        isSaved: false
      },
      {
        id: 5,
        name: 'David Kim',
        title: 'DevOps Engineer',
        tagline: 'Cloud infrastructure & automation expert',
        location: 'Remote',
        rate: 'GHS 110/hr',
        hourlyRate: 110,
        rating: 4.9,
        reviews: 145,
        skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'Linux'],
        experience: '9 years',
        availability: 'Immediate',
        verified: true,
        profileImage: '👨‍💼',
        portfolioUrl: 'https://davidkim.devops',
        totalEarnings: 'GHS 320,000+',
        successRate: 97,
        responseTime: '< 2 hours',
        languages: ['English', 'Korean'],
        education: 'UC Berkeley',
        completedJobs: 39,
        memberSince: '2017',
        preferredTypes: ['Cloud Migration', 'Infrastructure', 'Security'],
        isSaved: true
      },
      {
        id: 6,
        name: 'Lisa Wang',
        title: 'Digital Marketing Specialist',
        tagline: 'Driving growth through data-driven marketing',
        location: 'Los Angeles, CA',
        rate: 'GHS 55/hr',
        hourlyRate: 55,
        rating: 4.6,
        reviews: 72,
        skills: ['SEO', 'Google Ads', 'Social Media', 'Analytics', 'Content Strategy'],
        experience: '7 years',
        availability: 'Part Time',
        verified: true,
        profileImage: '👩‍💼',
        portfolioUrl: 'https://lisawang.marketing',
        totalEarnings: 'GHS 120,000+',
        successRate: 92,
        responseTime: '< 5 hours',
        languages: ['English', 'Mandarin'],
        education: 'UCLA',
        completedJobs: 31,
        memberSince: '2019',
        preferredTypes: ['E-commerce', 'SaaS', 'B2B'],
        isSaved: false
      },
      {
        id: 7,
        name: 'James Miller',
        title: 'Backend Developer',
        tagline: 'Scalable backend systems & APIs',
        location: 'Chicago, IL',
        rate: 'GHS 90/hr',
        hourlyRate: 90,
        rating: 4.8,
        reviews: 98,
        skills: ['Java', 'Spring Boot', 'Microservices', 'PostgreSQL', 'Redis'],
        experience: '8 years',
        availability: 'Full Time',
        verified: true,
        profileImage: '👨‍💻',
        portfolioUrl: 'https://jamesmiller.dev',
        totalEarnings: 'GHS 280,000+',
        successRate: 96,
        responseTime: '< 3 hours',
        languages: ['English'],
        education: 'University of Chicago',
        completedJobs: 45,
        memberSince: '2018',
        preferredTypes: ['Backend Systems', 'APIs', 'Database Design'],
        isSaved: false
      },
      {
        id: 8,
        name: 'Sophie Taylor',
        title: 'Product Designer',
        tagline: 'End-to-end product design from concept to launch',
        location: 'Remote',
        rate: 'GHS 70/hr',
        hourlyRate: 70,
        rating: 4.9,
        reviews: 112,
        skills: ['Figma', 'User Testing', 'Product Strategy', 'Design Systems', 'Prototyping'],
        experience: '6 years',
        availability: 'Immediate',
        verified: true,
        profileImage: '👩‍🎨',
        portfolioUrl: 'https://sophietaylor.design',
        totalEarnings: 'GHS 190,000+',
        successRate: 95,
        responseTime: '< 2 hours',
        languages: ['English', 'German'],
        education: 'Rhode Island School of Design',
        completedJobs: 38,
        memberSince: '2019',
        preferredTypes: ['Web Apps', 'Mobile Apps', 'SaaS'],
        isSaved: false
      },
    ];

    setTimeout(() => {
      setTalentList(mockTalents);
      setLoading(false);
    }, 800);
  }, []);

  // Filter talents
  const filteredTalents = talentList.filter(talent => {
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = talent.name.toLowerCase().includes(query);
      const matchesTitle = talent.title.toLowerCase().includes(query);
      const matchesTagline = talent.tagline.toLowerCase().includes(query);
      const matchesSkills = talent.skills.some(skill => skill.toLowerCase().includes(query));
      
      if (!(matchesName || matchesTitle || matchesTagline || matchesSkills)) {
        return false;
      }
    }
    
    // Filter by location
    if (location && !talent.location.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }
    
    // Filter by skills
    if (selectedSkills.length > 0 && !selectedSkills.some(skill => talent.skills.includes(skill))) {
      return false;
    }
    
    // Filter by rate
    if (talent.hourlyRate < rateRange[0] || talent.hourlyRate > rateRange[1]) {
      return false;
    }
    
    // Filter by availability
    if (availability !== 'all' && talent.availability.toLowerCase() !== availability.toLowerCase()) {
      return false;
    }
    
    // Filter by experience level
    if (experienceLevel !== 'all') {
      const years = parseInt(talent.experience);
      if (experienceLevel === 'entry' && years >= 2) return false;
      if (experienceLevel === 'mid' && (years < 2 || years >= 5)) return false;
      if (experienceLevel === 'senior' && years < 5) return false;
    }
    
    return true;
  });

  // Sort talents
  const sortedTalents = [...filteredTalents].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'rate':
        return a.hourlyRate - b.hourlyRate;
      case 'experience':
        const yearsA = parseInt(a.experience);
        const yearsB = parseInt(b.experience);
        return yearsB - yearsA;
      case 'jobs':
        return b.completedJobs - a.completedJobs;
      case 'response':
        const timeA = parseInt(a.responseTime);
        const timeB = parseInt(b.responseTime);
        return isNaN(timeA) ? 1 : isNaN(timeB) ? -1 : timeA - timeB;
      default:
        return b.rating - a.rating;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedTalents.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedTalents = sortedTalents.slice(startIndex, startIndex + itemsPerPage);

  // Handle skill toggle
  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  // Handle save talent
  const handleSaveTalent = (id: number) => {
    if (savedTalents.includes(id)) {
      setSavedTalents(prev => prev.filter(talentId => talentId !== id));
      setTalentList(prev => prev.map(talent => 
        talent.id === id ? { ...talent, isSaved: false } : talent
      ));
    } else {
      setSavedTalents(prev => [...prev, id]);
      setTalentList(prev => prev.map(talent => 
        talent.id === id ? { ...talent, isSaved: true } : talent
      ));
    }
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setLocation('');
    setSelectedSkills([]);
    setRateRange([20, 200]);
    setAvailability('all');
    setExperienceLevel('all');
    setPage(1);
  };

  // Check if filters are active
  const hasActiveFilters = 
    searchQuery || 
    location || 
    selectedSkills.length > 0 || 
    availability !== 'all' || 
    experienceLevel !== 'all' ||
    rateRange[0] !== 20 || 
    rateRange[1] !== 200;

  // Close filters on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-bg-light">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-dark-gradient py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Find Top Freelance Talent
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Connect with verified professionals ready for your next project
            </p>
          </div>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by name, title, or skills"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-text-primary placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-green"
                  />
                </div>
                
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-text-primary placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-green"
                  />
                </div>
                
                <div className="relative">
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-lg appearance-none bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-green"
                  >
                    {availabilityOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-600">Top Skills:</span>
                  {skills.slice(0, 6).map(skill => {
                    const isActive = selectedSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleSkillToggle(skill)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-accent-green text-text-primary border border-accent-green'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                        }`}
                      >
                        {skill}
                        {isActive && ' ✓'}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  type="submit"
                  className="bg-accent-green text-text-primary px-8 py-3 rounded-lg font-semibold hover:bg-accent-green-dark transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  <Search size={18} />
                  Search Talent
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">
              Available Talent <span className="text-text-secondary">({sortedTalents.length})</span>
            </h2>
            <p className="text-text-light text-sm">
              {hasActiveFilters ? 'Filtered results' : 'All available freelancers'}
            </p>
          </div>
          
          <div className="flex items-center gap-4 w-full lg:w-auto">
            {/* Sort Dropdown */}
            <div className="relative flex-1 lg:flex-none">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full lg:w-auto appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-green"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    Sort by: {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
            
            {/* View Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              >
                <div className="grid grid-cols-2 gap-1 w-6 h-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-400 rounded-sm"></div>
                  ))}
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              >
                <div className="flex flex-col gap-1 w-6 h-6">
                  <div className="h-2 bg-gray-400 rounded-sm"></div>
                  <div className="h-2 bg-gray-400 rounded-sm"></div>
                  <div className="h-2 bg-gray-400 rounded-sm"></div>
                </div>
              </button>
            </div>
            
            {/* Filter Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-text-primary"
            >
              <Filter size={16} />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-accent-green rounded-full"></span>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar (Desktop) */}
          <div ref={filterRef} className={`lg:block ${showFilters ? 'block absolute left-0 right-0 top-0 bg-white z-40 p-6 shadow-lg' : 'hidden'} lg:relative lg:w-64`}>
            <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-6 lg:sticky lg:top-24">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-accent-green font-medium hover:text-accent-green-dark"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Rate Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Rate Range (GHS/hr)
                </label>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>GHS {rateRange[0]}</span>
                    <span>GHS {rateRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="250"
                    value={rateRange[0]}
                    onChange={(e) => setRateRange([parseInt(e.target.value), rateRange[1]])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="range"
                    min="10"
                    max="250"
                    value={rateRange[1]}
                    onChange={(e) => setRateRange([rateRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Experience Level */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Experience Level
                </label>
                <div className="space-y-2">
                  {experienceOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setExperienceLevel(option.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        experienceLevel === option.value
                          ? 'bg-accent-green/20 text-text-primary font-medium border border-accent-green'
                          : 'text-text-secondary hover:bg-gray-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Skills
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {skills.map(skill => (
                    <label
                      key={skill}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSkills.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                        className="w-4 h-4 text-accent-green rounded focus:ring-accent-green"
                      />
                      <span className="text-sm text-text-secondary">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Verification */}
              <div className="mb-6">
                <label className="flex items-center gap-2 mb-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-accent-green rounded focus:ring-accent-green"
                  />
                  <span className="text-sm font-medium text-text-primary">Verified Only</span>
                </label>
                <p className="text-xs text-text-light">
                  Show only talent with verified identity and work history
                </p>
              </div>

              {/* Save Search */}
              <button className="w-full bg-gray-100 text-text-primary border border-gray-300 rounded-lg py-3 text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                <Heart size={16} />
                Save Search
              </button>
            </div>
          </div>

          {/* Talent Results */}
          <div className="flex-1">
            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map(skill => (
                    <div key={skill} className="flex items-center gap-2 bg-accent-green/20 text-text-primary px-3 py-1.5 rounded-full">
                      <span className="text-sm">{skill}</span>
                      <button
                        onClick={() => handleSkillToggle(skill)}
                        className="text-text-primary hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {searchQuery && (
                    <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full">
                      <span className="text-sm">Search: "{searchQuery}"</span>
                      <button
                        onClick={() => setSearchQuery('')}
                        className="text-blue-700 hover:text-blue-900"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  {location && (
                    <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full">
                      <MapPin size={12} />
                      <span className="text-sm">{location}</span>
                      <button
                        onClick={() => setLocation('')}
                        className="text-green-700 hover:text-green-900"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  {(rateRange[0] !== 20 || rateRange[1] !== 200) && (
                    <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full">
                      <span className="text-sm">GHS {rateRange[0]}-{rateRange[1]}/hr</span>
                      <button
                        onClick={() => setRateRange([20, 200])}
                        className="text-purple-700 hover:text-purple-900"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  {availability !== 'all' && (
                    <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full">
                      <span className="text-sm">{availabilityOptions.find(a => a.value === availability)?.label}</span>
                      <button
                        onClick={() => setAvailability('all')}
                        className="text-orange-700 hover:text-orange-900"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  {experienceLevel !== 'all' && (
                    <div className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1.5 rounded-full">
                      <span className="text-sm">{experienceOptions.find(e => e.value === experienceLevel)?.label}</span>
                      <button
                        onClick={() => setExperienceLevel('all')}
                        className="text-red-700 hover:text-red-900"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Results */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-green"></div>
              </div>
            ) : sortedTalents.length === 0 ? (
              <div className="bg-white p-12 rounded-xl text-center border border-gray-200">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  No talent found
                </h3>
                <p className="text-text-secondary mb-6 max-w-md mx-auto">
                  {hasActiveFilters 
                    ? 'Try adjusting your search criteria or filters'
                    : 'No talent available matching your criteria'}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="bg-accent-green text-text-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent-green-dark transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Talent Cards */}
                <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'space-y-6'} gap-6`}>
                  {paginatedTalents.map(talent => (
                    <div
                      key={talent.id}
                      className={`bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all ${
                        viewMode === 'list' ? 'flex' : ''
                      }`}
                    >
                      <div className={`${viewMode === 'list' ? 'flex-1 p-6' : 'p-6'}`}>
                        {/* Header */}
                        <div className={`flex ${viewMode === 'list' ? 'items-start gap-6' : 'items-start gap-4 mb-4'}`}>
                          <div className={`${viewMode === 'list' ? 'w-20 h-20' : 'w-16 h-16'} bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0`}>
                            {talent.profileImage}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-bold text-text-primary truncate">
                                    {talent.name}
                                  </h3>
                                  {talent.verified && (
                                    <CheckCircle size={16} className="text-blue-500 flex-shrink-0" />
                                  )}
                                </div>
                                <p className="text-sm text-text-primary font-medium mb-1">
                                  {talent.title}
                                </p>
                                <p className="text-xs text-text-secondary line-clamp-2 mb-2">
                                  {talent.tagline}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-text-light">
                                  <MapPin size={12} />
                                  <span>{talent.location}</span>
                                  <span>•</span>
                                  <Clock size={12} />
                                  <span>{talent.responseTime} response</span>
                                </div>
                              </div>
                              <button
                                onClick={() => handleSaveTalent(talent.id)}
                                className={`p-2 rounded-lg transition-colors ${talent.isSaved ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                              >
                                <Heart size={20} fill={talent.isSaved ? 'currentColor' : 'none'} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Rating & Stats */}
                        <div className={`grid ${viewMode === 'list' ? 'grid-cols-4' : 'grid-cols-2'} gap-3 my-4`}>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star size={14} className="text-yellow-400 fill-current" />
                              <span className="font-bold">{talent.rating}</span>
                            </div>
                            <span className="text-xs text-text-light">({talent.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Briefcase size={14} className="text-text-secondary" />
                            <span className="text-xs text-text-secondary">{talent.completedJobs} jobs</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award size={14} className="text-green-500" />
                            <span className="text-xs text-text-secondary">{talent.successRate}% success</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Coffee size={14} className="text-orange-500" />
                            <span className="text-xs text-text-secondary">{talent.experience}</span>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {talent.skills.slice(0, viewMode === 'list' ? 8 : 4).map(skill => (
                              <span
                                key={skill}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                              >
                                {skill}
                              </span>
                            ))}
                            {talent.skills.length > (viewMode === 'list' ? 8 : 4) && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                                +{talent.skills.length - (viewMode === 'list' ? 8 : 4)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Rate & Actions */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                          <div>
                            <div className="text-lg font-bold text-text-primary">{talent.rate}</div>
                            <div className={`text-xs text-text-light flex items-center gap-1 ${viewMode === 'list' ? '' : 'hidden'}`}>
                              <TrendingUp size={10} />
                              {talent.totalEarnings} earned
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="bg-accent-green text-text-primary px-4 py-2 rounded-lg font-medium hover:bg-accent-green-dark transition-colors flex items-center gap-2">
                              <MessageSquare size={14} />
                              <span className="hidden sm:inline">Contact</span>
                            </button>
                            <button className="bg-white text-text-primary border border-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                              <Eye size={14} />
                              <span className="hidden sm:inline">View</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                      disabled={page === 1}
                      className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (page <= 3) {
                        pageNum = i + 1;
                      } else if (page >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = page - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`w-10 h-10 rounded-lg font-medium ${
                            page === pageNum
                              ? 'bg-accent-green text-text-primary'
                              : 'text-text-secondary hover:bg-gray-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={page === totalPages}
                      className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}

                {/* Stats Footer */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-text-primary mb-2">24hr</div>
                      <div className="text-sm text-text-secondary">Avg. Response Time</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-text-primary mb-2">97%</div>
                      <div className="text-sm text-text-secondary">Success Rate</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-text-primary mb-2">5K+</div>
                      <div className="text-sm text-text-secondary">Projects Completed</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-text-primary mb-2">4.8★</div>
                      <div className="text-sm text-text-secondary">Avg. Rating</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentSearchPage;