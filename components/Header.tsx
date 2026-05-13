'use client';

import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';
import { CurrencyRate, CURRENCIES } from '@/lib/types';

interface HeaderProps {
  baseCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

export default function Header({ baseCurrency, onCurrencyChange }: HeaderProps) {
  return (
    <motion.header
      className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl border-b border-white/20 py-6 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Wallet size={28} className="text-white" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Expense Tracker
            </h1>
            <p className="text-sm text-gray-400">Smart spending management</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-300">Base Currency:</label>
          <select
            value={baseCurrency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            className="bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            {CURRENCIES.map((curr) => (
              <option key={curr} value={curr} className="bg-gray-900">
                {curr}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.header>
  );
}
