import React from 'react';

const TestTailwind: React.FC = () => {
  return (
    <div className="p-8 max-w-8xl mx-auto">
      <h1 className="text-3xl font-bold text-text-primary mb-6">
        🎉 Tailwind CSS is Working!
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Test colors */}
        <div className="p-6 rounded-lg bg-dark-gradient text-white">
          <h3 className="text-lg font-semibold mb-2">Dark Gradient</h3>
          <p className="text-sm opacity-90">#0B0B0B → #1A1A1A</p>
        </div>
        
        <div className="p-6 rounded-lg bg-accent-green text-text-primary">
          <h3 className="text-lg font-semibold mb-2">Accent Green</h3>
          <p className="text-sm">#7CFFB2</p>
        </div>
        
        <div className="p-6 rounded-lg bg-bg-light border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-2">Light Background</h3>
          <p className="text-sm text-text-secondary">#F7F8FA</p>
        </div>
      </div>
      
      {/* Test border radius */}
      <div className="mt-8 grid grid-cols-5 gap-4">
        <div className="p-4 bg-tag-green-bg text-tag-green-text rounded-sm">sm (4px)</div>
        <div className="p-4 bg-tag-blue-bg text-tag-blue-text rounded-md">md (8px)</div>
        <div className="p-4 bg-tag-purple-bg text-tag-purple-text rounded-lg">lg (12px)</div>
        <div className="p-4 bg-tag-gray-bg text-tag-gray-text rounded-xl">xl (24px)</div>
        <div className="p-4 bg-accent-green text-text-primary rounded-pill">pill</div>
      </div>
      
      {/* Test shadows */}
      <div className="mt-8 grid grid-cols-3 gap-6">
        <div className="p-6 bg-card-bg shadow-sm rounded-lg">
          <h4 className="font-medium mb-2">Shadow SM</h4>
          <p className="text-sm text-text-secondary">Small shadow</p>
        </div>
        <div className="p-6 bg-card-bg shadow-md rounded-lg">
          <h4 className="font-medium mb-2">Shadow MD</h4>
          <p className="text-sm text-text-secondary">Medium shadow</p>
        </div>
        <div className="p-6 bg-card-bg shadow-lg rounded-lg">
          <h4 className="font-medium mb-2">Shadow LG</h4>
          <p className="text-sm text-text-secondary">Large shadow</p>
        </div>
      </div>
      
      {/* Test responsive design */}
      <div className="mt-8 p-6 bg-bg-light rounded-lg">
        <h3 className="text-xl font-bold text-text-primary mb-4">Responsive Test</h3>
        <div className="text-center">
          <div className="inline-block px-4 py-2 bg-accent-green text-text-primary rounded-md text-sm font-medium">
            This text is centered and responsive
          </div>
          <p className="mt-4 text-text-secondary">
            Resize your browser to see responsive behavior
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestTailwind;
