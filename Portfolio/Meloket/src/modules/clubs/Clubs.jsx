import { motion } from 'framer-motion'

const clubs = [
  { key: 'vip', title: 'باشگاه مشتریان VIP', desc: 'دسترسی اختصاصی، رویدادهای محدود و تخفیف‌های ویژه.' },
  { key: 'gold', title: 'باشگاه مشتریان طلایی', desc: 'امتیازهای بیشتر و اولویت پشتیبانی.' },
  { key: 'silver', title: 'باشگاه مشتریان نقره‌ای', desc: 'طرح‌های تخفیف مناسب و اطلاع‌رسانی‌ها.' },
  { key: 'bronze', title: 'باشگاه مشتریان برنزی', desc: 'ورود آسان به مزایای پایه.' },
]

export default function Clubs(){
  return (
    <section className="grid gap-6">
      <h1 className="text-2xl font-extrabold">باشگاه مشتریان</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {clubs.map((c, i) => (
          <motion.div key={c.key}
            initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i*0.06 }}
            className="rounded-2xl p-6 bg-white/10 ring-1 ring-white/10 hover:bg-white/15"
          >
            <div className="text-lg font-bold mb-1">{c.title}</div>
            <p className="text-sm text-white/80">{c.desc}</p>
            <button className="w-full mt-4 py-2 rounded-xl bg-accent.purple hover:bg-accent.red transition font-bold">عضویت</button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
