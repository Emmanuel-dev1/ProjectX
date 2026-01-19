// components/ProposalModal.tsx
import React, { useState } from 'react';
import { X, Paperclip, DollarSign, Clock, Send, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Job } from '../types';

interface ProposalModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (proposalData: ProposalData) => void;
}

interface ProposalData {
  coverLetter: string;
  bidAmount: number;
  estimatedTime: string;
  attachments: File[];
}

const ProposalModal: React.FC<ProposalModalProps> = ({ job, isOpen, onClose, onSubmit }) => {
  const { user } = useAuth();
  const { theme } = useTheme();
  
  const [coverLetter, setCoverLetter] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      // Limit to 5 files
      if (attachments.length + newFiles.length > 5) {
        setError('Maximum 5 files allowed');
        return;
      }
      
      // Validate file size (max 10MB each)
      const oversizedFiles = newFiles.filter(file => file.size > 10 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        setError('Files must be less than 10MB each');
        return;
      }
      
      setAttachments(prev => [...prev, ...newFiles]);
      setError('');
    }
  };

  const removeFile = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!coverLetter.trim()) {
      setError('Cover letter is required');
      return;
    }

    if (!bidAmount || parseFloat(bidAmount) <= 0) {
      setError('Please enter a valid bid amount');
      return;
    }

    if (!estimatedTime.trim()) {
      setError('Please estimate the project duration');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const proposalData: ProposalData = {
        coverLetter,
        bidAmount: parseFloat(bidAmount),
        estimatedTime,
        attachments
      };

      await onSubmit(proposalData);
      onClose();
    } catch (err) {
      setError('Failed to submit proposal. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className={`relative w-full max-w-2xl rounded-2xl shadow-xl ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        }`}>
          {/* Header */}
          <div className={`px-6 py-4 border-b ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Submit Proposal for "{job.title}"
                </h2>
                <p className={`text-sm mt-1 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {job.company} • {job.location}
                </p>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle size={20} className="text-red-500 mt-0.5" />
                <div className="text-red-700 text-sm">{error}</div>
              </div>
            )}

            {/* Freelancer Info */}
            <div className={`p-4 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-semibold text-white">
                  {user?.avatarInitials || 'F'}
                </div>
                <div>
                  <div className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {user?.name || 'Freelancer'}
                  </div>
                  <div className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {user?.title || 'Freelancer'} • {user?.location || 'Location not set'}
                  </div>
                </div>
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Your profile will be shared with the client when you submit this proposal.
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Cover Letter *
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={6}
                className={`w-full px-3 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
                placeholder="Introduce yourself and explain why you're the right fit for this job. Mention relevant experience and how you plan to approach the project."
              />
              <div className={`text-xs mt-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Minimum 100 characters. Current: {coverLetter.length}
              </div>
            </div>

            {/* Bid Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <div className="flex items-center gap-1">
                    <DollarSign size={16} />
                    Bid Amount ({job.salaryType})
                  </div>
                </label>
                <div className="relative">
                  <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    $
                  </div>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className={`w-full pl-8 pr-3 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className={`text-xs mt-1 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Job budget: {job.salary}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    Estimated Time *
                  </div>
                </label>
                <input
                  type="text"
                  value={estimatedTime}
                  onChange={(e) => setEstimatedTime(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="e.g., 2 weeks, 1 month"
                />
              </div>
            </div>

            {/* Attachments */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <div className="flex items-center gap-1">
                  <Paperclip size={16} />
                  Attachments (Optional)
                </div>
              </label>
              
              {/* File Input */}
              <div className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
                theme === 'dark'
                  ? 'border-gray-700 hover:border-gray-600'
                  : 'border-gray-300 hover:border-gray-400'
              }`}>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className={`flex flex-col items-center gap-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Paperclip size={24} />
                    <div>
                      <span className={`font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Click to upload
                      </span>
                      <div className="text-sm">or drag and drop</div>
                    </div>
                    <div className={`text-xs ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      PDF, DOC, JPG, PNG, ZIP (max 10MB each)
                    </div>
                  </div>
                </label>
              </div>

              {/* File List */}
              {attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-2 rounded ${
                        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Paperclip size={16} className={
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        } />
                        <div>
                          <div className={`text-sm font-medium ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {file.name}
                          </div>
                          <div className={`text-xs ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {formatFileSize(file.size)}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className={`p-1 rounded hover:bg-opacity-20 ${
                          theme === 'dark'
                            ? 'text-gray-400 hover:text-red-400 hover:bg-red-500'
                            : 'text-gray-500 hover:text-red-600 hover:bg-red-100'
                        }`}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Terms */}
            <div className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              By submitting this proposal, you agree to our Terms of Service. Your proposal will be sent directly to the client, and you'll be notified when they respond.
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={onClose}
                className={`px-4 py-2 rounded-lg font-medium border transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || coverLetter.length < 100}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  isSubmitting || coverLetter.length < 100
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-accent-green text-gray-900 hover:bg-green-400'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Proposal
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalModal;