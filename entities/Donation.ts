export interface Donation {
  id?: string;
  donor_name?: string;
  donor_email?: string;
  donor_phone?: string;
  member_id?: string;
  amount: number;
  currency?: string;
  donation_type?: 'dîme' | 'offrande' | 'don_special' | 'projet';
  payment_method?: 'espèces' | 'mobile_money' | 'virement' | 'chèque';
  project_name?: string;
  donation_date?: string;
  notes?: string;
  is_anonymous?: boolean;
  created_at?: string;
  updated_at?: string;
}

export type DonationType = 'dîme' | 'offrande' | 'don_special' | 'projet';
export type PaymentMethod = 'espèces' | 'mobile_money' | 'virement' | 'chèque';

export interface DonationSummary {
  total_amount: number;
  count: number;
  average_amount: number;
  by_type: Record<DonationType, number>;
  by_method: Record<PaymentMethod, number>;
}
