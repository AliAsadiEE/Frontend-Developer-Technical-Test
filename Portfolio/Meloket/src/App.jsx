import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Login from './modules/auth/Login.jsx'
import Register from './modules/auth/Register.jsx'
import Home from './modules/home/Home.jsx'
import ServicesHub from './modules/services/ServicesHub.jsx'
import Musicians from './modules/musicians/Musicians.jsx'
import Packages from './modules/packages/Packages.jsx'
import Clubs from './modules/clubs/Clubs.jsx'
import { useAuth } from './modules/auth/AuthContext.jsx'

export default function App() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-primary-900 via-carbon-blue to-primary-800 text-white">
      <Header />
      <main className="max-w-6xl mx-auto px-4 pb-16 pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={user ? <ServicesHub /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/musicians" element={<Musicians />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
