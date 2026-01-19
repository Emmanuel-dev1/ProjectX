// pages/BillingPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  CreditCard,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Eye,
  Plus,
  Trash2,
  Edit,
  Shield,
  Lock,
  RefreshCw,
  TrendingUp,
  BarChart3,
  Receipt,
  Bell
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const BillingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme } = useTheme();

  // Payment methods state
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'visa', last4: '4242', expiry: '12/25', isDefault: true, name: 'John Doe' },
    { id: 2, type: 'mastercard', last4: '8888', expiry: '08/24', isDefault: false, name: 'John Doe' },
    { id: 3, type: 'paypal', last4: '', expiry: '', isDefault: false, name: 'john.doe@email.com' },
  ]);

  // Billing history state
  const [billingHistory, setBillingHistory] = useState([
    { id: 1, date: '2024-01-15', description: 'Premium Plan Subscription', amount: 49.99, status: 'paid', invoiceId: 'INV-2024-001' },
    { id: 2, date: '2023-12-15', description: 'Premium Plan Subscription', amount: 49.99, status: 'paid', invoiceId: 'INV-2023-012' },
    { id: 3, date: '2023-11-15', description: 'Premium Plan Subscription', amount: 49.99, status: 'paid', invoiceId: 'INV-2023-011' },
    { id: 4, date: '2023-10-15', description: 'Premium Plan Subscription', amount: 49.99, status: 'refunded', invoiceId: 'INV-2023-010' },
    { id: 5, date: '2023-09-15', description: 'Basic to Premium Upgrade', amount: 29.99, status: 'paid', invoiceId: 'INV-2023-009' },
  ]);

  // Current plan state
  const [currentPlan, setCurrentPlan] = useState({
    name: 'Premium Plan',
    price: 49.99,
    period: 'month',
    features: [
      'Up to 20 active job postings',
      'Advanced talent matching',
      'Priority support',
      'Analytics dashboard',
      'Custom branding',
      'API access'
    ],
    nextBillingDate: '2024-02-15',
    status: 'active'
  });

  // Usage statistics
  const [usageStats, setUsageStats] = useState({
    jobsPosted: 8,
    jobsLimit: 20,
    talentViews: 1250,
    messagesSent: 342,
    storageUsed: 2.5,
    storageLimit: 10
  });

  // New payment method form state
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: '',
    isDefault: false
  });

  // Handle card input formatting
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/[^0-9]/g, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  // Handle form changes
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'cardNumber') {
      setNewCard(prev => ({ ...prev, [name]: formatCardNumber(value) }));
    } else if (name === 'expiry') {
      setNewCard(prev => ({ ...prev, [name]: formatExpiry(value) }));
    } else if (name === 'cvc') {
      const formattedValue = value.replace(/\D/g, '').slice(0, 4);
      setNewCard(prev => ({ ...prev, [name]: formattedValue }));
    } else if (type === 'checkbox') {
      setNewCard(prev => ({ ...prev, [name]: checked }));
    } else {
      setNewCard(prev => ({ ...prev, [name]: value }));
    }
  };

  // Add new payment method
  const handleAddCard = () => {
    if (!newCard.cardNumber || !newCard.expiry || !newCard.cvc || !newCard.name) {
      alert('Please fill all required fields');
      return;
    }

    // Validate card number length
    const cleanCardNumber = newCard.cardNumber.replace(/\s/g, '');
    if (cleanCardNumber.length < 15 || cleanCardNumber.length > 16) {
      alert('Please enter a valid card number');
      return;
    }

    // Validate expiry date
    const [month, year] = newCard.expiry.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    
    if (parseInt(month) < 1 || parseInt(month) > 12) {
      alert('Please enter a valid expiry month (01-12)');
      return;
    }
    
    if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
      alert('Card has expired');
      return;
    }

    const last4 = cleanCardNumber.slice(-4);
    const cardType = cleanCardNumber.startsWith('4') ? 'visa' : 
                    cleanCardNumber.startsWith('5') ? 'mastercard' : 'card';

    const newPaymentMethod = {
      id: paymentMethods.length + 1,
      type: cardType,
      last4,
      expiry: newCard.expiry,
      isDefault: newCard.isDefault,
      name: newCard.name
    };

    // If new card is default, update others
    if (newCard.isDefault) {
      setPaymentMethods(prev => 
        prev.map(method => ({ ...method, isDefault: false }))
      );
    }

    setPaymentMethods(prev => [...prev, newPaymentMethod]);
    setNewCard({
      cardNumber: '',
      expiry: '',
      cvc: '',
      name: '',
      isDefault: false
    });
    setShowAddCard(false);
    alert('Payment method added successfully!');
  };

  // Set default payment method
  const handleSetDefault = (id: number) => {
    setPaymentMethods(prev =>
      prev.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
    alert('Default payment method updated!');
  };

  // Remove payment method
  const handleRemoveMethod = (id: number) => {
    const method = paymentMethods.find(m => m.id === id);
    if (method?.isDefault) {
      alert('Cannot remove default payment method. Please set another method as default first.');
      return;
    }
    
    if (window.confirm('Are you sure you want to remove this payment method?')) {
      setPaymentMethods(prev => prev.filter(method => method.id !== id));
      alert('Payment method removed successfully!');
    }
  };

  // Download invoice
  const handleDownloadInvoice = (invoiceId: string) => {
    alert(`Downloading invoice: ${invoiceId}`);
    // In a real app, this would download the invoice PDF
  };

  // View invoice details
  const handleViewInvoice = (invoiceId: string) => {
    alert(`Viewing invoice details: ${invoiceId}`);
    // In a real app, this would open invoice details
  };

  // Get status icon and color
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return { icon: <CheckCircle size={16} />, color: 'text-green-500', bg: 'bg-green-500/10' };
      case 'pending':
        return { icon: <Clock size={16} />, color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
      case 'refunded':
        return { icon: <RefreshCw size={16} />, color: 'text-blue-500', bg: 'bg-blue-500/10' };
      case 'failed':
        return { icon: <XCircle size={16} />, color: 'text-red-500', bg: 'bg-red-500/10' };
      default:
        return { icon: <Clock size={16} />, color: 'text-gray-500', bg: 'bg-gray-500/10' };
    }
  };

  // Get card icon
  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return <div className="w-10 h-7 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>;
      case 'mastercard':
        return <div className="w-10 h-7 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">MC</div>;
      case 'paypal':
        return <div className="w-10 h-7 bg-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">PP</div>;
      default:
        return <CreditCard size={24} className="text-gray-400" />;
    }
  };

  // Calculate usage percentage
  const calculateUsagePercentage = (used: number, limit: number) => {
    return Math.min((used / limit) * 100, 100);
  };

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
              Billing & Payments
            </h1>
            
            <div className="w-10">{/* Spacer */}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Current Plan & Usage */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Plan Card */}
            <div className={`rounded-2xl shadow-lg overflow-hidden ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            }`}>
              <div className={`px-6 py-5 border-b ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <h2 className={`text-xl font-bold flex items-center gap-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  <CreditCard size={20} />
                  Current Plan
                </h2>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className={`text-2xl font-bold mb-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {currentPlan.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Next billing date:
                      </span>
                      <span className={`font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {new Date(currentPlan.nextBillingDate).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-3xl font-bold mb-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      ${currentPlan.price}<span className="text-lg">/{currentPlan.period}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      currentPlan.status === 'active'
                        ? theme === 'dark'
                          ? 'bg-green-900/30 text-green-300'
                          : 'bg-green-100 text-green-700'
                        : theme === 'dark'
                          ? 'bg-yellow-900/30 text-yellow-300'
                          : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {currentPlan.status.charAt(0).toUpperCase() + currentPlan.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Plan Features */}
                <div className="mb-6">
                  <h4 className={`text-lg font-semibold mb-3 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Plan Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium border transition-colors duration-200 ${
                    theme === 'dark'
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                  }`}>
                    <Edit size={18} />
                    Change Plan
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors duration-200">
                    <XCircle size={18} />
                    Cancel Subscription
                  </button>
                </div>
              </div>
            </div>

            {/* Usage Statistics */}
            <div className={`rounded-2xl shadow-lg overflow-hidden ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            }`}>
              <div className={`px-6 py-5 border-b ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <h2 className={`text-xl font-bold flex items-center gap-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  <BarChart3 size={20} />
                  Usage Statistics
                </h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Job Postings */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Job Postings
                      </span>
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {usageStats.jobsPosted} / {usageStats.jobsLimit}
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${calculateUsagePercentage(usageStats.jobsPosted, usageStats.jobsLimit)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Storage */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Storage Used
                      </span>
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {usageStats.storageUsed}GB / {usageStats.storageLimit}GB
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div 
                        className="h-full bg-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${calculateUsagePercentage(usageStats.storageUsed, usageStats.storageLimit)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="col-span-1 md:col-span-2">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div className={`text-center p-4 rounded-xl ${
                        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                      }`}>
                        <div className={`text-2xl font-bold mb-1 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {usageStats.talentViews.toLocaleString()}
                        </div>
                        <div className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Talent Profile Views
                        </div>
                      </div>
                      
                      <div className={`text-center p-4 rounded-xl ${
                        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                      }`}>
                        <div className={`text-2xl font-bold mb-1 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {usageStats.messagesSent}
                        </div>
                        <div className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Messages Sent
                        </div>
                      </div>
                      
                      <div className={`text-center p-4 rounded-xl ${
                        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                      }`}>
                        <div className={`text-2xl font-bold mb-1 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {calculateUsagePercentage(usageStats.jobsPosted, usageStats.jobsLimit).toFixed(0)}%
                        </div>
                        <div className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Plan Usage
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing History */}
            <div className={`rounded-2xl shadow-lg overflow-hidden ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            }`}>
              <div className={`px-6 py-5 border-b ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <h2 className={`text-xl font-bold flex items-center gap-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  <Receipt size={20} />
                  Billing History
                </h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${
                      theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      <th className={`text-left py-3 px-6 text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>Date</th>
                      <th className={`text-left py-3 px-6 text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>Description</th>
                      <th className={`text-left py-3 px-6 text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>Amount</th>
                      <th className={`text-left py-3 px-6 text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>Status</th>
                      <th className={`text-left py-3 px-6 text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingHistory.map((item) => {
                      const status = getStatusIcon(item.status);
                      return (
                        <tr key={item.id} className={`border-b ${
                          theme === 'dark' ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'
                        }`}>
                          <td className={`py-3 px-6 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {new Date(item.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </td>
                          <td className={`py-3 px-6 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            <div>
                              <div className="font-medium">{item.description}</div>
                              <div className={`text-sm ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                Invoice: {item.invoiceId}
                              </div>
                            </div>
                          </td>
                          <td className={`py-3 px-6 font-medium ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            ${item.amount.toFixed(2)}
                          </td>
                          <td className="py-3 px-6">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                              {status.icon}
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-6">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDownloadInvoice(item.invoiceId)}
                                className={`p-1.5 rounded transition-colors ${
                                  theme === 'dark'
                                    ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
                                }`}
                                title="Download Invoice"
                              >
                                <Download size={16} />
                              </button>
                              <button
                                onClick={() => handleViewInvoice(item.invoiceId)}
                                className={`p-1.5 rounded transition-colors ${
                                  theme === 'dark'
                                    ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
                                }`}
                                title="View Details"
                              >
                                <Eye size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              {billingHistory.length === 0 && (
                <div className={`py-12 text-center ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <Receipt size={48} className="mx-auto mb-4 opacity-50" />
                  <div className="text-lg font-medium mb-2">No billing history yet</div>
                  <div className="text-sm">Your billing history will appear here</div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Payment Methods */}
          <div className="space-y-8">
            {/* Payment Methods Card */}
            <div className={`rounded-2xl shadow-lg overflow-hidden ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            }`}>
              <div className={`px-6 py-5 border-b ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <h2 className={`text-xl font-bold flex items-center gap-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  <CreditCard size={20} />
                  Payment Methods
                </h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`p-4 rounded-xl border ${
                        method.isDefault
                          ? theme === 'dark'
                            ? 'border-accent-green bg-green-900/10'
                            : 'border-accent-green bg-green-50'
                          : theme === 'dark'
                            ? 'border-gray-700 bg-gray-800/50'
                            : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getCardIcon(method.type)}
                          <div>
                            <div className={`font-medium ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                              {method.type.charAt(0).toUpperCase() + method.type.slice(1)}
                              {method.last4 && ` •••• ${method.last4}`}
                            </div>
                            <div className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {method.name}
                              {method.expiry && ` • Expires ${method.expiry}`}
                            </div>
                          </div>
                        </div>
                        {method.isDefault && (
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            theme === 'dark'
                              ? 'bg-green-900/30 text-green-300'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            Default
                          </span>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        {!method.isDefault && (
                          <button
                            onClick={() => handleSetDefault(method.id)}
                            className={`flex-1 text-center py-1.5 text-xs font-medium rounded transition-colors ${
                              theme === 'dark'
                                ? 'text-gray-300 hover:text-white hover:bg-gray-700 border border-gray-600'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200 border border-gray-300'
                            }`}
                          >
                            Set as Default
                          </button>
                        )}
                        <button
                          onClick={() => handleRemoveMethod(method.id)}
                          className={`p-1.5 rounded transition-colors ${
                            theme === 'dark'
                              ? 'text-gray-400 hover:text-red-400 hover:bg-gray-800'
                              : 'text-gray-500 hover:text-red-600 hover:bg-gray-200'
                          }`}
                          title="Remove"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add New Card Form */}
                  {showAddCard ? (
                    <div className={`p-4 rounded-xl border ${
                      theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-50'
                    }`}>
                      <h3 className={`font-medium mb-3 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        Add New Card
                      </h3>
                      
                      <div className="space-y-3">
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Card Number
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={newCard.cardNumber}
                            onChange={handleCardChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            className={`w-full px-3 py-2 rounded-lg border ${
                              theme === 'dark'
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                            }`}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className={`block text-sm font-medium mb-1 ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              Expiry (MM/YY)
                            </label>
                            <input
                              type="text"
                              name="expiry"
                              value={newCard.expiry}
                              onChange={handleCardChange}
                              placeholder="MM/YY"
                              maxLength={5}
                              className={`w-full px-3 py-2 rounded-lg border ${
                                theme === 'dark'
                                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                              }`}
                            />
                          </div>
                          <div>
                            <label className={`block text-sm font-medium mb-1 ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              CVC
                            </label>
                            <input
                              type="text"
                              name="cvc"
                              value={newCard.cvc}
                              onChange={handleCardChange}
                              placeholder="123"
                              maxLength={4}
                              className={`w-full px-3 py-2 rounded-lg border ${
                                theme === 'dark'
                                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                              }`}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Name on Card
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={newCard.name}
                            onChange={handleCardChange}
                            placeholder="John Doe"
                            className={`w-full px-3 py-2 rounded-lg border ${
                              theme === 'dark'
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                            }`}
                          />
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="isDefault"
                            name="isDefault"
                            checked={newCard.isDefault}
                            onChange={handleCardChange}
                            className="rounded border-gray-300 text-accent-green focus:ring-accent-green"
                          />
                          <label htmlFor="isDefault" className={`text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Set as default payment method
                          </label>
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={handleAddCard}
                            className="flex-1 px-4 py-2 bg-accent-green text-gray-900 rounded-lg font-medium hover:bg-green-400 transition-colors duration-200"
                          >
                            Add Card
                          </button>
                          <button
                            onClick={() => setShowAddCard(false)}
                            className={`px-4 py-2 rounded-lg font-medium border transition-colors duration-200 ${
                              theme === 'dark'
                                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                : 'border-gray-300 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowAddCard(true)}
                      className={`w-full p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors ${
                        theme === 'dark'
                          ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-800/50'
                          : 'border-gray-300 hover:border-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      <Plus size={24} className={
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      } />
                      <span className={`font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Add New Payment Method
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Security & Support Card */}
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
                  Security & Support
                </h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                  }`}>
                    <Lock size={20} className={
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    } />
                  </div>
                  <div>
                    <h3 className={`font-medium mb-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Secure Payments
                    </h3>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      All transactions are encrypted and secure
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                  }`}>
                    <Bell size={20} className={
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    } />
                  </div>
                  <div>
                    <h3 className={`font-medium mb-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Billing Notifications
                    </h3>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Get notified before each billing cycle
                    </p>
                  </div>
                </div>
                
                <button className={`w-full py-3 rounded-lg font-medium border transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                }`}>
                  Contact Support
                </button>
              </div>
            </div>

            {/* Billing Summary */}
            <div className={`rounded-2xl shadow-lg overflow-hidden ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            }`}>
              <div className={`px-6 py-5 border-b ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <h2 className={`text-xl font-bold flex items-center gap-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  <DollarSign size={20} />
                  Billing Summary
                </h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className={`${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Current Plan
                  </span>
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    ${currentPlan.price}/{currentPlan.period}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Next Charge
                  </span>
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    ${currentPlan.price}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Next Billing Date
                  </span>
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {new Date(currentPlan.nextBillingDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <div className="pt-4 border-t border-dashed border-gray-600">
                  <div className="flex justify-between items-center">
                    <span className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Total This Month
                    </span>
                    <span className={`text-xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      ${currentPlan.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;