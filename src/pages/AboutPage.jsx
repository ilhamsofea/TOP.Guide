import { SCHOOLS_OF_FIQH } from "../data/decisionData";

const TEAM = [
  {
    initials: "DN",
    name: "Dr. Nur Faraheen binti Abdul Rahman",
    role: "Project Supervisor",
    email: "nurfaraheen@usim.edu.my",
  },
  {
    initials: "NU",
    name: "Nur Umaimah Syaziyah binti Safieei ",
    role: "Project Leader",
    email: "umaimahsyaziyah23@gmail.com",
  },
  {
    initials: "NS",
    name: "Nurul Shafiqah binti Norhalim Iskandar",
    role: "Content and Clinical Integration Team",
    email: "nurulsemail@gmail.com",
  },
  {
    initials: "KS",
    name: "Khadijah Sajwa binti A.M.Khazin",
    role: "Content and Clinical Integration Team",
    email: "sjwanotes@gmail.com",
  },
  {
    initials: "NA",
    name: " Nur Amira binti Mohd Zaini",
    role: "Visual Content Designer",
    email: "amirazaini05@gmail.com",
  },
  {
    initials: "AW",
    name: " Aufa Wajihah binti Sobri ",
    role: "User Needs and Evaluation Analyst",
    email: "aufa.wjh@gmail.com",
  },
  {
    initials: "SI",
    name: " Sharifah Ilham Sofea binti Nazarudin ",
    role: " System Developer",
    email: "ilhamsofeanazarudin@gmail.com",
  },
];

function BrandName() {
  const word = 'HAYATPATH'
  return (
    <strong>
      {word.split('').map((l, i) => (
        <span key={i} style={{ color: 'var(--burgundy)' }}>{l}</span>
      ))}
    </strong>
  )
}

export default function AboutPage() {
  return (
    <div className="page-content animate-in">
      <div className="page-header">
        <h1 className="page-title">
          About <em>HAYATPATH</em>
        </h1>
        <p className="page-desc">
          A clinical decision aid built for Malaysian healthcare professionals —
          bridging classical Islamic jurisprudence with evidence-based obstetric
          practice.
        </p>
      </div>

      <div className="about-grid">
        {/* Mission */}
        <div className="mission-card">
          <h3>Our mission</h3>
<p style={{ marginTop: 14 }}>
  {['H','A','Y','A','T','P','A','T','H'].map((letter, i) => (
    <span key={i} style={{ color: 'var(--burgundy)', fontWeight: 700 }}>{letter}</span>
  ))} was developed as a digital platform that supports
  termination of pregnancy (TOP) decision-making for Muslim patients.
</p>
          <p style={{ marginTop: 14 }}>
            By integrating evidence-based medical practice with Islamic ethical
            principles, ensuring that both clinical and religious considerations
            are addressed.
          </p>
          <p style={{ marginTop: 14 }}>
            This enables clinicians to make wise, ethically sound, and
            well-informed decisions with confidence in a timely and efficient
            manner.
          </p>
        </div>

        {/* Schools of Fiqh */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">
              <svg viewBox="0 0 24 24">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Four Schools of Islamic Jurisprudence
            </span>
          </div>
          <div className="card-body">
            <div className="school-list">
              {SCHOOLS_OF_FIQH.map((s) => (
                <div className="school-item" key={s.name}>
                  <div className="school-name">{s.name}</div>
                  <div className="school-ruling">{s.ruling}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key Facts */}
      <div className="stat-row" style={{ marginBottom: 24 }}>
        <div className="stat-card stat-accent">
          <div className="stat-label">Mazhabs Referenced</div>
          <div className="stat-value">4</div>
          <div className="stat-sub">All four major Sunni schools</div>
        </div>
        <div className="stat-card stat-accent-green">
          <div className="stat-label">Decision Pathways</div>
          <div className="stat-value">12+</div>
          <div className="stat-sub">Covering all clinical scenarios</div>
        </div>
        <div className="stat-card stat-accent-amber">
          <div className="stat-label">MOH Aligned</div>
          <div className="stat-value">100%</div>
          <div className="stat-sub">Ministry of Health Malaysia</div>
        </div>
        <div className="stat-card stat-accent-blue">
          <div className="stat-label">Institution</div>
          <div className="stat-value">USIM</div>
          <div className="stat-sub">Universiti Sains Islam Malaysia</div>
        </div>
      </div>

      {/* Team */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">
            <svg viewBox="0 0 24 24">
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Core Team
          </span>
        </div>
        <div className="card-body">
          <div className="team-grid">
            {TEAM.map((m) => (
              <div className="team-member" key={m.initials}>
                <div className="team-avatar">{m.initials}</div>
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
                <div className="team-email">{m.email}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
