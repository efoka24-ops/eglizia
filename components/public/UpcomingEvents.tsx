import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function UpcomingEvents({ events = [] }) {
  const upcomingEvents = events
    .filter(e => new Date(e.start_date) >= new Date())
    .slice(0, 3);

  if (upcomingEvents.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#d4af37] font-semibold text-sm uppercase tracking-wider">
            Rejoignez-nous
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mt-3">
            Prochains Événements
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {event.image_url ? (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={event.image_url} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 bg-[#d4af37] text-[#1e3a5f] px-3 py-1 rounded-full text-sm font-semibold">
                      {event.event_type}
                    </div>
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8f] flex items-center justify-center">
                    <Calendar className="w-16 h-16 text-[#d4af37]" />
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1e3a5f] mb-4 line-clamp-2">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-[#d4af37]" />
                      <span className="capitalize">
                        {format(new Date(event.start_date), 'EEEE d MMMM yyyy', { locale: fr })}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[#d4af37]" />
                      <span>{format(new Date(event.start_date), 'HH:mm')}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-[#d4af37]" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link to={createPageUrl('Programmes')}>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white px-8 py-6 rounded-full"
            >
              Voir tous les programmes
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
