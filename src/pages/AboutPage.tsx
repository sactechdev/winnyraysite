import React from 'react';
import { motion } from 'motion/react';
import { useContent } from '@/src/lib/ContentContext';
import { Target, Eye, Award } from 'lucide-react';

export default function AboutPage() {
  const { content, loading } = useContent();

  if (loading) return <div className="pt-40 text-center">Loading...</div>;

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-secondary py-24 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-8">
              {content.about?.title?.split('WinnyRay')[0]}
              <span className="text-primary italic">WinnyRay</span>
              {content.about?.title?.split('WinnyRay')[1]}
            </h1>
            <p className="text-xl text-white/60 leading-relaxed">
              {content.about?.content}
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-12 rounded-3xl border border-primary/10 shadow-xl"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                <Target size={32} />
              </div>
              <h3 className="text-3xl font-display font-bold mb-6">Our Mission</h3>
              <p className="text-secondary/60 text-lg leading-relaxed">
                {content.about?.mission}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-12 rounded-3xl border border-primary/10 shadow-xl"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                <Eye size={32} />
              </div>
              <h3 className="text-3xl font-display font-bold mb-6">Our Vision</h3>
              <p className="text-secondary/60 text-lg leading-relaxed">
                {content.about?.vision}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-24 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <img 
                src={content.about?.image} 
                alt="WinnyRay Office" 
                className="rounded-3xl shadow-2xl w-full object-cover aspect-video"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl font-display font-bold">Excellence in <span className="text-primary italic">Service</span></h2>
              <p className="text-secondary/60 text-lg leading-relaxed">
                Based in Kano, WinnyRay Nigeria Limited has built a reputation for delivering high-quality professional cleaning and real estate services. Our team of experts is dedicated to ensuring that every client receives personalized attention and exceptional results.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-3xl font-display font-bold text-primary mb-2">100%</h4>
                  <p className="text-xs font-bold uppercase tracking-widest text-secondary/40">Client Satisfaction</p>
                </div>
                <div>
                  <h4 className="text-3xl font-display font-bold text-primary mb-2">24/7</h4>
                  <p className="text-xs font-bold uppercase tracking-widest text-secondary/40">Support Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
