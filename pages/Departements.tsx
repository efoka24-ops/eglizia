'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Music, Users, Heart, Shield, Baby, HandHelping, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAppContext } from '@/lib/AppContext';

const departments = [
  {
    icon: Flame,
    title: 'Intercession',
    leader: 'Pasteur Jean Mutamba',
    meeting: 'Lundi 19h',
    description: 'Groupe de prière intercédant pour nos familles, notre église et notre nation.',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    icon: Music,
    title: 'Louange & Adoration',
    leader: 'Soeur Marie Kasongo',
    meeting: 'Jeudi 18h',
    description: 'Équipe de louange créant une atmosphère divine pendant nos célébrations.',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    icon: Users,
    title: 'Jeunesse',
    leader: 'Pasteur David Kamba',
    meeting: 'Vendredi 19h',
    description: 'Ministère dédié aux jeunes adultes, discipleship et événements spéciaux.',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Heart,
    title: 'Femmes',
    leader: 'Soeur Esther Motanda',
    meeting: 'Mardi 18h',
    description: 'Groupe de prière et soutien pour les femmes de notre communauté.',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    icon: Shield,
    title: 'Hommes',
    leader: 'Pasteur Pierre Lamba',
    meeting: 'Samedi 14h',
    description: 'Groupe de formation spirituelle et leadership pour les hommes.',
    gradient: 'from-slate-600 to-slate-800',
  },
  {
    icon: Baby,
    title: 'Enfants',
    leader: 'Soeur Nadège Mikanda',
    meeting: 'Dimanche 10h',
    description: 'Ministère joyeux et éducatif pour les enfants de 3 à 12 ans.',
    gradient: 'from-yellow-400 to-orange-500',
  },
];

export default function Departements() {
  const { departments } = useAppContext();
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
            {departments.map((dept, index) => (
              <motion.div
                key={dept.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="grid md:grid-cols-5 gap-8 items-center">
                  {index % 2 === 0 ? (
                    <>
                      {/* Icon Panel */}
                      <div className={`md:col-span-2 bg-gradient-to-br ${dept.gradient} rounded-3xl p-12 flex items-center justify-center min-h-96 shadow-2xl`}>
                        <dept.icon className="w-40 h-40 text-white opacity-90" strokeWidth={1} />
                      </div>
                      
                      {/* Content Panel */}
                      <div className="md:col-span-3 space-y-4">
                        <h3 className="text-4xl font-bold text-[#1e3a5f]">{dept.title}</h3>
                        <div className="flex items-center gap-2 text-gray-600">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-[#1e3a5f]">👤</div>
                          <div>
                            <p className="text-sm text-gray-500">Leader</p>
                            <p className="font-semibold text-gray-800">{dept.leader}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">🕐</div>
                          <div>
                            <p className="text-sm text-gray-500">Réunion</p>
                            <p className="font-semibold text-gray-800">{dept.meeting}</p>
                          </div>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed pt-4">{dept.description}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Content Panel */}
                      <div className="md:col-span-3 space-y-4">
                        <h3 className="text-4xl font-bold text-[#1e3a5f]">{dept.title}</h3>
                        <div className="flex items-center gap-2 text-gray-600">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-[#1e3a5f]">👤</div>
                          <div>
                            <p className="text-sm text-gray-500">Leader</p>
                            <p className="font-semibold text-gray-800">{dept.leader}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">🕐</div>
                          <div>
                            <p className="text-sm text-gray-500">Réunion</p>
                            <p className="font-semibold text-gray-800">{dept.meeting}</p>
                          </div>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed pt-4">{dept.description}</p>
                      </div>

                      {/* Icon Panel */}
                      <div className={`md:col-span-2 bg-gradient-to-br ${dept.gradient} rounded-3xl p-12 flex items-center justify-center min-h-96 shadow-2xl`}>
                        <dept.icon className="w-40 h-40 text-white opacity-90" strokeWidth={1} />
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
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
