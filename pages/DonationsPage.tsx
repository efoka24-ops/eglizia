'use client';

import React from 'react';
import CampayDonation from '@/components/CampayDonation';
import PublicNav from '@/components/public/PublicNav';
import Footer from '@/components/Footer';

export default function DonationsPage() {
  return (
    <div className="bg-white">
      <PublicNav />
      <CampayDonation />
      <Footer />
    </div>
  );
}
