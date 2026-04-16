import React from 'react';
import { motion } from 'motion/react';
import { Save, Layout, Phone, Share2, Sparkles, Home, LogOut, Info, Shield, ListTodo, Settings, Upload, Globe, Mail } from 'lucide-react';
import { useContent, defaultContent } from '@/src/lib/ContentContext';
import { cn } from '@/src/lib/utils';
import { supabase } from '@/src/lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function AdminCMS() {
  const { content, updateContent, loading } = useContent();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState(content);
  const [activeTab, setActiveTab] = React.useState<'contact' | 'hero' | 'cleaning' | 'real_estate' | 'about' | 'privacy' | 'bookings' | 'settings'>('contact');
  const [bookings, setBookings] = React.useState<any[]>([]);
  const [isUploading, setIsUploading] = React.useState(false);
  const [quotingBooking, setQuotingBooking] = React.useState<any>(null);
  const [quoteData, setQuoteData] = React.useState({ amount: '', notes: '' });
  const [isQuoting, setIsQuoting] = React.useState(false);

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
    const result = await updateContent(formData);
    if (result?.success) {
      alert('Content updated successfully!');
    } else {
      alert('Failed to update content: ' + (result?.error || 'Unknown error'));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `logo-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('site-assets')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Supabase Upload Error:', uploadError);
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('site-assets')
        .getPublicUrl(filePath);

      setFormData({ ...formData, logo_url: publicUrl });
      alert('Logo uploaded! Remember to save changes.');
    } catch (error: any) {
      console.error('Error uploading logo:', error);
      alert('Upload failed: ' + error.message + '\nMake sure a "site-assets" bucket exists in Supabase Storage.');
    } finally {
      setIsUploading(false);
    }
  };

  const sendQuoteEmail = (booking: any, amount: string, notes: string) => {
    const subject = encodeURIComponent(`Quote for ${booking.service_type} - WinnyRay Nigeria Limited`);
    const body = encodeURIComponent(
      `Dear ${booking.client_name},\n\n` +
      `Thank you for contacting WinnyRay Nigeria Limited.\n\n` +
      `We have reviewed your request for ${booking.service_type} and are pleased to provide the following quote:\n\n` +
      `Quote Amount: ₦${amount}\n` +
      `Additional Notes: ${notes || 'N/A'}\n\n` +
      `Please let us know if you would like to proceed or if you have any questions.\n\n` +
      `Best regards,\n` +
      `WinnyRay Nigeria Limited Team`
    );
    window.open(`mailto:${booking.client_email}?subject=${subject}&body=${body}`);
  };

  const handleGenerateQuote = async () => {
    if (!quotingBooking) return;
    setIsQuoting(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({
          status: 'quoted',
          metadata: {
            ...(quotingBooking.metadata || {}),
            quote_amount: quoteData.amount,
            quote_notes: quoteData.notes,
            quoted_at: new Date().toISOString()
          }
        })
        .eq('id', quotingBooking.id);

      if (error) throw error;
      
      // Trigger email automatically
      sendQuoteEmail(quotingBooking, quoteData.amount, quoteData.notes);
      
      alert('Quote generated successfully! Your email client should open with the quote details.');
      setQuotingBooking(null);
      setQuoteData({ amount: '', notes: '' });
      fetchBookings();
    } catch (error: any) {
      console.error('Error generating quote:', error);
      alert('Failed to generate quote: ' + error.message);
    } finally {
      setIsQuoting(false);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    try {
      const { error } = await supabase.from('bookings').delete().eq('id', id);
      if (error) throw error;
      fetchBookings();
    } catch (error: any) {
      alert('Delete failed: ' + error.message);
    }
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
            <TabButton id="settings" icon={Settings} label="Site Settings" />
            <div className="pt-4 mt-4 border-t border-primary/10 space-y-2">
              <TabButton id="bookings" icon={ListTodo} label="View Bookings" />
              <button 
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all font-bold text-left bg-red-50 text-red-600 hover:bg-red-100"
              >
                <LogOut size={20} />
                <span>Log Out</span>
              </button>
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
                        value={formData.contact_info?.address || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          contact_info: { ...(formData.contact_info || defaultContent.contact_info), address: e.target.value }
                        })}
                        className="w-full p-4 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none" 
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Phone Number</label>
                        <input 
                          type="text" 
                          value={formData.contact_info?.phone || ''}
                          onChange={(e) => setFormData({
                            ...formData,
                            contact_info: { ...(formData.contact_info || defaultContent.contact_info), phone: e.target.value }
                          })}
                          className="w-full p-4 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Email Address</label>
                        <input 
                          type="email" 
                          value={formData.contact_info?.email || ''}
                          onChange={(e) => setFormData({
                            ...formData,
                            contact_info: { ...(formData.contact_info || defaultContent.contact_info), email: e.target.value }
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
                        value={formData.social_links?.facebook || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          social_links: { ...(formData.social_links || defaultContent.social_links), facebook: e.target.value }
                        })}
                        className="w-full p-4 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Instagram URL</label>
                      <input 
                        type="text" 
                        value={formData.social_links?.instagram || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          social_links: { ...(formData.social_links || defaultContent.social_links), instagram: e.target.value }
                        })}
                        className="w-full p-4 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Twitter URL</label>
                      <input 
                        type="text" 
                        value={formData.social_links?.twitter || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          social_links: { ...(formData.social_links || defaultContent.social_links), twitter: e.target.value }
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
                    {(formData.hero_slides || []).map((slide, index) => (
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
                              value={slide.title || ''}
                              onChange={(e) => {
                                const newSlides = [...(formData.hero_slides || [])];
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
                              value={slide.subtitle || ''}
                              onChange={(e) => {
                                const newSlides = [...(formData.hero_slides || [])];
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
                            value={slide.image || ''}
                            onChange={(e) => {
                              const newSlides = [...(formData.hero_slides || [])];
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
                    {(formData.services?.cleaning || []).map((service, index) => (
                      <div key={index} className="p-6 rounded-2xl bg-white/50 border border-primary/10 space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold">Service #{index + 1}</h4>
                          <button 
                            onClick={() => {
                              const newCleaning = (formData.services?.cleaning || []).filter((_, i) => i !== index);
                              setFormData({ ...formData, services: { ...(formData.services || defaultContent.services), cleaning: newCleaning } });
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
                            value={service.title || ''}
                            onChange={(e) => {
                              const newCleaning = [...(formData.services?.cleaning || [])];
                              newCleaning[index].title = e.target.value;
                              setFormData({ ...formData, services: { ...(formData.services || defaultContent.services), cleaning: newCleaning } });
                            }}
                            className="w-full p-3 bg-white border border-primary/5 rounded-lg outline-none" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Description</label>
                          <textarea 
                            value={service.desc || ''}
                            onChange={(e) => {
                              const newCleaning = [...(formData.services?.cleaning || [])];
                              newCleaning[index].desc = e.target.value;
                              setFormData({ ...formData, services: { ...(formData.services || defaultContent.services), cleaning: newCleaning } });
                            }}
                            className="w-full p-3 bg-white border border-primary/5 rounded-lg outline-none h-24" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Image URL</label>
                          <input 
                            type="text" 
                            value={service.image || ''}
                            onChange={(e) => {
                              const newCleaning = [...(formData.services?.cleaning || [])];
                              newCleaning[index].image = e.target.value;
                              setFormData({ ...formData, services: { ...(formData.services || defaultContent.services), cleaning: newCleaning } });
                            }}
                            className="w-full p-3 bg-white border border-primary/5 rounded-lg outline-none" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Features (comma separated)</label>
                          <input 
                            type="text" 
                            value={(service.features || []).join(', ')}
                            onChange={(e) => {
                              const newCleaning = [...(formData.services?.cleaning || [])];
                              newCleaning[index].features = e.target.value.split(',').map(s => s.trim());
                              setFormData({ ...formData, services: { ...(formData.services || defaultContent.services), cleaning: newCleaning } });
                            }}
                            className="w-full p-3 bg-white border border-primary/5 rounded-lg outline-none" 
                          />
                        </div>
                      </div>
                    ))}
                    <button 
                      onClick={() => {
                        const newCleaning = [...(formData.services?.cleaning || []), { title: '', desc: '', image: '', features: [] }];
                        setFormData({ ...formData, services: { ...(formData.services || defaultContent.services), cleaning: newCleaning } });
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
                    {(formData.services?.real_estate || []).map((service, index) => (
                      <div key={index} className="p-6 rounded-2xl bg-white/50 border border-primary/10 space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold">Section #{index + 1}</h4>
                          <button 
                            onClick={() => {
                              const newRE = (formData.services?.real_estate || []).filter((_, i) => i !== index);
                              setFormData({ ...formData, services: { ...(formData.services || defaultContent.services), real_estate: newRE } });
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
                            value={service.title || ''}
                            onChange={(e) => {
                              const newRE = [...(formData.services?.real_estate || [])];
                              newRE[index].title = e.target.value;
                              setFormData({ ...formData, services: { ...(formData.services || defaultContent.services), real_estate: newRE } });
                            }}
                            className="w-full p-3 bg-white border border-primary/5 rounded-lg outline-none" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Description</label>
                          <textarea 
                            value={service.desc || ''}
                            onChange={(e) => {
                              const newRE = [...(formData.services?.real_estate || [])];
                              newRE[index].desc = e.target.value;
                              setFormData({ ...formData, services: { ...(formData.services || defaultContent.services), real_estate: newRE } });
                            }}
                            className="w-full p-3 bg-white border border-primary/5 rounded-lg outline-none h-24" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Image URL</label>
                          <input 
                            type="text" 
                            value={service.image || ''}
                            onChange={(e) => {
                              const newRE = [...(formData.services?.real_estate || [])];
                              newRE[index].image = e.target.value;
                              setFormData({ ...formData, services: { ...(formData.services || defaultContent.services), real_estate: newRE } });
                            }}
                            className="w-full p-3 bg-white border border-primary/5 rounded-lg outline-none" 
                          />
                        </div>
                      </div>
                    ))}
                    <button 
                      onClick={() => {
                        const newRE = [...(formData.services?.real_estate || []), { title: '', desc: '', image: '', link: '/booking?category=real-estate' }];
                        setFormData({ ...formData, services: { ...(formData.services || defaultContent.services), real_estate: newRE } });
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
                        value={formData.about?.title || ''}
                        onChange={(e) => setFormData({ ...formData, about: { ...(formData.about || defaultContent.about), title: e.target.value } })}
                        className="w-full p-4 bg-white border border-primary/10 rounded-xl outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Main Content</label>
                      <textarea 
                        value={formData.about?.content || ''}
                        onChange={(e) => setFormData({ ...formData, about: { ...(formData.about || defaultContent.about), content: e.target.value } })}
                        className="w-full p-4 bg-white border border-primary/10 rounded-xl outline-none h-40" 
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Mission</label>
                        <textarea 
                          value={formData.about?.mission || ''}
                          onChange={(e) => setFormData({ ...formData, about: { ...(formData.about || defaultContent.about), mission: e.target.value } })}
                          className="w-full p-4 bg-white border border-primary/10 rounded-xl outline-none h-24" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Vision</label>
                        <textarea 
                          value={formData.about?.vision || ''}
                          onChange={(e) => setFormData({ ...formData, about: { ...(formData.about || defaultContent.about), vision: e.target.value } })}
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
                        value={formData.privacy_policy?.title || ''}
                        onChange={(e) => setFormData({ ...formData, privacy_policy: { ...(formData.privacy_policy || defaultContent.privacy_policy), title: e.target.value } })}
                        className="w-full p-4 bg-white border border-primary/10 rounded-xl outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Policy Content</label>
                      <textarea 
                        value={formData.privacy_policy?.content || ''}
                        onChange={(e) => setFormData({ ...formData, privacy_policy: { ...(formData.privacy_policy || defaultContent.privacy_policy), content: e.target.value } })}
                        className="w-full p-4 bg-white border border-primary/10 rounded-xl outline-none h-96" 
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="glass p-8 rounded-3xl shadow-xl">
                  <h3 className="text-xl font-display font-bold mb-6 flex items-center">
                    <Globe size={20} className="mr-2 text-primary" />
                    General Settings
                  </h3>
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Website Logo & Favicon</label>
                      <div className="flex items-center space-x-8 p-6 bg-white/50 border border-primary/10 rounded-2xl">
                        <div className="w-24 h-24 bg-white rounded-xl border border-primary/10 flex items-center justify-center overflow-hidden">
                          {formData.logo_url ? (
                            <img src={formData.logo_url} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
                          ) : (
                            <Settings size={32} className="text-primary/20" />
                          )}
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center space-x-4">
                            <label className="btn-outline cursor-pointer flex items-center space-x-2 py-2 px-4 text-sm">
                              <Upload size={16} />
                              <span>{isUploading ? 'Uploading...' : 'Upload New Logo'}</span>
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={handleLogoUpload}
                                disabled={isUploading}
                              />
                            </label>
                            <p className="text-xs text-secondary/40 italic">Recommended: PNG or SVG with transparent background.</p>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Logo URL (Direct Link)</label>
                            <input 
                              type="text" 
                              value={formData.logo_url || ''}
                              onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                              className="w-full p-3 bg-white border border-primary/5 rounded-lg outline-none text-sm" 
                              placeholder="https://example.com/logo.png"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
                        <p className="text-xs text-secondary/60">
                          <strong>Note:</strong> The uploaded logo is automatically used as the website's favicon (the icon shown in browser tabs).
                        </p>
                      </div>
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
                        {(bookings?.length || 0) === 0 ? (
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
                                <span className={cn(
                                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                                  booking.status === 'quoted' ? "bg-green-100 text-green-600" : 
                                  booking.status === 'message' ? "bg-blue-100 text-blue-600" :
                                  "bg-yellow-100 text-yellow-600"
                                )}>
                                  {booking.status === 'quoted' ? 'Quoted' : 
                                   booking.status === 'message' ? 'Message' : 
                                   'Pending Quote'}
                                </span>
                                {booking.metadata?.quote_amount && (
                                  <p className="text-xs font-bold text-green-600 mt-1">₦{booking.metadata.quote_amount}</p>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex space-x-2">
                                  <button 
                                    onClick={() => {
                                      if (booking.status === 'quoted') {
                                        sendQuoteEmail(booking, booking.metadata.quote_amount, booking.metadata.quote_notes);
                                      } else {
                                        window.open(`mailto:${booking.client_email}`);
                                      }
                                    }}
                                    className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all" 
                                    title="Email Client"
                                  >
                                    <Mail size={14} />
                                  </button>
                                  {booking.status !== 'message' && booking.status !== 'quoted' && (
                                    <button 
                                      onClick={() => setQuotingBooking(booking)}
                                      className="p-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500 hover:text-white transition-all"
                                      title="Generate Quote"
                                    >
                                      <Sparkles size={14} />
                                    </button>
                                  )}
                                  <button 
                                    onClick={() => handleDeleteBooking(booking.id)}
                                    className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                                    title="Delete"
                                  >
                                    <LogOut size={14} className="rotate-90" />
                                  </button>
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
      {/* Quote Generation Modal */}
      {quotingBooking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-secondary/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-primary/10"
          >
            <h3 className="text-2xl font-display font-bold mb-2">Generate Quote</h3>
            <p className="text-secondary/60 mb-6">For {quotingBooking.client_name}</p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Quote Amount (₦)</label>
                <input 
                  type="number" 
                  value={quoteData.amount}
                  onChange={(e) => setQuoteData({ ...quoteData, amount: e.target.value })}
                  className="w-full p-4 bg-secondary/5 border border-primary/10 rounded-xl outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g. 50000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Additional Notes</label>
                <textarea 
                  value={quoteData.notes}
                  onChange={(e) => setQuoteData({ ...quoteData, notes: e.target.value })}
                  className="w-full p-4 bg-secondary/5 border border-primary/10 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 h-32"
                  placeholder="Details about the quote..."
                />
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button 
                onClick={() => setQuotingBooking(null)}
                className="flex-1 py-4 rounded-xl font-bold text-secondary/60 hover:bg-secondary/5 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleGenerateQuote}
                disabled={isQuoting || !quoteData.amount}
                className="flex-1 btn-primary py-4 rounded-xl font-bold disabled:opacity-50"
              >
                {isQuoting ? 'Generating...' : 'Generate Quote'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
