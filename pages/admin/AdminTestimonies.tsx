'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, CheckCircle, XCircle } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppContext } from '@/lib/AppContext';

export default function AdminTestimonies() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { testimonies, updateTestimony, deleteTestimony } = useAppContext();

  const pending = testimonies && testimonies.length > 0 ? testimonies.filter((t: any) => t.status === 'pending') : [];
  const approved = testimonies && testimonies.length > 0 ? testimonies.filter((t: any) => t.status === 'approved') : [];

  const handleApprove = (id: string) => {
    updateTestimony(id, { status: 'approved' });
  };

  const handleReject = (id: string) => {
    updateTestimony(id, { status: 'rejected' });
  };

  const handleToggleFeatured = (id: string, featured: boolean) => {
    updateTestimony(id, { featured: !featured });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Témoignages</h1>
              <p className="text-gray-600 mt-2">Approuvez et publiez les témoignages</p>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl shadow-md p-6">
              <Tabs defaultValue="pending">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="pending" className="flex items-center gap-2">
                    En attente ({pending.length})
                  </TabsTrigger>
                  <TabsTrigger value="approved" className="flex items-center gap-2">
                    Approuvés ({approved.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="space-y-4">
                  {pending.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Aucun témoignage en attente</p>
                    </div>
                  ) : (
                    <>
                      {pending.map((testimony: any) => (
                        <motion.div
                          key={testimony.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border-l-4 border-yellow-400 bg-yellow-50 p-6 rounded-lg"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-bold text-gray-900">{testimony.title}</h3>
                              <p className="text-sm text-gray-600">{testimony.name}</p>
                            </div>
                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">
                              {testimony.type}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-4">{testimony.content}</p>
                          <div className="flex gap-2">
                            <Button 
                              onClick={() => handleApprove(testimony.id)}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approuver
                            </Button>
                            <Button 
                              onClick={() => handleReject(testimony.id)}
                              variant="outline" 
                              className="text-red-600"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Rejeter
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </>
                  )}
                </TabsContent>

                <TabsContent value="approved" className="space-y-4">
                  {approved.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Aucun témoignage approuvé</p>
                    </div>
                  ) : (
                    <>
                      {approved.map((testimony: any) => (
                        <motion.div
                          key={testimony.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`border-l-4 ${testimony.featured ? 'border-[#d4af37] bg-[#d4af37]/5' : 'border-green-400 bg-green-50'} p-6 rounded-lg`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                {testimony.title}
                                {testimony.featured && <span>⭐</span>}
                              </h3>
                              <p className="text-sm text-gray-600">{testimony.name}</p>
                            </div>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                              {testimony.type}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-4">{testimony.content}</p>
                          <div className="flex gap-2">
                            <Button 
                              onClick={() => handleToggleFeatured(testimony.id, testimony.featured)}
                              variant="outline"
                            >
                              {testimony.featured ? 'Retirer de vedette' : 'Mettre en vedette'}
                            </Button>
                            <Button 
                              onClick={() => deleteTestimony(testimony.id)}
                              variant="outline" 
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Supprimer
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </>
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
