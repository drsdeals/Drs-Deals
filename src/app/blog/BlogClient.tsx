'use client';

import React, { useState, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { BLOG_POSTS } from '@/data/blogs';
import BlogCard from '@/components/BlogCard';

const ITEMS_PER_PAGE = 36;

export default function BlogClient() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Read state from URL search params
    const pageParam = searchParams.get('page');
    const categoryParam = searchParams.get('category');
    const queryParam = searchParams.get('q');

    const currentPage = pageParam ? Math.max(1, parseInt(pageParam, 10)) : 1;
    const selectedCategory = categoryParam || 'All';
    const searchQuery = queryParam || '';

    // Local state for search input text to keep typing responsive
    const [searchInput, setSearchInput] = useState(searchQuery);
    const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);
    if (prevSearchQuery !== searchQuery) {
        setPrevSearchQuery(searchQuery);
        setSearchInput(searchQuery);
    }
    const gridHeaderRef = useRef<HTMLDivElement>(null);

    const categories = [
        'All',
        'Resorts & Stays',
        'Fine Dining',
        'Spa & Wellness',
        'Water Parks & Family',
        'Weekend Escapes',
        'Destinations & Travel',
    ];

    // Filter posts
    const filteredPosts = BLOG_POSTS.filter((post) => {
        const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesQuery = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesQuery;
    });

    const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE) || 1;

    // Helper to update URL params
    const updateUrlParams = (updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([key, value]) => {
            if (value === null) {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        updateUrlParams({ page: newPage.toString() });

        // Scroll back to the top of the blog grid smoothly
        if (gridHeaderRef.current) {
            const headerOffset = 100;
            const elementPosition = gridHeaderRef.current.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleCategoryChange = (cat: string) => {
        updateUrlParams({
            category: cat === 'All' ? null : cat,
            page: '1' // reset page
        });
    };

    const handleSearchChange = (val: string) => {
        updateUrlParams({
            q: val ? val : null,
            page: '1' // reset page
        });
    };

    // Slice posts for current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <main className="section-padding bg-ivory" style={{ paddingTop: '140px' }}>
            <div className="container">
                {/* Header */}
                <div className="section-header text-center" style={{ marginBottom: '48px' }}>
                    <div className="hero-eyebrow" style={{ justifyContent: 'center' }}>
                        DRS DEALS JOURNAL & INSIGHTS
                    </div>
                    <h1 className="section-title">
                        Curated Guides, Escapes & Hospitality Intelligence
                    </h1>
                    <p className="text-body-large text-charcoal-light" style={{ maxWidth: '720px', margin: '0 auto' }}>
                        Explore expert recommendations on India&apos;s luxury resorts, destination dining, wellness retreats, and family entertainment centers.
                    </p>
                </div>

                {/* Filter and Search Controls */}
                <div 
                    ref={gridHeaderRef}
                    className="blog-controls-container" 
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px',
                        marginBottom: '40px',
                        background: '#ffffff',
                        padding: '24px',
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                        border: '1px solid #ECE6D8'
                    }}
                >
                    {/* Top Row: Search input */}
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <div style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
                            <input
                                type="text"
                                placeholder="Search articles, guides, or destinations..."
                                value={searchInput}
                                onChange={(e) => {
                                    setSearchInput(e.target.value);
                                    handleSearchChange(e.target.value);
                                }}
                                style={{
                                    width: '100%',
                                    padding: '14px 20px',
                                    paddingLeft: '48px',
                                    borderRadius: '50px',
                                    border: '1.5px solid #E2D9C8',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    backgroundColor: '#FAF8F5'
                                }}
                            />
                            <svg 
                                style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}
                                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            {searchInput && (
                                <button
                                    onClick={() => {
                                        setSearchInput('');
                                        handleSearchChange('');
                                    }}
                                    style={{
                                        position: 'absolute',
                                        right: '16px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1.1rem',
                                        color: '#888'
                                    }}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Bottom Row: Category Pills */}
                    <div 
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '10px',
                            justifyContent: 'center'
                        }}
                    >
                        {categories.map((cat) => {
                            const isActive = selectedCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => handleCategoryChange(cat)}
                                    style={{
                                        padding: '8px 18px',
                                        borderRadius: '30px',
                                        fontSize: '0.9rem',
                                        fontWeight: isActive ? 600 : 500,
                                        border: isActive ? '1.5px solid #800D14' : '1px solid #E2D9C8',
                                        backgroundColor: isActive ? '#800D14' : '#FFFFFF',
                                        color: isActive ? '#FFFFFF' : '#333333',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Results count & current view */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <p style={{ color: 'var(--color-charcoal-light)', fontSize: '0.95rem' }}>
                        Showing <strong>{filteredPosts.length > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + ITEMS_PER_PAGE, filteredPosts.length)}</strong> of <strong>{filteredPosts.length}</strong> guides
                    </p>
                    {totalPages > 1 && (
                        <p style={{ color: 'var(--color-charcoal-light)', fontSize: '0.95rem' }}>
                            Page {currentPage} of {totalPages}
                        </p>
                    )}
                </div>

                {/* Posts Grid */}
                {paginatedPosts.length > 0 ? (
                    <div className="grid grid-3" style={{ gap: '32px' }}>
                        {paginatedPosts.map((post) => (
                            <BlogCard key={post.slug} post={post} />
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '60px 20px', background: '#ffffff', borderRadius: '16px', border: '1px solid #ECE6D8' }}>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', color: '#1a1a1a' }}>No articles match your criteria</h3>
                        <p style={{ color: '#666', marginBottom: '24px' }}>Try searching with different keywords or choosing another category.</p>
                        <button
                            onClick={() => {
                                setSearchInput('');
                                updateUrlParams({ category: null, q: null, page: '1' });
                            }}
                            className="btn btn-secondary"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

                {/* Pagination Navigation */}
                {totalPages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '56px' }}>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            style={{
                                padding: '10px 18px',
                                borderRadius: '8px',
                                border: '1px solid #D5CBB9',
                                background: currentPage === 1 ? '#F5F2EC' : '#FFFFFF',
                                color: currentPage === 1 ? '#AAA' : '#333',
                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                fontWeight: 600
                            }}
                        >
                            Previous
                        </button>

                        <div style={{ display: 'flex', gap: '6px' }}>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                                // Simple windowing for page buttons (show first, last, current, and neighbours)
                                if (
                                    pageNum === 1 ||
                                    pageNum === totalPages ||
                                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                                ) {
                                    const isCurrent = pageNum === currentPage;
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '8px',
                                                border: isCurrent ? '1.5px solid #800D14' : '1px solid #D5CBB9',
                                                background: isCurrent ? '#800D14' : '#FFFFFF',
                                                color: isCurrent ? '#FFFFFF' : '#333',
                                                fontWeight: isCurrent ? 700 : 500,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                } else if (
                                    pageNum === currentPage - 2 ||
                                    pageNum === currentPage + 2
                                ) {
                                    return <span key={pageNum} style={{ padding: '0 4px', alignSelf: 'center', color: '#999' }}>...</span>;
                                }
                                return null;
                            })}
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            style={{
                                padding: '10px 18px',
                                borderRadius: '8px',
                                border: '1px solid #D5CBB9',
                                background: currentPage === totalPages ? '#F5F2EC' : '#FFFFFF',
                                color: currentPage === totalPages ? '#AAA' : '#333',
                                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                fontWeight: 600
                            }}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
