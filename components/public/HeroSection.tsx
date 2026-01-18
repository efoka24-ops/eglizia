import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Play, Heart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/95 via-[#1e3a5f]/85 to-[#0f1f33]/95" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#d4af37]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Church Name */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
            La Chapelle de
            <span className="block text-[#d4af37] mt-2">Restauration en Christ</span>
          </h1>
          
          {/* Verse */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/80 font-light italic mt-6 mb-4"
          >
            « Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos »
          </motion.p>
          <p className="text-[#d4af37] font-semibold mb-12">— Matthieu 11:28</p>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to={createPageUrl('Live')}>
              <Button 
                size="lg" 
                className="bg-[#d4af37] hover:bg-[#c9a431] text-[#1e3a5f] font-semibold px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                Suivre le Live
              </Button>
            </Link>
            <Link to={createPageUrl('Dons')}>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full backdrop-blur-sm"
              >
                <Heart className="w-5 h-5 mr-2" />
                Faire un don
              </Button>
            </Link>
            <Link to={createPageUrl('Contact')}>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37]/10 px-8 py-6 text-lg rounded-full"
              >
                <Users className="w-5 h-5 mr-2" />
                Nous rejoindre
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Worship Times */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { day: 'Dimanche', time: '09h00', label: 'Culte Principal' },
            { day: 'Mercredi', time: '18h00', label: 'Étude Biblique' },
            { day: 'Vendredi', time: '18h00', label: 'Veillée de Prière' },
          ].map((item, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20"
            >
              <p className="text-[#d4af37] font-semibold text-sm uppercase tracking-wider">{item.day}</p>
              <p className="text-white text-2xl font-bold mt-1">{item.time}</p>
              <p className="text-white/70 text-sm mt-1">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-[#d4af37] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
