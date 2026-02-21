"use client";
import { useState, useEffect } from 'react';
import { fmt, fmtN } from '../lib/format';
import Link from 'next/link';

export default function YoutubeRpmCalculator() {
  const [rev, setRev] = useState<number>(280);
  const [views, setViews] = useState<number>(200000);
  const [isCalculated, setIsCalculated] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    setIsCalculated(true);
  }, []);

  const safeViews = views > 0 ? views : 1;
  const rpm = (rev / safeViews) * 1000;
  const cpmEst = rpm / 0.55;
  const ytCut = cpmEst - rpm;

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
    setRev(280);
    setViews(200000);
    setTimeout(() => setIsResetting(false), 800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fmt(rpm));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1800);
  };

  const handleExport = () => {
    const text = `IncomeFromViews — YouTube RPM Calculator\nGenerated: ${new Date().toLocaleDateString()}\n\nTotal Revenue: ${fmt(rev)}\nTotal Views: ${fmtN(safeViews)}\nRPM: ${fmt(rpm)}\nEst. CPM: ${fmt(cpmEst)}\nYouTube's Cut: ${fmt(ytCut)}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "YouTube_RPM.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="calc-section">
      <div className="card">
        <div className="card-grid">
          <div className="card-left">
            <div className="form-group">
              <label>Total Revenue ($)</label>
              <div className="prefix-wrap">
                <span className="prefix">$</span>
                <input
                  type="number"
                  value={rev}
                  onChange={(e) => setRev(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Total Views</label>
              <input
                type="number"
                value={views}
                onChange={(e) => setViews(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="compare-box">
              <div className="compare-item" style={{ background: 'var(--red-light)', borderColor: '#fca5a5' }}>
                <h5 style={{ color: 'var(--red)' }}>CPM</h5>
                <p>What <strong>advertisers pay</strong> YouTube per 1,000 ad impressions. The raw market rate.</p>
              </div>
              <div className="compare-item" style={{ background: 'var(--green-light)', borderColor: '#86efac' }}>
                <h5 style={{ color: 'var(--green)' }}>RPM</h5>
                <p>What <strong>you receive</strong> per 1,000 views. After YouTube's 45% revenue share cut.</p>
              </div>
            </div>
            <p className="auto-note" style={{ marginTop: '16px' }}>
              💡 Adjust values — results update automatically.
            </p>
            <button className={`btn-primary ${isLoading ? 'loading' : ''}`} onClick={handleCalculate}>
              {isLoading ? '⏳ Calculating...' : '⚡ Calculate RPM'}
            </button>
            <button className={isResetting ? "btn-ghost text-green-500" : "btn-ghost"} onClick={handleReset}>
              {isResetting ? '✓ Reset' : '↺ Reset'}
            </button>
            <div style={{ marginTop: '16px' }}>
              <Link href="/youtube-earnings-calculator/" className="cta-mini" style={{ textDecoration: 'none' }}>
                👉 Calculate how much you’d earn with this RPM →
              </Link>
            </div>
          </div>
          <div className="card-right">
            <div className="output-hero" style={{ background: 'linear-gradient(135deg,#eab308,#22c55e)' }}>
              <div className="output-label">Your RPM</div>
              <div className="output-value pop">{isCalculated ? fmt(rpm) : '$0.00'}</div>
              <div className="output-sub">Revenue Per 1,000 views</div>
            </div>
            <div className="breakdown">
              <div className="bd-item">
                <div className="bd-val">{isCalculated ? fmt(cpmEst) : '$0.00'}</div>
                <div className="bd-label">Est. CPM</div>
              </div>
              <div className="bd-item">
                <div className="bd-val">{isCalculated ? fmt(ytCut) : '$0.00'}</div>
                <div className="bd-label">YouTube's Cut</div>
              </div>
            </div>
            <div className="formula">
              RPM = {isCalculated ? `($${rev.toFixed(2)} ÷ ${fmtN(safeViews)}) × 1,000 = ${fmt(rpm)}` : ''}
            </div>
            <div className="notice">
              <span className="notice-icon">ℹ️</span>
              <span>RPM ≈ CPM × 0.55 — YouTube keeps 45% of ad revenue. RPM includes all your revenue sources (ads, memberships, Super Chat, etc.).</span>
            </div>
            <div className="action-row">
              <button className="act-btn" onClick={handleCopy} style={{ color: isCopied ? 'var(--green)' : '' }}>
                {isCopied ? '✓ Copied!' : '⎘ Copy'}
              </button>
              <button className="act-btn" onClick={handleExport}>↓ Export</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
