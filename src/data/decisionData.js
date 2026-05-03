// decisionData.js
// Logic follows: "Decision of Termination of Pregnancy for Muslim Patients" flowchart

// ─── Data ─────────────────────────────────────────────────────────────────────

export const DARURAH_PROVISIONS = [
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

export const SCHOOLS_OF_FIQH = [
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

export const TREE = {
  // ── Step 1: Gestational age ───────────────────────────────────────────────
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

  // ══════════════════════════════════════════════════════════════════════════
  // BEFORE 40 DAYS
  // ══════════════════════════════════════════════════════════════════════════
  before40: {
    id: "before40",
    step: 1,
    label: "Step 2 · Shariah Justification",
    question: "Is a shariah justification (ʿuzur sharʿi) present?",
    sub: "A recognised religious or medical ground must exist for the ruling to be reconsidered before 40 days.",
    provisions: true,
    options: [
      { text: "Yes — justification is present", next: "before40_yes" },
      { text: "No — no justification", next: "before40_no" },
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

  before40_no: {
    id: "before40_no",
    step: 3,
    label: "Step 4 · Scholarly Position",
    question:
      "Select the applicable scholarly position or institutional guideline",
    sub: "Without a shariah justification, Islamic jurists differ on the ruling before 40 days. Some permit with justification, while others prohibit regardless.",
    options: [
      {
        text: "Follow permissive view (Shafi’i 2nd view /  Imam al-Lakhmi)",
        next: "permissive_view_moh",
      },
      {
        text: "Follow strict view (Shafi’i 1st view /  Malikiyyah)",
        next: "before40_prohibited",
      },
    ],
  },

  // Without uzur before 40 days → Illegal (by Malikiyyah & Shafiʿiyyah 1st view)
  before40_prohibited: {
    id: "before40_prohibited",
    result: "prohibited",
    title: "TOP is Prohibited",
    body: "Before 40 days, termination without a shariah justification is considered prohibited according to the strict view of Mazhab Shafiʿiyyah (1st view) and Malikiyyah. It is not legally permissible.",
    steps: [
      "Note: ruling based on the strict view of Mazhab Shafiʿiyyah (1st view) and Malikiyyah.",
      "Counsel the patient on the Islamic position and discourage termination.",
      "Provide psychosocial support and welfare referral.",
      "If patient insists, refer for ANC and further counselling.",
    ],
  },

  permissive_view_moh: {
    id: "permissive_view_moh",
    step: 4,
    label: "Step 5 · MOH Criteria",
    question: "Does the case meet MOH clinical criteria?",
    sub: "Even if a permissive scholarly view is adopted, MOH clinical criteria must still be satisfied before proceeding with TOP.",
    options: [
      { text: "Yes — MOH criteria are met", next: "permissive_view_moh_yes" },
      { text: "No — MOH criteria are not met", next: "permissive_view_moh_no" },
    ],
  },

  permissive_view_moh_yes: {
    id: "permissive_view_moh_yes",
    result: "allowed",
    title: "TOP is Permissible",
    body: "Shariah justification is present and MOH clinical criteria are satisfied. Proceed with pre-abortion counselling, the mandatory 48-hour opt-out window, and written informed consent.",
    body: "Before 40 days, termination without a shariah justification is considered legally permissible according to Imam al-Lakhmi and Mazhab Shafiʿiyyah (2nd view). MOH clinical criteria are also satisfied. Proceed with the full MOH counselling protocol.",
    steps: [
      "Note: ruling based on Imam al-Lakhmi and Mazhab Shafiʿiyyah (2nd view).",
      "Conduct mandatory pre-abortion counselling session.",
      "Observe the 48-hour opt-out period.",
      "Obtain written informed consent.",
      "Proceed with management of TOP.",
      "Arrange post-abortion counselling and family planning consultation.",
    ],
  },

  permissive_view_moh_no: {
    id: "permissive_view_moh_no",
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

  // ══════════════════════════════════════════════════════════════════════════
  // 40 – 119 DAYS
  // ══════════════════════════════════════════════════════════════════════════
  "40to119": {
    id: "40to119",
    step: 1,
    label: "Step 2 · Shariah Justification",
    question: "Is a shariah justification (ʿuzur sharʿi) present?",
    sub: "Between 40–119 days, the ruling is more restrictive. Scholarly positions across the four Mazhabs differ.",
    provisions: true,
    options: [
      { text: "Yes — justification is present", next: "40to119_yes" },
      { text: "No — no justification", next: "40to119_no" },
    ],
  },

  // Without uzur 40–119 days → Makruh (by Mazhab Hanafiyyah)
  "40to119_no": {
    id: "40to119_no",
    result: "makruh",
    title: "TOP is Discouraged (Makruh)",
    body: "Between 40–119 days without a shariah justification, termination is considered makruh (discouraged) according to Mazhab Hanafiyyah. It is not strictly prohibited but is strongly discouraged without valid justification.",
    steps: [
      "Note: ruling based on Mazhab Hanafiyyah — makruh, not prohibited.",
      "Counsel the patient on the Islamic position and encourage continuation of pregnancy.",
      "Provide psychosocial support and welfare referral.",
      "If patient insists, refer for ANC and further counselling.",
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

  // ══════════════════════════════════════════════════════════════════════════
  // ≥ 120 DAYS — THREE-WAY ḍarūrah OUTCOME
  // ══════════════════════════════════════════════════════════════════════════
  after120: {
    id: "after120",
    step: 1,
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
        next: "after120_prohibited",
      },
    ],
  },

  after120_prohibited: {
    id: "after120_prohibited",
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

  // checklist:true — rendered by DarurahChecklist, not QuestionView
  darurah_check: {
    id: "darurah_check",
    step: 2,
    label: "Step 3 · ḍarūrah Assessment",
    checklist: true,
  },

  // All 5 ticked/Patially ticked → allowed
  after120_allowed: {
    id: "after120_allowed",
    step: 4,
    label: "Step 5 · MOH Criteria",
    question: "Does the case meet MOH clinical criteria?",
    sub: "Even if the ḍarūrah provisions are fulfilled, MOH clinical criteria must still be satisfied for TOP to be permissible after 120 days.",
    options: [
      { text: "Yes — MOH criteria are met", next: "after120_allowed_moh_yes" },
      {
        text: "No — MOH criteria are not met",
        next: "moh_no",
      },
    ],
  },

  after120_allowed_moh_yes: {
    id: "after120_allowed_moh_yes",
    result: "allowed",
    title: "TOP is Permissible",
    body: "Shariah justification is present, ḍarūrah provisions exist, and MOH clinical criteria are satisfied.",
    steps: [
      "Document existing ḍarūrah provisions with supporting clinical evidence.",
      "Obtain a second opinion from a senior obstetrician or maternal-fetal medicine specialist.",
      "Conduct mandatory pre-abortion counselling session.",
      "Observe the 48-hour opt-out period — patient may withdraw consent.",
      "Obtain written informed consent before proceeding.",
      "Proceed with management of TOP.",
      "Arrange post-abortion counselling and family planning consultation.",
      "Provide support to patient, significant others, and healthcare workers.",
    ],
  },

  // None ticked → prohibited
  after120_prohibited: {
    id: "after120_prohibited",
    result: "prohibited",
    title: "TOP is Prohibited",
    body: "The ḍarūrah provisions have not been fulfilled. Termination is not permitted.",
    steps: [
      "Document clearly which provisions were not met and the clinical basis for each finding.",
      "Inform the patient and family compassionately of the outcome.",
      "Refer to senior obstetrician or maternal-fetal medicine specialist for ongoing management.",
      "Provide full antenatal care (ANC) referral.",
      "Arrange psychosocial support for the patient and significant others.",
      "Seek Islamic scholarly review (ethics committee or mufti) if the clinical picture changes.",
      "Reassess if the maternal condition deteriorates or new clinical evidence emerges.",
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SHARED INDICATION BRANCHES
  // ══════════════════════════════════════════════════════════════════════════

  // ── Maternal ─────────────────────────────────────────────────────────────
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

  // ── Fetal ─────────────────────────────────────────────────────────────────
  fetal_congenital: {
    id: "fetal_congenital",
    step: 3,
    label: "Step 4 · Fetal Severity",
    question: "How severe is the fetal congenital condition?",
    sub: "The severity of the anomaly determines permissibility under Islamic jurisprudence. Three categories apply.",
    options: [
      {
        text: "Mild and treatable, or the child can live with it",
        next: "congenital_mild",
      },
      { text: "Severe and serious condition", next: "congenital_severe" },
      {
        text: "Serious — directly causes miscarriage",
        next: "congenital_direct",
      },
    ],
  },

  // Mild → always prohibited
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

  // Severe → check MOH criteria
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

  // Directly causes miscarriage → Legal (permissible directly)
  congenital_direct: {
    id: "congenital_direct",
    result: "allowed",
    title: "TOP is Permissible (Legal)",
    body: "Where the fetal condition is serious and would directly cause miscarriage, TOP is considered legally permissible according to Mazhab Shafiʿiyyah (3rd view) and Mazhab Hanabilah. MOH counselling protocols must still be followed.",
    steps: [
      "Document clinical findings confirming diagnosis and prognosis.",
      "Conduct mandatory pre-abortion counselling session.",
      "Observe 48-hour opt-out period.",
      "Obtain written informed consent.",
      "Proceed with management of TOP.",
      "Conduct post-abortion counselling and family planning consultation.",
      "Provide support to patient, significant others, and healthcare workers.",
    ],
  },

  // ── Social reasons ────────────────────────────────────────────────────────

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

  // ══════════════════════════════════════════════════════════════════════════
  // SHARED MOH OUTCOMES
  // ══════════════════════════════════════════════════════════════════════════
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
      "Provide support to patient, significant others, and healthcare workers.",
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
