import { Link, useNavigate } from 'react-router-dom'
import AuthCard from './AuthCard.jsx'
import { useAuth } from './AuthContext.jsx'
import { useState } from 'react'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login({ email, password })
      navigate('/services')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="pt-6">
      <AuthCard
        title="ورود به ملوکِت"
        subtitle="خوش اومدی! ادامه بده تا به خدمات موسیقی دسترسی بگیری."
        footer={<>
          حساب نداری؟{' '}
          <Link to="/register" className="text-accent.purple hover:text-accent.red">ثبت‌نام</Link>
        </>}
      >
        <label className="block">
          <span className="text-sm">ایمیل</span>
          <input type="email" required value={email} onChange={e=>setEmail(e.target.value)}
                 className="mt-1 w-full bg-black/40 border border-white/20 rounded-xl px-3 py-2 outline-none focus:border-accent.purple" />
        </label>
        <label className="block">
          <span className="text-sm">رمز عبور</span>
          <input type="password" required value={password} onChange={e=>setPassword(e.target.value)}
                 className="mt-1 w-full bg-black/40 border border-white/20 rounded-xl px-3 py-2 outline-none focus:border-accent.purple" />
        </label>
        <button disabled={loading} type="submit" className="w-full mt-2 py-2 rounded-xl bg-primary-500 hover:bg-primary-400 active:bg-primary-600 disabled:opacity-60 font-bold">
          {loading ? 'در حال ورود…' : 'ورود'}
        </button>
      </AuthCard>
    </form>
  )
}
