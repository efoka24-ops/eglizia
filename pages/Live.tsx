'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, MessageCircle, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Live() {
  const [viewerCount] = useState(1243);

  const upcomingStreams = [
    { day: 'Dimanche', time: '09:30', title: 'Service du matin' },
    { day: 'Mercredi', time: '19:00', title: 'Réunion de prière' },
    { day: 'Vendredi', time: '20:00', title: 'Adoration en ligne' },
  ];

  const chatMessages = [
    { name: 'Marie K.', message: 'Merveilleux message ce matin!' },
    { name: 'Jean P.', message: 'Gloire à Dieu pour cette parole!' },
    { name: 'Sarah M.', message: 'Je suis bénie par cet enseignement.' },
  ];

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
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-500 font-bold uppercase tracking-wider text-sm">En direct</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Adorez avec Nous
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Rejoignez-nous en direct pour nos services de culte
            </p>
          </motion.div>
        </div>
      </section>

      {/* Live Stream */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Player */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0"
                  title="Live Stream"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Info */}
              <div className="mt-8 space-y-4">
                <h2 className="text-3xl font-bold text-[#1e3a5f]">Service du Dimanche Matin</h2>
                <p className="text-gray-600">Rejoignez-nous pour le culte principal où nous célébrons Dieu et écoutons la Parole.</p>

                <div className="flex items-center gap-6 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#d4af37]" />
                    <span className="text-lg font-semibold text-gray-700">
                      {viewerCount.toLocaleString()} Spectateurs
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm text-gray-600">En direct maintenant</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Chat */}
              <div className="bg-gray-50 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Chat en direct
                </h3>
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg">
                      <p className="text-sm font-semibold text-[#1e3a5f]">{msg.name}</p>
                      <p className="text-sm text-gray-600">{msg.message}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Votre message..."
                    className="flex-1 px-4 py-2 border rounded-lg text-sm"
                  />
                  <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg">
                    ❤️
                  </button>
                </div>
              </div>

              {/* Upcoming */}
              <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8f] rounded-2xl p-6 text-white shadow-lg">
                <h3 className="text-lg font-bold mb-4">Prochains Services</h3>
                <div className="space-y-4">
                  {upcomingStreams.map((stream, idx) => (
                    <div key={idx} className="bg-white/10 rounded-lg p-3">
                      <p className="text-sm font-semibold">{stream.day}</p>
                      <p className="text-xs text-white/80">{stream.time}</p>
                      <p className="text-sm mt-1">{stream.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social CTA */}
              <div className="bg-[#d4af37]/20 rounded-2xl p-6 border-2 border-[#d4af37]">
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-4">Partagez avec vos Amis</h3>
                <div className="space-y-3">
                  {['Facebook', 'YouTube', 'WhatsApp'].map((platform) => (
                    <button key={platform} className="w-full px-4 py-2 bg-[#d4af37] hover:bg-[#e8c547] text-[#1e3a5f] font-semibold rounded-lg transition-colors">
                      Partager sur {platform}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
