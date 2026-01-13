import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import SidebarFilters from '../components/SidebarFilters';
import JobCard from '../components/JobCard';
import { ChevronDown, Filter, X } from 'lucide-react';
import { Job } from '../types/job';

const JobsPage: React.FC = () => {
  // Filter states
  const [selectedLevels, setSelectedLevels] = useState<string[]>(['Intermediate']);
  const [selectedPayment, setSelectedPayment] = useState<string[]>(['Fixed Budget']);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Website Design']);
  const [sortBy, setSortBy] = useState('Recently Listed');
  
  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  
  // Jobs state
  const [jobs, setJobs] = useState<Job[]>([]);

  // Mock data - EXACT from specification
  useEffect(() => {
    console.log('Loading mock jobs...');
    const mockJobs: Job[] = [
      {
        id: 1,
        title: 'E-commerce Mobile App Design',
        company: 'ShopEasy Inc.',
        companyLogo: '🛒',
        location: 'Remote',
        salary: '$590 USD',
        salaryType: 'Fixed Budget',
        type: 'Intermediate',
        postedDate: '8 days ago',
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
        salary: '$24 USD / hour',
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
        salary: '$350 USD',
        salaryType: 'Fixed Budget',
        type: 'Entry',
        postedDate: '1 day ago',
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
        salary: '$45 USD / hour',
        salaryType: 'Hourly Rate',
        type: 'Intermediate',
        postedDate: '5 days ago',
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
        salary: '$750 USD',
        salaryType: 'Fixed Budget',
        type: 'Intermediate',
        postedDate: '3 days ago',
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
        salary: '$280 USD',
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
        salary: '$65 USD / hour',
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
        salary: '$500 USD',
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
    
    console.log('Mock jobs loaded:', mockJobs.length, 'jobs');
    setJobs(mockJobs);
  }, []);

  // Helper function to parse salary to number
  const parseSalaryToNumber = (salary: string): number => {
    // Remove currency symbols, commas, and text
    const numericString = salary.replace(/[^0-9.]/g, '');
    return parseFloat(numericString) || 0;
  };

  // Helper function to parse posted date to days
  const parsePostedDateToDays = (postedDate: string): number => {
    const match = postedDate.match(/(\d+)\s+days?/i);
    if (match) {
      return parseInt(match[1], 10);
    }
    return 999; // If can't parse, put at the end
  };

  // Sort and filter jobs using useMemo for performance
  const filteredAndSortedJobs = useMemo(() => {
    console.log('Sorting by:', sortBy);
    console.log('Search query:', searchQuery);
    console.log('Search location:', searchLocation);
    
    // First, filter the jobs
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

    // Then, sort based on the selected option
    switch (sortBy) {
      case 'Recently Listed':
        // Sort by most recent (lowest days ago)
        result.sort((a, b) => {
          const daysA = parsePostedDateToDays(a.postedDate);
          const daysB = parsePostedDateToDays(b.postedDate);
          return daysA - daysB; // Lower days = more recent
        });
        break;

      case 'Most Proposals':
        // Sort by highest proposals
        result.sort((a, b) => b.proposals - a.proposals);
        break;

      case 'Highest Budget':
        // Sort by highest salary/budget
        result.sort((a, b) => {
          const salaryA = parseSalaryToNumber(a.salary);
          const salaryB = parseSalaryToNumber(b.salary);
          
          // For hourly rates, we need to make them comparable
          // Let's assume 40 hours per week for comparison
          if (a.salaryType === 'Hourly Rate' && b.salaryType === 'Hourly Rate') {
            return salaryB - salaryA; // Higher hourly rate = higher budget
          } else if (a.salaryType === 'Hourly Rate') {
            // Compare hourly (assuming 40 hours) vs fixed
            const hourlyAsWeekly = salaryA * 40;
            return hourlyAsWeekly > salaryB ? -1 : 1;
          } else if (b.salaryType === 'Hourly Rate') {
            // Compare fixed vs hourly (assuming 40 hours)
            const hourlyAsWeekly = salaryB * 40;
            return salaryA > hourlyAsWeekly ? -1 : 1;
          } else {
            // Both are fixed budget
            return salaryB - salaryA;
          }
        });
        break;

      case 'Most Relevant':
        // Sort by combination of factors: recency + proposals + saved status + search relevance
        result.sort((a, b) => {
          let scoreA = 0;
          let scoreB = 0;
          
          // Recency score (more recent = higher score)
          const daysA = parsePostedDateToDays(a.postedDate);
          const daysB = parsePostedDateToDays(b.postedDate);
          scoreA += (30 - Math.min(daysA, 30)) * 10; // Max 30 days old
          scoreB += (30 - Math.min(daysB, 30)) * 10;
          
          // Proposal score (more proposals = higher score)
          scoreA += a.proposals * 2;
          scoreB += b.proposals * 2;
          
          // Salary score (higher salary = higher score)
          const salaryA = parseSalaryToNumber(a.salary);
          const salaryB = parseSalaryToNumber(b.salary);
          scoreA += salaryA / 10; // Scale down for balanced scoring
          scoreB += salaryB / 10;
          
          // Saved status bonus (saved jobs get bonus)
          if (a.isSaved) scoreA += 50;
          if (b.isSaved) scoreB += 50;
          
          // Search relevance bonus (exact matches in title get highest bonus)
          if (searchQuery) {
            const query = searchQuery.toLowerCase();
            if (a.title.toLowerCase().includes(query)) scoreA += 100;
            if (b.title.toLowerCase().includes(query)) scoreB += 100;
            if (a.company.toLowerCase().includes(query)) scoreA += 75;
            if (b.company.toLowerCase().includes(query)) scoreB += 75;
          }
          
          return scoreB - scoreA; // Higher score = more relevant
        });
        break;

      default:
        // Default: Recently Listed
        result.sort((a, b) => {
          const daysA = parsePostedDateToDays(a.postedDate);
          const daysB = parsePostedDateToDays(b.postedDate);
          return daysA - daysB;
        });
    }

    console.log('Filtered and sorted jobs count:', result.length);
    return result;
  }, [jobs, selectedLevels, selectedPayment, selectedCategories, sortBy, searchQuery, searchLocation]);

  // Handle filter toggles
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

  const handleSortChange = (value: string) => {
    console.log('Changing sort to:', value);
    setSortBy(value);
  };

  const handleSearch = (query: string, location: string) => {
    console.log('Search triggered:', { query, location });
    setSearchQuery(query);
    setSearchLocation(location);
  };

  // Check if any filters are active
  const hasActiveFilters = 
    selectedLevels.length > 0 || 
    selectedPayment.length > 0 || 
    selectedCategories.length > 0 ||
    searchQuery ||
    searchLocation;

  return (
    <div>
      <Header />
      <HeroSection onSearch={handleSearch} />
      
      {/* Main Content */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '2rem auto', 
        padding: '0 2rem' 
      }}>
        {/* Page Header with Clear All button */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--color-text-primary)'
            }}>
              Recommended Jobs
            </h2>
            
            {/* Active filters badge */}
            {hasActiveFilters && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--color-bg-light)',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)'
              }}>
                <Filter size={14} />
                <span>
                  {selectedLevels.length + selectedPayment.length + selectedCategories.length + 
                   (searchQuery ? 1 : 0) + (searchLocation ? 1 : 0)} active filters
                </span>
                <button
                  onClick={handleClearAllFilters}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-text-light)',
                    cursor: 'pointer',
                    padding: '0.125rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'var(--transition)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.color = 'var(--color-text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'none';
                    e.currentTarget.style.color = 'var(--color-text-light)';
                  }}
                >
                  <X size={12} />
                </button>
              </div>
            )}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Sort Dropdown */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                style={{
                  appearance: 'none',
                  background: 'white',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-pill)',
                  padding: '0.5rem 2.5rem 0.5rem 1rem',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-primary)',
                  cursor: 'pointer',
                  minWidth: '140px',
                  transition: 'var(--transition)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-text-light)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                }}
              >
                <option value="Recently Listed">Recently Listed</option>
                <option value="Most Proposals">Most Proposals</option>
                <option value="Highest Budget">Highest Budget</option>
                <option value="Most Relevant">Most Relevant</option>
              </select>
              <ChevronDown 
                size={16} 
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-secondary)',
                  pointerEvents: 'none'
                }} 
              />
            </div>

            {/* Clear All Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={handleClearAllFilters}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'var(--color-bg-light)',
                  color: 'var(--color-text-primary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.borderColor = 'var(--color-text-light)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--color-bg-light)';
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <X size={14} />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Search status */}
        {(searchQuery || searchLocation) && (
          <div style={{
            background: 'var(--color-bg-light)',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '1.5rem',
            border: '1px solid var(--color-border-light)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Search size={16} color="var(--color-text-secondary)" />
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)', fontWeight: 500 }}>
                  Search Results
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
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
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                background: 'none',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.25rem 0.75rem',
                fontSize: '0.75rem',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = 'var(--color-text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = 'var(--color-text-secondary)';
              }}
            >
              <X size={12} />
              Clear Search
            </button>
          </div>
        )}

        {/* Two-Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '250px 1fr',
          gap: '2rem',
          minHeight: '600px'
        }}>
          {/* Left Sidebar - Filters */}
          <SidebarFilters
            selectedLevels={selectedLevels}
            selectedPayment={selectedPayment}
            selectedCategories={selectedCategories}
            onLevelToggle={handleLevelToggle}
            onPaymentToggle={handlePaymentToggle}
            onCategoryToggle={handleCategoryToggle}
            onClearAll={handleClearAllFilters}
          />

          {/* Right Grid - Job Cards */}
          <div>
            {filteredAndSortedJobs.length === 0 ? (
              <div style={{
                background: 'white',
                padding: '3rem',
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--color-border-light)'
              }}>
                <h3 style={{ 
                  marginBottom: '1rem', 
                  color: 'var(--color-text-primary)',
                  fontSize: '1.25rem'
                }}>
                  No jobs found
                </h3>
                <p style={{ 
                  color: 'var(--color-text-secondary)', 
                  marginBottom: '2rem',
                  fontSize: '0.875rem'
                }}>
                  {hasActiveFilters 
                    ? 'Try adjusting your filters or search criteria'
                    : 'No jobs available at the moment'}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearAllFilters}
                    style={{
                      background: 'var(--color-accent-green)',
                      color: 'var(--color-text-primary)',
                      border: 'none',
                      padding: '0.75rem 2rem',
                      borderRadius: '6px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      transition: 'var(--transition)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <div>
                {/* Results info */}
                <div style={{
                  marginBottom: '1rem',
                  padding: '0.75rem',
                  background: 'white',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border-light)',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-secondary)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>
                      {filteredAndSortedJobs.length} {filteredAndSortedJobs.length === 1 ? 'job' : 'jobs'} found
                    </span>
                    <span style={{ color: 'var(--color-border)' }}>•</span>
                    <span>Sorted by: <strong style={{ color: 'var(--color-accent-green)' }}>{sortBy}</strong></span>
                  </div>
                  <div style={{ fontSize: '0.75rem' }}>
                    Click dropdown to change sort order
                  </div>
                </div>

                {/* Jobs Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1.5rem'
                }}>
                  {filteredAndSortedJobs.map(job => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onToggleSave={handleToggleSave}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;