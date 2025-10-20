export default function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/10">
      <h1 className="text-2xl font-extrabold mb-1">{title}</h1>
      {subtitle && <p className="text-sm text-white/70 mb-6">{subtitle}</p>}
      <div className="space-y-4">{children}</div>
      {footer && <div className="mt-6 text-sm text-white/80">{footer}</div>}
    </div>
  )
}
