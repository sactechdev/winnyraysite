import React from 'react';
import { motion } from 'motion/react';
import { Save, Layout, Phone, Share2, Sparkles, Home, LogOut, Info, Shield, ListTodo } from 'lucide-react';
import { useContent } from '@/src/lib/ContentContext';
import { cn } from '@/src/lib/utils';
import { supabase } from '@/src/lib/supabase';

export default function AdminCMS() {
  const { content, updateContent, loading } = useContent();
  const [formData, setFormData] = React.useState(content);
  const [activeTab, setActiveTab] = React.useState<'contact' | 'hero' | 'cleaning' | 'real_estate' | 'about' | 'privacy' | 'bookings'>('contact');
  const [bookings, setBookings] = React.useState<any[]>([]);

  React.useEffect(() => {
    setFormData(content);
  }, [content]);

  React.useEffect(() => {
    if (activeTab === 'bookings') {
      fetchBookings();
    }
  }, [activeTab]);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setBookings(data);
  };

  if (loading) return <div className="pt-40 text-center">Loading CMS...</div>;

  const handleSave = async () => {
    await updateContent(formData);
    alert('Content updated successfully!');
  };

  const TabButton = ({ id, icon: Icon, label }: { id: any, icon: any, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={cn(
        "w-full flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all font-bold text-left",
        activeTab === id 
          ? "bg-primary text-white shadow-lg" 
          : "bg-white text-secondary/60 hover:bg-primary/5 hover:text-primary"
      )}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="pt-20 min-h-screen bg-secondary/5">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold">Admin <span className="text-primary italic">CMS</span></h1>
            <p className="text-secondary/60">Manage your website content and view bookings.</p>
          </div>
          {activeTab !== 'bookings' && (
            <button 
              onClick={handleSave}
              className="btn-primary flex items-center space-x-2"
            >
              <Save size={20} />
              <span>Save Changes</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1 space-y-2">
            <TabButton id="contact" icon={Phone} label="Contact & Social" />
            <TabButton id="hero" icon={Layout} label="Hero Slider" />
            <TabButton id="cleaning" icon={Sparkles} label="Cleaning Services" />
            <TabButton id="real_estate" icon={Home} label="Real Estate" />
            <TabButton id="about" icon={Info} label="About Company" />
            <TabButton id="privacy" icon={Shield} label="Privacy Policy" />
            <div className="pt-4 mt-4 border-t border-primary/10">
              <TabButton id="bookings" icon={ListTodo} label="View Bookings" />
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {activeTab === 'contact' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                {/* Contact Info Section */}
                <div className="glass p-8 rounded-3xl shadow-xl">
                  <h3 className="text-xl font-display font-bold mb-6 flex items-center">
                    <Phone size={20} className="mr-2 text-primary" />
                    Contact Information
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Office Address</label>
                      <input 
                        type="text" 
                        value={formData.contact_info.address}
                        onChange={(e) => setFormData({
                          ...formData,
                          contact_info: { ...formData.contact_info, address: e.target.value }
                        })}
                        className="w-full p-4 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none" 
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Phone Number</label>
                        <input 
                          type="text" 
                          value={formData.contact_info.phone}
                          onChange={(e) => setFormData({
                            ...formData,
                            contact_info: { ...formData.contact_info, phone: e.target.value }
                          })}
                          className="w-full p-4 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Email Address</label>
                        <input 
                          type="email" 
                          value={formData.contact_info.email}
                          onChange={(e) => setFormData({
                            ...formData,
                            contact_info: { ...formData.contact_info, email: e.target.value }
                          })}
                          className="w-full p-4 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links Section */}
                <div className="glass p-8 rounded-3xl shadow-xl">
                  <h3 className="text-xl font-display font-bold mb-6 flex items-center">
                    <Share2 size={20} className="mr-2 text-primary" />
                    Social Media Links
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Facebook URL</label>
                      <input 
                        type="text" 
                        value={formData.social_links.facebook}
                        onChange={(e) => setFormData({
                          ...formData,
                          social_links: { ...formData.social_links, facebook: e.target.value }
                        })}
                        className="w-full p-4 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Instagram URL</label>
                      <input 
                        type="text" 
                        value={formData.social_links.instagram}
                        onChange={(e) => setFormData({
                          ...formData,
                          social_links: { ...formData.social_links, instagram: e.target.value }
                        })}
                        className="w-full p-4 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Twitter URL</label>
                      <input 
                        type="text" 
                        value={formData.social_links.twitter}
                        onChange={(e) => setFormData({
                          ...formData,
                          social_links: { ...formData.social_links, twitter: e.target.value }
                        })}
                        className="w-full p-4 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none" 
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'hero' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="glass p-8 rounded-3xl shadow-xl">
                  <h3 className="text-xl font-display font-bold mb-6">Hero Slides</h3>
                  <p className="text-secondary/60 mb-8">Manage the slides that appear in the homepage hero section.</p>
                  <div className="space-y-12">
                    {formData.hero_slides.map((slide, index) => (
                      <div key={index} className="p-6 rounded-2xl bg-white/50 border border-primary/10 space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold">Slide #{index + 1}</h4>
                          <button className="text-red-500 text-xs font-bold uppercase tracking-widest">Remove</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Title</label>
                            <input 
                              type="text" 
                              value={slide.title}
                              onChange={(e) => {
                                const newSlides = [...formData.hero_slides];
                                newSlides[index].title = e.target.value;
                                setFormData({ ...formData, hero_slides: newSlides });
                              }}
                              className="w-full p-3 bg-white border border-primary/5 rounded-lg outline-none" 
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Subtitle</label>
                            <input 
                              type="text" 
                              value={slide.subtitle}
                              onChange={(e) => {
                                const newSlides = [...formData.hero_slides];
                                newSlides[index].subtitle = e.target.value;
                                setFormData({ ...formData, hero_slides: newSlides });
                              }}
                              className="w-full p-3 bg-white border border-primary/5 rounded-lg outline-none" 
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Image URL</label>
                          <input 
                            type="text" 
                            value={slide.image}
                            onChange={(e) => {
                              const newSlides = [...formData.hero_slides];
                              newSlides[index].image = e.target.value;
                              setFormData({ ...formData, hero_slides: newSlides });
                            }}
                            className="w-full p-3 bg-white border border-primary/5 rounded-lg outline-none" 
                          />
                        </div>
                      </div>
                    ))}
                    <button className="w-full py-4 border-2 border-dashed border-primary/20 rounded-2xl text-primary font-bold hover:bg-primary/5 transition-all">
                      + Add New Slide
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'cleaning' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="glass p-8 rounded-3xl shadow-xl">
                  <h3 className="text-xl font-display font-bold mb-6">Cleaning Services</h3>
                  <p className="text-secondary/60 mb-8">Manage the cleaning service categories shown on the services page.</p>
                  <div className="space-y-8">
                    {formData.services.cleaning.map((service, index) => (
                      <div key={index} className="p-6 rounded-2xl bg-white/50 border border-primary/10 space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold">Service #{index + 1}</h4>
                          <button 
                            onClick={() => {
                              const newCleaning = formData.services.cleaning.filter((_, i) => i !== index);
                              setFormData({ ...formData, services: { ...formData.services, cleaning: newCleaning } });
                            }}
                            className="text-red-500 text-xs font-bold uppercase tracking-widest"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Service Title</label>
                          <input 
                            type="text" 
                            value={service.title}
                            onChange={(e) => {
                              const newCleaning = [...formData.services.cleaning];
                              newCleaning[index].title = e.target.value;
                              setFormData({ ...formData, services: { ...formData.services, cleaning: newCleaning } });
                            }}
                            className="w-full p-3 bg-white border border-primary/5 rounded-lg outline-none" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Description</label>
                          <textarea 
                            value={service.desc}
                            onChange={(e) => {
                              const newCleaning = [...formData.services.cleaning];
                              newCleaning[index].desc = e.target.value;
                              setFormData({ ...formData, services: { ...formData.services, cleaning: newCleaning } });
                            }}
                            className="w-full p-3 bg-white border border-primary/5 rounded-lg outline-none h-24" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Image URL</label>
                          <input 
                            type="text" 
                            value={service.image}
                            onChange={(e) => {
                              const newCleaning = [...formData.services.cleaning];
                              newCleaning[index].image = e.target.value;
                              setFormData({ ...formData, services: { ...formData.services, cleaning: newCleaning } });
                            }}
                            className="w-full p-3 bg-white border border-primary/5 rounded-lg outline-none" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Features (comma separated)</label>
                          <input 
                            type="text" 
                            value={service.features.join(', ')}
                            onChange={(e) => {
                              const newCleaning = [...formData.services.cleaning];
                              newCleaning[index].features = e.target.value.split(',').map(s => s.trim());
                              setFormData({ ...formData, services: { ...formData.services, cleaning: newCleaning } });
                            }}
                            className="w-full p-3 bg-white border border-primary/5 rounded-lg outline-none" 
                          />
                        </div>
                      </div>
                    ))}
                    <button 
                      onClick={() => {
                        const newCleaning = [...formData.services.cleaning, { title: '', desc: '', image: '', features: [] }];
                        setFormData({ ...formData, services: { ...formData.services, cleaning: newCleaning } });
                      }}
                      className="w-full py-4 border-2 border-dashed border-primary/20 rounded-2xl text-primary font-bold hover:bg-primary/5 transition-all"
                    >
                      + Add New Cleaning Service
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'real_estate' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="glass p-8 rounded-3xl shadow-xl">
                  <h3 className="text-xl font-display font-bold mb-6">Real Estate Content</h3>
                  <p className="text-secondary/60 mb-8">Manage the real estate sections and featured properties.</p>
                  <div className="space-y-8">
                    {formData.services.real_estate.map((service, index) => (
                      <div key={index} className="p-6 rounded-2xl bg-white/50 border border-primary/10 space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold">Section #{index + 1}</h4>
                          <button 
                            onClick={() => {
                              const newRE = formData.services.real_estate.filter((_, i) => i !== index);
                              setFormData({ ...formData, services: { ...formData.services, real_estate: newRE } });
                            }}
                            className="text-red-500 text-xs font-bold uppercase tracking-widest"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Section Title</label>
                          <input 
                            type="text" 
                            value={service.title}
                            onChange={(e) => {
                              const newRE = [...formData.services.real_estate];
                              newRE[index].title = e.target.value;
                              setFormData({ ...formData, services: { ...formData.services, real_estate: newRE } });
                            }}
                            className="w-full p-3 bg-white border border-primary/5 rounded-lg outline-none" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Description</label>
                          <textarea 
                            value={service.desc}
                            onChange={(e) => {
                              const newRE = [...formData.services.real_estate];
                              newRE[index].desc = e.target.value;
                              setFormData({ ...formData, services: { ...formData.services, real_estate: newRE } });
                            }}
                            className="w-full p-3 bg-white border border-primary/5 rounded-lg outline-none h-24" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Image URL</label>
                          <input 
                            type="text" 
                            value={service.image}
                            onChange={(e) => {
                              const newRE = [...formData.services.real_estate];
                              newRE[index].image = e.target.value;
                              setFormData({ ...formData, services: { ...formData.services, real_estate: newRE } });
                            }}
                            className="w-full p-3 bg-white border border-primary/5 rounded-lg outline-none" 
                          />
                        </div>
                      </div>
                    ))}
                    <button 
                      onClick={() => {
                        const newRE = [...formData.services.real_estate, { title: '', desc: '', image: '', link: '/booking?category=real-estate' }];
                        setFormData({ ...formData, services: { ...formData.services, real_estate: newRE } });
                      }}
                      className="w-full py-4 border-2 border-dashed border-primary/20 rounded-2xl text-primary font-bold hover:bg-primary/5 transition-all"
                    >
                      + Add New Real Estate Section
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'about' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="glass p-8 rounded-3xl shadow-xl">
                  <h3 className="text-xl font-display font-bold mb-6 flex items-center">
                    <Info size={20} className="mr-2 text-primary" />
                    About Company
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Page Title</label>
                      <input 
                        type="text" 
                        value={formData.about.title}
                        onChange={(e) => setFormData({ ...formData, about: { ...formData.about, title: e.target.value } })}
                        className="w-full p-4 bg-white border border-primary/10 rounded-xl outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Main Content</label>
                      <textarea 
                        value={formData.about.content}
                        onChange={(e) => setFormData({ ...formData, about: { ...formData.about, content: e.target.value } })}
                        className="w-full p-4 bg-white border border-primary/10 rounded-xl outline-none h-40" 
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Mission</label>
                        <textarea 
                          value={formData.about.mission}
                          onChange={(e) => setFormData({ ...formData, about: { ...formData.about, mission: e.target.value } })}
                          className="w-full p-4 bg-white border border-primary/10 rounded-xl outline-none h-24" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Vision</label>
                        <textarea 
                          value={formData.about.vision}
                          onChange={(e) => setFormData({ ...formData, about: { ...formData.about, vision: e.target.value } })}
                          className="w-full p-4 bg-white border border-primary/10 rounded-xl outline-none h-24" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'privacy' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="glass p-8 rounded-3xl shadow-xl">
                  <h3 className="text-xl font-display font-bold mb-6 flex items-center">
                    <Shield size={20} className="mr-2 text-primary" />
                    Privacy Policy
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Title</label>
                      <input 
                        type="text" 
                        value={formData.privacy_policy.title}
                        onChange={(e) => setFormData({ ...formData, privacy_policy: { ...formData.privacy_policy, title: e.target.value } })}
                        className="w-full p-4 bg-white border border-primary/10 rounded-xl outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Policy Content</label>
                      <textarea 
                        value={formData.privacy_policy.content}
                        onChange={(e) => setFormData({ ...formData, privacy_policy: { ...formData.privacy_policy, content: e.target.value } })}
                        className="w-full p-4 bg-white border border-primary/10 rounded-xl outline-none h-96" 
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'bookings' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="glass p-8 rounded-3xl shadow-xl">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-display font-bold flex items-center">
                      <ListTodo size={20} className="mr-2 text-primary" />
                      All Bookings & Enquiries
                    </h3>
                    <button onClick={fetchBookings} className="text-xs font-bold text-primary uppercase tracking-widest">Refresh</button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-secondary/5 text-secondary/40 text-xs font-bold uppercase tracking-widest">
                          <th className="px-6 py-4">Client</th>
                          <th className="px-6 py-4">Service & Location</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-primary/5">
                        {bookings.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-secondary/40">No bookings found.</td>
                          </tr>
                        ) : (
                          bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-primary/5 transition-colors">
                              <td className="px-6 py-4">
                                <p className="font-bold text-sm">{booking.client_name}</p>
                                <p className="text-xs text-secondary/60">{booking.client_email}</p>
                                <p className="text-xs text-secondary/60">{booking.client_phone}</p>
                              </td>
                              <td className="px-6 py-4">
                                <p className="font-bold text-sm">{booking.service_type}</p>
                                <p className="text-xs text-secondary/60">{booking.address}, {booking.city}</p>
                              </td>
                              <td className="px-6 py-4">
                                <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-[10px] font-bold uppercase tracking-widest">
                                  Pending Quote
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex space-x-2">
                                  <a href={`mailto:${booking.client_email}`} className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all">
                                    <Phone size={14} />
                                  </a>
                                  <button className="text-xs font-bold text-secondary/40 hover:text-red-500">Delete</button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
