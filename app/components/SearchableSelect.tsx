"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";

export interface SelectOption {
    value: string;
    label: string;
    searchText: string;
}

interface SearchableSelectProps {
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    id?: string;
}

export default function SearchableSelect({
    options,
    value,
    onChange,
    placeholder = "Select…",
    id,
}: SearchableSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [highlightIdx, setHighlightIdx] = useState(-1);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const selectedOption = useMemo(
        () => options.find((o) => o.value === value),
        [options, value]
    );

    const filtered = useMemo(() => {
        if (!query.trim()) return options;
        const q = query.toLowerCase();
        return options.filter((o) => o.searchText.toLowerCase().includes(q));
    }, [options, query]);

    useEffect(() => {
        setHighlightIdx(-1);
    }, [filtered]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
                setQuery("");
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (highlightIdx >= 0 && listRef.current) {
            const el = listRef.current.children[highlightIdx] as HTMLElement;
            if (el) {
                el.scrollIntoView({ block: "nearest" });
            }
        }
    }, [highlightIdx]);

    const selectItem = useCallback(
        (val: string) => {
            onChange(val);
            setIsOpen(false);
            setQuery("");
        },
        [onChange]
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (!isOpen) {
                if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsOpen(true);
                }
                return;
            }

            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    setHighlightIdx((prev) =>
                        prev < filtered.length - 1 ? prev + 1 : 0
                    );
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    setHighlightIdx((prev) =>
                        prev > 0 ? prev - 1 : filtered.length - 1
                    );
                    break;
                case "Enter":
                    e.preventDefault();
                    if (highlightIdx >= 0 && filtered[highlightIdx]) {
                        selectItem(filtered[highlightIdx].value);
                    }
                    break;
                case "Escape":
                    e.preventDefault();
                    setIsOpen(false);
                    setQuery("");
                    break;
            }
        },
        [isOpen, filtered, highlightIdx, selectItem]
    );

    const highlightMatch = (text: string, q: string) => {
        if (!q.trim()) return text;
        const idx = text.toLowerCase().indexOf(q.toLowerCase());
        if (idx === -1) return text;
        return (
            <>
                {text.slice(0, idx)}
                <mark className="ss-match">{text.slice(idx, idx + q.length)}</mark>
                {text.slice(idx + q.length)}
            </>
        );
    };

    return (
        <div
            className={`ss-container${isOpen ? " ss-open" : ""}`}
            ref={containerRef}
            id={id}
            onKeyDown={handleKeyDown}
        >
            <button
                type="button"
                className="ss-trigger"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="ss-trigger-text">
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <svg
                    className="ss-chevron"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                >
                    <path
                        d="M2.5 4.5L6 8L9.5 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="ss-panel" role="listbox">
                    <div className="ss-search-wrap">
                        <input
                            ref={inputRef}
                            type="text"
                            className="ss-search"
                            placeholder="Type to search…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            aria-label="Search options"
                        />
                    </div>
                    <ul className="ss-list" ref={listRef}>
                        {filtered.length === 0 ? (
                            <li className="ss-empty">No results found</li>
                        ) : (
                            filtered.map((opt, idx) => (
                                <li
                                    key={opt.value}
                                    role="option"
                                    aria-selected={opt.value === value}
                                    className={`ss-option${opt.value === value ? " ss-selected" : ""
                                        }${idx === highlightIdx ? " ss-highlighted" : ""}`}
                                    onMouseEnter={() => setHighlightIdx(idx)}
                                    onClick={() => selectItem(opt.value)}
                                >
                                    {highlightMatch(opt.label, query)}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
