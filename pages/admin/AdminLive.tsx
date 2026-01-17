'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, Play, Square } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const streams = {
  live: [
    {
      id: 1,
      title: 'Service du Dimanche',
      youtube: 'https://youtube.com/watch?v=...',
      facebook: 'https://facebook.com/...',
      startTime: '09:30',
      viewers: 523,
    },
  ],
  scheduled: [
    {
      id: 2,
      title: 'Réunion de Prière',
      date: '2024-01-24',
      time: '19:00',
      youtube: 'https://youtube.com/watch?v=...',
    },
  ],
};

export default function AdminLive() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Flux en Direct</h1>
                  <p className="text-gray-600 mt-2">Gérez les diffusions en direct</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-[#1e3a5f] hover:bg-[#2d5a8f]">
                      <Plus className="w-4 h-4 mr-2" />
                      Nouveau Flux
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Créer un Flux en Direct</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                        <Input placeholder="Titre du flux" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL YouTube</label>
                        <Input placeholder="https://youtube.com/watch?v=..." />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL Facebook</label>
                        <Input placeholder="https://facebook.com/..." />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <Textarea placeholder="Description..." rows={3} />
                      </div>
                      <Button type="submit" className="w-full bg-[#1e3a5f]">Créer Flux</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>

            {/* Live Streams */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">En Direct Maintenant</h2>
              <div className="space-y-4">
                {streams.live.map((stream) => (
                  <motion.div
                    key={stream.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-2 border-red-500 bg-red-50 rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                        <div>
                          <h3 className="font-bold text-gray-900">{stream.title}</h3>
                          <p className="text-sm text-gray-600">👁️ {stream.viewers} spectateurs</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="bg-red-600 hover:bg-red-700">
                          <Square className="w-4 h-4 mr-2" />
                          Arrêter
                        </Button>
                        <Button variant="outline">
                          <Edit2 className="w-4 h-4 mr-2" />
                          Éditer
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Scheduled Streams */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Programmé</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {streams.scheduled.map((stream) => (
                  <motion.div
                    key={stream.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl p-6 shadow-md"
                  >
                    <h3 className="font-bold text-gray-900 mb-3">{stream.title}</h3>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <p><span className="font-semibold">📅</span> {stream.date}</p>
                      <p><span className="font-semibold">🕐</span> {stream.time}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Play className="w-4 h-4 mr-2" />
                        Démarrer
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Edit2 className="w-4 h-4 mr-2" />
                        Éditer
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
