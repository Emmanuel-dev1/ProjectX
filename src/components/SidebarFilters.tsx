import React from 'react';
import { Filter, X } from 'lucide-react';

interface SidebarFiltersProps {
  selectedLevels: string[];
  selectedPayment: string[];
  selectedCategories: string[];
  onLevelToggle: (level: string) => void;
  onPaymentToggle: (type: string) => void;
  onCategoryToggle: (category: string) => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
}

const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  selectedLevels,
  selectedPayment,
  selectedCategories,
  onLevelToggle,
  onPaymentToggle,
  onCategoryToggle,
  onClearAll,
  hasActiveFilters,
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

  const handleClearLevels = () => {
    selectedLevels.forEach(level => onLevelToggle(level));
  };

  const handleClearPayment = () => {
    selectedPayment.forEach(type => onPaymentToggle(type));
  };

  const handleClearCategories = () => {
    selectedCategories.forEach(category => onCategoryToggle(category));
  };

  return (
    <div className="bg-card-bg rounded-xl p-4 md:p-6 shadow-sm border border-border-light lg:sticky lg:top-24">
      {/* Filters Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6 pb-4 border-b border-border-light">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-text-secondary" />
          <h3 className="text-base md:text-lg font-semibold text-text-primary">Filters</h3>
          {hasActiveFilters && (
            <span className="bg-accent-green text-text-primary text-xs font-semibold px-2 py-0.5 rounded-full">
              {selectedLevels.length + selectedPayment.length + selectedCategories.length}
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1 text-text-secondary text-xs font-medium hover:text-text-primary transition-colors"
          >
            <X size={12} />
            Clear All
          </button>
        )}
      </div>

      {/* Experience Level Filter */}
      <div className="mb-6 md:mb-8">
        <div className="flex justify-between items-center mb-3 md:mb-4">
          <h4 className="text-sm font-semibold text-text-primary">Experience Level</h4>
          {selectedLevels.length > 0 && (
            <button
              onClick={handleClearLevels}
              className="text-text-light text-xs hover:text-text-primary transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <label
              key={level.label}
              className={`flex justify-between items-center p-2 cursor-pointer rounded transition-colors ${
                selectedLevels.includes(level.label) 
                  ? 'bg-bg-light border border-border-light' 
                  : 'hover:bg-bg-light'
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedLevels.includes(level.label)}
                  onChange={() => onLevelToggle(level.label)}
                  className="w-4 h-4 border-2 border-border rounded-sm cursor-pointer checked:bg-text-primary checked:border-text-primary focus:ring-0 focus:ring-offset-0"
                />
                <span className={`text-sm ${
                  selectedLevels.includes(level.label) 
                    ? 'text-text-primary font-medium' 
                    : 'text-text-secondary'
                }`}>
                  {level.label}
                </span>
              </div>
              <span className={`text-xs ${
                selectedLevels.includes(level.label) 
                  ? 'text-text-primary font-medium' 
                  : 'text-text-light'
              }`}>
                {level.count.toLocaleString()}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Payment Type Filter */}
      <div className="mb-6 md:mb-8">
        <div className="flex justify-between items-center mb-3 md:mb-4">
          <h4 className="text-sm font-semibold text-text-primary">Payment Type</h4>
          {selectedPayment.length > 0 && (
            <button
              onClick={handleClearPayment}
              className="text-text-light text-xs hover:text-text-primary transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-2">
          {paymentTypes.map((type) => (
            <label
              key={type.label}
              className={`flex justify-between items-center p-2 cursor-pointer rounded transition-colors ${
                selectedPayment.includes(type.label) 
                  ? 'bg-bg-light border border-border-light' 
                  : 'hover:bg-bg-light'
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedPayment.includes(type.label)}
                  onChange={() => onPaymentToggle(type.label)}
                  className="w-4 h-4 border-2 border-border rounded-sm cursor-pointer checked:bg-text-primary checked:border-text-primary focus:ring-0 focus:ring-offset-0"
                />
                <span className={`text-sm ${
                  selectedPayment.includes(type.label) 
                    ? 'text-text-primary font-medium' 
                    : 'text-text-secondary'
                }`}>
                  {type.label}
                </span>
              </div>
              <span className={`text-xs ${
                selectedPayment.includes(type.label) 
                  ? 'text-text-primary font-medium' 
                  : 'text-text-light'
              }`}>
                {type.count.toLocaleString()}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Project Category Filter */}
      <div>
        <div className="flex justify-between items-center mb-3 md:mb-4">
          <h4 className="text-sm font-semibold text-text-primary">Project Category</h4>
          {selectedCategories.length > 0 && (
            <button
              onClick={handleClearCategories}
              className="text-text-light text-xs hover:text-text-primary transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className={`flex items-center p-2 cursor-pointer rounded transition-colors ${
                selectedCategories.includes(category) 
                  ? 'bg-bg-light border border-border-light' 
                  : 'hover:bg-bg-light'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryToggle(category)}
                className="w-4 h-4 border-2 border-border rounded-sm cursor-pointer checked:bg-text-primary checked:border-text-primary mr-2 focus:ring-0 focus:ring-offset-0"
              />
              <span className={`text-sm ${
                selectedCategories.includes(category) 
                  ? 'text-text-primary font-medium' 
                  : 'text-text-secondary'
              }`}>
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarFilters;