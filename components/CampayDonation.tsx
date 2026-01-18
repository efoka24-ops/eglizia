'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Loader, AlertCircle, CheckCircle, Phone, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { campay } from '@/api/campayClient';
import { useAppContext } from '@/lib/AppContext';
import type { Donation } from '@/entities';

interface DonationFormData {
  amount: number
  phone: string
  donorName: string
  email: string
  donationType: 'unique' | 'mensuel' | 'annuel'
  message?: string
}

export default function CampayDonation() {
  const { addContactMessage } = useAppContext();
  const [formData, setFormData] = useState<DonationFormData>({
    amount: 5000,
    phone: '',
    donorName: '',
    email: '',
    donationType: 'unique',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [transactionRef, setTransactionRef] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      donationType: value as 'unique' | 'mensuel' | 'annuel',
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus('processing');
    setErrorMessage('');

    try {
      // Validate inputs
      if (!formData.amount || formData.amount < 100) {
        throw new Error('Le montant doit être au moins 100 XAF');
      }

      if (!campay.isValidPhoneNumber(formData.phone)) {
        throw new Error('Numéro de téléphone invalide. Veuillez utiliser un numéro Camerounais');
      }

      if (!formData.donorName.trim()) {
        throw new Error('Le nom du donateur est requis');
      }

      if (!formData.email.trim() || !formData.email.includes('@')) {
        throw new Error('Un email valide est requis');
      }

      // Initiate Campay payment
      const paymentResponse = await campay.initiatePayment({
        amount: formData.amount,
        currency: 'XAF',
        phone: formData.phone,
        description: `Don ${formData.donationType} pour Eglise Chapelle - ${formData.donorName}`,
        externalReference: `donation_${Date.now()}`,
      });

      if (paymentResponse.code === '200' || paymentResponse.code === '0') {
        setTransactionRef(paymentResponse.data?.reference || '');
        setStatus('success');

        // Store donation message in context
        addContactMessage({
          id: `msg_${Date.now()}`,
          name: formData.donorName,
          email: formData.email,
          phone: formData.phone,
          subject: `Don ${formData.donationType}`,
          message: formData.message || `Don de ${formData.amount} XAF via Campay`,
          created_at: new Date().toISOString(),
        });

        // Reset form
        setFormData({
          amount: 5000,
          phone: '',
          donorName: '',
          email: '',
          donationType: 'unique',
          message: '',
        });
      } else {
        throw new Error(paymentResponse.message || 'Erreur lors de l\'initiation du paiement');
      }
    } catch (error) {
      console.error('Donation error:', error);
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Une erreur est survenue'
      );
    } finally {
      setLoading(false);
    }
  };

  const donationPresets = [
    { label: '5 000 XAF', value: 5000 },
    { label: '10 000 XAF', value: 10000 },
    { label: '25 000 XAF', value: 25000 },
    { label: '50 000 XAF', value: 50000 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4"
          >
            <Heart className="w-8 h-8 text-red-600" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Faire un Don</h1>
          <p className="text-gray-600 text-lg">
            Soutenez la mission de notre église par votre générosité
          </p>
        </div>

        {/* Success Message */}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-6 bg-green-50 border-2 border-green-200 rounded-xl"
          >
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-green-900 mb-1">Don initié avec succès!</h3>
                <p className="text-green-800 text-sm mb-2">
                  Veuillez confirmer le paiement sur votre téléphone.
                </p>
                <p className="text-green-700 text-xs font-mono bg-green-100 px-3 py-2 rounded">
                  Référence: {transactionRef}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-xl"
          >
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-red-900 mb-1">Erreur</h3>
                <p className="text-red-800 text-sm">{errorMessage}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Donation Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
        >
          {/* Donor Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Vos Informations</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet *
                </label>
                <Input
                  type="text"
                  name="donorName"
                  value={formData.donorName}
                  onChange={handleInputChange}
                  placeholder="Jean Dupont"
                  required
                  disabled={loading}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="jean@example.com"
                  required
                  disabled={loading}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Numéro de téléphone (Cameroun) *
                </div>
              </label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="237 690 00 00 00"
                required
                disabled={loading}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: 237XXXXXXXXX ou +237XXXXXXXXX
              </p>
            </div>
          </div>

          {/* Donation Details */}
          <div className="space-y-4 pt-4 border-t">
            <h2 className="text-xl font-bold text-gray-900">Détails du Don</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de don *
                </label>
                <Select value={formData.donationType} onValueChange={handleSelectChange}>
                  <SelectTrigger disabled={loading}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unique">Don Unique</SelectItem>
                    <SelectItem value="mensuel">Don Mensuel</SelectItem>
                    <SelectItem value="annuel">Don Annuel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Montant (XAF) *
                  </div>
                </label>
                <Input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="5000"
                  min="100"
                  step="100"
                  required
                  disabled={loading}
                  className="w-full"
                />
              </div>
            </div>

            {/* Quick Amount Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Montants suggérés
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {donationPresets.map(preset => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, amount: preset.value }))}
                    disabled={loading}
                    className={`p-3 rounded-lg font-medium transition-colors ${
                      formData.amount === preset.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    } disabled:opacity-50`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message (optionnel)
              </label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Partagez vos pensées ou vos intentions de prière..."
                disabled={loading}
                className="w-full min-h-24"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.div
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Traitement en cours...
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5" />
                  Faire un Don via Campay
                </>
              )}
            </Button>
          </motion.div>

          <p className="text-xs text-gray-500 text-center">
            Vos informations personnelles sont sécurisées et ne seront utilisées que pour
            traiter votre don.
          </p>
        </motion.form>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid md:grid-cols-3 gap-4"
        >
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-gray-900 mb-2">🛡️ Sécurisé</h3>
            <p className="text-sm text-gray-600">
              Tous les paiements sont traités de manière sécurisée via Campay
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-gray-900 mb-2">💬 Support</h3>
            <p className="text-sm text-gray-600">
              Contactez-nous pour toute question concernant les dons
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-gray-900 mb-2">📋 Transparence</h3>
            <p className="text-sm text-gray-600">
              Tous les dons sont documentés et utilisés avec transparence
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
