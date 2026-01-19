// pages/SettingsPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  User,
  Bell,
  Shield,
  Lock,
  Globe,
  Eye,
  EyeOff,
  Save,
  X,
  Check,
  Mail,
  Smartphone,
  Database,
  Trash2,
  Download,
  Clock,
  LogOut,
  Moon,
  Sun,
  Palette,
  Languages,
  AlertCircle,
  Key
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // Active tab state
  const [activeTab, setActiveTab] = useState('account');
  
  // Account Settings
  const [accountData, setAccountData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    language: 'English',
    timezone: 'GMT',
  });

  // Security Settings
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: 30,
  });

  // Privacy Settings
  const [privacyData, setPrivacyData] = useState({
    profileVisibility: 'public',
    showOnlineStatus: true,
    allowMessages: 'everyone',
    dataSharing: true,
    emailNotifications: true,
    pushNotifications: true,
  });

  // Notification Settings
  const [notificationData, setNotificationData] = useState({
    jobAlerts: true,
    proposalUpdates: true,
    paymentNotifications: true,
    systemMessages: true,
    newsletter: false,
    marketingEmails: false,
  });

  // Theme Settings
  const [themeData, setThemeData] = useState({
    theme: theme,
    fontSize: 'medium',
    reduceMotion: false,
    highContrast: false,
  });

  // Activity Logs
  const [activityLogs, setActivityLogs] = useState([
    { id: 1, action: 'Login', device: 'Chrome on Windows', location: 'Accra, Ghana', time: '2 hours ago', ip: '192.168.1.1' },
    { id: 2, action: 'Password changed', device: 'Chrome on Windows', location: 'Accra, Ghana', time: '1 day ago', ip: '192.168.1.1' },
    { id: 3, action: 'Profile updated', device: 'Safari on iPhone', location: 'Kumasi, Ghana', time: '3 days ago', ip: '192.168.1.2' },
    { id: 4, action: 'Payment method added', device: 'Chrome on Windows', location: 'Accra, Ghana', time: '1 week ago', ip: '192.168.1.1' },
    { id: 5, action: 'Job posted', device: 'Chrome on Windows', location: 'Accra, Ghana', time: '2 weeks ago', ip: '192.168.1.1' },
  ]);

  // Show password states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Save states
  const [hasChanges, setHasChanges] = useState({
    account: false,
    security: false,
    privacy: false,
    notifications: false,
    theme: false,
  });

  // Check for changes
  useEffect(() => {
    const accountChanged = 
      accountData.name !== user?.name ||
      accountData.email !== user?.email ||
      accountData.phone !== user?.phone;
    
    setHasChanges(prev => ({ ...prev, account: accountChanged }));
  }, [accountData, user]);

  useEffect(() => {
    setHasChanges(prev => ({ ...prev, theme: themeData.theme !== theme }));
  }, [themeData.theme, theme]);

  // Handle account changes
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAccountData(prev => ({ ...prev, [name]: value }));
  };

  // Handle security changes
  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setSecurityData(prev => ({ ...prev, [name]: checked }));
    } else {
      setSecurityData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle privacy changes
  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setPrivacyData(prev => ({ ...prev, [name]: checked }));
    } else {
      setPrivacyData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle notification changes
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationData(prev => ({ ...prev, [name]: checked }));
  };

  // Handle theme changes
  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setThemeData(prev => ({ ...prev, [name]: checked }));
    } else {
      setThemeData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Save account settings
  const saveAccountSettings = () => {
    if (user) {
      updateUser({
        ...user,
        name: accountData.name,
        email: accountData.email,
        phone: accountData.phone,
      });
      alert('Account settings saved successfully!');
      setHasChanges(prev => ({ ...prev, account: false }));
    }
  };

  // Save security settings
  const saveSecuritySettings = () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    if (securityData.newPassword && securityData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    
    alert('Security settings saved successfully!');
    setSecurityData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
    setHasChanges(prev => ({ ...prev, security: false }));
  };

  // Save privacy settings
  const savePrivacySettings = () => {
    alert('Privacy settings saved successfully!');
    setHasChanges(prev => ({ ...prev, privacy: false }));
  };

  // Save notification settings
  const saveNotificationSettings = () => {
    alert('Notification settings saved successfully!');
    setHasChanges(prev => ({ ...prev, notifications: false }));
  };

  // Save theme settings
  const saveThemeSettings = () => {
    if (themeData.theme !== theme) {
      toggleTheme();
    }
    alert('Theme settings saved successfully!');
    setHasChanges(prev => ({ ...prev, theme: false }));
  };

  // Handle logout all devices
  const handleLogoutAllDevices = () => {
    if (window.confirm('Are you sure you want to log out of all devices? You will need to log in again on this device.')) {
      logout();
      navigate('/login');
    }
  };

  // Handle delete account
  const handleDeleteAccount = () => {
    const confirmText = "DELETE";
    const userInput = prompt(`Are you absolutely sure? This action cannot be undone. Type "${confirmText}" to confirm.`);
    
    if (userInput === confirmText) {
      alert('Account deletion scheduled. You will receive a confirmation email.');
      logout();
      navigate('/');
    } else if (userInput !== null) {
      alert('Account deletion cancelled.');
    }
  };

  // Handle export data
  const handleExportData = () => {
    const data = {
      user: user,
      settings: {
        account: accountData,
        privacy: privacyData,
        notifications: notificationData,
        theme: themeData,
      },
      activityLogs: activityLogs,
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `projectx-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('Data exported successfully!');
  };

  // Tabs configuration
  const tabs = [
    { id: 'account', label: 'Account', icon: <User size={18} /> },
    { id: 'security', label: 'Security', icon: <Lock size={18} /> },
    { id: 'privacy', label: 'Privacy', icon: <Shield size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'theme', label: 'Theme & Display', icon: <Palette size={18} /> },
    { id: 'activity', label: 'Activity Log', icon: <Clock size={18} /> },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-dark-gradient' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`sticky top-0 z-40 ${
        theme === 'dark' ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm'
      } border-b ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Settings
            </h1>
            
            <div className="w-10">{/* Spacer */}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className={`rounded-2xl shadow-lg overflow-hidden sticky top-24 ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            }`}>
              <nav className="p-4">
                <div className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? theme === 'dark'
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-100 text-gray-900'
                          : theme === 'dark'
                            ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                      {hasChanges[tab.id as keyof typeof hasChanges] && (
                        <span className="ml-auto w-2 h-2 bg-accent-green rounded-full animate-pulse"></span>
                      )}
                    </button>
                  ))}
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Account Settings */}
            {activeTab === 'account' && (
              <div className={`rounded-2xl shadow-lg overflow-hidden ${
                theme === 'dark' ? 'bg-gray-900' : 'bg-white'
              }`}>
                <div className={`px-6 py-5 border-b ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <h2 className={`text-xl font-bold flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <User size={20} />
                    Account Settings
                  </h2>
                  <p className={`text-sm mt-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Manage your account information and preferences
                  </p>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className={`text-lg font-semibold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Basic Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={accountData.name}
                          onChange={handleAccountChange}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            theme === 'dark'
                              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                          }`}
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={accountData.email}
                          onChange={handleAccountChange}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            theme === 'dark'
                              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                          }`}
                          placeholder="john@example.com"
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={accountData.phone}
                          onChange={handleAccountChange}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            theme === 'dark'
                              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                          }`}
                          placeholder="+233 00 000 0000"
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Account Type
                        </label>
                        <div className={`px-3 py-2 rounded-lg border ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-gray-400'
                            : 'bg-gray-100 border-gray-300 text-gray-600'
                        }`}>
                          {user?.role === 'client' ? 'Client' : 'Freelancer'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div>
                    <h3 className={`text-lg font-semibold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Preferences
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Language
                        </label>
                        <select
                          name="language"
                          value={accountData.language}
                          onChange={handleAccountChange}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            theme === 'dark'
                              ? 'bg-gray-800 border-gray-700 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="German">German</option>
                          <option value="Japanese">Japanese</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Time Zone
                        </label>
                        <select
                          name="timezone"
                          value={accountData.timezone}
                          onChange={handleAccountChange}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            theme === 'dark'
                              ? 'bg-gray-800 border-gray-700 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value="GMT">GMT (UTC+0)</option>
                          <option value="EST">EST (UTC-5)</option>
                          <option value="PST">PST (UTC-8)</option>
                          <option value="CET">CET (UTC+1)</option>
                          <option value="JST">JST (UTC+9)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={saveAccountSettings}
                      disabled={!hasChanges.account}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                        hasChanges.account
                          ? 'bg-accent-green text-gray-900 hover:bg-green-400'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Save size={18} />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className={`rounded-2xl shadow-lg overflow-hidden ${
                theme === 'dark' ? 'bg-gray-900' : 'bg-white'
              }`}>
                <div className={`px-6 py-5 border-b ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <h2 className={`text-xl font-bold flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <Lock size={20} />
                    Security Settings
                  </h2>
                  <p className={`text-sm mt-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Manage your password and security preferences
                  </p>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Change Password */}
                  <div>
                    <h3 className={`text-lg font-semibold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Change Password
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            name="currentPassword"
                            value={securityData.currentPassword}
                            onChange={handleSecurityChange}
                            className={`w-full px-3 py-2 rounded-lg border pr-10 ${
                              theme === 'dark'
                                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                            }`}
                            placeholder="Enter current password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          >
                            {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            name="newPassword"
                            value={securityData.newPassword}
                            onChange={handleSecurityChange}
                            className={`w-full px-3 py-2 rounded-lg border pr-10 ${
                              theme === 'dark'
                                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                            }`}
                            placeholder="Enter new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          >
                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <p className={`text-xs mt-1 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          Password must be at least 8 characters long
                        </p>
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={securityData.confirmPassword}
                            onChange={handleSecurityChange}
                            className={`w-full px-3 py-2 rounded-lg border pr-10 ${
                              theme === 'dark'
                                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                            }`}
                            placeholder="Confirm new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Features */}
                  <div>
                    <h3 className={`text-lg font-semibold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Security Features
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`font-medium ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            Two-Factor Authentication
                          </div>
                          <div className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Add an extra layer of security to your account
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="twoFactorEnabled"
                            checked={securityData.twoFactorEnabled}
                            onChange={handleSecurityChange}
                            className="sr-only peer"
                          />
                          <div className={`w-11 h-6 rounded-full peer ${
                            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                          } peer-checked:bg-accent-green peer-focus:ring-4 peer-focus:ring-green-300`}>
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              securityData.twoFactorEnabled ? 'translate-x-5' : ''
                            }`} />
                          </div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`font-medium ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            Login Alerts
                          </div>
                          <div className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Get notified about new sign-ins
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="loginAlerts"
                            checked={securityData.loginAlerts}
                            onChange={handleSecurityChange}
                            className="sr-only peer"
                          />
                          <div className={`w-11 h-6 rounded-full peer ${
                            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                          } peer-checked:bg-accent-green peer-focus:ring-4 peer-focus:ring-green-300`}>
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              securityData.loginAlerts ? 'translate-x-5' : ''
                            }`} />
                          </div>
                        </label>
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Session Timeout (minutes)
                        </label>
                        <select
                          name="sessionTimeout"
                          value={securityData.sessionTimeout}
                          onChange={handleSecurityChange}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            theme === 'dark'
                              ? 'bg-gray-800 border-gray-700 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value={15}>15 minutes</option>
                          <option value={30}>30 minutes</option>
                          <option value={60}>1 hour</option>
                          <option value={120}>2 hours</option>
                          <option value={0}>Never (not recommended)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={saveSecuritySettings}
                      disabled={!securityData.newPassword && !securityData.confirmPassword}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                        securityData.newPassword || securityData.confirmPassword
                          ? 'bg-accent-green text-gray-900 hover:bg-green-400'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Save size={18} />
                      Update Security Settings
                    </button>
                  </div>

                  {/* Danger Zone */}
                  <div className={`pt-6 mt-6 border-t ${
                    theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <h3 className={`text-lg font-semibold mb-4 text-red-500`}>
                      <AlertCircle size={20} className="inline mr-2" />
                      Danger Zone
                    </h3>
                    
                    <div className="space-y-3">
                      <button
                        onClick={handleLogoutAllDevices}
                        className="w-full flex items-center justify-between p-4 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <LogOut size={18} />
                          <span className="font-medium">Log Out of All Devices</span>
                        </div>
                        <span className="text-sm">Sign out from all active sessions</span>
                      </button>
                      
                      <button
                        onClick={handleExportData}
                        className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Download size={18} />
                          <span className="font-medium">Export Account Data</span>
                        </div>
                        <span className="text-sm">Download all your data</span>
                      </button>
                      
                      <button
                        onClick={handleDeleteAccount}
                        className="w-full flex items-center justify-between p-4 rounded-lg border border-red-500 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Trash2 size={18} />
                          <span className="font-medium">Delete Account</span>
                        </div>
                        <span className="text-sm">Permanently delete your account</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div className={`rounded-2xl shadow-lg overflow-hidden ${
                theme === 'dark' ? 'bg-gray-900' : 'bg-white'
              }`}>
                <div className={`px-6 py-5 border-b ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <h2 className={`text-xl font-bold flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <Shield size={20} />
                    Privacy Settings
                  </h2>
                  <p className={`text-sm mt-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Control your privacy and data sharing preferences
                  </p>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Profile Privacy */}
                  <div>
                    <h3 className={`text-lg font-semibold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Profile Privacy
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Profile Visibility
                        </label>
                        <select
                          name="profileVisibility"
                          value={privacyData.profileVisibility}
                          onChange={handlePrivacyChange}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            theme === 'dark'
                              ? 'bg-gray-800 border-gray-700 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value="public">Public - Anyone can view</option>
                          <option value="registered">Registered users only</option>
                          <option value="private">Private - Only you can view</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`font-medium ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            Show Online Status
                          </div>
                          <div className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Let others see when you're online
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="showOnlineStatus"
                            checked={privacyData.showOnlineStatus}
                            onChange={handlePrivacyChange}
                            className="sr-only peer"
                          />
                          <div className={`w-11 h-6 rounded-full peer ${
                            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                          } peer-checked:bg-accent-green peer-focus:ring-4 peer-focus:ring-green-300`}>
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              privacyData.showOnlineStatus ? 'translate-x-5' : ''
                            }`} />
                          </div>
                        </label>
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Allow Messages From
                        </label>
                        <select
                          name="allowMessages"
                          value={privacyData.allowMessages}
                          onChange={handlePrivacyChange}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            theme === 'dark'
                              ? 'bg-gray-800 border-gray-700 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value="everyone">Everyone</option>
                          <option value="contacts">Contacts only</option>
                          <option value="none">No one</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Data & Sharing */}
                  <div>
                    <h3 className={`text-lg font-semibold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Data & Sharing
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`font-medium ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            Share Usage Data
                          </div>
                          <div className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Help us improve by sharing anonymous usage data
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="dataSharing"
                            checked={privacyData.dataSharing}
                            onChange={handlePrivacyChange}
                            className="sr-only peer"
                          />
                          <div className={`w-11 h-6 rounded-full peer ${
                            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                          } peer-checked:bg-accent-green peer-focus:ring-4 peer-focus:ring-green-300`}>
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              privacyData.dataSharing ? 'translate-x-5' : ''
                            }`} />
                          </div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`font-medium ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            Email Notifications
                          </div>
                          <div className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Receive important updates via email
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="emailNotifications"
                            checked={privacyData.emailNotifications}
                            onChange={handlePrivacyChange}
                            className="sr-only peer"
                          />
                          <div className={`w-11 h-6 rounded-full peer ${
                            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                          } peer-checked:bg-accent-green peer-focus:ring-4 peer-focus:ring-green-300`}>
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              privacyData.emailNotifications ? 'translate-x-5' : ''
                            }`} />
                          </div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`font-medium ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            Push Notifications
                          </div>
                          <div className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Receive notifications on your device
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="pushNotifications"
                            checked={privacyData.pushNotifications}
                            onChange={handlePrivacyChange}
                            className="sr-only peer"
                          />
                          <div className={`w-11 h-6 rounded-full peer ${
                            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                          } peer-checked:bg-accent-green peer-focus:ring-4 peer-focus:ring-green-300`}>
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              privacyData.pushNotifications ? 'translate-x-5' : ''
                            }`} />
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={savePrivacySettings}
                      className="flex items-center gap-2 px-4 py-2 bg-accent-green text-gray-900 rounded-lg font-medium hover:bg-green-400 transition-colors duration-200"
                    >
                      <Save size={18} />
                      Save Privacy Settings
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className={`rounded-2xl shadow-lg overflow-hidden ${
                theme === 'dark' ? 'bg-gray-900' : 'bg-white'
              }`}>
                <div className={`px-6 py-5 border-b ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <h2 className={`text-xl font-bold flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <Bell size={20} />
                    Notification Settings
                  </h2>
                  <p className={`text-sm mt-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Customize how and when you receive notifications
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    {/* Job Related */}
                    <div>
                      <h3 className={`text-lg font-semibold mb-4 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        Job Related
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className={`font-medium ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                              Job Alerts
                            </div>
                            <div className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Notify me about new job matches
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="jobAlerts"
                              checked={notificationData.jobAlerts}
                              onChange={handleNotificationChange}
                              className="sr-only peer"
                            />
                            <div className={`w-11 h-6 rounded-full peer ${
                              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                            } peer-checked:bg-accent-green peer-focus:ring-4 peer-focus:ring-green-300`}>
                              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                                notificationData.jobAlerts ? 'translate-x-5' : ''
                              }`} />
                            </div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className={`font-medium ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                              Proposal Updates
                            </div>
                            <div className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Notify me about proposal status changes
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="proposalUpdates"
                              checked={notificationData.proposalUpdates}
                              onChange={handleNotificationChange}
                              className="sr-only peer"
                            />
                            <div className={`w-11 h-6 rounded-full peer ${
                              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                            } peer-checked:bg-accent-green peer-focus:ring-4 peer-focus:ring-green-300`}>
                              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                                notificationData.proposalUpdates ? 'translate-x-5' : ''
                              }`} />
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Financial */}
                    <div>
                      <h3 className={`text-lg font-semibold mb-4 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        Financial
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className={`font-medium ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                              Payment Notifications
                            </div>
                            <div className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Notify me about payments and invoices
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="paymentNotifications"
                              checked={notificationData.paymentNotifications}
                              onChange={handleNotificationChange}
                              className="sr-only peer"
                            />
                            <div className={`w-11 h-6 rounded-full peer ${
                              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                            } peer-checked:bg-accent-green peer-focus:ring-4 peer-focus:ring-green-300`}>
                              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                                notificationData.paymentNotifications ? 'translate-x-5' : ''
                              }`} />
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* System & Marketing */}
                    <div>
                      <h3 className={`text-lg font-semibold mb-4 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        System & Marketing
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className={`font-medium ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                              System Messages
                            </div>
                            <div className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Important updates and announcements
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="systemMessages"
                              checked={notificationData.systemMessages}
                              onChange={handleNotificationChange}
                              className="sr-only peer"
                            />
                            <div className={`w-11 h-6 rounded-full peer ${
                              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                            } peer-checked:bg-accent-green peer-focus:ring-4 peer-focus:ring-green-300`}>
                              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                                notificationData.systemMessages ? 'translate-x-5' : ''
                              }`} />
                            </div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className={`font-medium ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                              Newsletter
                            </div>
                            <div className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Weekly updates and tips
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="newsletter"
                              checked={notificationData.newsletter}
                              onChange={handleNotificationChange}
                              className="sr-only peer"
                            />
                            <div className={`w-11 h-6 rounded-full peer ${
                              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                            } peer-checked:bg-accent-green peer-focus:ring-4 peer-focus:ring-green-300`}>
                              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                                notificationData.newsletter ? 'translate-x-5' : ''
                              }`} />
                            </div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className={`font-medium ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                              Marketing Emails
                            </div>
                            <div className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Promotional offers and updates
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="marketingEmails"
                              checked={notificationData.marketingEmails}
                              onChange={handleNotificationChange}
                              className="sr-only peer"
                            />
                            <div className={`w-11 h-6 rounded-full peer ${
                              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                            } peer-checked:bg-accent-green peer-focus:ring-4 peer-focus:ring-green-300`}>
                              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                                notificationData.marketingEmails ? 'translate-x-5' : ''
                              }`} />
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end pt-6">
                      <button
                        onClick={saveNotificationSettings}
                        className="flex items-center gap-2 px-4 py-2 bg-accent-green text-gray-900 rounded-lg font-medium hover:bg-green-400 transition-colors duration-200"
                      >
                        <Save size={18} />
                        Save Notification Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Theme Settings */}
            {activeTab === 'theme' && (
              <div className={`rounded-2xl shadow-lg overflow-hidden ${
                theme === 'dark' ? 'bg-gray-900' : 'bg-white'
              }`}>
                <div className={`px-6 py-5 border-b ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <h2 className={`text-xl font-bold flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <Palette size={20} />
                    Theme & Display
                  </h2>
                  <p className={`text-sm mt-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Customize your viewing experience
                  </p>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Theme Selection */}
                  <div>
                    <h3 className={`text-lg font-semibold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Theme
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        onClick={() => setThemeData(prev => ({ ...prev, theme: 'light' }))}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                          themeData.theme === 'light'
                            ? theme === 'dark'
                              ? 'border-accent-green bg-green-900/10'
                              : 'border-accent-green bg-green-50'
                            : theme === 'dark'
                              ? 'border-gray-700 hover:border-gray-600'
                              : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="w-full aspect-video rounded-lg bg-gradient-to-br from-gray-100 to-white border border-gray-300 flex items-center justify-center">
                          <Sun size={32} className="text-yellow-500" />
                        </div>
                        <div className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          Light Mode
                        </div>
                        {themeData.theme === 'light' && (
                          <Check className="text-accent-green" size={20} />
                        )}
                      </button>
                      
                      <button
                        onClick={() => setThemeData(prev => ({ ...prev, theme: 'dark' }))}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                          themeData.theme === 'dark'
                            ? theme === 'dark'
                              ? 'border-accent-green bg-green-900/10'
                              : 'border-accent-green bg-green-50'
                            : theme === 'dark'
                              ? 'border-gray-700 hover:border-gray-600'
                              : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="w-full aspect-video rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center">
                          <Moon size={32} className="text-blue-400" />
                        </div>
                        <div className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          Dark Mode
                        </div>
                        {themeData.theme === 'dark' && (
                          <Check className="text-accent-green" size={20} />
                        )}
                      </button>
                      
                      <button
                        onClick={() => setThemeData(prev => ({ ...prev, theme: 'system' }))}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                          themeData.theme === 'system'
                            ? theme === 'dark'
                              ? 'border-accent-green bg-green-900/10'
                              : 'border-accent-green bg-green-50'
                            : theme === 'dark'
                              ? 'border-gray-700 hover:border-gray-600'
                              : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="w-full aspect-video rounded-lg bg-gradient-to-r from-gray-100 to-gray-800 border border-gray-300 flex items-center justify-center">
                          <div className="flex gap-2">
                            <Sun size={20} className="text-yellow-500" />
                            <Moon size={20} className="text-blue-400" />
                          </div>
                        </div>
                        <div className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          System Default
                        </div>
                        {themeData.theme === 'system' && (
                          <Check className="text-accent-green" size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Display Settings */}
                  <div>
                    <h3 className={`text-lg font-semibold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Display Settings
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Font Size
                        </label>
                        <select
                          name="fontSize"
                          value={themeData.fontSize}
                          onChange={handleThemeChange}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            theme === 'dark'
                              ? 'bg-gray-800 border-gray-700 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                          <option value="xlarge">Extra Large</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`font-medium ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            Reduce Motion
                          </div>
                          <div className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Minimize animations and transitions
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="reduceMotion"
                            checked={themeData.reduceMotion}
                            onChange={handleThemeChange}
                            className="sr-only peer"
                          />
                          <div className={`w-11 h-6 rounded-full peer ${
                            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                          } peer-checked:bg-accent-green peer-focus:ring-4 peer-focus:ring-green-300`}>
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              themeData.reduceMotion ? 'translate-x-5' : ''
                            }`} />
                          </div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`font-medium ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            High Contrast Mode
                          </div>
                          <div className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Increase contrast for better visibility
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="highContrast"
                            checked={themeData.highContrast}
                            onChange={handleThemeChange}
                            className="sr-only peer"
                          />
                          <div className={`w-11 h-6 rounded-full peer ${
                            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                          } peer-checked:bg-accent-green peer-focus:ring-4 peer-focus:ring-green-300`}>
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              themeData.highContrast ? 'translate-x-5' : ''
                            }`} />
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={saveThemeSettings}
                      disabled={!hasChanges.theme}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                        hasChanges.theme
                          ? 'bg-accent-green text-gray-900 hover:bg-green-400'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Save size={18} />
                      Save Theme Settings
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Log */}
            {activeTab === 'activity' && (
              <div className={`rounded-2xl shadow-lg overflow-hidden ${
                theme === 'dark' ? 'bg-gray-900' : 'bg-white'
              }`}>
                <div className={`px-6 py-5 border-b ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <h2 className={`text-xl font-bold flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <Clock size={20} />
                    Activity Log
                  </h2>
                  <p className={`text-sm mt-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Recent account activity and security events
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {activityLogs.map((log) => (
                      <div
                        key={log.id}
                        className={`p-4 rounded-xl border ${
                          theme === 'dark'
                            ? 'border-gray-700 bg-gray-800/50'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className={`font-medium ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                              {log.action}
                            </div>
                            <div className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {log.device} • {log.location}
                            </div>
                          </div>
                          <div className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {log.time}
                          </div>
                        </div>
                        <div className={`text-xs ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          IP Address: {log.ip}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {activityLogs.length === 0 && (
                    <div className={`py-12 text-center ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <Clock size={48} className="mx-auto mb-4 opacity-50" />
                      <div className="text-lg font-medium mb-2">No activity yet</div>
                      <div className="text-sm">Your account activity will appear here</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;