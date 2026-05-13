'use client';

import React from 'react';
import { PieChart, TrendingUp, DollarSign } from 'lucide-react';
import { Expense, Category } from '@/lib/types';

interface SummaryPanelProps {
  expenses: Expense[];
}

const CATEGORY_COLORS: Record<Category, string> = {
  Food: 'bg-orange-500',
  Travel: 'bg-blue-500',
  Marketing: 'bg-purple-500',
  Utilities: 'bg-yellow-500',
  Other: 'bg-slate-500',
};

export default function SummaryPanel({ expenses }: SummaryPanelProps) {
  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {} as Record<Category, number>);

  const categories: Category[] = ['Food', 'Travel', 'Marketing', 'Utilities', 'Other'];

  return (
    <div className="glass-card p-6 md:p-8 bg-slate-900 text-white border-none overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 text-primary mb-6">
          <TrendingUp size={20} />
          <span className="text-xs font-bold uppercase tracking-widest">Financial Overview</span>
        </div>

        <div className="mb-10">
          <p className="text-slate-400 text-sm font-medium">Total Spending</p>
          <div className="flex items-end gap-1">
            <span className="text-2xl font-medium text-slate-500 mb-1">$</span>
            <h1 className="text-5xl font-black tracking-tight leading-none">
              {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h1>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <PieChart size={16} className="text-primary" />
              Category Breakdown
            </h3>
          </div>

          <div className="space-y-5">
            {categories.map((cat) => {
              const catTotal = categoryTotals[cat] || 0;
              const percentage = total > 0 ? (catTotal / total) * 100 : 0;

              return (
                <div key={cat} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                    <span className="text-slate-400">{cat}</span>
                    <span className="text-white">${catTotal.toLocaleString()}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ease-out ${CATEGORY_COLORS[cat]}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {expenses.length > 0 && (
          <div className="mt-10 p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
              <DollarSign size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Average Expense</p>
              <p className="font-bold text-sm">
                ${(total / expenses.length).toLocaleString(undefined, { maximumFractionDigits: 2 })} / entry
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
