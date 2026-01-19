// pages/ProfilePage.tsx - UPDATED VERSION
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Camera, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Briefcase, 
  Award, 
  Edit,
  Check,
  X,
  Upload,
  Save,
  Trash2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { theme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get user's initials for fallback avatar
  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Profile state
  const [profileImage, setProfileImage] = useState<string | undefined>(
    user?.profileImage
  );
  const [isEditing, setIsEditing] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState(false);

  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+233 00 000 0000',
    location: user?.location || 'Accra, Ghana',
    website: user?.website || 'yourwebsite.com',
    title: user?.title || (user?.role === 'client' ? 'Project Manager' : 'Full Stack Developer'),
    bio: user?.bio || 'Passionate about creating amazing digital experiences. Open to new opportunities and collaborations.',
    skills: user?.skills || (user?.role === 'client' ? ['Project Management', 'Team Leadership', 'Agile'] : ['React', 'Node.js', 'TypeScript', 'UI/UX Design']),
  });

  // Handle profile image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        if (user) {
          updateUser({ 
            ...user, 
            profileImage: base64String,
            avatarInitials: getUserInitials()
          });
          alert('Profile picture updated successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle delete profile image
  const handleDeleteImage = () => {
    if (window.confirm('Are you sure you want to remove your profile picture?')) {
      setProfileImage(undefined);
      if (user) {
        updateUser({ 
          ...user, 
          profileImage: undefined,
          avatarInitials: getUserInitials()
        });
        alert('Profile picture removed successfully!');
      }
    }
  };

  // Handle form changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add skill
  const [newSkill, setNewSkill] = useState('');
  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  // Remove skill
  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  // Save profile
  const handleSaveProfile = () => {
    if (user) {
      updateUser({
        ...user,
        ...formData,
        profileImage,
        avatarInitials: getUserInitials()
      });
      setShowSavePopup(true);
    }
    setIsEditing(false);
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Get avatar display
  const getAvatarDisplay = () => {
    if (profileImage) {
      return <img src={profileImage} alt={user?.name || 'User'} className="w-full h-full object-cover" />;
    } else {
      return (
        <div className={`w-full h-full flex items-center justify-center text-2xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {getUserInitials()}
        </div>
      );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-dark-gradient' : 'bg-gray-50'
    }`}>
      {/* Improved Back Navigation - Better positioned */}
      <div className={`sticky top-0 z-40 ${
        theme === 'dark' ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm'
      } border-b ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(-1)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft size={20} />
              <span className="font-medium hidden sm:inline">Back</span>
            </button>
            
            <h1 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Profile
            </h1>
            
            <div className="w-10"> {/* Spacer for alignment */} </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className={`rounded-2xl shadow-lg mb-8 overflow-hidden ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        }`}>
          <div className={`h-32 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-50 to-purple-50'
          }`}></div>
          
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 -mt-16">
              {/* Profile Picture with Upload and Delete Options */}
              <div className="relative group">
                <div className={`w-32 h-32 rounded-full overflow-hidden border-4 shadow-lg ${
                  profileImage 
                    ? 'border-white' 
                    : theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                } ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  {getAvatarDisplay()}
                </div>
                
                {/* Upload Button */}
                <button
                  onClick={triggerFileInput}
                  className="absolute -bottom-9 right-3 w-10 h-10 bg-accent-green rounded-full flex items-center justify-center text-gray-900 shadow-lg hover:bg-green-400 transition-colors duration-200 z-10"
                  title="Upload photo"
                >
                  <Camera size={20} />
                </button>
                
                {/* Delete Button - Only show if there's an image */}
                {profileImage && (
                  <button
                    onClick={handleDeleteImage}
                    className="absolute -bottom-9 left-3 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-600 transition-colors duration-200 z-10"
                    title="Delete photo"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                
                {/* Upload Overlay */}
                <div className={`absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                  theme === 'dark' ? 'border-4 border-gray-900' : 'border-4 border-white'
                }`}>
                  <div className="flex flex-col items-center gap-1">
                    <Upload size={24} className="text-white" />
                    <span className="text-white text-xs font-medium">Change Photo</span>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className={`text-2xl sm:text-3xl font-bold mb-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            theme === 'dark'
                              ? 'bg-gray-800 border-gray-700 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder="Enter your name"
                        />
                      ) : (
                        formData.name
                      )}
                    </h1>
                    <div className="flex items-center gap-2 mb-3">
                      {isEditing ? (
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-1 rounded-lg border text-sm ${
                            theme === 'dark'
                              ? 'bg-gray-800 border-gray-700 text-gray-300'
                              : 'bg-white border-gray-300 text-gray-600'
                          }`}
                          placeholder="Enter your title"
                        />
                      ) : (
                        <>
                          <Briefcase size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                          <span className={`text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {formData.title}
                          </span>
                        </>
                      )}
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        theme === 'dark'
                          ? 'bg-blue-900/30 text-blue-300'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {user?.role === 'client' ? 'Client' : 'Freelancer'}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        theme === 'dark'
                          ? 'bg-green-900/30 text-green-300'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        Verified
                      </span>
                    </div>
                  </div>

                  {/* Edit/Save Button */}
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSaveProfile}
                          className="flex items-center gap-2 px-4 py-2 bg-accent-green text-gray-900 rounded-lg font-medium hover:bg-green-400 transition-colors duration-200"
                        >
                          <Save size={18} />
                          <span className="hidden sm:inline">Save</span>
                        </button>
                        <button
                          onClick={() => {
                            // Reset form data if canceling
                            setFormData({
                              name: user?.name || '',
                              email: user?.email || '',
                              phone: user?.phone || '+233 00 000 0000',
                              location: user?.location || 'Accra, Ghana',
                              website: user?.website || 'yourwebsite.com',
                              title: user?.title || (user?.role === 'client' ? 'Project Manager' : 'Full Stack Developer'),
                              bio: user?.bio || 'Passionate about creating amazing digital experiences. Open to new opportunities and collaborations.',
                              skills: user?.skills || (user?.role === 'client' ? ['Project Management', 'Team Leadership', 'Agile'] : ['React', 'Node.js', 'TypeScript', 'UI/UX Design']),
                            });
                            setProfileImage(user?.profileImage);
                            setIsEditing(false);
                          }}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium border transition-colors duration-200 ${
                            theme === 'dark'
                              ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                              : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <X size={18} />
                          <span className="hidden sm:inline">Cancel</span>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium border transition-colors duration-200 ${
                          theme === 'dark'
                            ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                            : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Edit size={18} />
                        <span className="hidden sm:inline">Edit Profile</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <div className={`mt-4 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p>{formData.bio}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Skills Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className={`rounded-2xl shadow-lg p-6 ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <User size={20} />
              Contact Information
            </h2>
            
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <Mail size={18} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                </div>
                <div className="flex-1">
                  <div className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Email
                  </div>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-1 rounded border ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="your@email.com"
                    />
                  ) : (
                    <div className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {formData.email}
                    </div>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <Phone size={18} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                </div>
                <div className="flex-1">
                  <div className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Phone
                  </div>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-1 rounded border ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="+233 00 000 0000"
                    />
                  ) : (
                    <div className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {formData.phone}
                    </div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <MapPin size={18} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                </div>
                <div className="flex-1">
                  <div className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Location
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-1 rounded border ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="City, Country"
                    />
                  ) : (
                    <div className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {formData.location}
                    </div>
                  )}
                </div>
              </div>

              {/* Website */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <Globe size={18} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                </div>
                <div className="flex-1">
                  <div className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Website
                  </div>
                  {isEditing ? (
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-1 rounded border ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="yourwebsite.com"
                    />
                  ) : (
                    <a 
                      href={`https://${formData.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`font-medium hover:underline ${
                        theme === 'dark' ? 'text-accent-green' : 'text-blue-600'
                      }`}
                    >
                      {formData.website}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Skills & Expertise */}
          <div className={`rounded-2xl shadow-lg p-6 ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <Award size={20} />
              {user?.role === 'client' ? 'Areas of Expertise' : 'Skills & Expertise'}
            </h2>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {formData.skills.map((skill, index) => (
                <div
                  key={index}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-2 ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-gray-200'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <span>{skill}</span>
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Remove skill"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                  placeholder="Add a new skill"
                  className={`flex-1 px-3 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
                <button
                  onClick={handleAddSkill}
                  disabled={!newSkill.trim()}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    newSkill.trim()
                      ? 'bg-accent-green text-gray-900 hover:bg-green-400'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Check size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-8 rounded-2xl shadow-lg p-6 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        }`}>
          <h2 className={`text-xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Statistics
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`text-center p-4 rounded-xl ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <div className={`text-2xl font-bold mb-1 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {user?.role === 'client' ? '12' : '24'}
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {user?.role === 'client' ? 'Jobs Posted' : 'Projects Completed'}
              </div>
            </div>
            
            <div className={`text-center p-4 rounded-xl ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <div className={`text-2xl font-bold mb-1 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                4.9
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Average Rating
              </div>
            </div>
            
            <div className={`text-center p-4 rounded-xl ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <div className={`text-2xl font-bold mb-1 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {user?.role === 'client' ? '95%' : '98%'}
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Success Rate
              </div>
            </div>
            
            <div className={`text-center p-4 rounded-xl ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <div className={`text-2xl font-bold mb-1 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {user?.role === 'client' ? '6' : '3'}
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {user?.role === 'client' ? 'Active Hires' : 'Active Projects'}
              </div>
              {showSavePopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div
      className={`w-full max-w-sm rounded-xl p-6 shadow-lg ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <h3 className="text-lg font-semibold mb-2">Profile Updated</h3>
      <p className="text-sm mb-4">
        Your profile has been updated successfully.
      </p>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowSavePopup(false)}
          className="px-4 py-2 rounded-lg bg-accent-green text-gray-900 font-medium hover:bg-green-400 transition"
        >
          OK
        </button>
      </div>
    </div>
  </div>
)}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;