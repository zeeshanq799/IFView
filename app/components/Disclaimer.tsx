import React from 'react';

interface DisclaimerProps {
    children?: React.ReactNode;
}

export default function Disclaimer({ children }: DisclaimerProps) {
    return (
        <div className="disclaimer">
            <p>
                <strong>Disclaimer:</strong> {children || "The figures and usage examples provided in this calculator are for educational purposes. Actual earnings vary based on audience demographics, niche, time of year, and platform policy changes. We do not guarantee specific results."}
            </p>
        </div>
    );
}
