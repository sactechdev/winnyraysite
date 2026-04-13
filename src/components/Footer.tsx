import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useContent } from '@/src/lib/ContentContext';

export default function Footer() {
  const { content, loading } = useContent();

  if (loading || !content) {
    return (
      <footer className="bg-secondary text-white py-10">
        <div className="max-w-7xl mx-auto px-4 text-center text-white/20">
          Loading footer...
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-secondary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              {content.logo_url && (
                <img 
                  src={content.logo_url} 
                  alt="WinnyRay Logo" 
                  className="h-10 w-auto brightness-0 invert"
                  referrerPolicy="no-referrer"
                />
              )}
              <span className="text-2xl font-display font-bold text-primary">WINNYRAY</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Nigeria's premier provider of professional cleaning and luxury real estate services. 
              Excellence in every detail, integrity in every transaction.
            </p>
            <div className="flex space-x-4">
              <a href={content.social_links?.facebook} className="text-white/40 hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href={content.social_links?.instagram} className="text-white/40 hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href={content.social_links?.twitter} className="text-white/40 hover:text-primary transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-display font-semibold mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link to="/cleaning" className="hover:text-primary transition-colors">Residential Cleaning</Link></li>
              <li><Link to="/cleaning" className="hover:text-primary transition-colors">Commercial Cleaning</Link></li>
              <li><Link to="/real-estate" className="hover:text-primary transition-colors">Property Sales</Link></li>
              <li><Link to="/real-estate" className="hover:text-primary transition-colors">Luxury Rentals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-display font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-display font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary shrink-0" />
                <span>{content.contact_info?.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span>{content.contact_info?.phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span>{content.contact_info?.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 text-center text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} WinnyRay Nigeria Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
