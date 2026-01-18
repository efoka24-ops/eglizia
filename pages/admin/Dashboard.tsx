'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, MoreVertical, Trash2, Edit2, Bell, Search, LogOut, User, Users, Gift, Heart, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import StatsCard from '@/components/admin/StatsCard';
import { useAppContext } from '@/lib/AppContext';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { 
    members = [], 
    events = [], 
    announcements = [], 
    preachings = [], 
    prayers = [],
    finances = []
  } = useAppContext();

  // Stats cards with real data
  const stats = [
    { icon: Users, title: 'Membres', value: String(members.length || 0), trend: '+12%' },
    { icon: Gift, title: 'Événements', value: String(events.length || 0), trend: '+8%' },
    { icon: Heart, title: 'Annonces', value: String(announcements.length || 0), trend: '+24%' },
    { icon: CheckCircle, title: 'Prédications', value: String(preachings.length || 0), trend: '-3%' },
  ];

  // Get recent prayer requests from context
  const recentPrayers = (prayers || [])
    .slice()
    .reverse()
    .slice(0, 4)
    .map((prayer: any) => ({
      id: prayer.id,
      name: prayer.requester_name || prayer.name || 'Sans nom',
      subject: prayer.subject || prayer.title || '',
      category: prayer.prayer_category || prayer.category || 'autre',
      urgent: prayer.is_urgent || prayer.category === 'Urgence',
    }));

  // Get upcoming events from context
  const upcomingEvents = (events || [])
    .filter((event: any) => new Date(event.date) > new Date())
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3)
    .map((event: any) => ({
      title: event.title,
      date: new Date(event.date).toLocaleDateString('fr-FR', { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      icon: '⛪',
    }));

  // Get recent donations from context
  const recentDonations = (finances || [])
    .filter((f: any) => f.type === 'donation' || f.type === 'Don')
    .slice()
    .reverse()
    .slice(0, 5)
    .map((donation: any) => ({
      donor: donation.donor_name || 'Donateur',
      type: donation.donation_type || 'Don',
      amount: `$${donation.amount || 0}`,
      date: new Date(donation.date).toLocaleDateString('fr-FR'),
    }));

  // Quick actions
  const quickActions = [
    { label: 'Ajouter Membre', icon: '👤', route: '/admin/members' },
    { label: 'Créer Événement', icon: '📅', route: '/admin/events' },
    { label: 'Publier Annonce', icon: '📢', route: '/admin/announcements' },
    { label: 'Enregistrer Don', icon: '💰', route: '/admin/finances' },
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
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Demandes de Prière Récentes</h2>
                  <Button variant="outline" size="sm" onClick={() => navigate('/admin/prayers')}>
                    Voir Plus
                  </Button>
                </div>
                <div className="space-y-3">
                  {recentPrayers.length > 0 ? (
                    recentPrayers.map((prayer) => (
                      <div key={prayer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{prayer.name}</p>
                          <p className="text-sm text-gray-600">{prayer.subject}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-4 ${prayer.urgent ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                          {prayer.category} {prayer.urgent && '🚨'}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Heart className="w-12 h-12 mx-auto mb-2 opacity-30" />
                      <p>Aucune demande de prière</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Upcoming Events */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Événements à Venir</h2>
                  <Button variant="outline" size="sm" onClick={() => navigate('/admin/events')}>
                    Voir Plus
                  </Button>
                </div>
                <div className="space-y-3">
                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event, idx) => (
                      <div key={idx} className="p-4 bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8f] text-white rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{event.icon}</span>
                          <div className="flex-1">
                            <p className="font-semibold">{event.title}</p>
                            <p className="text-sm text-white/80">{event.date}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 opacity-50" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Gift className="w-12 h-12 mx-auto mb-2 opacity-30" />
                      <p>Aucun événement à venir</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Recent Donations */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mt-6 bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Dons Récents</h2>
                <Button variant="outline" size="sm" onClick={() => navigate('/admin/finances')}>
                  Voir Plus
                </Button>
              </div>
              {recentDonations.length > 0 ? (
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
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Gift className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>Aucun don enregistré</p>
                </div>
              )}
            </motion.div>

            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Actions Rapides</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {quickActions.map((action) => (
                  <button 
                    key={action.label} 
                    onClick={() => navigate(action.route)}
                    className="flex flex-col items-center justify-center gap-2 bg-white hover:bg-[#1e3a5f] hover:text-white border border-gray-200 hover:border-[#1e3a5f] rounded-lg p-4 font-semibold text-gray-900 transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="text-2xl">{action.icon}</span>
                    <span className="text-xs sm:text-sm text-center">{action.label}</span>
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
