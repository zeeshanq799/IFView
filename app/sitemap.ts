import type { MetadataRoute } from "next";
import { youtubeCountries } from "../data/youtubeCountries";
import { youtubeNiches } from "../data/youtubeNiches";

export const dynamic = "force-static";

const BASE = "https://incomefromviews.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    const seen = new Set<string>();

    const add = (
        path: string,
        changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
        priority: number
    ): MetadataRoute.Sitemap[number] | null => {
        const url = `${BASE}${path}`;
        if (seen.has(url)) return null;
        seen.add(url);
        return { url, lastModified: now, changeFrequency, priority };
    };

    const entries: MetadataRoute.Sitemap = [];
    const push = (
        path: string,
        freq: MetadataRoute.Sitemap[number]["changeFrequency"],
        pri: number
    ) => {
        const e = add(path, freq, pri);
        if (e) entries.push(e);
    };

    push("/", "weekly", 1.0);
    push("/blog/", "weekly", 0.9);

    push("/blog/how-to-earn-money-on-youtube/", "weekly", 0.9);
    push("/blog/tiktok-money/", "weekly", 0.8);
    push("/blog/adsense-tips/", "weekly", 0.8);
    push("/blog/freelance-rates/", "weekly", 0.8);

    push("/youtube-earnings-calculator/", "weekly", 0.8);
    push("/youtube-cpm-calculator/", "weekly", 0.8);
    push("/youtube-rpm-calculator/", "weekly", 0.8);
    push("/youtube-shorts-calculator/", "weekly", 0.8);
    push("/youtube-watch-time-calculator/", "weekly", 0.8);
    push("/tiktok-earnings-calculator/", "weekly", 0.8);
    push("/instagram-earnings-calculator/", "weekly", 0.8);
    push("/adsense-revenue-calculator/", "weekly", 0.8);
    push("/affiliate-earnings-calculator/", "weekly", 0.8);
    push("/freelance-income-calculator/", "weekly", 0.8);

    push("/blog/youtube-rpm-by-country/", "weekly", 0.7);
    push("/blog/how-much-does-youtube-pay-per-1000-views/", "weekly", 0.7);
    push("/blog/youtube-cpm-guide/", "weekly", 0.7);
    push("/blog/rpm-vs-cpm-youtube/", "weekly", 0.7);
    push("/blog/tiktok-creativity-program-rpm-2026/", "weekly", 0.7);

    push("/about/", "yearly", 0.4);
    push("/contact/", "yearly", 0.4);
    push("/privacy-policy/", "yearly", 0.3);
    push("/terms/", "yearly", 0.3);
    push("/disclaimer/", "yearly", 0.3);

    youtubeCountries
        .filter((c) => c.active)
        .forEach((c) =>
            push(`/youtube-earnings-calculator/${c.slug}/`, "weekly", 0.7)
        );

    youtubeNiches
        .filter((n) => n.active)
        .forEach((n) =>
            push(`/youtube-earnings-calculator/${n.slug}/`, "weekly", 0.7)
        );

    return entries;
}
