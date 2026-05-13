'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, ArrowRightLeft, Loader2 } from 'lucide-react';

interface CurrencyConverterProps {
  totalUSD: number;
}

const CURRENCIES = ['EUR', 'GBP', 'INR', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY'];

// Hardcoded fallback rates (Approximate mid-market rates)
const FALLBACK_RATES: Record<string, number> = {
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.50,
  JPY: 155.00,
  CAD: 1.36,
  AUD: 1.51,
  CHF: 0.91,
  CNY: 7.24,
};

export default function CurrencyConverter({ totalUSD }: CurrencyConverterProps) {
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [rate, setRate] = useState<number>(FALLBACK_RATES['EUR']);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRate = async () => {
      if (totalUSD === 0) return;

      setLoading(true);
      try {
        const response = await fetch(`https://api.frankfurter.app/latest?from=USD&to=${targetCurrency}`);
        if (!response.ok) throw new Error('API unstable');
        const data = await response.json();
        setRate(data.rates[targetCurrency]);
      } catch (err) {
        // Silently fall back to hardcoded rates
        console.warn('Using fallback exchange rate for', targetCurrency);
        setRate(FALLBACK_RATES[targetCurrency] || 1);
      } finally {
        setLoading(false);
      }
    };

    fetchRate();
  }, [targetCurrency, totalUSD]);

  const convertedValue = totalUSD * rate;

  return (
    <div className="glass-card p-6 md:p-8">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <ArrowRightLeft className="text-primary" size={24} />
        Currency Preview
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5 ml-1">Target Currency</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </span>
            <select
              className="input-field pl-11 appearance-none cursor-pointer"
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
            >
              {CURRENCIES.map((curr) => (
                <option key={curr} value={curr}>
                  {curr}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-6 bg-mojito/50 border border-primary/10 rounded-2xl text-center min-h-[140px] flex flex-col justify-center transition-all">
          {totalUSD === 0 ? (
            <div className="text-slate-400">
              <p className="text-sm font-medium italic">Add expenses to see conversion</p>
            </div>
          ) : (
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
                {loading ? 'Updating Preview...' : `Estimated Total (${targetCurrency})`}
              </p>
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">
                {convertedValue.toLocaleString(undefined, { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 2 
                })}
              </h3>
              <p className="text-xs text-slate-400 mt-2">
                1 USD ≈ {rate.toFixed(4)} {targetCurrency}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
