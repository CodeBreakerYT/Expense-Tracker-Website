export type Category = 'Food' | 'Travel' | 'Marketing' | 'Utilities' | 'Other';

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: Category;
  date: string;
}

export interface CurrencyData {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}
