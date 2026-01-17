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
import type { Department } from '@/entities';

export default function AdminDepartments() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    leader_id: '',
  });
  const { departments, addDepartment, updateDepartment, deleteDepartment } = useAppContext();

  const handleAddDepartment = () => {
    if (editingId) {
      updateDepartment(editingId, {
        name: formData.name,
        description: formData.description,
        leader_id: formData.leader_id,
      });
      setEditingId(null);
    } else {
      const newDepartment: Department = {
        id: String(Date.now()),
        name: formData.name,
        description: formData.description,
        leader_id: formData.leader_id,
        member_count: 0,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      addDepartment(newDepartment);
    }
    setFormData({ name: '', description: '', leader_id: '' });
    setIsDialogOpen(false);
  };

  const handleEdit = (dept: Department) => {
    setFormData({
      name: dept.name || '',
      description: dept.description || '',
      leader_id: dept.leader_id || '',
    });
    setEditingId(dept.id);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string | undefined) => {
    if (id) deleteDepartment(id);
  };

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
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      onClick={() => {
                        setEditingId(null);
                        setFormData({ name: '', description: '', leader_id: '' });
                      }}
                      className="bg-[#1e3a5f] hover:bg-[#2d5a8f]"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter un Département
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{editingId ? 'Modifier le département' : 'Créer un Département'}</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                        <Input 
                          placeholder="Nom du département"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Leader ID</label>
                          <Input 
                            placeholder="ID du leader"
                            value={formData.leader_id}
                            onChange={(e) => setFormData({ ...formData, leader_id: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <Textarea 
                          placeholder="Description..." 
                          rows={3}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                      </div>
                      <Button type="button" onClick={handleAddDepartment} className="w-full bg-[#1e3a5f]">
                        {editingId ? 'Mettre à jour' : 'Créer'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept) => (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{dept.name}</h3>
                      {dept.description && <p className="text-sm text-gray-600 mt-1">{dept.description}</p>}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEdit(dept)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600"
                        onClick={() => handleDelete(dept.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-semibold">Membres:</span> {dept.member_count || 0}</p>
                    {dept.leader_id && (
                      <p><span className="font-semibold">Leader:</span> {dept.leader_id}</p>
                    )}
                  </div>
                  {dept.is_active && (
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
