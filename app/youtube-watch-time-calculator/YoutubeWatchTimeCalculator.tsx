"use client";

import { useState, useEffect } from "react";
import { fmtN } from "../lib/format";
import Link from "next/link";

export default function YoutubeWatchTimeCalculator() {
    const [mode, setMode] = useState<"progress" | "required">("progress");

    // Progress mode state
    const [totalViews, setTotalViews] = useState(25000);
    const [avgDuration, setAvgDuration] = useState(5);
    const [targetHours, setTargetHours] = useState(4000);

    // Required mode state
    const [avgDuration2, setAvgDuration2] = useState(5);
    const [targetHours2, setTargetHours2] = useState(4000);
    const [currentHoursInput, setCurrentHoursInput] = useState(0);

    const [isCalculating, setIsCalculating] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    // Computed values
    let currentHours = 0;
    let viewsNeeded = 0;
    let finalTotalViews = 0;
    let finalAvgDuration = 0;
    let finalTargetHours = 0;

    if (mode === "progress") {
        currentHours = (totalViews * avgDuration) / 60;
        const remainingHours = Math.max(0, targetHours - currentHours);
        viewsNeeded = Math.ceil((remainingHours * 60) / avgDuration);
        finalTotalViews = totalViews;
        finalAvgDuration = avgDuration;
        finalTargetHours = targetHours;
    } else {
        currentHours = currentHoursInput;
        const hoursNeeded = Math.max(0, targetHours2 - currentHours);
        viewsNeeded = Math.ceil((hoursNeeded * 60) / avgDuration2);
        finalTotalViews = Math.ceil((currentHours * 60) / avgDuration2);
        finalAvgDuration = avgDuration2;
        finalTargetHours = targetHours2;
    }

    const remainingHoursValue = Math.max(0, finalTargetHours - currentHours);
    const progressPercent = Math.min(100, finalTargetHours > 0 ? (currentHours / finalTargetHours) * 100 : 0);

    const views3min = Math.ceil((finalTargetHours * 60) / 3);
    const views5min = Math.ceil((finalTargetHours * 60) / 5);
    const views8min = Math.ceil((finalTargetHours * 60) / 8);
    const views12min = Math.ceil((finalTargetHours * 60) / 12);

    let progressBarStyles = { background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)' };
    if (progressPercent < 50) {
        progressBarStyles.background = 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)';
    } else if (progressPercent < 75) {
        progressBarStyles.background = 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)';
    } else if (progressPercent < 100) {
        progressBarStyles.background = 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)';
    }

    let insightMessage = '';
    if (progressPercent >= 100) {
        insightMessage = 'Congratulations! You\'ve reached the 4,000-hour requirement. Make sure you also have 1,000 subscribers to apply for monetization.';
    } else if (progressPercent >= 75) {
        insightMessage = 'You\'re in the final stretch. Focus on maintaining consistent uploads and improving retention to hit 4,000 hours soon.';
    } else if (progressPercent >= 50) {
        insightMessage = 'You\'re halfway there! Your current pace is good. Consider creating longer videos (8-12 min) to accelerate progress.';
    } else if (progressPercent >= 25) {
        insightMessage = 'You\'re making progress. Focus on videos with strong hooks to improve average view duration and reach 4,000 hours faster.';
    } else {
        insightMessage = 'You\'re in the early stages. Create 8-12 minute videos with high retention rates to build watch time efficiently.';
    }

    const videosAt100Views = Math.ceil(viewsNeeded / 100);
    const videosAt500Views = Math.ceil(viewsNeeded / 500);
    const videosAt1000Views = Math.ceil(viewsNeeded / 1000);

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
        setTotalViews(25000);
        setAvgDuration(5);
        setTargetHours(4000);
        setAvgDuration2(5);
        setTargetHours2(4000);
        setCurrentHoursInput(0);
        handleCalculate();
        setTimeout(() => setIsResetting(false), 800);
    };

    const shareIt = () => {
        if (navigator.share) {
            navigator.share({
                title: "YouTube Watch Time Calculator",
                text: `I'm at ${currentHours.toFixed(0)} watch hours! Calculate yours here:`,
                url: window.location.href,
            });
        } else {
            handleCopy();
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(`My YouTube Watch Time: ${currentHours.toFixed(0)} hours`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleExport = () => {
        let csv = "Metric,Value\n";
        csv += `Current Watch Time,${currentHours.toFixed(0)} hours\n`;
        csv += `Hours Remaining,${remainingHoursValue.toFixed(0)}\n`;
        csv += `Views Needed,${viewsNeeded}\n`;
        csv += `Avg Duration,${finalAvgDuration.toFixed(1)} min\n`;
        csv += `Total Views,${finalTotalViews}\n`;
        csv += `Progress,${progressPercent.toFixed(1)}%\n`;
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "YouTube_Watch_Time_Estimate.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="card">
            <div className="card-grid">
                <div className="card-left">
                    <div className="tabs">
                        <button className={`tab ${mode === "progress" ? "on" : ""}`} onClick={() => { setMode("progress"); handleCalculate(); }}>Watch Time Progress</button>
                        <button className={`tab ${mode === "required" ? "on" : ""}`} onClick={() => { setMode("required"); handleCalculate(); }}>Views Needed</button>
                    </div>

                    {mode === "progress" && (
                        <div id="watch-progress">
                            <div className="form-group">
                                <label>Total Channel Views
                                    <span className="tip-wrap">
                                        <span className="tip-icon">i</span>
                                        <span className="tip-text">Total views across all your videos in the last 12 months.</span>
                                    </span>
                                </label>
                                <input type="number" value={totalViews} onChange={e => setTotalViews(Number(e.target.value))} />
                            </div>
                            <div className="form-group">
                                <label>Average View Duration (minutes)</label>
                                <input type="number" value={avgDuration} step="0.1" onChange={e => setAvgDuration(Number(e.target.value))} />
                                <div className="calc-input-helper">From YouTube Analytics &rarr; Engagement &rarr; Average view duration</div>
                            </div>
                            <div className="form-group">
                                <label>Target Watch Hours</label>
                                <input type="number" value={targetHours} onChange={e => setTargetHours(Number(e.target.value))} />
                                <div className="calc-input-helper">Default: 4,000 (monetization requirement)</div>
                            </div>
                        </div>
                    )}

                    {mode === "required" && (
                        <div id="watch-required">
                            <div className="form-group">
                                <label>Average View Duration (minutes)</label>
                                <input type="number" value={avgDuration2} step="0.1" onChange={e => setAvgDuration2(Number(e.target.value))} />
                                <div className="calc-input-helper">Your typical viewer retention time per video</div>
                            </div>
                            <div className="form-group">
                                <label>Target Watch Hours</label>
                                <input type="number" value={targetHours2} onChange={e => setTargetHours2(Number(e.target.value))} />
                            </div>
                            <div className="form-group">
                                <label>Current Watch Hours (optional)</label>
                                <input type="number" value={currentHoursInput} onChange={e => setCurrentHoursInput(Number(e.target.value))} />
                                <div className="calc-input-helper">Leave at 0 to see total views needed</div>
                            </div>
                        </div>
                    )}

                    <p className="auto-note">💡 Adjust values &mdash; results update automatically.</p>

                    <button className={`btn-primary ${isCalculating ? 'loading' : ''}`} onClick={handleCalculate}>
                        {isCalculating ? '⏳ Calculating...' : '⚡ Calculate Watch Time'}
                    </button>
                    <button className={isResetting ? "btn-ghost text-green-500" : "btn-ghost"} onClick={handleReset}>
                        {isResetting ? '✓ Reset' : '↺ Reset'}
                    </button>

                    <div className="insight-box" style={{ marginTop: 20 }}>
                        <div style={{ fontWeight: 600, marginBottom: 8 }}>📊 Progress Analysis</div>
                        <div style={{ fontSize: "0.95rem", color: "var(--text-600)" }}>{insightMessage}</div>
                    </div>

                    <div className="goal-box" style={{ marginTop: 20 }}>
                        <div style={{ fontWeight: 600, marginBottom: 8 }}>🎯 Monetization Timeline</div>
                        <div style={{ fontSize: "0.9rem", color: "var(--text-600)" }}>
                            {viewsNeeded > 0 ? (
                                <>
                                    At 100 views/video: <strong>{videosAt100Views.toLocaleString()}</strong> videos needed<br />
                                    At 500 views/video: <strong>{videosAt500Views.toLocaleString()}</strong> videos needed<br />
                                    At 1,000 views/video: <strong>{videosAt1000Views.toLocaleString()}</strong> videos needed
                                </>
                            ) : (
                                <span style={{ color: "#10b981", fontWeight: "bold" }}>✓ Goal reached! Ready to apply for monetization.</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="card-right">
                    <div className="output-hero bg-gradient-yt-card">
                        <div className="output-label">Current Watch Time</div>
                        <div className="output-value">{currentHours.toFixed(0)} hours</div>
                        <div className="output-sub">toward 4,000 hour requirement</div>
                    </div>

                    <div style={{ margin: "1.5rem 0" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.875rem", color: "#6b7280" }}>
                            <span>Monetization Progress</span>
                            <span>{progressPercent.toFixed(1)}%</span>
                        </div>
                        <div className="progress-bar-container">
                            <div className="progress-bar-fill" style={{ width: `${progressPercent}%`, ...progressBarStyles }}>
                                <span>{progressPercent > 15 ? `${progressPercent.toFixed(0)}%` : ""}</span>
                            </div>
                        </div>
                    </div>

                    <div className="breakdown">
                        <div className="bd-item">
                            <div className="bd-val">{Math.max(0, finalTargetHours - currentHours).toFixed(0)}</div>
                            <div className="bd-label">Hours Remaining</div>
                        </div>
                        <div className="bd-item">
                            <div className="bd-val">{fmtN(Math.max(0, viewsNeeded))}</div>
                            <div className="bd-label">Views Needed</div>
                        </div>
                        <div className="bd-item">
                            <div className="bd-val">{finalAvgDuration.toFixed(1)} min</div>
                            <div className="bd-label">Avg Duration</div>
                        </div>
                        <div className="bd-item">
                            <div className="bd-val">{fmtN(finalTotalViews)}</div>
                            <div className="bd-label">Total Views</div>
                        </div>
                    </div>

                    <div className="formula">Watch Time = {fmtN(finalTotalViews)} &times; {finalAvgDuration.toFixed(1)}min &divide; 60 = {currentHours.toFixed(0)}h</div>

                    <div style={{ marginTop: 20, padding: 16, background: "#eff6ff", border: "2px solid #3B82F6", borderRadius: 8 }}>
                        <div style={{ fontWeight: 700, marginBottom: 12, color: "#1e40af" }}>📊 Views Needed by Retention</div>
                        <div style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "#1e40af" }}>
                            <div>3 min avg: <strong>{fmtN(views3min)}</strong> views</div>
                            <div>5 min avg: <strong>{fmtN(views5min)}</strong> views</div>
                            <div>8 min avg: <strong>{fmtN(views8min)}</strong> views</div>
                            <div>12 min avg: <strong>{fmtN(views12min)}</strong> views</div>
                        </div>
                        <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid #3B82F6", fontSize: "0.85rem", color: "#1e40af" }}>
                            Better retention = fewer views needed
                        </div>
                    </div>

                    <div className="action-row mt-16">
                        <button className="act-btn" onClick={handleCopy}>{copied ? "✓ Copied" : "⎘ Copy"}</button>
                        <button className="act-btn" onClick={handleExport}>&darr; Export</button>
                        <button className="act-btn" onClick={shareIt}>⤴ Share</button>
                    </div>

                    <div style={{ marginTop: 16 }}>
                        <Link href="/youtube-earnings-calculator/" className="cta-mini" style={{ textDecoration: "none" }}>
                            👉 Calculate your earnings after monetization &rarr;
                        </Link>
                    </div>
                    <div>
                        <Link href="/blog/how-to-earn-money-on-youtube/" className="cta-mini" style={{ textDecoration: "none" }}>
                            👉 Complete YouTube monetization guide &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
