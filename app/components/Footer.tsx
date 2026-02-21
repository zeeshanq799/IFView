export default function Footer() {
    return (
        <footer>
            <div className="footer-inner">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <a href="/" className="logo footer-logo-flex">
                            <img src="/logo.svg" alt="IncomeFromViews Logo" className="footer-logo-img" width="36" height="36" loading="lazy" />
                            <span className="footer-logo-text">Income<em>FromViews</em></span>
                        </a>
                        <p>Free, instant creator earnings calculators for YouTube, TikTok, Instagram, AdSense, Affiliate marketing and Freelancing.</p>
                    </div>
                    <div className="footer-col">
                        <h4>Calculators</h4>
                        <a href="/youtube-earnings-calculator/">YouTube Earnings</a>
                        <a href="/youtube-cpm-calculator/">CPM Calculator</a>
                        <a href="/youtube-rpm-calculator/">RPM Calculator</a>
                        <a href="/tiktok-earnings-calculator/">TikTok Earnings</a>
                        <a href="/instagram-earnings-calculator/">Instagram Earnings</a>
                        <a href="/adsense-revenue-calculator/">AdSense Revenue</a>
                        <a href="/affiliate-earnings-calculator/">Affiliate Earnings</a>
                        <a href="/freelance-income-calculator/">Freelance Income</a>
                    </div>
                    <div className="footer-col">
                        <h4>Resources</h4>
                        <a href="/blog/">Blog</a>
                        <a href="/blog/youtube-cpm-guide/">YouTube CPM Guide</a>
                        <a href="/blog/rpm-vs-cpm-youtube/">RPM vs CPM</a>
                        <a href="/blog/tiktok-money/">TikTok Earnings</a>
                        <a href="/blog/adsense-tips/">AdSense Tips</a>
                        <a href="/blog/freelance-rates/">Freelance Rates</a>
                    </div>
                    <div className="footer-col">
                        <h4>Company</h4>
                        <a href="/about/">About Us</a>
                        <a href="/contact/">Contact</a>
                        <a href="/privacy-policy/">Privacy Policy</a>
                        <a href="/terms/">Terms of Use</a>
                        <a href="/disclaimer/">Disclaimer</a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span className="footer-copy">© 2026 IncomeFromViews · All calculators are free to use</span>
                    <div className="footer-legal">
                        <a href="/privacy-policy/">Privacy</a>
                        <a href="/terms/">Terms</a>
                        <a href="/disclaimer/">Disclaimer</a>
                        <a href="/contact/">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
