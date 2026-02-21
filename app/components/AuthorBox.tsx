import Link from 'next/link';
import React from 'react';

export default function AuthorBox() {
    return (
        <div className="author-box">
            <div className="author-img">👨‍💻</div>
            <div className="author-info">
                <h3>About IncomeFromViews</h3>
                <p>
                    <strong>IncomeFromViews</strong> builds free earnings calculators and data-backed guides for the creator economy. Every number in our content is sourced from official platform documentation, public financial disclosures, or verified industry reports. We don&apos;t invent case studies or inflate projections.
                </p>
                <Link href="/about/" className="author-link">More about our methodology &rarr;</Link>
            </div>
        </div>
    );
}
