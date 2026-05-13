'use client';

import React from 'react';
import { Trash2, ShoppingBag, MapPin, Briefcase, Zap, MoreHorizontal } from 'lucide-react';
import { Expense, Category } from '@/lib/types';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  Food: <ShoppingBag size={20} />,
  Travel: <MapPin size={20} />,
  Marketing: <Briefcase size={20} />,
  Utilities: <Zap size={20} />,
  Other: <MoreHorizontal size={20} />,
};

const CATEGORY_COLORS: Record<Category, string> = {
  Food: 'bg-orange-100 text-orange-600',
  Travel: 'bg-blue-100 text-blue-600',
  Marketing: 'bg-purple-100 text-purple-600',
  Utilities: 'bg-yellow-100 text-yellow-600',
  Other: 'bg-slate-100 text-slate-600',
};

export default function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="glass-card p-12 text-center">
        <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
          <ShoppingBag size={32} />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">No expenses yet</h3>
        <p className="text-slate-500 max-w-xs mx-auto mt-1">
          Start logging your expenses to see them organized here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-bold flex items-center gap-2">
          Recent Expenses
          <span className="bg-primary/10 text-primary text-sm font-normal px-2 py-0.5 rounded-full">
            {expenses.length}
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="glass-card group hover:border-primary/30 transition-all p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${CATEGORY_COLORS[expense.category]}`}>
                {CATEGORY_ICONS[expense.category]}
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{expense.name}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`category-badge ${CATEGORY_COLORS[expense.category]}`}>
                    {expense.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(expense.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-lg font-black text-slate-900">
                  ${expense.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>
              <button
                onClick={() => onDeleteExpense(expense.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                aria-label="Delete expense"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
