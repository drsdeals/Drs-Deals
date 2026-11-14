import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getDealsByCategory } from '@/data/deals';

export const metadata: Metadata = {
    title: 'Spa & Wellness Passes | DRS Deals',
    description: 'Luxury spa treatment vouchers, holistic wellness memberships, and resort pool packages by DRS Deals.',
    alternates: {
        canonical: 'https://www.drsdeals.in/category/spa',
    },
};

export default function SpaCategoryPage() {
    const deals = getDealsByCategory('spa');

    return (
        <main className="section-padding bg-ivory" style={{ paddingTop: '140px' }}>
            <div className="container">
                <div style={{ maxWidth: '800px', margin: '0 auto 48px auto', textAlign: 'center' }}>
                    <div className="hero-eyebrow" style={{ justifyContent: 'center', marginBottom: '16px', letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-champagne-gold)' }}>
                        HOLISTIC WELLNESS &bull; DRS PRIVILEGES
                    </div>
                    <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '20px' }}>
                        Spa &amp; Wellness Privileges
                    </h1>
                    <p className="text-body-large text-charcoal-light">
                        Discover luxury spa utility vouchers, resort wellness therapies, hydrotherapy, and pool access passes across our certified retreat partners.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                    {deals.map((deal) => (
                        <div key={deal.id} className="bg-white shadow-soft" style={{ borderRadius: '16px', padding: '28px', border: '1px solid var(--color-stone)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                {deal.featuredImage ? (
                                    <div style={{ height: '180px', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px', border: '1px solid var(--color-stone)' }}>
                                        <img src={deal.featuredImage} alt={deal.propertyName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                ) : (
                                    <div className="skeleton-box" style={{ height: '180px', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: 'var(--color-charcoal-light)', border: '1px solid var(--color-stone)' }}>
                                        📷 {deal.propertyName} Placeholder
                                    </div>
                                )}
                                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-champagne-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
                                    {deal.categoryLabel}
                                </div>
                                <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif)', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
                                    {deal.propertyName}
                                </h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-charcoal-light)', marginBottom: '16px' }}>
                                    📍 {deal.location}
                                </p>
                                <p style={{ fontSize: '0.95rem', color: 'var(--color-charcoal)', lineHeight: 1.6, marginBottom: '20px' }}>
                                    {deal.tagline}
                                </p>
                            </div>
                            <div>
                                <div style={{ borderTop: '1px solid var(--color-stone)', paddingTop: '16px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-light)' }}>Wellness Package</span>
                                    <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>{deal.price}</span>
                                </div>
                                <Link href={`/deals/${deal.slug}`} className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                                    View Wellness Package
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
