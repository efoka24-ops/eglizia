import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Heart, 
  BookOpen, 
  MessageSquare,
  Wallet,
  Building2,
  Bell,
  Settings,
  Home,
  ChevronLeft,
  LogOut,
  Radio
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

const menuItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord', page: 'Dashboard' },
  { icon: Radio, label: 'Live Stream', page: 'AdminLive' },
  { icon: Users, label: 'Membres', page: 'AdminMembers' },
  { icon: Calendar, label: 'Événements', page: 'AdminEvents' },
  { icon: BookOpen, label: 'Prédications', page: 'AdminPreachings' },
  { icon: MessageSquare, label: 'Témoignages', page: 'AdminTestimonies' },
  { icon: Heart, label: 'Demandes de prière', page: 'AdminPrayers' },
  { icon: Wallet, label: 'Finances', page: 'AdminFinances' },
  { icon: Building2, label: 'Départements', page: 'AdminDepartments' },
  { icon: Bell, label: 'Annonces', page: 'AdminAnnouncements' },
];

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = async () => {
    await base44.auth.logout();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-[#1e3a5f] text-white z-50 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-0 lg:w-20'
      } overflow-hidden`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className={`flex items-center gap-3 ${!isOpen && 'lg:justify-center'}`}>
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696373949841ab147d2effc0/8318d6067_images-removebg-preview.png" 
                alt="Logo"
                className="h-10 w-auto"
              />
              {isOpen && (
                <div>
                  <p className="font-bold text-sm leading-tight">La Chapelle</p>
                  <p className="text-xs text-white/60">Administration</p>
                </div>
              )}
            </div>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-white/10 hidden lg:block"
            >
              <ChevronLeft className={`w-5 h-5 transition-transform ${!isOpen && 'rotate-180'}`} />
            </button>
          </div>
          
          {/* Menu */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1 px-3">
              {menuItems.map((item) => {
                const isActive = currentPath.includes(item.page);
                return (
                  <li key={item.page}>
                    <Link
                      to={createPageUrl(item.page)}
                      className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
                        isActive 
                          ? 'bg-[#d4af37] text-[#1e3a5f]' 
                          : 'hover:bg-white/10'
                      } ${!isOpen && 'lg:justify-center'}`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {isOpen && <span className="text-sm font-medium">{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <Link
              to={createPageUrl('Home')}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/10 transition-colors ${!isOpen && 'lg:justify-center'}`}
            >
              <Home className="w-5 h-5" />
              {isOpen && <span className="text-sm">Voir le site</span>}
            </Link>
            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-500/20 text-red-300 transition-colors w-full ${!isOpen && 'lg:justify-center'}`}
            >
              <LogOut className="w-5 h-5" />
              {isOpen && <span className="text-sm">Déconnexion</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
