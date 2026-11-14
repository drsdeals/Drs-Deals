'use client';

import React, { useState, useEffect } from 'react';

interface RotatingDealGalleryProps {
    featuredImage?: string;
    galleryImages?: string[];
    propertyName: string;
    dealTitle: string;
    imageSkeletonCount?: number;
}

export default function RotatingDealGallery({
    featuredImage,
    galleryImages = [],
    propertyName,
    dealTitle,
    imageSkeletonCount = 4,
}: RotatingDealGalleryProps) {
    // Collect all valid unique images for rotation
    const allImages: string[] = [];
    if (featuredImage) allImages.push(featuredImage);
    galleryImages.forEach((img) => {
        if (img && !allImages.includes(img)) {
            allImages.push(img);
        }
    });

    const [activeIdx, setActiveIdx] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-rotate main image every 4 seconds (4000ms), pausing on hover/focus
    useEffect(() => {
        if (allImages.length <= 1 || isPaused) return;

        const timer = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % allImages.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [allImages.length, isPaused]);

    const activeImageSrc = allImages.length > 0 ? allImages[activeIdx] : null;

    return (
        <div 
            className="rotating-deal-gallery"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
        >
            {/* Main Rotating Large Image */}
            <div className="gallery-main-viewport">
                {activeImageSrc ? (
                    <div className="gallery-image-container">
                        <img
                            key={activeImageSrc}
                            src={activeImageSrc}
                            alt={`${propertyName} - ${dealTitle} - View ${activeIdx + 1} of ${allImages.length}`}
                            className="gallery-main-image"
                            width={760}
                            height={480}
                            loading="eager"
                        />
                        {/* Auto-rotation indicator badge */}
                        <div className="gallery-counter-badge">
                            📷 {activeIdx + 1} / {allImages.length}
                        </div>
                    </div>
                ) : (
                    <div className="skeleton-box gallery-skeleton-main">
                        📷 {propertyName}: Featured Image
                    </div>
                )}
            </div>

            {/* Thumbnail Row */}
            <div className="gallery-thumbnail-grid">
                {allImages.length > 0 ? (
                    allImages.map((imgUrl, i) => {
                        const isActive = i === activeIdx;
                        return (
                            <button
                                key={`thumb-${i}`}
                                type="button"
                                onClick={() => setActiveIdx(i)}
                                className={`gallery-thumb-btn ${isActive ? 'active' : ''}`}
                                aria-label={`Select ${propertyName} photo ${i + 1}`}
                            >
                                <img
                                    src={imgUrl}
                                    alt={`${propertyName} Thumbnail ${i + 1}`}
                                    className="gallery-thumb-img"
                                    width={120}
                                    height={80}
                                    loading="lazy"
                                />
                            </button>
                        );
                    })
                ) : (
                    Array.from({ length: imageSkeletonCount }).map((_, i) => (
                        <div key={`skel-thumb-${i}`} className="skeleton-box gallery-skeleton-thumb">
                            Photo {i + 1}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
