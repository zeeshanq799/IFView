import type { Metadata } from 'next';
import FreelanceIncomeCalculator from './FreelanceIncomeCalculator';
import FaqSection from '../components/FaqSection';
import Link from 'next/link';
import AuthorBox from '../components/AuthorBox';
import RelatedCalculators from '../components/RelatedCalculators';
import Disclaimer from '../components/Disclaimer';

export const metadata: Metadata = {
  title: "Freelance Income Calculator 2026 – Hourly to Yearly",
  description: "Find out your true freelance take-home pay in 2026. Use our free freelance income calculator to estimate monthly and yearly income after taxes, business expenses, and overhead instantly.",
  alternates: { canonical: "https://incomefromviews.com/freelance-income-calculator/" },
  openGraph: {
    title: "Freelance Income Calculator 2026 – Hourly to Yearly",
    description: "Find out your true freelance take-home pay in 2026. Use our free freelance income calculator to estimate monthly and yearly income after taxes, business expenses, and overhead instantly.",
    url: "https://incomefromviews.com/freelance-income-calculator/",
    type: "website",
    images: [{ url: "https://incomefromviews.com/assets/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance Income Calculator 2026 – Hourly to Yearly",
    description: "Find out your true freelance take-home pay in 2026. Use our free freelance income calculator to estimate monthly and yearly income after taxes, business expenses, and overhead instantly.",
    images: ["https://incomefromviews.com/assets/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Freelance Income Calculator 2026",
      "url": "https://incomefromviews.com/freelance-income-calculator/",
      "description": "Professional tool to calculate freelance net income, factoring in overhead, taxes, and billable hours.",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "browserRequirements": "Requires JavaScript enabled",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "author": {
        "@type": "Organization",
        "name": "IncomeFromViews"
      },
      "creator": {
        "@type": "Organization",
        "name": "IncomeFromViews"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://incomefromviews.com/" },
        { "@type": "ListItem", "position": 2, "name": "Freelance Income Calculator", "item": "https://incomefromviews.com/freelance-income-calculator/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "how many hours should I bill as a freelancer?",
          "acceptedAnswer": { "@type": "Answer", "text": "Most full-time freelancers can only bill 20-30 hours per week. The rest of the time is spent on admin, marketing, and sales (unpaid work)." }
        },
        {
          "@type": "Question",
          "name": "How much should I save for taxes?",
          "acceptedAnswer": { "@type": "Answer", "text": "In the US, you should set aside 25-30% of your gross income for self-employment tax (15.3%) and income tax." }
        },
        {
          "@type": "Question",
          "name": "What expenses can I deduct?",
          "acceptedAnswer": { "@type": "Answer", "text": "Common deductions include software subscriptions, home office portion of rent/internet, hardware, and professional development courses." }
        }
      ]
    }
  ]
};

export default function Page() {
  const faqItems = [
    { question: "How many hours should I bill as a freelancer?", answer: "Most full-time freelancers can only bill 20-30 hours per week. The rest of the time is spent on admin, marketing, and sales (unpaid work)." },
    { question: "How much should I save for taxes?", answer: "In the US, you should set aside 25-30% of your gross income for self-employment tax (15.3%) and income tax." },
    { question: "What expenses can I deduct?", answer: "Common deductions include software subscriptions, home office portion of rent/internet, hardware, and professional development courses." }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge anim-1">💻 Freelance Rate Map</div>
          <h1 className="hero-h1 anim-2">
            <svg width="54" height="54" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-icon">
              <defs>
                <linearGradient id="flGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#22c55e" />
                  <stop offset="1" stopColor="#14b8a6" />
                </linearGradient>
              </defs>
              <rect width="24" height="24" rx="6" fill="url(#flGrad)" />
              <path d="M7 2V13H10V22L17 10H13L17 2H7Z" fill="white" />
            </svg>
            Freelance Income <span className="grad">Calculator 2026</span>
          </h1>
          <div className="page-updated anim-3">Last Updated: February 2026</div>
          <p className="hero-sub anim-4">Determine your real take-home pay by factoring in taxes, expenses, and non-billable hours.</p>
        </div>
      </section>

      <div className="container">
        <FreelanceIncomeCalculator />
      </div>

      <div className="container" style={{ paddingTop: '60px' }}>
        <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px', fontSize: '1.05rem', color: 'var(--text-500)', lineHeight: 1.6 }}>
          The Freelance Income Calculator below helps you estimate your true take-home pay by factoring in taxes, business
          expenses, and non-billable hours. This tool provides accurate 2026 projections for independent contractors and
          freelancers.
        </p>
      </div>

      <div className="container">
        <article className="content-section">
          <h2>Step-by-Step Freelance Income Case Studies</h2>
          <p>How much you "Take Home" depends heavily on your niche and client base. Let's compare two common freelance
            scenarios in 2026 to see how expenses and taxes impact the bottom line.</p>

          <div className="highlight-box">
            <h3 className="mt-0">💻 Scenario 1: Senior Software Developer</h3>
            <p><strong>Input:</strong> $120/hour, 30 billable hours/week, $1,000 monthly expenses, 30% tax rate.</p>

            <p><strong>Gross Yearly:</strong> $120 × 30 × 50 weeks = $180,000<br />
              <strong>Net After Expenses:</strong> $180,000 - $12,000 = $168,000<br />
              <strong>Net After Tax:</strong> $168,000 × 0.70 = <strong>$117,600 Take-Home</strong>
            </p>
          </div>

          <div className="highlight-box">
            <h3 className="mt-0">✍️ Scenario 2: Content Writer</h3>
            <p><strong>Input:</strong> $45/hour, 25 billable hours/week, $200 monthly expenses, 15% tax rate (Lower
              bracket).</p>

            <p><strong>Gross Yearly:</strong> $45 × 25 × 50 weeks = $56,250<br />
              <strong>Net After Expenses:</strong> $56,250 - $2,400 = $53,850<br />
              <strong>Net After Tax:</strong> $53,850 × 0.85 = <strong>$45,772 Take-Home</strong>
            </p>
          </div>

          <p className="mb-0"><em>The developer earns more, but also pays significantly more in taxes and overhead. Use our <Link
            href="/adsense-revenue-calculator/">AdSense Calculator</Link> to see if starting a blog is more profitable
            than trading your hours for dollars.</em></p>

          <h2>Hourly Rate vs. Project-Based Pricing</h2>
          <p>In 2026, the most successful freelancers have moved away from hourly billing. Here is why project-based pricing
            usually results in a higher "True Hourly Rate":</p>

          <div className="table-responsive">
            <table className="data-table">
              <caption>Hourly vs Project-Based Pricing Comparison</caption>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Hourly Billing</th>
                  <th>Project-Based Pay</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Incentive</strong></td>
                  <td>Work slower (more hours)</td>
                  <td>Work faster (efficiency)</td>
                </tr>
                <tr>
                  <td><strong>Income Cap</strong></td>
                  <td>Hard cap (24 hours in a day)</td>
                  <td>No cap (Scalable value)</td>
                </tr>
                <tr>
                  <td><strong>Client Focus</strong></td>
                  <td>Cost management</td>
                  <td>ROI &amp; Value delivered</td>
                </tr>
                <tr>
                  <td><strong>Predictability</strong></td>
                  <td>Variable</td>
                  <td>Fixed &amp; Stable</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>If you are tired of tracking every minute, we recommend calculating your potential from other streams. For
            example, see how much you could earn by promoting products with our <Link
              href="/affiliate-earnings-calculator/">Affiliate Calculator</Link> or building a following on <Link
                href="/tiktok-earnings-calculator/">TikTok</Link>.</p>

          <h2>Understanding Your True Freelance Rate</h2>
          <p>Many new freelancers make the mistake of thinking $50/hour equals $50 in their pocket. In reality, after taxes,
            unpaid admin time, and business expenses, that number is often 30-40% lower.</p>

          <h3>Real Hourly Rate Calculation</h3>
          <div className="table-responsive">
            <table className="data-table">
              <caption>Freelance Net Hourly Rate Calculation Breakdown (2026)</caption>
              <thead>
                <tr>
                  <th>Factor</th>
                  <th>Impact</th>
                  <th>Example ($100/hr)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Taxes</strong></td>
                  <td>-25% to -30%</td>
                  <td>-$30.00</td>
                </tr>
                <tr>
                  <td><strong>Overhead</strong></td>
                  <td>-10% to -20%</td>
                  <td>-$15.00</td>
                </tr>
                <tr>
                  <td><strong>Unbillable Hours</strong></td>
                  <td>-20% (Admin/Sales)</td>
                  <td>-$20.00</td>
                </tr>
                <tr>
                  <td className="t-high"><strong>Net Profit</strong></td>
                  <td className="t-high">Take-Home Pay</td>
                  <td className="t-high">$35.00 / hr</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>How to Set Your Rates</h2>
          <ul>
            <li><strong>Cost-Based:</strong> Calculate your personal expenses + business costs + desired savings. Divide by
              billable hours.</li>
            <li><strong>Value-Based:</strong> Charge based on the value you provide to the client (e.g., if you make them
              $10k, charge $2k). Compare this to premium <Link href="/instagram-earnings-calculator/">Instagram sponsorship
                rates</Link>.</li>
          </ul>

          <h2>Freelance Industry Benchmarks (2026 Estimates)</h2>
          <p>Rates vary wildly by experience and niche. Here is a breakdown of what "Mid-Level" freelancers in the United
            States and Europe are typically charging in 2026:</p>

          <div className="table-responsive">
            <table className="data-table">
              <caption>Average Freelance Hourly Rates by Industry (2026)</caption>
              <thead>
                <tr>
                  <th>Industry</th>
                  <th>Avg. Hourly Rate</th>
                  <th>Market Demand</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Full-Stack Web Dev</strong></td>
                  <td>$75 - $150 / hr</td>
                  <td>High (Specialized)</td>
                </tr>
                <tr>
                  <td><strong>Graphic / UI Design</strong></td>
                  <td>$50 - $120 / hr</td>
                  <td>Medium (AI competition)</td>
                </tr>
                <tr>
                  <td><strong>Copywriting / Content</strong></td>
                  <td>$40 - $100 / hr</td>
                  <td>High (Human-quality)</td>
                </tr>
                <tr>
                  <td><strong>Digital Marketing</strong></td>
                  <td>$60 - $130 / hr</td>
                  <td>Medium (Ads/Strategy)</td>
                </tr>
                <tr>
                  <td><strong>Virtual Assistant</strong></td>
                  <td>$20 - $45 / hr</td>
                  <td>Low (Automation heavy)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Smart Tax Deductions for Freelancers</h2>
          <p>Lowering your taxable income is just as important as raising your rates. In 2026, most freelancers can deduct
            the following business expenses to increase their take-home pay:</p>
          <ul>
            <li><strong>Home Office Deduction:</strong> If you work from home, you can usually deduct a portion of your
              rent/mortgage and utilities.</li>
            <li><strong>Software &amp; Subscriptions:</strong> Tools like Adobe Creative Cloud, Slack, and even your hosting
              fees for <Link href="/adsense-revenue-calculator/">monetized blogs</Link> are deductible.</li>
            <li><strong>Marketing &amp; Ads:</strong> Any money spent on LinkedIn Premium, portfolio sites, or even <Link
              href="/instagram-earnings-calculator/">promoting your Instagram brand</Link> counts as a business expense.
            </li>
            <li><strong>Professional Development:</strong> Courses, books, and coaching to improve your skills.</li>
          </ul>

          <p>Remember that the number shown in our <Link href="/freelance-income-calculator/">Freelance Calculator</Link> is an
            estimate. Speak with a certified accountant to ensure you are maximizing your deductions and complying with your
            local tax laws.</p>

          <h2>Frequently Asked Questions</h2>
          <FaqSection items={faqItems} />

          <AuthorBox />

          <Disclaimer>This calculator provides estimates based on your inputs. Tax laws vary by
              location
              and individual circumstances. Consult a tax professional for accurate financial advice.</Disclaimer>

          <RelatedCalculators links={[{"link":"/affiliate-earnings-calculator/","icon":"🔗","name":"Affiliate Calculator"},{"link":"/adsense-revenue-calculator/","icon":"$","name":"AdSense\r\n          Calculator"},{"link":"/youtube-earnings-calculator/","icon":"▶","name":"YouTube\r\n          Earnings"},{"link":"/tiktok-earnings-calculator/","icon":"♪","name":"TikTok\r\n          Earnings"}]} />
        </article>
      </div>
    </>
  );
}
