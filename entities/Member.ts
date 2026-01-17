export interface Member {
  id?: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  address?: string;
  avatar_url?: string;
  photo_url?: string;
  birth_date?: string;
  bio?: string;
  gender?: 'homme' | 'femme';
  marital_status?: 'célibataire' | 'marié(e)' | 'veuf(ve)' | 'divorcé(e)';
  role?: 'pastor' | 'co-pastor' | 'leader' | 'youth-leader' | 'women-leader' | 'men-leader' | 'children-leader' | 'worship-leader' | 'coordinator' | 'member';
  status?: 'active' | 'inactive' | 'pending';
  membership_status?: 'nouveau' | 'membre' | 'baptisé' | 'serviteur' | 'leader';
  join_date?: string;
  baptism_date?: string;
  department_id?: string;
  cell_group?: string;
  notes?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export type MemberStatus = 'nouveau' | 'membre' | 'baptisé' | 'serviteur' | 'leader';
export type MemberGender = 'homme' | 'femme';
export type MaritalStatus = 'célibataire' | 'marié(e)' | 'veuf(ve)' | 'divorcé(e)';
