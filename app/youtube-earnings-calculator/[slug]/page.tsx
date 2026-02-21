import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import YoutubeEarningsCalculator from '../YoutubeEarningsCalculator';
import FaqSection from '../../components/FaqSection';
import AuthorBox from '../../components/AuthorBox';
import RelatedCalculators from '../../components/RelatedCalculators';
import Disclaimer from '../../components/Disclaimer';
import { resolveSlug } from '../../../data/slugResolver';
import { youtubeCountries, CountryData } from '../../../data/youtubeCountries';
import { youtubeNiches, NicheData } from '../../../data/youtubeNiches';
import { youtubeBenchmarks } from '../../../data/youtubeBenchmarks';
import { fmt } from '../../lib/format';
export const dynamicParams = false;

export async function generateStaticParams() {
    const countryParams = youtubeCountries.filter(c => c.activeEarnings).map(c => ({ slug: c.slug }));
    const nicheParams = youtubeNiches.filter(n => n.activeEarnings).map(n => ({ slug: n.slug }));
    return [...countryParams, ...nicheParams];
}

function calculateEstimatedRevenue(views: number, cpm: number, monetizedPercent: number) {
    const daily = (views * (monetizedPercent / 100) * cpm) / 1000;
    const adjDaily = daily * (1 - 0.2 * 0.7); // 20% shorts ratio standard assumption
    return adjDaily * 30; // Monthly
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const resolved = resolveSlug(resolvedParams.slug);

    if (!resolved) {
        return { title: "Not Found" };
    }

    const isCountry = resolved.type === "country";
    const currentYear = youtubeBenchmarks.year;

    let title = "";
    let description = "";

    if (isCountry) {
        const data = resolved.data as CountryData;
        title = `How Much Does YouTube Pay in ${data.name}? ($${data.avgCpmMin.toFixed(2)} - $${data.avgCpmMax.toFixed(2)} CPM)`;
        description = `Estimated YouTube earnings in ${data.name}. The average CPM ranges from $${data.avgCpmMin.toFixed(2)} to $${data.avgCpmMax.toFixed(2)}, targeting a net RPM of $${data.avgRpmMid.toFixed(2)}. Calculate your exact ad revenue based on ${data.name} audience data.`;
    } else {
        const data = resolved.data as NicheData;
        title = `YouTube ${data.name} Earnings Calculator (${currentYear} CPM: $${data.cpm.toFixed(2)})`;
        description = `Calculate YouTube AdSense revenue for the ${data.name} niche. The average CPM is $${data.cpm.toFixed(2)} with a projected net RPM of $${data.rpmMid.toFixed(2)}. See advertiser demand and estimated payouts.`;
    }

    return {
        title,
        description,
        alternates: { canonical: `https://incomefromviews.com/youtube-earnings-calculator/${resolvedParams.slug}/` },
        openGraph: {
            title,
            description,
            url: `https://incomefromviews.com/youtube-earnings-calculator/${resolvedParams.slug}/`,
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
    const resolvedParams = await params;
    const resolved = resolveSlug(resolvedParams.slug);

    if (!resolved) {
        notFound();
    }

    const { type, data } = resolved;
    const currentYear = youtubeBenchmarks.year;

    const isCountry = type === "country";
    const name = data.name;
    const effectiveCpm = isCountry
        ? youtubeBenchmarks.defaultCpm * (data as CountryData).multiplier
        : (data as NicheData).cpm;

    const getFaqs = () => {
        if (isCountry) {
            const c = data as CountryData;
            return [
                {
                    question: `Why is the YouTube CPM in ${c.name} different from the Global Average?`,
                    answer: `YouTube CPM rates are driven by local advertiser budgets. In ${c.name}, the advertiser demand is considered ${c.advertiserDemand.toLowerCase()}. Brands bid differently based on the purchasing power of the ${c.name} audience, resulting in an average CPM between $${c.avgCpmMin.toFixed(2)} and $${c.avgCpmMax.toFixed(2)}.`
                },
                {
                    question: `How much do YouTubers in ${c.name} make per 1,000 views?`,
                    answer: `Creator revenue is tracked via net RPM, not gross CPM. After YouTube takes its 45% cut, creators catering to ${c.name} typically earn an average RPM of $${c.avgRpmMid.toFixed(2)} per 1,000 total views.`
                },
                {
                    question: `Is the YouTube landscape competitive in ${c.name}?`,
                    answer: `Currently, the creator competition level targeting ${c.name} is ${c.competitionLevel.toLowerCase()}. Growing your audience efficiently will require highly targeted content or expanding into English-language topics to reach higher paying tiers.`
                }
            ];
        } else {
            const n = data as NicheData;
            return [
                {
                    question: `Does the ${n.name} niche have high CPM rates in ${currentYear}?`,
                    answer: `Yes, the ${n.name} space has a baseline CPM around $${n.cpm.toFixed(2)}. This is structurally driven by ${n.advertiserIntent.toLowerCase()} advertiser intent when compared to generic entertainment categories.`
                },
                {
                    question: `What is the true average RPM for ${n.name} content?`,
                    answer: `While the gross CPM is $${n.cpm.toFixed(2)}, creators in the ${n.name} category typically see a net RPM of around $${n.rpmMid.toFixed(2)} per 1,000 views after YouTube's platform rev-share is deducted.`
                },
                {
                    question: `How can I increase my earnings in the ${n.name} vertical?`,
                    answer: `You shouldn't rely solely on AdSense. Creators successfully monetizing ${n.name} channels often leverage direct brand deals and affiliate marketing. Specifically, you should focus heavily on: ${n.strategies[0].toLowerCase()}`
                }
            ];
        }
    };

    const faqs = getFaqs();
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
            }
        }))
    };

    const titleText = isCountry
        ? `How Much Does YouTube Pay in ${name}?`
        : `YouTube ${name} Earnings Calculator`;

    const jsonLdInfo = [
        {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": titleText,
            "url": `https://incomefromviews.com/youtube-earnings-calculator/${resolvedParams.slug}/`,
            "description": `Professional tool to estimate YouTube AdSense revenue for ${name}.`,
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
                { "@type": "ListItem", "position": 2, "name": "YouTube Earnings Calculator", "item": "https://incomefromviews.com/youtube-earnings-calculator/" },
                { "@type": "ListItem", "position": 3, "name": name, "item": `https://incomefromviews.com/youtube-earnings-calculator/${resolvedParams.slug}/` }
            ]
        },
        faqSchema
    ];

    // Country Tier strategy logic
    let strategyBlock = null;
    if (isCountry) {
        const c = data as CountryData;
        if (c.tier === 1) {
            strategyBlock = (
                <div className="highlight-box">
                    <h3 className="mt-0">👑 Tier 1 Monetization Strategy</h3>
                    <p>Since {name} falls under the Tier 1 advertiser bracket, your CPM metrics are already optimized purely by geography. To maximize revenue, creators should combine this high-value audience with a premium content topic.</p>
                    <p className="mb-0"><strong>Growth Action:</strong> Pivot your content toward B2B, software, or finance topics. A Tier 1 audience watching finance content can achieve $20+ CPMs. See the <Link href="/youtube-earnings-calculator/finance">Finance Niche CPMs here</Link>.</p>
                </div>
            );
        } else if (c.tier === 2) {
            strategyBlock = (
                <div className="highlight-box" style={{ background: "linear-gradient(135deg, #f0f7ff, #e6f0fa)" }}>
                    <h3 className="mt-0">📈 Emerging Market Strategy</h3>
                    <p>{name} is a rapidly growing Tier 2 advertising market. While the CPM is lower than North America, the barrier to entry for gaining impressions is also lower due to massive mobile adoption.</p>
                    <p className="mb-0"><strong>Growth Action:</strong> Focus on extremely high-volume content formats (like YouTube Shorts or daily vlogs). You must offset the lower $${c.avgCpmMin.toFixed(2)} - $${c.avgCpmMax.toFixed(2)} CPM through sheer view velocity.</p>
                </div>
            );
        } else {
            strategyBlock = (
                <div className="highlight-box" style={{ background: "#fff5f5", borderColor: "#ffebe6" }}>
                    <h3 className="mt-0">⚠️ Local Monetization Challenge</h3>
                    <p>Audiences in {name} are currently classified as Tier 3 by global advertisers, resulting in heavily restricted ad inventory and a lowered net RPM of roughly $${c.avgRpmMid.toFixed(2)}.</p>
                    <p className="mb-0"><strong>Growth Action:</strong> It is highly recommended to create English-language content. By targeting viewers from the <Link href="/youtube-earnings-calculator/us">United States</Link> or the UK, you can instantly 10x your AdSense payout purely via geographical arbitrage.</p>
                </div>
            );
        }
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdInfo) }} />
            <section className="page-hero">
                <div className="page-hero-inner">
                    <div className="hero-badge anim-1">📊 {name} Estimates</div>
                    <h1 className="hero-h1 anim-2">
                        <svg width="48" height="34" viewBox="0 0 48 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-icon">
                            <rect width="48" height="34" rx="8" fill="#FF0000" />
                            <path d="M32 17L19 24.5V9.5L32 17Z" fill="white" />
                        </svg>
                        {titleText} <br />
                        <span className="grad">Updated for {currentYear}</span>
                    </h1>
                    <div className="page-updated anim-3">Last Updated: {youtubeBenchmarks.updateFrequency}</div>
                    <p className="hero-sub anim-4" style={{ maxWidth: 950 }}>
                        {isCountry
                            ? `Estimating YouTube revenue can be tricky if your audience is primarily from ${name}. With advertiser demand currently rated as ${(data as CountryData).advertiserDemand.toLowerCase()}, use our specialized estimator to see exactly how much your views are worth.`
                            : `Wondering how lucrative the ${name} space is on YouTube? Enter your views below and calculate your estimated ad revenue specifically tailored for a $${(data as NicheData).cpm.toFixed(2)} vertical CPM.`}
                    </p>
                </div>
            </section>

            <div className="container">
                <div className="calc-section" id="youtube">
                    <YoutubeEarningsCalculator
                        initialCountrySlug={isCountry ? data.slug : "global"}
                        initialCountryMulti={isCountry ? (data as CountryData).multiplier : 1.0}
                        initialNicheSlug={isCountry ? "general" : data.slug}
                        initialCpm={isCountry ? youtubeBenchmarks.defaultCpm : (data as NicheData).cpm}
                    />
                    <div className="faq-wrap">
                        <div className="faq-head">{name} YouTube FAQ</div>
                        <FaqSection items={faqs} />
                    </div>
                </div>

                <article className="content-section">
                    {isCountry ? (
                        <>
                            <h2>Economic Snapshot: {name} YouTube Earnings</h2>
                            <p>Ad revenue models are fundamentally driven by local purchasing power. In {name}, local corporate advertising budgets establish a baseline CPM generally resting between <strong>${(data as CountryData).avgCpmMin.toFixed(2)} and ${(data as CountryData).avgCpmMax.toFixed(2)}</strong>. This dictates how much you will earn per thousand impressions.</p>

                            <p>Beyond the gross CPM, the true net RPM (Revenue Per Mille)—the amount deposited into your AdSense account—hovers close to <strong>${(data as CountryData).avgRpmMid.toFixed(2)}</strong> for channels targeting the {name} demographic. Competition for these local ad placements is currently <strong>{(data as CountryData).competitionLevel.toLowerCase()}</strong>.</p>

                            {strategyBlock}

                            <h3>Dynamic Revenue Projections for {name}</h3>
                            <p>Assuming an standard monetization integration format across your channel portfolio, here is a localized breakdown of forecasted AdSense revenue inside {name}:</p>

                            {/* Differentiate Revenue Format mathematically based on Tier */}
                            {(data as CountryData).tier === 1 ? (
                                <ul className="mb-4">
                                    <li><strong>10,000 Views/Day:</strong> {fmt(calculateEstimatedRevenue(10000, effectiveCpm, youtubeBenchmarks.monetizedPercent))} / month</li>
                                    <li><strong>100,000 Views/Day:</strong> {fmt(calculateEstimatedRevenue(100000, effectiveCpm, youtubeBenchmarks.monetizedPercent))} / month</li>
                                    <li><strong>1,000,000 Views/Day:</strong> {fmt(calculateEstimatedRevenue(1000000, effectiveCpm, youtubeBenchmarks.monetizedPercent))} / month</li>
                                </ul>
                            ) : (data as CountryData).tier === 2 ? (
                                <div className="table-responsive">
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>Performance Benchmark</th>
                                                <th>Projected Monthly Payout</th>
                                                <th>Projected Yearly Take-Home</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><td>50,000 Views Daily</td><td>{fmt(calculateEstimatedRevenue(50000, effectiveCpm, youtubeBenchmarks.monetizedPercent))}</td><td>{fmt(calculateEstimatedRevenue(50000, effectiveCpm, youtubeBenchmarks.monetizedPercent) * 12)}</td></tr>
                                            <tr><td>150,000 Views Daily</td><td>{fmt(calculateEstimatedRevenue(150000, effectiveCpm, youtubeBenchmarks.monetizedPercent))}</td><td>{fmt(calculateEstimatedRevenue(150000, effectiveCpm, youtubeBenchmarks.monetizedPercent) * 12)}</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="highlight-box">
                                    <p>To generate significant capital in {name} (Tier 3), volume is strictly required. For instance, hitting a massive milestone of <strong>500,000 daily views</strong> will conditionally yield around <strong>{fmt(calculateEstimatedRevenue(500000, effectiveCpm, youtubeBenchmarks.monetizedPercent))} monthly</strong> or roughly <strong>{fmt(calculateEstimatedRevenue(500000, effectiveCpm, youtubeBenchmarks.monetizedPercent) * 12)} annually</strong>, contingent on seasonal ad fluctuations.</p>
                                </div>
                            )}

                            {(data as CountryData).taxNote && (
                                <>
                                    <h3>Critical Tax Limitations</h3>
                                    <p>{(data as CountryData).taxNote} Failure to comply with regional withholding compliance can severely impact your estimated payout thresholds during the Google AdSense transfer phase.</p>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <h2>Advertiser Landscape: The {name} Vertical</h2>
                            <p>Revenue distribution on the YouTube platform is highly segregated by topic intent. The <strong>{name}</strong> category commands a very specific subset of corporate media spend. The overarching advertiser intent is systematically recognized as <em>{(data as NicheData).advertiserIntent}</em>.</p>

                            <p>Because of this financial profile, the aggregate gross baseline CPM averages <strong>${(data as NicheData).cpm.toFixed(2)}</strong>. In practical application, creators inside the {name} space routinely see a finalized net RPM of roughly <strong>${(data as NicheData).rpmMid.toFixed(2)}</strong> when accounting for YouTube's ecosystem tax. {(data as NicheData).description}</p>

                            <div className="highlight-box">
                                <h3 className="mt-0">🎯 Vertical Scaling Strategies</h3>
                                <p>Because the macro revenue potential here is graded mechanically as <strong>{(data as NicheData).revenuePotentialLevel}</strong>, top-performing creators bypass standard AdSense constraints by executing these exact blueprints:</p>
                                <ul className="mb-0">
                                    {(data as NicheData).strategies.map((strategy, idx) => (
                                        <li key={idx}>{strategy}</li>
                                    ))}
                                </ul>
                            </div>

                            <h3>Mathematical AdSense Modeling ({name} Creators)</h3>
                            <p>Assuming audiences retain a globalized geographic mix, generating purely organic impressions against the established ${(data as NicheData).cpm.toFixed(2)} vertical CPM will output the following recurring streams:</p>

                            <div className="table-responsive">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Daily Traffic Status</th>
                                            <th>Forecasted 30-Day Gross</th>
                                            <th>Forecasted 365-Day Gross</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>10,000 Audience Views</td><td>{fmt(calculateEstimatedRevenue(10000, effectiveCpm, youtubeBenchmarks.monetizedPercent))}</td><td>{fmt(calculateEstimatedRevenue(10000, effectiveCpm, youtubeBenchmarks.monetizedPercent) * 12)}</td></tr>
                                        <tr><td>100,000 Audience Views</td><td>{fmt(calculateEstimatedRevenue(100000, effectiveCpm, youtubeBenchmarks.monetizedPercent))}</td><td>{fmt(calculateEstimatedRevenue(100000, effectiveCpm, youtubeBenchmarks.monetizedPercent) * 12)}</td></tr>
                                        <tr><td>1,000,000 Audience Views</td><td>{fmt(calculateEstimatedRevenue(1000000, effectiveCpm, youtubeBenchmarks.monetizedPercent))}</td><td>{fmt(calculateEstimatedRevenue(1000000, effectiveCpm, youtubeBenchmarks.monetizedPercent) * 12)}</td></tr>
                                    </tbody>
                                </table>
                            </div>

                            <p className="mt-4">Looking to compare how the {name} demographic performs across different geographical borders? Test the impact of audience location directly against US traffic benchmarks via our <Link href="/youtube-earnings-calculator/us">USA Calculator breakdown</Link>.</p>
                        </>
                    )}

                    <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid var(--border)' }} />

                    <AuthorBox />

                    <Disclaimer>The figures provided in this custom {name} calculator are for exploratory estimations exclusively. Actual YouTube AdSense clearance values shift continuously due to automated auction algorithms, ad blocking percentages, regional limitations, and proprietary platform deductions. Base computations ({currentYear}).</Disclaimer>

                    <RelatedCalculators links={[
                        { "link": "/youtube-earnings-calculator/", "icon": "💰", "name": "Main Calculator" },
                        { "link": "/youtube-cpm-calculator/", "icon": "📊", "name": "CPM Estimator" },
                        { "link": "/youtube-rpm-calculator/", "icon": "📉", "name": "Net RPM Tool" }
                    ]} />
                </article>
            </div>
        </>
    );
}
