import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Users, Music, Heart, BookOpen, Baby, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ministries = [
  {
    icon: Flame,
    name: 'Intercession',
    description: 'Un ministère dédié à la prière et à la bataille spirituelle pour notre communauté.',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Music,
    name: 'Louange & Adoration',
    description: 'Conduire l\'assemblée dans la présence de Dieu par la musique et les chants.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Users,
    name: 'Jeunesse',
    description: 'Accompagner et équiper la jeune génération pour Christ.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Heart,
    name: 'Femmes',
    description: 'Édifier et encourager les femmes dans leur marche avec Dieu.',
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: BookOpen,
    name: 'Hommes',
    description: 'Former des hommes de Dieu, leaders dans leurs familles et la société.',
    color: 'from-[#1e3a5f] to-blue-600'
  },
  {
    icon: Baby,
    name: 'Enfants',
    description: 'Enseigner les fondements de la foi aux plus jeunes.',
    color: 'from-green-500 to-emerald-500'
  }
];

export default function MinistriesSection() {
  return (
    <section className="py-24 bg-[#1e3a5f] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#d4af37] font-semibold text-sm uppercase tracking-wider">
            Servir ensemble
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Nos Départements & Ministères
          </h2>
          <p className="text-white/70 mt-4 max-w-2xl mx-auto text-lg">
            Chaque membre a un don unique à offrir au corps de Christ. Découvrez où vous pouvez servir.
          </p>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministries.map((ministry, index) => (
            <motion.div
              key={ministry.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-all duration-300 h-full">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${ministry.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <ministry.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{ministry.name}</h3>
                <p className="text-white/70 leading-relaxed">{ministry.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to={createPageUrl('Departements')}>
            <Button 
              size="lg"
              className="bg-[#d4af37] hover:bg-[#c9a431] text-[#1e3a5f] font-semibold px-8 py-6 rounded-full"
            >
              Découvrir tous les départements
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
