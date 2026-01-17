import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { MapPin, Phone, Mail, Clock, Facebook, Youtube, Instagram } from 'lucide-react';
import { useAppContext } from '@/lib/AppContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { contactInfo } = useAppContext();
  
  return (
    <footer className="bg-[#0f1f33] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid md:grid-cols-4 gap-12">
          {/* About */}
          <div className="md:col-span-1">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696373949841ab147d2effc0/8318d6067_images-removebg-preview.png" 
              alt="Logo"
              className="h-20 mb-6"
            />
            <p className="text-white/70 leading-relaxed">
              Restaurer des vies par la puissance de Christ. Bienvenue dans la famille !
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#d4af37] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#d4af37] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#d4af37] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-[#d4af37]">Liens Rapides</h4>
            <ul className="space-y-3">
              {[
                { name: 'À propos', page: 'APropos' },
                { name: 'Leadership', page: 'Leadership' },
                { name: 'Prédications', page: 'Predications' },
                { name: 'Programmes', page: 'Programmes' },
                { name: 'Départements', page: 'Departements' },
              ].map(link => (
                <li key={link.page}>
                  <Link 
                    to={createPageUrl(link.page)}
                    className="text-white/70 hover:text-[#d4af37] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-[#d4af37]">Support</h4>
            <ul className="space-y-3">
              {[
                { name: 'Faire un don', page: 'Dons' },
                { name: 'Demande de prière', page: 'Priere' },
                { name: 'Témoignages', page: 'Temoignages' },
                { name: 'Contact', page: 'Contact' },
              ].map(link => (
                <li key={link.page}>
                  <Link 
                    to={createPageUrl(link.page)}
                    className="text-white/70 hover:text-[#d4af37] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-[#d4af37]">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#d4af37] mt-1 flex-shrink-0" />
                <span className="text-white/70">{contactInfo?.address || 'Douala, Cameroun'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                <span className="text-white/70">{contactInfo?.phone || '+237 6XX XXX XXX'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                <span className="text-white/70">{contactInfo?.email || 'contact@chapelle-restauration.org'}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#d4af37] mt-1 flex-shrink-0" />
                <div className="text-white/70">
                  {contactInfo ? (
                    <>
                      <p>Dimanche: {contactInfo.sunday_start?.slice(0, 5)} - {contactInfo.sunday_end?.slice(0, 5)}</p>
                      <p>Mercredi: {contactInfo.wednesday_start?.slice(0, 5)} - {contactInfo.wednesday_end?.slice(0, 5)}</p>
                    </>
                  ) : (
                    <>
                      <p>Dimanche: 9h00 - 12h00</p>
                      <p>Mercredi: 18h00 - 20h00</p>
                    </>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {currentYear} La Chapelle de Restauration en Christ. Tous droits réservés.
          </p>
          <p className="text-white/50 text-sm italic">
            « Là où est l'Esprit du Seigneur, là est la liberté » — 2 Corinthiens 3:17
          </p>
        </div>
      </div>
    </footer>
  );
}
