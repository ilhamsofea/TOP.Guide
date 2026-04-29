export const DECISION_STEPS = {
  start: {
    label: 'Step 1 of 5',
    question: 'What is the gestational age?',
    sub: 'Gestational age determines the baseline ruling on ensoulment (rūḥ) and the applicable scholarly positions.',
    options: [
      { text: 'Before 40 days', next: 'before40' },
      { text: '40 – 119 days', next: '40to119' },
      { text: '≥ 120 days (after ensoulment)', next: 'after120' },
    ],
  },

  before40: {
    label: 'Step 2 of 5',
    question: 'Is a shariah justification (ʿuzur sharʿi) present?',
    sub: 'A recognised religious or medical ground must exist for the ruling to be reconsidered before 40 days.',
    options: [
      { text: 'Yes — justification is present', next: 'before40_yes' },
      { text: 'No — no justification', next: 'before40_no' },
    ],
  },

  before40_yes: {
    label: 'Step 3 of 5',
    question: 'What is the primary indication?',
    sub: 'Select the category that best describes the clinical or contextual reason for termination.',
    options: [
      { text: 'Maternal medical indication', next: 'maternal_indication' },
      { text: 'Fetal congenital disorder', next: 'fetal_congenital' },
      { text: 'Pregnancy resulting from rape', next: 'rape' },
      { text: 'Social reason (poverty, adultery, etc.)', next: 'social' },
    ],
  },

  before40_no: {
    result: 'prohibited',
    title: 'TOP is prohibited',
    body: 'Without a recognised shariah justification before 40 days, termination of pregnancy is not permissible under Islamic jurisprudence.',
    scholarly: [
      { school: 'Imam al-Lakhmi', ruling: 'Permissible with justification only' },
      { school: 'Mazhab Shafiʿiyyah (2nd view)', ruling: 'Permissible with justification only' },
    ],
    steps: [
      'Document the clinical decision clearly in patient records.',
      'Provide antenatal care (ANC) referral.',
      'Arrange psychosocial support for patient and family.',
      'Offer post-consultation counselling.',
    ],
  },

  '40to119': {
    label: 'Step 2 of 5',
    question: 'Is a shariah justification (ʿuzur sharʿi) present?',
    sub: 'Between 40–119 days, the ruling is more restrictive. Scholarly positions across the four Mazhabs differ.',
    options: [
      { text: 'Yes — justification is present', next: '40to119_yes' },
      { text: 'No — no justification', next: '40to119_no' },
    ],
  },

  '40to119_no': {
    result: 'prohibited',
    title: 'TOP is prohibited',
    body: 'Without a recognised shariah justification between 40–119 days, termination is impermissible under the majority scholarly view.',
    steps: [
      'Document clinical decision.',
      'Refer patient for ANC and supportive care.',
      'Offer post-consultation counselling.',
    ],
  },

  '40to119_yes': {
    label: 'Step 3 of 5',
    question: 'What is the primary indication?',
    sub: 'Select the category that best describes the clinical or contextual reason for termination.',
    options: [
      { text: 'Maternal medical indication', next: 'maternal_indication' },
      { text: 'Fetal congenital disorder', next: 'fetal_congenital' },
      { text: 'Pregnancy resulting from rape', next: 'rape' },
      { text: 'Social reason (poverty, adultery, etc.)', next: 'social' },
    ],
  },

  after120: {
    label: 'Step 2 of 5',
    question: 'Does continuing the pregnancy pose a greater risk to the mother?',
    sub: 'After ensoulment (≥120 days), TOP is generally prohibited. The first question is whether the pregnancy itself poses a serious maternal risk.',
    options: [
      { text: 'Yes — continuing pregnancy poses greater risk to mother', next: 'darurah_check' },
      { text: 'No — no greater risk to mother identified', next: 'after120_no' },
    ],
  },

  after120_no: {
    result: 'prohibited',
    title: 'TOP is prohibited',
    body: 'After ensoulment (≥120 days), continuing the pregnancy does not pose a greater risk to the mother. Termination is not permitted. Provide full ANC and psychosocial support.',
    steps: [
      'Document the clinical decision clearly.',
      'Provide full ANC referral.',
      'Arrange psychosocial support for patient and significant others.',
      'Offer post-consultation counselling.',
    ],
  },

  darurah_check: {
    label: 'Step 3 of 5',
    question: 'Are all five ḍarūrah provisions satisfied?',
    sub: 'All five conditions must be confirmed simultaneously for the ḍarūrah ruling to apply after ensoulment.',
    provisions: true,
    options: [
      { text: 'Yes — all five provisions are met', next: 'after120_allowed' },
      { text: 'No — one or more provisions are not met', next: 'after120_no' },
    ],
  },

  after120_allowed: {
    result: 'allowed',
    title: 'TOP may be permissible',
    body: 'All five ḍarūrah provisions are satisfied. Termination after 120 days may be permitted. Verify MOH criteria and proceed with pre-abortion counselling.',
    steps: [
      'Verify MOH clinical criteria are satisfied.',
      'Conduct mandatory 48-hour pre-abortion counselling.',
      'Obtain informed written consent.',
      'Proceed with management of TOP.',
      'Arrange post-abortion counselling and family planning consultation.',
    ],
  },

  maternal_indication: {
    label: 'Step 4 of 5',
    question: 'Does continuing the pregnancy pose a greater risk to the mother?',
    sub: 'For maternal indications, there must be clear evidence that the pregnancy itself poses a serious risk — and that termination is an effective intervention to reduce that harm.',
    options: [
      { text: 'Yes — continuing pregnancy poses greater risk to mother', next: 'maternal_moh' },
      { text: 'No — no greater maternal risk identified', next: 'maternal_no_risk' },
    ],
  },

  maternal_no_risk: {
    result: 'prohibited',
    title: 'TOP is prohibited',
    body: 'Continuing the pregnancy does not pose a greater risk to the mother. A maternal indication requires clear evidence of serious risk. TOP is not permissible on these grounds.',
    steps: [
      'Document the clinical assessment clearly in patient records.',
      'Refer patient for ANC and specialist review.',
      'Provide psychosocial support and counselling.',
    ],
  },

  maternal_moh: {
    label: 'Step 5 of 5',
    question: 'Does the case meet MOH clinical criteria?',
    sub: 'Maternal indications must fulfil Ministry of Health clinical criteria for TOP to be warranted.',
    options: [
      { text: 'Yes — MOH criteria are met', next: 'moh_yes' },
      { text: 'No — MOH criteria are not met', next: 'moh_no' },
    ],
  },

  fetal_congenital: {
    label: 'Step 4 of 5',
    question: 'How severe is the fetal congenital condition?',
    sub: 'The severity of the anomaly determines permissibility under Islamic jurisprudence.',
    options: [
      { text: 'Mild, treatable, or compatible with life', next: 'congenital_mild' },
      { text: 'Severe and serious condition', next: 'congenital_severe' },
      { text: 'Serious — directly causes miscarriage', next: 'congenital_direct' },
    ],
  },

  rape: {
    label: 'Step 4 of 5',
    question: 'Does the case meet MOH criteria for rape-related pregnancy?',
    sub: 'Pregnancy resulting from rape is a recognised ʿuzur sharʿi. MOH criteria must still be verified.',
    options: [
      { text: 'Yes — MOH criteria are met', next: 'moh_yes' },
      { text: 'No — MOH criteria are not met', next: 'moh_no' },
    ],
  },

  social: {
    result: 'prohibited',
    title: 'TOP is prohibited',
    body: 'Social reasons — including poverty or pregnancy resulting from adultery — are not recognised as valid shariah justifications. TOP is not permissible on these grounds.',
    steps: [
      'Provide psychosocial counselling and emotional support.',
      'Refer patient to social welfare services if appropriate.',
      'Arrange ANC referral and continue supportive care.',
    ],
  },

  congenital_mild: {
    result: 'prohibited',
    title: 'TOP is prohibited',
    body: 'Mild or treatable conditions, or those compatible with life, do not constitute sufficient justification for TOP under Islamic jurisprudence.',
    steps: [
      'Counsel patient and family comprehensively on prognosis.',
      'Arrange specialist paediatric or fetal medicine review.',
      'Refer for ANC and ongoing psychosocial support.',
    ],
  },

  congenital_severe: {
    label: 'Step 5 of 5',
    question: 'Does the severe anomaly meet MOH criteria?',
    sub: 'The condition must be confirmed, documented, and assessed against Ministry of Health clinical criteria.',
    options: [
      { text: 'Yes — MOH criteria are met', next: 'moh_yes' },
      { text: 'No — MOH criteria are not met', next: 'moh_no' },
    ],
  },

  congenital_direct: {
    label: 'Step 5 of 5',
    question: 'Does the case meet MOH clinical criteria?',
    sub: 'Even where the condition directly causes miscarriage, MOH criteria must still be verified before proceeding.',
    options: [
      { text: 'Yes — MOH criteria are met', next: 'moh_yes' },
      { text: 'No — MOH criteria are not met', next: 'moh_no' },
    ],
  },

  moh_yes: {
    result: 'allowed',
    title: 'TOP is permissible',
    body: 'Shariah justification is present and MOH clinical criteria are satisfied. Proceed with pre-abortion counselling, the mandatory 48-hour opt-out window, and written informed consent.',
    steps: [
      'Complete mandatory pre-abortion counselling session.',
      'Observe the 48-hour opt-out period.',
      'Obtain written informed consent.',
      'Proceed with management of TOP.',
      'Arrange post-abortion counselling.',
      'Provide family planning consultation.',
    ],
  },

  moh_no: {
    result: 'prohibited',
    title: 'TOP is not clinically indicated',
    body: 'Although a shariah justification may be present, the case does not meet MOH clinical criteria. TOP is not recommended at this time. Refer patient for ANC.',
    steps: [
      'Document the clinical decision clearly in patient records.',
      'Refer patient for antenatal care (ANC).',
      'Provide psychosocial support and counselling.',
      'Arrange post-consultation support for patient and significant others.',
    ],
  },
}

export const DARURAH_PROVISIONS = [
  {
    title: 'Certainty of emergency',
    detail: 'The ḍarūrah must be real and established — not speculative or presumed.',
  },
  {
    title: 'Direct causal link',
    detail: 'The harm must result directly from the current pregnancy, with no other means to avert it except TOP.',
  },
  {
    title: 'Defined necessity',
    detail: 'The necessity must not contradict Islamic legal commands and prohibitions.',
  },
  {
    title: 'Evidence-based medical certainty',
    detail: 'There must be clear, evidence-based medical certainty that continuing the pregnancy poses a serious risk, and that termination is an effective intervention to prevent or reduce that harm.',
  },
  {
    title: 'Determined by a qualified professional',
    detail: 'The state of ḍarūrah must be determined by a qualified, competent medical professional — not decided by the patient alone.',
  },
]

export const SCHOOLS_OF_FIQH = [
  {
    name: 'Mazhab Hanafiyyah',
    ruling: 'Permissible before 120 days with justification (makruh without); prohibited after',
  },
  {
    name: 'Mazhab Malikiyyah',
    ruling: 'Prohibited at all stages; some permit before 40 days with strong justification',
  },
  {
    name: 'Mazhab Shafiʿiyyah',
    ruling: 'Three views: permitted before 40 days, makruh 40–120 days, prohibited after',
  },
  {
    name: 'Mazhab Hanabilah',
    ruling: 'Permitted before 40 days with justification; prohibited after ensoulment',
  },
]
