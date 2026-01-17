'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Adresse',
    content: '123 Rue de la Réformation\nKinshasa, DRC',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Phone,
    title: 'Téléphone',
    content: '+243 (0) 123-456-789\n+243 (0) 987-654-321',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'contact@chapelle-rc.cd\ninfo@chapelle-rc.cd',
    color: 'from-red-500 to-red-600',
  },
  {
    icon: Clock,
    title: 'Horaires',
    content: 'Dimanche: 9h30 - 12h30\nMercredi: 19h - 21h',
    color: 'from-purple-500 to-purple-600',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
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
              Nous Contacter
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Nous serions heureux d'entendre de vous. Contactez-nous pour toute question ou demande.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`bg-gradient-to-br ${info.color} rounded-2xl p-6 text-white shadow-lg`}>
                  <div className="flex items-center gap-3 mb-4">
                    <info.icon className="w-6 h-6" />
                    <h3 className="font-bold text-lg">{info.title}</h3>
                  </div>
                  <p className="text-white/90 whitespace-pre-line text-sm leading-relaxed">{info.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-[#1e3a5f] mb-8">Envoyez-nous un message</h2>
              
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-xl font-semibold text-gray-800">Merci pour votre message!</p>
                  <p className="text-gray-600 mt-2">Nous vous répondrons très bientôt.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+243..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Sujet du message"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Votre message..."
                      rows={6}
                      required
                    />
                  </div>
                  <Button className="w-full bg-[#1e3a5f] hover:bg-[#2d5a8f] text-white" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer le message
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Map & Social */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.2488481649005!2d15.315!3d-4.325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a3e3e3e3e3e3e%3A0x0!2sKinshasa%2C%20DR%20Congo!5e0!3m2!1sfr!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              
              {/* Social Media */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-6">Suivez-nous</h3>
                <div className="flex gap-4">
                  {[
                    { icon: 'f', label: 'Facebook', color: 'bg-blue-600' },
                    { icon: 'y', label: 'YouTube', color: 'bg-red-600' },
                    { icon: 'i', label: 'Instagram', color: 'bg-pink-600' },
                  ].map((social) => (
                    <button
                      key={social.label}
                      className={`w-12 h-12 rounded-full ${social.color} text-white flex items-center justify-center hover:opacity-80 transition-opacity font-bold`}
                    >
                      {social.icon}
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
