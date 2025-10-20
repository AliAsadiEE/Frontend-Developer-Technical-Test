import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const allMusicians = [
  { id: 1, name: 'آرین صبوری', stars: 2, tags: ['گیتار', 'پاپ'] },
  { id: 2, name: 'مهتاب خالدی', stars: 3, tags: ['ویولن', 'کلاسیک'] },
  { id: 3, name: 'سام رهام', stars: 3, tags: ['درامز', 'راک'] },
  { id: 4, name: 'دیاز سوپراستار', stars: 5, tags: ['آهنگساز', 'ترانه'] },
  { id: 5, name: 'نیلوفر ماهان', stars: 2, tags: ['خواننده', 'جاز'] },
  { id: 6, name: 'مانی کُهن', stars: 5, tags: ['پیانو', 'کلاسیک'] },
]

const filters = [
  { key: 'two', label: 'دوستاره', check: (m) => m.stars === 2 },
  { key: 'three', label: 'سه‌ستاره', check: (m) => m.stars === 3 },
  { key: 'super', label: 'سوپراستار', check: (m) => m.stars >= 5 },
]

export default function Musicians(){
  const [active, setActive] = useState('two')
  const list = useMemo(() => {
    const f = filters.find(x => x.key === active)
    return allMusicians.filter(f.check)
  }, [active])

  return (
    <section className="grid gap-6">
      <h1 className="text-2xl font-extrabold">هنرمندان و موزیسین‌ها</h1>

      <div className="flex flex-wrap gap-2">
        {filters.map(f => (
          <button key={f.key}
            onClick={() => setActive(f.key)}
            className={`px-4 py-2 rounded-xl border border-white/15 ${active===f.key? 'bg-accent.purple' : 'bg-white/10 hover:bg-white/20'}`}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {list.map((m, i) => (
            <motion.div key={m.id}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl p-5 bg-white/10 ring-1 ring-white/10 hover:bg-white/15"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-lg font-bold">{m.name}</div>
                <div className="text-xs bg-black/40 rounded-lg px-2 py-1">{m.stars === 5 ? 'سوپراستار' : `${m.stars}★`}</div>
              </div>
              <div className="text-sm text-white/80 mb-3">تگ‌ها: {m.tags.join('، ')}</div>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-xl bg-accent.purple hover:bg-accent.red transition">مشاهده پروفایل</button>
                <button className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 transition">درخواست همکاری</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
