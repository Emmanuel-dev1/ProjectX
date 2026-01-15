// components/Header.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bell, 
  ChevronDown, 
  LogOut, 
  Settings, 
  User, 
  Globe, 
  HelpCircle, 
  Moon, 
  Check,
  MessageSquare,
  Briefcase,
  CreditCard,
  Search,
  Home,
  Users,
  Plus,
  X
} from 'lucide-react';
import { Notification, User as UserType } from '../types';

const Header: React.FC = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  // Mock notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: 'New job match', description: 'E-commerce Mobile App Design matches your skills', time: '2 minutes ago', read: false, type: 'job' },
    { id: 2, title: 'Proposal viewed', description: 'Client viewed your proposal for React Dashboard', time: '1 hour ago', read: true, type: 'proposal' },
    { id: 3, title: 'Payment received', description: 'GHS 590 received for completed project', time: '3 hours ago', read: false, type: 'payment' },
    { id: 4, title: 'New message', description: 'ShopEasy Inc. sent you a message', time: '5 hours ago', read: false, type: 'message' },
    { id: 5, title: 'Job expired', description: 'WordPress E-commerce Site listing has expired', time: '1 day ago', read: true, type: 'job' },
  ]);

  // Mock user
  const user: UserType = {
    name: 'Sam Young',
    email: 'sam.young@email.com',
    role: 'Freelancer',
    avatarInitials: 'SY'
  };

  // Define navigation links
  const navLinks = [
    { path: '/', label: 'Job Search', icon: <Search size={18} />, mobileIcon: <Search size={20} /> },
    { path: '/talent-search', label: 'Talent Search', icon: <Users size={18} />, mobileIcon: <Users size={20} /> },
    { path: '/post-job', label: 'Post a Job', icon: <Plus size={18} />, mobileIcon: <Plus size={20} /> },
    { path: '/support', label: 'Support', icon: <HelpCircle size={18} />, mobileIcon: <HelpCircle size={20} /> },
  ];

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

  // User menu options
  const userMenuOptions = [
    { icon: <User size={16} />, label: 'My Profile', action: () => alert('Opening profile...') },
    { icon: <Briefcase size={16} />, label: 'My Jobs', action: () => alert('Opening jobs...') },
    { icon: <CreditCard size={16} />, label: 'Billing & Payments', action: () => alert('Opening billing...') },
    { icon: <Settings size={16} />, label: 'Settings', action: () => alert('Opening settings...') },
    { icon: <HelpCircle size={16} />, label: 'Help & Support', action: () => window.location.href = '/support' },
  ];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-dark-gradient shadow-header">
      <div className="max-w-8xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between relative">
        {/* Logo - Always visible */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="w-8 h-8 bg-accent-green rounded-md flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B0B0B" strokeWidth="2">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17" />
              <path d="M2 12L12 17L22 12" />
            </svg>
          </div>
          <span className="text-white text-xl font-semibold tracking-tight hidden sm:block">
            ProjectX
          </span>
        </Link>

        {/* Mobile menu button - Hidden on desktop */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="mobile-menu-button text-gray-300 p-2 rounded-md hover:text-white hover:bg-white/10"
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
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md transition-all ${
                  isActive
                    ? 'text-white bg-white/10 border border-white/20 shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
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
          <div ref={notificationsRef} className="relative">
            <button 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="text-gray-300 p-2 rounded-md hover:text-white hover:bg-white/10 transition-colors relative"
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
              <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-border-light animate-slide-down overflow-hidden z-50 max-h-[80vh]">
                {/* Notifications Header */}
                <div className="px-4 sm:px-5 py-4 border-b border-border-light flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-text-primary">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="bg-accent-green text-text-primary text-xs font-semibold px-2 py-0.5 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllAsRead}
                        className="text-text-secondary text-xs font-medium px-2 py-1 rounded hover:bg-bg-light hover:text-text-primary transition-colors"
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
                          className={`px-4 sm:px-5 py-4 border-b border-border-light cursor-pointer transition-colors ${
                            notification.read ? 'bg-white' : 'bg-blue-50'
                          } hover:bg-bg-light relative`}
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
                              <div className="text-sm font-semibold text-text-primary mb-1 truncate">
                                {notification.title}
                              </div>
                              <div className="text-xs text-text-secondary mb-1 leading-snug line-clamp-2">
                                {notification.description}
                              </div>
                              <div className="text-[10px] text-text-light">
                                {notification.time}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Empty State
                    <div className="px-4 sm:px-5 py-12 text-center text-text-secondary">
                      <Bell size={48} className="mx-auto mb-4 text-border opacity-50" />
                      <div className="text-sm font-medium mb-2">No notifications</div>
                      <div className="text-xs px-4">
                        You're all caught up! Check back later for updates.
                      </div>
                    </div>
                  )}
                </div>

                {/* Notifications Footer */}
                {notifications.length > 0 && (
                  <div className="px-4 sm:px-5 py-3 border-t border-border-light text-center">
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

          {/* User Profile Dropdown */}
          <div ref={userMenuRef} className="relative">
            <div
              onClick={() => {
                setUserMenuOpen(!userMenuOpen);
                if (userMenuOpen) setActiveSubmenu(null);
              }}
              className="flex items-center gap-2 sm:gap-3 text-white cursor-pointer px-2 sm:px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
            >
              {/* Avatar - Always visible */}
              <div className="w-8 h-8 bg-user-avatar rounded-full flex items-center justify-center text-xs font-semibold text-white">
                {user.avatarInitials}
              </div>
              
              {/* User info - Hidden on mobile */}
              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium truncate max-w-[120px]">{user.name}</div>
                <div className="text-xs text-gray-400">{user.role}</div>
              </div>
              
              <ChevronDown 
                size={16} 
                className="text-gray-400 transition-transform hidden sm:block"
                style={{ transform: userMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </div>

            {/* User Dropdown Menu */}
            {userMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 sm:w-72 bg-white rounded-xl shadow-lg border border-border-light z-50 overflow-hidden animate-slide-down max-h-[80vh]">
                {/* User Info Header */}
                <div className="px-4 sm:px-5 py-4 border-b border-border-light bg-bg-light">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-user-avatar rounded-full flex items-center justify-center text-sm sm:text-base font-semibold text-white">
                      {user.avatarInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-text-primary truncate">{user.name}</div>
                      <div className="text-xs text-text-secondary truncate">{user.email}</div>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="block text-center bg-white text-text-primary border border-border rounded-md py-2 text-xs font-medium hover:bg-bg-light hover:border-accent-green transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    View Profile
                  </Link>
                </div>

                {/* User Menu Options */}
                <div className="py-2 max-h-[50vh] overflow-y-auto custom-scrollbar">
                  {userMenuOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        option.action();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 sm:px-5 py-3 cursor-pointer transition-colors text-sm text-left text-text-primary hover:bg-bg-light"
                    >
                      <div className="text-text-secondary opacity-70">
                        {option.icon}
                      </div>
                      <span className="flex-1">{option.label}</span>
                      {option.label === 'Help & Support' && location.pathname === '/support' && (
                        <span className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></span>
                      )}
                    </button>
                  ))}

                  {/* Language Selector */}
                  <div>
                    <button
                      onClick={() => setActiveSubmenu(activeSubmenu === 'language' ? null : 'language')}
                      className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3 cursor-pointer transition-colors text-sm text-left text-text-primary hover:bg-bg-light"
                    >
                      <div className="flex items-center gap-3">
                        <Globe size={16} className="text-text-secondary opacity-70" />
                        <span className="flex-1">Language</span>
                      </div>
                      <ChevronDown 
                        size={16} 
                        className="text-text-light transition-transform"
                        style={{ transform: activeSubmenu === 'language' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      />
                    </button>

                    {/* Language Submenu */}
                    {activeSubmenu === 'language' && (
                      <div className="bg-bg-light border-t border-border-light">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.name);
                              setActiveSubmenu(null);
                              alert(`Language changed to ${lang.name}`);
                            }}
                            className="w-full flex items-center gap-3 px-4 sm:px-5 py-2 pl-12 sm:pl-14 cursor-pointer transition-colors text-sm text-left text-text-primary hover:bg-white"
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
                    onClick={() => {
                      setDarkMode(!darkMode);
                      alert(`Dark mode ${!darkMode ? 'enabled' : 'disabled'}`);
                    }}
                    className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3 cursor-pointer transition-colors text-sm text-left text-text-primary hover:bg-bg-light"
                  >
                    <div className="flex items-center gap-3">
                      <Moon size={16} className="text-text-secondary opacity-70" />
                      <span className="flex-1">Dark Mode</span>
                    </div>
                    <div className={`w-9 h-5 rounded-full relative transition-all duration-300 ${
                      darkMode ? 'bg-accent-green' : 'bg-gray-300'
                    }`}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                        darkMode ? 'left-5' : 'left-0.5'
                      }`} />
                    </div>
                  </button>

                  {/* Logout */}
                  <button
                    onClick={() => {
                      alert('Logged out successfully!');
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 sm:px-5 py-3 cursor-pointer transition-colors text-sm text-left text-red-500 hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    <span className="flex-1">Logout</span>
                  </button>
                </div>

                {/* Footer */}
                <div className="px-4 sm:px-5 py-3 border-t border-border-light text-xs text-text-light text-center">
                  <div className="truncate">Account ID: USR-7890-4567</div>
                  <div className="mt-1 flex justify-center gap-3">
                    <Link to="/privacy" className="text-text-secondary no-underline hover:text-text-primary" onClick={() => setUserMenuOpen(false)}>Privacy</Link>
                    <Link to="/terms" className="text-text-secondary no-underline hover:text-text-primary" onClick={() => setUserMenuOpen(false)}>Terms</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="md:hidden absolute top-16 left-0 right-0 bg-dark-gradient border-b border-white/10 shadow-lg animate-slide-down z-40"
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
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
            <div className="pt-4 mt-4 border-t border-white/10">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-10 h-10 bg-user-avatar rounded-full flex items-center justify-center text-sm font-semibold text-white">
                  {user.avatarInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{user.name}</div>
                  <div className="text-xs text-gray-400 truncate">{user.role}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 px-4 mt-2">
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center bg-white/10 text-white border border-white/20 rounded-md py-2 text-xs font-medium hover:bg-white/20 transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    alert('Logged out successfully!');
                    setMobileMenuOpen(false);
                  }}
                  className="text-center bg-red-500/20 text-red-300 border border-red-500/30 rounded-md py-2 text-xs font-medium hover:bg-red-500/30 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Bar - Bottom fixed on mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-dark-gradient border-t border-white/10 z-30 md:hidden">
        <div className="flex justify-around items-center h-16 px-4">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center p-2 transition-all relative ${
                  isActive ? 'text-white' : 'text-gray-300'
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
          
          <button 
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className={`flex flex-col items-center p-2 transition-all relative ${
              userMenuOpen ? 'text-white' : 'text-gray-300'
            }`}
          >
            <User size={20} />
            <span className="text-xs mt-1">Profile</span>
            {userMenuOpen && (
              <div className="absolute top-0 w-full h-0.5 bg-accent-green rounded-t-full"></div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;