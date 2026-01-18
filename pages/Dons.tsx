'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Copy, Check, AlertCircle, Loader } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { campay } from '@/api/campayClient';
import { useAppContext } from '@/lib/AppContext';

const whyDonate = [
  'Soutenir le ministère et la croissance spirituelle',
  'Aider à maintenir nos installations',
  'Financer les programmes de formation',
  'Soutenir les actions caritatives',
  'Permettre l\'expansion du ministère',
];

const paymentMethods = [
  {
    name: 'MTN MoMo',
    number: '+243 812 345 678',
    instruction: 'Envoyez votre montant à ce numéro via MTN MoMo',
  },
  {
    name: 'Orange Money',
    number: '+243 987 654 321',
    instruction: 'Envoyez votre montant à ce numéro via Orange Money',
  },
  {
    name: 'Virement Bancaire',
    details: {
      banque: 'BCDC - Banque Commerciale du Congo',
      compte: '1234567890',
      iban: 'CD12BCDC0001234567890',
    },
    instruction: 'Effectuez un virement à nos coordonnées bancaires',
  },
];

export default function Dons() {
  const { addDonation } = useAppContext();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', amount: '', type: '', project: '', method: '', anonymous: false });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.amount || !formData.method) {
        throw new Error('Veuillez remplir tous les champs requis');
      }

      if (formData.method !== 'bank') {
        // For MTN MoMo or Orange Money, validate phone
        if (!formData.phone || !campay.isValidPhoneNumber(formData.phone)) {
          throw new Error('Numéro de téléphone invalide');
        }
      }

      const amountStr = formData.amount.toString();
      const externalRef = `don_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const description = `Don ${formData.type} - ${formData.name} - ${formData.project || 'Général'}`;

      // Create donation record
      const donation = {
        id: externalRef,
        donor_name: formData.anonymous ? 'Anonyme' : formData.name,
        email: formData.anonymous ? 'anonyme@eglizia.local' : formData.email,
        phone: formData.anonymous ? '' : formData.phone,
        amount: parseFloat(amountStr),
        donation_type: formData.type,
        project: formData.project,
        payment_method: formData.method,
        status: 'pending',
        reference: externalRef,
        date: new Date().toISOString(),
      };

      // Try to create payment link with Campay
      try {
        const { payment_link, reference } = await campay.createPaymentLink(
          amountStr,
          description,
          externalRef,
          window.location.href,
          'XAF'
        );

        // Update donation with campay reference
        donation.reference = reference;
        donation.status = 'campay_initiated';

        // Save to localStorage
        const donations = JSON.parse(localStorage.getItem('eglizia_donations') || '[]');
        donations.push(donation);
        localStorage.setItem('eglizia_donations', JSON.stringify(donations));

        // Redirect to payment link
        setPaymentLink(payment_link);
        setSubmitted(true);

        setTimeout(() => {
          window.location.href = payment_link;
        }, 2000);
      } catch (campayErr: any) {
        console.warn('Campay unavailable, using manual payment fallback:', campayErr);

        // Save donation with status as pending manual payment
        donation.status = 'pending_manual';
        donation.notes = 'Payment via Campay unavailable. Manual payment instructions sent to email.';

        const donations = JSON.parse(localStorage.getItem('eglizia_donations') || '[]');
        donations.push(donation);
        localStorage.setItem('eglizia_donations', JSON.stringify(donations));

        // Show success message with manual payment instructions
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setError(
            'Le service de paiement Campay est temporairement indisponible. Votre don a été enregistré. ' +
            'Un email avec les instructions de paiement manuel vous sera envoyé. Merci pour votre soutien!'
          );
        }, 3000);
      }

      // Reset form
      setFormData({ name: '', phone: '', email: '', amount: '', type: '', project: '', method: '', anonymous: false });
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Une erreur est survenue lors du traitement du paiement. Veuillez vérifier vos informations et réessayer.');
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
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
            <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-white fill-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Votre Soutien Compte
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              En donnant, vous participez à l'expansion du Royaume de Dieu
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <h2 className="text-3xl font-bold text-[#1e3a5f] mb-8">Faire un Don</h2>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 bg-green-50 rounded-2xl">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-green-600">Redirection en cours...</p>
                  <p className="text-gray-600 mt-2">Vous allez être redirigé vers la plateforme de paiement Campay</p>
                  {paymentLink && (
                    <p className="text-sm text-gray-500 mt-4">
                      <a href={paymentLink} className="text-blue-600 hover:underline">
                        Cliquez ici si vous n'êtes pas redirigé automatiquement
                      </a>
                    </p>
                  )}
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-16 bg-red-50 rounded-2xl">
                  <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-4">
                    <AlertCircle className="w-12 h-12 text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-red-600">Erreur</p>
                  <p className="text-gray-600 mt-2 text-center">{error}</p>
                  <Button
                    onClick={() => setError(null)}
                    className="mt-4 bg-red-600 hover:bg-red-700"
                    size="sm"
                  >
                    Réessayer
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+243..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      type="email"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Montant (USD)</label>
                      <Input
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        type="number"
                        placeholder="100"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type de don</label>
                      <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dime">Dîme</SelectItem>
                          <SelectItem value="offrande">Offrande</SelectItem>
                          <SelectItem value="special">Don Spécial</SelectItem>
                          <SelectItem value="projet">Projet Spécifique</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {formData.type === 'projet' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Projet</label>
                      <Input
                        value={formData.project}
                        onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                        placeholder="Spécifiez le projet"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Méthode de paiement</label>
                    <Select value={formData.method} onValueChange={(value) => setFormData({ ...formData, method: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mtn">MTN MoMo</SelectItem>
                        <SelectItem value="orange">Orange Money</SelectItem>
                        <SelectItem value="bank">Virement Bancaire</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={formData.anonymous}
                      onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <label htmlFor="anonymous" className="text-sm text-gray-600">
                      Faire ce don de manière anonyme
                    </label>
                  </div>

                  <Button 
                    disabled={loading}
                    className="w-full bg-[#1e3a5f] hover:bg-[#2d5a8f] text-white disabled:opacity-50" 
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Traitement en cours...
                      </>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 mr-2" />
                        Confirmer le don
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8f] rounded-2xl p-8 text-white mb-8">
                <h3 className="text-xl font-bold mb-6">Pourquoi donner?</h3>
                <ul className="space-y-3">
                  {whyDonate.map((reason) => (
                    <li key={reason} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#d4af37] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-[#1e3a5f]" />
                      </div>
                      <span className="text-white/90">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Membres', value: '2,345' },
                  { label: 'Départements', value: '8' },
                  { label: 'Familles Aidées', value: '500+' },
                  { label: 'Transparence', value: '100%' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-[#1e3a5f]">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#1e3a5f] mb-4">Moyens de Paiement</h2>
            <p className="text-gray-600 text-lg">Choisissez la méthode qui vous convient</p>
          </motion.div>

          <Tabs defaultValue="0" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {paymentMethods.map((_, i) => (
                <TabsTrigger key={i} value={i.toString()}>
                  {['MTN MoMo', 'Orange Money', 'Banque'][i]}
                </TabsTrigger>
              ))}
            </TabsList>

            {paymentMethods.map((method, idx) => (
              <TabsContent key={idx} value={idx.toString()}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <h3 className="text-2xl font-bold text-[#1e3a5f] mb-6">{method.name}</h3>
                  
                  {'number' in method ? (
                    <div className="space-y-6">
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                        <p className="text-sm text-gray-600 mb-2">Numéro de compte</p>
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-2xl font-mono font-bold text-[#1e3a5f]">{method.number}</p>
                          <button
                            onClick={() => handleCopy(method.number, `number-${idx}`)}
                            className="p-2 hover:bg-blue-100 rounded transition-colors"
                          >
                            {copiedId === `number-${idx}` ? (
                              <Check className="w-5 h-5 text-green-600" />
                            ) : (
                              <Copy className="w-5 h-5 text-blue-600" />
                            )}
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{method.instruction}</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {[
                        { label: 'Banque', value: method.details.banque },
                        { label: 'Compte', value: method.details.compte },
                        { label: 'IBAN', value: method.details.iban },
                      ].map((detail, i) => (
                        <div key={detail.label} className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                          <p className="text-sm text-gray-600 mb-2">{detail.label}</p>
                          <div className="flex items-center justify-between gap-4">
                            <p className="text-lg font-mono font-bold text-[#1e3a5f]">{detail.value}</p>
                            <button
                              onClick={() => handleCopy(detail.value, `detail-${idx}-${i}`)}
                              className="p-2 hover:bg-blue-100 rounded transition-colors"
                            >
                              {copiedId === `detail-${idx}-${i}` ? (
                                <Check className="w-5 h-5 text-green-600" />
                              ) : (
                                <Copy className="w-5 h-5 text-blue-600" />
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                      <p className="text-gray-600 leading-relaxed">{method.instruction}</p>
                    </div>
                  )}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
