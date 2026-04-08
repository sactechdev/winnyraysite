import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Home, Shield, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920" 
            alt="Luxury Home" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6">
              Excellence Redefined
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-8">
              Elevating Your <span className="text-primary italic">Lifestyle</span> in Nigeria
            </h1>
            <p className="text-xl text-white/70 mb-10 leading-relaxed">
              WinnyRay Nigeria Limited provides bespoke cleaning solutions and premium real estate services tailored for the discerning client.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/cleaning" className="btn-primary flex items-center justify-center space-x-2 group">
                <span>Cleaning Services</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/real-estate" className="btn-outline border-white text-white hover:bg-white hover:text-secondary flex items-center justify-center space-x-2">
                <span>Real Estate</span>
                <Home size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dual Service Showcase */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Cleaning Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=1000" 
                alt="Professional Cleaning" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <Sparkles className="text-primary mb-4" size={40} />
                <h3 className="text-3xl font-display font-bold text-white mb-4">Professional Cleaning</h3>
                <p className="text-white/70 mb-6">From residential deep cleans to commercial maintenance, we bring sparkle to your space.</p>
                <Link to="/cleaning" className="inline-flex items-center text-primary font-bold hover:underline">
                  Explore Services <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </motion.div>

            {/* Real Estate Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000" 
                alt="Luxury Real Estate" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <Home className="text-primary mb-4" size={40} />
                <h3 className="text-3xl font-display font-bold text-white mb-4">Premium Real Estate</h3>
                <p className="text-white/70 mb-6">Discover exclusive properties in Lagos, Abuja, and beyond. Your dream home awaits.</p>
                <Link to="/real-estate" className="inline-flex items-center text-primary font-bold hover:underline">
                  Browse Listings <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-secondary text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">The WinnyRay Standard</h2>
            <p className="text-white/60 max-w-2xl mx-auto">We combine local expertise with international standards to deliver unparalleled service quality.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Shield, title: "Trusted & Secure", desc: "Fully insured and vetted professionals for your peace of mind." },
              { icon: Star, title: "Premium Quality", desc: "Using only the finest equipment and materials for every job." },
              { icon: Clock, title: "Reliability", desc: "Punctual, efficient, and dedicated to meeting your schedule." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <feature.icon size={48} className="text-primary mx-auto mb-6" />
                <h4 className="text-xl font-display font-bold mb-4">{feature.title}</h4>
                <p className="text-white/50">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
