export interface Expense {
  id?: string;
  title: string;
  description?: string;
  amount: number;
  currency?: string;
  category?: 'loyer' | 'électricité' | 'eau' | 'matériel' | 'transport' | 'événement' | 'salaires' | 'autre';
  expense_date?: string;
  receipt_url?: string;
  approved_by?: string;
  status?: 'en_attente' | 'approuvé' | 'rejeté';
  created_at?: string;
  updated_at?: string;
}

export type ExpenseCategory = 'loyer' | 'électricité' | 'eau' | 'matériel' | 'transport' | 'événement' | 'salaires' | 'autre';
export type ExpenseStatus = 'en_attente' | 'approuvé' | 'rejeté';

export interface ExpenseSummary {
  total_amount: number;
  count: number;
  average_amount: number;
  by_category: Record<ExpenseCategory, number>;
  by_status: Record<ExpenseStatus, number>;
}
