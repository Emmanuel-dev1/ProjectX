import React from 'react';
import { Bookmark, Clock, Users, TrendingUp, MapPin } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onToggleSave: (id: number) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onToggleSave }) => {
  const getTagClasses = (tag: string) => {
    switch (tag) {
      case 'Fixed Budget':
      case 'Hourly Rate':
        return 'bg-tag-green-bg text-tag-green-text';
      case 'Entry':
      case 'Intermediate':
      case 'Advanced':
        return 'bg-tag-blue-bg text-tag-blue-text';
      default:
        return 'bg-tag-gray-bg text-tag-gray-text';
    }
  };

  // Parse the posted date for "NEW" badge
  const parsePostedDate = (dateStr: string) => {
    const match = dateStr.match(/(\d+)\s+(day|days)/i);
    if (match) {
      const days = parseInt(match[1], 10);
      return days <= 3;
    }
    return false;
  };

  const isRecent = parsePostedDate(job.postedDate);

  return (
    <div className="group bg-card-bg rounded-xl p-4 md:p-6 shadow-sm border border-border-light transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col gap-3 md:gap-4 h-full relative">
      {/* Recent indicator badge */}
      {isRecent && (
        <div className="absolute -top-2 right-4 bg-accent-green text-text-primary px-2 md:px-3 py-0.5 rounded-full text-xs font-semibold z-10">
          NEW
        </div>
      )}

      {/* Card Header */}
      <div className="flex justify-between items-start gap-2">
        <div className="flex gap-3 md:gap-4 min-w-0">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-light rounded-lg flex items-center justify-center text-xl md:text-2xl flex-shrink-0">
            {job.companyLogo}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold text-text-primary mb-1 truncate">
              {job.title}
            </h3>
            <div className="flex items-center gap-1 md:gap-2 text-xs text-text-secondary flex-wrap">
              <span className="font-medium truncate">{job.company}</span>
              <span className="text-border hidden md:inline">•</span>
              <span className="flex items-center gap-1 truncate">
                <MapPin size={10} className="flex-shrink-0" />
                <span className="truncate">{job.location}</span>
              </span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1">
                <Users size={10} className="flex-shrink-0" />
                {job.proposals}
              </span>
              <span className="text-border hidden md:inline">•</span>
              <span className="flex items-center gap-1">
                <Clock size={10} className="flex-shrink-0" />
                {job.postedDate}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => onToggleSave(job.id)}
          className={`p-1 rounded transition-colors flex-shrink-0 ${
            job.isSaved ? 'text-accent-green' : 'text-text-light'
          } hover:bg-bg-light`}
          aria-label={job.isSaved ? 'Remove from saved' : 'Save job'}
        >
          <Bookmark size={20} fill={job.isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${getTagClasses(tag)}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm text-text-secondary leading-relaxed flex-grow line-clamp-2">
        {job.description}
      </p>

      {/* Footer */}
      <div className="pt-3 md:pt-4 border-t border-border-light flex justify-between items-center gap-4">
        <div className="min-w-0">
          <div className="text-lg md:text-xl font-bold text-text-primary flex items-center gap-1">
            <span className="flex-shrink-0">₵</span>
            <span className="truncate">{job.salary}</span>
            {job.salaryType === 'Hourly Rate' && (
              <span className="text-xs font-normal text-text-light ml-1 flex-shrink-0">
                / hour
              </span>
            )}
          </div>
          <div className="text-xs text-text-light flex items-center gap-1">
            <TrendingUp size={10} className="flex-shrink-0" />
            {job.salaryType}
          </div>
        </div>
        <button className="bg-white text-text-primary border border-border rounded-md px-4 md:px-6 py-2 text-sm font-medium cursor-pointer transition-colors whitespace-nowrap hover:bg-bg-light hover:border-accent-green hover:text-accent-green">
          Submit Proposal
        </button>
      </div>
    </div>
  );
};

export default JobCard;