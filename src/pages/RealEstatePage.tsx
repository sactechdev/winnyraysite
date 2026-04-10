import React from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Home, ArrowRight, Building2, Key, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RealEstatePage() {
  const enquiryTypes = [
    {
      title: "Property Acquisition",
      icon: Home,
      desc: "Enquire about buying premium residential or commercial properties in Kano and beyond.",
      link: "/booking?category=real-estate&type=acquisition"
    },
    {
      title: "Apartment Renting",
      icon: Key,
      desc: "Find your next luxury home or office space with our exclusive rental assistance.",
      link: "/booking?category=real-estate&type=renting"
    },
    {
      title: "Housing Enquiries",
      icon: HelpCircle,
      desc: "General questions about the real estate market, land acquisition, or property management.",
      link: "/booking?category=real-estate&type=general"
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-secondary py-24 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-display font-bold mb-8"
            >
              Premium <span className="text-primary italic">Real Estate</span> Solutions
            </motion.h1>
            <p className="text-xl text-white/60 leading-relaxed mb-12">
              WinnyRay Nigeria Limited is your gateway to exclusive properties in Kano. While we are currently updating our digital listings, our team is ready to assist you with all your property needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/booking?category=real-estate" className="btn-primary py-4 px-10 text-lg">
                Book an Enquiry Session
              </Link>
              <Link to="/contact" className="btn-outline py-4 px-10 text-lg border-white text-white hover:bg-white hover:text-secondary">
                Contact Representative
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 hidden lg:block">
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000" 
            alt="Luxury Real Estate" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Enquiry Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">How We Can <span className="text-primary italic">Help You</span></h2>
            <p className="text-secondary/60 max-w-2xl mx-auto">Select a category below to start your enquiry process with our professional representatives.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {enquiryTypes.map((type, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass p-10 rounded-3xl border border-primary/10 hover:border-primary/30 transition-all group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
                  <type.icon size={32} />
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">{type.title}</h3>
                <p className="text-secondary/60 mb-8 leading-relaxed">
                  {type.desc}
                </p>
                <Link to={type.link} className="text-primary font-bold flex items-center group-hover:translate-x-2 transition-transform">
                  Start Enquiry <ArrowRight size={18} className="ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-24 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800" 
                  alt="Consultation" 
                  className="rounded-3xl shadow-2xl relative z-10"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
              </div>
            </div>
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl font-display font-bold">Personalized <span className="text-primary italic">Property</span> Guidance</h2>
              <p className="text-secondary/60 text-lg leading-relaxed">
                At WinnyRay, we believe in a relationship-first approach to real estate. Our representatives in Kano provide one-on-one sessions to understand your specific needs, whether you're looking for a new home, an investment property, or a commercial space.
              </p>
              <div className="space-y-4">
                {[
                  "Expert local market knowledge in Kano State",
                  "Access to off-market luxury listings",
                  "Comprehensive legal and documentation support",
                  "Transparent and professional consultation"
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                      <ArrowRight size={12} />
                    </div>
                    <span className="font-medium text-secondary/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
