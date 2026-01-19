// components/MessagesModal.tsx (simplified)
import React, { useState } from 'react';
import { X, Send, Paperclip, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface MessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  otherUser: {
    id: string;
    name: string;
    role: string;
    avatarInitials: string;
  };
}

const MessagesModal: React.FC<MessagesModalProps> = ({ isOpen, onClose, otherUser }) => {
  const { user } = useAuth();
  const { theme } = useTheme();
  
  const [messages, setMessages] = useState([
    { id: 1, senderId: otherUser.id, content: 'Hi there! I saw your proposal and would like to discuss the project further.', timestamp: '10:30 AM', read: true },
    { id: 2, senderId: user?.id, content: 'Hello! Thank you for your interest. I\'m available to chat anytime.', timestamp: '10:32 AM', read: true },
    { id: 3, senderId: otherUser.id, content: 'Great! Can we schedule a call tomorrow at 2 PM?', timestamp: '10:33 AM', read: false },
  ]);
  
  const [newMessage, setNewMessage] = useState('');

  if (!isOpen) return null;

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: messages.length + 1,
      senderId: user?.id,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className={`relative w-full max-w-2xl h-[600px] rounded-2xl shadow-xl flex flex-col ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        }`} onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div className={`px-6 py-4 border-b ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {otherUser.avatarInitials}
                </div>
                <div>
                  <h2 className={`font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {otherUser.name}
                  </h2>
                  <div className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {otherUser.role === 'client' ? 'Client' : 'Freelancer'}
                  </div>
                </div>
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

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] rounded-2xl p-3 ${
                  msg.senderId === user?.id
                    ? theme === 'dark'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white'
                    : theme === 'dark'
                      ? 'bg-gray-800 text-gray-300'
                      : 'bg-gray-100 text-gray-900'
                }`}>
                  <div>{msg.content}</div>
                  <div className={`text-xs mt-1 ${
                    msg.senderId === user?.id
                      ? 'text-blue-200'
                      : theme === 'dark'
                        ? 'text-gray-500'
                        : 'text-gray-500'
                  }`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className={`p-4 border-t ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex gap-2">
              <button className={`p-2 rounded-lg ${
                theme === 'dark'
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                <Paperclip size={20} />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className={`flex-1 px-3 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className={`p-2 rounded-lg transition-colors ${
                  !newMessage.trim()
                    ? 'text-gray-500 cursor-not-allowed'
                    : theme === 'dark'
                      ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-900/30'
                      : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                }`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesModal;