// Interactions utilities for likes and shares across the site
import { useState, useEffect } from 'react'

export interface UserInteraction {
  contentId: string
  contentType: 'preaching' | 'testimony' | 'announcement' | 'sermon'
  likes: Set<string>
  shares: number
}

// Store user interactions in localStorage
export const useInteractions = () => {
  const [interactions, setInteractions] = useState<Map<string, UserInteraction>>(new Map())
  const userId = `user_${Math.random().toString(36).substr(2, 9)}` // Simple user ID

  useEffect(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem('eglizia_interactions')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        const map = new Map(
          Object.entries(parsed).map(([key, value]: [string, any]) => [
            key,
            {
              ...value,
              likes: new Set(value.likes || [])
            }
          ])
        )
        setInteractions(map)
      } catch (e) {
        console.error('Failed to parse interactions:', e)
      }
    }
  }, [])

  // Save to localStorage whenever interactions change
  useEffect(() => {
    const toStore = Object.fromEntries(
      Array.from(interactions.entries()).map(([key, value]) => [
        key,
        {
          ...value,
          likes: Array.from(value.likes)
        }
      ])
    )
    localStorage.setItem('eglizia_interactions', JSON.stringify(toStore))
  }, [interactions])

  const toggleLike = (contentId: string, contentType: string) => {
    const key = `${contentType}_${contentId}`
    const current = interactions.get(key) || {
      contentId,
      contentType: contentType as any,
      likes: new Set(),
      shares: 0
    }

    const newLikes = new Set(current.likes)
    if (newLikes.has(userId)) {
      newLikes.delete(userId)
    } else {
      newLikes.add(userId)
    }

    const updated = new Map(interactions)
    updated.set(key, { ...current, likes: newLikes })
    setInteractions(updated)
  }

  const addShare = (contentId: string, contentType: string) => {
    const key = `${contentType}_${contentId}`
    const current = interactions.get(key) || {
      contentId,
      contentType: contentType as any,
      likes: new Set(),
      shares: 0
    }

    const updated = new Map(interactions)
    updated.set(key, { ...current, shares: current.shares + 1 })
    setInteractions(updated)
  }

  const getLikes = (contentId: string, contentType: string) => {
    const key = `${contentType}_${contentId}`
    return interactions.get(key)?.likes.size || 0
  }

  const getShares = (contentId: string, contentType: string) => {
    const key = `${contentType}_${contentId}`
    return interactions.get(key)?.shares || 0
  }

  const isLiked = (contentId: string, contentType: string) => {
    const key = `${contentType}_${contentId}`
    return interactions.get(key)?.likes.has(userId) || false
  }

  return {
    toggleLike,
    addShare,
    getLikes,
    getShares,
    isLiked
  }
}
