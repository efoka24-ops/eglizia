'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, Calendar, Clock, MapPin } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAppContext } from '@/lib/AppContext';
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

const events = [
  {
    id: 1,
    title: 'Service Principal',
    type: 'culte',
    date: '2024-01-21',
    time: '09:30',
    location: 'Salle Principale',
    description: 'Service de culte hebdomadaire',
  },
  {
    id: 2,
    title: 'Réunion de Prière',
    type: 'priere',
    date: '2024-01-24',
    time: '19:00',
    location: 'Salle de Prière',
    description: 'Intercession collective',
  },
];

export default function AdminEvents() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { events: contextEvents, addEvent, updateEvent, deleteEvent } = useAppContext();

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
                  <h1 className="text-3xl font-bold text-gray-900">Événements</h1>
                  <p className="text-gray-600 mt-2">Gérez les événements et programmes</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-[#1e3a5f] hover:bg-[#2d5a8f]">
                      <Plus className="w-4 h-4 mr-2" />
                      Nouvel Événement
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Créer un Événement</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                        <Input placeholder="Titre de l'événement" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="culte">Culte</SelectItem>
                              <SelectItem value="priere">Prière</SelectItem>
                              <SelectItem value="conf">Conférence</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                          <Input type="date" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Heure</label>
                          <Input type="time" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
                          <Input placeholder="Salle..." />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <Textarea placeholder="Description..." rows={3} />
                      </div>
                      <Button type="submit" className="w-full bg-[#1e3a5f]">Créer</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventsList.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">
                      {event.type}
                    </span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{event.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-600 line-clamp-2">{event.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
