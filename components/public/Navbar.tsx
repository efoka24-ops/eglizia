import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X, ChevronDown, Heart, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Accueil', page: 'Home' },
  { name: 'Live', page: 'Live' },
  { 
    name: 'L\'Église',
    children: [
      { name: 'À propos', page: 'APropos' },
      { name: 'Leadership', page: 'Leadership' },
      { name: 'Départements', page: 'Departements' },
    ]
  },
  { 
    name: 'Médias',
    children: [
      { name: 'Prédications', page: 'Predications' },
      { name: 'Témoignages', page: 'Temoignages' },
    ]
  },
  { name: 'Programmes', page: 'Programmes' },
  { name: 'Prière', page: 'Priere' },
  { name: 'Contact', page: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to={createPageUrl('Home')} className="flex items-center gap-3">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696373949841ab147d2effc0/8318d6067_images-removebg-preview.png" 
              alt="Logo"
              className="h-14"
            />
            <div className={`hidden lg:block ${scrolled ? 'text-[#1e3a5f]' : 'text-white'}`}>
              <p className="font-bold text-lg leading-tight">La Chapelle</p>
              <p className="text-sm opacity-80">Restauration en Christ</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.children ? (
                  <div
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button className={`px-4 py-2 rounded-lg font-medium flex items-center gap-1 transition-colors ${
                      scrolled ? 'text-gray-700 hover:text-[#1e3a5f] hover:bg-gray-100' : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}>
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    <AnimatePresence>
                      {openDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 bg-white rounded-xl shadow-xl py-2 min-w-[200px] border"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.page}
                              to={createPageUrl(child.page)}
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#1e3a5f]"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={createPageUrl(item.page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      scrolled ? 'text-gray-700 hover:text-[#1e3a5f] hover:bg-gray-100' : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to={createPageUrl('Dons')}>
              <Button 
                className="bg-[#d4af37] hover:bg-[#c9a431] text-[#1e3a5f] font-semibold rounded-full px-6"
              >
                <Heart className="w-4 h-4 mr-2" />
                Donner
              </Button>
            </Link>
            <Link to={createPageUrl('Dashboard')}>
              <Button 
                variant="outline"
                className={`rounded-full px-6 ${
                  scrolled 
                    ? 'border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white' 
                    : 'border-white text-white hover:bg-white hover:text-[#1e3a5f]'
                }`}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-[#1e3a5f]' : 'text-white'}`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                        className="w-full flex justify-between items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        {item.name}
                        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      {openDropdown === item.name && (
                        <div className="pl-4 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.page}
                              to={createPageUrl(child.page)}
                              className="block px-4 py-2 text-gray-600 hover:text-[#1e3a5f] rounded-lg"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={createPageUrl(item.page)}
                      className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t space-y-2">
                <Link to={createPageUrl('Dons')} className="block">
                  <Button className="w-full bg-[#d4af37] hover:bg-[#c9a431] text-[#1e3a5f] font-semibold rounded-full">
                    <Heart className="w-4 h-4 mr-2" />
                    Faire un don
                  </Button>
                </Link>
                <Link to={createPageUrl('Dashboard')} className="block">
                  <Button variant="outline" className="w-full border-[#1e3a5f] text-[#1e3a5f] rounded-full">
                    <LogIn className="w-4 h-4 mr-2" />
                    Espace Admin
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
