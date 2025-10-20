import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import BuyPage from './pages/Buy';
import PricesPage from './pages/Prices';
import GuidePage from './pages/Guide';
import CoinPage from './pages/Coin';
import { Moon, Sun, Bitcoin } from 'lucide-react';

function Header({ dark, setDark }){
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/60 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow">
            <Bitcoin className="w-5 h-5 text-white" />
          </div>
          <div className="font-bold text-slate-800 dark:text-slate-100 text-lg">اکسچنج‌فا</div>
        </div>
        <nav className="ml-auto flex items-center gap-2 sm:gap-3">
          <NavLink to="/buy" className={({isActive}) => `px-3 py-2 rounded-xl text-sm ${isActive? 'bg-slate-100 dark:bg-slate-800 font-semibold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>خرید ارز دیجیتال</NavLink>
          <NavLink to="/prices" className={({isActive}) => `px-3 py-2 rounded-xl text-sm ${isActive? 'bg-slate-100 dark:bg-slate-800 font-semibold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>قیمت ارز دیجیتال</NavLink>
          <NavLink to="/guide" className={({isActive}) => `px-3 py-2 rounded-xl text-sm ${isActive? 'bg-slate-100 dark:bg-slate-800 font-semibold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>راهنما</NavLink>
          <button onClick={() => setDark(d => !d)} className="rounded-xl px-2.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </nav>
      </div>
    </header>
  )
}

function Layout(){
  const [dark, setDark] = useState(true);
  return (
    <div dir="rtl" className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
        <Header dark={dark} setDark={setDark} />
        <Routes>
          <Route path="/" element={<PricesPage />} />
          <Route path="/buy" element={<BuyPage />} />
          <Route path="/prices" element={<PricesPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/coin/:symbol" element={<CoinPage />} />
        </Routes>
        <footer className="mx-auto max-w-7xl px-3 sm:px-6 pb-8 text-xs text-slate-500">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-3 flex items-center justify-between">
            <div>© {new Date().getFullYear()} اکسچنج‌فا — نسخه‌ی نمایشی فرانت‌اند چندصفحه‌ای</div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default function App(){
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
