// components/HeroSection.tsx (updated)
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface HeroSectionProps {
  onSearch?: (query: string, location: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [jobQuery, setJobQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(jobQuery, location);
    }
  };

  return (
    <div className="bg-dark-gradient py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 md:mb-8 tracking-tight">
          Find your next freelance project
        </h1>

        <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl md:rounded-full p-2 md:p-3 flex flex-col md:flex-row items-center shadow-lg">
            {/* Job Search Input */}
            <div className="flex-1 w-full md:w-auto flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 mb-2 md:mb-0 md:border-r border-border">
              <Search size={18} className="text-text-secondary flex-shrink-0" />
              <input
                type="text"
                placeholder="Job Title or Keywords"
                value={jobQuery}
                onChange={(e) => setJobQuery(e.target.value)}
                className="w-full py-1 md:py-0 border-none outline-none text-sm md:text-base text-text-primary placeholder:text-text-light"
              />
            </div>
            
            {/* Location Input */}
            <div className="flex-1 w-full md:w-auto flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 mb-2 md:mb-0 md:border-r border-border">
              <MapPin size={18} className="text-text-secondary flex-shrink-0" />
              <input
                type="text"
                placeholder="Client location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full py-1 md:py-0 border-none outline-none text-sm md:text-base text-text-primary placeholder:text-text-light"
              />
            </div>
            
            {/* Search Button */}
            <button
              type="submit"
              className="bg-accent-green text-text-primary border-none rounded-lg md:rounded-full px-6 py-3 md:py-3 text-sm md:text-base font-semibold cursor-pointer transition-all hover:bg-accent-green-dark hover:-translate-y-0.5 whitespace-nowrap w-full md:w-auto flex items-center justify-center gap-2 mt-2 md:mt-0"
            >
              <Search size={16} />
              Search Jobs
            </button>
          </div>
        </form>
        
        {/* Popular Searches */}
        <div className="mt-6 md:mt-8">
          <p className="text-gray-400 text-sm mb-2">Popular searches:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['React Developer', 'UI/UX Designer', 'Web Developer', 'Mobile App', 'Copywriter', 'Python', 'Full Stack'].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setJobQuery(tag);
                  if (onSearch) onSearch(tag, location);
                }}
                className="text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-xs md:text-sm transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;