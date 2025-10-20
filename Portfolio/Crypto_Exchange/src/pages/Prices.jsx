import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { coins } from '../data/coins';
import { ArrowUpRight } from 'lucide-react';

const fmt = (n) => new Intl.NumberFormat("fa-IR").format(n);

export default function PricesPage(){
  const [rows, setRows] = useState(() => coins.map(c => ({...c, price: 100 + Math.random()*50000, change: (Math.random()-0.5)*10})));

  useEffect(()=>{
    const iv = setInterval(()=>{
      setRows(prev => prev.map(r => {
        const drift = (Math.random()-0.5) * r.price * 0.004;
        const price = Math.max(0.01, r.price + drift);
        const change = ((price - r.price)/r.price)*100;
        return {...r, price, change};
      }));
    }, 2500);
    return ()=>clearInterval(iv);
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-3 sm:px-6 py-4">
      <div className="rounded-2xl p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-bold">قیمت ارز دیجیتال</h1>
          <div className="text-xs text-slate-500">داده‌ها نمونه و شبیه‌سازی شده‌اند</div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-xs text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <tr className="[&>th]:py-2 [&>th]:text-right">
                <th>نماد</th><th>نام</th><th>قیمت (USDT)</th><th>تغییر</th><th>نمایش</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-slate-100 dark:[&>tr]:border-slate-800">
              {rows.map(r => (
                <tr key={r.symbol} className="[&>td]:py-2">
                  <td className="font-semibold">{r.symbol}</td>
                  <td>{r.name}</td>
                  <td>{fmt(r.price.toFixed(2))}</td>
                  <td className={r.change>=0 ? 'text-emerald-600' : 'text-rose-600'}>{r.change>=0? '+':''}{r.change.toFixed(2)}%</td>
                  <td>
                    <Link to={`/coin/${r.symbol}`} className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700">
                      صفحه رمز ارز <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
