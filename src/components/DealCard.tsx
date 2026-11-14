import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Deal } from '@/data/deals';

interface DealCardProps {
    deal: Deal;
}

export default function DealCard({ deal }: DealCardProps) {
    return (
        <div className="card deal-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
            <div className="card-media" style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                {deal.featuredImage ? (
                    <Image
                        src={deal.featuredImage}
                        alt={deal.propertyName}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                        className="deal-card-image"
                    />
                ) : (
                    <div className="skeleton-box" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span>{deal.propertyName}</span>
                    </div>
                )}
                {deal.isFeatured && (
                    <span className="badge badge-gold" style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 2 }}>
                        Featured Partner
                    </span>
                )}
            </div>

            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '24px' }}>
                <span className="card-category" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, color: 'var(--color-champagne-gold)', marginBottom: '8px' }}>
                    {deal.categoryLabel}
                </span>

                <h3 className="card-title" style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
                    {deal.propertyName}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-light)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>📍</span> {deal.location}
                </p>

                <p className="card-text" style={{ fontSize: '0.9rem', color: 'var(--color-charcoal-light)', lineHeight: 1.6, marginBottom: '20px', flexGrow: 1 }}>
                    {deal.tagline}
                </p>

                <div className="card-meta" style={{ borderTop: '1px solid var(--color-stone)', paddingTop: '16px', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div>
                        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-charcoal-light)', display: 'block' }}>
                            {deal.category === 'theme-parks' || deal.category === 'waterparks' ? 'Member Ticket' : 'Membership'}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                            <span style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>
                                {deal.price}
                            </span>
                            {deal.originalPrice && (
                                <span style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-light)', textDecoration: 'line-through' }}>
                                    {deal.originalPrice}
                                </span>
                            )}
                        </div>
                    </div>

                    <Link href={`/deals/${deal.slug}`} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                        View Vouchers &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
}
