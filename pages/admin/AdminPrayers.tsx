'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import StatsCard from '@/components/admin/StatsCard';
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

const prayers = [
  {
    id: 1,
    name: 'Jean Baptiste',
    category: 'Santé',
    subject: 'Santé familiale',
    content: 'Ma mère est malade et a besoin de guérison...',
    urgent: true,
    status: 'new',
    date: '2024-01-20',
    phone: '+243812345678',
  },
  {
    id: 2,
    name: 'Marie Kalonda',
    category: 'Travail',
    subject: 'Emploi',
    content: 'Je cherche un emploi depuis longtemps...',
    urgent: false,
    status: 'praying',
    date: '2024-01-19',
    phone: '+243987654321',
  },
];

export default function AdminPrayers() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [prayersList, setPrayersList] = useState(prayers);

  const stats = [
    { icon: 'new', title: 'Nouvelles', value: '8', color: 'blue' },
    { icon: 'pray', title: 'En Prière', value: '12', color: 'yellow' },
    { icon: 'check', title: 'Exaucées', value: '24', color: 'green' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Demandes de Prière</h1>
              <p className="text-gray-600 mt-2">Gérez les demandes de prière</p>
            </motion.div>

            {/* Stats */}
            <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {stats.map((stat) => (
                <StatsCard key={stat.title} {...stat} />
              ))}
            </motion.div>

            {/* List */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="flex gap-4 mb-6">
                <Input placeholder="Rechercher..." className="flex-1" />
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous</SelectItem>
                    <SelectItem value="new">Nouvelles</SelectItem>
                    <SelectItem value="praying">En Prière</SelectItem>
                    <SelectItem value="answered">Exaucées</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {prayersList.map((prayer) => (
                <motion.div
                  key={prayer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`border-l-4 p-6 rounded-lg bg-white ${
                    prayer.status === 'new'
                      ? 'border-blue-500'
                      : prayer.status === 'praying'
                      ? 'border-yellow-500'
                      : 'border-green-500'
                  }`}
                >
                  <div className="grid grid-cols-5 gap-6">
                    <div className="col-span-3">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-gray-900">{prayer.subject}</h3>
                        {prayer.urgent && <span className="text-red-600 font-bold">🚨 URGENT</span>}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{prayer.name}</p>
                      <p className="text-gray-700 text-sm mb-3">{prayer.content}</p>
                      <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">
                        {prayer.category}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <div className="flex gap-2 mb-4">
                        <select className="flex-1 px-3 py-2 border rounded text-sm">
                          <option>Nouvelle</option>
                          <option>En prière</option>
                          <option>Exaucée</option>
                        </select>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p><span className="font-semibold">📞</span> {prayer.phone}</p>
                        <p><span className="font-semibold">📅</span> {prayer.date}</p>
                      </div>
                      <Button variant="outline" className="w-full mt-4 text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Supprimer
                      </Button>
                    </div>
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
