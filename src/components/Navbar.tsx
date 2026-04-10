import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Sparkles, User, LogOut } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'About', path: '/about', icon: Home },
  { name: 'Cleaning', path: '/cleaning', icon: Sparkles },
  { name: 'Real Estate', path: '/real-estate', icon: Home },
  { name: 'Contact', path: '/contact', icon: User },
  { name: 'CMS', path: '/admin/cms', icon: User },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="https://ais-dev-4f5wuijwhxhi2tuo2bq2cn-41192636823.europe-west3.run.app/logo.png" 
                alt="WinnyRay Logo" 
                className="h-12 w-auto"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback if image fails
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden">
                <span className="text-2xl font-display font-bold gold-gradient bg-clip-text text-transparent">
                  WINNYRAY
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-bold gold-gradient bg-clip-text text-transparent leading-none">
                  WINNYRAY
                </span>
                <span className="hidden sm:block text-[10px] font-medium tracking-[0.2em] text-secondary/60 uppercase">
                  Nigeria Limited
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.path ? "text-primary" : "text-secondary/70"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/login" className="btn-primary py-2 px-6 text-sm">
              Client Portal
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary hover:text-primary transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-primary/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-4 rounded-md text-base font-medium",
                    location.pathname === item.path ? "bg-primary/10 text-primary" : "text-secondary/70"
                  )}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center btn-primary"
                >
                  Client Portal
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
