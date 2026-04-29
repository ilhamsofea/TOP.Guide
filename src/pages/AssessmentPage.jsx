import { useDecision } from '../hooks/useDecision'
import { DARURAH_PROVISIONS } from '../data/decisionData'

const TOTAL_STEPS = 5

const RESULT_CONFIG = {
  allowed: {
    cls: 'allowed',
    icon: '✓',
    label: 'PERMISSIBLE',
  },
  prohibited: {
    cls: 'prohibited',
    icon: '✗',
    label: 'PROHIBITED',
  },
  conditional: {
    cls: 'conditional',
    icon: '!',
    label: 'CONDITIONAL',
  },
}

export default function AssessmentPage() {
  const { current, history, choose, back, reset, isResult } = useDecision()

  return (
    <div className="page-content animate-in">
      <div className="page-header">
        <h1 className="page-title">
          Termination of Pregnancy (TOP) — <em>Decision Assessment</em>
        </h1>
        <p className="page-desc">
          Step through the clinical and jurisprudential criteria to determine the ruling for a Muslim patient.
          All decisions are based on classical Islamic scholarship cross-referenced with MOH clinical guidelines.
        </p>
      </div>

      {/* Stats Row */}
      <div className="stat-row">
        <div className="stat-card stat-accent">
          <div className="stat-label">Current Step</div>
          <div className="stat-value">{Math.min(history.length + 1, TOTAL_STEPS)}</div>
          <div className="stat-sub">of {TOTAL_STEPS} steps</div>
        </div>
        <div className="stat-card stat-accent-green">
          <div className="stat-label">Schools of Fiqh</div>
          <div className="stat-value">4</div>
          <div className="stat-sub">Hanafi · Maliki · Shafiʿi · Hanbali</div>
        </div>
        <div className="stat-card stat-accent-amber">
          <div className="stat-label">MOH Alignment</div>
          <div className="stat-value">MOH</div>
          <div className="stat-sub">Criteria verified at each stage</div>
        </div>
        <div className="stat-card stat-accent-blue">
          <div className="stat-label">Counselling Window</div>
          <div className="stat-value">48h</div>
          <div className="stat-sub">Mandatory opt-out period</div>
        </div>
      </div>

      <div className="assessment-layout">
        {/* Left: Protocol Reference */}
        <div className="assessment-sidebar">
          <div className="protocol-card">
            <div className="protocol-card-header">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Gestational Thresholds</span>
            </div>
            {[
              { stage: '< 40 days', note: 'Makruh or permissible (with ʿuzur). Imam al-Lakhmi & Shafiʿi 2nd view allow.' },
              { stage: '40 – 119 days', note: 'More restrictive. Majority view prohibits without strong justification.' },
              { stage: '≥ 120 days', note: 'After ensoulment. Prohibited except under confirmed ḍarūrah.' },
            ].map(s => (
              <div className="protocol-item" key={s.stage}>
                <div className="protocol-dot" />
                <div className="protocol-text">
                  <strong>{s.stage}</strong>
                  {s.note}
                </div>
              </div>
            ))}
          </div>

          <div className="protocol-card">
            <div className="protocol-card-header">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>ḍarūrah Provisions (5)</span>
            </div>
            {DARURAH_PROVISIONS.map((p, i) => (
              <div className="protocol-item" key={i}>
                <div className="protocol-dot" />
                <div className="protocol-text">
                  <strong>{p.title}</strong>
                  {p.detail}
                </div>
              </div>
            ))}
          </div>

          <div className="protocol-card">
            <div className="protocol-card-header">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>MOH Requirements</span>
            </div>
            {[
              { stage: 'Pre-abortion', note: 'Mandatory counselling session before any decision is finalised.' },
              { stage: '48-hour wait', note: 'Patient may opt out within 48 hours after counselling.' },
              { stage: 'Post-abortion', note: 'Counselling and family planning consultation required.' },
            ].map(s => (
              <div className="protocol-item" key={s.stage}>
                <div className="protocol-dot" />
                <div className="protocol-text">
                  <strong>{s.stage}</strong>
                  {s.note}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Decision Widget */}
        <div className="dw-card">
          {/* Widget Header */}
          <div className="dw-topbar">
            <div className="dw-topbar-left">
              <div className="dw-topbar-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <div className="dw-topbar-title">TOP Decision Protocol</div>
                <div className="dw-topbar-sub">Islamic jurisprudence · MOH criteria</div>
              </div>
            </div>

            {/* Progress */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="dw-progress-track">
                {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                  <div
                    key={i}
                    className={`dw-prog-seg ${i < history.length ? 'done' : i === history.length && !isResult ? 'active' : isResult && i < history.length + 1 ? 'done' : ''}`}
                  />
                ))}
              </div>
              <span className="dw-prog-label">
                {isResult ? 'Complete' : `${history.length + 1}/${TOTAL_STEPS}`}
              </span>
            </div>
          </div>

          <div className="dw-body animate-in" key={JSON.stringify(history)}>
            {/* Breadcrumb trail */}
            {history.length > 0 && (
              <div className="dw-breadcrumb">
                {history.map((h, i) => (
                  <span key={i}>
                    {h.chosen.length > 32 ? h.chosen.slice(0, 30) + '…' : h.chosen}
                    {i < history.length - 1 && ' › '}
                  </span>
                ))}
                {!isResult && <span> › <strong>Current</strong></span>}
              </div>
            )}

            {isResult ? (
              <ResultView node={current} onBack={back} onReset={reset} />
            ) : (
              <QuestionView node={current} onChoose={choose} />
            )}
          </div>

          {/* Footer buttons */}
          {!isResult && (
            <div className="dw-footer">
              {history.length > 0 && (
                <button className="btn-ghost" onClick={back}>← Back</button>
              )}
              <button className="btn-ghost" onClick={reset}>Reset</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function QuestionView({ node, onChoose }) {
  return (
    <>
      <div className="dw-step-tag">
        <span>{node.label || 'Assessment'}</span>
      </div>
      <h2 className="dw-question">{node.question}</h2>
      <p className="dw-sub">{node.sub}</p>

      {node.provisions && (
        <div className="darurah-box">
          <div className="darurah-box-title">ḍarūrah — three provisions required</div>
          {DARURAH_PROVISIONS.map((p, i) => (
            <div className="darurah-item" key={i}>
              <div className="darurah-num">{i + 1}</div>
              <div>
                <strong>{p.title}: </strong>{p.detail}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="opt-grid">
        {node.options.map((opt, i) => (
          <button className="opt-btn" key={i} onClick={() => onChoose(i)}>
            <span>{opt.text}</span>
            <span className="opt-btn-arrow">›</span>
          </button>
        ))}
      </div>
    </>
  )
}

function ResultView({ node, onBack, onReset }) {
  const cfg = RESULT_CONFIG[node.result] || RESULT_CONFIG.conditional

  return (
    <>
      <div className={`result-banner ${cfg.cls}`}>
        <div className="result-icon">{cfg.icon}</div>
        <div className="result-content">
          <div className="result-title">{node.title}</div>
          <div className="result-body">{node.body}</div>
        </div>
      </div>

      {node.steps && (
        <div className="clinical-steps">
          <div className="clinical-steps-title">Clinical next steps</div>
          {node.steps.map((step, i) => (
            <div className="clinical-step-item" key={i}>
              <div className="step-num">{i + 1}</div>
              <span>{step}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
        <button className="btn-ghost" onClick={onBack}>← Back</button>
        <button className="btn-ghost" onClick={onReset}>New Assessment</button>
      </div>
    </>
  )
}
