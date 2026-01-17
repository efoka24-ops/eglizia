'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, Clock, MapPin } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
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

interface WeeklyScheduleItem {
  id?: string;
  day: 'Dimanche' | 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi';
  startTime: string;
  endTime: string;
  event: string;
  location: string;
  description?: string;
}

export default function AdminProgrammes() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [schedule, setSchedule] = useState<WeeklyScheduleItem[]>([
    { id: '1', day: 'Dimanche', startTime: '09:30', endTime: '12:30', event: 'Service Principal', location: 'Salle Principale', description: 'Service de culte hebdomadaire' },
    { id: '2', day: 'Mercredi', startTime: '19:00', endTime: '20:30', event: 'Réunion de Prière', location: 'Salle de Prière', description: 'Intercession collective' },
    { id: '3', day: 'Vendredi', startTime: '20:00', endTime: '21:30', event: 'Adoration & Worship', location: 'Salle Principale', description: 'Adoration et louange' },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<WeeklyScheduleItem>({
    day: 'Dimanche',
    startTime: '',
    endTime: '',
    event: '',
    location: '',
    description: '',
  });

  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  const handleAdd = () => {
    if (formData.event && formData.location && formData.startTime && formData.endTime) {
      const newItem = {
        ...formData,
        id: Date.now().toString(),
      };
      setSchedule([...schedule, newItem]);
      setFormData({ day: 'Dimanche', startTime: '', endTime: '', event: '', location: '', description: '' });
    }
  };

  const handleEdit = (item: WeeklyScheduleItem) => {
    setFormData(item);
    setEditingId(item.id || null);
  };

  const handleUpdate = () => {
    if (editingId) {
      setSchedule(schedule.map(item => item.id === editingId ? { ...formData, id: editingId } : item));
      setFormData({ day: 'Dimanche', startTime: '', endTime: '', event: '', location: '', description: '' });
      setEditingId(null);
    }
  };

  const handleDelete = (id: string) => {
    setSchedule(schedule.filter(item => item.id !== id));
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
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Horaire Hebdomadaire</h1>
                  <p className="text-gray-600 mt-2">Gérez l'horaire des programmes de l'église</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="bg-[#1e3a5f] hover:bg-[#2d5a8f]"
                      onClick={() => {
                        setEditingId(null);
                        setFormData({ day: 'Dimanche', startTime: '', endTime: '', event: '', location: '', description: '' });
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter Créneau
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{editingId ? 'Modifier' : 'Ajouter'} un Créneau</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Jour</label>
                        <Select value={formData.day} onValueChange={(value) => setFormData({ ...formData, day: value as WeeklyScheduleItem['day'] })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {days.map(day => (
                              <SelectItem key={day} value={day}>{day}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Heure de Début</label>
                          <Input
                            type="time"
                            value={formData.startTime}
                            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Heure de Fin</label>
                          <Input
                            type="time"
                            value={formData.endTime}
                            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Événement</label>
                        <Input
                          placeholder="Nom de l'événement"
                          value={formData.event}
                          onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
                        <Input
                          placeholder="Lieu"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <Textarea
                          placeholder="Description (optionnel)"
                          value={formData.description || ''}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button
                          className="bg-[#1e3a5f] hover:bg-[#2d5a8f]"
                          onClick={editingId ? handleUpdate : handleAdd}
                        >
                          {editingId ? 'Modifier' : 'Ajouter'}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>

            {/* Schedule Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {schedule.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-[#1e3a5f]">{item.day}</h3>
                      <p className="text-lg font-semibold text-gray-900 mt-2">{item.event}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id!)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-5 h-5 text-[#1e3a5f]" />
                      <span className="font-medium">{item.startTime} - {item.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5 text-[#1e3a5f]" />
                      <span className="font-medium">{item.location}</span>
                    </div>
                    {item.description && (
                      <p className="text-gray-600 text-sm italic pt-2 border-t">{item.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {schedule.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white rounded-xl"
              >
                <p className="text-gray-500 text-lg">Aucun créneau programmé</p>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
