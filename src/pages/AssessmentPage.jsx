// pages/AssessmentPage.jsx
import { useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const DARURAH_PROVISIONS = [
  {
    title: "Certainty of emergency",
    detail:
      "The ḍarūrah must be real and established — not speculative or presumed.",
  },
  {
    title: "Direct causal link",
    detail:
      "The harm must result directly from the current pregnancy, with no other means to avert it except TOP.",
  },
  {
    title: "Defined necessity",
    detail:
      "The necessity must not contradict Islamic legal commands and prohibitions.",
  },
  {
    title: "Evidence-based medical certainty",
    detail:
      "There must be clear, evidence-based medical certainty that continuing the pregnancy poses a serious risk, and that termination is an effective intervention to prevent or reduce that harm.",
  },
  {
    title: "Determined by a qualified professional",
    detail:
      "The state of ḍarūrah must be determined by a qualified, competent medical professional — not decided by the patient alone.",
  },
];

const SCHOOLS_OF_FIQH = [
  {
    name: "Mazhab Hanafiyyah",
    ruling:
      "Permissible before 120 days with justification (makruh without); prohibited after",
  },
  {
    name: "Mazhab Malikiyyah",
    ruling:
      "Prohibited at all stages; some permit before 40 days with strong justification",
  },
  {
    name: "Mazhab Shafiʿiyyah",
    ruling:
      "Three views: permitted before 40 days, makruh 40–120 days, prohibited after",
  },
  {
    name: "Mazhab Hanabilah",
    ruling:
      "Permitted before 40 days with justification; prohibited after ensoulment",
  },
];

const TREE = {
  // ── Step 1: Gestational age ──────────────────────────────────────────────
  start: {
    id: "start",
    step: 0,
    label: "Step 1 · Gestational Age",
    question: "What is the gestational age?",
    sub: "Gestational age determines the baseline ruling on ensoulment (rūḥ) and the applicable scholarly positions.",
    options: [
      { text: "Before 40 days", next: "before40" },
      { text: "40 – 119 days", next: "40to119" },
      { text: "≥ 120 days (after ensoulment)", next: "after120" },
    ],
  },

  // ── Before 40 days ───────────────────────────────────────────────────────
  before40: {
    id: "before40",
    step: 1,
    label: "Step 2 · Shariah Justification",
    question: "Is a shariah justification (ʿuzur sharʿi) present?",
    sub: "A recognised religious or medical ground must exist for the ruling to be reconsidered before 40 days.",
    options: [
      { text: "Yes — justification is present", next: "before40_yes" },
      { text: "No — no justification", next: "before40_no" },
    ],
  },

  before40_no: {
    id: "before40_no",
    result: "prohibited",
    title: "TOP is Prohibited",
    body: "Without a recognised shariah justification before 40 days, termination of pregnancy is not permissible under Islamic jurisprudence.",
    steps: [
      "Document the clinical decision clearly in patient records.",
      "Provide antenatal care (ANC) referral.",
      "Arrange psychosocial support for patient and family.",
      "Offer post-consultation counselling.",
    ],
  },

  before40_yes: {
    id: "before40_yes",
    step: 2,
    label: "Step 3 · Primary Indication",
    question: "What is the primary indication?",
    sub: "Select the category that best describes the clinical or contextual reason for termination.",
    options: [
      { text: "Maternal medical indication", next: "maternal_indication" },
      { text: "Fetal congenital disorder", next: "fetal_congenital" },
      { text: "Pregnancy resulting from rape", next: "rape" },
      { text: "Social reason (poverty, adultery, etc.)", next: "social" },
    ],
  },

  // ── 40 – 119 days ────────────────────────────────────────────────────────
  "40to119": {
    id: "40to119",
    step: 1,
    label: "Step 2 · Shariah Justification",
    question: "Is a shariah justification (ʿuzur sharʿi) present?",
    sub: "Between 40–119 days, the ruling is more restrictive. Scholarly positions across the four Mazhabs differ.",
    options: [
      { text: "Yes — justification is present", next: "40to119_yes" },
      { text: "No — no justification", next: "40to119_no" },
    ],
  },

  "40to119_no": {
    id: "40to119_no",
    result: "prohibited",
    title: "TOP is Prohibited",
    body: "Without a recognised shariah justification between 40–119 days, termination is impermissible under the majority scholarly view.",
    steps: [
      "Document clinical decision.",
      "Refer patient for ANC and supportive care.",
      "Offer post-consultation counselling.",
    ],
  },

  "40to119_yes": {
    id: "40to119_yes",
    step: 2,
    label: "Step 3 · Primary Indication",
    question: "What is the primary indication?",
    sub: "Select the category that best describes the clinical or contextual reason for termination.",
    options: [
      { text: "Maternal medical indication", next: "maternal_indication" },
      { text: "Fetal congenital disorder", next: "fetal_congenital" },
      { text: "Pregnancy resulting from rape", next: "rape" },
      { text: "Social reason (poverty, adultery, etc.)", next: "social" },
    ],
  },

  // ── ≥ 120 days (after ensoulment) ────────────────────────────────────────
  after120: {
    id: "after120",
    step: 2,
    label: "Step 2 · Maternal Risk",
    question:
      "Does continuing the pregnancy pose a greater risk to the mother?",
    sub: "After ensoulment (≥120 days), TOP is generally prohibited. The first question is whether the pregnancy itself poses a serious maternal risk.",
    options: [
      {
        text: "Yes — continuing pregnancy poses greater risk to mother",
        next: "darurah_check",
      },
      {
        text: "No — no greater risk to mother identified",
        next: "after120_no",
      },
    ],
  },

  after120_no: {
    id: "after120_no",
    result: "prohibited",
    title: "TOP is Prohibited",
    body: "After ensoulment (≥120 days), continuing the pregnancy does not pose a greater risk to the mother. Termination is not permitted. Provide full ANC and psychosocial support.",
    steps: [
      "Document the clinical decision clearly.",
      "Provide full ANC referral.",
      "Arrange psychosocial support for patient and significant others.",
      "Offer post-consultation counselling.",
    ],
  },

  darurah_check: {
    id: "darurah_check",
    step: 3,
    label: "Step 3 · ḍarūrah Assessment",
    question: "Are all five ḍarūrah provisions satisfied?",
    sub: "All five conditions must be confirmed simultaneously for the ḍarūrah ruling to apply after ensoulment.",
    provisions: true,
    options: [
      { text: "Yes — all five provisions are met", next: "after120_allowed" },
      { text: "No — one or more provisions are not met", next: "after120_no" },
    ],
  },

  after120_allowed: {
    id: "after120_allowed",
    result: "allowed",
    title: "TOP is Permissible",
    body: "All five ḍarūrah provisions are satisfied. Termination after 120 days may be permitted. Verify MOH criteria and proceed with pre-abortion counselling.",
    steps: [
      "Verify MOH clinical criteria are satisfied.",
      "Conduct mandatory 48-hour pre-abortion counselling.",
      "Obtain informed written consent.",
      "Proceed with management of TOP.",
      "Arrange post-abortion counselling and family planning consultation.",
    ],
  },

  // ── Shared indication branches ────────────────────────────────────────────
  maternal_indication: {
    id: "maternal_indication",
    step: 3,
    label: "Step 4 · Maternal Risk",
    question:
      "Does continuing the pregnancy pose a greater risk to the mother?",
    sub: "For maternal indications, there must be clear evidence that the pregnancy itself poses a serious risk — and that termination is an effective intervention to reduce that harm.",
    options: [
      {
        text: "Yes — continuing pregnancy poses greater risk to mother",
        next: "maternal_moh",
      },
      {
        text: "No — no greater maternal risk identified",
        next: "maternal_no_risk",
      },
    ],
  },

  maternal_no_risk: {
    id: "maternal_no_risk",
    result: "prohibited",
    title: "TOP is Prohibited",
    body: "Continuing the pregnancy does not pose a greater risk to the mother. A maternal indication requires clear evidence of serious risk. TOP is not permissible on these grounds.",
    steps: [
      "Document the clinical assessment clearly in patient records.",
      "Refer patient for ANC and specialist review.",
      "Provide psychosocial support and counselling.",
    ],
  },

  maternal_moh: {
    id: "maternal_moh",
    step: 4,
    label: "Step 5 · MOH Criteria",
    question: "Does the case meet MOH clinical criteria?",
    sub: "Maternal indications must fulfil Ministry of Health clinical criteria for TOP to be warranted.",
    options: [
      { text: "Yes — MOH criteria are met", next: "moh_yes" },
      { text: "No — MOH criteria are not met", next: "moh_no" },
    ],
  },

  fetal_congenital: {
    id: "fetal_congenital",
    step: 3,
    label: "Step 4 · Fetal Severity",
    question: "How severe is the fetal congenital condition?",
    sub: "The severity of the anomaly determines permissibility under Islamic jurisprudence.",
    options: [
      {
        text: "Mild, treatable, or compatible with life",
        next: "congenital_mild",
      },
      { text: "Severe and serious condition", next: "congenital_severe" },
      {
        text: "Serious — directly causes miscarriage",
        next: "congenital_direct",
      },
    ],
  },

  congenital_mild: {
    id: "congenital_mild",
    result: "prohibited",
    title: "TOP is Prohibited",
    body: "Mild or treatable conditions, or those compatible with life, do not constitute sufficient justification for TOP under Islamic jurisprudence.",
    steps: [
      "Counsel patient and family comprehensively on prognosis.",
      "Arrange specialist paediatric or fetal medicine review.",
      "Refer for ANC and ongoing psychosocial support.",
    ],
  },

  congenital_severe: {
    id: "congenital_severe",
    step: 4,
    label: "Step 5 · MOH Criteria",
    question: "Does the severe anomaly meet MOH criteria?",
    sub: "The condition must be confirmed, documented, and assessed against Ministry of Health clinical criteria.",
    options: [
      { text: "Yes — MOH criteria are met", next: "moh_yes" },
      { text: "No — MOH criteria are not met", next: "moh_no" },
    ],
  },

  congenital_direct: {
    id: "congenital_direct",
    step: 4,
    label: "Step 5 · MOH Criteria",
    question: "Does the case meet MOH clinical criteria?",
    sub: "Even where the condition directly causes miscarriage, MOH criteria must still be verified before proceeding.",
    options: [
      { text: "Yes — MOH criteria are met", next: "moh_yes" },
      { text: "No — MOH criteria are not met", next: "moh_no" },
    ],
  },

  rape: {
    id: "rape",
    step: 4,
    label: "Step 5 · MOH Criteria",
    question: "Does the case meet MOH criteria for rape-related pregnancy?",
    sub: "Pregnancy resulting from rape is a recognised ʿuzur sharʿi. MOH criteria must still be verified.",
    options: [
      { text: "Yes — MOH criteria are met", next: "moh_yes" },
      { text: "No — MOH criteria are not met", next: "moh_no" },
    ],
  },

  social: {
    id: "social",
    step: 3,
    label: "Step 4 · Scholarly Position",
    question:
      "Select the applicable scholarly position or institutional guideline",
    sub: "For social reasons, Islamic jurists differ. Some permit before 120 days, while others discourage (makruh).",
    options: [
      {
        text: "Follow permissive view (Shafi’i 3rd view / Hanbali)",
        next: "social_moh",
      },
      { text: "Follow cautious view (Hanafi - makruh)", next: "social_makruh" },
    ],
  },

  social_makruh: {
    id: "social_makruh",
    result: "makruh",
    title: "TOP is Discouraged (Makruh)",
    body: "Termination for social reasons is considered makruh (discouraged) under the Hanafi position. It is not strictly prohibited but should be avoided unless additional justification exists.",
    steps: [
      "Provide counselling on ethical considerations.",
      "Encourage continuation of pregnancy where possible.",
      "Offer psychosocial and welfare support.",
    ],
  },
  social_moh: {
    id: "social_moh",
    step: 4,
    label: "Step 5 · MOH Criteria",
    question: "Does the case meet MOH clinical or legal criteria?",
    sub: "Even if a permissive scholarly view is adopted, MOH criteria must still be satisfied.",
    options: [
      { text: "Yes — MOH criteria are met", next: "moh_yes" },
      { text: "No — MOH criteria are not met", next: "moh_no" },
    ],
  },

  // ── Shared MOH outcomes ───────────────────────────────────────────────────
  moh_yes: {
    id: "moh_yes",
    result: "allowed",
    title: "TOP is Permissible",
    body: "Shariah justification is present and MOH clinical criteria are satisfied. Proceed with pre-abortion counselling, the mandatory 48-hour opt-out window, and written informed consent.",
    steps: [
      "Complete mandatory pre-abortion counselling session.",
      "Observe the 48-hour opt-out period.",
      "Obtain written informed consent.",
      "Proceed with management of TOP.",
      "Arrange post-abortion counselling.",
      "Provide family planning consultation.",
    ],
  },

  moh_no: {
    id: "moh_no",
    result: "prohibited",
    title: "TOP is Not Clinically Indicated",
    body: "Although a shariah justification may be present, the case does not meet MOH clinical criteria. TOP is not recommended at this time. Refer patient for ANC.",
    steps: [
      "Document the clinical decision clearly in patient records.",
      "Refer patient for antenatal care (ANC).",
      "Provide psychosocial support and counselling.",
      "Arrange post-consultation support for patient and significant others.",
    ],
  },
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

function useDecision() {
  const [history, setHistory] = useState([]);
  const [currentId, setCurrentId] = useState("start");

  const current = TREE[currentId];
  const isResult = !!current?.result;

  function choose(optionIndex) {
    const option = current.options[optionIndex];
    setHistory((prev) => [...prev, { nodeId: currentId, chosen: option.text }]);
    setCurrentId(option.next);
  }

  function back() {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setCurrentId(prev.nodeId);
  }

  function reset() {
    setHistory([]);
    setCurrentId("start");
  }

  return { current, history, choose, back, reset, isResult };
}

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
  const { current, history, choose, back, reset, isResult } = useDecision();
  const [activeTab, setActiveTab] = useState("gestational");
  const [darurahOpen, setDarurahOpen] = useState(false);

  // const doneUpTo = history.length;
  // const activeStep = Math.min(history.length, TOTAL_STEPS - 1);
  const activeStep = current.step ?? 0;

const doneSteps = history.map(h => TREE[h.nodeId]?.step ?? 0);

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
              <div className="wizard-title">TOP Decision Protocol</div>
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
        <div className={`step-connector${doneSteps.includes(i - 1) ? " done" : ""}`} />
      )}
      <div className={`step-btn${isDone ? " step-done" : ""}${isActive ? " step-active" : ""}`}>
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
            ) : (
              <QuestionView
                node={current}
                onChoose={choose}
                darurahOpen={darurahOpen}
                setDarurahOpen={setDarurahOpen}
              />
            )}

            {!isResult && (
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
            <div className="ref-tabs">
              {[
                { key: "gestational", label: "age" },
                { key: "moh", label: "MOH" },
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
                    note: "Makruh or permissible with ʿuzur. Supported by Imam al-Lakhmi and Shafiʿi (2nd view).",
                  },
                  {
                    stage: "40 – 119 days",
                    note: "More restrictive. Majority view prohibits without strong justification.",
                  },
                  {
                    stage: "< 120 days (gen.)",
                    note: "Mazhab Shafiʿiyyah (3rd view) and Mazhab Hanabilah restrict further. Mazhab Hanafiyyah permits with ʿuzur.",
                  },
                  {
                    stage: "≥ 120 days",
                    note: "After ensoulment. Only permissible under confirmed ḍarūrah with serious maternal risk.",
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
                All five provisions must be fulfilled
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
