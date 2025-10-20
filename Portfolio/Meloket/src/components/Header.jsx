import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../modules/auth/AuthContext.jsx'
import useClock from '../hooks/useClock.js'

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const time = useClock({ locale: 'fa-IR', timeZone: 'Asia/Tehran' })

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-black/30 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-2xl bg-gradient-to-tr from-accent.red to-accent.purple animate-pulse" />
          <span className="font-extrabold text-xl tracking-tight">ملوکِت</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={({isActive}) => `hover:text-accent.purple ${isActive ? 'text-accent.purple' : ''}`}>خانه</NavLink>
          <NavLink to="/services" className={({isActive}) => `hover:text-accent.purple ${isActive ? 'text-accent.purple' : ''}`}>خدمات</NavLink>
          <NavLink to="/musicians" className={({isActive}) => `hover:text-accent.purple ${isActive ? 'text-accent.purple' : ''}`}>موزیسین‌ها</NavLink>
          <NavLink to="/packages" className={({isActive}) => `hover:text-accent.purple ${isActive ? 'text-accent.purple' : ''}`}>پکیج‌ها</NavLink>
          <NavLink to="/clubs" className={({isActive}) => `hover:text-accent.purple ${isActive ? 'text-accent.purple' : ''}`}>باشگاه</NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <div className="text-sm/none font-medium tabular-nums bg-white/10 rounded-xl px-3 py-1" title="ساعت زنده">
            {time}
          </div>
          {user ? (
            <button
              onClick={() => { logout(); navigate('/') }}
              className="px-3 py-1 rounded-xl bg-accent.red hover:bg-accent.purple transition font-medium"
            >خروج</button>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 transition">ورود</Link>
              <Link to="/register" className="px-3 py-1 rounded-xl bg-accent.purple hover:bg-accent.red transition">ثبت‌نام</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
