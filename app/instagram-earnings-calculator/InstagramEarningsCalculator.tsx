"use client";
import { useState, useEffect } from 'react';
import { fmt } from '../lib/format';
import Link from 'next/link';

export default function InstagramEarningsCalculator() {
  const [followers, setFollowers] = useState<number>(50000);
  const [engVal, setEngVal] = useState<number>(3.5);
  const [niche, setNiche] = useState<string>("1.0");
  const [posts, setPosts] = useState<number>(4);
  const [custom, setCustom] = useState<number>(0);
  const [includeReel, setIncludeReel] = useState<boolean>(false);
  const [includeStory, setIncludeStory] = useState<boolean>(false);
  const [isCalculated, setIsCalculated] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    setIsCalculated(true);
  }, []);

  const safeFollowers = followers >= 0 ? followers : 0;
  const eng = engVal / 100;
  const nm = parseFloat(niche);

  let base = 60;
  if (safeFollowers < 10000) base = 60;
  else if (safeFollowers < 50000) base = (safeFollowers / 1000) * 10;
  else if (safeFollowers < 100000) base = (safeFollowers / 1000) * 14;
  else if (safeFollowers < 500000) base = (safeFollowers / 1000) * 18;
  else base = (safeFollowers / 1000) * 22;

  let multiplier = 1 + (eng - 0.035) * 4;
  if (multiplier < 0.5) multiplier = 0.5;

  base = base * nm * multiplier;
  base = Math.max(base, 25);

  const perPost = custom > 0 ? custom : base;

  let finalRate = perPost;
  if (includeReel) finalRate *= 1.2;
  if (includeStory) finalRate *= 1.4;

  const monthly = finalRate * posts;
  const yearly = monthly * 12;

  let tier = '🌱 Nano Influencer';
  if (safeFollowers >= 10000) tier = '📱 Micro Influencer';
  if (safeFollowers >= 50000) tier = '🚀 Mid-Tier Influencer';
  if (safeFollowers >= 100000) tier = '⭐ Macro Influencer';
  if (safeFollowers >= 500000) tier = '💎 Mega Influencer';

  let engStatus = '';
  if (engVal < 1) engStatus = '🔴 Very Low Engagement';
  else if (engVal < 3) engStatus = '🟡 Average Engagement';
  else if (engVal < 6) engStatus = '🟢 High Engagement';
  else engStatus = '🔥 Elite Engagement';

  const suggestedMin = perPost * 0.9;
  const suggestedMax = perPost * 1.2;

  const goalIncome = 5000;
  const neededPosts = perPost > 0 ? Math.ceil(goalIncome / perPost) : 0;

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
    setFollowers(50000);
    setEngVal(3.5);
    setNiche("1.0");
    setPosts(4);
    setCustom(0);
    setIncludeReel(false);
    setIncludeStory(false);
    setTimeout(() => setIsResetting(false), 800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fmt(monthly));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1800);
  };

  const handleExport = () => {
    const text = `IncomeFromViews — Instagram Earnings\nGenerated: ${new Date().toLocaleDateString()}\n\nMonthly Earnings: ${fmt(monthly)}\nPer Post Rate: ${fmt(finalRate)}\nYearly: ${fmt(yearly)}\nTier: ${tier}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Instagram_Earnings.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="calc-section">
      <div className="card">
        <div className="card-grid">
          <div className="card-left">
            <div className="form-group">
              <label>Followers</label>
              <input type="number" value={followers} onChange={(e) => setFollowers(parseFloat(e.target.value) || 0)} />
            </div>
            <div className="range-group">
              <div className="range-top">
                <label>Engagement Rate</label>
                <span className="range-val">{engVal.toFixed(1)}%</span>
              </div>
              <input type="range" min="0.1" max="20" step="0.1" value={engVal} onChange={(e) => setEngVal(parseFloat(e.target.value))} />
              <div className="eng-benchmark">{engStatus}</div>
            </div>
            <div className="form-group">
              <label>Niche / Industry</label>
              <select value={niche} onChange={(e) => setNiche(e.target.value)}>
                <option value="1.5">💰 Finance / Business</option>
                <option value="1.3">💻 Technology</option>
                <option value="1.2">🏥 Health / Fitness</option>
                <option value="1.1">💄 Beauty / Fashion</option>
                <option value="1.0">✨ Lifestyle</option>
                <option value="0.9">🎭 Entertainment</option>
                <option value="0.85">🍔 Food</option>
                <option value="1.0">✈️ Travel</option>
              </select>
            </div>
            <div className="form-group">
              <label>Sponsored Posts / Month</label>
              <input type="number" value={posts} onChange={(e) => setPosts(parseFloat(e.target.value) || 0)} />
            </div>
            <div className="form-group">
              <label>Custom Post Rate ($ — leave 0 to auto)</label>
              <div className="prefix-wrap">
                <span className="prefix">$</span>
                <input type="number" value={custom} placeholder="Auto-calculated" onChange={(e) => setCustom(parseFloat(e.target.value) || 0)} />
              </div>
            </div>
            <div className="format-options">
              <label>
                <input type="checkbox" checked={includeReel} onChange={(e) => setIncludeReel(e.target.checked)} />
                Include Reel (+20%)
              </label>
              <label>
                <input type="checkbox" checked={includeStory} onChange={(e) => setIncludeStory(e.target.checked)} />
                Include Story Package (+40%)
              </label>
            </div>
            <p className="auto-note" style={{ marginTop: '10px' }}>
              💡 Adjust values — results update automatically.
            </p>
            <button className={`btn-primary ${isLoading ? 'loading' : ''}`} onClick={handleCalculate}>
              {isLoading ? '⏳ Calculating...' : '⚡ Calculate Instagram Earnings'}
            </button>
            <button className={isResetting ? "btn-ghost text-green-500" : "btn-ghost"} onClick={handleReset}>
              {isResetting ? '✓ Reset' : '↺ Reset'}
            </button>
            <div style={{ marginTop: '20px' }}>
              <Link href="/youtube-earnings-calculator/" className="cta-mini" style={{ textDecoration: 'none' }}>
                👉 Compare with YouTube earnings →
              </Link><br />
              <Link href="/tiktok-earnings-calculator/" className="cta-mini" style={{ textDecoration: 'none' }}>
                👉 Compare with TikTok earnings →
              </Link>
            </div>
          </div>
          <div className="card-right">
            <div className="output-hero" style={{ background: 'linear-gradient(135deg,#833AB4,#E1306C)' }}>
              <div className="output-label">Monthly Earnings</div>
              <div className="output-value pop">{isCalculated ? fmt(monthly) : '$0.00'}</div>
              <div className="output-sub">{tier}</div>
            </div>
            <div className="breakdown">
              <div className="bd-item">
                <div className="bd-val">{isCalculated ? fmt(finalRate) : '$0.00'}</div>
                <div className="bd-label">Per Post</div>
              </div>
              <div className="bd-item">
                <div className="bd-val">{isCalculated ? fmt(yearly) : '$0.00'}</div>
                <div className="bd-label">Yearly</div>
              </div>
            </div>
            <div className="insight-box">
              {isCalculated && (
                <p>💡 Based on your engagement and niche, you could confidently charge between <strong>{fmt(suggestedMin)}</strong> – <strong>{fmt(suggestedMax)}</strong> per post.</p>
              )}
            </div>
            <div className="goal-box">
              <div className="goal-title">🎯 To earn $5,000 per month, you need approximately <strong>{neededPosts}</strong> sponsored posts.</div>
            </div>
            <div className="info-box">
              <h4>Influencer Tiers</h4>
              <div className="info-row"><span className="info-tag">Nano</span><span style={{ fontSize: '12px', color: 'var(--text-500)' }}>&lt;10K followers — $10–$100/post</span></div>
              <div className="info-row"><span className="info-tag">Micro</span><span style={{ fontSize: '12px', color: 'var(--text-500)' }}>10K–50K — $100–$500/post</span></div>
              <div className="info-row"><span className="info-tag">Mid</span><span style={{ fontSize: '12px', color: 'var(--text-500)' }}>50K–100K — $500–$1,500/post</span></div>
              <div className="info-row"><span className="info-tag">Macro</span><span style={{ fontSize: '12px', color: 'var(--text-500)' }}>100K–500K — $1,500–$5,000/post</span></div>
              <div className="info-row"><span className="info-tag">Mega</span><span style={{ fontSize: '12px', color: 'var(--text-500)' }}>500K+ — $5,000–$50,000+/post</span></div>
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
