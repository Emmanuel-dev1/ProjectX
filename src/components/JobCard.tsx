import React from 'react';
import { Bookmark, Clock, DollarSign } from 'lucide-react';
import { Job } from '../types/job';

interface JobCardProps {
  job: Job;
  onToggleSave: (id: number) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onToggleSave }) => {
  const getTagStyle = (tag: string) => {
    switch (tag) {
      case 'Fixed Budget':
      case 'Hourly Rate':
        return {
          background: 'var(--color-tag-green-bg)',
          color: 'var(--color-tag-green-text)'
        };
      case 'Entry':
      case 'Intermediate':
      case 'Advanced':
        return {
          background: 'var(--color-tag-blue-bg)',
          color: 'var(--color-tag-blue-text)'
        };
      default:
        return {
          background: 'var(--color-tag-gray-bg)',
          color: 'var(--color-tag-gray-text)'
        };
    }
  };

  return (
    <div style={{
      background: 'var(--color-card-bg)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid var(--color-border-light)',
      transition: 'var(--transition)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      height: '100%'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
    >
      {/* Card Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'var(--color-bg-light)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            flexShrink: 0
          }}>
            {job.companyLogo}
          </div>
          <div>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '0.25rem'
            }}>
              {job.title}
            </h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.75rem',
              color: 'var(--color-text-secondary)',
              flexWrap: 'wrap'
            }}>
              <span style={{ fontWeight: 500 }}>{job.company}</span>
              <span style={{ color: 'var(--color-border)' }}>•</span>
              <span>{job.proposals} proposals</span>
              <span style={{ color: 'var(--color-border)' }}>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock size={12} />
                Posted {job.postedDate}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => onToggleSave(job.id)}
          style={{
            background: 'none',
            border: 'none',
            color: job.isSaved ? 'var(--color-accent-green)' : 'var(--color-text-light)',
            cursor: 'pointer',
            padding: '0.25rem',
            borderRadius: 'var(--radius-sm)',
            transition: 'var(--transition)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-bg-light)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'none';
          }}
        >
          <Bookmark size={20} fill={job.isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {job.tags.map((tag) => {
          const tagStyle = getTagStyle(tag);
          return (
            <span
              key={tag}
              style={{
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.75rem',
                fontWeight: 500,
                ...tagStyle
              }}
            >
              {tag}
            </span>
          );
        })}
      </div>

      {/* Description */}
      <p style={{
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.6,
        flexGrow: 1
      }}>
        {job.description}
      </p>

      {/* Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '1rem',
        borderTop: '1px solid var(--color-border-light)'
      }}>
        <div>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}>
            <DollarSign size={16} />
            {job.salary}
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--color-text-light)'
          }}>
            {job.salaryType}
          </div>
        </div>
        <button style={{
          background: 'white',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: '0.5rem 1.5rem',
          fontSize: '0.875rem',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'var(--transition)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--color-bg-light)';
          e.currentTarget.style.borderColor = 'var(--color-text-light)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'white';
          e.currentTarget.style.borderColor = 'var(--color-border)';
        }}
        >
          Submit Proposal
        </button>
      </div>
    </div>
  );
};

export default JobCard;