import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "About Us | IncomeFromViews",
  description: "About IncomeFromViews — We help content creators, bloggers, and freelancers maximize their online income with free, accurate earnings calculators.",
  alternates: { canonical: "https://incomefromviews.com/about/" },
  openGraph: {
    title: "About Us | IncomeFromViews",
    description: "About IncomeFromViews — We help content creators, bloggers, and freelancers maximize their online income with free, accurate earnings calculators.",
    url: "https://incomefromviews.com/about/",
    type: "website",
    images: [{ url: "https://incomefromviews.com/assets/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | IncomeFromViews",
    description: "About IncomeFromViews — We help content creators, bloggers, and freelancers maximize their online income with free, accurate earnings calculators.",
    images: ["https://incomefromviews.com/assets/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://incomefromviews.com/#organization",
      "name": "IncomeFromViews",
      "url": "https://incomefromviews.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://incomefromviews.com/logo.svg"
      },
      "founder": {
        "@type": "Person",
        "@id": "https://incomefromviews.com/about/#person",
        "name": "Zeeshan"
      },
      "description": "IncomeFromViews provides free creator earnings calculators and monetization research for YouTube, TikTok, Instagram, AdSense, affiliate marketing, and freelancing.",
      "sameAs": []
    },
    {
      "@type": "Person",
      "@id": "https://incomefromviews.com/about/#person",
      "name": "Zeeshan",
      "url": "https://incomefromviews.com/about/",
      "worksFor": {
        "@id": "https://incomefromviews.com/#organization"
      }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="page-wrap">
        <div className="hero-badge anim-1">🏢 About Us</div>
        <h1 className="page-title anim-2">About IncomeFromViews</h1>
        <p className="page-lead page-updated">
          We help content creators, bloggers, and freelancers understand and maximize their online income with free, accurate, easy-to-use calculators.
        </p>

        <div className="card p-32 mb-40">
          <h2 className="card-h3">About the Founder</h2>
          <p><strong>Zeeshan</strong> is the founder of IncomeFromViews and focuses on creator monetization research, RPM benchmarks, and digital income analytics.</p>
          <p>He analyzes publicly available platform documentation, advertiser trends, and industry averages to help creators understand realistic earning potential across YouTube, TikTok, and other platforms.</p>
        </div>

        <div className="grid-2-col gap-24 mb-48">
          <div className="card feature-card">
            <div className="feature-icon">🎯</div>
            <h3 className="feature-title">Our Mission</h3>
            <p className="feature-text">To give every creator — whether you have 1,000 or 10 million subscribers — access to the same financial clarity that was previously only available to large media companies.</p>
          </div>
          <div className="card feature-card">
            <div className="feature-icon">💡</div>
            <h3 className="feature-title">Why We Built This</h3>
            <p className="feature-text">We were frustrated by vague earnings estimates online. We built IncomeFromViews to use real industry formulas, real country CPM data, and transparent calculations you can verify yourself.</p>
          </div>
          <div className="card feature-card">
            <div className="feature-icon">🆓</div>
            <h3 className="feature-title">Always Free</h3>
            <p className="feature-text">All 8 calculators are completely free to use. No account, no credit card, no paywall. We're supported by tasteful, non-intrusive advertising.</p>
          </div>
          <div className="card feature-card">
            <div className="feature-icon">🔬</div>
            <h3 className="feature-title">Research-Backed</h3>
            <p className="feature-text">Our formulas are based on publicly available data, creator community research, and industry reports. We update our country CPM data regularly to stay accurate.</p>
          </div>
        </div>

        <div className="card p-32 mb-40">
          <h2 className="card-h3">Our 8 Free Calculators</h2>
          <div className="calc-grid-small">
            <Link href="/youtube-earnings-calculator/" className="calc-link"><span>▶</span>YouTube Earnings</Link>
            <Link href="/youtube-cpm-calculator/" className="calc-link"><span>📊</span>CPM Calculator</Link>
            <Link href="/youtube-rpm-calculator/" className="calc-link"><span>📈</span>RPM Calculator</Link>
            <Link href="/tiktok-earnings-calculator/" className="calc-link"><span>♪</span>TikTok Earnings</Link>
            <Link href="/instagram-earnings-calculator/" className="calc-link"><span>◈</span>Instagram Earnings</Link>
            <Link href="/adsense-revenue-calculator/" className="calc-link"><span>$</span>AdSense Revenue</Link>
            <Link href="/affiliate-earnings-calculator/" className="calc-link"><span>🔗</span>Affiliate Earnings</Link>
            <Link href="/freelance-income-calculator/" className="calc-link"><span>⚡</span>Freelance Income</Link>
          </div>
        </div>

        <div className="card p-32">
          <h2 className="card-h3">Disclaimer on Accuracy</h2>
          <p className="feature-text">
            All calculators on IncomeFromViews produce <strong className="text-900">estimates based on industry averages</strong>. Actual creator earnings vary significantly based on audience demographics, ad inventory, niche, content type, and platform algorithm changes. Always cross-reference with your actual platform analytics. See our full <Link href="/disclaimer/" className="text-blue">Disclaimer</Link> for more.
          </p>
        </div>
      </div>
    </>
  );
}
