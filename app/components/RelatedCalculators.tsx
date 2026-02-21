import Link from 'next/link';

interface RelatedLink {
    link: string;
    name: string;
    icon: string;
}

interface RelatedCalculatorsProps {
    links: RelatedLink[];
}

export default function RelatedCalculators({ links }: RelatedCalculatorsProps) {
    if (!links || links.length === 0) return null;

    return (
        <>
            <h2 className="bt-1 pt-40 mt-40">Related Calculators</h2>
            <div className="related-grid">
                {links.map((item, idx) => (
                    <Link key={idx} href={item.link} className="related-card">
                        <span className="icon-lg">{item.icon}</span> {item.name}
                    </Link>
                ))}
            </div>
        </>
    );
}
