import React, { createContext, useContext, useState } from 'react'
import { mockMembers, mockEvents, mockAnnouncements, mockDepartments, mockLiveStreams, mockPreachings, mockChatMessages } from '@/lib/mockData'
import type { Member, Event, Announcement, Department, LiveStream, Preaching, PrayerRequest, ContactInfo, ContactMessage, EventSubscription, Testimony, ChatMessage } from '@/entities'

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
  
  // Chat Messages
  chatMessages: ChatMessage[]
  setChatMessages: (messages: ChatMessage[]) => void
  addChatMessage: (message: ChatMessage) => void
  deleteChatMessage: (id: string) => void
  getChatMessagesByStreamId: (streamId: string) => ChatMessage[]
  
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

  // Donations
  donations: any[]
  setDonations: (donations: any[]) => void
  addDonation: (donation: any) => void
  deleteDonation: (id: string) => void
  updateDonation: (id: string, donation: Partial<any>) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Architecture simple : les données viennent directement de mockData.ts
// Pour modifier les données visibles par tous, modifier mockData.ts et redéployer.
// L'admin permet des modifications en session (mémoire) mais les données
// permanentes sont dans le code.

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Initialisation directe depuis mockData — pas de localStorage, pas d'API
  const [members, setMembersState] = useState<Member[]>(mockMembers)
  const [events, setEventsState] = useState<Event[]>(mockEvents)
  const [announcements, setAnnouncementsState] = useState<Announcement[]>(mockAnnouncements)
  const [departments, setDepartmentsState] = useState<Department[]>(mockDepartments)
  const [liveStreams, setLiveStreamsState] = useState<LiveStream[]>(mockLiveStreams)
  const [preachings, setPreachingsState] = useState<Preaching[]>(mockPreachings)
  const [chatMessages, setChatMessagesState] = useState<ChatMessage[]>(mockChatMessages)
  const [prayers, setPrayersState] = useState<PrayerRequest[]>([])
  const [donations, setDonationsState] = useState<any[]>([])
  const [contactInfo, setContactInfoState] = useState<ContactInfo | null>(null)
  const [contactMessages, setContactMessagesState] = useState<ContactMessage[]>([])
  const [eventSubscriptions, setEventSubscriptionsState] = useState<EventSubscription[]>([])
  const [testimonies, setTestimoniesState] = useState<Testimony[]>([])

  // Members handlers
  const setMembers = (newMembers: Member[]) => setMembersState(newMembers)
  const updateMember = (id: string, updates: Partial<Member>) => {
    setMembersState(prev => prev.map(m => (m.id === id ? { ...m, ...updates } : m)))
  }
  const addMember = (member: Member) => setMembersState(prev => [...prev, member])
  const deleteMember = (id: string) => setMembersState(prev => prev.filter(m => m.id !== id))

  // Events handlers
  const setEvents = (newEvents: Event[]) => setEventsState(newEvents)
  const updateEvent = (id: string, updates: Partial<Event>) => {
    setEventsState(prev => prev.map(e => (e.id === id ? { ...e, ...updates } : e)))
  }
  const addEvent = (event: Event) => setEventsState(prev => [...prev, event])
  const deleteEvent = (id: string) => setEventsState(prev => prev.filter(e => e.id !== id))

  // Announcements handlers
  const setAnnouncements = (newAnnouncements: Announcement[]) => setAnnouncementsState(newAnnouncements)
  const updateAnnouncement = (id: string, updates: Partial<Announcement>) => {
    setAnnouncementsState(prev => prev.map(a => (a.id === id ? { ...a, ...updates } : a)))
  }
  const addAnnouncement = (announcement: Announcement) => setAnnouncementsState(prev => [...prev, announcement])
  const deleteAnnouncement = (id: string) => setAnnouncementsState(prev => prev.filter(a => a.id !== id))

  // Departments handlers
  const setDepartments = (newDepartments: Department[]) => setDepartmentsState(newDepartments)
  const updateDepartment = (id: string, updates: Partial<Department>) => {
    setDepartmentsState(prev => prev.map(d => (d.id === id ? { ...d, ...updates } : d)))
  }
  const addDepartment = (department: Department) => setDepartmentsState(prev => [...prev, department])
  const deleteDepartment = (id: string) => setDepartmentsState(prev => prev.filter(d => d.id !== id))

  // Live Streams handlers
  const setLiveStreams = (newLiveStreams: LiveStream[]) => setLiveStreamsState(newLiveStreams)
  const updateLiveStream = (id: string, updates: Partial<LiveStream>) => {
    setLiveStreamsState(prev => prev.map(l => (l.id === id ? { ...l, ...updates } : l)))
  }
  const addLiveStream = (liveStream: LiveStream) => setLiveStreamsState(prev => [...prev, liveStream])
  const deleteLiveStream = (id: string) => setLiveStreamsState(prev => prev.filter(l => l.id !== id))

  // Preachings handlers
  const setPreachings = (newPreachings: Preaching[]) => setPreachingsState(newPreachings)
  const updatePreaching = (id: string, updates: Partial<Preaching>) => {
    setPreachingsState(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)))
  }
  const addPreaching = (preaching: Preaching) => setPreachingsState(prev => [...prev, preaching])
  const deletePreaching = (id: string) => setPreachingsState(prev => prev.filter(p => p.id !== id))

  // Chat Messages handlers
  const setChatMessages = (newMessages: ChatMessage[]) => setChatMessagesState(newMessages)
  const addChatMessage = (message: ChatMessage) => setChatMessagesState(prev => [...prev, message])
  const deleteChatMessage = (id: string) => setChatMessagesState(prev => prev.filter(m => m.id !== id))
  const getChatMessagesByStreamId = (streamId: string): ChatMessage[] => {
    return chatMessages.filter(m => m.stream_id === streamId)
  }

  // Prayer handlers
  const setPrayers = (newPrayers: PrayerRequest[]) => setPrayersState(newPrayers)
  const updatePrayer = (id: string, updates: Partial<PrayerRequest>) => {
    setPrayersState(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)))
  }
  const addPrayer = (prayer: PrayerRequest) => setPrayersState(prev => [...prev, prayer])
  const deletePrayer = (id: string) => setPrayersState(prev => prev.filter(p => p.id !== id))

  // Contact handlers
  const setContactInfo = (info: ContactInfo) => setContactInfoState(info)

  // Contact Messages handlers
  const setContactMessages = (messages: ContactMessage[]) => setContactMessagesState(messages)
  const addContactMessage = (message: ContactMessage) => setContactMessagesState(prev => [...prev, message])
  const deleteContactMessage = (id: string) => setContactMessagesState(prev => prev.filter(m => m.id !== id))
  const updateContactMessage = (id: string, updates: Partial<ContactMessage>) => {
    setContactMessagesState(prev => prev.map(m => (m.id === id ? { ...m, ...updates } : m)))
  }

  // Event Subscriptions handlers
  const setEventSubscriptions = (subscriptions: EventSubscription[]) => setEventSubscriptionsState(subscriptions)
  const addEventSubscription = (subscription: EventSubscription) => setEventSubscriptionsState(prev => [...prev, subscription])
  const deleteEventSubscription = (id: string) => setEventSubscriptionsState(prev => prev.filter(s => s.id !== id))
  const updateEventSubscription = (id: string, updates: Partial<EventSubscription>) => {
    setEventSubscriptionsState(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)))
  }

  // Testimonies handlers
  const setTestimonies = (testimonies: Testimony[]) => setTestimoniesState(testimonies)
  const addTestimony = (testimony: Testimony) => setTestimoniesState(prev => [...prev, testimony])
  const deleteTestimony = (id: string) => setTestimoniesState(prev => prev.filter(t => t.id !== id))
  const updateTestimony = (id: string, updates: Partial<Testimony>) => {
    setTestimoniesState(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)))
  }

  // Donations handlers
  const setDonations = (newDonations: any[]) => setDonationsState(newDonations)
  const addDonation = (donation: any) => setDonationsState(prev => [...prev, donation])
  const deleteDonation = (id: string) => setDonationsState(prev => prev.filter(d => d.id !== id))
  const updateDonation = (id: string, updates: Partial<any>) => {
    setDonationsState(prev => prev.map(d => (d.id === id ? { ...d, ...updates } : d)))
  }

  const value: AppContextType = {
    members, setMembers, updateMember, addMember, deleteMember,
    events, setEvents, updateEvent, addEvent, deleteEvent,
    announcements, setAnnouncements, updateAnnouncement, addAnnouncement, deleteAnnouncement,
    departments, setDepartments, updateDepartment, addDepartment, deleteDepartment,
    liveStreams, setLiveStreams, updateLiveStream, addLiveStream, deleteLiveStream,
    chatMessages, setChatMessages, addChatMessage, deleteChatMessage, getChatMessagesByStreamId,
    preachings, setPreachings, updatePreaching, addPreaching, deletePreaching,
    prayers, setPrayers, updatePrayer, addPrayer, deletePrayer,
    donations, setDonations, addDonation, deleteDonation, updateDonation,
    contactInfo, setContactInfo,
    contactMessages, setContactMessages, addContactMessage, deleteContactMessage, updateContactMessage,
    eventSubscriptions, setEventSubscriptions, addEventSubscription, deleteEventSubscription, updateEventSubscription,
    testimonies, setTestimonies, addTestimony, deleteTestimony, updateTestimony,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
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
