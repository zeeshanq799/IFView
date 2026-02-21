"use client";

import { useState, useEffect, useMemo } from "react";
import { fmt } from "../lib/format";
import Link from "next/link";
import { youtubeCountries } from "../../data/youtubeCountries";
import { youtubeNiches } from "../../data/youtubeNiches";
import SearchableSelect from "../components/SearchableSelect";
import type { SelectOption } from "../components/SearchableSelect";

export default function YoutubeCpmCalculator({
    initialCountrySlug = "us",
    initialCountryMulti = 3.2,
    initialNicheSlug = "gaming",
}: {
    initialCountrySlug?: string;
    initialCountryMulti?: number;
    initialNicheSlug?: string;
} = {}) {
    const [earn, setEarn] = useState(500);
    const [views, setViews] = useState(50000);
    const [nicheSlug, setNicheSlug] = useState(initialNicheSlug);
    const [countrySlug, setCountrySlug] = useState(initialCountrySlug);
    const [countryMulti, setCountryMulti] = useState(initialCountryMulti);
    const [isCalculating, setIsCalculating] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    const [animateBars, setAnimateBars] = useState(false);
    const [showAllNiches, setShowAllNiches] = useState(false);

    useEffect(() => {
        setCountrySlug(initialCountrySlug);
        setCountryMulti(initialCountryMulti);
    }, [initialCountrySlug, initialCountryMulti]);

    useEffect(() => {
        setNicheSlug(initialNicheSlug);
    }, [initialNicheSlug]);

    useEffect(() => {
        setAnimateBars(false);
        const timer = setTimeout(() => setAnimateBars(true), 50);
        return () => clearTimeout(timer);
    }, [earn, views, nicheSlug, countryMulti]);

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

    let cpm = 0;
    if (earn > 0 && views > 0) {
        cpm = (earn / views) * 1000;
    }

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
        setEarn(500);
        setViews(50000);
        setNicheSlug(initialNicheSlug);
        setCountrySlug(initialCountrySlug);
        setCountryMulti(initialCountryMulti);
        handleCalculate();
        setTimeout(() => setIsResetting(false), 800);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(`My YouTube CPM: ${fmt(cpm)}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleExport = () => {
        let csv = "Metric,Value\n";
        csv += `Total Ad Revenue,${earn}\n`;
        csv += `Monetized Playbacks,${views}\n`;
        csv += `Calculated CPM,${fmt(cpm)}\n`;
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "YouTube_CPM_Estimate.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    const scale = countryMulti / 3.2;

    return (
        <div className="card">
            <div className="card-grid">
                <div className="card-left">
                    <div className="form-group">
                        <label>Total Ad Revenue ($)</label>
                        <div className="prefix-wrap">
                            <span className="prefix">$</span>
                            <input type="number" value={earn} placeholder="e.g. 500" onChange={(e) => setEarn(Number(e.target.value))} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Monetized Playbacks</label>
                        <input type="number" value={views} placeholder="e.g. 50000" onChange={(e) => setViews(Number(e.target.value))} />
                    </div>
                    <div className="form-group">
                        <label>Your Niche</label>
                        <SearchableSelect
                            options={nicheOptions}
                            value={nicheSlug}
                            onChange={(slug) => {
                                setNicheSlug(slug);
                            }}
                            placeholder="Select niche…"
                        />
                    </div>
                    <div className="form-group">
                        <label>Audience Country</label>
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
                    <p className="auto-note">💡 Adjust values &mdash; results update automatically.</p>

                    <div className="calc-action-row">
                        <button className={`btn-primary ${isCalculating ? 'loading' : ''}`} onClick={handleCalculate}>
                            {isCalculating ? '⏳ Calculating...' : '⚡ Calculate CPM'}
                        </button>
                        <button className={isResetting ? "btn-ghost text-green-500" : "btn-ghost"} onClick={handleReset}>
                            {isResetting ? '✓ Reset' : '↺ Reset'}
                        </button>
                    </div>

                    <div style={{ marginTop: 16 }}>
                        <Link href="/youtube-earnings-calculator/" className="cta-mini" style={{ textDecoration: "none" }}>
                            👉 Calculate how much you&apos;d earn with this CPM &rarr;
                        </Link>
                    </div>
                </div>

                <div className="card-right">
                    <div className="output-hero" style={{ background: "linear-gradient(135deg,#f97316,#eab308)" }}>
                        <div className="output-label">Your CPM Rate</div>
                        <div className="output-value">{fmt(cpm)}</div>
                        <div className="output-sub">Cost Per 1,000 Impressions</div>
                    </div>
                    <div className="formula-box mt-20 text-center">Formula: (Revenue &divide; Impressions) &times; 1,000</div>

                    <div>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-400)", marginBottom: 10, marginTop: 20 }}>
                            Niche CPM Comparison
                        </div>
                        <div id="cpmBars">
                            {(() => {
                                const sorted = [...youtubeNiches].sort((a, b) => b.cpm - a.cpm);
                                const maxCpm = sorted[0]?.cpm || 1;
                                const visible = showAllNiches ? sorted : sorted.slice(0, 5);

                                return visible.map((item) => {
                                    const localVal = item.cpm * scale;
                                    const isSelected = item.slug === nicheSlug;
                                    const borderStyle = isSelected ? "2px solid var(--blue)" : "none";
                                    const padding = isSelected ? "2px" : "0";
                                    const borderRadius = isSelected ? "6px" : "0";
                                    const nameColor = isSelected ? "var(--blue)" : "inherit";
                                    const nameWeight = isSelected ? 800 : "normal";
                                    const barColor = item.cpm >= 10 ? '#22c55e' : item.cpm >= 5 ? '#f97316' : '#9ca3af';
                                    const barWidth = animateBars ? `${(item.cpm / maxCpm) * 100}%` : "0";

                                    return (
                                        <div className="bar-row" style={{ border: borderStyle, padding, borderRadius }} key={item.slug}>
                                            <div className="bar-name" style={{ color: nameColor, fontWeight: nameWeight }}>{item.name}</div>
                                            <div className="bar-track">
                                                <div
                                                    className="bar-fill"
                                                    style={{
                                                        width: barWidth,
                                                        background: barColor,
                                                        transition: "width 0.5s ease-out"
                                                    }}
                                                />
                                            </div>
                                            <div className="bar-num">${localVal.toFixed(2)}</div>
                                        </div>
                                    );
                                });
                            })()}
                        </div>
                        {youtubeNiches.length > 5 && (
                            <button
                                onClick={() => setShowAllNiches(!showAllNiches)}
                                style={{
                                    display: "block",
                                    width: "100%",
                                    marginTop: 8,
                                    padding: "6px 0",
                                    background: "none",
                                    border: "1px solid var(--border)",
                                    borderRadius: 6,
                                    color: "var(--blue)",
                                    fontSize: "0.8rem",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    transition: "background 0.2s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-100)")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                            >
                                {showAllNiches ? "▲ Show Less" : `▼ See All ${youtubeNiches.length} Niches`}
                            </button>
                        )}
                    </div>

                    <div className="action-row mt-16">
                        <button className="act-btn" onClick={handleCopy}>{copied ? "✓ Copied" : "⎘ Copy"}</button>
                        <button className="act-btn" onClick={handleExport}>&darr; Export</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
