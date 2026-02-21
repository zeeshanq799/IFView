import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Terms of Use | IncomeFromViews",
  description: "Terms of Use for IncomeFromViews. Read our terms and conditions for using our website and calculators.",
  alternates: { canonical: "https://incomefromviews.com/terms/" },
  openGraph: {
    title: "Terms of Use | IncomeFromViews",
    description: "Terms of Use for IncomeFromViews. Read our terms and conditions for using our website and calculators.",
    url: "https://incomefromviews.com/terms/",
    type: "website",
    images: [{ url: "https://incomefromviews.com/assets/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use | IncomeFromViews",
    description: "Terms of Use for IncomeFromViews. Read our terms and conditions for using our website and calculators.",
    images: ["https://incomefromviews.com/assets/og-image.png"],
  },
};

export default function Page() {
  return (
    <div className="page-wrap">
      <h1 className="page-title">Terms of Use</h1>
      <p className="page-updated">Last updated: January 1, 2026</p>

      <div className="page-body">
        <p>Welcome to IncomeFromViews. By accessing and using this website, you accept and agree to be bound by the following terms and conditions. If you do not agree to these terms, please do not use our website.</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By using IncomeFromViews (incomefromviews.com), you agree to these Terms of Use and our Privacy Policy. We reserve the right to modify these terms at any time, and such modifications will be effective immediately upon posting.</p>

        <h2>2. Use of Calculators</h2>
        <p>Our calculators are provided for informational and educational purposes only. All results are estimates based on industry averages and publicly available data. You may use our calculators for personal, non-commercial purposes. You may not:</p>
        <ul>
          <li>Reproduce, republish, or redistribute our calculator tools without written permission</li>
          <li>Use our calculators to mislead or deceive others</li>
          <li>Attempt to reverse-engineer or copy our proprietary formulas and implementations</li>
          <li>Use automated tools to scrape or extract data from our website</li>
        </ul>

        <h2>3. Intellectual Property</h2>
        <p>All content on IncomeFromViews, including text, graphics, calculator designs, blog articles, and code, is the property of IncomeFromViews and is protected by applicable intellectual property laws. Our brand name, logo, and distinctive design elements are our trademarks.</p>

        <h2>4. Disclaimer of Warranties</h2>
        <p>Our website and calculators are provided "as is" without any warranties, express or implied. We do not warrant that our calculators will be accurate, error-free, or suitable for your specific situation. See our full Disclaimer for more details on the limitations of our earnings estimates.</p>

        <h2>5. Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, IncomeFromViews shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, our website or calculators. Our total liability shall not exceed $100.</p>

        <h2>6. Third-Party Links</h2>
        <p>Our website may contain links to third-party websites, including social media platforms, advertisers, and referenced resources. We are not responsible for the content, privacy practices, or accuracy of any third-party websites.</p>

        <h2>7. Advertising</h2>
        <p>IncomeFromViews displays advertisements through Google AdSense. Advertisers are responsible for the content of their advertisements. We do not endorse any products or services advertised on our site.</p>

        <h2>8. Governing Law</h2>
        <p>These Terms of Use shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.</p>

        <h2>9. Contact</h2>
        <p>Questions about our Terms of Use? Contact us at legal@incomefromviews.com or via our <Link href="/contact/">Contact page</Link>.</p>
      </div>
    </div>
  );
}
