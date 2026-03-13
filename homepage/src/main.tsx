import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../packages/core/src/theme.css';
import '../../packages/core/src/theme-dark.css';
import { animationStyles } from './animations';
import { App } from './App';

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
