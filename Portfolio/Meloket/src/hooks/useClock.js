import { useEffect, useState } from 'react'

export default function useClock({ locale = 'fa-IR', timeZone = 'Asia/Tehran' } = {}) {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const fmt = new Intl.DateTimeFormat(locale, {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    weekday: 'short', day: '2-digit', month: '2-digit', year: '2-digit',
    hour12: false, timeZone
  })
  return fmt.format(now)
}
