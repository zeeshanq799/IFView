"use client";

import { useState } from "react";
import Link from "next/link";
import { blogPosts } from "./data";

const POSTS_PER_PAGE = 9;

export default function BlogGrid() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE) || 1;
    const validCurrentPage = currentPage > totalPages ? totalPages : currentPage;
    const startIndex = (validCurrentPage - 1) * POSTS_PER_PAGE;
    const currentPosts = blogPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

    return (
        <>
            <div className="blog-grid">
                {currentPosts.map((post, index) => (
                    <Link key={index} href={post.url} className="blog-card fade-in text-decoration-none">
                        <div className={`blog-card-img ${post.imgClass}`}>{post.icon}</div>
                        <div className="blog-card-body">
                            <span className={`blog-tag ${post.tagClass}`}>{post.tagText}</span>
                            <h3>{post.title}</h3>
                            <p>{post.description}</p>
                            <div className="blog-meta"><span>📖 {post.readTime}</span><span>Updated {post.updated}</span></div>
                        </div>
                    </Link>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '48px', marginBottom: '24px' }}>
                    {validCurrentPage > 1 && (
                        <button
                            onClick={() => setCurrentPage(validCurrentPage - 1)}
                            className="btn-outline"
                            style={{ padding: '8px 16px', margin: 0 }}
                        >
                            ← Previous
                        </button>
                    )}

                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={validCurrentPage === i + 1 ? "btn-primary" : "btn-outline"}
                            style={{ padding: '8px 16px', minWidth: '40px', textAlign: 'center', margin: 0, width: 'auto', display: 'inline-block' }}
                        >
                            {i + 1}
                        </button>
                    ))}

                    {validCurrentPage < totalPages && (
                        <button
                            onClick={() => setCurrentPage(validCurrentPage + 1)}
                            className="btn-outline"
                            style={{ padding: '8px 16px', margin: 0 }}
                        >
                            Next →
                        </button>
                    )}
                </div>
            )}
        </>
    );
}
