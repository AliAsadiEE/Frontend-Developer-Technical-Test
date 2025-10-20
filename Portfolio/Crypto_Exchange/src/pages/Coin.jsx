import React from 'react';
import { useParams, Link } from 'react-router-dom';
import TradingViewWidget from '../components/TradingViewWidget';
import { coins } from '../data/coins';
import { ArrowRight } from 'lucide-react';

export default function CoinPage(){
  const { symbol } = useParams();
  const coin = coins.find(c => c.symbol.toLowerCase() === symbol.toLowerCase());

  if(!coin){
    return (
      <main className="mx-auto max-w-3xl px-3 sm:px-6 py-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
          <div className="font-semibold mb-2">رمزارز پیدا نشد</div>
          <Link to="/prices" className="text-indigo-600">برگشت به لیست قیمت‌ها</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-3 sm:px-6 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl">{coin.name} ({coin.symbol})</h1>
        <Link to="/buy" className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 text-white px-3 py-1.5 text-sm hover:bg-emerald-700">
          رفتن به خرید <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="rounded-2xl p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="h-[480px] w-full"><TradingViewWidget tvSymbol={coin.tv} /></div>
      </div>
      <div className="text-xs text-slate-500">نمودار با استفاده از ویجت رسمی TradingView تعبیه شده است.</div>
    </main>
  )
}
