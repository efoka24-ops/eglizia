'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/lib/AppContext';
import InteractionButtons from '@/components/InteractionButtons';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function Predications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('tous');
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const { preachings } = useAppContext();

  // Convert URL to embed format
  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    
    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be') 
        ? url.split('youtu.be/')[1]
        : url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Vimeo
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    
    // Direct video/audio link
    return url;
  };

  const filtered = preachings && preachings.length > 0 
    ? preachings.filter((sermon: any) => {
        const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (sermon.preacher && sermon.preacher.toLowerCase().includes(searchTerm.toLowerCase()));
        const mediaType = sermon.media_type || sermon.type;
        const matchesType = selectedType === 'tous' || mediaType?.toLowerCase().includes(selectedType);
        return matchesSearch && matchesType;
      })
    : [];

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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
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
            {filtered && filtered.length > 0 ? (
              filtered.map((sermon: any, index: number) => (
                <motion.div
                  key={sermon.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                >
                  {/* Thumbnail/Header */}
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#1e3a5f] to-[#0f1f33] flex items-center justify-center cursor-pointer group">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button 
                        onClick={() => setSelectedMedia(sermon)}
                        className="w-16 h-16 rounded-full bg-[#d4af37] flex items-center justify-center hover:bg-[#e8c547] transition-colors group-hover:scale-110 transition-transform"
                      >
                        {(sermon.media_type === 'audio' || sermon.type === 'audio') ? (
                          <svg className="w-7 h-7 text-[#1e3a5f] fill-[#1e3a5f]" viewBox="0 0 24 24">
                            <path d="M12 3v9.28c-.47-.46-1.12-.72-1.84-.72-2.49 0-4.5 2.01-4.5 4.5S7.51 21 10 21c1.66 0 3.14-.69 4.19-1.81V3m7-1h-4v18h4V2z"/>
                          </svg>
                        ) : (sermon.media_type === 'texte' || sermon.type === 'texte') ? (
                          <svg className="w-7 h-7 text-[#1e3a5f] fill-[#1e3a5f]" viewBox="0 0 24 24">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                          </svg>
                        ) : (
                          <Play className="w-7 h-7 text-[#1e3a5f] fill-[#1e3a5f]" />
                        )}
                      </button>
                    </div>
                    {/* Badges */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      <span className="bg-[#d4af37] text-[#1e3a5f] px-3 py-1 rounded-full text-xs font-bold">
                        {sermon.media_type || sermon.type || 'Vidéo'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#1e3a5f] mb-2 line-clamp-2">{sermon.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{sermon.preacher}</p>
                    {(sermon.description || sermon.content) && <p className="text-sm text-gray-500 mb-4 line-clamp-2">{sermon.description || sermon.content}</p>}

                    <div className="space-y-3 mb-4">
                      {(sermon.bible_reference || sermon.reference) && (
                        <p className="text-xs text-gray-500">
                          <span className="font-semibold">Bible:</span> {sermon.bible_reference || sermon.reference}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        <span className="font-semibold">Date:</span> {new Date(sermon.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>

                    <InteractionButtons
                      contentId={sermon.id}
                      contentType="preaching"
                      title={sermon.title}
                      content={sermon.description || sermon.content || ''}
                      size="sm"
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-gray-500 text-lg">Aucune prédication disponible</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Media Player Modal */}
      {selectedMedia && (
        <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
          <DialogContent className="max-w-4xl w-full max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>{selectedMedia.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Video Player */}
              {(selectedMedia.media_type === 'video' || selectedMedia.type === 'video') && selectedMedia.media_url && (
                <div className="relative w-full bg-black rounded-lg overflow-hidden">
                  {selectedMedia.media_url.includes('youtube.com') || selectedMedia.media_url.includes('youtu.be') ? (
                    <iframe
                      width="100%"
                      height="500"
                      src={getEmbedUrl(selectedMedia.media_url) + '?autoplay=1'}
                      title={selectedMedia.title || ''}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full"
                    ></iframe>
                  ) : selectedMedia.media_url.includes('vimeo.com') ? (
                    <iframe
                      width="100%"
                      height="500"
                      src={getEmbedUrl(selectedMedia.media_url) + '?autoplay=1'}
                      title={selectedMedia.title || ''}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      className="w-full"
                    ></iframe>
                  ) : (
                    <video width="100%" height="500" controls autoPlay className="w-full bg-black rounded-lg">
                      <source src={selectedMedia.media_url} type="video/mp4" />
                      Votre navigateur ne supporte pas la lecture vidéo.
                    </video>
                  )}
                </div>
              )}

              {/* Audio Player */}
              {(selectedMedia.media_type === 'audio' || selectedMedia.type === 'audio') && selectedMedia.media_url && (
                <div className="bg-gradient-to-br from-[#1e3a5f] to-[#0f1f33] p-8 rounded-lg space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-[#d4af37]/20 rounded-lg flex items-center justify-center">
                      <svg className="w-10 h-10 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm10 12a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 text-white">
                      <h4 className="font-semibold text-lg">{selectedMedia.title}</h4>
                      <p className="text-sm text-white/70">{selectedMedia.preacher}</p>
                    </div>
                  </div>
                  <audio
                    controls
                    autoPlay
                    className="w-full h-12 bg-white/10 rounded accent-[#d4af37]"
                    controlsList="nodownload"
                  >
                    <source src={selectedMedia.media_url} type="audio/mpeg" />
                    Votre navigateur ne supporte pas la lecture audio.
                  </audio>
                </div>
              )}

              {/* Text/Content Viewer */}
              {(selectedMedia.media_type === 'texte' || selectedMedia.type === 'texte') && (
                <div className="bg-white border border-gray-200 rounded-lg p-8 space-y-4 max-h-96 overflow-y-auto">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {selectedMedia.description || selectedMedia.content || 'Contenu non disponible'}
                    </p>
                  </div>
                </div>
              )}

              {/* Info */}
              <div className="space-y-2 border-t pt-4">
                <p><span className="font-semibold">Prédicateur:</span> {selectedMedia.preacher}</p>
                {(selectedMedia.bible_reference || selectedMedia.reference) && (
                  <p><span className="font-semibold">Bible:</span> {selectedMedia.bible_reference || selectedMedia.reference}</p>
                )}
                {selectedMedia.date && (
                  <p><span className="font-semibold">Date:</span> {new Date(selectedMedia.date).toLocaleDateString('fr-FR')}</p>
                )}
                {(selectedMedia.media_type !== 'texte' && selectedMedia.type !== 'texte') && (selectedMedia.description || selectedMedia.content) && (
                  <p><span className="font-semibold">Description:</span> {selectedMedia.description || selectedMedia.content}</p>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Footer />
    </div>
  );
}
