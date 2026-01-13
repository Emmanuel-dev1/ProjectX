import React from 'react';
import { Filter } from 'lucide-react';

interface SidebarFiltersProps {
  selectedLevels: string[];
  selectedPayment: string[];
  selectedCategories: string[];
  onLevelToggle: (level: string) => void;
  onPaymentToggle: (type: string) => void;
  onCategoryToggle: (category: string) => void;
}

const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  selectedLevels,
  selectedPayment,
  selectedCategories,
  onLevelToggle,
  onPaymentToggle,
  onCategoryToggle,
}) => {
  const experienceLevels = [
    { label: 'Entry', count: 142 },
    { label: 'Intermediate', count: 549 },
    { label: 'Advanced', count: 1288 },
  ];

  const paymentTypes = [
    { label: 'Hourly Rate', count: 142 },
    { label: 'Fixed Budget', count: 549 },
  ];

  const categories = [
    'Website Design',
    'Mobile App Design',
    'Website Development',
    'Mobile App Development',
    'Copywriting',
  ];

  

  return (
    <div style={{
      background: 'var(--color-card-bg)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid var(--color-border-light)',
      height: 'fit-content'
    }}>
      {/* Filters Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--color-border-light)'
      }}>
        <Filter size={20} color="#6B7280" />
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: 600,
          color: 'var(--color-text-primary)'
        }}>
          Filters
        </h3>
      </div>

      {/* Experience Level Filter */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: '1rem'
        }}>
          Experience Level
        </h4>
        {experienceLevels.map((level) => (
          <label
            key={level.label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.5rem',
              cursor: 'pointer',
              borderRadius: 'var(--radius-sm)',
              transition: 'var(--transition)',
              marginBottom: '0.25rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-bg-light)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="checkbox"
                  checked={selectedLevels.includes(level.label)}
                  onChange={() => onLevelToggle(level.label)}
                  style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    appearance: 'none',
                    position: 'relative'
                  }}
                />
                {selectedLevels.includes(level.label) && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '10px',
                    height: '10px',
                    background: 'var(--color-text-primary)',
                    borderRadius: '2px'
                  }} />
                )}
              </div>
              <span style={{
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                fontWeight: selectedLevels.includes(level.label) ? '600' : '400'
              }}>
                {level.label}
              </span>
            </div>
            <span style={{
              fontSize: '0.75rem',
              color: 'var(--color-text-light)'
            }}>
              {level.count.toLocaleString()}
            </span>
          </label>
        ))}
      </div>

      {/* Payment Type Filter */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: '1rem'
        }}>
          Payment Type
        </h4>
        {paymentTypes.map((type) => (
          <label
            key={type.label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.5rem',
              cursor: 'pointer',
              borderRadius: 'var(--radius-sm)',
              transition: 'var(--transition)',
              marginBottom: '0.25rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-bg-light)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="checkbox"
                  checked={selectedPayment.includes(type.label)}
                  onChange={() => onPaymentToggle(type.label)}
                  style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    appearance: 'none',
                    position: 'relative'
                  }}
                />
                {selectedPayment.includes(type.label) && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '10px',
                    height: '10px',
                    background: 'var(--color-text-primary)',
                    borderRadius: '2px'
                  }} />
                )}
              </div>
              <span style={{
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                fontWeight: selectedPayment.includes(type.label) ? '600' : '400'
              }}>
                {type.label}
              </span>
            </div>
            <span style={{
              fontSize: '0.75rem',
              color: 'var(--color-text-light)'
            }}>
              {type.count.toLocaleString()}
            </span>
          </label>
        ))}
      </div>

      {/* Project Category Filter */}
      <div>
        <h4 style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: '1rem'
        }}>
          Project Category
        </h4>
        {categories.map((category) => (
          <label
            key={category}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.5rem',
              cursor: 'pointer',
              borderRadius: 'var(--radius-sm)',
              transition: 'var(--transition)',
              marginBottom: '0.25rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-bg-light)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <div style={{ position: 'relative', marginRight: '0.5rem' }}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryToggle(category)}
                style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  appearance: 'none',
                  position: 'relative'
                }}
              />
              {selectedCategories.includes(category) && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '10px',
                  height: '10px',
                  background: 'var(--color-text-primary)',
                  borderRadius: '2px'
                }} />
              )}
            </div>
            <span style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)',
              fontWeight: selectedCategories.includes(category) ? '600' : '400'
            }}>
              {category}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SidebarFilters;