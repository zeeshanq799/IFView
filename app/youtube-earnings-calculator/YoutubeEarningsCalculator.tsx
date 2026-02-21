"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { fmt, fmtN } from "../lib/format";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { youtubeCountries } from "../../data/youtubeCountries";
import { youtubeNiches } from "../../data/youtubeNiches";
import { youtubeBenchmarks } from "../../data/youtubeBenchmarks";
import SearchableSelect from "../components/SearchableSelect";
import type { SelectOption } from "../components/SearchableSelect";

// Main export wrapped in Suspense for static export compatibility with useSearchParams
export default function YoutubeEarningsCalculator(props: any) {
    return (
        <Suspense fallback={<div className="card loading-card" style={{ padding: 40, textAlign: 'center' }}>Loading calculator...</div>}>
            <CalculatorInner {...props} />
        </Suspense>
    );
}

function CalculatorInner({
    initialCountryMulti = 1.0,
    initialCpm = youtubeBenchmarks.defaultCpm,
    initialNicheSlug = "general",
    initialCountrySlug = "global",
    initialViews = 10000
}: {
    initialCountryMulti?: number;
    initialCpm?: number;
    initialNicheSlug?: string;
    initialCountrySlug?: string;
    initialViews?: number;
}) {
    const searchParams = useSearchParams();

    const [mode, setMode] = useState<"v" | "r">("v");
    const [viewsV, setViewsV] = useState(initialViews);
    const [cpm, setCpm] = useState(initialCpm);
    const [nicheSlug, setNicheSlug] = useState<string>(initialNicheSlug);
    const [monPercent, setMonPercent] = useState(youtubeBenchmarks.monetizedPercent);
    const [viewsR, setViewsR] = useState(initialViews);
    const [rpm, setRpm] = useState(youtubeBenchmarks.defaultRpm);
    const [shortsRatio, setShortsRatio] = useState(20);
    const [countrySlug, setCountrySlug] = useState<string>(initialCountrySlug);
    const [countryMulti, setCountryMulti] = useState(initialCountryMulti);
    const [taxRate, setTaxRate] = useState(youtubeBenchmarks.taxRateDefault);

    const [isCalculating, setIsCalculating] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    // Initialize from URL search params on mount
    useEffect(() => {
        const v = searchParams.get('views');
        if (v) {
            setViewsV(Number(v));
            setViewsR(Number(v));
        }
        const c = searchParams.get('country');
        if (c) {
            const countryMatch = youtubeCountries.find(x => x.code.toLowerCase() === c.toLowerCase() || x.slug === c.toLowerCase());
            if (countryMatch) {
                setCountrySlug(countryMatch.slug);
                setCountryMulti(countryMatch.multiplier);
            }
        }
    }, [searchParams]);

    // Keep state in sync if props change (useful for client-side navigation between dynamic pages)
    useEffect(() => {
        setCountrySlug(initialCountrySlug);
        setCountryMulti(initialCountryMulti);
    }, [initialCountrySlug, initialCountryMulti]);

    useEffect(() => {
        setNicheSlug(initialNicheSlug);
        setCpm(initialCpm);
    }, [initialNicheSlug, initialCpm]);

    const countryOptions: SelectOption[] = useMemo(
        () => youtubeCountries.map(c => ({
            value: c.slug,
            label: `${c.flag} ${c.name} (×${c.multiplier})`,
            searchText: c.name,
        })),
        []
    );

    const nicheOptions: SelectOption[] = useMemo(
        () => youtubeNiches.map(n => ({
            value: n.slug,
            label: `${n.name} ($${n.cpm} CPM)`,
            searchText: n.name,
        })),
        []
    );

    // Derived calculations
    let daily = 0;
    let formulaStr = "";

    if (mode === "v") {
        daily = (viewsV * (monPercent / 100) * (cpm * countryMulti)) / 1000;
        formulaStr = `Revenue = (${fmtN(viewsV)} × ${monPercent}% × $${(cpm * countryMulti).toFixed(2)}) / 1000`;
    } else {
        daily = (viewsR * (rpm * countryMulti)) / 1000;
        formulaStr = `Revenue = (${fmtN(viewsR)} × $${(rpm * countryMulti).toFixed(2)}) / 1000`;
    }

    const sr = shortsRatio / 100;
    const adjDaily = daily * (1 - sr * 0.7);
    const monthly = adjDaily * 30;
    const shortsMonthly = daily * sr * youtubeBenchmarks.shortsRpm * 30 * 1000;
    const yearly = adjDaily * 365;
    const netMonthly = monthly * (1 - (taxRate / 100));

    let insightMsg = "";
    let insightBg = "";
    if (monthly < 200) {
        insightMsg = 'You are currently in the early-stage creator range. Increasing daily views to 25,000 could significantly boost income.';
    } else if (monthly < 1000) {
        insightMsg = 'You are in the growing creator tier. Reaching 40K daily views could push you past $1,000/month.';
    } else if (monthly < 5000) {
        insightMsg = `You are in the mid-tier income range. Optimizing CPM or targeting ${countrySlug === 'us' ? 'other premium' : 'US'} audiences can increase revenue by 30–50%.`;
    } else {
        insightMsg = 'You are operating at a professional creator level. Diversifying with sponsorships could double total earnings.';
    }

    if (monthly > 1000) {
        insightBg = "linear-gradient(135deg,#fff7e6,#fff)";
    }

    const goalRpmEst = mode === "v" ? (cpm * countryMulti * (monPercent / 100)) : (rpm * countryMulti);
    const safeGoalRpm = goalRpmEst > 0 ? goalRpmEst : youtubeBenchmarks.defaultRpm;
    const need1k = Math.ceil(((1000 / safeGoalRpm) * 1000) / 30);
    const need5k = Math.ceil(((5000 / safeGoalRpm) * 1000) / 30);

    const handleCalculate = () => {
        setIsCalculating(true);
        setTimeout(() => {
            setIsCalculating(false);
            if (window.innerWidth <= 768) {
                document.querySelector('.card-right')?.scrollIntoView({ behavior: 'smooth' });
            }
        }, 400);
    };

    const handleReset = () => {
        setIsResetting(true);
        setMode("v");
        setViewsV(initialViews);
        setCpm(initialCpm);
        setNicheSlug(initialNicheSlug);
        setMonPercent(youtubeBenchmarks.monetizedPercent);
        setViewsR(initialViews);
        setRpm(youtubeBenchmarks.defaultRpm);
        setShortsRatio(20);
        setCountrySlug(initialCountrySlug);
        setCountryMulti(initialCountryMulti);
        setTaxRate(youtubeBenchmarks.taxRateDefault);
        handleCalculate();
        setTimeout(() => setIsResetting(false), 800);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(`My estimated YouTube monthly earnings: ${fmt(monthly)} (before tax)`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleExport = () => {
        let csv = "Metric,Value\n";
        csv += `Monthly Gross,${fmt(monthly)}\n`;
        csv += `Daily Gross,${fmt(adjDaily)}\n`;
        csv += `Yearly Gross,${fmt(yearly)}\n`;
        csv += `After Tax,${fmt(netMonthly)}\n`;
        csv += `Shorts Revenue/mo,${fmt(shortsMonthly)}\n`;
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "YouTube_Earnings_Estimate.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: "YouTube Earnings Calculator",
                text: `Check out my estimated YouTube potential: ${fmt(monthly)}/month!`,
                url: window.location.href,
            }).catch(console.error);
        } else {
            handleCopy();
        }
    };

    const setQuickCountry = (slug: string) => {
        const c = youtubeCountries.find(x => x.slug === slug);
        if (c) {
            setCountrySlug(c.slug);
            setCountryMulti(c.multiplier);
        }
    };

    return (
        <div className="card">
            <div className="card-grid">
                <div className="card-left">

                    <div className="tabs">
                        <button className={`tab ${mode === "v" ? "on" : ""}`} onClick={() => { setMode("v"); handleCalculate(); }}>By Views + CPM</button>
                        <button className={`tab ${mode === "r" ? "on" : ""}`} onClick={() => { setMode("r"); handleCalculate(); }}>By RPM</button>
                    </div>

                    {mode === "v" && (
                        <div id="yt-v">
                            <div className="form-group">
                                <label>Daily Views <span className="tip-wrap"><span className="tip-icon">i</span><span className="tip-text">Average views per day across all your uploaded videos.</span></span></label>
                                <input type="number" value={viewsV} onChange={(e) => setViewsV(Number(e.target.value))} />
                            </div>
                            <div className="form-group">
                                <label>Content Niche</label>
                                <SearchableSelect
                                    options={nicheOptions}
                                    value={nicheSlug}
                                    onChange={(slug) => {
                                        setNicheSlug(slug);
                                        const match = youtubeNiches.find(n => n.slug === slug);
                                        if (match) setCpm(match.cpm);
                                    }}
                                    placeholder="Select niche…"
                                />
                            </div>
                            <div className="input-row">
                                <div className="form-group">
                                    <label>CPM ($)</label>
                                    <div className="prefix-wrap"><span className="prefix">$</span><input type="number" step="0.1" value={cpm} onChange={(e) => setCpm(Number(e.target.value))} /></div>
                                </div>
                                <div className="form-group">
                                    <label>Monetized %</label>
                                    <input type="number" max="100" value={monPercent} onChange={(e) => setMonPercent(Number(e.target.value))} />
                                </div>
                            </div>
                        </div>
                    )}

                    {mode === "r" && (
                        <div id="yt-r">
                            <div className="form-group">
                                <label>Daily Views</label>
                                <input type="number" value={viewsR} onChange={(e) => setViewsR(Number(e.target.value))} />
                            </div>
                            <div className="form-group">
                                <label>RPM ($) <span className="tip-wrap"><span className="tip-icon">i</span><span className="tip-text">Revenue Per Mille &mdash; what you earn per 1,000 views after YouTube's cut.</span></span></label>
                                <div className="prefix-wrap"><span className="prefix">$</span><input type="number" step="0.1" value={rpm} onChange={(e) => setRpm(Number(e.target.value))} /></div>
                            </div>
                        </div>
                    )}

                    <div className="range-group">
                        <div className="range-top">
                            <label>Shorts Ratio</label>
                            <span className="range-val">{shortsRatio}%</span>
                        </div>
                        <input type="range" min="0" max="100" value={shortsRatio} onChange={(e) => setShortsRatio(Number(e.target.value))} />
                    </div>

                    <div className="form-group">
                        <label>Country / Audience</label>
                        <SearchableSelect
                            options={countryOptions}
                            value={countrySlug}
                            onChange={(slug) => {
                                setCountrySlug(slug);
                                const match = youtubeCountries.find(c => c.slug === slug);
                                if (match) setCountryMulti(match.multiplier);
                            }}
                            placeholder="Select country…"
                        />
                    </div>

                    <div className="range-group">
                        <div className="range-top">
                            <label>Tax Rate</label>
                            <span className="range-val">{taxRate}%</span>
                        </div>
                        <input type="range" min="0" max="55" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} />
                    </div>

                    <p className="auto-note">💡 Adjust values &mdash; results update automatically.</p>

                    <div className="calc-action-row">
                        <button className={`btn-primary ${isCalculating ? 'loading' : ''}`} onClick={handleCalculate}>
                            {isCalculating ? '⏳ Calculating...' : '⚡ Calculate Earnings'}
                        </button>
                        <button className={isResetting ? "btn-ghost text-green-500" : "btn-ghost"} onClick={handleReset}>
                            {isResetting ? '✓ Reset' : '↺ Reset'}
                        </button>
                    </div>

                    <div className="insight-box" style={{ marginTop: 20, display: "block", background: insightBg }}>
                        <div style={{ fontWeight: 600, marginBottom: 8 }}>📊 Earnings Insight</div>
                        <div style={{ fontSize: "0.95rem", color: "var(--text-600)" }}>{insightMsg}</div>
                    </div>

                    <div className="goal-box" style={{ marginTop: 20 }}>
                        <div style={{ fontWeight: 600, marginBottom: 8 }}>🎯 Income Goals</div>
                        <div style={{ fontSize: "0.9rem", color: "var(--text-600)" }}>
                            To earn <strong>$1,000/month</strong> &rarr; ~{fmtN(need1k)} daily views<br />
                            To earn <strong>$5,000/month</strong> &rarr; ~{fmtN(need5k)} daily views
                        </div>
                    </div>

                </div>

                <div className="card-right">
                    <div className="output-hero bg-gradient-yt-card">
                        <div className="output-label">Monthly Gross Earnings</div>
                        <div className="output-value">{fmt(monthly)}</div>
                        <div className="output-sub">before tax deduction</div>
                    </div>
                    <div className="breakdown">
                        <div className="bd-item">
                            <div className="bd-val">{fmt(adjDaily)}</div>
                            <div className="bd-label">Daily</div>
                        </div>
                        <div className="bd-item">
                            <div className="bd-val">{fmt(yearly)}</div>
                            <div className="bd-label">Yearly</div>
                        </div>
                        <div className="bd-item">
                            <div className="bd-val">{fmt(netMonthly)}</div>
                            <div className="bd-label">After Tax</div>
                        </div>
                        <div className="bd-item">
                            <div className="bd-val">{fmt(shortsMonthly)}</div>
                            <div className="bd-label">Shorts/mo</div>
                        </div>
                    </div>

                    <div className="formula">{formulaStr}</div>

                    <div className="action-row">
                        <button className="act-btn" onClick={handleCopy}>{copied ? "✓ Copied" : "⎘ Copy"}</button>
                        <button className="act-btn" onClick={handleExport}>&darr; Export</button>
                        <button className="act-btn" onClick={handleShare}>⤴ Share</button>
                    </div>

                    <div style={{ marginTop: 20 }}>
                        <div style={{ fontWeight: 600, marginBottom: 6 }}>🌍 Compare Audience Impact</div>
                        <div style={{ display: "flex", gap: "8px" }}>
                            <button onClick={() => setQuickCountry("us")} className="act-btn">🇺🇸 USA</button>
                            <button onClick={() => setQuickCountry("uk")} className="act-btn">🇬🇧 UK</button>
                            <button onClick={() => setQuickCountry("india")} className="act-btn">🇮🇳 India</button>
                        </div>
                    </div>

                    <div style={{ marginTop: 16 }}>
                        <Link href="/youtube-cpm-calculator/" className="cta-mini" style={{ textDecoration: "none" }}>
                            👉 Target precise Cost Per Mille (CPM) &rarr;
                        </Link>
                    </div>
                    <div>
                        <Link href="/tiktok-earnings-calculator/" className="cta-mini" style={{ textDecoration: "none" }}>
                            👉 Compare Creator Fund potential &rarr;
                        </Link>
                    </div>

                    <div style={{ marginTop: 20, padding: 12, background: "#f5f7fa", borderRadius: 8, fontSize: "0.9rem" }}>
                        📈 What is your actual RPM? <Link href="/blog/rpm-vs-cpm-youtube/">Read our RPM vs CPM guide &rarr;</Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
