import React, { useEffect, useMemo, useState } from "react";
import { Wallet, TrendingUp, TrendingDown, CheckCircle2, AlertTriangle, Plus, Minus, Coins } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const fmt = (n) => new Intl.NumberFormat("fa-IR").format(n);
const toFixed = (n, d = 2) => Number(n).toFixed(d);

function genSeries(start = 62000, points = 120) {
  let p = start;
  const out = [];
  for (let i = 0; i < points; i++) {
    const t = new Date(Date.now() - (points - i) * 60_000);
    const drift = (Math.random() - 0.5) * 0.008 * p;
    p = Math.max(50, p + drift);
    out.push({
      ts: t,
      time: t.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }),
      price: Math.round(p * 100) / 100,
    });
  }
  return out;
}

function genBook(mid = 62000) {
  const asks = Array.from({ length: 14 }).map((_, i) => {
    const price = mid + (i + 1) * (Math.random() * 25 + 5);
    const amount = Math.random() * 0.6 + 0.05;
    return { side: "ask", price: toFixed(price, 2), amount: toFixed(amount, 4) };
  });
  const bids = Array.from({ length: 14 }).map((_, i) => {
    const price = mid - (i + 1) * (Math.random() * 25 + 5);
    const amount = Math.random() * 0.6 + 0.05;
    return { side: "bid", price: toFixed(price, 2), amount: toFixed(amount, 4) };
  });
  return { asks: asks.sort((a, b) => a.price - b.price), bids: bids.sort((a, b) => b.price - a.price) };
}

function genTrades(mid = 62000) {
  return Array.from({ length: 20 }).map(() => {
    const side = Math.random() > 0.5 ? "buy" : "sell";
    const price = mid + (Math.random() - 0.5) * 60;
    const amount = Math.random() * 0.4 + 0.01;
    return {
      id: Math.random().toString(36).slice(2),
      side,
      price: toFixed(price, 2),
      amount: toFixed(amount, 4),
      time: new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }),
    };
  });
}

function StatCard({ title, value, meta, positive }) {
  const Icon = positive ? TrendingUp : TrendingDown;
  return (
    <div className="rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="text-sm text-slate-500 mb-2">{title}</div>
      <div className="flex items-end justify-between">
        <div className="text-xl sm:text-2xl font-bold">{value}</div>
        <span className={`inline-flex items-center gap-1 text-xs rounded-full px-2 py-1 ${positive ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"}`}>
          <Icon className="w-3.5 h-3.5" /> {meta}
        </span>
      </div>
    </div>
  );
}

function PriceChart({ data }) {
  return (
    <div className="rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm h-[320px]">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold">نمودار قیمت</div>
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">1m</span>
          <span className="px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">5m</span>
          <span className="px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">1h</span>
          <span className="px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">1d</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopOpacity={0.35} />
              <stop offset="100%" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={60} />
          <Tooltip contentStyle={{ direction: "rtl" }} labelStyle={{ direction: "rtl" }} />
          <Area type="monotone" dataKey="price" fill="url(#grad)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function OrderBook({ book }) {
  return (
    <div className="rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="font-semibold mb-2">دفتر سفارشات</div>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <div className="text-rose-500 mb-1">فروشندگان</div>
          <div className="max-h-56 overflow-auto custom-scroll">
            {book.asks.map((a, i) => (
              <div key={`a${i}`} className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                <span className="text-rose-600">{a.price}</span>
                <span className="text-slate-500">{a.amount}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-emerald-500 mb-1">خریداران</div>
          <div className="max-h-56 overflow-auto custom-scroll">
            {book.bids.map((b, i) => (
              <div key={`b${i}`} className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                <span className="text-emerald-600">{b.price}</span>
                <span className="text-slate-500">{b.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RecentTrades({ trades }) {
  return (
    <div className="rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="font-semibold mb-2">معاملات اخیر</div>
      <div className="max-h-60 overflow-auto custom-scroll text-sm">
        {trades.map((t) => (
          <div key={t.id} className="grid grid-cols-3 py-1.5 border-b border-slate-100 dark:border-slate-800/60">
            <div className={t.side === "buy" ? "text-emerald-600" : "text-rose-600"}>{t.price}</div>
            <div className="text-slate-500">{t.amount}</div>
            <div className="text-slate-400">{t.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WalletPanel({ balances }) {
  return (
    <div className="rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold">سبد دارایی</div>
        <div className="text-xs text-slate-500">کیف‌پول داخلی</div>
      </div>
      <div className="space-y-2">
        {balances.map((b) => (
          <div key={b.sym} className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800 p-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center"><Coins className="w-4 h-4" /></div>
              <div>
                <div className="font-medium">{b.sym}</div>
                <div className="text-xs text-slate-500">{toFixed(b.amount, 6)}</div>
              </div>
            </div>
            <div className="text-xs text-amber-600 dark:text-amber-300 flex items-center gap-1"><span>ℹ️</span> برداشت خارجی غیرفعال است</div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-xs text-amber-600 dark:text-amber-300 flex items-center gap-1"><AlertTriangle className="w-4 h-4" /> برداشت/انتقال خارجی فعلاً پشتیبانی نمی‌شود.</div>
    </div>
  );
}

function OrderForm({ side = "buy", lastPrice, onPlace }) {
  const [type, setType] = useState("market");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState(lastPrice);
  const isBuy = side === "buy";

  useEffect(() => setPrice(lastPrice), [lastPrice]);

  const total = useMemo(() => {
    const a = parseFloat(amount || "0");
    const p = type === "limit" ? parseFloat(price || "0") : lastPrice;
    return a && p ? a * p : 0;
  }, [amount, price, type, lastPrice]);

  return (
    <div className="rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold">سفارش {isBuy ? "خرید" : "فروش"}</div>
        <div className="flex items-center text-xs gap-1">
          <button onClick={() => setType("market")} className={`px-2 py-1 rounded-lg ${type === "market" ? "bg-slate-100 dark:bg-slate-800" : "hover:bg-slate-100 dark:hover:bg-slate-800"}`}>مارکت</button>
          <button onClick={() => setType("limit")} className={`px-2 py-1 rounded-lg ${type === "limit" ? "bg-slate-100 dark:bg-slate-800" : "hover:bg-slate-100 dark:hover:bg-slate-800"}`}>لیمیت</button>
        </div>
      </div>

      {type === "limit" && (
        <div className="mb-2">
          <label className="text-xs text-slate-500">قیمت (USDT)</label>
          <div className="flex items-center gap-2 mt-1">
            <button onClick={() => setPrice((p) => (parseFloat(p || 0) - 5).toString())} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"><Minus className="w-4 h-4" /></button>
            <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0" className="flex-1 rounded-xl bg-slate-50 dark:bg-slate-800 px-3 py-2 outline-none" />
            <button onClick={() => setPrice((p) => (parseFloat(p || 0) + 5).toString())} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"><Plus className="w-4 h-4" /></button>
          </div>
        </div>
      )}

      <div className="mb-2">
        <label className="text-xs text-slate-500">حجم</label>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.0000" className="mt-1 w-full rounded-xl bg-slate-50 dark:bg-slate-800 px-3 py-2 outline-none" />
      </div>

      <div className="mb-3 text-xs text-slate-500">مجموع: <span className="font-semibold text-slate-700 dark:text-slate-200">{toFixed((parseFloat(amount||0))*(type==='limit'?parseFloat(price||0):lastPrice), 2)} USDT</span></div>

      <button onClick={() => onPlace({ side, type, amount: parseFloat(amount || 0), price: type === "limit" ? parseFloat(price || 0) : null })}
        className={`w-full rounded-xl py-2 font-semibold text-white ${isBuy ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"}`}>
        {isBuy ? "ثبت سفارش خرید" : "ثبت سفارش فروش"}
      </button>
    </div>
  );
}

export default function BuyPage() {
  const [series, setSeries] = useState(() => genSeries());
  const [book, setBook] = useState(() => genBook(series[series.length - 1].price));
  const [trades, setTrades] = useState(() => genTrades(series[series.length - 1].price));
  const lastPrice = series[series.length - 1]?.price || 0;

  const [balances, setBalances] = useState([
    { sym: "USDT", amount: 1200 },
    { sym: "BTC", amount: 0.05234 },
    { sym: "ETH", amount: 1.2431 },
  ]);

  useEffect(() => {
    const iv = setInterval(() => {
      setSeries((s) => {
        const last = s[s.length - 1]?.price || 60000;
        const drift = (Math.random() - 0.5) * 0.006 * last;
        const price = Math.max(50, last + drift);
        const t = new Date();
        const next = [...s.slice(-119), { ts: t, time: t.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }), price: Math.round(price * 100) / 100 }];
        return next;
      });
    }, 2600);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const mid = series[series.length - 1]?.price || 60000;
    setBook(genBook(mid));
    setTrades(genTrades(mid));
  }, [series]);

  const handlePlace = (order) => {
    const id = Math.random().toString(36).slice(2);
    const price = order.type === "market" ? lastPrice : order.price;
    const total = (order.amount || 0) * (price || 0);
    setBalances((bs) => {
      const next = [...bs];
      if (order.side === "buy") {
        next[0] = { ...next[0], amount: Math.max(0, next[0].amount - total) };
        next[1] = { ...next[1], amount: next[1].amount + order.amount };
      } else {
        next[1] = { ...next[1], amount: Math.max(0, next[1].amount - order.amount) };
        next[0] = { ...next[0], amount: next[0].amount + total };
      }
      return next;
    });
  };

  return (
    <main className="mx-auto max-w-7xl px-3 sm:px-6 py-4 space-y-4">
      <div className="rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-900/20 dark:to-indigo-900/20 border border-sky-200/60 dark:border-sky-800 p-3 text-sm">
        <div className="flex items-center gap-2 text-sky-800 dark:text-sky-200"><CheckCircle2 className="w-4 h-4" /> برای سقف‌های بالاتر و تسویه ریالی، احراز هویت را تکمیل کنید.</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatCard title="آخرین قیمت" value={`${toFixed(lastPrice, 2)} USDT`} meta="+0.8%" positive />
        <StatCard title="حجم ۲۴ساعت" value={`${fmt(124_322_120)} USDT`} meta="-3.1%" />
        <StatCard title="دارایی کل (تقریبی)" value={`${toFixed(balances.reduce((s,b)=> s + (b.sym === "USDT" ? b.amount : b.amount*(lastPrice||0)),0),2)} USDT`} meta="نمونه" positive />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-3 space-y-4 order-2 lg:order-1">
          <OrderBook book={book} />
          <RecentTrades trades={trades} />
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2">
          <PriceChart data={series} />
        </div>

        <div className="lg:col-span-3 space-y-4 order-3">
          <OrderForm side="buy" lastPrice={lastPrice} onPlace={handlePlace} />
          <OrderForm side="sell" lastPrice={lastPrice} onPlace={handlePlace} />
          <WalletPanel balances={balances} />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-3 flex items-center justify-between text-xs text-slate-500">
        <div>© {new Date().getFullYear()} اکسچنج‌فا — بخش خرید</div>
        <div className="flex items-center gap-2"><Wallet className="w-3.5 h-3.5" /> برداشت خارجی: <span className="text-rose-600">غیرفعال</span></div>
      </div>
    </main>
  );
}
