export default function FeedbackPage() {
  return (
    <div className="page-content animate-in">
      <div className="page-header">
        <h1 className="page-title">Doctor <em>Feedback</em></h1>
        <p className="page-desc">
          A structured feedback system for clinicians to submit case outcomes, rate tool accuracy,
          and contribute to iterative improvement. Coming after initial release.
        </p>
      </div>

      <div className="coming-soon-banner">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>
          <strong>Future Addition:</strong> This module will be activated after the initial system release. Doctor feedback and peer review tools are planned for the next development phase.
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 24 }}>
        {[
          { title: 'Case Outcome Logging', desc: 'Record the outcome of each assessed case for audit trail and quality improvement.' },
          { title: 'Tool Accuracy Rating', desc: 'Rate the decision tool\'s ruling accuracy against actual clinical and shariah decisions.' },
          { title: 'Peer Review Queue', desc: 'Submit complex cases for peer review by the multidisciplinary clinical and fiqh team.' },
        ].map(f => (
          <div className="card" key={f.title} style={{ opacity: 0.6 }}>
            <div className="card-body">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10 }}>Planned Feature</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 300, lineHeight: 1.7 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}