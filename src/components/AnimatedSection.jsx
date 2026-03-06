import React, { useEffect, useState, useRef } from 'react';

const AnimatedSection = ({
    children,
    animation = 'fadeSlideUp',
    delay = 0,
    className = '',
    threshold = 0.1
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(ref.current);
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

    const animations = {
        fadeSlideUp: {
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: isVisible ? 1 : 0,
        },
        fadeIn: {
            opacity: isVisible ? 1 : 0,
        },
        slideLeft: {
            transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
            opacity: isVisible ? 1 : 0,
        },
        slideRight: {
            transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
            opacity: isVisible ? 1 : 0,
        },
        scaleUp: {
            transform: isVisible ? 'scale(1)' : 'scale(0.9)',
            opacity: isVisible ? 1 : 0,
        },
    };

    return (
        <div
            ref={ref}
            className={className}
            style={{
                ...animations[animation],
                transition: `all 0.6s ease-out ${delay}s`,
            }}
        >
            {children}
        </div>
    );
};

export default AnimatedSection;

