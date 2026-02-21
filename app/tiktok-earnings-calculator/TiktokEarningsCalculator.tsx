"use client";
import { useState, useEffect } from 'react';
import { fmt, fmtN } from '../lib/format';
import Link from 'next/link';

export default function TiktokEarningsCalculator() {
  const [views, setViews] = useState<number>(1000000);
  const [program, setProgram] = useState<string>("0.50");
  const [sponPosts, setSponPosts] = useState<number>(2);
  const [sponVal, setSponVal] = useState<number>(500);
  const [country, setCountry] = useState<string>("1");
  const [isCalculated, setIsCalculated] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    setIsCalculated(true);
  }, []);

  const safeViews = views >= 0 ? views : 0;
  const baseRPM = parseFloat(program);
  const countryMult = parseFloat(country) || 1;
  const rpm = baseRPM * countryMult;

  const fund = (safeViews * rpm) / 1000;
  const spon = sponPosts * sponVal;
  const total = fund + spon;

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
    setViews(1000000);
    setProgram("0.50");
    setCountry("1");
    setSponPosts(2);
    setSponVal(500);
    setTimeout(() => setIsResetting(false), 800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fmt(total));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1800);
  };

  const handleExport = () => {
    const text = `IncomeFromViews — TikTok Earnings\nGenerated: ${new Date().toLocaleDateString()}\n\nTotal Monthly: ${fmt(total)}\nCreator Fund: ${fmt(fund)}\nSponsorships: ${fmt(spon)}\nYearly Est: ${fmt(total * 12)}\nPer 1K Views: $${(safeViews > 0 ? (total / safeViews * 1000).toFixed(3) : '0.000')}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "TikTok_Earnings.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'TikTok Earnings Calculator',
          text: `I estimated I could earn ${fmt(total)} on TikTok using IncomeFromViews!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopy();
    }
  };

  let insight = 'Adjust values to see personalized insights.';
  if (isCalculated) {
    if (total < 1000) {
      insight = 'You are in the early-stage creator range. Increasing monthly views to 2M could double income.';
    } else if (total < 5000) {
      insight = 'You are in the growing creator range. Sponsorships now significantly impact earnings.';
    } else {
      insight = 'You are operating at advanced creator level. Focus on scaling sponsorship value and premium audiences.';
    }
  }

  const goal = 5000;
  const requiredViews = rpm > 0 ? (goal / rpm) * 1000 : 0;

  return (
    <div className="calc-section">
      <div className="card">
        <div className="card-grid">
          <div className="card-left">
            <div className="form-group" style={{ marginBottom: '8px' }}>
              <label>Monthly Views</label>
              <input type="number" value={views} onChange={(e) => setViews(parseFloat(e.target.value) || 0)} />
            </div>

            <div className="quick-views" style={{ marginBottom: '16px' }}>
              {[1000000, 5000000, 10000000].map(val => (
                <button
                  key={val}
                  type="button"
                  className={`quick-btn ${views === val ? 'active' : ''}`}
                  onClick={() => setViews(val)}
                >
                  {val >= 1000000 ? `${val / 1000000}M` : val}
                </button>
              ))}
            </div>

            <div className="form-group">
              <label>
                Program / RPM Rate
                <span className="tip-wrap">
                  <span className="tip-icon">i</span>
                  <span className="tip-text">Creativity Program pays 10–20× more than the old Creator Fund.</span>
                </span>
              </label>
              <select value={program} onChange={(e) => setProgram(e.target.value)}>
                <option value="0.03">Creator Fund — avg $0.03 per 1K</option>
                <option value="0.50">Creativity Program — avg $0.50 per 1K</option>
                <option value="1.00">Creativity Program — high $1.00 per 1K</option>
              </select>
            </div>
            <div className="form-group">
              <label>Sponsored Posts / Month</label>
              <input type="number" value={sponPosts} onChange={(e) => setSponPosts(parseFloat(e.target.value) || 0)} />
            </div>
            <div className="form-group">
              <label>Value Per Sponsored Post ($)</label>
              <div className="prefix-wrap">
                <span className="prefix">$</span>
                <input type="number" value={sponVal} onChange={(e) => setSponVal(parseFloat(e.target.value) || 0)} />
              </div>
            </div>
            <div className="form-group">
              <label>Audience Country</label>
              <select value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="1">🌍 Global Average (×1.0)</option>
                <option value="3.2">🇺🇸 United States (×3.2)</option>
                <option value="2.8">🇬🇧 United Kingdom (×2.8)</option>
                <option value="2.5">🇦🇺 Australia (×2.5)</option>
                <option value="2.1">🇨🇦 Canada (×2.1)</option>
                <option value="1.8">🇩🇪 Germany (×1.8)</option>
                <option value="1.5">🇫🇷 France (×1.5)</option>
                <option value="0.5">🇧🇷 Brazil (×0.5)</option>
                <option value="0.55">🇵🇭 Philippines (×0.55)</option>
                <option value="0.45">🇳🇬 Nigeria (×0.45)</option>
                <option value="0.4">🇮🇳 India (×0.4)</option>
                <option value="0.35">🇵🇰 Pakistan (×0.35)</option>
                <option value="0.3">🇧🇩 Bangladesh (×0.3)</option>
              </select>
            </div>

            <p className="auto-note" style={{ marginTop: '10px' }}>
              💡 Adjust values — results update automatically.
            </p>
            <button className={`btn-primary ${isLoading ? 'loading' : ''}`} onClick={handleCalculate}>
              {isLoading ? '⏳ Calculating...' : '⚡ Calculate TikTok Earnings'}
            </button>
            <button className={isResetting ? "btn-ghost text-green-500" : "btn-ghost"} onClick={handleReset}>
              {isResetting ? '✓ Reset' : '↺ Reset'}
            </button>
          </div>
          <div className="card-right">
            <div className="output-hero" style={{ background: 'linear-gradient(135deg,#00B4D8,#EE1D52)' }}>
              <div className="output-label">Total Monthly Earnings</div>
              <div className="output-value pop">{isCalculated ? fmt(total) : '$0.00'}</div>
              <div className="output-sub">estimated combined</div>
            </div>
            <div className="breakdown">
              <div className="bd-item">
                <div className="bd-val">{isCalculated ? fmt(fund) : '$0.00'}</div>
                <div className="bd-label">Creator Fund</div>
              </div>
              <div className="bd-item">
                <div className="bd-val">{isCalculated ? fmt(spon) : '$0.00'}</div>
                <div className="bd-label">Sponsorships</div>
              </div>
              <div className="bd-item">
                <div className="bd-val">{isCalculated ? fmt(total * 12) : '$0.00'}</div>
                <div className="bd-label">Yearly Est.</div>
              </div>
              <div className="bd-item">
                <div className="bd-val">{isCalculated ? '$' + (safeViews > 0 ? (total / safeViews * 1000).toFixed(3) : '0.000') : '$0.00'}</div>
                <div className="bd-label">Per 1K Views</div>
              </div>
            </div>
            <div className="action-row">
              <button className="act-btn" onClick={handleCopy} style={{ color: isCopied ? 'var(--green)' : '' }}>
                {isCopied ? '✓ Copied!' : '⎘ Copy'}
              </button>
              <button className="act-btn" onClick={handleExport}>↓ Export</button>
              <button className="act-btn" onClick={handleShare}>⤴ Share</button>
            </div>
            <div className="insight-box">
              <div className="insight-title">📊 Earnings Insight</div>
              <p>{insight}</p>
            </div>
            <div className="goal-box">
              <div className="goal-title">🎯 Income Goals</div>
              <div>
                {isCalculated && requiredViews > 0 ? `To earn $5,000/month → approx ${Math.round(requiredViews).toLocaleString()} monthly views` : ''}
              </div>
            </div>
            <div style={{ marginTop: '16px' }}>
              <Link href="/youtube-earnings-calculator/" className="cta-mini" style={{ textDecoration: 'none' }}>
                👉 Compare with YouTube earnings →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
