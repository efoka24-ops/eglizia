// Base44 SDK initialization and API client configuration
import type { 
  Member, 
  Department, 
  Event, 
  Donation, 
  Preaching, 
  Testimony, 
  PrayerRequest, 
  Expense, 
  Attendance, 
  Announcement, 
  LiveStream 
} from '@/entities'

// This would be your actual Base44 SDK initialization
// For now, we're creating a mock implementation
class Base44Client {
  private apiBaseUrl: string
  private accessToken?: string

  constructor(apiBaseUrl: string = process.env.REACT_APP_BASE44_URL || '') {
    this.apiBaseUrl = apiBaseUrl
    this.accessToken = localStorage.getItem('base44_token') || undefined
  }

  // Authentication
  async login(email: string, password: string) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (data.token) {
        this.accessToken = data.token
        localStorage.setItem('base44_token', data.token)
      }
      return data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  async logout() {
    this.accessToken = undefined
    localStorage.removeItem('base44_token')
  }

  async getCurrentUser() {
    return this.request('/auth/me', 'GET')
  }

  // Generic request handler
  private async request(endpoint: string, method: string = 'GET', data?: any) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`
    }

    try {
      const response = await fetch(`${this.apiBaseUrl}${endpoint}`, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`Request to ${endpoint} failed:`, error)
      throw error
    }
  }

  // Entity CRUD operations
  readonly entities = {
    Member: {
      list: () => this.request('/members', 'GET'),
      get: (id: string) => this.request(`/members/${id}`, 'GET'),
      create: (data: Member) => this.request('/members', 'POST', data),
      update: (id: string, data: Partial<Member>) => this.request(`/members/${id}`, 'PUT', data),
      delete: (id: string) => this.request(`/members/${id}`, 'DELETE'),
      filter: (query: any) => this.request('/members/filter', 'POST', query),
    },
    Department: {
      list: () => this.request('/departments', 'GET'),
      get: (id: string) => this.request(`/departments/${id}`, 'GET'),
      create: (data: Department) => this.request('/departments', 'POST', data),
      update: (id: string, data: Partial<Department>) => this.request(`/departments/${id}`, 'PUT', data),
      delete: (id: string) => this.request(`/departments/${id}`, 'DELETE'),
    },
    Event: {
      list: () => this.request('/events', 'GET'),
      get: (id: string) => this.request(`/events/${id}`, 'GET'),
      create: (data: Event) => this.request('/events', 'POST', data),
      update: (id: string, data: Partial<Event>) => this.request(`/events/${id}`, 'PUT', data),
      delete: (id: string) => this.request(`/events/${id}`, 'DELETE'),
      filter: (query: any) => this.request('/events/filter', 'POST', query),
    },
    Donation: {
      list: () => this.request('/donations', 'GET'),
      get: (id: string) => this.request(`/donations/${id}`, 'GET'),
      create: (data: Donation) => this.request('/donations', 'POST', data),
      update: (id: string, data: Partial<Donation>) => this.request(`/donations/${id}`, 'PUT', data),
      delete: (id: string) => this.request(`/donations/${id}`, 'DELETE'),
      filter: (query: any) => this.request('/donations/filter', 'POST', query),
    },
    Preaching: {
      list: () => this.request('/preachings', 'GET'),
      get: (id: string) => this.request(`/preachings/${id}`, 'GET'),
      create: (data: Preaching) => this.request('/preachings', 'POST', data),
      update: (id: string, data: Partial<Preaching>) => this.request(`/preachings/${id}`, 'PUT', data),
      delete: (id: string) => this.request(`/preachings/${id}`, 'DELETE'),
    },
    Testimony: {
      list: () => this.request('/testimonies', 'GET'),
      get: (id: string) => this.request(`/testimonies/${id}`, 'GET'),
      create: (data: Testimony) => this.request('/testimonies', 'POST', data),
      update: (id: string, data: Partial<Testimony>) => this.request(`/testimonies/${id}`, 'PUT', data),
      delete: (id: string) => this.request(`/testimonies/${id}`, 'DELETE'),
      approve: (id: string) => this.request(`/testimonies/${id}/approve`, 'PUT'),
    },
    PrayerRequest: {
      list: () => this.request('/prayer-requests', 'GET'),
      get: (id: string) => this.request(`/prayer-requests/${id}`, 'GET'),
      create: (data: PrayerRequest) => this.request('/prayer-requests', 'POST', data),
      update: (id: string, data: Partial<PrayerRequest>) => this.request(`/prayer-requests/${id}`, 'PUT', data),
      delete: (id: string) => this.request(`/prayer-requests/${id}`, 'DELETE'),
      filter: (query: any) => this.request('/prayer-requests/filter', 'POST', query),
    },
    Expense: {
      list: () => this.request('/expenses', 'GET'),
      get: (id: string) => this.request(`/expenses/${id}`, 'GET'),
      create: (data: Expense) => this.request('/expenses', 'POST', data),
      update: (id: string, data: Partial<Expense>) => this.request(`/expenses/${id}`, 'PUT', data),
      delete: (id: string) => this.request(`/expenses/${id}`, 'DELETE'),
      filter: (query: any) => this.request('/expenses/filter', 'POST', query),
    },
    Attendance: {
      list: () => this.request('/attendance', 'GET'),
      get: (id: string) => this.request(`/attendance/${id}`, 'GET'),
      create: (data: Attendance) => this.request('/attendance', 'POST', data),
      update: (id: string, data: Partial<Attendance>) => this.request(`/attendance/${id}`, 'PUT', data),
      delete: (id: string) => this.request(`/attendance/${id}`, 'DELETE'),
    },
    Announcement: {
      list: () => this.request('/announcements', 'GET'),
      get: (id: string) => this.request(`/announcements/${id}`, 'GET'),
      create: (data: Announcement) => this.request('/announcements', 'POST', data),
      update: (id: string, data: Partial<Announcement>) => this.request(`/announcements/${id}`, 'PUT', data),
      delete: (id: string) => this.request(`/announcements/${id}`, 'DELETE'),
    },
    LiveStream: {
      list: () => this.request('/live-streams', 'GET'),
      get: (id: string) => this.request(`/live-streams/${id}`, 'GET'),
      create: (data: LiveStream) => this.request('/live-streams', 'POST', data),
      update: (id: string, data: Partial<LiveStream>) => this.request(`/live-streams/${id}`, 'PUT', data),
      delete: (id: string) => this.request(`/live-streams/${id}`, 'DELETE'),
    },
  }

  readonly auth = {
    login: this.login.bind(this),
    logout: this.logout.bind(this),
    me: this.getCurrentUser.bind(this),
  }
}

// Export singleton instance
export const base44 = new Base44Client()

export default base44
