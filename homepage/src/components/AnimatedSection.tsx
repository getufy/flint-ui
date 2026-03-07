import React, { useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
    children: React.ReactNode;
    animation?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'scaleUp';
    delay?: number;
    duration?: number;
    style?: React.CSSProperties;
    threshold?: number;
}

export function AnimatedSection({
    children,
    animation = 'fadeIn',
    delay = 0,
    duration = 0.6,
    style,
    threshold = 0.1
}: AnimatedSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    const animationMap = {
        fadeIn: 'fadeIn',
        slideUp: 'slideUp',
        slideInLeft: 'slideInLeft',
        slideInRight: 'slideInRight',
        scaleUp: 'scaleUp'
    };

    const baseStyle: React.CSSProperties = {
        animation: isVisible
            ? `${animationMap[animation]} ${duration}s ease-out ${delay}s both`
            : 'none',
        ...style
    };

    return (
        <div ref={ref} style={baseStyle}>
            {children}
        </div>
    );
}
