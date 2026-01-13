import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [jobQuery, setJobQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', { jobQuery, location });
  };

  return (
    <div style={{
      background: 'var(--color-dark-gradient)',
      padding: '3rem 2rem'
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h1 style={{
          color: 'white',
          fontSize: '2.5rem',
          fontWeight: 700,
          lineHeight: 1.2,
          marginBottom: '2rem',
          letterSpacing: '-0.025em'
        }}>
          Find your next freelance project
        </h1>

        {/* Pill-shaped Search Bar - EXACT from specification */}
        <form onSubmit={handleSearch} style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-pill)',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            boxShadow: 'var(--shadow-lg)'
          }}>
            {/* Job Search Input */}
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0 1rem'
            }}>
              <Search size={20} color="#6B7280" />
              <input
                type="text"
                placeholder="Job Title or Keywords"
                value={jobQuery}
                onChange={(e) => setJobQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-primary)'
                }}
              />
            </div>
            
            {/* Vertical Divider */}
            <div style={{
              width: '1px',
              height: '24px',
              background: 'var(--color-border)'
            }} />
            
            {/* Location Input */}
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0 1rem'
            }}>
              <MapPin size={20} color="#6B7280" />
              <input
                type="text"
                placeholder="Client location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-primary)'
                }}
              />
            </div>
            
            {/* Vertical Divider */}
            <div style={{
              width: '1px',
              height: '24px',
              background: 'var(--color-border)'
            }} />
            
            {/* Search Button */}
            <button
              type="submit"
              style={{
                background: 'var(--color-accent-green)',
                color: 'var(--color-text-primary)',
                border: 'none',
                borderRadius: 'var(--radius-pill)',
                padding: '0.75rem 2rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'var(--transition)',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-accent-green-dark)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-accent-green)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Search Jobs
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;