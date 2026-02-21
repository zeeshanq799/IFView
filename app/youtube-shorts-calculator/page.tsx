import type { Metadata } from 'next';
import Link from 'next/link';
import YoutubeShortsCalculator from './YoutubeShortsCalculator';
import FaqSection from '../components/FaqSection';
import AuthorBox from '../components/AuthorBox';
import RelatedCalculators from '../components/RelatedCalculators';
import Disclaimer from '../components/Disclaimer';

export const metadata: Metadata = {
  title: "YouTube Shorts Earnings Calculator 2026 (Real Shorts RPM Data)",
  description: "Calculate how much YouTube Shorts pay in 2026. See real Shorts RPM, revenue per 1,000 views, and compare Shorts vs long-form earnings instantly.",
  alternates: { canonical: "https://incomefromviews.com/youtube-shorts-calculator/" },
  openGraph: {
    title: "YouTube Shorts Earnings Calculator 2026 (Real Shorts RPM Data)",
    description: "Calculate how much YouTube Shorts pay in 2026. See real Shorts RPM, revenue per 1,000 views, and compare Shorts vs long-form earnings.",
    url: "https://incomefromviews.com/youtube-shorts-calculator/",
    type: "website",
    images: [{ url: "https://incomefromviews.com/assets/og-image.png", width: 1200, height: 630 }],
    siteName: "IncomeFromViews",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Shorts Earnings Calculator 2026 (Real Shorts RPM Data)",
    description: "Calculate how much YouTube Shorts pay. Real Shorts RPM data, revenue per 1,000 views, instant Shorts vs long-form comparison.",
    images: ["https://incomefromviews.com/assets/og-image.png"],
  },
};

const jsonLdInfo = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "YouTube Shorts Earnings Calculator 2026",
    "url": "https://incomefromviews.com/youtube-shorts-calculator/",
    "description": "Calculate YouTube Shorts revenue using RPM, views, and audience geography. Compare Shorts vs long-form earnings.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Organization", "name": "IncomeFromViews" }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://incomefromviews.com/" },
      { "@type": "ListItem", "position": 2, "name": "YouTube Shorts Calculator", "item": "https://incomefromviews.com/youtube-shorts-calculator/" }
    ]
  }
];

const faqs = [
  {
    question: "How much does YouTube pay for Shorts per 1,000 views in 2026?",
    answer: "YouTube Shorts typically pay between $0.01 and $0.10 per 1,000 views, with most creators earning around $0.03–$0.05 RPM. Tier 1 countries (USA, UK, Canada) see higher RPM, occasionally reaching $0.15 for high-value niches like finance or tech."
  },
  {
    question: "What is YouTube Shorts RPM in 2026?",
    answer: "YouTube Shorts RPM (Revenue Per Mille) in 2026 ranges from $0.01 to $0.15 depending on audience geography and niche. Average Shorts RPM is approximately $0.03–$0.05 globally. This represents revenue after YouTube's platform cut."
  },
  {
    question: "Why do YouTube Shorts earn less than long-form videos?",
    answer: "Shorts earn less because YouTube uses a revenue pooling model instead of direct ad placements. All Shorts ad revenue goes into a pool and is distributed based on your share of total Shorts views. Additionally, Shorts have shorter watch time."
  },
  {
    question: "Do Shorts views count toward monetization?",
    answer: "Yes. Shorts views count toward the 10 million public Shorts views requirement for YouTube Partner Program eligibility. However, Shorts watch time does not count toward the 4,000 hours needed for long-form monetization."
  },
  {
    question: "Can I monetize Shorts without 1,000 subscribers?",
    answer: "No. You still need 1,000 subscribers to join the YouTube Partner Program. Once eligible, you can monetize both Shorts and long-form content under the same channel monetization."
  },
  {
    question: "What affects Shorts RPM?",
    answer: "Shorts RPM is influenced by viewer geography (Tier 1 countries pay more), content niche (finance/tech typically higher), and overall advertiser demand."
  },
  {
    question: "How many Shorts views do I need to make $1,000?",
    answer: "At an average Shorts RPM of $0.05, you would need approximately 20 million views to earn $1,000. This is significantly higher than long-form content, where you'd need only 250,000-500,000 views to earn the same amount."
  },
  {
    question: "How accurate is this Shorts calculator?",
    answer: "Results are estimates based on industry-reported Shorts RPM benchmarks. Actual earnings depend on your specific audience demographics, geographic distribution, and niche."
  }
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdInfo) }} />
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge anim-1">📱 Shorts Revenue Estimator</div>
          <h1 className="hero-h1 anim-2">
            <svg width="48" height="34" viewBox="0 0 48 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-icon">
              <rect width="48" height="34" rx="8" fill="#FF0000" />
              <path d="M32 17L19 24.5V9.5L32 17Z" fill="white" />
            </svg>
            How Much Does YouTube Shorts Pay in 2026? <br />
            <span className="grad">YouTube Shorts Calculator 2026</span>
          </h1>
          <div className="page-updated anim-3">Last Updated: February 2026</div>
          <p className="hero-sub anim-4" style={{ maxWidth: 950 }}>
            YouTube Shorts typically pay between $0.01 and $0.10 per 1,000 views &mdash; significantly lower than long-form content. Calculate your estimated Shorts revenue instantly with our YouTube Shorts Calculator 2026 using real RPM data and audience geography.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="calc-section" id="youtube">
          <YoutubeShortsCalculator />
          <div className="faq-wrap" style={{ marginTop: 40, padding: 24, background: "var(--surface)", borderRadius: 16 }}>
            <div className="faq-head" style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 16 }}>Frequently Asked Questions</div>
            <FaqSection items={faqs} />
          </div>
        </div>

        <div className="container" style={{ paddingTop: 60 }}>
          <p style={{ textAlign: "center", maxWidth: 800, margin: "0 auto 40px", fontSize: "1.05rem", color: "var(--text-500)", lineHeight: 1.6 }}>
            The YouTube Shorts Calculator helps you estimate realistic earnings from short-form content based on daily views, RPM, and audience geography. Shorts pay significantly less per view than long-form content, but can accumulate views much faster.
          </p>
        </div>

        <article className="content-section">
          <h2>How Much Do YouTube Shorts Pay Per 1,000 Views?</h2>
          <p>On average, YouTube Shorts RPM ranges between <strong>$0.01 and $0.10 per 1,000 views</strong>, depending on viewer country, audience demographics, and advertiser demand. Compared to long-form videos, Shorts typically earn significantly lower ad revenue per view.</p>
          <p>This happens because Shorts use a revenue pooling system. YouTube collects all Shorts ad revenue and distributes it based on your share of total Shorts views across the platform. Long-form videos, in contrast, place ads directly in your content, resulting in 20-80x higher RPM.</p>

          <div className="highlight-box">
            <h3 className="mt-0">💡 Real Shorts Example</h3>
            <p><strong>Scenario:</strong> Tech Shorts channel with 500,000 daily views, $0.05 RPM, US-based audience</p>
            <p><strong>Step 1: Calculate Monthly Views</strong><br />500,000 views &times; 30 days = <strong>15 million views per month</strong></p>
            <p><strong>Step 2: Calculate Monthly Revenue</strong><br />Formula: (Monthly Views / 1,000) &times; RPM<br />(15,000,000 / 1,000) &times; $0.05 = <strong>$750 per month</strong></p>
            <p className="mb-0"><strong>Comparison with Long-Form:</strong><br />Same 500K daily views with long-form at $4.00 RPM = <strong>$60,000 per month</strong><br />That&apos;s 80x more revenue from the same view count.</p>
          </div>

          <h2>Shorts vs Long-Form: Revenue Comparison</h2>
          <p>Understanding the difference between Shorts and long-form earnings helps you make strategic content decisions.</p>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Content Type</th>
                  <th>Typical RPM</th>
                  <th>Revenue Per 1M Views</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>YouTube Shorts</strong></td><td>$0.01 - $0.10</td><td>$10 - $100</td></tr>
                <tr><td><strong>Long-Form Videos</strong></td><td>$2.00 - $12.00</td><td>$2,000 - $12,000</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Shorts RPM by Country (2026)</h2>
          <p>Your Shorts earnings heavily depend on where your viewers are located. Here&apos;s how geography impacts Shorts RPM:</p>
          <div className="table-responsive">
            <table className="data-table">
              <caption>Average YouTube Shorts RPM Rates by Country (2026)</caption>
              <thead>
                <tr>
                  <th>Country / Region</th>
                  <th>Shorts RPM Range</th>
                  <th>Revenue Per 1M Views</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>United States 🇺🇸</strong></td><td>$0.06 - $0.15</td><td>$60 - $150</td></tr>
                <tr><td><strong>United Kingdom 🇬🇧</strong></td><td>$0.05 - $0.12</td><td>$50 - $120</td></tr>
                <tr><td><strong>Canada 🇨🇦</strong></td><td>$0.04 - $0.10</td><td>$40 - $100</td></tr>
                <tr><td><strong>Australia 🇦🇺</strong></td><td>$0.04 - $0.10</td><td>$40 - $100</td></tr>
                <tr><td><strong>Germany 🇩🇪</strong></td><td>$0.03 - $0.08</td><td>$30 - $80</td></tr>
                <tr><td><strong>India 🇮🇳</strong></td><td>$0.01 - $0.03</td><td>$10 - $30</td></tr>
                <tr><td><strong>Brazil 🇧🇷</strong></td><td>$0.02 - $0.05</td><td>$20 - $50</td></tr>
                <tr><td><strong>Philippines 🇵🇭</strong></td><td>$0.01 - $0.04</td><td>$10 - $40</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Why Shorts Pay So Much Less</h2>
          <p>Three fundamental differences explain the massive RPM gap between Shorts and long-form content:</p>
          <ol>
            <li><strong>Revenue Pooling System:</strong> Unlike long-form videos where ads appear directly in your content, Shorts revenue is pooled together and distributed based on your share of total Shorts views platform-wide. This dramatically reduces per-view earnings.</li>
            <li><strong>Watch Time Value:</strong> A 30-second Short generates far less ad inventory than a 10-minute video with multiple mid-roll ads. Advertisers pay based on attention and engagement, making longer content more valuable.</li>
            <li><strong>Lower Ad Inventory:</strong> Shorts can only show ads between videos in the feed, not within the content itself. This limits monetization opportunities compared to long-form videos with pre-roll, mid-roll, and post-roll ad placements.</li>
          </ol>

          <h2>When to Focus on Shorts</h2>
          <p>Despite lower RPM, Shorts serve specific strategic purposes:</p>
          <ul>
            <li><strong>Channel Growth:</strong> Shorts help new channels reach 1,000 subscribers faster. They&apos;re easier to produce and get distributed more aggressively by the algorithm.</li>
            <li><strong>Content Testing:</strong> Test video concepts quickly. If a Short performs well, expand it into long-form content where RPM is 20-50x higher.</li>
            <li><strong>Traffic Funnel:</strong> Use Shorts to drive viewers to your long-form content, affiliate links, or digital products where margins are higher.</li>
            <li><strong>Volume Strategy:</strong> If you can produce 5-10 Shorts per day, the accumulated views can still generate meaningful revenue at scale.</li>
          </ul>

          <h2>Shorts Monetization Requirements</h2>
          <p>To monetize Shorts through the YouTube Partner Program in 2026, you need:</p>
          <ul>
            <li><strong>1,000 subscribers</strong> AND</li>
            <li><strong>10 million public Shorts views</strong> in the past 90 days OR</li>
            <li><strong>4,000 watch hours</strong> from long-form content in the past 12 months</li>
          </ul>
          <p>Once approved, both Shorts and long-form videos are monetized under the same partnership. Note that Shorts views count toward the 10 million view threshold, but Shorts watch time does <strong>not</strong> count toward the 4,000-hour requirement for long-form monetization.</p>

          <h2>Maximize Your Shorts Revenue</h2>
          <p>While you can&apos;t dramatically increase Shorts RPM, you can optimize for better results:</p>
          <ul>
            <li><strong>Target Tier 1 Audiences:</strong> Create content in English for US/UK/Canada viewers. This can double or triple your RPM compared to developing markets.</li>
            <li><strong>Focus on High-Value Niches:</strong> Finance, tech, and business Shorts tend to have higher RPM than entertainment or lifestyle content.</li>
            <li><strong>Diversify Beyond Ads:</strong> Use Shorts as a funnel to affiliate links, sponsorships, or digital products. Most successful Shorts creators earn 70%+ of income from non-ad sources.</li>
            <li><strong>Combine with Long-Form:</strong> Use Shorts for discovery and growth, then convert viewers to long-form content where you earn 30-80x more per view.</li>
          </ul>

          <AuthorBox />

          <Disclaimer>This calculator provides estimates based on industry-reported Shorts RPM benchmarks and platform revenue models. Actual YouTube Shorts earnings vary significantly based on content niche, viewer geography, advertiser demand, and seasonal fluctuations. Results should be used for planning purposes only.</Disclaimer>

          <RelatedCalculators links={[{"link":"/youtube-earnings-calculator/","icon":"📊","name":"YouTube\r\n                    Earnings"},{"link":"/youtube-rpm-calculator/","icon":"📉","name":"RPM\r\n                    Calculator"},{"link":"/youtube-cpm-calculator/","icon":"📈","name":"CPM\r\n                    Calculator"},{"link":"/tiktok-earnings-calculator/","icon":"🎵","name":"TikTok\r\n                    Calculator"}]} />
        </article>
      </div>
    </>
  );
}
