import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Header */}
      <section className="bg-secondary py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display font-bold mb-6"
          >
            Get in <span className="text-primary italic">Touch</span>
          </motion.h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Have questions about our cleaning services or real estate listings? Our team in Kano is ready to assist you.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-display font-bold mb-8">Contact Information</h2>
                <div className="space-y-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Our Office</h4>
                      <p className="text-secondary/60">15 Bravo Close Zungeru by kwakwachi, Kano</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Phone Number</h4>
                      <p className="text-secondary/60">+234 800 WINNYRAY</p>
                      <p className="text-secondary/60">+234 701 234 5678</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Email Address</h4>
                      <p className="text-secondary/60">info@winnyray.com.ng</p>
                      <p className="text-secondary/60">support@winnyray.com.ng</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Working Hours</h4>
                      <p className="text-secondary/60">Mon - Fri: 8:00 AM - 6:00 PM</p>
                      <p className="text-secondary/60">Sat: 9:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="rounded-3xl overflow-hidden h-64 bg-secondary/5 border border-primary/10 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={40} className="text-primary mx-auto mb-2 opacity-20" />
                  <p className="text-secondary/40 font-medium">Google Maps Integration Coming Soon</p>
                  <p className="text-xs text-secondary/30">Kano, Nigeria</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass p-8 md:p-12 rounded-3xl shadow-2xl">
              <h3 className="text-2xl font-display font-bold mb-8">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Full Name</label>
                    <input type="text" className="w-full p-4 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Email Address</label>
                    <input type="email" className="w-full p-4 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Subject</label>
                  <select className="w-full p-4 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none">
                    <option>General Inquiry</option>
                    <option>Cleaning Service Booking</option>
                    <option>Real Estate Inquiry</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Message</label>
                  <textarea className="w-full p-4 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none h-40" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="w-full btn-primary py-4 text-lg flex items-center justify-center space-x-2">
                  <span>Send Message</span>
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
