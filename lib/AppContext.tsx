import React, { createContext, useContext, useState, useEffect } from 'react'
import { mockMembers, mockEvents, mockAnnouncements, mockDepartments, mockLiveStreams, mockPreachings } from '@/lib/mockData'
import type { Member, Event, Announcement, Department, LiveStream, Preaching } from '@/lib/entities'

interface AppContextType {
  // Members
  members: Member[]
  setMembers: (members: Member[]) => void
  updateMember: (id: string, member: Partial<Member>) => void
  addMember: (member: Member) => void
  deleteMember: (id: string) => void
  
  // Events
  events: Event[]
  setEvents: (events: Event[]) => void
  updateEvent: (id: string, event: Partial<Event>) => void
  addEvent: (event: Event) => void
  deleteEvent: (id: string) => void
  
  // Announcements
  announcements: Announcement[]
  setAnnouncements: (announcements: Announcement[]) => void
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => void
  addAnnouncement: (announcement: Announcement) => void
  deleteAnnouncement: (id: string) => void
  
  // Departments
  departments: Department[]
  setDepartments: (departments: Department[]) => void
  updateDepartment: (id: string, department: Partial<Department>) => void
  addDepartment: (department: Department) => void
  deleteDepartment: (id: string) => void
  
  // Live Streams
  liveStreams: LiveStream[]
  setLiveStreams: (liveStreams: LiveStream[]) => void
  updateLiveStream: (id: string, liveStream: Partial<LiveStream>) => void
  addLiveStream: (liveStream: LiveStream) => void
  deleteLiveStream: (id: string) => void
  
  // Preachings
  preachings: Preaching[]
  setPreachings: (preachings: Preaching[]) => void
  updatePreaching: (id: string, preaching: Partial<Preaching>) => void
  addPreaching: (preaching: Preaching) => void
  deletePreaching: (id: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [members, setMembersState] = useState<Member[]>([])
  const [events, setEventsState] = useState<Event[]>([])
  const [announcements, setAnnouncementsState] = useState<Announcement[]>([])
  const [departments, setDepartmentsState] = useState<Department[]>([])
  const [liveStreams, setLiveStreamsState] = useState<LiveStream[]>([])
  const [preachings, setPreachingsState] = useState<Preaching[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Initialiser depuis localStorage au montage
  useEffect(() => {
    try {
      const storedMembers = localStorage.getItem('eglizia_members')
      const storedEvents = localStorage.getItem('eglizia_events')
      const storedAnnouncements = localStorage.getItem('eglizia_announcements')
      const storedDepartments = localStorage.getItem('eglizia_departments')
      const storedLiveStreams = localStorage.getItem('eglizia_livestreams')
      const storedPreachings = localStorage.getItem('eglizia_preachings')

      setMembersState(storedMembers ? JSON.parse(storedMembers) : mockMembers)
      setEventsState(storedEvents ? JSON.parse(storedEvents) : mockEvents)
      setAnnouncementsState(storedAnnouncements ? JSON.parse(storedAnnouncements) : mockAnnouncements)
      setDepartmentsState(storedDepartments ? JSON.parse(storedDepartments) : mockDepartments)
      setLiveStreamsState(storedLiveStreams ? JSON.parse(storedLiveStreams) : mockLiveStreams)
      setPreachingsState(storedPreachings ? JSON.parse(storedPreachings) : mockPreachings)

      if (!storedMembers) localStorage.setItem('eglizia_members', JSON.stringify(mockMembers))
      if (!storedEvents) localStorage.setItem('eglizia_events', JSON.stringify(mockEvents))
      if (!storedAnnouncements) localStorage.setItem('eglizia_announcements', JSON.stringify(mockAnnouncements))
      if (!storedDepartments) localStorage.setItem('eglizia_departments', JSON.stringify(mockDepartments))
      if (!storedLiveStreams) localStorage.setItem('eglizia_livestreams', JSON.stringify(mockLiveStreams))
      if (!storedPreachings) localStorage.setItem('eglizia_preachings', JSON.stringify(mockPreachings))
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
      setMembersState(mockMembers)
      setEventsState(mockEvents)
      setAnnouncementsState(mockAnnouncements)
      setDepartmentsState(mockDepartments)
      setLiveStreamsState(mockLiveStreams)
      setPreachingsState(mockPreachings)
    }
    setIsHydrated(true)
  }, [])

  // Members handlers
  const setMembers = (newMembers: Member[]) => {
    setMembersState(newMembers)
    try {
      localStorage.setItem('eglizia_members', JSON.stringify(newMembers))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    }
  }

  const updateMember = (id: string, updates: Partial<Member>) => {
    const newMembers = members.map(m => (m.id === id ? { ...m, ...updates } : m))
    setMembers(newMembers)
  }

  const addMember = (member: Member) => {
    setMembers([...members, member])
  }

  const deleteMember = (id: string) => {
    setMembers(members.filter(m => m.id !== id))
  }

  // Events handlers
  const setEvents = (newEvents: Event[]) => {
    setEventsState(newEvents)
    try {
      localStorage.setItem('eglizia_events', JSON.stringify(newEvents))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    }
  }

  const updateEvent = (id: string, updates: Partial<Event>) => {
    const newEvents = events.map(e => (e.id === id ? { ...e, ...updates } : e))
    setEvents(newEvents)
  }

  const addEvent = (event: Event) => {
    setEvents([...events, event])
  }

  const deleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id))
  }

  // Announcements handlers
  const setAnnouncements = (newAnnouncements: Announcement[]) => {
    setAnnouncementsState(newAnnouncements)
    try {
      localStorage.setItem('eglizia_announcements', JSON.stringify(newAnnouncements))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    }
  }

  const updateAnnouncement = (id: string, updates: Partial<Announcement>) => {
    const newAnnouncements = announcements.map(a => (a.id === id ? { ...a, ...updates } : a))
    setAnnouncements(newAnnouncements)
  }

  const addAnnouncement = (announcement: Announcement) => {
    setAnnouncements([...announcements, announcement])
  }

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id))
  }

  // Departments handlers
  const setDepartments = (newDepartments: Department[]) => {
    setDepartmentsState(newDepartments)
    try {
      localStorage.setItem('eglizia_departments', JSON.stringify(newDepartments))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    }
  }

  const updateDepartment = (id: string, updates: Partial<Department>) => {
    const newDepartments = departments.map(d => (d.id === id ? { ...d, ...updates } : d))
    setDepartments(newDepartments)
  }

  const addDepartment = (department: Department) => {
    setDepartments([...departments, department])
  }

  const deleteDepartment = (id: string) => {
    setDepartments(departments.filter(d => d.id !== id))
  }

  // Live Streams handlers
  const setLiveStreams = (newLiveStreams: LiveStream[]) => {
    setLiveStreamsState(newLiveStreams)
    try {
      localStorage.setItem('eglizia_livestreams', JSON.stringify(newLiveStreams))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    }
  }

  const updateLiveStream = (id: string, updates: Partial<LiveStream>) => {
    const newLiveStreams = liveStreams.map(l => (l.id === id ? { ...l, ...updates } : l))
    setLiveStreams(newLiveStreams)
  }

  const addLiveStream = (liveStream: LiveStream) => {
    setLiveStreams([...liveStreams, liveStream])
  }

  const deleteLiveStream = (id: string) => {
    setLiveStreams(liveStreams.filter(l => l.id !== id))
  }

  // Preachings handlers
  const setPreachings = (newPreachings: Preaching[]) => {
    setPreachingsState(newPreachings)
    try {
      localStorage.setItem('eglizia_preachings', JSON.stringify(newPreachings))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    }
  }

  const updatePreaching = (id: string, updates: Partial<Preaching>) => {
    const newPreachings = preachings.map(p => (p.id === id ? { ...p, ...updates } : p))
    setPreachings(newPreachings)
  }

  const addPreaching = (preaching: Preaching) => {
    setPreachings([...preachings, preaching])
  }

  const deletePreaching = (id: string) => {
    setPreachings(preachings.filter(p => p.id !== id))
  }

  const value: AppContextType = {
    members, setMembers, updateMember, addMember, deleteMember,
    events, setEvents, updateEvent, addEvent, deleteEvent,
    announcements, setAnnouncements, updateAnnouncement, addAnnouncement, deleteAnnouncement,
    departments, setDepartments, updateDepartment, addDepartment, deleteDepartment,
    liveStreams, setLiveStreams, updateLiveStream, addLiveStream, deleteLiveStream,
    preachings, setPreachings, updatePreaching, addPreaching, deletePreaching,
  }

  return (
    <AppContext.Provider value={value}>
      {isHydrated ? children : <></>}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}
