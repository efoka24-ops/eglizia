'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Music, Users, Heart, Shield, Baby, HeartHandshake, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAppContext } from '@/lib/AppContext';

// Icon mapping for departments
const iconMap: { [key: string]: React.ComponentType<any> } = {
  'Intercession': Flame,
  'Louange & Adoration': Music,
  'Louange': Music,
  'Jeunesse': Users,
  'Femmes': Heart,
  'Hommes': Shield,
  'Enfants': Baby,
  'Evangelisation': HeartHandshake,
  'Entraide': HeartHandshake,
  'Études bibliques': BookOpen,
};

// Default gradient mapping
const gradientMap: { [key: string]: string } = {
  'Intercession': 'from-orange-500 to-red-600',
  'Louange & Adoration': 'from-purple-500 to-pink-600',
  'Louange': 'from-purple-500 to-pink-600',
  'Jeunesse': 'from-blue-500 to-cyan-600',
  'Femmes': 'from-rose-500 to-pink-600',
  'Hommes': 'from-slate-600 to-slate-800',
  'Enfants': 'from-yellow-400 to-orange-500',
  'Evangelisation': 'from-green-500 to-emerald-600',
  'Entraide': 'from-green-500 to-emerald-600',
  'Études bibliques': 'from-indigo-500 to-purple-600',
};

export default function Departements() {
  const { departments, members } = useAppContext();

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
              Nos Départements
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Rejoignez l'un de nos ministères et grandissez dans votre foi
            </p>
          </motion.div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {departments.map((dept, index) => {
              const IconComponent = iconMap[dept.name] || Users;
              const gradient = gradientMap[dept.name] || 'from-blue-500 to-cyan-600';
              
              return (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="grid md:grid-cols-5 gap-8 items-center">
                    {index % 2 === 0 ? (
                      <>
                        {/* Icon Panel */}
                        <div className={`md:col-span-2 bg-gradient-to-br ${gradient} rounded-3xl p-12 flex items-center justify-center min-h-96 shadow-2xl`}>
                          <IconComponent className="w-40 h-40 text-white opacity-90" strokeWidth={1} />
                        </div>
                        
                        {/* Content Panel */}
                        <div className="md:col-span-3 space-y-4">
                          <h3 className="text-4xl font-bold text-[#1e3a5f]">{dept.name}</h3>
                          {dept.leader_name && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-[#1e3a5f]">👤</div>
                              <div>
                                <p className="text-sm text-gray-500">Leader</p>
                                <p className="font-semibold text-gray-800">{dept.leader_name}</p>
                              </div>
                            </div>
                          )}
                          {dept.description && (
                            <p className="text-gray-600 text-lg leading-relaxed pt-4">{dept.description}</p>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Content Panel */}
                        <div className="md:col-span-3 space-y-4">
                          <h3 className="text-4xl font-bold text-[#1e3a5f]">{dept.name}</h3>
                          {dept.leader_name && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-[#1e3a5f]">👤</div>
                              <div>
                                <p className="text-sm text-gray-500">Leader</p>
                                <p className="font-semibold text-gray-800">{dept.leader_name}</p>
                              </div>
                            </div>
                          )}
                          {dept.description && (
                            <p className="text-gray-600 text-lg leading-relaxed pt-4">{dept.description}</p>
                          )}
                        </div>

                        {/* Icon Panel */}
                        <div className={`md:col-span-2 bg-gradient-to-br ${gradient} rounded-3xl p-12 flex items-center justify-center min-h-96 shadow-2xl`}>
                          <IconComponent className="w-40 h-40 text-white opacity-90" strokeWidth={1} />
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#1e3a5f] to-[#d4af37]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Intéressé pour vous impliquer?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Contactez-nous pour rejoindre l'un de nos départements et servir avec passion.
            </p>
            <a href="/contact" className="inline-block bg-white text-[#1e3a5f] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
              Nous Contacter
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
