import React, { createContext, useContext, useState, useEffect } from 'react'
import { mockMembers, mockEvents, mockAnnouncements, mockDepartments, mockLiveStreams, mockPreachings } from '@/lib/mockData'
import type { Member, Event, Announcement, Department, LiveStream, Preaching, PrayerRequest, ContactInfo, ContactMessage, EventSubscription, Testimony } from '@/lib/entities'

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
  
  // Prayer Requests
  prayers: PrayerRequest[]
  setPrayers: (prayers: PrayerRequest[]) => void
  updatePrayer: (id: string, prayer: Partial<PrayerRequest>) => void
  addPrayer: (prayer: PrayerRequest) => void
  deletePrayer: (id: string) => void
  
  // Contact Info
  contactInfo: ContactInfo | null
  setContactInfo: (contactInfo: ContactInfo) => void
  
  // Contact Messages
  contactMessages: ContactMessage[]
  setContactMessages: (messages: ContactMessage[]) => void
  addContactMessage: (message: ContactMessage) => void
  deleteContactMessage: (id: string) => void
  updateContactMessage: (id: string, message: Partial<ContactMessage>) => void

  // Event Subscriptions
  eventSubscriptions: EventSubscription[]
  setEventSubscriptions: (subscriptions: EventSubscription[]) => void
  addEventSubscription: (subscription: EventSubscription) => void
  deleteEventSubscription: (id: string) => void
  updateEventSubscription: (id: string, subscription: Partial<EventSubscription>) => void

  // Testimonies
  testimonies: Testimony[]
  setTestimonies: (testimonies: Testimony[]) => void
  addTestimony: (testimony: Testimony) => void
  deleteTestimony: (id: string) => void
  updateTestimony: (id: string, testimony: Partial<Testimony>) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [members, setMembersState] = useState<Member[]>([])
  const [events, setEventsState] = useState<Event[]>([])
  const [announcements, setAnnouncementsState] = useState<Announcement[]>([])
  const [departments, setDepartmentsState] = useState<Department[]>([])
  const [liveStreams, setLiveStreamsState] = useState<LiveStream[]>([])
  const [preachings, setPreachingsState] = useState<Preaching[]>([])
  const [prayers, setPrayersState] = useState<PrayerRequest[]>([])
  const [contactInfo, setContactInfoState] = useState<ContactInfo | null>(null)
  const [contactMessages, setContactMessagesState] = useState<ContactMessage[]>([])
  const [eventSubscriptions, setEventSubscriptionsState] = useState<EventSubscription[]>([])
  const [testimonies, setTestimoniesState] = useState<Testimony[]>([])
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
      const storedPrayers = localStorage.getItem('eglizia_prayers')
      const storedContactInfo = localStorage.getItem('eglizia_contact')
      const storedContactMessages = localStorage.getItem('eglizia_contact_messages')
      const storedEventSubscriptions = localStorage.getItem('eglizia_event_subscriptions')
      const storedTestimonies = localStorage.getItem('eglizia_testimonies')

      setMembersState(storedMembers ? JSON.parse(storedMembers) : mockMembers)
      setEventsState(storedEvents ? JSON.parse(storedEvents) : mockEvents)
      setAnnouncementsState(storedAnnouncements ? JSON.parse(storedAnnouncements) : mockAnnouncements)
      setDepartmentsState(storedDepartments ? JSON.parse(storedDepartments) : mockDepartments)
      setLiveStreamsState(storedLiveStreams ? JSON.parse(storedLiveStreams) : mockLiveStreams)
      setPreachingsState(storedPreachings ? JSON.parse(storedPreachings) : mockPreachings)
      setPrayersState(storedPrayers ? JSON.parse(storedPrayers) : [])
      setContactInfoState(storedContactInfo ? JSON.parse(storedContactInfo) : null)
      setContactMessagesState(storedContactMessages ? JSON.parse(storedContactMessages) : [])
      setEventSubscriptionsState(storedEventSubscriptions ? JSON.parse(storedEventSubscriptions) : [])
      setTestimoniesState(storedTestimonies ? JSON.parse(storedTestimonies) : [])

      if (!storedMembers) localStorage.setItem('eglizia_members', JSON.stringify(mockMembers))
      if (!storedEvents) localStorage.setItem('eglizia_events', JSON.stringify(mockEvents))
      if (!storedAnnouncements) localStorage.setItem('eglizia_announcements', JSON.stringify(mockAnnouncements))
      if (!storedDepartments) localStorage.setItem('eglizia_departments', JSON.stringify(mockDepartments))
      if (!storedLiveStreams) localStorage.setItem('eglizia_livestreams', JSON.stringify(mockLiveStreams))
      if (!storedPreachings) localStorage.setItem('eglizia_preachings', JSON.stringify(mockPreachings))
      if (!storedPrayers) localStorage.setItem('eglizia_prayers', JSON.stringify([]))
      if (!storedContactInfo) localStorage.setItem('eglizia_contact', JSON.stringify(null))
      if (!storedContactMessages) localStorage.setItem('eglizia_contact_messages', JSON.stringify([]))
      if (!storedEventSubscriptions) localStorage.setItem('eglizia_event_subscriptions', JSON.stringify([]))
      if (!storedTestimonies) localStorage.setItem('eglizia_testimonies', JSON.stringify([]))
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
      setMembersState(mockMembers)
      setEventsState(mockEvents)
      setAnnouncementsState(mockAnnouncements)
      setDepartmentsState(mockDepartments)
      setLiveStreamsState(mockLiveStreams)
      setPreachingsState(mockPreachings)
      setPrayersState([])
      setContactInfoState(null)
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

  // Prayer handlers
  const setPrayers = (newPrayers: PrayerRequest[]) => {
    setPrayersState(newPrayers)
    try {
      localStorage.setItem('eglizia_prayers', JSON.stringify(newPrayers))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    }
  }

  const updatePrayer = (id: string, updates: Partial<PrayerRequest>) => {
    const newPrayers = prayers.map(p => (p.id === id ? { ...p, ...updates } : p))
    setPrayers(newPrayers)
  }

  const addPrayer = (prayer: PrayerRequest) => {
    setPrayers([...prayers, prayer])
  }

  const deletePrayer = (id: string) => {
    setPrayers(prayers.filter(p => p.id !== id))
  }

  // Contact handlers
  const setContactInfo = (info: ContactInfo) => {
    setContactInfoState(info)
    try {
      localStorage.setItem('eglizia_contact', JSON.stringify(info))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    }
  }

  // Contact Messages handlers
  const setContactMessages = (messages: ContactMessage[]) => {
    setContactMessagesState(messages)
    try {
      localStorage.setItem('eglizia_contact_messages', JSON.stringify(messages))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    }
  }

  const addContactMessage = (message: ContactMessage) => {
    setContactMessages([...contactMessages, message])
  }

  const deleteContactMessage = (id: string) => {
    setContactMessages(contactMessages.filter(m => m.id !== id))
  }

  const updateContactMessage = (id: string, updates: Partial<ContactMessage>) => {
    const newMessages = contactMessages.map(m => (m.id === id ? { ...m, ...updates } : m))
    setContactMessages(newMessages)
  }

  // Event Subscriptions handlers
  const setEventSubscriptions = (subscriptions: EventSubscription[]) => {
    setEventSubscriptionsState(subscriptions)
    try {
      localStorage.setItem('eglizia_event_subscriptions', JSON.stringify(subscriptions))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    }
  }

  const addEventSubscription = (subscription: EventSubscription) => {
    setEventSubscriptions([...eventSubscriptions, subscription])
  }

  const deleteEventSubscription = (id: string) => {
    setEventSubscriptions(eventSubscriptions.filter(s => s.id !== id))
  }

  const updateEventSubscription = (id: string, updates: Partial<EventSubscription>) => {
    const newSubscriptions = eventSubscriptions.map(s => (s.id === id ? { ...s, ...updates } : s))
    setEventSubscriptions(newSubscriptions)
  }

  // Testimonies handlers
  const setTestimonies = (testimonies: Testimony[]) => {
    setTestimoniesState(testimonies)
    try {
      localStorage.setItem('eglizia_testimonies', JSON.stringify(testimonies))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    }
  }

  const addTestimony = (testimony: Testimony) => {
    setTestimonies([...testimonies, testimony])
  }

  const deleteTestimony = (id: string) => {
    setTestimonies(testimonies.filter(t => t.id !== id))
  }

  const updateTestimony = (id: string, updates: Partial<Testimony>) => {
    const newTestimonies = testimonies.map(t => (t.id === id ? { ...t, ...updates } : t))
    setTestimonies(newTestimonies)
  }

  const value: AppContextType = {
    members, setMembers, updateMember, addMember, deleteMember,
    events, setEvents, updateEvent, addEvent, deleteEvent,
    announcements, setAnnouncements, updateAnnouncement, addAnnouncement, deleteAnnouncement,
    departments, setDepartments, updateDepartment, addDepartment, deleteDepartment,
    liveStreams, setLiveStreams, updateLiveStream, addLiveStream, deleteLiveStream,
    preachings, setPreachings, updatePreaching, addPreaching, deletePreaching,
    prayers, setPrayers, updatePrayer, addPrayer, deletePrayer,
    contactInfo, setContactInfo,
    contactMessages, setContactMessages, addContactMessage, deleteContactMessage, updateContactMessage,
    eventSubscriptions, setEventSubscriptions, addEventSubscription, deleteEventSubscription, updateEventSubscription,
    testimonies, setTestimonies, addTestimony, deleteTestimony, updateTestimony,
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
