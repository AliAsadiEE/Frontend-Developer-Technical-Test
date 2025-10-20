import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <section className="relative grid gap-10 overflow-hidden">
      <motion.div
        className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-accent.purple/30 blur-3xl"
        animate={{ y: [0, 20, -10, 0], opacity: [0.6, 0.8, 0.7, 0.6] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute top-32 -right-10 w-80 h-80 rounded-full bg-accent.red/30 blur-3xl"
        animate={{ y: [0, -15, 10, 0], opacity: [0.6, 0.75, 0.65, 0.6] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-primary-500/20 blur-3xl"
        animate={{ scale: [1, 1.05, 0.98, 1] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      <div className="rounded-3xl p-10 bg-gradient-to-br from-primary-700/60 to-accent.purple/30 ring-1 ring-white/10 relative overflow-hidden">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-4"
        >
          سوپر اپ موسیقی ملوکِت
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/85 max-w-2xl leading-8"
        >
          موشن‌گرافیک لایه‌لایه، تعامل نرم، و رنگ‌آمیزی قرمز/بنفش/آبی کاربنی—
          همه‌چیز برای تجربه‌ای جذاب از سفارش شعر، ترانه، آهنگسازی و بیشتر.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link to="/services" className="px-5 py-2.5 rounded-2xl bg-accent.purple hover:bg-accent.red transition font-bold shadow-lg shadow-accent.purple/20">شروع خدمات</Link>
          <Link to="/musicians" className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition font-bold">هنرمندان</Link>
          <Link to="/packages" className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition font-bold">پکیج‌ها</Link>
          <Link to="/clubs" className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition font-bold">باشگاه مشتریان</Link>
        </motion.div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          ['شعر/ترانه', 'AI/انسان، نمونه آزمایشی، تایید مرحله‌ای'],
          ['آهنگسازی', 'احساس/سبک/تایم، مشاوره، پرداخت امن'],
          ['موزیسین‌ها', 'دوستاره، سه‌ستاره، سوپراستار'],
          ['باشگاه مشتریان', 'VIP / طلایی / نقره‌ای / برنزی'],
        ].map(([title, desc], i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6, scale: 1.02 }}
            className="rounded-2xl p-5 bg-white/10 ring-1 ring-white/10"
          >
            <div className="text-lg font-bold mb-1">{title}</div>
            <div className="text-sm text-white/80">{desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
