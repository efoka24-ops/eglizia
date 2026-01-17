'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useAppContext } from '@/lib/AppContext';

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

export default function Programmes() {
  const { events } = useAppContext();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

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
                
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  month={currentMonth}
                  onMonthChange={setCurrentMonth}
                  className="w-full"
                />
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
                
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.date}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-[#d4af37]"
                  >
                    <div className="flex gap-6">
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
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">📍 Lieu:</span> {event.location}
                        </p>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="self-center"
                      >
                        S'inscrire
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
