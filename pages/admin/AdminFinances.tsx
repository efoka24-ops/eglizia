'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import StatsCard from '@/components/admin/StatsCard';
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

const finances = {
  donations: [
    { donor: 'Jean Nkosi', type: 'Dîme', amount: 150, date: '2024-01-20' },
    { donor: 'Marie K.', type: 'Offrande', amount: 250, date: '2024-01-20' },
  ],
  expenses: [
    { title: 'Électricité', category: 'Utilitaires', amount: 200, date: '2024-01-20' },
    { title: 'Maintenance', category: 'Réparation', amount: 500, date: '2024-01-19' },
  ],
};

export default function AdminFinances() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('donations');

  const stats = [
    { icon: 'gift', title: 'Total Entrées', value: '$8,450', trend: '+15%' },
    { icon: 'cost', title: 'Total Dépenses', value: '$3,200', trend: '+8%' },
    { icon: 'balance', title: 'Solde', value: '$5,250', trend: '+22%' },
    { icon: 'month', title: 'Ce Mois', value: '$2,100', trend: '+5%' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Finances</h1>
              <p className="text-gray-600 mt-2">Gérez les dons et les dépenses</p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              {stats.map((stat) => (
                <StatsCard key={stat.title} {...stat} />
              ))}
            </motion.div>

            {/* Tabs */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex gap-4 mb-6 border-b">
                <button
                  onClick={() => setActiveTab('donations')}
                  className={`py-3 px-6 font-semibold border-b-2 transition-colors ${
                    activeTab === 'donations'
                      ? 'border-[#1e3a5f] text-[#1e3a5f]'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Dons
                </button>
                <button
                  onClick={() => setActiveTab('expenses')}
                  className={`py-3 px-6 font-semibold border-b-2 transition-colors ${
                    activeTab === 'expenses'
                      ? 'border-[#1e3a5f] text-[#1e3a5f]'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Dépenses
                </button>
              </div>

              {activeTab === 'donations' && (
                <div>
                  <div className="mb-6">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700">
                          <Plus className="w-4 h-4 mr-2" />
                          Ajouter Don
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Enregistrer un Don</DialogTitle>
                        </DialogHeader>
                        <form className="space-y-4">
                          <Input placeholder="Donateur" />
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dime">Dîme</SelectItem>
                              <SelectItem value="offrande">Offrande</SelectItem>
                              <SelectItem value="special">Spécial</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input type="number" placeholder="Montant" />
                          <Button type="submit" className="w-full">Enregistrer</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Donateur</th>
                          <th className="text-left py-3 px-4 font-semibold">Type</th>
                          <th className="text-left py-3 px-4 font-semibold">Montant</th>
                          <th className="text-left py-3 px-4 font-semibold">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {finances.donations.map((donation, idx) => (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{donation.donor}</td>
                            <td className="py-3 px-4">
                              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                {donation.type}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-semibold text-green-600">${donation.amount}</td>
                            <td className="py-3 px-4">{donation.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'expenses' && (
                <div>
                  <div className="mb-6">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-red-600 hover:bg-red-700">
                          <Plus className="w-4 h-4 mr-2" />
                          Ajouter Dépense
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Enregistrer une Dépense</DialogTitle>
                        </DialogHeader>
                        <form className="space-y-4">
                          <Input placeholder="Titre" />
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Catégorie" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="utilitaires">Utilitaires</SelectItem>
                              <SelectItem value="reparation">Réparation</SelectItem>
                              <SelectItem value="salaires">Salaires</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input type="number" placeholder="Montant" />
                          <Button type="submit" className="w-full">Enregistrer</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Titre</th>
                          <th className="text-left py-3 px-4 font-semibold">Catégorie</th>
                          <th className="text-left py-3 px-4 font-semibold">Montant</th>
                          <th className="text-left py-3 px-4 font-semibold">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {finances.expenses.map((expense, idx) => (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 font-semibold">{expense.title}</td>
                            <td className="py-3 px-4">
                              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                                {expense.category}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-semibold text-red-600">${expense.amount}</td>
                            <td className="py-3 px-4">{expense.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
