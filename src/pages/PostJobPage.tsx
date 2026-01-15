// pages/PostJobPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Upload, 
  Calendar, 
  FileText, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Clock,
  Users,
  Globe,
  Briefcase,
  DollarSign,
  Tag,
  Plus,
  X,
  ChevronDown,
  MapPin,
  Layers,
  Target,
  TrendingUp
} from 'lucide-react';
import Header from '../components/Header';

const PostJobPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    jobTitle: '',
    jobDescription: '',
    jobCategory: '',
    jobType: 'Fixed Price',
    experienceLevel: 'Intermediate',
    duration: '1-3 months',
    location: 'Remote',
    timezone: 'GMT+0 (Any)',
    
    // Step 2
    budgetType: 'fixed',
    budgetAmount: '',
    budgetMin: '',
    budgetMax: '',
    skillsRequired: ['React', 'TypeScript', 'UI/UX'],
    newSkill: '',
    
    // Step 3
    attachments: [] as File[],
    visibility: 'public',
    autoAccept: false,
    featuredListing: false
  });

  const categories = [
    'Website Design',
    'Mobile App Design',
    'Website Development',
    'Mobile App Development',
    'Copywriting',
    'Graphic Design',
    'Digital Marketing',
    'SEO',
    'Content Writing',
    'Data Entry',
    'Video Editing',
    'Audio Production',
    '3D Modeling',
    'Game Development',
    'Blockchain',
    'AI/ML Development'
  ];

  const jobTypes = [
    { value: 'Fixed Price', label: 'Fixed Price', icon: <Tag size={16} /> },
    { value: 'Hourly', label: 'Hourly', icon: <Clock size={16} /> },
    { value: 'Milestone', label: 'Milestone', icon: <Layers size={16} /> }
  ];

  const experienceLevels = [
    { value: 'Entry', label: 'Entry Level', description: '0-2 years experience' },
    { value: 'Intermediate', label: 'Intermediate', description: '2-5 years experience' },
    { value: 'Expert', label: 'Expert', description: '5+ years experience' }
  ];

  const durations = [
    'Less than 1 month',
    '1-3 months',
    '3-6 months',
    '6+ months',
    'Ongoing'
  ];

  const locations = [
    'Remote',
    'On-site',
    'Hybrid',
    'Any'
  ];

  const timezones = [
    'GMT+0 (Any)',
    'GMT-8 to GMT+3',
    'GMT-5 to GMT+1',
    'GMT-3 to GMT+5',
    'Specific Timezone'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddSkill = () => {
    if (formData.newSkill.trim() && !formData.skillsRequired.includes(formData.newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skillsRequired: [...prev.skillsRequired, formData.newSkill.trim()],
        newSkill: ''
      }));
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter(s => s !== skill)
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...files]
      }));
    }
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit the job
      alert('Job posted successfully!');
      console.log('Job Data:', formData);
      
      // Reset form
      setFormData({
        jobTitle: '',
        jobDescription: '',
        jobCategory: '',
        jobType: 'Fixed Price',
        experienceLevel: 'Intermediate',
        duration: '1-3 months',
        location: 'Remote',
        timezone: 'GMT+0 (Any)',
        budgetType: 'fixed',
        budgetAmount: '',
        budgetMin: '',
        budgetMax: '',
        skillsRequired: ['React', 'TypeScript', 'UI/UX'],
        newSkill: '',
        attachments: [],
        visibility: 'public',
        autoAccept: false,
        featuredListing: false
      });
      setStep(1);
    }
  };

  const getTotalCost = () => {
    let basePrice = formData.featuredListing ? 20 : 0;
    if (formData.visibility === 'premium') basePrice += 50;
    return `GHS ${basePrice}`;
  };

  return (
    <div className="min-h-screen bg-bg-light pb-16 md:pb-0">
      <Header />
      
      {/* Progress Steps */}
      <div className="bg-white border-b border-border-light">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back to Jobs</span>
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Post a Job</h1>
            </div>
            <div className="text-sm text-text-light hidden md:block">
              Step {step} of 3
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center justify-between">
            {[
              { number: 1, label: 'Job Details' },
              { number: 2, label: 'Budget & Skills' },
              { number: 3, label: 'Review & Post' }
            ].map((stepItem) => (
              <div key={stepItem.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    stepItem.number < step 
                      ? 'bg-accent-green text-text-primary transform scale-110'
                      : stepItem.number === step 
                      ? 'bg-accent-green/20 border-2 border-accent-green text-accent-green'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {stepItem.number < step ? <CheckCircle size={20} /> : stepItem.number}
                  </div>
                  <span className={`text-xs mt-2 font-medium hidden md:block ${
                    stepItem.number <= step ? 'text-text-primary' : 'text-text-light'
                  }`}>
                    {stepItem.label}
                  </span>
                </div>
                {stepItem.number < 3 && (
                  <div className={`w-16 md:w-24 h-1 mx-2 ${
                    stepItem.number < step ? 'bg-accent-green' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Job Details */}
          {step === 1 && (
            <div className="bg-white rounded-xl p-6 md:p-8 border border-border-light shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="text-blue-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-text-primary">Job Details</h2>
                  <p className="text-sm text-text-light">Tell us about the job you need done</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    placeholder="e.g., Senior React Developer with TypeScript Experience"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent-green focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-text-light mt-2">
                    Be specific about what you need. Include technologies and responsibilities.
                  </p>
                </div>

                {/* Category & Job Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Category *
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={formData.jobCategory}
                        onChange={(e) => handleInputChange('jobCategory', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent-green focus:border-transparent appearance-none bg-white"
                      >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-light pointer-events-none" size={16} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Job Type *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {jobTypes.map((type) => (
                        <button
                          type="button"
                          key={type.value}
                          onClick={() => handleInputChange('jobType', type.value)}
                          className={`flex flex-col items-center justify-center p-3 border rounded-lg transition-all ${
                            formData.jobType === type.value
                              ? 'border-accent-green bg-accent-green/10'
                              : 'border-border hover:border-text-light'
                          }`}
                        >
                          <div className="text-text-secondary mb-1">{type.icon}</div>
                          <span className="text-xs font-medium">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Experience Level & Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Experience Level *
                    </label>
                    <div className="space-y-2">
                      {experienceLevels.map((level) => (
                        <button
                          type="button"
                          key={level.value}
                          onClick={() => handleInputChange('experienceLevel', level.value)}
                          className={`w-full flex items-center justify-between p-3 border rounded-lg transition-all ${
                            formData.experienceLevel === level.value
                              ? 'border-accent-green bg-accent-green/10'
                              : 'border-border hover:border-text-light'
                          }`}
                        >
                          <div className="text-left">
                            <div className="text-sm font-medium text-text-primary">{level.label}</div>
                            <div className="text-xs text-text-light">{level.description}</div>
                          </div>
                          {formData.experienceLevel === level.value && (
                            <CheckCircle className="text-accent-green" size={16} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Project Duration *
                    </label>
                    <div className="space-y-2">
                      {durations.map((duration) => (
                        <button
                          type="button"
                          key={duration}
                          onClick={() => handleInputChange('duration', duration)}
                          className={`w-full p-3 text-left border rounded-lg transition-all ${
                            formData.duration === duration
                              ? 'border-accent-green bg-accent-green/10 text-text-primary font-medium'
                              : 'border-border hover:border-text-light text-text-secondary'
                          }`}
                        >
                          {duration}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Location & Timezone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Location Preference *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {locations.map((location) => (
                        <button
                          type="button"
                          key={location}
                          onClick={() => handleInputChange('location', location)}
                          className={`flex items-center gap-2 p-3 border rounded-lg transition-all ${
                            formData.location === location
                              ? 'border-accent-green bg-accent-green/10'
                              : 'border-border hover:border-text-light'
                          }`}
                        >
                          <MapPin size={14} />
                          <span className="text-sm">{location}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Timezone Preference
                    </label>
                    <div className="relative">
                      <select
                        value={formData.timezone}
                        onChange={(e) => handleInputChange('timezone', e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent-green focus:border-transparent appearance-none bg-white"
                      >
                        {timezones.map(timezone => (
                          <option key={timezone} value={timezone}>{timezone}</option>
                        ))}
                      </select>
                      <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-light" size={16} />
                    </div>
                  </div>
                </div>

                {/* Job Description */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Job Description *
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={formData.jobDescription}
                    onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                    placeholder="Describe the project in detail. Include:
• Project overview and goals
• Specific tasks and deliverables
• Required skills and experience
• Timeline expectations
• Any other important details"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent-green focus:border-transparent resize-none"
                  />
                  <div className="flex justify-between text-xs text-text-light mt-2">
                    <span>Minimum 100 characters</span>
                    <span>{formData.jobDescription.length} characters</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Budget & Skills */}
          {step === 2 && (
            <div className="bg-white rounded-xl p-6 md:p-8 border border-border-light shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="text-green-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-text-primary">Budget & Skills</h2>
                  <p className="text-sm text-text-light">Set your budget and required skills</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Budget Type */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-4">
                    Budget Type *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleInputChange('budgetType', 'fixed')}
                      className={`p-4 border rounded-lg text-left transition-all ${
                        formData.budgetType === 'fixed'
                          ? 'border-accent-green bg-accent-green/10'
                          : 'border-border hover:border-text-light'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          formData.budgetType === 'fixed'
                            ? 'border-accent-green bg-accent-green'
                            : 'border-border'
                        }`}>
                          {formData.budgetType === 'fixed' && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <span className="font-medium">Fixed Price</span>
                          <p className="text-xs text-text-light">Pay a fixed amount for the entire project</p>
                        </div>
                      </div>
                      {formData.budgetType === 'fixed' && (
                        <div className="mt-4">
                          <input
                            type="text"
                            required
                            value={formData.budgetAmount}
                            onChange={(e) => handleInputChange('budgetAmount', e.target.value)}
                            placeholder="e.g., GHS 500"
                            className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent-green focus:border-transparent"
                          />
                        </div>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleInputChange('budgetType', 'hourly')}
                      className={`p-4 border rounded-lg text-left transition-all ${
                        formData.budgetType === 'hourly'
                          ? 'border-accent-green bg-accent-green/10'
                          : 'border-border hover:border-text-light'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          formData.budgetType === 'hourly'
                            ? 'border-accent-green bg-accent-green'
                            : 'border-border'
                        }`}>
                          {formData.budgetType === 'hourly' && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <span className="font-medium">Hourly Rate</span>
                          <p className="text-xs text-text-light">Pay per hour worked</p>
                        </div>
                      </div>
                      {formData.budgetType === 'hourly' && (
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <input
                            type="text"
                            required
                            value={formData.budgetMin}
                            onChange={(e) => handleInputChange('budgetMin', e.target.value)}
                            placeholder="Min (GHS)"
                            className="px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent-green focus:border-transparent"
                          />
                          <input
                            type="text"
                            required
                            value={formData.budgetMax}
                            onChange={(e) => handleInputChange('budgetMax', e.target.value)}
                            placeholder="Max (GHS)"
                            className="px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent-green focus:border-transparent"
                          />
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Required Skills */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-4">
                    Required Skills *
                  </label>
                  <div className="mb-4">
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        value={formData.newSkill}
                        onChange={(e) => handleInputChange('newSkill', e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                        placeholder="Add a skill (e.g., React, Figma, Python)"
                        className="flex-1 px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent-green focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={handleAddSkill}
                        className="bg-accent-green text-text-primary px-4 py-2 rounded-lg font-medium hover:bg-accent-green-dark transition-colors flex items-center gap-2"
                      >
                        <Plus size={16} />
                        Add
                      </button>
                    </div>
                    
                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2">
                      {formData.skillsRequired.map(skill => (
                        <div
                          key={skill}
                          className="flex items-center gap-2 bg-accent-green/20 text-text-primary px-3 py-1.5 rounded-full group"
                        >
                          <span className="text-sm font-medium">{skill}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="text-text-primary hover:text-red-500 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Popular Skills */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-text-primary mb-3">Popular Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'JavaScript', 'Python', 'UI/UX', 'Figma', 'Node.js', 'TypeScript', 'Next.js', 'AWS', 'Docker'].map(skill => (
                        <button
                          type="button"
                          key={skill}
                          onClick={() => {
                            if (!formData.skillsRequired.includes(skill)) {
                              handleInputChange('skillsRequired', [...formData.skillsRequired, skill]);
                            }
                          }}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            formData.skillsRequired.includes(skill)
                              ? 'bg-accent-green text-text-primary'
                              : 'bg-white text-text-secondary hover:text-text-primary hover:border-gray-300 border'
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Budget Tips */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <h4 className="text-sm font-semibold text-blue-800 mb-2">💡 Budget Tips</h4>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Fixed price projects get 3x more proposals on average</li>
                    <li>• Include a 10-20% buffer for unexpected changes</li>
                    <li>• Clear budget ranges attract more qualified freelancers</li>
                    <li>• Competitive pricing leads to better quality proposals</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review & Post */}
          {step === 3 && (
            <div className="bg-white rounded-xl p-6 md:p-8 border border-border-light shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="text-purple-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-text-primary">Review & Post</h2>
                  <p className="text-sm text-text-light">Review your job listing and post it</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Job Preview */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-text-primary">Job Preview</h3>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-sm text-accent-green font-medium hover:text-accent-green-dark"
                    >
                      Edit Job
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-text-primary text-lg mb-2">{formData.jobTitle || 'Your Job Title'}</h4>
                      <p className="text-text-secondary text-sm whitespace-pre-line">
                        {formData.jobDescription || 'No description provided'}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white p-3 rounded-lg border border-border">
                        <div className="flex items-center gap-2 mb-1">
                          <Tag size={14} className="text-text-secondary" />
                          <span className="text-xs text-text-light">Type</span>
                        </div>
                        <div className="text-sm font-medium text-text-primary">{formData.jobType}</div>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-border">
                        <div className="flex items-center gap-2 mb-1">
                          <Briefcase size={14} className="text-text-secondary" />
                          <span className="text-xs text-text-light">Experience</span>
                        </div>
                        <div className="text-sm font-medium text-text-primary">{formData.experienceLevel}</div>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-border">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock size={14} className="text-text-secondary" />
                          <span className="text-xs text-text-light">Duration</span>
                        </div>
                        <div className="text-sm font-medium text-text-primary">{formData.duration}</div>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-border">
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign size={14} className="text-text-secondary" />
                          <span className="text-xs text-text-light">Budget</span>
                        </div>
                        <div className="text-sm font-medium text-text-primary">
                          {formData.budgetType === 'fixed' 
                            ? `GHS ${formData.budgetAmount}`
                            : `GHS ${formData.budgetMin} - ${formData.budgetMax}/hr`
                          }
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <h5 className="text-sm font-medium text-text-primary mb-2">Required Skills</h5>
                      <div className="flex flex-wrap gap-2">
                        {formData.skillsRequired.map(skill => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-accent-green/20 text-text-primary text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attachments */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-3">
                    Attachments (Optional)
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="attachments"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor="attachments" className="cursor-pointer">
                      <Upload className="mx-auto mb-3 text-text-secondary" size={32} />
                      <div className="text-sm font-medium text-text-primary mb-1">
                        Drop files here or click to upload
                      </div>
                      <div className="text-xs text-text-light">
                        Upload project briefs, designs, or reference files (Max 10MB each)
                      </div>
                    </label>
                  </div>
                  
                  {/* Uploaded Files */}
                  {formData.attachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText size={16} className="text-text-secondary" />
                            <div>
                              <div className="text-sm font-medium text-text-primary">{file.name}</div>
                              <div className="text-xs text-text-light">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="text-text-light hover:text-red-500"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Posting Options */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-text-primary mb-4">Posting Options</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-text-primary">Featured Listing</div>
                        <div className="text-sm text-text-light">Highlight your job for 7 days</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-text-primary font-medium">GHS 20</span>
                        <button
                          type="button"
                          onClick={() => handleInputChange('featuredListing', !formData.featuredListing)}
                          className={`w-12 h-6 rounded-full relative transition-all ${
                            formData.featuredListing ? 'bg-accent-green' : 'bg-gray-300'
                          }`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                            formData.featuredListing ? 'left-7' : 'left-1'
                          }`} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-text-primary">Auto-Accept Proposals</div>
                        <div className="text-sm text-text-light">Automatically accept proposals from top-rated freelancers</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleInputChange('autoAccept', !formData.autoAccept)}
                        className={`w-12 h-6 rounded-full relative transition-all ${
                          formData.autoAccept ? 'bg-accent-green' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                          formData.autoAccept ? 'left-7' : 'left-1'
                        }`} />
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Visibility
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => handleInputChange('visibility', 'public')}
                          className={`p-4 border rounded-lg text-left transition-all ${
                            formData.visibility === 'public'
                              ? 'border-accent-green bg-accent-green/10'
                              : 'border-border hover:border-text-light'
                          }`}
                        >
                          <div className="font-medium mb-1">Public</div>
                          <div className="text-xs text-text-light">Visible to all freelancers</div>
                          <div className="text-sm font-medium text-accent-green mt-2">Free</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleInputChange('visibility', 'premium')}
                          className={`p-4 border rounded-lg text-left transition-all ${
                            formData.visibility === 'premium'
                              ? 'border-accent-green bg-accent-green/10'
                              : 'border-border hover:border-text-light'
                          }`}
                        >
                          <div className="font-medium mb-1">Premium</div>
                          <div className="text-xs text-text-light">Show to top-rated freelancers first</div>
                          <div className="text-sm font-medium text-accent-green mt-2">GHS 50</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleInputChange('visibility', 'invite')}
                          className={`p-4 border rounded-lg text-left transition-all ${
                            formData.visibility === 'invite'
                              ? 'border-accent-green bg-accent-green/10'
                              : 'border-border hover:border-text-light'
                          }`}
                        >
                          <div className="font-medium mb-1">Invite Only</div>
                          <div className="text-xs text-text-light">Only visible to freelancers you invite</div>
                          <div className="text-sm font-medium text-accent-green mt-2">Free</div>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Total Cost */}
                  <div className="mt-6 pt-6 border-t border-border-light">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold text-text-primary">Total Cost</div>
                        <div className="text-sm text-text-light">One-time payment</div>
                      </div>
                      <div className="text-2xl font-bold text-text-primary">{getTotalCost()}</div>
                    </div>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                  <div className="flex items-start gap-3">
                    <div className="text-yellow-600 mt-0.5">⚠️</div>
                    <div>
                      <div className="text-sm font-medium text-yellow-800 mb-1">Important Information</div>
                      <div className="text-xs text-yellow-700">
                        By posting this job, you agree to our Terms of Service and acknowledge that:
                        1) You'll respond to proposals within 48 hours
                        2) You'll release payments promptly upon job completion
                        3) ProjectX takes a 10% service fee from freelancer payments
                        4) All communication should stay on the platform
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg text-text-primary hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
              )}
            </div>
            
            <div className="flex gap-4">
              {step < 3 && (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="flex items-center gap-2 px-6 py-3 bg-accent-green text-text-primary rounded-lg font-semibold hover:bg-accent-green-dark transition-colors"
                >
                  Continue
                  <ArrowRight size={16} />
                </button>
              )}
              
              {step === 3 && (
                <button
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3 bg-accent-green text-text-primary rounded-lg font-semibold hover:bg-accent-green-dark transition-colors shadow-md hover:shadow-lg"
                >
                  <CheckCircle size={18} />
                  Post Job Now - {getTotalCost()}
                </button>
              )}
              
              {step < 3 && (
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 border border-border text-text-secondary rounded-lg hover:bg-gray-50 transition-colors hidden md:block"
                >
                  Skip to Review
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Help Section */}
        <div className="mt-12 bg-white rounded-xl p-6 border border-border-light">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="text-blue-600" size={24} />
              </div>
              <h4 className="font-semibold mb-2">Write Clear Requirements</h4>
              <p className="text-sm text-text-secondary">
                Clear job descriptions get 3x more qualified proposals
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <h4 className="font-semibold mb-2">Set Realistic Budget</h4>
              <p className="text-sm text-text-secondary">
                Competitive budgets attract top talent and better quality work
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="text-purple-600" size={24} />
              </div>
              <h4 className="font-semibold mb-2">Review Portfolios</h4>
              <p className="text-sm text-text-secondary">
                Check freelancer portfolios and reviews before making a decision
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJobPage;