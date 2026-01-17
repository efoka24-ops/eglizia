'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Eye, EyeOff } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/lib/AppContext';

export default function AdminMessages() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { contactMessages, deleteContactMessage, updateContactMessage } = useAppContext();
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read'>('all');

  const filteredMessages = contactMessages.filter((msg) => {
    if (filterStatus === 'unread') return !msg.is_read;
    if (filterStatus === 'read') return msg.is_read;
    return true;
  });

  const handleMarkAsRead = (id: string) => {
    const msg = contactMessages.find(m => m.id === id);
    if (msg) {
      updateContactMessage(id, { is_read: !msg.is_read });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Messages de Contact</h1>
              <p className="text-gray-600 mt-2">Consultez tous les messages reçus depuis le formulaire de contact</p>
            </motion.div>

            {/* Stats */}
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 shadow"
              >
                <p className="text-gray-600 text-sm">Total</p>
                <p className="text-3xl font-bold text-gray-900">{contactMessages.length}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-blue-50 rounded-xl p-6 shadow"
              >
                <p className="text-blue-600 text-sm">Non lus</p>
                <p className="text-3xl font-bold text-blue-600">{contactMessages.filter(m => !m.is_read).length}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-green-50 rounded-xl p-6 shadow"
              >
                <p className="text-green-600 text-sm">Lus</p>
                <p className="text-3xl font-bold text-green-600">{contactMessages.filter(m => m.is_read).length}</p>
              </motion.div>
            </motion.div>

            {/* Filter */}
            <div className="mb-6 flex gap-2">
              <Button
                onClick={() => setFilterStatus('all')}
                className={filterStatus === 'all' ? 'bg-[#1e3a5f] text-white' : 'bg-white text-gray-700 border'}
              >
                Tous ({contactMessages.length})
              </Button>
              <Button
                onClick={() => setFilterStatus('unread')}
                className={filterStatus === 'unread' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border'}
              >
                Non lus ({contactMessages.filter(m => !m.is_read).length})
              </Button>
              <Button
                onClick={() => setFilterStatus('read')}
                className={filterStatus === 'read' ? 'bg-green-500 text-white' : 'bg-white text-gray-700 border'}
              >
                Lus ({contactMessages.filter(m => m.is_read).length})
              </Button>
            </div>

            {/* Messages List */}
            {filteredMessages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white rounded-xl"
              >
                <p className="text-gray-500 text-lg">Aucun message pour le moment</p>
              </motion.div>
            ) : (
              <motion.div className="space-y-4">
                {filteredMessages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-6 rounded-xl border-l-4 transition-colors ${
                      msg.is_read
                        ? 'bg-gray-50 border-gray-300'
                        : 'bg-blue-50 border-blue-500'
                    } hover:shadow-lg`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-gray-900 text-lg">{msg.subject}</h3>
                          {!msg.is_read && (
                            <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
                              NOUVEAU
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 font-medium">De: {msg.name}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsRead(msg.id!)}
                          className="text-blue-600"
                          title={msg.is_read ? 'Marquer comme non lu' : 'Marquer comme lu'}
                        >
                          {msg.is_read ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                          onClick={() => deleteContactMessage(msg.id!)}
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">{msg.message}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 border-t pt-4">
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Email</p>
                        <p className="font-mono text-gray-700">{msg.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Téléphone</p>
                        <p className="font-mono text-gray-700">{msg.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Date</p>
                        <p className="text-gray-700">{new Date(msg.created_at!).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Heure</p>
                        <p className="text-gray-700">{new Date(msg.created_at!).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
