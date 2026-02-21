"use client";

import { useState, useEffect, useMemo } from "react";
import { fmt, fmtN } from "../lib/format";
import Link from "next/link";
import { youtubeCountries } from "../../data/youtubeCountries";
import SearchableSelect from "../components/SearchableSelect";
import type { SelectOption } from "../components/SearchableSelect";

export default function YoutubeShortsCalculator({
    initialCountrySlug = "global",
    initialCountryMulti = 1,
}: {
    initialCountrySlug?: string;
    initialCountryMulti?: number;
} = {}) {
    const [mode, setMode] = useState<"r" | "v">("r");

    const [shortsViews, setShortsViews] = useState(10000);
    const [shortsRPM, setShortsRPM] = useState(0.05);
    const [shortsMon, setShortsMon] = useState(45);

    const [shortsViews2, setShortsViews2] = useState(10000);
    const [shortsCPM, setShortsCPM] = useState(0.10);
    const [shortsMon2, setShortsMon2] = useState(45);

    const [shortsRatio, setShortsRatio] = useState(100);
    const [countrySlug, setCountrySlug] = useState(initialCountrySlug);
    const [shortsCountry, setShortsCountry] = useState(initialCountryMulti);
    const [shortsTax, setShortsTax] = useState(25);
    const [isCalculating, setIsCalculating] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    useEffect(() => {
        setCountrySlug(initialCountrySlug);
        setShortsCountry(initialCountryMulti);
    }, [initialCountrySlug, initialCountryMulti]);

    const countryOptions: SelectOption[] = useMemo(
        () => youtubeCountries.map(c => ({
            value: c.slug,
            label: `${c.flag} ${c.name} (×${c.multiplier})`,
            searchText: c.name,
        })),
        []
    );

    const cm = shortsCountry;
    const taxRate = shortsTax / 100;
    const sr = shortsRatio / 100;

    let daily = 0;
    let formulaStr = "";
    let basePer1M = 0;

    if (mode === "r") {
        const rpm = shortsRPM * cm;
        const monRate = shortsMon / 100;
        daily = (shortsViews * monRate * rpm) / 1000;
        formulaStr = `Revenue = (${fmtN(shortsViews)} × ${(monRate * 100).toFixed(0)}% × $${rpm.toFixed(3)}) / 1000`;
        basePer1M = shortsRPM;
    } else {
        const cpm = shortsCPM * cm;
        const monRate = shortsMon2 / 100;
        const rpm = cpm * 0.55;
        daily = (shortsViews2 * monRate * rpm) / 1000;
        formulaStr = `Revenue = (${fmtN(shortsViews2)} × ${(monRate * 100).toFixed(0)}% × $${rpm.toFixed(3)}) / 1000`;
        basePer1M = shortsCPM * 0.55;
    }

    const adjDaily = daily * sr;
    const monthly = adjDaily * 30;
    const yearly = adjDaily * 365;
    const netVal = monthly * (1 - taxRate);
    const per1M = basePer1M * cm;

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
        setShortsViews(10000);
        setShortsRPM(0.05);
        setShortsMon(45);
        setShortsViews2(10000);
        setShortsCPM(0.10);
        setShortsMon2(45);
        setShortsRatio(100);
        setCountrySlug(initialCountrySlug);
        setShortsCountry(initialCountryMulti);
        setShortsTax(25);
        handleCalculate();
        setTimeout(() => setIsResetting(false), 800);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(`My YouTube Shorts Monthly Earnings: ${fmt(monthly)}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleExport = () => {
        let csv = "Metric,Value\n";
        csv += `Monthly Earnings,${fmt(monthly)}\n`;
        csv += `Daily Earnings,${fmt(adjDaily)}\n`;
        csv += `Yearly Earnings,${fmt(yearly)}\n`;
        csv += `After Tax (Monthly),${fmt(netVal)}\n`;
        csv += `Per 1M Views,${fmt(per1M)}\n`;
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "YouTube_Shorts_Earnings.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    const shareIt = () => {
        if (navigator.share) {
            navigator.share({
                title: "YouTube Shorts Earnings Calculator",
                text: `I'm estimated to earn ${fmt(monthly)} monthly from my Shorts! Calculate yours here:`,
                url: window.location.href,
            });
        } else {
            handleCopy();
        }
    };

    let insightMessage = '';
    if (monthly < 100) {
        insightMessage = 'Shorts alone generate minimal income. Consider using Shorts for growth while focusing on long-form content for revenue.';
    } else if (monthly < 500) {
        insightMessage = 'You\'re building Shorts momentum. However, the same views in long-form would earn 30-80x more. Use Shorts strategically for audience growth.';
    } else if (monthly < 2000) {
        insightMessage = 'Your Shorts volume is strong. Consider converting your top-performing Shorts into long-form content to dramatically increase RPM.';
    } else {
        insightMessage = 'You\'re achieving high Shorts volume. Diversifying with sponsorships and affiliate marketing can multiply your total earnings beyond ad revenue.';
    }

    const safeRpmForGoals = per1M || 0.05;
    const need1k = Math.ceil((1000 / safeRpmForGoals) * 1000 / 30);
    const need5k = Math.ceil((5000 / safeRpmForGoals) * 1000 / 30);

    return (
        <div className="card">
            <div className="card-grid">
                <div className="card-left">
                    <div className="tabs">
                        <button className={`tab ${mode === "r" ? "on" : ""}`} onClick={() => { setMode("r"); handleCalculate(); }}>By RPM</button>
                        <button className={`tab ${mode === "v" ? "on" : ""}`} onClick={() => { setMode("v"); handleCalculate(); }}>By Views + CPM</button>
                    </div>

                    {mode === "r" && (
                        <div id="shorts-r">
                            <div className="form-group">
                                <label>
                                    Daily Shorts Views
                                    <span className="tip-wrap">
                                        <span className="tip-icon">i</span>
                                        <span className="tip-text">Average Shorts views per day across your channel.</span>
                                    </span>
                                </label>
                                <input type="number" value={shortsViews} onChange={e => setShortsViews(Number(e.target.value))} />
                            </div>
                            <div className="input-row">
                                <div className="form-group">
                                    <label>Shorts RPM ($)</label>
                                    <div className="prefix-wrap"><span className="prefix">$</span><input type="number" value={shortsRPM} step="0.01" onChange={e => setShortsRPM(Number(e.target.value))} /></div>
                                </div>
                                <div className="form-group">
                                    <label>Monetized %</label>
                                    <input type="number" value={shortsMon} max="100" onChange={e => setShortsMon(Number(e.target.value))} />
                                </div>
                            </div>
                        </div>
                    )}

                    {mode === "v" && (
                        <div id="shorts-v">
                            <div className="form-group">
                                <label>Daily Shorts Views</label>
                                <input type="number" value={shortsViews2} onChange={e => setShortsViews2(Number(e.target.value))} />
                            </div>
                            <div className="input-row">
                                <div className="form-group">
                                    <label>CPM ($)</label>
                                    <div className="prefix-wrap"><span className="prefix">$</span><input type="number" value={shortsCPM} step="0.01" onChange={e => setShortsCPM(Number(e.target.value))} /></div>
                                </div>
                                <div className="form-group">
                                    <label>Monetized %</label>
                                    <input type="number" value={shortsMon2} max="100" onChange={e => setShortsMon2(Number(e.target.value))} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="range-group">
                        <div className="range-top">
                            <label>Shorts Ratio</label>
                            <span className="range-val">{shortsRatio}%</span>
                        </div>
                        <input type="range" min="0" max="100" value={shortsRatio} onChange={e => setShortsRatio(Number(e.target.value))} />
                    </div>

                    <div className="form-group">
                        <label>Country / Audience</label>
                        <SearchableSelect
                            options={countryOptions}
                            value={countrySlug}
                            onChange={(slug) => {
                                setCountrySlug(slug);
                                const match = youtubeCountries.find(c => c.slug === slug);
                                if (match) setShortsCountry(match.multiplier);
                            }}
                            placeholder="Select country…"
                        />
                    </div>

                    <div className="range-group">
                        <div className="range-top">
                            <label>Tax Rate</label>
                            <span className="range-val">{shortsTax}%</span>
                        </div>
                        <input type="range" min="0" max="55" value={shortsTax} onChange={e => setShortsTax(Number(e.target.value))} />
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

                    <div className="insight-box" style={{ marginTop: 20 }}>
                        <div style={{ fontWeight: 600, marginBottom: 8 }}>📊 Earnings Insight</div>
                        <div style={{ fontSize: "0.95rem", color: "var(--text-600)" }}>{insightMessage}</div>
                    </div>
                    <div className="goal-box" style={{ marginTop: 20 }}>
                        <div style={{ fontWeight: 600, marginBottom: 8 }}>🎯 Income Goals</div>
                        <div style={{ fontSize: "0.9rem", color: "var(--text-600)" }}>
                            To earn <strong>$1,000/month</strong> &rarr; ~{need1k.toLocaleString()} daily Shorts views<br />
                            To earn <strong>$5,000/month</strong> &rarr; ~{need5k.toLocaleString()} daily Shorts views
                        </div>
                    </div>
                </div>

                <div className="card-right">
                    <div className="output-hero bg-gradient-yt-card">
                        <div className="output-label">Monthly Shorts Earnings</div>
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
                            <div className="bd-val">{fmt(netVal)}</div>
                            <div className="bd-label">After Tax</div>
                        </div>
                        <div className="bd-item">
                            <div className="bd-val">{fmt(per1M)}</div>
                            <div className="bd-label">Per 1M Views</div>
                        </div>
                    </div>

                    <div className="formula">{formulaStr}</div>

                    <div className="action-row">
                        <button className="act-btn" onClick={handleCopy}>{copied ? "✓ Copied" : "⎘ Copy"}</button>
                        <button className="act-btn" onClick={handleExport}>&darr; Export</button>
                        <button className="act-btn" onClick={shareIt}>⤴ Share</button>
                    </div>

                    <div style={{ marginTop: 20 }}>
                        <div style={{ fontWeight: 600, marginBottom: 6 }}>🌍 Compare Audience Impact</div>
                        <div style={{ display: "flex" }}>
                            <button onClick={() => { setCountrySlug("us"); setShortsCountry(1.5); }} className="act-btn">USA</button>
                            <button onClick={() => { setCountrySlug("uk"); setShortsCountry(1.4); }} className="act-btn">UK</button>
                            <button onClick={() => { setCountrySlug("india"); setShortsCountry(0.3); }} className="act-btn">India</button>
                        </div>
                    </div>

                    <div style={{ marginTop: 16 }}>
                        <Link href="/youtube-earnings-calculator/" className="cta-mini" style={{ textDecoration: "none" }}>
                            👉 Calculate long-form YouTube earnings (20-80x higher) &rarr;
                        </Link>
                    </div>
                    <div>
                        <Link href="/youtube-rpm-calculator/" className="cta-mini" style={{ textDecoration: "none" }}>
                            👉 Calculate your precise Revenue Per Mille (RPM) &rarr;
                        </Link>
                    </div>

                    <div style={{ marginTop: 20 }}>
                        <div style={{ padding: 12, background: "#f5f7fa", borderRadius: 8, fontSize: "0.9rem" }}>
                            📈 Want to increase your RPM?{" "}
                            <Link href="/blog/youtube-cpm-guide/">Read our full YouTube RPM Guide &rarr;</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
