import type { Metadata } from 'next';
import Link from 'next/link';
import BlogGrid from './BlogGrid';

export const metadata: Metadata = {
  title: "Creator Earnings Blog – Tips, Guides & Strategies 2026",
  description: "Read the latest guides on maximizing your creator income. Expert tips on YouTube CPM, TikTok earnings, AdSense strategies, and freelance rates for 2026.",
  alternates: { canonical: "https://incomefromviews.com/blog/" },
  openGraph: {
    title: "Creator Earnings Blog – Tips, Guides & Strategies 2026",
    description: "Read the latest guides on maximizing your creator income. Expert tips on YouTube CPM, TikTok earnings, AdSense strategies, and freelance rates for 2026.",
    url: "https://incomefromviews.com/blog/",
    type: "website",
    images: [{ url: "https://incomefromviews.com/assets/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creator Earnings Blog – Tips, Guides & Strategies 2026",
    description: "Read the latest guides on maximizing your creator income. Expert tips on YouTube CPM, TikTok earnings, AdSense strategies, and freelance rates for 2026.",
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
      }
    },
    {
      "@type": "Blog",
      "@id": "https://incomefromviews.com/blog/#blog",
      "name": "IncomeFromViews Blog",
      "url": "https://incomefromviews.com/blog/",
      "description": "Guides and strategies for content creators to maximize their earnings.",
      "publisher": {
        "@id": "https://incomefromviews.com/#organization"
      }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge anim-1">📚 Knowledge Hub</div>
          <h1 className="hero-h1 anim-2">Creator Earnings <span className="grad">Blog</span></h1>
          <p className="hero-sub anim-3">In-depth guides, case studies, and strategies to help you make more money from your content in 2026.</p>
        </div>
      </section>

      <div className="container pb-80">
        {/* Featured Pillar Article */}
        <div className="featured-pillar card p-32 mb-48">
          <span className="blog-tag tag-red">ULTIMATE GUIDE</span>
          <h2>
            <Link href="/blog/how-to-earn-money-on-youtube/" className="text-decoration-none">
              How to Earn Money on YouTube in 2026 (Complete Beginner Guide)
            </Link>
          </h2>
          <p>
            The complete YouTube monetization blueprint covering RPM vs CPM, monetization requirements, highest paying niches, income streams, and realistic earning timelines.
          </p>
          <p className="small-muted">
            Part of our YouTube Earnings Series.
          </p>
          <br />
          <Link href="/blog/how-to-earn-money-on-youtube/" className="btn-primary" style={{ textDecoration: 'none' }}>
            Read Full Guide →
          </Link>
        </div>

        <BlogGrid />

        {/* Newsletter Widget */}
        <div className="newsletter-widget">
          <h2 className="newsletter-h2">Get the Latest Earning Tips</h2>
          <p className="newsletter-p">Join 10,000+ creators getting weekly advice on how to monetize their audience.</p>
          <div className="newsletter-input-group">
            <form action="#" method="POST" style={{ display: 'flex', width: '100%', gap: '12px' }}>
              <input type="email" placeholder="Enter your email" className="newsletter-input" required />
              <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap', margin: 0 }}>Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

