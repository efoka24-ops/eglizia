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

const departments = [
  {
    id: 1,
    name: 'Intercession',
    icon: '🙏',
    leader: 'Pasteur Jean Mutamba',
    meeting: 'Lundi 19:00',
    active: true,
  },
  {
    id: 2,
    name: 'Louange',
    icon: '🎵',
    leader: 'Soeur Marie Kasongo',
    meeting: 'Jeudi 18:00',
    active: true,
  },
];

export default function AdminDepartments() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { departments, addDepartment, updateDepartment, deleteDepartment } = useAppContext();

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
                  <h1 className="text-3xl font-bold text-gray-900">Départements</h1>
                  <p className="text-gray-600 mt-2">Gérez les départements ministériels</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-[#1e3a5f] hover:bg-[#2d5a8f]">
                      <Plus className="w-4 h-4 mr-2" />
                      Nouveau Département
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Créer un Département</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                        <Input placeholder="Nom du département" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Leader</label>
                          <Input placeholder="Nom du leader" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Réunion</label>
                          <Input placeholder="Jour et heure" />
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
              {departmentsList.map((dept) => (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{dept.icon}</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{dept.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-semibold">Leader:</span> {dept.leader}</p>
                    <p><span className="font-semibold">Réunion:</span> {dept.meeting}</p>
                  </div>
                  {dept.active && (
                    <span className="inline-block mt-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                      Actif
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
