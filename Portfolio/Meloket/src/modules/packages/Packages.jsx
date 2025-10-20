import { motion } from 'framer-motion'

const tiers = [
  { key: 'vip', title: 'پکیج مشتریان VIP', price: 'ویژه', perks: ['اولویت فوری', 'مدیر پروژه اختصاصی', 'نمونه‌های بیشتر', 'تخفیف همکاری بعدی'] },
  { key: 'gold', title: 'پکیج مشتریان طلایی', price: 'طلایی', perks: ['اولویت بالا', '۲ بازنگری رایگان', 'پیشنهادهای خلاق', 'پشتیبانی سریع'] },
  { key: 'silver', title: 'پکیج مشتریان نقره‌ای', price: 'اقتصادی+', perks: ['بازنگری ۱ مرتبه', 'نمونه اولیه', 'تحویل استاندارد'] },
  { key: 'bronze', title: 'پکیج مشتریان برنزی', price: 'به‌صرفه', perks: ['کیفیت پایه', 'تحویل به‌صرفه'] },
]

export default function Packages(){
  return (
    <section className="grid gap-6">
      <h1 className="text-2xl font-extrabold">پکیج‌های مشتریان</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiers.map((t, i) => (
          <motion.div key={t.key}
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i*0.05 }}
            className="rounded-2xl p-6 bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/10 hover:shadow-xl hover:shadow-accent.purple/10"
          >
            <div className="text-lg font-bold mb-1">{t.title}</div>
            <div className="text-sm text-white/75 mb-4">رده: {t.price}</div>
            <ul className="space-y-1 text-sm text-white/85">
              {t.perks.map((p, idx) => <li key={idx}>• {p}</li>)}
            </ul>
            <button className="w-full mt-4 py-2 rounded-xl bg-accent.purple hover:bg-accent.red transition font-bold">انتخاب پکیج</button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
