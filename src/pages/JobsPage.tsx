import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Filter, X, Search as SearchIcon } from 'lucide-react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import SidebarFilters from '../components/SidebarFilters';
import JobCard from '../components/JobCard';
import { Job } from '../types';

const JobsPage: React.FC = () => {
  // Filter states
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  
  // Sort state
  const [sortBy, setSortBy] = useState('Recently Listed');
  
  // Jobs state
  const [jobs, setJobs] = useState<Job[]>([]);

  // Mock job data
  useEffect(() => {
    const mockJobs: Job[] = [
  {
    id: 1,
    title: 'E-commerce Mobile App Design',
    company: 'ShopEasy Inc.',
    companyLogo: '🛒',
    location: 'Remote',
    salary: ' 590',
    salaryType: 'Fixed Budget',
    type: 'Intermediate',
    postedDate: '1 day ago',
    description: 'Looking for a talented mobile app designer to create a modern e-commerce app with intuitive user interface and smooth user experience. Must have experience with Figma and prototyping.',
    proposals: 24,
    tags: ['Intermediate', 'Fixed Budget', 'Mobile App Design'],
    isSaved: false,
    category: 'Mobile App Design'
  },
  {
    id: 2,
    title: 'React Dashboard Development',
    company: 'TechCorp Solutions',
    companyLogo: '⚛️',
    location: 'New York, USA',
    salary: ' 24 ',
    salaryType: 'Hourly Rate',
    type: 'Advanced',
    postedDate: '2 days ago',
    description: 'Need experienced React developer to build admin dashboard with real-time analytics, charts, and user management. Experience with TypeScript, Chart.js, and REST APIs required.',
    proposals: 18,
    tags: ['Advanced', 'Hourly Rate', 'Website Development'],
    isSaved: true,
    category: 'Website Development'
  },
  {
    id: 3,
    title: 'Landing Page Copywriting',
    company: 'GrowthHack Agency',
    companyLogo: '📝',
    location: 'Remote',
    salary: ' 350',
    salaryType: 'Fixed Budget',
    type: 'Entry',
    postedDate: '8 days ago',
    description: 'Looking for a copywriter to create compelling landing page copy for SaaS product. Must understand conversion optimization and have portfolio of successful landing pages.',
    proposals: 12,
    tags: ['Entry', 'Fixed Budget', 'Copywriting'],
    isSaved: false,
    category: 'Copywriting'
  },
  {
    id: 4,
    title: 'Fitness App UI Design',
    company: 'FitLife Tech',
    companyLogo: '💪',
    location: 'San Francisco, CA',
    salary: ' 45 ',
    salaryType: 'Hourly Rate',
    type: 'Intermediate',
    postedDate: '3 days ago',
    description: 'UI/UX designer needed for fitness tracking mobile application. Experience with health/fitness apps preferred. Must create wireframes, prototypes, and final designs.',
    proposals: 31,
    tags: ['Intermediate', 'Hourly Rate', 'Mobile App Design'],
    isSaved: false,
    category: 'Mobile App Design'
  },
  {
    id: 5,
    title: 'WordPress E-commerce Site',
    company: 'Boutique Store',
    companyLogo: '🛍️',
    location: 'London, UK',
    salary: ' 750',
    salaryType: 'Fixed Budget',
    type: 'Intermediate',
    postedDate: '5 days ago',
    description: 'Need WordPress developer to build e-commerce website with WooCommerce integration. Custom theme development, payment gateway setup, and SEO optimization required.',
    proposals: 22,
    tags: ['Intermediate', 'Fixed Budget', 'Website Development'],
    isSaved: false,
    category: 'Website Development'
  },
  {
    id: 6,
    title: 'Social Media Graphics',
    company: 'Digital Marketing Co.',
    companyLogo: '🎨',
    location: 'Remote',
    salary: ' 280',
    salaryType: 'Fixed Budget',
    type: 'Entry',
    postedDate: '6 days ago',
    description: 'Graphic designer needed for social media campaign assets including Instagram posts, stories, and Facebook ads. Must have experience with Adobe Creative Suite.',
    proposals: 15,
    tags: ['Entry', 'Fixed Budget', 'Website Design'],
    isSaved: true,
    category: 'Website Design'
  },
  {
    id: 7,
    title: 'Full-Stack Development',
    company: 'StartupXYZ',
    companyLogo: '🚀',
    location: 'Remote',
    salary: ' 65',
    salaryType: 'Hourly Rate',
    type: 'Advanced',
    postedDate: '12 days ago',
    description: 'Full-stack developer needed for building a complete web application from scratch. Must know React, Node.js, and PostgreSQL.',
    proposals: 8,
    tags: ['Advanced', 'Hourly Rate', 'Website Development'],
    isSaved: false,
    category: 'Website Development'
  },
  {
    id: 8,
    title: 'Logo Design Package',
    company: 'BrandNew Co.',
    companyLogo: '🎯',
    location: 'Remote',
    salary: ' 500',
    salaryType: 'Fixed Budget',
    type: 'Entry',
    postedDate: '4 days ago',
    description: 'Need logo design for new company. Looking for modern, minimalist design that represents innovation and technology.',
    proposals: 42,
    tags: ['Entry', 'Fixed Budget', 'Website Design'],
    isSaved: false,
    category: 'Website Design'
  },
];
    setJobs(mockJobs);
  }, []);

  // Helper functions for sorting
  const parseSalaryToNumber = (salary: string): number => {
    const numericString = salary.replace(/[^0-9.]/g, '');
    return parseFloat(numericString) || 0;
  };

  const parsePostedDateToDays = (postedDate: string): number => {
    const match = postedDate.match(/(\d+)\s+days?/i);
    if (match) return parseInt(match[1], 10);
    return 999;
  };

  // Filter and sort jobs
  const filteredAndSortedJobs = useMemo(() => {
    let result = jobs.filter(job => {
      // Filter by experience level
      if (selectedLevels.length > 0 && !selectedLevels.includes(job.type)) {
        return false;
      }
      
      // Filter by payment type
      if (selectedPayment.length > 0 && !selectedPayment.includes(job.salaryType)) {
        return false;
      }
      
      // Filter by category
      if (selectedCategories.length > 0 && !selectedCategories.includes(job.category)) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.company.toLowerCase().includes(query);
        const matchesDescription = job.description.toLowerCase().includes(query);
        const matchesTags = job.tags.some(tag => tag.toLowerCase().includes(query));
        
        if (!(matchesTitle || matchesCompany || matchesDescription || matchesTags)) {
          return false;
        }
      }
      
      // Filter by location
      if (searchLocation) {
        const location = searchLocation.toLowerCase();
        const matchesLocation = job.location.toLowerCase().includes(location);
        
        if (!matchesLocation) {
          return false;
        }
      }
      
      return true;
    });

    // Sort based on selected option
    switch (sortBy) {
      case 'Recently Listed':
        result.sort((a, b) => parsePostedDateToDays(a.postedDate) - parsePostedDateToDays(b.postedDate));
        break;
      case 'Most Proposals':
        result.sort((a, b) => b.proposals - a.proposals);
        break;
      case 'Highest Budget':
        result.sort((a, b) => {
          const salaryA = parseSalaryToNumber(a.salary);
          const salaryB = parseSalaryToNumber(b.salary);
          
          // Handle hourly vs fixed comparison
          if (a.salaryType === 'Hourly Rate' && b.salaryType === 'Hourly Rate') {
            return salaryB - salaryA;
          } else if (a.salaryType === 'Hourly Rate') {
            const hourlyAsWeekly = salaryA * 40;
            return hourlyAsWeekly > salaryB ? -1 : 1;
          } else if (b.salaryType === 'Hourly Rate') {
            const hourlyAsWeekly = salaryB * 40;
            return salaryA > hourlyAsWeekly ? -1 : 1;
          } else {
            return salaryB - salaryA;
          }
        });
        break;
      case 'Most Relevant':
        // Combined scoring: recency + proposals + saved status
        result.sort((a, b) => {
          let scoreA = 0;
          let scoreB = 0;
          
          // Recency score
          const daysA = parsePostedDateToDays(a.postedDate);
          const daysB = parsePostedDateToDays(b.postedDate);
          scoreA += (30 - Math.min(daysA, 30)) * 10;
          scoreB += (30 - Math.min(daysB, 30)) * 10;
          
          // Proposal score
          scoreA += a.proposals * 2;
          scoreB += b.proposals * 2;
          
          // Saved status bonus
          if (a.isSaved) scoreA += 50;
          if (b.isSaved) scoreB += 50;
          
          return scoreB - scoreA;
        });
        break;
    }

    return result;
  }, [jobs, selectedLevels, selectedPayment, selectedCategories, sortBy, searchQuery, searchLocation]);

  // Event handlers
  const handleLevelToggle = (level: string) => {
    setSelectedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const handlePaymentToggle = (type: string) => {
    setSelectedPayment(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleClearAllFilters = () => {
    setSelectedLevels([]);
    setSelectedPayment([]);
    setSelectedCategories([]);
    setSearchQuery('');
    setSearchLocation('');
  };

  const handleToggleSave = (id: number) => {
    setJobs(prev =>
      prev.map(job =>
        job.id === id ? { ...job, isSaved: !job.isSaved } : job
      )
    );
  };

  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setSearchLocation(location);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  // Check if any filters are active
  const hasActiveFilters = 
    selectedLevels.length > 0 || 
    selectedPayment.length > 0 || 
    selectedCategories.length > 0 ||
    searchQuery ||
    searchLocation;

  // Active filter count
  const activeFilterCount = 
    selectedLevels.length + 
    selectedPayment.length + 
    selectedCategories.length + 
    (searchQuery ? 1 : 0) + 
    (searchLocation ? 1 : 0);

  return (
    <div className="min-h-screen bg-bg-light pb-16 md:pb-0">
      <Header />
      <HeroSection onSearch={handleSearch} />
      
      <div className="max-w-8xl mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Page Header with Clear All button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <h2 className="text-xl md:text-2xl font-bold text-text-primary">
              Recommended Jobs
            </h2>
            
            {/* Active filters badge */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 bg-bg-light px-3 py-1.5 rounded-full">
                <Filter size={14} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">
                  {activeFilterCount} active filter{activeFilterCount !== 1 ? 's' : ''}
                </span>
                <button
                  onClick={handleClearAllFilters}
                  className="text-text-light hover:text-text-primary p-0.5 rounded-full hover:bg-white"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Sort Dropdown */}
            <div className="relative self-start">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="appearance-none bg-white border border-border rounded-full py-2 pl-4 pr-10 text-sm text-text-primary cursor-pointer w-full md:w-auto min-w-[140px] transition-colors hover:border-text-light"
              >
                <option value="Recently Listed">Recently Listed</option>
                <option value="Most Proposals">Most Proposals</option>
                <option value="Highest Budget">Highest Budget</option>
                <option value="Most Relevant">Most Relevant</option>
              </select>
              <ChevronDown 
                size={16} 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none"
              />
            </div>

            {/* Clear All Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={handleClearAllFilters}
                className="flex items-center gap-2 bg-bg-light text-text-primary border border-border rounded-md px-4 py-2 text-sm font-medium cursor-pointer transition-colors hover:bg-white hover:border-text-light whitespace-nowrap"
              >
                <X size={14} />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Search status */}
        {(searchQuery || searchLocation) && (
          <div className="bg-bg-light p-4 rounded-xl border border-border-light mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <SearchIcon size={16} className="text-text-secondary" />
              <div>
                <div className="text-sm font-medium text-text-primary">Search Results</div>
                <div className="text-xs text-text-secondary">
                  {searchQuery && `Jobs matching "${searchQuery}"`}
                  {searchQuery && searchLocation && ' • '}
                  {searchLocation && `Location: ${searchLocation}`}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSearchLocation('');
              }}
              className="flex items-center gap-1 bg-white border border-border text-text-secondary rounded-md px-3 py-1.5 text-xs cursor-pointer transition-colors hover:bg-bg-light hover:text-text-primary"
            >
              <X size={12} />
              Clear Search
            </button>
          </div>
        )}

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1">
            <SidebarFilters
              selectedLevels={selectedLevels}
              selectedPayment={selectedPayment}
              selectedCategories={selectedCategories}
              onLevelToggle={handleLevelToggle}
              onPaymentToggle={handlePaymentToggle}
              onCategoryToggle={handleCategoryToggle}
              onClearAll={handleClearAllFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
          
          {/* Right Grid - Job Cards */}
          <div className="lg:col-span-3">
            {filteredAndSortedJobs.length === 0 ? (
              <div className="bg-white p-8 md:p-12 rounded-xl text-center border border-border-light">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg md:text-xl font-semibold text-text-primary mb-2">
                  No jobs found
                </h3>
                <p className="text-text-secondary mb-6 max-w-md mx-auto">
                  {hasActiveFilters 
                    ? 'Try adjusting your filters or search criteria'
                    : 'No jobs available at the moment'}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearAllFilters}
                    className="bg-accent-green text-text-primary border-none px-6 py-3 rounded-md text-sm font-semibold cursor-pointer transition-all hover:bg-accent-green-dark hover:-translate-y-0.5 inline-flex items-center gap-2"
                  >
                    <X size={16} />
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Results info */}
                <div className="bg-white p-4 rounded-xl border border-border-light mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-text-primary">
                      {filteredAndSortedJobs.length} {filteredAndSortedJobs.length === 1 ? 'job' : 'jobs'} found
                    </span>
                    <span className="text-border hidden sm:block">•</span>
                    <span className="text-xs text-text-secondary">
                      Sorted by: <span className="text-accent-green font-medium">{sortBy}</span>
                    </span>
                  </div>
                  <div className="text-xs text-text-light">
                    Click dropdown to change sort order
                  </div>
                </div>

                {/* Jobs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {filteredAndSortedJobs.map(job => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onToggleSave={handleToggleSave}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;