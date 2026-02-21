import { youtubeCountries, CountryData } from "./youtubeCountries";
import { youtubeNiches, NicheData } from "./youtubeNiches";

export type ResolvedSlug =
    | { type: "country"; data: CountryData }
    | { type: "niche"; data: NicheData }
    | null;

export function resolveSlug(slug: string): ResolvedSlug {
    if (!slug) return null;
    const lowercaseSlug = slug.toLowerCase();

    const countryMatch = youtubeCountries.find(c => c.slug === lowercaseSlug);
    if (countryMatch) {
        return { type: "country", data: countryMatch };
    }

    const nicheMatch = youtubeNiches.find(n => n.slug === lowercaseSlug);
    if (nicheMatch) {
        return { type: "niche", data: nicheMatch };
    }

    return null;
}
