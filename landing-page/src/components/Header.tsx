import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';
// import { openVoiceChat } from '../lib/chatWidget';
import LeoLogo from '../assets/Leo_logo_round.png';

interface HeaderProps {
  onStartVoiceDemo?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onStartVoiceDemo }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img 
              src={LeoLogo}
              alt="Leo AI Voice Agent Logo" 
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-xl font-bold text-[#1E293B]">Leo Voice Agent</h1>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {isHomePage ? (
              <a href="#how-it-works" className="text-[#1E293B] hover:text-[#38BDF8] transition-colors">
                How It Works
              </a>
            ) : (
              <Link to="/#how-it-works" className="text-[#1E293B] hover:text-[#38BDF8] transition-colors">
                How It Works
              </Link>
            )}
            
            {isHomePage ? (
              <a href="#testimonials" className="text-[#1E293B] hover:text-[#38BDF8] transition-colors">
                Testimonials
              </a>
            ) : (
              <Link to="/#testimonials" className="text-[#1E293B] hover:text-[#38BDF8] transition-colors">
                Testimonials
              </Link>
            )}
            
            {isHomePage ? (
              <a href="#faq" className="text-[#1E293B] hover:text-[#38BDF8] transition-colors">
                FAQ
              </a>
            ) : (
              <Link to="/#faq" className="text-[#1E293B] hover:text-[#38BDF8] transition-colors">
                FAQ
              </Link>
            )}
            
            <Link to="/login" className="text-[#1E293B] hover:text-[#38BDF8] transition-colors">
              Login
            </Link>
          </nav>

          <button
            onClick={onStartVoiceDemo || (() => alert('Voice demo not available'))}
            className="bg-[#F7EF00] text-[#1E293B] px-6 py-2 rounded-full font-semibold hover:bg-[#F7EF00]/90 transition-all duration-200 hover:scale-105 flex items-center space-x-2"
          >
            <Phone className="w-4 h-4" />
            <span>Try Leo Free</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;