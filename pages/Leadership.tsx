'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAppContext } from '@/lib/AppContext';
import { useDebugMembers } from '@/lib/useDebugMembers';

const MEMBER_ROLES: Record<string, string> = {
  'pastor': 'Pasteur Principal',
  'co-pastor': 'Co-Pasteure',
  'leader': 'Leader',
  'youth-leader': 'Responsable Jeunesse',
  'women-leader': 'Responsable Femmes',
  'men-leader': 'Responsable Hommes',
  'children-leader': 'Responsable Enfants',
  'worship-leader': 'Responsable Culte',
  'coordinator': 'Coordinateur',
  'member': 'Membre',
};

export default function Leadership() {
  const { members } = useAppContext();
  useDebugMembers();

  // Séparer les pasteurs et leaders
  const pastors = members.filter(m => m.role === 'pastor' || m.role === 'co-pastor');
  const leaders = members.filter(m => !['pastor', 'co-pastor', 'member'].includes(m.role));

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
              Notre Leadership
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Les hommes et femmes qui servent avec dévouement
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Leaders */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#1e3a5f]">Nos Pasteurs</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {pastors.map((pastor, index) => (
              <motion.div
                key={pastor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <div className="relative mb-6 overflow-hidden rounded-3xl aspect-square bg-gradient-to-br from-[#1e3a5f] to-[#0f1f33] flex items-center justify-center">
                  {pastor.avatar_url ? (
                    <img
                      src={pastor.avatar_url}
                      alt={`${pastor.first_name} ${pastor.last_name}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Si l'image ne charge pas, afficher une initial
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  ) : null}
                  {!pastor.avatar_url && (
                    <div className="text-6xl font-bold text-white">
                      {pastor.first_name[0]}{pastor.last_name[0]}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-[#1e3a5f] mb-2">
                  {pastor.first_name} {pastor.last_name}
                </h3>
                <p className="text-[#d4af37] font-semibold mb-4">{MEMBER_ROLES[pastor.role]}</p>
                {pastor.bio && (
                  <p className="text-gray-600 text-sm">{pastor.bio}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#1e3a5f]">Notre Équipe</h2>
            <p className="text-gray-600 text-lg mt-4">Serviteurs dédiés et passionnés</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {leaders.map((leader, index) => (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">
                  {leader.avatar_url ? (
                    <img
                      src={leader.avatar_url}
                      alt={`${leader.first_name} ${leader.last_name}`}
                      className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-[#d4af37]"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto border-4 border-[#d4af37] flex items-center justify-center text-2xl">
                      {leader.first_name[0]}
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-2">
                  {leader.first_name} {leader.last_name}
                </h3>
                <p className="text-[#d4af37] font-semibold text-sm mb-3">{MEMBER_ROLES[leader.role]}</p>
                {leader.bio && (
                  <p className="text-gray-600 text-xs">{leader.bio}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
