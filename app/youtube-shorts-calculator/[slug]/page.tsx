import type { Metadata } from 'next';
import Link from 'next/link';
import YoutubeShortsCalculator from '../YoutubeShortsCalculator';
import FaqSection from '../../components/FaqSection';
import AuthorBox from '../../components/AuthorBox';
import RelatedCalculators from '../../components/RelatedCalculators';
import Disclaimer from '../../components/Disclaimer';
import { youtubeCountries, CountryData } from '../../../data/youtubeCountries';

export const dynamicParams = false;

export async function generateStaticParams() {
    return youtubeCountries.filter(c => c.activeShorts).map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const country = youtubeCountries.find(c => c.slug === slug);
    if (!country) return { title: "Not Found" };

    const title = `YouTube Shorts Earnings in ${country.name} 2026 (Real RPM Data)`;
    const description = `How much do YouTube Shorts pay in ${country.name}? See real Shorts RPM data, estimated earnings per 1,000 views, and calculate your ${country.name} Shorts revenue.`;

    return {
        title,
        description,
        alternates: { canonical: `https://incomefromviews.com/youtube-shorts-calculator/${slug}/` },
        openGraph: {
            title,
            description,
            url: `https://incomefromviews.com/youtube-shorts-calculator/${slug}/`,
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

    const shortsMulti = country.tier === 1 ? 1.5 : country.tier === 2 ? 0.8 : 0.3;
    const shortsRpmMin = (0.03 * shortsMulti).toFixed(3);
    const shortsRpmMax = (0.10 * shortsMulti).toFixed(3);

    const faqs = [
        {
            question: `How much do YouTube Shorts pay per 1,000 views in ${country.name}?`,
            answer: `YouTube Shorts in ${country.name} typically pay between $${shortsRpmMin} and $${shortsRpmMax} per 1,000 views. This is significantly lower than long-form content, where ${country.name} creators can earn $${country.avgRpmMid.toFixed(2)} RPM.`
        },
        {
            question: `Why are Shorts earnings ${country.tier >= 2 ? 'very low' : 'lower'} in ${country.name}?`,
            answer: country.tier === 1
                ? `Even in premium markets like ${country.name}, Shorts earn less than long-form because YouTube uses a revenue pooling model for Shorts instead of direct ad placement. However, ${country.name} audiences still generate higher Shorts RPM than developing markets.`
                : `${country.name} is a Tier ${country.tier} market with lower advertiser budgets. Combined with the Shorts revenue pooling model, per-view earnings are minimal. Creating English-language Shorts targeting US/UK audiences can improve RPM significantly.`
        },
        {
            question: `Should I focus on Shorts or long-form in ${country.name}?`,
            answer: `For ${country.name} creators, long-form content earns 20-80× more per view than Shorts. Use Shorts for channel growth and discovery, then funnel viewers to long-form content where RPM is substantially higher.`
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
            "name": `YouTube Shorts Calculator — ${country.name}`,
            "url": `https://incomefromviews.com/youtube-shorts-calculator/${slug}/`,
            "description": `Calculate YouTube Shorts earnings for ${country.name} audiences.`,
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
                { "@type": "ListItem", "position": 2, "name": "YouTube Shorts Calculator", "item": "https://incomefromviews.com/youtube-shorts-calculator/" },
                { "@type": "ListItem", "position": 3, "name": country.name, "item": `https://incomefromviews.com/youtube-shorts-calculator/${slug}/` }
            ]
        },
        faqSchema
    ];

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdInfo) }} />
            <section className="page-hero">
                <div className="page-hero-inner">
                    <div className="hero-badge anim-1">📱 {country.flag} {country.name} Shorts Data</div>
                    <h1 className="hero-h1 anim-2">
                        <svg width="48" height="34" viewBox="0 0 48 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-icon">
                            <rect width="48" height="34" rx="8" fill="#FF0000" />
                            <path d="M32 17L19 24.5V9.5L32 17Z" fill="white" />
                        </svg>
                        YouTube Shorts Earnings in {country.name} <br />
                        <span className="grad">2026 RPM Data</span>
                    </h1>
                    <div className="page-updated anim-3">Last Updated: February 2026</div>
                    <p className="hero-sub anim-4" style={{ maxWidth: 950 }}>
                        YouTube Shorts in {country.name} typically pay between ${shortsRpmMin} and ${shortsRpmMax} per 1,000 views. Use the calculator below to estimate your Shorts revenue with {country.name}-specific audience data.
                    </p>
                </div>
            </section>

            <div className="container">
                <div className="calc-section" id="youtube">
                    <YoutubeShortsCalculator
                        initialCountrySlug={country.slug}
                        initialCountryMulti={shortsMulti}
                    />
                    <div className="faq-wrap" style={{ marginTop: 40, padding: 24, background: "var(--surface)", borderRadius: 16 }}>
                        <div className="faq-head" style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 16 }}>{country.name} Shorts FAQ</div>
                        <FaqSection items={faqs} />
                    </div>
                </div>

                <article className="content-section">
                    <h2>YouTube Shorts Revenue in {country.name}</h2>
                    <p>Shorts earnings in {country.name} are driven by the YouTube revenue pooling system. Unlike long-form videos with direct ad placements, Shorts revenue is pooled globally and distributed based on your share of total Shorts views. For {country.name} audiences, this results in an estimated RPM between <strong>${shortsRpmMin} and ${shortsRpmMax}</strong>.</p>

                    {country.tier === 1 ? (
                        <div className="highlight-box">
                            <h3 className="mt-0">👑 Tier 1 Shorts Advantage</h3>
                            <p>{country.name} audiences contribute more to the Shorts revenue pool, giving you a higher per-view payout compared to Tier 2 and Tier 3 markets.</p>
                            <p className="mb-0"><strong>Strategy:</strong> Combine Shorts for discovery with long-form content where your {country.name} audience earns you ${country.avgRpmMid.toFixed(2)} RPM — up to 80× more per view.</p>
                        </div>
                    ) : (
                        <div className="highlight-box" style={{ background: "#fff5f5", borderColor: "#ffebe6" }}>
                            <h3 className="mt-0">⚠️ Low Shorts RPM in {country.name}</h3>
                            <p>Tier {country.tier} markets like {country.name} see the lowest Shorts RPM due to limited advertiser budgets in the revenue pool.</p>
                            <p className="mb-0"><strong>Strategy:</strong> Create English-language Shorts targeting <Link href="/youtube-shorts-calculator/us">US audiences</Link> to access higher RPM rates. Use Shorts primarily as a growth tool, not a revenue source.</p>
                        </div>
                    )}

                    <h3>Shorts vs Long-Form: {country.name} Comparison</h3>
                    <div className="table-responsive">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Format</th>
                                    <th>Est. RPM ({country.name})</th>
                                    <th>Revenue Per 1M Views</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td><strong>YouTube Shorts</strong></td><td>${shortsRpmMin} – ${shortsRpmMax}</td><td>${(parseFloat(shortsRpmMin) * 1000).toFixed(0)} – ${(parseFloat(shortsRpmMax) * 1000).toFixed(0)}</td></tr>
                                <tr><td><strong>Long-Form Videos</strong></td><td>${country.avgRpmMid.toFixed(2)}</td><td>${(country.avgRpmMid * 1000).toFixed(0)}</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid var(--border)' }} />

                    <AuthorBox />

                    <Disclaimer>Shorts earnings for {country.name} are estimates based on industry-reported RPM benchmarks. Actual YouTube Shorts revenue varies based on content niche, viewer demographics, and seasonal advertiser demand.</Disclaimer>

                    <RelatedCalculators links={[
                        { "link": "/youtube-shorts-calculator/", "icon": "📱", "name": "Main Shorts Calc" },
                        { "link": "/youtube-earnings-calculator/", "icon": "💰", "name": "Earnings Calculator" },
                        { "link": "/youtube-cpm-calculator/", "icon": "📊", "name": "CPM Calculator" }
                    ]} />
                </article>
            </div>
        </>
    );
}
