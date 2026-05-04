// pages/AssessmentPage.jsx
import { useState } from "react";
import {
  TREE,
  DARURAH_PROVISIONS,
  SCHOOLS_OF_FIQH,
} from "../data/decisionData";
import { useDecision } from "../hooks/useDecision";

// ─── Constants ────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 5;
const STEP_LABELS = [
  "Gestational Age",
  "Justification / Risk",
  "Indication",
  "Clinical Assessment",
  "MOH Criteria",
];

const RESULT_CONFIG = {
  allowed: { cls: "allowed", icon: "✓", label: "PERMISSIBLE" },
  prohibited: { cls: "prohibited", icon: "✗", label: "PROHIBITED" },
  makruh: { cls: "makruh", icon: "!", label: "DISCOURAGED" },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AssessmentPage() {
  const { current, history, choose, back, reset, isResult, isChecklist } =
    useDecision();
  const [activeTab, setActiveTab] = useState("gestational");
  const [darurahOpen, setDarurahOpen] = useState(false);

  const activeStep = current?.step ?? 0;
  const doneSteps = history.map((h) => TREE[h.nodeId]?.step ?? 0);

  return (
    <div className="page-content animate-in">
      <div className="page-header">
        <h1 className="page-title">
          Termination of Pregnancy — <em>Decision Assessment</em>
        </h1>
        <p className="page-desc">
          Step through the clinical and jurisprudential criteria to determine
          the ruling for a Muslim patient. Logic follows the MOH / Islamic
          jurisprudence decision flowchart, cross-referenced across all four
          schools of fiqh.
        </p>
      </div>

      {/* Stats */}
      <div className="stat-row">
        <div className="stat-card stat-accent">
          <div className="stat-label">Current Step</div>
          <div className="stat-value">
            {isResult ? "✓" : history.length + 1}
          </div>
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

      <div className="wizard-card">
        {/* Topbar */}
        <div className="wizard-topbar">
          <div className="wizard-topbar-left">
            <div className="wizard-icon">
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <div className="wizard-title">
                Termination of Pregnancy (TOP) Decision Protocol
              </div>
              <div className="wizard-sub">
                Islamic jurisprudence · MOH criteria
              </div>
            </div>
          </div>
          <div className="wizard-progress-label">
            {isResult ? "Complete" : `${history.length + 1} / ${TOTAL_STEPS}`}
          </div>
        </div>

        {/* Step Rail */}
        <div className="step-rail">
          {STEP_LABELS.map((label, i) => {
            const isDone = doneSteps.includes(i);
            const isActive = !isResult && i === activeStep;
            return (
              <div className="step-node" key={i}>
                {i > 0 && (
                  <div
                    className={`step-connector${doneSteps.includes(i - 1) ? " done" : ""}`}
                  />
                )}
                <div
                  className={`step-btn${isDone ? " step-done" : ""}${isActive ? " step-active" : ""}`}
                >
                  <div className="step-circle">{isDone ? "✓" : i + 1}</div>
                  <div className="step-lbl">{label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Body */}
        <div className="wizard-body" key={current?.id}>
          <div className="q-panel animate-in">
            {history.length > 0 && (
              <div className="dw-breadcrumb">
                {history.map((h, i) => (
                  <span key={i}>
                    {h.chosen.length > 36
                      ? h.chosen.slice(0, 34) + "…"
                      : h.chosen}
                    {i < history.length - 1 && " › "}
                  </span>
                ))}
                {!isResult && (
                  <span>
                    {" "}
                    › <strong>Current</strong>
                  </span>
                )}
              </div>
            )}

            {isResult ? (
              <ResultView node={current} onBack={back} onReset={reset} />
            ) : isChecklist ? (
              <DarurahChecklist
                onConfirm={(allMet) => {
                  choose({
                    text: allMet
                      ? "All 5 provisions confirmed"
                      : "Not all provisions met",
                    next: allMet ? "after120_allowed" : "after120_prohibited",
                  });
                }}
                onBack={back}
                onReset={reset}
              />
            ) : (
              <QuestionView
                node={current}
                onChoose={choose}
                darurahOpen={darurahOpen}
                setDarurahOpen={setDarurahOpen}
              />
            )}

            {!isResult && !isChecklist && (
              <div className="q-footer">
                {history.length > 0 && (
                  <button className="btn-ghost" onClick={back}>
                    ← Back
                  </button>
                )}
                <button className="btn-ghost" onClick={reset}>
                  Reset
                </button>
              </div>
            )}
          </div>

          {/* Reference rail */}
          <div className="ref-rail">
            {" "}
            <h1>Protocols</h1>
            <div className="ref-tabs">
              {[
                { key: "gestational", label: "Age" },
                { key: "moh", label: "Clinical" },
                { key: "fiqh", label: "Fiqh" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  className={`ref-tab${activeTab === tab.key ? " active" : ""}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {activeTab === "gestational" && (
              <div className="ref-section">
                {[
                  {
                    stage: "< 40 days",
                    note: "Legal without uzur (Imam al-Lakhmi, Shafiʿi 2nd view). Permissible with justification.",
                  },
                  {
                    stage: "40 – 119 days",
                    note: "Makruh without uzur (Hanafiyyah). More restrictive — majority prohibits without justification.",
                  },
                  {
                    stage: "< 120 days (gen.)",
                    note: "Mazhab Shafiʿiyyah (3rd view) and Mazhab Hanabilah restrict further.",
                  },
                  {
                    stage: "≥ 120 days",
                    note: "After ensoulment. Requires serious maternal risk + all 5 ḍarūrah provisions/partial.",
                  },
                ].map((s) => (
                  <div className="ref-item" key={s.stage}>
                    <div className="ref-dot" />
                    <div className="ref-text">
                      <strong>{s.stage}</strong>
                      {s.note}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "moh" && (
              <div className="ref-section">
                {[
                  {
                    stage: "Pre-abortion",
                    note: "Mandatory counselling session before any decision is finalised.",
                  },
                  {
                    stage: "48-hour opt-out",
                    note: "Patient may change decision within 48 hours. If opted out → proceed to ANC.",
                  },
                  {
                    stage: "Management of TOP",
                    note: "Proceed only after counselling and opt-out period has elapsed.",
                  },
                  {
                    stage: "Post-abortion",
                    note: "Post-abortion counselling and family planning consultation are required.",
                  },
                  {
                    stage: "Support",
                    note: "Provide support to the patient, significant others, and healthcare workers.",
                  },
                ].map((s) => (
                  <div className="ref-item" key={s.stage}>
                    <div className="ref-dot" />
                    <div className="ref-text">
                      <strong>{s.stage}</strong>
                      {s.note}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "fiqh" && (
              <div className="ref-section">
                {SCHOOLS_OF_FIQH.map((s) => (
                  <div className="ref-item" key={s.name}>
                    <div className="ref-dot" />
                    <div className="ref-text">
                      <strong>{s.name}</strong>
                      {s.ruling}
                    </div>
                  </div>
                ))}
                <div className="ref-divider" />
                <div className="ref-sub-heading">ḍarūrah Provisions (5)</div>
                {DARURAH_PROVISIONS.map((p, i) => (
                  <div className="ref-item" key={i}>
                    <div className="ref-num">{i + 1}</div>
                    <div className="ref-text">
                      <strong>{p.title}</strong>
                      {p.detail}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function QuestionView({ node, onChoose, darurahOpen, setDarurahOpen }) {
  return (
    <>
      <div className="q-tag">
        <span>{node.label || "Assessment"}</span>
      </div>
      <h2 className="q-title">{node.question}</h2>
      <p className="q-sub">{node.sub}</p>

      {node.provisions && (
        <>
          <button
            className="info-toggle"
            onClick={() => setDarurahOpen((o) => !o)}
          >
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ḍarūrah provisions — 5 conditions required
            <span className={`info-toggle-arrow${darurahOpen ? " open" : ""}`}>
              ›
            </span>
          </button>
          {darurahOpen && (
            <div className="darurah-panel animate-in">
              <div className="darurah-panel-title">
                At least one provision must be fulfilled
              </div>
              {DARURAH_PROVISIONS.map((p, i) => (
                <div className="darurah-item" key={i}>
                  <div className="darurah-num">{i + 1}</div>
                  <div>
                    <strong>{p.title}: </strong>
                    {p.detail}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
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
  );
}

// ─── Darurah Checklist ────────────────────────────────────────────────────────

function DarurahChecklist({ onConfirm, onBack, onReset }) {
  const [checked, setChecked] = useState(
    Array(DARURAH_PROVISIONS.length).fill(false),
  );
  const [noneSelected, setNoneSelected] = useState(false);

  const checkedCount = checked.filter(Boolean).length;
  const anyChecked = checkedCount > 0;
  const canConfirm = anyChecked || noneSelected;

  function toggleProvision(i) {
    // Untick "none" if a provision is selected
    setNoneSelected(false);
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  function toggleNone() {
    // Untick all provisions if "none" is selected
    setChecked(Array(DARURAH_PROVISIONS.length).fill(false));
    setNoneSelected((o) => !o);
  }

  const projectedAllowed = anyChecked && !noneSelected;

  return (
    <>
      <div className="q-tag">
        <span>Step 3 · ḍarūrah Assessment</span>
      </div>
      <h2 className="q-title">Assess the ḍarūrah provisions</h2>
      <p className="q-sub">
        Tick each provision that is clinically confirmed. Because the provisions
        are interrelated,{" "}
        <strong>any combination of fulfilled provisions</strong> establishes
        ḍarūrah and permits TOP. Select "None of the above" if no provision
        applies.
      </p>

      {/* Provision checklist */}
      <div className="darurah-checklist">
        {DARURAH_PROVISIONS.map((p, i) => (
          <label
            key={i}
            className={`darurah-check-item${checked[i] ? " checked" : ""}`}
            onClick={() => toggleProvision(i)}
          >
            <div className={`darurah-checkbox${checked[i] ? " checked" : ""}`}>
              {checked[i] && <span>✓</span>}
            </div>
            <div className="darurah-check-text">
              <div className="darurah-check-title">{p.title}</div>
              <div className="darurah-check-detail">{p.detail}</div>
            </div>
          </label>
        ))}

        {/* None of the above */}
        <label
          className={`darurah-check-item darurah-check-none${noneSelected ? " none-selected" : ""}`}
          onClick={toggleNone}
        >
          <div
            className={`darurah-checkbox darurah-checkbox-none${noneSelected ? " checked-none" : ""}`}
          >
            {noneSelected && <span>✗</span>}
          </div>
          <div className="darurah-check-text">
            <div className="darurah-check-title">None of the above</div>
            <div className="darurah-check-detail">
              None of the ḍarūrah provisions are fulfilled — TOP is not
              permissible after ensoulment.
            </div>
          </div>
        </label>
      </div>

      {/* Live outcome indicator */}
      {/* {canConfirm && (
        <div className={`darurah-outcome-indicator${projectedAllowed ? " outcome-allowed" : " outcome-prohibited"}`}>
          {projectedAllowed
            ? <>✓ <strong>{checkedCount} provision{checkedCount > 1 ? "s" : ""} confirmed</strong> — ḍarūrah is established. TOP is permissible.</>
            : <>✗ <strong>No provisions confirmed</strong> — ḍarūrah is not established. TOP is prohibited.</>
          }
        </div>
      )} */}

      {/* Confirm */}
      <div className="darurah-checklist-footer">
        <button
          className={`btn-confirm${projectedAllowed ? " btn-confirm-allowed" : " btn-confirm-prohibited"}`}
          onClick={() => onConfirm(projectedAllowed)}
          disabled={!canConfirm}
        >
          {!canConfirm
            ? "Select at least one option to continue"
            : projectedAllowed
              ? `Confirm`
              : "Confirm"}
        </button>
        <div className="darurah-checklist-actions">
          <button className="btn-ghost" onClick={onBack}>
            ← Back
          </button>
          <button className="btn-ghost" onClick={onReset}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

function ResultView({ node, onBack, onReset }) {
  const cfg = RESULT_CONFIG[node.result] || RESULT_CONFIG.prohibited;
  return (
    <>
      <div className={`result-banner ${cfg.cls}`}>
        <div className="result-icon">{cfg.icon}</div>
        <div className="result-content">
          <div className="result-label">{cfg.label}</div>
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
      <div className="result-actions">
        <button className="btn-ghost" onClick={onBack}>
          ← Back
        </button>
        <button className="btn-ghost" onClick={onReset}>
          New Assessment
        </button>
      </div>
    </>
  );
}
