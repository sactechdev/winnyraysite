import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, BedDouble, Bath, Square, Share2, Heart, Calendar, Phone, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { formatCurrency, cn } from '@/src/lib/utils';

// Mock data for a single property
const propertyData = {
  id: 1,
  title: "Luxury 5-Bedroom Villa",
  location: "Banana Island, Lagos",
  price: 850000000,
  beds: 5,
  baths: 6,
  sqft: 1200,
  type: "Residential",
  description: "This architectural masterpiece is located in the heart of Banana Island, Africa's most exclusive neighborhood. Featuring state-of-the-art finishes, an infinity pool, private cinema, and breathtaking views of the Lagos Lagoon.",
  features: ["Infinity Pool", "Private Cinema", "Smart Home Automation", "Lagoon View", "Gym", "24/7 Security"],
  images: [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&q=80&w=1200"
  ],
  agent: {
    name: "WinnyRay Premium",
    phone: "+234 800 WINNYRAY",
    email: "realestate@winnyray.com.ng",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"
  }
};

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [activeImage, setActiveImage] = React.useState(0);

  return (
    <div className="pt-20 bg-white">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/real-estate" className="flex items-center text-secondary/60 hover:text-primary transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to Listings
        </Link>
        <div className="flex space-x-4">
          <button className="p-2 rounded-full hover:bg-secondary/5 transition-colors"><Share2 size={20} /></button>
          <button className="p-2 rounded-full hover:bg-secondary/5 transition-colors"><Heart size={20} /></button>
        </div>
      </div>

      {/* Image Gallery */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[600px]">
          <div className="lg:col-span-3 rounded-2xl overflow-hidden shadow-xl">
            <img 
              src={propertyData.images[activeImage]} 
              alt="Property" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="hidden lg:flex flex-col gap-4 overflow-y-auto pr-2">
            {propertyData.images.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImage(i)}
                className={cn(
                  "rounded-xl overflow-hidden h-32 border-2 transition-all",
                  activeImage === i ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                )}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {propertyData.type}
                </span>
                <span className="text-secondary/40">•</span>
                <span className="text-secondary/60 text-sm flex items-center">
                  <MapPin size={14} className="mr-1" /> {propertyData.location}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">{propertyData.title}</h1>
              <div className="text-3xl font-display font-bold text-primary mb-8">
                {formatCurrency(propertyData.price)}
              </div>
              
              <div className="flex flex-wrap gap-8 py-8 border-y border-primary/10">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                    <BedDouble size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-secondary/40 uppercase">Bedrooms</p>
                    <p className="font-bold">{propertyData.beds}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                    <Bath size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-secondary/40 uppercase">Bathrooms</p>
                    <p className="font-bold">{propertyData.baths}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                    <Square size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-secondary/40 uppercase">Area</p>
                    <p className="font-bold">{propertyData.sqft} m²</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-display font-bold mb-6">Description</h3>
              <p className="text-secondary/70 leading-relaxed text-lg">
                {propertyData.description}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-display font-bold mb-6">Key Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {propertyData.features.map((f, i) => (
                  <div key={i} className="flex items-center space-x-3 p-4 rounded-xl bg-secondary/5 border border-primary/5">
                    <CheckCircle2 size={18} className="text-primary" />
                    <span className="text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar / Contact */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-3xl shadow-xl sticky top-24">
              <h3 className="text-xl font-display font-bold mb-8">Interested?</h3>
              <div className="flex items-center space-x-4 mb-8">
                <img src={propertyData.agent.image} alt="Agent" className="w-16 h-16 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-bold">{propertyData.agent.name}</h4>
                  <p className="text-xs text-secondary/40 uppercase font-bold tracking-widest">Premium Agent</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <button className="w-full btn-primary flex items-center justify-center space-x-2">
                  <Phone size={18} />
                  <span>Call Agent</span>
                </button>
                <button className="w-full btn-outline flex items-center justify-center space-x-2">
                  <Mail size={18} />
                  <span>Send Inquiry</span>
                </button>
              </div>

              <div className="pt-8 border-t border-primary/10">
                <button className="w-full py-4 bg-secondary text-white rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-secondary/90 transition-colors">
                  <Calendar size={18} />
                  <span>Schedule Inspection</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
