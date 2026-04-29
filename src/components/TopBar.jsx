import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'

const PAGE_LABELS = {
  assessment: 'Assessment',
  about: 'About & Team',
  resources: 'References',
  bulletin: 'Case Bulletin',
  feedback: 'Feedback',
  contact: 'Contact',
}

export default function TopBar() {
  const { activePage } = useApp()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const timeStr = time.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
  const dateStr = time.toLocaleDateString('en-MY', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="breadcrumb-root">HAYATPATH</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-page">{PAGE_LABELS[activePage] || activePage}</span>
      </div>
      <div className="topbar-right">
        <span className="topbar-datetime">{dateStr} · {timeStr}</span>
        <div className="topbar-pill">
          <div className="status-dot" />
          System Online
        </div>
      </div>
    </header>
  )
}