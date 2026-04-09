import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Home, Shield, Star, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '@/src/lib/ContentContext';

export default function HomePage() {
  const { content, loading } = useContent();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slides = content.hero_slides.length > 0 ? content.hero_slides : [
    {
      title: "Pristine Spaces, Professional Care",
      subtitle: "Premium Cleaning Services in Kano",
      desc: "Experience the gold standard of cleanliness for your home and office.",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1920",
      link: "/cleaning",
      btnText: "Cleaning Services"
    }
  ];

  React.useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (loading) return <div className="pt-40 text-center">Loading...</div>;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="pt-20">
      {/* Hero Section with Slider */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-secondary">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={slides[currentSlide].image} 
              alt={slides[currentSlide].title} 
              className="w-full h-full object-cover opacity-50"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent"></div>
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6">
                {slides[currentSlide].subtitle}
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-8">
                {slides[currentSlide].title.split(',')[0]} <span className="text-primary italic">{slides[currentSlide].title.split(',')[1] || ''}</span>
              </h1>
              <p className="text-xl text-white/70 mb-10 leading-relaxed">
                {slides[currentSlide].desc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={slides[currentSlide].link} className="btn-primary flex items-center justify-center space-x-2 group">
                  <span>{slides[currentSlide].btnText}</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-secondary flex items-center justify-center space-x-2">
                  <span>Contact Us</span>
                  <Sparkles size={18} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Controls */}
        {slides.length > 1 && (
          <>
            <div className="absolute bottom-10 right-10 z-20 flex space-x-4">
              <button onClick={prevSlide} className="p-3 rounded-full border border-white/20 text-white hover:bg-primary hover:border-primary transition-all">
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextSlide} className="p-3 rounded-full border border-white/20 text-white hover:bg-primary hover:border-primary transition-all">
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
              {slides.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentSlide(i)}
                  className={`w-12 h-1 rounded-full transition-all ${currentSlide === i ? 'bg-primary' : 'bg-white/20'}`}
                />
              ))}
            </div>
          </>
        )}
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
                src={content.services.cleaning[0]?.image || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000"} 
                alt="Professional Cleaning" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <Sparkles className="text-primary mb-4" size={40} />
                <h3 className="text-3xl font-display font-bold text-white mb-4">Professional Cleaning</h3>
                <p className="text-white/70 mb-6">From residential deep cleans to commercial maintenance in Kano, we bring sparkle to your space.</p>
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
                src={content.services.real_estate[0]?.image || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000"} 
                alt="Luxury Real Estate" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <Home className="text-primary mb-4" size={40} />
                <h3 className="text-3xl font-display font-bold text-white mb-4">Premium Real Estate</h3>
                <p className="text-white/70 mb-6">Discover exclusive properties in Kano and beyond. Your dream home awaits with WinnyRay.</p>
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
            <p className="text-white/60 max-w-2xl mx-auto">We combine local Kano expertise with international standards to deliver unparalleled service quality.</p>
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
