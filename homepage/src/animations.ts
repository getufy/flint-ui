/**
 * Animation utilities for smooth transitions and effects
 */

export const animations = {
    // Fade in animation
    fadeIn: {
        animation: 'fadeIn 0.6s ease-in',
        '@keyframes fadeIn': {
            from: { opacity: 0 },
            to: { opacity: 1 }
        }
    },

    // Slide up animation
    slideUp: {
        animation: 'slideUp 0.6s ease-out',
        '@keyframes slideUp': {
            from: {
                opacity: 0,
                transform: 'translateY(20px)'
            },
            to: {
                opacity: 1,
                transform: 'translateY(0)'
            }
        }
    },

    // Slide in from left
    slideInLeft: {
        animation: 'slideInLeft 0.6s ease-out',
        '@keyframes slideInLeft': {
            from: {
                opacity: 0,
                transform: 'translateX(-30px)'
            },
            to: {
                opacity: 1,
                transform: 'translateX(0)'
            }
        }
    },

    // Slide in from right
    slideInRight: {
        animation: 'slideInRight 0.6s ease-out',
        '@keyframes slideInRight': {
            from: {
                opacity: 0,
                transform: 'translateX(30px)'
            },
            to: {
                opacity: 1,
                transform: 'translateX(0)'
            }
        }
    },

    // Scale up animation
    scaleUp: {
        animation: 'scaleUp 0.6s ease-out',
        '@keyframes scaleUp': {
            from: {
                opacity: 0,
                transform: 'scale(0.95)'
            },
            to: {
                opacity: 1,
                transform: 'scale(1)'
            }
        }
    },

    // Pulse animation
    pulse: {
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        '@keyframes pulse': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.5 }
        }
    },

    // Bounce animation
    bounce: {
        animation: 'bounce 0.6s ease',
        '@keyframes bounce': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' }
        }
    },

    // Float animation for hero orbs
    float: {
        animation: 'float 6s ease-in-out infinite',
        '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0) scale(1)' },
            '50%': { transform: 'translateY(-20px) scale(1.05)' }
        }
    }
};

// CSS to inject globally
export const animationStyles = `
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes scaleUp {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

@keyframes float {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-20px) scale(1.05); }
}

@keyframes scrollUp {
    0% { transform: translateY(0); }
    100% { transform: translateY(-50%); }
}

@keyframes scrollDown {
    0% { transform: translateY(-50%); }
    100% { transform: translateY(0); }
}

/* Smooth scroll behavior */
html {
    scroll-behavior: smooth;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
`;
