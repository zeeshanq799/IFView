"use client";
import { useState, useEffect } from 'react';
import { fmt, fmtN } from '../lib/format';
import Link from 'next/link';

export default function AdSenseCalculator() {
    const [views, setViews] = useState<number>(50000);
    const [ctr, setCtr] = useState<number>(2.0);
    const [cpc, setCpc] = useState<number>(0.35);
    const [country, setCountry] = useState<string>("1.0");
    const [trafficSource, setTrafficSource] = useState<string>("1.0");
    const [adOptimization, setAdOptimization] = useState<string>("1.0");
    const [isCalculated, setIsCalculated] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    useEffect(() => {
        setIsCalculated(true);
    }, []);

    const countryMultiplier = parseFloat(country);
    const trafficMultiplier = parseFloat(trafficSource);
    const optMultiplier = parseFloat(adOptimization);
    const adjustedCPC = cpc * countryMultiplier;
    const clicks = views * (ctr / 100) * trafficMultiplier * optMultiplier;
    const monthly = clicks * adjustedCPC;
    const rpm = views > 0 ? (monthly / views) * 1000 : 0;

    const yearly = monthly * 12;
    const daily = monthly / 30;

    const handleCalculate = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            if (window.innerWidth <= 768) {
                document.querySelector('.card-right')?.scrollIntoView({ behavior: 'smooth' });
            }
        }, 400);
    };

    const handleReset = () => {
        setIsResetting(true);
        setViews(50000);
        setCtr(2.0);
        setCpc(0.35);
        setCountry("1.0");
        setTrafficSource("1.0");
        setAdOptimization("1.0");
        setTimeout(() => setIsResetting(false), 800);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(fmt(monthly));
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1800);
    };

    const handleExport = () => {
        const text = `IncomeFromViews — AdSense Revenue\nGenerated: ${new Date().toLocaleDateString()}\n\nMonthly: ${fmt(monthly)}\nDaily: ${fmt(daily)}\nYearly: ${fmt(yearly)}\nRPM: ${fmt(rpm)}`;
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "AdSense_Revenue.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    let insight = '';
    if (rpm < 5) {
        insight = 'Your RPM is below average. Improve ad placement or target higher CPC keywords.';
    } else if (rpm < 15) {
        insight = 'You are in a healthy RPM range. Scaling traffic will significantly increase revenue.';
    } else {
        insight = 'High RPM territory. Focus on increasing pageviews to scale earnings.';
    }

    const goal = 1000;
    const neededViews = rpm > 0 ? (goal / rpm) * 1000 : 0;

    return (
        <div className="calc-section">
            <div className="card">
                <div className="card-grid">
                    <div className="card-left">
                        <div className="form-group" style={{ marginBottom: '8px' }}>
                            <label>Monthly Pageviews</label>
                            <input type="number" value={views} onChange={(e) => setViews(parseFloat(e.target.value) || 0)} />
                        </div>
                        <div className="quick-views" style={{ marginBottom: '10px' }}>
                            {[10000, 50000, 100000, 500000, 1000000].map(val => (
                                <button
                                    key={val}
                                    type="button"
                                    className={`qv-btn ${views === val ? 'active' : ''}`}
                                    onClick={() => setViews(val)}
                                >
                                    {val >= 1000000 ? `${val / 1000000}M` : `${val / 1000}K`}
                                </button>
                            ))}
                        </div>

                        <div className="range-group">
                            <div className="range-top">
                                <label>Click-Through Rate (CTR)</label>
                                <span className="range-val">{ctr.toFixed(1)}%</span>
                            </div>
                            <input
                                type="range"
                                min="0.1"
                                max="15"
                                step="0.1"
                                value={ctr}
                                onChange={(e) => setCtr(parseFloat(e.target.value))}
                            />
                        </div>
                        <div className="form-group">
                            <label>Cost Per Click — CPC ($)</label>
                            <div className="prefix-wrap">
                                <span className="prefix">$</span>
                                <input
                                    type="number"
                                    value={cpc}
                                    step="0.01"
                                    onChange={(e) => setCpc(parseFloat(e.target.value) || 0)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Primary Traffic Country</label>
                            <select value={country} onChange={(e) => setCountry(e.target.value)}>
                                <option value="1.0">🇺🇸 United States</option>
                                <option value="0.9">🇬🇧 United Kingdom</option>
                                <option value="0.85">🇨🇦 Canada</option>
                                <option value="0.95">🇦🇺 Australia</option>
                                <option value="0.7">🇩🇪 Germany</option>
                                <option value="0.6">🌍 Global Mixed</option>
                                <option value="0.35">🇮🇳 India</option>
                                <option value="0.30">🇵🇰 Pakistan</option>
                                <option value="0.40">🇳🇬 Nigeria</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Traffic Source</label>
                            <select value={trafficSource} onChange={(e) => setTrafficSource(e.target.value)}>
                                <option value="1.0">🔍 Organic Search (SEO)</option>
                                <option value="0.7">🔗 Direct Traffic</option>
                                <option value="0.6">🌐 Referral</option>
                                <option value="0.5">📱 Social Media</option>
                                <option value="0.4">📧 Email</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Ad Optimization Level</label>
                            <select value={adOptimization} onChange={(e) => setAdOptimization(e.target.value)}>
                                <option value="1.0">Basic Placement</option>
                                <option value="1.15">Optimized Layout</option>
                                <option value="1.3">High RPM Layout</option>
                            </select>
                        </div>
                        <p className="auto-note" style={{ marginTop: '10px' }}>
                            💡 Adjust values — results update automatically.
                        </p>
                        <button className={`btn-primary ${isLoading ? 'loading' : ''}`} onClick={handleCalculate}>
                            {isLoading ? '⏳ Calculating...' : '⚡ Calculate AdSense Revenue'}
                        </button>
                        <button className={isResetting ? "btn-ghost text-green-500" : "btn-ghost"} onClick={handleReset}>
                            {isResetting ? '✓ Reset' : '↺ Reset'}
                        </button>
                    </div>

                    <div className="card-right">
                        <div className="output-hero" style={{ background: 'linear-gradient(135deg,#4285F4,#34A853)' }}>
                            <div className="output-label">Monthly AdSense Revenue</div>
                            <div className="output-value pop">{isCalculated ? fmt(monthly) : '$0.00'}</div>
                            <div className="output-sub">estimated earnings</div>
                        </div>
                        <div className="breakdown">
                            <div className="bd-item">
                                <div className="bd-val">{isCalculated ? fmtN(clicks) : '0'}</div>
                                <div className="bd-label">Monthly Clicks</div>
                            </div>
                            <div className="bd-item">
                                <div className="bd-val">{isCalculated ? fmt(rpm) : '$0.00'}</div>
                                <div className="bd-label">Page RPM</div>
                            </div>
                            <div className="bd-item">
                                <div className="bd-val">{isCalculated ? fmt(yearly) : '$0.00'}</div>
                                <div className="bd-label">Yearly</div>
                            </div>
                            <div className="bd-item">
                                <div className="bd-val">{isCalculated ? fmt(daily) : '$0.00'}</div>
                                <div className="bd-label">Daily Avg</div>
                            </div>
                        </div>
                        <div className="formula">
                            Revenue = {isCalculated ? `${views.toLocaleString()} × ${ctr.toFixed(1)}% × $${adjustedCPC.toFixed(2)}` : ''}
                        </div>
                        <div className="action-row">
                            <button className="act-btn" onClick={handleCopy} style={{ color: isCopied ? 'var(--green)' : '' }}>
                                {isCopied ? '✓ Copied!' : '⎘ Copy'}
                            </button>
                            <button className="act-btn" onClick={handleExport}>↓ Export</button>
                        </div>
                        <div className="insight-box">
                            <h4>📊 Earnings Insight</h4>
                            <p>{isCalculated ? insight : ''}</p>
                        </div>
                        <div className="goal-box">
                            <div className="goal-title">🎯 Income Goals</div>
                            <div>
                                {isCalculated && neededViews > 0 ? `To earn $1,000/month → approx ${Math.round(neededViews).toLocaleString()} pageviews needed` : ''}
                            </div>
                        </div>
                        <div style={{ marginTop: '5px' }}>
                            <Link href="/youtube-earnings-calculator/" className="cta-mini" style={{ textDecoration: 'none' }}>
                                👉 Compare with YouTube earnings →
                            </Link><br />
                            <Link href="/tiktok-earnings-calculator/" className="cta-mini" style={{ textDecoration: 'none' }}>
                                👉 Compare with TikTok earnings →
                            </Link><br />
                            <Link href="/instagram-earnings-calculator/" className="cta-mini" style={{ textDecoration: 'none' }}>
                                👉 Compare with Instagram earnings →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
