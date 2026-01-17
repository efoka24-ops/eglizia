import { useAppContext } from '@/lib/AppContext'
import { useEffect } from 'react'

export function useDebugMembers() {
  const { members } = useAppContext()

  useEffect(() => {
    console.log('🔍 Membres actuels (contexte):', members)
    console.log('📊 Nombre de pasteurs:', members.filter(m => m.role === 'pastor' || m.role === 'co-pastor').length)
    console.log('📊 Nombre de leaders:', members.filter(m => !['pastor', 'co-pastor', 'member'].includes(m.role)).length)
    
    members.forEach(member => {
      console.log(`👤 ${member.first_name} ${member.last_name}:`, {
        role: member.role,
        hasPhoto: !!member.avatar_url,
        photoLength: member.avatar_url?.length || 0,
      })
    })
  }, [members])

  return members
}
