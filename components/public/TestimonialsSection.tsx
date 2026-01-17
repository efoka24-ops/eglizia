import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TestimonialsSection({ testimonies = [] }) {
  const featuredTestimonies = testimonies
    .filter(t => t.is_approved && t.is_featured)
    .slice(0, 3);

  const defaultTestimonies = [
    {
      id: 1,
      author_name: 'Marie K.',
      content: 'Dieu a guéri mon fils qui était malade depuis des mois. Gloire à Dieu pour ce miracle !',
      testimony_type: 'guérison'
    },
    {
      id: 2,
      author_name: 'Jean-Pierre M.',
      content: 'Après des années d\'addiction, j\'ai trouvé la délivrance en Christ dans cette église. Ma vie a complètement changé.',
      testimony_type: 'délivrance'
    },
    {
      id: 3,
      author_name: 'Esther N.',
      content: 'Le Seigneur m\'a donné un emploi après 2 ans de chômage. Il est fidèle !',
      testimony_type: 'provision'
    }
  ];

  const displayTestimonies = featuredTestimonies.length > 0 ? featuredTestimonies : defaultTestimonies;

  const typeColors = {
    'guérison': 'bg-green-100 text-green-700',
    'délivrance': 'bg-purple-100 text-purple-700',
    'provision': 'bg-blue-100 text-blue-700',
    'salut': 'bg-yellow-100 text-yellow-700',
    'autre': 'bg-gray-100 text-gray-700'
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#d4af37] font-semibold text-sm uppercase tracking-wider">
            Dieu agit
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mt-3">
            Témoignages de Vie
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Découvrez comment Dieu transforme les vies au sein de notre communauté.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {displayTestimonies.map((testimony, index) => (
            <motion.div
              key={testimony.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                <Quote className="w-12 h-12 text-[#d4af37] mb-6" />
                
                <p className="text-gray-700 leading-relaxed flex-grow text-lg italic">
                  "{testimony.content}"
                </p>
                
                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8f] flex items-center justify-center text-white font-bold">
                      {testimony.author_name.charAt(0)}
                    </div>
                    <span className="font-semibold text-[#1e3a5f]">{testimony.author_name}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeColors[testimony.testimony_type] || typeColors.autre}`}>
                    {testimony.testimony_type}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 space-x-4"
        >
          <Link to={createPageUrl('Temoignages')}>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white px-8 py-6 rounded-full"
            >
              Lire plus de témoignages
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
