'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Eye, EyeOff, CheckCircle, Clock } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/lib/AppContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AdminSubscriptions() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { eventSubscriptions, deleteEventSubscription, updateEventSubscription } = useAppContext();
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed'>('all');

  const filteredSubscriptions = eventSubscriptions.filter((sub) => {
    if (filterStatus === 'pending') return sub.status === 'pending';
    if (filterStatus === 'confirmed') return sub.status === 'confirmed';
    return true;
  });

  const handleConfirm = (id: string) => {
    updateEventSubscription(id, { status: 'confirmed' });
  };

  const uniqueEvents = [...new Set(eventSubscriptions.map(s => s.eventTitle))];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Inscriptions aux Événements</h1>
              <p className="text-gray-600 mt-2">Gérez les inscriptions et participations aux événements</p>
            </motion.div>

            {/* Stats */}
            <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 shadow"
              >
                <p className="text-gray-600 text-sm">Total Inscriptions</p>
                <p className="text-3xl font-bold text-gray-900">{eventSubscriptions.length}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-yellow-50 rounded-xl p-6 shadow"
              >
                <p className="text-yellow-600 text-sm">En Attente</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {eventSubscriptions.filter(s => s.status === 'pending').length}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-green-50 rounded-xl p-6 shadow"
              >
                <p className="text-green-600 text-sm">Confirmées</p>
                <p className="text-3xl font-bold text-green-600">
                  {eventSubscriptions.filter(s => s.status === 'confirmed').length}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-blue-50 rounded-xl p-6 shadow"
              >
                <p className="text-blue-600 text-sm">Événements</p>
                <p className="text-3xl font-bold text-blue-600">{uniqueEvents.length}</p>
              </motion.div>
            </motion.div>

            {/* Filter */}
            <div className="mb-6 flex gap-2">
              <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as any)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes ({eventSubscriptions.length})</SelectItem>
                  <SelectItem value="pending">En Attente ({eventSubscriptions.filter(s => s.status === 'pending').length})</SelectItem>
                  <SelectItem value="confirmed">Confirmées ({eventSubscriptions.filter(s => s.status === 'confirmed').length})</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Subscriptions List */}
            {filteredSubscriptions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white rounded-xl"
              >
                <p className="text-gray-500 text-lg">Aucune inscription pour le moment</p>
              </motion.div>
            ) : (
              <motion.div className="space-y-4">
                {filteredSubscriptions.map((sub, index) => (
                  <motion.div
                    key={sub.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-6 rounded-xl border-l-4 transition-colors ${
                      sub.status === 'confirmed'
                        ? 'bg-green-50 border-green-500'
                        : 'bg-yellow-50 border-yellow-500'
                    } hover:shadow-lg`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-gray-900 text-lg">{sub.eventTitle}</h3>
                          {sub.status === 'pending' && (
                            <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                              <Clock className="w-3 h-3" /> EN ATTENTE
                            </span>
                          )}
                          {sub.status === 'confirmed' && (
                            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> CONFIRMÉE
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Participant: {sub.name}</p>
                      </div>
                      <div className="flex gap-2">
                        {sub.status === 'pending' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleConfirm(sub.id!)}
                            className="text-green-600 hover:bg-green-100"
                            title="Confirmer l'inscription"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:bg-red-100"
                          onClick={() => deleteEventSubscription(sub.id!)}
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-gray-600 border-t pt-4">
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Email</p>
                        <p className="font-mono text-gray-700">{sub.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Téléphone</p>
                        <p className="font-mono text-gray-700">{sub.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Personnes</p>
                        <p className="text-gray-700 font-bold">{sub.numberOfPeople}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Date Inscription</p>
                        <p className="text-gray-700">{new Date(sub.subscribedAt!).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Demandes Spéciales</p>
                        <p className="text-gray-700 text-xs italic">{sub.specialRequests || '-'}</p>
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
