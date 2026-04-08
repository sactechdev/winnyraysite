import React from 'react';
import { motion } from 'motion/react';
import { Save, Layout, Phone, Share2, Sparkles, Home, LogOut } from 'lucide-react';
import { useContent } from '@/src/lib/ContentContext';

export default function AdminCMS() {
  const { content, updateContent, loading } = useContent();
  const [formData, setFormData] = React.useState(content);

  React.useEffect(() => {
    setFormData(content);
  }, [content]);

  if (loading) return <div className="pt-40 text-center">Loading CMS...</div>;

  const handleSave = async () => {
    await updateContent(formData);
    alert('Content updated successfully!');
  };

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
            <button className="w-full flex items-center space-x-3 px-6 py-4 rounded-2xl bg-primary text-white shadow-lg font-bold">
              <Phone size={20} />
              <span>Contact & Social</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-6 py-4 rounded-2xl bg-white text-secondary/60 hover:bg-primary/5 hover:text-primary transition-all font-bold">
              <Layout size={20} />
              <span>Hero Slider</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-6 py-4 rounded-2xl bg-white text-secondary/60 hover:bg-primary/5 hover:text-primary transition-all font-bold">
              <Sparkles size={20} />
              <span>Cleaning Services</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-6 py-4 rounded-2xl bg-white text-secondary/60 hover:bg-primary/5 hover:text-primary transition-all font-bold">
              <Home size={20} />
              <span>Real Estate</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2 space-y-8">
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
          </div>
        </div>
      </div>
    </div>
  );
}
