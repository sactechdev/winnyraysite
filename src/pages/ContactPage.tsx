import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send, ArrowRight, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/src/lib/supabase';

import { useContent } from '@/src/lib/ContentContext';

export default function ContactPage() {
  const { content, loading } = useContent();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  if (loading) return <div className="pt-40 text-center">Loading...</div>;

  const handleQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      client_name: formData.get('name') as string,
      client_phone: formData.get('phone') as string,
      service_type: `Cleaning: ${formData.get('service')}`,
      address: formData.get('location') as string,
      city: 'Kano',
      status: 'pending'
    };

    try {
      const { error } = await supabase.from('bookings').insert([data]);
      if (error) throw error;
      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      console.error('Error submitting quote:', err);
      alert(`Submission Error: ${err.message || 'Please check your connection.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <section className="py-24 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-4xl font-display font-bold mb-6">Need a <span className="text-primary italic">Cleaning Quote</span>?</h2>
              <p className="text-secondary/60 text-lg mb-8 leading-relaxed">
                Looking for professional cleaning services in Kano? Fill out our quick quote request form and our team will get back to you with a personalized estimate within 24 hours.
              </p>
              <ul className="space-y-4">
                {[
                  "Residential & Commercial Expertise",
                  "Trained & Vetted Professionals",
                  "Eco-friendly Cleaning Products",
                  "Flexible Scheduling Options"
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-secondary/80 font-medium">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <Send size={12} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full">
              <div className="glass p-8 md:p-10 rounded-3xl shadow-xl border border-primary/10">
                {isSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} className="text-primary" />
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-2">Quote Requested!</h3>
                    <p className="text-secondary/60 mb-6">We've received your request and will contact you shortly.</p>
                    <button onClick={() => setIsSuccess(false)} className="text-primary font-bold hover:underline">Send another request</button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-display font-bold mb-6">Request a Free Quote</h3>
                    <form onSubmit={handleQuoteSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Full Name</label>
                          <input name="name" required type="text" className="w-full p-3 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none text-sm" placeholder="John Doe" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Phone Number</label>
                          <input name="phone" required type="tel" className="w-full p-3 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none text-sm" placeholder="+234..." />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Service Type</label>
                        <select name="service" required className="w-full p-3 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none text-sm">
                          <option>Residential Cleaning</option>
                          <option>Commercial Cleaning</option>
                          <option>Deep Cleaning</option>
                          <option>Post-Construction</option>
                          <option>Outsourcing Recruitment Services</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Location in Kano</label>
                        <input name="location" required type="text" className="w-full p-3 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none text-sm" placeholder="e.g. Nassarawa, GRA" />
                      </div>
                      <button type="submit" disabled={isSubmitting} className="w-full btn-primary py-3 text-sm font-bold flex items-center justify-center space-x-2 disabled:opacity-50">
                        {isSubmitting ? (
                          <span>Submitting...</span>
                        ) : (
                          <>
                            <span>Get My Quote</span>
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
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
                      <p className="text-secondary/60">{content.contact_info?.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Phone Number</h4>
                      {(content.contact_info?.phone || '').split(',').map((p, i) => (
                        <p key={i} className="text-secondary/60">{p.trim()}</p>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Email Address</h4>
                      <p className="text-secondary/60">{content.contact_info?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Working Hours</h4>
                      <p className="text-secondary/60">{content.contact_info?.working_hours}</p>
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
