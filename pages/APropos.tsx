import React from 'react';
import { motion } from 'framer-motion';
import { Cross, Target, Heart, BookOpen, Shield, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const values = [
  { icon: BookOpen, title: 'La Parole de Dieu', description: 'Nous croyons que la Bible est la Parole infaillible de Dieu, notre seule règle de foi et de conduite.' },
  { icon: Cross, title: 'La Croix de Christ', description: 'Jésus-Christ est le seul chemin vers le salut. Sa mort et sa résurrection sont le fondement de notre foi.' },
  { icon: Sparkles, title: 'Le Saint-Esprit', description: 'Nous croyons en la puissance du Saint-Esprit pour transformer les vies et équiper les croyants.' },
  { icon: Heart, title: "L'Amour", description: "L'amour de Dieu et l'amour du prochain sont au cœur de notre mission et de notre vie communautaire." },
  { icon: Shield, title: 'L\'Intégrité', description: 'Nous nous engageons à vivre une vie de sainteté et d\'intégrité en toutes circonstances.' },
  { icon: Target, title: 'La Mission', description: 'Nous sommes appelés à faire des disciples de toutes les nations et à être témoins de Christ.' },
];

export default function APropos() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#1e3a5f] to-[#0f1f33]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Notre Histoire
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Découvrez l'histoire, la vision et les valeurs qui guident La Chapelle de Restauration en Christ
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* History */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#d4af37] font-semibold text-sm uppercase tracking-wider">
                Notre parcours
              </span>
              <h2 className="text-4xl font-bold text-[#1e3a5f] mt-3 mb-6">
                Une église née de la vision divine
              </h2>
              <div className="mb-6 p-4 bg-[#d4af37]/10 rounded-lg border-l-4 border-[#d4af37]">
                <p className="font-semibold text-[#1e3a5f] mb-1">Pasteur Principal</p>
                <p className="text-lg font-bold text-[#1e3a5f]">Prophète Obi Louis</p>
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <span className="font-semibold text-[#1e3a5f]">La Chapelle de Restauration en Christ</span> est une église Pentecôtiste située à Garoua, Cameroun, au quartier Yelwa Descente Souari Dépôt.
                </p>
                <p>
                  Elle a été fondée avec une vision claire : voir des vies restaurées et transformées par la puissance de Jésus-Christ. Née d'une profonde conviction que Dieu désire guérir les cœurs brisés et libérer les captifs, notre église s'est donnée pour mission d'être un lieu de refuge, de guérison et de formation pour tous ceux qui recherchent une rencontre authentique avec Dieu.
                </p>
                <p>
                  Au fil des années, nous avons vu d'innombrables miracles, des vies transformées et une communauté grandissante de disciples passionnés pour Christ.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-[#d4af37]/20 to-[#1e3a5f]/20 rounded-3xl blur-2xl" />
              <img 
                src="https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=600&q=80"
                alt="Église"
                className="relative rounded-3xl shadow-2xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Vision & Mission */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d4af37] font-semibold text-sm uppercase tracking-wider">
              Ce qui nous anime
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mt-3">
              Vision & Mission
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-10 shadow-lg border-l-4 border-[#d4af37]"
            >
              <h3 className="text-2xl font-bold text-[#1e3a5f] mb-4">Notre Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Être une église qui restaure les vies par la puissance de Christ, 
                formant des disciples matures qui impactent leur génération et 
                étendent le Royaume de Dieu jusqu'aux extrémités de la terre.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#1e3a5f] rounded-3xl p-10 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-[#d4af37] mb-4">Notre Mission</h3>
              <p className="text-white/90 text-lg leading-relaxed">
                Proclamer l'Évangile de Jésus-Christ, faire des disciples, 
                servir notre communauté avec amour et préparer les croyants 
                pour l'œuvre du ministère selon Éphésiens 4:12.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Values */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d4af37] font-semibold text-sm uppercase tracking-wider">
              Nos fondements
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mt-3">
              Valeurs & Croyances
            </h2>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8f] flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-[#d4af37]" />
                </div>
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Declaration */}
      <section className="py-24 bg-gradient-to-br from-[#1e3a5f] to-[#0f1f33]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Déclaration de Foi
            </h2>
            <div className="space-y-6 text-white/80 text-lg leading-relaxed text-left">
              <p>Nous croyons en un seul Dieu, éternellement existant en trois personnes : le Père, le Fils et le Saint-Esprit.</p>
              <p>Nous croyons en la divinité de notre Seigneur Jésus-Christ, sa naissance virginale, sa vie sans péché, ses miracles, sa mort expiatoire sur la croix, sa résurrection corporelle, son ascension à la droite du Père et son retour en puissance et en gloire.</p>
              <p>Nous croyons que la Bible est la Parole de Dieu, inspirée et infaillible, et qu'elle est notre seule règle de foi et de conduite.</p>
              <p>Nous croyons à la nécessité de la nouvelle naissance par la foi en Jésus-Christ pour le salut de l'âme.</p>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
