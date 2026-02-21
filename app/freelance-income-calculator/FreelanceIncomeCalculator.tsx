"use client";
import { useState, useEffect } from 'react';
import { fmt, fmtN } from '../lib/format';
import Link from 'next/link';

export default function FreelanceIncomeCalculator() {
  const [rate, setRate] = useState<number>(50);
  const [hours, setHours] = useState<number>(40);
  const [weeks, setWeeks] = useState<number>(4);
  const [exp, setExp] = useState<number>(200);
  const [taxVal, setTaxVal] = useState<number>(30);
  const [vac, setVac] = useState<number>(2);

  const [isCalculated, setIsCalculated] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    setIsCalculated(true);
  }, []);

  const safeRate = rate >= 0 ? rate : 0;
  const safeHours = hours >= 0 ? hours : 0;
  const safeWeeks = weeks >= 0 ? weeks : 0;
  const safeExp = exp >= 0 ? exp : 0;
  const safeVac = vac >= 0 ? vac : 0;

  const tax = taxVal / 100;

  // Monthly Logic
  const gross = safeRate * safeHours * safeWeeks;
  const preTax = gross - safeExp;
  const taxAmt = Math.max(0, preTax * tax);
  const net = preTax - taxAmt;

  // Annual Logic
  const workWeeks = Math.max(0, 52 - safeVac);
  const annualGross = safeRate * safeHours * workWeeks;
  const annualExp = safeExp * 12;
  const annualPreTax = annualGross - annualExp;
  const annualTaxAmt = Math.max(0, annualPreTax * tax);
  const annualNet = annualPreTax - annualTaxAmt;

  // Effective Hourly Rate
  const totalHours = safeHours * workWeeks;
  const eff = totalHours > 0 ? annualNet / totalHours : 0;

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
    setRate(50);
    setHours(40);
    setWeeks(4);
    setExp(200);
    setTaxVal(30);
    setVac(2);
    setTimeout(() => setIsResetting(false), 800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fmt(net));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1800);
  };

  const handleExport = () => {
    const text = `IncomeFromViews — Freelance Income\nGenerated: ${new Date().toLocaleDateString()}\n\nNet Monthly Income: ${fmt(net)}\nGross Monthly: ${fmt(gross)}\nNet Annual: ${fmt(annualNet)}\nMonthly Tax Amount: ${fmt(taxAmt)}\nEffective Hourly Rate: $${eff.toFixed(2)}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Freelance_Income.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Freelance Income Calculator',
          text: `I estimated my freelance net income could be ${fmt(net)}/mo using IncomeFromViews!`,
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
    if (taxVal > 40) insightMessage = "Your tax rate is high. Consider consulting a professional for possible business deductions.";
    else if (net > 8000) insightMessage = "Excellent! You have a high net income. Diversifying into passive income could build long-term wealth.";
    else if (net > 4000) insightMessage = "Great base! Optimizing your overhead could further increase your monthly take-home pay.";
    else insightMessage = "Consider raising your hourly rate or upskilling to increase your net earnings potential.";
  }

  const avgMonthly = annualNet / 12;
  const taxReserve = avgMonthly * 0.3;
  const emergencyFund = avgMonthly * 6;

  return (
    <div className="calc-section">
      <div className="card">
        <div className="card-grid">
          <div className="card-left">
            <div className="input-row">
              <div className="form-group">
                <label>Hourly Rate ($)</label>
                <div className="prefix-wrap">
                  <span className="prefix">$</span>
                  <input type="number" value={rate} onChange={(e) => setRate(parseFloat(e.target.value) || 0)} />
                </div>
              </div>
              <div className="form-group">
                <label>Hours / Week</label>
                <input type="number" max="168" value={hours} onChange={(e) => setHours(parseFloat(e.target.value) || 0)} />
              </div>
            </div>
            <div className="input-row">
              <div className="form-group">
                <label>Weeks / Month</label>
                <input type="number" step="0.5" max="5" value={weeks} onChange={(e) => setWeeks(parseFloat(e.target.value) || 0)} />
              </div>
              <div className="form-group">
                <label>Monthly Expenses ($)</label>
                <div className="prefix-wrap">
                  <span className="prefix">$</span>
                  <input type="number" value={exp} onChange={(e) => setExp(parseFloat(e.target.value) || 0)} />
                </div>
              </div>
            </div>
            <div className="range-group">
              <div className="range-top">
                <label>Tax Rate</label>
                <span className="range-val">{taxVal}%</span>
              </div>
              <input type="range" min="0" max="60" value={taxVal} onChange={(e) => setTaxVal(parseFloat(e.target.value))} />
            </div>
            <div className="form-group">
              <label>Vacation Weeks / Year</label>
              <input type="number" max="52" value={vac} onChange={(e) => setVac(parseFloat(e.target.value) || 0)} />
            </div>
            <p className="auto-note" style={{ marginTop: '10px' }}>
              💡 Adjust values — results update automatically.
            </p>

            <div className="calc-action-row">
              <button className={`btn-primary ${isLoading ? 'loading' : ''}`} onClick={handleCalculate}>
                {isLoading ? '⏳ Calculating...' : '⚡ Calculate Net Income'}
              </button>
              <button className={isResetting ? "btn-ghost text-green-500" : "btn-ghost"} onClick={handleReset}>
                {isResetting ? '✓ Reset' : '↺ Reset'}
              </button>
            </div>

            <div className="notice" style={{ marginTop: '14px' }}>
              <span className="notice-icon">⚠️</span>
              <span>Set aside funds for self-employment tax, health insurance, and retirement savings. Consider
                quarterly estimated tax payments.</span>
            </div>

            {isCalculated && (
              <>
                <div className="insight-box" style={{ marginTop: '20px', display: 'block' }}>
                  <div style={{ fontWeight: 600, marginBottom: '8px' }}>📊 Income Analysis</div>
                  <div style={{ fontSize: '0.95rem', color: 'var(--text-600)' }}>{insightMessage}</div>
                </div>

                <div className="goal-box" style={{ marginTop: '20px' }}>
                  <div style={{ fontWeight: 600, marginBottom: '8px' }}>🎯 Savings Goals</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-600)' }}>
                    Monthly Tax Reserve: <strong>{fmt(taxReserve)}</strong> (Recommended 30%)<br />
                    6-Month Emergency Fund: <strong>{fmt(emergencyFund)}</strong><br />
                    Yearly Investment Target: <strong>{fmt(annualNet * 0.15)}</strong> (15% goal)
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="card-right">
            <div className="output-hero" style={{ background: 'linear-gradient(135deg,#22c55e,#14b8a6)' }}>
              <div className="output-label">Net Monthly Income</div>
              <div className="output-value pop">{isCalculated ? fmt(net) : '$0.00'}</div>
              <div className="output-sub">
                {isCalculated ? `Avg: ${fmt(avgMonthly)}/mo (Annual / 12)` : 'after expenses and tax'}
              </div>
            </div>
            <div className="breakdown">
              <div className="bd-item">
                <div className="bd-val">{isCalculated ? fmt(gross) : '$0.00'}</div>
                <div className="bd-label">Gross Monthly</div>
              </div>
              <div className="bd-item">
                <div className="bd-val">{isCalculated ? fmt(annualNet) : '$0.00'}</div>
                <div className="bd-label">Net Annual</div>
              </div>
              <div className="bd-item">
                <div className="bd-val">{isCalculated ? fmt(taxAmt) : '$0.00'}</div>
                <div className="bd-label">Tax Amount</div>
              </div>
              <div className="bd-item">
                <div className="bd-val">{isCalculated ? `$${eff.toFixed(2)}` : '$0.00'}</div>
                <div className="bd-label">Effective/hr</div>
              </div>
            </div>
            <div className="formula">
              Net = {isCalculated ? `(${fmt(safeRate)} × ${safeHours}h × ${safeWeeks}w − ${fmt(safeExp)}) × ${(1 - tax).toFixed(2)} = ${fmt(net)}` : '(Rate × Hours × Weeks − Expenses) × (1 − Tax%)'}
            </div>

            <div className="action-row">
              <button className="act-btn" onClick={handleCopy} style={{ color: isCopied ? 'var(--green)' : '' }}>
                {isCopied ? '✓ Copied!' : '⎘ Copy Result'}
              </button>
              <button className="act-btn" onClick={handleExport}>↓ Export</button>
              <button className="act-btn" onClick={handleShare}>⤴ Share</button>
            </div>

            <div style={{ marginTop: '16px' }}>
              <Link href="/youtube-earnings-calculator/" className="cta-mini" style={{ textDecoration: 'none' }}>
                👉 Compare with YouTube potential →
              </Link>
            </div>
            <div>
              <Link href="/affiliate-earnings-calculator/" className="cta-mini" style={{ textDecoration: 'none' }}>
                👉 Explore affiliate revenue →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
