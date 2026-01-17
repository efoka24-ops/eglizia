import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Heart, Building2, Users2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DonationCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/95 to-[#1e3a5f]/80" />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#d4af37] font-semibold text-sm uppercase tracking-wider">
              Soutenez l'œuvre
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 leading-tight">
              Participez à l'avancement du Royaume
            </h2>
            <p className="text-white/80 mt-6 text-lg leading-relaxed">
              Vos dons permettent de soutenir les ministères de l'église, d'aider les plus 
              démunis et de porter l'Évangile aux quatre coins du monde.
            </p>
            
            <div className="mt-8 space-y-4">
              {[
                { icon: Building2, text: 'Construction et entretien du temple' },
                { icon: Users2, text: 'Aide aux familles dans le besoin' },
                { icon: BookOpen, text: 'Programmes d\'évangélisation' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 text-white/90">
                  <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            
            <Link to={createPageUrl('Dons')}>
              <Button 
                size="lg"
                className="mt-10 bg-[#d4af37] hover:bg-[#c9a431] text-[#1e3a5f] font-semibold px-10 py-6 text-lg rounded-full shadow-xl"
              >
                <Heart className="w-5 h-5 mr-2" />
                Faire un don maintenant
              </Button>
            </Link>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { value: '500+', label: 'Membres actifs' },
              { value: '12', label: 'Départements' },
              { value: '50+', label: 'Familles soutenues' },
              { value: '100%', label: 'Transparence' },
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
              >
                <p className="text-4xl font-bold text-[#d4af37]">{stat.value}</p>
                <p className="text-white/80 mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
