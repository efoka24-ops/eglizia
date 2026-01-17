'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, MoreVertical, Search } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAppContext } from '@/lib/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Textarea } from '@/components/ui/textarea';

const announcements = [
  {
    id: 1,
    title: 'Service Spécial ce Dimanche',
    priority: 'importante',
    audience: 'tous',
    content: 'Nous avons un service spécial avec un ministre visiteur...',
    date: '2024-01-20',
    active: true,
  },
  {
    id: 2,
    title: 'Fermeture pour Maintenance',
    priority: 'urgente',
    audience: 'membres',
    content: 'L\'église sera fermée demain pour maintenance...',
    date: '2024-01-19',
    active: true,
  },
];

export default function AdminAnnouncements() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useAppContext();

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
                  <h1 className="text-3xl font-bold text-gray-900">Annonces</h1>
                  <p className="text-gray-600 mt-2">Gérez les annonces de votre église</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-[#1e3a5f] hover:bg-[#2d5a8f]">
                      <Plus className="w-4 h-4 mr-2" />
                      Nouvelle Annonce
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Créer une Annonce</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                        <Input placeholder="Titre de l'annonce" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="normale">Normale</SelectItem>
                              <SelectItem value="importante">Importante</SelectItem>
                              <SelectItem value="urgente">Urgente</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tous">Tous</SelectItem>
                              <SelectItem value="membres">Membres</SelectItem>
                              <SelectItem value="leaders">Leaders</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contenu</label>
                        <Textarea placeholder="Contenu de l'annonce" rows={5} />
                      </div>
                      <Button type="submit" className="w-full bg-[#1e3a5f]">Créer Annonce</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl shadow-md p-6">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {announcements.filter((a) => a.title.toLowerCase().includes(search.toLowerCase())).map((announcement) => (
                  <motion.div key={announcement.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex gap-3 flex-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${announcement.priority === 'urgente' ? 'bg-red-100 text-red-800' : announcement.priority === 'importante' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                          {announcement.priority}
                        </span>
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">
                          {announcement.audience}
                        </span>
                      </div>
                      <div className="relative group">
                        <button className="p-2 hover:bg-gray-100 rounded">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{announcement.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{announcement.content}</p>
                    <p className="text-xs text-gray-500">{announcement.date}</p>
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
