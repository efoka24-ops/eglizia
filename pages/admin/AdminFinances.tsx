'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, Download, Filter, Search, DollarSign, TrendingUp, Users, Heart } from 'lucide-react';
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
  const { donations = [] } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Calculate statistics from real donations
  const totalDonations = donations.reduce((sum, d) => sum + (d.amount || 0), 0);
  const completedDonations = donations.filter(d => d.status === 'completed' || d.status === 'success').length;
  const pendingDonations = donations.filter(d => d.status === 'pending').length;
  const averageDonation = donations.length > 0 ? (totalDonations / donations.length).toFixed(2) : 0;

  // Filter donations
  const filteredDonations = donations.filter(donation => {
    const matchesSearch =
      !searchTerm ||
      donation.donor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.phone?.includes(searchTerm);

    const matchesStatus =
      filterStatus === 'all' ||
      donation.status === filterStatus;

    const matchesType =
      filterType === 'all' ||
      donation.donation_type === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = [
    { 
      icon: DollarSign, 
      title: 'Montant Total', 
      value: `$${totalDonations.toFixed(2)}`, 
      color: 'green',
      trend: '+8%'
    },
    { 
      icon: Users, 
      title: 'Donateurs', 
      value: String(donations.length), 
      color: 'blue',
      trend: '+12%'
    },
    { 
      icon: TrendingUp, 
      title: 'Montant Moyen', 
      value: `$${averageDonation}`, 
      color: 'purple',
      trend: '+4%'
    },
    { 
      icon: Heart, 
      title: 'En Attente', 
      value: String(pendingDonations), 
      color: 'orange',
      trend: `${completedDonations} complétés`
    },
  ];

  const exportToCSV = () => {
    const headers = ['Donateur', 'Email', 'Téléphone', 'Montant', 'Type', 'Statut', 'Date'];
    const csvContent = [
      headers.join(','),
      ...filteredDonations.map(d =>
        [
          `"${d.donor_name}"`,
          `"${d.email}"`,
          `"${d.phone || 'N/A'}"`,
          d.amount,
          d.donation_type,
          d.status,
          new Date(d.date).toLocaleDateString('fr-FR'),
        ].join(',')
      ),
    ].join('\n');

    const element = document.createElement('a');
    element.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`);
    element.setAttribute('download', `donations_${new Date().toISOString().split('T')[0]}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'En Attente' },
      completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Complété' },
      success: { bg: 'bg-green-100', text: 'text-green-800', label: 'Succès' },
      failed: { bg: 'bg-red-100', text: 'text-red-800', label: 'Échoué' },
      cancelled: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Annulé' },
    };
    const info = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${info.bg} ${info.text}`}>{info.label}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Finances & Dons</h1>
              <p className="text-gray-600 mt-2">Gérez les donations et les finances</p>
            </motion.div>

            {/* Stats */}
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

            {/* Donations Table */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              {/* Filters */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Rechercher par nom, email ou téléphone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button onClick={exportToCSV} variant="outline" size="sm" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Exporter CSV
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous</SelectItem>
                        <SelectItem value="pending">En Attente</SelectItem>
                        <SelectItem value="completed">Complété</SelectItem>
                        <SelectItem value="success">Succès</SelectItem>
                        <SelectItem value="failed">Échoué</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type de Don</label>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous</SelectItem>
                        <SelectItem value="dime">Dîme</SelectItem>
                        <SelectItem value="offrande">Offrande</SelectItem>
                        <SelectItem value="special">Don Spécial</SelectItem>
                        <SelectItem value="projet">Projet Spécifique</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Table */}
              {filteredDonations.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Donateur</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Téléphone</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Montant</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Statut</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDonations.map((donation) => (
                        <motion.tr
                          key={donation.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-4 font-medium text-gray-900">
                            {donation.donor_name || 'N/A'}
                          </td>
                          <td className="py-3 px-4 text-gray-600 text-sm">
                            {donation.email || 'N/A'}
                          </td>
                          <td className="py-3 px-4 text-gray-600 text-sm">
                            {donation.phone || 'N/A'}
                          </td>
                          <td className="py-3 px-4 font-semibold text-green-600">
                            ${donation.amount?.toFixed(2) || '0.00'}
                          </td>
                          <td className="py-3 px-4">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium capitalize">
                              {donation.donation_type || 'N/A'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {getStatusBadge(donation.status || 'pending')}
                          </td>
                          <td className="py-3 px-4 text-gray-600 text-sm">
                            {new Date(donation.date).toLocaleDateString('fr-FR')}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <DollarSign className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>Aucun don trouvé</p>
                </div>
              )}
            </motion.div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Résumé</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Total des Dons Affichés</p>
                  <p className="text-3xl font-bold text-green-600">
                    ${filteredDonations.reduce((sum, d) => sum + (d.amount || 0), 0).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nombre de Dons</p>
                  <p className="text-3xl font-bold text-blue-600">{filteredDonations.length}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
