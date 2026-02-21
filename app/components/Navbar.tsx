"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

    // Helper to determine if a link is active
    const isActive = (path: string) => pathname === path;

    return (
        <>
            <nav className="site-nav" aria-label="Main Navigation">
                <Link href="/" className="nav-logo">
                    <img src="/logo.svg" alt="IncomeFromViews Logo" className="nav-logo-img" width="36" height="36" />
                    <span className="nav-logo-text">Income<em>FromViews</em></span>
                </Link>

                <div className="nav-links">
                    <div className="nav-dropdown">
                        <span className={`nav-link dropdown-trigger ${pathname?.startsWith('/youtube-') ? 'active' : ''}`}>
                            YouTube ▼
                        </span>
                        <div className="nav-dropdown-content">
                            <Link href="/youtube-earnings-calculator/" className={`nav-link ${isActive('/youtube-earnings-calculator/') ? 'active' : ''}`}>Earnings Calculator</Link>
                            <Link href="/youtube-rpm-calculator/" className={`nav-link ${isActive('/youtube-rpm-calculator/') ? 'active' : ''}`}>RPM Calculator</Link>
                            <Link href="/youtube-cpm-calculator/" className={`nav-link ${isActive('/youtube-cpm-calculator/') ? 'active' : ''}`}>CPM Calculator</Link>
                            <Link href="/youtube-shorts-calculator/" className={`nav-link ${isActive('/youtube-shorts-calculator/') ? 'active' : ''}`}>Shorts Calculator</Link>
                            <Link href="/youtube-watch-time-calculator/" className={`nav-link ${isActive('/youtube-watch-time-calculator/') ? 'active' : ''}`}>Watch Time Calculator</Link>
                        </div>
                    </div>
                    <Link href="/tiktok-earnings-calculator/" className={`nav-link ${isActive('/tiktok-earnings-calculator/') ? 'active' : ''}`}>TikTok</Link>
                    <Link href="/instagram-earnings-calculator/" className={`nav-link ${isActive('/instagram-earnings-calculator/') ? 'active' : ''}`}>Instagram</Link>
                    <Link href="/adsense-revenue-calculator/" className={`nav-link ${isActive('/adsense-revenue-calculator/') ? 'active' : ''}`}>AdSense</Link>
                    <Link href="/affiliate-earnings-calculator/" className={`nav-link ${isActive('/affiliate-earnings-calculator/') ? 'active' : ''}`}>Affiliate</Link>
                    <Link href="/freelance-income-calculator/" className={`nav-link ${isActive('/freelance-income-calculator/') ? 'active' : ''}`}>Freelance</Link>
                    <Link href="/blog/" className={`nav-link ${pathname?.startsWith('/blog') ? 'active' : ''}`}>Blog</Link>
                </div>

                <Link href="/#calculators" className="nav-cta" aria-label="Explore creator earnings calculators">
                    Explore Calculators
                </Link>

                {/* Mobile menu button */}
                <button className="menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? "✕" : "☰"}
                </button>
            </nav>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <div className={`mobile-dropdown ${mobileDropdownOpen ? 'open' : ''}`}>
                    <button
                        className="mobile-link mobile-trigger"
                        onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                    >
                        YouTube ▼
                    </button>
                    <div className="mobile-submenu">
                        <Link href="/youtube-earnings-calculator/" className="mobile-link mobile-sublink" onClick={() => setMobileMenuOpen(false)}>Earnings Calculator</Link>
                        <Link href="/youtube-rpm-calculator/" className="mobile-link mobile-sublink" onClick={() => setMobileMenuOpen(false)}>RPM Calculator</Link>
                        <Link href="/youtube-cpm-calculator/" className="mobile-link mobile-sublink" onClick={() => setMobileMenuOpen(false)}>CPM Calculator</Link>
                        <Link href="/youtube-shorts-calculator/" className="mobile-link mobile-sublink" onClick={() => setMobileMenuOpen(false)}>Shorts Calculator</Link>
                        <Link href="/youtube-watch-time-calculator/" className="mobile-link mobile-sublink" onClick={() => setMobileMenuOpen(false)}>Watch Time Calculator</Link>
                    </div>
                </div>
                <Link href="/tiktok-earnings-calculator/" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>TikTok</Link>
                <Link href="/instagram-earnings-calculator/" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Instagram</Link>
                <Link href="/adsense-revenue-calculator/" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>AdSense</Link>
                <Link href="/affiliate-earnings-calculator/" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Affiliate</Link>
                <Link href="/freelance-income-calculator/" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Freelance</Link>
                <Link href="/blog/" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
                <Link href="/#calculators" className="mobile-link" style={{ marginTop: '12px', background: 'var(--blue-l)', color: 'var(--blue)', textAlign: 'center' }} onClick={() => setMobileMenuOpen(false)}>
                    Explore Calculators
                </Link>
            </div>
        </>
    );
}
