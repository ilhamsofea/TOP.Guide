const RESOURCES = [
  {
    icon: "doc",
    title: "MOH Clinical Guidelines on TOP",
    desc: "Provides clinical, legal, and ethical guidance for TOP in public hospitals, including counselling, assessment, and management to ensure safe, patient-centred care.",
    href: " https://www.moh.gov.my/images/04-penerbitan/penerbitan-klinikal/perkhidmatan-OG-dan-pediatrik/3._Guideline_On_TOP_for_Hospitals_in_MOH_.pdf",
  },
  {
    icon: "book",
    title: "Fatwa-fatwa Perubatan di Malaysia",
    desc: "Islamic legal opinions concerning medicine and its application in Malaysia; collected fatwas issued by the Fatwa Committee of the National Council for Islamic Religious Affairs Malaysia and State Mufti Departments of Malaysia.\nSource: Muhamad Rafiqi Hehsan. (2023). Fatwa-fatwa Perubatan di Malaysia (p. 436) [Review of Fatwa-fatwa Perubatan di Malaysia ]. PENERBIT USIM.",
    href: "#",
  },
  {
    icon: "shield",
    title:
      "Integrating Aqli (Rationale) and Naqli (Revealed) Knowledge in AI-driven Clinical Decision Support Systems to Enhance Healthcare Delivery for Guiding Termination of Pregnancy Among Muslim Patients: A Systematic ",
    desc: "This systematic review explores how artificial intelligence (AI)-driven clinical decision support systems (CDSS) can improve decision-making in termination of pregnancy (TOP), particularly for Muslim patients. It highlights the integration of medical evidence (aqli) and Islamic principles (naqli) to create more holistic, culturally sensitive healthcare solutions.",
    href: "https://pubmed.ncbi.nlm.nih.gov/41742117/",
  },
  // {
  //   icon: "users",
  //   title: "Multidisciplinary TOP Team Guidelines",
  //   desc: "Guidance on forming and convening a multidisciplinary team for complex or borderline TOP cases.",
  //   href: "#",
  // },
  // {
  //   icon: "clipboard",
  //   title: "ḍarūrah Assessment Checklist",
  //   desc: "A structured clinical checklist for verifying all three conditions of ḍarūrah in post-ensoulment cases.",
  //   href: "#",
  // },
  // {
  //   icon: "mail",
  //   title: "Fatwa References — JAKIM & MUFTI",
  //   desc: "National-level fatwas and official religious authority positions on TOP in Malaysia.",
  //   href: "#",
  // },
];

export default function ResourcesPage() {
  return (
    <div className="page-content animate-in">
      <div className="page-header">
        <h1 className="page-title">
          Clinical <em>References</em>
        </h1>
        <p className="page-desc">
          Key documents, guidelines, and scholarly references underpinning the
          decision framework used in this tool.
        </p>
      </div>

      <div className="resources-grid">
        {RESOURCES.map((r, i) => (
          <a className="resource-card" href={r.href} key={i}>
            <div className="resource-icon">
              <ResourceIcon type={r.icon} />
            </div>
            <h4>{r.title}</h4>
            <p style={{ whiteSpace: "pre-line" }}>{r.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

function ResourceIcon({ type }) {
  const icons = {
    doc: (
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    ),
    book: (
      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    ),
    shield: (
      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
    users: (
      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    ),
    clipboard: (
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    ),
    mail: (
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      {icons[type]}
    </svg>
  );
}
