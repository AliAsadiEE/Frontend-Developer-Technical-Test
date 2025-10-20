const items = [
  { to: '#poem', label: 'سفارش شعر' },
  { to: '#lyrics', label: 'ترانه‌سرایی/متن' },
  { to: '#compose', label: 'آهنگسازی' },
  { to: '#events', label: 'مراسم/اجرا/تجهیزات' },
  { to: '#brand', label: 'موسیقی برند' },
  { to: '#private', label: 'موسیقی شخصی/اختصاصی' },
  { to: '#teach', label: 'تدریس موسیقی' },
  { to: '#consult', label: 'مشاوره و انتخاب ساز' },
]

export default function ServicesHub(){
  return (
    <section className="grid gap-6">
      <h2 className="text-2xl font-extrabold">مرکز خدمات</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it) => (
          <a key={it.to} href={it.to} className="rounded-2xl p-5 bg-white/10 ring-1 ring-white/10 hover:bg-white/15 transition">
            {it.label}
          </a>
        ))}
      </div>

      <div id="poem" className="rounded-2xl p-6 bg-black/30 ring-1 ring-white/10">
        <h3 className="text-xl font-bold mb-2">سفارش شعر (AI/شاعر انسانی)</h3>
        <p className="text-white/80 text-sm">جزییات: موضوع، سبک، قالب، تعداد بیت، اعلام مبلغ و زمان تحویل، تایید/عدم تایید، پرداخت، امکان انتخاب شاعر دیگر.</p>
      </div>

      <div id="lyrics" className="rounded-2xl p-6 bg-black/30 ring-1 ring-white/10">
        <h3 className="text-xl font-bold mb-2">ترانه‌سرایی/متن (AI/انسان)</h3>
        <p className="text-white/80 text-sm">ارسال فایل ملودی/آهنگ، ساخت متن، چک با مشتری، تغییرات، اعلام مبلغ/زمان، پرداخت، امکان انتخاب ترانه‌سرا.</p>
      </div>

      <div id="compose" className="rounded-2xl p-6 bg-black/30 ring-1 ring-white/10">
        <h3 className="text-xl font-bold mb-2">آهنگسازی (AI/انسان)</h3>
        <p className="text-white/80 text-sm">ارایه متن/سبک/احساس، نمونه آزمایشی، مشاوره AI/فرد، تغییرات، اعلام مبلغ/زمان، پرداخت، امکان انتخاب آهنگساز.</p>
      </div>

      <div id="events" className="rounded-2xl p-6 bg-black/30 ring-1 ring-white/10">
        <h3 className="text-xl font-bold mb-2">مراسم/اجرا/تجهیزات</h3>
        <p className="text-white/80 text-sm">تعریف جزییات اجرا یا کرایه تجهیزات، اعلام مبلغ/روش پرداخت/زمان، تایید/عدم تایید، پرداخت، انتخاب تامین‌کننده دیگر.</p>
      </div>

      <div id="brand" className="rounded-2xl p-6 bg-black/30 ring-1 ring-white/10">
        <h3 className="text-xl font-bold mb-2">موسیقی برند</h3>
        <p className="text-white/80 text-sm">انتخاب آهنگساز AI/انسان، تشریح نیاز برند، چک شباهت احتمالی با AI، مشاوره، تولید، تغییرات، پرداخت.</p>
      </div>

      <div id="private" className="rounded-2xl p-6 bg-black/30 ring-1 ring-white/10">
        <h3 className="text-xl font-bold mb-2">موسیقی شخصی/اختصاصی</h3>
        <p className="text-white/80 text-sm">جستجو اثر/هنرمند/هَم‌خوانی دهانی، در صورت ساخت جدید: تعیین سبک/تایم/آهنگساز AI یا انسانی، نمونه، اعلام مبلغ/زمان، پرداخت.</p>
      </div>

      <div id="teach" className="rounded-2xl p-6 bg-black/30 ring-1 ring-white/10">
        <h3 className="text-xl font-bold mb-2">تدریس موسیقی</h3>
        <p className="text-white/80 text-sm">انتخاب ساز/سبک آواز/درجه مدرس، خصوصی/گروهی، حد نصاب، اعلام مبلغ/مکان/زمان، سناریوی انتظار یا انتخاب مدرس دیگر.</p>
      </div>

      <div id="consult" className="rounded-2xl p-6 bg-black/30 ring-1 ring-white/10">
        <h3 className="text-xl font-bold mb-2">مشاوره و انتخاب/خرید ساز</h3>
        <p className="text-white/80 text-sm">مشاوره AI/فرد، انجام مشاوره، پیشنهاد خرید ساز و ثبت آدرس، پرداخت.</p>
      </div>
    </section>
  )
}
