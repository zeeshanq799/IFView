"use client";
import { useState, useEffect } from 'react';
import { fmt, fmtN } from '../lib/format';
import Link from 'next/link';

export default function AffiliateEarningsCalculator() {
  const [traffic, setTraffic] = useState<number>(10000);
  const [convVal, setConvVal] = useState<number>(2.0);
  const [comm, setComm] = useState<number>(25);
  const [progType, setProgType] = useState<string>("1.0");
  const [isCalculated, setIsCalculated] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    setIsCalculated(true);
  }, []);

  const safeTraffic = traffic >= 0 ? traffic : 0;
  const conv = convVal / 100;
  const tm = parseFloat(progType) || 1.0;

  const sales = safeTraffic * conv;
  const monthly = sales * comm * tm;
  const yearRev = monthly * 12;
  const perVisitor = safeTraffic > 0 ? monthly / safeTraffic : 0;
  const at100k = (100000 * conv) * comm * tm;

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
    setTraffic(10000);
    setConvVal(2.0);
    setComm(25);
    setProgType("1.0");
    setTimeout(() => setIsResetting(false), 800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fmt(monthly));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1800);
  };

  const handleExport = () => {
    const text = `IncomeFromViews — Affiliate Earnings\nGenerated: ${new Date().toLocaleDateString()}\n\nMonthly Earnings: ${fmt(monthly)}\nMonthly Sales: ${Math.floor(sales)}\nYearly: ${fmt(yearRev)}\nPer Visitor: ${fmt(perVisitor)}\n@ 100K Traffic: ${fmt(at100k)}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Affiliate_Earnings.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Affiliate Earnings Calculator',
          text: `I estimated I could earn ${fmt(monthly)} in affiliate commissions using IncomeFromViews!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopy();
    }
  };

  let insightMessage = '';
  if (isCalculated) {
    if (convVal < 1) insightMessage = "Your conversion rate is below average. Consider optimizing your landing page or targeting higher-intent keywords.";
    else if (monthly > 5000) insightMessage = "Great scale! You have a highly profitable affiliate funnel. Scaling traffic could yield massive returns.";
    else if (convVal > 5) insightMessage = "Strong conversion rate! Focus on driving more high-quality traffic to maximize this performance.";
    else insightMessage = "Good foundation. Experimenting with different affiliate programs or higher-ticket offers could boost your ROI.";
  }

  return (
    <div className="calc-section">
      <div className="card">
        <div className="card-grid">
          <div className="card-left">
            <div className="form-group">
              <label>Monthly Traffic (Visitors)</label>
              <input type="number" value={traffic} onChange={(e) => setTraffic(parseFloat(e.target.value) || 0)} />
            </div>
            <div className="range-group">
              <div className="range-top">
                <label>Conversion Rate</label>
                <span className="range-val">{convVal.toFixed(1)}%</span>
              </div>
              <input type="range" min="0.1" max="20" step="0.1" value={convVal} onChange={(e) => setConvVal(parseFloat(e.target.value))} />
            </div>
            <div className="form-group">
              <label>Commission Per Sale ($)</label>
              <div className="prefix-wrap">
                <span className="prefix">$</span>
                <input type="number" value={comm} onChange={(e) => setComm(parseFloat(e.target.value) || 0)} />
              </div>
            </div>
            <div className="form-group">
              <label>Program Type</label>
              <select value={progType} onChange={(e) => setProgType(e.target.value)}>
                <option value="1.0">🛒 Physical Products (Amazon etc.)</option>
                <option value="1.5">💻 Digital Products / SaaS</option>
                <option value="2.0">📋 High-Ticket / Finance</option>
                <option value="0.8">🎮 Gaming / Entertainment</option>
              </select>
            </div>
            <p className="auto-note" style={{ marginTop: '10px' }}>
              💡 Adjust values — results update automatically.
            </p>

            <button className={`btn-primary ${isLoading ? 'loading' : ''}`} onClick={handleCalculate}>
              {isLoading ? '⏳ Calculating...' : '⚡ Calculate Affiliate Income'}
            </button>
            <button className={isResetting ? "btn-ghost text-green-500" : "btn-ghost"} onClick={handleReset}>
              {isResetting ? '✓ Reset' : '↺ Reset'}
            </button>

            {isCalculated && (
              <>
                <div className="insight-box" style={{ marginTop: '20px', display: 'block' }}>
                  <div style={{ fontWeight: 600, marginBottom: '8px' }}>📊 Performance Analysis</div>
                  <div style={{ fontSize: '0.95rem', color: 'var(--text-600)' }}>{insightMessage}</div>
                </div>

                <div className="goal-box" style={{ marginTop: '20px' }}>
                  <div style={{ fontWeight: 600, marginBottom: '8px' }}>🎯 Growth Targets</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-600)' }}>
                    2x Traffic Growth: <strong>{fmt(monthly * 2)}</strong><br />
                    5% Conversion Goal: <strong>{fmt(monthly * (5 / convVal))}</strong><br />
                    Target Annual Revenue: <strong>{fmt(monthly * 12 * 1.5)}</strong> (50% Growth)
                  </div>
                </div>
              </>
            )}

          </div>
          <div className="card-right">
            <div className="output-hero" style={{ background: 'linear-gradient(135deg,#8b5cf6,#3b82f6)' }}>
              <div className="output-label">Monthly Affiliate Earnings</div>
              <div className="output-value pop">{isCalculated ? fmt(monthly) : '$0.00'}</div>
              <div className="output-sub">estimated</div>
            </div>
            <div className="breakdown">
              <div className="bd-item">
                <div className="bd-val">{isCalculated ? Math.floor(sales).toLocaleString() : '0'}</div>
                <div className="bd-label">Monthly Sales</div>
              </div>
              <div className="bd-item">
                <div className="bd-val">{isCalculated ? fmt(yearRev) : '$0.00'}</div>
                <div className="bd-label">Yearly</div>
              </div>
              <div className="bd-item">
                <div className="bd-val">{isCalculated ? fmt(perVisitor) : '$0.00'}</div>
                <div className="bd-label">Per Visitor</div>
              </div>
              <div className="bd-item">
                <div className="bd-val">{isCalculated ? fmt(at100k) : '$0.00'}</div>
                <div className="bd-label">@ 100K Traffic</div>
              </div>
            </div>
            <div className="formula">
              Revenue = {isCalculated ? `${safeTraffic.toLocaleString()} × ${(conv * 100).toFixed(1)}% × ${fmt(comm)} = ${fmt(monthly)}` : 'Traffic × Conv% × Commission'}
            </div>

            <div className="action-row">
              <button className="act-btn" onClick={handleCopy} style={{ color: isCopied ? 'var(--green)' : '' }}>
                {isCopied ? '✓ Copied!' : '⎘ Copy'}
              </button>
              <button className="act-btn" onClick={handleExport}>↓ Export</button>
              <button className="act-btn" onClick={handleShare}>⤴ Share</button>
            </div>

            <div style={{ marginTop: '16px' }}>
              <Link href="/adsense-revenue-calculator/" className="cta-mini" style={{ textDecoration: 'none' }}>
                👉 Compare with AdSense revenue →
              </Link>
            </div>
            <div>
              <Link href="/youtube-earnings-calculator/" className="cta-mini" style={{ textDecoration: 'none' }}>
                👉 Check YouTube earnings potential →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
