import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_lj3no28",
        "template_6nujw3h",
        form.current,
        "Sy7PCxHFaXprPtzbv",
      )
      .then(
        (result) => {
          alert(
            "Your message has been submitted. We will respond within one working day.",
          );
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          alert(
            "Failed to send message. Please try again later or contact us via email.",
          );
        },
      );
  };

  return (
    <div className="page-content animate-in">
      <div className="page-header">
        <h1 className="page-title">
          Contact <em>the Team</em>
        </h1>
        <p className="page-desc">
          For clinical queries, tool feedback, case consultations, or
          partnership enquiries. We aim to respond within one working day.
        </p>
      </div>

      <div className="contact-layout">
        {/* Info Panel */}
        <div className="contact-info-panel">
          <h3>Get in touch</h3>
          <p>
            Reach out to the TOP.Guide clinical team for any queries related to
            the decision framework, MOH guidelines, or specific case
            consultations.
          </p>

          {[
            {
              icon: "mail",
              label: "Clinical enquiries",
              value: "clinical@topguide.my",
            },
            { icon: "phone", label: "Support line", value: "+60 3-XXXX XXXX" },
            {
              icon: "location",
              label: "Based in",
              value: "Universiti Sains Islam Malaysia",
            },
            {
              icon: "clock",
              label: "Response time",
              value: "Within 1 working day",
            },
          ].map((d) => (
            <div className="contact-detail-row" key={d.label}>
              <div className="contact-detail-icon">
                <DetailIcon type={d.icon} />
              </div>
              <div>
                <div className="contact-detail-text">{d.value}</div>
                <div className="contact-detail-label">{d.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form className="contact-form-panel" ref={form} onSubmit={sendEmail}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                name="user_name"
                className="form-input"
                type="text"
                placeholder="Dr. Ahmad"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Hospital / Institution</label>
              <input
                name="hospital"
                className="form-input"
                type="text"
                placeholder="Hospital Kuala Lumpur"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                name="user_email"
                className="form-input"
                type="email"
                placeholder="doctor@hospital.my"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Department</label>
              <input
                name="department"
                className="form-input"
                type="text"
                placeholder="Obs & Gynae"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Subject</label>
            <select className="form-select" name="subject">
              <option>Clinical query</option>
              <option>Tool feedback</option>
              <option>Case consultation</option>
              <option>MOH criteria clarification</option>
              <option>Partnership or integration</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              className="form-textarea"
              placeholder="Describe your query or feedback in detail…"
              required
            />
          </div>

          <button className="btn-primary" type="submit">
            Send Message
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
        {/*end form */}
      </div>
    </div>
  );
}

function DetailIcon({ type }) {
  const d = {
    mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    phone:
      "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    location:
      "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
    clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  };
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d={d[type]} />
    </svg>
  );
}
