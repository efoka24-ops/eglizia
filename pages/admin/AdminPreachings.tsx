'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAppContext } from '@/lib/AppContext';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const sermons = [
  {
    id: 1,
    title: 'La Puissance de la Restauration',
    preacher: 'Pasteur Jean-Marie Nkosi',
    reference: 'Jérémie 30:17',
    date: '2024-01-15',
    type: 'video',
    featured: true,
  },
  {
    id: 2,
    title: 'La Foi en Action',
    preacher: 'Pasteure Jeannine Kasongo',
    reference: 'Jacques 2:26',
    date: '2024-01-08',
    type: 'video',
    featured: false,
  },
];

export default function AdminPreachings() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { preachings, addPreaching, updatePreaching, deletePreaching } = useAppContext();

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
                  <h1 className="text-3xl font-bold text-gray-900">Prédications</h1>
                  <p className="text-gray-600 mt-2">Gérez les prédications et enseignements</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-[#1e3a5f] hover:bg-[#2d5a8f]">
                      <Plus className="w-4 h-4 mr-2" />
                      Nouvelle Prédication
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Ajouter une Prédication</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                        <Input placeholder="Titre de la prédication" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Prédicateur</label>
                          <Input placeholder="Nom" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                          <Input type="date" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="video">Vidéo</SelectItem>
                              <SelectItem value="audio">Audio</SelectItem>
                              <SelectItem value="texte">Texte</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Référence Bible</label>
                          <Input placeholder="Livre Ch:V" />
                        </div>
                      </div>
                      <Button type="submit" className="w-full bg-[#1e3a5f]">Ajouter</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sermonsList.map((sermon) => (
                <motion.div
                  key={sermon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-2">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">
                        {sermon.type}
                      </span>
                      {sermon.featured && (
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">
                          ⭐ Vedette
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{sermon.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><span className="font-semibold">Prédicateur:</span> {sermon.preacher}</p>
                    <p><span className="font-semibold">Bible:</span> {sermon.reference}</p>
                    <p><span className="font-semibold">Date:</span> {sermon.date}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
