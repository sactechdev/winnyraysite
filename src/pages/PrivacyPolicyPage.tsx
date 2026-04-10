import React from 'react';
import { motion } from 'motion/react';
import { useContent } from '@/src/lib/ContentContext';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const { content, loading } = useContent();

  if (loading) return <div className="pt-40 text-center">Loading...</div>;

  return (
    <div className="pt-20 min-h-screen bg-white">
      <section className="bg-secondary py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Shield size={48} className="text-primary mx-auto mb-6" />
            <h1 className="text-5xl font-display font-bold mb-4">{content.privacy_policy.title}</h1>
            <p className="text-white/60">Last Updated: {content.privacy_policy.last_updated}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-primary max-w-none text-secondary/70 leading-relaxed">
            {content.privacy_policy.content.split('\n').map((paragraph, i) => (
              <p key={i} className="mb-6">{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
