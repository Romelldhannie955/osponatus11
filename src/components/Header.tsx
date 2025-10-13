import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bot } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="fixed top-0 w-full bg-soft-white/95 dark:bg-navy-blue/95 backdrop-blur-sm border-b border-slate-gray/10 z-50 transition-colors duration-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-lg bg-vibrant-teal/10 group-hover:bg-vibrant-teal/20 transition-colors duration-200">
              <Bot className="h-6 w-6 text-vibrant-teal" />
            </div>
            <span className="text-xl font-bold text-navy-blue dark:text-white">
              Osponatus
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-vibrant-teal bg-vibrant-teal/10'
                    : 'text-slate-gray dark:text-white hover:text-vibrant-teal hover:bg-vibrant-teal/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <DarkModeToggle />
            <Link
              to="/contact"
              className="bg-vibrant-teal hover:bg-vibrant-teal/90 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <DarkModeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-slate-gray dark:text-white hover:text-vibrant-teal transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-soft-white dark:bg-navy-blue border-t border-slate-gray/10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-vibrant-teal bg-vibrant-teal/10'
                      : 'text-slate-gray dark:text-white hover:text-vibrant-teal hover:bg-vibrant-teal/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="block w-full bg-vibrant-teal hover:bg-vibrant-teal/90 text-white px-3 py-2 rounded-lg font-medium text-center transition-colors duration-200 mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;