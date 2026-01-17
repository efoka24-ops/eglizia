'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Mail, Phone, User, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/lib/AppContext';
import InteractionButtons from '@/components/InteractionButtons';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const weeklySchedule = [
  { day: 'Dimanche', time: '09:30 - 12:30', event: 'Service Principal', location: 'Salle Principale' },
  { day: 'Mercredi', time: '19:00 - 20:30', event: 'Réunion de Prière', location: 'Salle de Prière' },
  { day: 'Vendredi', time: '20:00 - 21:30', event: 'Adoration & Worship', location: 'Salle Principale' },
];

const upcomingEvents = [
  {
    date: '2024-01-21',
    title: 'Conférence Femmes',
    time: '14:00',
    location: 'Centre Communautaire',
  },
  {
    date: '2024-01-28',
    title: 'Jeûne et Prière',
    time: '06:00 - 18:00',
    location: 'Église',
  },
  {
    date: '2024-02-04',
    title: 'Baptême Collectif',
    time: '10:00',
    location: 'Fleuve Congo',
  },
  {
    date: '2024-02-11',
    title: 'Réunion des Leaders',
    time: '19:00',
    location: 'Bureau Pastoral',
  },
  {
    date: '2024-02-18',
    title: 'Fête de Jeunesse',
    time: '18:00',
    location: 'Salle Jeunesse',
  },
];

interface SubscriptionFormData {
  name: string;
  email: string;
  phone: string;
  numberOfPeople: string;
  specialRequests: string;
}

interface SelectedEvent {
  id: string;
  title: string;
}

const INITIAL_FORM: SubscriptionFormData = {
  name: '',
  email: '',
  phone: '',
  numberOfPeople: '1',
  specialRequests: '',
};

export default function Programmes() {
  const { events, addEventSubscription } = useAppContext();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<SubscriptionFormData>(INITIAL_FORM);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Trier les événements par date
  const sortedEvents = isHydrated && events && events.length > 0 
    ? [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 5)
    : upcomingEvents;

  // Obtenir les événements pour une date donnée
  const getEventsForDate = (date: Date) => {
    if (!isHydrated || !events || events.length === 0) return [];
    const dateStr = date.toISOString().split('T')[0];
    return events.filter((e: any) => e.date === dateStr);
  };

  // Vérifier si une date a des événements
  const isDateWithEvent = (date: Date) => {
    return getEventsForDate(date).length > 0;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#1e3a5f] to-[#0f1f33]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Nos Programmes
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Consultez nos horaires et événements
            </p>
          </motion.div>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-[#1e3a5f] mb-8">Horaire Hebdomadaire</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {weeklySchedule.map((schedule, index) => (
                <motion.div
                  key={schedule.day}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8f] rounded-2xl p-8 text-white shadow-lg"
                >
                  <h3 className="text-2xl font-bold mb-4">{schedule.day}</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-white/70 uppercase tracking-wider">Heure</p>
                      <p className="text-lg font-semibold">{schedule.time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-white/70 uppercase tracking-wider">Événement</p>
                      <p className="text-lg font-semibold">{schedule.event}</p>
                    </div>
                    <div>
                      <p className="text-sm text-white/70 uppercase tracking-wider">Lieu</p>
                      <p className="text-lg font-semibold">{schedule.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calendar & Events */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[#1e3a5f] mb-12">Événements à Venir</h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-[#1e3a5f]">
                    {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Custom Calendar Grid */}
                <div>
                  {/* Weekday headers */}
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map((day) => (
                      <div key={day} className="text-center text-xs font-bold text-gray-600 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar days */}
                  <div className="grid grid-cols-7 gap-1">
                    {(() => {
                      const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
                      const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
                      const daysInMonth = lastDay.getDate();
                      const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
                      
                      const days = [];
                      
                      // Empty cells before first day
                      for (let i = 0; i < startingDayOfWeek; i++) {
                        days.push(<div key={`empty-${i}`} className="aspect-square" />);
                      }
                      
                      // Days of month
                      for (let day = 1; day <= daysInMonth; day++) {
                        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                        const hasEvents = isDateWithEvent(date);
                        const dayEvents = getEventsForDate(date);
                        
                        days.push(
                          <div
                            key={day}
                            className="relative group"
                          >
                            <button
                              onClick={() => setSelectedDate(date)}
                              className={`w-full aspect-square rounded-lg text-sm font-medium transition-colors relative ${
                                selectedDate?.toDateString() === date.toDateString()
                                  ? 'bg-[#1e3a5f] text-white'
                                  : hasEvents
                                  ? 'bg-blue-100 text-[#1e3a5f] hover:bg-blue-200'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              {day}
                              {/* Dot indicator for events */}
                              {hasEvents && (
                                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                                  {dayEvents.slice(0, 3).map((_, idx) => (
                                    <div
                                      key={idx}
                                      className="w-1 h-1 bg-[#d4af37] rounded-full"
                                    />
                                  ))}
                                </div>
                              )}
                            </button>
                            
                            {/* Tooltip on hover */}
                            {hasEvents && (
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                                <div className="bg-gray-800 text-white text-xs rounded-lg p-3 whitespace-nowrap shadow-lg">
                                  <div className="font-bold mb-2">{day} {currentMonth.toLocaleDateString('fr-FR', { month: 'short' })}</div>
                                  {dayEvents.map((evt: any, idx: number) => (
                                    <div key={idx} className="text-xs py-1 border-t border-gray-600 pt-2 mt-1">
                                      <div className="font-semibold text-[#d4af37]">{evt.title}</div>
                                      <div className="text-gray-300">🕐 {evt.time}</div>
                                    </div>
                                  ))}
                                </div>
                                {/* Arrow */}
                                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45 hidden group-hover:block" />
                              </div>
                            )}
                          </div>
                        );
                      }
                      
                      return days;
                    })()}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Events List */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#1e3a5f] mb-6">Les 5 Prochains Événements</h3>
                
                {sortedEvents && sortedEvents.length > 0 ? (
                  sortedEvents.map((event: any, index: number) => (
                  <motion.div
                    key={event.date + event.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-[#d4af37]"
                  >
                    <div className="flex gap-6 items-start">
                      {/* Date Box */}
                      <div className="bg-[#1e3a5f] text-white rounded-lg p-4 text-center flex-shrink-0">
                        <p className="text-2xl font-bold">
                          {new Date(event.date).getDate()}
                        </p>
                        <p className="text-xs uppercase">
                          {new Date(event.date).toLocaleDateString('fr-FR', { month: 'short' })}
                        </p>
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <h4 className="text-lg font-bold text-[#1e3a5f] mb-2">{event.title}</h4>
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-semibold">🕐 Heure:</span> {event.time}
                        </p>
                        <p className="text-sm text-gray-600 mb-4">
                          <span className="font-semibold">📍 Lieu:</span> {event.location}
                        </p>
                        
                        <div className="flex gap-2 items-center">
                          <Dialog open={dialogOpen && selectedEvent?.id === event.date + event.title} onOpenChange={(open) => {
                            setDialogOpen(open);
                            if (open) {
                              setSelectedEvent({ id: event.date + event.title, title: event.title });
                              setFormData(INITIAL_FORM);
                            }
                          }}>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedEvent({ id: event.date + event.title, title: event.title })}
                              >
                                S'inscrire
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>S'inscrire à {event.title}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom Complet</label>
                                  <Input
                                    placeholder="Votre nom"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <Input
                                      type="email"
                                      placeholder="votre@email.com"
                                      value={formData.email}
                                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                                    <Input
                                      type="tel"
                                      placeholder="+243..."
                                      value={formData.phone}
                                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de Personnes</label>
                                  <Input
                                    type="number"
                                    min="1"
                                    value={formData.numberOfPeople}
                                    onChange={(e) => setFormData({ ...formData, numberOfPeople: e.target.value })}
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Demandes Spéciales (optionnel)</label>
                                  <Textarea
                                    placeholder="Allergie, régime alimentaire, mobilité réduite, etc."
                                    value={formData.specialRequests}
                                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                                  />
                                </div>

                                <Button
                                  className="w-full bg-[#1e3a5f] hover:bg-[#2d5a8f]"
                                  onClick={() => {
                                    if (formData.name && formData.email && formData.phone && selectedEvent) {
                                      addEventSubscription({
                                        id: Date.now().toString(),
                                        eventId: selectedEvent.id,
                                        eventTitle: selectedEvent.title,
                                        name: formData.name,
                                        email: formData.email,
                                        phone: formData.phone,
                                        numberOfPeople: parseInt(formData.numberOfPeople),
                                        specialRequests: formData.specialRequests,
                                        subscribedAt: new Date().toISOString(),
                                        status: 'pending',
                                      });
                                      setDialogOpen(false);
                                      setFormData(INITIAL_FORM);
                                      alert('Merci pour votre inscription !');
                                    }
                                  }}
                                >
                                  Confirmer l'inscription
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <InteractionButtons
                            contentId={event.date + event.title}
                            contentType="event"
                            title={event.title}
                            content={`${event.time} - ${event.location}`}
                            size="sm"
                            variant="outline"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 bg-white rounded-xl"
                  >
                    <p className="text-gray-500 text-lg mb-4">Aucun événement programmé pour le moment</p>
                    <p className="text-gray-400 text-sm">Les nouveaux événements créés dans l'admin s'afficheront ici</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
