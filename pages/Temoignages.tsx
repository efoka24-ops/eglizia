'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const testimonies = [
  {
    id: 1,
    name: 'Marie Kinshasa',
    type: 'Guérison',
    title: 'Dieu m\'a guéri du cancer',
    content: 'Après 3 ans de lutte contre le cancer, les médecins ont dit qu\'il n\'y avait pas d\'espoir. Mais la prière de cette église et la foi en Jésus m\'ont permis de recevoir un miracle. Aujourd\'hui, je suis en bonne santé!',
    date: '2024-01-15',
    avatar: '👩',
  },
  {
    id: 2,
    name: 'Jean Pierre',
    type: 'Liberté',
    title: 'Délivrance de l\'alcoolisme',
    content: 'J\'étais esclave de l\'alcool pendant 15 ans. Venu à l\'église un dimanche, j\'ai rencontré Jésus et depuis ce jour, je suis libre! Merci à Dieu et à cette famille spirituelle.',
    date: '2024-01-10',
    avatar: '👨',
  },
  {
    id: 3,
    name: 'Sarah Kasongo',
    type: 'Restauration',
    title: 'Mon mariage a été sauvé',
    content: 'Mon mariage s\'effondrait, mais Dieu a fait un miracle! Grâce aux conseils bibliques et aux prières, mon mari et moi avons retrouvé l\'amour et la confiance. Notre famille est maintenant plus forte que jamais.',
    date: '2024-01-05',
    avatar: '👩',
  },
  {
    id: 4,
    name: 'David Nkosi',
    type: 'Appel',
    title: 'Dieu m\'a appelé au ministère',
    content: 'Un jour, j\'ai entendu l\'appel de Dieu sur ma vie lors d\'un service. Maintenant, je sers en tant que diacre et je vois chaque jour comment Dieu utilise ma vie pour changer d\'autres vies.',
    date: '2023-12-28',
    avatar: '👨',
  },
];

export default function Temoignages() {
  const [formData, setFormData] = useState({ name: '', title: '', type: '', content: '' });
  const [submitted, setSubmitted] = useState(false);
  const [selectedType, setSelectedType] = useState('tous');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', title: '', type: '', content: '' });
    }, 2000);
  };

  const filtered = selectedType === 'tous'
    ? testimonies
    : testimonies.filter((t) => t.type === selectedType);

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
              Témoignages
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Écoutez comment Dieu transforme des vies
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#d4af37] hover:bg-[#e8c547] text-[#1e3a5f] font-bold">
                  Partager Mon Témoignage
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Partagez Votre Témoignage</DialogTitle>
                </DialogHeader>
                
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">Merci!</p>
                    <p className="text-gray-600 mt-2">Votre témoignage sera approuvé et publié bientôt.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Votre Nom
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Votre nom"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Titre du Témoignage
                      </label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Ex: Dieu m'a guéri"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type
                      </label>
                      <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Guérison">Guérison</SelectItem>
                          <SelectItem value="Liberté">Liberté</SelectItem>
                          <SelectItem value="Restauration">Restauration</SelectItem>
                          <SelectItem value="Appel">Appel</SelectItem>
                          <SelectItem value="Autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Votre Témoignage
                      </label>
                      <Textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Racontez comment Dieu a changé votre vie..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#1e3a5f] hover:bg-[#2d5a8f] text-white"
                    >
                      Soumettre le Témoignage
                    </Button>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="sticky top-20 z-40 py-6 bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {['tous', 'Guérison', 'Liberté', 'Restauration', 'Appel'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  selectedType === type
                    ? 'bg-[#1e3a5f] text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {type === 'tous' ? 'Tous' : type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonies Grid */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-8">
            {filtered.map((testimony, index) => (
              <motion.div
                key={testimony.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-[#d4af37]"
              >
                {/* Quote Icon */}
                <div className="text-5xl text-[#d4af37] opacity-30 mb-4">"</div>

                {/* Type Badge */}
                <span className="inline-block bg-[#1e3a5f]/10 text-[#1e3a5f] px-3 py-1 rounded-full text-xs font-bold mb-4">
                  {testimony.type}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-4">{testimony.title}</h3>

                {/* Content */}
                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-4">
                  {testimony.content}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t mb-4">
                  <div className="text-3xl">{testimony.avatar}</div>
                  <div>
                    <p className="font-semibold text-[#1e3a5f]">{testimony.name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(testimony.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>

                {/* Actions */}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
