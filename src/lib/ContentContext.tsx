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
}

const defaultContent: SiteContent = {
  contact_info: {
    address: "15 Bravo Close Zungeru by kwakwachi, Kano",
    phone: "+234 800 WINNYRAY",
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
      }
    ],
    real_estate: [
      {
        title: "Premium Real Estate",
        desc: "Discover exclusive properties in Kano and beyond.",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
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
  }
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

  const updateContent = async (newContent: Partial<SiteContent>) => {
    const updated = { ...content, ...newContent };
    setContent(updated);
    
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ id: 1, content: updated });
      
      if (error) throw error;
    } catch (err) {
      console.error('Error updating content:', err);
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, loading }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
