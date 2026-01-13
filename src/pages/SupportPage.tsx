import React, { useState } from 'react';
import { 
  MessageCircle, 
  Headphones, 
  FileText, 
  HelpCircle, 
  Search, 
  ChevronRight, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const SupportPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    alert('Thank you for your message! We will get back to you within 24 hours.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const faqCategories = [
    { id: 'all', label: 'All Topics', count: 28 },
    { id: 'account', label: 'Account & Billing', count: 8 },
    { id: 'jobs', label: 'Job Posting', count: 6 },
    { id: 'proposals', label: 'Proposals & Hiring', count: 7 },
    { id: 'payments', label: 'Payments & Security', count: 5 },
    { id: 'technical', label: 'Technical Issues', count: 4 },
  ];

  const popularArticles = [
    {
      id: 1,
      title: 'How to create an effective job posting',
      category: 'jobs',
      views: '2.4k',
      readTime: '5 min'
    },
    {
      id: 2,
      title: 'Understanding payment protection',
      category: 'payments',
      views: '1.8k',
      readTime: '3 min'
    },
    {
      id: 3,
      title: 'Tips for writing winning proposals',
      category: 'proposals',
      views: '3.1k',
      readTime: '7 min'
    },
    {
      id: 4,
      title: 'Account verification process',
      category: 'account',
      views: '1.2k',
      readTime: '4 min'
    },
  ];

  const faqItems = [
    {
      id: 1,
      question: 'How do I post a job on ProjectX?',
      answer: 'To post a job, click on "Post a Job" in the navigation bar, fill out the job details including title, description, budget, and requirements. Your job will be reviewed and published within 24 hours.',
      category: 'jobs',
      popular: true
    },
    {
      id: 2,
      question: 'What payment methods are supported?',
      answer: 'We support credit/debit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are secured with SSL encryption and processed through trusted payment gateways.',
      category: 'payments',
      popular: true
    },
    {
      id: 3,
      question: 'How can I increase my chances of getting hired?',
      answer: 'Complete your profile with a professional photo and detailed portfolio. Write personalized proposals for each job. Include relevant samples of your work. Maintain good communication with potential clients.',
      category: 'proposals',
      popular: false
    },
    {
      id: 4,
      question: 'Is there a fee for freelancers?',
      answer: 'Freelancers can join and create profiles for free. We charge a 10% service fee on each completed project. This fee covers payment protection, customer support, and platform maintenance.',
      category: 'account',
      popular: true
    },
    {
      id: 5,
      question: 'How does payment protection work?',
      answer: 'We use an escrow system where clients deposit funds before work begins. Funds are released to the freelancer once the work is completed and approved. This protects both parties in the transaction.',
      category: 'payments',
      popular: false
    },
    {
      id: 6,
      question: 'What should I do if I encounter a technical issue?',
      answer: 'First, try clearing your browser cache and refreshing the page. If the issue persists, contact our technical support team through the contact form below. Include screenshots and detailed steps to reproduce the issue.',
      category: 'technical',
      popular: false
    },
    {
      id: 7,
      question: 'How do I update my account information?',
      answer: 'Click on your profile picture in the top right corner, select "Account Settings". From there you can update your personal information, change your password, and manage notification preferences.',
      category: 'account',
      popular: false
    },
    {
      id: 8,
      question: 'Can I hire multiple freelancers for one project?',
      answer: 'Yes, you can hire multiple freelancers for different aspects of your project. Each job posting should be specific to the required skill set. You can create separate contracts for each freelancer.',
      category: 'proposals',
      popular: false
    },
  ];

  const filteredFaqs = faqItems.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const supportChannels = [
    {
      icon: <MessageCircle size={24} />,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      availability: 'Available 24/7',
      responseTime: 'Typically replies in 2 minutes',
      action: 'Start Chat'
    },
    {
      icon: <Mail size={24} />,
      title: 'Email Support',
      description: 'Send us an email and we\'ll respond within 24 hours',
      availability: 'Mon-Fri, 9am-6pm EST',
      responseTime: 'Response within 24 hours',
      action: 'Send Email'
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone Support',
      description: 'Speak directly with a support representative',
      availability: 'Mon-Fri, 9am-6pm EST',
      responseTime: 'Immediate response',
      action: 'Call Now'
    },
  ];

  return (
    <div>
      <Header />
      
      {/* Support Hero Section */}
      <div style={{
        background: 'var(--color-dark-gradient)',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(124, 255, 178, 0.1)',
            color: 'var(--color-accent-green)',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-pill)',
            marginBottom: '1.5rem'
          }}>
            <Headphones size={16} />
            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Support Center</span>
          </div>
          
          <h1 style={{
            color: 'white',
            fontSize: '3rem',
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: '1rem',
            letterSpacing: '-0.025em'
          }}>
            How can we help you?
          </h1>
          
          <p style={{
            color: '#D1D5DB',
            fontSize: '1.125rem',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
            maxWidth: '600px',
            margin: '0 auto 2.5rem'
          }}>
            Get answers to frequently asked questions or contact our support team directly.
          </p>
          
          {/* Search Bar */}
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-pill)',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            boxShadow: 'var(--shadow-lg)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0 1rem'
            }}>
              <Search size={20} color="#6B7280" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-primary)'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9CA3AF',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    borderRadius: '50%'
                  }}
                >
                  ✕
                </button>
              )}
            </div>
            
            <button
              style={{
                background: 'var(--color-accent-green)',
                color: 'var(--color-text-primary)',
                border: 'none',
                borderRadius: 'var(--radius-pill)',
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Search size={16} />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ 
        maxWidth: '1200px', 
        margin: '2rem auto', 
        padding: '0 2rem' 
      }}>
        {/* Back to Jobs Button */}
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-secondary)',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            marginBottom: '2rem',
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
          <ArrowLeft size={16} />
          Back to Job Search
        </button>

        {/* Quick Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--color-border-light)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: 'var(--color-accent-green)',
              marginBottom: '0.5rem'
            }}>
              24/7
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)'
            }}>
              Support Availability
            </div>
          </div>
          
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--color-border-light)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: 'var(--color-accent-green)',
              marginBottom: '0.5rem'
            }}>
              &lt; 2 min
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)'
            }}>
              Average Response Time
            </div>
          </div>
          
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--color-border-light)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: 'var(--color-accent-green)',
              marginBottom: '0.5rem'
            }}>
              98%
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)'
            }}>
              Satisfaction Rate
            </div>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          {/* Left Column - FAQ & Contact */}
          <div>
            {/* FAQ Section */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <HelpCircle size={24} />
                  Frequently Asked Questions
                </h2>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text-secondary)'
                }}>
                  {filteredFaqs.length} articles found
                </div>
              </div>

              {/* FAQ Categories */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '2rem',
                flexWrap: 'wrap'
              }}>
                {faqCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: activeCategory === category.id ? 'var(--color-accent-green)' : 'var(--color-bg-light)',
                      color: activeCategory === category.id ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'var(--transition)'
                    }}
                  >
                    {category.label}
                    <span style={{
                      fontSize: '0.75rem',
                      background: activeCategory === category.id ? 'rgba(0, 0, 0, 0.1)' : 'var(--color-border)',
                      padding: '0.125rem 0.375rem',
                      borderRadius: 'var(--radius-pill)'
                    }}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* FAQ List */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {filteredFaqs.map(faq => (
                  <div
                    key={faq.id}
                    style={{
                      background: 'white',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1.5rem',
                      boxShadow: 'var(--shadow-sm)',
                      border: '1px solid var(--color-border-light)',
                      transition: 'var(--transition)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '0.75rem'
                    }}>
                      <h3 style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        flex: 1
                      }}>
                        {faq.question}
                      </h3>
                      {faq.popular && (
                        <span style={{
                          fontSize: '0.75rem',
                          background: 'var(--color-tag-green-bg)',
                          color: 'var(--color-tag-green-text)',
                          padding: '0.25rem 0.5rem',
                          borderRadius: 'var(--radius-pill)',
                          fontWeight: 500,
                          marginLeft: '1rem'
                        }}>
                          Popular
                        </span>
                      )}
                    </div>
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '1rem'
                    }}>
                      {faq.answer}
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.75rem',
                      color: 'var(--color-text-light)'
                    }}>
                      <span style={{
                        background: 'var(--color-bg-light)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: 'var(--radius-pill)',
                        textTransform: 'capitalize'
                      }}>
                        {faq.category}
                      </span>
                      <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-accent-green)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}>
                        Read more
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form Section */}
            <div style={{
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--color-border-light)'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <MessageCircle size={24} />
                Contact Support Team
              </h2>
              
              <form onSubmit={handleContactSubmit}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'var(--color-text-primary)',
                      marginBottom: '0.5rem'
                    }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.875rem',
                        transition: 'var(--transition)'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--color-accent-green)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(124, 255, 178, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--color-border)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'var(--color-text-primary)',
                      marginBottom: '0.5rem'
                    }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.875rem',
                        transition: 'var(--transition)'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--color-accent-green)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(124, 255, 178, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--color-border)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--color-text-primary)',
                    marginBottom: '0.5rem'
                  }}>
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      background: 'white',
                      cursor: 'pointer',
                      transition: 'var(--transition)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--color-accent-green)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(124, 255, 178, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--color-border)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <option value="">Select a topic</option>
                    <option value="account">Account & Billing</option>
                    <option value="technical">Technical Issues</option>
                    <option value="job-posting">Job Posting</option>
                    <option value="payments">Payment Issues</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--color-text-primary)',
                    marginBottom: '0.5rem'
                  }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      resize: 'vertical',
                      transition: 'var(--transition)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--color-accent-green)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(124, 255, 178, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--color-border)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: 'var(--color-accent-green)',
                    color: 'var(--color-text-primary)',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-accent-green-dark)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--color-accent-green)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Mail size={16} />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Support Channels & Resources */}
          <div>
            {/* Support Channels */}
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '1.5rem'
              }}>
                Get Help Quickly
              </h2>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {supportChannels.map((channel, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'white',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1.5rem',
                      boxShadow: 'var(--shadow-sm)',
                      border: '1px solid var(--color-border-light)',
                      transition: 'var(--transition)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'var(--color-bg-light)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-accent-green)'
                      }}>
                        {channel.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: 'var(--color-text-primary)',
                          marginBottom: '0.25rem'
                        }}>
                          {channel.title}
                        </h3>
                        <p style={{
                          fontSize: '0.875rem',
                          color: 'var(--color-text-secondary)'
                        }}>
                          {channel.description}
                        </p>
                      </div>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.75rem',
                      color: 'var(--color-text-light)',
                      marginBottom: '1rem',
                      paddingBottom: '1rem',
                      borderBottom: '1px solid var(--color-border-light)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={12} />
                        {channel.availability}
                      </div>
                      <div>
                        {channel.responseTime}
                      </div>
                    </div>
                    
                    <button
                      style={{
                        width: '100%',
                        background: 'var(--color-bg-light)',
                        color: 'var(--color-text-primary)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.75rem',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.borderColor = 'var(--color-accent-green)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--color-bg-light)';
                        e.currentTarget.style.borderColor = 'var(--color-border)';
                      }}
                    >
                      {channel.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Articles */}
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)'
                }}>
                  Popular Articles
                </h2>
                <FileText size={20} color="var(--color-text-light)" />
              </div>
              
              <div style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--color-border-light)',
                overflow: 'hidden'
              }}>
                {popularArticles.map((article, index) => (
                  <div
                    key={article.id}
                    style={{
                      padding: '1.25rem',
                      borderBottom: index < popularArticles.length - 1 ? '1px solid var(--color-border-light)' : 'none',
                      transition: 'var(--transition)',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--color-bg-light)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '0.75rem'
                    }}>
                      <h3 style={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        flex: 1
                      }}>
                        {article.title}
                      </h3>
                      <ExternalLink size={14} color="var(--color-text-light)" />
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.75rem',
                      color: 'var(--color-text-light)'
                    }}>
                      <span style={{
                        background: 'var(--color-bg-light)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: 'var(--radius-pill)',
                        textTransform: 'capitalize'
                      }}>
                        {article.category}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span>👁️ {article.views}</span>
                        <span>⏱️ {article.readTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                style={{
                  width: '100%',
                  marginTop: '1rem',
                  background: 'none',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-primary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-bg-light)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                }}
              >
                View All Articles
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div style={{
          background: 'var(--color-dark-gradient)',
          borderRadius: 'var(--radius-xl)',
          padding: '3rem',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <CheckCircle size={48} color="var(--color-accent-green)" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{
            color: 'white',
            fontSize: '1.75rem',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>
            Still need help?
          </h2>
          <p style={{
            color: '#D1D5DB',
            fontSize: '1.125rem',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Our dedicated support team is here to help you succeed on ProjectX.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              style={{
                background: 'var(--color-accent-green)',
                color: 'var(--color-text-primary)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 2rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-accent-green-dark)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-accent-green)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Contact Support
            </button>
            <button
              onClick={() => navigate('/')}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 2rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;