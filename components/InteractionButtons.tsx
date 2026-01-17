import React from 'react'
import { Heart, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useInteractions } from '@/lib/interactions'

interface InteractionButtonsProps {
  contentId: string
  contentType: 'preaching' | 'testimony' | 'announcement' | 'sermon' | 'event'
  title?: string
  content?: string
  variant?: 'default' | 'outline'
  size?: 'default' | 'sm'
}

export default function InteractionButtons({
  contentId,
  contentType,
  title = 'Contenu',
  content = '',
  variant = 'outline',
  size = 'sm'
}: InteractionButtonsProps) {
  const { toggleLike, addShare, getLikes, getShares, isLiked } = useInteractions()
  const likes = getLikes(contentId, contentType)
  const shares = getShares(contentId, contentType)
  const liked = isLiked(contentId, contentType)

  const handleLike = () => {
    toggleLike(contentId, contentType)
  }

  const handleShare = () => {
    addShare(contentId, contentType)
    const text = `${title}\n${content}`
    
    if (navigator.share) {
      navigator.share({
        title: 'Eglizia - ' + title,
        text: text,
        url: window.location.href,
      }).catch(err => console.log('Error sharing:', err))
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(text)
      // Show feedback
      const event = new CustomEvent('shareSuccess')
      window.dispatchEvent(event)
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleLike}
        variant={variant}
        size={size}
        className={`flex-1 transition-colors ${
          liked
            ? 'bg-red-100 text-red-600 border-red-300 hover:bg-red-200'
            : 'hover:bg-red-50'
        }`}
      >
        <Heart className={`w-4 h-4 mr-1 ${liked ? 'fill-current' : ''}`} />
        <span className="text-xs">{likes > 0 ? `${likes}` : 'Aimer'}</span>
      </Button>
      <Button
        onClick={handleShare}
        variant={variant}
        size={size}
        className="flex-1 hover:bg-blue-50"
      >
        <Share2 className="w-4 h-4 mr-1" />
        <span className="text-xs">{shares > 0 ? `${shares}` : 'Partager'}</span>
      </Button>
    </div>
  )
}
