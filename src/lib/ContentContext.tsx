import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabase';

interface SiteContent {
  contact_info: {
    address: string;
    phone: string;
    email: string;
    working_hours: string;
  };
  social_links: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  hero_slides: {
    title: string;
    subtitle: string;
    desc: string;
    image: string;
    link: string;
    btnText: string;
  }[];
  services: {
    cleaning: {
      title: string;
      desc: string;
      image: string;
      features: string[];
    }[];
    real_estate: {
      title: string;
      desc: string;
      image: string;
      link: string;
    }[];
  };
  about: {
    title: string;
    content: string;
    mission: string;
    vision: string;
    image: string;
  };
  privacy_policy: {
    title: string;
    content: string;
    last_updated: string;
  };
  logo_url: string;
}

const defaultContent: SiteContent = {
  contact_info: {
    address: "15 Bravo Close Zungeru by kwakwachi, Kano",
    phone: "+234 703 698 1080, +234 813 473 9747, +234 907 772 7119",
    email: "info@winnyray.com.ng",
    working_hours: "Mon - Fri: 8:00 AM - 6:00 PM"
  },
  social_links: {
    facebook: "#",
    instagram: "#",
    twitter: "#"
  },
  hero_slides: [
    {
      title: "Pristine Spaces, Professional Care",
      subtitle: "Premium Cleaning Services in Kano",
      desc: "Experience the gold standard of cleanliness for your home and office.",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1920",
      link: "/cleaning",
      btnText: "Cleaning Services"
    },
    {
      title: "Exclusive Real Estate Listings",
      subtitle: "Find Your Dream Home in Kano",
      desc: "Discover premium properties in Nigeria's most prestigious neighborhoods.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920",
      link: "/real-estate",
      btnText: "Real Estate"
    }
  ],
  services: {
    cleaning: [
      {
        title: "Residential Cleaning",
        desc: "Standard, deep, and move-in/out cleaning for your home.",
        image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800",
        features: ["Standard Cleaning", "Deep Cleaning", "Move-in/Out"]
      },
      {
        title: "Commercial Cleaning",
        desc: "Professional cleaning for offices, warehouses, and retail spaces.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
        features: ["Office Cleaning", "Industrial Cleaning", "Post-Construction"]
      },
      {
        title: "Specialized Cleaning",
        desc: "Expert care for carpets, windows, and high-touch surfaces.",
        image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=800",
        features: ["Carpet Cleaning", "Window Washing", "Disinfection"]
      }
    ],
    real_estate: [
      {
        title: "Premium Real Estate",
        desc: "Discover exclusive properties in Kano and beyond.",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
        link: "/real-estate"
      },
      {
        title: "Property Management",
        desc: "Professional management for your real estate investments.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000",
        link: "/real-estate"
      },
      {
        title: "Real Estate Advisory",
        desc: "Expert guidance for property acquisition and investment.",
        image: "https://images.unsplash.com/photo-1454165833767-027ff33027ef?auto=format&fit=crop&q=80&w=1000",
        link: "/real-estate"
      }
    ]
  },
  about: {
    title: "About WinnyRay Nigeria Limited",
    content: "WinnyRay Nigeria Limited is a premier service provider based in Kano, specializing in professional cleaning and luxury real estate. We are committed to excellence, integrity, and customer satisfaction.",
    mission: "To provide world-class cleaning and real estate services that enhance the quality of life for our clients.",
    vision: "To be the most trusted and preferred service provider in Nigeria.",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1000"
  },
  privacy_policy: {
    title: "Privacy Policy",
    content: "Your privacy is important to us. This policy explains how we collect, use, and protect your personal information...",
    last_updated: "April 10, 2026"
  },
  logo_url: "https://winnyray.com.ng/wp-content/uploads/2023/05/cropped-WinnyRay-Logo-1.png"
};

const ContentContext = createContext<{
  content: SiteContent;
  updateContent: (newContent: Partial<SiteContent>) => Promise<void>;
  loading: boolean;
}>({
  content: defaultContent,
  updateContent: async () => {},
  loading: true
});

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .single();

        if (data) {
          setContent(data.content);
        } else if (error && error.code === 'PGRST116') {
          // Table or row doesn't exist yet, use defaults
          console.log('Using default content');
        }
      } catch (err) {
        console.error('Error fetching content:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, []);

  useEffect(() => {
    if (content.logo_url) {
      const link: HTMLLinkElement = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = content.logo_url;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  }, [content.logo_url]);

  const updateContent = async (newContent: Partial<SiteContent>) => {
    const updated = { ...content, ...newContent };
    
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ id: 1, content: updated });
      
      if (error) throw error;
      setContent(updated);
      return { success: true };
    } catch (err: any) {
      console.error('Error updating content:', err);
      return { success: false, error: err.message };
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, loading }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
