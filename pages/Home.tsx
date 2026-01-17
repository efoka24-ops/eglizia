import React from 'react';
import { mockEvents } from '@/lib/mockData';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import WelcomeSection from '@/components/WelcomeSection';
import MinistriesSection from '@/components/MinistriesSection';
import UpcomingEvents from '@/components/UpcomingEvents';
import TestimonialsSection from '@/components/TestimonialsSection';
import DonationCTA from '@/components/DonationCTA';
import Footer from '@/components/Footer';

export default function Home() {
  const events = mockEvents;

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WelcomeSection />
      <MinistriesSection />
      <UpcomingEvents events={events} />
      <TestimonialsSection testimonies={[]} />
      <DonationCTA />
      <Footer />
    </div>
  );
}
