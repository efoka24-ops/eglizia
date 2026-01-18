import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from '@/lib/AppContext'
import { queryClient } from '@/lib/queryClient'
import ProtectedRoute from '@/components/ProtectedRoute'

// Public pages
import Home from '@/pages/Home'
import APropos from '@/pages/APropos'
import Leadership from '@/pages/Leadership'
import Departements from '@/pages/Departements'
import Dons from '@/pages/Dons'
import Contact from '@/pages/Contact'
import Live from '@/pages/Live'
import Predications from '@/pages/Predications'
import Priere from '@/pages/Priere'
import Programmes from '@/pages/Programmes'
import Temoignages from '@/pages/Temoignages'

// Admin pages
import AdminLogin from '@/pages/admin/Login'
import Dashboard from '@/pages/admin/Dashboard'
import AdminMembers from '@/pages/admin/AdminMembers'
import AdminEvents from '@/pages/admin/AdminEvents'
import AdminAnnouncements from '@/pages/admin/AdminAnnouncements'
import AdminDepartments from '@/pages/admin/AdminDepartments'
import AdminFinances from '@/pages/admin/AdminFinances'
import AdminProgrammes from '@/pages/admin/AdminProgrammes'
import AdminPreachings from '@/pages/admin/AdminPreachings'
import AdminTestimonies from '@/pages/admin/AdminTestimonies'
import AdminPrayers from '@/pages/admin/AdminPrayers'
import AdminSubscriptions from '@/pages/admin/AdminSubscriptions'
import AdminLive from '@/pages/admin/AdminLive'
import AdminMessages from '@/pages/admin/AdminMessages'
import AdminContact from '@/pages/admin/AdminContact'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/departements" element={<Departements />} />
            <Route path="/dons" element={<Dons />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/live" element={<Live />} />
            <Route path="/predications" element={<Predications />} />
            <Route path="/priere" element={<Priere />} />
            <Route path="/programmes" element={<Programmes />} />
            <Route path="/temoignages" element={<Temoignages />} />

            {/* Admin Authentication */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/members" element={<ProtectedRoute><AdminMembers /></ProtectedRoute>} />
            <Route path="/admin/events" element={<ProtectedRoute><AdminEvents /></ProtectedRoute>} />
            <Route path="/admin/announcements" element={<ProtectedRoute><AdminAnnouncements /></ProtectedRoute>} />
            <Route path="/admin/departments" element={<ProtectedRoute><AdminDepartments /></ProtectedRoute>} />
            <Route path="/admin/finances" element={<ProtectedRoute><AdminFinances /></ProtectedRoute>} />
            <Route path="/admin/programmes" element={<ProtectedRoute><AdminProgrammes /></ProtectedRoute>} />
            <Route path="/admin/preachings" element={<ProtectedRoute><AdminPreachings /></ProtectedRoute>} />
            <Route path="/admin/subscriptions" element={<ProtectedRoute><AdminSubscriptions /></ProtectedRoute>} />
            <Route path="/admin/testimonies" element={<ProtectedRoute><AdminTestimonies /></ProtectedRoute>} />
            <Route path="/admin/prayers" element={<ProtectedRoute><AdminPrayers /></ProtectedRoute>} />
            <Route path="/admin/live" element={<ProtectedRoute><AdminLive /></ProtectedRoute>} />
            <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
            <Route path="/admin/contact" element={<ProtectedRoute><AdminContact /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </QueryClientProvider>
  )
}

export default App
