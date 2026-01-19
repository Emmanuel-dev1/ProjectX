// components/Header.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  ChevronDown, 
  LogOut, 
  Settings, 
  User, 
  Globe, 
  HelpCircle, 
  Moon,
  Sun, 
  Check,
  MessageSquare,
  Briefcase,
  CreditCard,
  Search,
  Users,
  Plus,
  X,
  LogIn,
  UserPlus
} from 'lucide-react';
import { Notification } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState('English');
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  // Mock notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: 'New job match', description: 'E-commerce Mobile App Design matches your skills', time: '2 minutes ago', read: false, type: 'job' },
    { id: 2, title: 'Proposal viewed', description: 'Client viewed your proposal for React Dashboard', time: '1 hour ago', read: true, type: 'proposal' },
    { id: 3, title: 'Payment received', description: 'GHS 590 received for completed project', time: '3 hours ago', read: false, type: 'payment' },
    { id: 4, title: 'New message', description: 'ShopEasy Inc. sent you a message', time: '5 hours ago', read: false, type: 'message' },
    { id: 5, title: 'Job expired', description: 'WordPress E-commerce Site listing has expired', time: '1 day ago', read: true, type: 'job' },
  ]);

  // Define navigation links based on authentication and role
  const getNavLinks = () => {
    const baseLinks = [
      { path: '/', label: 'Job Search', icon: <Search size={18} />, mobileIcon: <Search size={20} /> },
    ];

    if (isAuthenticated) {
      if (user?.role === 'freelancer') {
        baseLinks.push(
          { path: '/talent-search', label: 'Talent Search', icon: <Users size={18} />, mobileIcon: <Users size={20} /> }
        );
      }
      if (user?.role === 'client') {
        baseLinks.push(
          { path: '/post-job', label: 'Post a Job', icon: <Plus size={18} />, mobileIcon: <Plus size={20} /> }
        );
      }
    } else {
      // For unauthenticated users, show both but they'll be redirected to login
      baseLinks.push(
        { path: '/login?redirect=/talent-search', label: 'Talent Search', icon: <Users size={18} />, mobileIcon: <Users size={20} /> },
        { path: '/login?redirect=/post-job', label: 'Post a Job', icon: <Plus size={18} />, mobileIcon: <Plus size={20} /> }
      );
    }

    baseLinks.push(
      { path: '/support', label: 'Support', icon: <HelpCircle size={18} />, mobileIcon: <HelpCircle size={20} /> }
    );

    return baseLinks;
  };

  const navLinks = getNavLinks();

  // Calculate unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
        setActiveSubmenu(null);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && 
          !(event.target as Element).closest('.mobile-menu-button')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle notification click
  const handleNotificationClick = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setNotificationsOpen(false);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'job': return <Briefcase size={16} />;
      case 'proposal': return <MessageSquare size={16} />;
      case 'payment': return <CreditCard size={16} />;
      case 'message': return <MessageSquare size={16} />;
      default: return <Bell size={16} />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'job': return '#3B82F6';
      case 'proposal': return '#8B5CF6';
      case 'payment': return '#10B981';
      case 'message': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  // Language options
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ];

  // User menu options - UPDATED: Removed "My Profile" since we have the "View Profile" button
  // In Header.tsx, update the userMenuOptions array:
const userMenuOptions = [
  { icon: <Briefcase size={16} />, label: 'My Jobs', action: () => alert('Opening jobs...') },
  { icon: <CreditCard size={16} />, label: 'Billing & Payments', action: () => navigate('/billing') }, // UPDATED
  { icon: <Settings size={16} />, label: 'Settings', action: () => alert('Opening settings...') },
  { icon: <HelpCircle size={16} />, label: 'Help & Support', action: () => navigate('/support') },
];
  // Handle logout
  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    alert('Logged out successfully!');
    navigate('/');
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Get user display info
  const getUserDisplayInfo = () => {
    if (isAuthenticated && user) {
      return {
        name: user.name,
        role: user.role === 'client' ? 'Client' : 'Freelancer',
        initials: user.name.split(' ').map(n => n[0]).join('').toUpperCase()
      };
    }
    return {
      name: 'Guest User',
      role: 'Not Logged In',
      initials: 'GU'
    };
  };

  const userDisplay = getUserDisplayInfo();

  // Handle profile navigation
  const handleProfileClick = () => {
    navigate('/profile');
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 shadow-header transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-dark-gradient' 
        : 'bg-white border-b border-gray-200'
    }`}>
      <div className="max-w-8xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="w-8 h-8 bg-accent-green rounded-md flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B0B0B" strokeWidth="2">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17" />
              <path d="M2 12L12 17L22 12" />
            </svg>
          </div>
          <span className={`text-xl font-semibold tracking-tight hidden sm:block ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            ProjectX
          </span>
        </Link>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className={`mobile-menu-button p-2 rounded-md transition-colors ${
              theme === 'dark'
                ? 'text-gray-300 hover:text-white hover:bg-white/10'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex gap-4 absolute left-1/2 transform -translate-x-1/2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path.split('?')[0];
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md transition-all ${
                  theme === 'dark'
                    ? isActive
                      ? 'text-white bg-white/10 border border-white/20 shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                    : isActive
                      ? 'text-gray-900 bg-gray-100 border border-gray-300 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {link.icon}
                {link.label}
                {isActive && (
                  <span className="w-1.5 h-1.5 bg-accent-green rounded-full animate-pulse"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side - Notifications & User Menu */}
        <div className="flex items-center gap-4">
          {/* Notifications Dropdown */}
          {isAuthenticated && (
            <div ref={notificationsRef} className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={`p-2 rounded-md transition-colors relative ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                aria-label="Notifications"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold min-w-4 h-4 rounded-full flex items-center justify-center transform translate-x-1/4 -translate-y-1/4 animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown Menu */}
              {notificationsOpen && (
                <div className={`absolute top-full right-0 mt-2 w-80 sm:w-96 rounded-xl shadow-lg border animate-slide-down overflow-hidden z-50 max-h-[80vh] ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}>
                  {/* Notifications Header */}
                  <div className={`px-4 sm:px-5 py-4 border-b flex justify-between items-center ${
                    theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      <h3 className={`text-base font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        Notifications
                      </h3>
                      {unreadCount > 0 && (
                        <span className="bg-accent-green text-gray-900 text-xs font-semibold px-2 py-0.5 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllAsRead}
                          className={`text-xs font-medium px-2 py-1 rounded transition-colors ${
                            theme === 'dark'
                              ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          Mark all read
                        </button>
                      )}
                      {notifications.length > 0 && (
                        <button
                          onClick={handleClearAll}
                          className="text-red-500 text-xs font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {notifications.length > 0 ? (
                      <div>
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification.id)}
                            className={`px-4 sm:px-5 py-4 border-b cursor-pointer transition-colors relative ${
                              theme === 'dark'
                                ? notification.read
                                  ? 'bg-gray-900 hover:bg-gray-800 border-gray-700'
                                  : 'bg-blue-900/30 hover:bg-blue-900/50 border-gray-700'
                                : notification.read
                                  ? 'bg-white hover:bg-gray-50 border-gray-200'
                                  : 'bg-blue-50 hover:bg-blue-100 border-gray-200'
                            }`}
                          >
                            {/* Unread indicator */}
                            {!notification.read && (
                              <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
                                </span>
                              </div>
                            )}

                            <div className={`flex items-start gap-3 ${!notification.read ? 'ml-4 sm:ml-5' : ''}`}>
                              {/* Notification Icon */}
                              <div 
                                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white"
                                style={{ backgroundColor: getNotificationColor(notification.type) }}
                              >
                                {getNotificationIcon(notification.type)}
                              </div>

                              {/* Notification Content */}
                              <div className="flex-1 min-w-0">
                                <div className={`text-sm font-semibold mb-1 truncate ${
                                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                  {notification.title}
                                </div>
                                <div className={`text-xs mb-1 leading-snug line-clamp-2 ${
                                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                  {notification.description}
                                </div>
                                <div className={`text-[10px] ${
                                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                  {notification.time}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Empty State
                      <div className={`px-4 sm:px-5 py-12 text-center ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <Bell size={48} className={`mx-auto mb-4 opacity-50 ${
                          theme === 'dark' ? 'text-gray-600' : 'text-gray-300'
                        }`} />
                        <div className="text-sm font-medium mb-2">No notifications</div>
                        <div className="text-xs px-4">
                          You're all caught up! Check back later for updates.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Notifications Footer */}
                  {notifications.length > 0 && (
                    <div className={`px-4 sm:px-5 py-3 border-t text-center ${
                      theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      <Link
                        to="/notifications"
                        className="text-accent-green text-xs font-semibold inline-flex items-center gap-1 hover:opacity-80 transition-opacity"
                        onClick={() => setNotificationsOpen(false)}
                      >
                        View all notifications
                        <ChevronDown size={12} className="transform -rotate-90" />
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* User Profile Dropdown */}
          {isAuthenticated ? (
            <div ref={userMenuRef} className="relative">
              <div
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                  if (userMenuOpen) setActiveSubmenu(null);
                }}
                className={`flex items-center gap-2 sm:gap-3 cursor-pointer px-2 sm:px-3 py-2 rounded-md transition-colors ${
                  theme === 'dark'
                    ? 'text-white hover:bg-white/10'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white overflow-hidden bg-user-avatar">
                  {user?.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt={user.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="bg-gradient-to-br from-blue-500 to-purple-600 w-full h-full flex items-center justify-center">
                      {userDisplay.initials}
                    </span>
                  )}
                </div>
                
                {/* User info */}
                <div className="hidden sm:block text-left">
                  <div className={`text-sm font-medium truncate max-w-[120px] ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {userDisplay.name}
                  </div>
                  <div className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {userDisplay.role}
                  </div>
                </div>
                
                <ChevronDown 
                  size={16} 
                  className={`transition-transform hidden sm:block ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                  style={{ transform: userMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </div>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div className={`absolute top-full right-0 mt-2 w-64 sm:w-72 rounded-xl shadow-lg border z-50 overflow-hidden animate-slide-down max-h-[80vh] ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}>
                  {/* User Info Header - View Profile Button */}
                  <div className={`px-4 sm:px-5 py-4 border-b ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-user-avatar rounded-full flex items-center justify-center text-sm sm:text-base font-semibold text-white">
                        {userDisplay.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-semibold truncate ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {userDisplay.name}
                        </div>
                        <div className={`text-xs truncate ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {user?.email || 'user@example.com'}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleProfileClick}
                      className={`w-full text-center py-2 text-xs font-medium rounded-md transition-all duration-200 ${
                        theme === 'dark'
                          ? 'bg-accent-green text-gray-900 hover:bg-green-400 border border-accent-green'
                          : 'bg-accent-green text-gray-900 hover:bg-green-400 border border-accent-green'
                      }`}
                    >
                      View Profile
                    </button>
                  </div>

                  {/* User Menu Options - REMOVED "My Profile" option */}
                  <div className="py-2 max-h-[50vh] overflow-y-auto custom-scrollbar">
                    {userMenuOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          option.action();
                          setUserMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 sm:px-5 py-3 cursor-pointer transition-colors text-sm text-left ${
                          theme === 'dark'
                            ? 'text-gray-200 hover:bg-gray-800'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                          {option.icon}
                        </div>
                        <span className={`flex-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                          {option.label}
                        </span>
                        {option.label === 'Help & Support' && location.pathname === '/support' && (
                          <span className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></span>
                        )}
                      </button>
                    ))}

                    {/* Language Selector */}
                    <div>
                      <button
                        onClick={() => setActiveSubmenu(activeSubmenu === 'language' ? null : 'language')}
                        className={`w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3 cursor-pointer transition-colors text-sm text-left ${
                          theme === 'dark'
                            ? 'text-gray-200 hover:bg-gray-800'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Globe size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                          <span className="flex-1">Language</span>
                        </div>
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform ${
                            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                          }`}
                          style={{ transform: activeSubmenu === 'language' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        />
                      </button>

                      {/* Language Submenu */}
                      {activeSubmenu === 'language' && (
                        <div className={theme === 'dark' ? 'bg-gray-800 border-t border-gray-700' : 'bg-gray-50 border-t border-gray-200'}>
                          {languages.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                setLanguage(lang.name);
                                setActiveSubmenu(null);
                                alert(`Language changed to ${lang.name}`);
                              }}
                              className={`w-full flex items-center gap-3 px-4 sm:px-5 py-2 pl-12 sm:pl-14 cursor-pointer transition-colors text-sm text-left ${
                                theme === 'dark'
                                  ? 'text-gray-200 hover:bg-gray-700'
                                  : 'text-gray-700 hover:bg-white'
                              }`}
                            >
                              <span className="text-lg">{lang.flag}</span>
                              <span className="flex-1">{lang.name}</span>
                              {language === lang.name && (
                                <Check size={16} className="text-accent-green" />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Dark Mode Toggle */}
                    <button
                      onClick={toggleTheme}
                      className={`w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3 cursor-pointer transition-colors text-sm text-left ${
                        theme === 'dark'
                          ? 'text-gray-200 hover:bg-gray-800'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {theme === 'dark' ? (
                          <Sun size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                        ) : (
                          <Moon size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                        )}
                        <span className="flex-1">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                      </div>
                      <div className={`w-9 h-5 rounded-full relative transition-all duration-300 ${
                        theme === 'dark' ? 'bg-accent-green' : 'bg-gray-300'
                      }`}>
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                          theme === 'dark' ? 'left-5' : 'left-0.5'
                        }`} />
                      </div>
                    </button>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className={`w-full flex items-center gap-3 px-4 sm:px-5 py-3 cursor-pointer transition-colors text-sm text-left ${
                        theme === 'dark'
                          ? 'text-red-400 hover:bg-red-900/20'
                          : 'text-red-500 hover:bg-red-50'
                      }`}
                    >
                      <LogOut size={16} />
                      <span className="flex-1">Logout</span>
                    </button>
                  </div>

                  {/* Footer */}
                  <div className={`px-4 sm:px-5 py-3 border-t text-xs text-center ${
                    theme === 'dark'
                      ? 'border-gray-700 text-gray-500'
                      : 'border-gray-200 text-gray-500'
                  }`}>
                    <div className="truncate">Account ID: USR-{Math.random().toString(36).substr(2, 8).toUpperCase()}</div>
                    <div className="mt-1 flex justify-center gap-3">
                      <Link 
                        to="/privacy" 
                        className={`no-underline hover:underline ${
                          theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                        }`} 
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Privacy
                      </Link>
                      <Link 
                        to="/terms" 
                        className={`no-underline hover:underline ${
                          theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                        }`} 
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Terms
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Auth Buttons
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <LogIn size={18} />
                <span className="hidden sm:inline">Login</span>
              </Link>
              <Link
                to="/register"
                className="bg-accent-green text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-green-300 transition-colors flex items-center gap-2"
              >
                <UserPlus size={18} />
                <span className="hidden sm:inline">Sign Up</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className={`md:hidden absolute top-16 left-0 right-0 border-b shadow-lg animate-slide-down z-40 ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path.split('?')[0];
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    theme === 'dark'
                      ? isActive
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                      : isActive
                        ? 'bg-gray-100 text-gray-900 border border-gray-300'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <div className="relative">
                    {link.mobileIcon}
                    {isActive && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent-green rounded-full animate-pulse"></span>
                    )}
                  </div>
                  <span className="font-medium">{link.label}</span>
                  {isActive && (
                    <ChevronDown size={16} className="ml-auto transform rotate-90 text-accent-green" />
                  )}
                </Link>
              );
            })}
            
            {/* Mobile User Section */}
            <div className={`pt-4 mt-4 border-t ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div className="w-10 h-10 bg-user-avatar rounded-full flex items-center justify-center text-sm font-semibold text-white">
                      {userDisplay.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium truncate ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {userDisplay.name}
                      </div>
                      <div className={`text-xs truncate ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {userDisplay.role}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 px-4 mt-2">
                    <button
                      onClick={handleProfileClick}
                      className={`text-center py-2 text-xs font-medium rounded-md transition-all duration-200 ${
                        theme === 'dark'
                          ? 'bg-accent-green text-gray-900 hover:bg-green-400 border border-accent-green'
                          : 'bg-accent-green text-gray-900 hover:bg-green-400 border border-accent-green'
                      }`}
                    >
                      View Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="text-center bg-red-500/20 text-red-300 border border-red-500/30 rounded-md py-2 text-xs font-medium hover:bg-red-500/30 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 px-4">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-center border rounded-md py-2 text-xs font-medium transition-colors ${
                      theme === 'dark'
                        ? 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                        : 'bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center bg-accent-green text-gray-900 rounded-md py-2 text-xs font-medium hover:bg-green-300 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Bar */}
      <div className={`fixed bottom-0 left-0 right-0 border-t z-30 md:hidden ${
        theme === 'dark'
          ? 'bg-gray-900 border-gray-700'
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex justify-around items-center h-16 px-4">
          {navLinks.slice(0, 4).map((link) => {
            const isActive = location.pathname === link.path.split('?')[0];
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center p-2 transition-all relative ${
                  isActive 
                    ? theme === 'dark' ? 'text-white' : 'text-gray-900'
                    : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                <div className="relative">
                  {link.mobileIcon}
                  {isActive && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent-green rounded-full animate-pulse"></span>
                  )}
                </div>
                <span className="text-xs mt-1">{link.label}</span>
                {isActive && (
                  <div className="absolute top-0 w-full h-0.5 bg-accent-green rounded-t-full"></div>
                )}
              </Link>
            );
          })}
          
          {isAuthenticated ? (
            <button 
              onClick={handleProfileClick}
              className={`flex flex-col items-center p-2 transition-all relative ${
                location.pathname === '/profile'
                  ? theme === 'dark' ? 'text-white' : 'text-gray-900'
                  : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              <User size={20} />
              <span className="text-xs mt-1">Profile</span>
              {location.pathname === '/profile' && (
                <div className="absolute top-0 w-full h-0.5 bg-accent-green rounded-t-full"></div>
              )}
            </button>
          ) : (
            <Link
              to="/login"
              className={`flex flex-col items-center p-2 transition-all relative ${
                location.pathname === '/login'
                  ? theme === 'dark' ? 'text-white' : 'text-gray-900'
                  : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              <LogIn size={20} />
              <span className="text-xs mt-1">Login</span>
              {location.pathname === '/login' && (
                <div className="absolute top-0 w-full h-0.5 bg-accent-green rounded-t-full"></div>
              )}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;