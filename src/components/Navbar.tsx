import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Sparkles, User, LogOut, Settings } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useContent } from '@/src/lib/ContentContext';
import { supabase } from '@/src/lib/supabase';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'About', path: '/about', icon: Home },
  { name: 'Cleaning', path: '/cleaning', icon: Sparkles },
  { name: 'Real Estate', path: '/real-estate', icon: Home },
  { name: 'Contact', path: '/contact', icon: User },
];

export default function Navbar() {
  const { content } = useContent();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    async function checkAdmin() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        const isAdminEmail = ['sactechcomputers@gmail.com', 'sheriffdeenalade@gmail.com'].includes(session.user.email || '');
        setIsAdmin(profile?.role === 'admin' || isAdminEmail);
      } else {
        setIsAdmin(false);
      }
    }
    checkAdmin();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        checkAdmin();
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src={content.logo_url} 
                alt="WinnyRay Logo" 
                className="h-12 w-auto"
                referrerPolicy="no-referrer"
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
            {isAdmin && (
              <Link
                to="/admin"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === "/admin" ? "text-primary" : "text-secondary/70"
                )}
              >
                Admin CMS
              </Link>
            )}
            <Link to="/booking" className="btn-primary py-2 px-6 text-sm">
              Request Quote
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
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-4 rounded-md text-base font-medium",
                    location.pathname === "/admin" ? "bg-primary/10 text-primary" : "text-secondary/70"
                  )}
                >
                  <Settings size={20} />
                  <span>Admin CMS</span>
                </Link>
              )}
              <div className="pt-4">
                <Link
                  to="/booking"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center btn-primary"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
