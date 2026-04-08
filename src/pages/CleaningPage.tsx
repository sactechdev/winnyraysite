import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Home, Building2, Sparkles, Paintbrush, Wind } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    title: "Residential Cleaning",
    icon: Home,
    desc: "Standard, deep, and move-in/out cleaning for your home.",
    features: ["Standard Cleaning", "Deep Cleaning", "Move-in/Out", "Post-Construction"],
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Commercial Cleaning",
    icon: Building2,
    desc: "Professional maintenance for offices, retail, and clinics.",
    features: ["Office Maintenance", "Retail Spaces", "Medical Clinics", "Janitorial Services"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Specialized Services",
    icon: Sparkles,
    desc: "Expert care for upholstery, windows, and post-construction.",
    features: ["Upholstery Cleaning", "Window Cleaning", "Carpet Shampooing", "Fumigation"],
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"
  }
];

export default function CleaningPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-secondary py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display font-bold mb-6"
          >
            Professional <span className="text-primary italic">Cleaning</span> Solutions
          </motion.h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Experience the gold standard of cleanliness. We provide meticulous services for homes and businesses across Nigeria.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {categories.map((cat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl overflow-hidden shadow-xl border border-primary/5 hover:border-primary/20 transition-all"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <cat.icon className="text-primary" size={28} />
                    <h3 className="text-2xl font-display font-bold">{cat.title}</h3>
                  </div>
                  <p className="text-secondary/60 mb-6">{cat.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {cat.features.map((f, j) => (
                      <li key={j} className="flex items-center space-x-2 text-sm text-secondary/80">
                        <CheckCircle2 size={16} className="text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/booking" className="btn-primary w-full text-center">
                    Book Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl font-display font-bold">How It Works</h2>
              <div className="space-y-6">
                {[
                  { step: "01", title: "Book Online", desc: "Select your service, date, and time in seconds." },
                  { step: "02", title: "Expert Match", desc: "We assign a vetted, professional cleaner to your job." },
                  { step: "03", title: "Sparkling Clean", desc: "Enjoy your pristine space and rate our service." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-6">
                    <span className="text-3xl font-display font-bold text-primary/40">{item.step}</span>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-white/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/booking" className="btn-primary inline-flex items-center">
                Get Started <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
            <div className="flex-1 relative">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=800" 
                alt="Cleaning Process" 
                className="rounded-2xl shadow-2xl relative z-10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
