import type { Metadata } from 'next';
import Link from 'next/link';
import YoutubeCpmCalculator from '../YoutubeCpmCalculator';
import FaqSection from '../../components/FaqSection';
import AuthorBox from '../../components/AuthorBox';
import RelatedCalculators from '../../components/RelatedCalculators';
import Disclaimer from '../../components/Disclaimer';
import { youtubeCountries, CountryData } from '../../../data/youtubeCountries';
import { youtubeNiches } from '../../../data/youtubeNiches';

export const dynamicParams = false;

export async function generateStaticParams() {
    const countryParams = youtubeCountries.filter(c => c.activeCpm).map(c => ({ slug: c.slug }));
    const nicheParams = youtubeNiches.filter(n => n.activeCpm).map(n => ({ slug: n.slug }));
    return [...countryParams, ...nicheParams];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const country = youtubeCountries.find(c => c.slug === slug);
    if (!country) return { title: "Not Found" };

    const title = `YouTube CPM Rates in ${country.name} 2026 ($${country.avgCpmMin.toFixed(2)} – $${country.avgCpmMax.toFixed(2)})`;
    const description = `See YouTube CPM rates for ${country.name} in 2026. Average CPM ranges from $${country.avgCpmMin.toFixed(2)} to $${country.avgCpmMax.toFixed(2)}. Calculate your ad revenue with ${country.name}-specific data.`;

    return {
        title,
        description,
        alternates: { canonical: `https://incomefromviews.com/youtube-cpm-calculator/${slug}/` },
        openGraph: {
            title,
            description,
            url: `https://incomefromviews.com/youtube-cpm-calculator/${slug}/`,
            type: "website",
            images: [{ url: "https://incomefromviews.com/assets/og-image.png", width: 1200, height: 630 }],
            siteName: "IncomeFromViews",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["https://incomefromviews.com/assets/og-image.png"],
        },
    };
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const country = youtubeCountries.find(c => c.slug === slug);
    if (!country) return null;

    const faqs = [
        {
            question: `What is the average YouTube CPM in ${country.name}?`,
            answer: `YouTube CPM in ${country.name} ranges from $${country.avgCpmMin.toFixed(2)} to $${country.avgCpmMax.toFixed(2)} on average. The actual CPM depends on video niche, audience demographics, and seasonal demand. Advertiser demand in ${country.name} is currently rated as ${country.advertiserDemand.toLowerCase()}.`
        },
        {
            question: `Why is YouTube CPM ${country.tier === 1 ? 'high' : 'lower'} in ${country.name}?`,
            answer: country.tier === 1
                ? `${country.name} is a Tier 1 advertising market with ${country.advertiserDemand.toLowerCase()} demand. Brands spend aggressively to reach ${country.name} audiences because of their high purchasing power, resulting in premium CPM rates.`
                : `${country.name} is a Tier ${country.tier} advertising market. Lower local purchasing power means advertisers bid less per impression. However, creating English-language content targeting Tier 1 audiences can significantly increase your effective CPM.`
        },
        {
            question: `How can I increase my CPM targeting ${country.name} viewers?`,
            answer: `Focus on high-value niches like finance or technology, enable all ad formats in YouTube Studio, create longer content (8+ minutes) for mid-roll ads, and target keywords with purchase intent. ${country.tier >= 2 ? `Additionally, creating English-language content can attract higher-paying Tier 1 advertisers.` : ''}`
        }
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": { "@type": "Answer", "text": f.answer }
        }))
    };

    const jsonLdInfo = [
        {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": `YouTube CPM Calculator — ${country.name}`,
            "url": `https://incomefromviews.com/youtube-cpm-calculator/${slug}/`,
            "description": `Calculate YouTube CPM rates for ${country.name} audiences.`,
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
                { "@type": "ListItem", "position": 2, "name": "YouTube CPM Calculator", "item": "https://incomefromviews.com/youtube-cpm-calculator/" },
                { "@type": "ListItem", "position": 3, "name": country.name, "item": `https://incomefromviews.com/youtube-cpm-calculator/${slug}/` }
            ]
        },
        faqSchema
    ];

    let strategyBlock = null;
    if (country.tier === 1) {
        strategyBlock = (
            <div className="highlight-box">
                <h3 className="mt-0">👑 Tier 1 CPM Advantage</h3>
                <p>{country.name} is a premium advertising market. Your baseline CPM is already elevated due to strong advertiser competition. To maximize this advantage, pair your {country.name} audience with high-value content niches.</p>
                <p className="mb-0"><strong>Action:</strong> Finance and tech content targeting {country.name} audiences can achieve CPMs of $20–$50+. See the <Link href="/youtube-earnings-calculator/finance">Finance niche breakdown</Link>.</p>
            </div>
        );
    } else if (country.tier === 2) {
        strategyBlock = (
            <div className="highlight-box" style={{ background: "linear-gradient(135deg, #f0f7ff, #e6f0fa)" }}>
                <h3 className="mt-0">📈 Growing Market Opportunity</h3>
                <p>{country.name} is in the Tier 2 bracket with CPMs averaging ${country.avgCpmMin.toFixed(2)}–${country.avgCpmMax.toFixed(2)}. Mobile-first content and high-volume upload strategies work best in this market.</p>
                <p className="mb-0"><strong>Action:</strong> Focus on search-driven content to capture growing advertiser spending in {country.name}.</p>
            </div>
        );
    } else {
        strategyBlock = (
            <div className="highlight-box" style={{ background: "#fff5f5", borderColor: "#ffebe6" }}>
                <h3 className="mt-0">⚠️ Low CPM Market</h3>
                <p>Audiences in {country.name} are classified as Tier 3 by advertisers, resulting in CPMs between ${country.avgCpmMin.toFixed(2)} and ${country.avgCpmMax.toFixed(2)}.</p>
                <p className="mb-0"><strong>Action:</strong> Creating English-language content targeting <Link href="/youtube-cpm-calculator/us">US audiences</Link> can increase your CPM by 10–20×.</p>
            </div>
        );
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdInfo) }} />
            <section className="page-hero">
                <div className="page-hero-inner">
                    <div className="hero-badge anim-1">📊 {country.flag} {country.name} CPM Data</div>
                    <h1 className="hero-h1 anim-2">
                        <svg width="48" height="34" viewBox="0 0 48 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-icon">
                            <rect width="48" height="34" rx="8" fill="#FF0000" />
                            <path d="M32 17L19 24.5V9.5L32 17Z" fill="white" />
                        </svg>
                        YouTube CPM Rates in {country.name} <br />
                        <span className="grad">Updated for 2026</span>
                    </h1>
                    <div className="page-updated anim-3">Last Updated: February 2026</div>
                    <p className="hero-sub anim-4" style={{ maxWidth: 950 }}>
                        Advertiser demand in {country.name} is currently {country.advertiserDemand.toLowerCase()}. The average CPM ranges from ${country.avgCpmMin.toFixed(2)} to ${country.avgCpmMax.toFixed(2)}. Use the calculator below to see how {country.name} CPM affects your specific channel earnings.
                    </p>
                </div>
            </section>

            <div className="container">
                <div className="calc-section">
                    <YoutubeCpmCalculator
                        initialCountrySlug={country.slug}
                        initialCountryMulti={country.multiplier}
                    />
                    <div className="faq-wrap">
                        <div className="faq-head">{country.name} YouTube CPM FAQ</div>
                        <FaqSection items={faqs} />
                    </div>
                </div>

                <article className="content-section">
                    <h2>YouTube CPM in {country.name}: What Creators Need to Know</h2>
                    <p>YouTube CPM (Cost Per Mille) in {country.name} is driven by local advertiser budgets and audience purchasing power. With advertiser demand rated as <strong>{country.advertiserDemand.toLowerCase()}</strong> and competition at <strong>{country.competitionLevel.toLowerCase()}</strong>, {country.name}-focused creators can expect CPM rates between <strong>${country.avgCpmMin.toFixed(2)} and ${country.avgCpmMax.toFixed(2)}</strong>.</p>
                    <p>After YouTube takes its 45% revenue share, the effective RPM (what you actually earn) drops to approximately <strong>${country.avgRpmMid.toFixed(2)}</strong> per 1,000 views for {country.name} audiences.</p>

                    {strategyBlock}

                    {country.taxNote && (
                        <>
                            <h3>Tax Considerations for {country.name}</h3>
                            <p>{country.taxNote}</p>
                        </>
                    )}

                    <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid var(--border)' }} />

                    <AuthorBox />

                    <Disclaimer>CPM rates shown for {country.name} are based on industry averages and may vary due to seasonal ad demand, content category, and platform auction dynamics. These are estimates for educational purposes only.</Disclaimer>

                    <RelatedCalculators links={[
                        { "link": "/youtube-cpm-calculator/", "icon": "📊", "name": "Main CPM Calc" },
                        { "link": "/youtube-earnings-calculator/", "icon": "💰", "name": "Earnings Calculator" },
                        { "link": "/youtube-rpm-calculator/", "icon": "📉", "name": "RPM Calculator" }
                    ]} />
                </article>
            </div>
        </>
    );
}
