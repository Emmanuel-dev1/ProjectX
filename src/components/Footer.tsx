import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="dark-bg-mouve border-t border-border-light py-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center gap-4">
          {/* Social Media Icons */}
          <div className="flex items-center gap-6">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-light hover:text-text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-light hover:text-text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-light hover:text-text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-light hover:text-text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
          
          {/* Copyright */}
          <div className="text-sm text-text-light text-center">
            © {currentYear} FreelanceHub. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;