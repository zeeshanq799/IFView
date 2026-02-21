import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: "Contact Us | IncomeFromViews",
  description: "Contact IncomeFromViews. Have a question, feedback, or bug report? Get in touch with our team.",
  alternates: { canonical: "https://incomefromviews.com/contact/" },
  openGraph: {
    title: "Contact Us | IncomeFromViews",
    description: "Contact IncomeFromViews. Have a question, feedback, or bug report? Get in touch with our team.",
    url: "https://incomefromviews.com/contact/",
    type: "website",
    images: [{ url: "https://incomefromviews.com/assets/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | IncomeFromViews",
    description: "Contact IncomeFromViews. Have a question, feedback, or bug report? Get in touch with our team.",
    images: ["https://incomefromviews.com/assets/og-image.png"],
  },
};

export default function Page() {
  return (
    <div className="page-wrap">
      <div className="hero-badge anim-1">✉️ Get In Touch</div>
      <h1 className="page-title anim-2">Contact Us</h1>
      <p className="page-lead">
        Have a question, feedback, or want to report a bug? We'd love to hear from you.
      </p>

      <div className="contact-grid">
        <div>
          <div className="contact-info-item">
            <div className="contact-icon-wrap bg-blue-l">📧</div>
            <div>
              <h4>Email Us</h4>
              <p>hello@incomefromviews.com<br />We reply within 24–48 hours</p>
            </div>
          </div>
          <div className="contact-info-item">
            <div className="contact-icon-wrap bg-green-l">🐛</div>
            <div>
              <h4>Report a Bug</h4>
              <p>Found a calculation error? Let us know and we'll fix it within 24 hours.</p>
            </div>
          </div>
          <div className="contact-info-item">
            <div className="contact-icon-wrap bg-purple-l">💡</div>
            <div>
              <h4>Feature Requests</h4>
              <p>Want a new calculator or feature? We prioritize requests from our community.</p>
            </div>
          </div>
          <div className="contact-info-item">
            <div className="contact-icon-wrap bg-orange-l">🤝</div>
            <div>
              <h4>Partnerships</h4>
              <p>Interested in advertising or collaboration? Reach out at partnerships@incomefromviews.com</p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
