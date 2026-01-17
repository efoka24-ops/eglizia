'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, Search } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppContext } from '@/lib/AppContext';
import type { Member } from '@/entities';

const MEMBER_ROLES = [
  { value: 'pastor', label: 'Pasteur Principal' },
  { value: 'co-pastor', label: 'Co-Pasteure' },
  { value: 'leader', label: 'Leader' },
  { value: 'youth-leader', label: 'Responsable Jeunesse' },
  { value: 'women-leader', label: 'Responsable Femmes' },
  { value: 'men-leader', label: 'Responsable Hommes' },
  { value: 'children-leader', label: 'Responsable Enfants' },
  { value: 'worship-leader', label: 'Responsable Culte' },
  { value: 'coordinator', label: 'Coordinateur' },
  { value: 'member', label: 'Membre' },
];

const DEPARTMENTS = [
  { value: '1', label: 'Culte et Louange' },
  { value: '2', label: 'Jeunesse' },
  { value: '3', label: 'Intercession' },
  { value: '4', label: 'Femmes' },
  { value: '5', label: 'Hommes' },
  { value: '6', label: 'Enfants' },
];

export default function AdminMembers() {
  const { members, addMember, updateMember, deleteMember } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('tous');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    role: 'member',
    status: 'active',
    join_date: new Date().toISOString().split('T')[0],
    department_id: '1',
    bio: '',
    avatar_url: '',
  });

  const filteredMembers = members.filter(member => {
    const matchesSearch = `${member.first_name} ${member.last_name}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesRole = roleFilter === 'tous' || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleAddMember = () => {
    if (editingId) {
      updateMember(editingId, {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role as any,
        status: formData.status as any,
        department_id: formData.department_id,
        avatar_url: formData.avatar_url,
        bio: formData.bio,
      });
      setEditingId(null);
    } else {
      const newMember: Member = {
        id: String(Date.now()),
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role as any,
        status: formData.status as any,
        join_date: formData.join_date,
        department_id: formData.department_id,
        avatar_url: formData.avatar_url,
        bio: formData.bio,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      addMember(newMember);
    }
    resetForm();
    setIsOpen(false);
  };

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      role: 'member',
      status: 'active',
      join_date: new Date().toISOString().split('T')[0],
      department_id: '1',
      bio: '',
      avatar_url: '',
    });
  };

  const handleEdit = (member: Member) => {
    setFormData({
      first_name: member.first_name,
      last_name: member.last_name,
      email: member.email || '',
      phone: member.phone || '',
      role: member.role || 'member',
      status: member.status || 'active',
      join_date: member.join_date || new Date().toISOString().split('T')[0],
      department_id: member.department_id || '1',
      bio: member.bio || '',
      avatar_url: member.avatar_url || '',
    });
    setEditingId(member.id);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteMember(id);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Gestion des Membres</h1>
                  <p className="text-gray-600 mt-2">Gérez les pasteurs, leaders et membres de votre église</p>
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        resetForm();
                        setEditingId(null);
                      }}
                      className="bg-[#1e3a5f] hover:bg-[#2d5a8f]"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter un Membre
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {editingId ? 'Modifier le membre' : 'Ajouter un nouveau membre'}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Prénom *</label>
                          <Input
                            value={formData.first_name}
                            onChange={e =>
                              setFormData({ ...formData, first_name: e.target.value })
                            }
                            placeholder="Jean"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Nom *</label>
                          <Input
                            value={formData.last_name}
                            onChange={e =>
                              setFormData({ ...formData, last_name: e.target.value })
                            }
                            placeholder="Nkosi"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Email *</label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            placeholder="jean@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Téléphone</label>
                          <Input
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+237 6XX XXX XXX"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Rôle *</label>
                          <Select
                            value={formData.role}
                            onValueChange={value =>
                              setFormData({ ...formData, role: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {MEMBER_ROLES.map(role => (
                                <SelectItem key={role.value} value={role.value}>
                                  {role.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Département</label>
                          <Select
                            value={formData.department_id}
                            onValueChange={value =>
                              setFormData({ ...formData, department_id: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {DEPARTMENTS.map(dept => (
                                <SelectItem key={dept.value} value={dept.value}>
                                  {dept.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Statut</label>
                          <Select
                            value={formData.status}
                            onValueChange={value =>
                              setFormData({ ...formData, status: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Actif</SelectItem>
                              <SelectItem value="inactive">Inactif</SelectItem>
                              <SelectItem value="pending">En attente</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Date d'adhésion
                          </label>
                          <Input
                            type="date"
                            value={formData.join_date}
                            onChange={e =>
                              setFormData({ ...formData, join_date: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Bio / Description</label>
                        <Textarea
                          value={formData.bio}
                          onChange={e => setFormData({ ...formData, bio: e.target.value })}
                          placeholder="Entrez une description détaillée du membre (expérience, ministère, passions, etc.)"
                          className="h-24"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Photo du Membre</label>
                        <div className="flex gap-2">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setFormData({
                                    ...formData,
                                    avatar_url: reader.result as string,
                                  });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="flex-1"
                          />
                        </div>
                        {formData.avatar_url && (
                          <div className="mt-2">
                            <img
                              src={formData.avatar_url}
                              alt="Aperçu"
                              className="h-20 w-20 object-cover rounded"
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 justify-end pt-4 border-t">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsOpen(false);
                            setEditingId(null);
                          }}
                        >
                          Annuler
                        </Button>
                        <Button
                          onClick={handleAddMember}
                          className="bg-[#1e3a5f] hover:bg-[#2d5a8f]"
                        >
                          {editingId ? 'Mettre à jour' : 'Ajouter'}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl shadow-md p-6">
              <div className="mb-6 flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Rechercher par nom..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-56">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous les rôles</SelectItem>
                    {MEMBER_ROLES.map(role => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {member.first_name} {member.last_name}
                        </CardTitle>
                        <p className="text-sm text-[#1e3a5f] font-semibold">
                          {MEMBER_ROLES.find(r => r.value === member.role)?.label}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm mb-4">
                          <p>
                            <strong>Email:</strong> {member.email}
                          </p>
                          <p>
                            <strong>Téléphone:</strong> {member.phone}
                          </p>
                          <p>
                            <strong>Département:</strong>{' '}
                            {DEPARTMENTS.find(d => d.value === member.department_id)?.label}
                          </p>
                          <p>
                            <strong>Statut:</strong>{' '}
                            <span
                              className={
                                member.status === 'active'
                                  ? 'text-green-600 font-semibold'
                                  : 'text-red-600 font-semibold'
                              }
                            >
                              {member.status === 'active' ? '✓ Actif' : '✗ Inactif'}
                            </span>
                          </p>
                          <p>
                            <strong>Adhésion:</strong> {member.join_date}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(member)}
                            className="flex-1"
                          >
                            <Edit2 className="w-4 h-4 mr-1" />
                            Modifier
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(member.id)}
                            className="flex-1"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Supprimer
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredMembers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Aucun membre trouvé</p>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
