import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem('meloket:user')
    return cached ? JSON.parse(cached) : null
  })

  const login = async ({ email, password }) => {
    await new Promise(r => setTimeout(r, 500))
    const mock = { id: 'u1', email, name: email.split('@')[0] }
    setUser(mock)
    localStorage.setItem('meloket:user', JSON.stringify(mock))
    return mock
  }

  const register = async ({ name, email, password }) => {
    await new Promise(r => setTimeout(r, 700))
    const mock = { id: 'u1', email, name }
    setUser(mock)
    localStorage.setItem('meloket:user', JSON.stringify(mock))
    return mock
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('meloket:user')
  }

  const value = useMemo(() => ({ user, login, register, logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
