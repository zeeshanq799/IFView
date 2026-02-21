"use client";
import { useEffect, useState } from 'react';

export default function ProgressBar() {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const n = document.documentElement;
            const pct = (n.scrollTop / (n.scrollHeight - n.clientHeight)) * 100;
            setWidth(pct);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return <div id="progress" style={{ width: `${width}%` }}></div>;
}
