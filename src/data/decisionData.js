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

// decisionData.js
// Logic follows: "Decision of Termination of Pregnancy for Muslim Patients" flowchart

export const DARURAH_PROVISIONS = [
  {
    title: "Certainty of emergency",
    detail: "The darurah must be certain — not speculative or feared.",
  },
  {
    title: "Harm from current pregnancy",
    detail:
      "The harm results directly from this pregnancy and there is no other way to remove the harm except TOP.",
  },
  {
    title: "Defined necessity",
    detail:
      "The necessity must be defined in such a way that it does not contradict Islamic legal commands and prohibitions.",
  },
  {
    title: "Evidence-based medical certainty",
    detail:
      "There is clear, evidence-based medical certainty that continuing the pregnancy poses a serious risk, and that termination is an effective intervention to prevent or reduce that harm.",
  },
  {
    title: "Qualified professional determination",
    detail:
      "The state of darurah must be determined by a qualified, competent medical professional — not decided by the patient alone.",
  },
];

// ─── Decision Tree ────────────────────────────────────────────────────────────
// Each node is either a question node or a result node.
// Question node: { id, label, question, sub, options: [{ text, next }], provisions? }
// Result node:   { id, result: 'allowed'|'prohibited'|'conditional', title, body, steps? }

export const DECISION_TREE = {
  // ── Step 1: Gestational age ──────────────────────────────────────────────
  start: {
    id: "start",
    label: "Step 1 · Gestational Age",
    question: "What is the gestational age of the pregnancy?",
    sub: "The gestational threshold determines the primary jurisprudential framework. Ensoulment (nafkh al-rūḥ) occurs at 120 days (≥17 weeks) according to the majority scholarly position.",
    options: [
      { text: "Before 40 days", next: "before_ensoulment_indicator" },
      {
        text: "40 – 119 days (before ensoulment)",
        next: "before_ensoulment_indicator",
      },
      { text: "≥ 120 days (at or after ensoulment)", next: "after_ensoulment" },
    ],
  },

  // ── After ensoulment → always prohibited ────────────────────────────────
  after_ensoulment: {
    id: "after_ensoulment",
    result: "prohibited",
    title: "TOP is Prohibited",
    body: "After ensoulment (≥120 days), termination of pregnancy is categorically prohibited (ḥarām) under all four schools of Islamic jurisprudence. There are no permissible exceptions at this gestational age.",
    steps: [
      "Provide compassionate counselling to the patient and family.",
      "Continue antenatal care (ANC) throughout the pregnancy.",
      "Arrange appropriate specialist referrals for maternal and fetal monitoring.",
      "Offer psychosocial support to patient, significant others, and healthcare workers.",
    ],
  },

  // ── Step 2: Shariah justification ───────────────────────────────────────
  before_ensoulment_indicator: {
    id: "before_ensoulment_indicator",
    label: "Step 2 · Shariah Justification",
    question: "Is there a recognised Shariah justification (ʿuzur syarʿi)?",
    sub: "The default ruling before ensoulment is that TOP is prohibited unless a legitimate Shariah justification exists. Without such justification, the default prohibition applies regardless of gestational age.",
    options: [
      {
        text: "Yes — there is a recognised Shariah justification",
        next: "reason_type",
      },
      {
        text: "No — no Shariah justification present",
        next: "no_justification",
      },
    ],
  },

  no_justification: {
    id: "no_justification",
    result: "prohibited",
    title: "TOP is Prohibited",
    body: "Without a recognised Shariah justification (ʿuzur syarʿi), the default ruling applies: termination of pregnancy is prohibited, even before ensoulment. Social convenience, financial concern, or preference alone do not constitute valid justifications.",
    steps: [
      "Counsel patient that no valid Islamic justification has been identified.",
      "Continue antenatal care (ANC) and support throughout the pregnancy.",
      "Provide psychosocial support and refer to social services if needed.",
    ],
  },

  // ── Step 3: Reason type ──────────────────────────────────────────────────
  reason_type: {
    id: "reason_type",
    label: "Step 3 · Reason for Termination",
    question:
      "What is the primary reason for termination from an Islamic view?",
    sub: "Select the category that best describes the clinical and contextual situation. Each pathway carries different jurisprudential weight and MOH criteria.",
    options: [
      {
        text: "Maternal indications — risk to the mother's health or life",
        next: "maternal_risk",
      },
      {
        text: "Fetal indications — congenital or chromosomal disorder",
        next: "fetal_severity",
      },
      {
        text: "Social reasons — circumstances of conception",
        next: "social_reason",
      },
    ],
  },

  // ── MATERNAL pathway ─────────────────────────────────────────────────────
  maternal_risk: {
    id: "maternal_risk",
    label: "Step 4 · Maternal Risk Assessment",
    question:
      "Does continuing the pregnancy pose a greater risk to the mother?",
    sub: "There must be clear, evidence-based medical certainty that continuing the pregnancy poses a serious risk, and that termination is an effective intervention to prevent or reduce that harm.",
    provisions: true,
    options: [
      {
        text: "Yes — continuing pregnancy poses serious risk to the mother",
        next: "maternal_moh_check",
      },
      {
        text: "No — risk to mother is not established or is manageable",
        next: "maternal_not_indicated",
      },
    ],
  },

  maternal_not_indicated: {
    id: "maternal_not_indicated",
    result: "prohibited",
    title: "TOP is Prohibited",
    body: "If continuing the pregnancy does not pose a serious risk to the mother, the maternal ḍarūrah condition is not met. TOP is therefore prohibited under the maternal indications pathway.",
    steps: [
      "Continue antenatal care with close monitoring.",
      "Review and optimise management of any existing maternal condition.",
      "Provide ongoing support and counselling.",
    ],
  },

  maternal_moh_check: {
    id: "maternal_moh_check",
    label: "Step 5 · MOH Criteria",
    question: "Does the case fulfil MOH criteria for termination?",
    sub: "All five ḍarūrah provisions must be satisfied and independently verified by a qualified medical professional. The decision cannot be made by the patient alone.",
    provisions: true,
    options: [
      {
        text: "Yes — all MOH criteria and ḍarūrah provisions are fulfilled",
        next: "pre_abortion_counselling",
      },
      { text: "No — MOH criteria are not fulfilled", next: "moh_not_met" },
    ],
  },

  // ── FETAL pathway ────────────────────────────────────────────────────────
  fetal_severity: {
    id: "fetal_severity",
    label: "Step 4 · Fetal Condition Severity",
    question: "What is the severity of the fetal congenital condition?",
    sub: "The Islamic ruling on fetal indications is calibrated to the severity and prognosis of the condition. Mild or treatable conditions do not constitute ḍarūrah.",
    options: [
      {
        text: "Mild and treatable, or the child can live with the condition",
        next: "fetal_mild",
      },
      { text: "Severe and serious condition", next: "fetal_severe" },
    ],
  },

  fetal_mild: {
    id: "fetal_mild",
    result: "prohibited",
    title: "TOP is Prohibited",
    body: "A mild, treatable, or liveable congenital condition does not constitute a ḍarūrah under Islamic law. Termination on these grounds is not permitted. The condition should be managed through appropriate medical care and supportive services.",
    steps: [
      "Arrange referral to a relevant paediatric or fetal medicine specialist.",
      "Provide genetic counselling and detailed explanation of the condition.",
      "Offer psychosocial support to the patient and family.",
      "Continue antenatal care with specialist oversight.",
    ],
  },

  fetal_severe: {
    id: "fetal_severe",
    label: "Step 4b · Fetal Prognosis",
    question:
      "Is the condition serious enough that it would cause direct miscarriage or is incompatible with life?",
    sub: "This distinction determines which jurisprudential opinion applies. A condition incompatible with life or one that directly causes miscarriage carries a different ruling to a severe but survivable condition.",
    options: [
      {
        text: "Yes — serious and would directly cause miscarriage / incompatible with life",
        next: "fetal_legal",
      },
      {
        text: "No — severe but not directly causing miscarriage",
        next: "fetal_moh_check",
      },
    ],
  },

  fetal_legal: {
    id: "fetal_legal",
    result: "allowed",
    title: "TOP is Permissible",
    body: "Where the fetal condition is serious and would directly cause miscarriage, or is definitively incompatible with life, TOP is considered legally permissible. This ruling is supported by Mazhab Shafiʿiyyah (3rd view) and Mazhab Hanabilah. MOH counselling protocols must still be followed.",
    steps: [
      "Document the clinical findings confirming the diagnosis and prognosis.",
      "Conduct mandatory pre-abortion counselling session.",
      "Observe 48-hour opt-out period — patient may withdraw consent.",
      "Proceed with management of TOP if patient confirms decision.",
      "Conduct post-abortion counselling and family planning consultation.",
      "Provide support to patient, significant others, and healthcare workers.",
    ],
  },

  fetal_moh_check: {
    id: "fetal_moh_check",
    label: "Step 5 · MOH Criteria",
    question: "Does the case fulfil MOH criteria for termination?",
    sub: "Even for severe fetal conditions, all five ḍarūrah provisions must be assessed and verified by a qualified medical professional.",
    provisions: true,
    options: [
      {
        text: "Yes — all MOH criteria and ḍarūrah provisions are fulfilled",
        next: "pre_abortion_counselling",
      },
      { text: "No — MOH criteria are not fulfilled", next: "moh_not_met" },
    ],
  },

  // ── SOCIAL pathway ───────────────────────────────────────────────────────
  social_reason: {
    id: "social_reason",
    label: "Step 4 · Social Circumstances",
    question: "What are the social circumstances of the pregnancy?",
    sub: "Islamic jurisprudence distinguishes between pregnancies resulting from unlawful coercion and those from consensual unlawful acts. Poverty and psychosocial reasons alone are not recognised justifications.",
    options: [
      { text: "Pregnancy resulting from rape", next: "rape_permissible" },
      {
        text: "Pregnancy resulting from adultery (consensual zina)",
        next: "social_prohibited",
      },
      { text: "Poverty or financial hardship", next: "social_prohibited" },
      {
        text: "Other psychosocial or social conditions",
        next: "other_psychosocial",
      },
    ],
  },

  rape_permissible: {
    id: "rape_permissible",
    result: "conditional",
    title: "TOP is Permissible (with conditions)",
    body: "Pregnancy resulting from rape is recognised as a valid Shariah justification for termination before ensoulment. This is a conditional permissibility — all MOH criteria and mandatory counselling protocols must still be followed.",
    steps: [
      "Document the circumstances with appropriate sensitivity and confidentiality.",
      "Conduct mandatory pre-abortion counselling session.",
      "Observe 48-hour opt-out period — patient may withdraw consent.",
      "Proceed with management of TOP if patient confirms decision.",
      "Conduct post-abortion counselling and family planning consultation.",
      "Provide comprehensive psychosocial support to the patient.",
    ],
  },

  social_prohibited: {
    id: "social_prohibited",
    result: "prohibited",
    title: "TOP is Prohibited",
    body: "Pregnancy resulting from consensual adultery (zina), poverty, or financial hardship does not constitute a valid Shariah justification for termination. These circumstances do not fulfil the ḍarūrah conditions required under Islamic law.",
    steps: [
      "Provide non-judgmental counselling and emotional support.",
      "Continue antenatal care and refer to social services as appropriate.",
      "Discuss available support networks and welfare assistance.",
    ],
  },

  other_psychosocial: {
    id: "other_psychosocial",
    label: "Step 5 · MOH Criteria",
    question: "Does the case fulfil MOH criteria for termination?",
    sub: "Other psychosocial conditions require careful evaluation against MOH criteria. The treating physician must determine whether the situation constitutes a recognised clinical indication.",
    provisions: true,
    options: [
      {
        text: "Yes — all MOH criteria and ḍarūrah provisions are fulfilled",
        next: "pre_abortion_counselling",
      },
      { text: "No — MOH criteria are not fulfilled", next: "moh_not_met" },
    ],
  },

  // ── Shared outcomes ───────────────────────────────────────────────────────
  moh_not_met: {
    id: "moh_not_met",
    result: "prohibited",
    title: "TOP is Prohibited",
    body: "The MOH criteria for termination of pregnancy have not been fulfilled. TOP is not indicated at this time. The patient should continue with antenatal care.",
    steps: [
      "Inform the patient clearly and compassionately of the assessment outcome.",
      "Continue antenatal care (ANC) and refer to relevant specialists.",
      "Provide psychosocial support and counselling.",
      "Reassess if clinical condition changes.",
    ],
  },

  pre_abortion_counselling: {
    id: "pre_abortion_counselling",
    result: "conditional",
    title: "Proceed to Pre-Abortion Counselling",
    body: "The case fulfils the required Islamic and MOH criteria. Proceed with mandatory pre-abortion counselling. The patient must be given full information and a 48-hour opt-out period before any procedure is carried out.",
    steps: [
      "Conduct mandatory pre-abortion counselling session with the patient.",
      "Provide reasons for termination from an Islamic view and available support.",
      "Observe 48-hour opt-out period — patient may change their decision.",
      "If patient opts out → continue with ANC.",
      "If patient agrees to proceed → management of TOP.",
      "Conduct post-abortion counselling and family planning consultation.",
      "Provide support to the patient, significant others, and healthcare workers.",
    ],
  },
};
