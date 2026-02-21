import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Privacy Policy | IncomeFromViews",
  description: "Privacy Policy for IncomeFromViews. Learn how we collect, use, and protect your information.",
  alternates: { canonical: "https://incomefromviews.com/privacy-policy/" },
  openGraph: {
    title: "Privacy Policy | IncomeFromViews",
    description: "Privacy Policy for IncomeFromViews. Learn how we collect, use, and protect your information.",
    url: "https://incomefromviews.com/privacy-policy/",
    type: "website",
    images: [{ url: "https://incomefromviews.com/assets/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | IncomeFromViews",
    description: "Privacy Policy for IncomeFromViews. Learn how we collect, use, and protect your information.",
    images: ["https://incomefromviews.com/assets/og-image.png"],
  },
};

export default function Page() {
  return (
    <div className="page-wrap">
      <h1 className="page-title">Privacy Policy</h1>
      <p className="page-updated">Last updated: January 1, 2026</p>

      <div className="page-body">
        <p>At IncomeFromViews ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information when you visit our website at incomefromviews.com.</p>

        <h2>Information We Collect</h2>
        <p><strong>Information you provide:</strong> We may collect information you voluntarily provide, such as your name and email address when you contact us through our contact form.</p>
        <p><strong>Automatically collected information:</strong> When you visit our website, we automatically collect certain information, including your IP address, browser type, operating system, referring URLs, and pages visited. This information is collected through cookies and similar tracking technologies.</p>
        <p><strong>Calculator data:</strong> All calculator inputs you enter are processed entirely in your browser (client-side JavaScript). We do not collect, transmit, or store any financial data you enter into our calculators.</p>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>To respond to your inquiries and provide customer support</li>
          <li>To improve our website and calculators</li>
          <li>To analyze usage patterns and optimize user experience</li>
          <li>To display relevant advertisements through Google AdSense</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h2>Cookies and Tracking</h2>
        <p>We use cookies and similar technologies for the following purposes:</p>
        <ul>
          <li><strong>Analytics:</strong> We use Google Analytics to understand how visitors use our site. This data is anonymized and aggregated.</li>
          <li><strong>Advertising:</strong> We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to our website and other websites on the internet.</li>
          <li><strong>Preferences:</strong> We may store your theme preference (light/dark mode) in your browser's local storage.</li>
        </ul>
        <p>You can control cookies through your browser settings. Note that disabling cookies may affect some website functionality.</p>

        <h2>Third-Party Services</h2>
        <p>Our website uses the following third-party services:</p>
        <ul>
          <li><strong>Google Analytics:</strong> For website analytics. See Google's Privacy Policy at policies.google.com/privacy</li>
          <li><strong>Google AdSense:</strong> For displaying advertisements. See Google's Privacy Policy for ad personalization options.</li>
          <li><strong>Google Fonts:</strong> For typography. Google may log font requests. See Google's Privacy Policy.</li>
        </ul>

        <h2>Data Retention</h2>
        <p>We retain contact form submissions for up to 12 months. Analytics data is retained according to Google Analytics' default retention settings. We do not store any calculator input data.</p>

        <h2>Your Rights</h2>
        <p>Depending on your location, you may have the following rights regarding your personal data:</p>
        <ul>
          <li>The right to access, correct, or delete your personal information</li>
          <li>The right to object to or restrict our processing of your data</li>
          <li>The right to data portability</li>
          <li>The right to withdraw consent at any time</li>
        </ul>
        <p>To exercise these rights, please contact us at privacy@incomefromviews.com.</p>

        <h2>Children's Privacy</h2>
        <p>Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected information from a child, please contact us immediately.</p>

        <h2>Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Last updated" date at the top of this page. Your continued use of our website constitutes acceptance of the updated policy.</p>

        <h2>Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us at privacy@incomefromviews.com or visit our <Link href="/contact/">Contact page</Link>.</p>
      </div>
    </div>
  );
}
