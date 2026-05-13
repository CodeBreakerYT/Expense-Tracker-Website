'use client';

import React, { useState } from 'react';
import { PlusCircle, Tag, Wallet } from 'lucide-react';
import { Category, Expense } from '@/lib/types';

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
}

const CATEGORIES: Category[] = ['Food', 'Travel', 'Marketing', 'Utilities', 'Other'];

export default function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Food');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount || parseFloat(amount) <= 0) return;

    onAddExpense({
      name,
      amount: parseFloat(amount),
      category,
    });

    setName('');
    setAmount('');
    setCategory('Food');
  };

  return (
    <div className="glass-card p-6 md:p-8">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <PlusCircle className="text-primary" size={24} />
        Add New Expense
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5 ml-1">Expense Name</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <Tag size={18} />
            </span>
            <input
              type="text"
              placeholder="e.g. Office Supplies"
              className="input-field pl-11"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5 ml-1">Amount ($)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                $
              </span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                className="input-field pl-11"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5 ml-1">Category</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Wallet size={18} />
              </span>
              <select
                className="input-field pl-11 appearance-none cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="btn-primary w-full mt-2 flex items-center justify-center gap-2">
          <PlusCircle size={20} />
          Add Expense
        </button>
      </form>
    </div>
  );
}
