import { useApp } from '../context/AppContext'

const NAV_ITEMS = [
  {
    group: 'Clinical Tools',
    items: [
      { id: 'assessment', label: 'TOP Assessment', icon: ClipboardIcon, badge: null },
    ],
  },
  {
    group: 'Information',
    items: [
      { id: 'about', label: 'About & Team', icon: InfoIcon, badge: null },
      { id: 'resources', label: 'References', icon: BookIcon, badge: null },
    ],
  },
  {
    group: 'Coming Soon',
    items: [
      { id: 'bulletin', label: 'Case Bulletin', icon: BulletinIcon, badge: 'soon' },
      { id: 'feedback', label: 'Feedback', icon: FeedbackIcon, badge: 'soon' },
    ],
  },
  {
    group: 'Support',
    items: [
      { id: 'contact', label: 'Contact', icon: MailIcon, badge: null },
    ],
  },
]

export default function Sidebar() {
  const { activePage, setActivePage, doctor } = useApp()

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark">
          <svg viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <div>
          <div className="sidebar-logo-text">TOP.Guide</div>
          <div className="sidebar-logo-sub">Clinical Decision Aid</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(group => (
          <div key={group.group}>
            <div className="sidebar-section-label">{group.group}</div>
            {group.items.map(item => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                  onClick={() => setActivePage(item.id)}
                >
                  <Icon />
                  {item.label}
                  {item.badge === 'soon' && <span className="nav-badge-soon">soon</span>}
                  {item.badge && item.badge !== 'soon' && (
                    <span className="nav-badge">{item.badge}</span>
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Doctor profile */}
      <div className="sidebar-footer">
        <div className="doctor-profile">
          <div className="doctor-avatar">{doctor.initials}</div>
          <div>
            <div className="doctor-name">{doctor.name}</div>
            <div className="doctor-dept">{doctor.dept}</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

/* ── Icon Components ── */
function ClipboardIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  )
}

function BulletinIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
  )
}

function FeedbackIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}