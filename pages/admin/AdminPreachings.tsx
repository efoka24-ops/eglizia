'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, Star } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AdminPreachings() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mediaSourceType, setMediaSourceType] = useState<'url' | 'file'>('url');
  const [formData, setFormData] = useState({
    title: '',
    preacher: '',
    reference: '',
    content: '',
    type: 'video',
    media_url: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const { preachings = [], addPreaching, deletePreaching, updatePreaching } = useAppContext();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a URL for the file (using Blob URL)
      const fileUrl = URL.createObjectURL(file);
      setFormData({ ...formData, media_url: fileUrl });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.preacher) {
      addPreaching({
        id: Date.now().toString(),
        title: formData.title,
        preacher: formData.preacher,
        bible_reference: formData.reference,
        description: formData.content,
        media_type: formData.type as any,
        media_url: formData.media_url,
        date: formData.date,
        is_featured: false,
        is_published: true,
      });
      setFormData({
        title: '',
        preacher: '',
        reference: '',
        content: '',
        type: 'video',
        media_url: '',
        date: new Date().toISOString().split('T')[0],
      });
      setMediaSourceType('url');
      setDialogOpen(false);
    }
  };

  const handleToggleFeatured = (id: string, featured: boolean) => {
    updatePreaching(id, { featured: !featured });
  };

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (open) {
      // Réinitialiser le formulaire quand on ouvre le dialogue
      setFormData({
        title: '',
        preacher: '',
        reference: '',
        content: '',
        type: 'video',
        media_url: '',
        date: new Date().toISOString().split('T')[0],
      });
      setMediaSourceType('url');
    }
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
                  <h1 className="text-3xl font-bold text-gray-900">Prédications</h1>
                  <p className="text-gray-600 mt-2">Gérez les prédications et enseignements</p>
                </div>
                <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#1e3a5f] hover:bg-[#2d5a8f]">
                      <Plus className="w-4 h-4 mr-2" />
                      Nouvelle Prédication
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Ajouter une Prédication</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                        <Input 
                          placeholder="Titre de la prédication"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Prédicateur</label>
                          <Input 
                            placeholder="Nom"
                            value={formData.preacher}
                            onChange={(e) => setFormData({ ...formData, preacher: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                          <Input 
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value, media_url: '' })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="video">Vidéo</SelectItem>
                              <SelectItem value="audio">Audio</SelectItem>
                              <SelectItem value="texte">Texte</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Référence Bible</label>
                          <Input 
                            placeholder="Livre Ch:V"
                            value={formData.reference}
                            onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Médias</label>
                        <div className="flex gap-2 mb-3">
                          <button
                            type="button"
                            onClick={() => setMediaSourceType('url')}
                            className={`flex-1 px-3 py-2 rounded border text-sm font-medium transition-colors ${
                              mediaSourceType === 'url'
                                ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            Lien URL
                          </button>
                          <button
                            type="button"
                            onClick={() => setMediaSourceType('file')}
                            className={`flex-1 px-3 py-2 rounded border text-sm font-medium transition-colors ${
                              mediaSourceType === 'file'
                                ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            Télécharger
                          </button>
                        </div>
                        {mediaSourceType === 'url' ? (
                          <div>
                            <Input 
                              placeholder={formData.type === 'video' ? 'https://youtube.com/...' : 'https://soundcloud.com/...'}
                              value={formData.media_url}
                              onChange={(e) => setFormData({ ...formData, media_url: e.target.value })}
                            />
                            <p className="text-xs text-gray-500 mt-1">YouTube, Vimeo, SoundCloud ou lien direct</p>
                          </div>
                        ) : (
                          <div>
                            <Input
                              type="file"
                              accept={formData.type === 'video' ? 'video/*' : 'audio/*'}
                              onChange={handleFileUpload}
                              className="cursor-pointer"
                            />
                            {formData.media_url && (
                              <p className="text-xs text-green-600 mt-1">✓ Fichier sélectionné</p>
                            )}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contenu/Description</label>
                        <Textarea 
                          placeholder="Description de la prédication..."
                          value={formData.content}
                          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                          rows={4}
                        />
                      </div>
                      <Button type="submit" className="w-full bg-[#1e3a5f]">Ajouter</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {preachings && preachings.length > 0 ? (
                preachings.map((sermon: any) => (
                  <motion.div
                    key={sermon.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex gap-2">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">
                          {sermon.type || 'Vidéo'}
                        </span>
                        {sermon.featured && (
                          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">
                            ⭐ Vedette
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleToggleFeatured(sermon.id, sermon.featured)}
                          variant="ghost" 
                          size="sm"
                          className={sermon.featured ? 'text-yellow-600' : 'text-gray-400'}
                        >
                          <Star className="w-4 h-4" />
                        </Button>
                        <Button 
                          onClick={() => deletePreaching(sermon.id)}
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{sermon.title}</h3>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <p><span className="font-semibold">Prédicateur:</span> {sermon.preacher}</p>
                      {sermon.reference && <p><span className="font-semibold">Bible:</span> {sermon.reference}</p>}
                      <p><span className="font-semibold">Date:</span> {new Date(sermon.date).toLocaleDateString('fr-FR')}</p>
                    </div>
                    {sermon.content && (
                      <p className="text-sm text-gray-700 line-clamp-3">{sermon.content}</p>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">Aucune prédication enregistrée</p>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
