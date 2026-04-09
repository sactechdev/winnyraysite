import React from 'react';
import { motion } from 'motion/react';
import { Save, Layout, Phone, Share2, Sparkles, Home, LogOut } from 'lucide-react';
import { useContent } from '@/src/lib/ContentContext';
import { cn } from '@/src/lib/utils';

export default function AdminCMS() {
  const { content, updateContent, loading } = useContent();
  const [formData, setFormData] = React.useState(content);
  const [activeTab, setActiveTab] = React.useState<'contact' | 'hero' | 'cleaning' | 'real_estate'>('contact');

  React.useEffect(() => {
    setFormData(content);
  }, [content]);

  if (loading) return <div className="pt-40 text-center">Loading CMS...</div>;

  const handleSave = async () => {
    await updateContent(formData);
    alert('Content updated successfully!');
  };

  const TabButton = ({ id, icon: Icon, label }: { id: any, icon: any, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={cn(
        "w-full flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all font-bold",
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
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold">Admin <span className="text-primary italic">CMS</span></h1>
            <p className="text-secondary/60">Manage your website content and settings.</p>
          </div>
          <button 
            onClick={handleSave}
            className="btn-primary flex items-center space-x-2"
          >
            <Save size={20} />
            <span>Save Changes</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1 space-y-2">
            <TabButton id="contact" icon={Phone} label="Contact & Social" />
            <TabButton id="hero" icon={Layout} label="Hero Slider" />
            <TabButton id="cleaning" icon={Sparkles} label="Cleaning Services" />
            <TabButton id="real_estate" icon={Home} label="Real Estate" />
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2 space-y-8">
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
                      </div>
                    ))}
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
