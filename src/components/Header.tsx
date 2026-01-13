import React, { useState, useEffect, useRef } from 'react';
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
  CreditCard
} from 'lucide-react';

const Header: React.FC = () => {
  // State for dropdowns
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New job match',
      description: 'E-commerce Mobile App Design matches your skills',
      time: '2 minutes ago',
      read: false,
      type: 'job'
    },
    {
      id: 2,
      title: 'Proposal viewed',
      description: 'Client viewed your proposal for React Dashboard',
      time: '1 hour ago',
      read: true,
      type: 'proposal'
    },
    {
      id: 3,
      title: 'Payment received',
      description: '$590 USD received for completed project',
      time: '3 hours ago',
      read: false,
      type: 'payment'
    },
    {
      id: 4,
      title: 'New message',
      description: 'ShopEasy Inc. sent you a message',
      time: '5 hours ago',
      read: false,
      type: 'message'
    },
  ]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');

  // Refs for click outside detection
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Calculate unread notifications
  useEffect(() => {
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
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

  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  // Clear all notifications
  const handleClearAll = () => {
    setNotifications([]);
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
    { icon: <User size={16} />, label: 'My Profile', action: () => console.log('Profile clicked') },
    { icon: <Briefcase size={16} />, label: 'My Jobs', action: () => console.log('Jobs clicked') },
    { icon: <CreditCard size={16} />, label: 'Billing & Payments', action: () => console.log('Billing clicked') },
    { icon: <Settings size={16} />, label: 'Settings', action: () => console.log('Settings clicked') },
    { icon: <HelpCircle size={16} />, label: 'Help & Support', action: () => console.log('Support clicked') },
    { 
      icon: <Globe size={16} />, 
      label: 'Language', 
      action: () => {}, 
      submenu: languages,
      current: language
    },
    { 
      icon: <Moon size={16} />, 
      label: 'Dark Mode', 
      action: () => setDarkMode(!darkMode),
      toggle: darkMode
    },
    { icon: <LogOut size={16} />, label: 'Logout', action: () => console.log('Logout clicked'), danger: true },
  ];

  // Helper functions for notifications
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'job':
        return <Briefcase size={16} />;
      case 'proposal':
        return <MessageSquare size={16} />;
      case 'payment':
        return <CreditCard size={16} />;
      case 'message':
        return <MessageSquare size={16} />;
      default:
        return <Bell size={16} />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'job':
        return '#3B82F6'; // Blue
      case 'proposal':
        return '#8B5CF6'; // Purple
      case 'payment':
        return '#10B981'; // Green
      case 'message':
        return '#F59E0B'; // Amber
      default:
        return '#6B7280'; // Gray
    }
  };

  return (
    <header
  className="header "
>

      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        position: 'relative'
      }}>
        {/* Logo - Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: '#7CFFB2',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B0B0B" strokeWidth="2">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17" />
              <path d="M2 12L12 17L22 12" />
            </svg>
          </div>
          <span style={{
            color: 'white',
            fontSize: '1.25rem',
            fontWeight: 600,
            letterSpacing: '-0.025em'
          }}>
            ProjectX
          </span>
        </div>

        {/* Navigation Links - Centered */}
        <nav style={{
          display: 'flex',
          gap: '2rem',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          <a href="/" style={{
            color: 'white',
            fontSize: '0.875rem',
            fontWeight: 500,
            textDecoration: 'none',
            padding: '0.5rem 0.75rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255, 255, 255, 0.1)'
          }}>
            Job Search
          </a>
          <a href="#" style={{
            color: '#D1D5DB',
            fontSize: '0.875rem',
            fontWeight: 500,
            textDecoration: 'none',
            padding: '0.5rem 0.75rem',
            borderRadius: 'var(--radius-md)',
            transition: 'var(--transition)'
          }}>
            Talent Search
          </a>
          <a href="#" style={{
            color: '#D1D5DB',
            fontSize: '0.875rem',
            fontWeight: 500,
            textDecoration: 'none',
            padding: '0.5rem 0.75rem',
            borderRadius: 'var(--radius-md)',
            transition: 'var(--transition)'
          }}>
            Post a Job
          </a>
          <a href="/support" style={{
            color: '#D1D5DB',
            fontSize: '0.875rem',
            fontWeight: 500,
            textDecoration: 'none',
            padding: '0.5rem 0.75rem',
            borderRadius: 'var(--radius-md)',
            transition: 'var(--transition)'
          }}>
            Support
          </a>
        </nav>

        {/* Right Side - Notifications & User Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          
          {/* Notifications Dropdown */}
          <div ref={notificationsRef} style={{ position: 'relative' }}>
            <button 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: '#D1D5DB',
                padding: '0.5rem',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'var(--transition)',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                if (!notificationsOpen) {
                  e.currentTarget.style.color = '#D1D5DB';
                  e.currentTarget.style.background = 'none';
                }
              }}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  background: '#EF4444',
                  color: 'white',
                  fontSize: '0.625rem',
                  fontWeight: 600,
                  minWidth: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 0.25rem',
                  transform: 'translate(25%, -25%)'
                }}>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Menu */}
            {notificationsOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 0.5rem)',
                right: '0',
                width: '380px',
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                border: '1px solid var(--color-border-light)',
                zIndex: 1000,
                overflow: 'hidden'
              }}>
                {/* Notifications Header */}
                <div style={{
                  padding: '1rem 1.25rem',
                  borderBottom: '1px solid var(--color-border-light)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      Notifications
                    </h3>
                    {unreadCount > 0 && (
                      <span style={{
                        background: 'var(--color-accent-green)',
                        color: 'var(--color-text-primary)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.125rem 0.5rem',
                        borderRadius: 'var(--radius-pill)'
                      }}>
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllAsRead}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--color-text-secondary)',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          padding: '0.25rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          transition: 'var(--transition)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--color-bg-light)';
                          e.currentTarget.style.color = 'var(--color-text-primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'none';
                          e.currentTarget.style.color = 'var(--color-text-secondary)';
                        }}
                      >
                        Mark all as read
                      </button>
                    )}
                    {notifications.length > 0 && (
                      <button
                        onClick={handleClearAll}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#EF4444',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          padding: '0.25rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          transition: 'var(--transition)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#FEF2F2';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'none';
                        }}
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </div>

                {/* Notifications List */}
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {notifications.length > 0 ? (
                    <div>
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification.id)}
                          style={{
                            padding: '1rem 1.25rem',
                            borderBottom: '1px solid var(--color-border-light)',
                            cursor: 'pointer',
                            transition: 'var(--transition)',
                            background: notification.read ? 'white' : '#F8FAFC',
                            position: 'relative'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--color-bg-light)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = notification.read ? 'white' : '#F8FAFC';
                          }}
                        >
                          {/* Unread indicator */}
                          {!notification.read && (
                            <div style={{
                              position: 'absolute',
                              left: '0.75rem',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              width: '6px',
                              height: '6px',
                              background: 'var(--color-accent-green)',
                              borderRadius: '50%'
                            }} />
                          )}

                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'flex-start', 
                            gap: '0.75rem',
                            marginLeft: !notification.read ? '0.75rem' : '0'
                          }}>
                            {/* Notification Icon */}
                            <div style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              background: getNotificationColor(notification.type),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              color: 'white'
                            }}>
                              {getNotificationIcon(notification.type)}
                            </div>

                            {/* Notification Content */}
                            <div style={{ flex: 1 }}>
                              <div style={{
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: 'var(--color-text-primary)',
                                marginBottom: '0.25rem'
                              }}>
                                {notification.title}
                              </div>
                              <div style={{
                                fontSize: '0.75rem',
                                color: 'var(--color-text-secondary)',
                                marginBottom: '0.25rem',
                                lineHeight: 1.4
                              }}>
                                {notification.description}
                              </div>
                              <div style={{
                                fontSize: '0.625rem',
                                color: 'var(--color-text-light)'
                              }}>
                                {notification.time}
                              </div>
                            </div>

                            {/* Action button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNotificationClick(notification.id);
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--color-text-light)',
                                cursor: 'pointer',
                                padding: '0.25rem',
                                borderRadius: 'var(--radius-sm)',
                                opacity: notification.read ? 0.5 : 1,
                                transition: 'var(--transition)'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--color-bg-light)';
                                e.currentTarget.style.color = 'var(--color-text-primary)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'none';
                                e.currentTarget.style.color = 'var(--color-text-light)';
                              }}
                            >
                              <Check size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Empty State
                    <div style={{
                      padding: '3rem 1.25rem',
                      textAlign: 'center',
                      color: 'var(--color-text-secondary)'
                    }}>
                      <Bell size={48} style={{ margin: '0 auto 1rem', color: 'var(--color-border)', opacity: 0.5 }} />
                      <div style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                        No notifications
                      </div>
                      <div style={{ fontSize: '0.75rem' }}>
                        You're all caught up! Check back later for updates.
                      </div>
                    </div>
                  )}
                </div>

                {/* Notifications Footer */}
                {notifications.length > 0 && (
                  <div style={{
                    padding: '0.75rem 1.25rem',
                    borderTop: '1px solid var(--color-border-light)',
                    textAlign: 'center'
                  }}>
                    <a
                      href="/notifications"
                      style={{
                        color: 'var(--color-accent-green)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        transition: 'var(--transition)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '0.8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '1';
                      }}
                    >
                      View all notifications
                      <ChevronDown size={12} style={{ transform: 'rotate(-90deg)' }} />
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div ref={userMenuRef} style={{ position: 'relative' }}>
            <div
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: 'white',
                cursor: 'pointer',
                padding: '0.5rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                transition: 'var(--transition)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                if (!userMenuOpen) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'white'
                }}>
                  SY
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>Sam Young</div>
                  <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Freelancer</div>
                </div>
              </div>
              <ChevronDown 
                size={16} 
                color="#9CA3AF" 
                style={{ 
                  transition: 'transform 0.2s',
                  transform: userMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' 
                }} 
              />
            </div>

            {/* User Dropdown Menu */}
            {userMenuOpen && (
              <UserDropdownMenu
                userMenuOptions={userMenuOptions}
                language={language}
                setLanguage={setLanguage}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                setUserMenuOpen={setUserMenuOpen}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Separate component for user dropdown menu to avoid nested useState hook
interface UserDropdownMenuProps {
  userMenuOptions: any[];
  language: string;
  setLanguage: (lang: string) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  setUserMenuOpen: (open: boolean) => void;
}

const UserDropdownMenu: React.FC<UserDropdownMenuProps> = ({
  userMenuOptions,
  language,
  setLanguage,
  darkMode,
  setDarkMode,
  setUserMenuOpen
}) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const handleLanguageSelect = (langName: string) => {
    setLanguage(langName);
    setActiveSubmenu(null);
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div style={{
      position: 'absolute',
      top: 'calc(100% + 0.5rem)',
      right: '0',
      width: '280px',
      background: 'white',
      borderRadius: 'var(--radius-lg)',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      border: '1px solid var(--color-border-light)',
      zIndex: 1000,
      overflow: 'hidden'
    }}>
      {/* User Info Header */}
      <div style={{
        padding: '1rem 1.25rem',
        borderBottom: '1px solid var(--color-border-light)',
        background: 'var(--color-bg-light)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            fontWeight: 600,
            color: 'white'
          }}>
            SY
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Sam Young
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
              sam.young@email.com
            </div>
          </div>
        </div>
        <a
          href="/profile"
          style={{
            display: 'block',
            textAlign: 'center',
            background: 'white',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.5rem',
            fontSize: '0.75rem',
            fontWeight: 500,
            textDecoration: 'none',
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
          View Profile
        </a>
      </div>

      {/* User Menu Options */}
      <div style={{ padding: '0.5rem 0' }}>
        {userMenuOptions.map((option, index) => {
          const isLanguageOption = option.label === 'Language';
          const isDarkModeOption = option.label === 'Dark Mode';
          
          return (
            <div key={index}>
              <button
                onClick={() => {
                  if (isLanguageOption) {
                    setActiveSubmenu(activeSubmenu === 'language' ? null : 'language');
                  } else if (isDarkModeOption) {
                    handleToggleDarkMode();
                  } else {
                    option.action();
                    setUserMenuOpen(false);
                  }
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  background: 'none',
                  border: 'none',
                  color: option.danger ? '#EF4444' : 'var(--color-text-primary)',
                  padding: '0.75rem 1.25rem',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  fontSize: '0.875rem',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-bg-light)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ 
                    color: option.danger ? '#EF4444' : 'var(--color-text-secondary)',
                    opacity: option.danger ? 1 : 0.7
                  }}>
                    {option.icon}
                  </div>
                  <span style={{ flex: 1 }}>{option.label}</span>
                </div>
                
                {/* Toggle or Chevron */}
                {isDarkModeOption ? (
                  <div style={{
                    width: '36px',
                    height: '20px',
                    background: darkMode ? 'var(--color-accent-green)' : 'var(--color-border)',
                    borderRadius: 'var(--radius-pill)',
                    position: 'relative',
                    transition: 'background 0.2s'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '2px',
                      left: darkMode ? 'calc(100% - 18px)' : '2px',
                      width: '16px',
                      height: '16px',
                      background: 'white',
                      borderRadius: '50%',
                      transition: 'left 0.2s'
                    }} />
                  </div>
                ) : isLanguageOption ? (
                  <ChevronDown 
                    size={16} 
                    color="var(--color-text-light)" 
                    style={{ 
                      transition: 'transform 0.2s',
                      transform: activeSubmenu === 'language' ? 'rotate(180deg)' : 'rotate(0deg)' 
                    }} 
                  />
                ) : null}
              </button>

              {/* Language Submenu */}
              {isLanguageOption && activeSubmenu === 'language' && option.submenu && (
                <div style={{
                  background: 'var(--color-bg-light)',
                  padding: '0.25rem 0'
                }}>
                  {option.submenu.map((lang: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleLanguageSelect(lang.name)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-text-primary)',
                        padding: '0.5rem 1.25rem 0.5rem 3.25rem',
                        cursor: 'pointer',
                        transition: 'var(--transition)',
                        fontSize: '0.875rem',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'none';
                      }}
                    >
                      <span style={{ fontSize: '1.25rem' }}>{lang.flag}</span>
                      <span style={{ flex: 1 }}>{lang.name}</span>
                      {language === lang.name && (
                        <Check size={16} color="var(--color-accent-green)" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{
        padding: '0.75rem 1.25rem',
        borderTop: '1px solid var(--color-border-light)',
        fontSize: '0.75rem',
        color: 'var(--color-text-light)',
        textAlign: 'center'
      }}>
        <div>Account ID: USR-7890-4567</div>
        <div style={{ marginTop: '0.25rem' }}>
          <a 
            href="/privacy" 
            style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', marginRight: '0.75rem' }}
          >
            Privacy
          </a>
          <a 
            href="/terms" 
            style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}
          >
            Terms
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;