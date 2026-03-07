import React, { useEffect, useRef, useState } from 'react';

interface LazyImageProps {
    src: string;
    alt: string;
    placeholder?: string;
    className?: string;
    style?: React.CSSProperties;
    width?: number;
    height?: number;
    onLoad?: () => void;
}

export function LazyImage({
    src,
    alt,
    placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E',
    className,
    style,
    width,
    height,
    onLoad
}: LazyImageProps) {
    const imgRef = useRef<HTMLImageElement>(null);
    const [imageSrc, setImageSrc] = useState(placeholder);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && imgRef.current) {
                        const img = imgRef.current;
                        img.src = src;
                        observer.unobserve(img);
                    }
                });
            },
            { rootMargin: '50px' }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, [src]);

    const handleLoad = () => {
        setImageSrc(src);
        setIsLoading(false);
        onLoad?.();
    };

    return (
        <img
            ref={imgRef}
            src={imageSrc}
            alt={alt}
            className={className}
            style={{
                opacity: isLoading ? 0.5 : 1,
                transition: 'opacity 0.3s ease-in-out',
                ...style
            }}
            width={width}
            height={height}
            onLoad={handleLoad}
        />
    );
}
