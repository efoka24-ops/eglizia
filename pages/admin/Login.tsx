'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Credentials de démonstration
  const DEMO_EMAIL = 'admin@chapelle.com';
  const DEMO_PASSWORD = 'ChapelleAdmin2024';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Vérifier les credentials
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        // Sauvegarder le token dans localStorage
        localStorage.setItem('adminToken', 'authenticated');
        localStorage.setItem('adminEmail', email);
        
        // Rediriger vers le dashboard
        navigate('/admin/dashboard');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] to-[#0f1f33] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696373949841ab147d2effc0/8318d6067_images-removebg-preview.png" 
                alt="Logo"
                className="h-16 w-auto"
              />
            </div>
            <h1 className="text-3xl font-bold text-[#1e3a5f] mb-2">Espace Admin</h1>
            <p className="text-gray-600">La Chapelle de Restauration en Christ</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <p className="text-red-700 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                placeholder="admin@chapelle.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#d4af37] focus:outline-none transition"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mot de passe
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#d4af37] focus:outline-none transition"
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d4af37] hover:bg-[#c9a431] text-[#1e3a5f] font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              <LogIn className="w-5 h-5 mr-2" />
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
          </form>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-700 text-xs font-semibold mb-2">Identifiants de démonstration:</p>
            <p className="text-blue-600 text-xs mb-1">Email: admin@chapelle.com</p>
            <p className="text-blue-600 text-xs">Mot de passe: ChapelleAdmin2024</p>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              Vous n'êtes pas autorisé? <br />
              <span className="text-[#1e3a5f] font-semibold">Contactez l'administrateur</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
