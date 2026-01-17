'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, MoreVertical, Trash2, Edit2, Bell, Search, LogOut, User } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import StatsCard from '@/components/admin/StatsCard';
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

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);
  const { members, events, announcements, preachings } = useAppContext();

  const stats = [
    { icon: 'users', title: 'Membres', value: String(members.length), trend: '+12%' },
    { icon: 'gift', title: 'Événements', value: String(events.length), trend: '+8%' },
    { icon: 'pray', title: 'Annonces', value: String(announcements.length), trend: '+24%' },
    { icon: 'check', title: 'Prédications', value: String(preachings.length), trend: '-3%' },
  ];

  const recentPrayers = [
    { id: 1, name: 'Jean', subject: 'Santé familiale', category: 'Santé', urgent: true },
    { id: 2, name: 'Marie', subject: 'Situation professionnelle', category: 'Travail', urgent: false },
    { id: 3, name: 'David', subject: 'Guidance spirituelle', category: 'Sagesse', urgent: false },
    { id: 4, name: 'Sarah', subject: 'Restauration familiale', category: 'Famille', urgent: true },
  ];

  const recentDonations = [
    { donor: 'Anonyme', type: 'Offrande', amount: '$250', date: 'Aujourd\'hui' },
    { donor: 'Jean Nkosi', type: 'Dîme', amount: '$150', date: 'Hier' },
    { donor: 'Marie K.', type: 'Don spécial', amount: '$500', date: '2 jours' },
  ];

  const upcomingEvents = [
    { title: 'Service Principal', date: 'Dimanche 14:00', icon: '⛪' },
    { title: 'Jeûne & Prière', date: 'Lundi 06:00', icon: '🙏' },
    { title: 'Conférence Femmes', date: 'Samedi 14:00', icon: '👩' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
              <p className="text-gray-600 mt-2">Bienvenue sur le panneau d'administration</p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <StatsCard {...stat} />
                </motion.div>
              ))}
            </motion.div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Prayer Requests */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-2 bg-white rounded-xl p-6 shadow-md"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Demandes de Prière Récentes</h2>
                <div className="space-y-3">
                  {recentPrayers.map((prayer) => (
                    <div key={prayer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{prayer.name}</p>
                        <p className="text-sm text-gray-600">{prayer.subject}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${prayer.urgent ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                        {prayer.category} {prayer.urgent && '🚨'}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Upcoming Events */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Événements à Venir</h2>
                <div className="space-y-3">
                  {upcomingEvents.map((event, idx) => (
                    <div key={idx} className="p-4 bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8f] text-white rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{event.icon}</span>
                        <div className="flex-1">
                          <p className="font-semibold">{event.title}</p>
                          <p className="text-sm text-white/80">{event.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Recent Donations */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mt-6 bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Dons Récents</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Donateur</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Montant</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDonations.map((donation, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{donation.donor}</td>
                        <td className="py-3 px-4">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {donation.type}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-green-600">{donation.amount}</td>
                        <td className="py-3 px-4 text-gray-600">{donation.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Actions Rapides</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Ajouter Membre', icon: '👤' },
                  { label: 'Créer Événement', icon: '📅' },
                  { label: 'Publier Annonce', icon: '📢' },
                  { label: 'Enregistrer Don', icon: '💰' },
                ].map((action) => (
                  <button key={action.label} className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-4 font-semibold text-gray-900 transition-colors">
                    <span className="text-2xl">{action.icon}</span>
                    <span className="hidden sm:inline text-sm">{action.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
