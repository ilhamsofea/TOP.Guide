const SAMPLE_CASES = [
  {
    tag: 'urgent',
    title: 'Complex fetal anomaly — multidisciplinary review required',
    body: 'Severe neural tube defect confirmed at 18 weeks. Shariah panel consultation scheduled with Obs & Gynae team.',
    date: '21 Apr 2026',
  },
  {
    tag: 'new',
    title: 'Maternal cardiac condition — ḍarūrah assessment pending',
    body: 'Cardiologist and obstetric team to co-assess ḍarūrah provisions at 14 weeks gestation. Awaiting cardiology report.',
    date: '19 Apr 2026',
  },
  {
    tag: 'routine',
    title: 'Post-TOP counselling follow-up — patient discharged',
    body: 'Family planning consultation completed. Patient referred to community support services and social welfare.',
    date: '17 Apr 2026',
  },
  {
    tag: 'new',
    title: 'Rape-related pregnancy — MOH criteria verification in progress',
    body: 'Police report obtained and verified. Clinical team finalising MOH criteria checklist before counselling referral.',
    date: '16 Apr 2026',
  },
  {
    tag: 'routine',
    title: 'Pre-abortion counselling completed — 48-hour window active',
    body: 'Patient attended mandatory counselling. 48-hour opt-out period commenced. Follow-up scheduled.',
    date: '15 Apr 2026',
  },
  {
    tag: 'urgent',
    title: 'Maternal sepsis — emergency darurah review',
    body: 'Life-threatening maternal sepsis at 22 weeks. Emergency multidisciplinary team convened. All three ḍarūrah provisions under review.',
    date: '14 Apr 2026',
  },
]

const TAG_MAP = {
  urgent: { cls: 'b-urgent', label: 'Urgent' },
  new: { cls: 'b-new', label: 'New Case' },
  routine: { cls: 'b-routine', label: 'Routine' },
}

export default function BulletinPage() {
  return (
    <div className="page-content animate-in">
      <div className="page-header">
        <h1 className="page-title">Case <em>Bulletin Board</em></h1>
        <p className="page-desc">
          Real-time departmental notices and active case updates. Active case management features will be enabled after system release.
        </p>
      </div>

      <div className="coming-soon-banner">
        <svg viewBox="0 0 24 24">
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>
          <strong>Future Feature:</strong> Live case bulletin, doctor feedback, and collaborative review tools will be added after initial release. The entries below are sample data.
        </span>
      </div>

      <div className="bulletin-toolbar">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {SAMPLE_CASES.length} sample entries
        </span>
      </div>

      <div className="bulletin-grid">
        {SAMPLE_CASES.map((c, i) => {
          const tag = TAG_MAP[c.tag]
          return (
            <div className="bulletin-card" key={i}>
              <span className={`b-tag ${tag.cls}`}>{tag.label}</span>
              <h4>{c.title}</h4>
              <p>{c.body}</p>
              <div className="bulletin-card-date">{c.date}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}