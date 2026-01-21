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
import type { LiveStream } from '@/entities';

export default function AdminLive() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtube_url: '',
    facebook_url: '',
  });
  const { liveStreams, addLiveStream, updateLiveStream, deleteLiveStream } = useAppContext();

  const handleAddLiveStream = () => {
    if (editingId) {
      updateLiveStream(editingId, {
        title: formData.title,
        description: formData.description,
        youtube_url: formData.youtube_url,
        facebook_url: formData.facebook_url,
      });
      setEditingId(null);
    } else {
      const newLiveStream: LiveStream = {
        id: String(Date.now()),
        title: formData.title,
        description: formData.description,
        youtube_url: formData.youtube_url,
        facebook_url: formData.facebook_url,
        is_live: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      addLiveStream(newLiveStream);
    }
    setFormData({ title: '', description: '', youtube_url: '', facebook_url: '' });
    setIsDialogOpen(false);
  };

  const handleEdit = (stream: LiveStream) => {
    setFormData({
      title: stream.title || '',
      description: stream.description || '',
      youtube_url: stream.youtube_url || '',
      facebook_url: stream.facebook_url || '',
    });
    setEditingId(stream.id || null);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string | undefined) => {
    if (id) deleteLiveStream(id);
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
                  <h1 className="text-3xl font-bold text-gray-900">Flux en Direct</h1>
                  <p className="text-gray-600 mt-2">Gérez les diffusions en direct</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      onClick={() => {
                        setEditingId(null);
                        setFormData({ title: '', description: '', youtube_url: '', facebook_url: '' });
                      }}
                      className="bg-[#1e3a5f] hover:bg-[#2d5a8f]"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Nouveau Flux
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{editingId ? 'Modifier le flux' : 'Créer un Flux en Direct'}</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
                        <Input 
                          placeholder="Titre du flux"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL YouTube</label>
                        <Input 
                          placeholder="https://youtube.com/watch?v=..."
                          value={formData.youtube_url}
                          onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL Facebook</label>
                        <Input 
                          placeholder="https://facebook.com/..."
                          value={formData.facebook_url}
                          onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <Textarea 
                          placeholder="Description du flux..." 
                          rows={3}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                      </div>
                      <Button type="button" onClick={handleAddLiveStream} className="w-full bg-[#1e3a5f]">
                        {editingId ? 'Mettre à jour' : 'Créer Flux'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>

            {/* Live Streams List */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveStreams.map((stream) => (
                <motion.div
                  key={stream.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{stream.title}</h3>
                      {stream.description && <p className="text-sm text-gray-600 mt-1">{stream.description}</p>}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEdit(stream)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600"
                        onClick={() => handleDelete(stream.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    {stream.youtube_url && (
                      <p className="truncate"><span className="font-semibold">YouTube:</span> {stream.youtube_url}</p>
                    )}
                    {stream.facebook_url && (
                      <p className="truncate"><span className="font-semibold">Facebook:</span> {stream.facebook_url}</p>
                    )}
                  </div>
                  {stream.is_live && (
                    <span className="inline-block mt-4 bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                      EN DIRECT
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {liveStreams.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">Aucun flux en direct pour le moment</p>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#1e3a5f] hover:bg-[#2d5a8f]">
                      <Plus className="w-4 h-4 mr-2" />
                      Créer le premier flux
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
