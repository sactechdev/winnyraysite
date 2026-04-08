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
  hero_slides: any[];
  services: {
    cleaning: any[];
    real_estate: any[];
  };
}

const defaultContent: SiteContent = {
  contact_info: {
    address: "No. 45 Zoo Road, Kano State, Nigeria",
    phone: "+234 800 WINNYRAY",
    email: "info@winnyray.com.ng",
    working_hours: "Mon - Fri: 8:00 AM - 6:00 PM"
  },
  social_links: {
    facebook: "#",
    instagram: "#",
    twitter: "#"
  },
  hero_slides: [],
  services: {
    cleaning: [],
    real_estate: []
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
