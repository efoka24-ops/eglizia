'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Mail } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAppContext } from '@/lib/AppContext';

export default function AdminContact() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { contactInfo, setContactInfo, contactMessages, deleteContactMessage, updateContactMessage } = useAppContext();
  
  const [formData, setFormData] = useState({
    address: contactInfo?.address || 'Douala, Cameroun',
    phone: contactInfo?.phone || '+237 6XX XXX XXX',
    email: contactInfo?.email || 'contact@chapelle-restauration.org',
    sunday_start: contactInfo?.sunday_start || '09:00',
    sunday_end: contactInfo?.sunday_end || '12:00',
    wednesday_start: contactInfo?.wednesday_start || '18:00',
    wednesday_end: contactInfo?.wednesday_end || '20:00',
    facebook: contactInfo?.facebook || '',
    instagram: contactInfo?.instagram || '',
    whatsapp: contactInfo?.whatsapp || '',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactInfo({
      id: contactInfo?.id || '1',
      ...formData,
      updated_at: new Date().toISOString(),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Paramètres de Contact</h1>
              <p className="text-gray-600 mt-2">Gérez les informations de contact et les horaires</p>
            </motion.div>

            {/* Messages Reçus */}
            {contactMessages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Mail className="w-6 h-6" />
                  Messages Reçus ({contactMessages.length})
                </h2>
                <div className="space-y-4">
                  {contactMessages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-6 rounded-xl border-l-4 ${
                        msg.is_read ? 'bg-gray-50 border-gray-300' : 'bg-blue-50 border-blue-500'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">{msg.subject}</h3>
                          <p className="text-sm text-gray-600">De: {msg.name}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                          onClick={() => deleteContactMessage(msg.id!)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-gray-700 mb-3">{msg.message}</p>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>📧 {msg.email}</p>
                        <p>📞 {msg.phone}</p>
                        <p>📅 {new Date(msg.created_at!).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {saved && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg"
              >
                ✓ Paramètres sauvegardés avec succès!
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Informations de Contact</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                      <Input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Douala, Cameroun"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+237 6XX XXX XXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="contact@chapelle-restauration.org"
                      />
                    </div>
                  </div>
                </div>

                {/* Schedule */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Horaires</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">Dimanche</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Début</label>
                          <Input
                            type="time"
                            name="sunday_start"
                            value={formData.sunday_start}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Fin</label>
                          <Input
                            type="time"
                            name="sunday_end"
                            value={formData.sunday_end}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">Mercredi</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Début</label>
                          <Input
                            type="time"
                            name="wednesday_start"
                            value={formData.wednesday_start}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Fin</label>
                          <Input
                            type="time"
                            name="wednesday_end"
                            value={formData.wednesday_end}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Réseaux Sociaux</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                      <Input
                        type="url"
                        name="facebook"
                        value={formData.facebook}
                        onChange={handleChange}
                        placeholder="https://facebook.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                      <Input
                        type="url"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                      <Input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="+237 6XX XXX XXX"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#1e3a5f] hover:bg-[#2d5a8f] text-white py-3 rounded-lg font-semibold"
                >
                  Sauvegarder les Paramètres
                </Button>
              </form>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
