import type { Metadata } from 'next';
import Script from 'next/script';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProgressBar from './components/ProgressBar';
import './globals.css';

export const metadata: Metadata = {
  title: 'IncomeFromViews',
  description: 'Creator Earnings Calculators',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body suppressHydrationWarning>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-S6VK537JGM" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            if (location.hostname.includes("incomefromviews.com")) {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-S6VK537JGM');
            }
          `}
        </Script>
        <ProgressBar />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
