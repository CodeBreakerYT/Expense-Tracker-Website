import { Expense, CurrencyRate } from './types';

export const convertCurrency = (amount: number, fromRate: number, toRate: number): number => {
  return (amount / fromRate) * toRate;
};

export const formatCurrency = (amount: number, currency: string): string => {
  return `${currency} ${amount.toFixed(2)}`;
};

export const getTotalExpenses = (expenses: Expense[], rates: CurrencyRate, baseCurrency: string): number => {
  return expenses.reduce((total, expense) => {
    const baseRate = rates[baseCurrency] || 1;
    const expenseRate = rates[expense.currency] || 1;
    const convertedAmount = convertCurrency(expense.amount, expenseRate, baseRate);
    return total + convertedAmount;
  }, 0);
};

export const getExpensesByCategory = (expenses: Expense[]): Record<string, number> => {
  const categoryTotals: Record<string, number> = {};
  expenses.forEach((expense) => {
    if (!categoryTotals[expense.category]) {
      categoryTotals[expense.category] = 0;
    }
    categoryTotals[expense.category] += expense.amount;
  });
  return categoryTotals;
};

export const fetchExchangeRates = async (): Promise<CurrencyRate> => {
  try {
    const response = await fetch('https://api.frankfurter.app/latest?base=USD');
    if (!response.ok) throw new Error('Failed to fetch rates');
    const data = await response.json();
    return { USD: 1, ...data.rates };
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return { USD: 1, EUR: 0.95, GBP: 0.82, JPY: 150, AUD: 1.5, CAD: 1.35, CHF: 0.88, CNY: 7.2, INR: 83, MXN: 17 };
  }
};
