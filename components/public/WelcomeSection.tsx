import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function WelcomeSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-[#d4af37]/20 to-[#1e3a5f]/20 rounded-3xl blur-2xl" />
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&q=80"
                alt="Pasteur"
                className="rounded-3xl shadow-2xl w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#1e3a5f] text-white p-6 rounded-2xl shadow-xl">
                <Quote className="w-8 h-8 text-[#d4af37] mb-2" />
                <p className="text-sm italic">« Restaurer des vies par la puissance de Christ »</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-6">
            <div>
              <span className="text-[#d4af37] font-semibold text-sm uppercase tracking-wider">
                Bienvenue chez nous
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mt-3 leading-tight">
                Mot du Pasteur Principal
              </h2>
            </div>
            
            <div className="h-1 w-20 bg-gradient-to-r from-[#d4af37] to-[#1e3a5f] rounded-full" />
            
            <p className="text-gray-600 text-lg leading-relaxed">
              Bien-aimés en Christ,
            </p>
            <p className="text-gray-600 leading-relaxed">
              C'est avec une joie immense que je vous accueille au sein de La Chapelle de Restauration en Christ. 
              Notre église est un lieu où chaque âme trouve le repos, la guérison et la restauration 
              par la puissance de notre Seigneur Jésus-Christ.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Quelle que soit votre situation, quel que soit votre passé, sachez que vous êtes aimé(e) 
              de Dieu et que cette maison est la vôtre. Venez tel que vous êtes, et laissez le 
              Saint-Esprit transformer votre vie.
            </p>
            <p className="text-gray-600 leading-relaxed font-medium">
              Ensemble, marchons dans la lumière et proclamons les merveilles de notre Dieu !
            </p>
            
            <div className="pt-4">
              <p className="text-[#1e3a5f] font-bold text-xl">Pasteur Principal</p>
              <p className="text-gray-500">La Chapelle de Restauration en Christ</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
