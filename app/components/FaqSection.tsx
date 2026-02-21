"use client";
import { useState } from 'react';

export default function FaqSection({ items }: { items: { question: string, answer: string }[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="faq-wrap">
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
                        <button className="faq-q" onClick={() => toggle(index)}>
                            {item.question} <span className="faq-plus">{isOpen ? '-' : '+'}</span>
                        </button>
                        <div className="faq-a" style={{ display: isOpen ? 'block' : 'none' }}>
                            {item.answer}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
