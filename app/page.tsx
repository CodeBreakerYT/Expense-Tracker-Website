'use client';

import React, { useState, useEffect } from 'react';
import { Expense, Category } from '@/lib/types';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import SummaryPanel from '@/components/SummaryPanel';
import CurrencyConverter from '@/components/CurrencyConverter';
import { Wallet, Sparkles } from 'lucide-react';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mojito_expenses');
    if (saved) {
      try {
        setExpenses(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse expenses", e);
      }
    }
    setMounted(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('mojito_expenses', JSON.stringify(expenses));
    }
  }, [expenses, mounted]);

  const addExpense = (newExpense: Omit<Expense, 'id' | 'date'>) => {
    const expense: Expense = {
      ...newExpense,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    setExpenses([expense, ...expenses]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const totalUSD = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <main className="min-h-screen py-8 px-4 md:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
                <Wallet size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Expense Tracker</h1>
                <p className="text-sm font-bold text-primary uppercase tracking-[0.2em] flex items-center gap-1.5">
                  <Sparkles size={14} /> Powered by Marketing Mojito
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-2xl border border-slate-200">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Budget</p>
              <p className="text-xl font-black text-slate-900">${totalUSD.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        </header>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Forms and Summaries */}
          <div className="lg:col-span-4 space-y-8 order-2 lg:order-1">
            <SummaryPanel expenses={expenses} />
            <CurrencyConverter totalUSD={totalUSD} />
          </div>

          {/* Right Column - Entry and List */}
          <div className="lg:col-span-8 space-y-12 order-1 lg:order-2">
            <section>
              <ExpenseForm onAddExpense={addExpense} />
            </section>
            
            <section>
              <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
            </section>
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} Marketing Mojito Assignment. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors cursor-pointer">Privacy</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors cursor-pointer">Security</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors cursor-pointer">Support</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
