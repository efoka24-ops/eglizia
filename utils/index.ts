import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Page URL mapping for routing
const PAGE_URLS: Record<string, string> = {
  'Home': '/',
  'APropos': '/a-propos',
  'Leadership': '/leadership',
  'Departements': '/departements',
  'Dons': '/dons',
  'Contact': '/contact',
  'Live': '/live',
  'Predications': '/predications',
  'Priere': '/priere',
  'Programmes': '/programmes',
  'Temoignages': '/temoignages',
  'Dashboard': '/admin/dashboard',
  'AdminAnnouncements': '/admin/announcements',
  'AdminMembers': '/admin/members',
  'AdminEvents': '/admin/events',
  'AdminDepartments': '/admin/departments',
  'AdminFinances': '/admin/finances',
  'AdminProgrammes': '/admin/programmes',
  'AdminPreachings': '/admin/preachings',
  'AdminSubscriptions': '/admin/subscriptions',
  'AdminTestimonies': '/admin/testimonies',
  'AdminPrayers': '/admin/prayers',
  'AdminLive': '/admin/live',
  'AdminMessages': '/admin/messages',
  'AdminContact': '/admin/contact',
}

/**
 * Convert page name to URL path
 * @param pageName - Page identifier (e.g., 'Home', 'APropos', 'Dashboard')
 * @returns URL path
 */
export function createPageUrl(pageName: string): string {
  return PAGE_URLS[pageName] || '/'
}

/**
 * Format date for French locale
 * @param date - Date object or string
 * @returns Formatted date string (DD/MM/YYYY)
 */
export function formatDateFR(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

/**
 * Format time (HH:MM)
 * @param time - Time string (HH:MM) or Date object
 * @returns Formatted time (HH:MM)
 */
export function formatTime(time: string | Date): string {
  if (typeof time === 'string') {
    return time
  }
  const hours = String(time.getHours()).padStart(2, '0')
  const minutes = String(time.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param length - Maximum length
 * @param suffix - Suffix to add if truncated (default: '...')
 * @returns Truncated text
 */
export function truncateText(text: string, length: number, suffix: string = '...'): string {
  if (text.length <= length) return text
  return text.substring(0, length) + suffix
}

/**
 * Capitalize first letter
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Check if value is empty
 * @param value - Value to check
 * @returns true if empty
 */
export function isEmpty(value: any): boolean {
  if (!value) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}
