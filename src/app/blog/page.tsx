import type { Metadata } from 'next';
import { Suspense } from 'react';
import BlogClient from './BlogClient';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
    title: 'Hospitality Journal & Travel Guides | DRS Deals',
    description: 'Explore curated travel guides, luxury resort reviews, fine dining recommendations, and leisure insider tips across Delhi NCR and India by DRS Deals.',
    alternates: {
        canonical: `${siteConfig.url}/blog`,
    },
    openGraph: {
        title: 'Hospitality Journal & Travel Guides | DRS Deals',
        description: 'Explore curated travel guides, luxury resort reviews, fine dining recommendations, and leisure insider tips across Delhi NCR and India.',
        url: `${siteConfig.url}/blog`,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.socialImage,
                width: 1200,
                height: 630,
                alt: 'DRS Deals Hospitality Journal',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Hospitality Journal & Travel Guides | DRS Deals',
        description: 'Explore curated travel guides, luxury resort reviews, fine dining recommendations, and leisure insider tips across Delhi NCR and India.',
        images: [siteConfig.socialImage],
    },
};

export default function BlogIndexPage() {
    return (
        <Suspense fallback={
            <main className="section-padding bg-ivory" style={{ paddingTop: '140px' }}>
                <div className="container text-center">
                    <p style={{ color: 'var(--color-charcoal-light)', fontSize: '1.1rem' }}>Loading Journal...</p>
                </div>
            </main>
        }>
            <BlogClient />
        </Suspense>
    );
}
