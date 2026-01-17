'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const categories = [
  { emoji: '🙏', label: 'Santé' },
  { emoji: '👨‍👩‍👧‍👦', label: 'Famille' },
  { emoji: '💼', label: 'Travail' },
  { emoji: '💔', label: 'Consolation' },
  { emoji: '📚', label: 'Sagesse' },
  { emoji: '🙌', label: 'Reconnaissance' },
];

export default function Priere() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    subject: '',
    details: '',
    urgent: false,
    private: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({
      name: '',
      email: '',
      phone: '',
      category: '',
      subject: '',
      details: '',
      urgent: false,
      private: false,
    });
  };

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
              Demandes de Prière
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              "Si deux d'entre vous s'accordent ici-bas pour demander quelque chose, elle leur sera accordée par mon Père qui est aux cieux." - Matthieu 18:19
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-3"
            >
              <h2 className="text-3xl font-bold text-[#1e3a5f] mb-8">
                Soumettre une Demande
              </h2>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 bg-green-50 rounded-2xl">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-green-600">Merci pour votre demande!</p>
                  <p className="text-gray-600 mt-2">Nos intercesseurs vont prier pour vous.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet
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
                        Email
                      </label>
                      <Input
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        type="email"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+243..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catégorie
                    </label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.label} value={cat.label}>
                            {cat.emoji} {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet
                    </label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Titre de votre demande"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Détails de la Demande
                    </label>
                    <Textarea
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Décrivez votre situation..."
                      rows={5}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.urgent}
                        onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-600">🚨 Urgent - Priorité aux intercesseurs</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.private}
                        onChange={(e) => setFormData({ ...formData, private: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-600">🔒 Privé - Ne pas partager</span>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#1e3a5f] hover:bg-[#2d5a8f] text-white"
                    size="lg"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Soumettre la Demande
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 space-y-6"
            >
              {/* Commitment */}
              <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8f] rounded-2xl p-8 text-white shadow-lg">
                <h3 className="text-xl font-bold mb-4">Notre Engagement</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-4">
                  Nous nous engageons à prier pour chaque demande avec sincérité et dévouement, croyant en la puissance de la prière intercédante.
                </p>
                <div className="border-t border-white/20 pt-4">
                  <p className="text-xs text-white/80 italic">
                    "La prière du juste a une grande efficacité." - Jacques 5:16
                  </p>
                </div>
              </div>

              {/* Prayer Times */}
              <div className="bg-gray-50 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-4">📍 Heures de Prière</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-gray-800">Lundi</p>
                    <p className="text-gray-600">19:00 - 20:30</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Mercredi</p>
                    <p className="text-gray-600">19:00 - 21:00</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Samedi</p>
                    <p className="text-gray-600">06:00 - 08:00</p>
                  </div>
                </div>
              </div>

              {/* Verse */}
              <div className="bg-[#d4af37]/10 rounded-2xl p-6 border-2 border-[#d4af37]">
                <p className="text-sm text-gray-800 italic leading-relaxed">
                  "Ayez confiance en l'Éternel de tout votre cœur, et ne vous appuyez pas sur votre intelligence; reconnaissez-le dans toutes vos voies, et il aplanira vos sentiers."
                </p>
                <p className="text-xs font-semibold text-[#1e3a5f] mt-3">Proverbes 3:5-6</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
