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

const SupportPage: React.FC = () => {
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
    { id: 1, title: 'How to create an effective job posting', category: 'jobs', views: '2.4k', readTime: '5 min' },
    { id: 2, title: 'Understanding payment protection', category: 'payments', views: '1.8k', readTime: '3 min' },
    { id: 3, title: 'Tips for writing winning proposals', category: 'proposals', views: '3.1k', readTime: '7 min' },
    { id: 4, title: 'Account verification process', category: 'account', views: '1.2k', readTime: '4 min' },
  ];

  const faqItems = [
    { id: 1, question: 'How do I post a job on ProjectX?', answer: 'To post a job, click on "Post a Job" in the navigation bar, fill out the job details including title, description, budget, and requirements. Your job will be reviewed and published within 24 hours.', category: 'jobs', popular: true },
    { id: 2, question: 'What payment methods are supported?', answer: 'We support credit/debit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are secured with SSL encryption and processed through trusted payment gateways.', category: 'payments', popular: true },
    { id: 3, question: 'How can I increase my chances of getting hired?', answer: 'Complete your profile with a professional photo and detailed portfolio. Write personalized proposals for each job. Include relevant samples of your work. Maintain good communication with potential clients.', category: 'proposals', popular: false },
    { id: 4, question: 'Is there a fee for freelancers?', answer: 'Freelancers can join and create profiles for free. We charge a 10% service fee on each completed project. This fee covers payment protection, customer support, and platform maintenance.', category: 'account', popular: true },
  ];

  const filteredFaqs = faqItems.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const supportChannels = [
    { icon: <MessageCircle size={24} />, title: 'Live Chat', description: 'Chat with our support team in real-time', availability: 'Available 24/7', responseTime: 'Typically replies in 2 minutes', action: 'Start Chat' },
    { icon: <Mail size={24} />, title: 'Email Support', description: 'Send us an email and we\'ll respond within 24 hours', availability: 'Mon-Fri, 9am-6pm EST', responseTime: 'Response within 24 hours', action: 'Send Email' },
    { icon: <Phone size={24} />, title: 'Phone Support', description: 'Speak directly with a support representative', availability: 'Mon-Fri, 9am-6pm EST', responseTime: 'Immediate response', action: 'Call Now' },
  ];

  return (
    <div className="min-h-screen bg-bg-light pb-16 md:pb-0">
      <Header />
      
      {/* Support Hero Section */}
      <div className="bg-dark-gradient py-8 md:py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-accent-green px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4 md:mb-6">
            <Headphones size={16} />
            <span className="text-sm font-medium">Support Center</span>
          </div>
          
          <h1 className="text-white text-2xl md:text-4xl font-bold leading-tight mb-4 md:mb-6">
            How can we help you?
          </h1>
          
          <p className="text-gray-300 text-sm md:text-base mb-6 md:mb-8 max-w-2xl mx-auto">
            Get answers to frequently asked questions or contact our support team directly.
          </p>
          
          {/* Search Bar */}
          <div className="bg-white rounded-full p-2 flex items-center shadow-lg max-w-2xl mx-auto">
            <div className="flex-1 flex items-center gap-2 md:gap-3 px-3 md:px-4">
              <Search size={20} className="text-text-secondary" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 md:py-3 border-none outline-none text-sm text-text-primary"
              />
            </div>
            
            <button className="bg-accent-green text-text-primary border-none rounded-full px-4 md:px-6 py-2 md:py-3 text-sm font-semibold cursor-pointer flex items-center gap-2">
              <Search size={16} />
              <span className="hidden md:inline">Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Back to Jobs Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 bg-white border border-border text-text-secondary px-4 py-2 rounded-md text-sm font-medium mb-6 hover:bg-bg-light hover:text-text-primary transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Job Search
        </button>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-border-light text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent-green mb-2">24/7</div>
            <div className="text-sm text-text-secondary">Support Availability</div>
          </div>
          
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-border-light text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent-green mb-2">&lt; 2 min</div>
            <div className="text-sm text-text-secondary">Avg Response Time</div>
          </div>
          
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-border-light text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent-green mb-2">98%</div>
            <div className="text-sm text-text-secondary">Satisfaction Rate</div>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - FAQ & Contact */}
          <div className="lg:col-span-2">
            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-sm border border-border-light p-4 md:p-6 mb-6 md:mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-4">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <HelpCircle size={24} />
                  Frequently Asked Questions
                </h2>
                <div className="text-sm text-text-secondary">
                  {filteredFaqs.length} articles found
                </div>
              </div>

              {/* FAQ Categories */}
              <div className="flex gap-2 mb-4 md:mb-6 overflow-x-auto pb-2 no-scrollbar">
                {faqCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      activeCategory === category.id 
                        ? 'bg-accent-green text-text-primary' 
                        : 'bg-bg-light text-text-secondary hover:bg-border-light'
                    }`}
                  >
                    {category.label}
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      activeCategory === category.id 
                        ? 'bg-black/10' 
                        : 'bg-border'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* FAQ List */}
              <div className="space-y-4">
                {filteredFaqs.map(faq => (
                  <div
                    key={faq.id}
                    className="p-4 rounded-lg border border-border-light hover:border-border transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                      <h3 className="text-base font-semibold text-text-primary">
                        {faq.question}
                      </h3>
                      {faq.popular && (
                        <span className="bg-tag-green-bg text-tag-green-text text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary mb-3">
                      {faq.answer}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-text-light">
                      <span className="bg-bg-light px-2 py-1 rounded-full capitalize">
                        {faq.category}
                      </span>
                      <button className="text-accent-green font-semibold flex items-center gap-1 hover:opacity-80">
                        Read more
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="bg-white rounded-xl shadow-sm border border-border-light p-4 md:p-6">
              <h2 className="text-xl font-bold text-text-primary mb-4 md:mb-6 flex items-center gap-2">
                <MessageCircle size={24} />
                Contact Support Team
              </h2>
              
              <form onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 md:mb-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:border-accent-green focus:ring-1 focus:ring-accent-green outline-none transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:border-accent-green focus:ring-1 focus:ring-accent-green outline-none transition-colors"
                    />
                  </div>
                </div>
                
                <div className="mb-4 md:mb-6">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:border-accent-green focus:ring-1 focus:ring-accent-green outline-none bg-white cursor-pointer"
                  >
                    <option value="">Select a topic</option>
                    <option value="account">Account & Billing</option>
                    <option value="technical">Technical Issues</option>
                    <option value="job-posting">Job Posting</option>
                    <option value="payments">Payment Issues</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-6 md:mb-8">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:border-accent-green focus:ring-1 focus:ring-accent-green outline-none resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-accent-green text-text-primary border-none rounded-lg px-6 py-3 text-sm font-semibold cursor-pointer transition-all hover:bg-accent-green-dark hover:-translate-y-0.5 flex items-center justify-center gap-2"
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
            <div className="bg-white rounded-xl shadow-sm border border-border-light p-4 md:p-6 mb-6 md:mb-8">
              <h2 className="text-lg font-bold text-text-primary mb-4 md:mb-6">
                Get Help Quickly
              </h2>
              
              <div className="space-y-4">
                {supportChannels.map((channel, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-border-light hover:border-border transition-all hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-light rounded-lg flex items-center justify-center text-accent-green">
                        {channel.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-text-primary">
                          {channel.title}
                        </h3>
                        <p className="text-sm text-text-secondary">
                          {channel.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-text-light mb-3 pb-3 border-b border-border-light">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        {channel.availability}
                      </div>
                      <div>
                        {channel.responseTime}
                      </div>
                    </div>
                    
                    <button className="w-full bg-bg-light text-text-primary border border-border rounded-md px-4 py-2 text-sm font-medium cursor-pointer transition-colors hover:bg-white hover:border-accent-green">
                      {channel.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Articles */}
            <div className="bg-white rounded-xl shadow-sm border border-border-light p-4 md:p-6">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="text-lg font-bold text-text-primary">
                  Popular Articles
                </h2>
                <FileText size={20} className="text-text-light" />
              </div>
              
              <div className="space-y-0 border border-border-light rounded-lg overflow-hidden">
                {popularArticles.map((article, index) => (
                  <div
                    key={article.id}
                    className="p-4 border-b border-border-light last:border-b-0 hover:bg-bg-light transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-semibold text-text-primary pr-2">
                        {article.title}
                      </h3>
                      <ExternalLink size={14} className="text-text-light flex-shrink-0" />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-text-light">
                      <span className="bg-bg-light px-2 py-1 rounded-full capitalize">
                        {article.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <span>👁️ {article.views}</span>
                        <span>⏱️ {article.readTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 bg-white text-text-primary border border-border rounded-md px-4 py-3 text-sm font-medium cursor-pointer transition-colors hover:bg-bg-light flex items-center justify-center gap-2">
                View All Articles
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-dark-gradient rounded-xl md:rounded-2xl p-6 md:p-8 text-center mt-8 md:mt-12">
          <CheckCircle size={48} className="text-accent-green mx-auto mb-4 md:mb-6" />
          <h2 className="text-white text-xl md:text-2xl font-bold mb-3 md:mb-4">
            Still need help?
          </h2>
          <p className="text-gray-300 text-sm md:text-base mb-6 md:mb-8 max-w-2xl mx-auto">
            Our dedicated support team is here to help you succeed on ProjectX.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-accent-green text-text-primary border-none rounded-lg px-6 py-3 text-sm font-semibold cursor-pointer transition-all hover:bg-accent-green-dark hover:-translate-y-0.5">
              Contact Support
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-white/10 text-white border border-white/20 rounded-lg px-6 py-3 text-sm font-semibold cursor-pointer transition-all hover:bg-white/20 hover:-translate-y-0.5"
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