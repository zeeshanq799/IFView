"use client";

import { useState, useEffect } from "react";
import { fmt } from "../lib/format";
import Link from "next/link";

const US_DATA = [
    { name: 'Finance', defaultVal: 35, color: '#22c55e', id: 'finance' },
    { name: 'Business', defaultVal: 28, color: '#22c55e', id: 'business' },
    { name: 'Tech', defaultVal: 18, color: '#22c55e', id: 'tech' },
    { name: 'Health', defaultVal: 12, color: '#f97316', id: 'health' },
    { name: 'Travel', defaultVal: 9, color: '#f97316', id: 'travel' },
    { name: 'Beauty', defaultVal: 6, color: '#f97316', id: 'beauty' },
    { name: 'Gaming', defaultVal: 6, color: '#f97316', id: 'gaming' },
    { name: 'Lifestyle', defaultVal: 4, color: '#9ca3af', id: 'lifestyle' },
    { name: 'Entertain', defaultVal: 3, color: '#9ca3af', id: 'entertainment' },
];

export default function YoutubeCpmCalculator() {
    const [earn, setEarn] = useState(500);
    const [views, setViews] = useState(50000);
    const [niche, setNiche] = useState("gaming");
    const [countryMulti, setCountryMulti] = useState(3.2); // Default is US
    const [isCalculating, setIsCalculating] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    // Animation state for bars
    const [animateBars, setAnimateBars] = useState(false);

    useEffect(() => {
        // trigger animation whenever dependencies change
        setAnimateBars(false);
        const timer = setTimeout(() => setAnimateBars(true), 50);
        return () => clearTimeout(timer);
    }, [earn, views, niche, countryMulti]);

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
        setNiche("gaming");
        setCountryMulti(3.2);
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
                        <select value={niche} onChange={(e) => setNiche(e.target.value)}>
                            <option value="finance">💰 Finance / Investing</option>
                            <option value="tech">💻 Technology</option>
                            <option value="business">🏢 Business / Marketing</option>
                            <option value="health">🏥 Health / Fitness</option>
                            <option value="education">📚 Education</option>
                            <option value="gaming">🎮 Gaming</option>
                            <option value="entertainment">🎭 Entertainment</option>
                            <option value="lifestyle">✨ Lifestyle / Vlogs</option>
                            <option value="beauty">💄 Beauty / Fashion</option>
                            <option value="travel">✈️ Travel</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Audience Country</label>
                        <select value={countryMulti} onChange={(e) => setCountryMulti(Number(e.target.value))}>
                            <option value="1">🌍 Global Average (&times;1.0)</option>
                            <option value="3.2">🇺🇸 United States (&times;3.2)</option>
                            <option value="2.8">🇬🇧 United Kingdom (&times;2.8)</option>
                            <option value="2.5">🇦🇺 Australia (&times;2.5)</option>
                            <option value="2.1">🇨🇦 Canada (&times;2.1)</option>
                            <option value="1.8">🇩🇪 Germany (&times;1.8)</option>
                            <option value="1.5">🇫🇷 France (&times;1.5)</option>
                            <option value="0.4">🇮🇳 India (&times;0.4)</option>
                            <option value="0.35">🇵🇰 Pakistan (&times;0.35)</option>
                            <option value="0.3">🇧🇩 Bangladesh (&times;0.3)</option>
                            <option value="0.5">🇧🇷 Brazil (&times;0.5)</option>
                            <option value="0.55">🇵🇭 Philippines (&times;0.55)</option>
                            <option value="0.45">🇳🇬 Nigeria (&times;0.45)</option>
                        </select>
                    </div>
                    <p className="auto-note">💡 Adjust values &mdash; results update automatically.</p>
                    <button className={`btn-primary ${isCalculating ? 'loading' : ''}`} onClick={handleCalculate}>
                        {isCalculating ? '⏳ Calculating...' : '⚡ Calculate CPM'}
                    </button>
                    <button className={isResetting ? "btn-ghost text-green-500" : "btn-ghost"} onClick={handleReset}>
                        {isResetting ? '✓ Reset' : '↺ Reset'}
                    </button>

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
                            {US_DATA.map((item) => {
                                const localVal = item.defaultVal * scale;
                                const isSelected = item.id === niche;
                                const borderStyle = isSelected ? "2px solid var(--blue)" : "none";
                                const padding = isSelected ? "2px" : "0";
                                const borderRadius = isSelected ? "6px" : "0";
                                const nameColor = isSelected ? "var(--blue)" : "inherit";
                                const nameWeight = isSelected ? 800 : "normal";
                                const barWidth = animateBars ? `${(item.defaultVal / 35) * 100}%` : "0";

                                return (
                                    <div className="bar-row" style={{ border: borderStyle, padding, borderRadius }} key={item.id}>
                                        <div className="bar-name" style={{ color: nameColor, fontWeight: nameWeight }}>{item.name}</div>
                                        <div className="bar-track">
                                            <div
                                                className="bar-fill"
                                                style={{
                                                    width: barWidth,
                                                    background: item.color,
                                                    transition: "width 0.5s ease-out"
                                                }}
                                            />
                                        </div>
                                        <div className="bar-num">${localVal.toFixed(2)}</div>
                                    </div>
                                );
                            })}
                        </div>
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
