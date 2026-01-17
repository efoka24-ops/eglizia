'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Heart, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/lib/AppContext';

const sermons = [
  {
    id: 1,
    title: 'La Puissance de la Restauration',
    preacher: 'Pasteur Jean-Marie Nkosi',
    reference: 'Jérémie 30:17',
    date: '2024-01-15',
    duration: '45:30',
    type: 'Vidéo',
    thumbnail: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500&q=80',
    description: 'Un message puissant sur comment Dieu peut restaurer nos vies brisées.',
  },
  {
    id: 2,
    title: 'La Foi en Action',
    preacher: 'Pasteure Jeannine Kasongo',
    reference: 'Jacques 2:26',
    date: '2024-01-08',
    duration: '38:45',
    type: 'Vidéo',
    thumbnail: 'https://images.unsplash.com/photo-1507842217343-583f1270b3eb?w=500&q=80',
    description: 'Explorer comment notre foi doit se manifester dans nos actions quotidiennes.',
  },
  {
    id: 3,
    title: 'La Liberté en Christ',
    preacher: 'Pasteur David Kamba',
    reference: 'Galates 5:1',
    date: '2024-01-01',
    duration: '42:15',
    type: 'Vidéo',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80',
    description: 'Découvrez la véritable liberté que nous avons en Jésus-Christ.',
  },
];

export default function Predications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('tous');
  const { preachings } = useAppContext();

  const filtered = preachings.filter((sermon) => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'tous' || sermon.type?.toLowerCase().includes(selectedType);
    return matchesSearch && matchesType;
  });

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
              Nos Prédications
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Écoutez et partagez la Parole de Dieu
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="sticky top-20 z-40 py-6 bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <Input
                placeholder="Rechercher une prédication..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="h-12 px-4 border rounded-md bg-white"
            >
              <option value="tous">Tous les types</option>
              <option value="video">Vidéo</option>
              <option value="audio">Audio</option>
              <option value="texte">Texte</option>
            </select>
          </div>
        </div>
      </section>

      {/* Sermons Grid */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((sermon, index) => (
              <motion.div
                key={sermon.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-gray-200">
                  <img
                    src={sermon.thumbnail}
                    alt={sermon.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                    <button className="w-16 h-16 rounded-full bg-[#d4af37] flex items-center justify-center hover:bg-[#e8c547] transition-colors group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 text-[#1e3a5f] fill-[#1e3a5f]" />
                    </button>
                  </div>
                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className="bg-[#d4af37] text-[#1e3a5f] px-3 py-1 rounded-full text-xs font-bold">
                      {sermon.type}
                    </span>
                    <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">
                      {sermon.duration}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1e3a5f] mb-2 line-clamp-2">{sermon.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{sermon.preacher}</p>
                  <p className="text-sm text-gray-500 mb-4">{sermon.description}</p>

                  <div className="space-y-3 mb-4">
                    <p className="text-xs text-gray-500">
                      <span className="font-semibold">Bible:</span> {sermon.reference}
                    </p>
                    <p className="text-xs text-gray-500">
                      <span className="font-semibold">Date:</span> {new Date(sermon.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      size="sm"
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      Aimer
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      size="sm"
                    >
                      <Share2 className="w-4 h-4 mr-1" />
                      Partager
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Aucune prédication trouvée</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
