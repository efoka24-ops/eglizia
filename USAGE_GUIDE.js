// GUIDE D'UTILISATION - InteractionButtons et Système de Likes/Partages
// ===================================================================

// 1. UTILISER LE COMPOSANT INTERACTIONBUTTONS
// ============================================

import InteractionButtons from '@/components/InteractionButtons'

// Dans votre composant:
export default function MonContenu() {
  const contenu = {
    id: 'preaching_123',
    title: 'Ma Prédication',
    description: 'Description du contenu...',
    type: 'video',
  }

  return (
    <div>
      <h1>{contenu.title}</h1>
      
      {/* Simple usage */}
      <InteractionButtons
        contentId={contenu.id}
        contentType="preaching"
        title={contenu.title}
        content={contenu.description}
      />

      {/* Avec options avancées */}
      <InteractionButtons
        contentId={contenu.id}
        contentType="preaching"
        title={contenu.title}
        content={contenu.description}
        variant="outline"
        size="sm"
      />
    </div>
  )
}

// 2. UTILISER LE HOOK useInteractions DIRECTEMENT
// =================================================

import { useInteractions } from '@/lib/interactions'

export default function MonComposant() {
  const {
    toggleLike,
    addShare,
    getLikes,
    getShares,
    isLiked,
  } = useInteractions()

  const contentId = 'testimony_456'
  const contentType = 'testimony'

  return (
    <div>
      {/* Vérifier si aimé */}
      {isLiked(contentId, contentType) && <p>Vous avez aimé ❤️</p>}

      {/* Afficher les compteurs */}
      <p>Likes: {getLikes(contentId, contentType)}</p>
      <p>Partages: {getShares(contentId, contentType)}</p>

      {/* Boutons custom */}
      <button onClick={() => toggleLike(contentId, contentType)}>
        Aimer
      </button>

      <button onClick={() => {
        addShare(contentId, contentType)
        alert('Partagé!')
      }}>
        Partager
      </button>
    </div>
  )
}

// 3. AJOUTER DANS DE NOUVELLES PAGES
// ===================================

// Exemple: Ajouter sur une page d'Annonces

import InteractionButtons from '@/components/InteractionButtons'
import { useAppContext } from '@/lib/AppContext'

export default function Annonces() {
  const { announcements } = useAppContext()

  return (
    <div>
      {announcements?.map((announcement) => (
        <div key={announcement.id}>
          <h2>{announcement.title}</h2>
          <p>{announcement.content}</p>
          
          {/* Ajouter les boutons d'interaction */}
          <InteractionButtons
            contentId={announcement.id}
            contentType="announcement"
            title={announcement.title}
            content={announcement.content}
          />
        </div>
      ))}
    </div>
  )
}

// 4. TYPES DE CONTENUS SUPPORTÉS
// ================================

// Valeurs possibles pour contentType:
const contentTypes = [
  'preaching',      // Prédications
  'testimony',      // Témoignages
  'announcement',   // Annonces
  'event',          // Événements
  'sermon',         // Sermons (générique)
]

// 5. UPLOAD DE FICHIERS (AdminPreachings)
// ========================================

// Dans AdminPreachings.tsx

import React, { useState } from 'react'

export default function AdminPreachings() {
  const [mediaSourceType, setMediaSourceType] = useState('url')
  const [formData, setFormData] = useState({
    media_url: '',
    type: 'video',
  })

  // Gestion upload fichier
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Créer une Blob URL
      const fileUrl = URL.createObjectURL(file)
      setFormData({ ...formData, media_url: fileUrl })
    }
  }

  return (
    <form>
      {/* Toggle URL/File */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMediaSourceType('url')}
          className={mediaSourceType === 'url' ? 'active' : ''}
        >
          Lien URL
        </button>
        <button
          type="button"
          onClick={() => setMediaSourceType('file')}
          className={mediaSourceType === 'file' ? 'active' : ''}
        >
          Télécharger
        </button>
      </div>

      {/* Conditionnel: URL ou Fichier */}
      {mediaSourceType === 'url' ? (
        <input
          type="text"
          placeholder="https://youtube.com/..."
          value={formData.media_url}
          onChange={(e) => setFormData({ ...formData, media_url: e.target.value })}
        />
      ) : (
        <input
          type="file"
          accept={formData.type === 'video' ? 'video/*' : 'audio/*'}
          onChange={handleFileUpload}
        />
      )}
    </form>
  )
}

// 6. PERSONNALISER LES STYLES
// =============================

// InteractionButtons accepte les variantes:

// Variante 1: Outline (par défaut)
<InteractionButtons
  contentId="id"
  contentType="preaching"
  title="Title"
  content="Content"
  variant="outline"  // Bordure grise
/>

// Variante 2: Default
<InteractionButtons
  contentId="id"
  contentType="preaching"
  title="Title"
  content="Content"
  variant="default"  // Fond couleur
/>

// Tailles:
<InteractionButtons
  contentId="id"
  contentType="preaching"
  title="Title"
  content="Content"
  size="sm"       // Petit
/>

<InteractionButtons
  contentId="id"
  contentType="preaching"
  title="Title"
  content="Content"
  size="default"  // Normal
/>

// 7. DONNÉES SAUVEGARDÉES (localStorage)
// =======================================

// Format des interactions sauvegardées:
const interactions = {
  'preaching_123': {
    contentId: 'preaching_123',
    contentType: 'preaching',
    likes: Set([ 'user_abc123', 'user_def456' ]),  // Utilisateurs qui ont aimé
    shares: 5,  // Nombre de partages
  },
  'testimony_456': {
    contentId: 'testimony_456',
    contentType: 'testimony',
    likes: Set([ 'user_abc123' ]),
    shares: 2,
  },
}

// Vous pouvez vérifier dans DevTools:
// Application → Local Storage → eglizia_interactions

// 8. MÉDIA TYPES SUPPORTÉS
// =========================

// Vidéos:
// - YouTube: https://youtube.com/watch?v=ID
// - YouTube Court: https://youtu.be/ID
// - Vimeo: https://vimeo.com/ID
// - Fichiers directs: .mp4, .webm, .ogv

// Audio:
// - SoundCloud: (détecté automatiquement si format)
// - Fichiers directs: .mp3, .wav, .ogg, .m4a

// 9. EXEMPLE COMPLET - PAGE DE PRÉDICATIONS
// ===========================================

import React, { useState } from 'react'
import InteractionButtons from '@/components/InteractionButtons'
import { useAppContext } from '@/lib/AppContext'

export default function Predications() {
  const { preachings } = useAppContext()
  const [selectedMedia, setSelectedMedia] = useState(null)

  return (
    <div>
      {/* Grille de prédications */}
      <div className="grid md:grid-cols-2 gap-6">
        {preachings?.map((sermon) => (
          <div key={sermon.id} className="bg-white rounded p-6">
            {/* Info */}
            <h3>{sermon.title}</h3>
            <p>{sermon.preacher}</p>

            {/* Play button */}
            <button onClick={() => setSelectedMedia(sermon)}>
              Regarder
            </button>

            {/* Interactions */}
            <InteractionButtons
              contentId={sermon.id}
              contentType="preaching"
              title={sermon.title}
              content={sermon.description}
            />
          </div>
        ))}
      </div>

      {/* Modal lecteur */}
      {selectedMedia && (
        <Modal onClose={() => setSelectedMedia(null)}>
          {selectedMedia.media_type === 'video' && (
            <video controls src={selectedMedia.media_url} />
          )}
          {selectedMedia.media_type === 'audio' && (
            <audio controls src={selectedMedia.media_url} />
          )}
        </Modal>
      )}
    </div>
  )
}

// 10. DÉPANNAGE
// ==============

// Q: Les likes ne se sauvegardent pas?
// R: Vérifiez que localStorage est activé dans le navigateur

// Q: Les fichiers uploadés disparaissent après refresh?
// R: C'est normal avec Blob URLs. Solution permanente: Supabase integration

// Q: Comment ajouter sur une nouvelle page?
// R: Importez InteractionButtons et utilisez comme dans les exemples ci-dessus

// Q: Comment changer les couleurs?
// R: Modifiez le composant InteractionButtons.tsx (Tailwind classes)

// Q: Support mobile?
// R: Oui! Responsive et compatible mobile. Partage utilise native share API

// Q: Analytics/Statistiques?
// R: À venir. Actuellement localStorage uniquement
