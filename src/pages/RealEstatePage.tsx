import React from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, BedDouble, Bath, Square, Filter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const properties = [
  {
    id: 1,
    title: "Luxury 5-Bedroom Villa",
    location: "Banana Island, Lagos",
    price: "₦850,000,000",
    beds: 5,
    baths: 6,
    sqft: "1,200",
    type: "Residential",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Modern Waterfront Apartment",
    location: "Eko Atlantic, Lagos",
    price: "₦450,000,000",
    beds: 3,
    baths: 4,
    sqft: "450",
    type: "Residential",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Premium Office Complex",
    location: "Maitama, Abuja",
    price: "₦1,200,000,000",
    beds: 0,
    baths: 10,
    sqft: "5,000",
    type: "Commercial",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Contemporary 4-Bedroom Terrace",
    location: "Lekki Phase 1, Lagos",
    price: "₦180,000,000",
    beds: 4,
    baths: 5,
    sqft: "350",
    type: "Residential",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
  }
];

export default function RealEstatePage() {
  return (
    <div className="pt-20">
      {/* Search Header */}
      <section className="bg-secondary py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Find Your <span className="text-primary italic">Dream</span> Property</h1>
            <p className="text-white/60">Exclusive listings in Nigeria's most prestigious neighborhoods.</p>
          </div>

          <div className="glass p-4 rounded-2xl max-w-5xl mx-auto flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" size={20} />
              <input 
                type="text" 
                placeholder="Search by location, property name..." 
                className="w-full pl-12 pr-4 py-4 bg-white rounded-xl text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex gap-4">
              <select className="bg-white px-6 py-4 rounded-xl text-secondary font-medium focus:outline-none">
                <option>Property Type</option>
                <option>Residential</option>
                <option>Commercial</option>
              </select>
              <button className="btn-primary flex items-center space-x-2 px-8">
                <Filter size={18} />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-display font-bold mb-2">Featured Listings</h2>
              <p className="text-secondary/60">Handpicked properties just for you.</p>
            </div>
            <div className="flex space-x-4">
              <button className="text-sm font-bold text-primary hover:underline">View All</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop, i) => (
              <motion.div 
                key={prop.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-primary/5 hover:shadow-2xl transition-all"
              >
                <Link to={`/property/${prop.id}`} className="block relative h-64 overflow-hidden">
                  <img 
                    src={prop.image} 
                    alt={prop.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    {prop.type}
                  </div>
                  <div className="absolute bottom-4 left-4 text-white font-display font-bold text-xl drop-shadow-lg">
                    {prop.price}
                  </div>
                </Link>
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                    {prop.title}
                  </h3>
                  <div className="flex items-center text-secondary/60 text-sm mb-6">
                    <MapPin size={14} className="mr-1" />
                    {prop.location}
                  </div>
                  <div className="flex justify-between items-center pt-6 border-t border-primary/10">
                    <div className="flex space-x-4">
                      {prop.beds > 0 && (
                        <div className="flex items-center text-xs text-secondary/70">
                          <BedDouble size={16} className="mr-1 text-primary" />
                          {prop.beds}
                        </div>
                      )}
                      <div className="flex items-center text-xs text-secondary/70">
                        <Bath size={16} className="mr-1 text-primary" />
                        {prop.baths}
                      </div>
                      <div className="flex items-center text-xs text-secondary/70">
                        <Square size={16} className="mr-1 text-primary" />
                        {prop.sqft} m²
                      </div>
                    </div>
                    <Link to={`/property/${prop.id}`} className="text-primary hover:translate-x-1 transition-transform">
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
