import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Disclaimer | IncomeFromViews",
  description: "Disclaimer for IncomeFromViews. All earnings figures are estimates. Actual results may vary.",
  alternates: { canonical: "https://incomefromviews.com/disclaimer/" },
  openGraph: {
    title: "Disclaimer | IncomeFromViews",
    description: "Disclaimer for IncomeFromViews. All earnings figures are estimates. Actual results may vary.",
    url: "https://incomefromviews.com/disclaimer/",
    type: "website",
    images: [{ url: "https://incomefromviews.com/assets/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Disclaimer | IncomeFromViews",
    description: "Disclaimer for IncomeFromViews. All earnings figures are estimates. Actual results may vary.",
    images: ["https://incomefromviews.com/assets/og-image.png"],
  },
};

export default function Page() {
  return (
    <div className="page-wrap">
      <h1 className="page-title">Disclaimer</h1>
      <p className="page-updated">Last updated: January 1, 2026</p>

      <div className="page-body">
        <div className="alert-warning">
          <h3 className="alert-title">⚠️ Important Notice</h3>
          <p className="alert-text">All earnings figures shown by IncomeFromViews calculators are <strong>estimates only</strong>. Actual creator earnings vary significantly and can differ substantially from our estimates. Do not make financial decisions based solely on these figures.</p>
        </div>

        <h2>Earnings Estimates</h2>
        <p>The calculations provided by IncomeFromViews are based on:</p>
        <ul>
          <li>Industry-average CPM and RPM rates reported by creators in public forums and research</li>
          <li>Platform-published information about revenue sharing structures</li>
          <li>Regional advertising market data</li>
          <li>Simplified mathematical formulas that cannot capture all real-world variables</li>
        </ul>
        <p><strong>Actual earnings depend on many factors we cannot calculate</strong>, including but not limited to:</p>
        <ul>
          <li>Your specific audience demographics, interests, and purchasing behavior</li>
          <li>Ad inventory availability in your viewers' location</li>
          <li>Your content type and advertiser demand in your niche</li>
          <li>Platform algorithm changes and policy updates</li>
          <li>Seasonal advertising fluctuations (Q4 typically pays much more than Q1)</li>
          <li>Your viewers' use of ad-blocking software</li>
          <li>Brand safety classifications applied to your content</li>
          <li>Platform-specific monetization eligibility requirements</li>
        </ul>

        <h2>No Financial Advice</h2>
        <p>Nothing on IncomeFromViews constitutes financial, investment, tax, or legal advice. Our calculators are educational tools only. Before making any financial decisions related to your creator business, please consult with a qualified financial advisor, accountant, or attorney.</p>

        <h2>Tax Estimates</h2>
        <p>Any tax calculations shown are rough estimates based on user-inputted tax rates. Actual tax obligations vary significantly by country, state/province, income level, business structure, and available deductions. Always consult a tax professional for advice specific to your situation.</p>

        <h2>Platform Policy Changes</h2>
        <p>YouTube, TikTok, Instagram, Google, and other platforms frequently update their monetization policies, revenue sharing structures, and eligibility requirements. Our calculators may not immediately reflect these changes. Always check the official platform documentation for the most current information.</p>

        <h2>Affiliate Relationships</h2>
        <p>Some links on IncomeFromViews may be affiliate links. If you click on an affiliate link and make a purchase, we may receive a small commission at no additional cost to you. We only recommend products and services we believe are genuinely useful for creators.</p>

        <h2>Accuracy</h2>
        <p>While we strive to keep our formulas and reference data accurate and up-to-date, we cannot guarantee the accuracy, completeness, or timeliness of any information on this website. If you discover an error, please contact us at hello@incomefromviews.com.</p>
      </div>
    </div>
  );
}
