'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAppContext } from '@/lib/AppContext';

export default function Live() {
  const { liveStreams, chatMessages, addChatMessage, getChatMessagesByStreamId } = useAppContext();
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('Visiteur');
  const [viewerCount, setViewerCount] = useState(1243);

  // Get the first live stream to display
  const mainStream = liveStreams.length > 0 ? liveStreams[0] : null;
  const streamChatMessages = mainStream ? getChatMessagesByStreamId(mainStream.id!) : [];

  // Simuler l'augmentation des spectateurs
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => {
        const change = Math.floor(Math.random() * 20) - 5; // -5 à +15
        return Math.max(100, prev + change);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !mainStream) return;

    addChatMessage({
      id: `msg_${Date.now()}`,
      stream_id: mainStream.id!,
      user_name: userName || 'Visiteur',
      message: newMessage,
      created_at: new Date().toISOString(),
    });

    setNewMessage('');
  };

  const upcomingStreams = [
    { day: 'Dimanche', time: '08:30', title: 'Service du matin' },
    { day: 'Mercredi', time: '19:00', title: 'Réunion de prière' },
    { day: 'Vendredi', time: '20:00', title: 'Adoration en ligne' },
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
              {mainStream ? `${mainStream.title}` : 'Rejoignez-nous en direct pour nos services de culte'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Live Stream */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {mainStream && mainStream.youtube_url ? (
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
                    src={mainStream.youtube_url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                    title={mainStream.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Info */}
                <div className="mt-8 space-y-4">
                  <h2 className="text-3xl font-bold text-[#1e3a5f]">{mainStream.title}</h2>
                  {mainStream.description && <p className="text-gray-600">{mainStream.description}</p>}

                  <div className="flex items-center gap-6 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#d4af37]" />
                      <span className="text-lg font-semibold text-gray-700">
                        {viewerCount.toLocaleString()} Spectateurs
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${mainStream.is_live ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`} />
                      <span className="text-sm text-gray-600">{mainStream.is_live ? 'En direct maintenant' : 'Programmé'}</span>
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
                <div className="bg-gray-50 rounded-2xl p-6 shadow-lg flex flex-col h-96">
                  <h3 className="text-lg font-bold text-[#1e3a5f] mb-4">Chat en direct</h3>
                  <div className="space-y-3 mb-4 flex-1 overflow-y-auto">
                    {streamChatMessages.slice(-10).map((msg) => (
                      <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-3 rounded-lg">
                        <p className="text-sm font-semibold text-[#1e3a5f]">{msg.user_name}</p>
                        <p className="text-sm text-gray-600">{msg.message}</p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-3">
                    <input
                      type="text"
                      placeholder="Votre nom..."
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-xs mb-2"
                    />
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Votre message..."
                        className="flex-1 px-3 py-2 border rounded-lg text-sm"
                      />
                      <button type="submit" className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg">
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
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
          ) : (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">Aucun flux en direct actuellement</h2>
              <p className="text-gray-600 mb-8">Consultez nos prochains services ci-dessous ou revenez plus tard</p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {upcomingStreams.map((stream, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-6">
                    <p className="text-lg font-bold text-[#1e3a5f]">{stream.day}</p>
                    <p className="text-gray-600 mt-2">{stream.time}</p>
                    <p className="text-sm text-gray-500 mt-2">{stream.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
