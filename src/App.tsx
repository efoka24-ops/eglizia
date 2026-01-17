import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../lib/queryClient'
import { AppProvider } from '../lib/AppContext'

// Public pages
import Home from '../pages/Home'
import APropos from '../pages/APropos'
import Leadership from '../pages/Leadership'
import Departements from '../pages/Departements'
import Dons from '../pages/Dons'
import Contact from '../pages/Contact'
import Live from '../pages/Live'
import Predications from '../pages/Predications'
import Priere from '../pages/Priere'
import Programmes from '../pages/Programmes'
import Temoignages from '../pages/Temoignages'

// Admin pages
import Dashboard from '../pages/admin/Dashboard'
import AdminAnnouncements from '../pages/admin/AdminAnnouncements'
import AdminMembers from '../pages/admin/AdminMembers'
import AdminEvents from '../pages/admin/AdminEvents'
import AdminDepartments from '../pages/admin/AdminDepartments'
import AdminFinances from '../pages/admin/AdminFinances'
import AdminPreachings from '../pages/admin/AdminPreachings'
import AdminTestimonies from '../pages/admin/AdminTestimonies'
import AdminPrayers from '../pages/admin/AdminPrayers'
import AdminLive from '../pages/admin/AdminLive'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Router>
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

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/announcements" element={<AdminAnnouncements />} />
            <Route path="/admin/members" element={<AdminMembers />} />
            <Route path="/admin/events" element={<AdminEvents />} />
            <Route path="/admin/departments" element={<AdminDepartments />} />
            <Route path="/admin/finances" element={<AdminFinances />} />
            <Route path="/admin/preachings" element={<AdminPreachings />} />
            <Route path="/admin/testimonies" element={<AdminTestimonies />} />
            <Route path="/admin/prayers" element={<AdminPrayers />} />
            <Route path="/admin/live" element={<AdminLive />} />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AppProvider>
    </QueryClientProvider>
  )
}

export default App
