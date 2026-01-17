export interface Testimony {
  id?: string;
  name: string;
  title: string;
  type: 'Guérison' | 'Liberté' | 'Restauration' | 'Appel' | 'Autre';
  content: string;
  status?: 'pending' | 'approved' | 'rejected';
  featured?: boolean;
  date?: string;
  avatar?: string;
}
